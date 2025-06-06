const formatCurrency = value =>
    Number(value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

document.addEventListener('DOMContentLoaded', () => {
    const containerProduct = document.getElementById('container-product');
    const orderModalOverlay = document.getElementById('orderModalOverlay');
    const orderModalClose = document.getElementById('orderModalClose');
    const orderModal = document.getElementById('orderModal');
    const openCartProduct = document.querySelectorAll('.food-card__order-btn');

    openCartProduct.forEach(btn =>
        btn.addEventListener('click', () => toggleModalVisibility(true))
    );

    if (orderModalClose)
        orderModalClose.addEventListener('click', () => {
            if (orderModal) orderModal.style.display = 'none';
            if (orderModalOverlay) orderModalOverlay.style.display = 'none';
        });

    if (orderModalOverlay)
        orderModalOverlay.addEventListener('click', () => {
            if (orderModal) orderModal.style.display = 'none';
            orderModalOverlay.style.display = 'none';
        });

    function toggleModalVisibility(show) {
        containerProduct.style.opacity = show ? '1' : '0';
        containerProduct.style.visibility = show ? 'visible' : 'hidden';
    }
});

// Slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const slideInterval = 2500;

const updateSlider = () => {
    slider.style.transform = `translateX(-${currentSlide * 25}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
};

const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
};

let slideTimer = setInterval(nextSlide, slideInterval);

dots.forEach((dot, i) =>
    dot.addEventListener('click', () => {
        currentSlide = i;
        updateSlider();
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideInterval);
    })
);

// Hiển thị các khu vực giao diện
const homeContainer = document.getElementById('home--container');
const cartModalDark = document.getElementById('cartModalDark');
const orderDetail = document.getElementById('order-detail');
const filterMenu = document.getElementById('filter-menu');
const heroTop = document.getElementById('hero-top');
const heroMenu = document.getElementById('hero--bottom_menu');
const containerInfo = document.getElementById('container--info');
const containerDonHangMua = document.getElementById("container-donhang-mua");


const hadndleQuayLai = () => {
    homeContainer.style.display = 'block';
    cartModalDark.style.display = 'none';
    filterMenu.style.display = 'block';
    heroTop.style.display = 'none';
    heroMenu.style.display = 'block';
    containerDonHangMua.style.display = "none";
};

const handleDatThemMon = () => {
    homeContainer.style.display = 'block';
    cartModalDark.style.display = 'none';
    filterMenu.style.display = 'block';
    heroTop.style.display = 'none';
    heroMenu.style.display = 'block';
    containerDonHangMua.style.display = "none";

};


const handleInfo = () => {
    homeContainer.style.display = "none";
    filterMenu.style.display = "none";
    heroMenu.style.display = "none";
    cartModalDark.style.display = "none";
    orderDetail.style.display = "none";
    containerInfo.style.display = "block";
    containerDonHangMua.style.display = "none";

    try {
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

// Navigation links và modal bàn
document.addEventListener('DOMContentLoaded', () => {
    const chooseMenuLink = document.getElementById('chooseMenuLink');
    const chooseMenuLinkMobile = document.getElementById('chooseMenuLinkMobile');
    const chooseTableLink = document.getElementById('chooseTableLink');
    const chooseTableLinkMobile = document.getElementById('chooseTableLinkMobile');
    const modal = document.getElementById('tableModal');
    const closeChonban = document.querySelector('.modal--close-chonban');
    const actionNav = document.getElementById('action-nav');

    const handleMenuClick = e => {
        e.preventDefault();
        filterMenu.style.display = 'block';
        heroMenu.style.display = 'block';
        heroTop.style.display = 'none';
        orderDetail.style.display = 'none';
        cartModalDark.style.display = 'none';
        containerDonHangMua.style.display = "none";

        if (actionNav.checked) actionNav.checked = false;
    };

    const handleTableClick = async e => {
        e.preventDefault();
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            toast({
                title: 'Thông báo',
                message: 'Bạn cần đăng nhập để chọn bàn!',
                type: 'warning'
            });
            return;
        }

        const currentTableId = localStorage.getItem('table_id');

        if (currentTableId) {
            try {
                const cartItems = await fetchCart();

                if (cartItems.length > 0) {
                    toast({
                        title: 'Thông báo',
                        message: 'Bạn đã chọn bàn và có sản phẩm trong giỏ, không thể chọn lại bàn!',
                        type: 'warning'
                    });
                    return; // Dừng, không mở modal chọn bàn
                } else {
                    // Giỏ hàng trống, cho phép chọn lại bàn
                    const modal = document.getElementById('tableModal');
                    modal.style.display = 'block';
                    fetchAndRenderTables();
                }
            } catch (error) {
                console.error('Lỗi kiểm tra giỏ hàng:', error);
                toast({
                    title: 'Lỗi',
                    message: 'Không thể kiểm tra giỏ hàng, vui lòng thử lại!',
                    type: 'error'
                });
            }
        } else {
            // Chưa chọn bàn lần nào, mở modal bình thường
            const modal = document.getElementById('tableModal');
            modal.style.display = 'block';
            fetchAndRenderTables();
        }
    };


    chooseMenuLink.onclick = chooseMenuLinkMobile.onclick = handleMenuClick;
    chooseTableLink.onclick = chooseTableLinkMobile.onclick = handleTableClick;
    closeChonban.onclick = () => (modal.style.display = 'none');
});



// Fetch sản phẩm
const fetchProducts = async () => {
    try {
        const res = await fetch('http://localhost/webnhahang/BE/api_product.php');
        if (!res.ok) throw new Error('Network response was not ok');
        return await res.json();
    } catch (err) {
        console.error('Error fetching products:', err);
        return [];
    }
};

// Render sản phẩm
const renderProduct = product => `
  <div class="outMenu--item" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
    <img src="${product.image}" alt="${product.name}" class="food-card__image">
    <div class="food-card__content">
      <h3 class="food-card__title">${product.name}</h3>
      <p class="food-card__price">${formatCurrency(product.price)}</p>
      <button class="food-card__order-btn" onclick="showProductDetail(${product.product_id})">ĐẶT MÓN</button>
    </div>
  </div>
`;

// Fetch chi tiết sản phẩm
const fetchProductById = async id => {
    const res = await fetch(`http://localhost/webnhahang/BE/api_product.php?id=${id}`);
    if (!res.ok) throw new Error('Không lấy được sản phẩm');
    return res.json();
};

// Render modal chi tiết sản phẩm
const renderProductDetailModal = product => {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
    <div class="order-modal__overlay" id="orderModalOverlay"></div>
    <div class="order-modal" id="orderModal">
      <button class="order-modal__close" id="orderModalCloseProdcut" aria-label="Đóng">&times;</button>
      <div class="order-modal__img-wrap">
        <img src="${product.image}" alt="Ảnh món ăn" class="order-modal__img" id="orderModalImg">
      </div>
      <div class="order-modal__content">
        <div class="order-modal__info">
          <h2 class="order-modal__title" id="orderModalTitle">${product.name || ''}</h2>
          <div class="order-modal__price" id="orderModalPrice">${formatCurrency(product.price || 0)}</div>
          <div class="order-modal__desc" id="orderModalDesc">${product.description || ''}</div>
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
            <span id="orderModalTotal">${formatCurrency(product.price || 0)}</span>
          </div>
          <button class="order-modal__order-btn" id="orderModalOrderBtn" data-product-id="${product.product_id}">
            Đặt hàng  <i class="fas fa-shopping-basket"></i>
          </button>
        </div>
      </div>
    </div>
  `;

    document.getElementById('orderModalCloseProdcut').onclick = closeOrderModal;
    document.getElementById('orderModalOverlay').onclick = closeOrderModal;

    const qtyInput = document.getElementById('orderModalQty');
    const updateTotal = () => {
        const qty = Math.max(1, parseInt(qtyInput.value) || 1);
        qtyInput.value = qty;
        document.getElementById('orderModalTotal').textContent = formatCurrency(product.price * qty);
    };

    qtyInput.oninput = updateTotal;
    document.getElementById('orderModalMinus').onclick = () => {
        let qty = Math.max(1, parseInt(qtyInput.value) || 1);
        if (qty > 1) {
            qtyInput.value = qty - 1;
            updateTotal();
        }
    };
    document.getElementById('orderModalPlus').onclick = () => {
        let qty = Math.max(1, parseInt(qtyInput.value) || 1);
        qtyInput.value = qty + 1;
        updateTotal();
    };

    const orderBtn = document.getElementById('orderModalOrderBtn');
    if (orderBtn) {
        orderBtn.onclick = () => {
            const qty = parseInt(document.getElementById('orderModalQty').value) || 1;
            const items = [{
                product_id: product.product_id,
                quantity: qty
            }];
            handdlAddCard(items);
        };
    }
};

const closeOrderModal = () => {
    document.getElementById('modal-root').innerHTML = '';
};

window.showProductDetail = async productId => {
    try {
        const product = await fetchProductById(productId);
        renderProductDetailModal(product);
    } catch (error) {
        alert('Lỗi khi tải sản phẩm');
        console.error(error);
    }
};

// Phân trang sản phẩm
let currentPage = 1;
const productsPerPage = 12;
let allProducts = [];

document.addEventListener('DOMContentLoaded', async () => {
    allProducts = await fetchProducts();
    renderProductsPage(currentPage);
});

// --- Lọc và tìm kiếm sản phẩm ---
let filteredProducts = [];

function filterByCategory(type) {
    if (type === 'all') {
        filteredProducts = allProducts;
    } else {
        filteredProducts = allProducts.filter(p => (p.category && p.category.toLowerCase() === type.toLowerCase()));
    }
    currentPage = 1;
    renderProductsPage(currentPage, filteredProducts);
}

function searchProducts(keyword) {
    const search = keyword.trim().toLowerCase();
    filteredProducts = allProducts.filter(p => p.name.toLowerCase().includes(search));
    currentPage = 1;
    renderProductsPage(currentPage, filteredProducts);
}

function renderProductsPage(page, products = allProducts) {
    const productContainer = document.querySelector('.outMenu--list');
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = products.slice(start, end);

    if (productContainer) {
        productContainer.innerHTML = productsToShow.length
            ? productsToShow.map(renderProduct).join('')
            : '<p style="color: white;">Không có sản phẩm nào</p>';
    }
    renderPagination(products);
}

function renderPagination(products = allProducts) {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const paginationContainer = document.querySelector('.list--action_page');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = Array.from({ length: totalPages }, (_, i) => i + 1)
        .map(i => `<a href="#menu-section" class="action_page--item${i === currentPage ? ' active' : ''}" onclick="goToPage(${i}, filteredProducts.length ? filteredProducts : allProducts)">${i}</a>`)
        .join('');
}

window.goToPage = (page, products = filteredProducts.length ? filteredProducts : allProducts) => {
    currentPage = page;
    renderProductsPage(currentPage, products);
};

// Sự kiện click vào loại sản phẩm
setTimeout(() => {
    document.querySelectorAll('.menu-filter__category').forEach(category => {
        category.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.menu-filter__category').forEach(c => c.classList.remove('menu-filter__category--active'));
            this.classList.add('menu-filter__category--active');
            const type = this.getAttribute('data-type');
            filterByCategory(type);
            document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
    // Sự kiện tìm kiếm
    const searchInput = document.querySelector('.menu-filter__search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const keyword = this.value;
            searchProducts(keyword);
            document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
}, 300);

// API Bàn
async function fetchAndRenderTables() {
    try {
        const res = await fetch('http://localhost/webnhahang/BE/tables.php');
        const tables = await res.json();
        renderTables(tables);
    } catch (error) {
        console.error('Error loading tables:', error);
    }
}

const statusText = {
    available: 'Còn trống',
    occupied: 'Đang sử dụng',
    reserved: 'Đã đặt trước',
};

const renderTables = tables => {
    const grid = document.getElementById('tableGrid');
    grid.innerHTML = '';
    tables.forEach(table => {
        const div = document.createElement('div');
        div.className = `table ${table.status}`;
        div.innerHTML = `<div class="nameTable">${table.name}</div><div>${statusText[table.status]}</div>`;
        div.onclick = () => {
            if (table.status === 'available') {
                showTableConfirmation(table);
            }
        };
        grid.appendChild(div);
    });
};

const showTableConfirmation = (table) => {
    const modalRoot = document.getElementById('modal-root');
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

    // Đóng modal
    document.getElementById('orderModalOverlay').onclick = closeOrderModal;
    document.getElementById('orderModalCloseTable').onclick = closeOrderModal;

    // Xử lý khi bấm "Xác nhận" => cập nhật trạng thái bàn = occupied
    document.getElementById('confirmTableBtn').onclick = () => {
        updateTableStatus(table.id, 'occupied', table.name, "chọn");
    };

    // Xử lý khi bấm "Đặt bàn" => cập nhật trạng thái bàn = reserved
    document.getElementById('datBanBtn').onclick = () => {
        updateTableStatus(table.id, 'reserved', table.name, "đặt");
    };
}
async function checkUserAndTable() {
    const res = await fetch('http://localhost/webnhahang/BE/checkin.php', {
        method: 'GET',
        credentials: 'include', // gửi cookie session
    });
    const data = await res.json();

    if (!data.logged_in) {
        toast({ title: 'Lỗi', message: 'Bạn chưa đăng nhập', type: 'error' });
        // chuyển hướng hoặc mở modal login
    } else if (!data.table_selected) {
        toast({ title: 'Lỗi', message: 'Bạn chưa chọn bàn', type: 'error' });
        // chuyển hướng hoặc mở modal chọn bàn
    } else {
        toast({ title: 'Thành công', message: 'Bạn đã đăng nhập và chọn bàn', type: 'success' });
        // tiếp tục xử lý đặt món...
    }
}

async function updateTableStatus(tableId, status, tableName, actionWord) {
    try {
        // Lấy bàn cũ đã chọn trước đó
        const oldTableId = localStorage.getItem('table_id');

        // Nếu bàn cũ tồn tại và khác bàn mới thì reset bàn cũ về 'available'
        if (oldTableId && oldTableId !== tableId.toString()) {
            const resetOldTable = await fetch('http://localhost/webnhahang/BE/update_table.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    table_id: oldTableId,
                    status: 'available'
                })
            });
            const resetOldTableData = await resetOldTable.json();
            if (!resetOldTableData.success) {
                throw new Error('Không thể reset bàn cũ về trạng thái còn trống');
            }
        }

        // Cập nhật bàn mới
        const res = await fetch('http://localhost/webnhahang/BE/update_table.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                table_id: tableId,
                status: status
            })
        });
        const data = await res.json();
        if (!data.success) {
            throw new Error(data.message || 'Cập nhật trạng thái bàn thất bại');
        }

        // Gọi API cập nhật session chọn bàn
        const res2 = await fetch('http://localhost/webnhahang/BE/select_table.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ table_id: tableId })
        });
        const data2 = await res2.json();
        if (!data2.success) {
            throw new Error(data2.message || 'Không thể cập nhật thông tin bàn');
        }

        // Lưu bàn mới vào localStorage
        localStorage.setItem('table_id', tableId);

        toast({
            title: 'Thành công',
            message: `Bạn đã ${actionWord} bàn ${tableName} thành công`,
            type: 'success'
        });

        closeOrderModal();
        fetchAndRenderTables();

    } catch (error) {
        console.error('Error:', error);
        toast({
            title: 'Lỗi',
            message: error.message || 'Không thể kết nối đến server',
            type: 'error'
        });
    }
}

const handdlAddCard = async (items) => {
    const userId = localStorage.getItem('user_id');
    const tableId = localStorage.getItem('table_id');

    if (!userId) {
        toast({
            title: 'Cảnh báo',
            message: 'Bạn cần đăng nhập để đặt món',
            type: 'warning'
        });
        return;
    }
    if (!tableId) {
        toast({
            title: 'Cảnh báo',
            message: 'Bạn cần chọn bàn trước khi đặt món',
            type: 'warning'
        });
        return;
    }

    try {
        const currentCart = await fetchCart();
        const existingItem = currentCart.find(item => item.product_id === items[0].product_id);

        if (existingItem) {
            const newQuantity = existingItem.quantity + items[0].quantity;
            const response = await fetch('http://localhost/webnhahang/BE/api_cart_update.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                credentials: 'include',
                body: `order_item_id=${existingItem.order_item_id}&quantity=${newQuantity}`
            });
            const data = await response.json();
            if (data.success) {
                toast({
                    title: 'Thành công',
                    message: 'Đã cập nhật số lượng sản phẩm trong giỏ hàng',
                    type: 'success'
                });
            } else {
                toast({
                    title: 'Lỗi',
                    message: data.message || 'Không thể cập nhật số lượng',
                    type: 'error'
                });
            }
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới
            const response = await fetch('http://localhost/webnhahang/BE/api_order.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    items
                }),
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('last_order_id', data.order_id);
                toast({
                    title: 'Thành công',
                    message: 'Đặt món thành công',
                    type: 'success'
                });
            } else {
                toast({
                    title: 'Lỗi',
                    message: data.message,
                    type: 'error'
                });
            }
        }
    } catch (error) {
        toast({
            title: 'Lỗi',
            message: 'Lỗi kết nối máy chủ',
            type: 'error'
        });
    }
};
async function fetchCart() {
    const res = await fetch('http://localhost/webnhahang/BE/api_cart.php', {
        credentials: 'include'
    });
    return await res.json();
}
function renderCart(cartItems) {
    const tbody = document.querySelector('.cart-dark-table tbody');
    tbody.innerHTML = cartItems.map(item => `
        <tr>
            <td>
                <button class="cart-dark-remove" data-order-item-id="${item.order_item_id}">
                    <img src="./assets/icons/Delete.svg" alt="">
                </button>
            </td>
            <td class="cart-dark-food" data-label="Món">
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
            </td>
            <td data-label="Đơn giá">${Number(item.price).toLocaleString('vi-VN')}</td>
            <td data-label="Số lượng">
                <div class="cart-dark-qty">
                    <button class="qty-minus" data-order-item-id="${item.order_item_id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" data-order-item-id="${item.order_item_id}">
                    <button class="qty-plus" data-order-item-id="${item.order_item_id}">+</button>
                </div>
            </td>
            <td data-label="Tổng tiền">${(item.price * item.quantity).toLocaleString('vi-VN')}</td>
        </tr>
    `).join('');
    // Render tổng số lượng và tổng tiền
    const totalQty = cartItems.reduce((sum, i) => sum + Number(i.quantity), 0);
    const totalAmount = cartItems.reduce((sum, i) => sum + Number(i.price) * Number(i.quantity), 0);
    document.querySelector('.totalproduct--main-amout').textContent = totalQty;
    document.querySelectorAll('.totalproduct--main-amout')[1].textContent = totalAmount.toLocaleString('vi-VN') + ' VND';
}
const openCart = async () => {
    const cartItems = await fetchCart();
    renderCart(cartItems);
    homeContainer.style.display = 'none';
    cartModalDark.style.display = 'block';
    orderDetail.style.display = 'none';
    filterMenu.style.display = 'none';
    heroMenu.style.display = 'none';
    containerInfo.style.display = 'none';
}
document.querySelector('.cart-dark-table').addEventListener('click', async function (e) {
    const btn = e.target.closest('.cart-dark-remove');
    if (btn) {
        const orderItemId = btn.dataset.orderItemId;
        if (!orderItemId) {
            alert('Không tìm thấy order_item_id!');
            return;
        }
        await fetch('http://localhost/webnhahang/BE/api_cart_remove.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            credentials: 'include',
            body: 'order_item_id=' + encodeURIComponent(orderItemId)
        });
        openCart();
    }
});
document.querySelector('.cart-dark-table').addEventListener('click', async function (e) {
    const btn = e.target.closest('.qty-plus, .qty-minus');
    if (btn) {
        const orderItemId = btn.dataset.orderItemId;
        const input = btn.parentElement.querySelector('input[type=number]');
        let qty = parseInt(input.value);
        if (btn.classList.contains('qty-plus')) qty++;
        if (btn.classList.contains('qty-minus') && qty > 1) qty--;
        // Gửi API cập nhật
        const res = await fetch('http://localhost/webnhahang/BE/api_cart_update.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            credentials: 'include',
            body: `order_item_id=${encodeURIComponent(orderItemId)}&quantity=${qty}`
        });
        const data = await res.json();
        if (data.success) {
            openCart(); // Reload lại giỏ hàng
        } else {
            alert(data.message || 'Lỗi cập nhật số lượng');
        }
    }
});
async function fetchAllPendingOrders() {
    const res = await fetch('http://localhost/webnhahang/BE/api_order_detail.php', {
        credentials: 'include'
    });
    return await res.json();
}
let totalAmountGlobal = 0;

function renderAllPendingItemsAsOneTable(data) {
    if (!data.success) {
        alert(data.message || 'Không tìm thấy đơn hàng');
        return;
    }

    const rankName = localStorage.getItem('rank_name');
    const discount = parseFloat(localStorage.getItem('discount'));
    // Tìm đơn hàng đầu tiên có sản phẩm
    const firstOrderObj = data.orders.find(orderObj => orderObj.items && orderObj.items.length > 0);
    if (!firstOrderObj) {
        alert('Không có sản phẩm nào trong các đơn hàng pending');
        return;
    }
    const order = firstOrderObj.order;
    const allItems = firstOrderObj.items;
    const statusMap = {
        pending: 'Đã tiếp nhận',
        in_progress: 'đang tiến hành',
        completed: 'đã hoàn thành'
    };
    const statusVN = statusMap[order.status] || order.status;

    document.querySelector('.order-status').innerHTML =
        `Bàn số: <b>${order.table_id}</b> - Trạng thái: <span>${statusVN}</span>`;

    // Hiển thị bàn ở phần tóm tắt
    document.querySelectorAll('.order-method')[0].innerHTML = `Bàn: ${order.table_id}`;
    // Render vào bảng duy nhất
    const tbody = document.querySelector('#order-detail .order-detail-table tbody');
    tbody.innerHTML = allItems.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${Number(item.price).toLocaleString('vi-VN')} VND</td>
            <td>${Number(item.total).toLocaleString('vi-VN')} VND</td>
        </tr>
    `).join('');

    // Render tổng số lượng, tổng tiền (nếu muốn)
    const sumAmount = allItems.reduce((sum, item) => sum + Number(item.total), 0);
    const totalAmount = sumAmount - ((sumAmount * discount) / 100);
    totalAmountGlobal = Math.round(totalAmount); // Lưu lại để dùng khi thanh toán

    document.querySelector('#order-detail .order-total span').textContent = `${sumAmount.toLocaleString('vi-VN')} VND`;
    if (rankName && discount) {
        const promoInput = document.querySelector('input[placeholder="Mã khuyến mại"]');
        if (promoInput) {
            promoInput.value = `Hạng quý khách ${rankName} giảm ${discount}%`;
            promoInput.readOnly = true;
        }
    }
    document.querySelector('.order-final').textContent = `Thành tiền: ${totalAmount.toLocaleString('vi-VN')} VND`;
}

