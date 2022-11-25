import { useAuth0 } from '@auth0/auth0-react'
import { Box } from '@mui/material'
import Head from 'next/head'
import LoadingScreeen from '../../components/loading-screen'
import ContentBoxLogedIn from '../../components/MainPage/content-box-loged-in'
import ContentBoxLogedOut from '../../components/MainPage/content-box-loged-out'
import NavbarMenu from '../../components/navbar-menu'
// import styles from '../styles/Home.module.css'

export default function Home() {

    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    ;

    // if (isAuthenticated) {
    //     const token = getAccessTokenSilently()
    //         .then(x => {
    //             const response = fetch(
    //                 "https://localhost:7169/account",
    //                 {
    //                     method: "GET",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         "Authorization": "Bearer " + x
    //                     },
    //                 })
    //             return x;
    //         }
    //         )
    // }

    

    return (
        < >
            <Head>
                <title>Strona główna</title>
                <meta name="MainPage" content="AppMainPage" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {!isLoading && < Box sx={{ display: "flex", flexDirection: "column" }}>
                <NavbarMenu />
                {!isAuthenticated && <ContentBoxLogedOut />}
                {isAuthenticated && <ContentBoxLogedIn />}
                <Box sx={{ width: "100%", height: "20vh", bgcolor: "#424143" }}></Box>
            </Box>}
            {isLoading && <LoadingScreeen />}
        </>
    )
}
