import React, { useState, useEffect } from 'react'
import { ButtonGroup, Button, Container, Grid, Typography, Avatar, List, ListItem, ListItemText, ListItemIcon, Stack, Badge, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeThread, pinThread } from '../../../../../actions/user'
import ShareThreadForm from '../../../../Form/ShareThreadForm'
import myStyle from './style'
import like from '../../../../../images/like.png'
import unlike from '../../../../../images/unlike.png'
import notification from '../../../../../images/notification.png'
import share from '../../../../../images/share.png'
import angular from '../../../../../images/angular.png'
import jquery from '../../../../../images/jquery.png'
import rails from '../../../../../images/rails.png'
import react from '../../../../../images/react.png'
import vuejs from '../../../../../images/vuejs.png'
const SingleThread = ({ data }) => {
    let tagsData = [
        { key: 0, label: 'Angular', image: angular },
        { key: 1, label: 'jQuery', image: jquery },
        { key: 2, label: 'Rails', image: rails },
        { key: 3, label: 'React', image: react },
        { key: 4, label: 'Vue.js', image: vuejs },
    ]

    const currentUser = JSON.parse(localStorage.getItem("NETTEE_TOKEN"));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLike, setIsLike] = useState(data?.likes?.includes(currentUser?.data?.user._id));
    const [isPin, setIsPin] = useState(data?.pins?.includes(currentUser?.data?.user._id));
    useEffect(() => {
        setIsLike(data?.likes?.includes(currentUser?.data?.user._id));
        setIsPin(data?.pins?.includes(currentUser?.data?.user._id));
    }, [data, currentUser?.data?.user._id])
    //open share box
    const [openShareBox, setOpenShareBox] = useState(false);
    const toggleOpenModal = (parameter) => {
        setOpenShareBox(parameter);
    }
    //like function
    const handleLikeFunction = () => {
        dispatch(likeThread(currentUser?.token, data._id));
        if (data?.likes.includes(currentUser?.data?.user._id)) {
            data.likes.pop();
        }
        else {
            data.likes.push(currentUser?.data?.user._id);
        }
        setIsLike((prev) => !prev);
    }
    //pin function
    const handlePinFunction = () => {
        dispatch(pinThread(currentUser?.token, data._id));
        setIsPin((prev) => !prev);
    }
    return (
        <>
            <Container component="main" disableGutters={true} sx={{
                border: "1px solid #CCCCCC",
                borderRadius: "4px",
            }}>
                <ShareThreadForm toggleOpenModal={toggleOpenModal} isOpen={openShareBox} threadID={data._id} />
                <Grid container>
                    <Grid item xs={2} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                        <Button sx={{ borderRadius: "50%" }} onClick={handleLikeFunction}>
                            <Avatar alt="like icon" src={isLike ? like : unlike} />
                        </Button>
                        <Typography component='span'>
                            {data?.likes?.length}
                        </Typography>
                    </Grid>
                    <Grid item xs={10} sx={myStyle.list}>
                        <List>
                            <ListItem
                                sx={myStyle.listItemText}
                            >
                                <ListItemText
                                    primary={`Posted by ${data?.userData?.name}`}
                                    secondary={data?.title}
                                    onClick={() => navigate(`/threads/${data.threadID}/details`)}
                                    sx={{
                                        cursor: 'pointer'
                                    }
                                    }
                                />
                                <ListItemIcon>
                                    <ButtonGroup>
                                        <Badge color='secondary'>
                                            <Button sx={[{ borderRadius: 10, background: isPin ? '#ffc107' : 'none' }, myStyle.startIcon]}
                                                variant="outlined"
                                                startIcon={<img alt="Notification icon" src={notification} style={{ width: '24px', height: '24px' }} />}
                                                size="small"
                                                onClick={handlePinFunction}
                                            >
                                            </Button>
                                        </Badge>
                                        <Button sx={[{ borderRadius: 10 }, myStyle.startIcon]}
                                            variant="outlined"
                                            startIcon={<img alt="Share icon" src={share} style={{ width: '24px', height: '24px' }} />}
                                            size="small"
                                            onClick={() => toggleOpenModal(true)}
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
                            {(data?.comments?.length > 1000) ? `${Math.floor(data?.comments?.length / 1000)}.${data?.comments?.length - (Math.floor(data?.comments?.length / 1000) * 1000)}` : data?.comments?.length} comments
                        </Typography>
                        <Grid item xs={12} sx={{ padding: "0 16px 0 16px" }} display='flex' justifyContent='space-between'>
                            <Stack spacing={1} direction="row" sx={myStyle.tags}>
                                {data?.tags && data?.tags?.map((tag, index) => {
                                    return (
                                        tagsData.map((singleTag) => {
                                            return (
                                                (tag.toString().localeCompare(singleTag.label, undefined, { sensitivity: 'accent' }) === 0)
                                                    ?
                                                    <Chip
                                                        avatar={<Avatar src={singleTag?.image && singleTag.image} />}
                                                        label={singleTag?.label}
                                                        variant="outlined"
                                                        color="primary"
                                                        key={index}
                                                    />
                                                    :
                                                    null
                                            )
                                        })
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