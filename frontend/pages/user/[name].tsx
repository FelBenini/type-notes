import SideMenu from '@/components/SideMenu'
import UserCard from '@/components/UserCard'
import React from 'react'
import { useRouter } from 'next/router'
import Aside from '@/components/Aside'

const Name = () => {
  const router = useRouter()
  const name = router.query.name
  console.log(name)
  return (
    <>
        <SideMenu />
        <UserCard username={name as string}/>
        <Aside />
    </>
  )
}

export default Name