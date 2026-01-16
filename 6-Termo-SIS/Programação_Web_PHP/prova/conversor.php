<?php
    function converterDolar($valor){
        return $valor / 5.42;
    }
?>

<!DOCTYPE html>
    <head></head>
    <body>
        <form method="post">
            <label>Informe um valor em R$:</label>
            <input type="text" name="valor" required><br><br>
            <button type="submit">Converter</button><br><br>
        </form>
        <?php
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $reais = $_POST["valor"];
                $dolares = converterDolar($reais);
                echo "R$ " . number_format($reais, 2, ",", ".") . " equivalem a US$ " . number_format($dolares, 2, "," , ".");
            }   
        ?>
    </body>
</html>