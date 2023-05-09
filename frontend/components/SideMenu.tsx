import { Button } from '@mui/material'
import React from 'react'
import { BiUser, BiPlus } from 'react-icons/bi'
import { IoIosNotifications } from 'react-icons/io'
import { RiHome7Fill, RiMore2Fill } from 'react-icons/ri'
import { MdRadar } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { Cookies } from 'react-cookie'
import Link from 'next/link'
import axios from 'axios'

const cookie = new Cookies()

const SideMenu = () => {
    const [userName, setUsername] = useState('')
    const buttonSx = { color: 'white', textTransform: 'none', fontSize: '19px', borderRadius: '30px', padding: '6px 0px', paddingLeft: '16px', paddingRight: '28px' }

    const getUsername = async () => {
        const token = cookie.get('AUTHJWTKEY')
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
                headers: {
                    'authorization': token
                }
            })
            setUsername(`/user/${res.data.session.username}`)
        } catch (err) {
            setUsername('#')
        }
    }

    useEffect(() => {
        getUsername()
    })

    return (
        <div id="sideMenu">
            <Link href='/home'>
                <Button startIcon={<RiHome7Fill />} sx={buttonSx}>Home</Button>
            </Link>
            <Button startIcon={<MdRadar />} sx={buttonSx}>Explore</Button>
            <Button startIcon={<IoIosNotifications />} sx={buttonSx}>Notifications</Button>
            <Link href={`${userName}`}>
                <Button startIcon={<BiUser />} sx={buttonSx}>Profile</Button>
            </Link>
            <Button startIcon={<RiMore2Fill />} sx={buttonSx}>More</Button>
            <Button startIcon={<BiPlus />} color='secondary' sx={{ width: '100%', height: '42px', borderRadius: '60px', fontWeight: '600', fontSize: '16px' }} variant='contained'>New Note</Button>
        </div>
    )
}

export default SideMenu