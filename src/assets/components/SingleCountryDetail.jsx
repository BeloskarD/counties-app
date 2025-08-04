import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext';

const SingleCountryDetail = () => {
    const { singleCountryDetails, setsingleCountryDetails, countryData, darkMode, setCountryName, setCountryWithRegion } = useContext(GlobalContext)

    function handleback() {
        setsingleCountryDetails([])
        setCountryWithRegion('')
        setCountryName('')
        localStorage.removeItem('singleCountryDetails')
    }

    const borderCountryNames = countryData
        .filter(country =>
            singleCountryDetails.some(singleCountry =>
                singleCountry.borders?.includes(country.alpha3Code)
            )
        )
        .map(country => country.name);


    function gotoCountryName(name) {
        let filteredCountry = countryData.filter(item => item.name === name)
        setsingleCountryDetails(filteredCountry)
    }

    return (
        <div className={`singleContainer ${darkMode ? 'darkTheme' : ''}`}>
            <div className="goBackBtn" onClick={() => handleback()}>
                <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <p>Back</p>
            </div>
            {
                singleCountryDetails.map((country, index) => {
                    return (
                        <div className="countryInfo" key={index}>
                            <div className="countryFlagImg">
                                <img src={country.flags.svg} alt="" />
                            </div>
                            <div className="countryInfoDetails">
                                <div className="countryTopDiv">
                                    <div className="firstDiv">
                                        {country.name}
                                    </div>
                                    <div className="secondDiv">
                                        <div className="leftDiv">
                                            <p><span>Native Name: </span>{country.nativeName}</p>
                                            <p><span>Polulation: </span>{country.population}</p>
                                            <p><span>Region: </span>{country.region}</p>
                                            <p><span>Sub Region: </span>{country.subregion}</p>
                                            <p><span>Capital: </span>{country.capital}</p>
                                        </div>
                                        <div className="rightDiv">
                                            <p><span>Top Level Domain: </span>{country.topLevelDomain}</p>
                                            <p><span>Currencies: </span>{country.currencies[0].name}</p>
                                            <p><span>Languages: </span>{country.languages[0].name}</p>
                                        </div>
                                    </div>
                                    {borderCountryNames.length > 0 && <div className="borderDiv">
                                        <span>Border Countries: </span>
                                        <div className="borders">
                                            {
                                                borderCountryNames.map((border, index) => {
                                                    return (
                                                        <button key={index} onClick={() => gotoCountryName(border)}>{border}</button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SingleCountryDetail
