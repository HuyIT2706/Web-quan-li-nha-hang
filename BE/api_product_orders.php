<?php
require_once("config.php");

$product_id = $_GET['product_id'] ?? '';

$sql = "SELECT o.order_id, oi.quantity, oi.price, o.order_date as time
        FROM order_items oi
        JOIN orders o ON o.order_id = oi.order_id
        WHERE oi.product_id = :product_id";
$stmt = $conn->prepare($sql);
$stmt->execute([':product_id' => $product_id]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);