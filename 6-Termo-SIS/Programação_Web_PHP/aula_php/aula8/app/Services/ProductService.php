<?php

namespace App\Services;

// importando a classe de conexao
use App\Config\Database;
// importando o PDO
use PDO;

class ProductService {
    private PDO $db;

    public function __construct() {
        // instanciando a conexão
        $this->db = Database::getConnection();
    }

    // CRUD

    // inserir
    public function create(string $name, float $price, int $stock) {
        // instrução sql para fazer o insert
        $sql = "INSERT INTO products (name, price, stock) VALUES (:name,:price,:stock)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':name' => $name, ':price' => $price, ':stock' => $stock]);
        return $this->db->lastInsertId();
    }

    // update
    public function update(int $id, string $name, float $price, int $stock) {
        $sql = "UPDATE products SET name = :name, price = :price, stock = :stock WHERE id = :id";
        $stmt = $this->db->prepare($sql);

        //passar parametros de outra maneira
        $stmt->bindValue(':name', $name, PDO::PARAM_STR);
        $stmt->bindValue(':price', $price, PDO::PARAM_STR);
        $stmt->bindValue(':stock', $stock, PDO::PARAM_INT);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        // executar
        return $stmt->execute();
    }

    // delete
    public function delete(int $id) {
        // instrução sql delete
        $sql = "DELETE FROM products WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([':id' => $id]);

    }

    // listar
    public function list() {
        // instrução sql select
        $sql = "SELECT * FROM products";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
?>