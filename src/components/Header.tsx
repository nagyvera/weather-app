import React, { useContext, FC } from 'react';

import {LangContext} from './Lang';
import {useTheme} from './ThemeContent';

const Header: FC = () => {
    const { state: { language }, dispatch: { setLanguage } } = useContext(LangContext);
    const { theme, setTheme } = useTheme();
  
    return(
      <header className="header">
        <div className="header__nav_lang">
          <button className='btn' onClick={()=> setLanguage(language === "en" ? "hu" : "en")}>
            {language === "en" ? "hu" : "en"}
          </button>
        </div>
        <div className='foo'>
          <button className = "btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "light" : "dark"}
          </button>  
        </div>
      </header>
    );
  }
  
  export default Header;