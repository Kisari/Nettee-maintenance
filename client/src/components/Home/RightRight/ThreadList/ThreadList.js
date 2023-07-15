import React from 'react'
import SingleThread from './SingleThread/SingleThread'
import { Grid } from '@mui/material'
import { useSelector } from "react-redux";
// import { getAllThread } from '../../../../actions/thread';

const ThreadList = () => {
    const thread = useSelector((state) => state.threadReducer.data.threadData);
    const allUser = useSelector((state) => state.userReducer?.allUserData);

    return (
        <>
            <Grid container maxWidth>
                {thread?.map((singleThread) => {
                    allUser.map((user) => {
                        if (user._id === singleThread.userID) {
                            singleThread.userData = user;
                        }
                        return user
                    })
                    return (
                        <Grid item key={singleThread._id} xs={12} paddingBottom={1}>
                            <SingleThread data={singleThread} />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default ThreadList