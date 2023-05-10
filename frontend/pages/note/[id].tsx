import SideMenu from '@/components/SideMenu'
import Aside from '@/components/Aside'
import React, { useState } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { NextPageContext } from 'next'
import Link from 'next/link'
import { Open_Sans } from 'next/font/google'
import { FiRepeat, FiMessageCircle, FiMoreVertical } from 'react-icons/fi'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'
import { numberFormat } from '@/components/numberFormat'
import { IconButton } from '@mui/material'
import { Cookies } from 'react-cookie'
import Comment from '@/components/Comment'
import nookies from 'nookies'
import Replies from '@/components/Replies'

const cookie = new Cookies()

const openSans = Open_Sans({ weight: "400", subsets: ['latin'] })

export async function getServerSideProps(ctx: NextPageContext) {
    const cookies = nookies.get(ctx)
    const { id } = ctx.query
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
        headers: {
            'authorization': cookies['AUTHJWTKEY']
        }
    })
    return {
        props: {
            data: res.data,
            status: res.status
        }
    }
}

const PostPage = ({ data, status }: { data: any, status: Number }) => {
    const [likeCount, setLikeCount] = useState({ likeCount: data.likesCount, liked: data.liked || false })

    const likeThisPost = () => {
        if (likeCount.liked === false) {
            setLikeCount({ likeCount: likeCount.likeCount + 1, liked: true })
        } else {
            setLikeCount({ likeCount: likeCount.likeCount - 1, liked: false })
        }
        const token = cookie.get('AUTHJWTKEY')
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/post/like/${data._id}`, {}, { headers: { authorization: token } })
    }
    return (
        <>
            <SideMenu />
            <section id='postPage' className={`sideMenuPositioned ${openSans.className}`}>
                <div className='mainPost'>
                    <Link href={`/user/${data.postedBy.username}`} className='userTip'>
                        <span className='profilePic'></span>
                        <h4>{data.postedBy.displayName}</h4>
                        <p>@{data.postedBy.username}</p>
                        <p>●</p>
                        <p>{format(data.createdAt)}</p>
                    </Link>
                    <p className='contentPost'>{data.content}</p>
                    <span className='postToolbar'>
                        <span className='spanSection'>
                            <IconButton color='warning' onClick={likeThisPost} aria-label='like this post'>{!likeCount.liked ? <BsHeart color='white' size={20} /> : <BsFillHeartFill color='#D81E5B' size={20} />}</IconButton>
                            <h5>{numberFormat(likeCount.likeCount)}</h5>
                        </span>
                        <span className='spanSection'>
                            <IconButton color='success' aria-label='repost this post'><FiRepeat color='white' size={20} /></IconButton>
                            <h5>0</h5>
                        </span>
                        <span className='spanSection'>
                            <IconButton color='info' aria-label='comment this post'><FiMessageCircle color='white' size={20} /></IconButton>
                            <h5>{numberFormat(data.replyCount || '0')}</h5>
                        </span>
                        <span className='spanSection'>
                            <IconButton aria-label='comment this post'><FiMoreVertical size={20} /></IconButton>
                        </span>
                    </span>
                </div>
                <Comment />
                <Replies id={data._id as string}/>
            </section>
            <Aside />
        </>
    )
}

export default PostPage