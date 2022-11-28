import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useEffect, useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Locker } from "../../types/Locker";
import { User } from "../../types/User";
import Eyes from "../../utils/eyes";
import SendIcon from '@mui/icons-material/Send';
import { FilterParameters } from "../../types/FiterParameter";

interface FilterSectionProps {
    lockerData: Locker[];
    userData: User[];
    hideHeader?: boolean
    expandedAccordion?: boolean
    setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
    setFilterParameters: React.Dispatch<React.SetStateAction<FilterParameters>>
}

const FilterSection: React.FC<FilterSectionProps> = (props) => {

    const { lockerData, userData, hideHeader, expandedAccordion, setFilterParameters,setIsModalOpen } = props;

    const DIGIT_EXPRESSION = /^\d$/;

    const isDigit = (character: string) => {
        return character && DIGIT_EXPRESSION.test(character);
    };

    const [nameValue, setNameValue] = useState<string>("")
    const [weightValue, setWeightValue] = useState<string>("")
    const [startLockerValue, setStartLockerValue] = useState<string>("")
    const [endLockerValue, setEndLockerValue] = useState<string>("")
    const [onlySentParcelsCheckValue, setOnlySentParcelsCheckValue] = useState<boolean>(false)
    const [onlyReceivedParcelsCheckValue, setOnlyReceivedParcelsCheckValue] = useState<boolean>(false)
    const [senderValue, setSenderValue] = useState<string>("")
    const [receiverValue, setReceiverValue] = useState<string>("")


    const isSenderFieldDisabled = receiverValue.length > 0 || onlySentParcelsCheckValue || onlyReceivedParcelsCheckValue
    const isReceiverFieldDisabled = senderValue.length > 0 || onlySentParcelsCheckValue || onlyReceivedParcelsCheckValue

    const onNameValueChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNameValue(event.target.value)
    }

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

    const onOnlySentParcelsCheckboxChangeHandler = () => {
        if (onlyReceivedParcelsCheckValue) {
            setOnlyReceivedParcelsCheckValue(false)
        }
        setOnlySentParcelsCheckValue(prev => !prev)
    }

    const onOnlyReceivedParcelsCheckboxChangeHandler = () => {
        if (onlySentParcelsCheckValue) {
            setOnlySentParcelsCheckValue(false)
        }
        setOnlyReceivedParcelsCheckValue(prev => !prev)
    }

    const onFilterClickHandler = () => {
        if(setIsModalOpen){
            setIsModalOpen(false)
        }
        setFilterParameters({
            name: nameValue,
            weight: weightValue,
            sourceLocker: startLockerValue,
            destinationLocker: endLockerValue,
            sender: senderValue,
            receiver: receiverValue,
            onlySentParcels: onlySentParcelsCheckValue,
            onlyReceivedParcels: onlyReceivedParcelsCheckValue,
        })
    }

    return (
        <Box sx={{
            width: "90%",
            margin: "auto",
        }}>
            {!hideHeader && <Box sx={{ height: "90px" }}>
                <Typography
                    variant="h3"
                    sx={{
                        color: "#424143",
                        paddingY: "20px",
                    }}
                >
                    Moje paczki
                </Typography>
            </Box>}

            <Accordion sx={{
                marginBottom: "30px"
            }}
                expanded={expandedAccordion}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ height: "80px", bgcolor: "#424143", color: "white", paddingLeft: "25px", borderBottom: "1px solid #FFCB04" }}
                >
                    <Typography variant="h5">Filtruj</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* Paczkomaty */}
                    <>
                        <Box sx={{ display: "flex", height: "80px", alignItems: "center", justifyContent: "space-between" }}>
                            <TextField
                                label="Nazwa"
                                onChange={onNameValueChangeHandler}
                                sx={{ width: 230 }}
                            />
                            <SendIcon sx={{ marginX: "5px", color: "white" }} />
                            <TextField
                                label="Waga"
                                sx={{ width: 230 }}
                                value={weightValue}
                                onChange={onWeightValueChangeHandler}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                }}
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
                        <Box sx={{ bgcolor: "#424143", height: "1px", width: "90%", margin: "auto" }} />
                        {/* Adresaci */}
                        <FormGroup>
                            <FormControlLabel
                                label="Tylko wysłane paczki"
                                control={
                                    <Checkbox checked={onlySentParcelsCheckValue}
                                        onChange={onOnlySentParcelsCheckboxChangeHandler}
                                        style={{
                                            color: "#424143",
                                        }}
                                    />
                                }
                            />
                            <FormControlLabel
                                label="Tylko adresowane paczki"
                                control={
                                    <Checkbox checked={onlyReceivedParcelsCheckValue}
                                        onChange={onOnlyReceivedParcelsCheckboxChangeHandler}
                                        style={{
                                            color: "#424143",
                                        }}
                                    />
                                }
                            />
                        </FormGroup>
                        <Box sx={{ display: "flex", height: "80px", alignItems: "center", justifyContent: "space-between" }}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={userData}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                sx={{ width: 230 }}
                                disabled={isSenderFieldDisabled}
                                onChange={(event, value) => {
                                    if (value === null) {
                                        setSenderValue("")
                                    }
                                    else {
                                        setSenderValue(value.id)
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} label="Adresat" />}
                            />
                            <SendOutlinedIcon sx={{ marginX: "5px" }} />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={userData}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                sx={{ width: 230 }}
                                disabled={isReceiverFieldDisabled}
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
                                sx={{
                                    width: "100%",
                                    height: "56px",
                                    bgcolor: "#424143",
                                    color: "white",
                                    '&:hover': {
                                        backgroundColor: '#323133',
                                        cursor: "pointer",
                                    },
                                }}
                                onClick={onFilterClickHandler}
                            >
                                Filtruj
                            </Button>

                        </Box>
                    </>
                </AccordionDetails>
            </Accordion>
            <Eyes />
        </Box >
    )
}

export default FilterSection