import ChatsPage from "./ChatsPage";
import React from 'react'
import { Grid } from '@mui/material'
import SideBar from '../components/Home/LeftSide/SideBar'

const ChatRender = () => {
    return (
        <>
            <Grid container>
                <Grid item xs={1} sm={2} md={1} >
                    <SideBar></SideBar>
                </Grid>
                <Grid item xs={11} sm={10} md={11} paddingLeft={8}>
                    <ChatsPage />
                </Grid>
            </Grid>
        </>
    )
}

export default ChatRender


