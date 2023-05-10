import React from 'react'
import { Button } from '@mui/material'
import {TextField} from '@mui/material'

const Comment = () => {
    const handleSubmit = (e: any) => {
        e.preventDefault()
    }
  return (
    <form className='commentInput' onSubmit={handleSubmit}>
        <TextField
          variant='standard'
          multiline
          placeholder='Type here...'
          sx={{width: '80%'}}
        />
        <Button type='submit' variant='contained' color='secondary' sx={{ width: '120px', height: '42px', borderRadius: '60px', fontWeight: '600', fontSize: '16px', textTransform: 'none' }}>Reply</Button>
    </form>
  )
}

export default Comment