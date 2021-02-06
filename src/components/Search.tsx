import React, { FC, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import {useTheme} from './ThemeContent';

import { setAlert } from '../store/actions/alertActions';
import { getWeather, setLoading } from '../store/actions/weatherActions';

interface SearchProps {
  title: string;
}

const Search: FC<SearchProps> = ({ title }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const { theme, setTheme } = useTheme();

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(city.trim() === '') {
      return dispatch(setAlert('City is required!'));
    }

    dispatch(setLoading());
    dispatch(getWeather(city));
    setCity('');
  }

  return(
    <div className="hero is-light has-text-centered">
       
      <div className="hero-body">
        <div className="container">
          <h1 className="tit">{title}</h1>
          <form className="py-5" onSubmit={submitHandler}>
            <input 
              type="text"
              className="input has-text-centered mb-2"
              placeholder="City name here!"
              style={{maxWidth: 300}}
              value={city}
              onChange={changeHandler}
            />
            <button className="button is-primary is-fullwidth" style={{maxWidth: 300, margin: '0 auto'}}>Search</button>
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