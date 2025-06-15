<?php
include('database.php'); 

header('Content-Type: application/json');

$sql = "SELECT table_id AS id, table_name AS name, status FROM tables ORDER BY table_id ASC";
$result = mysqli_query($conn, $sql);

$tables = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $tables[] = $row;
    }
}

echo json_encode($tables);
