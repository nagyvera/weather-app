import React, { createContext, ReactNode } from 'react';

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