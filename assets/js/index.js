// Main script to handle UI interactions and fetch/render orders
document.addEventListener("DOMContentLoaded", () => {
     fetch('get_orders.php')
        .then(res => res.json())
        .then(data => {
            console.log("Dữ liệu từ get_orders.php:", data); // ← Xem log trong console
        })
        .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));

    // DOM Elements
    const homeContainer = document.getElementById("home--container");
    const cartModalDark = document.getElementById("cartModalDark");
    const orderDetail = document.getElementById("order-detail");
    const filterMenu = document.getElementById("filter-menu");
    const heroTop = document.getElementById("hero-top");
    const heroMenu = document.getElementById("hero--bottom_menu");
    const orderButton = document.getElementById("orderHistoryBtn");

    // UI Handlers
    const handleCart = () => {
        homeContainer.style.display = "none";
        cartModalDark.style.display = "block";
        orderDetail.style.display = "none";
        filterMenu.style.display = "none";
        heroMenu.style.display = "none";
    };

    const handleQuayLai = () => {
        homeContainer.style.display = "block";
        cartModalDark.style.display = "none";
        filterMenu.style.display = "block";
        heroTop.style.display = "none";
        heroMenu.style.display = "block";
    };

    const handleDatMua = () => {
        orderDetail.style.display = "block";
        cartModalDark.style.display = "none";
        localStorage.setItem("orderPaid", "true");
    };

    const handleDatThemMon = () => {
        orderDetail.style.display = "none";
        cartModalDark.style.display = "block";
    };

    // Fetch & Render Orders
    const fetchOrders = () => {
        fetch("getOrders.php")
            .then(response => response.json())
            .then(data => {
                const ordersList = document.getElementById("orders-list");
                if (!ordersList) return;
                ordersList.innerHTML = "";

                data.forEach(order => {
                    // Render từng đơn hàng
                    let itemsHtml = "";
                    order.items.forEach(item => {
                        itemsHtml += `
                            <div class="order-item" style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;">
                                <div style="display:flex;align-items:center;gap:12px;">
                                    <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;">
                                    <div>
                                        <b>${item.name}</b>
                                        <div style="font-size:13px;color:#888;">
                                            <i class="fas fa-pen"></i> ${item.note || "Không có ghi chú"}
                                        </div>
                                        <div style="font-size:13px;">x${item.quantity}</div>
                                    </div>
                                </div>
                                <div style="color:#d32f2f;font-weight:500;">${Number(item.price).toLocaleString()} đ</div>
                            </div>
                        `;
                    });

                    ordersList.innerHTML += `
                        <div class="order-card" style="background:#fff;border:1px solid #eee;border-radius:8px;margin-bottom:18px;padding:16px;">
                            <div>${itemsHtml}</div>
                            <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;">
                                <div>
                                    <span class="order-status-badge" style="background:#ff9800;color:#fff;padding:4px 12px;border-radius:16px;font-size:13px;">
                                        <i class="fas fa-bolt"></i> ${order.status || "ĐANG XỬ LÝ"}
                                    </span>
                                    <span style="margin-left:10px;background:#f5f5f5;padding:4px 10px;border-radius:16px;font-size:13px;">
                                        <i class="fas fa-eye"></i> BÀN ${order.table_number}
                                    </span>
                                </div>
                                <div style="font-weight:600;font-size:16px;color:#d32f2f;">
                                    Tổng tiền: <span>${Number(order.total_price).toLocaleString()} đ</span>
                                </div>
                            </div>
                        </div>
                    `;
                });
            })
            .catch(error => console.error("Lỗi:", error));
    };

    // Order history button
    if (orderButton) {
        orderButton.addEventListener("click", () => {
            window.location.href = "getOrders.html";
        });
    }

    if (window.location.pathname.includes("getOrders.html")) {
        fetchOrders();
    }

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
