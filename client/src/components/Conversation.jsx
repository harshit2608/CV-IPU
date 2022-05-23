import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/Conversation.css';
import { ENDPOINT, PF } from '../config';

const Conversation = ({ conversation, currentUser }) => {
    const [user, setUser] = useState(null);
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversation.members.find(
            (m) => m !== currentUser._id
        );

        const getUser = async () => {
            try {
                const res = await axios(
                    `${ENDPOINT}/api/v1/users?id=` + friendId
                );
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    // console.log(user?.data?.users?.[0]?.name);
    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={
                    user?.profilePicture
                        ? PF + user.profilePicture
                        : PF + 'person/noAvatar.png'
                }
                alt=""
            />
            <span className="conversationName">
                {user?.data?.users?.[1]?.name}
            </span>
        </div>
    );
};

export default Conversation;
