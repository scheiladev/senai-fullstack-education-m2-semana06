/* Variáveis */
let formNome = document.getElementById("form-nome");
let formIdade = document.getElementById("form-idade");
let formSerie = document.getElementById("form-serie");
let formEscola = document.getElementById("form-escola");
let formMateria = document.getElementById("form-materia");
let formCep = document.getElementById("form-cep");
let formRua = document.getElementById("form-rua");
let formCidade = document.getElementById("form-cidade");
let formEstado = document.getElementById("form-estado");

let nome = document.getElementById("nome");
let idade = document.getElementById("idade");
let serie = document.getElementById("serie");
let escola = document.getElementById("escola");
let materia = document.getElementById("materia");

let listaNotas = [];
let listaAlunos = [];
let medias = [];
let mediaNotas = 0;

let botaoCep = document.querySelector("#viacep");
if (botaoCep) {
  botaoCep.addEventListener("click", buscarCep);
}

let botaoSalvarDados = document.querySelector("#salvarDados");
if (botaoSalvarDados) {
  botaoSalvarDados.addEventListener("click", gravarDadosAluno);
}

let botaoMaterias = document.querySelector("#bt-notas");
if (botaoMaterias) {
  botaoMaterias.addEventListener("click", adicionarMateria);
}

function gravarDadosAluno(event) {
  event.preventDefault();

  if (
    !formNome.value ||
    !formIdade.value ||
    !formSerie.value ||
    !formEscola.value ||
    !formMateria.value ||
    !formCep.value
  ) {
    alert("Todos os dados são obrigatórios");
    return;
  }

  let confirmarDados = `Você confirma os dados inseridos?
    Nome do aluno: ${formNome.value}
    Idade do aluno: ${formIdade.value}
    Série do aluno: ${formSerie.value}
    Nome da escola: ${formEscola.value}
    Matéria favorita: ${formMateria.value}
    CEP: ${formCep.value}
    Rua: ${formRua.value}
    Cidade: ${formCidade.value}
    Estado: ${formEstado.value}
  `;

  let confirmacao = window.confirm(confirmarDados);

  if (!confirmacao) {
    limparDados();
    limparEndereco();
    return window.alert("Os dados não foram confirmados.");
  }

  let aluno = {};

  aluno.nome = formNome.value;
  aluno.idade = formIdade.value;
  aluno.serie = formSerie.value;
  aluno.escola = formEscola.value;
  aluno.materia = formMateria.value;
  aluno.cep = formCep.value;
  aluno.rua = formRua.value;
  aluno.cidade = formCidade.value;
  aluno.estado = formEstado.value;

  const dadosJSON = JSON.stringify(aluno);

  localStorage.setItem("dadosAluno", dadosJSON);

  window.location.href = "http://127.0.0.1:5500/home.html";
}

function calcularMedia(notas) {
  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    soma += notas[i];
  }
  let media = soma / notas.length;
  return media;
}

mediaNotas = calcularMedia(listaNotas);

function resultadoFinal(media) {
  return media >= 7
    ? `<p>Média: <strong>${media}</strong>.<br> Parabéns, você passou na média!</p>`
    : `<p>Média: <strong>${media}</strong>.<br> Infelizmente você está de recuperação.</p>`;
}

function imprimirNomes(nomes) {
  return nomes.forEach((aluno) => {
    document.write(`${aluno}<br>`);
  });
}

function tabuada(numero) {
  for (let i = 0; i <= 10; i++) {
    let resultado = numero * i;
    document.write(`${numero} x ${i} = ${resultado}<br>`);
  }
}

function adicionarMateria() {
  let materia = window.prompt("Qual o nome da matéria?");
  let notas = [];
  let i = 0;
  while (i < 4) {
    let nota = parseFloat(window.prompt("Informe a nota " + (i + 1) + ":"));
    notas.push(nota);
    i++;
  }

  let dadosMateria = {
    nomeMateria: materia,
    notas: notas,
  };

  let media = calcularMedia(dadosMateria.notas);
  medias.push(media);

  adicionarLinhaMateria(dadosMateria, media);

  let mediaGeral = calcularMedia(medias);
  document.querySelector("#mediaGeral").innerText = mediaGeral;

  let maiorMedia = encontrarMaiorNumero(medias);
  document.querySelector("#maiorMedia").innerHTML = maiorMedia;
}

function encontrarMaiorNumero(numeros) {
  let maiorNumero = numeros[0];

  for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > maiorNumero) {
      maiorNumero = numeros[i];
    }
  }

  return maiorNumero;
}

function adicionarLinhaMateria(dadosMateria, media) {
  let tbody = document.querySelector("#tabelaMaterias tbody");
  tbody.innerHTML += `
    <tr>
      <td>${dadosMateria.nomeMateria}</td>
      <td>${dadosMateria.notas[0]}</td>
      <td>${dadosMateria.notas[1]}</td>
      <td>${dadosMateria.notas[2]}</td>
      <td>${dadosMateria.notas[3]}</td>
      <td>${media}</td>
    <tr>
  `;
}

function limparDados() {
  formNome.value = "";
  formIdade.value = "";
  formSerie.value = "";
  formEscola.value = "";
  formMateria.value = "";
}

function limparEndereco() {
  formRua.value = "";
  formCidade.value = "";
  formEstado.value = "";
  formCep.value = "";
}

async function buscarCep(event) {
  event.preventDefault();
  let url = `https://viacep.com.br/ws/${formCep.value}/json/`;

  try {
    if (formCep.value.length != 8) {
      limparEndereco();
      throw new Error("Cep precisa ter 8 digitos numéricos");
    }

    let response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
      },
    });

    let data = await response.json();

    if (!data.erro) {
      formRua.value = data.logradouro;
      formCidade.value = data.localidade;
      formEstado.value = data.uf;
    } else {
      limparEndereco();
      throw new Error("Cep inválido");
    }
  } catch (error) {
    alert(error);
  }
}
