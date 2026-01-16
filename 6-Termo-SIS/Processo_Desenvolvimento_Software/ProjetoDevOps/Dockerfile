FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# 1️⃣ Copia a solução e os arquivos .csproj individuais (apenas libs e projeto principal)
COPY *.sln ./
COPY Services/*.csproj ./Services/
COPY Interfaces/*.csproj ./Interfaces/
COPY Infraestructure/*.csproj ./Infraestructure/
COPY Entities/*.csproj ./Entities/
COPY Agile/Agile.csproj ./Agile/

# 2️⃣ Restaura dependências do projeto principal
RUN dotnet restore Agile/Agile.csproj

# 3️⃣ Copia todo o código da solução
COPY . ./

# 4️⃣ Publica o projeto principal (gera tudo em /out)
WORKDIR /app/Agile
RUN dotnet publish Agile.csproj -c Release -o /out

# ========================
# Etapa 2: Runtime (imagem leve)
# ========================
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copia o build do projeto principal
COPY --from=build /out ./

# Porta da aplicação
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Comando para rodar a aplicação
ENTRYPOINT ["dotnet", "Agile.dll"]