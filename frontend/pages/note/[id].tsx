import SideMenu from '@/components/SideMenu'
import Aside from '@/components/Aside'
import React from 'react'
import { NextPageContext } from 'next'

export async function getServerSideProps(ctx: NextPageContext) {
    const {id} = ctx.query
    return {
        props: {
          id: id  
        }
    }
}

const PostPage = ({id}: {id: any}) => {
  return (
    <>
    <SideMenu />
    <section className='sideMenuPositioned'>
        {id}
    </section>
    <Aside />
    </>
  )
}

export default PostPage