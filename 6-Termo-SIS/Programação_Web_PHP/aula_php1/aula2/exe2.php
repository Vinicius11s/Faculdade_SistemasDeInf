<!DOCTYPE>
<html>
    <head></head>
    <body>
        <form method="post">
            <label>Número 1</label>
            <input type="input" name="numeros[]" required/>

            <label>Número 2</label>
            <input type="input" name="numeros[]" required />

            <label>Número 3</label>
            <input type="input" name="numeros[]" required />

            <button type="submit">Salvar</button>
        </form>
    </body>
</html>
e
<?php
    $soma = 0;
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $numeros = $_POST['numeros'];

        foreach($numeros as $numero) {
            $soma += (int)$numero;
        }
    }
    echo "<h3>Resultado da soma: $soma</h3>";

    if($soma % 2 == 0) {
        echo "Soma Par";
    } else {
        echo "Soma Ímpar";
    }

?>
