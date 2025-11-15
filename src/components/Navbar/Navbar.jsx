import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { auth } from '../../firebase/firebase.init';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    });
    return () => unsubscribe;
  }, [])
  const handleLogOut = e => {
    signOut(auth).then(() => {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Signed Out",
        showConfirmButton: false,
        timer: 1200,
      });
    })
  }
  const links = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/all-issues">All Issues</NavLink></li>
    <li><NavLink to="/my-issues">My Issues</NavLink></li>
    <li><NavLink to="/my-contribution">My Contribution</NavLink></li>
    {!user && <li><NavLink to="/login">Login</NavLink></li>}
    {!user && <li><NavLink to="/register">Register</NavLink></li>}
  </>
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {
              links
            }
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Clean Community</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            links
          }
        </ul>
      </div>

      <div className="navbar-end">

        {/* Avatar Dropdown Added Here */}
        <div className="dropdown dropdown-end ml-2">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.photoURL || "https://i.ibb.co/MBtjqXQ/no-user.png"}
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">{user?.displayName}</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={handleLogOut}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default Navbar;