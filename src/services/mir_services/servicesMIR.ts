import axios from "axios";
import { alertaError } from "../../components/genericComponents/Alertas";

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

  export const getListasLogin = (datos:any,setState:Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_LOGIN + "/api/listas", {
        params: datos,
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setState(r.data.data);
      });
  };

  export const getListasLoginProgramas = (setState:Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/entidades-relacionadas", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setState(r.data.data);
      });
  };

  export const getInstituciones = (setstate: Function) => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/entidades-relacionadas",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          let aux = r.data.data;
          aux.unshift({
            Id: "0",
            Label: "TODOS",
          });
          setstate(r.data.data);
        }
      });
  };

  export const getMIRs = (setState: Function,setAnioFistal:Function, estadomir:string) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-mir", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdEntidad: localStorage.getItem("IdEntidad"),
          Rol: localStorage.getItem("Rol"),
          Estado: estadomir || "TODOS",
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setAnioFistal(r.data.data[0]?.AnioFiscal);

        setState(r.data.data);
      });
  };

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

      }).catch((e)=>{});
  };