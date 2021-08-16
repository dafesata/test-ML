import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../Components/breadcrumb/breadcrumb";
import Navbar from "../../Components/navbar/Navbar"
import './detail.sass'


function Detail(){
    const { id } = useParams();
    const [response,setResponse] = useState({});
    const [total,setTotal]= useState(0);
     
    const handleSearchDetails = useCallback(
        (id) => {
            axios.get('http://localhost:5000/api/items/'+id).then( res =>{
                setResponse(res.data);
                setTotal(res.data.item.price.decimals === 0 ? res.data.item.price.amount+",00" : res.data.item.price.amount+","+res.data.item.price.decimals)
            })
        },
        [],
      );

      const handleSearch = useCallback(
        (param) => {
           
        },
        [],
      );

     useEffect(() => {
        document.title ="Detalle";
        handleSearchDetails(id);
        
    },[handleSearchDetails,id])

  
 
    return(
        <div className="grayBackground">
            <Navbar search="" RequestApi={handleSearch}/>
            {response.item ? 
            <Container className="bcContainer">
                <Row className="justify-content-md-center">
                    <Breadcrumb breadcrumb = {response.breadcrumb ? response.breadcrumb.join(" > "): ""} />
                </Row>
                <Container className="productContainer">
                    <Row className="justify-content-md-center">
                        <Col xs={9}>   
                            <img className="productImage" src={response.item.picture} alt="productImg"></img>
                        </Col>
                        <Col className="informationCol">
                            <Row>
                                <span className="conditionText">{response.item.condition} - {response.item.sold_quantity} vendidos</span>
                            </Row>
                            <Row>
                                <span className="titleText">{response.item.title}</span>
                            </Row>
                            <Row>
                                <NumberFormat className="priceText" value={total} decimalScale={2} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'$'}
                                renderText={(value,props)=><div {...props}>{value.split(',')[0]} <span className="decimalText">{value.split(',')[1]} </span></div>} />
                            </Row>
                            <Row>
                                <Button variant="primary">Comprar</Button>
                            </Row>                        
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center removeMargin">
                        <Col className="descriptionCol">
                            <Row  xs={9}>
                                <span className="descTitleText">
                                    Descripción del Producto
                                </span>
                            </Row>
                            <Row  >
                                <Col className="removePadding removeMargin" xs={8}>
                                    <span className="descText">
                                        {response.item.description}
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                
            </Container>
            : ''}
        </div>
    )
}

export default Detail