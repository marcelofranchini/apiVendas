# Api Vendas
Api Rest criada com Typescript, Node.js, Express, TypeORM, Postgres, Redis e Docker.
Serviços AWS S3 e SES.
Servidor Linux DigitalOcean

# Produção em servidor linux. (Documentação Swagger em andamento)

Rotas Gerais:

Testar via insomnia ou postamn.
Criar Usuário:
https://apivendas.marcelofranchini.tech/users
Post
Body
{
	"name": "",
	"email": "",
	"password": ""	
}

Realizar login para obter token a ser utilizado nas demais rotas:
https://apivendas.marcelofranchini.tech/sessions
Post
Body
{
	"email": "",
	"password": ""	
}



Todas as rotas:
https://apivendas.marcelofranchini.tech/users
https://apivendas.marcelofranchini.tech/products
https://apivendas.marcelofranchini.tech/orders
https://apivendas.marcelofranchini.tech/customers
https://apivendas.marcelofranchini.tech/profile
https://apivendas.marcelofranchini.tech/password/reset
https://apivendas.marcelofranchini.tech/password/forgot
https://apivendas.marcelofranchini.tech/sessions
https://apivendas.marcelofranchini.tech/users/avatar



# Contato
marcelo.franchini@marcelofranchini.tech


