const express = require('express');

const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(express.static('public'));
// tudo que estiver na pasta public pode  ser acessada pelo navegador.

const produtos = [
    {id: 1, nome: 'Caderno', preco: 15.9 },
    {id: 2, nome: 'Caneta Azul', preco: 2.5 },
    {id: 3, nome: 'Mochila', preco: 120 },
    //EXERCÍCIO 1: adicionar produtos
    {id: 4, nome: 'Borracha', preco: 1.75 },
    {id: 5, nome: 'Estojo', preco: 29.9 }
];

app.get('/api/produtos', (req, res) =>{
    res.json(produtos);
});

//EXERCICIO 4: retorna um produto pelo id
app.get('/api/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const produto = produtos.find((p) => p.id === id);

    if(!produto){
        return res.status(404).json({erro: 'Produto não encontrado.'});
    }

    res.json(produto);
});

app.post('/api/produtos', (req, res) => {
    const { nome, preco } = req.body;

    if(!nome || !preco){
        return res.status(400).json({erro: 'Informe nome e preço'});
    }

    //EXERCICIO 5
    if(isNaN(Number(preco)) || Number (preco) <= 0){
        return res.status(400).json({erro: 'O preço deve ser um número maior que zero.'})
    };

    const novo = { id: produtos.length + 1, nome: nome, preco: Number(preco)};
    produtos.push(novo);
    res.status(201).json(novo);
})

// EXERCÍCIO 6: rota DEL

app.delete('/api/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const produto = produtos.find((p) => p.id === id);

    if(!produto){
        return res.status(404).json({erro: 'Produto não encontrado ou produto já excluído.'});
    }

    produtos.splice(produtos.findIndex((produto) => produto.id === id), 1);
    res.status(204).send(); 
});


app.listen(PORTA, () =>{
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});