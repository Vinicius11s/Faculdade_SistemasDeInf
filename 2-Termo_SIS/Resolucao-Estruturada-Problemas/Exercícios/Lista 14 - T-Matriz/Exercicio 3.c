#include <stdio.h>
#include <conio.h>

#define TL 4 
#define TC 4

//3.	Leia uma matriz 4 x 4, imprima a matriz e retorne a localização (linha e a coluna) do maior valor.
	
void ler_matriz(int mat[TL][TC]){
	int l,c;
	
	printf("<<<Este algortimo le uma matriz 4x4 e e retorna a localização do maior valor.>>>\n\n");
	
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			printf("Informe Valores: ");
			scanf("%d", &mat[l][c]);
		}
	}
}

verifica_maior(int mat[TL][TC]){
	int l,c,maior, linha, coluna;
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			if(l==0 && c==0){
				maior = mat[l][c];
			}
			else{
				if(mat[l][c] > maior){
					maior = mat[l][c];
					linha = l;
					coluna = c;
				}	
			}
		}
	}
	printf("O maior numero digitado esta na posicao [%d] [%d]", linha, coluna);
}	

void main(){
	int mat[TL][TC];
	ler_matriz(mat);
	verifica_maior(mat);
}
