#include <stdio.h>
#include <conio.h>

#define TL 3 
#define TC 3

//5.	Leia uma matriz de 3 x 3 elementos. Calcule a média dos elementos que estão na diagonal principal.
	
void ler_matriz(int mat[TL][TC]){
	int l,c;
	printf("\n<<< Matriz A>>>\n");
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			printf("Informe Valores da posicao [%d] [%d]: ", l,c);
			scanf("%d", &mat[l][c]);
		}
	}
}


void verifica_posicao(int mat[TL][TC]){
	int l,c, acumulador = 0, cont = 0, media;
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			if(l == c){
				acumulador += mat[l][c];
				cont++;
				media = acumulador / cont;	
			}
		}
	}
	printf("\n\nMedia dos valores que estao na diagonal principal: %d", media);
}

void main(){
	int mat[TL][TC];
	printf("<<<Este algortimo calcula a média dos elementos que estao na diagonal principal da sua matriz >>>\n\n");
	
	ler_matriz(mat);
	verifica_posicao(mat);
}
