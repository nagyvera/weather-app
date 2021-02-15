import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { GET_WEATHER, SET_ERROR, SET_LOADING, WeatherAction} from '../types';

export const getWeatherByCity = (API_KEY:string, city: string): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const resData = await res.json();
    if (res.ok) {
      dispatch({ type: GET_WEATHER, payload: resData });
    } else {
      dispatch({ type: SET_ERROR, payload: resData.message });
    }
  }
}

export const getWeatherByCoord = (API_KEY:string, lat: number, lon: number): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    var res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
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