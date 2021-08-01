import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import { makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import StazBar from './Sidebar';
import jwt_decode from 'jwt-decode';






import CustomClientAuth from "../CustomClientAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function Project() {
    CustomClientAuth();
    let history = useHistory();


    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    const [form, setForm] = useState([]);
    const [rating1, setRating1] = useState(4);
    const [supplier, setSupplier] = useState('');
    const [ddays, setdays] = useState('');


    useEffect(() => {

        function Feedback() {
            const res = axios.get(`https://api.woofics.com/api/client_supplier_project/${decoded.sub}`)
                .then((res) => {
                    if (res) {
                        setForm(res.data)
                        setdays(parseInt(res.data.due_date))
                    }
                }, (error) => {
                    
                });

        }
        Feedback();
    }, [])


    const classes = useStyles();


    return (
        <>

            <div className="d-sm-flex">
            <StazBar></StazBar>

                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    



                   <div className="page-wrapper bg-light">
                        <div class="container">
                            <div id="blog" class="row ">
                                <div class="container-fluid pb-lg-4">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12 border bg-light ipad-res">
                                            <div className="d-md-flex mb-3">
                                                <h1 className="box-title h1 mb-0 text-center mx-auto">Manage Projects</h1>
                                            </div>
                                            <hr className="w-50" />
                                            <div className="table-responsive">
                                                <table  id="for-table-setting" className="table no-wrap for-table-setting" >
                                                    <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            <th className="border-top-0 text-white text-center">DATE</th>
                                                            <th className="border-top-0 text-white text-center">REQUESTS</th>
                                                            <th className="border-top-0 text-white text-center">OFFERS</th>
                                                            <th className="border-top-0 text-white text-center">DELIVERY DAYS</th>
                                                            <th className="border-top-0 text-white text-center">ACTIONS</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="data-row" >
                                                        {form == ''?<tr scope="row"><td  colspan="5"><h3 className="my-lg-3 mx-auto ">Nothing to show! Start creating projects...</h3></td> </tr>
                                                        :
                                                        form.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr style={{ height: '5rem' }} className="border-bottom">
                                                                        <td className="txt-oflo text-center bold">{val.created_at.slice(0, 10)}</td>
                                                                        <td className="text-oflo text-center bold">{val.description.slice(0, 30)}...</td>
                                                                        <td className="txt-oflo text-center bold">$ {val.price}</td>
                                                                        <td className="txt-oflo text-center bold">{val.delivery_days} Days</td>
                                                                        <td className="txt-oflo text-center bold">
                                                                            <button class="btn marginBottom10 greenbtn text-white" value={val.id} onClick={() => history.push(`/customerprojects/${val.supplier_id}/${val.id}`)} >More Details</button>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-12 gap10"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </>
    );
}

