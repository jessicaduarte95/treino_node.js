const express = require("express");
const router = express.Router() // Componente usado para criar rotas em arquivos separados.
const mongoose = require("mongoose")
require("../Models/Categoria")
const Categoria = mongoose.model("categorias")

// Em arquivo separado ao invés de usar app.get, usa-se router.get.
router.get('/', (req,res) => {
    res.render('admin/index')
})

router.get('/posts', (req,res) => {
    res.send('Página de Posts.')
})

router.get('/categorias', (req,res) => {
    res.render('admin/categorias') // Traz o arquivo.
})

router.post('/categorias/nova', (req,res) => {

    // Sistema de Validação
    var erros =[]

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: 'Nome inválido'}) // push -> Serve para colocar um dado dentro do array.
    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: 'Slug Inválido'})
    }

    if (erros.length > 0){
        res.render("admin/addcategoria", {erros: erros})
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(() => {
            req.flash('success_msg', 'Categoria criada com sucesso!') // Exibir mensagem de que a categoria foi registrada com sucesso.
            res.redirect('/admin/categorias')
        }).catch((erro) => {
            req.flash('erro_msg', 'Houve um erro ao salvar a categoria, tente novamente!')
            res.redirect('/admin')
        })
    }


})

router.get('/categorias/add', (req,res) => {
    res.render('admin/addcategoria')
})

module.exports = router // É necessário exportar no final do arquivo.