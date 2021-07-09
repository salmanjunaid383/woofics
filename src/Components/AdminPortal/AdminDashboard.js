import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import CustomProviderAuth from "../CustomProviderAuth";

export default function AdminDashboard() {
    CustomProviderAuth();
    let history = useHistory();

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    useEffect(()=>{
        if(!localStorage.getItem('user_token')){
            history.push('/')
        }
        
    })
    //....................DAshbaord API

    //..Total Client
    const [ongoinProject, setOngoinProject] = useState();
    const [CompletedProject, setCompletedProject] = useState();
    const [ClientTotalService, setClientTotalService] = useState();
    const [totalBlogs, settotalBlogs] = useState();
    const [PendingReg, setPendingReg] = useState();
    const [TotalComplain, setTotalComplain] = useState();


    function ClientOngoinProject() {
        const { data: response } = axios.get(`https://api.woofics.com/api/count_offer/${decoded.sub}`)
            .then((response) => {
                setOngoinProject(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }


    useEffect(() => {
        ClientOngoinProject()
    }, [])




    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)


    const [todo, setTodo] = useState('');
    const [deadline, setDeadLine] = useState('');
    const [disable, setDisable] = useState('disabled');



    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/service_todo`, {
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
                console.log(Error);
                alert('Please Add Todo and Select Date')
            });
    }

    const [data, setData] = useState([])
    function getTodo() {

        const { data: response } = axios.get(`https://api.woofics.com/api/service_todo/${decoded.sub}`)
            .then((response) => {
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
            const { data: response } = axios.delete(`https://api.woofics.com/api/service_todo/${e}`)
                .then((response) => {
                    getTodo();
                }, (error) => {
                    console.log(Error);
                });
        }
    }





    return (
        <>
            <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
                data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full" style={{ backgroundColor: '#76323f' }}>
               <div className="page-wrapper bg-light">
                    <div class="grey-bg container-fluid">
                        <section id="stats-subtitle">
                            <div class="row">
                                <div class="col-xl-6 col-md-12 mx-auto">
                                    <div class="card overflow-hidden" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c2luZXNzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                        <div class="card-content">
                                            <div class="card-body cleartfix">
                                                <div class="media align-items-stretch">
                                                    <div class="align-self-center">
                                                        <i class="fa fa-anchor fa-4x text-success  icon-pencil primary font-large-2 mr-2"></i>
                                                    </div>
                                                    <div class="media-body ml-md-3">
                                                        <h4>Offers</h4>
                                                        <span>Total Offer</span>
                                                    </div>
                                                    <div class="align-self-center">
                                                        <h1>{ongoinProject}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="container mt-1 p-2 rounded mx-auto">
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
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

