import { Container, CssBaseline, Box, Grid } from "@mui/material";
import Quiz from "./Quiz"
import { useState } from "react";
import questions from "./QuestionData";
import QuizResult from "./QuizResult";

export default function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const finishedQuiz = currentQuestionIndex === questions.length;
    const currentQuestion = questions[currentQuestionIndex];

    const goToNext = () => {
        setCurrentQuestionIndex((prevState) => prevState + 1);
    }

    const submitAnswer = (value) => {
        setAnswers((prevState) => [...prevState, value]);
        goToNext();
    }

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers([])
    }


    return (
        <Grid>
            <CssBaseline />
            <Box>
                <Container fixed>
                    {finishedQuiz ? <QuizResult restartQuiz={restartQuiz} answers={answers} /> :
                        <Quiz question={currentQuestion}
                            questionNumber={currentQuestionIndex + 1}
                            submitAnswer={submitAnswer}
                        />}
                </Container>
            </Box>
        </Grid>
    )
}