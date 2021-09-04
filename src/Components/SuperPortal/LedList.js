import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import StazBar from './Stazbar'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CustomAdminAuth from "../CustomAdminAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function LedList() {
    // CustomAdminAuth();
    let history = useHistory();
    const [blog, setBlog] = useState([]);

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/led`,{
            headers:window.header
          })
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                }
            }, (Error) => {
                
            });

    }

    useEffect(() => {
        GetLed();
    }, [])

    function DeleteLed(e) {
        var result = window.confirm("Want to delete?");
        if (result) {
            const { data: response } = axios.delete(`https://api.woofics.com/api/led/${e}`,{
                headers:window.header
              })
                .then((response) => {
                    GetLed()
                }, (Error) => {
                    
                });
        }
    }
    var returnIndexValue = 0;
    function returnIndex(){
        returnIndexValue = returnIndexValue + 1;
        return returnIndexValue;
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
                        <div class="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div class="col-md-12">
                                    <div className="mr-auto mb-5">
                                        <button className="btn greenbtn text-white float-right" onClick={() => history.push('/led')}>Agregar LED</button>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className=" mb-0 text-center mx-auto text-change">Lista de Led</h3>
                                        </div>
                                        <div className="table-responsive salman-table-change">
                                            <table  id="for-table-setting" className="table no-wrap text-center">
                                                <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        
                                                        <th className="border-top-0  text-white">NOMBRE</th>
                                                        <th className="border-top-0  text-white">FECHA</th>
                                                        <th className="border-top-0  text-white">COMPORTAMIENTO</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="data-row">
                                                    {blog == '' ? <tr scope="row"><td colspan="5"><h3 className="my-lg-3 mx-auto ">¡Nada que mostrar! Empiece a crear proyectos...</h3></td> </tr>
                                                        : blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        
                                                                        <td className="txt-oflo">{val.name}</td>
                                                                        <td className="txt-oflo">{(val.created_at).slice(0, 10)}</td>
                                                                        <td className="text-danger"><Link to={`/updateled/${val.id}`}><button class="btn greenbtn text-white " >Actualización / Detalles</button></Link><button class="btn text-white btn-danger mx-2" onClick={() => DeleteLed(val.id)}>Borrar</button></td>
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
                        </div>
                    </div>
                </main>
            </div>

      
        </>
    );
}

