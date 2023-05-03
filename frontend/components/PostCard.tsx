import { IconButton } from '@mui/material'
import React from 'react'
import {FiHeart, FiRepeat, FiMessageCircle, FiMoreVertical} from 'react-icons/fi'
import {format} from 'timeago.js'
import Link from 'next/link'

const PostCard = ({info}: {info: any}) => {
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
                <IconButton aria-label='like this post'><FiHeart size={20}/></IconButton>
                <h5>{info.likesCount}</h5>
            </span>
            <span className='spanSection'>
                <IconButton aria-label='repost this post'><FiRepeat size={20}/></IconButton>
                <h5>{info.likesCount}</h5>
            </span>
            <span className='spanSection'>
                <IconButton aria-label='comment this post'><FiMessageCircle size={20}/></IconButton>
                <h5>{info.likesCount}</h5>
            </span>
            <span className='spanSection'>
                <IconButton aria-label='comment this post'><FiMoreVertical size={20}/></IconButton>
            </span>
        </span>
    </div>
  )
}

export default PostCard