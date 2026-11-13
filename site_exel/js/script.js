
let carrinho = [];

// Mostrar os produtos na loja
function mostrarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach((produto, index) => {

        lista.innerHTML += `
            <div class="produto">

                <div class="produto-imagem">
                    ${produto.imagem}
                </div>

                <h3>${produto.nome}</h3>

                <p class="preco">
                    ${produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </p>

                <button class="botao"
                    onclick="comprar(${index})">
                    Comprar
                </button>

            </div>
        `;
    });
}

// Adicionar produto ao carrinho
function comprar(index) {
    carrinho.push(produtos[index]);

    atualizarCarrinho();

    alert("Produto adicionado ao carrinho!");
}

// Atualizar carrinho e valores
function atualizarCarrinho() {

    const lista = document.getElementById("itensCarrinho");

    let subtotal = 0;

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }

    carrinho.forEach((produto, index) => {

        subtotal += produto.preco;

        lista.innerHTML += `
            <div class="item-carrinho">

                <span>${produto.nome}</span>

                <strong>
                    ${produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </strong>

                <button onclick="remover(${index})">
                    Remover
                </button>

            </div>
        `;
    });

    const regiao = document.getElementById("regiao").value;

    let valorFrete = 0;

    if (carrinho.length > 0 && regiao !== "") {
        valorFrete = fretes[regiao];
    }

    document.getElementById("frete").innerText =
        "Frete: " + valorFrete.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("total").innerText =
        "Total: " + (subtotal + valorFrete).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

// Remover produto
function remover(index) {
    carrinho.splice(index, 1);

    atualizarCarrinho();
}

// Finalizar compra
function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Adicione um produto ao carrinho!");
        return;
    }

    const regiao = document.getElementById("regiao").value;

    if (regiao === "") {
        alert("Selecione sua região de entrega!");
        return;
    }

    alert("Compra realizada com sucesso! Obrigado por escolher a Blue Store.");

    carrinho = [];

    document.getElementById("regiao").value = "";

    atualizarCarrinho();
}

// Iniciar loja
mostrarProdutos();
atualizarCarrinho();
