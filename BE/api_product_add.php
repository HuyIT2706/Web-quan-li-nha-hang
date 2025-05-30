<?php
include('database.php');
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';
    $category = $_POST['category'] ?? '';
    $price = $_POST['price'] ?? '';
    $image = $_POST['image'] ?? '';
    $status = 'available';

    $sql = "INSERT INTO products (name, description, category, price, image, status) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $name, $description, $category, $price, $image, $status);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Thêm sản phẩm thành công!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi thêm sản phẩm!']);
    }
    $stmt->close();
}
?> 