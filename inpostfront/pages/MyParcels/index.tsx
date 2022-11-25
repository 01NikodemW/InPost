import { useAuth0 } from '@auth0/auth0-react'
import { Box } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import LoadingScreeen from '../../components/loading-screen'
import ContentBoxLogedIn from '../../components/MainPage/content-box-loged-in'
import ContentBoxLogedOut from '../../components/MainPage/content-box-loged-out'
import FilterSection from '../../components/MyParcels/filter-section'
import MyParcelPage from '../../components/MyParcels/my-parcel-page'
import ParcelDetail from '../../components/MyParcels/parcel-detail'
import ParcelSection from '../../components/MyParcels/parcel-section'
import NavbarMenu from '../../components/navbar-menu'
import { Locker } from '../../types/Locker'
import { Parcel } from '../../types/Parcel'
import { User } from '../../types/User'
// import styles from '../styles/Home.module.css'



export default function Home() {

    const [lockerData, setLockerData] = useState<Locker[]>([])
    const [userData, setUserData] = useState<User[]>([])
    const [parcelDetail, setParcelDetail] = useState<Parcel | null>(null)
    const [lockersLoaded, setLockersLoaded] = useState<boolean>(false)
    const [usersLoaded, setUsersLoaded] = useState<boolean>(false)



    async function fetchLockers() {

        const response = await fetch(
            "https://localhost:7169/parcellocker",
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
            setLockerData((prev) => [...prev, {
                label: d.name,
                id: d.id,
            },]);
        });
        setLockersLoaded(true)
    }

    async function fetchUsers() {

        const response = await fetch(
            "https://localhost:7169/user",
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
            setUserData((prev) => [...prev, {
                label: d.userName,
                id: d.id,
            },]);
        });
        setUsersLoaded(true)
    }

    useEffect(() => {
        setLockerData([])
        setUserData([])
        fetchLockers()
        fetchUsers();
    }, [])


    const { isAuthenticated, isLoading } = useAuth0();

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
