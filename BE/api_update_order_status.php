<?php
include 'database.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$order_id = intval($data['order_id']);

// Lấy table_id của đơn hàng
$sqlGetTable = "SELECT table_id FROM orders WHERE order_id = $order_id LIMIT 1";
$res = $conn->query($sqlGetTable);
$row = $res->fetch_assoc();
$table_id = $row['table_id'];

// Cập nhật trạng thái đơn hàng
$sqlOrder = "UPDATE orders SET status = 'completed' WHERE order_id = $order_id";
$conn->query($sqlOrder);

// Cập nhật trạng thái bàn
$sqlTable = "UPDATE tables SET status = 'available' WHERE table_id = $table_id";
$conn->query($sqlTable);

echo json_encode(['success' => true, 'message' => 'Cập nhật trạng thái thành công!']);
?> 