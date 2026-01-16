#include <stdio.h>
#include <conio.h>

//2 - Escreva uma função que leia 4 números, após a leitura multiplique todos e retorne o resultado.
//Está função deverá ser chamada através do programa principal. Exibir conteúdo retornado.

float ler_quatro_numeros(){
	float n1, n2, n3, n4, mult;
	printf("Informe o primeiro numero: ");
	scanf("%f", &n1);
	printf("Informe o segundo  numero: ");
	scanf("%f", &n2);
	printf("Informe o terceiro numero: ");
	scanf("%f", &n3);
	printf("Informe o quarto numero: ");
	scanf("%f", &n4);	
	mult = n1 * n2 * n3 * n4;
	return mult;
}

void main(){
	float mult;
	mult = ler_quatro_numeros();
	printf("Multiplicacao: %0.2f", mult);
}
