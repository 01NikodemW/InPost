import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { Parcel } from "../../types/Parcel";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useEffect, useRef, useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import DeliveryStatusLoading from "../../utils/delivery-status-loading";


interface ParcelDetailProps {
    setParcelDetail: React.Dispatch<React.SetStateAction<Parcel | null>>
    parcelDetail: Parcel
    marginTopHeight?: string
}

enum DeliveryStatus {
    Prepared,
    Sent,
    Delivered,
    Collected,
}

const ParcelDetail: React.FC<ParcelDetailProps> = (props) => {
    const { parcelDetail, setParcelDetail, marginTopHeight } = props
    const [width, setWidth] = useState<number>(0);
    const boxRef = useRef(null);

    useEffect(() => {
        const setDimensions = () => {
            if (boxRef.current) {
                setWidth(boxRef.current.offsetWidth / 15);
            }
        };
        if (width == 0) {
            setDimensions();
        }

        window.addEventListener('resize', () => {
            setDimensions();
        });
    }, [boxRef, width]);


    const onClickGoBackHandler = () => {
        setParcelDetail(null)
    }

    const getDeliveryStatus = () => {
        if (parcelDetail.deliveryStatus === 0) {
            return DeliveryStatus.Collected
        }
        const time = Date.now() / 1000 - Number(parcelDetail.dateOfSent)
        const period = 10
        if (time < period) {
            return DeliveryStatus.Prepared
        }
        if (time < 2 * period) {
            return DeliveryStatus.Sent
        }
        return DeliveryStatus.Delivered

    }

    const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>(getDeliveryStatus())

    async function collectParcel() {

        const collectParcelUrl = "https://localhost:7169/user/" + localStorage.getItem("userId") + "/parcels/" + parcelDetail.id
        const response = await fetch(
            collectParcelUrl,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        setDeliveryStatus(DeliveryStatus.Collected)
    }

    const collectParcelHandler = () => {
        collectParcel()
    }

    return (
        <>
            <Box sx={{ height: marginTopHeight ? marginTopHeight : "90px" }}>
            </Box>
            <Paper
                ref={boxRef}
                style={{ height: "70vh", width: "80%", margin: "auto", borderRadius: "15px", padding: "15px", backgroundColor: "#424143" }}>
                <Box>
                    <IconButton sx={{
                        p: 0,
                    }} onClick={onClickGoBackHandler}>
                        <KeyboardReturnIcon sx={{
                            color: "#FFCB04",
                            fontSize: "30px",
                            "&:hover": {
                                color: "#FFB502",
                            },
                        }} />
                    </IconButton>
                    {/* #424143 */}
                </Box>
                <Typography variant="h3" sx={{
                    marginLeft: "10px",
                    paddingTop: "15px",
                    fontWeight: 500,
                    color: "white",
                    fontSize: width
                }}
                >
                    {parcelDetail.name}
                </Typography>
                <Typography variant="subtitle1" sx={{
                    marginLeft: "20px",
                    color: "#DCDCDC"
                }}
                >
                    {parcelDetail.weight} kg
                </Typography>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "50px",
                    paddingTop: "50px",
                    paddingBottom: "30px",
                    marginX: "5%",
                    color: "white",
                    fontSize: width / 2
                }}>
                    <Box sx={{
                        width: "40%",
                        textAlign: "left",
                        overflow: "hidden",
                        fontSize: parcelDetail.sender.name.length > 18 ? width / 2.5 : width / 2
                    }}
                    >{parcelDetail.sender.name}</Box>
                    <ArrowRightAltIcon sx={{ fontSize: "40px", width: "20%" }} />
                    <Box sx={{
                        width: "40%",
                        textAlign: "right",
                        overflow: "hidden",
                        fontSize: parcelDetail.receiver.name.length > 18 ? width / 2.5 : width / 2
                    }}>{parcelDetail.receiver.name}</Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "50px",
                    paddingY: "50px",
                    marginX: "5%",
                    color: "white",
                    fontSize: width
                }}>
                    <Box sx={{ width: "40%", textAlign: "left" }}>{parcelDetail.sourceLocker.name}</Box>
                    <ArrowRightAltIcon sx={{ fontSize: "40px", width: "20%" }} />
                    <Box sx={{ width: "40%", textAlign: "right" }}>{parcelDetail.destinationLocker.name}</Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: "50px",
                    paddingTop: "50px",
                    paddingBottom: "30px",
                }}>
                    <CircleIcon sx={{ fontSize: "40px", color: "#FFCB04" }} />
                    <DeliveryStatusLoading flash={deliveryStatus === DeliveryStatus.Prepared} />
                    {deliveryStatus === DeliveryStatus.Prepared && < CircleOutlinedIcon sx={{ fontSize: "40px", color: "white" }} />}

                    {deliveryStatus !== DeliveryStatus.Prepared && < CircleIcon sx={{ fontSize: "40px", color: "#FFCB04" }} />}
                    {deliveryStatus !== DeliveryStatus.Prepared && < DeliveryStatusLoading flash={deliveryStatus === DeliveryStatus.Sent} />}
                    {deliveryStatus === DeliveryStatus.Prepared && <>
                        <RemoveIcon sx={{
                            color: "white"
                        }} />
                        <RemoveIcon sx={{
                            color: "white"
                        }} />
                        <RemoveIcon sx={{
                            color: "white"
                        }} />
                        <RemoveIcon sx={{
                            color: "white"
                        }} />
                        <ArrowForwardIosIcon sx={{
                            color: "white"
                        }} />
                    </>}

                    {(deliveryStatus === DeliveryStatus.Prepared || deliveryStatus === DeliveryStatus.Sent) && < CircleOutlinedIcon sx={{ fontSize: "40px", color: "white" }} />}

                    {(deliveryStatus === DeliveryStatus.Delivered || deliveryStatus === DeliveryStatus.Collected) && < CircleIcon sx={{ fontSize: "40px", color: "#FFCB04" }} />}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="subtitle2" sx={{ width: "40%", color: "#DCDCDC" }}>
                        Przygotowana
                    </Typography>
                    <Typography variant="subtitle2" sx={{ width: "20%", textAlign: "center", color: "#DCDCDC" }}>
                        Wysłana
                    </Typography>
                    <Typography variant="subtitle2" sx={{ width: "40%", textAlign: "right", color: "#DCDCDC" }}>
                        {parcelDetail.receiver.id === localStorage.getItem("userId") && parcelDetail.deliveryStatus === 0 ? "Odebrana" : "Dostarczona"}
                    </Typography>
                </Box>
                {deliveryStatus === DeliveryStatus.Delivered &&
                    parcelDetail.receiver.id === localStorage.getItem("userId") &&
                    <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
                        <Button sx={{
                            bgcolor: "#FFCB04",
                            color: "#424143",
                            fontWeight: 600,
                            mt: "15px",
                            height: "50px",
                            width: "50%",
                            "&:hover": {
                                bgcolor: "#FFB502",
                            },
                        }}
                            onClick={collectParcelHandler}

                        >
                            Odbierz paczkę
                        </Button>
                    </Box>}
            </Paper>
        </>
    )
}

export default ParcelDetail;