#include <stdio.h>
#include <conio.h>

//9 - Faça um algoritmo que leia a idade de uma pessoa e ao final exiba quantos 
//meses, dias, horas, minutos e segundo que essa pessoa já viveu.

void main(){
	int idade, meses, dias, horas, minutos, segundos;
	printf("Informe sua idade: ");
	scanf ("%d", &idade);
	meses = idade * 12;
	dias = meses * 30;
	horas = dias * 24;
	minutos = horas * 60;
	segundos = minutos * 60;
	
	printf("Voce viveu %d meses", meses);
	printf("\n Voce viveu %d dias", dias);
	printf("\n Voce viveu %d horas", horas);
	printf("\n Voce viveu %d minutos", minutos);
	printf("\n Voce viveu %d segundos", segundos);
}
