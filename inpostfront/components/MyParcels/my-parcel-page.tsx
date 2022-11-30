import { Box, IconButton, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Locker } from "../../types/Locker"
import { Parcel } from "../../types/Parcel"
import { User } from "../../types/User"
import FilterSection from "./filter-section"
import ParcelDetail from "./parcel-detail"
import ParcelSection from "./parcel-section"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { FilterParameters } from "../../types/FiterParameter"

const MyParcelPage = () => {

    const [lockerData, setLockerData] = useState<Locker[]>([])
    const [userData, setUserData] = useState<User[]>([])
    const [parcelDetail, setParcelDetail] = useState<Parcel | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    async function fetchLockers() {

        const response = await fetch(
            "http://localhost:7169/parcellocker",
            {
                method: "GET",
                                mode: 'cors',
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
            setLockerData((prev) => [...prev, {
                label: d.name,
                id: d.id,
            },]);
        });
    }

    async function fetchUsers() {

        const response = await fetch(
            "http://localhost:7169/user",
            {
                method: "GET",
                                mode: 'cors',
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
            setUserData((prev) => [...prev, {
                label: d.userName,
                id: d.id,
            },]);
        });
    }

    useEffect(() => {
        setLockerData([])
        setUserData([])
        fetchLockers()
        fetchUsers();
    }, [])

    const [pageWidth, setPageWidth] = useState(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setPageWidth(window.innerWidth);
        }

        if (pageWidth === 0) {
            handleResize()
        }

        window.addEventListener('resize', handleResize);
    });

    const defaultFilterParametersValue: FilterParameters = {
        name: "",
        weight: "",
        sourceLocker: "",
        destinationLocker: "",
        sender: "",
        receiver: "",
        onlySentParcels: false,
        onlyReceivedParcels: false,
    }


    const [filterParameters, setFilterParameters] = useState<FilterParameters>(defaultFilterParametersValue)

    return (
        <Box sx={{ minHeight: "90vh", width: "100%", bgcolor: "#FFCB04", display: "flex" }}>
            {pageWidth > 800 &&
                <>
                    <Box sx={{ width: "40%" }}>
                        <FilterSection lockerData={lockerData} userData={userData} setFilterParameters={setFilterParameters} />
                    </Box>
                    <Box sx={{
                        width: "2px",
                        bgcolor: "#424143",
                        marginY: "5vh"
                    }}>

                    </Box>
                    <Box sx={{ width: "60%" }}>
                        {!parcelDetail && <ParcelSection setParcelDetail={setParcelDetail} filterParameters={filterParameters} />}
                        {parcelDetail && <ParcelDetail parcelDetail={parcelDetail} setParcelDetail={setParcelDetail} />}

                    </Box>

                </>}
            {pageWidth <= 800 &&
                <>
                    <Box sx={{ width: "100%" }}>
                        <Box sx={{
                            display: "flex", justifyContent: "space-between",
                            paddingTop: "20px",
                            paddingX: "15px",
                            alignItems: "center"
                        }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    color: "#424143",

                                }}
                            >
                                Moje paczki
                            </Typography>
                            <IconButton sx={{
                                "&:hover": {
                                    bgcolor: "#FFCB04",
                                },
                            }}
                                onClick={() => setIsModalOpen(true)}
                            >
                                <FilterAltOutlinedIcon sx={{
                                    fontSize: "40px",
                                    color: "#424143",
                                    "&:hover": {
                                        color: "#323133",
                                    },
                                }} />
                            </IconButton>
                        </Box>
                        {!parcelDetail && <ParcelSection paddingTopValue={"20px"} setParcelDetail={setParcelDetail} filterParameters={filterParameters} />}
                        {parcelDetail && <ParcelDetail parcelDetail={parcelDetail} setParcelDetail={setParcelDetail} marginTopHeight={"20px"} />}
                    </Box>
                    <Modal
                        open={isModalOpen}
                        onClose={() => { setIsModalOpen(false) }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{ bgcolor: "rgb(0,0,0,0.7)" }}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: "90vw",
                            bgcolor: 'transparent',
                        }}>
                            <FilterSection lockerData={lockerData} userData={userData} hideHeader={true} expandedAccordion={true} setFilterParameters={setFilterParameters} setIsModalOpen={setIsModalOpen} />
                        </Box>
                    </Modal>
                </>}
        </Box>)
}

export default MyParcelPage