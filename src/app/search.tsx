
import { FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";

import styles from "./page.module.css";

export default function Search({updateSearchValue, updateSearchType}: {updateSearchValue: Function, updateSearchType: Function}) {

    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("");

    function updateSelectionSearchType(value: { target: { value: any; }; }){
        setSearchType(value.target.value);
        updateSearchType(value.target.value);
    }

    function updateSearchTerm(value: { target: { value: any; }; }){
        setSearchValue(value.target.value);
        updateSearchValue(value.target.value);
    }

    return(
        <div className={styles.searchContainer}>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="medium">
                <InputLabel id="search-type-label">Search By:</InputLabel>
                <Select
                    labelId="search-type-label"
                    id="search-type"
                    value={searchType}
                    label="Search By:"
                    onChange={updateSelectionSearchType}
                >
                    <MenuItem value={"team"}>Team Number</MenuItem>
                    <MenuItem value={"name"}>Team Name</MenuItem>
                    <MenuItem value={"country"}>Country</MenuItem>
                    <MenuItem value={"state"}>State</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id= "outlined-basic"
                defaultValue="Small"
                fullWidth
                placeholder="Search"
                value={searchValue}
                onChange={updateSearchTerm} 
            />

        </div>
    )
}

