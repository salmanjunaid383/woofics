import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import StazBar from './Sidebar';
import axios from 'axios';

import StarRatings from 'react-star-ratings';
import jwt_decode from 'jwt-decode';

import './countdown.css'




import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import tick from './tick.png'


import CustomClientAuth from "../CustomClientAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));





export default function Project() {
    CustomClientAuth();
    let history = useHistory();

    const { sid } = useParams();
    const { uid } = useParams();


    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    const [form, setForm] = useState([]);
    const [rating1, setRating1] = useState(4);
    const [supplier, setSupplier] = useState('');
    const [ddays, setdays] = useState();
    const [quoteid, setQuoteid] = useState('');
    const [completed, setCompleted] = useState('');
    // const[projectComplete,setprojectComplete] = useState('');
    const[mounted,isMounted]=useState(false);


    const [days, setddays] = useState('')
    const [hours, setdhours] = useState('')
    const [minutes, setdminutes] = useState('')
    const [seconds, setdseconds] = useState('')

    const myGreeting =() => {
       
        const countdownleft = new Date(ddays).getTime();
        const nowTime = new Date().getTime();
        const left = countdownleft - nowTime;

        setddays(Math.floor(left / (1000 * 60 * 60 * 24)));
        setdhours(Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setdminutes(Math.floor((left % (1000 * 60 * 60)) / (1000 * 60)));
        setdseconds(Math.floor((left % (1000 * 60)) / (1000)));

        if (left < 0) {
            
            setddays('L');
            setdhours('A');
            setdminutes('T');
            setdseconds('E')
        } else if (completed === 'Completed') {
            
            setddays(0);
            setdhours(0);
            setdminutes(0);
            setdseconds(0)
        }
     
    }


    useEffect(() => {
        if(!mounted)
        {
            function Feedback() {
                const res = axios.get(`https://api.woofics.com/api/supplier_project/${uid}`)
                    .then((res) => {
                        if (res) {
                            setForm(res.data)
                            
                            setdays(res.data.due_date)
                            setQuoteid(res.data.supplier_quotation_id)
                            setCompleted(res.data.status)
                        }
                    }, (error) => {
                        
                    });
    
            }
            Feedback();
            function Supplierid() {
                const res = axios.get(`https://api.woofics.com/api/users/${sid}`)
                    .then((res) => {
                        if (res) {
                            setSupplier(res.data)
                        }
                    }, (error) => {
                        
                        // history.push('/allquotation');
                    });
    
            }
            Supplierid();
            const { data: response } = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((response) => {
                setName(response.data.first_name + " " + response.data.last_name)
            }, (Error) => {
                
            });
            getTodo()
        }
        return () => {
            isMounted(true);
        }

    }, [])

    useEffect(() => {
        const timer = setInterval(() => {myGreeting()},1000)
        return () => clearInterval(timer);
    },[])




    //Stripe

    async function Stripe(iid) {
        // const stripePromise = loadStripe("pk_test_51IIWuIApAAjWKIoNrjwEcTyuCykDQVAqXWIBpwsNt1trDbRXD9n6uKPRvZlDKdQLNyIRiKaSAwpPgbUAjhEkqOJ400HEEcjDh1");
        // e.preventDefault();
        // const stripe = await stripePromise;
        // const { data: response } = axios.post(`https://api.woofics.com/api/stripe`, {
        //     currency: 'usd',
        //     quantity: 1,
        //     name: 'Items',
        //     description: 'All Items',
        //     quotation_id: quoteid,
        //     coupon_code: -1
        // })
        //     .then((response) => {
        //         stripe.redirectToCheckout({
        //             sessionId: response.data.session_id,
        //         });
        //     }, (Error) => {
        //         
        //     });

        var result = window.confirm("Do you want to mark this project as completed?");
        if (result) {
            const { data: response } = axios.put(`https://api.woofics.com/api/project_completed/${iid}`)
                .then((response) => {
                    alert("Project completed!")
                    Feedback()
                }, (Error) => {
                    
                });
        }
    }



    //Chat

    const [name, setName] = useState('');




    // const[suser,setaUser] = useState('');

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






    // Todo
    const [todo, setTodo] = useState("");
    const [deadline, setDeadLine] = useState('');



    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/client_project_todo`, {
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

        const { data: response } = axios.get(`https://api.woofics.com/api/client_project_todo`)
            .then((response) => {
                setData(response.data)
            }, (error) => {
                
            });
    }




    // DeleteTodo
    function deleteTodo(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/client_project_todo/${e}`)
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
                <StazBar></StazBar>

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
                                                    <br />
                                                </h4>
                                                <h2 className="float-right">$ {form.price}</h2>
                                                {/* <i className="fa fa-map-marker px-2 mb-4 text-muted"> {supplier.location}</i> */}
                                                <table  id="for-table-setting" class="table table-hover table table-bordered">
                                                    <tbody id="data-row">
                                                        <tr>
                                                            <th scope="row">Descripción</th>
                                                            <td> {form.description}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Días de Entrega</th>
                                                            <td>{form.delivery_days}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Estado</th>
                                                            <td className={form.status === 'Completed' ? 'text-success' : 'text-primary'}>{form.status}</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                                {form.status == "Completed" ? <button class="btn pull-right marginBottom10 mx-3" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} onClick={(e) => history.push(`/feedback/${supplier.id}`)} >Realimentación</button> : <button class="btn pull-right marginBottom10 mx-3" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} onClick={(e) => Stripe(form.id)} >Marcar Como Completa</button>}
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
                                                            <label class="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Fecha de vencimiento no establecida</label>
                                                            <input class="form-control form-control-md border-0 add-todo-input bg-transparent rounded" type="date" placeholder="Add new .." onChange={(e) => setDeadLine(e.target.value)} value={deadline} />
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
                                                                                    <i class="fa fa-trash-o text-danger btn m-0 px-3" data-toggle="tooltip" data-placement="bottom" title="Delete todo" onClick={() => deleteTodo(val.id)} style={{ cursor: 'pointer', fontSize: 30 }}></i>
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

