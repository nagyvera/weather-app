import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { GET_WEATHER, SET_ERROR, SET_LOADING, WeatherAction, WeatherData, WeatherError } from '../types';

export const getWeatherByCity = (city: string): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`);
    const resData = await res.json();
    if (res.ok) {
      dispatch({ type: GET_WEATHER, payload: resData });
    } else {
      dispatch({ type: SET_ERROR, payload: resData.message });
    }
  }
}

export const getWeatherByCoord = (lat: number, lon: number): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    var res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`);
    const resData = await res.json();
    if (res.ok) {
      dispatch({ type: GET_WEATHER, payload: resData });
    } else {
      dispatch({ type: SET_ERROR, payload: resData.message });
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