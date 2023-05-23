import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { Button } from '@mui/material'
import { Cookies } from 'react-cookie'
import { Skeleton } from '@mui/material'

const cookie = new Cookies()

const UserPosts = ({ username, type }: { username: string | string[] | undefined, type: string }) => {
    const [loading, setLoading] = useState(true)
    const [postData, setPostData] = useState<any>([])
    const [postsCount, setPostsCount] = useState(0)
    const [postLimit, setPostLimit] = useState(0)
    const [page, setPage] = useState(0)

    const fetchData = async (username: string | string[] | undefined, type: string) => {
        setLoading(true)
        const token = cookie.get('AUTHJWTKEY')
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/post/${username}?page=0&type=${type}`, {
            headers: {
                'authorization': token
            }
        })
        setPostLimit(data.postsCount)
        setPostData(data.posts)
        setPage(page + 1)
        setPostsCount(postsCount + 15)
        setLoading(false)
    }

    const fetchMore = async () => {
      const token = cookie.get('AUTHJWTKEY')
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/post/${username}?page=${page}`, {
          headers: {
              'authorization': token
          }
      })
        setPostData([...postData, ...data.posts])
        setPage(page + 1)
        setPostsCount(postsCount + 15)
        setLoading(false)
    }

    useEffect(() => {
      fetchData(username, type) // eslint-disable-next-line
    }, [username, type])

    if (!loading) {
        const mappedPosts = postData.map((post: any, index: any) => {
            return (
                <PostCard info={post} key={index} />
            )
        })
        return (
            <section id='postsSection'>
                {mappedPosts}
                {postsCount < postLimit ? <Button sx={{ width: '100%' }} onClick={fetchMore}>Load more</Button> : <></>}
            </section>
        )
    } else {
        return (
            <section id='postsSection'>
              <Skeleton variant='rounded' height={210} className='postCard'/>
              <Skeleton variant='rounded' height={210} className='postCard'/>
              <Skeleton variant='rounded' height={210} className='postCard'/>
            </section>
        )
    }

}

export default UserPosts