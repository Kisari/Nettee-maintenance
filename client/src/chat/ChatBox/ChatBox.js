import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import "stream-chat-react/dist/css/v2/index.css"
import { LoadingIndicator, Chat, ChannelList, Channel, Window, ChannelHeader, MessageList, MessageInput, useChatContext } from 'stream-chat-react'
import { Grid, Button, Typography, Divider } from '@mui/material'
import CreateChatForm from '../../components/Form/CreateChatForm'

const ChatBox = () => {
    const [streamChat, setStreamChat] = useState(null);
    const [open, setOpen] = useState(false);
    const client = new StreamChat(process.env.REACT_APP_STREAM_API_KEY);
    const currentUser = JSON.parse(localStorage.getItem("NETTEE_TOKEN"));
    const toggleOpenModal = (parameter) => {
        setOpen(parameter);
    }
    async function connectUserToStream() {
        if (client?.tokenManager?.token === currentUser?.streamToken && client?.userID === currentUser.data.user?._id) {
            console.log(`User ${currentUser?.data?.user?._id} already connected or connecting`);
            return;
        }

        await client.connectUser(
            {
                id: currentUser.data.user?._id,
                name: currentUser.data.user?.name,
                image: currentUser.data.user?.image,
            },
            currentUser?.streamToken
        ).then(() => {
            console.log("User connected to stream chat");
            setStreamChat(client);
        });
        const generalChannel = await (await client.queryChannels({ id: { $eq: "GeneralCommunity_232857e1-eb4d-4637-9c10-974497d61e49" } }))[0]
        generalChannel.addMembers([currentUser?.data?.user?._id], { text: `${currentUser?.data?.user?.name} join the chat` })
    }
    useEffect(() => {
        connectUserToStream();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function Channels({ loadedChannels }) {
        const { channel: activeChannel, setActiveChannel } = useChatContext();

        return (
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                maxHeight
                sx={{
                    paddingX: "8px",


                }}
            >
                <Button onClick={() => toggleOpenModal(true)}>New Conversation</Button>
                <Divider flexItem />
                <CreateChatForm toggleOpenModal={toggleOpenModal} isOpen={open} client={client} connectUserToStream={connectUserToStream}></CreateChatForm>
                {loadedChannels != null && loadedChannels.length > 0 ?
                    loadedChannels.map((channel) => {
                        const isActive = channel === activeChannel;
                        const addStyle = isActive ?
                            {
                                "& > .MuiButton-root": {
                                    background: "#081FF7 !important",
                                    color: "#FFFFFF !important"
                                },
                            }
                            :
                            {
                                "& > .MuiButton-root:hover": {
                                    background: "#081FF7",
                                    color: "#FFFFFF"
                                }
                            }
                        return (
                            <Grid item key={channel?.data?.cid}
                                sx={[{
                                    marginY: "8px"
                                }, addStyle]}>
                                <Button disabled={isActive} onClick={() => setActiveChannel(channel)}
                                    fullWidth
                                >
                                    <Typography variant='p' component='p'>{channel?.data?.name}</Typography>
                                </Button>
                            </Grid>
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
    )
}
export default ChatBox


