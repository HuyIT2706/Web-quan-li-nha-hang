<<<<<<< HEAD
<?php
session_start();
// var_dump($_SESSION); // Xem session hiện tại có gì
// exit;

include 'database.php';

// Nếu là admin và có truyền order_id, trả về chi tiết đơn hàng đó
if (isset($_SESSION['admin']) && isset($_GET['order_id'])) {
    $order_id = intval($_GET['order_id']);
    // Lấy thông tin đơn hàng
    $sql = "SELECT o.*, CONCAT(u.lastname, ' ', u.firstname) AS customer_name
            FROM orders o
            JOIN users u ON o.user_id = u.user_id
            WHERE o.order_id = $order_id";
    $result = $conn->query($sql);
    if (!$result || $result->num_rows == 0) {
        die(json_encode(["error" => "Không tìm thấy đơn hàng!"]));
    }
    $order = $result->fetch_assoc();

    // Lấy danh sách món
    $sql_items = "SELECT oi.*, p.name AS product_name, p.image AS image_path
                  FROM order_items oi
                  JOIN products p ON oi.product_id = p.product_id
                  WHERE oi.order_id = $order_id";
    $result_items = $conn->query($sql_items);
    $items = [];
    while ($row = $result_items->fetch_assoc()) {
        $items[] = $row;
    }
    $order['items'] = $items;

    header('Content-Type: application/json');
    echo json_encode($order, JSON_UNESCAPED_UNICODE);
    exit;
}

// Nếu là user thường, trả về danh sách các món trong các đơn hàng đang xử lý
$user_id = isset($_SESSION['user_id']) ? intval($_SESSION['user_id']) : null;
if (!$user_id) {
    http_response_code(401); // Unauthorized
    die(json_encode(["error" => "Bạn chưa đăng nhập!"]));
}

$sql = "SELECT 
            oi.*, 
            p.name AS product_name, 
            p.image AS image_path, 
            o.table_id, 
            o.status, 
            o.total_amount
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.user_id = $user_id AND o.status = 'in_progress'
        ORDER BY o.order_id DESC";
$result = $conn->query($sql);

if (!$result) {
    die(json_encode(["error" => "Lỗi SQL: " . $conn->error]));
}

$orders = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

$jsonData = json_encode($orders, JSON_UNESCAPED_UNICODE);
if (json_last_error() !== JSON_ERROR_NONE) {
    die(json_encode(["error" => "Lỗi JSON: " . json_last_error_msg()]));
}

header('Content-Type: application/json');
echo $jsonData;
?>
=======
<?php
session_start();
include 'database.php';

// Lấy user_id từ session
$user_id = isset($_SESSION['user_id']) ? intval($_SESSION['user_id']) : null;
if (!$user_id) {
    http_response_code(401); // Unauthorized
    die(json_encode(["error" => "Bạn chưa đăng nhập!"]));
}

// Truy vấn dữ liệu đơn hàng đang xử lý của user
$sql = "SELECT 
            oi.*, 
            p.name AS product_name, 
            p.image AS image_path, 
            o.table_id, 
            o.status, 
            o.total_amount
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.user_id = $user_id
        ORDER BY o.order_id DESC";
$result = $conn->query($sql);

// Kiểm tra lỗi truy vấn
if (!$result) {
    die(json_encode(["error" => "Lỗi SQL: " . $conn->error]));
}

$orders = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

// Kiểm tra JSON
$jsonData = json_encode($orders, JSON_UNESCAPED_UNICODE);
if (json_last_error() !== JSON_ERROR_NONE) {
    die(json_encode(["error" => "Lỗi JSON: " . json_last_error_msg()]));
}

header('Content-Type: application/json');
echo $jsonData;
>>>>>>> master
