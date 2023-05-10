import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from './PostCard'

const Replies = ({ id }: { id: string | undefined }) => {
    const [replies, setReplies] = useState([])
    const [status, setStatus] = useState<number>()
    const getReplies = async (id: string | undefined) => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/replies/${id}`)

        setReplies(response.data)
        setStatus(response.status)
    }

    useEffect(() => {
      getReplies(id)
    }, [id])

    if (status === 200) {
       return (
        <section id='postsSection' className='repliesSection' style={{marginTop: '0px', paddingBottom: '16px'}}>
            {replies.map((reply, index) => (
                <PostCard info={reply} key={index}/>
            ))}
        </section>
        )    
    } else {
        return (
            <></>
        )
    }
    
}

export default Replies