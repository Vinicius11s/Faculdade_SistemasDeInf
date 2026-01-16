#include <stdio.h>
#include <conio.h>

#define TL 4 //TL vai definir o tamanho das linhas
#define TC 4 //TC vai definir o tamanho das colunas

//1.	Leia uma matriz 4 x 4, conte e escreva quantos valores maiores que 10 ela possui

void ler_matriz(int mat[TL][TC]){
	int l,c;
	
	printf("<<<Este algortimo le uma matriz 4x4 e informa quantos valores digitados\n sao maiores que dez>>>\n\n");
	
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			printf("Informe Valores: ");
			scanf("%d", &mat[l][c]);
		}
	}
}

void verifica_valores(int mat[TL][TC]){
	int l,c, maiores_10 = 0;
	
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			if(mat[l][c] > 10){
				maiores_10++;
			}
			else{,
			
			}
		}
	}
	printf("\nVoce digitou %d valores maiores que 10", maiores_10);
}		

void main(){
	int mat[TL][TC];
	ler_matriz(mat);
	verifica_valores(mat);
}
