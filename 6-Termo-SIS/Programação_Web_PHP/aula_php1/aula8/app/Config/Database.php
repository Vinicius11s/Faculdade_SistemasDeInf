<?php
// arquivo de conexão com o banco de dados 
namespace App\Config;

// importando o PDO
use PDO;
use PDOException;

class Database {
    private static ?PDO $conn = null;

    public static function getConnection(): PDO {
        // validação se ja existe uma conexão
        if(self::$conn) return self::$conn;

        // acessando as variaveis de ambiente no .env
        //$host = $_ENV['DB_HOST'];
        //$dbname = $_ENV['DB_NAME'];
        //$user = $_ENV['DB_USER'];
        //$pass = $_ENV['DB_PASS'];
        //$charset = $_ENV['DB_CHARSET'];

        // acessando as variaveis de ambiente no .env
        $host = "127.0.0.1:3307";
        $dbname = "aula_persistencia";
        $user = "root";
        $pass = "";
        $charset = "utf8mb4";

        // criando a string de conexao
        $dns = "mysql:host=$host;dbname=$dbname;charset=$charset";

        // estabelecer a conexão
        try {
            self::$conn = new PDO($dns, $user, $pass);
            return self::$conn;
        }catch (PDOExeption $e) {
            // exibindo o erro
            echo $e->getMessage();
        }
    }
}

?>