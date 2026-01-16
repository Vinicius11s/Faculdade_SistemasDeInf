<?php

require_once __DIR__. "/vendor/autoload.php";

// importação da service 
use App\Services\ProductService;

// chamar a classe
$productService = new ProductService();

// inserir valor 
//echo $productService->create('Teclado', 59.99,10);

// atualizar valor 
//echo $productService->update(1,"Mouse",29.99,5);

// deletar valor
//echo $productService->delete(1);

// listar valores
$products = $productService->list();
print_r($products);
