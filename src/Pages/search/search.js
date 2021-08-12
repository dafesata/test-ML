import { useEffect } from "react"
import { useLocation } from "react-router-dom";
 import Navbar from "../../Components/navbar/Navbar"


function Search(){
    let query =new URLSearchParams(useLocation().search);
    useEffect(() => {
        document.title ="Resultados"
    })
  

    return(
        <div className="grayBackground">
        <Navbar search={query.get("search")}/>
        </div>
    )
}

export default Search