<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');
// Database configuration
include 'database.php';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
define('VNPAY_TMN_CODE', 'XLHSHOAP');
define('VNPAY_HASH_SECRET', 'YIEPR8Z7CVTS5GA4YMSPEO84GWPKNYZK');
define('VNPAY_URL', 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html');
define('VNPAY_RETURN_URL', 'http://localhost/webnhahang/BE/vnpay_return.php');

// Session configuration
session_start();
