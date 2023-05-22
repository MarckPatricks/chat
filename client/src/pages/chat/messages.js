import styles from './styles.module.css'; // Importa los estilos del módulo CSS correspondiente al componente
import { useState, useEffect, useRef } from 'react'; // Importa los hooks useState, useEffect y useRef desde React

const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]); // Define el estado "messagesReceived" y la función 
//stMessagesReceived" para gestionar los mensajes recibidos

  const messagesColumnRef = useRef(null); // Crea una referencia mutable para el elemento DOM de la columna de mensajes
  useEffect(() => { // Efecto que se ejecuta cuando se monta o actualiza el componente
    socket.on('receive_message', (data) => { // Escucha el evento 'receive_message' emitido por el socket
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]); // Agrega el mensaje recibido al estado de mensajes recibidos
    });

    return () => socket.off('receive_message'); // Limpia el efecto al desmontar el componente o al actualizarlo
  }, [socket]);


  useEffect(() => { // Efecto que se ejecuta cuando se monta o actualiza el componente
   
    socket.on('last_100_messages', (last100Messages) => { // Escucha el evento 'last_100_messages' emitido por el socket
      console.log('Last 100 messages:', JSON.parse(last100Messages));
      last100Messages = JSON.parse(last100Messages);
 
      last100Messages = sortMessagesByDate(last100Messages); // Ordena los mensajes por fecha
      setMessagesReceived((state) => [...last100Messages, ...state]); // Agrega los mensajes al estado de mensajes recibidos
    });

    return () => socket.off('last_100_messages'); // Limpia el efecto al desmontar el componente o al actualizarlo
  }, [socket]);


  useEffect(() => { // Efecto que se ejecuta cuando cambia el estado de mensajes recibidos
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight; // Hace scroll hacia abajo para mostrar los mensajes más recientes
  }, [messagesRecieved]);


  function sortMessagesByDate(messages) { // Función para ordenar los mensajes por fecha
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }


  function formatDateFromTimestamp(timestamp) { // Función para formatear una fecha a partir de una marca de tiempo
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (

    <div className={styles.messagesColumn} ref={messagesColumnRef}> //Renderiza la columna de mensajes y establece la referencia al elemento DOM
      {messagesRecieved.map((msg, i) => ( // Itera sobre los mensajes recibidos y renderiza cada uno
        <div className={styles.message} key={i}> //Renderiza un mensaje individual
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;
