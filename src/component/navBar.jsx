import { NavLink } from 'react-router-dom';
import "../App.css"
import { useSelector } from 'react-redux';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function NavBar() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return (
        <header className='nav-bar'>
            <h1>BooksPedia</h1>
            <nav>
                <ul className='nav-content-box'>
                    <li className='nav-content'>
                        <NavLink className={({ isActive }) => isActive ? 'nav-active' : 'nav-inactive'} to="/">Books</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'nav-active' : 'nav-inactive'} to="/addbook">Add books</NavLink>
                        {isAuthenticated ? (<NavLink className={({ isActive }) => isActive ? 'nav-active' : 'nav-inactive'} to="/userprofile">Profile
                            <FontAwesomeIcon style={{ marginLeft: ".5rem" }} icon={faUser} />
                        </NavLink>) : (<NavLink to="/userlogin" className={({ isActive }) => isActive ? 'nav-active' : 'nav-inactive'}>Login</NavLink>)}

                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
