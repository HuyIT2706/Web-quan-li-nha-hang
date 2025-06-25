<?php
include 'database.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$staff_id = $data['staff_id'];

$sql = "DELETE FROM staff_accounts WHERE staff_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $staff_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Xóa thành công!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Xóa thất bại!']);
}
?> 