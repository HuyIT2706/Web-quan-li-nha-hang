// Mở và đóng thanh sidebar
const menuIconButton = document.querySelector(".menu-icon-btn");
const sidebar = document.querySelector(".sidebar");
menuIconButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// Tab cho các phần
const sidebars = document.querySelectorAll(".sidebar-list-item.tab-content");
const sections = document.querySelectorAll(".section");

for(let i = 0; i < sidebars.length; i++) {
    sidebars[i].onclick = function () {
        document.querySelector(".sidebar-list-item.active").classList.remove("active");
        document.querySelector(".section.active").classList.remove("active");
        sidebars[i].classList.add("active");
        sections[i].classList.add("active");
    };
}

const closeBtn = document.querySelectorAll('.section');
for(let i=0;i<closeBtn.length;i++){
    closeBtn[i].addEventListener('click',(e) => {
        sidebar.classList.add("open");
    })
}

// Chuyển đổi sang định dạng tiền VND
function vnd(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
// Phân trang 
let perPage = 12;
let currentPage = 1;
let totalPage = 0;
let perProducts = [];

// Hiển thị danh sách sản phẩm theo trang
function displayList(productAll, perPage, currentPage) {
    let start = (currentPage - 1) * perPage;
    let end = (currentPage - 1) * perPage + perPage;
    let productShow = productAll.slice(start, end);
    showProductArr(productShow);
}

// Thiết lập phân trang
function setupPagination(productAll, perPage) {
    document.querySelector('.page-nav-list').innerHTML = '';
    let page_count = Math.ceil(productAll.length / perPage);
    for (let i = 1; i <= page_count; i++) {
        let li = paginationChange(i, productAll, currentPage);
        document.querySelector('.page-nav-list').appendChild(li);
    }
}

// Xử lý sự kiện chuyển trang
function paginationChange(page, productAll, currentPage) {
    let node = document.createElement(`li`);
    node.classList.add('page-nav-item');
    node.innerHTML = `<a href="#">${page}</a>`;
    if (currentPage == page) node.classList.add('active');
    node.addEventListener('click', function () {
        currentPage = page;
        displayList(productAll, perPage, currentPage);
        let t = document.querySelectorAll('.page-nav-item.active');
        for (let i = 0; i < t.length; i++) {
            t[i].classList.remove('active');
        }
        node.classList.add('active');
    })
    return node;
}

// Hiển thị danh sách sản phẩm
function showProductArr(arr) {
    let productHtml = "";
    if(arr.length == 0) {
        productHtml = `<div class="no-result"><div class="no-result-i"><i class="fa-light fa-face-sad-cry"></i></div><div class="no-result-h">Không có sản phẩm để hiển thị</div></div>`;
    } else {
        arr.forEach(product => {
            let btnCtl = product.status == 1 ? 
            `<button class="btn-delete" onclick="deleteProduct(${product.id})"><i class="fa-regular fa-trash"></i></button>` :
            `<button class="btn-delete" onclick="changeStatusProduct(${product.id})"><i class="fa-regular fa-eye"></i></button>`;
            productHtml += `
            <div class="list">
                    <div class="list-left">
                    <img src="${product.img}" alt="">
                    <div class="list-info">
                        <h4>${product.title}</h4>
                        <p class="list-note">${product.desc}</p>
                        <span class="list-category">${product.category}</span>
                    </div>
                </div>
                <div class="list-right">
                    <div class="list-price">
                    <span class="list-current-price">${vnd(product.price)}</span>                   
                    </div>
                    <div class="list-control">
                    <div class="list-tool">
                        <button class="btn-edit" onclick="editProduct(${product.id})"><i class="fa-light fa-pen-to-square"></i></button>
                        ${btnCtl}
                    </div>                       
                </div>
                </div> 
            </div>`;
        });
    }
    document.getElementById("show-product").innerHTML = productHtml;
}


// Xử lý đóng form và đặt giá trị mặc định
document.querySelector(".modal-close.product-form").addEventListener("click",() => {
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

// Đóng cửa sổ popup
let closePopup = document.querySelectorAll(".modal-close");
let modalPopup = document.querySelectorAll(".modal");

for (let i = 0; i < closePopup.length; i++) {
    closePopup[i].onclick = () => {
        modalPopup[i].classList.remove("open");
    };
}

// Đổi trạng thái đơn hàng
function changeStatus(id, el) {
    let orders = JSON.parse(localStorage.getItem("order"));
    let order = orders.find((item) => {
        return item.id == id;
    });
    order.trangthai = 1;
    el.classList.remove("btn-chuaxuly");
    el.classList.add("btn-daxuly");
    el.innerHTML = "Đã xử lý";
    localStorage.setItem("order", JSON.stringify(orders));
    findOrder(orders);
}

// Định dạng ngày tháng
function formatDate(date) {
    let fm = new Date(date);
    let yyyy = fm.getFullYear();
    let mm = fm.getMonth() + 1;
    let dd = fm.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return dd + "/" + mm + "/" + yyyy;
}

// Hiển thị danh sách đơn hàng
function showOrder(arr) {
    let orderHtml = "";
    if(arr.length == 0) {
        orderHtml = `<td colspan="6">Không có dữ liệu</td>`
    } else {
        arr.forEach((item) => {
            let status = item.trangthai == 0 ? `<span class="status-no-complete">Chưa xử lý</span>` : `<span class="status-complete">Đã xử lý</span>`;
            let date = formatDate(item.thoigiandat);
            orderHtml += `
            <tr>
            <td>${item.id}</td>
            <td>${item.khachhang}</td>
            <td>${date}</td>
            <td>${vnd(item.tongtien)}</td>                               
            <td>${status}</td>
            <td class="control">
            <button class="btn-detail" id="" onclick="detailOrder('${item.id}')"><i class="fa-regular fa-eye"></i> Chi tiết</button>
            </td>
            </tr>      
            `;
        });
    }
    document.getElementById("showOrder").innerHTML = orderHtml;
}

let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
window.onload = showOrder(orders);


// Hiển thị chi tiết đơn hàng
function detailOrder(id) {
    document.querySelector(".modal.detail-order").classList.add("open");
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let products = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("products")) : [];
    // Lấy hóa đơn 
    let order = orders.find((item) => item.id == id);
    // Lấy chi tiết hóa đơn
    let ctDon = getOrderDetails(id);
    let spHtml = `<div class="modal-detail-left"><div class="order-item-group">`;

    ctDon.forEach((item) => {
        let detaiSP = products.find(product => product.id == item.id);
        spHtml += `<div class="order-product">
            <div class="order-product-left">
                <img src="${detaiSP.img}" alt="">
                <div class="order-product-info">
                    <h4>${detaiSP.title}</h4>
                    <p class="order-product-note"><i class="fa-light fa-pen"></i> ${item.note}</p>
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
        <button class="modal-detail-btn ${classDetailBtn}" onclick="changeStatus('${order.id}',this)">${textDetailBtn}</button>
    </div>`;
}



// Hiển thị kết quả thống kê
function showThongKe(arr,mode) {
    let orderHtml = "";
    let mergeObj = mergeObjThongKe(arr);
    showOverview(mergeObj);

    switch (mode){
        case 0:
            mergeObj = mergeObjThongKe(createObj());
            showOverview(mergeObj);
            document.getElementById("the-loai-tk").value = "Tất cả";
            document.getElementById("form-search-tk").value = "";
            document.getElementById("time-start-tk").value = "";
            document.getElementById("time-end-tk").value = "";
            break;
        case 1:
            mergeObj.sort((a,b) => parseInt(a.quantity) - parseInt(b.quantity))
            break;
        case 2:
            mergeObj.sort((a,b) => parseInt(b.quantity) - parseInt(a.quantity))
            break;
    }
    for(let i = 0; i < mergeObj.length; i++) {
        orderHtml += `
        <tr>
        <td>${i + 1}</td>
        <td><div class="prod-img-title"><img class="prd-img-tbl" src="${mergeObj[i].img}" alt=""><p>${mergeObj[i].title}</p></div></td>
        <td>${mergeObj[i].quantity}</td>
        <td>${vnd(mergeObj[i].doanhthu)}</td>
        <td><button class="btn-detail product-order-detail" data-id="${mergeObj[i].id}"><i class="fa-regular fa-eye"></i> Chi tiết</button></td>
        </tr>      
        `;
    }
    document.getElementById("showTk").innerHTML = orderHtml;
    document.querySelectorAll(".product-order-detail").forEach(item => {
        let idProduct = item.getAttribute("data-id");
        item.addEventListener("click", () => {           
            detailOrderProduct(arr,idProduct);
        })
    })
}

showThongKe(createObj())



// Hiển thị chi tiết đơn hàng của một sản phẩm
function detailOrderProduct(arr,id) {
    let orderHtml = "";
    arr.forEach(item => {
        if(item.id == id) {
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

// Quản lý người dùng
let addAccount = document.getElementById('signup-button');
let updateAccount = document.getElementById("btn-update-account")

document.querySelector(".modal.signup .modal-close").addEventListener("click",() => {
    signUpFormReset();
})

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

// Hiển thị danh sách người dùng
function showUserArr(arr) {
    let accountHtml = '';
    if(arr.length == 0) {
        accountHtml = `<td colspan="5">Không có dữ liệu</td>`
    } else {
        arr.forEach((account, index) => {
            let tinhtrang = account.status == 0 ? `<span class="status-no-complete">Bị khóa</span>` : `<span class="status-complete">Hoạt động</span>`;
            accountHtml += ` <tr>
            <td>${index + 1}</td>
            <td>${account.fullname}</td>
            <td>${account.phone}</td>
            <td>${formatDate(account.join)}</td>
            <td>${tinhtrang}</td>
            <td class="control control-table">
            <button class="btn-edit" id="edit-account" onclick='editAccount(${account.phone})' ><i class="fa-light fa-pen-to-square"></i></button>
            <button class="btn-delete" id="delete-account" onclick="deleteAcount(${index})"><i class="fa-regular fa-trash"></i></button>
            </td>
        </tr>`
        })
    }
    document.getElementById('show-user').innerHTML = accountHtml;
}


// Hủy tìm kiếm người dùng
function cancelSearchUser() {
    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")).filter(item => item.userType == 0) : [];
    showUserArr(accounts);
    document.getElementById("tinh-trang-user").value = 2;
    document.getElementById("form-search-user").value = "";
    document.getElementById("time-start-user").value = "";
    document.getElementById("time-end-user").value = "";
}

window.onload = showUser();

