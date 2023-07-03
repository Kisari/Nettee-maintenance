import React, { useState, useEffect } from 'react'
import { Chip, ButtonGroup, Button, Container, Grid, Typography, Avatar, List, ListItem, ListItemText, CircularProgress, Stack, TextField, Box, Divider } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form"
import { addCommentToThread } from '../../../actions/thread';
import { likeThread, pinThread } from '../../../actions/user';
import useStyle from './style'
import Answer from './Answer/Answer'
import ShareThreadForm from '../../Form/ShareThreadForm';

import like from '../../../images/like.png'
import unlike from '../../../images/unlike.png'
import notification from '../../../images/notification.png'
import share from '../../../images/share.png'
import imageIcon from '../../../images/imageIcon.png'
import angular from '../../../images/angular.png'
import jquery from '../../../images/jquery.png'
import rails from '../../../images/rails.png'
import react from '../../../images/react.png'
import vuejs from '../../../images/vuejs.png'

const ThreadDetails = () => {
    let tagsData = [
        { key: 0, label: 'Angular', image: angular },
        { key: 1, label: 'jQuery', image: jquery },
        { key: 2, label: 'Rails', image: rails },
        { key: 3, label: 'React', image: react },
        { key: 4, label: 'Vue.js', image: vuejs },
    ]
    const myStyle = [{
        text: {
            "& .headBar": {
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
            }
        },
        startIcon: {
            "& .MuiButton-startIcon": {
                margin: "0",
                width: "1.5rem",
                height: "1.5rem"
            }
        },
        listItemText: {
            "& .MuiListItemText-root": {
                display: "flex",
                flexDirection: "column",
            },
            "& .MuiListItemText-root > p": {
                fontSize: "12px",
                marginTop: "6px"
            },
            "& .MuiListItemText-root > span": {
                fontSize: "18px",
                fontWeight: "bold"
            }
        },
        list: {
            "& .MuiList-root": {
                padding: "0",
            },
            "& .bodyText": {
                margin: 0,
                fontFamily: '"Roboto", "Helvetica", "Arial", sans- serif',
                fontSize: "0.875rem",
                lineHeight: "1.43",
                letterSpacing: "0.01071em",
                display: "block",
                padding: "0 16px 0 16px"
            },
            "& .commentCount": {
                margin: 0,
                fontFamily: '"Roboto", "Helvetica", "Arial", sans- serif',
                fontWeight: "700",
                fontSize: "0.875rem",
                lineHeight: "1.43",
                letterSpacing: "0.01071em",
                color: "#878A8C",
                display: "block",
                padding: "8px 16px 8px 16px"
            },
            "& .times": {
                margin: 0,
                fontFamily: '"Roboto", "Helvetica", "Arial", sans- serif',
                fontWeight: "400",
                fontSize: "0.875rem",
                lineHeight: "1.43",
                letterSpacing: "0.01071em",
                color: "#787C7E",
            },
        },
        tags: {
            "& .MuiButtonBase-root": {
                background: "#081FF71A",
                color: "#081FF7",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans- serif',
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "10px",
                lineHeight: "12px",
            }
        },
    }];
    const routeParams = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem("NETTEE_TOKEN"));
    const allThread = useSelector((state) => state.threadReducer.data.threadData?.filter((thread) => !String(thread.threadID).localeCompare(routeParams.threadID)))?.[0];
    let thread = useSelector((state) => state.threadReducer.data.threadData?.filter((thread) => !String(thread.threadID).localeCompare(routeParams.threadID)))?.[0];
    const allUser = useSelector((state) => state.userReducer?.allUserData);
    thread?.comments?.map((singleComment) => {
        return allUser.map((user) => {
            if (singleComment.userID === user._id) {
                return singleComment.userID = user;
            }
        })
    })
    allUser.map((user) => {
        if (user._id === thread?.userID) {
            thread = { ...thread, userData: user }
        }
    })
    const [isLike, setIsLike] = useState(allThread?.likes?.includes(currentUser?.data?.user._id));
    const [isPin, setIsPin] = useState(allThread?.pins?.includes(currentUser?.data?.user._id));
    const [preview, setPreview] = useState();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            userID: `${currentUser?.data?.user?._id}`,
            content: "",
            image: "",
        }
    });

    useEffect(() => {
        setIsLike(allThread?.likes?.includes(currentUser?.data?.user._id));
        setIsPin(allThread?.pins?.includes(currentUser?.data?.user._id));
    }, [allThread])


    //open share box
    const [openShareBox, setOpenShareBox] = useState(false);
    const toggleOpenModal = (parameter) => {
        setOpenShareBox(parameter);
    }
    //like function
    const handleLikeFunction = () => {
        dispatch(likeThread(currentUser?.token, allThread._id));
        if (allThread?.likes.includes(currentUser?.data?.user._id)) {
            allThread.likes.pop();
        }
        else {
            allThread.likes.push(currentUser?.data?.user._id);
        }
        setIsLike((prev) => !prev);
    }

    //pin function
    const handlePinFunction = () => {
        dispatch(pinThread(currentUser?.token, thread._id));
        setIsPin((prev) => !prev);
    }
    //handle form submit
    const handleForm = (event) => {
        dispatch(addCommentToThread(thread._id, event));
        navigate(0);
    }
    //hanle image change and preview
    const handleImage = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            setValue('image', reader.result);
            setPreview(reader.result);
        };
    }
    return (
        thread ?
            <>
                <Container component="main" disableGutters={true} className={myStyle.text}>
                    <ShareThreadForm toggleOpenModal={toggleOpenModal} isOpen={openShareBox} threadID={thread._id} />
                    <Grid container className='headBar'>
                        <Grid item xs={12} sx={{ float: 'right', padding: '12px 28px' }} display='flex' justifyContent='right' alignItems='right'>
                            <Button variant='contained' size='medium'>
                                Create thread
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container p={3} className='headBar'>
                        <Grid container pr={0}>
                            <Grid item xs={2} display='flex' justifyContent='start' alignItems='center' flexDirection='column'>
                                <Button sx={{ borderRadius: "50%" }} onClick={handleLikeFunction}>
                                    <Avatar alt="like icon" src={isLike ? like : unlike} />
                                </Button>
                                <Typography component='span'>
                                    {thread.likes.length}
                                </Typography>
                            </Grid>
                            <Grid item xs={10} className={myStyle.list}>
                                <List>
                                    <ListItem
                                        className={myStyle.listItemText}
                                    >
                                        <ListItemText
                                            primary={thread.title}
                                            secondary={`Date posted by ${thread?.userData?.name}`}
                                        />
                                    </ListItem>
                                </List>
                                <Typography component="div" className='bodyText'>
                                    {thread.content}
                                </Typography>
                                {thread?.image && <img alt="Question answer" src={thread?.image} className='Answer image' style={{ maxWidth: '100%', marginTop: '8px', maxHeight: "300px" }} />}
                                <Typography component="div" className='commentCount'>
                                    {thread.comments.length} comments
                                </Typography>
                                <Grid item xs={12} sx={{ padding: "0 16px 0 16px" }} display='flex' justifyContent='space-between'>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        justifyContent: "space-between"
                                    }}>
                                        <Stack spacing={1} direction="row" className={myStyle.tags}>
                                            {thread?.tags && thread?.tags?.map((tag, index) => {
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
                                            <ButtonGroup>
                                                <Button sx={{ borderRadius: 10, background: isPin ? '#ffc107' : 'none' }}
                                                    variant="text"
                                                    startIcon={<img alt="Notification icon" src={notification} />}
                                                    className={myStyle.startIcon}
                                                    size="small"
                                                    onClick={handlePinFunction}
                                                >
                                                </Button>
                                                <Button sx={{ borderRadius: 10 }}
                                                    variant="text"
                                                    startIcon={<img alt="Share icon" src={share} />}
                                                    className={myStyle.startIcon}
                                                    size="small"
                                                    onClick={() => toggleOpenModal(true)}
                                                >
                                                </Button>
                                            </ButtonGroup>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid >
                    <Grid container className='headBar'>
                        {thread?.comments?.map((Singlecomment, index) => {
                            return (
                                <Grid container key={index}>
                                    <Grid item xs={12}>
                                        <Answer data={Singlecomment} />
                                        <Divider></Divider>
                                    </Grid>
                                </Grid>
                            )
                        })}

                    </Grid>
                    <Box component='form'
                        onSubmit={handleSubmit(handleForm)}
                    >
                        <Grid container p={4} >
                            <Grid container pr={0} rowSpacing={2} >
                                <Grid item xs={12}>
                                    <Typography component='div' variant='body2'>
                                        Your answer
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        margin='normal'
                                        label="What do you think about the issue ?"
                                        multiline
                                        id="content"
                                        name='content'
                                        rows={5}

                                        {...register("content", { required: "Content is required" })}
                                    />
                                    {errors.content && <p style={{ color: 'red', margin: '0' }}>{errors.content.message}</p>}
                                </Grid>
                                <Grid item xs={12}>
                                    {preview &&
                                        <Box component='div' p={1} sx={{
                                            borderRadius: '8px',
                                            border: '3px solid #f1f1f1',
                                            marginY: '8px',
                                            position: 'relative'
                                        }}>

                                            <img src={`${preview}`} style={{ width: "100%", maxHeight: "auto" }} alt='content' />
                                            <Avatar sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                background: '#1565c0',
                                                border: '2px solid #1565c0'

                                            }}><Button variant='contained' onClick={() => {
                                                setPreview(null);
                                                setValue('image', "");
                                            }}>X</Button></Avatar>
                                        </Box>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <input
                                        accept="image/*"
                                        style={{
                                            display: "none"
                                        }}
                                        id="image"
                                        type="file"
                                        onChange={handleImage}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button size="small" variant='contained' sx={{ color: "white" }} type='submit'> Post your answer</Button>
                                        <label htmlFor="image">
                                            <Avatar src={imageIcon} alt='Image Icon' />
                                        </label>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </>
            :
            <>
                <Container component="main" disableGutters={true} sx={{ position: 'relative' }}>
                    <CircularProgress sx={{ position: 'absolute', top: '50%', right: '50%' }}></CircularProgress>
                </Container>
            </>
    )
}

export default ThreadDetails