const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((element) => {
  createElement(element);
});

form.addEventListener("submit", (Evento) => {
  Evento.preventDefault();

  const nome = Evento.target.elements["nome"];

  const quantidade = Evento.target.elements["quantidade"];
  const exist = itens.find((element) => element.nome === nome.value);
  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (exist) {
    itemAtual.id = exist.id;
    attElement(itemAtual);

    itens[itens.findIndex(element=>element.id === id)] = itemAtual;
  } else {
    itemAtual.id = itens[itens.lenght - 1] ? (itens[itens.lenght - 1]).id + 1  : 0  ;
    createElement(itemAtual);
    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens));
  nome.value = "";
  quantidade.value = "";
});

//função que cria a li
function createElement(item) {
  const itemLi = document.createElement("li");
  itemLi.classList.add("item");
  const itemNumber = document.createElement("strong");

  itemNumber.innerHTML = item.quantidade;
  itemNumber.dataset.id = item.id;

  itemLi.appendChild(itemNumber);
  itemLi.innerHTML += item.nome;
  itemLi.appendChild(deleteButton(item.id));
  lista.appendChild(itemLi);
}

// atualiza o item
function attElement(item) {
  document.querySelector("[data-id=" + item.id + "]").innerHTML =
    item.quantidade;
}

// botao que deleta itens da lista
function deleteButton(id) {
  const eraseButton = document.createElement("button");
  eraseButton.innerText = "X";

  eraseButton.addEventListener("click", function () {
    deleteElement(this.parentNode,id);
  });

  return eraseButton;
}

function deleteElement(tag, id) {
tag.remove();
itens.splice( itens.findIndex(element=>element.id === id),1)
localStorage.setItem("itens", JSON.stringify(itens));
}
