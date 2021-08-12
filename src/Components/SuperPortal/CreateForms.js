import React, { useState, useEffect } from "react";
import {useHistory, useParams } from 'react-router-dom'

import axios from 'axios';

import { makeStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import CustomAdminAuth from "../CustomAdminAuth";
import StazBar from './Stazbar'


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));

export default function CreateForms() {
    CustomAdminAuth();
    let history = useHistory();

    const { ford } = useParams()

    const [chargeOne, setchargeOne] = useState()
    const [chargeTwo, setchargeTwo] = useState()
    const [chargeThree, setchargeThree] = useState()
    const [Name, setName] = useState("")
    const [chargefour, setchargefour] = useState("")
    const [start, setstart] = useState("")
    const [end, setend] = useState("")
    const [check, setcheck] = useState('false')
    const [check2, setcheck2] = useState('false')
    const [check3, setcheck3] = useState('false')

    const [valueCharge, setvalueCharge] = useState([]);
    const [paymentPackag, setpaymentPackag] = useState([]);
    const [supplierRenta, setsupplierRenta] = useState([]);
    const [serviceCharge, setserviceCharge] = useState([]);

    function valueCharges() {
        const { data: response } = axios.get(`https://api.woofics.com/api/value_charges`)
            .then((response) => {
                if(response.data[0]==null)
                {
                    setvalueCharge("Sorry no charge data found")
                }
                else{
                    setvalueCharge(response.data[0])
                }
                
                
                
            }, (Error) => {
                
            });
    }


    function paymentPackage() {
        const { data: response } = axios.get(`https://api.woofics.com/api/payment_package`)
            .then((response) => {
                setpaymentPackag(response.data)
                
            }, (Error) => {
                
            });
    }


    function supplierRen() {
        const { data: response } = axios.get(`https://api.woofics.com/api/supplier_rental`)
            .then((response) => {
                if(response.data[0] == null)
                {
                    setsupplierRenta("Sorry no rental data found")
                }
                else{
                    setsupplierRenta(response.data[0])
                }
                
                
            }, (Error) => {
                
            });
    }


    function serviceCharg() {
        const { data: response } = axios.get(`https://api.woofics.com/api/service_provider_charge`)
            .then((response) => {
                if(response.data[0]==null)
                {
                    setserviceCharge("sorry no service data found");
                }
                else
                {
                    setserviceCharge(response.data[0])
                }
                
                
            }, (Error) => {
                
            });
    }

    useEffect(() => {
        if (ford === "value") {
            valueCharges()
        } else if (ford === "supplier") {
            paymentPackage()
        } else if (ford === "rental") {
            supplierRen()
        } else {
            serviceCharg()
        }
    }, [])


    function valCharge() {
        // e.preventDefault();

        const { data: response } = axios.put(`https://api.woofics.com/api/value_charges/${valueCharge.id}`, {
            charge: chargeOne
        })
            .then((response) => {
                valueCharges()
                
            }, (Error) => {
                
            });
    }


    function paymentPack() {
        // e.preventDefault();

        const { data: response } = axios.post(`https://api.woofics.com/api/payment_package`, {
            name: Name,
            charge: chargefour,
            start: start,
            end: end
        })
            .then((response) => {
                paymentPackage()
                
                setName("");
                setchargefour("");
                setstart("");
                setend("")
            }, (Error) => {
                
            });
    }

    function paymentPackDel(id) {
        // e.preventDefault();

        const { data: response } = axios.delete(`https://api.woofics.com/api/payment_package/${id}`)
            .then((response) => {
                paymentPackage()
            }, (Error) => {
                
            });
    }


    function supplierRental() {
        // e.preventDefault();

        const { data: response } = axios.put(`https://api.woofics.com/api/supplier_rental/${supplierRenta.id}`, {
            charge: chargeTwo
        })
            .then((response) => {
                supplierRen()
                
            }, (Error) => {
                
            });
    }


    function serviceCharges() {
        // e.preventDefault();

        const { data: response } = axios.put(`https://api.woofics.com/api/service_provider_charge/${serviceCharge.id}`, {
            charge: chargeThree
        })
            .then((response) => {
                serviceCharg()
                
            }, (Error) => {
                
            });
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
                        <div class="container-fluid">
                            <div class="d-md-flex mb-3">
                                <h3 class=" mb-0 mx-auto text-center">CARGOS</h3>
                            </div> 
                            <div class="row">
                                <div className="text-left col-lg-12 col-xlg-12 col-md-12 mx-auto d-md-block d-none">
                                    <i className="fas fa-chevron-left fa-2x" onClick={() => history.goBack()} style={{ cursor: 'pointer', marginBottom:'10px' }}></i>
                                </div>
                                <div class="col-lg-8 col-xlg-9 col-md-12 mx-auto">
                                    <div class="card">
                                        <div class="card-body">
                                            {ford === "supplier" ? <div class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                <div className="row mt-4">
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            id="standard-textarea"
                                                            label="Name"
                                                            onChange={(e) => setName(e.target.value)}
                                                            placeholder="Add Name"
                                                            multiline
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }} />                                                </div>
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            onChange={(e) => setchargefour(e.target.value)}
                                                            id="standard-number"
                                                            placeholder="Service Charge"
                                                            fullWidth
                                                            label="Charge"
                                                            type="number"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-5">
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            placeholder="Starting Date"
                                                            id="standard-number"
                                                            fullWidth
                                                            label="Start"
                                                            onChange={(e) => setstart(e.target.value)}
                                                            type="number"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            placeholder="Ending Date"
                                                            onChange={(e) => setend(e.target.value)}
                                                            id="standard-number"
                                                            fullWidth 
                                                            label="End"
                                                            type="number"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div class="mb-4 mt-4 text-center mx-auto">
                                                        <div class="col-sm-12 text-center">
                                                            <button class={`btn text-white mt-3 greenbtn text-white `}  onClick={() => paymentPack()}>Agregar</button>
                                                        </div>
                                                    </div>
                                                    <table  id="for-table-setting" class="table table-hover mt-2 text-center">
                                                        <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                            <tr>
                                                                
                                                                <th scope="col " className="text-white" >Nombre</th>
                                                                <th scope="col " className="text-white" >Cargo</th>
                                                                <th scope="col " className="text-white" >Comienzo</th>
                                                                <th scope="col " className="text-white" >Final</th>
                                                                <th scope="col " className="text-white" >Comportamiento</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="data-row">
                                                            {paymentPackag.map((val, i) => {
                                                                return (<>
                                                                    <tr>
                                                                        
                                                                        <td>{val.name}</td>
                                                                        <td>{val.charge}</td>
                                                                        <td>{val.start}</td>
                                                                        <td>{val.end}</td>
                                                                        <td><button class={`btn btn-danger text-white`} onClick={() => paymentPackDel(val.id)}>Borrar </button></td>
                                                                    </tr>
                                                                </>)
                                                            })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div> : ford === "value" ? <div class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                <div className="row mt-4 text-center">
                                                    <div className="col-md-6 text-center mx-auto px-2 w-100 p-0" style={{ display: check === 'true' ? 'block' : 'none' }}>
                                                        <TextField
                                                            id="standard-textarea"
                                                            label="Charges"
                                                            onChange={(e) => setchargeOne(e.target.value)}
                                                            placeholder="Add Charges"
                                                            multiline
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }} />
                                                        <div class="col-sm-12 text-center">
                                                            <button class={`btn text-white mt-2 greenbtn text-white `}  onClick={() => valCharge()}>Agregar</button>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 text-center mx-auto px-2 w-100 p-0">
                                                        <table  id="for-table-setting" class="table table-hover" style={{tableLayout:"fixed"}}>
                                                            <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                                <tr style={{tableLayout:"fixed"}}>
                                                                    
                                                                    <th scope="col" className="text-white">Cargo</th>
                                                                    <th scope="col" className="text-white">Comportamiento</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="data-row">
                                                                <tr>
                                                                    <td>{valueCharge.charge}</td>
                                                                    <td><button class={`btn text-white mr-2 greenbtn text-white `}  onClick={() => setcheck('true')}>Editar</button></td>
                                                                    {/* <button class={`btn btn-danger text-white`} onClick={valueCharges}>Delete </button> */}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                            </div> :
                                                ford === "rental" ?

                                                    <div class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                        <div className="row mt-4 mx-auto">
                                                            <div className="col-md-6 text-center mx-auto px-2 w-100 p-0" style={{ display: check2 === 'true' ? 'block' : 'none' }}>
                                                                <TextField
                                                                    id="standard-textarea"
                                                                    onChange={(e) => setchargeTwo(e.target.value)}
                                                                    label="Charges"
                                                                    placeholder="Add Charges"
                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>
                                                            <div class="col-md-12 mb-4 mt-4 w-100 text-center mx-auto" style={{ display: check2 === 'true' ? 'block' : 'none' }}>
                                                                <div class="col-sm-12 text-center">
                                                                    <button class={`btn text-white greenbtn text-white `}  onClick={() => supplierRental()}>Agregar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 text-center mx-auto px-2 w-100 p-0">
                                                            <table  id="for-table-setting" class="table table-hover" style={{tableLayout:"fixed"}}>
                                                                <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                                    <tr>
                                                                        
                                                                        <th scope="col" className="text-white">Cargo</th>
                                                                        <th scope="col" className="text-white">Comportamiento</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="data-row">
                                                                    <tr>
                                                                        
                                                                        <td>{supplierRenta.charge}</td>
                                                                        <td><button class={`btn text-white mr-2 greenbtn text-white `}  onClick={() => setcheck2('true')}>Editar</button></td> 
                                                                        {/* <button class={`btn btn-danger text-white`} onClick={() => supplierRentalDel(supplierRenta.id)}>Delete </button> */}
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    :

                                                    <div class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                        <div className="row mt-4 mx-auto">
                                                            <div className="col-md-6 text-center mx-auto px-2 w-100 p-0" style={{ display: check3 === 'true' ? 'block' : 'none' }}>
                                                                <TextField
                                                                    id="standard-textarea"
                                                                    label="Charges"
                                                                    onChange={(e) => setchargeThree(e.target.value)}
                                                                    placeholder="Add Charges"
                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>
                                                        </div>
                                                        <div class=" col-md-12 mb-4 mt-4 w-100 text-center mx-auto " style={{ display: check3 === 'true' ? 'block' : 'none' }}>
                                                            <div class="col-sm-12 text-center">
                                                                <button class={`btn text-white greenbtn text-white `}  onClick={serviceCharges}>Agregar</button>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 text-center mx-auto px-2 w-100 p-0">
                                                            <table  id="for-table-setting" class="table table-hover" style={{tableLayout:"fixed"}}>
                                                                <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                                    <tr>
                                                                        
                                                                        <th scope="col" className="text-white">Cargo</th>
                                                                        <th scope="col" className="text-white">Comportamiento</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="data-row">
                                                                    <tr>
                                                                        
                                                                        <td>{serviceCharge.charge}</td>
                                                                        <td><button class={`btn text-white mr-2 greenbtn text-white `}  onClick={() => setcheck3('true')}>Editar</button></td>
                                                                        {/* <button class={`btn btn-danger text-white`} onClick={() => serviceChargesDel(serviceCharge.id)}>Delete </button> */}
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                            }
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

