
import styles from './styles.module.css'; // Importa los estilos del módulo CSS correspondiente al componente
import RoomAndUsersColumn from './room-and-users'; // Importa el componente RoomAndUsersColumn desde su archivo
import SendMessage from './send-message'; // Importa el componente SendMessage desde su archivo
import MessagesReceived from './messages'; // Importa el componente MessagesReceived desde su archivo

const Chat = ({ username, room, socket }) => { 
  return (
    <div className={styles.chatContainer}> // Define un div con la clase CSS chatContainer

      <RoomAndUsersColumn socket={socket} username={username} room={room} /> // Renderiza el componente RoomAndUsersColumn 
//y le pasa las propiedades socket, username y room

      <div>
        <MessagesReceived socket={socket} /> // Renderiza el componente MessagesReceived y le pasa la propiedad socket
        <SendMessage socket={socket} username={username} room={room} /> // Renderiza el componente SendMessage y le pasa las propiedades
// socket, username y room
      </div>
      </div>
    </div>
  );
};

export default Chat;
