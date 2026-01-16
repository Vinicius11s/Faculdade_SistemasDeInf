#include <stdio.h>
#include <conio.h>
#include <string.h>

#define TF 3

/*. (2,0) - Deseja-se um programa que registre os dados de 3 imóveis. Para cada imóvel,
é necessário armazenar o nome, metragem de construção, metragem do terreno, valor e tipo
(1-residencial, 2-comercial).  Com base as informações acima, favor implementar os procedimentos/funções abaixo:

- Ler os dados do vetor de registro. Validar campos quando necessário;
- Exibir os dados do vetor de registros. Exibir a quantidade de imóveis de cada tipo;
- Retornar a média de valor dos imóveis lidos;
- Exibir quais imóveis, que estão com o valor acima da média, com metragem de construção acima de 100m2, e são do tipo comercial;
*/

struct dados{
	char nome[50];
	float metragem;
	float metragemt;
	float valor;
	int tipo;
};

void ler_registros(struct dados reg_imoveis[TF]){
	int i;
	
	printf("<<<Informe os dados do imovel >>>");
	
	for(i=0; i<TF; i++){
		printf("\n\nRegistro %d", i);
		fflush(stdin);
		printf("\nInforme o Nome: ");
		gets(reg_imoveis[i].nome);
		
		printf("Informe a Metragem do imovel: ");
		scanf("%f", &reg_imoveis[i].metragem);
		
		printf("Informe a Metragem do terreno: ");
		scanf("%f", &reg_imoveis[i].metragemt);

		printf("Informe o valor do imovel: ");
		scanf("%f", &reg_imoveis[i].valor);		
		do{
			printf("Informe o tipo do imovel (1-residencial ; 2-comercial): ");
			scanf("%d", &reg_imoveis[i].tipo);
		}while(reg_imoveis[i].tipo != 1 && reg_imoveis[i].tipo != 2);
	}
}

void exibir_registros(struct dados reg_imoveis[TF]){
	int i;
	printf("<<<\n\nImoveis Registrados: >>>");
	for(i=0; i<TF; i++){
		printf("\n\n\nRegistro %d\n", i);
		
		printf("\nNome: %s", reg_imoveis[i].nome);
		
		printf("\nMetragem de construcao: %0.2f", reg_imoveis[i].metragem);
		
		printf("\nMetragem do terreno: %0.2f", reg_imoveis[i].metragemt);
		
		printf("\nValor do imovel: %0.2f", reg_imoveis[i].valor);
		
		switch(reg_imoveis[i].tipo){
			case 1:
				printf("\nImovel de tipo: Residencial");
			break;
			
			case 2:
				printf("\nImovel de tipo: Comercial");
			break;
		}		
	}
}

void verificar_tipo(struct dados reg_imoveis[TF]){
	int i;
	int res = 0, com = 0;
	
	for(i=0; i<TF; i++){
		if(reg_imoveis[i].tipo == 1){
			res++;
		}
		else{
			if(reg_imoveis[i].tipo == 2){
				com++;
			}
		}
	}
	printf("\n\n%d Imoveis sao do tipo Residencial.", res);
	printf("\n%d Imoveis sao do tipo Comercial.", com);
}

float media_imoveis(struct dados reg_imoveis[TF]){
	int i, cont=0;
	float acumula, media_i;
		
	for(i=0; i<TF; i++){
		acumula += reg_imoveis[i].valor;
		cont++;
	}
	media_i = acumula / cont;
	return media_i;
}

void acima_media(struct dados reg_imoveis[TF], float *media_i){
	int i, imovel_acima = 0;
	char imovel_acima_100[100];
		
	for(i=0; i<TF; i++){
		if(reg_imoveis[i].valor > * media_i && reg_imoveis[i].metragem > 100 && reg_imoveis[i].tipo == 2){
			strcpy(imovel_acima_100, reg_imoveis[i].nome);
		}
	}printf("\nO imovel %s esta com o valor acima da media, tem metragem acima de 100\ne eh do tipo comercial.", imovel_acima_100);
}


void main(){
	struct dados reg_imoveis[TF];
	float media_i;
	
	ler_registros(reg_imoveis);
	exibir_registros(reg_imoveis);
	verificar_tipo(reg_imoveis);
	
	media_i = media_imoveis(reg_imoveis);
	printf("\nA media de valor dos imoveis lidos foi: %0.2f", media_i);
	
	acima_media(reg_imoveis, &media_i);	
}
