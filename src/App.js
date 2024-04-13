import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Container, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, Select, MenuItem } from '@mui/material';

function shuffleArray(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
} 

const quizData = {
  'legenda-o-sw-aleksym':[
    {
      "question": "Kto był rodzicami św. Aleksyja?",
      "answers": { "a": "Eufamijan i Aglijas", "b": "Benedykt i Scholastyka", "c": "Konstantyn i Helena" },
      "correct": "a"
  },
  {
      "question": "Co zrobił Aleksyj w noc poślubną?",
      "answers": { "a": "Uciekł z pałacu", "b": "Zwrócił pierścień żonie", "c": "Założył klasztor" },
      "correct": "b"
  },
  {
      "question": "Gdzie Aleksyj rozdał swój majątek?",
      "answers": { "a": "W Rzymie", "b": "W Jerozolimie", "c": "W Laodycei" },
      "correct": "c"
  },
  {
      "question": "Kto pomógł Aleksyjowi schronić się w świątyni?",
      "answers": { "a": "Biskup Laodycei", "b": "Matka Boska", "c": "Jego ojciec Eufamijan" },
      "correct": "b"
  },
  {
      "question": "Jak długo Aleksyj żył nierozpoznany w Rzymie?",
      "answers": { "a": "5 lat", "b": "16 lat", "c": "25 lat" },
      "correct": "b"
  },
  {
      "question": "Co stało się po śmierci Aleksyja?",
      "answers": { "a": "Zatrzymał się czas", "b": "Zabrzmiały dzwony", "c": "Zgasły świece w kościele" },
      "correct": "b"
  },
  {
      "question": "Co dziecko zrobiło po śmierci Aleksyja?",
      "answers": { "a": "Płakało", "b": "Śpiewało", "c": "Wskazało miejsce jego śmierci" },
      "correct": "c"
  },
  {
      "question": "Jaki cud zdarzył się przy ciele Aleksyja?",
      "answers": { "a": "Ciało unosiło się w powietrzu", "b": "Wydzielał się uzdrawiający zapach", "c": "Zniknęło" },
      "correct": "b"
  },
  {
      "question": "Kto jako jedyny mógł wyjąć list z ręki Aleksyja?",
      "answers": { "a": "Jego żona Famijana", "b": "Jego matka Aglijas", "c": "Jego ojciec Eufamijan" },
      "correct": "a"
  },
  {
      "question": "Co rodzice Aleksyja zrobili po przeczytaniu jego listu?",
      "answers": { "a": "Zrozumieli i zaakceptowali jego świętość", "b": "Odprawili mszę", "c": "Opuścili Rzym" },
      "correct": "a"
  },
  {
      "question": "Gdzie Aleksyj spędził ostatnie lata swojego życia?",
      "answers": { "a": "W klasztorze", "b": "Pod domem swojego ojca", "c": "W Laodycei" },
      "correct": "b"
  },
  {
      "question": "Jak Aleksyj traktował swoje bogactwo po poświęceniu się religii?",
      "answers": { "a": "Inwestował w kościoły", "b": "Zachował dla siebie", "c": "Rozdał potrzebującym" },
      "correct": "c"
  }
  ]
  ,
  'kwiatki-sw-franciszka-z-asyzu':[
    {
        "question": "Do kogo św. Franciszek przemawiał w 'Kazaniu do ptaków'?",
        "answers": { "a": "Do ludzi", "b": "Do ptaków", "c": "Do kwiatów" },
        "correct": "b"
    },
    {
        "question": "Jakie uczucie wywołało kazanie św. Franciszka w ptakach?",
        "answers": { "a": "Strach", "b": "Radość", "c": "Obojętność" },
        "correct": "b"
    },
    {
        "question": "Co św. Franciszek powiedział ptakom, że powinni czynić?",
        "answers": { "a": "Uciekać od ludzi", "b": "Szukać pożywienia", "c": "Być wdzięcznymi Bogu" },
        "correct": "c"
    },
    {
        "question": "Co św. Franciszek zrobił dla turkawek po ich oswobodzeniu od młodzieńca?",
        "answers": { "a": "Zbudował im gniazda", "b": "Nauczył je śpiewać", "c": "Pozwolił odlecieć" },
        "correct": "a"
    },
    {
        "question": "Jaki był los młodzieńca niosącego turkawki po spotkaniu ze św. Franciszkiem?",
        "answers": { "a": "Uciekł", "b": "Został zakonnikiem", "c": "Został nauczycielem" },
        "correct": "b"
    },
    {
        "question": "Jakie jest główne przesłanie 'Kazania do ptaków'?",
        "answers": { "a": "Ochrona przyrody", "b": "Wdzięczność za życie", "c": "Pokój na świecie" },
        "correct": "b"
    },
    {
        "question": "Jaką postawę św. Franciszek promuje w swoich kazań?",
        "answers": { "a": "Aktywność misyjną", "b": "Życie w ubóstwie", "c": "Życie w izolacji" },
        "correct": "b"
    },
    {
        "question": "Czego symbolem jest zachowanie ptaków po kazaniu św. Franciszka?",
        "answers": { "a": "Bożej obecności", "b": "Przyrody w harmonii", "c": "Wdzięczności wobec stworzenia" },
        "correct": "c"
    },
    {
        "question": "Jakie działanie św. Franciszka wobec turkawek demonstruje jego podejście do natury?",
        "answers": { "a": "Respekt dla wolności", "b": "Chęć dominacji", "c": "Nauka dyscypliny" },
        "correct": "a"
    },
    {
        "question": "Co jest kluczowym elementem w przesłaniu św. Franciszka do ptaków?",
        "answers": { "a": "Modlitwa", "b": "Wdzięczność", "c": "Praca" },
        "correct": "b"
    },
    {
        "question": "Jakie zmiany nastąpiły w życiu młodzieńca po interakcji ze św. Franciszkiem?",
        "answers": { "a": "Zmienił zawód", "b": "Został mnichem", "c": "Zaczął nowe hobby" },
        "correct": "b"
    },
    {
        "question": "Co symbolizuje oswobodzenie turkawek przez św. Franciszka?",
        "answers": { "a": "Miłość do zwierząt", "b": "Miłość do Boga", "c": "Znaczenie wolności" },
        "correct": "c"
    }
]
  ,
  'rozmowa-mistrza-polikarpa-ze-smiercia':[
    {
        "question": "Do kogo narrator 'Rozmowy mistrza Polikarpa ze Śmiercią' zwraca się w prologu?",
        "answers": { "a": "Do Śmierci", "b": "Do Boga", "c": "Do Mistrza Polikarpa" },
        "correct": "b"
    },
    {
        "question": "Jakiego błogosławieństwa szuka Mistrz Polikarp u Boga na początku utworu?",
        "answers": { "a": "Zobaczyć Śmierć", "b": "Uniknąć Śmierci", "c": "Zrozumieć życie po śmierci" },
        "correct": "a"
    },
    {
        "question": "W jakiej formie pojawia się Śmierć przed Mistrzem Polikarpem?",
        "answers": { "a": "Jako stary mężczyzna", "b": "Jako rozkładająca się kobieta", "c": "Jako dziecko" },
        "correct": "b"
    },
    {
        "question": "Co Mistrz Polikarp robi, gdy pojawia się przed nim Śmierć?",
        "answers": { "a": "Zaczyna uciekać", "b": "Pada na kolana", "c": "Wzywa pomoc" },
        "correct": "b"
    },
    {
        "question": "Jakie wyjaśnienie daje Śmierć na pytanie skąd się wzięła?",
        "answers": { "a": "Była w jabłku, które zerwała Ewa", "b": "Powstała z pragnienia ludzi", "c": "Została stworzona przez demony" },
        "correct": "a"
    },
    {
        "question": "Jaki motyw jest przewodni w rozmowie Mistrza Polikarpa ze Śmiercią?",
        "answers": { "a": "Memento mori", "b": "Carpe diem", "c": "Amor fati" },
        "correct": "a"
    },
    {
        "question": "Co przypomina Śmierć o swojej mocy?",
        "answers": { "a": "Że jest ograniczona", "b": "Że została jej dana przez Boga", "c": "Że jest nieograniczona" },
        "correct": "b"
    },
    {
        "question": "Kto podlega mocy Śmierci według utworu?",
        "answers": { "a": "Tylko biedni i chorzy", "b": "Tylko bogaci i wpływowi", "c": "Wszyscy ludzie" },
        "correct": "c"
    },
    {
        "question": "Jaki motyw literacki jest obecny w tekście oprócz memento mori?",
        "answers": { "a": "Danse macabre", "b": "Tabula rasa", "c": "Deus ex machina" },
        "correct": "a"
    },
    {
        "question": "Co Śmierć robi w tekście, mówiąc o różnych grupach społecznych?",
        "answers": { "a": "Chwali ich za dobre życie", "b": "Wytknięto ich wady", "c": "Obiecuje im długie życie" },
        "correct": "b"
    },
    {
        "question": "Jaki jest cel utworu 'Rozmowa mistrza Polikarpa ze Śmiercią' według prologu?",
        "answers": { "a": "Chwalić Boga i pouczać ludzi o poprawnym życiu", "b": "Rozrywka i humor", "c": "Nauczać o historii świata" },
        "correct": "a"
    },
    {
        "question": "Czego Mistrz Polikarp prosi Śmierć?",
        "answers": { "a": "O więcej czasu na życie", "b": "O litość", "c": "O bogactwo i władzę" },
        "correct": "b"
    }
]
  ,
  'piesn-o-rolandzie':[
    {
        "question": "Kim jest Roland w 'Pieśni o Rolandzie'?",
        "answers": { "a": "Królem Franków", "b": "Siostrzeńcem Karola Wielkiego", "c": "Przyjacielem Oliwiera" },
        "correct": "b"
    },
    {
        "question": "Za co słynie Karol Wielki w epopei?",
        "answers": { "a": "Za swoje okrucieństwo", "b": "Za swoją mądrość i męstwo", "c": "Za swoje zdolności dyplomatyczne" },
        "correct": "b"
    },
    {
        "question": "Jaką cechą charakteru wyróżnia się Oliwier?",
        "answers": { "a": "Rozsądek", "b": "Okrucieństwo", "c": "Sklonność do zdrady" },
        "correct": "a"
    },
    {
        "question": "Kto jest zdrajcą w 'Pieśni o Rolandzie'?",
        "answers": { "a": "Karol Wielki", "b": "Roland", "c": "Ganelon" },
        "correct": "c"
    },
    {
        "question": "Jak umiera Marsyl?",
        "answers": { "a": "Z rąk Rolanda", "b": "Od ran odniesionych w bitwie", "c": "Z żalu po zniszczeniu Saragossy" },
        "correct": "c"
    },
    {
        "question": "Z kim walczy Emir Baligant?",
        "answers": { "a": "Z Oliwierem", "b": "Z Rolandem", "c": "Z Ka  rolem Wielkim" },
        "correct": "c"
    },
    {
        "question": "Gdzie dochodzi do śmierci Rolanda?",
        "answers": { "a": "W pałacu", "b": "W Roncevaux", "c": "Na polu bitwy w Paryżu" },
        "correct": "b"
    },
    {
        "question": "Który element jest symbolem średniowiecznego władcy w postaci Karola Wielkiego?",
        "answers": { "a": "Jego korona", "b": "Jego miecz", "c": "Jego sprawiedliwość i męstwo" },
        "correct": "c"
    },
    {
        "question": "Jaka jest główna cecha charakteru Rolanda?",
        "answers": { "a": "Ambitność", "b": "Zdrada", "c": "Tchórzostwo" },
        "correct": "a"
    },
    {
        "question": "Kto pomaga Karolowi w walce z Emirem Baligantem?",
        "answers": { "a": "Archanioł Gabriel", "b": "Archanioł Michał", "c": "Bóg" },
        "correct": "a"
    },
    {
        "question": "Jaki los spotkał Ganelona?",
        "answers": { "a": "Został stracony", "b": "Został królem", "c": "Wyjechał na wygnanie" },
        "correct": "a"
    },
    {
        "question": "Jak kończy się 'Pieśń o Rolandzie'?",
        "answers": { "a": "Zwycięstwem Franków", "b": "Porażką Franków", "c": "Pokojowym traktatem" },
        "correct": "a"
    }
]
  ,
  'kronika-polska-gall-anonim':[
    {
        "question": "O kim opowiada pierwsza księga 'Kroniki polskiej' Galla Anonima?",
        "answers": { "a": "O Mieszku I", "b": "O Popielu", "c": "Obu odpowiedziach jest poprawna" },
        "correct": "c"
    },
    {
        "question": "Co jest jedną z cech idealnego władcy według Galla Anonima?",
        "answers": { "a": "Ostrożność", "b": "Pobożność", "c": "Lenistwo" },
        "correct": "b"
    },
    {
        "question": "Kogo dzieje przedstawia druga księga 'Kroniki polskiej'?",
        "answers": { "a": "Władysława Hermana i Bolesława Krzywoustego", "b": "Kazimierza Wielkiego", "c": "Jana III Sobieskiego" },
        "correct": "a"
    },
    {
        "question": "Jakie cechy przypisywane są Bolesławowi Krzywoustemu w 'Kronice polskiej'?",
        "answers": { "a": "Odwaga i szlachetność", "b": "Mądrość i cierpliwość", "c": "Zdrada i okrucieństwo" },
        "correct": "a"
    },
    {
        "question": "Co opisuje trzecia księga 'Kroniki polskiej'?",
        "answers": { "a": "Dzieje Mieszka II", "b": "Pierwsze lata panowania Bolesława Krzywoustego", "c": "Ostatnie dni Bolesława Chrobrego" },
        "correct": "b"
    },
    {
        "question": "Jaki władca zjednoczył mieszkańców i powiększał granice kraju?",
        "answers": { "a": "Bolesław Chrobry", "b": "Mieszko I", "c": "Bolesław Krzywousty" },
        "correct": "a"
    },
    {
        "question": "O jakim chrzcie opowiada 'Kronika polska'?",
        "answers": { "a": "Chrzest Polski", "b": "Chrzest Litwy", "c": "Chrzest Rusi" },
        "correct": "a"
    },
    {
        "question": "Kto jest autorem 'Kroniki polskiej'?",
        "answers": { "a": "Jan Długosz", "b": "Gall Anonim", "c": "Wincenty Kadłubek" },
        "correct": "b"
    },
    {
        "question": "Jaka postać historyczna jest znana z młodzieńczych czynów opisanych w 'Kronice polskiej'?",
        "answers": { "a": "Kazimierz Wielki", "b": "Bolesław Krzywousty", "c": "Mieszko II" },
        "correct": "b"
    },
    {
        "question": "Jakie sukcesy Bolesława Krzywoustego przedstawia trzecia księga?",
        "answers": { "a": "Sukcesy dyplomatyczne", "b": "Sukcesy militarne i polityczne", "c": "Sukcesy gospodarcze" },
        "correct": "b"
    },
    {
        "question": "Co jest głównym tematem 'Kroniki polskiej'?",
        "answers": { "a": "Historia Polski od początków do śmierci Bolesława Krzywoustego", "b": "Bitwy z czasów średniowiecza", "c": "Dzieje dynastii Piastów" },
        "correct": "c"
    },
    {
        "question": "Kto jest symbolem średniowiecznego władcy w 'Kronice polskiej'?",
        "answers": { "a": "Mieszko I", "b": "Bolesław Chrobry", "c": "Karol Wielki" },
        "correct": "b"
    }
]
  ,
  'boska-komedia-dante-alighieri':[
    {
        "question": "Kto jest przewodnikiem narratora przez pierwsze dwie krainy zaświatów w 'Boskiej Komedii'?",
        "answers": { "a": "Beatrycze", "b": "Wergiliusz", "c": "Charon" },
        "correct": "b"
    },
    {
        "question": "Jakie jest przesłanie napisane na wejściu do piekła w 'Boskiej Komedii'?",
        "answers": { "a": "Porzućcie wszelką nadzieję wy, którzy tu wchodzicie", "b": "Witajcie w krainie cienia", "c": "Nie ma tu miejsca dla świętych" },
        "correct": "a"
    },
    {
        "question": "Kto przewozi dusze zmarłych przez rzekę Acheront?",
        "answers": { "a": "Minos", "b": "Charon", "c": "Posejdon" },
        "correct": "b"
    },
    {
        "question": "Do której krainy zaświatów trafiają heretycy według 'Boskiej Komedii'?",
        "answers": { "a": "V krąg", "b": "VI krąg", "c": "IV krąg" },
        "correct": "b"
    },
    {
        "question": "Ilu największych zdrajców wymieniono w IX kręgu piekła?",
        "answers": { "a": "Trzech", "b": "Czterech", "c": "Dwóch" },
        "correct": "a"
    },
    {
        "question": "Co znajduje się na wierzchołku góry czyśćca?",
        "answers": { "a": "Raj ziemski", "b": "Piekło", "c": "Zamieszkały przez bogów Olimp" },
        "correct": "a"
    },
    {
        "question": "Kto wita narratora w raju ziemskim?",
        "answers": { "a": "Wergiliusz", "b": "Beatrycze", "c": "Dante" },
        "correct": "b"
    },
    {
        "question": "Ile niebios dzieli się raj niebiański?",
        "answers": { "a": "Siedem", "b": "Dziewięć", "c": "Dwanaście" },
        "correct": "b"
    },
    {
        "question": "Gdzie mieszka Bóg według 'Boskiej Komedii'?",
        "answers": { "a": "W Empireum", "b": "W raju ziemskim", "c": "Na Olimpie" },
        "correct": "a"
    },
    {
        "question": "Kto wysłał Wergiliusza do narratora w 'Boskiej Komedii'?",
        "answers": { "a": "Bóg", "b": "Beatrycze", "c": "Święty Piotr" },
        "correct": "b"
    },
    {
        "question": "Kto z następujących osób jest uważany za jednego z największych zdrajców w piekle?",
        "answers": { "a": "Neron", "b": "Cezar", "c": "Judas" },
        "correct": "c"
    },
    {
        "question": "Jaki krąg piekła jest przeznaczony dla skąpców?",
        "answers": { "a": "III krąg", "b": "IV krąg", "c": "V krąg" },
        "correct": "b"
    }
]


};

