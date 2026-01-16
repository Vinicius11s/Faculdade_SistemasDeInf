#include <stdio.h>
#include <conio.h>
#include <unistd.h>

#define TL 5
#define TC 5

//8
	
void gerar_numeros(int mat[TL][TC]){
	int l,c;
	srand ( (unsigned)time(NULL) );
	printf("\n<<< Numeros >>>\n");
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			mat[l][c] = ( rand() % 99); 
		}
	}
}

void exibir_matriz(int mat[TL][TC]){
	int l, c;
	printf("\n");	

	for(l=0;l<TL;l++){
		for(c=0;c<TC;c++){
			printf("%d | ", mat[l][c]);
			usleep(150000);
		}
		printf("\n");	
	}		
}

void main(){
	int mat[TL][TC];
	printf("<<<Este algortimo gera numeros aleatorios para cartelas de bingo >>>\n\n");
	
	gerar_numeros(mat);
	exibir_matriz(mat);
}
