<?php
    session_start();

    if(isset($_SESSION["usuario"])){
        echo "Olá {$_SESSION["usuario"]["nome"]}";
    }

?>