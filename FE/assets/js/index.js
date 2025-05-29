const formatCurrency = (value) =>
  Number(value).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

document.addEventListener("DOMContentLoaded", () => {
  const containerProduct = document.getElementById("container-product");
  const orderModalOverlay = document.getElementById("orderModalOverlay");
  const orderModalClose = document.getElementById("orderModalClose");
  const orderModal = document.getElementById("orderModal");
  const openCartProduct = document.querySelectorAll(".food-card__order-btn");

  openCartProduct.forEach((btn) =>
    btn.addEventListener("click", () => toggleModalVisibility(true))
  );

  if (orderModalClose)
    orderModalClose.addEventListener("click", () => {
      if (orderModal) orderModal.style.display = "none";
      if (orderModalOverlay) orderModalOverlay.style.display = "none";
    });

  if (orderModalOverlay)
    orderModalOverlay.addEventListener("click", () => {
      if (orderModal) orderModal.style.display = "none";
      orderModalOverlay.style.display = "none";
    });

  function toggleModalVisibility(show) {
    containerProduct.style.opacity = show ? "1" : "0";
    containerProduct.style.visibility = show ? "visible" : "hidden";
  }
});

// Slider
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
const slideInterval = 2500;

const updateSlider = () => {
  slider.style.transform = `translateX(-${currentSlide * 25}%)`;
  dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
};

const nextSlide = () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
};

let slideTimer = setInterval(nextSlide, slideInterval);

dots.forEach((dot, i) =>
  dot.addEventListener("click", () => {
    currentSlide = i;
    updateSlider();
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, slideInterval);
  })
);

// Hiển thị các khu vực giao diện
const homeContainer = document.getElementById("home--container");
const cartModalDark = document.getElementById("cartModalDark");
const orderDetail = document.getElementById("order-detail");
const filterMenu = document.getElementById("filter-menu");
const heroTop = document.getElementById("hero-top");
const heroMenu = document.getElementById("hero--bottom_menu");
const containerInfo = document.getElementById("container--info");

const hadndleQuayLai = () => {
  homeContainer.style.display = "block";
  cartModalDark.style.display = "none";
  filterMenu.style.display = "block";
  heroTop.style.display = "none";
  heroMenu.style.display = "block";
};

const handleDatThemMon = () => {
  homeContainer.style.display = "block";
  cartModalDark.style.display = "none";
  filterMenu.style.display = "block";
  heroTop.style.display = "none";
  heroMenu.style.display = "block";
};

