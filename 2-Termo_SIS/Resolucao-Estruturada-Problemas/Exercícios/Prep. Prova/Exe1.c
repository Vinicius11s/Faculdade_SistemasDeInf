#include <stdio.h>
#include <conio.h>
#include <string.h>

#define TF 2

/*Deseja-se um programa que registre os dados de 5 animais de um determinado zoológico.
Para cada animal deseja-se armazenar o nome, espécie, peso, idade e sexo (1-macho, 2-femea). 

Com base as informações acima, favor implementar os procedimentos/funções abaixo:

- Ler os dados do vetor de registro. Validar campos quando necessário;
- Exibir os dados do vetor de registros;
- Retornar e exibir a média do peso dos animais;
- Exibir quais são os animais machos que estão com o peso acima da média;
- Exibir o nome e o peso do animal mais velho e mais novo;
*/

struct dados{
	char nome[50];
	char especie[50];
	float peso;
	int idade;
	int sexo;
};

void ler_dados(struct dados reg_animais[TF]){
	int i;
	printf("Informe os dados do animal.");
	
	for(i=0 ; i<TF ; i++){
		printf("\nRegistro %d", i);
		fflush(stdin);
		printf("\n\nInforme o nome do animal: ");
		gets(reg_animais[i].nome);
		fflush(stdin);
		printf("Informe a especie: ");
		gets(reg_animais[i].especie);
		printf("Informe o peso: ");
		scanf("%f", &reg_animais[i].peso);
		printf("Informe a idade: ");
		scanf("%d", &reg_animais[i].idade);
		do{
			printf("Informe o sexo do animal (1-macho ; 2-femea): ");
			scanf("%d", &reg_animais[i].sexo);
		}while(reg_animais[i].sexo != 1 && reg_animais[i].sexo != 2);
	}
}

void exibir_dados(struct dados reg_animais[TF]){
	int i;
	printf("\n\nDados coletados");
	
	for(i=0 ; i<TF ; i++){
		printf("\n\nRegistro %d\n", i);

		printf("Nome: %s", reg_animais[i].nome);
		printf("\nEspecie: %s", reg_animais[i].especie);
		printf("\nPeso: %0.2f", reg_animais[i].peso);
		printf("\nIdade: %d", reg_animais[i].idade);
		if(reg_animais[i].sexo == 1){
			printf("\nSexo: Macho");	
		}
		else{
			printf("\nSexo: Femea");
		}
	}
}

float media_peso(struct dados reg_animais[TF]){
	int i, cont = 0;
	float media, acumula;
	for(i=0 ; i<TF ; i++){
		acumula += reg_animais[i].peso;
		cont++;
	}
	media = acumula / cont;
	return media;
}

void macho_acima(struct dados reg_animais[TF], float *media){
	int i, cont = 0;
	for(i=0 ; i<TF ; i++){
		if(reg_animais[i].sexo == 1 && reg_animais[i].peso > *media){
			cont++;
		}
	}
	printf("\n%d machos estao acima da media de peso.", cont);
}

void velho_novo(struct dados reg_animais[TF]){
	int i;
	char nome_mais_velho[50], nome_mais_novo[50];
	float peso_mais_velho, peso_mais_novo;
	int animal_mais_velho, animal_mais_novo;
	
	for(i=0 ; i<TF ; i++){
		if(i = 0){
			animal_mais_velho = reg_animais[i].idade;
			animal_mais_novo = reg_animais[i].idade;
		}
		else{
			if(reg_animais[i].idade > animal_mais_velho){
				animal_mais_velho = reg_animais[i].idade;
				strcpy(nome_mais_velho, reg_animais[i].nome);
				peso_mais_velho = reg_animais[i].peso;
			}
			else{
				if(reg_animais[i].idade < animal_mais_novo){
					animal_mais_novo = reg_animais[i].idade;
					strcpy(nome_mais_novo, reg_animais[i].nome);
					peso_mais_novo = reg_animais[i].peso;
				}
			}
		}
	}
	printf("\n\nO nome do animal mais Novo eh %s e seu Peso eh %0.2f", nome_mais_novo, peso_mais_novo);
	printf("\nO nome do animal mais Velho eh %s e seu Peso eh %0.2f", nome_mais_velho, peso_mais_velho);
}

void main(){
	struct dados reg_animais[TF];
	float media;
	
	ler_dados(reg_animais);
	exibir_dados(reg_animais);
	
	media = media_peso(reg_animais);
	printf("\n\nA media de peso dos animais eh: %0.2f", media);
	
	macho_acima(reg_animais, &media);
	velho_novo(reg_animais);
}
