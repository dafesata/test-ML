import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import "./breadcrumb.sass"

function Breadcrumb(props){
    const [categories, setCategories] = useState('')

    useEffect(()=>{
        if(props.breadcrumb){          
            setCategories(props.breadcrumb)

        }
    },[setCategories,props.breadcrumb])

    return(                
        <Col className="bcCol">            
            <span className="bcText">{categories}</span>
        </Col>
    )
}

export default Breadcrumb;