import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { RootState } from './store';
import Search from './components/Search';
import Alert from './components/Alert';
import Weather from './components/Weather';
import { setAlert } from './store/actions/alertActions';
import { setError } from './store/actions/weatherActions';

const App: FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);
  const alertMsg = useSelector((state: RootState) => state.alert.message);

  function Greetings(){
    let greeting: string;
    const currentTime = new Date();
    const time = currentTime.getHours();
    
    if (time < 12) {
      greeting = "Good morning!";
    } else if (time < 18) {
      greeting = "Have a good day!";
    } else {
      greeting = "Good evening!";
    }
     return greeting; 
  };

  return (
    <div className="has-text-centered">
      <div> 
        <h4>{Greetings()}</h4>
      </div>
      <Search title="Enter city name and press search button" />
      {loading ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherData && <Weather data={weatherData} />}

      {alertMsg && <Alert message={alertMsg} onClose={() => dispatch(setAlert(''))} />}
      {error && <Alert message={error} onClose={() => dispatch(setError())} />}
    </div>
  );
}

export default App;
