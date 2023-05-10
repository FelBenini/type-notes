import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { FiRepeat, FiMessageCircle, FiMoreVertical } from 'react-icons/fi'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'
import { format } from 'timeago.js'
import Link from 'next/link'
import { Cookies } from 'react-cookie'
import { numberFormat } from './numberFormat'
import axios from 'axios'

const cookie = new Cookies()

const PostCard = ({ info }: { info: any }) => {
    const [likeCount, setLikeCount] = useState({ likeCount: info.likesCount, liked: info.liked || false })

    const likeThisPost = () => {
        if (likeCount.liked === false) {
            setLikeCount({ likeCount: likeCount.likeCount + 1, liked: true })
        } else {
            setLikeCount({ likeCount: likeCount.likeCount - 1, liked: false })
        }
        const token = cookie.get('AUTHJWTKEY')
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/post/like/${info._id}`, {}, { headers: { authorization: token } })
    }
    return (
        <Link href={`/note/${info._id}`} className='postCard'>
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
                    <IconButton color='warning' onClick={likeThisPost} aria-label='like this post'>{!likeCount.liked ? <BsHeart color='white' size={20} /> : <BsFillHeartFill color='#D81E5B' size={20} />}</IconButton>
                    <h5>{numberFormat(likeCount.likeCount as string)}</h5>
                </span>
                <span className='spanSection'>
                    <IconButton color='success' aria-label='repost this post'><FiRepeat color='white' size={20} /></IconButton>
                    <h5>0</h5>
                </span>
                <span className='spanSection'>
                    <IconButton color='info' aria-label='comment this post'><FiMessageCircle color='white' size={20} /></IconButton>
                    <h5>{numberFormat(info.replyCount as string || '0')}</h5>
                </span>
                <span className='spanSection'>
                    <IconButton aria-label='comment this post'><FiMoreVertical size={20} /></IconButton>
                </span>
            </span>
        </Link>
    )
}

export default PostCard