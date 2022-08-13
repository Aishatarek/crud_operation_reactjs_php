<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
$host = "localhost";
$user = "root";
$password = "";
$dbname = "api";
$id = '';

$con = mysqli_connect($host, $user, $password, $dbname);

$method = $_SERVER['REQUEST_METHOD'];


if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

switch ($method) {
    case 'GET':
        if (isset($_GET["id"])) {
            $id = $_GET['id'];
        }
        $sql = "select * from users" . ($id ? " where id=$id" : '');
        break;
    case 'POST':
        if (isset($_GET["id"])) {
            $id = $_GET['id'];
            $name = $_POST["name"];
            $email = $_POST["email"];
            $designation = $_POST["designation"];
            $sql = "UPDATE users SET name='$name', email='$email',  designation='$designation' WHERE id = $id";
        } else if (isset($_GET["delete"])) {
            $delete = $_GET['delete'];
            $sql = "DELETE FROM users WHERE id = $delete";
        } else {
            $name = $_POST["name"];
            $email = $_POST["email"];
            $designation = $_POST["designation"];
            $sql = "insert into users (name, email,  designation) values ('$name', '$email', '$designation')";
        }
        break;
}

// run SQL statement
$result = mysqli_query($con, $sql);

// die if SQL statement failed
if (!$result) {
    http_response_code(404);
    die(mysqli_error($con));
}

if ($method == 'GET') {
    if (!$id) {
        $employeeArr = array();
        while ($row = $result->fetch_assoc()) {
            array_push($employeeArr, $row);
        }
        echo json_encode($employeeArr);
    } else {
        while ($row = mysqli_fetch_assoc($result)) {
            $output = $row;
        }
        echo json_encode($output);
    }
} elseif ($method == 'POST') {
    echo json_encode($result);
} else {
    echo mysqli_affected_rows($con);
}

$con->close();
