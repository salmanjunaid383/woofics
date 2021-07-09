import React, { useState ,useEffect} from 'react'
import Pusher from 'pusher-js';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import jwt_decode from 'jwt-decode'

const Pusherr = () => {

    const [mxg, setMxg] = useState('');

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    // var toke = (decoded.sub).toString()
    // var pusher = new Pusher('f7c71cbabef9234b8101', {
    //     cluster: 'ap1'
    // });

    // var channel = pusher.subscribe(toke);

    // useEffect(() => {
    //     channel.bind('my-event', function (data) {
    //         setMxg('New Message : ' + " " + JSON.stringify(data.message))
    //         if (JSON.stringify(data.message)) {
    //             setOpenn(true);
                // handleClick()
    //         }
    //     })
    // }, [])
    // }

    const [openn, setOpenn] = React.useState(false);
    const handleClosee = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenn(false);
    };


    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={openn}
                autoHideDuration={6000}
                onClose={handleClosee}
                message={mxg}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClosee}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </>
    )
}

export default Pusherr;