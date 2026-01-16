<!DOCTYPE html>
<head></head>
<body>
    <form method="post">
        <label>Informe seu nome completo:</label>
        <input type="text" name="nome" required><br>

        <label>Informe sua idade:</label>
        <input type="text" name="idade" required><br>

        <button type="submit">Enviar</button>     
    </form>
    <?php
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            echo $_POST["nome"] . " tem " . $_POST["idade"] . " anos.";
        }
    ?>
</body>
</html>