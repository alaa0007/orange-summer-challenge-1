import React from 'react'
import './topBar.css'
import { ImExit } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

const TopBar = () => {
  const navigate = useNavigate()


  const handleNavigation = () => {
    navigate('/')
  }
  return (
    <div className='topbar'>
      <div className='topbar-container'>
        <div className='leftside'>
          <span className='logo1'>Ora</span>
          <span className='logo2'>nge</span>
        </div>
        <div className='rightside'>
          <div onClick={handleNavigation}><ImExit className='LeaveBtn'/></div>
        </div>
      </div>
    </div>
  )
}

export default TopBar