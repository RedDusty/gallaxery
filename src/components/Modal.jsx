import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div style={{ width: '100%', height: '100%' }}>{children} </div>,
    document.getElementById('modal')
  );
};

export default Modal;
