<?php
session_start();
include('database.php');
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Chưa đăng nhập']);
    exit;
}

$order_item_id = $_POST['order_item_id'] ?? null;
$quantity = $_POST['quantity'] ?? null;

if (!$order_item_id || !$quantity || $quantity < 1) {
    echo json_encode(['success' => false, 'message' => 'Thiếu dữ liệu']);
    exit;
}

// Kiểm tra quyền sở hữu
$sql = "SELECT oi.order_item_id
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.order_id
        WHERE oi.order_item_id = ? AND o.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $order_item_id, $_SESSION['user_id']);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Không có quyền cập nhật']);
    exit;
}
$stmt->close();

// Cập nhật số lượng
$stmt = $conn->prepare("UPDATE order_items SET quantity = ? WHERE order_item_id = ?");
$stmt->bind_param("ii", $quantity, $order_item_id);
$stmt->execute();

echo json_encode(['success' => true]);
$conn->close();