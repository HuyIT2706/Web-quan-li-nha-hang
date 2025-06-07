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
        document.querySelector(".sidebar-list-item.active").classList.remove("active");
        document.querySelector(".section.active").classList.remove("active");
        sidebars[i].classList.add("active");
        sections[i].classList.add("active");
    };
}

const closeBtn = document.querySelectorAll('.section');
for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener('click', (e) => {
        sidebar.classList.add("open");
    })
}

// Chuyển đổi sang định dạng tiền VND
function vnd(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleString('vi-VN');
}

// Hàm upload ảnh sản phẩm
async function uploadImage(input) {
    const file = input.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('../BE/api_upload_image.php', {
        method: 'POST',
        body: formData
    });
    const data = await res.json();
    if (data.success) {
        document.querySelector('.upload-image-preview').src = data.url;
    } else {
        alert(data.message || 'Lỗi upload ảnh');
    }
}
const thongTinUser = document.getElementById("thongTinUser");
thongTinUser.textContent = localStorage.getItem("adminPosition");
// ====================== San pham =========================
let allProducts = [];
let perPage = 12;
let currentPage = 1;

// Lấy giá trị từ form sản phẩm
const getProductFormValues = () => {
    return {
        name: document.getElementById('ten-mon').value.trim(),
        description: document.getElementById('mo-ta').value.trim(),
        category: document.getElementById('chon-mon').value.trim(),
        price: document.getElementById('gia-moi').value.trim(),
        image: document.querySelector('.upload-image-preview').src
    };
}

// Reset form sản phẩm
const resetProductForm = () => {
    document.getElementById('ten-mon').value = '';
    document.getElementById('mo-ta').value = '';
    document.getElementById('chon-mon').value = 'Tất cả';
    document.getElementById('gia-moi').value = '';
    document.querySelector('.upload-image-preview').src = './assets/img/admin/blank-image.png';
}

// Thêm sản phẩm
const addProductBtn = document.getElementById('add-product-button');
if (addProductBtn) {
    addProductBtn.onclick = async function (e) {
        e.preventDefault();
        const values = getProductFormValues();
        const formData = new FormData();
        for (const key in values) formData.append(key, values[key]);
        const res = await fetch('../BE/api_product_add.php', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            toast({
                type: "success",
                message: data.message
            });
            document.querySelector('.add-product').classList.remove('open');
            resetProductForm();
            showProduct();
        }
        else {
            toast({
                type: "error",
                message: data.message
            });
        }
    };
}

// Sửa sản phẩm
const editProduct = async (product_id) => {
    const product = allProducts.find(p => p.product_id == product_id);
    if (!product) return;
    document.getElementById('ten-mon').value = product.name;
    document.getElementById('mo-ta').value = product.description;
    document.getElementById('chon-mon').value = product.category;
    document.getElementById('gia-moi').value = product.price;
    document.querySelector('.upload-image-preview').src = product.image;
    document.querySelectorAll('.add-product-e').forEach(item => item.style.display = 'none');
    document.querySelectorAll('.edit-product-e').forEach(item => item.style.display = 'block');
    document.querySelector('.add-product').classList.add('open');
    document.getElementById('update-product-button').setAttribute('data-id', product_id);
}

// Lưu thay đổi sản phẩm
const updateProductBtn = document.getElementById('update-product-button');
if (updateProductBtn) {
    updateProductBtn.onclick = async function (e) {
        e.preventDefault();
        const product_id = this.getAttribute('data-id');
        const values = getProductFormValues();
        const formData = new FormData();
        formData.append('product_id', product_id);
        for (const key in values) formData.append(key, values[key]);
        const res = await fetch('../BE/api_product_update.php', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            toast({
                type: "success",
                message: data.message
            });
            document.querySelector('.add-product').classList.remove('open');
            resetProductForm();
            showProduct();
        }
        else {
            toast({
                type: "error",
                message: data.message
            });
        }
    };
}

