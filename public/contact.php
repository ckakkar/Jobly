<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['Message'];

$to = 'cyruskakkar@gmail.com'
$subject ='CMPT276 GRP4'
$msg = $name . " " . $email . " " . $message;

mail($to, $subject, $msg);

header('Location: Contact.html');
exit;
?>