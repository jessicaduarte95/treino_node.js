// Criando um servidor simples

/*
const http = require('http'); 

http.createServer((requisicao,resposta) => {
    resposta.writeHead(201, {
        'Content-Type':'text/plain'
    });
    resposta.write('Curso de Node.js\n');
    resposta.end(); 
}).listen(4000);*/


// Criando rotas no servidor Node

/*
const http = require('http');
const porta = 2000;
const host = '127.0.0.1';

const servidor = http.createServer((requisicao,resposta) => {
    resposta.writeHead(200, {
        'Content-Type':'text/plain'
    });
    if(requisicao.url=='/'){
        resposta.write('Seja bem vindo');
    }else if (requisicao.url == '/canal'){
        resposta.write('Cursos');
    }else if (requisicao.url == '/curso'){
        resposta.write('Curso de Node.js');
    }
    resposta.end();
});
servidor.listen(porta,host,() => {console.log('Servidor Rodando.')});
*/

/*
const http = require('http');
const url = require('url');
const porta = 2000;
const host = '127.0.0.1';

const servidor = http.createServer((requisicao,resposta) => {
    resposta.writeHead(200, {
        'Content-Type':'text/plain'
    });
   
    resposta.write(requisicao.url);
    const p = url.parse(requisicao.url,true).query;
    resposta.write('<br/>' + p.nome);
    resposta.write('<br/>' + p.curso);

    resposta.end();
});
servidor.listen(porta,host,() => {console.log('Servidor Rodando.')});*/


// Módulo FS para manipular arquivos em Node.

// Leitura de Arquivos
/*
const http = require('http')
const fs = require ('fs')
const porta = process.env.PORT */

/*readFile -> Ler Arquivo, deve-se passar o nome do arquivo e uma função anônima. */
/*
const server = http.createServer((req,res) => {
    fs.readFile('site.html', (err,arquivo)=> {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(arquivo); // Vai escrever no arquivo
        return res.end;
    });
});

server.listen(porta || 3500, ()=>{console.log('Servidor Rodando.')})*/

/*
const http = require('http')
const fs = require ('fs')
const porta = process.env.PORT */

/*appendFile -> Anexar Arquivo, deve-se passar o nome do arquivo, o que se quer no arquivo e uma função anônima. */
/*
const server = http.createServer((req,res) => {
    fs.appendFile('teste.txt', 'Curso de Node.js', (err)=> {
        if (err) throw err
        console.log('Arquivo Criado.')
    });
});

server.listen(porta || 3500, ()=>{console.log('Servidor Rodando.')});*/


// Criando Rotas usando Express
/*
const express = require('express')
const app = express()
const porta = process.env.PORT;

app.get('/',(req,res)=>{
    res.send('Seja bem vindo.')
})

app.get('/canal',(req,res)=>{
    res.json({canal:'CFB Cursos.'})
})

app.listen(porta || 3000, () => {console.log('Servidor Rodando.')});
*/


// Modularizando as rotas do App Node.js

/*
const express = require('express')
const rotas = require('./rotas/rotas')
const porta = process.env.PORT || 3000

const app = express()

app.use('/', rotas)

app.get('*',(req,res) => {
    res.send('Cursos')
})

app.listen(porta, () => {console.log('Rodando.')})*/


// Node com banco MySql

/*
(async () => {
    const db = require('./db')*/

    //Inserindo Cliente
    //console.log('Inserir novo cliente')
    //await db.insereCliente({nome:'Maria', idade:'25'})

    // Atualizando Cliente
    /*const id = 2
    const nom = 'Alice'
    const ida = 31
    await db.atualizaCliente(id,{nome:nom,idade:ida})
    console.log('Cliente ' +id+ ' atualizado')*/

    // Deletar Cliente
    /*
    const id = 3
    await db.deletarCliente(id)
    console.log('Cliente '+id+' deletado.')

    // Selecionando dados
    console.log('Obter todos os clientes')
    const clientes = await db.todosClientes()
    console.log(clientes)
})()*/


// Trabalhando com eventos em Node 

/*
const http = require('http')
const eventos = require('events')
const eventoEmissor = new eventos.EventEmitter()
const final = () => {console.log('Fim do processo')}

eventoEmissor.on('msg',() => {console.log('Curso de Node')})

eventoEmissor.on('fim',final)

const porta = process.env.PORT || 3000
const retorno = () => {console.log('Servidor Rodando.')}

const servidor = http.createServer((req,res) => {
    eventoEmissor.emit('msg')
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.write('Cursos')
    eventoEmissor.emit('fim')
    res.end()
})

servidor.listen(porta,retorno)*/



// Upload de arquivos em Node com o módulo formidable

const http = require('http')
const porta = process.env.PORT || 3000
const formidavel = require('formidable')
const fs = require('fs')

const servidor = http.createServer((req,res) => {

    if (req.url == '/envioDeArquivo'){
        const form = new formidavel.IncomingForm();
        form.parse(req, (erro, campos, arquivos) => {
            const urlantiga = arquivos.filetoupload.path
            const urlnova = 'C:/Users/jessica/Documents/Treino_nodejs/' + arquivos.filetoupload.name 
            fs.rename(urlantiga, urlnova, (erro) => {
                if(erro) throw erro
                res.write('Arquivo Movido!')
                res.end
            })
        })
    }else{
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('<form action="enviodeArquivo" method="post" enctype="multipart/form-data">')
        res.write('<input type="file" name="filetoupload><br>"')
        res.write('<input type="submit" value="Enviar">')
        res.write('</form>')
    }
})

servidor.listen(porta)