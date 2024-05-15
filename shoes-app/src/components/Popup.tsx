import { useSelector } from 'react-redux';
import './../../css/Popup.css'


export default function Popup() {
  const popupState = useSelector((state: unknown) => state.main.popupState);

  return (
    <>
      <div className={`popup ${popupState ? '': 'close'}`}>
        <div className="popup__body">
          <div className="popup__text">
            <span>Заказ оформлен успешно</span>
          </div>
          <span className="popup__btn" onClick={() => {
            
          }}>&#10006;</span>
        </div>
      </div>
    </>
  );
}
