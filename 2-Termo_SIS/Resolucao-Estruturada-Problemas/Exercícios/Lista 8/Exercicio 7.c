#include <stdio.h>
#include<conio.h>

//7.	POR REFERÊNCIA: Escreva um procedimento que receba 2 parâmetros (Nota1 e Nota2) calcule e retorne também por parâmetro a média (Media).

void calcula_media(float *nota1, float *nota2, float *media){
	*media = (*nota1 + *nota2 ) / 2;
}

void main(){
	float nota1, nota2, media;
	printf("Informe a primeira Nota: ");
	scanf("%f", &nota1);
	printf("\nInforme a segunda Nota: ");
	scanf("%f", &nota2);
	
	calcula_media(&nota1, &nota2, &media);
	printf("Sua Media foi: %0.2f\n", media);


}
