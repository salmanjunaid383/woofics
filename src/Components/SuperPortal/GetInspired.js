import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import StazBar from './Stazbar'
import CustomAdminAuth from "../CustomAdminAuth";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));




export default function GetInspired() {
    CustomAdminAuth();
    let history = useHistory();
    const [blog, setBlog] = useState([]);

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/get_inspired`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                if (response) {
                    
                    setBlog(response.data)
                }
            }, (Error) => {

                
            });

    }
    var returnIndexValue = 0;
    function returnIndex(){
        returnIndexValue = returnIndexValue + 1;
        return returnIndexValue;
    }

    useEffect(() => {
        GetLed();
    }, [])

    function DeleteImg(e) {
        var result = window.confirm("Want to delete?");
        if (result) {

            const { data: response } = axios.delete(`https://api.woofics.com/api/get_inspired/${e}`,{
                headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
              })
                .then((response) => {
                    GetLed()
                }, (Error) => {
                    
                });
        }
    }



    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();


    return (
        <>
            <div className="d-sm-flex">
                {/* <CssBaseline /> */}

                <StazBar></StazBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper bg-light">
                        <div className="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div className="col-md-12 ">
                                    <div className="mr-auto">
                                        <a className="btn pull-right mb-3 greenbtn text-white "  onClick={() => history.push('/createimg')}>Crear</a>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className=" mb-0 h1 mx-auto text-center ">Lista De Im??genes</h3>
                                        </div>
                                        <div className="table-responsive salman-table-change">
                                            <table  id="for-table-setting" className="table no-wrap text-center">
                                                <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        
                                                        <th className="border-top-0 text-white">NOMBRE DE LA IM??GEN</th>
                                                        <th className="border-top-0 text-white">ENLACE DE IM??GEN</th>
                                                        <th className="border-top-0 text-white">CATEGORIA DE IMAGEN</th>
                                                        <th className="border-top-0 text-white">COMPORTAMIENTO</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="data-row">
                                                    {blog == '' ? <tr scope="row"><td colSpan="5"><h3 className="my-lg-3 mx-auto ">??Nada que mostrar! Empiece a crear...</h3></td> </tr>
                                                        : blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        
                                                                        <td className="txt-oflo">{val.name}</td>
                                                                        <td className="txt-oflo">{(val.url).slice(0, 20)}</td>
                                                                        <td className="txt-oflo">{val.category}</td>
                                                                        <td className="text-danger"><button className="btn text-white greenbtn text-white "><a href={val.url} className="text-white" target="_blank" rel="noreferrer">Ver imagen</a></button><button className="btn text-white btn-danger mx-2" onClick={() => DeleteImg(val.id)}>Borrar</button></td>
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

