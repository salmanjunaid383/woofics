import React, { useState, useEffect } from "react";
import axios from 'axios';
import StazBar from './Stazbar';
import { makeStyles} from '@material-ui/core/styles';
import CustomAdminAuth from "../CustomAdminAuth";
import {useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));


export default function ViewServices() {
    CustomAdminAuth();
    let history = useHistory();
    const [blog, setBlog] = useState([]);
    const [nextPage,setNextPage]=useState()
    const [prevPage,setPrevPage]=useState();

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/form`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                if (response) {
                    console.log(response)
                    setBlog(response.data.data)
                    setNextPage(response.data.next_page_url)
                    setPrevPage(null)
                    console.log("prev page is"+ response.data.next_page_url)
                console.log("next page is "+ response.data.prev_page_url)
                }
            }, (Error) => {
                console.log(Error)
                
            });

    }

    useEffect(() => {
        GetLed();
    }, [])


    var returnIndexValue = 0;
    function returnIndex(){
        returnIndexValue = returnIndexValue + 1;
        return returnIndexValue;
    }


    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
  


    function goNext(route){
        console.log(route)
        const {data: response}= axios.get(route,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
        }).then((response) => {
            console.log(response.data)
            setBlog(response.data.data)
            setNextPage(response.data.next_page_url)
            
            setPrevPage(response.data.prev_page_url)
        }, error => {
            console.log(error)
        });
        
    }




    // const container = window !== undefined ? () => window().document.body : undefined;




    return (
        <>
            <div className="d-sm-flex">
                <StazBar></StazBar>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper bg-light">
                        <div className="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className=" mb-0 h1 text-center mx-auto">Lista De Servicios</h3>
                                        </div>
                                        <div className="table-responsive salman-table-change">
                                            <table  id="for-table-setting" className="table no-wrap for-table-setting" >
                                                <thead id="heading-row" className="py-3 heading-row" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        
                                                        <th className="border-top-0 text-white text-center text-white">NOMBRE</th>
                                                        <th className="border-top-0 text-white text-center">Paquete</th>
                                                            <th className="border-top-0 text-white text-center">escribe</th>
                                                        <th className="border-top-0 text-white text-center text-white">DESCRIPCIÓN</th>
                                                        
                                                        <th className="border-top-0 text-white text-center text-white">EL TIEMPO DE ENTREGA</th>
                                                        <th className="border-top-0 text-white text-center text-white">EMAIL</th>
                                                        <th className="border-top-0 text-white text-center text-white">COMPORTAMIENTO</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="data-row" className="data-row">

                                                    {blog == '' ? <tr scope="row"><td colSpan="5"><h3 className="my-lg-3 mx-auto ">¡Nada que mostrar! Empiece a crear proyectos...</h3></td> </tr>
                                                        : blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        
                                                                        <td className="txt-oflo">{val.name}</td>
                                                                        <td className="txt-oflo text-center bold">{val.package_name}</td>
                                                                        <td className="txt-oflo text-center bold">{val.buy}</td>
                                                                        <td className="txt-oflo" title={val.description}>{(val.description).slice(0,40)}</td>
                                                                        
                                                                        <td className="txt-oflo">{val.delivery_time}</td>
                                                                        <td className="txt-oflo">{val.email}</td>
                                                                        <td className="text-danger"><button className="btn text-white greenbtn" onClick={() => history.push(`/ver_servicio_más/${val.id}`)}>Ver más</button></td>
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
                            <div className="row" style={{ paddingBottom: "5px",justifyContent:"center",textAlign:'center' }}>
                            {
                                prevPage !== null   ? <>
                                <div className="col-md-6" >
                            
                                     <button className="s-button"  onClick={e => {goNext(prevPage)}}>Previo</button>
                        
                                </div> </> : null
                            }
                            {
                                nextPage !== null  ? <>
                                <div className="col-md-6">
                            
                                <button className="s-button"  onClick={e => {goNext(nextPage)}}>Siguiente</button>
                        
                                </div>
                                
                                </> : null
                            }
                            
                            </div>
                        </div>
                    </div>
                </main>
            </div>





       




        </>
    );
}

