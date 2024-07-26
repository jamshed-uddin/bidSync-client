import { HiXMark } from "react-icons/hi2";

const Modal = ({ children, modalId }) => {
  return (
    <div className="relative cursor-auto">
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box pb-8 bg-white">
          <form method="dialog" className="text-end ">
            <button id="closeBtn" className="absolute top-3 right-3">
              <HiXMark size={25} />
            </button>
          </form>
          <div>{children}</div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
