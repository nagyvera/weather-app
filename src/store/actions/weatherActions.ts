import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { GET_WEATHER, SET_ERROR, SET_LOADING, WeatherAction, WeatherData, WeatherError } from '../types';
import { async } from 'q';

export const getWeather = (city: string): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {

    try {
      var res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`);
      if (!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: WeatherData = await res.json();
      dispatch({
        type: GET_WEATHER,
        payload: resData
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.message
      });
    }
  }
}

export const getWeatherbyLoc = (lat: number, lon: number): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    try {
      var res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`);
      if (!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }
  
    const resData: WeatherData = await res.json();
    dispatch({
      type: GET_WEATHER,
      payload: resData
    });
    }catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.message
    });
   }
  }
}

export const setLoading = (): WeatherAction => {
  return {
    type: SET_LOADING
  }
}

export const setError = (): WeatherAction => {
  return {
    type: SET_ERROR,
    payload: ''
  }
}