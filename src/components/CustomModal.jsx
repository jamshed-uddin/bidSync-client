import { useEffect, useState } from "react";

import Modal from "react-modal";

const customStyles = {
  overlay: { backgroundColor: "transparent" },
  content: {
    minWidth: "45%",
    maxWidth: "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "1rem",
    border: "none",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 0 1rem 0.1rem rgba(128, 128, 128, 0.32)",
  },
};

const customMobileStyle = {
  overlay: { backgroundColor: "transparent" },
  content: {
    top: "auto",
    left: "0",
    right: "0",
    bottom: "0",
    borderRadius: " 2rem 2rem 0 0",
    border: "none",
    boxShadow: "0 0 1rem 0.1rem rgba(128, 128, 128, 0.32)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const CustomModal = ({
  children,
  onRequestClose,
  onAfterClose,
  isOpen,
  shouldCloseOnOverlayClick,
}) => {
  const [isMobileDevice, setIsMobileDevice] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Modal
      onRequestClose={onRequestClose}
      onAfterClose={onAfterClose}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      style={isMobileDevice ? customMobileStyle : customStyles}
    >
      <div className="cursor-auto hide-scrollbar ">
        <div className=" bg-white hide-scrollbar">{children}</div>
      </div>
    </Modal>
  );
};

export default CustomModal;
