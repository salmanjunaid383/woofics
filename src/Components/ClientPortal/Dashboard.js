import "../ClientPortal/dashboard.css"
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import CustomClientAuth from "../CustomClientAuth";
import { makeStyles } from '@material-ui/core/styles';
import StazBar from './Sidebar';
const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));

export default function Dashboard() {
    CustomClientAuth();
    let history = useHistory();

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    const [todo, setTodo] = useState('');
    const [deadline, setDeadLine] = useState('');
    const [disable, setDisable] = useState('disabled');
    const classes = useStyles();


    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/client_todo`, {
            user_id: decoded.sub,
            task: todo,
            deadline: deadline,
        },{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                if (response) {
                    
                    getTodo();
                    setTodo('');
                    setDeadLine('')
                }
            }, (error) => {
                
                alert('Please Add Todo and Select Date')
            });
    }

    const [data, setData] = useState([])
    function getTodo() {

        const { data: response } = axios.get(`https://api.woofics.com/api/client_todo/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                
                setData(response.data)
            }, (error) => {
                

            });
    }

    useEffect(() => {
        getTodo()
    }, [])


    // DeleteTodo
    function deleteTodo(e) {
        var result = window.confirm("Want to delete?");
        if (result) {
            const { data: response } = axios.delete(`https://api.woofics.com/api/client_todo/${e}`,{
                headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
              })
                .then((response) => {
                    getTodo();
                }, (error) => {
                    

                });
        }
    }
    function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
            }, (Error) => {
                
            });
    }



    //....................DAshbaord API

    //..Total Client
    const [ongoinProject, setOngoinProject] = useState();
    const [CompletedProject, setCompletedProject] = useState();
    const [ClientTotalService, setClientTotalService] = useState();
    const [totalExpense, settotalExpnse] = useState();
    const [PendingReg, setPendingReg] = useState();
    const [TotalComplain, setTotalComplain] = useState();


    function ClientOngoinProject() {
        const { data: response } = axios.get(`https://api.woofics.com/api/ongoing_client_project/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                
                setOngoinProject(response.data)
            }, (Error) => {

                
            });
    }

    //...total ClientCompletedProject

    function ClientCompletedProject() {
        const { data: response } = axios.get(`https://api.woofics.com/api/completed_client_project/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                
                setCompletedProject(response.data)
            }, (Error) => {

                
            });
    }

    //.......Total Provider

    function ClientService() {
        const { data: response } = axios.get(`https://api.woofics.com/api/client_service/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                
                setClientTotalService(response.data)
            }, (Error) => {

                
            });
    }

    function CountExpense() {
        const { data: response } = axios.get(`https://api.woofics.com/api/client_expense/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                
                settotalExpnse(response.data)
            }, (Error) => {

                
            });
    }



    useEffect(() => {
        ClientOngoinProject()
        ClientCompletedProject()
        ClientService()
        //     CountComplain()
        //     PendingRegistration()
        CountExpense()

    }, [])



    const [form, setForm] = useState([]);
    const [rating1, setRating1] = useState(4);
    const [supplier, setSupplier] = useState('');
    const [ddays, setdays] = useState('');


    useEffect(() => {

        function Feedback() {
            const res = axios.get(`https://api.woofics.com/api/client_supplier_project/${decoded.sub}`,{
                headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
              })
                .then((res) => {
                    if (res) {
                        setForm(res.data)
                        setdays(parseInt(res.data.due_date))
                        
                    }
                }, (error) => {
                    
                });

        }
        Feedback();
    }, [])

    return (
        <>

            <div className="d-sm-flex">
                <StazBar></StazBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
                        data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full" style={{ backgroundColor: '#76323f' }}>
                        <div className="page-wrapper">
                            <div className="container-fluid ipad-dashboard">
                            <div className="back-button">
                         <a href="/"><i className="fa fa-angle-left" aria-hidden="true"></i></a>
                         </div>
                                <section id="stats-subtitle">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h1 style={{ fontSize: "27px", marginBottom: "20px", color: "#9b88f6  ", fontWeight: "bold" }}>Panel De Control Del Cliente</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-xl-8">
                                            <div className="container-fluid">
                                                <div className="row" style={{ border: "2px solid #f3f3f3", padding: "10px" }}>
                                                    <div className="col-md-12">
                                                        <h4 style={{ fontSize: "20px", marginTop: "20px", marginBottom: "20px", color: "#223e92" }}>Toda la Informacion</h4>
                                                    </div>
                                                    <div className="col-xl-6 col-md-12">
                                                        <div className="card overflow-hidden" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c2luZXNzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                            <div className="card-content">
                                                                <div className="card-body cleartfix">
                                                                    <div className="media align-items-stretch">
                                                                        <div className="align-self-center">
                                                                            <i className="fa fa-spinner fa-4x text-success  icon-pencil primary font-large-2 mr-2"></i>
                                                                        </div>
                                                                        <div className="media-body ml-md-3">
                                                                            <h4>Proyectos</h4>
                                                                            <span>Proyectos en Marcha</span>
                                                                        </div>
                                                                        <div className="align-self-center">
                                                                            <h1>{ongoinProject}</h1>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 col-md-12">
                                                        <div className="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://eltamayoz.com/images/files/pages/about.jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                            <div className="card-content">
                                                                <div className="card-body cleartfix">
                                                                    <div className="media align-items-stretch">
                                                                        <div className="align-self-center">
                                                                            <i className="fa fa-tasks fa-4x text-danger  icon-speech warning font-large-2 mr-2"></i>
                                                                        </div>
                                                                        <div className="media-body ml-md-3">
                                                                            <h4>Proyectos</h4>
                                                                            <span>Proyectos completados</span>
                                                                        </div>
                                                                        <div className="align-self-center">
                                                                            <h1>{CompletedProject}</h1>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div className="col-xl-6 col-md-12">
                                                        <div className="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://picjumbo.com/wp-content/uploads/woman-checking-her-to-do-list-free-photo-1080x720.jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                            <div className="card-content">
                                                                <div className="card-body cleartfix">
                                                                    <div className="media align-items-stretch">
                                                                        <div className="align-self-center">
                                                                            <i className="fa fa-paste fa-4x text-info  icon-heart danger font-large-2"></i>
                                                                        </div>
                                                                        <div className="media-body ml-md-3">
                                                                            <h4>Servicio Total</h4>
                                                                            <span>Servicio</span>
                                                                        </div>
                                                                        <div className="align-self-center">
                                                                            <h1 className="mr-2">{ClientTotalService}</h1>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 col-md-12">
                                                        <div className="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVzaW5lc3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                            <div className="card-content">
                                                                <div className="card-body cleartfix">
                                                                    <div className="media align-items-stretch">
                                                                        <div className="align-self-center">
                                                                            <i className="fa fa-money fa-4x text-primary  icon-wallet success font-large-2"></i>
                                                                        </div>
                                                                        <div className="media-body ml-md-3" >
                                                                            <h4>Gasto Total</h4>
                                                                            <span>Gastos</span>
                                                                        </div>
                                                                        <div className="align-self-center ml-md-3">
                                                                            <h1 className="mr-2"> $ {totalExpense}</h1>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-4 col-sm-6 col-md-12 col-lg-12 col-12 mx-auto" style={{ border: "2px solid #f3f3f3" }}>
                                        <div className="container mt-1 p-2 rounded mx-auto bg-light">
                                            <div className="row p-lg-4">
                                                <div className="col-lg-12 col-md-12 col-sm-12 " >
                                                    <div className="p-1 h4 text-primary text-center mx-auto display-inline-block" >
                                                        <i className="fa fa-check bg-primary text-white rounded"> </i>
                                                        <bold> Mis Todo-s</bold>
                                                    </div>
                                                </div>
                                                {/* </div>
                                           <div class="row m-1 p-3"> */}
                                                <div className="col-lg-12 col-md-12 col-sm-12  col-11 mx-auto">
                                                    <div className="row rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center" style={{ display: "flex", flexDirection: "column" }}>
                                                        <div className="col">
                                                            <input className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." onChange={(e) => setTodo(e.target.value)} value={todo} />
                                                        </div>
                                                        <div className="col-auto m-0 px-2 d-flex align-items-center">
                                                            <input className="form-control form-control-md border-0 add-todo-input bg-transparent rounded" type="date" placeholder="Add new .." value={deadline} onChange={(e) => setDeadLine(e.target.value)} />
                                                            <i className="fa fa-calendar-times-o my-2 px-1 text-danger btn clear-due-date-button d-none" data-toggle="tooltip" data-placement="bottom" title="Clear Due date"></i>
                                                        </div>
                                                        <div className="col-auto px-0 mx-0 mr-2">
                                                            <button type="button" onClick={Feedback} className={`btn btn-primary ${todo == '' || deadline == '' ? disable : ''}`}>Agregar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-2 mx-4 border-black-25 border-bottom"></div>
                                            <div className="row mx-1 px-5 pb-3 w-80">
                                                <div className="col mx-auto">

                                                    {
                                                        data.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <div className="row px-3 align-items-center todo-item rounded">
                                                                        <div className="col-auto m-1 p-0 d-flex align-items-center">
                                                                        </div>
                                                                        <div className="col px-1 m-1 d-flex align-items-center">
                                                                            <p type="text" className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" readOnly value={val.task} title={val.task} >{val.task}</p>
                                                                            <p type="text" className="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none"  >{val.task}</p>
                                                                        </div>
                                                                        <div className="col-auto m-1 p-0 px-3 mx-auto">
                                                                            <div className="row">
                                                                                <div className="col-auto d-flex align-items-center rounded bg-white border border-warning">
                                                                                    <i className="fa fa-hourglass-2 my-2 px-2 text-warning btn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Due on date"></i>
                                                                                    <h6 className="text my-2 pr-2">{val.deadline}</h6>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-auto m-1 p-0 mx-auto">
                                                                            <div className="row d-flex align-items-center justify-content-end">
                                                                                <h3 className="m-0 p-0 px-2">
                                                                                    <i className="fa fa-trash-o fa-3x   text-danger btn" data-toggle="tooltip" data-placement="bottom" title="Delete todo" onClick={() => deleteTodo(val.id)} style={{ cursor: "pointer", fontSize: 30 }}></i>
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        }).reverse()
                                                    }
                                                </div>
                                            </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="container-fluid ">
                                        <div className="row m-lg-5">
                                            <div className="col-md-12 col-lg-12 col-sm-12 border bg-light">
                                                <div className="d-md-flex mb-3">
                                                    <h1 className=" h1 mb-0 text-center mx-auto">Gestionar Proyectos</h1>
                                                </div>
                                                <hr className="w-50" />
                                                <div className="table-responsive salman-table-change">
                                                    <table id="for-table-setting" className="table no-wrap for-table-setting" >
                                                        <thead id="heading-row" className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                            <tr>
                                                                <th className="border-top-0 text-white text-center">FECHA</th>
                                                                <th className="border-top-0 text-white text-center">PETICIONES</th>
                                                                <th className="border-top-0 text-white text-center">OFERTAS</th>
                                                                <th className="border-top-0 text-white text-center">DÍAS DE ENTREGA</th>
                                                                <th className="border-top-0 text-white text-center">COMPORTAMIENTO</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="data-row" >
                                                            {form == '' ? <tr scope="row"><td colSpan="5"><h3 className="my-lg-3 mx-auto ">¡Nada que mostrar! Empiece a crear proyectos...</h3></td> </tr>
                                                                :
                                                                form.map((val, id) => {
                                                                    return (
                                                                        <>
                                                                            <tr style={{ height: '5rem' }} className="border-bottom">
                                                                                <td className="txt-oflo text-center bold">{val.created_at.slice(0, 10)}</td>
                                                                                <td className="text-oflo text-center bold">{val.description.slice(0, 30)}...</td>
                                                                                <td className="txt-oflo text-center bold">$ {val.price}</td>
                                                                                <td className="txt-oflo text-center bold">{val.delivery_days} Dias</td>
                                                                                <td className="txt-oflo text-center bold">
                                                                                    <button className="btn marginBottom10" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} value={val.id} onClick={() => history.push(`/proyectos_de_clientes/${val.supplier_id}/${val.id}`)} >Más Detalles</button>
                                                                                </td>
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
                                </section>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </>
    );
}

