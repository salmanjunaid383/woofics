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
        const { data: response } = axios.get(`https://api.woofics.com/api/get_inspired`)
            .then((response) => {
                if (response) {
                    console.log(response.data)
                    setBlog(response.data)
                }
            }, (Error) => {

                console.log(Error);
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

            const { data: response } = axios.delete(`https://api.woofics.com/api/get_inspired/${e}`)
                .then((response) => {
                    GetLed()
                }, (Error) => {
                    console.log(Error);
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
                        <div class="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div class="col-md-12 ">
                                    <div className="mr-auto">
                                        <a class="btn pull-right mb-3 greenbtn text-white "  onClick={() => history.push('/createimg')}>Crear</a>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className="box-title mb-0 h1 mx-auto text-center ">Lista De Imágenes</h3>
                                        </div>
                                        <div className="table-responsive">
                                            <table  id="for-table-setting" className="table no-wrap text-center">
                                                <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        <th className="border-top-0 text-white">#</th>
                                                        <th className="border-top-0 text-white">NOMBRE DE LA IMÁGEN</th>
                                                        <th className="border-top-0 text-white">ENLACE DE IMÁGEN</th>
                                                        <th className="border-top-0 text-white">CATEGORIA DE IMAGEN</th>
                                                        <th className="border-top-0 text-white">COMPORTAMIENTO</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="data-row">
                                                    {blog == '' ? <tr scope="row"><td colspan="5"><h3 className="my-lg-3 mx-auto ">¡Nada que mostrar! Empiece a crear...</h3></td> </tr>
                                                        : blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>{returnIndex()}</td>
                                                                        <td className="txt-oflo">{val.name}</td>
                                                                        <td className="txt-oflo">{(val.url).slice(0, 20)}</td>
                                                                        <td className="txt-oflo">{val.category}</td>
                                                                        <td className="text-danger"><button class="btn text-white greenbtn text-white "><a href={val.url} className="text-white" target="_blank">Ver imagen</a></button><button class="btn text-white btn-danger mx-2" onClick={() => DeleteImg(val.id)}>Borrar</button></td>
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

