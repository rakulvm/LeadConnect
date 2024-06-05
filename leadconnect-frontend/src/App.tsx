import { useState } from 'react'
import LeftSideNav from './components/LeftSideNav'
import TopNav from './components/TopNav'
import MainTable from './components/MainTable'
import AddContactForm from './components/AddContact'

function App() {

  return (

    <div className='flex h-screen overflow-hidden' >
      <LeftSideNav></LeftSideNav>
      <div className='flex flex-col w-full'>
        <TopNav></TopNav>
        <MainTable></MainTable>
      </div>
    </div>
  )
}

export default App
