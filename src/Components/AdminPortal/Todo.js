import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'

import axios from 'axios';
import Sidebar from '../AdminPortal/Sidebar'

import './Todo.css'
import jwt_decode from 'jwt-decode'


import { makeStyles } from '@material-ui/core/styles';





const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));




export default function Todo() {
    // CustomProviderAuth();
    let history = useHistory();

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)


    const [todo, setTodo] = useState('');
    const [deadline, setDeadLine] = useState('');
    const [disable,setDisable] = useState('disabled');



    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/service_todo`, {
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

        const { data: response } = axios.get(`https://api.woofics.com/api/service_todo/${decoded.sub}`,{
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
        const { data: response } = axios.delete(`https://api.woofics.com/api/service_todo/${e}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                getTodo();
            }, (error) => {
                
            });
    }}




    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();



    return (
        <>

            <div className={classes.root}>
                <Sidebar></Sidebar>

                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="container mt-1 p-2 rounded mx-auto">
                        <div className="row p-lg-4">
                            <div className="col-lg-12 col-md-12 col-sm-12 " >
                                <div className="p-1 h4 text-primary text-center mx-auto display-inline-block for-size" >
                                    <i className="fa fa-check bg-primary text-white rounded"> </i>
                                    <bold> My Todo-s</bold>
                                </div>
                            </div>
                        {/* </div>
                        <div class="row m-1 p-3"> */}
                            <div className="col-lg-12 col-md-12 col-sm-12  col-11 mx-auto">
                                <div className="row rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                                    <div className="col">
                                        <input className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." onChange={(e) => setTodo(e.target.value)} value={todo} />
                                    </div>
                                    <div className="col-auto m-0 px-2 d-flex align-items-center">
                                        <input className="form-control form-control-md border-0 add-todo-input bg-transparent rounded" type="date" placeholder="Add new .." onChange={(e) => setDeadLine(e.target.value)} value={deadline}/>
                                        <i className="fa fa-calendar-times-o my-2 px-1 text-danger btn clear-due-date-button d-none" data-toggle="tooltip" data-placement="bottom" title="Clear Due date"></i>
                                    </div>
                                    <div className="col-auto px-0 mx-0 mr-2">
                                        <button type="button" onClick={Feedback} className={`btn btn-primary ${todo == '' || deadline =='' ? disable : ''}`}>Agregar</button>
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
                                                                <i className="fa fa-trash-o fa-3x   text-danger btn" data-toggle="tooltip" data-placement="bottom" title="Delete todo" onClick={() => deleteTodo(val.id)} style={{cursor:"pointer" , fontSize:30}}></i>
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
                    {/* </div> */}
                </main>
            </div>


        </>
    );
}

