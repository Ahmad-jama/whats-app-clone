import React from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import DonutlargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import SearchIcon from '@material-ui/icons/Search'
import { db } from './firebase'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useStateValue } from './StateProvider'
import './sidebar.css'
import SidebarChats from './SidebarChats'
function Sidebar({ show, setShow }) {
  const [rooms, setRooms] = React.useState([])
  const [{ user }, dispatch] = useStateValue()
  React.useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((snapShot) => {
      setRooms(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      )
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className={`sidebar ${show && 'hide'}`}>
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutlargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="search_container">
          <SearchIcon />
          <input type="text" placeholder="search or start new chat" />
        </div>
      </div>

      <div onClick={() => setShow(!show)} className="sidebar-chats">
        <SidebarChats addNewChat />
        {rooms.map((room) => {
          const { id, data } = room

          return <SidebarChats key={id} name={data.name} id={id} />
        })}
      </div>
    </div>
  )
}

export default Sidebar
