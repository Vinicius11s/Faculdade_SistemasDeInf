#include <stdio.h>
#include <conio.h>

//6 - Escreva um algoritmo que leia 3 números e ao final subtraia o primeiro do segundo e divida o resultado pelo terceiro.

void main(){
	int num1, num2, num3;
	float sub, total;
	printf("Informe um numero: ");	
	scanf("%d", &num1);
	printf("Informe um numero: ");	
	scanf("%d", &num2);
	printf("Informe um numero: ");	
	scanf("%d", &num3);
	sub = (float) num1 - num2;
	total = (float )sub / num3;
	printf("Resultado: %0.2f", total);	
	

}
