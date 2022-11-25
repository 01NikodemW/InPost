import { Box, Button, Card, TextField, Typography } from "@mui/material"
import { URL } from "url"
import Image from './p.jpeg';
const ContentBoxLogedOut = () => {

    // const url = new URL('https://static.wirtualnemedia.pl/media/images/2013/images/3_4893.jpeg');



    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "500px",
                height: "70vh",
                backgroundColor: "#FFCB04",
                display: "flex",
                justifyContent: 'space-around',
                alignItems: "center",
            }}
        >
            <Box sx={{
                width: "400px",
                height: "250px",
                borderRadius: "15px",
                backgroundColor: "#424143",
                padding: "10px",
            }}>
                <Box sx={{ height: "35%" }}>
                    <Typography variant="h4" sx={{ color: "white", paddingTop: "10px" }}>Znajdź przesyłkę</Typography>
                </Box>
                <Box sx={{ height: "35%", }}>
                    <TextField
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
                    }}>Szukaj</Button>
                </Box>


            </Box>
            <Box sx={{
                width: "400px",
                height: "400px",
                backgroundColor: "#424143",
                borderRadius: "15px",
                padding: "10px",
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

        </Box>
    )
}

export default ContentBoxLogedOut