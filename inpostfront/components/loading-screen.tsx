import { Box, CircularProgress, keyframes } from "@mui/material"
import Image from 'next/image'
import logo from '../styles/logo.svg'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const LoadingScreeen = () => {

    const shake = keyframes({
        "0%": { transform: "rotate(-6deg)" },
        "50%": { transform: "rotate(6deg)" },
        "100%": { transform: "rotate(-6deg)" },
    })


    return (<Box sx={{ width: "100%", height: "100vh", bgcolor: "#FFCB04", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress
            size={200}
            color="inherit"
            thickness={1.5}
            sx={{
                zIndex: 1,
                position: "relative",
            }} />
        <Box sx={{ zIndex: 2, position: "absolute" }}>
            {/* <Image
                src={logo}
                alt="Picture of the author"
            /> */}
            <LocalShippingIcon sx={{
                fontSize: "90px",
                animation: `${shake} 1s backwards`,
                animationIterationCount: "infinite",
            }} />
        </Box>
    </Box>)
}

export default LoadingScreeen