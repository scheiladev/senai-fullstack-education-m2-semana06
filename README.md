# SENAI Fullstack [Education]

## Resolução dos exercícios da Semana 06 - Módulo 02

### M2S06 | Parte 3 do LabScore - Roteiro

Chegamos a última semana do mini projeto que deu início na semana 03 e 05 do módulo 02. Nesta semana, iremos tentar simular a troca de informações que o front-end tem com o back-end, além de fazer conexões com API’s e localstorage. Tenha em mente que, para essa semana ser finalizada, talvez seja necessário fazer modificações no projeto.

Desejo uma boa semana a todos ^-^.

### M2S06 | Ex 1 - LabScore (Pt.3)

Crie uma tela de cadastro com os seguintes campos:

- nome;
- idade;
- série;
- escola;
- matéria favorita;
- endereço (com cep, rua, cidade, estado).

Neste último campo, apenas deixe habilitado o campo de cep.

### M2S06 | Ex 2 - LabScore (Pt.3)

Ao digitar o CEP, utilize a requisição **fetch** para se comunicar com a api do viacep ([https://viacep.com.br/](https://viacep.com.br/ "smartCard-inline") ) e, com isso, preencher os demais campos.

### M2S06 | Ex 3 - LabScore (Pt.3)

Para essa etapa, salve os dados passados na tela de cadastro no **localstorage** em formato de objeto e, após salvar, redirecione para a tela de home do aluno, a que já existe no projeto.

### M2S06 | Ex 4 - LabScore (Pt.3)

Agora é a vez dos dados serem capturados em tela, através do prompt, para depois substituir no html. Assim que carregar a tela de home do aluno, capture as informações do aluno salvo no localstorage.

### M2S06 | Ex 5 - LabScore (Pt.3)

Para a sessão de notas das matérias, siga o passo a passo abaixo; a intenção é já iniciar a tela com dados na tabela de “notas das matérias “e, ao mesmo tempo, conforme vai adicionando as matérias, ele adicionar também no array do localstorage.

Passo a passo:

- Crie um array com alguns itens, esse array será um array de objetos com o seguinte formato:

```json
{
  "nome": "",
  "nota1": 0,
  "nota2": 0,
  "nota3": 0,
  "nota4": 0
}
```

- Salve esse array no localstorage.
- Adicione os itens na estrutura html.

### M2S06 | Ex 6 - LabScore (Pt.3)

Faça alterações no código já criado, para que toda vez que for adicionada mais uma linha na seção "notas das matérias", ele atualize a média geral do aluno; para isso, capture o array de matérias no localstorage e calcule a média geral. Após o cálculo, atualize em tela toda vez que adicionar mais uma linha.

### M2S06 | Ex 7 - LabScore (Pt.3)

Para esse exercício, iremos fazer algo semelhante com o exercício anterior, porém, o que será atualizado é a seção de "maior média entre as matérias". Capture o array de matérias do localstorage e verifique qual é a maior média entre eles.

### M2S06 | Ex 8 - LabScore (Pt.3)

Para finalizar, utilizando json-server, crie um arquivo json chamado alunos.json; nele, terá um array de objetos com os nomes e séries dos alunos. Exemplo:

```json
[
  {
    nome: ""
    serie: ""
  },
  {
    nome: ""
    serie: ""
  }
]
```

Com a requisição fetch, capture esse array e, assim que carregar a tela, liste na seção "lista de alunos" apenas os nomes dos alunos.
