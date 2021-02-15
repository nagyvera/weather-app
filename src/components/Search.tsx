import React, { FC, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { setAlert } from '../store/actions/alertActions';
import { getWeatherByCity, getWeatherByCoord, setLoading } from '../store/actions/weatherActions';

interface SearchProps {
  translate: (key: string) => string;
}

const Search: FC<SearchProps> = ({translate}) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [API_KEY, setAPI] = useState('');

  const changeCityHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  }
  const changeAPIHandler = (e: FormEvent<HTMLInputElement>) => {
    setAPI(e.currentTarget.value);
  }

  const cityHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(API_KEY.trim() === '' || city.trim() === ''){
      return dispatch(setAlert(translate('warning')))
    }

    dispatch(setLoading());
    dispatch(getWeatherByCity(API_KEY, city));
  }

  const coordHandler = (e: FormEvent<HTMLFormElement>) => {
    if(API_KEY.trim() === ''){
      return dispatch(setAlert(translate('APImissing')))
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
        dispatch(getWeatherByCoord(API_KEY, lat, lon));
      });
      e.preventDefault();
      dispatch(setLoading());
    }
  }

  return(
    <div className="hero is-light has-text-centered">
      <div className="hero-body">
        <div className="container">
          <h1 className="tit">{translate('title')}</h1>
          <form className="py-1" onSubmit={cityHandler}>
          <input 
              type="text"
              className="input has-text-centered mb-2"
              placeholder={translate('API')}
              style={{maxWidth: 300}}
              value={API_KEY}
              onChange={changeAPIHandler}
            />
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
            <button className="button is-primary is-fullwidth" style={{maxWidth: 300, margin: '0 auto'}}>{translate('Locbtn')}</button>
          </form>
        </div>
      </div>
    </div>
  );  
}

export default Search;