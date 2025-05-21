<?php
include 'db.php';
header('Content-Type: application/json; charset=UTF-8');

// Kiểm tra kết nối
if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Không thể kết nối đến cơ sở dữ liệu."]);
    exit;
}

// Truy vấn dữ liệu
$sql = "
    SELECT 
        oi.id, 
        oi.order_id, 
        oi.product_name, 
        oi.quantity, 
        oi.note, 
        oi.price, 
        oi.image_path, 
        o.customer_name, 
        o.table_number, 
        o.status, 
        o.total_price
    FROM 
        order_items oi
    JOIN 
        orderss o ON oi.order_id = o.id
";

$result = $conn->query($sql);

// Kiểm tra lỗi truy vấn
if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi truy vấn SQL: " . $conn->error]);
    exit;
}

// Xử lý kết quả
$orders = [];
while ($row = $result->fetch_assoc()) {
    $orderId = $row['order_id'];

    // Nếu đơn hàng chưa có trong mảng $orders, thêm vào
    if (!isset($orders[$orderId])) {
        $orders[$orderId] = [
            "table_number" => $row["table_number"],
            "status" => $row["status"],
            "total_price" => $row["total_price"],
            "items" => []
        ];
    }

    // Thêm sản phẩm vào đơn hàng
    $orders[$orderId]["items"][] = [
        "name" => $row["product_name"],
        "image" => $row["image_path"],
        "note" => $row["note"],
        "quantity" => $row["quantity"],
        "price" => $row["price"]
    ];
}

// Chỉ giữ lại các giá trị trong mảng $orders
$orders = array_values($orders);

// Trả kết quả JSON
echo json_encode($orders, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
