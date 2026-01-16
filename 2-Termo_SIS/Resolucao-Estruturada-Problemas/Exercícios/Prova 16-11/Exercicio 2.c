#include <stdio.h>
#include <conio.h>
#include <string.h>

#define TF 3

/* Foi realizada uma pesquisa de algumas características de 3 barcos. De cada
barco foram coletados os seguintes dados: porte (1-grande, 2-médio, 3-pequenho),
Casco (1 - Fibra, 2 - Alumínio), potência do motor, horas de uso do motor. Com
base as informações acima, favor implementar os procedimentos/funções abaixo:

- Ler os dados em um vetor de registro. Validar as leituras quando necessário;
- Retornar o barco com maior potência no motor;
- Exibir os barcos de grande porte, com casco de fibra;
- Calcular a média horas de uso do motor dos barcos de grande porte

*/

struct dados{
	int porte;
	int casco;
	float potencia;
	int horas;
};

void ler_registros(struct dados reg_barcos[TF]){
	int i;
	
	printf("<<<Informe os dados do barco >>>");
	
	for(i=0; i<TF; i++){
		
		printf("\n\nRegistro %d", i);
		do{
			printf("\nInforme o porte do barco (1-grande, 2-medio, 3-pequeno):  ");
			scanf("%d", &reg_barcos[i].porte);
		}while(reg_barcos[i].porte != 1 && reg_barcos[i].porte != 2 && reg_barcos[i].porte != 3);
	
		do{
			printf("Informe o casco do barco (1-Fibra ; 2-Aluminio):  ");
			scanf("%d", &reg_barcos[i].casco);
		}while(reg_barcos[i].casco != 1 && reg_barcos[i].casco != 2);
		
		printf("Informe a Potencia do barco: ");
		scanf("%f", &reg_barcos[i].potencia);

		printf("Informe as Horas de uso do barco: ");
		scanf("%d", &reg_barcos[i].horas);		
	}
}

void exibir_registros(struct dados reg_barcos[TF]){
	int i;
	
	printf("<<<\n\nBarcos Registrados: >>>");
	
	for(i=0; i<TF; i++){
		printf("\n\nRegistro %d", i);
		switch(reg_barcos[i].porte){
			case 1:
				printf("\nBarco de Porte: Grande");
			break;
			
			case 2:
				printf("\nBarco de Porte: Medio");
			break;
			case 3:
				printf("\nBarco de Porte: Pequeno");
			break;
		}
		
		switch(reg_barcos[i].casco){
			case 1:
				printf("\nBarco de Casco de: Fibra");
			break;
			
			case 2:
				printf("\nBarco de Casco de: Aluminio");
			break;
		}
		
		printf("\nO Barco tem %0.2f de potencia", reg_barcos[i].potencia);
		printf("\nO Barco tem %d Horas de uso", reg_barcos[i].horas);		
				
	}
}

float maior_potencia_barco(struct dados reg_barcos[TF]){
	int i;
	float maior_potencia;
	for(i=0; i<TF; i++){
		if(i==0){
			maior_potencia = reg_barcos[i].potencia;
		}	
		else{
			if(reg_barcos[i].potencia > maior_potencia){
				maior_potencia = reg_barcos[i].potencia;
			}
		}
	}return maior_potencia;
}	
	
void grande_porte_fibra(struct dados reg_barcos[TF]){
	int i;
	int porte_fibra = 0;
	
	for(i=0; i<TF; i++){
		if(reg_barcos[i].porte == 1 && reg_barcos[i].casco == 1){
			porte_fibra++;
		}
		printf("\n\nEste barco eh de grande porte e eh de fibra\n");
		
		if(porte_fibra >= 1){
				switch(reg_barcos[i].porte){
				case 1:
					printf("\nBarco de Porte: Grande");
				break;
				
				case 2:
					printf("\nBarco de Porte: Medio");
				break;
				case 3:
					printf("\nBarco de Porte: Pequeno");
				break;
			}
			
			switch(reg_barcos[i].casco){
				case 1:
					printf("\nBarco de Casco de: Fibra");
				break;
				
				case 2:
					printf("\nBarco de Casco de: Aluminio");
				break;
			}
			
			printf("\nO Barco tem %0.2f de potencia", reg_barcos[i].potencia);
			printf("\nO Barco tem %d Horas de uso", reg_barcos[i].horas);			
		}
	}
}

void main(){
	int i;
	struct dados reg_barcos[TF];
	float maior_potencia;
	
	ler_registros(reg_barcos);
	
	exibir_registros(reg_barcos);
	
	maior_potencia = maior_potencia_barco(reg_barcos);
	
	printf("\n\nBarco com maior potencia:\n");
	
	for(i=0; i<TF; i++){
		if(reg_barcos[i].potencia == maior_potencia){
			switch(reg_barcos[i].porte){
				case 1:
					printf("\nBarco de Porte: Grande");
				break;
				
				case 2:
					printf("\nBarco de Porte: Medio");
				break;
				case 3:
					printf("\nBarco de Porte: Pequeno");
				break;
			}
			
			switch(reg_barcos[i].casco){
				case 1:
					printf("\nBarco de Casco de: Fibra");
				break;
				
				case 2:
					printf("\nBarco de Casco de: Aluminio");
				break;
			}
			
			printf("\nO Barco tem %0.2f de potencia", reg_barcos[i].potencia);
			printf("\nO Barco tem %d Horas de uso", reg_barcos[i].horas);		
					
		}					
	}
	
	grande_porte_fibra(reg_barcos);
}
