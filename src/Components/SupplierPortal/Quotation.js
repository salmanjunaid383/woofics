import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import SideBar from './Sidebar';
import axios from 'axios';
import "../ClientPortal/quotation.css"
import jwt_decode from 'jwt-decode'


import { makeStyles } from '@material-ui/core/styles';


import CustomSupplierAuth from "../CustomSupplierAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));


export default function Quotation() {
    CustomSupplierAuth();
    let history = useHistory();
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    const [blog, setBlog] = useState([]);
    const [btnStatus,setBtnStatus]=useState(true);
    const [packageInfo,setPackage]=useState([]);
    const [nextPage,setNextPage]=useState()
    const [prevPage,setPrevPage]=useState();
    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/form?page=1`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                if (response) {
                    setBlog(response.data.data)
                    setNextPage(response.data.next_page_url)
                    setPrevPage(null)
                    console.log("prev page is"+ response.data.next_page_url)
                console.log("next page is "+ response.data.prev_page_url)
                    
                }
            }, (Error) => {
                
            });
        cardStatus();
    }, [])

    function cardStatus(){
        const {data: response} = axios.post('https://api.woofics.com/api/link_card/'+decoded.sub,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          }).then((response) => {
            if(response.data === 0){
                alert("Vincula tu cuenta de stripe con woofics. Puede vincular su tarjeta yendo a la sección de perfil haciendo clic en la imagen de perfil");
            }
        }, (Error) => {
            
        })
    }
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


    function purchaseLead(i){
        
        
        
          const {data: response1} = axios.post('https://api.woofics.com/api/link_card/'+decoded.sub,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          }).then((response) => {
            if(response.data === 0){
                alert("Please link your stripe account with woofics. You can link your card by going in to the profile section by clicking on the profile image");
            }
            else{
                const {data : response} = axios.post('https://api.woofics.com/api/purchase_lead', {
                    user_id : decoded.sub,
                    form_id: i
                },{
                    headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
                  })
                .then((response) => {
                    if(response.data===0){
                        const { data: response } = axios.get(`https://api.woofics.com/api/form/`+i,{
                            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
                          })
                            .then((response) => {
                                if (response) {
                                    setPackage(response.data.package)
                                    
                                    if(window.confirm("This package is currently locked you will have to pay "+response.data.package.charge+" € to access it, are you sure ?")){
                                        if(window.confirm("Can u please confirm again?")){
                                            const {data : responseStore} = axios.post("https://api.woofics.com/api/lead" , {
                                                user_id:decoded.sub,
                                                payment_package_id: response.data.package.id,
                                                form_id:i
                                            },{
                                                headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
                                              }).then((response) => {
                                                   
                                                   alert("Payment Successfull");
                                            }, (Error) => {
                                                
                                            })
                                        }
                                    }
                                    else{
                                        
                                    }
                                }
                            }, (Error) => {
                                
                            });
                        
                        
                    }
                    else{
                        const {data : response} = axios.post('https://api.woofics.com/api/check_quotation', {
                                supplier_id : decoded.sub,
                                form_id: i
                            },{
                                headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
                              })
                            .then((response) => {
                                if(response.data===1){
                                    
                                    alert("Cannot bid on the same lead twice");
                                }
                                else{
                                    history.push(`/cita/${i}`)
                                }
                              }, (Error) => {     
                                
                              }); 
                    }
                  }, (Error) => {     
                    
                  });
            }
        }, (Error) => {
            
        })
            
    }
    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
 
    return (
        <>
            <div className="d-sm-flex">

                <SideBar></SideBar>
                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                   <div className="page-wrapper bg-light">
                        <div className="container">
                            <div id="blog" className="row ">
                                <div className="container-fluid pb-lg-4 quotation-ipad">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12 border bg-light " style={{width:"1px"}}>
                                            <div className="d-md-flex mb-3">
                                                <h1 className=" h1 mb-0 text-center mx-auto">Gestionar Solicitudes</h1>
                                            </div>
                                            <hr className="w-50" />
                                            <div className="table-responsive" >
                                                <table  id="for-table-setting" className="table no-wrap for-table-setting" style={{tableLayout:"auto"}}>
                                                    <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            <th className="border-top-0 text-white text-center">FECHA</th>
                                                            <th className="border-top-0 text-white text-center">Paquete</th>
                                                            <th className="border-top-0 text-white text-center">escribe</th>
                                                            <th className="border-top-0 text-white text-center">Descripción</th>
                                                            <th className="border-top-0 text-white text-center">EMAIL</th>
                                                            <th className="border-top-0 text-white text-center">EL TIEMPO DE ENTREGA</th>
                                                            <th className="border-top-0 text-white text-center">NOMBRE DEL COMPRADOR</th>
                                                            <th className="border-top-0 text-white text-center">INSTALACIÓN</th>
                                                            <th className="border-top-0 text-white text-center">MODELO</th>
                                                            <th className="border-top-0 text-white text-center">COMPORTAMIENTO</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="data-row" >
                                                    {blog == '' ? <tr scope="row"><td colSpan="4"><h3 className="my-lg-3 mx-auto ">Nada Que Mostrar!</h3></td> </tr> :
                                               blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr style={{ height: '5rem' }} className="border-bottom">
                                                                        <td className="txt-oflo text-center bold">{val.created_at.slice(0, 10)}</td>
                                                                        <td className="txt-oflo text-center bold">{val.package_name}</td>
                                                                        <td className="txt-oflo text-center bold">{val.buy}</td>
                                                                        <td className="text-oflo text-center bold" title={val.description}>{(val.description).slice(0,40)}</td>
                                                                        <td className="txt-oflo text-center bold">{val.email}</td>
                                                                        <td className="txt-oflo text-center bold">{val.delivery_time}</td>
                                                                        <td className="txt-oflo text-center bold">{val.name}</td>
                                                                        <td className="txt-oflo text-center bold">{val.installation}</td>
                                                                        <td className="txt-oflo text-center bold">{val.model}</td>
                                                                        <td className="txt-oflo text-center bold">
                                                                        {/* { history.push(`/quote/${val.id}`); localStorage.setItem('qid', val.id) }} */}
                                                                            <button className="btn pull-right marginBottom10 greenbtn text-white"  value={val.id} onClick={() => purchaseLead(val.id) } >Cita</button>                                                                    </td>
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


                                <div className="col-md-12 gap10"></div>
                            </div>

                            <div className="row" style={{ paddingBottom: "5px",justifyContent:"center",textAlign:'center' }}>
                            {
                                prevPage !== null   ? <>
                                <div className="col-md-6" >
                            
                                     <button className="s-button"  onClick={e => {goNext(prevPage)}}>Previous</button>
                        
                                </div> </> : null
                            }
                            {
                                nextPage !== null  ? <>
                                <div className="col-md-6">
                            
                                <button className="s-button"  onClick={e => {goNext(nextPage)}}>Next</button>
                        
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

