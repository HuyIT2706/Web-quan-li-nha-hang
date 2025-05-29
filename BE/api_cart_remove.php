<?php
session_start();
include('database.php');
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Chưa đăng nhập']);
    exit;
}

$user_id = $_SESSION['user_id'];
$order_item_id = $_POST['order_item_id'] ?? null;

if (!$order_item_id) {
    echo json_encode(['success' => false, 'message' => 'Thiếu dữ liệu']);
    exit;
}
$sql = "SELECT oi.order_item_id
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.order_id
        WHERE oi.order_item_id = ? AND o.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $order_item_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Không tìm thấy món này hoặc không có quyền xóa']);
    exit;
}
$stmt->close();

$stmt = $conn->prepare("DELETE FROM order_items WHERE order_item_id = ?");
$stmt->bind_param("i", $order_item_id);
$stmt->execute();

echo json_encode(['success' => true]);
$conn->close();