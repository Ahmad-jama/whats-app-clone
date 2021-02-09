import React from 'react'
import './App.css'
import Sidebar from './Sidebar'
import Chat from './Chat'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import { useStateValue } from './StateProvider'
function App() {
  const [{ user }, dispatch] = useStateValue()
  const [show, setShow] = React.useState(false)

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar setShow={setShow} show={show} />
            <button className="showBtn" onClick={() => setShow(!show)}>
              {show ? 'show' : 'hide'}
            </button>
            <Switch>
              <Route path="/room/:id">
                <Chat show={show} />
              </Route>

              <Route path="/">
                <Chat show={show} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
