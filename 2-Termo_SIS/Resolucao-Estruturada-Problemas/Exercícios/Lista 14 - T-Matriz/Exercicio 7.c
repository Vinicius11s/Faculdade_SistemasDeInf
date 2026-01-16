#include <stdio.h>
#include <conio.h>

#define TL 3 
#define TC 3

//7.	Leia uma matriz de 3 x 3 elementos. Calcule a soma dos elementos que estão abaixo da média da diagonal principal
	
void ler_matriz(int mat[TL][TC]){
	int l,c;
	printf("\n<<< Matriz >>>\n");
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			printf("Informe Valores da posicao [%d] [%d]: ", l,c);
			scanf("%d", &mat[l][c]);
		}
	}
}

void exibir_matriz(int mat[TL][TC]){
	int l, c;
	printf("\n");	

	for(l=0;l<TL;l++){
		for(c=0;c<TC;c++){
			printf("%d | ", mat[l][c]);
		}
		printf("\n");	
	}		
}

void soma_elementos_maiores(int mat[TL][TC]){
	int l,c, acumulador = 0, cont = 0, media, acumulador2 = 0;
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			if(l == c){
				acumulador += mat[l][c];
				cont++;
				media = acumulador / cont;	
			}
		}
	}
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			if(mat[l][c] < media){
				acumulador2 += mat[l][c];
			}
		}
	}
	printf("\n\nMedia dos valores que estao na diagonal principal: %d", media);
	printf("\n\nSoma dos valores que estao abaixo da media diagonal: %d", acumulador2);	
}


void main(){
	int mat[TL][TC];
	printf("<<<Este algortimo calcula a soma dos elementos maiores que a media da diagonal >>>\n\n");
	
	ler_matriz(mat);
	exibir_matriz(mat);
	soma_elementos_maiores(mat);
}
