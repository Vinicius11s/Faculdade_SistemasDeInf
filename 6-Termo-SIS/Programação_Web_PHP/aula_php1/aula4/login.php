<?php
    session_start();

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        if(isset($_POST["login"]) && 
            isset($_POST["senha"])) {

            if(
                $_POST["login"] == "admin" &&
                $_POST["senha"] == "123"
            ) {
                $_SESSION["usuario"] = [
                    "nome" => "Administrador",
                    "hora_login" => time()
                ];
                // redirecionar para uma nova página
                header("Location: dashboard.php");
                exit;
            }
        }
    }
?>

<form method="POST">
    <input type="text" name="login">
    <input type="password" name="senha">
    <button type="submit">Logar</button>
</form>