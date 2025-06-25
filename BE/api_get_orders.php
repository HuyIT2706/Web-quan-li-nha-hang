<?php
include 'database.php';
header('Content-Type: application/json');

$sql = "SELECT 
            o.order_id AS id,
            CONCAT(u.lastname,' ', u.firstname) AS khachhang,
            o.order_date AS thoigiandat,
            o.total_amount AS tongtien,
            o.status AS trangthai
        FROM orders o
        JOIN users u ON o.user_id = u.user_id
        ORDER BY o.order_date DESC";
$result = $conn->query($sql);

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders, JSON_UNESCAPED_UNICODE);
?> 