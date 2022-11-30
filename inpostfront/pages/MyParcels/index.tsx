import { Box } from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import LoadingScreeen from '../../components/loading-screen'
import MyParcelPage from '../../components/MyParcels/my-parcel-page'
import NavbarMenu from '../../components/navbar-menu'


export default function Home() {

    const [lockersLoaded, setLockersLoaded] = useState<boolean>(false)
    const [usersLoaded, setUsersLoaded] = useState<boolean>(false)

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
        setLockersLoaded(true)
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
        setUsersLoaded(true)
    }

    useEffect(() => {
        fetchLockers()
        fetchUsers();
    }, [])

    return (
        < >
            <Head>
                <title>Moje paczki</title>
                <meta name="MyParcels" content="MyParcels" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {lockersLoaded && usersLoaded && <Box sx={{ display: "flex", flexDirection: "column", width: "100%", }}>
                <NavbarMenu />
                <Box sx={{ minHeight: "90vh", width: "100%", bgcolor: "#FFCB04", display: "flex" }}>
                    <MyParcelPage />
                </Box>
            </Box>}
            {(!lockersLoaded || !usersLoaded) && <LoadingScreeen />}
        </>
    )
}
