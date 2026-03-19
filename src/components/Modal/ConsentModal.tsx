import type { FC } from "react";
import "./ConsentModal.css";

type Props = {
  isOpen: boolean;
  countdown: number;
  onClose: () => void;
  onConfirm: () => void;
};

const ConsentModal: FC<Props> = ({ isOpen, countdown, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <h2>Согласие с правилами</h2>
        <p>
          Для данной функции применяются особые условия и правила пользования, их
          необходимо подтвердить, нажав на кнопку Подтвердить
        </p>
        <div className="modal-actions">
          <button onClick={onClose}>Отмена</button>
          <button onClick={onConfirm} disabled={countdown > 0}>
            {countdown > 0 ? `Подтвердить (${countdown})` : "Подтвердить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentModal;