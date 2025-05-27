<?php
session_start();
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['table_id'])) {
    echo json_encode(['success' => false, 'message' => 'Thiếu mã bàn']);
    exit;
}
$_SESSION['selected_table_id'] = $data['table_id'];

echo json_encode(['success' => true]);
