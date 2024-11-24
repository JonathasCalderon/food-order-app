import { createPortal } from "react-dom"
import { useRef, useImperativeHandle, forwardRef } from "react"

const Modal = forwardRef(({ actions, children }, ref) => {
  const dialog = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          dialog.current.showModal();
        }
      }
    })

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
      <form method="dialog">
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")
  )
});

export default Modal;
