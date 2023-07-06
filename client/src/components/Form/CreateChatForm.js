import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Autocomplete, Modal, Box, Typography, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, Divider, Chip } from '@mui/material'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from "react-redux";

const CreateChatForm = ({ isOpen, toggleOpenModal }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            members: [],
            imgUrl: "",
            chatName: "",
        }
    });
    const getProperAllUserData = createSelector((state) => state.userReducer?.allUserData, (data) => data);
    const allUser = useSelector(getProperAllUserData);

    const handleForm = (event) => {
        console.log(event);
    }
    const handleAddPeople = (user) => {
        const userID = user?.map((props) => props._id);
        setValue('tags', userID);
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
                    {/* <Typography variant='h5' component='h1' align='center' >Create channel</Typography> */}
                    <Divider />
                    <TextField
                        fullWidth
                        autoFocus
                        size='small'
                        id="chatName"
                        name='chatName'
                        label="Chat Name"
                        {...register("chatName", { required: "ChatName is required" })}
                    />
                    {errors.title && <p style={{ color: 'red', margin: '0' }}>{errors.title.message}</p>}
                    <TextField
                        fullWidth
                        margin='normal'
                        label="Imgage Url (Optional)"
                        multiline
                        id="imgUrl"
                        name='imgUrl'

                        {...register("content")}
                    />
                    <Box component='div'>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={allUser}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option._id === value._id}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Members in chat"
                                    placeholder="Member"
                                ></TextField>
                            )}
                            renderTags={(tagValue, getTagProps) => {
                                return tagValue.map((option, index) => (
                                    <Chip {...getTagProps({ index })} label={option?.name} avatar={<Avatar alt={option?.name} src={!option?.image && option?.name?.charAt(0)} />} />
                                ));
                            }}
                            onChange={(event, value) => handleAddPeople(value)}
                        />
                    </Box>
                    <Divider />
                    <Button type='submit' fullWidth variant='contained'>Create</Button>
                </Box>
            </Modal>
        </>
    )
}

export default CreateChatForm