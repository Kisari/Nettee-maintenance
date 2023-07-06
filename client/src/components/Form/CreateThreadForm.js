import React, { useState, useEffect } from 'react'
import { Autocomplete, Modal, Box, Typography, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, Divider, Chip } from '@mui/material'
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createThread } from '../../actions/thread';
import imageIcon from '../../images/imageIcon.png';
import react from '../../images/react.png';
import jquery from '../../images/jquery.png';
import angular from '../../images/angular.png';
import rails from '../../images/rails.png';
import vuejs from '../../images/vuejs.png';


const CreateThreadForm = ({ isOpen, toggleOpenModal }) => {
    let tagsData = [
        { key: 0, label: 'Angular', image: angular },
        { key: 1, label: 'jQuery', image: jquery },
        { key: 2, label: 'Rails', image: rails },
        { key: 3, label: 'React', image: react },
        { key: 4, label: 'Vue.js', image: vuejs },
    ]
    const currentUser = JSON.parse(localStorage.getItem("NETTEE_TOKEN"))?.data?.user;
    const threadData = useSelector((state) => state.threadReducer?.data?.threadData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            userID: currentUser?._id,
            threadID: threadData?.length + 1,
            title: "",
            content: "",
            image: "",
            tags: [],
        }
    });
    //image handle
    const [preview, setPreview] = useState();
    useEffect(() => {
        setValue('threadID', threadData?.length + 1);
    }, [threadData])


    const handleForm = (event) => {
        dispatch(createThread(event, navigate));
        navigate(0);
    }
    const handleImage = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            setValue('image', reader.result);
            setPreview(reader.result);
        };
    }

    //tags handle

    const handleAddTag = (value) => {
        value = value?.map((tag) => tag.label);
        setValue('tags', value);
    }
    return (
        <>
            <Modal
                open={isOpen}
                onClose={() => toggleOpenModal(false)}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 1 / 3,
                    minWidth: '400px',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }} component="form"
                    onSubmit={handleSubmit(handleForm)}>
                    {/* <Typography variant='h5' component='h1' align='center' >Create thread</Typography> */}
                    <Divider />
                    <List sx={{ width: '100%', bgcolor: '#FFFFFF' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'orange' }} src={currentUser?.image}>{!currentUser?.image && currentUser?.name?.charAt(0)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={currentUser?.name} secondary={`${new Date().toLocaleDateString("en-US")}`} />
                        </ListItem>
                    </List>
                    <TextField
                        fullWidth
                        autoFocus
                        size='small'
                        id="title"
                        name='title'
                        label="Title*"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <p style={{ color: 'red', margin: '0' }}>{errors.title.message}</p>}
                    <TextField
                        fullWidth
                        margin='normal'
                        label="What do you want to ask ?"
                        multiline
                        id="content"
                        name='content'
                        rows={4}

                        {...register("content", { required: "Content is required" })}
                    />
                    {errors.content && <p style={{ color: 'red', margin: '0' }}>{errors.content.message}</p>}
                    {preview &&
                        <Box component='div' p={1} sx={{
                            borderRadius: '8px',
                            border: '3px solid #f1f1f1',
                            position: 'relative'
                        }}>

                            <img src={`${preview}`} style={{ width: "100%", maxHeight: "100px" }} alt='content' />
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
                    <Box component='div'>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={tagsData}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.key === value.key}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Related tags"
                                    placeholder="Favorites"
                                ></TextField>
                            )}
                            renderTags={(tagValue, getTagProps) => {
                                return tagValue.map((option, index) => (
                                    <Chip {...getTagProps({ index })} label={option.label} avatar={<Avatar alt={option.label} src={option?.image && option.image} />} />
                                ));
                            }}
                            onChange={(event, value) => handleAddTag(value)}
                        />
                    </Box>
                    <Box component='div' p={2} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginY: '16px',
                        borderRadius: '8px',
                        border: '3px solid #f1f1f1',
                    }}>
                        <input
                            accept="image/*"
                            style={{
                                display: "none"
                            }}
                            id="image"
                            type="file"
                            onChange={handleImage}
                        />
                        <Typography component='p' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Add to your thread</Typography>
                        <Box sx={{ display: 'flex' }} >
                            <Button>
                                <label htmlFor="image">
                                    <Avatar src={imageIcon} alt='Image Icon' />
                                </label>
                            </Button>
                        </Box>
                    </Box>
                    <Divider />
                    <Button type='submit' fullWidth variant='contained'>Create</Button>
                </Box>
            </Modal>
        </>
    )
}

export default CreateThreadForm