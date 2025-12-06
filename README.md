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
