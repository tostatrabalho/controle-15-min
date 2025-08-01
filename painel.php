<?php
session_start();
require 'conexao.php';

$email = $_POST['email'];
$senha = $_POST['senha'];

$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = :email AND senha = :senha");
$stmt->execute(['email' => $email, 'senha' => $senha]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    $_SESSION['usuario'] = $user;
    if ($user['permissao'] === 'colaborador') {
        header('Location: colaborador.php');
    } else {
        header('Location: supervisor.php');
    }
} else {
    echo "Login inválido";
}
?>
