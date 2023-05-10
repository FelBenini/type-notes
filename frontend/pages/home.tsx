import { withSession } from '@/authService/authService'
import React from 'react'
import SideMenu from '@/components/SideMenu'
import Aside from '@/components/Aside'

export const getServerSideProps = withSession((ctx: any) => {
  return {
    props: {
      session: ctx.req.session
    }
  }
})

const Protected = ({ session }: any) => {
  return (
    <>
      <SideMenu />
      <section className='sideMenuPositioned'>
        {JSON.stringify(session)}
      </section>
      <Aside />
    </>
  )
}

export default Protected