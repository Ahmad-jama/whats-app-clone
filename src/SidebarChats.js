import { Avatar } from '@material-ui/core'
import React from 'react'
import { db } from './firebase'
import { Link } from 'react-router-dom'
import './sidebarChat.css'
function SidebarChats({ addNewChat, id, name }) {
  const [message, setMessage] = React.useState([])

  const createChat = () => {
    const roomName = prompt('please inter room name')

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
      })
    }
  }

  React.useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('message')
        .orderBy('time', 'desc')
        .onSnapshot((snap) => setMessage(snap.docs.map((doc) => doc.data())))
    }
  }, [id])

  return !addNewChat ? (
    <Link to={`/room/${id}`}>
      <div className="sidebar_chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />

        <div className="sidebar_chat_info">
          <h2>{name}</h2>
          <p> {message[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="createChta">
      <button> Add new chat</button>
    </div>
  )
}

export default SidebarChats
