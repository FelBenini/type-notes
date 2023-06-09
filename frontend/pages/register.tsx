import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'

const poppins = Poppins({ subsets: ['latin'], weight: '600' })
const poppinsParagraph = Poppins({ subsets: ['latin'], weight: '200' })

const RegisterPage = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                username: username,
                email: email,
                password: password
            })
        } catch (err: any) {
            setErrorMessage(err.response.data.message)
            return
        }
        router.push('/login')
        return
    }

    return (
        <section id='login'>
            <form onSubmit={handleSubmit}>
                <h2 className={poppins.className}>Register</h2>
                <TextField value={email} onChange={e => setEmail(e.target.value)} required label='E-mail' sx={{ width: '95%' }} type='email' />
                <TextField value={username} onChange={e => setUsername(e.target.value)} required label='Username' sx={{ width: '95%' }} type='text' />
                <TextField value={password} onChange={e => setPassword(e.target.value)} required label='Password' sx={{ width: '95%' }} type='password' />
                <p className={poppinsParagraph.className}>{errorMessage}</p>
                <Button type='submit' variant='contained' sx={{ width: '95%', height: '42px', color: '#f6f7fa' }}>Create your account</Button>
                <p className={poppinsParagraph.className}>Already have an account? <Link className={poppins.className} href='/login'>Login!</Link></p>
            </form>
        </section>
    )
}

export default RegisterPage