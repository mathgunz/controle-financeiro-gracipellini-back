## API Controle Financeiro

API construída com NestJS + TypeORM para controlar pessoas, receitas, despesas e o resumo financeiro. A aplicação expõe documentação Swagger em tempo de execução e persiste os dados em um banco PostgreSQL.

### Requisitos

- Node.js >= 20 e npm 10+
- Docker e Docker Compose (opcional, mas facilita subir o PostgreSQL)
- PostgreSQL acessível localmente ou em um container

### Configuração inicial

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Crie seu arquivo de variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   Ajuste as chaves conforme o seu ambiente:

   | Variável | Descrição |
   | --- | --- |
   | `PORT` | Porta que o Nest vai escutar (padrão 3000) |
   | `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_SCHEMA` | Configurações do PostgreSQL (`DB_SCHEMA` define o schema onde as tabelas serão criadas; padrão `controle_financeiro`) |

3. **Suba o banco PostgreSQL**
   ```bash
   docker compose up -d
   ```
   O compose cria um banco `controle_financeiro` com usuário/senha `postgres`. Use o mesmo `.env` para conectar.

   > Se preferir usar um banco já existente, basta garantir que o host/porta/credenciais combinam com o `.env`.

### Executando o projeto

```bash
npm run start:dev
```

- A API ficará disponível em `http://localhost:3000`.
- A documentação Swagger estará em `http://localhost:3000/swagger`.

### Scripts úteis

- `npm run start` – execução sem watch.
- `npm run start:prod` – usa o build da pasta `dist`.
- `npm run test`, `npm run test:e2e`, `npm run test:cov` – suíte de testes com Jest.
- `npm run lint` – ESLint com correção automática.

### Banco de dados

- O TypeORM está configurado com `synchronize: true`, então as tabelas são criadas/atualizadas automaticamente a cada start. Em produção, desative sincronização e use migrações.
- Se precisar resetar o ambiente local, pare o compose e remova o volume `postgres_data`.

````markdown
## API Controle Financeiro

API construída com NestJS + TypeORM para controlar pessoas, receitas, despesas e o resumo financeiro. A aplicação expõe documentação Swagger em tempo de execução e persiste os dados em um banco PostgreSQL.

### Requisitos

- Node.js >= 20 e npm 10+
- Docker e Docker Compose (opcional, mas facilita subir o PostgreSQL)
- PostgreSQL acessível localmente ou em um container

### Configuração inicial

1. **Instale as dependências**
    ```bash
    npm install
    ```

2. **Crie seu arquivo de variáveis de ambiente**
    ```bash
    cp .env.example .env
    ```
    Ajuste as chaves conforme o seu ambiente:

    | Variável | Descrição |
    | --- | --- |
    | `PORT` | Porta que o Nest vai escutar (padrão 3000) |
    | `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` | Configurações do PostgreSQL |

3. **Suba o banco PostgreSQL**
    ```bash
    docker compose up -d
    ```
    O compose cria um banco `controle_financeiro` com usuário/senha `postgres`. Use o mesmo `.env` para conectar.

    > Se preferir usar um banco já existente, basta garantir que o host/porta/credenciais combinam com o `.env`.

### Executando o projeto

```bash
npm run start:dev
```

- A API ficará disponível em `http://localhost:3000`.
- A documentação Swagger estará em `http://localhost:3000/swagger`.

### Scripts úteis

- `npm run start` – execução sem watch.
- `npm run start:prod` – usa o build da pasta `dist`.
- `npm run test`, `npm run test:e2e`, `npm run test:cov` – suíte de testes com Jest.
- `npm run lint` – ESLint com correção automática.

### Banco de dados

- O TypeORM está configurado com `synchronize: true`, então as tabelas são criadas/atualizadas automaticamente a cada start. Em produção, desative sincronização e use migrações.
- Se precisar resetar o ambiente local, pare o compose e remova o volume `postgres_data`.

### Postman / massa de dados

- Os arquivos `postman-create-*.json` contêm coleções para inserir massa de pessoas, receitas e despesas.
- Importe no Postman e execute após a API estar rodando para popular o banco rapidamente.

### Dúvidas

Abra uma issue ou utilize o Swagger para testar os endpoints principais:

- `POST /pessoa`, `GET /pessoa/:id`
- `POST /receita`, `POST /despesa`
- `GET /resumo/mes/:mes/ano/:ano`

Pronto! Com `.env` + PostgreSQL ativo + `npm run start:dev`, o backend já estará disponível para integração com o frontend.

## **Aplicações**

- **API:** `controle-financeiro` — serviço backend construído com NestJS + TypeORM. A imagem é gerada a partir do arquivo `Dockerfile` na raiz do projeto.
   - Build da imagem:
      ```bash
      docker build -t controle-financeiro:latest .
      ```
   - Execução (modo simples):
      ```bash
      docker run -d --name controle-financeiro-app \
         -p 3000:3000 \
         -e DB_HOST=<host_do_banco> -e DB_PORT=5432 \
         -e DB_USER=postgres -e DB_PASS=postgres -e DB_NAME=controle_financeiro \
         controle-financeiro:latest
      ```
   - Observação (Linux): usar `--network host` pode simplificar conexão ao banco local (`--network host`), ou usar o `docker-compose` (recomendado) para isolar a rede entre serviços.

- **Banco de dados (PostgreSQL):** imagem `postgres:16` (serviço no `docker-compose.yml` chamado `postgres` / `controle_financeiro_db`). O compose monta um volume `postgres_data` para persistência de dados.

**Usando Docker Compose (recomendado)**

- Build e subir os serviços (API + banco):
   ```bash
   docker compose up -d --build
   ```
- Logs da API:
   ```bash
   docker compose logs -f api
   ```
- Parar e remover os serviços:
   ```bash
   docker compose down
   ```

**Variáveis de ambiente importantes**

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` — configurações do PostgreSQL.
- `API_PORT` — porta exposta pela API (padrão `3000`).

**Verificação rápida**

- A rota raiz responde com `Hello World!` quando a API está ativa. Teste:
   ```bash
   curl http://localhost:3000/
   ```

**Endpoints principais**

- **Root:** `GET /` — sanity check (Hello World)
- **Pessoas:** `GET /pessoa`, `GET /pessoa/:id`, `POST /pessoa`, `PUT /pessoa/:id`, `DELETE /pessoa/:id`
- **Receitas:** `GET /receita`, `POST /receita`, `PUT /receita/:id`, `DELETE /receita/:id`
- **Despesas:** `GET /despesa`, `POST /despesa`, `PUT /despesa/:id`, `DELETE /despesa/:id`
- **Resumo:** `GET /resumo` (e rotas de resumo por período)

Se quiser, posso também adicionar uma seção curta explicando como criar imagens para CI/CD ou como configurar variáveis de ambiente para produção.

````

WMFDEzF3aydlndftgiDl