const lista = document.getElementById('lista');
const formulario = document.getElementById('formulario');
const total = document.getElementById('total');
const mensagem = document.getElementById('mensagem');

async function carregarProdutos() {
    lista.innerHTML = '<tr><td colspan="2">Carregando...</td></tr>';
    try {
        const resposta = await fetch('api/produtos');
        const produtos = await resposta.json();

        let html = '';
        for (const produto of produtos) {
            html += ` <tr>
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td><button type="button" class="btn-delete" data-id="${produto.id}">Deletar</button></td>
            </tr>`;
        }
        lista.innerHTML = html;

        total.innerHTML = `Quantidade de produtos: <strong>${produtos.length}</strong>`; // Exercício 2
    } catch (erro) {
        lista.innerHTML = '<tr><td colspan="2">Erro ao carregar os produtos...</td></tr>';
        total.innerHTML = '';
    }
}

formulario.addEventListener('submit', async(evento) =>{
    evento.preventDefault();
    mensagem.innerHTML = '';
    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;

    try{
        const resposta = await fetch('/api/produtos', {
            method: 'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify({nome, preco})
        });
    //EXERCICIO 5: se a API recusou o cadastro, mostra o erro
    if(!resposta.ok) {
        const dados = await resposta.json();
        mensagem.innerHTML = dados.erro;
        return;
    }
    formulario.reset();
    carregarProdutos();
    } catch (erro){
        mensagem.innerHTML = "Não foi possivel falar com o servidor";
        console.log(erro);

    }
});

// EXERCÍCIO 6
lista.addEventListener("click", async (evento) => {
    const btn = evento.target.closest(".btn-delete");
    if (!btn) return;

    const id = btn.dataset.id;
    const resposta = await fetch(`/api/produtos/${id}`, {
        method: "DELETE",
    });

    if (resposta.ok) {
        btn.closest("tr")?.remove();
        carregarProdutos();
    }
});

carregarProdutos();