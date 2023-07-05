import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { LoadingIndicator, Chat, ChannelList, Channel, Window, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react'

const ChatBox = () => {
    const [streamChat, setStreamChat] = useState(null);
    useEffect(() => {
        console.log(process.env.BASE_PORT);
        const client = new StreamChat(process.env.STREAM_API_KEY);
        const currentUser = JSON.parse(localStorage.getItem("NETTEE_TOKEN"));
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
        return () => {
            isError = true;
            setStreamChat(null);
        }
    }, []);

    if (streamChat == null) {
        return <LoadingIndicator></LoadingIndicator>
    };
    return (
        <>
            <Chat client={streamChat}>
                <ChannelList />
                <Channel>
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Window>
                    {/* <Thread /> */}
                </Channel>
            </Chat>
        </>
    )
}

export default ChatBox


