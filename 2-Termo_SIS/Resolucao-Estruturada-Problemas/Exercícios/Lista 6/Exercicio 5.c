#include <stdio.h>
#include <conio.h>

//5.	Escreva uma função que recebe a idade de um nadador por parâmetro e retorna à categoria desse nadador de acordo com a tabela abaixo:   

//Idade			Categoria
//5 a 7 anos		1
//8 a 10 anos		2
//11-13 anos		3
//14-17 anos		4
//>= 18 anos		5

int verificar_categoria(int idade){
	int idade, categoria;
	switch (idade){
		case 5, 6,  7:
			categoria = 1;
		break;
		case 8, 9,  10:
			categoria = 2;
		break;
		case 11, 12, 13:
			categoria = 3;
		break;
		case 14, 15, 17:
			categoria = 4;
		break;
		default:
			categoria = 5;
		break;
		return categoria;
	}
	
}


void main(){
	int idade;
	printf("<<<Calcular Idade>>>\n\n ");
	printf("Informe sua Idade: ");
	scanf("%d", &idade);
	idade =  verificar_categoria(idade); 
	printf("Sua categoria eh: %0.2f", idade);
}
