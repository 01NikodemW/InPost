import { Box, Button, Card, TextField, Typography } from "@mui/material"

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import AddParcelForm from "./add-parcel-form";

const ContentBoxLogedIn = () => {


    const { user, isAuthenticated } = useAuth0();

    const [pageWidth, setPageWidth] = useState(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setPageWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
    });

    const [addParcelOpen, setAddParcelOpen] = useState<boolean>(false)

    const onAddParcelHandler = () => {
        setAddParcelOpen(true)
    }

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    // minHeight: "500px",
                    minHeight: "70vh",
                    backgroundColor: "#FFCB04",

                }}
            >
                {isAuthenticated &&
                    <Typography variant="h2" sx={{
                        marginLeft: "5vw",
                        paddingY: "20px",
                        fontWeight: 500,
                        color: "#424143"
                    }}
                    >
                        Witaj {user.given_name}
                    </Typography>}
                <Box sx={{
                    display: "flex",
                    justifyContent: 'space-around',
                    alignItems: "center",
                    paddingBottom: "50px",
                    flexDirection: pageWidth < 830 ? "column" : "row"
                }}>
                    {!addParcelOpen && <>
                        <Box sx={{
                            width: "400px",
                            height: "400px",
                            backgroundColor: "#424143",
                            borderRadius: "15px",
                            padding: "10px",
                            marginY: pageWidth < 830 ? "10px" : "0px",
                            '&:hover': {
                                backgroundColor: '#7D55B9',
                                cursor: "pointer",
                            },
                        }}
                            onClick={onAddParcelHandler}
                        >
                            <Box sx={{
                                height: "70%",
                                backgroundImage: `url("https://static.wirtualnemedia.pl/media/top/paczkomat-artinpost-655.png")`,
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
                                paddingX: "10px",

                            }}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "50px", paddingTop: "20px"
                                }}>
                                    <Typography variant="h4" sx={{ color: "#424143", paddingX: "10px", }}>Nadaj paczkę  </Typography>
                                    <LocalShippingIcon sx={{ fontSize: "40px", color: "#424143", }} />
                                </Box>

                            </Box>
                        </Box>
                        <Box sx={{
                            width: "400px",
                            height: "400px",
                            backgroundColor: "#424143",
                            borderRadius: "15px",
                            padding: "10px",
                            marginY: pageWidth < 830 ? "10px" : "0px",
                            '&:hover': {
                                backgroundColor: '#9D4570',
                                cursor: "pointer",
                            },
                        }}>
                            <Box sx={{
                                height: "70%",
                                backgroundImage: `url("https://1.bp.blogspot.com/-11UqepTOqe0/XSxqMnt5XrI/AAAAAAAAIHU/jaGD44LcraY3Mj_WSwy_kSBpkXIA3xWXQCLcBGAs/s1600/Paczkomat_mockup.jpg")`,
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
                                paddingX: "10px",

                            }}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "50px", paddingTop: "20px"
                                }}>
                                    <Typography variant="h4" sx={{ color: "#424143", paddingX: "10px", }}>Odbierz paczkę  </Typography>
                                    <MarkunreadMailboxIcon sx={{ fontSize: "40px", color: "#424143", }} />
                                </Box>

                            </Box>
                        </Box>
                    </>}
                    {addParcelOpen && <AddParcelForm maxWidth={pageWidth} setAddParcelOpen={setAddParcelOpen} />}
                </Box>
            </Box>
        </>
    )
}

export default ContentBoxLogedIn