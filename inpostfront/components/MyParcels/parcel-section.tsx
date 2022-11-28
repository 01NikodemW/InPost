import { Box, List, ListItem, Typography, Paper } from "@mui/material"
import { useEffect, useState } from "react";
import { Parcel } from "../../types/Parcel";
import SendIcon from '@mui/icons-material/Send';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { FilterParameters } from "../../types/FiterParameter";

interface FilterSectionProps {
    setParcelDetail: React.Dispatch<React.SetStateAction<Parcel | null>>
    paddingTopValue?: string
    filterParameters: FilterParameters
}

const ParcelSection: React.FC<FilterSectionProps> = (props) => {

    const { setParcelDetail, paddingTopValue, filterParameters } = props
    const [parcelData, setParcelData] = useState<Parcel[]>([])


    async function fetchParcels() {
        const fetchMultipleParcelsUrl = "https://localhost:7169/user/" + localStorage.getItem("userId") + "/parcels"

        const response = await fetch(
            fetchMultipleParcelsUrl,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        data.forEach((d: any) => {
            const parcel = {
                id: d.id,
                name: d.name,
                weight: d.weight,
                dateOfSent: d.dateOfSent,
                deliveryStatus: d.deliveryStatus,
                receiver: {
                    name: d.reciver.userName,
                    id: d.reciver.id,
                },
                sender: {
                    name: d.sender.userName,
                    id: d.sender.id,
                },
                sourceLocker: {
                    name: d.sourceLocker.name,
                    id: d.sourceLocker.id,
                },
                destinationLocker: {
                    name: d.destinationLocker.name,
                    id: d.destinationLocker.id,
                },
            }
            if (!parcelData.includes(parcel)) {
                setParcelData((prev) => [...prev, parcel]);
            }
        });
    }

    useEffect(() => {
        setParcelData([])
        fetchParcels();
    }, [])



    return (
        <>
            <Box sx={{ height: paddingTopValue ? paddingTopValue : "90px" }}>
            </Box>
            <List sx={{
                maxHeight: "70vh",
                width: "80%",
                margin: "auto",
                overflow: 'auto',
                backgroundColor: "#424143",
                border: "2px solid #424143",
                '&::-webkit-scrollbar': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                    border: "2px solid #7d7d7d",
                    borderRadius: "5px",
                }
            }}>
                {parcelData.map((parcel) => {
                    const nameCondition = filterParameters.name === parcel.name || filterParameters.name === ""
                    const weightCondition = Number(filterParameters.weight) === parcel.weight || filterParameters.weight === ""
                    const sourceLockerCondition = filterParameters.sourceLocker === parcel.sourceLocker.id || filterParameters.sourceLocker === ""
                    const destinationLockerCondition = filterParameters.destinationLocker === parcel.destinationLocker.id || filterParameters.destinationLocker === ""
                    const senderCondition = filterParameters.sender === parcel.sender.id || filterParameters.sender === ""
                    const receiverCondition = filterParameters.receiver === parcel.receiver.id || filterParameters.receiver === ""
                    const onlySentParcelsCondition = (filterParameters.onlySentParcels && parcel.sender.id === localStorage.getItem("userId")) || filterParameters.onlySentParcels === false
                    const onlyReceivedParcelsCondition = (filterParameters.onlyReceivedParcels && parcel.receiver.id === localStorage.getItem("userId")) || filterParameters.onlyReceivedParcels === false


                    const showItem = nameCondition &&
                        weightCondition &&
                        sourceLockerCondition &&
                        destinationLockerCondition &&
                        onlySentParcelsCondition &&
                        onlyReceivedParcelsCondition &&
                        senderCondition &&
                        receiverCondition

                    const period = 10
                    const isParcelReadyToCollect =
                        parcel.receiver.id === localStorage.getItem("userId") &&
                        Date.now() / 1000 - Number(parcel.dateOfSent) > 3 * period &&
                        parcel.deliveryStatus === 1;
                    const isParcelCollectede = parcel.deliveryStatus === 0;
                    if (showItem) {
                        return (
                            <ListItem
                                key={parcel.id}
                                disablePadding
                                sx={{
                                    height: "79px",
                                    borderBottom: "1px solid #7d7d7d",
                                    borderRadius: "0px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingX: "20px",
                                    '&:hover': {
                                        backgroundColor: '#323133',
                                        cursor: "pointer",
                                    },
                                }}
                                onClick={() => { setParcelDetail(parcel) }}
                            >
                                <Box>
                                    <Typography variant="h5" sx={{ color: "white", paddingLeft: "10px" }}>{parcel.name}</Typography>
                                </Box>
                                <Box>
                                    {parcel.sender.id == localStorage.getItem("userId") && <SendIcon sx={{ fontSize: "30px", color: "white" }} />}
                                    {parcel.receiver.id == localStorage.getItem("userId") && <CallReceivedIcon sx={{ fontSize: "30px", color: isParcelReadyToCollect ? "green" : isParcelCollectede ? "#FFCB04" : "white" }} />}
                                </Box>
                            </ListItem>
                        );
                    }

                })}
            </List>
            {/* </Paper> */}
        </>
    )
}

export default ParcelSection