import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import PostCard from './PostCard'

const UserPosts = ({username}: {username: string | string[] | undefined}) => {
    const [loading, setLoading] = useState(true)
    const [postData, setPostData] = useState<any>([])

    const fetchData = async (username: string | string[] | undefined) => {
        const {data} = await axios.get(`http://localhost:4000/user/post/${username}`)
        setPostData(data)
        setLoading(false)
    }
    useEffect(() => {
      fetchData(username)
    }, [username])
    
    if(!loading) {
        const mappedPosts = postData.map((post: any, index: any) => {
            return (
                <PostCard info={post} key={index}/>
            )
        })
        return (
            <section id='postsSection'>{mappedPosts}</section>
          )
    } else {
        return (
            <></>
        )
    }

}

export default UserPosts