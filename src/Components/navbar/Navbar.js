import React, { useState } from 'react'
import logo from './logo2x.png'
import logoSearch from './ic_Search.png'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './navbar.sass'
import { useDispatch } from 'react-redux'
import {changeValue} from '../../Reducers/Search/searchSlice'
import { Link } from 'react-router-dom'


function Navbar(paramValue){
    const initialValue= paramValue.search !== "" ? paramValue.search : ""
    const [searchValue, setSearchValue] = useState(initialValue)
    const dispatch = useDispatch();

    function handleSearch(){
        
        dispatch(changeValue(searchValue))
        
    }

    return(
      
         <nav className="navBar">
            <img  className="logoNavbar" src={logo} alt="logo" />
            <Form>
              <label className=' inputsearch'>
                <Form.Control
                  type="search"
                  placeholder="Nunca dejes de buscar"
                  className="mr-2 search marginSearch"
                  aria-label="Search"
                  value = {searchValue}
                  onChange = {(e) => setSearchValue(e.target.value)}
                />
                <Link className='logosearch' to={'/items?search='+searchValue}><img  src={logoSearch} alt='logosearch' onClick ={handleSearch} /> </Link>
              </label>
            </Form>
         </nav> 
    )

}

export default Navbar