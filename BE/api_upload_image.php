<?php
$target_dir = "../FE/assets/img/products/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$response = [];
if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    $response['success'] = true;
    $response['url'] = '../FE/assets/img/products/' . basename($_FILES["file"]["name"]);
} else {
    $response['success'] = false;
    $response['message'] = "Lỗi khi upload ảnh.";
}
echo json_encode($response);
?> 