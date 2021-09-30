import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import * as CgIcons from 'react-icons/cg';
import * as RiIcons from 'react-icons/ri';
import * as GoIcons from 'react-icons/go';
import UberEatsLogo from '../images/UberEatsLogo.png';
function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <GoIcons.GoThreeBars onClick={showSidebar} />
          </Link>
          {/* <img style={{width:'2%'}} src={UberEatsLogo} alt="Uber Eats"/> */}
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li className="nav-text">
              <Link to='#'>
              <CgIcons.CgProfile/>
              <span>Profile</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to='#'>
              <AiIcons.AiOutlineHome/>
              <span>DashBoard</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to='#'>
              <RiIcons.RiOrderPlayLine/>
              <span>Orders</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to='#'>
                <FaIcons.FaSignOutAlt/>
              <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;