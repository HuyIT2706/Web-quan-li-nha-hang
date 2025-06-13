<?php
session_start();
include 'database.php'; // Đã có $conn

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Cập nhật trạng thái đơn hàng
    $order_id = $_POST['order_id'] ?? '';
    $status = $_POST['status'] ?? '';

    if ($order_id && $status !== '') {
        $stmt = $conn->prepare("UPDATE orders SET status = ? WHERE order_id = ?");
        $stmt->bind_param("ss", $status, $order_id);
        if ($stmt->execute()) {
            echo json_encode(["result" => "success"]);
        } else {
            echo json_encode(["result" => "fail"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["result" => "fail"]);
    }
} else {
    // Lấy danh sách đơn hàng (có join tên khách hàng)
    $status = $_GET['status'] ?? 'all';
    $keyword = $_GET['keyword'] ?? '';

    $sql = "SELECT o.order_id, CONCAT(u.lastname, ' ', u.firstname) AS customer_name, o.order_date, o.total_amount, o.status
            FROM orders o
            JOIN users u ON o.user_id = u.user_id
            WHERE 1";
    $params = [];
    $types = "";

    // Chỉ lọc nếu status khác 'all'
    if ($status !== 'all') {
        $sql .= " AND o.status = ?";
        $params[] = $status;
        $types .= "s";
    }
    if ($keyword !== '') {
        $sql .= " AND (REPLACE(CONCAT(u.lastname, ' ', u.firstname), '  ', ' ') LIKE ? OR o.order_id LIKE ?)";
        $params[] = "%$keyword%";
        $params[] = "%$keyword%";
        $types .= "ss";
    }
    $sql .= " ORDER BY o.order_date DESC";

    $stmt = $conn->prepare($sql);
    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    $result = $stmt->get_result();

    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
    echo json_encode($orders);
    $stmt->close();
}

$conn->close();