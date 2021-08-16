import React, { useState } from 'react'
import logo from './logo2x.png'
import logoSearch from './ic_Search.png'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './navbar.sass'
import { useDispatch } from 'react-redux'
import {changeValue} from '../../Reducers/Search/searchSlice'
import { Link, useHistory } from 'react-router-dom'


function Navbar(props){
    const initialValue= props.search !== "" ? props.search : ""
    const [searchValue, setSearchValue] = useState(initialValue)
    const history = useHistory();
    const dispatch = useDispatch();

    function handleSearch(){  
        dispatch(changeValue(searchValue));
        props.RequestApi(searchValue);    
        
    }

    const goToIndex =() => {
      history.push('/')
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        history.push('/items?search='+searchValue)
      }
    }

    return(
      
         <nav className="navBar">
            <img  className="logoNavbar" onClick={goToIndex} src={logo} alt="logo" />
            <Form>
              <label className=' inputsearch'>
                <Form.Control
                  type="search"
                  placeholder="Nunca dejes de buscar"
                  className="mr-2 search marginSearch"
                  aria-label="Search"
                  value = {searchValue}
                  onChange = {(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Link className='logosearch' to={'/items?search='+searchValue}><img  src={logoSearch} alt='logosearch' onClick ={handleSearch} /> </Link>
              </label>
            </Form>
         </nav> 
    )

}

export default Navbar