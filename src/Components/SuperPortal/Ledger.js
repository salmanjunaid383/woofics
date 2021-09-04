import { useHistory } from 'react-router-dom'
import { makeStyles} from '@material-ui/core/styles';
import CustomAdminAuth from "../CustomAdminAuth";
import StazBar from "./Stazbar";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));


export default function Ledger() {
    // CustomAdminAuth();
    let history = useHistory();
    const classes = useStyles();
 

    return (
        <>
            <div className="d-sm-flex">
                <StazBar></StazBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper bg-light">
                        <div class="container pb-lg-4">
                            <div className="row m-lg-5 text-center mx-auto my-auto">
                                <div className="col-md-4 m-3 p-5 mx-auto text-center shadow border rounded" style={{ cursor: 'pointer' }} onClick={() => history.push('/ledgerlist/supplier')}>
                                    <i className="fa fa-5x py-3 fa-user " style={{ color: "#f25c8a" }}></i>
                                    <h5 className="h5">Libro mayor de proveedores</h5>
                                </div>
                                <div className="col-md-4 m-3 p-5 mx-auto text-center shadow border rounded" style={{ cursor: 'pointer' }} onClick={() => history.push('/ledgerlist/service')}>
                                    <i className="fas fa-5x py-3 fa-cog " style={{ color: "#9b88f6" }}></i>
                                    <h5 className="h5">Libro mayor del proveedor de servicios</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            
        </>
    );
}

