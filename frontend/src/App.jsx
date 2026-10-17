import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './App.css'


const socket = io("http://localhost:3000")

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [socketId, setSocketId] = useState("")

  useEffect(() => {

    socket.on("connect", () => {
      setIsConnected(true);
      setSocketId(socket.id);
      console.log("Connected to server:", socket.id);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setSocketId("");
      console.log("Disconnected from server");
    });


    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      fontFamily: 'sans-serif',
      margin: 0
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        textAlign: 'center',
        width: '350px'
      }}>
        <h1 style={{ color: '#1e293b', marginBottom: '1rem' }}>Socket.IO Demo</h1>

        <p style={{ fontSize: '18px', color: '#334155' }}>
          Status: {' '}
          <strong style={{
            color: isConnected ? '#16a34a' : '#dc2626',
            backgroundColor: isConnected ? '#dcfce7' : '#fee2e2',
            padding: '4px 12px',
            borderRadius: '20px'
          }}>
            {isConnected ? '● Connected' : '● Disconnected'}
          </strong>
        </p>

        {isConnected && (
          <p style={{
            backgroundColor: '#f1f5f9',
            padding: '10px',
            borderRadius: '8px',
            color: '#0f172a',
            wordBreak: 'break-all'
          }}>
            Socket ID: <code>{socketId}</code>
          </p>
        )}
      </div>
    </div>
  );
}

export default App