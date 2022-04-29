import React from "react";

function PopupWithForm({
  name,
  title,
  textBtn,
  children,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  loadingTextBtn,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="button button_type_close"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className="form form_type_edit"
          name={`${name}Form`}
          onSubmit={onSubmit}
        >
          <div className="form__content">{children}</div>
          <button type="submit" className="button button_type_submit">
            {isLoading ? loadingTextBtn : textBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
