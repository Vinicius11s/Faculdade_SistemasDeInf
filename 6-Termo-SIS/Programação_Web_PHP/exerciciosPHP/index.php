<?php
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $nome = isset($_POST["nome"]) ? trim ($_POST["nome"]) : "";


        if(!empty($nome)){
            $arquivo = fopen("nomes.txt", "a");
            fwrite($arquivo, $nome . PHP_EOL);
            fclose($arquivo);
        
            echo "Nome salvo com sucesso!";
        }
        else{
            echo "Digite um nome válido!";
        }
    }

    $nomes = [];
        if (file_exists("nomes.txt")) {
            $nomes = file("nomes.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
}
?>
<br>

<!<!DOCTYPE html>
    <head></head>
        <body>
            <form method="POST">
                <label>Digite um nome</label>
                <input type="text" name="nome" required>
                <button type="submit">Enviar</button>
            </form>
            <h3>Nomes Cadastrados:</h3>
            <?php
                if(!empty($nomes)){
                    foreach($nomes as $n){
                        echo $n . "<br>";
                    }
                }
                else{
                    echo "Nunhum nome cadastrado";
                }
            ?>
        </body>   
</html>

