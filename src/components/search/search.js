import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from '../../api';

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null); //initial state is null

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions
        ) /* input value es lo que ingrese el user en el buscador */
            .then((response) => response.json()) /* convertir un formato json a formato legible para js */
            .then((response) => {
                console.log("response.data", response.data);
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),/* el map itera sobre un array y en cada indice del array retorna lo que le indiques usando "city" como una key para llamar a las propiedades que le interesa */
                };
            });
    };

    const handleOnChange = (searchData) => { /* pasand */
        setSearch(searchData);
        onSearchChange(searchData);
        console.log("search data", {searchData});
    };

/* en algun punto estas dos funciones conectan gracias a la libreria de asyncpaginate y hacen el traspaso de información // y hay el componente de asyncpagynate junta las dos funciones de loadoptions y handleonchange y hace una logica interna para enlazar la data */
    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600} //we don't want to fetch the api in the callback every time we press the key so we assign a debounce
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};


export default Search;