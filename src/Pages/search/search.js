import { useCallback, useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap";
import {  useLocation } from "react-router-dom";
import Navbar from "../../Components/navbar/Navbar"
import Card from "../../Components/card/card"
import axios from 'axios';
import './search.sass'
import Breadcrumb from "../../Components/breadcrumb/breadcrumb";


function Search(){
    const queryParams =new URLSearchParams(useLocation().search);

    const param= queryParams.get("search")
    const [response,setResponse] = useState({});
   
    const handleSearch = useCallback(
        (param) => {
            axios.get('http://localhost:5000/api/items?q='+param).then( res =>{
                setResponse(res.data);
            })
        },
        [],
      );

    useEffect(() => {
        document.title ="Resultados";
       return handleSearch(param);
       
        
    },[handleSearch,param])

    return(
        <div className="grayBackground">
        
        <Navbar search={queryParams.get("search")} RequestApi={handleSearch}/>
        <Container className="bcContainer">
            <Row className="justify-content-md-center">
                <Breadcrumb breadcrumb = {response.breadcrumb ? response.breadcrumb.join(" > "): ""} />
            </Row>
        </Container>        
        <Container>            
            <Row md={1} className="justify-content-md-center">
                {response.items ?
                        response.items.map((item,index) =>                         
                            
                                <Card key={index} id={item.id} pos={index} name={item.title} price={item.price.amount} decimal={item.price.decimals} freeshipping={item.free_shipping ? 1: 0} state={item.state} image={item.picture} ></Card>
                            
                        )
                    : ''
                }
            </Row>
        </Container>
        </div>
    )
}

export default Search