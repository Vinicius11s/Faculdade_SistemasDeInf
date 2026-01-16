#include <stdio.h>
#include <conio.h>

//11 - Elaborar um programa que possibilite calcular a área de cada cômodo de uma residência
//(por exemplo: sala, cozinha, banheiro, quartos, etc..). O programa deve solicitar a entrada do nome, da largura e do comprimento
//de um determinado cômodo, em seguida deverá apresentar a área do cômodo lido e também a mensagem solicitando ao usuário a
//confirmação de continuar calculando novos cômodos.
//A operação deve ser repetida até que o usuário responda "1 - NÃO".
//Área = largura * comprimento.

void main(){
	char com[51];
	float larg, comp, area;
	int num = 0;
	while(num != 1){
		printf("Informe o comodo: ");
		scanf("%s", com);
		printf("Informe a largura: ");
		scanf("%f", &larg);
		printf("Informe o comprimento: ");
		scanf("%f", &comp);
		area = larg * comp;
		printf("A area do comodo eh de: %0.2f ", area);
		printf("\n \nVoce deseja continuar calculando novos comodos (1-NAO;2-SIM) ");
		scanf("%d", &num);
	}	
}
