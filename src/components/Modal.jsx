import { HiXMark } from "react-icons/hi2";

const Modal = ({ children, modalId, closeBtnRef, oncloseFunc }) => {
  return (
    <div className="relative cursor-auto hide-scrollbar">
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box pb-8 bg-white hide-scrollbar">
          <form method="dialog" className="text-end ">
            <button
              onClick={oncloseFunc}
              ref={closeBtnRef}
              id="closeBtn"
              className="absolute top-3 right-3"
            >
              <HiXMark size={25} />
            </button>
          </form>
          <div className="">{children}</div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
