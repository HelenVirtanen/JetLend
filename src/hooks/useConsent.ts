import { useState, useEffect, useCallback } from "react";

export const useConsent = (initialDelay = 5) => {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(initialDelay);
  const [confirmed, setConfirmed] = useState(false);

  const openModal = useCallback(() => {
    if (confirmed) {
      alert("Действие выполнено");
      return;
    }
    setCountdown(initialDelay); // ставим начальное значение прямо при открытии
    setIsOpen(true);
  }, [confirmed, initialDelay]);

  const close = useCallback(() => setIsOpen(false), []);
  const confirm = useCallback(() => {
    setConfirmed(true);
    setIsOpen(false);
    alert("Действие выполнено");
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  return { isOpen, countdown, openModal, close, confirm, confirmed };
};
