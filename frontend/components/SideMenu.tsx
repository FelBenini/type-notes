import { Button, Menu, MenuItem, IconButton } from '@mui/material'
import React from 'react'
import { BiUser, BiPlus, BiDotsVerticalRounded, BiLogOut, BiCog } from 'react-icons/bi'
import { IoIosNotifications } from 'react-icons/io'
import { RiHome7Fill, RiMore2Fill } from 'react-icons/ri'
import { MdRadar } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { Cookies } from 'react-cookie'
import Link from 'next/link'
import { authService } from '@/authService/authService'
import { useRouter } from 'next/router'
import axios from 'axios'

const cookie = new Cookies()

const SideMenu = () => {
    const router = useRouter()
    const [userName, setUsername] = useState('')
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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

    const handleLogout = async () => {
        await authService.logout()
        handleClose()
        router.push('/login')
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
            <div className='userToolTipMenu'>
                <h3>name</h3>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <BiDotsVerticalRounded />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}><BiCog className='menuIcon' /> Settings</MenuItem>
                    <MenuItem onClick={handleLogout}><BiLogOut className='menuIcon' /> Logout</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default SideMenu