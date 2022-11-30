import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Link } from "@mui/material"
import { useEffect } from "react";
import Image from 'next/image'
import logo from '../styles/logo.svg'

const NavbarMenu = () => {


    const { loginWithRedirect, logout, isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();


    const onLoginHandler = () => {
        loginWithRedirect()
    }

    const onLogoutHandler = () => {
        logout()
        localStorage.removeItem("userId")

        localStorage.removeItem("accessToken")
    }

    async function getUserId() {

        const response = await fetch(
            "http://localhost:7169/account",
            {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userName: user?.email })
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const id = await response.json();
        localStorage.setItem("userId", id)
    }



    useEffect(() => {
        if (user != null) {
            getUserId();
            if (isAuthenticated) {
                const token = getAccessTokenSilently()
                    .then(x => {
                        const response = fetch(
                            "http://localhost:7169/account",
                            {
                                method: "GET",
                                                mode: 'cors',
                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + x
                                },
                            })
                        localStorage.setItem("accessToken", x)
                    }
                    )
            }
        }
    }, [])

    return (
        <Box sx={{
            boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)',
        }}
        >
            <Box sx={{
                backgroundColor: "white",
                width: "70%",
                height: "10vh",
                minHeight: "80px",
                margin: "auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",

            }}>
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}  >
                    <Link href="/MainPage" >
                        <Image
                            src={logo}
                            alt="Picture of the author"
                        />
                    </Link>
                    {/* 
                    <Box sx={{ display: "flex", paddingLeft: "20px" }} >
                        {isAuthenticated && <Button
                            href="/MyParcels"
                            sx={{
                                my: 2,
                                mx: 2,
                                color: '#424143',
                                height: "50px",
                                borderBottom: "5px solid white",
                                "&:hover": {
                                    backgroundColor: "white",
                                    borderBottom: "5px solid #FFCB04",
                                },
                            }}
                        >
                            Moje paczki
                        </Button>}
                    </Box> */}
                </Box>
                {!isLoading && <Box>
                    {!isAuthenticated && <Button
                        sx={{
                            my: 2,
                            mx: 2,
                            color: '#424143',
                            height: "50px",
                            borderBottom: "5px solid white",
                            "&:hover": {
                                backgroundColor: "white",
                                borderBottom: "5px solid #FFCB04",
                            },
                        }}
                        onClick={onLoginHandler}
                    >
                        zaloguj
                    </Button>}
                    {isAuthenticated && <Button
                        sx={{
                            my: 2,
                            mx: 2,
                            color: '#424143',
                            height: "50px",
                            borderBottom: "5px solid white",
                            "&:hover": {
                                backgroundColor: "white",
                                borderBottom: "5px solid #FFCB04",
                            },
                        }}
                        onClick={onLogoutHandler}
                    >
                        wyloguj
                    </Button>}
                </Box>}
            </Box >
        </Box>
    )
}


export default NavbarMenu