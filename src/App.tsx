import React, { FC, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { RootState } from './store';
import Search from './components/Search';
import Alert from './components/Alert';
import Weather from './components/Weather';
import { setAlert } from './store/actions/alertActions';
import { setError } from './store/actions/weatherActions';

import { ThemeProvider, useTheme } from './components/ThemeContent';
import {LangContext} from './components/Lang';
import Header from './components/Header';

const App: FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);
  const alertMsg = useSelector((state: RootState) => state.alert.message);
  const { dispatch: { translate }} = useContext(LangContext);

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

  /*function AutoTheme(){
    const currentTime = new Date();
    const time = currentTime.getHours();

      if(time < 18 || time < 7 ){
          return(name == "dark");
      }
      else {
          return(name == "light");
      }
  }*/

const Page = () => {
  return (
     <div className="has-text-centered"> 
     <Header />
      <h4 className="gr">{Greetings()}</h4>
     <Search translate={translate}/>
     {loading ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherData && <Weather data={weatherData} />}
     {alertMsg && <Alert message={alertMsg} onClose={() => dispatch(setAlert(''))} />}
     {error && <Alert message={error} onClose={() => dispatch(setError())} />}
   </div>
  );
};

  return (
      <ThemeProvider>
        <Page />
      </ThemeProvider>
  );
}

export default App;
