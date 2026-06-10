<?php
$servername = "localhost";
$username = "الاسم"; // غيّر حسب إعداداتك
$password = "كلمة المرور";     // غيّر حسب إعداداتك
$dbname = "server_db";
    <ul id="complaintsList"></ul>
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("فشل الاتصال: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM complaints ORDER BY created_at DESC");
?>

<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <title>عرض الشكاوي</title>
</head>
<body>
  <h1>الشكاوي المحفوظة</h1>
  <ul>
    <?php while($row = $result->fetch_assoc()): ?>
      <li>
        <strong><?php echo $row['name']; ?>:</strong>
        <?php echo $row['complaint']; ?>
        <em>(<?php echo $row['created_at']; ?>)</em>
      </li>
    <?php endwhile; ?>
  </ul>
</body>
</html>

<?php $conn->close(); ?>
