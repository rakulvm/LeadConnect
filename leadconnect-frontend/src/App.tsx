import { useState } from 'react'
import LeftSideNav from './components/LeftSideNav'
import TopNav from './components/TopNav'
import MainTable from './components/MainTable'

function App() {

  return (

    <div className='flex' >
      <LeftSideNav></LeftSideNav>
      <div className='bg-red w-5/6'>
        <TopNav></TopNav>
        <MainTable></MainTable>
      </div>
    </div>
  )
}

export default App
