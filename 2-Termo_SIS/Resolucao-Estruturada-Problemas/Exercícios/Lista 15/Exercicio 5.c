#include <stdio.h>
#include <conio.h>

#define TF 2

//5-Um apicultor necessita armazenar os dados de 7 colmeias, que são: código,
//região, estado, qualificação (1-forte, 2-médio, 3- fraco), número de abelha.
//Favor um procedimento para carregar e outro para exibir o vetor de registros.

struct dados{
	int codigo;
	char regiao[30];
	char estado[30];
	int qualificacao;
	int abelha;
};

void carregar_registro(struct dados reg_abelhas[TF]){
	int i;
	printf("<<<Leitura>>>");
	for(i=0; i<TF; i++){
		printf("\n\nRegistro [%d]", i);
		
		printf("\nInforme o Codigo: ");
		scanf("%d", &reg_abelhas[i].codigo);
		
		printf("Informe a Regiao: ");
		fflush(stdin);
		gets(reg_abelhas[i].regiao);
		
		printf("Informe o Estado: ");
		fflush(stdin);
		gets(reg_abelhas[i].estado);		
		
		do{
			printf("Informe a Qualificacao (1-Forte ; 2-Medio ; 3-Forte): ");
			scanf("%d", &reg_abelhas[i].qualificacao);	
		}while(reg_abelhas[i].qualificacao != 1 && reg_abelhas[i].qualificacao != 2 && reg_abelhas[i].qualificacao != 3);
		
		printf("Informe o Numero de Abelhas: ");
		scanf("%d", &reg_abelhas[i].abelha);
	}
}

void exibir_registro(struct dados reg_abelhas[TF]){
	int i;
	printf("\n\n<<<Exibicao>>>");
	for(i=0; i<TF; i++){
		printf("\n\nRegistro[%d]", i);
		
		printf("\nCodigo: %d", reg_abelhas[i].codigo);
		printf("\nRegiao: %s", reg_abelhas[i].regiao);
		printf("\nEstado: %s", reg_abelhas[i].estado);
		printf("\nQualificacao: %d", reg_abelhas[i].qualificacao);
		printf("\nNumero de Abelhas:  %d", reg_abelhas[i].abelha);
	}
}

void main(){
	struct dados reg_abelhas[TF];
	carregar_registro(reg_abelhas);
	exibir_registro(reg_abelhas);	
}
