import React, { useState ,useEffect} from "react";
import { useHistory ,useParams} from 'react-router-dom'
import axios from 'axios';
import './DiscussionForum.css'
import Navbar from './Navbar' 

import Footer from './LandingPage/components/Footer'

export default function Moredetailsdiscussionforum() {
    let history = useHistory();

  const {quid} =useParams()

    const [question, setQuestion] = useState("");

    function getQuestion() {

        const { data: response } = axios.get(`https://api.woofics.com/api/forum_question/${quid}`)
            .then((response) => {
                setQuestion(response.data);
                
            }, (error) => {
                
            });
        }
        
    const [allreplies, setAllreplies] = useState([]);
    
    function getReply() {

        const { data: response } = axios.get(`https://api.woofics.com/api/forum_answer/${quid}`)
        .then((response) => {
            setAllreplies(response.data);
            
        }, (error) => {
            
        });
    }
    
    
    const [reply, setReply] = useState("");
    
    // function Forum(e) {
    //     e.preventDefault();

    //     const { data: response } = axios.post(`https://api.woofics.com/api/forum_answer`, {
    //         answer: reply,
    //         forum_question_id: quid,
    //         replied_by:'Mubeen Malik'
    //     })
    //     .then((response) => {
    //         
    //         getQuestion();
    //         getReply();
    //         setReply('');
    //         }, (error) => {
    //             
    //         });
    // }



    useEffect(() => {
        getQuestion();
        getReply();
    }, [])


    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
    
    return (
        <>
             {/* <div class="topnav" id="myTopnav">
                <Link to="/" >
                    <img src={logo} className="img-fluid float-left w-50 pl-lg-4" />
                </Link>
                <Link className="sm-mt-3" to="/">Home</Link>
                <Link to="/allblog">Blog</Link>
                <Link to='/contactus'>About Us</Link>
                <Link to='/calculadora_de_precios'>Price Calculator</Link>
                <Link to="/foro_de_discusion">Forum</Link>
                <Link to="/login" className="float-right mr-lg-4"> <button type="submit" class="f-button btn btn-white text-white ">Login/Register</button></Link>
                <a href="javascript:void(0);" class="icon" onClick={myFunction}>
                    <i class="fa fa-bars"></i>
                </a>
            </div> */}
            <Navbar />

            <div className="container mt-100">

                <div className="row">
                    <div className="col-md-12">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <div className="media flex-wrap w-100 align-items-center">
                                        <div className="media-body ml-3"> <a href="javascript:void(0)" data-abc="true">{question.asked_by}</a>
                                            <div className="text-muted small">{question ? (question.created_at).slice(0, 10) : ''}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p> {question.question}
                     </p>
                                </div>
                                <div className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                                   {
                                   allreplies.map((val,id)=>{
                                       return(
                                           <>

                                   <div className="container w-75 my-2">
                                        <div className="media flex-wrap w-100 align-items-center">
                                            <div className="media-body ml-3 w-100"> <a href="javascript:void(0)" data-abc="true">{val.replied_by}</a>
                                                <div className="text-muted small">{(val.created_at).slice(0, 10)}</div>
                                            </div>
                                            <div className="mt-2 border-top w-100">
                                            <p> {val.answer}</p> 
                                            </div>
                                        </div>
                                    </div>
                                           </>
                                       )
                                   }) 
                                    }
                                    {/* <div className="col-md-12 text-center">
                                        <input type="text" placeholder="Type reply..." className="w-75 py-2.5" value={reply} onChange={(e)=>setReply(e.target.value)}/><button className="p-2 mx-3" onClick={Forum}>Send</button>
                                    </div> */}
                                </div>
                            </div>
                    </div>
                </div>
            </div>



<Footer/>






            
        </>
    );
}

