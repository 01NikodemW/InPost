import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { keyframes } from '@emotion/react'

const ming = keyframes({ from: { color: "white" }, to: { color: "#FFCB04" } })

interface DeliveryStatusLoadingProps {
    flash: boolean
}



const DeliveryStatusLoading: React.FC<DeliveryStatusLoadingProps> = (props) => {

    const { flash } = props

    if (flash) {
        return <>
            <RemoveIcon sx={{
                animation: `${ming} 1s backwards`,
                animationDelay: "0s",
                animationDuration: "1.5s",
                animationIterationCount: "infinite",
            }} />
            <RemoveIcon sx={{
                animation: `${ming} 1s backwards`,
                animationDelay: "0.1s",
                animationDuration: "1.5s",
                animationIterationCount: "infinite",
            }} />
            <RemoveIcon sx={{
                animation: `${ming} 1s backwards`,
                animationDelay: "0.2s",
                animationDuration: "1.5s",
                animationIterationCount: "infinite",
            }} />
            <RemoveIcon sx={{
                animation: `${ming} 1s backwards`,
                animationDelay: "0.3s",
                animationDuration: "1.5s",
                animationIterationCount: "infinite",
            }} />
            <ArrowForwardIosIcon sx={{
                animation: `${ming} 1s backwards`,
                animationDelay: "0.4s",
                animationDuration: "1.5s",
                animationIterationCount: "infinite",
            }} />
        </>
    }
    else {
        return <>
            <RemoveIcon sx={{
                color: "#FFCB04"
            }} />
            <RemoveIcon sx={{
                color: "#FFCB04"
            }} />
            <RemoveIcon sx={{
                color: "#FFCB04"
            }} />
            <RemoveIcon sx={{
                color: "#FFCB04"
            }} />
            <ArrowForwardIosIcon sx={{
                color: "#FFCB04"
            }} />
        </>
    }

}

export default DeliveryStatusLoading;