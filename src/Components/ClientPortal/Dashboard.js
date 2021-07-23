import "../ClientPortal/dashboard.css"
import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import CustomClientAuth from "../CustomClientAuth";
import { makeStyles} from '@material-ui/core/styles';
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
        })
            .then((response) => {
                if (response) {
                    console.log(response)
                    getTodo();
                    setTodo('');
                    setDeadLine('')
                }
            }, (error) => {
                console.log(Error);
                alert('Please Add Todo and Select Date')
            });
    }

    const [data, setData] = useState([])
    function getTodo() {

        const { data: response } = axios.get(`https://api.woofics.com/api/client_todo/${decoded.sub}`)
            .then((response) => {
                console.log(response)
                setData(response.data)
            }, (error) => {
                console.log(Error);
                 
            });
    }

    useEffect(() => {
        getTodo()
    }, [])


    // DeleteTodo
    function deleteTodo(e) {
        var result = window.confirm("Want to delete?");
        if (result) {
            const { data: response } = axios.delete(`https://api.woofics.com/api/client_todo/${e}`)
                .then((response) => {
                    getTodo();
                }, (error) => {
                    console.log(Error);
                     
                });
        }
    }
   function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`)
                .then((response) => {
                }, (Error) => {
                        console.log(Error);
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
        const { data: response } = axios.get(`https://api.woofics.com/api/ongoing_client_project/${decoded.sub}`)
            .then((response) => {
                console.log(response.data)
                setOngoinProject(response.data)
            }, (Error) => {
                 
                console.log(Error);
            });
    }

    //...total ClientCompletedProject

    function ClientCompletedProject() {
        const { data: response } = axios.get(`https://api.woofics.com/api/completed_client_project/${decoded.sub}`)
            .then((response) => {
                console.log(response.data)
                setCompletedProject(response.data)
            }, (Error) => {
                 
                console.log(Error);
            });
    }

    //.......Total Provider

    function ClientService() {
        const { data: response } = axios.get(`https://api.woofics.com/api/client_service/${decoded.sub}`)
            .then((response) => {
                console.log(response.data)
                setClientTotalService(response.data)
            }, (Error) => {
                 
                console.log(Error);
            });
    }

    function CountExpense() {
        const { data: response } = axios.get(`https://api.woofics.com/api/client_expense/${decoded.sub}`)
            .then((response) => {
                console.log(response.data)
                settotalExpnse(response.data)
            }, (Error) => {
                 
                console.log(Error);
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
            const res = axios.get(`https://api.woofics.com/api/client_supplier_project/${decoded.sub}`)
                .then((res) => {
                    if (res) {
                        setForm(res.data)
                        setdays(parseInt(res.data.due_date))
                        console.log(res.data)
                    }
                }, (error) => {
                    console.log(Error);
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
               <div className="page-wrapper bg-light">
                    <div class="grey-bg container-fluid ipad-dashboard">
                        <section id="stats-subtitle">
                            <div class="row">
                                <div class="col-xl-6 col-md-12">
                                    <div class="card overflow-hidden"  style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c2luZXNzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                        <div class="card-content">
                                            <div class="card-body cleartfix">
                                                <div class="media align-items-stretch">
                                                    <div class="align-self-center">
                                                        <i class="fa fa-spinner fa-4x text-success  icon-pencil primary font-large-2 mr-2"></i>
                                                    </div>
                                                    <div class="media-body ml-md-3">
                                                        <h4>Projects</h4>
                                                        <span>Ongoing Projects</span>
                                                    </div>
                                                    <div class="align-self-center">
                                                        <h1>{ongoinProject}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-6 col-md-12">
                                    <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://eltamayoz.com/images/files/pages/about.jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                        <div class="card-content">
                                            <div class="card-body cleartfix">
                                                <div class="media align-items-stretch">
                                                    <div class="align-self-center">
                                                        <i class="fa fa-tasks fa-4x text-danger  icon-speech warning font-large-2 mr-2"></i>
                                                    </div>
                                                    <div class="media-body ml-md-3">
                                                        <h4>Projects</h4>
                                                        <span>Completed Projects</span>
                                                    </div>
                                                    <div class="align-self-center">
                                                        <h1>{CompletedProject}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xl-6 col-md-12">
                                    <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://picjumbo.com/wp-content/uploads/woman-checking-her-to-do-list-free-photo-1080x720.jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                        <div class="card-content">
                                            <div class="card-body cleartfix">
                                                <div class="media align-items-stretch">
                                                    <div class="align-self-center">
                                                        <i class="fa fa-paste fa-4x text-info  icon-heart danger font-large-2"></i>
                                                    </div>
                                                    <div class="media-body ml-md-3">
                                                        <h4>Total Service</h4>
                                                        <span>Service</span>
                                                    </div>
                                                    <div class="align-self-center">
                                                        <h1 class="mr-2">{ClientTotalService}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-6 col-md-12">
                                    <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVzaW5lc3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                        <div class="card-content">
                                            <div class="card-body cleartfix">
                                                <div class="media align-items-stretch">
                                                    <div class="align-self-center">
                                                        <i class="fa fa-money fa-4x text-primary  icon-wallet success font-large-2"></i>
                                                    </div>
                                                    <div class="media-body ml-md-3" >
                                                        <h4>Total Expense</h4>
                                                        <span>Expense</span>
                                                    </div>
                                                    <div class="align-self-center ml-md-3">
                                                        <h1 class="mr-2"> $ {totalExpense}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                
                                <div class="container mt-1 p-2 rounded mx-auto bg-light">
                                    <div class="row p-lg-4">
                                        <div class="col-lg-12 col-md-12 col-sm-12 " >
                                            <div class="p-1 h4 text-primary text-center mx-auto display-inline-block" >
                                                <i class="fa fa-check bg-primary text-white rounded"> </i>
                                                <bold> My Todo-s</bold>
                                            </div>
                                        </div>
                                        {/* </div>
                                           <div class="row m-1 p-3"> */}
                                        <div class="col-lg-12 col-md-12 col-sm-12  col-11 mx-auto">
                                            <div class="row rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                                                <div class="col">
                                                    <input class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." onChange={(e) => setTodo(e.target.value)} value={todo} />
                                                </div>
                                                <div class="col-auto m-0 px-2 d-flex align-items-center">
                                                    <input class="form-control form-control-md border-0 add-todo-input bg-transparent rounded" type="date" placeholder="Add new .." value={deadline} onChange={(e) => setDeadLine(e.target.value)} />
                                                    <i class="fa fa-calendar-times-o my-2 px-1 text-danger btn clear-due-date-button d-none" data-toggle="tooltip" data-placement="bottom" title="Clear Due date"></i>
                                                </div>
                                                <div class="col-auto px-0 mx-0 mr-2">
                                                    <button type="button" onClick={Feedback} class={`btn btn-primary ${todo == '' || deadline == '' ? disable : ''}`}>Add</button>
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
                                                                <div class="col-auto m-1 p-0 d-flex align-items-center">
                                                                </div>
                                                                <div class="col px-1 m-1 d-flex align-items-center">
                                                                    <p type="text" class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" readonly value={val.task} title={val.task} >{val.task}</p>
                                                                    <p type="text" class="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none"  >{val.task}</p>
                                                                </div>
                                                                <div class="col-auto m-1 p-0 px-3 mx-auto">
                                                                    <div class="row">
                                                                        <div class="col-auto d-flex align-items-center rounded bg-white border border-warning">
                                                                            <i class="fa fa-hourglass-2 my-2 px-2 text-warning btn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Due on date"></i>
                                                                            <h6 class="text my-2 pr-2">{val.deadline}</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-auto m-1 p-0 mx-auto">
                                                                    <div class="row d-flex align-items-center justify-content-end">
                                                                        <h3 class="m-0 p-0 px-2">
                                                                            <i class="fa fa-trash-o fa-3x   text-danger btn" data-toggle="tooltip" data-placement="bottom" title="Delete todo" onClick={() => deleteTodo(val.id)} style={{ cursor: "pointer", fontSize: 30 }}></i>
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
                            <div class="container-fluid ">
                                <div className="row m-lg-5">
                                    <div className="col-md-12 col-lg-12 col-sm-12 border bg-light">
                                        <div className="d-md-flex mb-3">
                                            <h1 className="box-title h1 mb-0 text-center mx-auto">Manage Projects</h1>
                                        </div>
                                        <hr className="w-50" />
                                        <div className="table-responsive">
                                            <table className="table no-wrap">
                                                <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        <th className="border-top-0 text-white text-center">DATE</th>
                                                        <th className="border-top-0 text-white text-center">REQUESTS</th>
                                                        <th className="border-top-0 text-white text-center">OFFERS</th>
                                                        <th className="border-top-0 text-white text-center">DELIVERY DAYS</th>
                                                        <th className="border-top-0 text-white text-center">ACTIONS</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {form == '' ? <tr scope="row"><td colspan="5"><h3 className="my-lg-3 mx-auto ">Nothing to show! Start creating projects...</h3></td> </tr>
                                                        :
                                                        form.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr style={{ height: '5rem' }} className="border-bottom">
                                                                        <td className="txt-oflo text-center bold">{val.created_at.slice(0, 10)}</td>
                                                                        <td className="text-oflo text-center bold">{val.description.slice(0, 30)}...</td>
                                                                        <td className="txt-oflo text-center bold">$ {val.price}</td>
                                                                        <td className="txt-oflo text-center bold">{val.delivery_days} Days</td>
                                                                        <td className="txt-oflo text-center bold">
                                                                            <button class="btn marginBottom10" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} value={val.id} onClick={() => history.push(`/customerprojects/${val.supplier_id}/${val.id}`)} >More Details</button>
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

