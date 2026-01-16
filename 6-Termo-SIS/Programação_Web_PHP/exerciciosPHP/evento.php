<?php
// Lista de participantes (em memória, só funciona enquanto a página estiver rodando)
$participantes = [];

// Verifica se houve envio do formulário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome   = trim($_POST["nome"] ?? "");
    $evento = trim($_POST["evento"] ?? "");
    $ano    = trim($_POST["ano"] ?? "");

    // Adiciona participante se todos os campos foram preenchidos
    if ($nome && $evento && $ano) {
        $participantes[] = [
            "nome"   => $nome,
            "evento" => $evento,
            "ano"    => $ano
        ];
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Cadastro de Evento</title>
</head>
<body>
    <h2>Cadastro de Evento</h2>
    <form method="POST">
        <label>Nome do participante:</label><br>
        <input type="text" name="nome" required><br><br>

        <label>Evento:</label><br>
        <input type="text" name="evento" required><br><br>

        <label>Ano:</label><br>
        <input type="number" name="ano" required><br><br>

        <button type="submit">Cadastrar</button>
    </form>

    <h3>Participantes cadastrados:</h3>
    <?php
        if (!empty($participantes)) {
            foreach ($participantes as $p) {
                echo "O participante <strong>{$p['nome']}</strong> está inscrito no evento 
                      \"{$p['evento']}\" de {$p['ano']}.<br>";
            }
        } else {
            echo "Nenhum participante cadastrado.";
        }
    ?>
</body>
</html>
