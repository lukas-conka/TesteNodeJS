# TesteNodeJS
Teste com 2 bancos, relacional e Nosql. (MYSQL e MONGODB)

Documentacao da API em: http://localhost:4000/documentation#/

Utilizei 2 containers do Docker para criar os 2 bancos. 

Rodar o comando: docker-compose up ( para subir os bancos). Inicialmente esta setado o Mongodb. Para trocar de banco apenas mude a estancia da classe para o MYSQL.

Utilizei o design pattern STRATEGY para poder trabalhar com multi Dbs. 

Trabalhei com o conceito ORM utilizando o Sequelize com o MYSQL. E o Mongoose para o Mongodb.

Em todo processo trabalhei com TDD utilizando o JEST. 

Verifique então se esta tudo ok com o comando: npm test

E para finalizar para voces e demonstrar mais conhecimento utilizei o swagger para documentacao. Link já citado acima.

Acrescentado que também trabalho com GRAPHQL.

#Resumo

- Swagger
- Design Pattern STRATEGY
- Bancos: MYSQL e MongoDB
- ORM Sequelize
- TDD com Jest
- Docker - docker-compose up