const handleInfo = () => {
  homeContainer.style.display = "none";
  filterMenu.style.display = "none";
  heroMenu.style.display = "none";
  cartModalDark.style.display = "none";
  orderDetail.style.display = "none";
  containerInfo.style.display = "block";
  try {
    // js BĂNG
    fetch("../BE/get_user_info.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          document.getElementById("fullname").value = data.name;
          document.getElementById("phone").value = data.phone;
          document.getElementById("rank").value = data.rank;
        }
      });
  } catch (error) {
    console.error("Lỗi gọi API:", err);
  }
};
// =============================Call API========================================
// Fetch sản phẩm
const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost/webnhahang/BE/api_product.php");
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};
// Fetch chi tiết sản phẩm
const fetchProductById = async (id) => {
  const res = await fetch(
    `http://localhost/webnhahang/BE/api_product.php?id=${id}`
  );
  if (!res.ok) throw new Error("Không lấy được sản phẩm");
  return res.json();
};
// call api checkin
const checkUserAndTable = async () => {
  const res = await fetch("http://localhost/webnhahang/BE/checkin.php", {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!data.logged_in) {
    toast({ title: "Lỗi", message: "Bạn chưa đăng nhập", type: "error" });
  } else if (!data.table_selected) {
    toast({ title: "Lỗi", message: "Bạn chưa chọn bàn", type: "error" });
  } else {
    toast({
      title: "Thành công",
      message: "Bạn đã đăng nhập và chọn bàn",
      type: "success",
    });
  }
};
// call api chi tiet don han
const fetchAllPendingOrders = async () => {
  const res = await fetch(
    "http://localhost/webnhahang/BE/api_order_detail.php",
    {
      credentials: "include",
    }
  );
  return await res.json();
};
// call api cart
const fetchCart = async () => {
  const res = await fetch("http://localhost/webnhahang/BE/api_cart.php", {
    credentials: "include",
  });
  return await res.json();
};
// API Bàn
const fetchAndRenderTables = async () => {
  try {
    const res = await fetch("http://localhost/webnhahang/BE/tables.php");
    const tables = await res.json();
    renderTables(tables);
  } catch (error) {
    console.error("Error loading tables:", error);
  }
};
// =================================Chuc nang ===================
// Render sản phẩm
const renderProduct = (product) => `
  <div class="outMenu--item" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
    <img src="${product.image}" alt="${product.name}" class="food-card__image">
    <div class="food-card__content">
      <h3 class="food-card__title">${product.name}</h3>
      <p class="food-card__price">${formatCurrency(product.price)}</p>
      <button class="food-card__order-btn" onclick="showProductDetail(${
        product.product_id
      })">ĐẶT MÓN</button>
    </div>
  </div>
`;

// Render modal chi tiết sản phẩm
const renderProductDetail = (product) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return;

  modalRoot.innerHTML = `
    <div class="order-modal__overlay" id="orderModalOverlay"></div>
    <div class="order-modal" id="orderModal">
      <button class="order-modal__close" id="orderModalCloseProdcut" aria-label="Đóng">&times;</button>
      <div class="order-modal__img-wrap">
        <img src="${
          product.image
        }" alt="Ảnh món ăn" class="order-modal__img" id="orderModalImg">
      </div>
      <div class="order-modal__content">
        <div class="order-modal__info">
          <h2 class="order-modal__title" id="orderModalTitle">${
            product.name || ""
          }</h2>
          <div class="order-modal__price" id="orderModalPrice">${formatCurrency(
            product.price || 0
          )}</div>
          <div class="order-modal__desc" id="orderModalDesc">${
            product.description || ""
          }</div>
        </div>
        <div class="order-modal__qty-row">
          <span class="order-quantity">Số lượng :</span>
          <div class="order-modal__qty">
            <button class="order-modal__qty-btn" id="orderModalMinus">-</button>
            <input type="number" id="orderModalQty" value="1" min="1">
            <button class="order-modal__qty-btn" id="orderModalPlus">+</button>
          </div>
        </div>
        <div class="order-modal__note-row">
          <p for="orderModalNote" class="order-quantity">Ghi chú : </p>
          <textarea id="orderModalNote" placeholder="Nhập thông tin cần lưu ý..."></textarea>
        </div>
        <div class="order-modal__footer">
          <div class="order-modal__total">Thành tiền:
            <span id="orderModalTotal">${formatCurrency(
              product.price || 0
            )}</span>
          </div>
          <button class="order-modal__order-btn" id="orderModalOrderBtn" data-product-id="${
            product.product_id
          }">
            Đặt hàng  <i class="fas fa-shopping-basket"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  document.getElementById("orderModalCloseProdcut").onclick = closeOrderModal;
  document.getElementById("orderModalOverlay").onclick = closeOrderModal;

  const qtyInput = document.getElementById("orderModalQty");
  const updateTotal = () => {
    const qty = Math.max(1, parseInt(qtyInput.value) || 1);
    qtyInput.value = qty;
    document.getElementById("orderModalTotal").textContent = formatCurrency(
      product.price * qty
    );
  };

  qtyInput.oninput = updateTotal;
  document.getElementById("orderModalMinus").onclick = () => {
    let qty = Math.max(1, parseInt(qtyInput.value) || 1);
    if (qty > 1) {
      qtyInput.value = qty - 1;
      updateTotal();
    }
  };
  document.getElementById("orderModalPlus").onclick = () => {
    let qty = Math.max(1, parseInt(qtyInput.value) || 1);
    qtyInput.value = qty + 1;
    updateTotal();
  };

  const orderBtn = document.getElementById("orderModalOrderBtn");
  if (orderBtn) {
    orderBtn.onclick = () => {
      const qty = parseInt(document.getElementById("orderModalQty").value) || 1;
      const items = [
        {
          product_id: product.product_id,
          quantity: qty,
        },
      ];
      handdlAddCard(items);
    };
  }
};

const closeOrderModal = () => {
  document.getElementById("modal-root").innerHTML = "";
};

window.showProductDetail = async (productId) => {
  try {
    const product = await fetchProductById(productId);
    renderProductDetail(product);
  } catch (error) {
    alert("Lỗi khi tải sản phẩm");
    console.error(error);
  }
};

// Phân trang sản phẩm
let currentPage = 1;
const productsPerPage = 12;
let allProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
  allProducts = await fetchProducts();
  renderProductsPage(currentPage);
});

const renderProductsPage = (page) => {
  const productContainer = document.querySelector(".outMenu--list");
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToShow = allProducts.slice(start, end);

  if (productContainer) {
    productContainer.innerHTML = productsToShow.length
      ? productsToShow.map(renderProduct).join("")
      : '<p style="color: white;">Không có sản phẩm nào</p>';
  }
  renderPagination();
};

const renderPagination = () => {
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const paginationContainer = document.querySelector(".list--action_page");
  if (!paginationContainer) return;

  paginationContainer.innerHTML = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  )
    .map(
      (i) =>
        `<a href="#menu-section" class="action_page--item${
          i === currentPage ? " active" : ""
        }" onclick="goToPage(${i})">${i}</a>`
    )
    .join("");
};

