<?php
$host = 'SEU_HOST_DO_SUPABASE';
$port = '5432';
$dbname = 'postgres';
$user = 'SEU_USUARIO';
$password = 'SUA_SENHA';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
} catch (PDOException $e) {
    echo "Erro de conexão: " . $e->getMessage();
    exit;
}
?>
