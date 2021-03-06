import React, { useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import StazBar from "./Stazbar";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import CustomAdminAuth from "../CustomAdminAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function DataofInt() {
    CustomAdminAuth();
    const history = useHistory()
    const classes = useStyles();
    const [check,setCheck]=useState('true');


    const [label,setLabel]=useState('');
    const [value,setValue]=useState('');

    const [dot,getDot]=useState('');


    function GetDot(){
        const { data: response } = axios.get(`https://api.woofics.com/api/slogun`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                getDot(response.data);
                
            }, (Error) => {
                
            });
    }
    useEffect(() => {
        GetDot();
    }, [])

    function sendQuote(e) {
        e.preventDefault();

        const res = axios.post("https://api.woofics.com/api/slogun", {
            slogun:value
        },{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          }).then((res) => {
            if(res){
                GetDot();
                

            }
        }, (error) => {
            
        });   
    }

    function deleteQuote(i){
        const res = axios.delete("https://api.woofics.com/api/slogun/"+i,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
                .then((res) => {
                    GetDot();
                }, (error) => {
                    
                });
    }
    var index =0;
    function returnIndex()
    {
        index = index +1;
        return index;
    }



   

   

    return (
        <>

            <div className="d-sm-flex">
               <StazBar></StazBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    


                    <div className="page-wrapper bg-light">
                    
                        <div className="container">
                            <div id="blog" className="row ">
                                <div className="container-fluid pb-lg-4">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <div className="d-md-flex mb-3">
                                                <h1 className=" h1 mb-0 text-center mx-auto">Woofics Description</h1>
                                            </div>
                                            <div className="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                        <div className="row mt-4 mx-auto">
                                                            <div className="col-lg-8 col-xlg-9 col-md-12 mx-auto" style={{ display: check === 'true' ? 'block' : 'none' }}>
                                                            <div className="card">
                                                            <div className="card-body">

                                                            <div className="row mt-5">
                                                            
                                                            <div className="col-md-12 text-center px-2 w-100 p-0">
                                                            <TextField
                                                                    id="standard-textarea"
                                                                    onChange={(e) => setValue(e.target.value)}
                                                                    label="Value"
                                                                    placeholder="Value"
                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>
                                                                    
                                                                    
                                                            </div>
                                                            <div className="mb-4 mt-4 text-center mx-auto">
                                                                    <div className="col-sm-12 text-center">
                                                                    <button className={`btn text-white mt-2 greenbtn text-white `}  onClick={(e) => sendQuote(e)}>Generar</button>
                                                                    </div>
                                                            </div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 mb-4 mt-4 w-100 text-center mx-auto" style={{ display: check === 'true' ? 'block' : 'none' }}>
                                                                <div className="col-sm-12 text-center">
                                                                    {/* <button class={`btn text-white greenbtn text-white `}  onClick={() => supplierRental()}>Add</button> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                            </div>
                                           
                                            <div className="table-responsive salman-table-change">
                                                <table  id="for-table-setting" className="table no-wrap" style={{tableLayout:"fixed", width:"100%"}}>
                                                    <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            
                                                            <th className="border-top-0 text-white text-center">Id</th>
                                                            <th className="border-top-0 text-white text-center">text</th>
                                                            <th className="border-top-0 text-white text-center"></th> 
                                                        </tr>
                                                    </thead>
                                                    <tbody id="data-row">
                                                    {

                                                        dot == '' ? <h3 className="mt-5"> Nada Que Mostrar!</h3> :
                                                            dot.map((val, id) => {
                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            
                                                                            <td className="txt-oflo text-center">{val.id}</td>
                                                                            <td className="txt-oflo text-center">{(val.slogun.slice(0, 50))}</td>
                                                                            <td className="txt-oflo text-center "><button  className="btn text-white btn-danger " onClick={(e) => deleteQuote(val.id)}>Borrar</button></td>
                                                                            {/* <td className="text-success text-center"></td> */}
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })             
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 gap10"></div>
                                </div>
                            </div>
                        </div>
                    </div>















                </main>
            </div>

           
        </>
    );
}

