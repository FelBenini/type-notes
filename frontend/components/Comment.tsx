import React, {useState} from 'react'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import Router from 'next/router'

const cookie = new Cookies()

const Comment = ({id}: {id: string}) => {
    const [textValue, setTextValue] = useState('')
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reply/${id}`, { content: textValue }, {
            headers: {
                'authorization': cookie.get('AUTHJWTKEY')
            }
        })
        Router.reload()
    }
    return (
        <form className='commentInput' onSubmit={handleSubmit}>
            <TextField
                variant='standard'
                multiline
                placeholder='Post your reply'
                sx={{ width: '80%' }}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
            />
            <Button type='submit' variant='contained' color='secondary' sx={{ width: '120px', height: '42px', borderRadius: '60px', fontWeight: '600', fontSize: '16px', textTransform: 'none' }}>Reply</Button>
        </form>
    )
}

export default Comment