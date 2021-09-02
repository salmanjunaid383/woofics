import React, { useState} from "react";
import {  useHistory} from 'react-router-dom'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import StazBar from './Stazbar'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from '../Firebase'
import CustomAdminAuth from "../CustomAdminAuth";

const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));


export default function Led() {
    CustomAdminAuth();
    const history = useHistory()
    const classes = useStyles();





  
    const [location, setlocation] = useState('');
    const [application, setApplication] = useState('');
    const [name, setname] = useState('');
    const [disable, setDisable] = useState('disabled')


    function sendQuote(e) {
        e.preventDefault();
        setProgress('Loading...')
        const response = axios.post(`https://api.woofics.com/api/led`, {
            name: name,
            location: location,
            application: application,
            image_url: imageUrl,
            ledoptions: feild
        },{
            headers:window.header
          })
            .then((response) => {
                setProgress('Add Led')
                history.push('/ledlist')
            }, (Error) => {

                setProgress('Add Led')
                
            });
    }


    //Adding Feilds

    const [feild, setfeild] = useState([
        { resolution: '', length: '', width: '', breadth: '', aspect_ratio: '', led_tiles: '', surface: '', max_power_consumption: '', type_power_consumption: '', weight: '', min_distance: '', optimal_distance: '', price: '', image_url: '' }
    ])


    function handleChange(e, index) {
        const { name, value } = e.target;
        const list = [...feild];
        list[index][name] = value;
        setfeild(list);
        
    }

    function AddMore() {
        setfeild([...feild, { resolution: '', length: '', width: '', height: '', aspect_ratio: '', led_tiles: '', surface: '', max_power_consumption: '', type_power_consumption: '', weight: '', min_distance: '', optimal_distance: '', price: '', image_url: '' }])
    }

    //Remove Feilds
    function RemoveFeild(index) {
        const list = [...feild];
        list.splice(index, 1);
        setfeild(list)
    }



  

    const [imageUrl, setImageUrl] = useState()
    const [Progress, setProgress] = useState("Add Led");


    const onchange = async (e) => {
        setProgress('Loading...')
        const file = e.target.files[0];
        const ImagesRef = firebase.storage().ref('images').child(file.name);
        await ImagesRef.put(file)
        ImagesRef.getDownloadURL().then((url) => {
            setImageUrl(url)
            setProgress('Add Led')
        })
    }


    return (
        <>
            <div className="d-sm-flex">
              <StazBar></StazBar>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper bg-light">

                        <div class="container-fluid">
                            <div class="row">
                                <div className="text-left col-lg-12 col-xlg-12 col-md-12 mx-auto d-md-block d-none">
                                    <i className="fas fa-chevron-left fa-2x" onClick={() => history.goBack()} style={{ cursor: 'pointer' }}></i>
                                </div>
                                <div class="col-lg-12 col-xlg-12 col-md-12 mx-auto">
                                    <div class="">
                                        <div class="">
                                            <form class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                <div className="row mt-5">
                                                    <div className="col-md-3 text-center p-2 w-100 p-0">
                                                        <TextField
                                                            // placeholder="Led Name"
                                                            id="standard-number"
                                                            fullWidth
                                                            label="Led Name"
                                                            type="text"
                                                            onChange={(e) => setname(e.target.value)}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-3 text-center p-2 w-100 p-0 border">
                                                        {imageUrl ? <img className="text-center mx-auto" src={imageUrl} style={{ height: '90px' }} /> : <input onChange={onchange} class="form-control p-0 border-0" type="file" accept='image/*' name="image_url" />}
                                                    </div>
                                                    <div className="col-md-3 text-center w-100 p-2">
                                                        <FormControl className="w-100">
                                                            <InputLabel htmlFor="grouped-select">Localización</InputLabel>
                                                            <Select defaultValue="" id="grouped-select" onChange={(e) => setlocation(e.target.value)}>
                                                                <MenuItem value="">
                                                                    <em>Ninguna</em>
                                                                </MenuItem>
                                                                <MenuItem value='indoor'>Interior</MenuItem>
                                                                <MenuItem value='outdoor'>Exterior</MenuItem>
                                                                <MenuItem value='both'>Ambas</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className="col-md-3 text-center w-100 p-2">
                                                        <FormControl className="w-100">
                                                            <InputLabel htmlFor="grouped-select">Solicitud</InputLabel>
                                                            <Select defaultValue="" id="grouped-select" onChange={(e) => setApplication(e.target.value)}>
                                                                <MenuItem value="">
                                                                    <em>Ninguna</em>
                                                                </MenuItem>
                                                                <MenuItem value='rent'>Alquiler / Evento</MenuItem>
                                                                <MenuItem value='install'>Instalación fija</MenuItem>
                                                                <MenuItem value='both'>Ambas</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className="w-100">
                                                        <div className="table-responsive-sm w-100">
                                                            <table  id="for-table-setting" className="table mt-3 ">
                                                                <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                                    <tr>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="data-row">
                                                                    {
                                                                        feild.map((val, i) => {
                                                                            return (
                                                                                <>
                                                                                    <tr>
                                                                                        <tr >

                                                                                            <td className="left"><input type="tel" placeholder="Resolution  32 * 32" name='resolution' value={val.resolution} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Length" name='length' value={val.length} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Width" name='width' value={val.width} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Height" name='height' value={val.height} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Diagnol" name='diagnol' value={val.diagnol} onChange={e => handleChange(e, i)} /></td>
                                                                                        </tr>
                                                                                        <tr >
                                                                                            <td className="left"><input type="tel" placeholder="Aspect Ratio 32 : 32" name='aspect_ratio' value={val.aspect_ratio} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="LED Tiles" name='led_tiles' value={val.led_tiles} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Surface" name='surface' value={val.surface} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="max_ Power Consumption " name='max_power_consumption' value={val.max_power_consumption} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Type Power Consumption" name='type_power_consumption' value={val.type_power_consumption} onChange={e => handleChange(e, i)} /></td>
                                                                                        </tr>
                                                                                        <tr className="">
                                                                                            <td className="left"><input type="number" placeholder="Weight" name='weight' value={val.weight} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Min Distance" name='min_distance' value={val.min_distance} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Optimal Distance" name='optimal_distance' value={val.optimal_distance} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="center" colSpan='2'><input type="number" placeholder="Price $$" name='price' value={val.price} onChange={e => handleChange(e, i)} /></td>
                                                                                        </tr>
                                                                                        <td className="right pt-3">{feild.length !== 1 && <i className="fa fa-remove p-2 text-center pt-1 bg-dark text-light" onClick={() => RemoveFeild(i)}></i>}</td>
                                                                                        <td className="right pt-3">{feild.length - 1 === i && <i className="fa fa-plus p-2 text-center pt-1 bg-dark text-light" onClick={AddMore}></i>}</td>
                                                                                    </tr>
                                                                                </>
                                                                            )

                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                            <div class="form-group mb-4 mt-4">
                                                                <div class="col-sm-12 text-center">
                                                                    <button class={`btn text-white ${location == '' || name == '' || application == '' ? disable : ''}`} style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={sendQuote}>{Progress}</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
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

