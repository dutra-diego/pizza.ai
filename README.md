## 🍕 Pizza.ai
Pizza.ai é um assistente de pizzaria que gerencia os pedidos da sua pizzaria no whatsapp, ele vende os produtos do cardápio, tendo a capacidade de vender pizzas personalizadas,  também tendo um dashboard para gerenciar os pedidos e os clientes.

## 📝 Features

- Venda de produtos do cardápio
- Venda de pizzas personalizadas
- Dashboard para gerenciar os pedidos, produtos, sabores e os clientes
- Agente de IA para atender os clientes

## 🛠️ Tecnologias

- Next.js
- React
- JavaScript com TypeScript
- Tailwind CSS
- Docker
- Node.js
- Fastify
- Prisma
- PostgreSQL
- Mastra
- GeminiAPI
- C# .NET
- Docker-Compose
- JWT


## ‼️ IMPORTANTE

o bot só responde no whatsapp se no inicio da mensagem tem "/bot", você pode retirar isso no codigo do agent. 
o código está no start-session-service.ts  
```if (text?.startsWith("/bot"))```.

não se esqueça de configurar as variáveis de ambiente no arquivo .env e appsettings.Development.json, todos tem um exemplo no arquivo .env.example e appsettings.Development.json.example


## 💻 Rodando localmente


```bash
# Clone o repositório
$ git clone https://github.com/dutra-diego/pizza-ai.git

# Acesse a pasta do projeto
$ cd pizza-ai

# Inicie o backend juntamente com o banco de dados
$ docker-compose up --build

# Acesse a pasta do frontend
$ cd frontend

# Instale as dependências
$ npm i

# Inicie o servidor
$ npm run dev
```

## 📸 Screenshots

![Imagem do qrcode](https://imgur.com/8xLlnZe)

![Imagem dos pedidos](https://imgur.com/FBTJrUz)

![Imagem dos produtos e sabores](https://i.imgur.com/KHTWHcf.png)

![Imagem da home](https://imgur.com/j6Svs8m)

## 👨‍💻 Autor

Diego - 2026

