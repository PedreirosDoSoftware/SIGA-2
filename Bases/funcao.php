<?php
require_once 'config.php';
require_once 'db.php';

function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function redirect($url) {
    header("Location: " . $url);
    exit();
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function loginUser($email, $senha) {
    $db = new Database();
    
    $user = $db->fetch(
        "SELECT id, nome, senha FROM usuarios WHERE email = :email",
        [':email' => $email]
    );
    
    if ($user && password_verify($senha, $user['senha'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_nome'] = $user['nome'];
        return true;
    }
    
    return false;
}

function registerUser($nome, $email, $senha) {
    $db = new Database();
    
    // Verifica se o email já existe
    $existing = $db->fetch(
        "SELECT id FROM usuarios WHERE email = :email",
        [':email' => $email]
    );
    
    if ($existing) {
        return false; // Email já cadastrado
    }
    
    // Hash da senha
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
    
    // Insere o novo usuário
    $success = $db->query(
        "INSERT INTO usuarios (nome, email, senha) VALUES (:nome, :email, :senha)",
        [
            ':nome' => $nome,
            ':email' => $email,
            ':senha' => $senhaHash
        ]
    );
    
    return $success !== false;
}

function displayErrors($errors) {
    if (!empty($errors)) {
        echo '<div class="alert alert-danger">';
        echo '<ul>';
        foreach ($errors as $error) {
            echo '<li>' . htmlspecialchars($error) . '</li>';
        }
        echo '</ul>';
        echo '</div>';
    }
}