function handleThanhToan() {
    const paymentMethod = document.getElementById('payment-method').value;
    const finalAmount = document.querySelector('.order-final').textContent.replace(/[^0-9]/g, '');
    if (paymentMethod === 'vnpay') {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '../BE/vnpay.php';

        const amountInput = document.createElement('input');
        amountInput.type = 'hidden';
        amountInput.name = 'amount';
        amountInput.value = finalAmount;

        form.appendChild(amountInput);
        document.body.appendChild(form);
        form.submit();
    } else if (paymentMethod === 'cash') {
        fetch('../BE/api_thanhtoan.php', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: finalAmount })

        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast({
                        title: 'Thanh toán tiền mặt',
                        message: 'Mời bạn thanh toán tiền tại quầy!',
                        type: 'warning'
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else {
                    toast({
                        title: 'Lỗi',
                        message: data.message,
                        type: 'error'
                    });
                }
            })
            .catch(() => {
                toast({
                    title: 'Lỗi',
                    message: 'Không thể kết nối máy chủ!',
                    type: 'error'
                });
            });
    }
}
async function hadndleDatMua() {
    const data = await fetchAllPendingOrders();
    renderAllPendingItemsAsOneTable(data);
    orderDetail.style.display = 'block';
    cartModalDark.style.display = 'none';
}

