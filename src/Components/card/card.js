
import 'bootstrap/dist/css/bootstrap.min.css'
import './card.sass'
import NumberFormat from 'react-number-format';
import logoFreeShipping from './freeShipping.png'
import { Link } from 'react-router-dom';
const { Container, Row, Col } = require("react-bootstrap");


function Card(props){
   
    const total= props.decimal === 0 ? props.price : props.price+","+props.decimal

    return(
        
        <Container className="cardContainer" >
           
            {props.pos > 0 ? <hr/> : ""}
            <Link className="linkDetail" to={"/items/"+props.id} replace>
            <Row >
            <img className="cardImage" src={props.image} alt="img" />
            <Col className="infoContainer" xs={7} >
                <div className="verticalCenter">
                <Row className="priceRow" xs={2} lg={7}>
                    <Col className="textCol">
                        <NumberFormat className="price" value={total} decimalScale={2} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'$'} />
                    </Col>
                    <Col className="textCol wrapper">
                        {props.freeshipping === 1 ?
                            <img className="freeshipping" src={logoFreeShipping} alt="free Shipping"></img>
                        :
                            ""
                        }
                    </Col>
                </Row>
                <Row>
                    <Col className="textCol">
                        <h3 className="title">{props.name}</h3>
                    </Col>
                </Row>

                </div>
            </Col>
            <Col className="infoContainer">
                <div className="verticalCenter">
                        <span className="state">{props.state}</span>
                </div>
            </Col>
            </Row>
            </Link>
        </Container>
       
        
    )
}

export default Card;