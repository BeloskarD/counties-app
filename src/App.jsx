import { useContext, useEffect, useState, useRef } from 'react'


import NavBar from './assets/components/NavBar'
import AllCountries from './assets/components/AllCountries'
import { GlobalContext } from './assets/components/GlobalContext'
import SingleCountryDetail from './assets/components/SingleCountryDetail'
import { CountryData } from './assets/components/Countries'

function App() {

  const { singleCountryDetails, filteredCountries, setFilteredCountries, setsingleCountryDetails, countryName, setCountryName, countryWithRegion, setCountryWithRegion, countryData, setCountryData, darkMode, setDarkMode } = useContext(GlobalContext)
  const hasLoadedFromStorage = useRef(false)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    if (hasLoadedFromStorage.current) return;

    const savedFilteredCountries = localStorage.getItem('filteredCountries')
    const savedSingleCountryDetails = localStorage.getItem('singleCountryDetails')
    const savedCountryName = localStorage.getItem('countryName')
    const savedCountryWithRegion = localStorage.getItem('countryWithRegion')
    const savedDarkMode = localStorage.getItem('darkMode')

    if (savedFilteredCountries) {
      setFilteredCountries(JSON.parse(savedFilteredCountries))
    }

    if (savedSingleCountryDetails) {
      setsingleCountryDetails(JSON.parse(savedSingleCountryDetails))
    }

    if (savedCountryName) {
      setCountryName(savedCountryName)
    }

    if (savedCountryWithRegion) {
      setCountryWithRegion(savedCountryWithRegion)
    }

    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode))
    }

    hasLoadedFromStorage.current = true
    setIsLoading(false)
  }, []);

  // Always set country data on mount
  useEffect(() => {
    setCountryData(CountryData)
  }, [])

  useEffect(() => {
    localStorage.setItem('filteredCountries', JSON.stringify(filteredCountries))
  }, [filteredCountries]);

  useEffect(() => {
    localStorage.setItem('singleCountryDetails', JSON.stringify(singleCountryDetails))
  }, [singleCountryDetails]);

  useEffect(() => {
    localStorage.setItem('countryName', countryName)
  }, [countryName]);

  useEffect(() => {
    localStorage.setItem('countryWithRegion', countryWithRegion)
  }, [countryWithRegion]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode]);

  // Show loading spinner while data is being loaded from localStorage
  if (isLoading) {
    return (
      <div className='MainContainer'>
        <NavBar />
        <div className="countriesContianer">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div>Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='MainContainer'>
      <NavBar />
      <div className="countriesContianer">
        {
          singleCountryDetails.length === 0 ? <AllCountries /> : <SingleCountryDetail />
        }
      </div>
    </div>
  )
}

export default App
