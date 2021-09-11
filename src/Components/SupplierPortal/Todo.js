import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios';

import './Todo.css'
import jwt_decode from 'jwt-decode'

import { makeStyles, useTheme } from '@material-ui/core/styles';


import CustomSupplierAuth from "../CustomSupplierAuth";
import SideBar from './Sidebar';
const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function Todo() {
    CustomSupplierAuth();
    let history = useHistory();

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)


    const [todo, setTodo] = useState('');
    const [deadline, setDeadLine] = useState('');
    const [disable, setDisable] = useState('disabled');



    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/supplier_todo`, {
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
                
                history.push('/suppliertodo');
                alert('Please Add Todo and Select Date')
            });
    }

    const [data, setData] = useState([])
    function getTodo() {

        const { data: response } = axios.get(`https://api.woofics.com/api/supplier_todo/${decoded.sub}`,{
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
            const { data: response } = axios.delete(`https://api.woofics.com/api/supplier_todo/${e}`,{
                headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
              })
                .then((response) => {
                    getTodo();
                }, (error) => {
                    
                });
        }
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
                    

                    <div className="page-wrapper ">
                        <div class="container rounded mx-auto">
                            <div class="row m-1 p-4">
                                <div class="col" >
                                    <div class="p-1 h1 text-primary text-center mx-auto display-inline-block" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                        <i class="fa fa-check bg-primary text-white rounded " > </i>
                                        <bold> Mis Todo-s</bold>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-11 mx-auto">
                                    <div class="row  rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                                        <div class="col">
                                            <input class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." onChange={(e) => setTodo(e.target.value)} value={todo} />
                                        </div>
                                        <div class="col-auto m-0 px-2 d-flex align-items-center">
                                            <label class="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Fecha de vencimiento no establecida</label>
                                            <input class="form-control form-control-md border-0 add-todo-input bg-transparent rounded" type="date" placeholder="Add new .." onChange={(e) => setDeadLine(e.target.value)}  value={deadline}/>
                                            <i class="fa fa-calendar-times-o my-2 px-1 text-danger btn clear-due-date-button d-none" data-toggle="tooltip" data-placement="bottom" title="Clear Due date"></i>
                                        </div>
                                        <div class="col-auto px-0 mx-0 mr-2">
                                            <button type="button" onClick={Feedback} class={`btn btn-primary ${todo == '' || deadline == '' ? disable : ''}`}>Agregar</button>
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
                                                                    <i class="fa fa-trash-o text-danger btn m-0 px-3" data-toggle="tooltip" data-placement="bottom" title="Delete todo" onClick={() => deleteTodo(val.id)} style={{ cursor: 'pointer', fontSize: 25 }}></i>
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
                </main>
            </div>

        </>
    );
}

