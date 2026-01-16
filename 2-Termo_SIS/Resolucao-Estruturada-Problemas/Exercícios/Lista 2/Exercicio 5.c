#include <stdio.h>
#include<conio.h>

//5 - Escreva um procedimento que leia 4 números, após a leitura multiplique todos e exibir o resultado.
//Este procedimento deverá ser chamado através do programa principal.

void ler_quatro_numeros(){
	float n1, n2, n3, n4, mult;
	printf("Informe o primeiro numero: ");
	scanf("%f", &n1);
	printf("Informe o segundo numero: ");
	scanf("%f", &n2);	
	printf("Informe o terceiro numero: ");
	scanf("%f", &n3);
	printf("Informe o quarto numero: ");
	scanf("%f", &n4);
	mult = n1 * n2 * n3 * n4;
	printf("Resultado: %0.2f", mult);
}

void main(){
	ler_quatro_numeros();

}
