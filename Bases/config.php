<?php
// Configurações básicas
define('BASE_URL', 'http://localhost/siga/');
define('SITE_NAME', 'SIGA - Sistema Inteligente de Gestão Acadêmica');
define('DB_PATH', __DIR__ . '/../database/siga.db');

// Configurações de sessão
session_start();

// Criar banco de dados e tabelas se não existirem
if (!file_exists(DB_PATH)) {
    $db = new SQLite3(DB_PATH);
    $db->exec("
        CREATE TABLE usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");
    $db->close();
}