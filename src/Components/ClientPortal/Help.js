import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import '../ClientPortal/Help.css';

import axios from 'axios';
import StazBar from './Sidebar'

import jwt_decode from 'jwt-decode'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import CustomClientAuth from "../CustomClientAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));





export default function Help() {
    CustomClientAuth();
    let history = useHistory();

    const [query, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const token = localStorage.getItem('user_token');
    var decoded = jwt_decode(token);

    const [disable,setDisable] = useState('disabled');


    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/help`, {
            question: query,
            user_id: decoded.sub,
            description: answer,
        },{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                if (response) {
                    setOpenn(true);
                    setQuestion('');
                    setAnswer('')
                history.push("/respuestas");
                }
            }, (Error) => {
                
                history.push("/ayuda");
            });
    }

    const [openn, setOpenn] = React.useState(false);
    const handleClosee = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenn(false);
    };


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
                        <div class="container p-4">
                            <div class="row">
                                <div class="col-md-8 mx-auto">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="col-md-12 row" style={{ padding: '0px', marginBottom: '10px' }}>

                                                <div class="col-md-2">
                                                    <img src="http://dinus.org/img/fakultas/FIK/cs/cs.svg" />
                                                    <div style={{ marginLeft: '30px' }}>
                                                        <img src="http://dinus.org/img/fakultas/FIK/cs/cs.png" width="70px" height="70px" class="img-circle" style={{ border: '3px solid #052C52' }} />
                                                    </div>
                                                </div>
                                                <div class="col-md-10">
                                                    <hr />
                                                    <p style={{ paddingLeft: '55px', fontSize: '1.3em' }}><strong>Administradora</strong></p>
                                                    <Link to="/Responses" className="pt-3  responseLinkStaz"  >
                                                    Respuestas
                                                    </Link>

                                                </div>


                                            </div>

                                            <form>
                                                <table  id="for-table-setting" class="table">
                                                    <tr>
                                                        <td>
                                                            <input class="form-control" type="text" placeholder="query" value={query} onChange={(e) => setQuestion(e.target.value)} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <textarea class="form-control" rows="4" value={answer} placeholder="Description text . . ." onChange={(e) => setAnswer(e.target.value)}></textarea>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button class={`btn btn-sm ${query == '' || answer == '' ? disable : ''}`}  onClick={Feedback} style={{ width: '100%', backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }}><i class="fa fa-envelope-o" style={{ paddingRight: '5px' }}></i> Enviar</button>
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


                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openn}
                        autoHideDuration={6000}
                        onClose={handleClosee}
                        message={'Sent ✔️'}
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClosee}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </main>
            </div>


        </>
    );
}

