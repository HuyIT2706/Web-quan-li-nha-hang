document.addEventListener("DOMContentLoaded", () => {
    // 🔥 Xử lý Giỏ Hàng & Đặt Món
    const homeContainer = document.getElementById("home--container");
    const cartModalDark = document.getElementById("cartModalDark");
    const orderDetail = document.getElementById("order-detail");
    const filterMenu = document.getElementById("filter-menu");
    const heroTop = document.getElementById("hero-top");
    const heroMenu = document.getElementById("hero--bottom_menu");

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
        localStorage.setItem("orderPaid", "true"); // ✅ Lưu trạng thái thanh toán
    };

    const handleDatThemMon = () => {
        orderDetail.style.display = "none";
        cartModalDark.style.display = "block";
    };

    // 🔥 Kiểm tra Trạng Thái Thanh Toán trước khi vào `getOrders.html`
    if (window.location.pathname.includes("getOrders.html")) {
        if (!localStorage.getItem("orderPaid")) {
            window.location.href = "index.html"; // 🚨 Ngăn vào nếu chưa thanh toán!
        }
    }

    // 🔥 Fetch & Render Đơn Hàng Đã Mua
    const fetchOrders = () => {
        fetch("getOrders.php")
            .then(response => {
                if (!response.ok) throw new Error(`Lỗi HTTP: ${response.status}`);
                return response.json();
            })
            .then(data => {
                const orderList = document.getElementById("orders");
                if (!orderList) return;
                orderList.innerHTML = "";
                data.forEach(order => {
                    let orderHTML = `
                        <div class="order-card">
                            <img src="${order.image_path}" alt="${order.product_name}" class="order-card__image">
                            <div class="order-card__info">
                                <p class="order-card__name">${order.product_name}</p>
                                <p class="order-card__note">✎ ${order.note || "Không có ghi chú"}</p>
                                <p class="order-card__quantity">x${order.quantity}</p>
                                <div class="order-card__price">${order.price.toLocaleString()} đ</div>
                            </div>
                            <div class="order-card__footer">
                                <span class="order-card__badge">🚀 ${order.status.toUpperCase()}</span>
                                <span class="order-card__table">👁️ Bàn ${order.table_number}</span>
                                <div class="order-card__total">Tổng tiền: <strong>${order.total_price.toLocaleString()} đ</strong></div>
                            </div>
                        </div>
                    `;
                    orderList.innerHTML += orderHTML;
                });
            })
            .catch(error => console.error("Lỗi:", error));
    };

    // 🔥 Xử lý sự kiện "Đơn hàng đã mua"
    const orderButton = document.getElementById("orderHistoryBtn");
    if (orderButton) {
        orderButton.addEventListener("click", () => {
            window.location.href = "getOrders.html"; // Chuyển hướng đến trang hiển thị đơn hàng
        });
    }

    // ✅ **Fetch dữ liệu ngay khi vào `getOrders.html`**
    if (window.location.pathname.includes("getOrders.html")) {
        fetchOrders();
    }
});

