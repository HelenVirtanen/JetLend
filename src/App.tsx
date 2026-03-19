import UsersCatalog from "./components/UsersCatalog/UsersCatalog";
import ActionButton from "./components/ActionButton/ActionButton";
import ConsentModal from "./components/ConsentModal/ConsentModal";
import { useConsent } from "./hooks/useConsent";

function App() {
  const { isOpen, countdown, openModal, confirm, close } = useConsent();

  return (
    <>
      <h1>JetLend tasks</h1>
      <ActionButton onClick={openModal}>Выполнить действие</ActionButton>
      <ConsentModal
        isOpen={isOpen}
        countdown={countdown}
        onClose={close}
        onConfirm={confirm}
      />
      <UsersCatalog />
    </>
  );
}

export default App;
