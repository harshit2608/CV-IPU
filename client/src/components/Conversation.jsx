import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/Conversation.css';
import { ENDPOINT, PF } from '../config';
import Navbar from '../components/Navbar';

const Conversation = ({ conversation, currentUser }) => {
    const [user, setUser] = useState(null);
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // console.log(currentUser.data.user._id);
    useEffect(() => {
        const friendId = conversation.members.find(
            (m) => m !== currentUser.data.user._id
        );
        // console.log(friendId);

        const getUser = async () => {
            try {
                const res = await axios(`${ENDPOINT}/api/v1/users/` + friendId);
                setUser(res.data);
                // console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    // console.log(user?.data?.data?.name);
    return (
        // <Navbar/>
        <div className="conversation">
            <img
                className="conversationImg"
                src={
                    user?.data?.data?.profilePicture
                        ? PF + user?.data?.data?.profilePicture
                        : PF + 'person/noAvatar.png'
                }
                alt=""
            />
            <span className="conversationName">{user?.data?.data?.name}</span>
        </div>
    );
};

export default Conversation;
