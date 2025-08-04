import { createContext, useState } from "react";


export const GlobalContext = createContext(null)

export  const GlobalValue = ({ children }) => {

    const [darkMode, setDarkMode] = useState(false)
    const [countryData, setCountryData] = useState([]); // Store all countries
    const [filteredCountries, setFilteredCountries] = useState([]); // Filtered result
    const [countryName, setCountryName] = useState("");
    const [countryWithRegion, setCountryWithRegion] = useState("");
    const [singleCountryDetails, setsingleCountryDetails] = useState([]);

    return (
        <GlobalContext.Provider value={{countryData, setCountryData,filteredCountries, setFilteredCountries,countryName, setCountryName,countryWithRegion, setCountryWithRegion,darkMode, setDarkMode,singleCountryDetails, setsingleCountryDetails}}>{children}</GlobalContext.Provider>
    )
}