window.goToPage = (page) => {
  currentPage = page;
  renderProductsPage(currentPage);
};

const statusText = {
  available: "Còn trống",
  occupied: "Đang sử dụng",
  reserved: "Đã đặt trước",
};
// MOdal bàn
document.addEventListener("DOMContentLoaded", () => {
  const chooseMenuLink = document.getElementById("chooseMenuLink");
  const chooseMenuLinkMobile = document.getElementById("chooseMenuLinkMobile");
  const chooseTableLink = document.getElementById("chooseTableLink");
  const chooseTableLinkMobile = document.getElementById(
    "chooseTableLinkMobile"
  );
  const modal = document.getElementById("tableModal");
  const closeChonban = document.querySelector(".modal--close-chonban");
  const actionNav = document.getElementById("action-nav");

  const handleMenuClick = (e) => {
    e.preventDefault();
    filterMenu.style.display = "block";
    heroMenu.style.display = "block";
    heroTop.style.display = "none";
    orderDetail.style.display = "none";
    cartModalDark.style.display = "none";
    if (actionNav.checked) actionNav.checked = false;
  };

  const handleTableClick = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      toast({
        title: "Thông báo",
        message: "Bạn cần đăng nhập để chọn bàn!",
        type: "warning",
      });
      return;
    }
    const currentTableId = localStorage.getItem("table_id");
    if (currentTableId) {
      try {
        const cartItems = await fetchCart();
        if (cartItems.length > 0) {
          toast({
            title: "Thông báo",
            message:
              "Bạn đã chọn bàn và có sản phẩm trong giỏ, không thể chọn lại bàn!",
            type: "warning",
          });
          return;
        } else {
          const modal = document.getElementById("tableModal");
          modal.style.display = "block";
          fetchAndRenderTables();
        }
      } catch (error) {
        console.error("Lỗi kiểm tra giỏ hàng:", error);
        toast({
          title: "Lỗi",
          message: "Không thể kiểm tra giỏ hàng, vui lòng thử lại!",
          type: "error",
        });
      }
    } else {
      const modal = document.getElementById("tableModal");
      modal.style.display = "block";
      fetchAndRenderTables();
    }
  };
  chooseMenuLink.onclick = chooseMenuLinkMobile.onclick = handleMenuClick;
  chooseTableLink.onclick = chooseTableLinkMobile.onclick = handleTableClick;
  closeChonban.onclick = () => (modal.style.display = "none");
});

const renderTables = (tables) => {
  const grid = document.getElementById("tableGrid");
  grid.innerHTML = "";
  tables.forEach((table) => {
    const div = document.createElement("div");
    div.className = `table ${table.status}`;
    div.innerHTML = `<div class="nameTable">${table.name}</div><div>${
      statusText[table.status]
    }</div>`;
    div.onclick = () => {
      if (table.status === "available") {
        showTable(table);
      }
    };
    grid.appendChild(div);
  });
};

const showTable = (table) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return;
  modalRoot.innerHTML = `
    <div class="order-modal__overlay" id="orderModalOverlay"></div>
    <div class="order-modal" id="orderModal">
      <button class="order-modal__close" id="orderModalCloseTable" aria-label="Đóng">&times;</button>
      <div class="order-modal__content">
        <h2 style="margin-bottom: 16px;">Xác nhận chọn bàn</h2>
        <p style="margin-bottom: 24px;">Bạn muốn chọn bàn: <b>${table.name}</b>?</p>
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button id="confirmTableBtn" class="order-modal__order-btn">Xác nhận</button>
          <button id="datBanBtn" class="order-modal__order-btn" style="background: #28a745;">Đặt bàn</button>
        </div>
      </div>
    </div>`;
  document.getElementById("orderModalOverlay").onclick = closeOrderModal;
  document.getElementById("orderModalCloseTable").onclick = closeOrderModal;

  document.getElementById("confirmTableBtn").onclick = () => {
    updateTableStatus(table.id, "occupied", table.name, "chọn");
  };

  document.getElementById("datBanBtn").onclick = () => {
    updateTableStatus(table.id, "reserved", table.name, "đặt");
  };
};

