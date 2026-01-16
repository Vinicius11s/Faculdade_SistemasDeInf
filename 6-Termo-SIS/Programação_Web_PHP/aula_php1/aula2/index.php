<?php 
    $nome = "Vinicius";
    $idade = "20";
    $cidade = "Presidente Venceslau";
    //secho "$nome tem $idade anos e moro em $cidade";
?>

<?php 
    $frase = "O palmeiras não tem mundial!!!";
    //contando quantidade de palavras
    //echo str_word_count($frase);

    //transformar a frase em maiúsculo e minúsculo
    //echo strtoupper($frase);
    //echo strtolower($frase);
?>

<?php 
    $numero1 = 10;
    $numero2 = 5;

    //echo "SOMA: " . $numero1 + $numero2 . "<br/>";
    //echo "SUBTRAÇÃO: " . $numero1 - $numero2 . "<br/>";
    //echo "DIVISÃO: " . $numero1 / $numero2 . "<br/>";
    //echo "MULTIPLICAÇÃO: " . $numero1 * $numero2;
?>

<?php 
    $numero = 6;

    // === valor/tipo seja exato
    // == valor seja exato

    if($numero % 2 === 0) {
        //echo "Número Par";
    }
    else {
        //echo "Numero Ímpar";
    }

    //condição ternária
    $idade = 18;
    //echo ($idade >=18) ? "Maior de Idade" : "Menor de Idade";

    $variavelbool = "";
    //echo (empty($variavelbool)) ? "verdadeiro" : "falso";
?>

<?php
    //manipular arrays
    $nomes = ["Vinicius", "Maria", "Joao",];

    //adicionando nome no array
    $nomes[] = "Marcelo";
    array_push($nomes, "Iago");

    //removendo nome 
    unset($nomes[1]);

    //re-ordenação dos indices
    $nomes = array_values($nomes); 

    //re-ordenação crescente e decrescente
    sort($nomes);
    rsort($nomes);

    //exibindo todos valores
    //print_r($nomes);

    //exibindo valor específico
    //echo $nomes[1];
?>

<?php 
    for($i=1; $i<=50; $i++) {
        //echo $i . "<br/>";
    }

    foreach($nomes as $n) {
        //echo $n . "<br/>";
    }


    //ARRAY MAP
    $novos_nomes = array_map(function($n) {
        return "Olá $n";
    }, $nomes);

    print_r($novos_nomes);
?>









