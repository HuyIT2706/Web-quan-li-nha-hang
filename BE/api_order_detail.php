<?php
session_start();
header('Content-Type: application/json');
include('database.php');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Chưa đăng nhập']);
    exit;
}
$user_id = $_SESSION['user_id'];

// Lấy tất cả đơn hàng pending của user
$sql = "SELECT order_id, table_id, total_amount, status, order_date
        FROM orders
        WHERE user_id = ? AND status = 'pending'
        ORDER BY order_date DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$orders = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

$orderList = [];
foreach ($orders as $order) {
    $order_id = $order['order_id'];
    // Lấy chi tiết sản phẩm cho từng đơn hàng
    $sql = "SELECT p.name, oi.quantity, oi.price, (oi.quantity * oi.price) as total
            FROM order_items oi
            JOIN products p ON oi.product_id = p.product_id
            WHERE oi.order_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $order_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    $stmt->close();
    $orderList[] = [
        'order' => $order,
        'items' => $items
    ];
}

echo json_encode([
    'success' => true,
    'orders' => $orderList
]);
$conn->close();