#include <stdio.h>
#include <conio.h>

#define TF 5

//2.	Fazer uma rotina que recebe como parâmetro um array de 5 posições contendo as notas de um aluno ao longo do ano e devolve a média do aluno.

float calcular_media(float vetnota[TF]){
	float soma, media;
	int i;
	for(i = 0; i<TF; i++){
		soma += vetnota[i];
	}		
	media = soma / TF;
	return media;
}

void main(){
	int i;
	float media, vetnota[TF];
	printf("<<<Este programa calcula a media de 5 notas>>>");
	
	for(i = 0; i<TF; i++){
		printf("\nInforme a nota %d: ", i + 1);
		scanf("%f", &vetnota[i]);	
	}
	media = calcular_media(vetnota);
	
	printf("\n\nSua media foi: %0.2f\n", media);
}
