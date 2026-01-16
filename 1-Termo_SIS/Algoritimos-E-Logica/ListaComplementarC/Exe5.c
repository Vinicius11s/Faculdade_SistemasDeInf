#include <stdio.h>
#include <conio.h>

//5 - Faça um algoritmo que receba o preço de custo e o preço de venda de um produto.
//Mostre como resultado se houve lucro, prejuízo ou empate para este produto. 
//Informe percentual de lucro ou prejuízo em relação ao custo x venda.



void main(){
	float pc, pv, ll ;
	printf("Informe o preco de custo: ");
	scanf("%f", &pc);
	printf("Informe o preco de venda: ");
	scanf("%f", &pv);
	
	ll = pv - pc;
	if(ll > 0 ){
		printf ("Houve lucro");
	}
	else{
		if(ll < 0 ){
			printf("Houve Prejuizo");
		}
		else{
			printf("Houve empate");
		}
	}
}
