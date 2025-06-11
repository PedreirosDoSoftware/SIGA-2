<?php
require_once '../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = sanitizeInput($_POST['nome']);
    $email = sanitizeInput($_POST['email']);
    $senha = sanitizeInput($_POST['senha']);
    $confirmarSenha = sanitizeInput($_POST['confirmarSenha']);

    // Validações
    $errors = [];

    if (empty($nome)) {
        $errors[] = 'O nome é obrigatório';
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email inválido';
    }

    if (strlen($senha) < 6) {
        $errors[] = 'A senha deve ter pelo menos 6 caracteres';
    }

    if ($senha !== $confirmarSenha) {
        $errors[] = 'As senhas não coincidem';
    }

    if (empty($errors)) {
        if (registerUser($nome, $email, $senha)) {
            $_SESSION['register_success'] = 'Cadastro realizado com sucesso! Faça login para continuar.';
            redirect('../login.php');
        } else {
            $errors[] = 'Este email já está cadastrado';
        }
    }

    $_SESSION['register_errors'] = $errors;
    redirect('../cadastro.php');
} else {
    redirect('../cadastro.php');
}