import { Route, Routes } from 'react-router-dom' // Добавлены импорты
import socketIO from 'socket.io-client'
import Home from './components/home/home'
import ChatPage from './components/chat/index'
const socket = socketIO.connect('http://localhost:3000')

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home socket={socket} />} />
      <Route path="/chat" element={<ChatPage socket={socket} />} />

   </Routes>
  )
}

export default App
