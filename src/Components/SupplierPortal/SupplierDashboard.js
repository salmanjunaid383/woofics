import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import CustomSupplierAuth from "../CustomSupplierAuth";
import { makeStyles } from '@material-ui/core/styles';
import SideBar from './Sidebar';
const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));

export default function SupplierDashboard() {
    CustomSupplierAuth();
    let history = useHistory();
    const classes = useStyles();
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    //....................DAshbaord API

    //..Total Client
    const [ongoinProject, setOngoinProject] = useState();
    const [CompletedProject, setCompletedProject] = useState();
    const [ClientTotalService, setClientTotalService] = useState();
    const [totalEarnings, settotalEarnings] = useState();
    const [PendingReg, setPendingReg] = useState();
    const [TotalComplain, setTotalComplain] = useState();


    function ClientOngoinProject() {
        const { data: response } = axios.get(`https://api.woofics.com/api/ongoing_supplier_project/${decoded.sub}`)
            .then((response) => {
                setOngoinProject(response.data)
            }, (Error) => {
                
            });
    }

    //...total supplierCompletedProject

    function ClientCompletedProject() {
        const { data: response } = axios.get(`https://api.woofics.com/api/completed_client_project/${decoded.sub}`)
            .then((response) => {
                setCompletedProject(response.data)
            }, (Error) => {
                
            });
    }

    //.......Total Provider

    function ClientService() {
        const { data: response } = axios.get(`https://api.woofics.com/api/count_quotation/${decoded.sub}`)
            .then((response) => {
                setClientTotalService(response.data)
            }, (Error) => {
                
            });
    }

    function TotalEarn() {
        const { data: response } = axios.get(`https://api.woofics.com/api/supplier_earnings/${decoded.sub}`)
            .then((response) => {
                settotalEarnings(response.data)
            }, (Error) => {
                
            });
    }



    useEffect(() => {
        ClientOngoinProject()
        ClientCompletedProject()
        ClientService()
        TotalEarn()
        getTodo()
        function Feedback() {
            const res = axios.get(`https://api.woofics.com/api/supplier_projects/${decoded.sub}`)
                .then((res) => {
                    if (res) {
                        setForm(res.data)
                        setdays(parseInt(res.data.due_date))
                    }
                }, (error) => {
                    
                });

        }
        Feedback();
        //     PendingRegistration()
        //     CountBlogs()

    }, [])






    const [todo, setTodo] = useState('');
    const [deadline, setDeadLine] = useState('');
    const [disable, setDisable] = useState('disabled');



    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/supplier_todo`, {
            user_id: decoded.sub,
            task: todo,
            deadline: deadline,
        })
            .then((response) => {
                if (response) {
                    getTodo();
                    setTodo('');
                    setDeadLine('')
                }
            }, (error) => {
                
                history.push('/suppliertodo');
                alert('Please Add Todo and Select Date')
            });
    }

    const [data, setData] = useState([])
    function getTodo() {

        const { data: response } = axios.get(`https://api.woofics.com/api/supplier_todo/${decoded.sub}`)
            .then((response) => {
                setData(response.data)
            }, (error) => {
                
            });
    }




    // DeleteTodo
    function deleteTodo(e) {
        var result = window.confirm("Want to delete?");
        if (result) {
            const { data: response } = axios.delete(`https://api.woofics.com/api/supplier_todo/${e}`)
                .then((response) => {
                    getTodo();
                }, (error) => {
                    
                });
        }
    }

    //..............................................................
    const [form, setForm] = useState([]);
    const [rating1, setRating1] = useState(4);
    const [supplier, setSupplier] = useState('');
    const [ddays, setdays] = useState('');






    return (
        <>
            <div className="d-sm-flex">
                <SideBar></SideBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
                        data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full" style={{ backgroundColor: '#76323f' }}>
                        <div className="page-wrapper ">
                            <div class="container-fluid">
                            <div className="back-button">
                         <a href="/"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
                         </div>
                                <section id="stats-subtitle">
                                    <div class="row">
                                        <div className="col-md-12">
                                            <h1 style={{ fontSize: "27px", marginBottom: "20px", color: "#9b88f6", fontWeight: "bold" }}>Supplier Dashboard</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-xl-8">
                                            <div className="container-fluid">
                                                <div class="row" style={{ border: "2px solid #f3f3f3", padding: "10px" }}>
                                                    <div className="col-md-12">
                                                        <h4 style={{ fontSize: "20px", marginTop: "20px", marginBottom: "20px", color: "#223e92" }}>All Information</h4>
                                                    </div>
                                                    <div class="col-xl-6 col-md-12">
                                                        <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c2luZXNzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
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


                                                    {/* <div class="row"> */}
                                                    <div class="col-xl-6 col-md-12">
                                                        <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://picjumbo.com/wp-content/uploads/woman-checking-her-to-do-list-free-photo-1080x720.jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                            <div class="card-content">
                                                                <div class="card-body cleartfix">
                                                                    <div class="media align-items-stretch">
                                                                        <div class="align-self-center">
                                                                            <i class="fa fa-paste fa-4x text-info  icon-heart danger font-large-2"></i>
                                                                        </div>
                                                                        <div class="media-body ml-md-3">
                                                                            <h4>Total Quotations</h4>
                                                                            <span>Quotations</span>
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
                                                                            <h4>Earnings</h4>
                                                                            <span>Total Earnings</span>
                                                                        </div>
                                                                        <div class="align-self-center ml-md-3">
                                                                            <h1 class="mr-2">${totalEarnings}</h1>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* </div> */}

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-sm-6 col-md-12 col-lg-12 col-12 mx-auto" style={{ border: "2px solid #f3f3f3" }}>
                                            <div class="container rounded mx-auto">
                                                <div class="row m-md-1 p-md-4">
                                                    <div class="col" >
                                                        <div class="p-1 h1 text-primary text-center mx-auto display-inline-block" >
                                                            <i class="fa fa-check bg-primary text-white rounded "> </i>
                                                            <bold> My Todo-s</bold>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col col-11 mx-auto">
                                                        <div class="row  rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center" style={{ display: "flex", flexDirection: "column" }}>
                                                            <div class="col">
                                                                <input class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." onChange={(e) => setTodo(e.target.value)} value={todo} />
                                                            </div>
                                                            <div class="col-auto m-0 px-2 d-flex align-items-center">
                                                                <label class="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Due date not set</label>
                                                                <input class="form-control form-control-md border-0 add-todo-input bg-transparent rounded" type="date" placeholder="Add new .." onChange={(e) => setDeadLine(e.target.value)} value={deadline} />
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
                                                                            <div class="col px-1 m-1 d-flex align-items-center">
                                                                                <p type="text" class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" readonly value={val.task} title={val.task} >{val.task}</p>
                                                                                <p type="text" class="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none" value={val.task} >{val.task}</p>
                                                                            </div>
                                                                            <div class="col-auto m-1 p-0 px-3">
                                                                                <div class="row">
                                                                                    <div class="col-auto d-flex align-items-center rounded bg-white border border-warning">
                                                                                        <i class="fa fa-hourglass-2 my-2 px-2 text-warning btn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Due on date"></i>
                                                                                        <h6 class="text my-2 pr-2">{val.deadline}</h6>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-auto m-1 p-0 ">
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
                                    </div>
                                    <div class="container-fluid pb-lg-4">
                                        <div className="row m-lg-5">
                                            <div className="col-md-12 col-lg-12 col-sm-12 border bg-light">
                                                <div className="d-md-flex mb-3">
                                                    <h1 className=" h1 mb-0 text-center mx-auto">Manage Projects</h1>
                                                </div>
                                                <hr className="w-50" />
                                                <div className="table-responsive salman-table-change">
                                                    <table id="for-table-setting" className="table no-wrap for-table-setting" >
                                                        <thead id="heading-row" className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                            <tr>
                                                                <th className="border-top-0 text-white text-center">DATE</th>
                                                                <th className="border-top-0 text-white text-center">REQUESTS</th>
                                                                <th className="border-top-0 text-white text-center">OFFERS</th>
                                                                <th className="border-top-0 text-white text-center">DELIVERY DAYS</th>
                                                                {/* <th className="border-top-0 text-white text-center">PAYMENT PHASE</th> */}
                                                                <th className="border-top-0 text-white text-center">ACTIONS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="data-row" >
                                                            {form == '' ? <tr scope="row"><td colspan="0"><h3 className="my-lg-3 mx-auto ">Nothing to show!</h3></td> </tr> :
                                                                form.map((val, id) => {
                                                                    return (
                                                                        <>
                                                                            <tr style={{ height: '5rem' }} className="border-bottom">
                                                                                <td className="txt-oflo text-center bold">{val.created_at.slice(0, 10)}</td>
                                                                                <td className="text-oflo text-center bold">{val.description.slice(0, 30)}...</td>
                                                                                <td className="txt-oflo text-center bold">$ {val.price}</td>
                                                                                <td className="txt-oflo text-center bold">{val.delivery_days} Days</td>
                                                                                {/* <td className="txt-oflo text-center bold">{val.phase}</td> */}
                                                                                <td className="txt-oflo text-center bold">
                                                                                    <button class="btn marginBottom10" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} value={val.id} onClick={() => history.push(`/supplierprojects/${val.client_id}/${val.id}`)} >More Details</button>
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

