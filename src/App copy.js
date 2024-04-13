import React, { useState } from 'react';
import { Container, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

function App() {
  const questions = [
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
];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [scores, setScores] = useState(0);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestion].correct){
      setScores(scores + 1);
    }
    const nextAnswers = [...answers, { question: questions[currentQuestion].question, selectedAnswer, correctAnswer: questions[currentQuestion].correct }];
    setAnswers(nextAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setScores(0);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer('');
    setShowResults(false);
  };

  return (
    <Container maxWidth="sm" style={{padding: "0 0 0 0"}}>
      <Card>
        <CardContent>
          {showResults ? (
            <div>
              <Typography variant="h5">Quiz Results</Typography>
              <ol>
                {answers.map((answer, index) => (
                  <li key={index}>
                    <Typography>
                      {answer.question} - Your Answer: {answer.selectedAnswer} ({answer.selectedAnswer === answer.correctAnswer ? "Correct 💚" : "Incorrect 💔"})
                    </Typography>
                  </li>
                ))}
              </ol>
              <Typography>
                Scores: {scores}/12 
              </Typography>
              <Button variant="contained" color="primary" onClick={handleRetry}>
                Retry
              </Button>
            </div>
          ) : (
            <div>
              <Typography variant="h5">{questions[currentQuestion].question}</Typography>
              <FormControl component="fieldset">
                <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
                  {Object.entries(questions[currentQuestion].answers).map(([key, value]) => (
                    <FormControlLabel value={key} control={<Radio />} label={value} key={key} />
                  ))}
                </RadioGroup>
              </FormControl>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
