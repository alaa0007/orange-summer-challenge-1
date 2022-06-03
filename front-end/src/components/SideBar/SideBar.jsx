import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { RiFolderReduceLine } from 'react-icons/ri'
import './sideBar.css'


const SideBar = () => {
    const [navHover, setNavHover] = useState(null);
    const [role ,setRole] = useState(null)
    
    useEffect(()=> {
    setRole(window.localStorage.getItem('role'));
    console.log(role);
    if(role === "true"){
        setNavHover("users")
    }else{
        setNavHover("items")
    }
    },[role]);

  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <div className="sidebar-menu">
          <h3 className='sidebar-title'>Dashbord</h3>
          <ul className="sidebar-list">
              {
                role === "true" ? (
                    <>
                     <Link to="/home"  className='sidebar-item'> 
                        <li onClick={() => setNavHover("users")} className={ navHover === "users" ? "sidebar-list-item active" : "sidebar-list-item" }>
                            <AiOutlineUser className='sidebar-icon'/> 
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/items" className='sidebar-item'>
                        <li onClick={() => setNavHover("items")} className={ navHover === "items" ? "sidebar-list-item active" : "sidebar-list-item" } >
                            <RiFolderReduceLine className='sidebar-icon'/> 
                            <span>Items</span> 
                        </li>
                    </Link>
                    </>
                 ) : (
                    <>
                         <Link to="/items" className='sidebar-item'>
                            <li onClick={() => setNavHover("items")} className={ navHover === 'items' ? "sidebar-list-item active" : "sidebar-list-item" } >
                            <RiFolderReduceLine className='sidebar-icon'/> 
                            <span>Items</span> 
                            </li>
                        </Link>
                    </>
                 )
              }

          </ul>
        </div>
      </div> 
    </div>
  )
}

export default SideBar