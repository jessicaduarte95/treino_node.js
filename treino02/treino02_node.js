// Entendendo Node.js

// http -> é um protoloco que permite com que um cliente comunique com um servidor.

// Forma tradicional de usar o http no Node

/*var http = require('http');

// createServer -> Abre um servidor http
// res -> serve para mandar alguma resposta para o usuário, para quem está acessando

http.createServer(function(req,res){
    res.end('Hello!')
}).listen(8081)

console.log("Servidor rodando!")*/


// Estudando o express
/*
const express = require('express')
const app = express() // A variável app recebe a função express.

// Função de callback -> é executada sempre que algum evento acontece.
// Rota -> Caminho para a aplicação.

app.get("/", function(req,res){
    res.send("Seja bem vindo ao meu app!")
})

app.get("/sobre", function(req,res){
    res.send("Minha página sobre.")
})

//req -> é a requisição que você recebe
app.get("/blog", function(req,res){
    res.send("Bem vindo ao meu blog!")
})

app.listen(8081, function(){
    console.log('Servidor Rodando!')
}) // Essa função (listen) tem que ser a última função do código.
*/


// Parâmetros
/*
const express = require('express')
const app = express()

// Para criar um parâmetro coloque /:
app.get('/ola/:cargo/:nome/:cor', function(req,res){
    //res.send(req.params)
    // req -> recebe dados de uma requisição
    // A função send só pode ser chamda uma única vez
    res.send("<h1>Hello " + req.params.nome+"</h1>"+"<h2>Seu cargo e "+ req.params.cargo +"</h2>"+"<h3>Sua cor favorita e "+ req.params.cor +"</h3>")

})

app.listen(8081, function(){
    console.log("Servidor Rodando!")
})*/



// Exibir arquivos html nas rotas
/*
const express = require('express')
const app = express()

// __dirname -> Retorna o diretório da aplicação.
app.get("/", function(req,res){
    res.sendFile(__dirname+"/html/index.html")
})

app.get("/sobre", function(req,res){
    res.sendFile(__dirname+"/html/sobre.html")
})

app.listen(8081, function(){
    console.log("Servidor Rodando!")
})*/



// Criando tabelas no MySQL

/*
SHOW DATABASES -> Mostrar base de dados.
CREATE DATABASE + nome da base de dados -> Criar base de dados .
USE + nome da base de dados -> Entro na base de dados.
SHOW TABLES -> Mostrar tabelas.
CREATE TABLE + nome da tabela.
nome da coluna + VARCHAR(número máximo) -> Criando Coluna.
DESCRIBE + nome da tabela -> Mostra toda a estrutura da tabela.
*/


// Inserindo Dados na tabela

/*
INSERT INTO + nome da tabela + (campos que quer inserir) + VALUES (o que você quer inserir) -> Inserir dados na tabela.
SELECT * FROM + nome da tabela -> Lista todos os dados da tabela.
SELECT * FROM + nome da tabela + WHERE + nome da coluna = o que deseja -> Selecionando usuário específico.
*/


// Deletando dados específicos
/*
DELETE FROM + nome da tabela + WHERE + nome da coluna = nome ue deseja deletar -> Deletar um valor.
*/


// Atualizando
/*
UPDATE + nome da tabela + SET + campo que deseja mudar + WHERE + onde se deseja mudar -> Atualização de dados.
*/



// Sequelize
// Conectando com o banco de dados

/*
const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistemadecadastro','root','password',{
    host:'localhost',
    dialect: 'mysql'
})  //sistemadecadastro -> nome do banco que se deseja conectar.

// Testar conexão.
// then -> é executada quando acontece algum evento, se obtém sucesso executa-se o then, se não executa-se o catch.
sequelize.authenticate().then(function(){
    console.log('Conectado com Sucesso.')
}).catch(function(erro){
    console.log('Falha ao se conectar.'+erro)
}) // Faz parte do paradigma de programação assíncrona.*/




// Models no Sequelize 
/*
const Sequelize = require ('sequelize')
const sequelize = new Sequelize('test', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

// models -> forma de criar tabela diretamente do Node
// Models de Postagem
// define -> cria a tabela
// string -> há um limite de tamanho
// text -> não hálimite de tamanho
const Postagem = sequelize.define('postagens', {
    título: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})*/

//Postagem.sync({force: true}) // Sincroniza o model com o mysql

// Inserindo dados na tabela
/*
Postagem.create({
    título: 'Um titulo qualquer.',
    conteudo: 'Um texto com o conteudo.'
})*/
/*
const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

//Usuario.sync({force: true})

// Inserindo dados na tabela usuário
Usuario.create({
    nome:'Maria',
    sobrenome: 'Fernandez',
    idade: 38,
    email: 'maria@email.com'
})*/



// Handlebars
// handlebars -> é um template, consegui exibir dados que vem do backend para o html.

const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')


// Config
// Template Engine
// Nas duas linhas abaixo estamos falando para o express que queremos usar o handlebars como template engine.
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
// main -> template padrão da aplicação
// Body Parser -> Usada para receber dados de formulários dentro do express.
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// Rotas
app.get('/cad', function(req,res){
    res.render('formularios')
})

app.get('/', function(req,res){
    Post.findAll({order: [['id', 'DESC']]}).then(function (posts){
        // Filtrando os dados antes de mandar para View
        const context = {
            postsContext: posts.map(post => {
                return {
                    titulo: post.titulo,
                    conteudo: post.conteudo
                }
            })
        }
        res.render('home', { posts: context. postsContext })
    })
}) // Retorna os posts dentro do banco de dados. 


app.post('/add', function(req,res){
    //res.send('Texto: '+req.body.titulo+' Conteúdo: '+req.body.conteudo)
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        // redirect -> Usado para redirecionar a rota.
        res.redirect('/')
        //res.send('Post criado com sucesso!')
    }).catch(function(erro){
        res.send('Houve um erro: '+ erro)
    })
})

app.get('deletar/:id', function(req,res){
    Post.destroy({where: {'id':req.params.id}}).then(function(){
        res.send('Postagem deletada com sucesso!')
    }).catch(function(erro){
        res.send('Esta postagem não existe!')
    })
})

app.listen(8081, function(){
    console.log('Servidor Rodando!')
})