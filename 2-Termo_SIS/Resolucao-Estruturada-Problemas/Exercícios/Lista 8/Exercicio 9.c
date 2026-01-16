#include <stdio.h>
#include<conio.h>

//9.	POR REFERÊNCIA: Faça um procedimento que recebe a idade de um nadador por parâmetro e retorne também por parâmetro,
//a categoria desse nadador de acordo com a tabela abaixo:   

void verifica_cat(int *idade, char *categoria){
	if(*idade >= 5 && *idade <= 7){
		*categoria = 'A';
	}
	else{
		if(*idade >= 8 && *idade <= 10){
			*categoria = 'B';
		}
		else{
			if(*idade >= 11 && *idade <= 13){
				*categoria = 'C';
			}
			else{
				if(*idade >= 14 && *idade <= 17){
					*categoria = 'D';
				}
				else{
					*categoria = 'E';
				}
			}
		}
	}
}

void main(){
	int idade;
	char categoria;
	printf("<<<Este algoritmo mostra a categoria de um nadador conforme sua idade>>>");
	printf("\nInforme sua Idade: ");
	scanf("%d", &idade);
	
	verifica_cat(&idade, &categoria);
	
	printf("\nSua Categoria: %c", categoria);
}
