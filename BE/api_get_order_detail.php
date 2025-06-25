<?php
include 'database.php';
header('Content-Type: application/json');

$order_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sqlOrder = "SELECT 
    o.order_id,
    o.order_date AS thoigiandat,
    u.lastname,
    u.firstname,
    u.phone AS sdtnhan,
    o.table_id AS diachinhan,
    o.total_amount AS tongtien,
    o.status AS trangthai
FROM orders o
JOIN users u ON o.user_id = u.user_id
WHERE o.order_id = $order_id
LIMIT 1";
$orderRes = $conn->query($sqlOrder);
$order = $orderRes->fetch_assoc();
$order['tenguoinhan'] = $order['lastname'] . ' ' . $order['firstname'];

// Lấy chi tiết sản phẩm trong đơn
$sqlItems = "SELECT 
    p.product_id AS id,
    p.name AS title,
    p.image AS img,
    oi.quantity AS soluong,
    oi.price
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
WHERE oi.order_id = $order_id";
$itemsRes = $conn->query($sqlItems);

$items = [];
while ($row = $itemsRes->fetch_assoc()) {
    $items[] = $row;
}

// Gộp lại thành 1 object trả về cho FE
echo json_encode([
    'order' => $order,
    'items' => $items
], JSON_UNESCAPED_UNICODE);
?>