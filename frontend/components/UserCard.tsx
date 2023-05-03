import axios from 'axios'
import React, {useEffect, useState} from 'react'

const UserCard = ({username}: {username: string}) => {
    const [userInfo, setUserInfo] = useState({})
    const fetchData = async (username: string) => {
        const {data} = await axios.get(`http://localhost:4000/user/${username}`)
        setUserInfo(data)
    }
    useEffect(() => {
      fetchData(username)
    }, [])
    

  return (
    <div></div>
  )
}

export default UserCard