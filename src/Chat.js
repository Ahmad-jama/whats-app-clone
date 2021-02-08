import { Avatar, IconButton } from '@material-ui/core'
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Search,
} from '@material-ui/icons'
import React from 'react'
import './chat.css'
import { useParams } from 'react-router-dom'
import { db } from './firebase'
import { useStateValue } from './StateProvider'
import firebase from 'firebase'
const Chat = () => {
  /*   const [seed, setSeed] = React.useState('')
   */
  const [value, setValue] = React.useState('')

  const [roomName, setRoomName] = React.useState('')

  const [message, setMessage] = React.useState([])
  const [{ user }, dispatch] = useStateValue()
  const { id } = useParams()
  React.useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .onSnapshot((snap) => setRoomName(snap.data().name))

      db.collection('rooms')
        .doc(id)
        .collection('message')
        .orderBy('time', 'asc')
        .onSnapshot((snap) => setMessage(snap.docs.map((doc) => doc.data())))
    }
  }, [id])

  console.log(message)

  /*  React.useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, []) */

  const sendMessage = (e) => {
    e.preventDefault()
if(value){
  alert(typeof value)
      db.collection('rooms').doc(id).collection('message').add({
      message: value,
      name: user.displayName,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    })
}
    setValue('')
  }

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />

        <div className="header_info">
          <h3>{roomName}</h3>
          <p>
            last seen{' '}
            {new Date(
              message[message.length - 1]?.time?.toDate(),
            ).toLocaleString()}
          </p>
        </div>

        <div className="header_right">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {message.map((message) => (
          <p
            className={`message ${
              message.name === user.displayName && ' reciever'
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.time?.toDate()).toLocaleString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placehold="type a message"
          />
          <button type="submit" onClick={sendMessage}>
            seand a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  )
}

export default Chat
