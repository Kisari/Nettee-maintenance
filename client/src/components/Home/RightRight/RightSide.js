import React, { useState } from 'react'
import { Button, Container, Grid, Link } from '@mui/material'
import useStyle from './style.js'
import ThreadList from './ThreadList/ThreadList.js'
import Filter from '../LeftSide/Filter.js'
import CreateThreadForm from '../../Form/CreateThreadForm.js'
import Profile from '../../profile/Profile.js'

const RightSide = () => {
    const myStyle = useStyle();
    const [open, setOpen] = useState(false);
    const toggleOpenModal = (parameter) => {
        setOpen(parameter);
    }
    return (
        <>
            <Container component="main" disableGutters={true} className={myStyle.text}>
                <Grid container className='headBar'>
                    <Grid item xs={12} sx={{ float: 'right' }} display='flex' justifyContent='right' alignItems='right'>
                        <Button variant='contained' size='medium' onClick={() => toggleOpenModal(true)}>
                            Create thread
                        </Button>
                    </Grid>
                    <CreateThreadForm toggleOpenModal={toggleOpenModal} isOpen={open} />
                    <Grid item xs={12} display='flex' justifyContent='left' alignItems='left' className={myStyle.navigation}>
                        <Grid item >
                            <Link href="#" underline="none" variant="body1" >
                                NEWEST
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" underline="none" variant="body1">
                                UNANSWERED
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" underline="none" variant="body1">
                                MOST VOTED
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container p={3}>
                    <Grid item xs={12} md={9}>
                        <ThreadList />
                        {/* <Profile /> */}
                    </Grid>
                    <Grid item xs={12} md={3}> <Filter /></Grid>
                </Grid>
            </Container>
        </>
    )
}

export default RightSide