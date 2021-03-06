import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios';
import StazBar from './Sidebar'

import jwt_decode from 'jwt-decode'

import { makeStyles } from '@material-ui/core/styles';

import CustomClientAuth from "../CustomClientAuth";



const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));






export default function Complain() {
    CustomClientAuth();
    let history = useHistory();

    const token = localStorage.getItem('user_token');
    var decoded = jwt_decode(token);

    const [disable,setDisable] = useState('disabled');


    const [question, setQuestion] = useState("");
    const [title, settitle] = useState("");

    const [openpop, setOpenpop] = React.useState(false);
    const handleClosepop = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenpop(false);
    };
    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/complain`, {
            description: question,
            user_id: decoded.sub,
            status: 'pending',
            title: title,
        },{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                if (response) {
                    setOpenpop(true)
                    getComplain()
                    setQuestion('')
                    settitle('')
                }
            }).catch((error) => {
                if (error.response) {
                    alert(error.response.data.error);
                }
            });
    }


    const [complain, setComplain] = useState([]);

    function getComplain() {

        const { data: response } = axios.get(`https://api.woofics.com/api/complain/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setComplain(response.data)
            }, (error) => {
                
                history.push("/quejar");
            });
    }
    useEffect(() => {
        getComplain()
    }, [])



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
                        <div className="container p-4">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-md-4 bold h5">Servicio de asistencia</div>
                                                <div className="col-md-2"></div>
                                                <div className="col-md-2"></div>
                                                <div className="col-md-4">
                                                    {/* <input class="form-control" type="text" placeholder="Search Query..." /> */}
                                                </div>
                                                <div className="col-md-8 py-2 ml-4" style={{ borderLeft: '4px solid rgba(7, 72, 138, 0.71)' }}>Encuentra Tu Soluci??n...</div>
                                                {complain == '' ? <h3 className="text-center my-auto mx-auto w-100">Nada Que Mostrar!</h3>
                                                    :
                                                    complain.map((val, id) => {
                                                        return (
                                                            <>
                                                                <div className="col-md-11 py-4  border-bottom mx-auto"><Link to={`/quejarse_respuesta/${val.id}`}> Q.{val.description} </Link></div>
                                                            </>
                                                        )
                                                    }).reverse()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="col-md-12 row" style={{ padding: '0px', marginBottom: '10px' }}>

                                                <div className="col-md-10 ">
                                                No encontr?? tu soluci??n ?
                                                            </div>
                                                <div className="col-md-8 ml-2 m-2" style={{ borderLeft: '4px solid rgba(7, 72, 138, 0.71)' }}>Pregunta tu consulta</div>
                                            </div>

                                            <form>
                                                <table  id="for-table-setting" className="table">
                                                    <tr>
                                                        <td>
                                                            <input type="text" className="form-control" value={title} id="mailtip2" placeholder="Title" onChange={(e) => settitle(e.target.value)} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <textarea className="form-control" rows="4" value={question} placeholder="Your Complain . . ." onChange={(e) => setQuestion(e.target.value)}></textarea>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button className={`btn btn-sm ${question == '' || title == '' ? disable :''}`} onClick={Feedback} style={{ width: '100%', backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }}><i className="fa fa-envelope-o" style={{ paddingRight: '5px' }}></i> Enviar</button>
                                                        </td>
                                                    </tr>
                                                </table>

                                            </form>
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

