<?php
require_once("config.php");
header('Content-Type: application/json');

// Nhận dữ liệu lọc từ frontend
$category = $_GET['category'] ?? '';
$keyword = $_GET['keyword'] ?? '';

// Câu SQL cơ bản
$sql = "SELECT 
            p.product_id AS id,
            p.name,
            p.image,
            p.category,
            SUM(oi.quantity) AS total_quantity,
            SUM(oi.quantity * oi.price) AS revenue
        FROM order_items oi
        JOIN products p ON p.product_id = oi.product_id
        JOIN orders o ON o.order_id = oi.order_id
        WHERE 1 = 1";

// Thêm điều kiện lọc nếu có
$params = [];
$bind = [];

if (!empty($category) && strtolower($category) !== 'tất cả') {
    $sql .= " AND p.category = :category";
    $bind[':category'] = $category;
}
if (!empty($keyword)) {
    $sql .= " AND p.name LIKE :keyword";
    $bind[':keyword'] = "%" . $keyword . "%";
}

$sql .= " GROUP BY p.product_id";

// Chuẩn bị truy vấn PDO
$stmt = $conn->prepare($sql);
$stmt->execute($bind);

// Trả kết quả JSON
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
