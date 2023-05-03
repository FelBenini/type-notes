import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Open_Sans } from 'next/font/google';
import {FaRegCalendar, FaUserPlus} from 'react-icons/fa'
import { Button } from '@mui/material';

const openSans = Open_Sans({ subsets: ['latin'], weight: '400' })

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
            <div className={`UserCardContainer ${openSans.className} sideMenuPositioned`}>
                <div id='bannerUser'></div>
                <div className='userInformation'>
                    <Button startIcon={<FaUserPlus />} color='secondary' sx={{padding: '12px 24px', borderRadius: '60px'}} variant="contained">Follow</Button>
                    <span id='profilePicUser'></span>
                    <h1>{userInfo?.displayName}</h1>
                    <h4>@{userInfo?.username}</h4>
                    <p><FaRegCalendar /> Member since {createdAt.toLocaleString('en-US', { month: 'long' })} {createdAt.getFullYear()}</p>
                    <span className='followInformation'>
                        <p><b><>{userInfo?.followerCount}</></b> followers</p>
                        <p><b><>{userInfo?.followingCount}</></b> following</p>
                    </span>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`${openSans.className}`}>Now loading</div>
        )
    }
}

export default UserCard