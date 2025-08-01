<?php
session_start();
if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['permissao'] !== 'supervisor') {
    header('Location: index.php');
    exit;
}
?>
<h1>Bem-vindo, supervisor!</h1>
<a href="logout.php">Sair</a>
