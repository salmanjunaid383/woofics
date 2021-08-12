import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import StazBar from './Sidebar'
import axios from "axios";

import jwt_decode from "jwt-decode";

import { makeStyles, useTheme } from "@material-ui/core/styles";


import CustomClientAuth from "../CustomClientAuth";
const useStyles = makeStyles((theme) => ({

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  content: {
      flexGrow: 1,
      padding: theme.spacing(0),
  }

}));


export default function YourService() {
  CustomClientAuth();
  let history = useHistory();

  const [form, setForm] = useState([]);
  const [article, setArticle] = useState("");

  var token = localStorage.getItem("user_token");
  var decoded = jwt_decode(token);
  var indexNo = 0;

  function returnIndex(){
    indexNo = indexNo +1;
    return indexNo;
  }

  function Feedback() {
    const res = axios
      .get(`https://api.woofics.com/api/forms/${decoded.sub}`)
      .then(
        (res) => {
          if (res) {
            setForm(res.data);
            
          }
        },
        (error) => {
          
          history.push("/myservice");
        }
      );
  }

  useEffect(() => {
    Feedback();
  }, []);

  function DeleteService(e) {
    var result = window.confirm("Want to delete?");
    if (result) {
      const res = axios
        .delete(`https://api.woofics.com/api/form/${e}`)
        .then(
          (res) => {
            Feedback()
          },
          (error) => {
            
            history.push("/myservice");
          }
        );
    }
  }

  //Sidebaaaaar/..........................
  // const { window } = props;
  const classes = useStyles();


  return (
    <>
      <div className="d-sm-flex">

      <StazBar></StazBar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="page-wrapper bg-light">
            <div class="container">
              <div id="blog" class="row">
                <div class="container-fluid pb-lg-4">
                  <div className="row m-lg-5">
                    <div className="col-md-12 col-lg-12 col-sm-12">
                      <div className="d-md-flex mb-3">
                        <h1 className=" h1 mb-0 text-center mx-auto">
                        Mis servicios
                        </h1>
                      </div>
                      <div className="table-responsive salman-table-change">
                        <table  id="for-table-setting" className="table no-wrap" >
                          <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                            <tr>
                              
                              <th className="border-top-0 text-white text-center">NOMBRE</th>
                              <th className="border-top-0 text-white text-center">DESCRIPCIÓN</th>
                              <th className="border-top-0 text-white text-center">EMPRESA</th>
                              <th className="border-top-0 text-white text-center">COMENTARIOS</th>
                              <th className="border-top-0 text-white text-center">EL TIEMPO DE ENTREGA</th>
                              <th className="border-top-0 text-white text-center">EMAIL</th>
                              <th className="border-top-0 text-white text-center">COMPORTAMIENTO</th>
                            </tr>
                          </thead>
                          <tbody id="data-row">

                            {form == '' ? <tr scope="row"><td colspan="5"><h3 className="my-lg-3 mx-auto ">¡Nada que mostrar! Empiece a crear proyectos...</h3></td> </tr>
                              : form.map((val, id) => {
                                return (
                                  <>
                                    <tr>
                                      
                                      <td className="txt-oflo">{val.name}</td>
                                      <td className="txt-oflo">{val.description}</td>
                                      <td className="txt-oflo">{val.company}</td>
                                      <td className="txt-oflo">{val.comments}</td>
                                      <td className="txt-oflo">{val.delivery_time}</td>
                                      <td className="txt-oflo">{val.email}</td>
                                      <td className="text-danger">   <button
                                        class="btn marginBottom10 greenbtn text-white" 
                                        value={val.id}
                                        onClick={() =>
                                          history.push(
                                            `/allquotation/${val.id}`
                                          )
                                        }
                                      >
                                        Consultar Cotización
                                      </button>
                                        <button
                                          class="btn btn-danger ml-md-2 marginBottom10"
                                          value={val.id}
                                          onClick={() => DeleteService(val.id)}
                                        >
                                          Eliminar Servicio
                                        </button></td>
                                    </tr>
                                  </>
                                )
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 gap10"></div>
              </div>
            </div>
          </div>
        </main>
      </div>

      
    </>
  );
}
