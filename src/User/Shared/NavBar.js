import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Links from '../../Shared/Links';
import { useNavigate } from 'react-router-dom';
import { UserInfoContext } from '../../Context/UserInfoContext';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cartContext } from '../../Context/CartContext';
function NavBar() {
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserInfoContext)
    const {CartItemsCount} = useContext(cartContext)
    const LogOut = () => {
        localStorage.removeItem("userToken")
        navigate("/Login")
        setUser(null)
    }
    return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <div className='d-flex align-items-center'>
                <Navbar.Brand className='d-block d-lg-block'><Links title={"T-Shop"} path={"/"}></Links></Navbar.Brand>
                <div className='position-relative'>
                    {
                        CartItemsCount > 0 
                        ?  <span className='position-absolute rounded-circle bg-danger text-white cartCount d-flex justify-content-center align-items-center'>
                                <span className='fw-bold'>{CartItemsCount}</span>
                            </span>
                        :
                        <></>
                    }
                    <Links path={"/cart"} title={<FontAwesomeIcon icon={faCartShopping} className='fs-4'/>}></Links>
                </div>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto ">
                    <Links title={"categories"} path={"categories"} Style={"text-dark mb-1 mb-lg-0"}></Links>
                    <Links title={"Products"} path={"products"} Style={"text-dark mb-1 mb-lg-0"}></Links>
                </Nav>
                {!user ?
                    <div className='d-flex justify-content-around'>
                        <Links title={"Register"} path={"Register"} Style="btn btn-outline-dark w-100"></Links>
                        <Links title={"Login"} path={"Login"} Style="btn btn-outline-dark w-100 ms-2"></Links>
                    </div>
                :
                    <div className='d-flex'>
                        <button className='btn btn-outline-dark w-100' onClick={LogOut}>Logout</button>
                        <div className='mx-1 w-100'><Links title={"Profile"} path={"profile"} Style="btn btn-outline-dark "></Links></div>
                        <div className='me-1 w-100'><Links title={"Orders"} path={"UserOrders"} Style="btn btn-outline-dark w-100 "></Links></div>
                    </div>
                }
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default NavBar