const updateTableStatus = async (tableId, status, tableName, actionWord) => {
  try {
    const oldTableId = localStorage.getItem("table_id");
    if (oldTableId && oldTableId !== tableId.toString()) {
      const resetOldTable = await fetch(
        "http://localhost/webnhahang/BE/update_table.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table_id: oldTableId,
            status: "available",
          }),
        }
      );
      const resetOldTableData = await resetOldTable.json();
      if (!resetOldTableData.success) {
        throw new Error("Không thể reset bàn cũ về trạng thái còn trống");
      }
    }
    const res = await fetch("http://localhost/webnhahang/BE/update_table.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        table_id: tableId,
        status: status,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || "Cập nhật trạng thái bàn thất bại");
    }
    const res2 = await fetch(
      "http://localhost/webnhahang/BE/select_table.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ table_id: tableId }),
      }
    );
    const data2 = await res2.json();
    if (!data2.success) {
      throw new Error(data2.message || "Không thể cập nhật thông tin bàn");
    }
    localStorage.setItem("table_id", tableId);

    toast({
      title: "Thành công",
      message: `Bạn đã ${actionWord} bàn ${tableName} thành công`,
      type: "success",
    });

    closeOrderModal();
    fetchAndRenderTables();
  } catch (error) {
    console.error("Error:", error);
    toast({
      title: "Lỗi",
      message: error.message || "Không thể kết nối đến server",
      type: "error",
    });
  }
};

const handdlAddCard = async (items) => {
  const userId = localStorage.getItem("user_id");
  const tableId = localStorage.getItem("table_id");

  if (!userId) {
    toast({
      title: "Lỗi",
      message: "Bạn cần đăng nhập để đặt món",
      type: "error",
    });
    return;
  }
  if (!tableId) {
    toast({
      title: "Lỗi",
      message: "Bạn cần chọn bàn trước khi đặt món",
      type: "error",
    });
    return;
  }
  try {
    const currentCart = await fetchCart();
    const existingItem = currentCart.find(
      (item) => item.product_id === items[0].product_id
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + items[0].quantity;
      const response = await fetch(
        "http://localhost/webnhahang/BE/api_cart_update.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          credentials: "include",
          body: `order_item_id=${existingItem.order_item_id}&quantity=${newQuantity}`,
        }
      );
      const data = await response.json();
      if (data.success) {
        toast({
          title: "Thành công",
          message: "Đã cập nhật số lượng sản phẩm trong giỏ hàng",
          type: "success",
        });
      } else {
        toast({
          title: "Lỗi",
          message: data.message || "Không thể cập nhật số lượng",
          type: "error",
        });
      }
    } else {
      const response = await fetch(
        "http://localhost/webnhahang/BE/api_order.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            items,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("last_order_id", data.order_id);
        toast({
          title: "Thành công",
          message: "Đặt món thành công",
          type: "success",
        });
      } else {
        toast({
          title: "Lỗi",
          message: data.message,
          type: "error",
        });
      }
    }
  } catch (error) {
    toast({
      title: "Lỗi",
      message: "Lỗi kết nối máy chủ",
      type: "error",
    });
  }
};

const hadndleDatMua = async () => {
  const data = await fetchAllPendingOrders();
  renderAllPending(data);
  orderDetail.style.display = "block";
  cartModalDark.style.display = "none";
};

