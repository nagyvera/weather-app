import React, { FC, useContext } from 'react';
import { LangContext } from './Lang';
interface AlertProps {
  message: string;
  onClose: () => void
}

const Alert: FC<AlertProps> = ({ message, onClose }) => {

  const { dispatch: { translate } } = useContext(LangContext);

  return(
    <div className="modal is-active has-text-centered">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-danger">
          <h3 className="modal-card-title has-text-white">{message}</h3>
        </header>
        <footer className="modal-card-foot" style={{justifyContent: 'center'}}>
          <button className="button" onClick={onClose}>{translate('close')}</button>
        </footer>
      </div>
    </div>
  );
}

export default Alert;