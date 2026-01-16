#include <stdio.h>
#include <conio.h>

float  divisao_dois_numeros(){
	float nu1, nu2, div;
	system("cls");
	printf("<<<Calcular Divisao de 2 Numeros>>> ");
	printf("\nInforme o primeiro numero: ");
	scanf("%f", &nu1);
	printf("\nInforme o segundo numero: ");
	scanf("%f", &nu2);
	div = nu1 / nu2;
	return div;
}

float  multiplicacao_dois_numeros(){
	float n1, n2, mult;
	system("cls");
	printf("\n<<<Calcular Multiplicacaoo de 2 Numeros>>>\n");
	printf("\nInforme o primeiro numero: ");
	scanf("%f", &n1);
	printf("\nInforme o segundo numero: ");
	scanf("%f", &n2);
	mult = n1 * n2;
	return mult;
}

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
	printf("\nInforme a quarta Nota: ");
	scanf("%f", &nota4);
	media = (nota1 + nota2 + nota3 + nota4) / 4;
	return media;
}

int calcular_idade(){
	int aa, an, idade;
	system("cls");
	printf("<<<Calcular Idade>>> ");
	printf("\nInforme o ano atual: ");
	scanf("%d", &aa);
	printf("Informe o ano de nascimento: ");
	scanf("%d", &an);
	idade = aa - an;
	return idade;
}

int menu(){
	int opcao;
	do{
		system("cls");
		printf("\n1 - Calcular Idade");
		printf("\n2 - Media de 4 Notas:");
		printf("\n3 - Multiplicacao de 2 Numeros");
		printf("\n4 - Divisao de 2 Numeros");		
		printf("\n5 - Sair");
		printf("\nInforme a Opcao: ");
		scanf("%d", &opcao);
		
		switch (opcao){
			case 1:
				printf("\nIdade: %d ",calcular_idade());
			break;
			
			case 2:
				printf("\nSua Media eh: %0.2f", media_quatro_notas());
			break;
			
			case 3:
				printf("\nO Resultado eh: %0.2f", multiplicacao_dois_numeros());
			break;
			
			 case 4:
			 	printf("\nO Resultado eh: %0.2f", divisao_dois_numeros());
			break;
			
			case 5:
				printf("\nO Programa terminou !");
			break;
			
			case 6:
				printf("\nOpcao Invalida!!!");
			break;	
		}	
		printf("\n\n");	
		system("pause"); 
						
	} while (opcao != 5);
}

void main(){
 	menu();
}
