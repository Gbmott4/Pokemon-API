# 🎮 PokéManager API

API RESTful para gerenciamento de Pokémon, treinadores e capturas, desenvolvida na disciplina de **Desenvolvimento de APIs Modernas**.

O projeto aplica **Clean Architecture**, persiste os dados em **PostgreSQL** com **Prisma**, valida as requisições com **Zod**, consome a **PokéAPI oficial** e documenta todos os endpoints com **Swagger/OpenAPI**. Tudo sobe com **Docker Compose**.

### Funcionalidades

- **Catálogo de Pokémon:** cadastro, listagem com filtro por tipo, busca por ID, atualização completa (PUT), parcial (PATCH), só do nível e remoção.
- **Treinadores:** cadastro, busca, atualização e exclusão (e-mail único).
- **Pokédex:** pesquisa de qualquer Pokémon real pelo nome na [PokéAPI](https://pokeapi.co).
- **Capturas:** um treinador captura Pokémon da PokéAPI para a sua equipe, com limite de **6 Pokémon** por equipe, como nos jogos.

---

## 🏛️ Arquitetura do Projeto

O projeto segue a **Clean Architecture**: as regras de negócio ficam no centro e não dependem de Express, banco de dados ou APIs externas. As dependências sempre apontam para dentro.

```text
src/
├── domain/                  # [Camada 1] Núcleo: regras de negócio puras
│   ├── entities/            # Pokemon, Trainer e TrainerCapture (com validações próprias)
│   ├── errors/              # AppError e exceções do domínio (NotFound, Conflict, BadRequest...)
│   ├── gateways/            # Interface IPokeApiGateway (contrato da API externa)
│   └── repositories/        # IPokemonRepository, ITrainerRepository, ITrainerCaptureRepository
│
├── application/             # [Camada 2] Casos de uso
│   ├── dtos/                # Formato dos dados de entrada/saída
│   └── use-cases/           # Uma classe por ação: CapturePokemon, SearchPokemon, CreateTrainer...
│
├── infrastructure/          # [Camada 3] Detalhes externos
│   ├── database/
│   │   ├── in-memory/       # InMemoryPokemonRepository (Módulo 1)
│   │   └── prisma/          # PrismaPokemonRepository, PrismaTrainerRepository,
│   │                        # PrismaTrainerCaptureRepository, Prisma Client e tradutor de erros
│   ├── providers/           # PokeApiGateway: chama a PokéAPI com fetch
│   └── http/
│       ├── controllers/     # Recebem a requisição, chamam o caso de uso e respondem
│       ├── middlewares/     # validate-request (Zod) e error-handler global
│       ├── routes/          # Rotas e anotações do Swagger
│       └── schemas/         # Schemas Zod de validação
│
└── main/                    # [Camada 4] Composição e inicialização
    ├── config/              # Geração e configuração do Swagger
    ├── factories/           # Montam as dependências (repositório → caso de uso → controller)
    └── server.ts            # Configura o Express e registra rotas e middlewares
```

### Fluxo de uma requisição

```text
Cliente HTTP
    ↓
Rota (Express) → validateRequest (Zod)
    ↓
Controller
    ↓
Caso de uso  ──→  IPokeApiGateway  ←── PokeApiGateway (pokeapi.co)
    ↓
Interface do repositório  ←── PrismaPokemonRepository (PostgreSQL)
```

Como os casos de uso dependem apenas de **interfaces**, foi possível trocar o `InMemoryPokemonRepository` do Módulo 1 pelo `PrismaPokemonRepository` sem alterar a camada de domínio nem as regras de negócio. As **factories** em `main/` decidem qual implementação concreta é injetada.

### Exemplo: captura de um Pokémon

1. `POST /api/v1/trainers/:trainerId/captures` com `{ "pokemonName": "pikachu" }`
2. O Zod valida o UUID do treinador e o nome.
3. O `CapturePokemonUseCase`:
   - verifica se o treinador existe (`404` se não existir);
   - verifica se a equipe já tem 6 Pokémon (`409` se tiver);
   - busca o Pokémon na PokéAPI (`404` se não existir);
   - salva a captura com nome, imagem oficial, tipos, HP, ataque e defesa.

### Tratamento de erros

Um middleware global (`error-handler.ts`) padroniza todas as respostas de erro:

| Origem | Resposta |
| --- | --- |
| Validação do Zod | `400` com a lista de campos inválidos em `details` |
| Prisma: registro duplicado (P2002) | `409` |
| Prisma: registro não encontrado (P2025) | `404` |
| Prisma: referência inválida (P2003) | `409` |
| Exceções do domínio (`NotFoundError` 404, `ConflictError` 409, `BadRequestError` 400, `UnauthorizedError` 401, `ForbiddenError` 403) | Status definido na própria exceção (todas estendem `AppError`) |
| Qualquer outro erro | `500` genérico, sem expor detalhes internos |

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Pokémon não encontrado no catálogo."
}
```

---

## 🗄️ Banco de Dados

PostgreSQL 16, acessado via Prisma (`prisma/schema.prisma`):

- **pokemons:** catálogo próprio (id, name, type, hp, attack, defense, level)
- **trainers:** treinadores (UUID gerado pelo banco, e-mail único)
- **trainer_captures:** Pokémon capturados por cada treinador (exclusão em cascata ao remover o treinador)

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js 22 + TypeScript
- **Framework web:** Express 5
- **Banco de dados:** PostgreSQL 16 + Prisma ORM
- **Validação:** Zod
- **API externa:** PokéAPI
- **Documentação:** OpenAPI 3.0, swagger-autogen e Swagger UI
- **Infraestrutura:** Docker e Docker Compose (API + PostgreSQL + Adminer)
- **Qualidade:** ESLint e Prettier

---

## 🚀 Como Executar

### Opção 1: Docker (recomendado)

```bash
# 1. Clonar o repositório
git clone https://github.com/Gbmott4/Pokemon-menager-API
cd pokemon-manager-api

