import { withSession } from '@/authService/authService'
import React from 'react'
import SideMenu from '@/components/SideMenu'

export const getServerSideProps = withSession((ctx: any) => {
    return {
        props: {
            session: ctx.req.session
        }
    }
})

const Protected = ({session}: any) => {
  return (
    <>
      <SideMenu/>
      <section className='sideMenuPositioned'>
        {JSON.stringify(session)}
      </section>
    </>
  )
}

export default Protected