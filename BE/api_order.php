<?php
require_once __DIR__ . '/database.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Kiểm tra đăng nhập
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Bạn chưa đăng nhập']);
    exit;
}

// Kiểm tra chọn bàn
if (!isset($_SESSION['selected_table_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Bạn chưa chọn bàn']);
    exit;
}

$user_id = $_SESSION['user_id'];
$table_id = $_SESSION['selected_table_id'];

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['items']) || !is_array($input['items']) || count($input['items']) == 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dữ liệu đơn hàng không hợp lệ']);
    exit;
}

$items = $input['items'];

$conn->begin_transaction();
try {

    $sqlFindOrder = "SELECT order_id FROM orders WHERE user_id = ? AND table_id = ? AND status = 'pending' LIMIT 1";
    $stmtFind = $conn->prepare($sqlFindOrder);
    $stmtFind->bind_param('ii', $user_id, $table_id);
    $stmtFind->execute();
    $resultFind = $stmtFind->get_result();

    if ($rowOrder = $resultFind->fetch_assoc()) {
        $order_id = $rowOrder['order_id'];
    } else {
        $sqlOrder = "INSERT INTO orders (user_id, table_id, status, order_date, total_amount) VALUES (?, ?, 'pending', NOW(), 0)";
        $stmtOrder = $conn->prepare($sqlOrder);
        $stmtOrder->bind_param('ii', $user_id, $table_id);
        $stmtOrder->execute();
        $order_id = $conn->insert_id;
    }

    foreach ($items as $item) {
        $product_id = intval($item['product_id']);
        $quantity = intval($item['quantity']);
        if ($quantity < 1) $quantity = 1;

        $stmtPrice = $conn->prepare("SELECT price FROM products WHERE product_id = ?");
        $stmtPrice->bind_param('i', $product_id);
        $stmtPrice->execute();
        $resPrice = $stmtPrice->get_result();
        $product = $resPrice->fetch_assoc();
        $stmtPrice->close();

        if (!$product) {
            throw new Exception("Sản phẩm không tồn tại (ID: $product_id)");
        }
        $price = $product['price'];

        $stmtSelect = $conn->prepare("SELECT order_item_id, quantity FROM order_items WHERE order_id = ? AND product_id = ?");
        $stmtSelect->bind_param('ii', $order_id, $product_id);
        $stmtSelect->execute();
        $resSelect = $stmtSelect->get_result();

        if ($rowItem = $resSelect->fetch_assoc()) {
            $new_qty = $rowItem['quantity'] + $quantity;
            $total = $new_qty * $price;
            $stmtUpdate = $conn->prepare("UPDATE order_items SET quantity = ?, total = ? WHERE order_item_id = ?");
            $stmtUpdate->bind_param('idi', $new_qty, $total, $rowItem['order_item_id']);
            $stmtUpdate->execute();
            $stmtUpdate->close();
        } else {
            $total = $quantity * $price;
            $stmtInsert = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity, price, total) VALUES (?, ?, ?, ?, ?)");
            $stmtInsert->bind_param('iiidd', $order_id, $product_id, $quantity, $price, $total);
            $stmtInsert->execute();
            $stmtInsert->close();
        }
        $stmtSelect->close();
    }
    $stmtUpdateTotal = $conn->prepare("UPDATE orders SET total_amount = (SELECT SUM(total) FROM order_items WHERE order_id = ?) WHERE order_id = ?");
    $stmtUpdateTotal->bind_param('ii', $order_id, $order_id);
    $stmtUpdateTotal->execute();
    $stmtUpdateTotal->close();

    $conn->commit();
    echo json_encode(['success' => true, 'order_id' => $order_id, 'message' => 'Đặt món thành công']);
} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Lỗi hệ thống: ' . $e->getMessage()]);
}

$conn->close();
