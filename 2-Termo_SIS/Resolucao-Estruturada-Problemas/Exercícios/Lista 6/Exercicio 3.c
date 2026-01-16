#include <stdio.h>
#include <conio.h>

//3.	Escreva uma função que receba 2 parametros (Nota1 e Nota2) calcule e retorne a média.

float  media_duas_notas(float nota1, float nota2){
	float  media;
	media = (nota1 + nota2) / 2;
	return media;
}

void main(){
	float nota1, nota2, media;
	printf("<<<Calcular Media de 2 Notas>>>\n\n");
	printf("Informe a Nota l: ");
	scanf("%f", &nota1);
	printf("Informe a Nota 2: ");
	scanf("%f", &nota2);
	media = media_duas_notas(nota1, nota2); 
	printf("Sua Media Eh: %0.2f", media);
}
