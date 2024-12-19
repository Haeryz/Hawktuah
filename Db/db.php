<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pirdas_modul6";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate POST parameters
    if (
        !empty($_POST["angleX"]) && 
        !empty($_POST["angleY"]) && 
        !empty($_POST["buzzer_status"]) && 
        !empty($_POST["led_status"]) && 
        !empty($_POST["mpu_status"])
    ) {
        $angleX = $conn->real_escape_string($_POST["angleX"]);
        $angleY = $conn->real_escape_string($_POST["angleY"]);
        $buzzer_status = $conn->real_escape_string($_POST["buzzer_status"]);
        $led_status = $conn->real_escape_string($_POST["led_status"]);
        $mpu_status = $conn->real_escape_string($_POST["mpu_status"]);

        $sql = "INSERT INTO sensor_data (angleX, angleY, buzzer_status, led_status, mpu_status) 
                VALUES ('$angleX', '$angleY', '$buzzer_status', '$led_status', '$mpu_status')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Data successfully added"]);
        } else {
            echo json_encode(["error" => "Database error: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Incomplete parameters!"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM sensor_data";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo json_encode([]);
    }
}

$conn->close();
?>
