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

let listaMaterias = [
  { nome: "Matemática", nota1: 7, nota2: 7, nota3: 7, nota4: 7 },
  { nome: "Português", nota1: 7, nota2: 7, nota3: 7, nota4: 7 },
  { nome: "Ciências", nota1: 7, nota2: 7, nota3: 7, nota4: 7 },
];
let listaAlunos = [];
let medias = [];
let mediaMaterias = [];

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

window.addEventListener("load", (event) => {
  if (window.location.pathname == "/home.html") {
    const materiasJSON = JSON.stringify(listaMaterias);
    localStorage.setItem("materiasAluno", materiasJSON);

    carregarDadosAluno();
    carregarMateriasAluno();
    calcularMediaGeral(mediaMaterias);
    carregarListaAlunos();

    let maiorMedia = encontrarMaiorNumero(mediaMaterias);
    document.querySelector("#maiorMedia").innerHTML = maiorMedia;
  }
});

function carregarDadosAluno() {
  const alunoJSON = localStorage.getItem("dadosAluno");

  if (alunoJSON) {
    const aluno = JSON.parse(alunoJSON);

    nome.innerText = aluno.nome;
    idade.innerText = aluno.idade;
    serie.innerText = aluno.serie;
    escola.innerText = aluno.escola;
    materia.innerText = aluno.materia;
  }
}

function carregarMateriasAluno() {
  const materiasJSON = localStorage.getItem("materiasAluno");

  if (materiasJSON) {
    const materias = JSON.parse(materiasJSON);

    materias.forEach((materia) => {
      let media = calcularMedia(
        materia.nota1,
        materia.nota2,
        materia.nota3,
        materia.nota4
      );
      mediaMaterias.push(media);
      adicionarLinhaMateria(materia, media);
    });
  }
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

function calcularMedia(n1, n2, n3, n4) {
  return (n1 + n2 + n3 + n4) / 4;
}

function calcularMediaGeral(medias) {
  let soma = 0;
  medias.forEach((item) => {
    soma += item;
  });

  document.querySelector("#mediaGeral").innerText = soma / medias.length;
}

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
  let novaMateria = {
    nome: "",
    nota1: 0,
    nota2: 0,
    nota3: 0,
    nota4: 0,
  };

  novaMateria.nome = window.prompt("Qual o nome da matéria?");
  novaMateria.nota1 = parseFloat(window.prompt("Informe a nota1:"));
  novaMateria.nota2 = parseFloat(window.prompt("Informe a nota2:"));
  novaMateria.nota3 = parseFloat(window.prompt("Informe a nota3:"));
  novaMateria.nota4 = parseFloat(window.prompt("Informe a nota4:"));

  listaMaterias.push(novaMateria);

  let media = calcularMedia(
    novaMateria.nota1,
    novaMateria.nota2,
    novaMateria.nota3,
    novaMateria.nota4
  );
  mediaMaterias.push(media);
  adicionarLinhaMateria(novaMateria, media);

  calcularMediaGeral(mediaMaterias);

  let maiorMedia = encontrarMaiorNumero(mediaMaterias);
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
      <td>${dadosMateria.nome}</td>
      <td>${dadosMateria.nota1}</td>
      <td>${dadosMateria.nota2}</td>
      <td>${dadosMateria.nota3}</td>
      <td>${dadosMateria.nota4}</td>
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

async function carregarListaAlunos() {
  try {
    const response = await fetch("alunos.json");
    const alunos = await response.json();
    const listaAlunos = document.querySelector(".alunos ul");

    alunos.forEach((aluno) => {
      listaAlunos.innerHTML += `
          <li>${aluno.nome}</li>
        `;
    });
  } catch (error) {
    alert(error);
  }
}
