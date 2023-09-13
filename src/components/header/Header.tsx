import './header.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import styled from 'styled-components';


const Botao = styled.button.attrs(() => ({
    className: 'btn btn-danger btn-lg',
}))`
    background-color: var(--vermlar_escuro)
`;

interface HeaderProps {
    email?: string;
}


const Header = (props: HeaderProps) => {

    const [email, setEmail] = useState<string | undefined>('')

    useEffect(() => {
        setEmail(props.email)
    }, [props])

    const handleLogout = () => {
        window.localStorage.clear()
        setEmail(undefined)
        api.defaults.headers.common["Authorization"] = false
    }


    return (
        <header>
            <nav className="navbar navbar-dark navbar-expand-lg ">
                <div className="container-fluid">
                    <img width="45" height="45" src="/logo2.svg" alt="" />

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link border-bottom border-danger ms-2 ms-3" aria-current="page" to={'/'}>Home</Link>

                            </li>

                        </ul>

                        {email ?
                            <>
                                <span className="navbar-nav navbar-item">


                                    <Link className="nav-link border-end border-danger ms-2 pe-3 me-3 fw-bold" aria-current="page" to={`/usuario`}>{email}</Link>
                                </span>
                                <span className="navbar-nav navbar-item">

                                    <Link className="nav-link border-bottom border-danger me-3" aria-current="page" onClick={handleLogout} to={'/'}>Logout</Link>
                                </span>
                            </> :
                            <span className="navbar-nav navbar-item">

                                <Link className="nav-link border-bottom border-danger me-3" aria-current="page" to={'/login'}>Login</Link>
                            </span>
                        }
                    </div>
                </div>
            </nav>
           
        </header >
    );
}

export default Header;