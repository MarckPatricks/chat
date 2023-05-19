import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  const isValidUsername = () => {
    // Verificar que el username no esté vacío
    if (username.trim() === "") {
      window.alert("Please enter a username");
      return false;
    }

    // Verificar que el username no contenga caracteres no permitidos
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(username);
  };

  const joinRoom = () => {
    if (room !== "" && isValidUsername()) {
      socket.emit("join_room", { username, room });
      navigate("/chat", { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>Le Chat</>`}</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          <option value="chill">Chill</option>
        </select>
        <button
          className="btn btn-secondary"
          style={{ width: "100%" }}
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
