import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { FiHeart, FiRepeat, FiMessageCircle, FiMoreVertical } from 'react-icons/fi'
import { format } from 'timeago.js'
import Link from 'next/link'
import { Cookies } from 'react-cookie'
import axios from 'axios'

const cookie = new Cookies()

const PostCard = ({ info }: { info: any }) => {
    const [likeCount, setLikeCount] = useState({ likeCount: info.likesCount, liked: false })

    const likeThisPost = () => {
        if (likeCount.liked === false) {
            setLikeCount({ likeCount: likeCount.likeCount + 1, liked: true })
        } else {
            setLikeCount({ likeCount: likeCount.likeCount - 1, liked: false })
        }
        const token = cookie.get('AUTHJWTKEY')
        axios.put(`http://localhost:4000/post/like/${info._id}`, {}, { headers: { authorization: token } })
    }
    return (
        <div className='postCard'>
            <Link href={`/user/${info.postedBy.username}`} className='userTip'>
                <span className='profilePic'></span>
                <h4>{info.postedBy.displayName}</h4>
                <p>@{info.postedBy.username}</p>
                <p>●</p>
                <p>{format(info.createdAt)}</p>
            </Link>
            <p>{info.content}</p>
            <span className='postToolbar'>
                <span className='spanSection'>
                    <IconButton onClick={likeThisPost} aria-label='like this post'><FiHeart size={20} /></IconButton>
                    <h5>{likeCount.likeCount}</h5>
                </span>
                <span className='spanSection'>
                    <IconButton aria-label='repost this post'><FiRepeat size={20} /></IconButton>
                    <h5>{info.likesCount}</h5>
                </span>
                <span className='spanSection'>
                    <IconButton aria-label='comment this post'><FiMessageCircle size={20} /></IconButton>
                    <h5>{info.likesCount}</h5>
                </span>
                <span className='spanSection'>
                    <IconButton aria-label='comment this post'><FiMoreVertical size={20} /></IconButton>
                </span>
            </span>
        </div>
    )
}

export default PostCard