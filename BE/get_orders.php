<?php
session_start();
include 'database.php';

// Lấy user_id từ session
$user_id = isset($_SESSION['user_id']) ? intval($_SESSION['user_id']) : null;
if (!$user_id) {
    http_response_code(401); // Unauthorized
    die(json_encode(["error" => "Bạn chưa đăng nhập!"]));
}

// Truy vấn dữ liệu đơn hàng đang xử lý của user
$sql = "SELECT 
            oi.*, 
            p.name AS product_name, 
            p.image AS image_path, 
            o.table_id, 
            o.status, 
            o.total_amount
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.user_id = $user_id AND o.status = 'in_progress'
        ORDER BY o.order_id DESC";
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
$jsonData = json_encode($orders, JSON_UNESCAPED_UNICODE);
if (json_last_error() !== JSON_ERROR_NONE) {
    die(json_encode(["error" => "Lỗi JSON: " . json_last_error_msg()]));
}

header('Content-Type: application/json');
echo $jsonData;
?>