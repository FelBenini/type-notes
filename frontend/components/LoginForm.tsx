import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { authService } from '@/authService/authService'

const poppins = Poppins({ subsets: ['latin'], weight: '600' })
const poppinsParagraph = Poppins({ subsets: ['latin'], weight: '200' })

const LoginForm = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const token = await authService.login(username, password)
            console.log(token)
        } catch (error) {
            console.log(error)
        }   
    }

    return (
        <form onSubmit={formSubmit}>
            <h2 className={poppins.className}>Login</h2>
            <TextField value={username} onChange={e => setUsername(e.target.value)} required label='Username' sx={{ width: '95%' }} />
            <TextField value={password} onChange={e => setPassword(e.target.value)} required label='Password' sx={{ width: '95%' }} type='password' />
            <Button type='submit' variant='contained' sx={{ width: '95%', height: '42px', color: '#f6f7fa' }}>Login</Button>
            <p className={poppinsParagraph.className}>Don&apos;t have an account yet? <Link className={poppins.className} href='/register'>Sign up!</Link></p>
        </form>
    )
}

export default LoginForm