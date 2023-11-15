import axios from "axios";
import { json } from "stream/consumers";
export  function getMAyFT(IdMIR:string,setMA:Function, setFt:Function, setIdMA:Function, setIdFt:Function){
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api//MA-FT-IdMIR",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
          params: {
            IdMIR:IdMIR
          },
        }
      )
      .then(({data}) => {
        console.log(data);
        
        let auxMA=data.data[0].MA
        let auxFT=data.data[0].FT
        let IdMA = data.data[0].IdMA
        let IdFT = data.data[0].IdFT
        setIdMA(IdMA)
        setIdFt(IdFT)
        setMA(JSON.parse(auxMA))
        setFt(JSON.parse(auxFT))
      }).catch((e)=>{console.log("e",e)});
  };