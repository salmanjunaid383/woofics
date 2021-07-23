import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios';

import jwt_decode from 'jwt-decode'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import { makeStyles, useTheme } from '@material-ui/core/styles';

import CustomProviderAuth from "../CustomProviderAuth";
import Sidebar from './Sidebar';




const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));




export default function ProviderComplain() {
    CustomProviderAuth();
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

        const { data: response } = axios.get(`https://api.woofics.com/api/complain/${decoded.sub}`)
            .then((response) => {
                setComplain(response.data)
            }, (error) => {
                console.log(Error);
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
                {/* <CssBaseline /> */}
                <Sidebar></Sidebar>

                  <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    



                   <div className="page-wrapper bg-light">
                        <div class="container p-4">
                            <div class="row">
                                <div className="col-md-8">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-md-4 bold h5">Servicio de Asistencia</div>
                                                <div class="col-md-2"></div>
                                                <div class="col-md-2"></div>
                                                <div class="col-md-4">
                                                   
                                                </div>
                                                <div class="col-md-8 py-2 ml-4" style={{ borderLeft: '4px solid rgba(7, 72, 138, 0.71)' }}>Encuentra Tu Solución...</div>
                                                {complain == '' ? <h3 className="text-center my-auto mx-auto w-100">Nada Que Mostrar!</h3>
                                                    :
                                                    complain.map((val, id) => {
                                                        return (
                                                            <>
                                                                <div class="col-md-11 py-4  border-bottom mx-auto"><Link to={`/admincomplainresponse/${val.id}`}> Q.{val.description} </Link></div>
                                                            </>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="col-md-12 row" style={{ padding: '0px', marginBottom: '10px' }}>

                                                <div class="col-md-10 ">
                                                No encontré tu solución ?
                                                            </div>
                                                <div class="col-md-8 ml-2 m-2" style={{ borderLeft: '4px solid rgba(7, 72, 138, 0.71)' }}>Pregunta tu consulta</div>
                                            </div>

                                            <form>
                                                <table class="table">
                                                    <tr>
                                                        <td>
                                                            <input type="text" class="form-control" value={title} id="mailtip2" placeholder="Title" onChange={(e) => settitle(e.target.value)} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <textarea class="form-control" rows="4" value={question} placeholder="Your Complain . . ." onChange={(e) => setQuestion(e.target.value)}></textarea>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button class={`btn btn-sm ${question == '' || title == '' ? disable :''}`} onClick={Feedback} style={{ width: '100%', backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }}><i class="fa fa-envelope-o" style={{ paddingRight: '5px' }}></i> Send</button>
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







            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={openpop}
                autoHideDuration={6000}
                onClose={handleClosepop}
                message="Complain Sent !"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClosepop}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </>
    );
}

