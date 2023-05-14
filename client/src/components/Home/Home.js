import React from 'react'
import RightSide from './RightRight/RightSide'
import { Grid } from '@mui/material'
import SideBar from './LeftSide/SideBar'
import Challenge from '../Challenge/Challenge'
import QuizPage from '../Challenge/QuizPage'

const Home = () => {
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={1} sm={2} md={3}>
                    <SideBar></SideBar>
                </Grid>
                <Grid item xs={11} sm={10} md={9}>
                    <RightSide></RightSide>
                    {/* <QuizPage /> */}
                </Grid>
            </Grid>
        </ React.Fragment>
    )
}

export default Home
