<?php
require_once 'config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Bạn chưa đăng nhập']);
    exit;
}
$user_id = $_SESSION['user_id'];

$input = json_decode(file_get_contents('php://input'), true);
$amount = isset($input['amount']) ? floatval($input['amount']) : null;
if (!$amount) {
    echo json_encode(['success' => false, 'message' => 'Thiếu số tiền thanh toán']);
    exit;
}

try {
    // Lấy order_id đơn hàng pending của user
    $stmt = $conn->prepare("SELECT order_id FROM orders WHERE user_id = ? AND status = 'pending' ORDER BY order_date DESC LIMIT 1");
    $stmt->execute([$user_id]);
    $order_id = $stmt->fetchColumn();
    if (!$order_id) {
        echo json_encode(['success' => false, 'message' => 'Không tìm thấy đơn hàng cần thanh toán']);
        exit;
    }
    // Lưu vào bảng payments
    $stmt3 = $conn->prepare("INSERT INTO payments (order_id, payment_method, amount) VALUES (?, 'cash', ?)");
    $stmt3->execute([$order_id, $amount]);
    // Cập nhật trạng thái đơn hàng
    $stmt4 = $conn->prepare("UPDATE orders SET status = 'pending' WHERE order_id = ?");
    $stmt4->execute([$order_id]);
    echo json_encode(['success' => true, 'message' => 'Thanh toán tiền mặt tại quầy!']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
}
?> 