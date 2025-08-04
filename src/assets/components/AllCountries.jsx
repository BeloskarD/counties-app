import React, { useContext, useEffect, useMemo, useState } from 'react'

import searchIcon from '../Images/search.png'
import { GlobalContext } from './GlobalContext'
import { CountryData } from './Countries'

const AllCountries = () => {
    const { countryData, setCountryData, filteredCountries, setFilteredCountries, countryName, setCountryName, countryWithRegion, setCountryWithRegion, darkMode, setsingleCountryDetails } = useContext(GlobalContext)
    const [isInitialized, setIsInitialized] = useState(false)
    const [inputValue, setInputValue] = useState('')

    function handleSingleCountryDetails(country) {
        let filteredCountry = countryData.filter(item => item.name === country)
        setsingleCountryDetails(filteredCountry)
    }

    useEffect(() => {
        // Only set filtered countries if we don't have any (first load)
        // AND if we don't have any search/filter criteria
        if (filteredCountries.length === 0 && !countryName && !countryWithRegion) {
            setFilteredCountries(CountryData)
        }
        
        setIsInitialized(true)
    }, []);

    // Set input value when countryName changes (for initial load from localStorage)
    useEffect(() => {
        setInputValue(countryName)
    }, [countryName])

    useEffect(() => {
        // Only run filtering logic after initialization and if we have country data
        if (!isInitialized || countryData.length === 0) {
            return;
        }
        
        let filtered = countryData;

        if (countryName) {
            filtered = filtered.filter((country) =>
                country.name.toLowerCase().includes(countryName.toLowerCase())
            );
        }

        if (countryWithRegion && countryWithRegion !== 'All') {
            filtered = filtered.filter((country) =>
                country.region.toLowerCase().includes(countryWithRegion.toLowerCase())
            );
        }

        setFilteredCountries(filtered);
    }, [countryName, countryWithRegion, countryData, isInitialized]);
        
    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const debouncedSearch = useMemo(() =>
        debounce((value) => {
            setCountryName(value);
        }, 500),
        [setCountryName]
    );

    function handleDeboundeInput(e) {
        const value = e.target.value;
        setInputValue(value); // Update input immediately for UI responsiveness
        debouncedSearch(value); // Debounce the actual search
    }

    return (
        <div className='container'>
            <div className={`searachFilterDiv ${darkMode ? 'darkMode' : ''}`}>
                <div className='countrySearchDiv'>
                    <img src={searchIcon} alt="" />
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={(e) => handleDeboundeInput(e)} 
                        placeholder='Search for a country...' 
                    />
                </div>
                <div className="countryFilterDiv">
                    <label htmlFor="region">{countryWithRegion === '' ? 'Filter by Region' : countryWithRegion}</label>
                    <i className="fa fa-angle-down"></i>
                    <select name="region" id="region" value={countryWithRegion} onChange={(e) => setCountryWithRegion(e.target.value)}>
                        <option value="All" className="regions">All</option>
                        <option value="Africa" className="regions">Africa</option>
                        <option value="America" className="regions">America</option>
                        <option value="Asia" className="regions">Asia</option>
                        <option value="Europe" className="regions">Europe</option>
                        <option value="Oceania" className="regions">Oceania</option>
                    </select>
                </div>
            </div>
            <div className={`coutriesList ${darkMode ? 'darkMode' : ''}`}>
                {filteredCountries.map((country, index) => {
                    return (
                        <div className="coutryDiv" key={index} onClick={() => handleSingleCountryDetails(country.name)}>
                            <img src={country.flags.svg} alt="dfdsfa" />
                            <div className="countryDetailsDiv">
                                <span>{country.name}</span>
                                <div className="countryDetails">
                                    <p><span>Population:</span> {country.population}</p>
                                    <p><span>Region:</span> {country.region}</p>
                                    <p><span>Capital:</span> {country.capital}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default AllCountries
