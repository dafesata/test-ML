import { useEffect } from "react"
import Navbar from "../../Components/navbar/Navbar"


function Index(){

    useEffect(() => {
        document.title ="Buscador"
    })

    return(
        <div className="grayBackground">
        <Navbar search=""/>
        </div>
    )
}

export default Index