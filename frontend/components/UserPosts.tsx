import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { Button } from '@mui/material'
import { Cookies } from 'react-cookie'

const cookie = new Cookies()

const UserPosts = ({ username }: { username: string | string[] | undefined }) => {
    const [loading, setLoading] = useState(true)
    const [postData, setPostData] = useState<any>([])
    const [postsCount, setPostsCount] = useState(0)
    const [postLimit, setPostLimit] = useState(0)
    const [page, setPage] = useState(0)

    const fetchData = async (username: string | string[] | undefined) => {
        const token = cookie.get('AUTHJWTKEY')
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/post/${username}?page=${page}`, {
            headers: {
                'authorization': token
            }
        })
        setPostLimit(data.postsCount)
        setPostData([...postData, ...data.posts])
        setPage(page + 1)
        setPostsCount(postsCount + 15)
        setLoading(false)
    }

    const fetchMore = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/post/${username}?page=${page}`)
        setPostData([...postData, ...data.posts])
        setPage(page + 1)
        setPostsCount(postsCount + 15)
        setLoading(false)
    }

    useEffect(() => {
        fetchData(username) // eslint-disable-next-line
    }, [username])

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
            <></>
        )
    }

}

export default UserPosts