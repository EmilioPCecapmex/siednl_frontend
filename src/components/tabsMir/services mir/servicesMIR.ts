import axios from "axios";
import { alertaError } from "../../alertas/Alertas";

export const getLista = (tabla:string,valorCondicion:string,setState:Function) => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/list-catalogos",
        {
        params:{Tabla:tabla,ValorCondicion:valorCondicion},
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then(({data}) => {

        console.log(`{$tabla}`,data.data);
        setState(data.data)
        
      }).catch(()=>{
        setState([]);
        alertaError("Error al obtener los datos")
    });
  };

export const getListPedColumns = (data:any,setState:Function,fncDisable:Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-ped-columns", {
        params: data,
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then(({data}) => {
        setState(data.data);
      }).catch(()=>fncDisable(true));
  };