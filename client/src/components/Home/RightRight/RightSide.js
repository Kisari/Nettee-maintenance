import React from 'react'
import { Button, Container, Grid, Link } from '@mui/material'
import useStyle from './style.js'
import ThreadList from './ThreadList/ThreadList.js'

const RightSide = () => {
    const myStyle = useStyle();
    return (
        <>
            <Container component="main" disableGutters={true} className={myStyle.text}>
                <Grid container className='headBar'>
                    <Grid item xs={12} sx={{ float: 'right', padding: '12px 28px' }} display='flex' justifyContent='right' alignItems='right'>
                        <Button variant='contained' size='medium'>
                            Create thread
                        </Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='left' alignItems='left' className={myStyle.navigation} sx={{ background: "primary" }}>
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
                    </Grid>
                    <Grid item xs={12} md={3}> This is filter section</Grid>
                </Grid>
            </Container>
        </>
    )
}

export default RightSide