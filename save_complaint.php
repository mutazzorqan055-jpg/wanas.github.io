<?php
// إعداد الاتصال بقاعدة البيانات
$servername = "localhost";
$username = "الاسم"; // غيّر حسب إعداداتك
$password = "كلمة المرور";     // غيّر حسب إعداداتك
$dbname = "server_db";
    <ul id="complaintsList"></ul>

$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
  die("فشل الاتصال: " . $conn->connect_error);
}

// استقبال البيانات من الفورم
$name = $_POST['name'];
$complaint = $_POST['complaint'];

// إدخال البيانات في الجدول
$sql = "INSERT INTO complaints (name, complaint) VALUES ('$name', '$complaint')";

if ($conn->query($sql) === TRUE) {
  echo "تم حفظ الشكوى بنجاح!";
} else {
  echo "خطأ: " . $conn->error;
}

$conn->close();
?>
