import axios from 'axios'
import React, { useEffect, useState } from 'react'

export interface IUserInfo {
    username: string;
    email: string;
    displayName: string;
    followers: Array<string>;
    followerCount: Number;
    following: Array<string>;
    followingCount: Number;
    profilePic: string;
    bannerPic: string;
    createdAt: string;
}

const UserCard = ({ username }: { username: string }) => {
    const [userInfo, setUserInfo] = useState<IUserInfo | undefined>()
    const [loading, setLoading] = useState(true)
    const fetchData = async (username: string) => {
        const { data } = await axios.get(`http://localhost:4000/user/${username}`)
        setUserInfo(data)
        setLoading(false)
    }
    useEffect(() => {
        fetchData(username)
    }, [])

    if (!loading) {
        const createdAt = new Date(userInfo?.createdAt as string)
        return (
            <div>
                {userInfo?.username}
                <p>Registered since {createdAt.toLocaleString('en-US', { month: 'long' })} {createdAt.getFullYear()}</p>
            </div>
        )
    } else {
        return (
            <div>Now loading</div>
        )
    }
}

export default UserCard