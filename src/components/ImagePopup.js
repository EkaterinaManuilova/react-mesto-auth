import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card.link && "popup_opened"}`}>
      <div className="popup__image-container">
        <button
          type="button"
          className="button button_type_close"
          onClick={onClose}
        />
        <img className="popup__image-link" src={`${card.link}`} alt="Фото" />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
