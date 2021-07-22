import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams, } from 'react-router-dom'

import axios from 'axios';
import Sidebar from './Sidebar'

import './Chat.css'
import jwt_decode from 'jwt-decode'

import Pusher from 'pusher-js';
import chatimg from '../../Images/chat.png'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import firebase from '../Firebase'
//.........
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CustomProviderAuth from "../CustomProviderAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));






export default function ProviderChat() {
    CustomProviderAuth();
    // history
    let history = useHistory();

    //token decode
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    const divRef = useRef(null);


    //.......................................Pusher
    // var mes;

    // useEffect(() => {
    //     if (!localStorage.getItem('user_token')) {
    //         history.push('/')
    //     }

    // })
    const pusher = new Pusher('e22c56269c9258608b2c', {
        cluster: 'ap1'
      });;


      useEffect(() => {
        const channel = pusher.subscribe(""+decoded.sub+"");   
        console.log("channel success "+ channel);    
        channel.bind("my-event",function(returnData){
            console.log("my-event");
            function Users() {
             console.log(returnData);
                const { data: response } = axios.post(`https://api.woofics.com/api/history`, {
                    from_user: id,
                    to_user: returnData.from_user
                })
                    .then((response) => {
                        if (response) {
                            console.log(response.data)
                            setMsg(response.data)
                            setRight(response.data.from_user)
                            SendData()
                            // divRef.current.scrollIntoView({ behavior: 'smooth' });

                        }
                    }, (Error) => {
                        console.log("userID "+id+" to user ");
                        console.log(Error);
                    })
            }
            Users();
        });
        SendData()
        getData()
        return () => {
            pusher.disconnect() // This worked for me
          };
    }, [])

    //Making Contact
    const [user, setUser] = useState([]);
    // useEffect(() => {
        

            
    //     function SendData() {
    //         const { data: response } = axios.get(`https://api.woofics.com/api/associate/${decoded.sub}`,)
    //             .then((response) => {
    //                 if (response) {
    //                     setUser(response.data)
    //                 }
    //             }, (Error) => {
    //                 //  
    //                 // console.log(Error);
    //             });
    //     }
        
    // }, [])

    function SendData() {
        const { data: response } = axios.get(`https://api.woofics.com/api/associate/${decoded.sub}`,)
            .then((response) => {
                if (response) {
                    setUser(response.data)
                }
            }, (Error) => {
                // console.log(Error);
            });
    }

    const [id, setid] = useState(decoded.sub);
    const [uid, setUid] = useState('');
    const [msg, setMsg] = useState([]);
    const [sentmsg, setsentMsg] = useState('');
    const [right, setRight] = useState([])
    const [name, setName] = useState('')

    //..............................IMagse
    const [imageProgress, setImageProgress] = useState()
    const [doc, setDoc] = useState('')


    const docOnchange = async (e) => {
        setImageProgress('Loading...')
        const file = e.target.files[0];
        const ImagesRef = firebase.storage().ref('images').child(file.name);
        await ImagesRef.put(file)
        ImagesRef.getDownloadURL().then((url) => {
            console.log(url)
            setsentMsg(url)
        })
    }


    //Conatct List
    function Users(valu, name) {
        const { data: response } = axios.post(`https://api.woofics.com/api/history`, {
            from_user: id,
            to_user: valu
        })
            .then((response) => {
                if (response) {
                    // console.log(response.data)
                    chatnotification()
                    setMsg(response.data)
                    setRight(response.data.from_user)
                    SendData()
                    setUid(valu)
                    setName(name)
                    // divRef.current.scrollIntoView({ behavior: 'smooth' });

                    // setOpen(true);
                }
            }, (Error) => {
                // console.log(Error);
            });
    }



    //sending message through sent icon
    function Message() {
        const res = axios.post(`https://api.woofics.com/api/message`, {
            from_user: id,
            to_user: uid,
            message: sentmsg,
            name: name
        })
            .then((response) => {
                function Users() {
                    const { data: response } = axios.post(`https://api.woofics.com/api/history`, {
                        from_user: id,
                        to_user: uid
                    })
                        .then((response) => {
                            if (response) {
                                SendData()
                                setMsg(response.data)
                                setRight(response.data.from_user)
                                // divRef.current.scrollIntoView({ behavior: 'smooth' });

                            }
                        }, (Error) => {
                            console.log(Error);
                        })
                }
                Users()
                setsentMsg('')
            }, (Error) => {
                console.log(Error);
            });
    }

    const [username, setUsername] = useState('')
    const [ImageProfile, setImageProfile] = useState('')


    //messages history
    const [open, setOpen] = React.useState(false);
    const message = localStorage.getItem('message');

    const handleClick = () => {
        // function Users() {
        const { data: response } = axios.post(`https://api.woofics.com/api/history`, {
            from_user: id,
            to_user: uid
        })
            .then((response) => {
                if (response) {
                    // console.log(response.data)
                    setMsg(response.data)
                    setRight(response.data.from_user)
                    SendData()
                }
            }, (Error) => {
                // console.log(Error);
            });
        // }
        // Users()
    };

    //sending message on click on 'Enter Button'divRef.current.scrollIntoView({ behavior: 'smooth' });
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            Message()

        }
    }


    //notification Toast
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        handleClick()
        notificationfun()
        // divRef.current.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
    };




    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();

    // const container = window !== undefined ? () => window().document.body : undefined;
    const [notification, setnotification] = useState([]);

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function notificationfun() {
        const { data: response } = axios.get(`https://api.woofics.com/api/notification/${decoded.sub}`)
            .then((response) => {
                setnotification(response.data)
                seen()
            }, (Error) => {
                console.log(Error);
            });
    }

    const [unseen, setunseen] = useState([]);
    function seen() {
        const { data: response } = axios.get(`https://api.woofics.com/api/unseen/${decoded.sub}`)
            .then((response) => {
                setunseen(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }

    //................Chat Seen
    const [UnseenMxg, setUnseenMxg] = useState([]);
    function chatnotification() {
        const { data: response } = axios.get(`https://api.woofics.com/api/chat_unseen/${decoded.sub}`)
            .then((response) => {
                setUnseenMxg(response.data)
                seen()
            }, (Error) => {
                console.log(Error);
            });
    }


    const [Imagedata, setImageData] = useState('');

    function getData() {
        const res = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((res) => {
                setImageData(res.data)
            }
            )

    }
    function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`)
            .then((response) => {
                notificationfun()
            }, (Error) => {
                console.log(Error);
            });
    }



    const [anchorElmenu, setAnchorElmenu] = React.useState(null);
    const handleClickmenu = (event) => {
        setAnchorElmenu(event.currentTarget);
    };

    const handleClosemenu = () => {
        setAnchorElmenu(null);
    };

    const [search, setSearch] = useState('')

    return (
        <>


            <div className="d-sm-flex">
                <Sidebar></Sidebar>

                <main className={classes.content}>
                    
                    <div className={classes.toolbar} />
                    <div className="page-wrapper" >
                        <div id="frame">
                            <div id="sidepanel">
                                <div id="profile">
                                    <div class="wrap">
                                        <img id="profile-img" src={Imagedata} class="online" alt="" style={{ borderRadius: 50, width: 50, height: 50 }} />
                                        <p>WOofic</p>
                                        <i class="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div id="search">
                                    <label for=""><i class="fa fa-search" aria-hidden="true"></i></label>
                                    <input type="text" placeholder="Search contacts..." />
                                </div>
                                <div id="contacts">

                                    <ul>
                                        {user.map((val, id) => {
                                            return (
                                                <>
                                                    {val.id === decoded.sub ?
                                                        null
                                                        :
                                                        <li class="contact active" onClick={() => { Users(val.associate_user, val.main_name); setUsername(val.associate_name); setImageProfile(val.avatar) }}>
                                                            <div class="wrap text-left">
                                                                <img src={val.avatar} style={{ borderRadius: 50, width: 50, height: 50 }} alt="" />
                                                                <div class="meta">
                                                                    <p className="name chatCapitalize mb-0 pb-0">{val.associate_name}</p>
                                                                    {val.total_seen != 0 ? <p class="preview pl-md-5 text-danger text-left" style={{ width: '950px' }}>{val.total_seen} Mensajes no leídos...</p> : <p class="preview pl-md-5 text-left " style={{ width: '950px' }}> {val.last_message ? (val.last_message).slice(0, 20) + '...' : null}</p>}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    }
                                                </>
                                            )
                                        })}

                                    </ul>
                                </div>
                            </div>
                            <div class="content">
                                {username ? <div class="contact-profile">
                                    <img src={ImageProfile} alt="" style={{ borderRadius: 50, width: 50, height: 50 }} />
                                    <p className="ChatCapitalize">{username}</p>
                                    <div className="bg-dark text-white float-right px-md-2" onClick={() => history.push(`/provideroffer/${uid}`)} style={{ cursor: 'pointer' }}>Crear Oferta</div>
                                </div> :
                                    <div className="container-fluid mt-lg-5 mt-md-4 mt-sm-5 ">
                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <img src={chatimg} style={{ width: '50%' }} className="mx-auto text-center" />
                                            </div>
                                            <div className="col-md-12 text-center">
                                                <h1>   Seleccione Cualquier Usuario Para Chatear </h1>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div class="messages" style={{ overflowY: "scroll", }}>
                                    <ul >
                                        {msg ?
                                            msg.filter((val) => {
                                                if (search == '') {
                                                    return (val)
                                                } else if ((val.location).toLowerCase().includes(search)) {
                                                    return (val)
                                                }
                                            }).map((val, id) => {
                                                return (
                                                    <>
                                                        <li class={decoded.sub == val.from_user ? 'replies' : 'sent'} ref={divRef} value={val.to_user == id ? 'me hu' : 'dost'}>
                                                            <img src={decoded.sub === val.from_user ? Imagedata.profile_image : ImageProfile} alt="" style={{ borderRadius: 50, width: 30, height: 30 }} />
                                                            {(val.message).slice(0, 8) == 'https://' ? <p >Descarga De Archivos: <a href={val.message} download><i className="fa fa-download px-2 text-white"></i></a></p> : <p>{val.message}</p>}
                                                        </li>
                                                    </>
                                                )
                                            }) : ''}
                                    </ul>
                                </div>
                                {username ? <div class="message-input">
                                    <div class="d-flex bg-light">
                                        <input type="text" placeholder="Write your message..." onChange={(e) => setsentMsg(e.target.value)} value={sentmsg} onKeyPress={handleKeyDown} />
                                        <i class="fa fa-paperclip mx-auto p-2 my-auto" aria-hidden="true" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickmenu}></i>
                                        <Menu id="simple-menu"
                                            anchorEl={anchorElmenu}
                                            keepMounted
                                            open={Boolean(anchorElmenu)}
                                            onClose={handleClosemenu}
                                        >
                                            <label ><MenuItem onClick={handleClosemenu} >Imagenes<input type="file" onChange={docOnchange} accept="image/*" className="d-none" /></MenuItem></label>
                                            <label ><MenuItem onClick={handleClosemenu} >Documentos <input type="file" onChange={docOnchange} className="d-none" /></MenuItem></label>
                                        </Menu>
                                        <button class="submit btn btn-primary my-1 mx-1" onClick={() => Message()}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                                    </div>
                                </div> : ""
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>





        </>
    );
}

