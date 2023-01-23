const API_URL = "https://wpahzm6d6ufb764nzelq226dua0oiprt.lambda-url.us-west-2.on.aws"

const CARRER_URL = "https://digitalinnovationone.github.io/roadmaps/"

const questionState = {
  "questionsList":[
    {
      "question": "O design das coisas é algo importante para você ?",
      "order": 1
    },
    {
      "question": "Você se considera uma pessoa criativa ?",
      "order": 2
    },
    {
      "question": "Qual a importância da inferface de um software para você ?",
      "order": 3
    },
    {
      "question": "Qual a importância da rapidez de um software para você ?",
      "order": 4
    },
    {
      "question": "Você tem facilidade com raciocínio lógico?",
      "order": 5
    },
    {
      "question": "O quanto você gosta de matemática e estatística?",
      "order": 6
    },
    {
      "question": "Você considera a Inteligência Artificial uma área interessante?",
      "order": 7
    },
    {
      "question": "Você se interessa pelo desenvolvimento de aplicativos para celulares?",
      "order": 8
    },
    {
      "question": "Desenvolver soluções de segurança para internet é algo que te motiva?",
      "order": 9
    },
    {
      "question": "Desenvolver soluções de armazenamento em nuvem é algo que seria interessante para você?",
      "order": 10
    },
    {
      "question": "Trabalhar com a análise de grandes volumes de dados de forma inteligente é algo interessante para você?",
      "order": 11
    },
    {
      "question": "Analisar a qualidade das coisas é uma boa característica sua?",
      "order": 12
    },
    {
      "question": "Você trabalharia como desenvolvedor de soluções de internet para casas inteligentes, indústrias e carros autônomos?",
      "order": 13
    },
    {
      "question": "Você se considera um bom lider para agilizar os trabalhos em equipe?",
      "order": 14
    },
    {
      "question": "Você considera decisões gerenciais algo atrativo para trabalhar no dia-a-dia?",
      "order": 15
    }
  ]
}

const state = {
  "questionIndex": 0,
  "responses":"1"
}


function drawQuestion(){
  const quizz =  document.getElementById("question")
  const questions = questionState.questionsList

  let questionPicker = questions[state.questionIndex].question
  quizz.innerHTML = questionPicker
}

function drawCounter(){
  const counterDisplay = document.getElementById("counter")

  let actualIndex = state.questionIndex +1
  let maxItem = questionState.questionsList.length

  counterDisplay.innerHTML = `${actualIndex} / ${maxItem}`
}


function isCompleted(){
  if (
    state.questionIndex == 
    (questionState.questionsList.length -1)
    ){
      return true
    }
  else{
      return false
    }
}

function checkCarrer(carrerID){

  switch (carrerID) {
    case value:
      
      break;
  
    default:
      break;
  }
}

function calculateResults(){
  //send responses to api
  console.log(state.responses)
  const result = requestAPI(state.responses)

  //recover result
  let pageResult = "/carrers/frontend" 

  //change page
  window.location.href = `${CARRER_URL}${pageResult}`
}

function getCareerPath(careerId) {
  switch (careerId) {
    case 1:
      return '/carrers/backend';
    case 2:
      return '/carrers/frontend';
    case 3:
      return '/carrers/mobile';
    case 4:
      return '/carrers/infra-devops-security';
    case 5:
      return '/carrers/cloud';
    case 6:
      return '/carrers/data-analytics';
    case 7:
      return '/carrers/games';
    case 8:
      return '/carrers/qa';
    case 9:
      return '/carrers/web3-ia';
    case 10:
      return '/carrers/lideranca-softskills';
    case 11:
      return '/carrers/crm';
    default:
      return 'Invalid careerId';
  }
}



function bindButtons(){
  let buttons = [...document
    .getElementsByClassName("rating")
  ]
  
  state.responses = ""

  buttons.forEach(element => {
    element.addEventListener('click', ()=>{

      state.responses += element.innerHTML
      state.questionIndex += 1

      console.log(state.responses)

      if(isCompleted()){
        calculateResults()
      }

      drawQuestion()
      drawCounter()
    })
  });

  console.log("buttons started...")
}

async function requestAPI(answer){

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  let raw = JSON.stringify({
    "answers": answer
  });
  
  let requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
  };
  
  fetch(API_URL, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
}

function init(){
  bindButtons()
  drawQuestion()
  drawCounter()
}




init()