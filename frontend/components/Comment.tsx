import React from 'react'
import { Button } from '@mui/material'
import {TextField} from '@mui/material'

const Comment = () => {
  return (
    <form className='commentInput'>
        <TextField
          variant='standard'
          multiline
          placeholder='Type here...'
          sx={{width: '80%'}}
        />
        <Button variant='contained' color='secondary' sx={{ width: '120px', height: '42px', borderRadius: '60px', fontWeight: '600', fontSize: '16px', textTransform: 'none' }}>Reply</Button>
    </form>
  )
}

export default Comment