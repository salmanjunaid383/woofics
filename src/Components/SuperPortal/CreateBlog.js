import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';

import StazBar from './Stazbar';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import firebase from '../Firebase'
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import CustomAdminAuth from "../CustomAdminAuth";





const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));


export default function CreateBlog() {
    CustomAdminAuth();
    let history = useHistory();

    const [author, setAuthor] = useState("");
    const [article, setArticle] = useState("");

    const [wait, setwait] = useState('Add Blog');
    const [disable, setdisable] = useState('');
 const [imageUrl, setImageUrl] = useState('')
    function Feedback(e) {
        e.preventDefault();
        
        if(author === "" || article === "" || imageUrl === "")
        {
            window.alert("Please fill the form");
        }
        else{
            setwait('Please wait...')
            setdisable('disabled')
            const res = axios.post(`https://api.woofics.com/api/blog`, {
            author: author,
            article: article,
            status: 'pending',
            image: imageUrl
        })
            
            .then((res) => {
                if (res) {
                    console.log("Blog post request");
                    setwait('Add Blog')
                    setdisable('')
                    history.push('/blog');
                }
            }, (error) => {

                
                setwait('Add Blog')
                setdisable('')
                console.log(Error);
                history.push('/createblog');
            });
        }
        

    }

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();


    //..............................IMagse
   
    const [Progress, setProgress] = useState('');


    const onchange = async (e) => {
        setProgress('Loading...')
        const file = e.target.files[0];
        const ImagesRef = firebase.storage().ref('images').child(file.name);
        await ImagesRef.put(file)
        ImagesRef.getDownloadURL().then((url) => {
            setImageUrl(url)
            setProgress('') 
            console.log(url)
        })
    }
    return (
        <>
            <div className="d-sm-flex">
                {/* <CssBaseline /> */}
                <StazBar></StazBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    


                    <div className="page-wrapper bg-light">
                        <div class="container-fluid p-5" style={{ height: '100%' }}>
                            <div class="row">
                                <div class="col-lg-8 col-xlg-9 col-md-12 col-sm-12 mx-auto ">
                                    <h4 className="text-center p-4">Article</h4>
                                    <div class="card-body">
                                        <form class="form-horizontal form-material my-lg-3" style={{ textAlign: 'left' }}>
                                            <label class="col-md-12 p-0">Cover Image</label>
                                            <div class="col-md-12 border p-2 text-center">
                                                {/* {imageUrl ? <img className="text-center mx-auto" src={imageUrl} style={{ height: '250px' }} /> : }
                                                 */}{Progress}<input onChange={onchange} class="form-control p-0 border-0" type="file" accept='image/*'/>
                                            <img className="text-center mx-auto img-fluid" src={imageUrl} style={{  }} /> 
                                            </div>
                                            <div class="col-md-12 border-bottom p-0">
                                                <TextField id="standard-basic" className="w-100" label="Author" onChange={(e) => setAuthor(e.target.value)}   />
                                            </div>
                                            <div class="col-md-12 border-bottom p-0 my-md-2">
                                                <TextareaAutosize
                                                    onChange={(e) => setArticle(e.target.value)}
                                                    rowsMax={7}
                                                    aria-label="maximum height"
                                                    placeholder="Blog text here...."
                                                /> </div>
                                            <div class="form-group mb-4">
                                                <div class="col-sm-12 mt-3 text-center">
                                                    <button class={`btn greenbtn text-white ${disable}`}  onClick={Feedback}>{wait}</button>
                                                </div>
                                            </div>
                                        </form>
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

