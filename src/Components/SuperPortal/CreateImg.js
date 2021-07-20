import React, { useState} from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import StazBar from './Stazbar'
import { makeStyles} from '@material-ui/core/styles';
import firebase from '../Firebase'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CustomAdminAuth from "../CustomAdminAuth";





const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));

export default function CreateImg() {
    CustomAdminAuth();
    let history = useHistory();

    const [category, setcategory] = useState("");
    const [name, setname] = useState("");

    const [wait, setwait] = useState('Create');
    const [disable, setdisable] = useState('');
    const [imageUrl, setImageUrl] = useState('')


    function Feedback(e) {
        e.preventDefault();
        setwait('Please wait...')
        setdisable('disabled')
        const res = axios.post(`https://api.woofics.com/api/get_inspired`, {
            category: category,
            name: name,
            url: imageUrl
        })
            .then((res) => {
                if (res) {
                    setwait('Add Blog')
                    setdisable('')
                    history.push('/getinspired');
                }
            }, (error) => {
                setwait('Add Blog')
                setdisable('')
                console.log(Error);
            });

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
               <StazBar></StazBar>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    


                    <div className="page-wrapper bg-light">
                        <div class="container-fluid p-5" style={{ height: '100%' }}>
                            <div class="row">
                                <div class="col-lg-8 col-xlg-9 col-md-12 col-sm-12 mx-auto ">
                                    <h4 className="text-center p-4">Artículo</h4>
                                    <div class="card-body">
                                        <form class="form-horizontal form-material my-lg-3" style={{ textAlign: 'left' }}>
                                            <label class="col-md-12 p-0">Imagen</label>
                                            <div class="col-md-12 border p-2 text-center">
                                                {/* {imageUrl ? <img className="text-center mx-auto" src={imageUrl} style={{ height: '250px' }} /> : }
                                                 */}{Progress}<input onChange={onchange} class="form-control p-0 border-0" type="file" accept='image/*' />
                                                <img className="text-center mx-auto img-fluid" src={imageUrl} style={{}} />
                                            </div>
                                            <div class="col-md-12 p-0">
                                                <TextField id="standard-basic" className="w-25 mx-3" label="Name" onChange={(e) => setname(e.target.value)} />
                                                {/* <TextField id="standard-basic" className="w-25 mx-3" label="Category" onChange={(e) => setcategory(e.target.value)} /> */}
                                                <FormControl className="w-25 mx-3">
                                                    <InputLabel htmlFor="grouped-select">Solicitud</InputLabel>
                                                    <Select defaultValue="" id="grouped-select" onChange={(e) => setcategory(e.target.value)}>
                                                        <MenuItem value="">
                                                            <em>Ninguna</em>
                                                        </MenuItem>
                                                        <MenuItem value='HOTELS'>HOTELES</MenuItem>
                                                        <MenuItem value='RESTAURANTS'>RESTAURANTES</MenuItem>
                                                        <MenuItem value='RETAIL'>TIENDA AL POR MENOR</MenuItem>
                                                        <MenuItem value='FAIRS'>FERIAS</MenuItem>
                                                        <MenuItem value='EVENTS'>EVENTOS</MenuItem>
                                                        <MenuItem value='SPORTS'>DEPORTES</MenuItem>
                                                        <MenuItem value='HEALTH'>SALUD</MenuItem>
                                                        <MenuItem value='ADVERTISING'>PUBLICIDAD</MenuItem>
                                                        <MenuItem value='PUBLIC'>SECTOR PÚBLICO</MenuItem>
                                                        <MenuItem value='INFORMATION'>INFORMACIÓN</MenuItem>
                                                        <MenuItem value='LARGE'>SUPERFICIES / CENTROS COMERCIALES</MenuItem>
                                                        <MenuItem value='SHOPPING'>COMPRAS</MenuItem>
                                                        <MenuItem value='CONCERTS'>CONCIERTOS</MenuItem>
                                                        <MenuItem value='AUTOMOTIVE'>AUTOMOTORA</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div class="form-group mb-4">
                                                <div class="col-sm-12 mt-3 text-center">
                                                    <button class={`btn text-white ${disable}`} style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={Feedback}>{wait}</button>
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

