import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { Button } from '@mui/material'

const UserPosts = ({ username }: { username: string | string[] | undefined }) => {
    const [loading, setLoading] = useState(true)
    const [postData, setPostData] = useState<any>([])
    const [postsCount, setPostsCount] = useState(0)
    const [postLimit, setPostLimit] = useState(0)
    const [page, setPage] = useState(0)

    const fetchData = async (username: string | string[] | undefined) => {
        const { data } = await axios.get(`http://localhost:4000/user/post/${username}?page=${page}`)
        setPostLimit(data.postsCount)
        setPostData([...postData, ...data.posts])
        setPage(page + 1)
        setPostsCount(postsCount + 15)
        setLoading(false)
    }

    const fetchMore = async () => {
        const { data } = await axios.get(`http://localhost:4000/user/post/${username}?page=${page}`)
        setPostData([...postData, ...data.posts])
        setPage(page + 1)
        setPostsCount(postsCount + 15)
        setLoading(false)
    }

    useEffect(() => {
        fetchData(username)
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
                {postsCount < postLimit ? <Button sx={{width: '100%'}} onClick={fetchMore}>Load more</Button> : <></>}
            </section>
        )
    } else {
        return (
            <></>
        )
    }

}

export default UserPosts