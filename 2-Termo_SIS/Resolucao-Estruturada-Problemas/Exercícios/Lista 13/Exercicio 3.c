#include <stdio.h>
#include <conio.h>

//3.	Ler uma matriz SOMA 4x4, calcular e escrever as seguintes somas:
//a) da linha 3
//b) da coluna 2
//c) de todos os elementos da matriz


#define TC 4
#define TL 4 

void carregar_matriz(int mat[TL][TC]){
	int l, c;
	for(l=0;l<TL;l++){
		for(c=0;c<TC;c++){ 
			printf("Informe Matriz: ");
			scanf("%d", &mat[l][c]);
		}	
	}	
}

void soma(int mat[TL][TC]){
	int l, c, soma3 = 0, soma2 = 0, total = 0;
	for(l=0;l<TL;l++){ 
		for(c=0;c<TC;c++){ 
			total += mat[l][c];
			
			if(l==3){
				soma3 += mat[l][c];
			}
			else
				if(l==2){
					soma2 += mat[l][c];
				}
		}	
	}
	printf("\n\nSoma da Linha 3: %d", soma3);
	printf("\n\nSoma da Linha 2: %d", soma2);
	printf("\n\nSoma da Matriz: %d", total);
}

void exibir_matriz(int mat[TL][TC]){
		int l, c;
	for(l=0;l<TL;l++){ 
		for(c=0;c<TC;c++){
			printf("\nMat[%d][%d] = %d", l, c, mat[l][c]);
		}	
	}		
}


void main(){
	int mat[TL][TC];
	carregar_matriz(mat);
	exibir_matriz(mat);
	soma(mat);
}
