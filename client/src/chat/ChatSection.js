import React from 'react'
import { Grid } from '@mui/material'
import SideBar from '../components/Home/LeftSide/SideBar'
import ChatBox from './ChatBox/ChatBox'

const ChatSection = () => {
    return (
        <>
            <Grid container>
                <Grid item xs={2} sm={2} md={3} >
                    <SideBar></SideBar>
                </Grid>
                <Grid item xs={10} sm={10} md={9} >
                    <ChatBox></ChatBox>
                </Grid>
            </Grid>
        </>
    )
}

export default ChatSection


