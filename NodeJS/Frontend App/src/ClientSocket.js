import { useEffect, useState } from 'react';
import socketClient from 'socket.io-client';
const socketURL = 'http://localhost:9000';

const socket = socketClient(socketURL);

const ClientSocket = () => {

    const [serverMsgList, setServerMsgList] = useState([]);

    useEffect(() => {
        socket.emit('clientMsg', 'I am a Client');
        socket.on('serverMsg', msg => {
            setServerMsgList(prevVal => {
                let arr = [msg, ...prevVal];
                prevVal = arr;
                return prevVal;
            })
        });
    }, [])

    return (
        <>
            {JSON.stringify(serverMsgList)}
        </>
    )
}

export default ClientSocket;