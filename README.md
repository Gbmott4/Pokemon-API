# 🎮 PokéManager API — Módulo 1

API RESTful para gerenciamento de um catálogo de Pokémon, desenvolvida na disciplina de **Desenvolvimento de APIs Modernas**.

Este repositório contempla, até o momento, a **primeira entrega (Módulo 1)**, focada no desacoplamento do código por meio da **Clean Architecture**, persistência em memória (_In-Memory_), documentação interativa com **Swagger/OpenAPI** e organização das regras de negócio em casos de uso.

---

## 🏛️ Arquitetura do Projeto

O projeto segue os princípios da **Clean Architecture (Arquitetura Limpa)**, buscando manter as regras de negócio independentes de frameworks e detalhes externos, além de proporcionar separação clara de responsabilidades.

```text
src/
├── domain/                  # [Camada 1] Núcleo da aplicação: define o negócio sem depender de Express, banco de dados ou outras tecnologias
│   ├── entities/            # Entidades do sistema e suas regras/validações, como a classe Pokemon
│   ├── errors/              # Erros relacionados às regras da aplicação, como ResourceNotFoundError
│   └── repositories/        # Interfaces que definem o que um repositório deve fazer, sem definir como os dados são armazenados
│
├── application/             # [Camada 2] Contém a lógica dos casos de uso e coordena as operações do sistema
│   ├── dtos/                # Define o formato dos dados utilizados pelos casos de uso (Create, Update e Patch)
│   └── use-cases/           # Implementa as ações da aplicação, como criar, buscar, atualizar e remover Pokémon
│
├── infrastructure/          # [Camada 3] Implementa os detalhes externos necessários para a aplicação funcionar
│   ├── database/            # Implementações responsáveis pela persistência dos dados
│   │   └── in-memory/       # Repositório que armazena temporariamente os Pokémon em um array na memória
│   └── http/                # Responsável pela comunicação da aplicação através do protocolo HTTP
│       ├── controllers/     # Recebe as requisições HTTP, chama os casos de uso e monta as respostas
│       └── routes/          # Define os métodos e URLs da API e direciona cada requisição ao controller
│
└── main/                    # [Camada 4] Ponto de composição e inicialização da aplicação
    ├── config/              # Configurações gerais, incluindo a geração e configuração do Swagger/OpenAPI
    ├── factories/           # Realiza a instanciação e injeção das dependências
    └── server.ts            # Configura o Express, registra as rotas e inicia o servidor HTTP
```

### Fluxo principal da aplicação

```text
Cliente HTTP
    ↓
Express / Routes
    ↓
PokemonController
    ↓
Use Cases
(List / GetById / Create / Update / Patch / Delete)
    ↓
IPokemonRepository
    ↑
InMemoryPokemonRepository
```

O `main` funciona como ponto de composição da aplicação. Por meio da factory, são criadas e conectadas as dependências entre o repositório, os casos de uso e o controller. O servidor também registra as rotas HTTP e disponibiliza a documentação Swagger.

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js
- **Linguagem:** TypeScript
- **Framework Web:** Express
- **Execução em desenvolvimento:** tsx
- **Documentação:** OpenAPI 3.0, Swagger UI Express e swagger-autogen
- **Qualidade e padronização:** ESLint e Prettier

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

- Node.js 18 ou superior
- npm instalado
- Git instalado

### Passo a passo

```bash
# 1. Clonar o repositório
git clone https://github.com/Gbmott4/Pokemon-API

# 2. Acessar a pasta do projeto
cd pokemon-manager-api

# 3. Instalar as dependências
npm install

# 4. Executar a aplicação
npm start
```

Ao executar `npm start`, a documentação Swagger é gerada automaticamente antes da inicialização do servidor.

O servidor será iniciado na porta `3333`:

- 🚀 **API:** `http://localhost:3333/api/v1`
- 📖 **Swagger UI:** `http://localhost:3333/api/docs`

---

## 📖 Documentação dos Endpoints

A documentação interativa completa está disponível através do Swagger UI em `/api/docs`.

| Método | Endpoint               | Descrição                                                | Status de sucesso |
| ------ | ---------------------- | -------------------------------------------------------- | ----------------- |
| POST   | `/api/v1/pokemons`     | Cadastra um novo Pokémon no catálogo                     | `201 Created`     |
| GET    | `/api/v1/pokemons`     | Lista os Pokémon, com suporte ao filtro `?type=Electric` | `200 OK`          |
| GET    | `/api/v1/pokemons/:id` | Busca um Pokémon pelo ID                                 | `200 OK`          |
| PUT    | `/api/v1/pokemons/:id` | Atualiza completamente os dados de um Pokémon            | `200 OK`          |
| PATCH  | `/api/v1/pokemons/:id` | Atualiza parcialmente os dados de um Pokémon             | `200 OK`          |
| DELETE | `/api/v1/pokemons/:id` | Remove um Pokémon do catálogo                            | `204 No Content`  |

### PUT vs. PATCH

O endpoint `PUT` realiza uma atualização completa dos dados atualizáveis do Pokémon, enquanto o `PATCH` permite alterar apenas os campos enviados na requisição.

---

## 🧪 Exemplos de Requisições

### Cadastrar um Pokémon

```bash
curl --request POST \
  --url http://localhost:3333/api/v1/pokemons \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "25",
    "name": "Pikachu",
    "type": "Electric",
    "hp": 35,
    "attack": 55,
    "defense": 40
  }'
```

### Listar Pokémon por tipo

```bash
curl --request GET \
  --url 'http://localhost:3333/api/v1/pokemons?type=Electric'
```

### Atualizar parcialmente um Pokémon

```bash
curl --request PATCH \
  --url http://localhost:3333/api/v1/pokemons/25 \
  --header 'Content-Type: application/json' \
  --data '{
    "hp": 70
  }'
```

> **Observação:** nesta etapa do projeto, os dados são armazenados apenas em memória. Portanto, os Pokémon cadastrados são perdidos quando o servidor é reiniciado.

---

## 📚 Documentação Interativa

A API utiliza **OpenAPI 3.0** com `swagger-autogen` para gerar automaticamente sua especificação a partir das rotas e anotações do código.

Com o servidor em execução, acesse:

`http://localhost:3333/api/docs`

A interface Swagger UI permite visualizar os endpoints, parâmetros, schemas, códigos de resposta e realizar requisições diretamente pelo navegador utilizando **Try it out**.

---

## 👤 Autor

Desenvolvido por **Gabriel Neves Motta Oliveira**.

Estudante de Ciência da Computação.
