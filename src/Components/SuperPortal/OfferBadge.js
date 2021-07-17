import React, { useState, useEffect } from "react";
import {useHistory } from 'react-router-dom'
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import StazBar from './Stazbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));
export default function OfferBadge() {


    const [blog, setBlog] = useState([]);

    function getReg() {

        const { data: response } = axios.get(`https://api.woofics.com/api/offer`)
            .then((response) => {
                setBlog(response.data)
                console.log(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }

    useEffect(() => {
        getReg();
    }, [])


    const [res, setRes] = useState('');
    function deleteAdv(e) {
        var result = window.confirm("Want to delete?");
        if (result) {
            const { data: response } = axios.put(`https://api.woofics.com/api/offer/${e}`)
                .then((response) => {
                    if (response) {
                        setRes(response.data)
                        getReg();

                    }
                }, (Error) => {
                    console.log(Error);
                });

        }
    }

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
                        <div class="d-md-flex mb-3">
                            <h3 class="box-title mb-0 h1 text-center mx-auto" style={{fontSize:"16px", lineHeight:"30px", fontWeight:"500"}}>OFFERS</h3>
                        </div>
                        <div class="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="table-responsive">
                                        
                                            {blog.map((val, key) => {
                                                return (
                                                    <>
                                                        <div class="col-xl-12 col-md-12 mx-auto shadow p-3 mb-3 " style={{ backgroundColor: "white", border: '3px #f95c87 solid', borderRadius: 10 }}>
                                                            <div className="row">
                                                                <div className="col-md-2 text-center"><img src={val.profile_image == "xyz.jpg" ? "https://www.pngfind.com/pngs/m/34-349693_circled-user-icon-transparent-background-username-icon-hd.png" : val.profile_image} className="img-fluid " style={{ width: 100, borderRadius: 150 }} /></div>
                                                                <div className="col-md-5">
                                                                    <h5>{val.description}</h5>
                                                                    <h4>{val.first_name + "" + val.last_name}</h4>
                                                                    <StarRatings
                                                                        starRatedColor='rgb(230, 67, 47)'
                                                                        rating={val.rating}
                                                                        starDimension="15px"
                                                                        starSpacing="3px"
                                                                    />
                                                                    <p><i className="fa fa-phone pr-2 pt-2 "></i>{val.contact_number}</p>
                                                                    <p><i className="fa fa-envelope pr-2 "></i>{val.email}</p>
                                                                    <p><i className="fa fa-question pr-2 "></i>{val.service}</p>
                                                                </div>
                                                                <div className="col-md-5 text-right p-md-5 ">
                                                                    <p>All COntract</p>
                                                                    <h3 style={{ fontWeight: 'bold' }}>$ {val.price}</h3>
                                                                    {/* <small>20% discount</small> */}
                                                                </div>
                                                            </div>
                                                            <div className="row py-3 px-2">
                                                                <span className="ml-auto">
                                                                    <div className="p-2 border-danger bg-light text-dark mx-3"  >{val.locked === 0 ? 'Approved' : 'Not approved'} <i className={`${val.locked === 0 ? "fa fa-check" : "fa fa-close"} ${val.locked === 0 ? "text-success" : "text-danger"} pl-3 `}></i> </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }).reverse()}
                                            {/* </tbody>
                                            </table> */}
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