// Xóa sản phẩm
const changeStatusProduct = async (product_id) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    const formData = new FormData();
    formData.append('product_id', product_id);
    const res = await fetch('../BE/api_product_delete.php', {
        method: 'POST',
        body: formData
    });
    const data = await res.json();
    if (data.success) {
        toast({
            type: "success",
            message: data.message
        });
        showProduct();
    }
    else {
        toast({
            type: "error",
            message: data.message
        });
    }
}
// Hiển thị product khi click qua tab sản phẩm
const showProduct = async () => {
    try {
        const response = await fetch('../BE/api_product.php');
        const data = await response.json();
        allProducts = data;
        currentPage = 1;
        filterAndSearchProduct();
    } catch (error) {
        showProductArr([]);
    }
}
// Lọc và tìm kiếm
const filterAndSearchProduct = () => {
    const category = document.getElementById('the-loai').value.trim();
    const keyword = document.getElementById('form-search-product').value.trim().toLowerCase();
    let filtered = allProducts;
    if (category !== 'Tất cả') {
        filtered = filtered.filter(product => (product.category || '').toLowerCase() === category.toLowerCase());
    }
    if (keyword !== '') {
        filtered = filtered.filter(product =>
            (product.name || '').toLowerCase().includes(keyword)
        );
    }
    currentPage = 1;
    displayList(filtered, perPage, currentPage);
    setupPagination(filtered, perPage);
}
document.getElementById('form-search-product').addEventListener('input', filterAndSearchProduct);

// Hiển thị danh sách sản phẩm theo trang
const displayList = (productAll, perPage, currentPage) => {
    let start = (currentPage - 1) * perPage;
    let end = start + perPage;
    let productShow = productAll.slice(start, end);
    showProductArr(productShow);
}

