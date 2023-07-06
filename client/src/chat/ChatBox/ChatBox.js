import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import "stream-chat-react/dist/css/v2/index.css"
import { LoadingIndicator, Chat, ChannelList, Channel, Window, ChannelHeader, MessageList, MessageInput, useChatContext } from 'stream-chat-react'
import { Grid, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CreateChatForm from '../../components/Form/CreateChatForm'

const ChatBox = () => {
    const [streamChat, setStreamChat] = useState(null);
    const [open, setOpen] = useState(false);
    const client = new StreamChat(process.env.REACT_APP_STREAM_API_KEY);
    const currentUser = JSON.parse(localStorage.getItem("NETTEE_TOKEN"));
    const toggleOpenModal = (parameter) => {
        setOpen(parameter);
    }
    useEffect(() => {
        var isError = false;

        async function connectUserToStream() {
            if (client?.tokenManager?.token === currentUser?.streamToken && client?.userID === currentUser.data.user?._id) {
                return
            }

            await client.connectUser(
                {
                    id: currentUser.data.user?._id,
                    name: currentUser.data.user?.name,
                    image: currentUser.data.user?.image,
                },
                currentUser?.streamToken
            ).then(() => {
                if (isError) {
                    console.log("Connect fail to Stream chat");
                    return
                }
                else {
                    console.log("User connected to stream chat");
                    setStreamChat(client);
                }
            });
        }
        connectUserToStream();
    }, []);

    function Channels({ loadedChannel }) {
        const navigate = useNavigate();
        const { channel: activeChannel, setActiveChannel } = useChatContext();

        return (
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                maxHeight
            >
                <Button onClick={() => toggleOpenModal(true)}>New Conversation</Button>
                <CreateChatForm toggleOpenModal={toggleOpenModal} isOpen={open}></CreateChatForm>
                <hr />
                {loadedChannel != null && loadedChannel.length > 0 ?
                    loadedChannel.map((channel) => {
                        const isActive = channel === activeChannel;
                        const addStyle = isActive ?
                            ""
                            : ""
                        return (
                            <Button disabled={isActive} onClick={() => setActiveChannel(channel)}
                                variant='contained'
                                sx={[{
                                    padding: "16px",
                                }, addStyle]}>
                            </Button>
                        )
                    })
                    : "You not join any channels"}
            </Grid>
        )
    }
    if (streamChat == null) {
        return <LoadingIndicator></LoadingIndicator>
    };
    return (
        <>
            <Chat client={streamChat}>
                <Grid item xs={3}>
                    <ChannelList
                        sort={{ last_message_at: -1 }}
                        filters={{ members: { $in: [currentUser.data.user?._id] } }}
                        List={Channels}
                        sendChannelsToList
                    />
                </Grid>
                <Grid item xs={9}>
                    <Channel maxHeight>
                        <Window>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput />
                        </Window>
                        {/* <Thread /> */}
                    </Channel>
                </Grid>
            </Chat>
        </>
    )
}

export default ChatBox


