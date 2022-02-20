<?php

$json = file_get_contents('../products.json');
$json = json_decode($json, true);

$message = '';
$message .= '<h1>Shop order</h1>';
$message .= '<p>Phone: '.$_POST['phone'].'</p>';
$message .= '<p>Email: '.$_POST['email'].'</p>';
$message .= '<p>Name: '.$_POST['name'].'</p>';

$cart = $_POST['cart'];
$sum = 0;

foreach ($cart as $id=>$count) {
    $message .=$json[$id]['title'].'---';
    $message .=$count.'---';
    $message .=$count*$json[$id]['price'];
    $message .='<br>';
    $sum = $sum +$count*$json[$id]['price'];
}
$message .='Total: '.$sum


$to = 'antonychhh@gmail.com'.',';
$to .=$_POST['email'];
$spectext = '<!DOCTYPE html><html><head><title>Order</title></head><body>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'Shop order', $spectext.$message.'</body></html>', $headers);

if ($m) {echo 1;} else {echo 0;} 