// Thiết lập phân trang
const setupPagination = (productAll, perPage) => {
    document.querySelector('.page-nav-list').innerHTML = '';
    let page_count = Math.ceil(productAll.length / perPage);
    for (let i = 1; i <= page_count; i++) {
        let li = paginationChange(i, productAll);
        document.querySelector('.page-nav-list').appendChild(li);
    }
}
const paginationChange = (page, arr) => {
    let node = document.createElement('li');
    node.classList.add('page-nav-item');
    node.innerHTML = `<a href="#">${page}</a>`;
    if (currentPage == page) node.classList.add('active');
    node.addEventListener('click', function () {
        currentPage = page;
        displayList(arr, perPage, currentPage);
        let t = document.querySelectorAll('.page-nav-item.active');
        for (let i = 0; i < t.length; i++) {
            t[i].classList.remove('active');
        }
        node.classList.add('active');
    });
    return node;
}
// UI sản phẩm khi render
const showProductArr = (arr) => {
    let productHtml = "";
    if (arr.length == 0) {
        productHtml = `<div class="no-result"><div class="no-result-i"><i class="fa-light fa-face-sad-cry"></i></div><div class="no-result-h">Không có sản phẩm để hiển thị</div></div>`;
    } else {
        arr.forEach(product => {
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
                    <span class="list-current-price">${vnd(product.price)}</span>                   
                    </div>
                    <div class="list-control">
                    <div class="list-tool">
                        <button class="btn-edit" onclick="editProduct(${product.product_id})"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button class="btn-delete" onclick="changeStatusProduct(${product.product_id})"><i class="fa-regular fa-trash-can"></i></button>
                    </div>                       
                </div>
                </div> 
            </div>`;
        });
    }
    document.getElementById("show-product").innerHTML = productHtml;
}
// Nút đóng modal
document.querySelector(".modal-close.product-form").addEventListener("click", () => {
    setDefaultValue();
})
// Mở cửa sổ thêm sản phẩm mới
let btnAddProduct = document.getElementById("btn-add-product");
btnAddProduct.addEventListener("click", () => {
    document.querySelectorAll(".add-product-e").forEach(item => {
        item.style.display = "block";
    })
    document.querySelectorAll(".edit-product-e").forEach(item => {
        item.style.display = "none";
    })
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
    document.getElementById('the-loai').value = 'Tất cả';
    document.getElementById('form-search-product').value = '';
    filterAndSearchProduct();
    resetProductForm();
}
// =========================== Don hang ==============================
// Hiển thị danh sách đơn hàng
function showOrder() {
    fetch('../BE/api_get_orders.php')
        .then(res => res.json())
        .then(arr => {
            let orderHtml = '';
            if (arr.length == 0) {
                orderHtml = `<td colspan="6">Không có dữ liệu</td>`;
            } else {
                arr.forEach((item) => {
                    let status = item.trangthai == 'in_progress'
                        ? `<span class="status-no-complete">Đang xử lý</span>`
                        : item.trangthai == 'pending'
                            ? `<span class="status-processing">Chưa xử lý</span>`
                            : `<span class="status-complete">Đã xử lý</span>`;
                    let date = formatDate(item.thoigiandat);
                    orderHtml += `
                        <tr>
                            <td>${"DH " + item.id}</td>
                            <td>${item.khachhang}</td>
                            <td>${date}</td>
                            <td>${vnd(item.tongtien)}</td>
                            <td>${status}</td>
                            <td class="control">
                                <button class="btn-detail" onclick="detailOrder('${item.id}')"><i class="fa-regular fa-eye"></i> Chi tiết</button>
                            </td>
                        </tr>
                    `;
                });
            }
            document.getElementById('showOrder').innerHTML = orderHtml;
        });
}

let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
window.onload = showOrder(orders);


// Hiển thị chi tiết đơn hàng
function detailOrder(id) {
    fetch(`../BE/api_get_order_detail.php?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const order = data.order;
            const ctDon = data.items;
            document.querySelector(".modal.detail-order").classList.add("open");
            let spHtml = `<div class="modal-detail-left"><div class="order-item-group">`;
            ctDon.forEach((item) => {
                spHtml += `<div class="order-product">
                    <div class="order-product-left">
                        <img src="${item.img}" alt="">
                        <div class="order-product-info">
                            <h4>${item.title}</h4>
                            <p class="order-product-note"><i class="fa-light fa-pen"></i> ${item.note || ''}</p>
                            <p class="order-product-quantity">SL: ${item.soluong}<p>
                        </div>
                    </div>
                    <div class="order-product-right">
                        <div class="order-product-price">
                            <span class="order-product-current-price">${vnd(item.price)}</span>
                        </div>                         
                    </div>
                </div>`;
            });
            spHtml += `</div></div>`;
            spHtml += `<div class="modal-detail-right">
                <ul class="detail-order-group">
                    <li class="detail-order-item">
                        <span class="detail-order-item-left"><i class="fa-light fa-calendar-days"></i> Ngày đặt hàng</span>
                        <span class="detail-order-item-right">${formatDate(order.thoigiandat)}</span>
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
                </ul>
            </div>`;
            document.querySelector(".modal-detail-order").innerHTML = spHtml;

            // Nút trạng thái
            let classDetailBtn = order.trangthai == 'in_progress' ? "btn-chuaxuly" : "btn-daxuly";
            let textDetailBtn = order.trangthai == 'in_progress' ? "Đang xử lý" : "Đã xử lý";
            document.querySelector(
                ".modal-detail-bottom"
            ).innerHTML = `<div class="modal-detail-bottom-left">
                <div class="price-total">
                    <span class="thanhtien">Thành tiền</span>
                    <span class="price">${vnd(order.tongtien)}</span>
                </div>
            </div>
            <div class="modal-detail-bottom-right">
                <button class="modal-detail-btn ${classDetailBtn}" onclick="changeStatus('${order.order_id}',this)">${textDetailBtn}</button>
            </div>`;
        });
}

// Hiển thị chi tiết đơn hàng của một sản phẩm
function detailOrderProduct(arr, id) {
    let orderHtml = "";
    arr.forEach(item => {
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
    document.getElementById("show-product-order-detail").innerHTML = orderHtml
    document.querySelector(".modal.detail-order-product").classList.add("open")
}
function changeStatus(order_id, btn) {
    fetch('../BE/api_update_order_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id })
    })
        .then(res => res.json())
        .then(result => {
            toast({ type: result.success ? "success" : "error", message: result.message });
            if (result.success) {
                btn.classList.remove('btn-chuaxuly');
                btn.classList.add('btn-daxuly');
                btn.innerText = 'Đã xử lý';
                btn.disabled = true;
                showOrder();
            }
        });
}
function findOrder() {
    const statusFilter = document.getElementById('tinh-trang').value;
    const keyword = document.getElementById('form-search-order').value.trim().toLowerCase();
    fetch('../BE/api_get_orders.php')
        .then(res => res.json())
        .then(arr => {
            let filtered = arr;
            // Lọc theo trạng thái
            if (statusFilter !== '2') {
                filtered = filtered.filter(order => {
                    if (statusFilter === '1') return order.trangthai === 'in_progress';
                    if (statusFilter === '3') return order.trangthai === 'completed';
                    return true;
                });
            }
            // Lọc theo từ khóa
            if (keyword !== '') {
                filtered = filtered.filter(order =>
                    (order.id && order.id.toString().includes(keyword)) ||
                    (order.khachhang && order.khachhang.toLowerCase().includes(keyword))
                );
            }
            // Render lại bảng
            let orderHtml = '';
            if (filtered.length == 0) {
                orderHtml = `<td colspan="6">Không có dữ liệu</td>`;
            } else {
                filtered.forEach((item) => {
                    let status = item.trangthai == 'in_progress'
                        ? `<span class="status-no-complete">Đang xử lý</span>`
                        : item.trangthai == 'completed'
                            ? `<span class="status-complete">Đã xử lý</span>`
                            : `<span class="status-processing">Khác</span>`;
                    let date = formatDate(item.thoigiandat);
                    orderHtml += `
                        <tr>
                            <td>${ "DH " + item.id}</td>
                            <td>${item.khachhang}</td>
                            <td>${date}</td>
                            <td>${vnd(item.tongtien)}</td>
                            <td>${status}</td>
                            <td class="control">
                                <button class="btn-detail" onclick="detailOrder('${item.id}')"><i class="fa-regular fa-eye"></i> Chi tiết</button>
                            </td>
                        </tr>
                    `;
                });
            }
            document.getElementById('showOrder').innerHTML = orderHtml;
        });
}

function cancelSearchOrder() {
    document.getElementById('tinh-trang').value = '2';
    document.getElementById('form-search-order').value = '';
    findOrder();
}
// =============================== THỐNG KÊ ==================================
// Hiển thị thống kê với tham số lọc
async function showThongKe(category = 'Tất cả', search = '') {
    try {
        const response = await fetch(`../BE/api_get_statistics.php?category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}`);
        const data = await response.json();

        // Tính toán tổng doanh thu và số lượng bán cho từng sản phẩm
        const productStats = {};
        data.forEach(item => {
            if (!productStats[item.product_id]) {
                productStats[item.product_id] = {
                    id: item.product_id,
                    name: item.product_name,
                    image: item.image,
                    category: item.category,
                    totalQuantity: 0,
                    totalRevenue: 0
                };
            }
            productStats[item.product_id].totalQuantity += parseInt(item.quantity);
            productStats[item.product_id].totalRevenue += parseFloat(item.total);
        });

        // Chuyển đổi object thành mảng và sắp xếp theo doanh thu
        const sortedStats = Object.values(productStats).sort((a, b) => b.totalRevenue - a.totalRevenue);

        // Hiển thị kết quả
        let html = '';
        sortedStats.forEach((item, index) => {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>
                        <div class="prod-img-title">
                            <img class="prd-img-tbl" src="${item.image}" alt="">
                            <p>${item.name}</p>
                        </div>
                    </td>
                    <td>${item.totalQuantity}</td>
                    <td>${vnd(item.totalRevenue)}</td>
                    <td>
                        <button class="btn-detail product-order-detail" data-id="${item.id}">
                            <i class="fa-regular fa-eye"></i> Chi tiết
                        </button>
                    </td>
                </tr>
            `;
        });
        document.getElementById('showTk').innerHTML = html;

        // Thêm sự kiện click cho nút chi tiết
        document.querySelectorAll('.product-order-detail').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = btn.getAttribute('data-id');
                showProductOrderDetail(productId);
            });
        });
    } catch (error) {
        toast({ type: "error", message: "Có lỗi xảy ra khi lấy dữ liệu thống kê" });
    }
}

// Lọc theo loại món
function filterThongKe() {
    const category = document.getElementById('the-loai-tk').value;
    const search = document.getElementById('form-search-tk').value;
    showThongKe(category, search);
}

// Tìm kiếm theo tên món
function searchThongKe() {
    const category = document.getElementById('the-loai-tk').value;
    const search = document.getElementById('form-search-tk').value;
    showThongKe(category, search);
}

// Reset bộ lọc
function resetThongKe() {
    document.getElementById('the-loai-tk').value = 'Tất cả';
    document.getElementById('form-search-tk').value = '';
    showThongKe('Tất cả', '');
}

// Hàm hiển thị chi tiết đơn hàng của sản phẩm
async function showProductOrderDetail(productId) {
    try {
        const response = await fetch(`../BE/api_get_statistics.php?product_id=${productId}`);
        const data = await response.json();
        
        let html = '';
        data.forEach(item => {
            html += `
                <tr>
                    <td>DH${item.order_id}</td>
                    <td>${item.quantity}</td>
                    <td>${vnd(item.price)}</td>
                    <td>${formatDate(item.order_date)}</td>
                </tr>
            `;
        });

        document.getElementById('show-product-order-detail').innerHTML = html;
        document.querySelector('.modal.detail-order-product').classList.add('open');
    } catch (error) {
        console.error('Error:', error);
        toast({
            type: "error",
            message: "Có lỗi xảy ra khi lấy chi tiết đơn hàng"
        });
    }
}

// ======================================== NHAN VIEN =============================

document.querySelector(".modal.signup .modal-close").addEventListener("click", () => {
    signUpFormReset();
})
function showAccount() {
    if (localStorage.getItem('adminPosition') === 'admin') {
        showUserArr();
    }
    else {
        toast({
            title: "Thông Báo",
            type: "error",
            message: "Bạn không đủ thẩm quyền vào quản lý nhân viên!"
        });
        return;
    }
}
// Hiển thị danh sách người dùng
function showUserArr() {
    fetch('../BE/api_get_account.php')
        .then(res => res.json())
        .then(arr => {
            let accountHtml = '';
            if (arr.length == 0) {
                accountHtml = `<td colspan="5">Không có dữ liệu</td>`
            } else {
                arr.forEach((account, index) => {
                    let tinhtrang = account.status == "inactive" ? `<span class="status-no-complete">Bị khóa</span>` : `<span class="status-complete">Hoạt động</span>`;
                    accountHtml += ` <tr>
                        <td>${index + 1}</td>
                        <td>${account.fullname}</td>
                        <td>${account.phone}</td>
                        <td>${account.position}</td>
                        <td>${tinhtrang}</td>
                        <td class="control control-table">
                            <button class="btn-edit" id="edit-account" onclick='editAccount(${account.staff_id})'><i class="fa-regular fa-pen-to-square"></i></button>
                            <button class="btn-delete" id="delete-account" onclick="deleteAccount(${account.staff_id})"><i class="fa-regular fa-trash-can"></i></button>
                        </td>
                    </tr>`
                })
            }
            document.getElementById('show-user').innerHTML = accountHtml;
        });
}
// Mở form tạo tài khoản mới
function openCreateAccount() {
    document.querySelector(".signup").classList.add("open");
    document.querySelectorAll(".edit-account-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".add-account-e").forEach(item => {
        item.style.display = "block"
    })
}

// Đặt lại form đăng ký
function signUpFormReset() {
    document.getElementById('fullname').value = ""
    document.getElementById('phone').value = ""
    document.getElementById('password').value = ""
    document.querySelector('.form-message-name').innerHTML = '';
    document.querySelector('.form-message-phone').innerHTML = '';
    document.querySelector('.form-message-password').innerHTML = '';
}
const signupBtn = document.getElementById('signup-button');
if (signupBtn) {
    signupBtn.onclick = function (e) {
        e.preventDefault();
        addAccount();
    }
}
// Thêm nhân viên
function addAccount() {
    if (localStorage.getItem('adminPosition') === 'admin') {
        const phone = document.getElementById('phone').value;
        const data = {
            phone: phone,
            password: phone + 'nv',
            fullname: document.getElementById('fullname').value,
            position: document.getElementById('position') ? document.getElementById('position').value : document.getElementById('password').value,
            status: 'active'
        };
        fetch('../BE/api_add_account.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                toast({ type: result.success ? "success" : "error", message: result.message });
                if (result.success) {
                    showUserArr();
                    document.querySelector(".signup").classList.remove("open");
                    signUpFormReset();
                }
            });
    }
    else {
        toast({
            title: "Thông Báo",
            type: "error",
            message: "Bạn không đủ thẩm quyền để thêm nhân viên!"
        });
    }
}
// Sửa nhân viên
function editAccount(staff_id) {
    fetch('../BE/api_get_account.php')
        .then(res => res.json())
        .then(arr => {
            const account = arr.find(acc => acc.staff_id == staff_id);
            if (!account) {
                toast({ type: "error", message: "Không tìm thấy nhân viên!" });
                return;
            }
            document.querySelector(".signup").classList.add("open");
            document.querySelectorAll(".add-account-e").forEach(item => item.style.display = "none");
            document.querySelectorAll(".edit-account-e").forEach(item => item.style.display = "block");
            document.getElementById('fullname').value = account.fullname;
            document.getElementById('phone').value = account.phone;
            document.getElementById('password').value = account.position;
            document.getElementById('user-status').checked = account.status === 'active';
            const btnUpdate = document.getElementById('btn-update-account');
            btnUpdate.onclick = function (e) {
                e.preventDefault();
                updateAccount(staff_id);
            }
        });
}
// Update nhân viên
function updateAccount(staff_id) {
    const phone = document.getElementById('phone').value;
    const data = {
        staff_id: staff_id,
        phone: phone,
        password: phone + 'nv',
        fullname: document.getElementById('fullname').value,
        position: document.getElementById('position') ? document.getElementById('position').value : document.getElementById('password').value,
        status: document.getElementById('user-status') && document.getElementById('user-status').checked ? 'active' : 'inactive'
    };
    fetch('../BE/api_update_account.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(result => {
            toast({ type: result.success ? "success" : "error", message: result.message });
            if (result.success) {
                showUserArr();
                document.querySelector(".signup").classList.remove("open");
                signUpFormReset();
            }
        });
}
// Xóa
function deleteAccount(staff_id) {
    if (!confirm('Bạn có chắc muốn xóa nhân viên này?')) return;
    fetch('../BE/api_delete_account.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staff_id })
    })
        .then(res => res.json())
        .then(result => {
            toast({ type: result.success ? "success" : "error", message: result.message });
            if (result.success) showUserArr();
        });
}
// TIm kiem va loc
function showUser() {
    if (localStorage.getItem('adminPosition') === 'admin') {
        const statusFilter = document.getElementById('tinh-trang-user').value;
        const keyword = document.getElementById('form-search-user').value.trim().toLowerCase();
        fetch('../BE/api_get_account.php')
            .then(res => res.json())
            .then(arr => {
                let filtered = arr;
                if (statusFilter !== '2') {
                    filtered = filtered.filter(acc => {
                        if (statusFilter === '1') return acc.status === 'active';
                        if (statusFilter === '0') return acc.status === 'inactive';
                        return true;
                    });
                }
                if (keyword !== '') {
                    filtered = filtered.filter(acc =>
                        (acc.fullname && acc.fullname.toLowerCase().includes(keyword)) ||
                        (acc.phone && acc.phone.toLowerCase().includes(keyword)) ||
                        (acc.position && acc.position.toLowerCase().includes(keyword))
                    );
                }
                let accountHtml = '';
                if (filtered.length == 0) {
                    accountHtml = `<td colspan="5">Không có dữ liệu</td>`
                } else {
                    filtered.forEach((account, index) => {
                        let tinhtrang = account.status == "inactive" ? `<span class="status-no-complete">Bị khóa</span>` : `<span class="status-complete">Hoạt động</span>`;
                        accountHtml += ` <tr>
                        <td>${index + 1}</td>
                        <td>${account.fullname}</td>
                        <td>${account.phone}</td>
                        <td>${account.position}</td>
                        <td>${tinhtrang}</td>
                        <td class="control control-table">
                            <button class="btn-edit" id="edit-account" onclick='editAccount(${account.staff_id})'><i class="fa-regular fa-pen-to-square"></i></button>
                            <button class="btn-delete" id="delete-account" onclick="deleteAccount(${account.staff_id})"><i class="fa-regular fa-trash-can"></i></button>
                        </td>
                    </tr>`
                    })
                }
                document.getElementById('show-user').innerHTML = accountHtml;
            });
    }
    else {
        toast({
            title: "Thông Báo",
            type: "error",
            message: "Bạn không đủ thẩm quyền để làm việc trang nhân viên!"
        });
    }
}
// reset
function cancelSearchUser() {
    document.getElementById('tinh-trang-user').value = '2';
    document.getElementById('form-search-user').value = '';
    showUser();
}
function logoutAdmin() {
    localStorage.removeItem('adminPosition');
    localStorage.removeItem('adminPhone'); 
    localStorage.removeItem('adminLoggedIn'); 
    toast({
        type: "success",
        message: "Đăng xuất thành công!"
    });
    setTimeout(function() {
        window.location.href = '/webnhahang/FE/admin.html';
    }, 1000); 
}

// =============================== DASHBOARD ==================================
async function updateProductCount() {
    const res = await fetch('../BE/api_product.php');
    const data = await res.json();
    document.getElementById('amount-product').textContent = data.length;
}

async function updateUserCount() {
    const res = await fetch('../BE/api_get_account.php');
    const data = await res.json();
    document.getElementById('amount-user').textContent = data.length;
}

async function updateTotalRevenue() {
    const res = await fetch('../BE/api_get_orders.php');
    const data = await res.json();
    let total = 0;
    data.forEach(order => {
        if(order.trangthai === 'in_progress' || order.trangthai === 'completed') {
            total += parseFloat(order.tongtien);
        }
    });
    document.getElementById('doanh-thu').textContent = vnd(total);
}

window.onload = function() {
    updateProductCount();
    updateUserCount();
    updateTotalRevenue();
    showOrder();
}




