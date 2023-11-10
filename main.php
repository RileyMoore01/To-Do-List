<?php
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "todolist";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve tasks
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM tasks");
    $tasks = [];

    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }

    echo json_encode($tasks);
}

// Add task
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if ($data && isset($data->task)) {
        $task = $conn->real_escape_string($data->task);
        $conn->query("INSERT INTO tasks (task) VALUES ('$task')");
        echo json_encode(['message' => 'Task added successfully']);
    } else {
        echo json_encode(['error' => 'Invalid data']);
    }
}

// Mark task as completed
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    if ($data && isset($data->id)) {
        $id = $conn->real_escape_string($data->id);
        $conn->query("UPDATE tasks SET completed = 1 WHERE id = $id");
        echo json_encode(['message' => 'Task marked as completed']);
    } else {
        echo json_encode(['error' => 'Invalid data']);
    }
}

// Close connection
$conn->close();
?>