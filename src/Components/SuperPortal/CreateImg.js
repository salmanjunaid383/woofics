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
    const [content,setContent] = useState('')


    function Feedback(e) {
        e.preventDefault();
        setwait('Please wait...')
        setdisable('disabled')
        const res = axios.post(`https://api.woofics.com/api/get_inspired`, {
            category: category,
            name: name,
            url: imageUrl,
            content : content
        },{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
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
        const type = file.type
        const image = type.split("/")
        
        const ImagesRef = firebase.storage().ref('images').child(file.name);
        await ImagesRef.put(file)
        ImagesRef.getDownloadURL().then((url) => {
            setImageUrl(url)
            setContent(image[0])
            setProgress('')
            
        })
    }
    return (
        <>
            <div className="d-sm-flex">
               <StazBar></StazBar>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    


                    <div className="page-wrapper bg-light">
                        <div className="container-fluid p-5" style={{ height: '100%' }}>
                            <div className="row">
                                <div className="col-lg-8 col-xlg-9 col-md-12 col-sm-12 mx-auto ">
                                    <h4 className="text-center p-4">Artículo</h4>
                                    <div className="card-body">
                                        <form className="form-horizontal form-material my-lg-3" style={{ textAlign: 'left' }}>
                                            <label className="col-md-12 p-0">Imagen</label>
                                            <div className="col-md-12 border p-2 text-center">
                                                {/* {imageUrl ? <img className="text-center mx-auto" src={imageUrl} style={{ height: '250px' }} /> : }
                                                 */}{Progress}<input onChange={onchange} className="form-control p-0 border-0" type="file"  />
                                                <img className="text-center mx-auto img-fluid" src={imageUrl} style={{}} />
                                            </div>
                                            <div className="col-md-12 p-0">
                                                <TextField id="standard-basic" className="w-25 mx-3" label="Name" onChange={(e) => setname(e.target.value)} />
                                                {/* <TextField id="standard-basic" className="w-25 mx-3" label="Category" onChange={(e) => setcategory(e.target.value)} /> */}
                                                <FormControl className="w-25 mx-3">
                                                    <InputLabel htmlFor="grouped-select">Solicitud</InputLabel>
                                                    <Select defaultValue="" id="grouped-select" onChange={(e) => setcategory(e.target.value)}>
                                                        <MenuItem value="">
                                                            <em>Ninguna</em>
                                                        </MenuItem>
                                                        <MenuItem value='Hotel'>Hoteles</MenuItem>
                                                        <MenuItem value='Restaurante'>Restaurantes</MenuItem>
                                                        <MenuItem value='Varios'>Varios</MenuItem>
                                                        <MenuItem value='Ferias'>Ferias</MenuItem>
                                                        <MenuItem value='Eventos'>Eventos</MenuItem>
                                                        <MenuItem value='Deporte'>Deportes</MenuItem>
                                                        <MenuItem value='Publicidad'>Publicidad</MenuItem>
                                                        <MenuItem value='Salud'>Salud</MenuItem>
                                                        <MenuItem value='Sector'>Sector Público</MenuItem>
                                                        <MenuItem value='Informacion'>Información</MenuItem>
                                                        <MenuItem value='Automocion'>Automocion</MenuItem>
                                                        <MenuItem value='Conciertos'>Conciertos</MenuItem>
                                                        <MenuItem value='Tiendas'>Tiendas</MenuItem>
                                                        <MenuItem value='Centros'>Centros Comerciales</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="form-group mb-4">
                                                <div className="col-sm-12 mt-3 text-center">
                                                    <button className={`btn text-white ${disable}`} style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={Feedback}>{wait}</button>
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

