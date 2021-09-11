import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import StazBar from "./Stazbar";
import { makeStyles} from '@material-ui/core/styles';

import CustomAdminAuth from "../CustomAdminAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));


export default function LedgerView() {
    CustomAdminAuth();
    let history = useHistory();
    let { cheid } = useParams();
    let { cheche } = useParams();
    const[totalAmount,setTotalAmount]=useState(0)

    const [article, setArticle] = useState([]);


    function getSupledger() {

        const { data: response } = axios.get(`https://api.woofics.com/api/supplier_ledger_balance/${cheid}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setArticle(response.data[0])
                setTotalAmount(response.data.balance)
                
            }, (Error) => {
                
            });
    }

    function getSerledger() {

        const { data: response } = axios.get(`https://api.woofics.com/api/service_provider_balance/${cheid}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setArticle(response.data[0])
                setTotalAmount(response.data.balance)
                
            }, (Error) => {
                
            });
    }

    useEffect(() => {
        if (cheche === "supplier") {
            getSupledger();
        } else {
            getSerledger()
        }
    }, [])



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
                        <div class="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="d-md-flex mb-3">
                                        <h1 className=" h1 mb-0 text-center mx-auto">Libro mayor</h1>
                                    </div>
                                    <div className="table-responsive salman-table-change">
                                        <table  id="for-table-setting" className="table no-wrap" style={{tableLayout:"fixed", width:"100%"}}>
                                            <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                <tr>
                                                <th className="border-top-0 text-white text-center">Id</th>
                                                    <th className="border-top-0 text-white text-center">EQUILIBRIO</th>
                                                    <th className="border-top-0 text-white text-center">CREADO EN</th>
                                                </tr>
                                            </thead>
                                            <tbody id="data-row">
                                                {

                                                    article == '' ? <h3 className="mt-5"> Nada Que Mostrar!</h3> :
                                                        article.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td className="txt-oflo text-center">{val.id}</td>
                                                                        <td className="txt-oflo text-center">{val.balance}</td>
                                                                        <td className="txt-oflo text-center">{(val.created_at).slice(0, 10)}</td>
                                                                        {/* <td className="text-danger text-center"><button class={val.locked !== 0 ? "btn text-white btn-danger" : "btn text-white btn-success"} value={val.id} onClick={(e) => history.push(`/ledgerview/${val.id}`)}>View more</button></td> */}
                                                                    </tr>
                                                                </>
                                                            )
                                                        })}
                                                {
                                                    article !== '' ?
                                                    <tr style={{marginTop:'10px'}}><td className="txt-oflo text-center">Cantidad total : {totalAmount} $ </td>
                                                    <td></td><td></td>
                                                    </tr> : <h3></h3>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >

        


        </>
    );
}

