import { authService } from '@/authService/authService'
import React from 'react'
import nookies from 'nookies'

export async function getServerSideProps(ctx: any) {
    try {
        const session = await authService.login('Felipe', 'hello world')
        nookies.set(ctx, 'AUTHJWTKEY', session)
        return {
            props: {
                session
            }
        }
    } catch (error) {
        return {
            redirect: {
                perament: false,
                destination: '/'
            }
        }
    }
}

const Protected = ({session}: any) => {
  return (
    <div>{session}</div>
  )
}

export default Protected