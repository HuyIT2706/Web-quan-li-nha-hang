<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Bật hiển thị lỗi (giúp debug lỗi 500)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Kết nối database
$servername = "localhost:3307";
$username = "root";
$password = "bangbang";
$dbname = "quanlinhahang";

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Kết nối thất bại: " . mysqli_connect_error()]);
    exit;
}

// Truy vấn dữ liệu sản phẩm
$sql = "SELECT * FROM products";
$result = mysqli_query($conn, $sql);

// Kiểm tra kết quả
if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi truy vấn: " . mysqli_error($conn)]);
    exit;
}

$products = [];
while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

echo json_encode($products);
?>