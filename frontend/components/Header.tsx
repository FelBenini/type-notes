import React from 'react'
import { Poppins } from 'next/font/google'
import { BiLandscape } from "react-icons/bi";

const poppins = Poppins({ subsets: ['latin'], weight: '400' })

const Header = () => {
  return (
    <header className={poppins.className}>
      <span className='logo'>
        <BiLandscape color="#c313dc" size={'42px'} />
        <h1>typeNotes</h1>
      </span>
    </header>
  )
}

export default Header