(function() {
  var questions = [{
    question: "630kV hány lakóházat képes ellátni?",
    choices: [50, 300, 110, 15, 279],
    correctAnswer: 2
  }, {
    question: "Hány év után csökken a teljesítménye a napelemnek?",
    choices: [50, 25, 5, 10, 30],
    correctAnswer: 4
  }, {
    question: "Mekkora volt a teljesítménye régebbi napelemeknek?",
    choices: [250+'W', 150+'W', 500+'W', 134+'W', 1000+'W'],
    correctAnswer: 0
  }, {
    question: "Mekkora a modernebb napelemek teljesítménye? ",
    choices: [150+'W', 550+'W', 300+'W', 420+'W', 670+'W'],
    correctAnswer: 3
    },{
    question: "Hány százalékát tudjuk felhasználni a napelemek által termelt elektromosságból? ",
    choices: [10+'%', 50+'%', 100+'%', 18+'%', 42+'%'],
    correctAnswer: 3
  }, {
    question: "Mekkora frenkvenciája a szokványos áramhálózatnak?",
    choices: [150+'Hz', 15+'Hz', 80+'Hz', 30+'Hz', 50+'Hz'],
    correctAnswer: 4
  }
  , {
    question: "Mennyi a megengedett maximum teljesítménye a kisüzemű naperőműveknek?",
    choices: [50+'kV', 30+'kV', 40+'kV', 90+'kV', 100+'kV'],
    correctAnswer: 0
  },
   {
    question: "Milyen nehéz egy transzformátor házzal együtt? ",
    choices: [10+'-'+20+'t', 25+'-'+50+'t', 50+'-'+70+'t', 12+'-'+50+'t', 42+'-'+70+'t'],
    correctAnswer: 3
   },
    {
    question: "Hol van Magyarország legnagyobb naperőműve ? ",
    choices: ["Győr", "Budapest", "Békéscsaba", "Paks" , "Komló"],
    correctAnswer: 3
    },
          {
    question: "A transzformátor vasmagjában a mágnes fluxusnak milyen az iránya?",
    choices: ["Óramutató járásával megyegyező", "Óramutató járásával ellentétes", "Váltakozó"],
    correctAnswer: 2
    },
    ];
  
  var questionCounter = 0; //számolja a kérdéseket
  var selections = []; //A felhasználó válaszait tartalmazó tömb
  var quiz = $('#quiz'); //Kvízhez tartozó div
  
  // Jelen kérdés mutatása
  displayNext();
  
  // következő gomb functionje
  $('#next').on('click', function (e) {
    e.preventDefault()
    //eltünés közben felfüggeszti a functiont
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // ha nem választ a kérdéseknél
    if (isNaN(selections[questionCounter])) {
      alert('Kérlek jelölj meg egy választ az említettek közül!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // következő gomb functionje
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // előről button functionje
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // gombok animálása ha felé visszük
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  //generálja és eltárolja a kérdéseket és a 
  // válaszokat egy divbe
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Kérdés ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // rádió gombokkal jeleníti meg a válaszokat
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // be olvassa a felhasználó által megadott adatokat
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // következő elemet jeleníti meg
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Előző gombnak a megjelenését kezeli
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // pontokat számol és eredményt ad meg
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Neked ' + numCorrect + ' jó válaszod van' +
                questions.length + ' kérdésből!!!');
    return score;
   
  }
  
 
})();