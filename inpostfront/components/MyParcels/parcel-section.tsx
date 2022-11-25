import { Box, List, ListItem, Typography, Paper } from "@mui/material"
import { useEffect, useState } from "react";
import { Parcel } from "../../types/Parcel";
import SendIcon from '@mui/icons-material/Send';
import CallReceivedIcon from '@mui/icons-material/CallReceived';

interface FilterSectionProps {
    setParcelDetail: React.Dispatch<React.SetStateAction<Parcel | null>>
    paddingTopValue?: string
}

const ParcelSection: React.FC<FilterSectionProps> = (props) => {

    const { setParcelDetail, paddingTopValue } = props
    const [parcelData, setParcelData] = useState<Parcel[]>([])

    const janId = "c3f5ffa5-fc8a-4190-8521-8a75af4dea02"

    async function fetchParcels() {

        const response = await fetch(
            "https://localhost:7169/user/c3f5ffa5-fc8a-4190-8521-8a75af4dea02/parcels",
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
        // console.log(data)
        data.forEach((d: any) => {
            const parcel = {
                id: d.id,
                name: d.name,
                weight: d.weight,
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
                    const labelId = `checkbox-list-secondary-label-${parcel}`;
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
                                {parcel.sender.id == janId && <SendIcon sx={{ fontSize: "30px", color: "white" }} />}
                                {parcel.receiver.id == janId && <CallReceivedIcon sx={{ fontSize: "30px", color: "white" }} />}
                            </Box>
                        </ListItem>
                    );
                })}
            </List>
            {/* </Paper> */}
        </>
    )
}

export default ParcelSection