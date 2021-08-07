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
        const { data: response } = axios.get(`https://api.woofics.com/api/data_of_interest`)
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

        const res = axios.post("https://api.woofics.com/api/data_of_interest", {
            label:label,
            value:value
        }).then((res) => {
            if(res){
                GetDot();
                

            }
        }, (error) => {
            
        });   
    }

    function deleteQuote(i){
        const res = axios.delete("https://api.woofics.com/api/data_of_interest/"+i)
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
                    
                        <div class="container">
                            <div id="blog" class="row ">
                                <div class="container-fluid pb-lg-4">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <div className="d-md-flex mb-3">
                                                <h1 className="box-title h1 mb-0 text-center mx-auto">Libro mayor</h1>
                                            </div>
                                            <div class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                        <div className="row mt-4 mx-auto">
                                                            <div className="col-lg-8 col-xlg-9 col-md-12 mx-auto" style={{ display: check === 'true' ? 'block' : 'none' }}>
                                                            <div class="card">
                                                            <div class="card-body">

                                                            <div className="row mt-5">
                                                            <div className="col-md-6 text-center px-2 w-100 p-0">
                                                            <TextField
                                                                    id="standard-textarea"
                                                                    onChange={(e) => setLabel(e.target.value)}
                                                                    label="Label"
                                                                    placeholder="Label"
                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>
                                                            <div className="col-md-6 text-center px-2 w-100 p-0">
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
                                                            <div class="mb-4 mt-4 text-center mx-auto">
                                                                    <div class="col-sm-12 text-center">
                                                                    <button class={`btn text-white mt-2 greenbtn text-white `}  onClick={(e) => sendQuote(e)}>Generar</button>
                                                                    </div>
                                                            </div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12 mb-4 mt-4 w-100 text-center mx-auto" style={{ display: check === 'true' ? 'block' : 'none' }}>
                                                                <div class="col-sm-12 text-center">
                                                                    {/* <button class={`btn text-white greenbtn text-white `}  onClick={() => supplierRental()}>Add</button> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                            </div>
                                           
                                            <div className="table-responsive salman-table-change">
                                                <table  id="for-table-setting" className="table no-wrap" style={{tableLayout:"fixed", width:"100%"}}>
                                                    <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            <th className="border-top-0 text-white text-center">#</th>
                                                            <th className="border-top-0 text-white text-center">Etiqueta</th>
                                                            <th className="border-top-0 text-white text-center">Valor</th>
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
                                                                            <td className="txt-oflo text-center">{returnIndex()}</td>
                                                                            <td className="txt-oflo text-center">{val.label}</td>
                                                                            <td className="txt-oflo text-center">{(val.value)}</td>
                                                                            <td className="txt-oflo text-center "><button  class="btn text-white btn-danger " onClick={(e) => deleteQuote(val.id)}>Borrar</button></td>
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
                                    <div class="col-md-12 gap10"></div>
                                </div>
                            </div>
                        </div>
                    </div>















                </main>
            </div>

           
        </>
    );
}

