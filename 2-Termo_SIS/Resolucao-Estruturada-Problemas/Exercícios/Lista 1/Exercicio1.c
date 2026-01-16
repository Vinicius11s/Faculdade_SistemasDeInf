#include <stdio.h>
#include <conio.h>

//1.	Escreva um programa para ler o raio de um círculo, calcular e escrever a sua área.
//R2  = (3.14 * raio^2)


void main(){
	float raio, area;
	printf("<<<Calcular a area de um circulo>>\n\n");
	printf("Informe o Raio de um Circulo: ");
	scanf("%f", &raio);
	
	area = 3.14 * raio * raio;
	printf("Area do Circulo: %0.2f", area);
}


