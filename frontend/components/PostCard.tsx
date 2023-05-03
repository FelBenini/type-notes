import { IconButton } from '@mui/material'
import React from 'react'
import {FiHeart, FiRepeat, FiMessageCircle} from 'react-icons/fi'

const PostCard = ({info}: {info: any}) => {
  return (
    <div className='postCard'>
        <span className='userTip'>
            <span className='profilePic'></span>
            <h4>{info.postedBy.displayName}</h4>
            <p>@{info.postedBy.username}</p>
        </span>
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
        </span>
    </div>
  )
}

export default PostCard