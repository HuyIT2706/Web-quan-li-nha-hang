<?php
header('Content-Type: application/json');
include 'database.php';

$input_raw = file_get_contents('php://input');

$data = json_decode($input_raw, true);

if ($data === null) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu JSON không hợp lệ']);
    exit;
}

if (!isset($data['table_id']) || !isset($data['status'])) {
    echo json_encode(['success' => false, 'message' => 'Thiếu dữ liệu đầu vào']);
    exit;
}

$table_id = (int)$data['table_id'];
$status = $data['status'];

$allowed_status = ['available', 'occupied', 'reserved'];
if (!in_array($status, $allowed_status)) {
    echo json_encode(['success' => false, 'message' => 'Trạng thái không hợp lệ']);
    exit;
}

// Loi: Không thể reset bàn cũ về trạng thái còn trống - Tuyet
$stmt_check = $conn->prepare("SELECT status FROM tables WHERE table_id = ?");
$stmt_check->bind_param("i", $table_id);
$stmt_check->execute();
$stmt_check->bind_result($current_status);
if ($stmt_check->fetch()) {
    if ($current_status === $status) {

        echo json_encode(['success' => true, 'message' => 'Trạng thái đã đúng']);
        $stmt_check->close();
        $conn->close();
        exit;
    }
}
$stmt_check->close();

$stmt = $conn->prepare("UPDATE tables SET status = ? WHERE table_id = ?");
$stmt->bind_param("si", $status, $table_id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'Cập nhật trạng thái bàn thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không tìm thấy bàn']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Lỗi cập nhật dữ liệu']);
}
// Đóng 
$stmt->close();
$conn->close();
