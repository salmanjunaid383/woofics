import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import StazBar from './Stazbar';
import "../SuperPortal/superdashboard.css"
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar, Line, AreaChart, Area, Sector,
    LineChart, ResponsiveContainer
} from "recharts";

import CustomAdminAuth from "../CustomAdminAuth";

const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));

export default function SuperDashboard() {
    CustomAdminAuth();
    let history = useHistory();
    //....................DAshbaord API

    //..Total Client
    const [totalClient, settotalClient] = useState();
    const [totalSupplier, settotalSupplier] = useState();
    const [totalProvider, settotalProvider] = useState();
    const [totalBlogs, settotalBlogs] = useState();
    const [CompletedProject, setCompletedProject] = useState();
    const [OnGoingProject, setOnGoingProject] = useState();
    const [CancelledProject, setCancelledProject] = useState();
    const [totalServ, settotalServ] = useState();
    const [PendingReg, setPendingReg] = useState();
    const [TotalComplain, setTotalComplain] = useState();
    const [TotalUser, setTotalUser] = useState();
    const [TotalPerProjects, setTotalPerProjects] = useState();
    const [staz, setStaz] = useState(false);
    const [data,getData]=useState([]);

    function getRegister(){
        const {data: response}=axios.get(`https://api.woofics.com/api/latest_user`,{
            headers:window.header
          })
            .then((response) => {
                getData(response.data)
            }, (Error)=> {
                
            });
    }


    function TotalClient() {
        const { data: response } = axios.get(`https://api.woofics.com/api/total_client`,{
            headers:window.header
          })
            .then((response) => {
                
                settotalClient(response.data)
            }, (Error) => {

                
            });
    }


    //...total Provider

    function TotalSupplier() {
        const { data: response } = axios.get(`https://api.woofics.com/api/total_supplier`,{
            headers:window.header
          })
            .then((response) => {
                
                settotalSupplier(response.data)
            }, (Error) => {

                
            });
    }

    //.......Total Provider

    function TotalProvider() {
        const { data: response } = axios.get(`https://api.woofics.com/api/total_provider`,{
            headers:window.header
          })
            .then((response) => {
                
                settotalProvider(response.data)
            }, (Error) => {

                
            });
    }
    const classes = useStyles();

    //....Completed Projectt
    function CompletedPro() {
        const { data: response } = axios.get(`https://api.woofics.com/api/completed_projects`,{
            headers:window.header
          })
            .then((response) => {
                
                setCompletedProject(response.data)
            }, (Error) => {

                
            });
    }
    //...ongoing pro
    function OngoingPro() {
        const { data: response } = axios.get(`https://api.woofics.com/api/ongoing_projects`,{
            headers:window.header
          })
            .then((response) => {
                
                setOnGoingProject(response.data)
            }, (Error) => {

                
            });
    }
    //....TOtal 
    function TotalSer() {
        const { data: response } = axios.get(`https://api.woofics.com/api/service`,{
            headers:window.header
          })
            .then((response) => {
                
                settotalServ(response.data)
            }, (Error) => {

                
            });
    }

    //.......Count Blogs

    function CountBlogs() {
        const { data: response } = axios.get(`https://api.woofics.com/api/count_blog`,{
            headers:window.header
          })
            .then((response) => {
                
                settotalBlogs(response.data)
            }, (Error) => {

                
            });
    }

    //...pending reg

    function PendingRegistration() {
        const { data: response } = axios.get(`https://api.woofics.com/api/pending_registration`,{
            headers:window.header
          })
            .then((response) => {
                
                setPendingReg(response.data)
            }, (Error) => {

                
            });
    }

    //...Complain Count

    function CountComplain() {
        const { data: response } = axios.get(`https://api.woofics.com/api/count_complains`,{
            headers:window.header
          })
            .then((response) => {
                
                setTotalComplain(response.data)
            }, (Error) => {

                
            });
    }



    //...Complain Count

    function TotoalUsers() {
        const { data: response } = axios.get(`https://api.woofics.com/api/total_users`,{
            headers:window.header
          })
            .then((response) => {
                
                setTotalUser(response.data)
            }, (Error) => {

                
            });
    }


    //...Complain Count

    function TotoalProject() {
        const { data: response } = axios.get(`https://api.woofics.com/api/per_month_project`,{
            headers:window.header
          })
            .then((response) => {
                
                setTotalPerProjects(response.data)
                for (var i = 0; i < 12; i++) {
                    if (response.data[i].value !== 0) {
                        setStaz(true);
                    }

                }
            }, (Error) => {

                
            });


    }


    const [user, setuser] = useState([])
    function TotoalUser() {
        const { data: response } = axios.get(`https://api.woofics.com/api/per_month_user`,{
            headers:window.header
          })
            .then((response) => {
                
                setuser(response.data)
            }, (Error) => {

                
            });
    }





    useEffect(() => {
        TotalClient()
        TotalSupplier()
        TotalProvider()
        CountComplain()
        PendingRegistration()
        CountBlogs()
        TotoalUsers()
        CompletedPro()
        OngoingPro()
        TotalSer()
        TotoalProject()
        TotoalUser()
        getRegister();
    }, [])






    // const data = [
    //     {
    //         name: 'Page A',
    //         uv: 4000,
    //         pv: 2400,
    //         amt: 2400,
    //     },
    //     {
    //         name: 'Page B',
    //         uv: 3000,
    //         pv: 1398,
    //         amt: 2210,
    //     },
    //     {
    //         name: 'Page C',
    //         uv: 2000,
    //         pv: 9800,
    //         amt: 2290,
    //     },
    //     {
    //         name: 'Page D',
    //         uv: 2780,
    //         pv: 3908,
    //         amt: 2000,
    //     },
    //     {
    //         name: 'Page E',
    //         uv: 1890,
    //         pv: 4800,
    //         amt: 2181,
    //     },
    //     {
    //         name: 'Page F',
    //         uv: 2390,
    //         pv: 3800,
    //         amt: 2500,
    //     },
    //     {
    //         name: 'Page G',
    //         uv: 3490,
    //         pv: 4300,
    //         amt: 2100,
    //     },
    // ];


    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    // TotalPerProjects





    return (
        <>
            <div className="d-sm-flex">
                <StazBar></StazBar>

                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <div className="container-fluid page-wrapper">
                        <div className="back-button">
                         <a href="/"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
                         </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h1 style={{ fontSize: "27px", marginBottom: "20px", color: "#9b88f6", fontWeight: "bold" }}>Admin Dashboard</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-xl-12">


                                {/* <div className="page-wrapper bg-light"> */}
                                {/* <div class="grey-bg container-fluid"> */}
                                <div class="container-fluid">
                                    <section id="minimal-statistics">
                                        <div class="row salman-cards" style={{ border: "2px solid #f3f3f3", padding: "10px" }}>
                                            <div className="col-md-12">
                                                <h4 style={{ fontSize: "20px", marginTop: "20px", marginBottom: "20px", color: "#223e92" }}>All Information</h4>
                                            </div>
                                            <div class="col-xl-4 col-sm-6 col-md-4 col-lg-6 col-12 mx-auto">
                                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-20488.jpg?size=626&ext=jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                    <div class="card-content">
                                                        <div class="card-body">
                                                            <div class="media d-flex">
                                                                <div class="align-self-center">
                                                                    <i class="fas fa-users fa-3x icon-pencil primary float-left" style={{ color: "#9b88f6" }}></i>
                                                                </div>
                                                                <div class="media-body text-right" style={{ position: "relative" }}>
                                                                    <h1 className="bold">{totalClient}</h1>
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: "center", marginTop: "10px", fontSize: "15px" }}>Total Clients</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-4 col-sm-6 col-md-4 col-lg-6 col-lg-6 col-12 mx-auto">
                                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c2luZXNzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                    <div class="card-content">
                                                        <div class="card-body">
                                                            <div class="media d-flex">
                                                                <div class="align-self-center">
                                                                    <i class="fa fa-cog fa-3x  icon-speech warnin float-left" style={{ color: "#f25c8a" }}></i>
                                                                </div>
                                                                <div class="media-body text-right">
                                                                    <h1 className="bold">{totalSupplier}</h1>
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: "center", marginTop: "10px", fontSize: "15px" }}>Total Suppliers</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-4 col-sm-6 col-md-4 col-lg-6 col-12 mx-auto">
                                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVzaW5lc3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                    <div class="card-content">
                                                        <div class="card-body">
                                                            <div class="media d-flex">
                                                                <div class="align-self-center">
                                                                    <i class="fa fa-user fa-3x   icon-graph success   float-left" style={{ color: "#9b88f6" }}></i>
                                                                </div>
                                                                <div class="media-body text-right">
                                                                    <h1 className="bold">{totalProvider}</h1>
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: "center", marginTop: "10px", fontSize: "15px" }}>Total Provider</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-sm-6 col-md-4 col-lg-6 col-12 mx-auto">
                                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://media.istockphoto.com/photos/business-development-to-success-and-growing-growth-concept-pointing-picture-id1145631842?k=6&m=1145631842&s=612x612&w=0&h=D9ToEIi64qlA4_w-VmN9CBvfW-D4DKvdJrG1jJU-GPk=')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                    <div class="card-content">
                                                        <div class="card-body">
                                                            <div class="media d-flex">
                                                                <div class="align-self-center">
                                                                    <i class="fa fa-rss fa-3x   icon-pointer danger   float-left" style={{ color: "#f25c8a" }}></i>
                                                                </div>
                                                                <div class="media-body text-right">
                                                                    <h1 className="bold">{totalBlogs}</h1>
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: "center", marginTop: "10px", fontSize: "15px" }} >Total Blogs</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-sm-6 col-md-4 col-lg-6 col-12 mx-auto">
                                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://images.all-free-download.com/images/graphicthumb/business_exchange_picture_170372.jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                    <div class="card-content">
                                                        <div class="card-body">
                                                            <div class="media d-flex">
                                                                <div class="align-self-center">
                                                                    <i class="fa fa-tasks fa-3x  icon-pencil primary  float-left" style={{ color: "#9b88f6" }}></i>
                                                                </div>
                                                                <div class="media-body text-right">
                                                                    <h1 className="bold">{CompletedProject}</h1>
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: "center", marginTop: "10px", fontSize: "15px" }}>Completed Projects</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-sm-6 col-md-4 col-lg-6 col-12 mx-auto">
                                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVzaW5lc3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                    <div class="card-content">
                                                        <div class="card-body">
                                                            <div class="media d-flex">
                                                                <div class="align-self-center">
                                                                    <i class="fa fa-spinner fa-3x  icon-speech warnin float-left" style={{ color: "#f25c8a" }}></i>
                                                                </div>
                                                                <div class="media-body text-right">
                                                                    <h1 className="bold">{OnGoingProject}</h1>
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: "center", marginTop: "10px", fontSize: "15px" }}>Ongoing Projects</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-sm-6 col-md-4 col-lg-6 col-12 mx-auto">
                                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://eltamayoz.com/images/files/pages/about.jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                    <div class="card-content">
                                                        <div class="card-body">
                                                            <div class="media d-flex">
                                                                <div class="align-self-center">
                                                                    <i class="fas fa-handshake fa-3x   icon-graph success float-left" style={{ color: "#9b88f6" }}></i>
                                                                </div>
                                                                <div class="media-body text-right">
                                                                    <h1 className="bold">{PendingReg}</h1>
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: "center", marginTop: "10px", fontSize: "15px" }}>Pending Registration</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-sm-6 col-md-4 col-lg-6 col-12 mx-auto">
                                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://picjumbo.com/wp-content/uploads/woman-checking-her-to-do-list-free-photo-1080x720.jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                                    <div class="card-content">
                                                        <div class="card-body">
                                                            <div class="media d-flex">
                                                                <div class="align-self-center">
                                                                    <i class="fa fa-file fa-3x   icon-pointer danger  float-left" style={{ color: "#f25c8a" }}></i>
                                                                </div>
                                                                <div class="media-body text-right">
                                                                    <h1 className="bold">{totalServ}</h1>
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: "center", marginTop: "10px", fontSize: "15px" }}>   Total Services </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="table-div salman-table-change">
                                    <table  id="for-table-setting" className="for-table-setting table no-wrap for-table-setting">
                                        <tr className="heading-row">
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Date</th>
                                        </tr>

                                        {
                                            data.map((val,id) => {
                                                return(
                                                    <>
                                                        <tr className="data-row">
                                                        <td className="txt-oflo">{val.id}</td>
                                                        <td className="txt-oflo">{val.first_name} {val.last_name}</td>
                                                        <td className="txt-oflo">{val.email}</td>
                                                        <td className="txt-oflo">{val.date}</td>
                                                    </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        
                                    </table>
                                </div>

                            </div>
                            
                            {/* <div className="col-md-12 col-xl-4" style={{ border: "2px solid #f3f3f3" }}>

                                <div className="container my-lg-5">

                                    <div classNam="row">
                                        <div className="col-lg-12 col-md-12" style={{ overflowX: "scroll", margin: "auto" }}>
                                            <BarChart width={730} height={300} data={user} style={{ marginLeft: "-55px" }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="pv" fill="#f25c8a" />
                                                <Bar dataKey="uv" fill="#9b88f6" />
                                            </BarChart>
                                        </div>

                                        <div className="col-lg-12 col-md-12" style={{ overflowX: "scroll", margin: "auto", display: "flex", justifyContent: "center" }}>
                                            <PieChart width={500} height={300}>
                                                <Pie data={staz ? TotalPerProjects : data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#f25c8a" />
                                                <Pie data={staz ? TotalPerProjects : data01} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#9b88f6" label />
                                            </PieChart>
                                        </div>


                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <br></br>
                        <div class="row links-parent">
                            <div class="col-md-6 col-sm-6 col-12 col-xl-6 col-lg-6">
                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-20488.jpg?size=626&ext=jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                    <div class="card-content text-center">
                                        <div class="card-body" >
                                            <div class="media d-flex " >

                                                <div class="media-body text-center">
                                                    <span>Service Provider SignUp Link:</span><br />
                                                    <small className="bold text-danger" ><a href="https://www.woofics.com/proveedordeservicio"> https://www.woofics.com/proveedordeservicio </a></small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6 col-12 col-xl-6 col-lg-6">
                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-20488.jpg?size=626&ext=jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                    <div class="card-content text-center">
                                        <div class="card-body">
                                            <div class="media d-flex " >

                                                <div class="media-body text-center">
                                                    <span>Suppliers SignUp Link:</span><br />
                                                    <small className="bold text-danger"><a href="https://www.woofics.com/proveedordeservicio">https://www.woofics.com/proveedordeservicio</a></small>
                                                </div>
                                            </div>
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

