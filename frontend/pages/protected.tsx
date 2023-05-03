import { withSession } from '@/authService/authService'
import React from 'react'

export const getServerSideProps = withSession((ctx: any) => {
    return {
        props: {
            session: ctx.req.session
        }
    }
})

const Protected = ({session}: any) => {
  return (
    <div>{JSON.stringify(session)}</div>
  )
}

export default Protected