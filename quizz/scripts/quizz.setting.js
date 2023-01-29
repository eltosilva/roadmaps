(function () {

  const API_URL = "https://wpahzm6d6ufb764nzelq226dua0oiprt.lambda-url.us-west-2.on.aws"

  const CARRER_URL = "https://digitalinnovationone.github.io/roadmaps/"

  const questionState = {
    "questionsList": [
      {
        "question": "O design das coisas é algo importante para você?",
        "order": 1
      },
      {
        "question": "Você se considera uma pessoa criativa?",
        "order": 2
      },
      {
        "question": "Qual a importância da interface de um software para você?",
        "order": 3
      },
      {
        "question": "Qual a importância da rapidez de um software para você?",
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
        "question": "Você se considera um bom líder para agilizar os trabalhos em equipe?",
        "order": 14
      },
      {
        "question": "Você considera decisões gerenciais algo atrativo para trabalhar no dia-a-dia?",
        "order": 15
      },
      {
        "question": "Você considera a carreira de desenvolvimento de games a mais motivadora para a área de TI?",
        "order": 16
      }
    ]
  }

  const iteratorQuestions = questionState.questionsList[Symbol.iterator]()
  let iteratorResult

  const httpStatus = {
    OK: 200,
    BAD_REQUEST: 400
  }
  Object.freeze(httpStatus)

  const quizz = document.getElementById("question")
  function renderQuestion() {
    quizz.innerText = iteratorResult.value.question
  }

  const counterDisplay = document.getElementById("counter")
  function renderCounter() {

    let actualIndex = iteratorResult.value.order
    let maxItem = questionState.questionsList.length

    counterDisplay.innerText = `${actualIndex} / ${maxItem}`
  }

  async function redirectToCarrer(responses) {

    //let resultJSON = await requestAPI("4553212311221211")
    /**@type {Response} */
    let resultJSON = await requestAPI(responses)
    console.log(resultJSON)

    switch (resultJSON.status) {
      case httpStatus.OK:
        const carrerPath = await getCareerPath(resultJSON.carrer.id)
        window.location.replace(`${CARRER_URL}${carrerPath}`)
        break
      case httpStatus.BAD_REQUEST:
        alert(resultJSON.message)
        window.location.reload(true)
        break
      default:
        console.log(`Status Code ${resultJSON.status} não tratado`)
    }

  }

  async function requestAPI(answers) {

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ answers }),
      redirect: 'follow'
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      return response.json();
    } catch (error) {
      console.error(error)
    }

  }

  async function getCareerPath(careerId) {
    const CARRERS = {
      1: 'backend',
      2: 'frontend',
      3: 'mobile',
      4: 'infra-devops-security',
      5: 'cloud',
      6: 'data-analytics',
      7: 'games',
      8: 'qa',
      9: 'web3-ia',
      10: 'lideranca-softskills',
      11: 'crm'
    }

    return `carrers/${CARRERS[careerId]}`
  }


  function bindButtons() {
    let buttons = [...document.getElementsByClassName("rating")]

    let responses = ""

    buttons.forEach(element => {
      element.addEventListener('click', function () {

        responses += this.innerText
        console.log(responses)

        iteratorResult = iteratorQuestions.next()
        if (iteratorResult.done) {
          redirectToCarrer(responses)
          return
        }

        renderQuestion()
        renderCounter()
      })
    });

    console.log("buttons started...")
  }

  function init() {
    bindButtons()
    iteratorResult = iteratorQuestions.next()
    renderQuestion()
    renderCounter()
  }

  init()
})()
