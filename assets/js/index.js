document.addEventListener('DOMContentLoaded', () => {
    const containerProduct = document.getElementById('container-product');
    const orderModalOverlay = document.getElementById('orderModalOverlay');
    const orderModalClose = document.getElementById('orderModalClose');
    const openCartProduct = document.querySelectorAll('.food-card__order-btn');

    openCartProduct.forEach(btn => btn.addEventListener('click', () => toggleModalVisibility(true)));
    [orderModalOverlay, orderModalClose].forEach(el => el?.addEventListener('click', () => toggleModalVisibility(false)));

    function toggleModalVisibility(show) {
        containerProduct.style.opacity = show ? '1' : '0';
        containerProduct.style.visibility = show ? 'visible' : 'hidden';
    }
});

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const slideInterval = 2500;

const updateSlider = () => {
    slider.style.transform = `translateX(-${currentSlide * 25}%)`;
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
};

const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
};

let slideTimer = setInterval(nextSlide, slideInterval);
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideInterval);
    });
});

const homeContainer = document.getElementById("home--container");
const cartModalDark = document.getElementById("cartModalDark");
const orderDetail = document.getElementById("order-detail");
const filterMenu = document.getElementById("filter-menu");
const heroTop = document.getElementById("hero-top");
const heroMenu = document.getElementById("hero--bottom_menu");
const containerInfo = document.getElementById("container--info");

const handleCart = () => {
    homeContainer.style.display = "none";
    cartModalDark.style.display = "block";
    orderDetail.style.display = "none";
    filterMenu.style.display = "none";
    heroMenu.style.display = "none";
    containerInfo.style.display = "none";



};
const hadndleQuayLai = () => {
    homeContainer.style.display = "block";
    cartModalDark.style.display = "none";
    filterMenu.style.display = "block";
    heroTop.style.display = "none";
    heroMenu.style.display = "block";
}
const handleDatThemMon = () => {
    homeContainer.style.display = "block";
    cartModalDark.style.display = "none";
    filterMenu.style.display = "block";
    heroTop.style.display = "none";
    heroMenu.style.display = "block";
}
const hadndleDatMua = () => {
    orderDetail.style.display = "block";
    cartModalDark.style.display = "none";
}
const handleInfo = () => {
    homeContainer.style.display = "none";
    filterMenu.style.display = "none";
    heroMenu.style.display = "none";
    cartModalDark.style.display = "none";
    orderDetail.style.display = "none";
    containerInfo.style.display = "block";
}
const tables = [
    { id: 1, name: "Bàn 1", status: "available" },
    { id: 2, name: "Bàn 2", status: "available" },
    { id: 3, name: "Bàn 3", status: "available" },
    { id: 4, name: "Bàn 4", status: "occupied" },
    { id: 5, name: "Bàn 5", status: "available" },
    { id: 6, name: "Bàn 6", status: "available" },
    { id: 7, name: "Bàn 7", status: "available" },
    { id: 8, name: "Bàn 8", status: "available" },
    { id: 9, name: "Bàn 9", status: "available" },
    { id: 10, name: "Bàn 10", status: "reserved" },
    { id: 11, name: "Bàn 11", status: "available" },
    { id: 12, name: "Bàn 12", status: "available" },
    { id: 13, name: "Bàn 13", status: "available" },
    { id: 14, name: "Bàn 14", status: "available" },
    { id: 15, name: "Bàn 15", status: "available" },
];

const statusText = {
    available: "Còn trống",
    occupied: "Đang sử dụng",
    reserved: "Đã đặt trước"
};

const renderTables = () => {
    const grid = document.getElementById('tableGrid');
    grid.innerHTML = '';
    tables.forEach(table => {
        const div = document.createElement('div');
        div.className = `table ${table.status}`;
        div.innerHTML = `<div class="nameTable">${table.name}</div><div>${statusText[table.status]}</div>`;
        div.onclick = () => {
            if (table.status === 'available') {
                showQRCode(table);
            }
        };

        grid.appendChild(div);
    });
};
const showQRCode = (table) => {
    const qrModal = document.getElementById('qrModal');
    const qrContainer = document.getElementById('qrcode');
    const qrModalClose = document.getElementById('qrModalClose');
    qrContainer.innerHTML = '';
    const qrData = `${window.location.origin}/login.html?table=${table.id}`;
    new QRCode(qrContainer, {
        text: qrData,
        width: 200,
        height: 200
    });
    qrModal.style.display = 'block';
    qrModalClose.onclick = () => {
        qrModal.style.display = 'none';
    };
    window.onclick = (event) => {
        if (event.target === qrModal) {
            qrModal.style.display = 'none';
        }
    };
};

document.addEventListener("DOMContentLoaded", () => {
    const chooseMenuLink = document.getElementById("chooseMenuLink");
    const chooseMenuLinkMobile = document.getElementById("chooseMenuLinkMobile");
    const chooseTableLink = document.getElementById('chooseTableLink');
    const chooseTableLinkMobile = document.getElementById('chooseTableLinkMobile');
    const modal = document.getElementById('tableModal');
    const closeChonban = document.querySelector(".modal--close-chonban");
    const actionNav = document.getElementById('action-nav');

    // Hàm xử lý click Thực đơn
    const handleMenuClick = (e) => {
        e.preventDefault();
        filterMenu.style.display = "block";
        heroMenu.style.display = "block";
        heroTop.style.display = "none";
        orderDetail.style.display = "none";
        cartModalDark.style.display = "none";

        // Đóng menu mobile sau khi click
        if (actionNav.checked) {
            actionNav.checked = false;
        }
    };
    const handleTableClick = (e) => {
        e.preventDefault();
        modal.style.display = "block";
        renderTables();
        if (actionNav.checked) {
            actionNav.checked = false;
        }
    };

    chooseMenuLink.onclick = handleMenuClick;
    chooseMenuLinkMobile.onclick = handleMenuClick;
    chooseTableLink.onclick = handleTableClick;
    chooseTableLinkMobile.onclick = handleTableClick;

    closeChonban.onclick = () => modal.style.display = "none";
});
// info
document.getElementById("profile-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Thông tin đã được lưu!");
    });