#include <stdio.h>
#include <conio.h>

//5 - Escreva um algoritmo que leia 4 números, após a leitura multiplique todos e exibir o resultado.

void main(){
	int num1, num2, num3, num4, mult;
	printf("Informe um numero: ");	
	scanf("%d", &num1);
	printf("Informe outro numero: ");	
	scanf("%d", &num2);
	printf("Informe outro numero: ");	
	scanf("%d", &num3);
	printf("Informe outro numero: ");	
	scanf("%d", &num4);
	mult = num1 * num2 * num3 * num4;
	printf("Resultado da Multiplicacao %d", mult);
	
}
