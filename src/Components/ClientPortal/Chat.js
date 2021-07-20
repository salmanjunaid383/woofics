import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams, } from 'react-router-dom'
import loginside from '../../Images/loginside.jpg'
import axios from 'axios';
import Sidebar from './Sidebar'
import Nav from './Nav'
import './Chat.css'
import jwt_decode from 'jwt-decode'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Pusher from 'pusher-js';
import chatimg from '../../Images/chat.png'
import franimg from './fran.jpg'
import FavoriteIcon from '@material-ui/icons/Favorite';
//Sidebar
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import message from './—Pngtree—chat icon_4756851.png'
import DashboardIcon from '@material-ui/icons/Dashboard';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Dashboard from './Dashboard';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AssistantIcon from '@material-ui/icons/Assistant';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import CallEndIcon from '@material-ui/icons/CallEnd';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import firebase from '../Firebase'
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

//.........
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CustomClientAuth from "../CustomClientAuth";

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
}));



export default function Chat() {
    CustomClientAuth();
    // history
    let history = useHistory();

    //token decode
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    const divRef = useRef(null);
    const[stazId,setStazId]=useState(0);
    
    
    
    //.......................................Pusher
    var mes;


    const [value, setValue] = useState('');

    const [mxg, setMxg] = useState('');
    
    
    const pusher = new Pusher('e22c56269c9258608b2c', {
        cluster: 'ap1'
      });;



    
    // console.log("channel "+channel);

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
                        console.log("userID "+id+" to user "+stazId);
                        console.log(Error);
                    })
            }
            Users();
        });
    }, [])
    const [anchorElmenu, setAnchorElmenu] = React.useState(null);
    const handleClickmenu = (event) => {
        setAnchorElmenu(event.currentTarget);
    };

    const handleClosemenu = () => {
        setAnchorElmenu(null);
    };


    

    //Making Contact
    const [user, setUser] = useState([]);
    useEffect(() => {

        function SendData() {
            const { data: response } = axios.get(`https://api.woofics.com/api/associate/${decoded.sub}`,)
                .then((response) => {
                    if (response) {       
                        setUser(response.data)
                        
                    }
                }, (Error) => {
                    //  
                    // console.log(Error);
                });
        }
        SendData();
       
    }, [])

    function SendData() {
        const { data: response } = axios.get(`https://api.woofics.com/api/associate/${decoded.sub}`,)
            .then((response) => {
                if (response) {
                    // console.log(response.data)
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
            var agree = window.confirm('Do you want to send this image/Doc ?')
            if (agree) {
                const res = axios.post(`https://api.woofics.com/api/message`, {
                    from_user: id,
                    to_user: uid,
                    message: url,
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
                                        console.log(response.data)
                                        setMsg(response.data)
                                        setRight(response.data.from_user)
                                        SendData()
                                        // divRef.current.scrollIntoView({ behavior: 'smooth' });

                                    }
                                }, (Error) => {
                                    // console.log(Error);
                                })
                        }
                        Users()
                        setsentMsg('')
                    }, (Error) => {
                        // console.log(Error);
                    });
            }
        })
    }

    var valuStaz=0;

    //Conatct List
    function Users(valu, name) {
        const { data: response } = axios.post(`https://api.woofics.com/api/history`, {
            from_user: id,
            to_user: valu
        })
            .then((response) => {
                if (response) {
                    valuStaz=valu;
                    // console.log(response.data)
                    setMsg(response.data)
                    setRight(response.data.from_user)
                    SendData()
                    setUid(valu)
                    setStazId(valu);
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
                                console.log(response.data)
                                setMsg(response.data)
                                setRight(response.data.from_user)
                                SendData()
                                // divRef.current.scrollIntoView({ behavior: 'smooth' });

                            }
                        }, (Error) => {
                            // console.log(Error);
                        })
                }
                Users()
                setsentMsg('')
            }, (Error) => {
                // console.log(Error);
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

    //sending message 
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
        // divRef.current.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
    };



    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const url = window.location.href



    const [anchorElnoti, setAnchorElnoti] = React.useState(null);

    const handleClicknoti = (event) => {
        notification()
        setAnchorElnoti(event.currentTarget);
    };

    const handleClosenoti = () => {
        setAnchorElnoti(null);
    };

    const opennoti = Boolean(anchorElnoti);
    const idnoti = opennoti ? 'simple-popover' : undefined;




    // popver Profile

    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;



    const Data = [
        {
            name: 'Dashboard',
            icon: <DashboardIcon  style={{color:"white"}}/>,
            to: 'dashboard'
        },
        {
            name: 'Services',
            icon: <InsertEmoticonIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'addservice'
        },
        {
            name: 'Offers',
            icon: <LocalOfferIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'customeroffer'
        },
        {
            name: 'Projects',
            icon: <PlaylistAddCheckIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'project'
        },
        {
            name: 'Service Provider',
            icon: <AssistantIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'suppliers'
        },
        {
            name: 'Discussion Forum',
            icon: <ContactMailIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'clientdiscussionforum'
        },
        {
            name: 'Help',
            icon: <LiveHelpIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'help'
        },
        {
            name: 'Complain',
            icon: <CallEndIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'complain'
        },


    ]

    const drawer = (
        <div>
            <Link className="navbar-brand " to="/dashboard">
                <span className="logo-text text-dark p-0 m-0 text-center">
                   <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px' , marginTop:"20px", marginBottom:"10px"}}/>
                </span>
            </Link>
            <div className={classes.toolbar} />
           
            <List>
                {Data.map((text, index) => (
                    <Link to={text.to} className={classes.link}>
                          <ListItem button key={text} className={text.name == "Dashboard"? classes.item : ''}>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.name} style={{marginLeft:"-17px"}} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    // const container = window !== undefined ? () => window().document.body : undefined;

    const [newnoti, setnewnoti] = useState([]);

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function notification() {
        const { data: response } = axios.get(`https://api.woofics.com/api/notification/${decoded.sub}`)
            .then((response) => {
                setnewnoti(response.data)
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
    function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`)
            .then((response) => {
                notification()
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

    useEffect(() => {
        chatnotification()
        seen()
    }, [])

    const [Imagedata, setImageData] = useState('');

    function getData() {
        const res = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((res) => {
                setImageData(res.data)
            }
            )

    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>



            <div className="d-sm-flex">
                {/* <CssBaseline /> */}
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <ul className="ml-auto d-flex my-auto">
                            <li className="my-auto">
                                <Link to="/chat" className="profile-pic" aria-describedby={id} variant="contained" color="primary" >
                                    <span className="text-white font-medium  "><Badge color="secondary" variant={UnseenMxg == 0 ? '' : 'dot'} >
                                        <MailIcon color="primary"/>
                                    </Badge></span>
                                </Link>
                            </li>
                            <li className="my-auto">
                                <a className="profile-pic" aria-describedby={id} variant="contained" data-toggle="tooltip" data-placement="top" title="Notifications" color="primary" onClick={handleClicknoti}>
                                    <span className="text-white font-medium  Ring"><Badge color="secondary" variant={unseen == 0 ? '' : 'dot'} >
                                        <NotificationsIcon color="primary" />
                                    </Badge></span>
                                </a>
                            </li>
                            <li>
                                <a className="profile-pic" aria-describedby={id} data-toggle="tooltip" data-placement="top" title="Settings" variant="contained" color="primary" onClick={handleClick2}>
                                    <span className="text-white font-medium "><img className="img-fluid mb-2" src={Imagedata.profile_image !== null ? Imagedata.profile_image :  "https://image.flaticon.com/icons/png/512/147/147144.png" } style={{ borderRadius: 50, width: 50, height: 50 }} /></span>
                                </a>
                            </li>
                        </ul>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            // container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                   


                    <div className="page-wrapper" >
                        <div id="frame">
                            <div id="sidepanel">
                                <div id="profile">
                                    <div class="wrap">
                                        <img id="profile-img" src={Imagedata.profile_image !== null ? Imagedata.profile_image :  "https://image.flaticon.com/icons/png/512/147/147144.png" } class="online" alt="" style={{ borderRadius: 50, width: 50, height: 50 }} />
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
                                                
                                                    {val.main_user === decoded.sub ?
                                                        <li class="contact active" onClick={() => { Users(val.associate_user, val.main_name); setUsername(val.associate_name); setImageProfile(val.avatar) }}>
                                                        <div class="wrap text-left">
                                                            <img src={val.avatar} style={{ borderRadius: 50, width: 50, height: 50 }} alt="" />
                                                            <div class="meta">
                                                                <p className="name chatCapitalize mb-0 pb-0">{val.associate_name}</p>
                                                                {val.total_seen != 0 ? <p class="preview pl-md-5 text-danger text-left" style={{ width: '950px' }}>{val.total_seen} Unread messages...</p> : <p class="preview pl-md-5 text-left " style={{ width: '950px' }}> {val.last_message ? (val.last_message).slice(0, 20) + '...' : ''}</p>}
                                                            </div>
                                                        </div>
                                                        </li>
                                                        :
                                                        null
                                                    }
                                                </>
                                            )
                                        })}

                                    </ul>
                                </div>
                            </div>
                            <div class="content ">
                                {username ? <div class="contact-profile">
                                    <img src={ImageProfile} alt="" style={{ borderRadius: 50, width: 50, height: 50 }} />
                                    <p className="ChatCapitalize">{username}</p>
                                </div> :
                                    <div className="container-fluid mt-lg-5 mt-md-4 mt-sm-5 ">
                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <img src={chatimg} style={{ width: '50%' }} className="mx-auto text-center" />
                                            </div>
                                            <div className="col-md-12 text-center">
                                                <h1>   Select Any User To Chat </h1>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div class="messages" style={{ overflowY: "scroll" }}>
                                    <ul >
                                        {msg ?
                                            msg.map((val, id) => {
                                                return (
                                                    <>
                                                        <li class={decoded.sub == val.from_user ? 'replies' : 'sent'} ref={divRef} value={val.to_user == id ? 'me hu' : 'dost'}>
                                                            <img src={decoded.sub === val.from_user ? Imagedata.profile_image : ImageProfile} alt="" style={{ borderRadius: 50, width: 30, height: 30 }} />
                                                            {(val.message).slice(0, 8) == 'https://' ? <p >File Download: <a href={val.message} download><i className="fa fa-download px-2 text-white"></i></a></p> : <p>{val.message}</p>}
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
                                            <label ><MenuItem onClick={handleClosemenu} >Images<input type="file" onChange={docOnchange} accept="image/*" className="d-none" /></MenuItem></label>
                                            <label ><MenuItem onClick={handleClosemenu} >Documents <input type="file" onChange={docOnchange} className="d-none" /></MenuItem></label>
                                        </Menu>
                                        <button class="submit btn btn-primary my-1 mx-1" onClick={() => Message()}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                                    </div>
                                </div> : ""
                                }
                            </div>
                        </div>
                    </div>

                    {/* <div className="page-wraper" style={{ overflowY: 'scroll', overflowX: 'unset' ,height:'100vh'}} >
                        <div className="container p-0 m-0">
                            <div className="container p-0 m-0" style={{ overflowY: 'scroll', overflowX: 'unset',height:'100vh' }}>
                                <div id="frame" >
                                    <div id="sidepanel">
                                        <div id="profile">
                                            <div class="wrap">
                                                <img id="profile-img" src={Imagedata.profile_image !== null ? Imagedata.profile_image :  "https://image.flaticon.com/icons/png/512/147/147144.png" } class="online" alt="" />
                                                <p>Woofic</p>
                                            </div>
                                        </div>
                                        <div id="search">
                                            <div className="row">
                                                <div className="col-md-12 text-center" style={{ cursor: 'pointer' }}>
                                                    Chat
                                    </div>
                                            </div>
                                        </div>
                                        <div id="contacts" >
                                            <ul>
                                                {user.map((val, id) => {
                                                    return (
                                                        <>
                                                            {val.id === decoded.sub ?
                                                                null
                                                                :
                                                                <li class="contact" value={val.id} onClick={() => { Users(val.associate_user, val.main_name); setUsername(val.associate_name); setImageProfile(val.avatar) }}>
                                                                    <div class="wrap">
                                                                        <img src={val.avatar} style={{borderRadius:50,width:50,height:50}}/>
                                                  
                                                                        <div class="meta">
                                                                            <p class="name ChatCapitalize">{val.associate_name}</p>
                                                                            {val.total_seen != 0 ? <p class="preview text-danger">{val.total_seen} Unread messages...</p> : <p class="preview"> Unread messages...</p>}
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            }
                                                        </>
                                                    )
                                                })}            </ul>
                                        </div>
                                    </div>
                                    <div class="content" >
                                        {username ? <div class="contact-profile">
                                            <img src={ImageProfile} alt="" />
                                            <p className="ChatCapitalize">{username}</p>
                                        </div> :
                                            <div className="container-fluid mt-lg-5 mt-md-4 mt-sm-5 ">
                                                <div className="row">
                                                    <div className="col-md-12 text-center">
                                                        <img src={chatimg} style={{ width: '50%' }} className="mx-auto text-center" />
                                                    </div>
                                                    <div className="col-md-12 text-center">
                                                        <h1>   Select Any User To Chat </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <div class="messages" style={{ width: '100%', padding: '10px' }}>
                                            <ul >
                                                {msg ?
                                                    msg.map((val, id) => {
                                                        return (
                                                            <>
                                                                <li ref={divRef} class={decoded.sub == val.from_user ? 'replies' : 'sent'} value={val.to_user == id ? 'me hu' : 'dost'}>
                                                                    <img src={decoded.sub === val.from_user ? Imagedata.profile_image : ImageProfile} alt="" style={{borderRadius:50,width:30,height:30}}/>
                                                                    <p >{val.message}</p>
                                                                </li>
                                                            </>
                                                        )
                                                    }) : ''}
                                            </ul>
                                        </div>
                                        {username ? <div class="message-input">
                                            <div class="d-flex">
                                                <input type="text" placeholder="Write your message..." onChange={(e) => setsentMsg(e.target.value)} value={sentmsg} onKeyPress={handleKeyDown} />
                                                <i class="fa fa-paperclip mx-auto p-2 " aria-hidden="true"></i>
                                                <button class="submit btn btn-primary my-1 mx-1" onClick={() => Message()}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                                            </div>
                                        </div> : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </main>
            </div>

            <Popover
                id={idnoti}
                open={opennoti}
                anchorEl={anchorElnoti}
                onClose={handleClosenoti}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {newnoti == '' ? <Typography className={classes.typography}>
                    <a className="profile-pic" >
                        <span className="text-black font-medium ml-1">No Notification !</span>
                    </a>
                </Typography> :
                    newnoti.slice(0, 5).map((val) => {
                        return (
                            <>
                                <Link to={`/${val.link}`}>
                                    <Typography className={`${classes.typography} bg-light text-dark`} >
                                        <a className="profile-pic" >
                                            <span className="text-black font-medium ml-1">{val.notification} <span className="float-right text-danger pl-md-2" onClick={() => notificationDelete(val.id)}><i className="fa fa-close"></i></span></span>
                                        </a>
                                    </Typography>
                                </Link>
                            </>
                        )
                    }).reverse()

                }
                <Link to='/clientallnotification'>
                    <Typography className={`${classes.typography} bg-dark text-light`} >
                        <a className="profile-pic" >
                            <span className="text-black font-medium ml-1">See all Notification <span className="float-right text-light pl-md-2"><i className="fa fa-arrow-right"></i></span></span>
                        </a>
                    </Typography>
                </Link>
            </Popover>



            {/* //profile popover */}

            <Popover
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                onClose={handleClose2}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>
                    <Link className="profile-pic" to="/updateprofile" style={{ textDecoration: 'none' }}>
                        <i className="fa fa-user mx-3"></i>
                        <span className="text-black font-medium mr-3">Profile</span>
                    </Link>
                </Typography>
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => history.push('/responses')}>
                        <i className="fa fa-support mx-3"></i>
                        <span className="text-black font-medium mr-3">Help & Support</span>
                    </a>
                </Typography>
                <hr />
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => { history.push('/') }}>
                        <i className="fa fa-home mx-3"></i>
                        <span className="text-black font-medium mr-3">Go home</span>
                    </a>
                </Typography>
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => { localStorage.removeItem('user_token'); history.push('/') }}>
                        <i className="fa fa-sign-out mx-3"></i>
                        <span className="text-black font-medium mr-3">Logout</span>
                    </a>
                </Typography>

            </Popover>


            {url === 'http://woofic.nastechltd.co/chat' ?
                ' '
                :
                <Link to="/chat">
                    <img src={message} style={{ width: '50px', position: 'fixed', float: 'right', bottom: '28px', right: '30px', zIndex: '100', backgroundColor: 'rgba(7, 72, 138, 0.71)', borderRadius: '50px' }} />
                </Link>
            }

            {/* <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={0}
                onClose={handleClose}
                message={mxg}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            /> */}

        </>
    );
}

