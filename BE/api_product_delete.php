<?php
include('database.php');
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product_id = $_POST['product_id'] ?? '';
    $sql = "DELETE FROM products WHERE product_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $product_id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Xóa sản phẩm thành công!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi xóa sản phẩm!']);
    }
    $stmt->close();
}
?> 