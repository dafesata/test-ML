import { useEffect } from "react"
import Navbar from "../../Components/navbar/Navbar"


function Index(){

    useEffect(() => {
        document.title ="Buscador"
    })

    function handleSearch(){
        return null;
     }
 

    return(
        <div className="grayBackgroundIndex">
        <Navbar search="" RequestApi={handleSearch}/>
        </div>
    )
}

export default Index