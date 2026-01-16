#include <stdio.h>
#include <conio.h>

//4.	Um cinema possui capacidade de 6 lugares e está sempre com ocupação total. Certo dia, cada espectador
//respondeu a um questionário, no qual constava, sua idade e sua opinião em relação ao filme, sendo

//o	Nota 		Significado
//o	1 		Ótimo
//o	2 		Bom
//o	3 		Regular
//o	4 		Ruim
//o	5 		Péssimo

//Elabore um algoritmo que, lendo estes dados, calcule e imprima:
//- A quantidade de respostas ótimo;
//- A diferença percentual entre respostas bom e regular;
//- A média de idade das pessoas que responderam ruim;
//- A percentagem de respostas péssimo e a maior idade que utilizou esta opção;
//- A diferença de idade entre a maior idade que respondeu ótimo e a maior idade que respondeu ruim.


void main(){
	float calculo, media_reg_bom, diferenca_absoluta, resultado, idade, lugares = 1, otimo = 0, bom = 0, regular = 0, ruim = 0, soma_ruim, media_ruim, maior_idade_pessimo, pessimo = 0, i = 0, porcentagem_pessimo, maior_idade_otimo, maior_idade_ruim;
	int nota;
	
	while (lugares <= 6){
		
		printf("\nInforme a sua idade: ");
		scanf("%f", &idade);
		
		printf("Nota / Significado");
		printf("\n1 - Otimo");
		printf("\n2 - Bom");
		printf("\n3 - Regular");
		printf("\n4 - Ruim");
		printf("\n5 - Pessimo");
		printf("\nQual sua opiniao em relacao ao filme: ");
		scanf("%d", &nota);
		i++;
		
		switch (nota){
			case 1:
				otimo++;
				if(idade > maior_idade_otimo){
				maior_idade_otimo = idade;
				}
				else{
				}
			break;
			
			case 2:
				bom++; 
			break;
			
			case 3:
				regular++;
			break;
				
			case 4:
				ruim++;
				soma_ruim = soma_ruim + idade;
				media_ruim = soma_ruim / ruim;
				
				if(idade > maior_idade_ruim){
					maior_idade_ruim = idade;
				}
				else{
				}
			break;	
			
			case 5:
				pessimo++;
				if(idade > maior_idade_pessimo){
					maior_idade_pessimo = idade;
				}
				else{
				}
		}
		lugares++;				
	}	
	porcentagem_pessimo = (pessimo * 100) / i;
	
	if(maior_idade_ruim > maior_idade_otimo){
		resultado = maior_idade_ruim - maior_idade_otimo;
	}
	else{
		resultado = maior_idade_otimo - maior_idade_ruim;
	}
	
	
	if(regular > bom){
		diferenca_absoluta = regular - bom;
	}
	else{
		diferenca_absoluta = bom - regular;
	}
	
	media_reg_bom = (bom + regular) /2;
	calculo =  (diferenca_absoluta / media_reg_bom) * 100; 
	
	printf("\n");
	printf("\n\nA quantidade de respostas otimo foi: %0.1f", otimo);
	printf("\nA diferenca percentual entre respostas bom e regular eh: %0.2f", calculo);	
	printf("\nA media de idade das pessoas que responderam ruim eh: %0.2f\n", media_ruim);		
	printf("\nA porcentagem de respostas pessimo foi: %0.2f", porcentagem_pessimo);
	printf("\nA maior idade que usou essa opcao foi: %0.2f\n", maior_idade_pessimo);
	printf("\nA diferenca de idade entre a maior idade que respondeu otimo e a maior idade que respondeu ruim eh de: %0.2f Anos", resultado);
}