const renderCart = (cartItems) => {
  const tbody = document.querySelector(".cart-dark-table tbody");
  tbody.innerHTML = cartItems
    .map(
      (item) => `
        <tr>
            <td>
                <button class="cart-dark-remove" data-order-item-id="${
                  item.order_item_id
                }">
                    <img src="./assets/icons/Delete.svg" alt="">
                </button>
            </td>
            <td class="cart-dark-food" data-label="Món">
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
            </td>
            <td data-label="Đơn giá">${Number(item.price).toLocaleString(
              "vi-VN"
            )}</td>
            <td data-label="Số lượng">
                <div class="cart-dark-qty">
                    <button class="qty-minus" data-order-item-id="${
                      item.order_item_id
                    }">-</button>
                    <input type="number" value="${
                      item.quantity
                    }" min="1" data-order-item-id="${item.order_item_id}">
                    <button class="qty-plus" data-order-item-id="${
                      item.order_item_id
                    }">+</button>
                </div>
            </td>
            <td data-label="Tổng tiền">${(
              item.price * item.quantity
            ).toLocaleString("vi-VN")}</td>
        </tr>
    `
    )
    .join("");

  const totalQty = cartItems.reduce((sum, i) => sum + Number(i.quantity), 0);
  const totalAmount = cartItems.reduce(
    (sum, i) => sum + Number(i.price) * Number(i.quantity),
    0
  );
  document.querySelector(".totalproduct--main-amout").textContent = totalQty;
  document.querySelectorAll(".totalproduct--main-amout")[1].textContent =
    totalAmount.toLocaleString("vi-VN") + " VND";
};
const openCart = async () => {
  const cartItems = await fetchCart();
  renderCart(cartItems);
  homeContainer.style.display = "none";
  cartModalDark.style.display = "block";
  orderDetail.style.display = "none";
  filterMenu.style.display = "none";
  heroMenu.style.display = "none";
  containerInfo.style.display = "none";
};
document
  .querySelector(".cart-dark-table")
  .addEventListener("click", async function (e) {
    const btn = e.target.closest(".cart-dark-remove");
    if (btn) {
      const orderItemId = btn.dataset.orderItemId;
      if (!orderItemId) {
        alert("Không tìm thấy order_item_id!");
        return;
      }
      await fetch("http://localhost/webnhahang/BE/api_cart_remove.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
        body: "order_item_id=" + encodeURIComponent(orderItemId),
      });
      openCart();
    }
  });
document
  .querySelector(".cart-dark-table")
  .addEventListener("click", async function (e) {
    const btn = e.target.closest(".qty-plus, .qty-minus");
    if (btn) {
      const orderItemId = btn.dataset.orderItemId;
      const input = btn.parentElement.querySelector("input[type=number]");
      let qty = parseInt(input.value);
      if (btn.classList.contains("qty-plus")) qty++;
      if (btn.classList.contains("qty-minus") && qty > 1) qty--;
      const res = await fetch(
        "http://localhost/webnhahang/BE/api_cart_update.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          credentials: "include",
          body: `order_item_id=${encodeURIComponent(
            orderItemId
          )}&quantity=${qty}`,
        }
      );
      const data = await res.json();
      if (data.success) {
        openCart();
      } else {
        alert(data.message || "Lỗi cập nhật số lượng");
      }
    }
  });
const renderAllPending = (data) => {
  if (!data.success) {
    alert(data.message || "Không tìm thấy đơn hàng");
    return;
  }
  const firstOrderObj = data.orders.find(
    (orderObj) => orderObj.items && orderObj.items.length > 0
  );
  if (!firstOrderObj) {
    alert("Không có sản phẩm nào trong các đơn hàng pending");
    return;
  }
  const order = firstOrderObj.order;
  const allItems = firstOrderObj.items;
  const statusMap = {
    pending: "Đã tiếp nhận",
    in_progress: "đang tiến hành",
    completed: "đã hoàn thành",
  };
  const statusVN = statusMap[order.status] || order.status;

  document.querySelector(
    ".order-status"
  ).innerHTML = `Bàn số: <b>${order.table_id}</b> - Trạng thái: <span>${statusVN}</span>`;

  document.querySelectorAll(
    ".order-method"
  )[0].innerHTML = `Bàn: ${order.table_id}`;
  const tbody = document.querySelector(
    "#order-detail .order-detail-table tbody"
  );
  tbody.innerHTML = allItems
    .map(
      (item) => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${Number(item.price).toLocaleString("vi-VN")} VND</td>
            <td>${Number(item.total).toLocaleString("vi-VN")} VND</td>
        </tr>
    `
    )
    .join("");

  const totalAmount = allItems.reduce(
    (sum, item) => sum + Number(item.total),
    0
  );
  document.querySelector(
    "#order-detail .order-total span"
  ).textContent = `${totalAmount.toLocaleString("vi-VN")} VND`;
  document.querySelector(
    ".order-final"
  ).textContent = `Thành tiền: ${totalAmount.toLocaleString("vi-VN")} VND`;
};

const logoutAcount = async () => {
  try {
    const response = await fetch("http://localhost/webnhahang/BE/logout.php", {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();

    if (data.success) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("table_id");
      localStorage.removeItem("last_order_id");
      toast({
        title: "Thành công",
        message: "Đăng xuất thành công!",
        type: "success",
      });
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 1000);
    } else {
      toast({
        title: "Lỗi",
        message: data.message || "Đăng xuất thất bại!",
        type: "error",
      });
    }
  } catch (error) {
    toast({
      title: "Lỗi",
      message: "Không thể kết nối đến server!",
      type: "error",
    });
  }
};
