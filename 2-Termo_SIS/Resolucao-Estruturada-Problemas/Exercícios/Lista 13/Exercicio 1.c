#include <stdio.h>
#include <conio.h>

#define TC 3 //TC vai definir o tamanho das colunas
#define TL 3 //TL vai definir o tamanho das linhas

void carregar_matriz(int mat[TL][TC]){
	int l, c, soma = 0;
	for(l=0;l<TL;l++){ //este for, percorre as linhas
		for(c=0;c<TC;c++){ //este for, percorre as colunas
			soma += 10;
			mat[l][c] = soma;
		}	
	}	
}

void exibir_matriz(int mat[TL][TC]){
	int l, c;
	for(l=0;l<TL;l++){ //este for, percorre as linhas
		for(c=0;c<TC;c++){ //este for, percorre as colunas
			printf("\nMat[%d][%d] = %d", l, c, mat[l][c]); //para acessar a matriz, utilizar MATRIZ[LINHA][COLUNA]
		}	
	}		
}

void somar_matriz(int mat[TL][TC]){
	int l, c, soma = 0;
	for(l=0;l<TL;l++){ //este for, percorre as linhas
		for(c=0;c<TC;c++){ //este for, percorre as colunas
			soma += mat[l][c];
		}	
	}
	printf("\n\nSoma da Matriz: %d", soma);
}

void main(){
	int mat[TL][TC];
	carregar_matriz(mat);
	exibir_matriz(mat);
	somar_matriz(mat);
}
