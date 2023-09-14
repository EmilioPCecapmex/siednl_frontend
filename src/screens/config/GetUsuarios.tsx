import axios from "axios";

// export const getAllusers = (state: Function) => {
//   axios
//     .get("http://10.200.4.200:5000/api/userapp-detail", {
//       params: {
//         IdUsuario: localStorage.getItem("IdUsuario"),
//         IdApp: localStorage.getItem("IdApp"),
//       },
//     //   headers: {
//     //     Authorization: localStorage.getItem("jwtToken") || "",
//     //   },
//     })
//     .then((r) => {
//       state(r.data.data);
//       console.log(r.data.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// };
