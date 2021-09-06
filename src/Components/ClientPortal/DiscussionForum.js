import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import StazBar from './Sidebar'
import AdminBar from '../SuperPortal/Stazbar';
import SupBar from '../SupplierPortal/Sidebar';
import ProBar from '../AdminPortal/Sidebar';
import './DiscussionForum.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


import { useTheme } from '@material-ui/core/styles';
import CustomAuth from "../CustomAuth";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: "white",
        boxShadow: 'none',
        border: "none",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        backgroundImage: "linear-gradient(180deg, #F62B84 0%, #934CFF 100%)",
        width: drawerWidth,
        boxShadow: 'none',
        border: "none"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    },
    typography: {
        padding: theme.spacing(1),
    },
    link: {
        textDecoration: 'none',
        color: '#cdcdcd',
        fontWeight: 'bolder'
    },
    // background-image:linear-gradient(180deg, #934CFF 0%, #F62B84 100%);
    item: {
        color: 'white',
        margin: '0px'
        , "&:hover": {
            color: 'white',
            margin: '0px'
        }
    },
    paper: {
        width: 700,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));



function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 40 + rand();
    const left = 40 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function DiscussionForum() {
    CustomAuth();
    let history = useHistory();


    const [user, setUser] = useState("");
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);
    const [nextPage,setNextPage]=useState("");
    const [prevPage,setPrevPage]=useState("");

    var token = localStorage.getItem("user_token");

    function tokenRedirect(){
        if(token===null){
            history.push("/foro");
        }
    }
    useEffect(() => {
        tokenRedirect();
    },[]);

    if(token !== null)
    {
        var decoded = jwt_decode(token);
    }
    
    function getUserData() {
        if(token !== null)
        {
            const { data: response } = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`,{
                headers:window.header
              })
            .then((response) => {
                setUser(response.data);

            }, (error) => {
                
            });
        }

        
    }


    function Forum(e) {
        e.preventDefault();

        const { data: response } = axios.post(`https://api.woofics.com/api/forum_question`, {
            question: question,
            asked_by: user.first_name + " " + user.last_name,
            user_id: user.id
        },{
            headers:window.header
          })
            .then((response) => {
                handleClosee()
                getQuestion();
            }, (error) => {
                
            });
    }

    function getQuestion() {

        const { data: response } = 
axios.get(`https://api.woofics.com/api/forum_question?page=1`,{
            headers:window.header
          },{
            headers:window.header
          })
            .then((response) => {
                setQuestions(response.data.data);
                console.log(response.data)
                
                setNextPage(response.data.next_page_url)
                setPrevPage(response.data.prev_page_ur)

            }, (error) => {
                
            });
    }

    useEffect(() => {
        getQuestion();
        getUserData()
    }, [])


    // Modal

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [openn, setOpenn] = React.useState(false);

    const handleOpenn = () => {
        setOpenn(true);
    };

    const handleClosee = () => {
        setOpenn(false);
    };

    //Sidebaaaaar/..........................
    // const { window } = props;
    // const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    var adminSideBar;
    var clientSideBar;  
    var providerSideBar;
    var supplierSideBar;
    if(token !== null)
    {
        const role = jwt_decode(localStorage.getItem('user_token'))
                        if (role.role === 'Client') {
                            clientSideBar=true;
                        } else if (role.role === 'ServiceProvider')
                            providerSideBar=true;
                        else if (role.role === 'Supplier') {
                            supplierSideBar=true;
                        } else {
                            adminSideBar=true;
                        }
    }
    function goNext(route){
        console.log(route)
        const {data: response}= axios.get(route,{
            headers:window.header
        }).then((response) => {
            console.log(response.data)
            setQuestions(response.data.data)
            setNextPage(response.data.next_page_url)
            setPrevPage(response.data.prev_page_url)
        }, error => {
            console.log(error)
        });
        
    }
    
    


    return (
        <>

            <div className="d-sm-flex">
                {
                    adminSideBar ? (
                        <AdminBar></AdminBar>
                    ) : (null)
                }
                {
                    clientSideBar ? (
                        <StazBar></StazBar>
                    ) : (null)
                }
                {
                    supplierSideBar ? (
                        <SupBar></SupBar>
                    ) : null
                }
                {
                    providerSideBar ? (
                        <ProBar></ProBar>
                    ) : (null)
                }
                
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    
                    

                    <div className="float-right mt-4  mr-4">
                        <button type="submit" class="s-butto greenbtn text-white" onClick={handleOpenn}>Hacer una pregunta?</button>
                    </div>
                    <div className="page-wrapper bg-light">
                        <div class="container mt-100">
                                   <div class="d-md-flex mb-3">
                    <h3 class=" h1 mb-0 text-center mx-auto">Foro De Discusion</h3>
                </div>
                            <div class="row">
                                <div class="col-md-10 mx-auto">
                                    {
                                        questions == '' ? <h3 className="text-center my-auto">¡Nada que mostrar! Iniciar una nueva discusión...</h3> :
                                            questions.map((val, id) => {
                                                return (
                                                    <>

                                                        <Link to={`/clientemásdetallesforumdiscussion/${val.id}`}>
                                                            <div class="card mb-4 mx-auto">
                                                                <div class="card-header ">
                                                                    <div class="media flex-wrap w-100 align-items-center">
                                                                        {/* <img src={"https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg"} class="d-block ui-w-40 rounded-circle" alt="" /> */}
                                                                        <div class="media-body ml-3 ChatCapitalize"> <a href="javascript:void(0)" data-abc="true">{val.asked_by}</a>
                                                                            <div class="text-muted small">{(val.created_at).slice(0, 10)}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-body">
                                                                    <p> {val.question}</p>
                                                                </div>
                                                                <div class="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                                                                    <div class="px-4 pt-3"></div>
                                                                    <div class="px-4 pt-3"> <button type="button" class="btn greenbtn text-white"><i class="ion ion-md-create"></i>&nbsp; Ver más y responder</button> </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </>
                                                )
                                            })
                                    }
                                </div>

              
                            </div>

                            <div class="row" style={{ paddingBottom: "5px",justifyContent:"center",textAlign:'center',display:'flex' }}>
                <div class="col-md-6" >
                  
                    <button className="s-button" disabled={prevPage===null || prevPage === '' ? true : false} onClick={e => {goNext(prevPage)}}>Previous</button>
                  
                </div>
                <div class="col-md-6">
                 
                    <button className="s-button" disabled={nextPage===null || nextPage=== '' ? true : false} onClick={e => {goNext(nextPage)}}>Next</button>
                  
                </div>
                
              </div>



                        </div>


                        <div>

                            <Modal
                                open={openn}
                                onClose={handleClosee}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                className={classes.modal}

                            >
                                <div className={classes.paper}>
                                    <h2 id="simple-modal-title " className="mx-auto text-center "> ¿Hacer una pregunta? </h2>
                                    <div className="container-fluid text-center">
                                        <div className="row">
                                            <div className="col-md-8  mx-auto">
                                                <textarea type="text" placeholder="Type your question here .........." onChange={(e) => setQuestion(e.target.value)}>

                                                </textarea>
                                                <button onClick={Forum} className="greenbtn text-white">Enviar pregunta </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>

                </main>
            </div>




        </>
    );
}

