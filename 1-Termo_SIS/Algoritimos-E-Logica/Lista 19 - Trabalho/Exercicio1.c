#include <stdio.h>
#include <conio.h>

//1.	Escreva um algoritmo, que leia um conjunto de 10 fichas, cada uma contendo, a altura e o código do sexo de uma pessoa 
//(código = 1 se for masculino e 2 se for feminino), e calcule e imprima:
//- a maior e a menor altura da turma;
//- a média de altura das mulheres;
//- a média de altura da turma.
//- a quantidade de homens.


void main(){
	float media_turma, altura_turma, media_fem, altura_fem, altura_menor = 9999, altura_maior = 0,  altura;
	int qtde_masc = 0, qtde_fem = 0, fichas = 1, sexo;
	
	
	do{
		printf("\nInforme Sua Altura: ");
		scanf("%f", &altura);
		printf("Informe Seu Sexo");
		printf("\n1-Maculino ; 2-Feminino: ");
		scanf("%d", &sexo);
		fichas++;
		
		
		altura_turma = altura_turma + altura;
		media_turma = altura_turma / fichas;
		
		
		if(altura > altura_maior){
			altura_maior = altura;
		}
		else{
			if(altura < altura_menor){
				altura_menor = altura;	
			}
		}
		if(sexo == 2){
			altura_fem = altura_fem + altura;
			qtde_fem++;
			media_fem = altura_fem / qtde_fem;
		}
		else{
			qtde_masc++;
		}		
	} while ( fichas <= 10);
	
	
	printf("\n");
	printf("\nA Maior Altura da Turma Eh: %0.2f", altura_maior);	
	printf("\nA Menor Altura da Turma Eh: %0.2f", altura_menor);
	printf("\nA Media de Altura entre as Mulheres Eh: %0.2f ", media_fem);
	printf("\nA Media de Altura da Turma Eh: %0.2f ", media_turma);
	printf("\nA Quantidade de Homens Eh: %d", qtde_masc);	
}		
