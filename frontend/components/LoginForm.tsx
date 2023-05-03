import { Button, TextField } from '@mui/material'
import React from 'react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'

const poppins = Poppins({subsets: ['latin'], weight: '600'})
const poppinsParagraph = Poppins({subsets: ['latin'], weight: '200'})

const LoginForm = () => {
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
  return (
    <form onSubmit={formSubmit}>
        <h2 className={poppins.className}>Login</h2>
        <TextField required label='Username' sx={{width: '95%'}}/>
        <TextField required label='Password'sx={{width: '95%'}} type='password'/>
        <Button type='submit' variant='contained' sx={{width: '95%', height: '42px', color: '#f6f7fa'}}>Login</Button>
        <p className={poppinsParagraph.className}>Don&apos;t have an account yet? <Link className={poppins.className} href='/register'>Sign up!</Link></p>
    </form>
  )
}

export default LoginForm