import { Autocomplete, Box, InputAdornment, TextField, Button, Card, Typography, IconButton, } from "@mui/material"
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import { User } from "../../types/User";
import { Locker } from "../../types/Locker";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


interface AddParcelFormProps {
    maxWidth: number,
    setAddParcelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type Parcel = {
    name: string,
    weight: number,
    reciverId: string,
    senderId: string | null,
    sourceLockerId: string,
    destinationLockerId: string
}


const AddParcelForm: React.FC<AddParcelFormProps> = (props) => {


    const { maxWidth, setAddParcelOpen } = props

    const [lockerData, setLockerData] = useState<Locker[]>([])
    const [userData, setUserData] = useState<User[]>([])
    const [sent, setSent] = useState<boolean>(false)


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
    }

    useEffect(() => {
        setLockerData([])
        setUserData([])
        fetchLockers()
        fetchUsers();
    }, [])




    const [nameValue, setNameValue] = useState<string>("")
    const [weightValue, setWeightValue] = useState<string>("")
    const [startLockerValue, setStartLockerValue] = useState<string>("")
    const [endLockerValue, setEndLockerValue] = useState<string>("")
    const [receiverValue, setReceiverValue] = useState<string>("")

    const onNameValueChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNameValue(event.target.value)
    }

    const DIGIT_EXPRESSION = /^\d$/;

    const isDigit = (character: string) => {
        return character && DIGIT_EXPRESSION.test(character);
    };

    const onWeightValueChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value

        if (!isDigit(newValue[newValue.length - 1]) || newValue.length === 3) {
            const val = newValue.toString().substring(0, newValue.length - 1)
            setWeightValue(val)
        }
        else if (newValue.length > 1 && newValue[0] === "0") {
            setWeightValue(newValue.substring(1,))
        }
        else {
            setWeightValue(newValue)
        }
    }

    async function sendParcel(parcel: Parcel) {

        const response = await fetch(
            "https://localhost:7169/parcel",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parcel),
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }

    const onCreateNewParcelHandler = () => {
        setSent(true)
        sendParcel({
            name: nameValue,
            weight: Number(weightValue),
            senderId: localStorage.getItem("userId"),
            reciverId: receiverValue,
            sourceLockerId: startLockerValue,
            destinationLockerId: endLockerValue
        })
    }

    const onSendAgainHandler = () => {
        setNameValue("")
        setWeightValue("")
        setStartLockerValue("")
        setEndLockerValue("")
        setReceiverValue("")
        setSent(false)
    }

    return (
        <Card sx={{ bgcolor: "white", padding: "10px", borderRadius: "10px", maxWidth: maxWidth - 20 }}>
            {!sent && <>
                <Box>
                    <IconButton sx={{
                        p: 0,
                    }} onClick={() => { setAddParcelOpen(false) }}>
                        <KeyboardReturnIcon sx={{
                            color: "#424143",
                            fontSize: "30px",
                            "&:hover": {
                                color: "#FFCB04",
                            },
                        }} />
                    </IconButton>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="h4" sx={{
                        marginLeft: "5vw",
                        paddingY: "20px",
                        fontWeight: 500,
                        color: "#424143",
                        margin: "auto"
                    }}
                    >
                        Nadaj paczkę
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", height: "80px", alignItems: "center", justifyContent: "space-between" }}>
                    <TextField
                        label="Nazwa"
                        value={nameValue}
                        sx={{ width: 230 }}
                        onChange={onNameValueChangeHandler}
                    />
                    <SendIcon sx={{ marginX: "5px", color: "white" }} />
                    <TextField
                        label="Waga"
                        value={weightValue}
                        sx={{ width: 230 }}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        }}
                        onChange={onWeightValueChangeHandler}
                    />
                </Box>
                <Box sx={{ bgcolor: "#424143", height: "1px", width: "90%", margin: "auto" }} />

                <Box sx={{ display: "flex", height: "80px", alignItems: "center", justifyContent: "space-between" }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={lockerData}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        sx={{ width: 230 }}
                        onChange={(event, value) => {
                            if (value === null) {
                                setStartLockerValue("")
                            }
                            else {
                                setStartLockerValue(value.id)
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Punkt startowy" />}
                    />
                    <SignpostOutlinedIcon sx={{ marginX: "5px" }} />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={lockerData}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        sx={{ width: 230 }}
                        onChange={(event, value) => {
                            if (value === null) {
                                setEndLockerValue("")
                            }
                            else {
                                setEndLockerValue(value.id)
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Punkt docelowy" />}
                    />
                </Box>
                <Box sx={{ display: "flex", height: "80px", alignItems: "center", justifyContent: "space-between" }}>

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={userData}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        sx={{ width: "100%" }}
                        onChange={(event, value) => {
                            if (value === null) {
                                setReceiverValue("")
                            }
                            else {
                                setReceiverValue(value.id)
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Odbiorca" />}
                    />
                </Box>
                <Box sx={{ bgcolor: "#424143", height: "1px", width: "90%", margin: "auto" }} />
                <Box sx={{ display: "flex", height: "80px", alignItems: "center", justifyContent: "space-between" }}>

                    <Button
                        disabled={
                            nameValue.length < 1 ||
                            weightValue.length < 1 ||
                            receiverValue.length < 1 ||
                            startLockerValue.length < 1 ||
                            endLockerValue.length < 1
                            || startLockerValue === endLockerValue
                        }
                        sx={{
                            width: "100%",
                            height: "56px",
                            bgcolor: "#424143",
                            color: "white",
                            '&:hover': {
                                backgroundColor: '#323133',
                                cursor: "pointer",
                                // border: "5px solid #FFB502"
                            },
                            '&:disabled': {
                                color: "#A9A9A9"
                                // border: "5px solid #FFB502"
                            },

                        }}
                        onClick={onCreateNewParcelHandler}
                    >
                        Wyślij
                    </Button>

                </Box>
            </>}
            {sent && <Box sx={{ width: "100%", padding: "10px" }}>
                <Typography variant="h4" sx={{
                    marginLeft: "5vw",
                    paddingY: "20px",
                    fontWeight: 500,
                    color: "#424143",
                    margin: "auto"
                }}
                >
                    Wysłano pomyślnie
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                    <Button
                        sx={{
                            bgcolor: "#424143",
                            color: "white",
                            '&:hover': {
                                bgcolor: '#323133',
                                cursor: "pointer",
                            },
                        }}
                        onClick={onSendAgainHandler}>Wyślij ponownie</Button>
                    <Button
                        sx={{
                            bgcolor: "#424143",
                            color: "white",
                            '&:hover': {
                                bgcolor: '#323133',
                                cursor: "pointer",
                            },
                        }}
                        onClick={() => { setAddParcelOpen(false) }}
                    >Wróć</Button>
                </Box>
            </Box>}
        </Card >
    )
}

export default AddParcelForm