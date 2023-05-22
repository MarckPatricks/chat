
import styles from './styles.module.css';
import React, { useState } from 'react';

const SendMessage = ({ socket, username, room }) => { // Definición del componente SendMessage como una función de React
  const [message, setMessage] = useState(''); // Definición del estado local para almacenar el mensaje

  const sendMessage = () => { // Función para enviar un mensaje
    if (message !== '') {
      const __createdtime__ = Date.now();
     
      socket.emit('send_message', { username, room, message, __createdtime__ }); // Emisión del evento 'send_message' del socket
// con los datos del mensaje
      setMessage(''); //Limpiar estado del mensaje
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
