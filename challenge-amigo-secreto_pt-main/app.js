let amigos = [];

function adicionarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nomeAmigo = inputAmigo.value.trim();

    if (nomeAmigo === "") {
        alert("Por favor, insira um nome:");
        return;
    }

    amigos.push(nomeAmigo);

    atualizarLista();

    inputAmigo.value = "";
    inputAmigo.focus();
}

function atualizarLista() {
    const listaAmigoUl = document.getElementById("listaAmigos");
    listaAmigoUl.innerHTML = "";

    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaAmigoUl.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos para sortear.");
        return;
    }

    // Cria uma cópia da lista e embaralha
    let sorteados = [...amigos];
    for (let i = sorteados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sorteados[i], sorteados[j]] = [sorteados[j], sorteados[i]];
    }

    // Garante que ninguém tire a si mesmo
    for (let i = 0; i < amigos.length; i++) {
        if (amigos[i] === sorteados[i]) {
            // Se alguém tirou a si mesmo, refaz o sorteio
            sortearAmigo();
            return;
        }
    }

    const resultadoUl = document.getElementById("resultado");
    resultadoUl.innerHTML = "";
    for (let i = 0; i < amigos.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${amigos[i]} --> ${sorteados[i]}`;
        resultadoUl.appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("btnAdicionar").addEventListener("click", adicionarAmigo);
    document.getElementById("btnSortear").addEventListener("click", sortearAmigo);
});