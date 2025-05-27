<?php
include 'db.php';
header('Content-Type: application/json');
// Kiểm tra kết nối
if (!$conn) {
    die(json_encode(["error" => "Không thể kết nối database"]));
}

// Truy vấn dữ liệu
$sql = "SELECT oi.id, oi.order_id, oi.product_name, oi.quantity, oi.note, oi.price, oi.image_path, 
        o.customer_name, o.table_number, o.status, o.total_price
        FROM order_items oi
        JOIN orderss o ON oi.order_id = o.id";
$result = $conn->query($sql);

// Kiểm tra lỗi truy vấn
if (!$result) {
    die(json_encode(["error" => "Lỗi SQL: " . $conn->error]));
}

$orders = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

// Kiểm tra JSON
$jsonData = json_encode($orders);
if (json_last_error() !== JSON_ERROR_NONE) {
    die(json_encode(["error" => "Lỗi JSON: " . json_last_error_msg()]));
}

header('Content-Type: application/json');
echo $jsonData;
?>