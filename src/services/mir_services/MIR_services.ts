import axios from "axios";
import { json } from "stream/consumers";
export  function getMAyFT(IdMIR:string, setMA:Function, setFt:Function, setRF:Function,  setIdMA:Function, setIdFt:Function, setIdRF:Function ){
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

        console.log("data: ",data.data);
        
        let auxMA=data.data[0].MA
        let auxFT=data.data[0].FT
        let auxRF=data.data[0].RF

        let IdMA = data.data[0].IdMA
        let IdFT = data.data[0].IdFT
        let IdRF = data.data[0].IdRF


        setIdMA(IdMA)
        setIdFt(IdFT)
        setIdRF(IdRF)

        setMA(JSON.parse(auxMA))
        setFt(JSON.parse(auxFT))
        setRF(JSON.parse(auxRF))

      }).catch((e)=>{console.log("e",e)});
  };