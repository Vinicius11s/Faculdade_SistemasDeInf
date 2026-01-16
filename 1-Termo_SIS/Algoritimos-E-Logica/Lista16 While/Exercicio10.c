#include <stdio.h>
#include <conio.h>

//10- Escreva um programa que leia o primeiro nome e a altura das moças inscritas em um concurso de beleza. 
//Para cada leitura deverá ser realizado uma pergunta para o usuário para parar ou continuar (1 -continuar, 2 - parar)
//. Ao final o programa deverá exibir: a altura da moça mais alta e o número de moças no concurso.
//Considere que todas as moças possuem altura diferente.

void main(){
	char nome[60];
	float alt, alt_maior = 0;
	int qtde = 0, resp = 1;
	
	while (resp == 1){
		printf("Informe o Nome: ");
		scanf ("%s", nome);
		printf ("Informe sua altura: ");
		scanf ("%f", &alt);
		qtde++;
		if(alt > alt_maior){
			alt_maior = alt;
		}	
		printf("Voce deseja continuar (1 -continuar, 2 - parar \n)");
		scanf ("%d", &resp);			
	}
	printf(" \n Altura mais alta: %0.2f ", alt_maior);
	printf(" \n Número de inscritas no concurso: %d ", qtde );
			
}
