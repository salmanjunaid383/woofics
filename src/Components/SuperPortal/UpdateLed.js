import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import Sidebar from './Stazbar'

import jwt_decode from 'jwt-decode'
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
export default function UpdateLed() {
    CustomAdminAuth();
    const { ulid } = useParams()
    const history = useHistory()
    const classes = useStyles();

    //token decode
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)



    var qid = localStorage.getItem("qid");
    const [location, setlocation] = useState('');
    const [application, setApplication] = useState('');
    const [name, setname] = useState();

    const [data, setData] = useState('')
    const [Options, setOptions] = useState([
        { resolution: '', length: '', width: '', height: '', aspect_ratio: '', led_tiles: '', surface: '', max_power_consumption: '', type_power_consumption: '', weight: '', min_distance: '', optimal_distance: '', price: '', image_url: '' }
    ])
    const [wait, setwait] = useState('Update Led');
    const [disable, setdisable] = useState('');

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/led/${ulid}`)
            .then((response) => {
                if (response) {
                    setlocation(response.data.location)
                    setApplication(response.data.application)
                    setname(response.data.name)
                    setData(response.data.image_url)
                }
            }, (Error) => {
                console.log(Error);
            });
    }


    useEffect(() => {
        const { data: res } = axios.get(`https://api.woofics.com/api/led_option/${ulid}`)
            .then((res) => {
                if (res) {
                    setOptions(res.data)
                }
            }, (Error) => {
                console.log(Error);
            });
        GetLed();
    }, [])

    function sendQuote(e) {
        e.preventDefault();
        setwait('Please wait...')
        setdisable('disabled')
        const response = axios.put(`https://api.woofics.com/api/led/${ulid}`, {
            name: name,
            location: location,
            application: application,
            image_url: 'xyz',
            ledoptions: Options
        })
            .then((response) => {
                setwait('Update Led')
                setdisable('')
                history.push('/ledlist')
            }, (Error) => {
                 
                console.log(Error);
            });
    }


    //Adding Feilds

    // const [feild, setOptions] = useState([
    //     { area: '', price: '' }
    // ])


    function handleChange(e, index) {
        const { name, value } = e.target;
        const list = [...Options];
        list[index][name] = value;
        setOptions(list);
    }

    function AddMore() {
        setOptions([...Options, { resolution: '', length: '', width: '', height: '', aspect_ratio: '', led_tiles: '', surface: '', max_power_consumption: '', type_power_consumption: '', weight: '', min_distance: '', optimal_distance: '', price: '', image_url: '' }])
    }

    //Remove Feilds
    const RemoveFeild = (index) => {
        const list = [...Options];
        list.splice(index, 1);
        setOptions(list)
    }



    //Sidebaaaaar/..........................
    // const { window } = props;
    // const classes = useStyles();


    // const container = window !== undefined ? () => window().document.body : undefined;

    const [newnoti, setnewnoti] = useState([]);

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)


    return (
        <>

            <div className="d-sm-flex">

                    <Sidebar></Sidebar>
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
                                        <div class="cay">
                                            <form class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                <div className="row mt-5">
                                                    <div className="col-md-5 m-1 text-center p-2 w-100 p-0">
                                                        <label className="float-left">Nombre Del LED</label>
                                                        <input
                                                            placeholder="Led Name"
                                                            id="standard-number"
                                                            fullWidth
                                                            label="Led Name"
                                                            type="text"
                                                            onChange={(e) => setname(e.target.value)}
                                                            defaultValue={name}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-5 m-1 text-center p-2 w-75 p-0 ">
                                                    <img className="text-center mx-auto" src={data} style={{ height: '90px' }} /> 
                                                    </div>
                                                    <div className="col-md-5 m-1 text-center p-2 w-75 p-0 ">
                                                    <input onChange={onchange} class="form-control p-0 -0" type="file" accept='image/*' name="image_url"/>
                                                    </div>
                                                    <div className="col-md-5 m-1 text-center w-100 p-0">
                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel htmlFor="grouped-select">Localización </InputLabel>
                                                            <Select value={location} id="grouped-select" onChange={(e) => setlocation(e.target.value)}>
                                                                <MenuItem value={location}>Valor Por Defecto</MenuItem>
                                                                <MenuItem value='indoor'>Interior</MenuItem>
                                                                <MenuItem value='outdoor'>Exterior</MenuItem>
                                                                <MenuItem value='both'>Ambas</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel htmlFor="grouped-select">Solicitud </InputLabel>
                                                            <Select value={application} id="grouped-select" onChange={(e) => setApplication(e.target.value)}>
                                                                <MenuItem value={application}>Valor Por Defecto</MenuItem>
                                                                <MenuItem value='rent'>Alquiler / Evento</MenuItem>
                                                                <MenuItem value='install'>Instalación Fija</MenuItem>
                                                                <MenuItem value='both'>Ambas</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className="w-100">
                                                        <div className="table-responsive-sm w-100">
                                                            <table  id="for-table-setting" className="table table-striped ">
                                                                <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                                    <tr>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="data-row">
                                                                    {
                                                                        Options.map((val, i) => {
                                                                            return (
                                                                                <>
                                                                                    <tr>
                                                                                        <tr >

                                                                                            <td className="left"><input type="tel" placeholder="Resolution " name='resolution' value={val.resolution} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Length" name='length' value={val.length} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Width" name='width' value={val.width} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Height" name='height' value={val.height} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Diagnol" name='diagnol' value={val.diagnol} onChange={e => handleChange(e, i)} /></td>
                                                                                        </tr>
                                                                                        <tr >
                                                                                            <td className="left"><input type="tel" placeholder="Aspect Ratio" name='aspect_ratio' value={val.aspect_ratio} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="LED Tiles" name='led_tiles' value={val.led_tiles} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Surface" name='surface' value={val.surface} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="max_ Power Consumption " name='max_power_consumption' value={val.max_power_consumption} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Type Power Consumption" name='type_power_consumption' value={val.type_power_consumption} onChange={e => handleChange(e, i)} /></td>
                                                                                        </tr>
                                                                                        <tr className="">
                                                                                            <td className="left"><input type="number" placeholder="Weight" name='weight' value={val.weight} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Min Distance" name='min_distance' value={val.min_distance} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="left"><input type="number" placeholder="Optimal Distance" name='optimal_distance' value={val.optimal_distance} onChange={e => handleChange(e, i)} /></td>
                                                                                            <td className="center" colSpan="2"><input type="number" placeholder="Price $$" name='price' value={val.price} onChange={e => handleChange(e, i)} /></td>
                                                                                        </tr>
                                                                                        <td className="right pt-3">{Options.length !== 1 && <i className="fa fa-remove p-2 text-center pt-1 bg-dark text-light" onClick={() => RemoveFeild(i)}></i>}</td>
                                                                                        <td className="right pt-3">{Options.length - 1 === i && <i className="fa fa-plus p-2 text-center pt-1 bg-dark text-light" onClick={AddMore}></i>}</td>
                                                                                    </tr>
                                                                                </>
                                                                            )

                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                            <div class="form-group mb-4 mt-4">
                                                                <div class="col-sm-12 text-center">
                                                                    <button class={`btn text-white ${disable}`} style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={sendQuote}>{wait}</button>
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