function App() {
  const [currentQuiz, setCurrentQuiz] = useState('legenda-o-sw-aleksym');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState(0);
  const [questions, setQuestions] = useState([]); // Zainicjalizuj jako pusta tablica
  
  // Ustaw początkowe pytania na podstawie pierwszego quizu
  useEffect( () => {
    setQuestions(setQuizData(currentQuiz));
  }, [currentQuiz]);

  const setQuizData = (quizKey) => {
    const quizQuestions = quizData[quizKey];
    return shuffleArray([...quizQuestions]).map(question => ({
      ...question,
      answers: shuffleAnswers(question.answers)
    }));
  };

  const shuffleAnswers = (answers) => {
    const answerKeys = Object.keys(answers);
    const shuffledKeys = shuffleArray(answerKeys);
    return shuffledKeys.reduce((acc, key) => {
      acc[key] = answers[key];
      return acc;
    }, {});
  };

  const handleQuizChange = (event) => {
    const newQuiz = event.target.value;
    setCurrentQuiz(newQuiz);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer('');
    setShowResults(false);
    setScores(0);
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (currentQuestion < questions.length) {
      const isCorrect = selectedAnswer === questions[currentQuestion].correct;
      if (isCorrect) {
        setScores(scores + 1);
      }
  
      const nextAnswers = [...answers, {
        question: questions[currentQuestion].question,
        selectedAnswer: `${selectedAnswer}: ${questions[currentQuestion].answers[selectedAnswer]}`,
        correctAnswer: `${questions[currentQuestion].correct}: ${questions[currentQuestion].answers[questions[currentQuestion].correct]}`,
      }];
  
      setAnswers(nextAnswers);
  
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
      } else {
        setShowResults(true);
      }
    }
  };

  const handleRetry = () => {
    setScores(0);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer('');
    setShowResults(false);
    setQuestions(setQuizData(currentQuiz)); // Przelosuj pytania ponownie
  };
  const renderQuizContent = () => {
    if (questions.length > 0 && currentQuestion < questions.length) {
      return (
        <div>
          <FormControl fullWidth>
            <Select
              value={currentQuiz}
              onChange={handleQuizChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              disabled={currentQuestion === 0 ? false : true}
            >
            <MenuItem value="legenda-o-sw-aleksym">legenda-o-sw-aleksym</MenuItem>
            <MenuItem value="kwiatki-sw-franciszka-z-asyzu">kwiatki-sw-franciszka-z-asyzu</MenuItem>
            <MenuItem value="rozmowa-mistrza-polikarpa-ze-smiercia">rozmowa-mistrza-polikarpa-ze-smiercia</MenuItem>
            <MenuItem value="piesn-o-rolandzie">piesn-o-rolandzie</MenuItem>
            <MenuItem value="kronika-polska-gall-anonim">kronika-polska-gall-anonim</MenuItem>
            <MenuItem value="boska-komedia-dante-alighieri">boska-komedia-dante-alighieri</MenuItem>
            {/* Добавьте другие квизы здесь */}
            </Select>
            </FormControl>
          <Typography variant="h5">{currentQuestion + 1}. {questions[currentQuestion].question}</Typography>
          <FormControl component="fieldset">
            <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
              {Object.entries(questions[currentQuestion].answers).map(([key, value]) => (
                <FormControlLabel value={key} control={<Radio />} label={value} key={key} />
              ))}
            </RadioGroup>
          </FormControl>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
            </Button>
          </Box>
        </div>
      );
    } else {
      return <Typography>Ładowanie pytań...</Typography>;
    }
  };
  return (
    <Container component="main" maxWidth={showResults ? "xl" : "sm"} sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      <Card>
        <CardContent>
        {showResults ? (
          <div>
            <Typography variant="h5">Wyniki quizu</Typography>
            <ol>
              {answers.map((answer, index) => (
                <li key={index}>
                  <Typography>
                    Pytanie: {answer.question}
                    <br />
                    Twoja odpowiedź: {answer.selectedAnswer}
                    <br />
                    Prawidłowa odpowiedź: {answer.correctAnswer}
                  </Typography>
                  {answer.selectedAnswer !== answer.correctAnswer ? (
                    <Typography color="error">Odpowiedź nieprawidłowa 💔</Typography>
                  ) : (
                    <Typography color="success">Odpowiedź prawidłowa 💚</Typography>
                  )}
                  <Typography>‎</Typography>
                </li>
              ))}
            </ol>
            <Typography>
              Wynik: {scores}/{questions.length}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleRetry}>
              Spróbuj ponownie
            </Button>
          </div>
        ) : (
          renderQuizContent())}
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;