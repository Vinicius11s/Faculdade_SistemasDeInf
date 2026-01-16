<!DOCTYPE>
<html>
    <head></head>
    <body>
        <form>
            <label>Valor</label>
            <input type="number" numbet="valor" />
            <button type="submit" >
                Salvar
            </button>
            <input type="number" numbet="valor" />
            <button type="submit" >
                Salvar
            </button>
        </form>
    </body>
</html>

<?php
    //verificar valor do formulario
    if(isset($_GET['valor'])) {
        echo $_GET['valor'];
    }
?>