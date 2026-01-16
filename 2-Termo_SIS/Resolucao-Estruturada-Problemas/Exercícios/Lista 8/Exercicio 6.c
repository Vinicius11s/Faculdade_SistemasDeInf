#include <stdio.h>
#include<conio.h>

//6.	POR REFERÊNCIA: Escreva um procedimento que receba a data de nascimento de uma pessoa (DataNascimento),
//a data atual calcule a idade e retorne (Idade) por parâmetro.

void calcular_idade(int *an, int *aa, int *idade){
	*idade = *aa - *an;
}

void main(){
	int an, aa, idade;
	printf("\nInforme o Ano do seu Nascimento: ");
	scanf("%d", &an);
	printf("\nInforme o Ano Atual: ");
	scanf("%d", &aa);
	
	calcular_idade(&an, &aa, &idade);
	
	printf("\nSua Idade: %d", idade);
}
