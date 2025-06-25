<?php
include 'database.php';
header('Content-Type: application/json');

// Nếu có truyền product_id thì trả về chi tiết các đơn hàng chứa sản phẩm này
if (isset($_GET['product_id'])) {
    $product_id = intval($_GET['product_id']);
    $sql = "SELECT 
                o.order_id,
                o.order_date,
                oi.quantity,
                oi.price
            FROM orders o
            JOIN order_items oi ON o.order_id = oi.order_id
            WHERE o.status = 'completed' AND oi.product_id = $product_id
            ORDER BY o.order_date DESC";
    $result = $conn->query($sql);
    $details = [];
    while ($row = $result->fetch_assoc()) {
        $details[] = $row;
    }
    echo json_encode($details, JSON_UNESCAPED_UNICODE);
    exit;
}

$category = isset($_GET['category']) ? $_GET['category'] : '';
$search = isset($_GET['search']) ? $_GET['search'] : '';

// Lấy tất cả đơn hàng đã hoàn thành
$sql = "SELECT 
            o.order_id,
            o.order_date,
            oi.product_id,
            p.name as product_name,
            p.category,
            p.image,
            oi.quantity,
            oi.price,
            (oi.quantity * oi.price) as total
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.status = 'completed'";

if ($category && $category !== 'Tất cả') {
    $sql .= " AND p.category = '$category'";
}

if ($search) {
    $sql .= " AND p.name LIKE '%$search%'";
}

$sql .= " ORDER BY o.order_date DESC";

$result = $conn->query($sql);

$statistics = [];
while ($row = $result->fetch_assoc()) {
    $statistics[] = $row;
}

echo json_encode($statistics, JSON_UNESCAPED_UNICODE);
?> 