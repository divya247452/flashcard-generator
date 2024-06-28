import {NavLink, useParams } from "react-router-dom";

// Function that provides navigation links.
function NavLinks() {
    const {param} = useParams();  
    return (
      <nav className="flex border-b-2 pb-[2px]">
        <h2>
        <NavLink to='/' className={`h-full text-lg font-medium text-gray-500 mr-2 pb-1 ${param === '/' ? 'active':''}`}>Create New</NavLink>
        </h2>
        <h2>
        <NavLink to='/MyFlashCard' className={`h-full text-lg font-medium text-gray-500 ml-2 pb-1 ${param === '/MyFlashCard' ? 'active':''}`}>My FlashCard</NavLink>
        </h2>
      </nav>
    );
  }

  export default NavLinks;