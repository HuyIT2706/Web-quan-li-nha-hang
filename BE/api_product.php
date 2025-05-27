<?php
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include('database.php'); 

try {
    mysqli_set_charset($conn, "utf8");

    if (isset($_GET['id'])) {
        $id = mysqli_real_escape_string($conn, $_GET['id']);
        $sql = "SELECT * FROM products WHERE product_id = '$id' AND status = 'available'";
    } else {
        $sql = "SELECT * FROM products WHERE status = 'available' ORDER BY product_id ASC";
    }
    
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        throw new Exception(mysqli_error($conn));
    }

    $products = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $products[] = $row;
    }

    if (isset($_GET['id'])) {
        echo json_encode($products[0] ?? null, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode($products, JSON_UNESCAPED_UNICODE);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
?>