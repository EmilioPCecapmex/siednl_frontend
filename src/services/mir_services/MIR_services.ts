import axios from "axios";
export  function getMAyFT(IdMIR:string){
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
      .then((r) => {
       console.log("r",r);
       
      }).catch((e)=>{console.log("e",e)});
  };