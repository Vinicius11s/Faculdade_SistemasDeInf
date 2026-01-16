<?php
    //inicialiazando a sessão
    session_start();

    //declarando variavel comum
    $contador = 0;
    $contador = $contador + 1;

    //contador com session
    $_SESSION["contador"] = 
        ($_SESSION["contador"] ?? 0) + 1;

    //echo $_SESSION["contador"];

    echo session_id();

    //limpar a session
    $_SESSION = [];
    session_destroy();

    //setar valor em um cookie + expiração
    setcookie("teste", "valor", time()+60, );

    //pegar o conteudo do cookie
    $value = $_COOKIE["teste"];
    echo $value;



?>