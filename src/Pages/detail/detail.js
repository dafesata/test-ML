import { useEffect } from "react"
import Navbar from "../../Components/navbar/Navbar"


function Detail(){

    useEffect(() => {
        document.title ="Detalle"
    })

    return(
        <div className="grayBackground">
        <Navbar search=""/>
        </div>
    )
}

export default Detail