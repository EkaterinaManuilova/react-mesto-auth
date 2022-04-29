import React from "react";
import success from "../images/Success.svg";
import fail from "../images/Fail.svg";

function InfoTooltip({ isOpen, onClose, isSuccessReg }) {
  return (
    <div className={`popup popup_type_info ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="button button_type_close"
          onClick={onClose}
        />
        <img
          className="popup__registration-image"
          src={isSuccessReg ? success : fail}
          alt={isSuccessReg ? "Иконка Успешно" : "Иконка Ошибка регистрации"}
        />
        <p className="popup__registration-message">
          {isSuccessReg
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так!" + "Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}
export default InfoTooltip;
