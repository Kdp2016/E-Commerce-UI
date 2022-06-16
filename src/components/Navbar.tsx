import React, { Children } from 'react';

const Navbar = () => {
    const path = window.location.pathname
    return (
        <nav className='nav'>
            <a href='/' className='site-title'>Site Name</a>
            <ul>
                    <a href="/register">Register</a>
                    <a href="/login">Login</a>
            </ul>
        </nav>
    );

  }
  export default Navbar;