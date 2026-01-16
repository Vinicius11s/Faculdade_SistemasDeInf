#include <stdio.h>
#include <conio.h>

//11 - Construa um algoritmo para calcular a média de dois valores inteiros positivos, previamente conhecidos.

void main(){
	float num, num2, media;
	printf("Informe um numero: ");
	scanf ("%f", &num);
	printf("Informe outro numero: ");
	scanf ("%f", &num2);
	
	if (num > 0 && num2 > 0){
		media = (num + num2) / 2;
		printf("Media %0.2f", media);
		
	}
		else{
			printf("Numeros Negativo!!");
		}
}
