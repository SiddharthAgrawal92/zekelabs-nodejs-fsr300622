
import { useEffect, useState } from 'react';
import socketClient from 'socket.io-client';
const socketURL = 'http://localhost:9000';

const socket = socketClient(socketURL);

const Chat = () => {

    const [userName, setUserName] = useState('');
    const [isUserSignedUp, setIsUserSignedUp] = useState(false);
    const [msgInput, setMsgInput] = useState('');

    const signUpForChat = () => {
        //we are telling the socket that I want to connect to the chat app
        socket.emit('new-user', userName);

        //when any other client connects except the self I want to get notified from web socket 
        socket.on('new-user-connected', newUser => {
            setMessageContainer(`${newUser} is connected.`);
        });

        //when any other client disconnects except the self I want to get notified from web socket 
        socket.on('user-disconnected', user => {
            setMessageContainer(`${user} is disconnected.`);
        });

        //when any connected client sends a message except self I want to get notified from web socket 
        socket.on('user-message', userMsg => {
            setMessageContainer(`${userMsg.name}: ${userMsg.msg}`);
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setMessageContainer(`You: ${msgInput}`);
        socket.emit('chat-message', msgInput);
        setMsgInput('');
    }

    const setMessageContainer = (msg) => {
        const msgContainer = document.getElementById('message-container');
        let newMsgContainer = document.createElement('div');
        newMsgContainer.innerHTML = msg;
        msgContainer.append(newMsgContainer);
    }

    return (
        <>
            {
                isUserSignedUp
                    ?
                    <>
                        <div className="imojify" id="message-container"></div>
                        <from id="send-container">
                            <input type="text" id="message-input" value={msgInput} onChange={(e) => {
                                setMsgInput(e.target.value);
                            }} />
                            <button type='submit' onClick={onSubmit}>Send</button>
                        </from>
                    </>
                    :
                    <>
                        Enter Name/Username<input type="text" onChange={(e) => {
                            setUserName(e.target.value);
                        }} />
                        <button onClick={() => {
                            if (userName && userName.length > 1) {
                                signUpForChat();
                                setIsUserSignedUp(true);
                            } else {
                                alert('Please enter the Name/Username to signup.');
                            }
                        }}>Signup to Chat</button>
                    </>
            }
        </>
    )
}

export default Chat;