import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
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


    function TotalClient() {
        const { data: response } = axios.get(`https://api.woofics.com/api/total_client`)
            .then((response) => {
                console.log(response.data)
                settotalClient(response.data)
            }, (Error) => {

                console.log(Error);
            });
    }

    //...total Provider

    function TotalSupplier() {
        const { data: response } = axios.get(`https://api.woofics.com/api/total_supplier`)
            .then((response) => {
                console.log(response.data)
                settotalSupplier(response.data)
            }, (Error) => {

                console.log(Error);
            });
    }

    //.......Total Provider

    function TotalProvider() {
        const { data: response } = axios.get(`https://api.woofics.com/api/total_provider`)
            .then((response) => {
                console.log(response.data)
                settotalProvider(response.data)
            }, (Error) => {

                console.log(Error);
            });
    }


    //....Completed Projectt
    function CompletedPro() {
        const { data: response } = axios.get(`https://api.woofics.com/api/completed_projects`)
            .then((response) => {
                console.log(response.data)
                setCompletedProject(response.data)
            }, (Error) => {

                console.log(Error);
            });
    }
    //...ongoing pro
    function OngoingPro() {
        const { data: response } = axios.get(`https://api.woofics.com/api/ongoing_projects`)
            .then((response) => {
                console.log(response.data)
                setOnGoingProject(response.data)
            }, (Error) => {

                console.log(Error);
            });
    }
    //....TOtal 
    function TotalSer() {
        const { data: response } = axios.get(`https://api.woofics.com/api/service`)
            .then((response) => {
                console.log(response.data)
                settotalServ(response.data)
            }, (Error) => {

                console.log(Error);
            });
    }

    //.......Count Blogs

    function CountBlogs() {
        const { data: response } = axios.get(`https://api.woofics.com/api/count_blog`)
            .then((response) => {
                console.log(response.data)
                settotalBlogs(response.data)
            }, (Error) => {

                console.log(Error);
            });
    }

    //...pending reg

    function PendingRegistration() {
        const { data: response } = axios.get(`https://api.woofics.com/api/pending_registration`)
            .then((response) => {
                console.log(response.data)
                setPendingReg(response.data)
            }, (Error) => {

                console.log(Error);
            });
    }

    //...Complain Count

    function CountComplain() {
        const { data: response } = axios.get(`https://api.woofics.com/api/count_complains`)
            .then((response) => {
                console.log(response.data)
                setTotalComplain(response.data)
            }, (Error) => {

                console.log(Error);
            });
    }



    //...Complain Count

    function TotoalUsers() {
        const { data: response } = axios.get(`https://api.woofics.com/api/total_users`)
            .then((response) => {
                console.log(response.data)
                setTotalUser(response.data)
            }, (Error) => {

                console.log(Error);
            });
    }


    //...Complain Count

    function TotoalProject() {
        const { data: response } = axios.get(`https://api.woofics.com/api/per_month_project`)
            .then((response) => {
                console.log(response.data)
                setTotalPerProjects(response.data)
            }, (Error) => {

                console.log(Error);
            });
    }

    const [user, setuser] = useState([])
    function TotoalUser() {
        const { data: response } = axios.get(`https://api.woofics.com/api/per_month_user`)
            .then((response) => {
                console.log(response.data)
                setuser(response.data)
            }, (Error) => {

                console.log(Error);
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
    }, [])






    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];


    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    // TotalPerProjects
    const data02 = [
        {
            name: "Jan",
            value: 0
          },
          {
            name: "Feb",
            value: 0
          },
          {
            name: "Mar",
            value: 0
          },
          {
            name: "Apr",
            value: 0
          },
          {
            name: "May",
            value: 0
          },
          {
            name: "Jun",
            value: 0
          },
          {
            name: "Jul",
            value: 1
          },
          {
            name: "Aug",
            value: 0
          },
          {
            name: "Sep",
            value: 0
          },
          {
            name: "Oct",
            value: 0
          },
          {
            name: "Nov",
            value: 0
          },
          {
            name: "Dec",
            value: 0
          }
    ];
    // console.log("Data variable value "+TotalPerProjects)

    return (
        <>


            <div className="page-wrapper bg-light">
                <div class="grey-bg container-fluid">
                    <section id="minimal-statistics">
                        <div class="row">
                            <div class="col-xl-4 col-sm-6 col-12 mx-auto">
                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-20488.jpg?size=626&ext=jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                    <div class="card-content">
                                        <div class="card-body">
                                            <div class="media d-flex">
                                                <div class="align-self-center">
                                                    <i class="fas fa-users fa-4x icon-pencil primary font-large-2 float-left" style={{ color: "#9b88f6" }}></i>
                                                </div>
                                                <div class="media-body text-right">
                                                    <h1 className="bold">{totalClient}</h1>
                                                    <span>Total Clients</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6 col-12 mx-auto">
                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c2luZXNzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                    <div class="card-content">
                                        <div class="card-body">
                                            <div class="media d-flex">
                                                <div class="align-self-center">
                                                    <i class="fa fa-cog fa-4x  icon-speech warning font-large-2 float-left" style={{ color: "#f25c8a" }}></i>
                                                </div>
                                                <div class="media-body text-right">
                                                    <h1 className="bold">{totalSupplier}</h1>
                                                    <span>Total Suppliers</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6 col-12 mx-auto">
                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVzaW5lc3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                    <div class="card-content">
                                        <div class="card-body">
                                            <div class="media d-flex">
                                                <div class="align-self-center">
                                                    <i class="fa fa-user fa-4x   icon-graph success font-large-2 float-left" style={{ color: "#9b88f6" }}></i>
                                                </div>
                                                <div class="media-body text-right">
                                                    <h1 className="bold">{totalProvider}</h1>
                                                    <span>Total Provider</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6 col-12 mx-auto">
                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://media.istockphoto.com/photos/business-development-to-success-and-growing-growth-concept-pointing-picture-id1145631842?k=6&m=1145631842&s=612x612&w=0&h=D9ToEIi64qlA4_w-VmN9CBvfW-D4DKvdJrG1jJU-GPk=')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                    <div class="card-content">
                                        <div class="card-body">
                                            <div class="media d-flex">
                                                <div class="align-self-center">
                                                    <i class="fa fa-rss fa-4x   icon-pointer danger font-large-2 float-left" style={{ color: "#f25c8a" }}></i>
                                                </div>
                                                <div class="media-body text-right">
                                                    <h1 className="bold">{totalBlogs}</h1>
                                                    <span>Total Blogs</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6 col-12 mx-auto">
                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://images.all-free-download.com/images/graphicthumb/business_exchange_picture_170372.jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                    <div class="card-content">
                                        <div class="card-body">
                                            <div class="media d-flex">
                                                <div class="align-self-center">
                                                    <i class="fa fa-tasks fa-4x  icon-pencil primary font-large-2 float-left" style={{ color: "#9b88f6" }}></i>
                                                </div>
                                                <div class="media-body text-right">
                                                    <h1 className="bold">{CompletedProject}</h1>
                                                    <span>Completed Projects</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6 col-12 mx-auto">
                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVzaW5lc3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                    <div class="card-content">
                                        <div class="card-body">
                                            <div class="media d-flex">
                                                <div class="align-self-center">
                                                    <i class="fa fa-spinner fa-4x  icon-speech warning font-large-2 float-left" style={{ color: "#f25c8a" }}></i>
                                                </div>
                                                <div class="media-body text-right">
                                                    <h1 className="bold">{OnGoingProject}</h1>
                                                    <span>Ongoing Projects</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6 col-12 mx-auto">
                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://eltamayoz.com/images/files/pages/about.jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                    <div class="card-content">
                                        <div class="card-body">
                                            <div class="media d-flex">
                                                <div class="align-self-center">
                                                    <i class="fas fa-handshake fa-4x   icon-graph success font-large-2 float-left" style={{ color: "#9b88f6" }}></i>
                                                </div>
                                                <div class="media-body text-right">
                                                    <h1 className="bold">{PendingReg}</h1>
                                                    <span>Pending Registration</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6 col-12 mx-auto">
                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://picjumbo.com/wp-content/uploads/woman-checking-her-to-do-list-free-photo-1080x720.jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                    <div class="card-content">
                                        <div class="card-body">
                                            <div class="media d-flex">
                                                <div class="align-self-center">
                                                    <i class="fa fa-file fa-4x   icon-pointer danger font-large-2 float-left" style={{ color: "#f25c8a" }}></i>
                                                </div>
                                                <div class="media-body text-right">
                                                    <h1 className="bold">{totalServ}</h1>
                                                    <span>   Total       Services </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="container my-lg-5">
                        <div classNam="row">
                            {/* <div className="col-md-6 ">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={TotalPerProjects}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 80,
                                        bottom: 5,
                                    }}
                                    barSize={20}
                                >
                                    <XAxis
                                        dataKey="name"
                                        scale="point"
                                        padding={{ left: 10, right: 10 }}
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid strokeDasharray="1 1" />
                                    <Bar dataKey="users" fill="#52ba57" background={{ fill: "#eee" }} barSize={20} />
                                </BarChart>
                            </div>
                            <div className="col-md-6 ">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        dataKey="users"
                                        isAnimationActive={false}
                                        data={data}
                                        cx={200}
                                        cy={200}
                                        outerRadius={80}
                                        fill="#52ba57"
                                        label
                                    />
                                    <Tooltip />
                                </PieChart>
                            </div> */}

                            <div className="col-md-6" style={{ overflowX: "scroll" }}>
                                <BarChart width={730} height={300} data={user}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pv" fill="#f25c8a" />
                                    <Bar dataKey="uv" fill="#9b88f6" />
                                </BarChart>
                            </div>
                            <div className="col-md-6" style={{ overflowX: "scroll" }}>
                                <PieChart width={500} height={300}>
                                    <Pie data={TotalPerProjects ? TotalPerProjects : data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#f25c8a" />
                                    <Pie data={TotalPerProjects ? TotalPerProjects : data01} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#9b88f6" label />
                                </PieChart>
                            </div>


                        </div>
                        <div class="row ">
                            <div class="col-xl-4 col-sm-6 col-12 mx-auto mt-lg-4">
                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-20488.jpg?size=626&ext=jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                    <div class="card-content text-center">
                                        <div class="card-body">
                                            <div class="media d-flex " >

                                                <div class="media-body text-center">
                                                    <span>Service Provider SignUp Link:</span><br />
                                                    <small className="bold text-danger" >https://www.woofics.com/serviceprovider</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-sm-6 col-12 mx-auto mt-lg-4">
                                <div class="card" style={{ borderRadius: "10px", backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),url('https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-20488.jpg?size=626&ext=jpg')`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", }}>
                                    <div class="card-content text-center">
                                        <div class="card-body">
                                            <div class="media d-flex " >

                                                <div class="media-body text-center">
                                                    <span>Suppliers SignUp Link:</span><br />
                                                    <small className="bold text-danger">https://www.woofics.com/serviceprovider</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

