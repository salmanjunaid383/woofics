import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import '../ClientPortal/Help.css'
import SideBar from './Sidebar';
import axios from 'axios';

import jwt_decode from 'jwt-decode'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

import CustomSupplierAuth from "../CustomSupplierAuth";



const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));





export default function SupHelp() {
    CustomSupplierAuth();
    let history = useHistory();

    const [query, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

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



    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>

            <div className="d-sm-flex">

                <SideBar></SideBar>
                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                   <div className="page-wrapper bg-light">
                        <div className="container p-4">
                            <div className="row">
                                <div className="col-md-8 mx-auto">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="col-md-12 row" style={{ padding: '0px', marginBottom: '10px' }}>

                                                <div className="col-md-2">
                                                    <img src="http://dinus.org/img/fakultas/FIK/cs/cs.svg" />
                                                    <div style={{ marginLeft: '30px' }}>
                                                        <img src="http://dinus.org/img/fakultas/FIK/cs/cs.png" width="70px" height="70px" className="img-circle" style={{ border: '3px solid #052C52' }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <hr />
                                                    <p style={{ paddingLeft: '55px', fontSize: '1.3em' }}><strong>Zaskia Amanda</strong></p>
                                                    <Link to="/supresponses" className="pt-3 responseLinkStaz text-black "  >
                                                    
                                                    Respuestas
                                                        
                                                    </Link>

                                                </div>


                                            </div>

                                            <form>
                                                <table  id="for-table-setting" className="table">
                                                    <tr>
                                                        <td>
                                                            <input className="form-control" type="text" placeholder="query" value={query} onChange={(e) => setQuestion(e.target.value)} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <textarea className="form-control" rows="4" value={answer} placeholder="Description text . . ." onChange={(e) => setAnswer(e.target.value)}></textarea>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button className={`btn btn-sm ${query == '' || answer == '' ? disable : ''}`} onClick={Feedback} style={{ width: '100%', backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }}><i className="fa fa-envelope-o" style={{ paddingRight: '5px' }}></i> Enviar</button>
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
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
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

