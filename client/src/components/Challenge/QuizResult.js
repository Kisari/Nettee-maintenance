import React, { useEffect } from 'react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { updateUser } from '../../actions/user'

import { Grid, Typography, CardContent, Card, CardActions, Button } from '@mui/material'
import questions from './QuestionData'
import Laptop from './image/laptop.png'
import Info from './image/info.png'

export default function QuizResult(props) {
    const { answers, restartQuiz } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("NETTEE_TOKEN"));
    let correctAnswers = useMemo(() => {
        return questions.filter((q, i) => {
            return q.correctAnswer === parseInt(answers[i]);
        }).length;
    }, [answers])
    useEffect(() => {
        if (correctAnswers > 5 && !currentUser.data.user.badges.includes('Java Beginner')) {
            const newBadge = {
                badges: ['Java Beginner']
            }
            dispatch(updateUser(currentUser.data.user._id, newBadge))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correctAnswers])

    return (
        <Grid maxWidth='xs'>
            <Grid item>
                <Card variant='outlined' sx={{ pb: 3 }}>
                    <CardContent>
                        <Grid container justifyContent="center">
                            <Grid item paddingLeft={16} xs={10}>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mb: 3
                                    }}
                                    variant='h4'
                                >
                                    Java Beginner
                                </Typography>
                            </Grid>
                            <Grid >

                                {((correctAnswers) <= 5) ? (
                                    <img src={Info} alt='info' />
                                ) : (
                                    <img src={Laptop} alt='laptop' />
                                )}
                            </Grid>
                        </Grid>
                        <Typography
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: 3,
                                textDecoration: 'underline'
                            }}
                            variant='h4' color="gray"
                        >
                            Result
                        </Typography>
                        <Typography
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: 3
                            }}
                            variant='h4' color="gray"
                        >
                            {correctAnswers} / {questions.length}
                        </Typography>
                        <Typography
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            {((correctAnswers) <= 5) ? (
                                <Typography variant='h5' component={'span'}>
                                    You must get over 50% to get the badge!
                                </Typography>
                            ) : (
                                <Typography variant='h5' component={'span'}>
                                    Congratulations! You have receive the Java Beginner badge.
                                </Typography>
                            )}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="outlined">
                            {((correctAnswers) <= 5) ? (
                                <Card onClick={restartQuiz} variant="contained" >
                                    <Typography variant='h5'>
                                        Retry !
                                    </Typography>
                                </Card>
                            ) : (
                                <>
                                    <Card variant="contained" onClick={() => navigate("/home")} >
                                        <Typography variant='h5'>
                                            Home
                                        </Typography>
                                    </Card>
                                </>
                            )}
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}
