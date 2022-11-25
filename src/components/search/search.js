import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../../api';

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null); //initial state is null

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities??minPopuopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude}, ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600} //we don't want to fetch the api in the callback every time we press the key so we assign a debounce
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}


export default Search;