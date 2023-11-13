import axios from "axios";
import { json } from "stream/consumers";
export  function getMAyFT(IdMIR:string,setMA:Function, setFt:Function){
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
        let auxMA=data.data[0].MA
        let auxFT=data.data[0].FT
        setMA(JSON.parse(auxMA))
        setFt(JSON.parse(auxFT))
      }).catch((e)=>{console.log("e",e)});
  };