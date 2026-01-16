#include <stdio.h>
#include <conio.h>

//2.	Escreva um programa para ler as dimensões de uma cozinha retangular (comprimento, largura e altura), calcular
//e escrever a quantidade de caixas de azulejos para se colocar em todas as suas paredes (considere que não será
//descontada a área ocupada por portas e janelas). Cada caixa de azulejos possui 1,5 m2.

void main(){
	float comp, larg, alt, paredefrente, paredelado, total;
	printf("Informe o comprimento: ");
	scanf("%f", &comp);
	printf("Informe a largura: ");
	scanf("%f", &larg);
	printf("Informe a altura: ");
	scanf("%f", &alt);
	
	paredefrente = (larg * alt) * 2;
	paredelado = (comp * alt) * 2;
	total = (paredefrente + paredelado) / 1.5;
	printf("Voce ira precisar de %0.2f caixas de piso", total);
	
	
}


