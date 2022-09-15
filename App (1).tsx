import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import axios  from "axios";

function App() {

  const [users,setUsers] = useState<Array<Usuarios>>([{
    Id:                "",
    EstaActivo:        0,
    Nombre:            "",
    ApellidoPaterno:   "",
    ApellidoMaterno:   "",
    NombreUsuario:     "",
    CorreoElectronico: "",
    CreadoPor:         "",
    ModificadoPor: "",
  }])

  const [usersFiltered,setUsersFiltered] = useState<Array<Usuarios>>([{
    Id:                "",
    EstaActivo:        0,
    Nombre:            "",
    ApellidoPaterno:   "",
    ApellidoMaterno:   "",
    NombreUsuario:     "",
    CorreoElectronico: "",
    CreadoPor:         "",
    ModificadoPor: "",
  }])

  const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVVc3VhcmlvIjoiRW1wZXJleiIsIklkVXN1YXJpbyI6IjNkNDcyYTdhLTMwODctMTFlZC1hZWQwLTA0MDMwMDAwMDAwMCIsImlhdCI6MTY2MzI1NTE1NCwiZXhwIjoxNjYzMjU3ODU0fQ.Xi0iehHUl1SsvVdOLyDUQHRkQjmOSu9DjVjmZQTsHq4'

  const getUsers = () => {
   axios.delete('http://10.200.4.105:5000/api/users',{ headers: {
      'Authorization': jwt,
      'Content-Type': 'application/json'
    }}).then((response) => {
      setUsers(response.data.data)
      setUsersFiltered(response.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const dataFilter = (text: string) => {
    setUsersFiltered(users.filter( x => x.Nombre.toLowerCase().includes(text)))
  }

  useEffect(() => {
    getUsers()
  }, [])
  

  return (
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: 'column'
      }}
    >
      <input onChange={(v) => dataFilter(v.target.value)}></input>
      {usersFiltered.map((item) => {
        return (
          <div key={item.Id}>Nombre: {item.Nombre}</div>
        )
      })}

    </div>
  );
}

export default App;


export interface Usuarios {
  Id:                string;
  EstaActivo:        number;
  Nombre:            string;
  ApellidoPaterno:   string;
  ApellidoMaterno:   string;
  NombreUsuario:     string;
  CorreoElectronico: string;
  CreadoPor:         string;
  ModificadoPor:     string;
}
