import React, { useState } from 'react'
import { ButtonGroup, Button, Container, Grid, Typography, Avatar, List, ListItem, ListItemText, ListItemIcon, Stack, Badge } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useStyle from './style'
import like from '../../../../../images/like.png'
import unlike from '../../../../../images/unlike.png'
import notification from '../../../../../images/notification.png'
import share from '../../../../../images/share.png'
const SingleThread = ({ data }) => {
    const myStyle = useStyle();
    const navigate = useNavigate();
    const [isLike, setIsLike] = useState(false);
    return (
        <>
            <Container component="main" disableGutters={true} sx={{
                border: "1px solid #CCCCCC",
                borderRadius: "4px",
            }}>
                <Grid container>
                    <Grid item xs={2} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                        <Button sx={{ borderRadius: "50%" }} onClick={() => setIsLike((prev) => !prev)}>
                            <Avatar alt="like icon" src={isLike ? like : unlike} />
                        </Button>
                        <Typography component='span'>
                            {data?.likes.length}
                        </Typography>
                    </Grid>
                    <Grid item xs={10} className={myStyle.list}>
                        <List>
                            <ListItem
                                className={myStyle.listItemText}
                            >
                                <ListItemText
                                    primary={`Posted by ${data?._id}`}
                                    secondary={data?.title}
                                    onClick={() => navigate(`/threads/${data.threadID}/details`)}
                                    sx={{
                                        cursor: 'pointer'
                                    }
                                    }
                                />
                                <ListItemIcon>
                                    <ButtonGroup>
                                        <Badge badgeContent={3} color='secondary'>
                                            <Button sx={{ borderRadius: 10 }}
                                                variant="outlined"
                                                startIcon={<img alt="Notification icon" src={notification} />}
                                                className={myStyle.startIcon}
                                                size="small"
                                                onClick={() => navigate("/home")}
                                            >
                                            </Button>
                                        </Badge>
                                        <Button sx={{ borderRadius: 10 }}
                                            variant="outlined"
                                            startIcon={<img alt="Share icon" src={share} />}
                                            className={myStyle.startIcon}
                                            size="small"
                                            onClick={() => navigate("/home")}
                                        >
                                        </Button>
                                    </ButtonGroup>
                                </ListItemIcon>
                            </ListItem>
                        </List>
                        <Typography component="div" className='bodyText'>
                            {data?.content && data.content}
                        </Typography>
                        <Typography component="div" className='commentCount'>
                            {(data?.comments.length > 1000) ? `${Math.floor(data?.comments.length / 1000)}.${data?.comments.length - (Math.floor(data?.comments.length / 1000) * 1000)}` : data?.comments.length} comments
                        </Typography>
                        <Grid item xs={12} sx={{ padding: "0 16px 0 16px" }} display='flex' justifyContent='space-between'>
                            <Stack spacing={1} direction="row" className={myStyle.tags}>
                                {data?.tags.map((tag, index) => {
                                    return (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            key={index}>
                                            {tag}
                                        </Button>
                                    )
                                })}
                            </Stack>
                            <Typography component="span" className='times'>
                                {new Date().getDate() - new Date(data?.createdAt).getDate()} days ago
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid >
            </Container >
        </>
    )
}




export default SingleThread