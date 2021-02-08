import React, { FC, useState, FormEvent, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {useTheme} from './ThemeContent';

import { setAlert } from '../store/actions/alertActions';
import { getWeatherByCity, getWeatherByCoord, setLoading } from '../store/actions/weatherActions';

interface SearchProps {
  translate: (key: string) => string;
}

const Search: FC<SearchProps> = ({translate}) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const { theme, setTheme } = useTheme();

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        var lon = position.coords.longitude;
        var lat = position.coords.latitude;
        console.log(`longitude: ${ lon } | latitude: ${ lat }`);
      });
    }

  const changeCityHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  }
  const changeLatHandler = (e: FormEvent<HTMLInputElement>) => {
    setLat(e.currentTarget.value);
  }
  const changeLonHandler = (e: FormEvent<HTMLInputElement>) => {
    setLon(e.currentTarget.value);
  }

  const cityHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(city.trim() === '') {
      return dispatch(setAlert("City is required!"));
    }

    dispatch(setLoading());
    dispatch(getWeatherByCity(city));
  }

  const coordHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading());
    dispatch(getWeatherByCoord(lat, lon));
  }

  return(
    <div className="hero is-light has-text-centered">
      <div className="hero-body">
        <div className="container">
          <h1 className="tit">{translate('title')}</h1>
          <form className="py-5" onSubmit={cityHandler}>
            <input 
              type="text"
              className="input has-text-centered mb-2"
              placeholder={translate('enterText')}
              style={{maxWidth: 300}}
              value={city}
              onChange={changeCityHandler}
            />
            <button className="button is-primary is-fullwidth" style={{maxWidth: 300, margin: '0 auto'}}>{translate('btn')}</button>
          </form>
          <form className="py-5" onSubmit={coordHandler}>
            <input 
              type="number"
              className="input has-text-centered mb-2"
              placeholder={translate('latitudeText')}
              style={{maxWidth: 150}}
              value={lat}
              onChange={changeLatHandler}
            />
            <input 
              type="number"
              className="input has-text-centered mb-2"
              placeholder={translate('longitudeText')}
              style={{maxWidth: 150}}
              value={lon}
              onChange={changeLonHandler}
            />
            <button className="button is-primary is-fullwidth" style={{maxWidth: 300, margin: '0 auto'}}>{translate('btn')}</button>
          </form>
        </div>
      </div>
      <div className='foo'>
      <button className = "btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "light" : "dark"}
        </button>  
      </div>
    </div>
  );  
}

export default Search;