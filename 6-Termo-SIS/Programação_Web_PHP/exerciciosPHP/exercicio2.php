<?php
$imagem_path = "";

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["imagem"])) {
    $pasta = "uploads/";

    if (!is_dir($pasta)) {
        mkdir($pasta, 0777, true);
    }

    $arquivo_nome = $_FILES["imagem"]["name"];
    $arquivo_destino = $pasta . $arquivo_nome;

    if (move_uploaded_file($_FILES["imagem"]["tmp_name"], $arquivo_destino)) {
        $imagem_path = $arquivo_destino;
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Upload de Imagem</title>
</head>
<body>
    <form method="POST" enctype="multipart/form-data">
        <input type="file" name="imagem" required>
        <button type="submit">Enviar</button>
    </form>

    <?php if ($imagem_path != ""): ?>
        <p>Arquivo enviado: <?php echo $arquivo_nome; ?></p>
        <img src="<?php echo $imagem_path; ?>" alt="Imagem enviada" style="max-width:400px;">
    <?php endif; ?>
</body>
</html>
        