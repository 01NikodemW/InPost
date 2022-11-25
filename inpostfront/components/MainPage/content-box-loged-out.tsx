import { Box, Button, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useLayoutEffect, useState } from "react";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
const ContentBoxLogedOut = () => {

    const [pageWidth, setPageWidth] = useState(10000);
    useEffect(() => {
        function handleResize() {
            setPageWidth(window.innerWidth);
        }
        if (pageWidth > 10000) {
            handleResize()
        }

        window.addEventListener('resize', handleResize);
    });


    const [isSearching, setIsSearching] = useState<boolean>(true)
    const [isFound, setIsFound] = useState<boolean>(false)
    const [parcelIdValue, setParcelIdValue] = useState<string>("")

    const onParcelIdValueChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setParcelIdValue(event.target.value)
    }

    async function fetchLockers() {
        const findParcelUrl = "https://localhost:7169/parcel/" + parcelIdValue

        const response = await fetch(
            findParcelUrl,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            setIsFound(false)
            setIsSearching(false)
        }
        else {
            setIsFound(true)
            setIsSearching(false)
        }
    }

    const onSearchHandler = () => {
        fetchLockers()
        console.log("parcelIdValue ", parcelIdValue)

    }

    const onGoBackHandler = () => {
        setIsSearching(true)
    }

    return (
        <Box
            sx={{
                width: "100%",
                // minHeight: "500px",
                minHeight: "70vh",
                backgroundColor: "#FFCB04",
                display: "flex",
                justifyContent: 'space-around',
                alignItems: "center",
                flexDirection: pageWidth < 830 ? "column" : "row"
            }}
        >
            {isSearching &&
                <>
                    <Box sx={{
                        width: "400px",
                        height: "250px",
                        borderRadius: "15px",
                        backgroundColor: "#424143",
                        padding: "10px",
                        marginTop: pageWidth < 830 ? "80px" : "0"
                    }}>
                        <Box sx={{ height: "35%" }}>
                            <Typography variant="h4" sx={{ color: "white", paddingTop: "10px" }}>Znajdź przesyłkę</Typography>
                        </Box>
                        <Box sx={{ height: "35%", }}>
                            <TextField
                                value={parcelIdValue}
                                onChange={onParcelIdValueChangeHandler}
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "6px",
                                    border: "2px solid #FFCB04",
                                    width: "80%"
                                }} />
                        </Box>
                        <Box sx={{ height: "30%", display: "flex", justifyContent: "end" }}>
                            <Button sx={{
                                width: "150px",
                                height: "50px",
                                backgroundColor: "#FFCB04",
                                color: "#424143",
                                fontWeight: 700,
                                '&:hover': {
                                    backgroundColor: "#FFB502",
                                },
                            }}
                                onClick={onSearchHandler}
                            >Szukaj</Button>
                        </Box>


                    </Box>
                    <Box sx={{
                        width: "400px",
                        height: "400px",
                        backgroundColor: "#424143",
                        borderRadius: "15px",
                        padding: "10px",
                        marginY: pageWidth < 830 ? "80px" : "0"
                    }}>
                        <Box sx={{
                            height: "70%",
                            backgroundImage: `url("https://static.wirtualnemedia.pl/media/images/2013/images/3_4893.jpeg")`,
                            backgroundRepeat: "no-repeat",
                            // backgroundPosition: "center",
                            backgroundSize: "cover",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                        }}>
                        </Box>
                        <Box sx={{
                            height: "30%",
                            backgroundColor: "#FFCD00",
                            borderBottomLeftRadius: "15px",
                            borderBottomRightRadius: "15px",
                            paddingX: "10px"

                        }}>
                            <Typography variant="h4" sx={{ color: "#424143", paddingTop: "10px" }}>Zaloguj się po więcej możliwości</Typography>
                        </Box>
                    </Box>
                </>}
            {!isSearching &&
                <Box sx={{
                    width: "400px",
                    minHeight: "150px",
                    backgroundColor: "#424143",
                    borderRadius: "15px",
                    padding: "10px",
                }}>
                    <Box>
                        <IconButton sx={{
                            p: 0,
                        }} onClick={onGoBackHandler}>
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
                    <Box sx={{ paddingBottom: "20px" }}>
                        {isFound &&
                            <>
                                <Typography variant="h4" sx={{ color: "white", paddingTop: "10px" }}>Paczka znaleziona</Typography>
                                <Typography variant="h6" sx={{ color: "white", paddingTop: "10px", fontSize: "16px" }}>Zaloguj się aby zobaczyć, czy jest Twoja</Typography>
                            </>
                        }
                        {!isFound &&
                            <>
                                <Typography variant="h4" sx={{ color: "white", paddingTop: "10px" }}>Nie znaleziono paczki</Typography>
                            </>
                        }
                    </Box>
                </Box>}

        </Box>
    )
}

export default ContentBoxLogedOut