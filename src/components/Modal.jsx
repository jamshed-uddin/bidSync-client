import { HiXMark } from "react-icons/hi2";

const Modal = ({ children }) => {
  return (
    <div>
      <dialog id="myModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box pb-8">
          <form method="dialog" className="text-end">
            <button id="closeBtn">
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
