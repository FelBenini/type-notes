import SideMenu from '@/components/SideMenu'
import UserCard from '@/components/UserCard'
import React from 'react'
import { useRouter } from 'next/router'

const Name = () => {
  const router = useRouter()
  const name = router.query.name
  console.log(name)
  return (
    <>
        <SideMenu />
        <UserCard username={name}/>
    </>
  )
}

export default Name