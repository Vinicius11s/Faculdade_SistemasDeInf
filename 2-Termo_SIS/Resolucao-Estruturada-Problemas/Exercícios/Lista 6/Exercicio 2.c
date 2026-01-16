#include <stdio.h>
#include <conio.h>

//2.	Escreva uma função que receba a data de nascimento de uma pessoa (DataNascimento), calcule e retorne a idade.

int calcular_idade(int aa, int an){
	int idade;
	idade = aa - an;
	return idade;
}

void main(){
	int aa, an, idade;
	printf("<<<Calcular Idade>>>\n\n ");
	printf("Informe o ano Atual: ");
	scanf("%d", &aa);
	printf("Informe o ano que nasceu: ");
	scanf("%d", &an);
	idade = calcular_idade(aa, an);
	printf("Idade: %d", idade);
}
