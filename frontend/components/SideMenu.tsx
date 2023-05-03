import { Button } from '@mui/material'
import React from 'react'
import {BiUser, BiPlus} from 'react-icons/bi'
import {IoIosNotifications} from 'react-icons/io'
import {RiHome7Fill, RiMore2Fill} from 'react-icons/ri'
import {MdRadar} from 'react-icons/md'

const SideMenu = () => {
    const buttonSx = {color: 'white', textTransform: 'none', fontSize: '19px', borderRadius: '30px', padding: '6px 0px' , paddingLeft: '16px', paddingRight: '28px'}
  return (
    <div id="sideMenu">
        <Button startIcon={<RiHome7Fill />} sx={buttonSx}>Home</Button>
        <Button startIcon={<MdRadar />} sx={buttonSx}>Explore</Button>
        <Button startIcon={<IoIosNotifications />} sx={buttonSx}>Notifications</Button>
        <Button startIcon={<BiUser />} sx={buttonSx}>Profile</Button>
        <Button startIcon={<RiMore2Fill />} sx={buttonSx}>More</Button>
        <Button startIcon={<BiPlus />} color='secondary' sx={{width: '100%', height: '42px', borderRadius: '60px', fontWeight: '600', fontSize: '16px'}} variant='contained'>New Note</Button>
    </div>
  )
}

export default SideMenu