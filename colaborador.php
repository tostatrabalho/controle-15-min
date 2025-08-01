<?php
session_start();
if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['permissao'] !== 'colaborador') {
    header('Location: index.php');
    exit;
}
?>
<h1>Bem-vindo, colaborador!</h1>
<a href="logout.php">Sair</a>
