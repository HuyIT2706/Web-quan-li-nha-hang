<?php
session_start();
header('Content-Type: application/json');
include('database.php');

if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Lấy tất cả order_id pending của user
$sql = "SELECT order_id FROM orders WHERE user_id = ? AND status = 'pending'";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$order_ids = [];
while ($row = $result->fetch_assoc()) {
    $order_ids[] = $row['order_id'];
}
$stmt->close();

if (empty($order_ids)) {
    echo json_encode([]);
    exit;
}

// Lấy toàn bộ món trong các order đó
$placeholders = implode(',', array_fill(0, count($order_ids), '?'));
$sql = "SELECT oi.order_item_id, oi.product_id, p.name, p.image, oi.quantity, oi.price, oi.order_id
        FROM order_items oi
        JOIN products p ON oi.product_id = p.product_id
        WHERE oi.order_id IN ($placeholders)";
$stmt = $conn->prepare($sql);
$stmt->bind_param(str_repeat('i', count($order_ids)), ...$order_ids);
$stmt->execute();
$result = $stmt->get_result();

$cart = [];
while ($row = $result->fetch_assoc()) {
    $cart[] = $row;
}
echo json_encode($cart);
$conn->close();