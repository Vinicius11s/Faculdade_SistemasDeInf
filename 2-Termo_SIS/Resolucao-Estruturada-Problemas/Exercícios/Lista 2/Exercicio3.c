#include <stdio.h>
#include <conio.h>

//3 - Escreva um algoritmo que tenha em seu programa principal a exibição de um menu de opções conforme abaixo:
//1 - Calcular Idade
//2 - Média de 4 Notas
//3 - Multiplicação de 2 Número
//4 - Divisão de 2 Número
//5 - Sair

//O usuário deverá escolher qual opção deseja executar. 
//Caso o usuário escolha uma opção inválida, uma mensagem deverá ser exibida de advertência e o menu deverá ser exibido novamente para que seja escolhido uma nova opção. 

//Para cada opção escolhida, o algoritmo deverá chamar a função correspondente a opção, ou seja, teremos no mínimo 4 funções diferentes no algoritmo.
//Cada função deverão ter suas leituras e processamentos correspondentes ao objetivo da opção escolhida. Retornar e exibir o resultado no programa principal.

float  media_quatro_notas(){
	float nota1, nota2, nota3, nota4, media;
	system("cls");
	printf("<<<Calcular Media de 4 Notas>>> ");
	printf("\nInforme a primeira Nota: ");
	scanf("%f", &nota1);
	printf("\nInforme a segunda Nota: ");
	scanf("%f", &nota2);
	printf("\nInforme a terceira Nota: ");
	scanf("%f", &nota3);
	printf("\nInforme a quartaa Nota: ");
	scanf("%f", &nota4);
	media = (nota1 + nota2 + nota3 + nota4) / 4;
}


int calcular_idade(){
	int aa, an, idade;
	system("cls");
	printf("<<<Calcular Idade>>> ");
	printf("\nInforme o ano atual: ");
	scanf("%d", &aa);
	printf("\nInforme o ano de nascimento: ");
	scanf("%d", &an);
	idade = aa - an;
	printf("\nSua idade eh: %d", idade);
	system("pause");
}

int menu(){
	int opcao;
	do{
		printf("Informe a Opcao:" );
		printf("\n1 - Calcular Idade");
		printf("\n2 - Media de 4 Notas:");
		printf("\n3 - Multiplicacao de 2 Numeros");
		printf("\n4 - Divisao de 2 Numeros");		
		printf("\n5 - Sair");
		printf("\nInforme a Opcao: ");
		scanf("%d", &opcao);
		
		switch (opcao){
			case 1:
				calcular_idade();
			break;
		}			
	} while (opcao != 5);	
	
}


void main(){
	menu();
}
