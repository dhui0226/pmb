import React, { useState } from 'react'
import { Login, Home } from './components'

const App = () => {
    const [user, setUser] = useState({})

    return (
        <div>
            {
                user.username ? <Home user={user} setUser={setUser} /> : <Login setUser={setUser} />
            }
        </div>
    )
}

export default App