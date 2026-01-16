#include <stdio.h>
#include<conio.h>

//5.	POR REFERÊNCIA: Escreva um procedimento que receba por parâmetro os valores de A e  B e retorne os valores
//invertidos, ou seja, A receberá o conteúdo de B e B receberá o conteúdo de A. Os parâmetros deverão ser por referência.

void recebedor(float *a, float *b){
 float aux;
 aux = *a;
 *a = *b;
 *b = aux;	
	
}


void main(){
	float a, b;
	printf("<<<Este Programa Inverte os valores digitados>>>");
	printf("\nInforme o Valor de A: ");
	scanf("%f", &a);
	printf("\nInforme o Valor de B: ");
	scanf("%f", &b);
	
	printf("\nValor de A: %0.2f", a);
	printf("\nValor de B: %0.2f", b);
	
	recebedor(&a, &b);
	
	printf("\n\nValor de A: %0.2f", a);
	printf("\nValor de B: %0.2f", b);
	
}
