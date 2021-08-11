import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import loginside from '../../Images/loginside.jpg'
import axios from 'axios';
import SideBar from './Sidebar';
import StarRatings from 'react-star-ratings';
import jwt_decode from 'jwt-decode';
// import Supppliers from "./Suppliers";

import './countdown.css'
import tick from './tick.png'



import { makeStyles, useTheme } from '@material-ui/core/styles';

import CustomSupplierAuth from "../CustomSupplierAuth";



const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));






export default function SupplierProjects() {
    CustomSupplierAuth();
    let history = useHistory();

    const { sid } = useParams();
    const { uid } = useParams();


    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    const [form, setForm] = useState([]);
    const [rating1, setRating1] = useState(4);
    const [supplier, setSupplier] = useState('');
    const [ddays, setdays] = useState();
    const [completed, setCompleted] = useState('');


   

    useEffect(() => {
        getTodo()
        function Supplierid() {
            const res = axios.get(`https://api.woofics.com/api/users/${sid}`)
                .then((res) => {
                    if (res) {
                        setSupplier(res.data)
                    }
                }, (error) => {
                    
                });

        }
        Supplierid();
        function Feedback() {
            const res = axios.get(`https://api.woofics.com/api/supplier_project/${uid}`)
                .then((res) => {
                    if (res) {
                        setForm(res.data)
                        setdays(res.data.due_date)
                        setCompleted(res.data.status)
                    }
                }, (error) => {
                    
                });

        }
        Feedback();
        const { data: response } = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
        .then((response) => {
            setName(response.data.first_name + " " + response.data.last_name)
        }, (Error) => {
            
        });
    }, [])






    //Chat

    const [name, setName] = useState('');

 


    // const[suser,setaUser] = useState('');
    // const[sname,setaName] = useState('');

    function SendData(user, uname) {
        const { data: response } = axios.post(`https://api.woofics.com/api/associate`, {
            main_user: decoded.sub,
            associate_user: user,
            avatar: 'xyz.jpg',
            associate_name: uname,
            main_name: name
        })
            .then((response) => {
                if (response) {
                    history.push('/chat')
                }
            }, (Error) => {
                
            });
    }

    //Timer


    const [days, setddays] = useState('')
    const [hours, setdhours] = useState('')
    const [minutes, setdminutes] = useState('')
    const [seconds, setdseconds] = useState('')

    let myGreeting = setInterval(() => {
        clearInterval()
        const countdownleft = new Date(ddays).getTime();
        const nowTime = new Date().getTime();
        const left = countdownleft - nowTime;

        setddays(Math.floor(left / (1000 * 60 * 60 * 24)));
        setdhours(Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setdminutes(Math.floor((left % (1000 * 60 * 60)) / (1000 * 60)));
        setdseconds(Math.floor((left % (1000 * 60)) / (1000)));

        // if (left < 0) {
        //     clearInterval(x);
        //     document.getElementById("demo").innerHTML = "EXPIRED";
        // }
        if (left < 0) {
            clearInterval(myGreeting);
            setddays('L');
            setdhours('A');
            setdminutes('T');
            setdseconds('E')
        } else if (completed == 'Completed') {
            clearInterval(myGreeting);
            setddays(0);
            setdhours(0);
            setdminutes(0);
            setdseconds(0)
        }
        clearTimeout(myGreeting)
    }, 1000);



    // Todo
    const [todo, setTodo] = useState("");
    const [deadline, setDeadLine] = useState("");



    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/supplier_project_todo`, {
            supplier_project_id: form.id,
            task: todo,
            deadline: deadline,
            completed: false
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

        const { data: response } = axios.get(`https://api.woofics.com/api/supplier_project_todo/${form.id}`)
            .then((response) => {
                setData(response.data)
            }, (error) => {
                
            });
    }




    // DeleteTodo
    function deleteTodo(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/supplier_project_todo/${e}`)
            .then((response) => {
                getTodo();
            }, (error) => {
                
            });
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
                            <div id="blog" className="row">
                                {form.status == "Completed" ? <div className="container-fluid mt-2">
                                    <div className="row bg-light ">
                                        <div className="col-md-4 text-right d-none d-md-block d-lg-block">
                                            <img className="img-fluid" src={tick} style={{ height: '60px' }} />Pago Hecho
                                        </div>
                                        <div className="col-md-4 text-center d-none d-md-block d-lg-block">
                                            <img className="img-fluid" src={tick} style={{ height: '60px' }} />Pedido Entregado
                                        </div>
                                        <div className="col-md-4 text-left">
                                            <img className="img-fluid" src={tick} style={{ height: '60px' }} />Marca de Pedido Como Completada
                                        </div>
                                    </div>
                                </div> : ''}
                                <div className="container">
                                    <div class="car p-3">
                                        <div className="mx-auto d-flex justify-content-center align-item-center">
                                            <div id="clockdiv" className="mx-auto text-center">
                                                <div className="mx-2"><span>{days}</span><div class="smalltext text-dark mx-2">Dias</div></div>
                                                <div className="mx-2"><span >{hours}</span><div class="smalltext text-dark mx-2">Horas</div></div>
                                                <div className="mx-2"><span >{minutes}</span><div class="smalltext text-dark mx-2">Minutos</div></div>
                                                <div className="mx-2"><span >{seconds}</span><div class="smalltext text-dark mx-2">Segundos</div></div>
                                            </div>
                                        </div>
                                        <div class="card-body pb-5">
                                            <div className="border p-5">
                                                <h4 className="mt-0">
                                                    <img class="card-img-top img-fluid mr-3" style={{ width: '40px' }} src="https://img.pngio.com/avatar-icon-png-105-images-in-collection-page-3-avatarpng-512_512.png" alt="Card image cap" />
                                                    {supplier.first_name + " " + supplier.last_name}
                                                    <span className="ml-2">
                                                        <StarRatings
                                                            starRatedColor='rgb(230, 67, 47)'
                                                            rating={rating1}
                                                            starDimension="15px"
                                                            starSpacing="3px"
                                                        />
                                                    </span>
                                                </h4>
                                                <i className="fa fa-map-marker px-2 mb-4 ml-5 text-muted"> {supplier.location}</i>
                                                <h2 className="float-right">$ {form.price}</h2>
                                                <table  id="for-table-setting" class="table table-hover table table-bordered">
                                                    <tbody id="data-row">
                                                        <tr>
                                                            <th scope="row">Descripción</th>
                                                            <td> {form.description}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Días de Entrega</th>
                                                            <td>{form.delivery_days} Dias</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row" >Estado</th>
                                                            <td className={form.status === 'Completed' ? 'text-success' : 'text-primary'}>{form.status}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Fase de Pago Actual</th>
                                                            <td>{form.current_phase}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Pagada</th>
                                                            <td>{form.paid}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Pago restante </th>
                                                            <td>{form.amount_left}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <button class="btn pull-right marginBottom10 mx-3" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} value={supplier.id} onClick={() => SendData(supplier.id, supplier.first_name + " " + supplier.last_name)}>Chat</button>

                                            </div>
                                            <div class="row m-1 p-4">
                                                <div class="col " >
                                                    <div class="p-1 h1 text-primary text-center mx-auto display-inline-block" >
                                                        <i class="fa fa-check bg-primary text-white rounded p-2"> </i>
                                                        <bold>Gestionar Proyecto</bold>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row m-1 p-3 ">
                                                <div class="col col-11 mx-auto">
                                                    <div class="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                                                        <div class="col">
                                                            <input class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." onChange={(e) => setTodo(e.target.value)} value={todo} />
                                                        </div>
                                                        <div class="col-auto m-0 px-2 d-flex align-items-center">
                                                            <label class="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Fecha de Vencimiento no Establecida</label>
                                                            <input class="form-control form-control-md border-0 add-todo-input bg-transparent rounded" type="date" placeholder="Add new .." onChange={(e) => setDeadLine(e.target.value)} />
                                                            <i class="fa fa-calendar-times-o my-2 px-1 text-danger btn clear-due-date-button d-none" data-toggle="tooltip" data-placement="bottom" title="Clear Due date"></i>
                                                        </div>
                                                        <div class="col-auto px-0 mx-0 mr-2">
                                                            <button type="button" onClick={Feedback} class="btn btn-primary">Agregar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="p-2 mx-4 border-black-25 border-bottom"></div>
                                            <div class="row mx-1 px-5 pb-3 w-80">
                                                <div class="col mx-auto">

                                                    {
                                                        data.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <div class="row px-3 align-items-center todo-item rounded">
                                                                        <div class="col px-1 m-1 d-flex align-items-center">
                                                                            <p type="text" class="form-control form-control-lg border-0 bg-transparent rounded px-3" value={val.task} title={val.task} >{val.task}</p>
                                                                            <p type="text" class="form-control form-control-lg border-0 rounded px-3 d-none" value={val.task} >{val.task}</p>
                                                                        </div>
                                                                        <div class="col-auto m-1 p-0 px-3">
                                                                            <div class="row">
                                                                                <div class="col-auto d-flex align-items-center rounded bg-white border border-warning">
                                                                                    <i class="fa fa-hourglass-2 my-2 px-2 text-warning btn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Due on date"></i>
                                                                                    <h6 class="text my-2 pr-2">{val.deadline}</h6>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-auto m-1 p-0">
                                                                            <div class="row d-flex align-items-center justify-content-end">
                                                                                <h5 class="m-0 p-0 px-2">
                                                                                    <i class="fa fa-trash-o text-danger btn m-0 px-2" data-toggle="tooltip" data-placement="bottom" title="Delete todo" onClick={() => deleteTodo(val.id)}></i>
                                                                                </h5>
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
                                    {/* <div class="container mt-1 p-2 rounded mx-auto bg-light shadow"> */}
                                    {/* </div> */}
                                </div>

                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

    
        </>
    );
}

