import React, { useReducer, FC, ReactNode, createContext } from 'react';

import en from '../containers/languages/en.json';
import hu from '../containers/languages/hu.json';

enum LangActionType {
  SET_LANGUAGE = 'SET_LANGUAGE'
}

interface LangState {
  language: string;
}

interface LangStateProps {
  children: ReactNode;
}

interface SetLanguageAction {
  type: typeof LangActionType.SET_LANGUAGE;
  payload: string;
}

interface ContextProps {
  state: LangState;
  dispatch: {
    setLanguage: (lang: string) => void;
    translate: (key: string) => string;
  }
}

const langReducer = (state: LangState, action: SetLanguageAction): LangState => {
  switch(action.type) {
    case LangActionType.SET_LANGUAGE:
      return {
        language: action.payload
      }
    default:
      return state;
  }
}

const localStorageLang = localStorage.getItem('language');
const initialState = {
  language: localStorageLang ? localStorageLang : 'en'
}

export const LangContext = createContext({} as ContextProps);

const LangState: FC<LangStateProps> = ({ children }) => {
  const [state, dispatch] = useReducer(langReducer, initialState);

  const setLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    dispatch({
      type: LangActionType.SET_LANGUAGE,
      payload: lang
    });
  }

  const translate = (key: string): string => {
    const { language } = state;
    let langData: { [key: string]: string } = {};

    if(language === 'en') {
      langData = en;
    }else if(language === 'hu') {
      langData = hu;
    }
    return langData[key];
  }

  return(
    <LangContext.Provider value={{ state, dispatch: { setLanguage, translate }}}>
      {children}
    </LangContext.Provider>
  );
}

export default LangState;