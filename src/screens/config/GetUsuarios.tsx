import axios from "axios";

export const getAllusers = (state: Function) => {
  // axios
  //   .get(process.env.REACT_APP_APPLICATION_LOGIN +"/api/userapp-detail", {
  //     params: {
  //       IdUsuario: localStorage.getItem("IdUsuario"),
  //       IdApp: localStorage.getItem("IdApp"),
  //     },
  //   //   headers: {
  //   //     Authorization: localStorage.getItem("jwtToken") || "",
  //   //   },
  //   })
  //   .then((r) => {
  //     state(r.data.data);
  //     console.log(r.data.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching data:", error);
  //   });
};
