import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState([])

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/getuser')
        const data = await res.json()
        console.log(data)
        setUser(data.data.users) 
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getdata()
  }, [user])

  return (
    <>
      <ul>
        {user.map((item, index) => (
          <li key={index}>{item.name}</li> 
        ))}
      </ul>
    </>
  )
}

export default App