const logoutAcount = async () => {
    try {
        const response = await fetch('http://localhost/webnhahang/BE/logout.php', {
            method: 'POST',
            credentials: 'include'
        });
        const data = await response.json();

        if (data.success) {
            // Xóa dữ liệu local storage
            localStorage.removeItem('user_id');
            localStorage.removeItem('table_id');
            localStorage.removeItem('last_order_id');
            localStorage.removeItem('discount');
            localStorage.removeItem('rank_name');
            toast({
                title: 'Thành công',
                message: 'Đăng xuất thành công!',
                type: 'success'
            });

            setTimeout(() => {
                window.location.href = './index.html';
            }, 1000);
        } else {
            toast({
                title: 'Lỗi',
                message: data.message || 'Đăng xuất thất bại!',
                type: 'error'
            });
        }
    } catch (error) {
        toast({
            title: 'Lỗi',
            message: 'Không thể kết nối đến server!',
            type: 'error'
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success' && urlParams.get('phone')) {
        const phone = urlParams.get('phone');
        toast({
            title: 'Thanh toán thành công',
            message: `Đơn hàng của bạn đã được thanh toán thành công! SĐT: ${phone}`,
            type: 'success'
        });
    }
});

function handleOrders() {
    // Ẩn các section khác nếu có
    if (homeContainer) homeContainer.style.display = 'none';
    if (cartModalDark) cartModalDark.style.display = 'none';
    if (orderDetail) orderDetail.style.display = 'none';
    if (filterMenu) filterMenu.style.display = 'none';
    if (heroTop) heroTop.style.display = 'none';
    if (heroMenu) heroMenu.style.display = 'none';
    if (containerInfo) containerInfo.style.display = 'none';
    containerDonHangMua.style.display = "block";

    // Hiện section đơn hàng
    const ordersDiv = document.getElementById('orders');
    if (ordersDiv) ordersDiv.style.display = 'block';

    // Gọi API lấy đơn hàng và render
    fetch('../BE/get_orders.php')
        .then(res => res.json())
        .then(data => {
            renderOrders(data);
        })
        .catch(() => {
            if (ordersDiv) ordersDiv.innerHTML = '<p>Lỗi khi tải đơn hàng.</p>';
        });
}

function renderOrders(orders) {
    const ordersDiv = document.getElementById('orders');
    if (!ordersDiv) return;

    if (!orders.length) {
        ordersDiv.innerHTML = '<p>Không có đơn hàng nào.</p>';
        return;
    }
    const grouped = {};
    orders.forEach(item => {
        if (!grouped[item.order_id]) {
            grouped[item.order_id] = {
                table_id: item.table_id,
                status: item.status,
                total_amount: item.total_amount,
                items: []
            };
        }
        grouped[item.order_id].items.push(item);
    });

    const statusMap = {
        pending: 'Đã tiếp nhận',
        in_progress: 'Đang tiến hành',
        completed: 'Đã hoàn thành'
    };

    let html = '';
    Object.keys(grouped).forEach(orderId => {
        const order = grouped[orderId];
        html += `
        <div class="order-card">
            <div class="order-card__header" style="display:flex;align-items:center;gap:12px;">
                <span class="order-card__status">${statusMap[order.status] || order.status}</span>
                <span class="order-card__table">Bàn ${order.table_id}</span>
            </div>
            ${order.items.map(item => `
                <div class="order-card__item">
                    <img src="${item.image_path}" alt="${item.product_name}" class="order-card__image"/>
                    <div class="order-card__info" style="flex:1;">
                        <b>${item.product_name}</b>
                        <div class="order-card__qty">x${item.quantity}</div>
                    </div>
                    <div class="order-card__price" style="min-width:90px;text-align:right;font-weight:bold;color:#d32f2f;">
                        ${formatCurrency(item.price)}
                    </div>
                </div>
            `).join('')}
            <div class="order-card__footer" style="display:flex;justify-content:flex-end;align-items:center;border-top:1px solid #f0f0f0;padding-top:10px;margin-top:8px;">
                <span style="color:#222;margin-right:8px;">Tổng tiền:</span>
                <span class="order-card__total" style="color:#d32f2f;font-weight:bold;">
                    ${formatCurrency(order.total_amount)}
                </span>
            </div>
        </div>
        `;
    });

    ordersDiv.innerHTML = html;
}
