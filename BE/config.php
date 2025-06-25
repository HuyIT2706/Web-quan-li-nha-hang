<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');
// Database configuration
<<<<<<< HEAD
$host = 'localhost';
$dbname = 'quanlinhahang';
$username = 'root';
$password = '27062005';
=======
include 'database.php';
>>>>>>> master

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
<<<<<<< HEAD
define('VNPAY_TMN_CODE', 'V0T1ZDFX');
define('VNPAY_HASH_SECRET', '8W5SYCEV3XWBLW43FEH5ABLYYI7WTNWL');
=======
define('VNPAY_TMN_CODE', 'XLHSHOAP');
define('VNPAY_HASH_SECRET', 'YIEPR8Z7CVTS5GA4YMSPEO84GWPKNYZK');
>>>>>>> master
define('VNPAY_URL', 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html');
define('VNPAY_RETURN_URL', 'http://localhost/webnhahang/BE/vnpay_return.php');

// Session configuration
session_start();
?> 