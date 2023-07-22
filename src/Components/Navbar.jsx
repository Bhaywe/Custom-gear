import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div >
            <div >
                <NavLink to="/" > React JS Crud</NavLink> <br/>
                <NavLink to="/all" > All Users</NavLink> <br/>
                <NavLink to="/add" > Add Users</NavLink> <br/>
            </div>
        </div>
    )
}

export default Navbar;