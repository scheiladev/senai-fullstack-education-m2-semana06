/* LabScore pt.1 - Exercício 1 */
let listaNotas = [8, 10, 7, 5];

function calculaMedia(notas) {
  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    soma += notas[i];
  }
  let media = soma / notas.length;
  return media;
}

let mediaNotas = calculaMedia(listaNotas);

/* LabScore pt.1 - Exercício 2 */
function resultadoFinal(media) {
  return media >= 7
    ? `<p>Média: <strong>${media}</strong>.<br> Parabéns, você passou na média!</p>`
    : `<p>Média: <strong>${media}</strong>.<br> Infelizmente você está de recuperação.</p>`;
}

/* LabScore pt.1 - Exercício 3 */
let listaAlunos = ["Pedro", "Maria", "João", "Paula"];

function imprimirNomes(nomes) {
  return nomes.forEach((aluno) => {
    document.write(`${aluno}<br>`);
  });
}

/* LabScore pt.1 - Exercício 4 */
function tabuada(numero) {
  for (let i = 0; i <= 10; i++) {
    let resultado = numero * i;
    document.write(`${numero} x ${i} = ${resultado}<br>`);
  }
}

/* LabScore pt.1 - Exercício 5 */
function entrevistaAluno() {
  let nome = window.prompt("Qual o nome do aluno?");
  let idade = window.prompt("Qual a idade do aluno?");
  let serie = window.prompt("Qual a série do aluno?");
  let escola = window.prompt("Qual o nome da escola?");
  let materia = window.prompt("Qual a sua matéria favorita?");

  let dadosAluno = `Você confirma os dados inseridos?
    Nome do aluno: ${nome}
    Idade do aluno: ${idade}
    Série do aluno: ${serie}
    Nome da escola: ${escola}
    Matéria favorita: ${materia}`;

  let confirmacao = window.confirm(dadosAluno);

  if (confirmacao) {
    document.getElementById("nome").innerText = nome;
    document.getElementById("idade").innerText = idade;
    document.getElementById("serie").innerText = serie;
    document.getElementById("escola").innerText = escola;
    document.getElementById("materia").innerText = materia;
  } else {
    return window.alert("Os dados não foram confirmados.");
  }
}

/* LabScore pt.1 - Exercício 6 */
let medias = [];

function notasMateria() {
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

  let media = calculaMedia(dadosMateria.notas);
  medias.push(media);

  adicionaMateria(dadosMateria, media);

  let mediaGeral = calculaMedia(medias);
  document.querySelector("#mediaGeral").innerText = mediaGeral;

  let maiorMedia = encontrarMaiorNumero(medias);
  document.querySelector("#maiorMedia").innerHTML = maiorMedia;
}

/* LabScore pt.1 - Exercício 7 */
function encontrarMaiorNumero(numeros) {
  let maiorNumero = numeros[0];

  for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > maiorNumero) {
      maiorNumero = numeros[i];
    }
  }

  return maiorNumero;
}

/* LabScore pt.2 - Exercício 4 */
let botaoMaterias = document.querySelector("#bt-notas");
botaoMaterias.addEventListener("click", notasMateria);

function adicionaMateria(dadosMateria, media) {
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

entrevistaAluno();
