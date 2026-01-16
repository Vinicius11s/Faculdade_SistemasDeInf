<?php
    function calcularImc($peso, $altura){
        return $peso / ($altura * $altura);
    }
?>

<!DOCTYPE html>
    <head></head>
    <body>
        <form method="post">
            <label>Peso:</label>
            <input type="text" name="peso" required><br><br>

            <label>Altura:</label>
            <input type="text" name="altura" required><br><br>

            <button type="submit">Calcular</button><br><br>
        </form>
        <?php
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $peso = (float)($_POST["peso"] ?? 0);
                $altura = (float)($_POST["altura"] ?? 0);
                $imc = calcularImc($peso, $altura);

                if($imc <18.5){
                   echo "Resultado do seu IMC: Abaixo";
                }
                else{
                    if($imc >= 18.5 && $imc <= 24.9){
                        echo "Resultado do seu IMC: Normal";
                    }
                    else{
                        if($imc >= 25 && $imc <= 29.9){
                            echo "Resultado do seu IMC: Sobrepeso";
                        }
                        else{
                            if($imc >= 30){
                                echo "Resultado do seu IMC: Obesidade";
                            }
                        }
                    }
                }
            }   
        ?>
    </body>
</html>