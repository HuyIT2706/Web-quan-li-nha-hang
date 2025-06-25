<?php
include('database.php');
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product_id = $_POST['product_id'] ?? '';
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';
    $category = $_POST['category'] ?? '';
    $price = $_POST['price'] ?? '';
    $image = $_POST['image'] ?? '';

    $sql = "UPDATE products SET name=?, description=?, category=?, price=?, image=? WHERE product_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi", $name, $description, $category, $price, $image, $product_id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Cập nhật sản phẩm thành công!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi cập nhật sản phẩm!']);
    }
    $stmt->close();
}
?> 