# 2. Criar o .env a partir do exemplo e definir uma senha
cp .env.example .env

# 3. Subir API, banco e Adminer
docker compose up --build

# 4. (Só na primeira vez) criar as tabelas no banco
docker compose exec app npm run db:push
```

### Opção 2: Local (Node.js 18+)

Com um PostgreSQL rodando e a `DATABASE_URL` configurada no `.env`:

```bash
npm install
npm run prisma:generate
npm run db:push
npm start
```

### Endereços

- 🚀 **API:** `http://localhost:3333/api/v1`
- 📖 **Swagger UI:** `http://localhost:3333/api/docs`
- 🐘 **Adminer (visualizar o banco):** `http://localhost:8080` (servidor `db`)

---

## 📖 Endpoints

Todos os endpoints começam com `/api/v1`. A documentação interativa completa fica em `/api/docs`.

### Pokémon

| Método | Endpoint | Descrição | Sucesso |
| --- | --- | --- | --- |
| POST | `/pokemons` | Cadastra um Pokémon | `201` |
| GET | `/pokemons` | Lista os Pokémon (filtro opcional `?type=electric`) | `200` |
| GET | `/pokemons/:id` | Busca um Pokémon pelo ID | `200` |
| PUT | `/pokemons/:id` | Atualiza todos os dados | `200` |
| PATCH | `/pokemons/:id` | Atualiza só os campos enviados | `200` |
| PATCH | `/pokemons/:id/level` | Atualiza só o nível (1 a 100) | `200` |
| DELETE | `/pokemons/:id` | Remove um Pokémon | `204` |

### Treinadores

| Método | Endpoint | Descrição | Sucesso |
| --- | --- | --- | --- |
| POST | `/trainers` | Cadastra um treinador (retorna o UUID) | `201` |
| GET | `/trainers/:id` | Busca um treinador | `200` |
| PUT | `/trainers/:id` | Atualiza um treinador | `200` |
| DELETE | `/trainers/:id` | Exclui um treinador e suas capturas | `204` |

### Pokédex e Capturas

| Método | Endpoint | Descrição | Sucesso |
| --- | --- | --- | --- |
| GET | `/pokedex/search?name=pikachu` | Pesquisa um Pokémon na PokéAPI | `200` |
| POST | `/trainers/:trainerId/captures` | Captura um Pokémon para o treinador | `201` |
| GET | `/trainers/:trainerId/team` | Lista a equipe do treinador | `200` |

---

## 🧪 Exemplos de Requisições

### Cadastrar um Pokémon

O `type` aceita maiúsculas ou minúsculas (`Electric`, `electric` ou `ELECTRIC`) e é salvo em maiúsculas. O `level` é opcional (padrão `1`).

```bash
curl -X POST http://localhost:3333/api/v1/pokemons \
  -H "Content-Type: application/json" \
  -d '{"id": "25", "name": "Pikachu", "type": "Electric", "hp": 35, "attack": 55, "defense": 40}'
```

### Cadastrar um treinador e capturar Pokémon

```bash
# Cria o treinador; a resposta traz o "id" (UUID) em "data"
curl -X POST http://localhost:3333/api/v1/trainers \
  -H "Content-Type: application/json" \
  -d '{"name": "Ash Ketchum", "email": "ash@example.com", "city": "Pallet"}'

# Captura um Pokémon (troque <UUID> pelo id retornado acima)
curl -X POST http://localhost:3333/api/v1/trainers/<UUID>/captures \
  -H "Content-Type: application/json" \
  -d '{"pokemonName": "charizard"}'

# Vê a equipe
curl http://localhost:3333/api/v1/trainers/<UUID>/team
```

### Pesquisar na PokéAPI

```bash
curl "http://localhost:3333/api/v1/pokedex/search?name=bulbasaur"
```

---

## 👤 Autor

Desenvolvido por **Gabriel Neves Motta Oliveira**, estudante de Ciência da Computação.
