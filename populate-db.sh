#!/bin/bash

BASE_URL="http://localhost:3000"

echo "================================"
echo "🚀 Populando banco de dados..."
echo "================================"

# Inserir Pessoas
echo ""
echo "📝 Inserindo PESSOAS..."
curl -s -X POST "$BASE_URL/pessoa" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ana","sobrenome":"Pereira","email":"ana.pereira@email.com","senha":"senhaAna123","ativo":true}' | jq '.' && echo "✅ Ana inserida"

curl -s -X POST "$BASE_URL/pessoa" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Carlos","sobrenome":"Oliveira","email":"carlos.oliveira@email.com","senha":"senhaCarlos456","ativo":false}' | jq '.' && echo "✅ Carlos inserido"

curl -s -X POST "$BASE_URL/pessoa" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Beatriz","sobrenome":"Souza","email":"beatriz.souza@email.com","senha":"senhaBeatriz789","ativo":true}' | jq '.' && echo "✅ Beatriz inserida"

# Inserir Receitas
echo ""
echo "💰 Inserindo RECEITAS..."
curl -s -X POST "$BASE_URL/receita" \
  -H "Content-Type: application/json" \
  -d '{"descricao":"Salário Mensal","valor":3500.00,"data":"2025-08-01","categoria":"Salário"}' | jq '.' && echo "✅ Salário inserido"

curl -s -X POST "$BASE_URL/receita" \
  -H "Content-Type: application/json" \
  -d '{"descricao":"Freelance Desenvolvimento","valor":1200.50,"data":"2025-08-05","categoria":"Freelance"}' | jq '.' && echo "✅ Freelance inserido"

curl -s -X POST "$BASE_URL/receita" \
  -H "Content-Type: application/json" \
  -d '{"descricao":"Venda de Produto","valor":450.00,"data":"2025-08-10","categoria":"Venda"}' | jq '.' && echo "✅ Venda inserida"

curl -s -X POST "$BASE_URL/receita" \
  -H "Content-Type: application/json" \
  -d '{"descricao":"Aluguel Recebido","valor":800.00,"data":"2025-08-03","categoria":"Aluguel"}' | jq '.' && echo "✅ Aluguel inserido"

# Inserir Despesas
echo ""
echo "💸 Inserindo DESPESAS..."
curl -s -X POST "$BASE_URL/despesa" \
  -H "Content-Type: application/json" \
  -d '{"tipo":"DESPESA","nome":"Aluguel","valor":1200,"data":"2024-06-01","tipoPagamento":"FIXA","categoria":"CASA","titular":"João","contaPaga":true,"quantidadeMes":1,"pessoa":1,"dataPagamento":"2024-06-05"}' | jq '.' && echo "✅ Aluguel inserido"

curl -s -X POST "$BASE_URL/despesa" \
  -H "Content-Type: application/json" \
  -d '{"tipo":"DESPESA","nome":"Supermercado","valor":450,"data":"2024-06-02","tipoPagamento":"VARIAVEL","categoria":"ALIMENTACAO","titular":"Ana","contaPaga":false,"quantidadeMes":1,"pessoa":2,"dataPagamento":null}' | jq '.' && echo "✅ Supermercado inserido"

curl -s -X POST "$BASE_URL/despesa" \
  -H "Content-Type: application/json" \
  -d '{"tipo":"DESPESA","nome":"Internet","valor":100,"data":"2024-06-03","tipoPagamento":"FIXA","categoria":"CASA","titular":"Carlos","contaPaga":true,"quantidadeMes":1,"pessoa":3,"dataPagamento":"2024-06-03"}' | jq '.' && echo "✅ Internet inserida"

echo ""
echo "================================"
echo "✨ Banco de dados populado!"
echo "================================"

# Listar dados inseridos
echo ""
echo "📊 Resumo dos dados inseridos:"
echo ""
echo "PESSOAS:"
curl -s -X GET "$BASE_URL/pessoa" | jq '.[] | {id, nome, email, ativo}'
echo ""
echo "RECEITAS:"
curl -s -X GET "$BASE_URL/receita" | jq '.[] | {id, descricao, valor, categoria}'
echo ""
echo "DESPESAS:"
curl -s -X GET "$BASE_URL/despesa" | jq '.[] | {id, nome, valor, categoria}'
