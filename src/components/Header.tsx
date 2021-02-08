import React, { useCallback, useState, useEffect, useRef, useContext, FC } from 'react';

import {LangContext} from './Lang';

interface HeaderProps {
    fixed?: boolean;
    transparent?: boolean;
}

const Header: FC<HeaderProps> = ({ fixed, transparent }) => {
    const { state: { language }, dispatch: { setLanguage, translate } } = useContext(LangContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownEl = useRef<HTMLUListElement>(null);
  
    let headerClass = 'header';
  
    if(fixed) {
      headerClass += ' header--fixed';
    }
  
    if(transparent) {
      headerClass += ' header--transparent';
    }
  
    const handleClickOutside = useCallback((e) => {
      if(showDropdown && e.target.closest('.dropdown') !== dropdownEl.current) {
        setShowDropdown(false);
      }
    }, [showDropdown, setShowDropdown, dropdownEl]);
  
    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      }
    }, [handleClickOutside]);
  
    const chooseLanguageHandler = (value: string) => {
      setShowDropdown(false);
      setLanguage(value);
    }
  
    return(
      <header className={headerClass}>
        <div className="container">
          <div className="header__nav">
            <div className="header__nav_lang">
              <p className="selected" onClick={() => setShowDropdown(!showDropdown)}>{language}</p>
              {showDropdown && <ul className="dropdown" ref={dropdownEl}>
                  <li onClick={() => chooseLanguageHandler('en')}>en/</li>  
                  <li onClick={() => chooseLanguageHandler('hu')}>hu</li>
                </ul>
              }
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;