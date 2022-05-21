import '../styles/Messenger.css';

import Conversation from '../components/Conversation';
import Message from '../components/Message';
// import ChatOnline from '../components/chatOnline/ChatOnline';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { io } from 'socket.io-client';
import { ENDPOINT } from '../config';

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();

    const id = user.data.user._id;
    // console.log(id);
    useEffect(() => {
        socket.current = io('http://localhost:3001');
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    // useEffect(() => {
    //     socket.current.emit('addUser', user._id);
    //     socket.current.on('getUsers', (users) => {
    //         setOnlineUsers(
    //             user.followings.filter((f) => users.some((u) => u.userId === f))
    //         );
    //     });
    // }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(
                    `${ENDPOINT}/api/v1/conversations/` + id
                );
                setConversations(res.data.data.conversationIds);
                // console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(
                    `${ENDPOINT}/api/v1/messages/` + currentChat?._id
                );
                setMessages(res.data.messages);
                // console.log(res.data.messages);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find((member) => member !== id);

        socket.current.emit('sendMessage', {
            senderId: id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post(
                `${ENDPOINT}/api/v1/messages`,
                message
            );
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // const conv = conversations.data.conversationIds;
    // console.log(conv);

    return (
        <>
            {/* <Topbar /> */}
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input
                            placeholder="Search for friends"
                            className="chatMenuInput"
                        />
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation
                                    conversation={c}
                                    currentUser={user}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div ref={scrollRef}>
                                            <Message
                                                message={m}
                                                own={m.sender === id}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e) =>
                                            setNewMessage(e.target.value)
                                        }
                                        value={newMessage}
                                    ></textarea>
                                    <button
                                        className="chatSubmitButton"
                                        onClick={handleSubmit}
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                        )}
                    </div>
                </div>
                {/* <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div> */}
            </div>
        </>
    );
}
