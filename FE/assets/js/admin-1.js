// Mở và đóng thanh sidebar
const menuIconButton = document.querySelector(".menu-icon-btn");
const sidebar = document.querySelector(".sidebar");
menuIconButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// Tab cho các phần
const sidebars = document.querySelectorAll(".sidebar-list-item.tab-content");
const sections = document.querySelectorAll(".section");

for (let i = 0; i < sidebars.length; i++) {
  sidebars[i].onclick = function () {
    document
      .querySelector(".sidebar-list-item.active")
      .classList.remove("active");
    document.querySelector(".section.active").classList.remove("active");
    sidebars[i].classList.add("active");
    sections[i].classList.add("active");
  };
}

const closeBtn = document.querySelectorAll(".section");
for (let i = 0; i < closeBtn.length; i++) {
  closeBtn[i].addEventListener("click", (e) => {
    sidebar.classList.add("open");
  });
}

// Chuyển đổi sang định dạng tiền VND
function vnd(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

// Hàm upload ảnh sản phẩm
async function uploadImage(input) {
  const file = input.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("../BE/api_upload_image.php", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (data.success) {
    document.querySelector(".upload-image-preview").src = data.url;
  } else {
    alert(data.message || "Lỗi upload ảnh");
  }
}

// ====================== San pham =========================
let allProducts = [];
let perPage = 12;
let currentPage = 1;

// Lấy giá trị từ form sản phẩm
const getProductFormValues = () => {
  return {
    name: document.getElementById("ten-mon").value.trim(),
    description: document.getElementById("mo-ta").value.trim(),
    category: document.getElementById("chon-mon").value.trim(),
    price: document.getElementById("gia-moi").value.trim(),
    image: document.querySelector(".upload-image-preview").src,
  };
};

// Reset form sản phẩm
const resetProductForm = () => {
  document.getElementById("ten-mon").value = "";
  document.getElementById("mo-ta").value = "";
  document.getElementById("chon-mon").value = "Tất cả";
  document.getElementById("gia-moi").value = "";
  document.querySelector(".upload-image-preview").src =
    "./assets/img/admin/blank-image.png";
};

// Thêm sản phẩm
const addProductBtn = document.getElementById("add-product-button");
if (addProductBtn) {
  addProductBtn.onclick = async function (e) {
    e.preventDefault();
    const values = getProductFormValues();
    const formData = new FormData();
    for (const key in values) formData.append(key, values[key]);
    const res = await fetch("../BE/api_product_add.php", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      toast({
        type: "success",
        message: data.message,
      });
      document.querySelector(".add-product").classList.remove("open");
      resetProductForm();
      showProduct();
    } else {
      toast({
        type: "error",
        message: data.message,
      });
    }
  };
}

// Sửa sản phẩm
const editProduct = async (product_id) => {
  const product = allProducts.find((p) => p.product_id == product_id);
  if (!product) return;
  document.getElementById("ten-mon").value = product.name;
  document.getElementById("mo-ta").value = product.description;
  document.getElementById("chon-mon").value = product.category;
  document.getElementById("gia-moi").value = product.price;
  document.querySelector(".upload-image-preview").src = product.image;
  document
    .querySelectorAll(".add-product-e")
    .forEach((item) => (item.style.display = "none"));
  document
    .querySelectorAll(".edit-product-e")
    .forEach((item) => (item.style.display = "block"));
  document.querySelector(".add-product").classList.add("open");
  document
    .getElementById("update-product-button")
    .setAttribute("data-id", product_id);
};

// Lưu thay đổi sản phẩm
const updateProductBtn = document.getElementById("update-product-button");
if (updateProductBtn) {
  updateProductBtn.onclick = async function (e) {
    e.preventDefault();
    const product_id = this.getAttribute("data-id");
    const values = getProductFormValues();
    const formData = new FormData();
    formData.append("product_id", product_id);
    for (const key in values) formData.append(key, values[key]);
    const res = await fetch("../BE/api_product_update.php", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      toast({
        type: "success",
        message: data.message,
      });
      document.querySelector(".add-product").classList.remove("open");
      resetProductForm();
      showProduct();
    } else {
      toast({
        type: "error",
        message: data.message,
      });
    }
  };
}

// Xóa sản phẩm
const changeStatusProduct = async (product_id) => {
  if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
  const formData = new FormData();
  formData.append("product_id", product_id);
  const res = await fetch("../BE/api_product_delete.php", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (data.success) {
    toast({
      type: "success",
      message: data.message,
    });
    showProduct();
  } else {
    toast({
      type: "error",
      message: data.message,
    });
  }
};
// Hiển thị product khi click qua tab sản phẩm
const showProduct = async () => {
  try {
    const response = await fetch("../BE/api_product.php");
    const data = await response.json();
    allProducts = data;
    currentPage = 1;
    filterAndSearchProduct();
  } catch (error) {
    showProductArr([]);
  }
};
// Lọc và tìm kiếm
const filterAndSearchProduct = () => {
  const category = document.getElementById("the-loai").value.trim();
  const keyword = document
    .getElementById("form-search-product")
    .value.trim()
    .toLowerCase();
  let filtered = allProducts;
  if (category !== "Tất cả") {
    filtered = filtered.filter(
      (product) =>
        (product.category || "").toLowerCase() === category.toLowerCase()
    );
  }
  if (keyword !== "") {
    filtered = filtered.filter((product) =>
      (product.name || "").toLowerCase().includes(keyword)
    );
  }
  currentPage = 1;
  displayList(filtered, perPage, currentPage);
  setupPagination(filtered, perPage);
};
document
  .getElementById("form-search-product")
  .addEventListener("input", filterAndSearchProduct);

// Hiển thị danh sách sản phẩm theo trang
const displayList = (productAll, perPage, currentPage) => {
  let start = (currentPage - 1) * perPage;
  let end = start + perPage;
  let productShow = productAll.slice(start, end);
  showProductArr(productShow);
};

// Thiết lập phân trang
const setupPagination = (productAll, perPage) => {
  document.querySelector(".page-nav-list").innerHTML = "";
  let page_count = Math.ceil(productAll.length / perPage);
  for (let i = 1; i <= page_count; i++) {
    let li = paginationChange(i, productAll);
    document.querySelector(".page-nav-list").appendChild(li);
  }
};
const paginationChange = (page, arr) => {
  let node = document.createElement("li");
  node.classList.add("page-nav-item");
  node.innerHTML = `<a href="#">${page}</a>`;
  if (currentPage == page) node.classList.add("active");
  node.addEventListener("click", function () {
    currentPage = page;
    displayList(arr, perPage, currentPage);
    let t = document.querySelectorAll(".page-nav-item.active");
    for (let i = 0; i < t.length; i++) {
      t[i].classList.remove("active");
    }
    node.classList.add("active");
  });
  return node;
};
// UI sản phẩm khi render
const showProductArr = (arr) => {
  let productHtml = "";
  if (arr.length == 0) {
    productHtml = `<div class="no-result"><div class="no-result-i"><i class="fa-light fa-face-sad-cry"></i></div><div class="no-result-h">Không có sản phẩm để hiển thị</div></div>`;
  } else {
    arr.forEach((product) => {
      productHtml += `
            <div class="list">
                    <div class="list-left">
                    <img src="${product.image}" alt="">
                    <div class="list-info">
                        <h4>${product.name}</h4>
                        <p class="list-note">${product.description}</p>
                        <span class="list-category">${product.category}</span>
                    </div>
                </div>
                <div class="list-right">
                    <div class="list-price">
                    <span class="list-current-price">${vnd(
                      product.price
                    )}</span>                   
                    </div>
                    <div class="list-control">
                    <div class="list-tool">
                        <button class="btn-edit" onclick="editProduct(${
                          product.product_id
                        })"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button class="btn-delete" onclick="changeStatusProduct(${
                          product.product_id
                        })"><i class="fa-regular fa-trash-can"></i></button>
                    </div>                       
                </div>
                </div> 
            </div>`;
    });
  }
  document.getElementById("show-product").innerHTML = productHtml;
};
// Nút đóng modal
document
  .querySelector(".modal-close.product-form")
  .addEventListener("click", () => {
    setDefaultValue();
  });
// Mở cửa sổ thêm sản phẩm mới
let btnAddProduct = document.getElementById("btn-add-product");
btnAddProduct.addEventListener("click", () => {
  document.querySelectorAll(".add-product-e").forEach((item) => {
    item.style.display = "block";
  });
  document.querySelectorAll(".edit-product-e").forEach((item) => {
    item.style.display = "none";
  });
  document.querySelector(".add-product").classList.add("open");
});
let closePopup = document.querySelectorAll(".modal-close");
let modalPopup = document.querySelectorAll(".modal");
for (let i = 0; i < closePopup.length; i++) {
  closePopup[i].onclick = () => {
    modalPopup[i].classList.remove("open");
  };
}
// Reset lam moiw
const cancelSearchProduct = () => {
  document.getElementById("the-loai").value = "Tất cả";
  document.getElementById("form-search-product").value = "";
  filterAndSearchProduct();
  resetProductForm();
};
// =========================== Don hang ==============================
// Hiển thị danh sách đơn hàng
function showOrder(arr) {
  let orderHtml = "";
  if (arr.length == 0) {
    orderHtml = `<td colspan="6">Không có dữ liệu</td>`;
  } else {
    arr.forEach((item) => {
      let status =
        item.trangthai == 0
          ? `<span class="status-no-complete">Chưa xử lý</span>`
          : `<span class="status-complete">Đã xử lý</span>`;
      let date = formatDate(item.thoigiandat);
      orderHtml += `
            <tr>
            <td>${item.id}</td>
            <td>${item.khachhang}</td>
            <td>${date}</td>
            <td>${vnd(item.tongtien)}</td>                               
            <td>${status}</td>
            <td class="control">
            <button class="btn-detail" id="" onclick="detailOrder('${
              item.id
            }')"><i class="fa-regular fa-eye"></i> Chi tiết</button>
            </td>
            </tr>      
            `;
    });
  }
  document.getElementById("showOrder").innerHTML = orderHtml;
}

let orders = localStorage.getItem("order")
  ? JSON.parse(localStorage.getItem("order"))
  : [];
window.onload = showOrder(orders);

// Hiển thị chi tiết đơn hàng
function detailOrder(id) {
  document.querySelector(".modal.detail-order").classList.add("open");
  let orders = localStorage.getItem("order")
    ? JSON.parse(localStorage.getItem("order"))
    : [];
  let products = localStorage.getItem("order")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  // Lấy hóa đơn
  let order = orders.find((item) => item.id == id);
  // Lấy chi tiết hóa đơn
  let ctDon = getOrderDetails(id);
  let spHtml = `<div class="modal-detail-left"><div class="order-item-group">`;

  ctDon.forEach((item) => {
    let detaiSP = products.find((product) => product.id == item.id);
    spHtml += `<div class="order-product">
            <div class="order-product-left">
                <img src="${detaiSP.img}" alt="">
                <div class="order-product-info">
                    <h4>${detaiSP.title}</h4>
                    <p class="order-product-note"><i class="fa-light fa-pen"></i> ${
                      item.note
                    }</p>
                    <p class="order-product-quantity">SL: ${item.soluong}<p>
                </div>
            </div>
            <div class="order-product-right">
                <div class="order-product-price">
                    <span class="order-product-current-price">${vnd(
                      item.price
                    )}</span>
                </div>                         
            </div>
        </div>`;
  });
  spHtml += `</div></div>`;
  spHtml += `<div class="modal-detail-right">
        <ul class="detail-order-group">
            <li class="detail-order-item">
                <span class="detail-order-item-left"><i class="fa-light fa-calendar-days"></i> Ngày đặt hàng</span>
                <span class="detail-order-item-right">${formatDate(
                  order.thoigiandat
                )}</span>
            </li>
            <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-thin fa-person"></i> Người nhận</span>
            <span class="detail-order-item-right">${order.tenguoinhan}</span>
            </li>
            <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-light fa-phone"></i> Số điện thoại</span>
            <span class="detail-order-item-right">${order.sdtnhan}</span>
            </li>
            <li class="detail-order-item tb">
                <span class="detail-order-item-t"><i class="fa-light fa-location-dot"></i> Bàn </span>
                <p class="detail-order-item-b">${order.diachinhan}</p>
            </li>
            <li class="detail-order-item tb">
                <span class="detail-order-item-t"><i class="fa-light fa-note-sticky"></i> Ghi chú</span>
                <p class="detail-order-item-b">${order.ghichu}</p>
            </li>
        </ul>
    </div>`;
  document.querySelector(".modal-detail-order").innerHTML = spHtml;

  let classDetailBtn = order.trangthai == 0 ? "btn-chuaxuly" : "btn-daxuly";
  let textDetailBtn = order.trangthai == 0 ? "Chưa xử lý" : "Đã xử lý";
  document.querySelector(
    ".modal-detail-bottom"
  ).innerHTML = `<div class="modal-detail-bottom-left">
        <div class="price-total">
            <span class="thanhtien">Thành tiền</span>
            <span class="price">${vnd(order.tongtien)}</span>
        </div>
    </div>
    <div class="modal-detail-bottom-right">
        <button class="modal-detail-btn ${classDetailBtn}" onclick="changeStatus('${
    order.id
  }',this)">${textDetailBtn}</button>
    </div>`;
}

// Hiển thị chi tiết đơn hàng của một sản phẩm
function detailOrderProduct(arr, id) {
  let orderHtml = "";
  arr.forEach((item) => {
    if (item.id == id) {
      orderHtml += `<tr>
            <td>${item.madon}</td>
            <td>${item.quantity}</td>
            <td>${vnd(item.price)}</td>
            <td>${formatDate(item.time)}</td>
            </tr>      
            `;
    }
  });
  document.getElementById("show-product-order-detail").innerHTML = orderHtml;
  document.querySelector(".modal.detail-order-product").classList.add("open");
}

// =============================== THONG KE ==================================
// Hiển thị kết quả thống kê
function showThongKe(arr, mode) {
  let orderHtml = "";
  let mergeObj = mergeObjThongKe(arr);
  showOverview(mergeObj);

  switch (mode) {
    case 0:
      mergeObj = mergeObjThongKe(createObj());
      showOverview(mergeObj);
      document.getElementById("the-loai-tk").value = "Tất cả";
      document.getElementById("form-search-tk").value = "";
      document.getElementById("time-start-tk").value = "";
      document.getElementById("time-end-tk").value = "";
      break;
    case 1:
      mergeObj.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));
      break;
    case 2:
      mergeObj.sort((a, b) => parseInt(b.quantity) - parseInt(a.quantity));
      break;
  }
  for (let i = 0; i < mergeObj.length; i++) {
    orderHtml += `
        <tr>
        <td>${i + 1}</td>
        <td><div class="prod-img-title"><img class="prd-img-tbl" src="${
          mergeObj[i].img
        }" alt=""><p>${mergeObj[i].title}</p></div></td>
        <td>${mergeObj[i].quantity}</td>
        <td>${vnd(mergeObj[i].doanhthu)}</td>
        <td><button class="btn-detail product-order-detail" data-id="${
          mergeObj[i].id
        }"><i class="fa-regular fa-eye"></i> Chi tiết</button></td>
        </tr>      
        `;
  }
  document.getElementById("showTk").innerHTML = orderHtml;
  document.querySelectorAll(".product-order-detail").forEach((item) => {
    let idProduct = item.getAttribute("data-id");
    item.addEventListener("click", () => {
      detailOrderProduct(arr, idProduct);
    });
  });
}
// ======================================== NHAN VIEN =============================

document
  .querySelector(".modal.signup .modal-close")
  .addEventListener("click", () => {
    signUpFormReset();
  });

// Mở form tạo tài khoản mới
function openCreateAccount() {
  document.querySelector(".signup").classList.add("open");
  document.querySelectorAll(".edit-account-e").forEach((item) => {
    item.style.display = "none";
  });
  document.querySelectorAll(".add-account-e").forEach((item) => {
    item.style.display = "block";
  });
}

// Đặt lại form đăng ký
function signUpFormReset() {
  document.getElementById("fullname").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("password").value = "";
  document.querySelector(".form-message-name").innerHTML = "";
  document.querySelector(".form-message-phone").innerHTML = "";
  document.querySelector(".form-message-password").innerHTML = "";
}

// Hiển thị danh sách người dùng
function showUserArr(arr) {
  let accountHtml = "";
  if (arr.length == 0) {
    accountHtml = `<td colspan="5">Không có dữ liệu</td>`;
  } else {
    arr.forEach((account, index) => {
      let tinhtrang =
        account.status == 0
          ? `<span class="status-no-complete">Bị khóa</span>`
          : `<span class="status-active">Hoạt động</span>`;
      accountHtml += ` <tr>
            <td>${index + 1}</td>
            <td>${account.fullname}</td>
            <td>${account.phone}</td>
            <td>${formatDate(account.join)}</td>
            <td>${tinhtrang}</td>
            <td class="control control-table">
            <button class="btn-edit" id="edit-account" onclick='editAccount(${
              account.phone
            })' ><i class="fa-light fa-pen-to-square"></i></button>
            <button class="btn-delete" id="delete-account" onclick="deleteAcount(${index})"><i class="fa-regular fa-trash"></i></button>
            </td>
        </tr>`;
    });
  }
  document.getElementById("show-user").innerHTML = accountHtml;
}
// Tuyết Băng: START hiển thị và chỉnh sửa nhân viên (sửa dùng modal)
let allStaffData = [];
let filteredStaffData = [];

async function loadStaffList() {
  const res = await fetch("../BE/staff.php");
  const json = await res.json();
  if (json.status !== "ok") {
    toast({ type: "error", message: "Không tải được danh sách nhân viên!" });
    return;
  }
  allStaffData = json.data;
  filterAndSearchStaff();
}

function filterAndSearchStaff() {
  const statusFilter = document.getElementById("tinh-trang-user")?.value || "2";
  const searchTerm =
    document.getElementById("form-search-user")?.value.toLowerCase().trim() ||
    "";

  filteredStaffData = allStaffData.filter((staff) => {
    let matchesStatus =
      statusFilter === "2" ||
      (statusFilter === "1" && staff.status === "active") ||
      (statusFilter === "0" && staff.status === "inactive");

    const matchesSearch = staff.fullname.toLowerCase().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  displayStaffList(filteredStaffData);
}

function displayStaffList(staffsToDisplay) {
  const tbody = document.getElementById("show-user");
  tbody.innerHTML = "";

  if (staffsToDisplay.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6">Không có nhân viên nào phù hợp với điều kiện tìm kiếm.</td></tr>';
    return;
  }

  let stt = 1;
  staffsToDisplay.forEach((staff) => {
    const statusClass =
      staff.status === "active" ? "status-active" : "status-inactive";
    const statusText = staff.status === "active" ? "Hoạt động" : "Bị khóa";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${stt++}</td>
      <td>${staff.fullname}</td>
      <td>${staff.phone}</td>
      <td>${staff.position}</td>
      <td><span class="${statusClass}">${statusText}</span></td>
      <td class="control">
       <button class="btn-edit-staff" style="border-radius:15px;" onclick='openEditStaffModal(${JSON.stringify(
         staff
       )})'>
          <i class="fa-regular fa-pen-to-square"></i>
          
        </button>
        <button class="btn-delete-staff" style="border-radius:15px;" onclick='deleteStaff(${
          staff.staff_id
        })'>
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openEditStaffModal(staff) {
  const modal = document.querySelector(".modal.signup");
  modal.classList.add("open");

  // Chuyển sang chế độ chỉnh sửa
  document
    .querySelectorAll(".edit-account-e")
    .forEach((e) => (e.style.display = "block"));
  document
    .querySelectorAll(".add-account-e")
    .forEach((e) => (e.style.display = "none"));

  // Gán dữ liệu
  document.getElementById("fullname").value = staff.fullname;
  document.getElementById("phone").value = staff.phone;
  document.getElementById("password").value = staff.position;
  document.getElementById("user-status").checked = staff.status === "active";

  // Gán ID
  document
    .getElementById("btn-update-account")
    .setAttribute("data-id", staff.staff_id);
}

document
  .getElementById("btn-update-account")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const staff_id = this.getAttribute("data-id");

    const payload = {
      staff_id,
      fullname: document.getElementById("fullname").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      position: document.getElementById("password").value.trim(),
      status: document.getElementById("user-status").checked
        ? "active"
        : "inactive",
    };

    const res = await fetch("../BE/update_staff.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const resText = await res.text();
    try {
      const json = JSON.parse(resText);
      if (json.status === "ok") {
        toast({ type: "success", message: "Cập nhật thành công!" });
        document.querySelector(".modal.signup").classList.remove("open");
        loadStaffList();
      } else {
        toast({ type: "error", message: "Lỗi cập nhật: " + json.message });
      }
    } catch (err) {
      toast({ type: "error", message: "Lỗi không xác định từ server" });
    }
  });

document.addEventListener("DOMContentLoaded", async () => {
  loadStaffList();

  const staffStatusFilter = document.getElementById("tinh-trang-user");
  staffStatusFilter?.addEventListener("change", filterAndSearchStaff);

  const staffSearchInput = document.getElementById("form-search-user");
  staffSearchInput?.addEventListener("input", filterAndSearchStaff);

  const staffClearSearchButton = document.querySelector(".btn-reset-order");
  staffClearSearchButton?.addEventListener("click", () => {
    staffSearchInput.value = "";
    staffStatusFilter.value = "2";
    filterAndSearchStaff();
  });
});
// Tuyết Băng: END hiển thị và chỉnh sửa nhân viên (dùng modal)
