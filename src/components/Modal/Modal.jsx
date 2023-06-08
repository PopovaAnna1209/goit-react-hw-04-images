import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRootEl = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return createPortal(
      <div className={css.overlay} onClick={handleBackDropClick}>
        <div className={css.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>,
      modalRootEl
    );
  }


Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageUrl: PropTypes.string.isRequired,
};
