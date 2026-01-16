#include <stdio.h>
#include<conio.h>

//8.	POR REFERÊNCIA: Escreva um procedimento que receba a Largura e o Comprimento do quadrado/retângulo por parâmetro,
//calcule e retorne também por parâmetro a área (Area).

void calcula_area(float *larg, float *comp, float *area){
	*area = *comp * *larg;
	
}

void main(){
	float larg, comp, area;
	
	printf("<<<Este algoritmo caclcula a area de um quadrado/retangulo>>>\n");
	printf("\nInforme a Largura: ");
	scanf("%f", &larg);	
	printf("\nInforme o Comprimento: ");
	scanf("%f", &comp);
	
	calcula_area(&larg, &comp, &area);
	
	printf("\nA Area calculada foi: %0.2f", area);
}
