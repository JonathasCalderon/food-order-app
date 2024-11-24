import { forwardRef, useImperativeHandle, useRef } from "react";

const Checkout = forwardRef(({ totalPrice, handleSubmit }, ref) => {
  const form = useRef()

  useImperativeHandle(
    ref,
    () => {
      return {
        getElements: () => {
          return form.current.elements;
        }
      }
    });

  return (
    <div className="control">
      <h2>Checkout</h2>
      <p>Total Amount {totalPrice}</p>
      <form ref={form} onSubmit={handleSubmit}>
        <div className="control">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" type="text" required />
        </div>
        <div className="control">
          <label htmlFor="emailAddress">E-Mail Address</label>
          <input id="emailAddress" name="emailAddress" type="email" required />
        </div>
        <div className="control">
          <label htmlFor="street">Street</label>
          <input id="street" name="street" type="text" required />
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="postalCode">Postal Code</label>
            <input id="postalCode" name="postalCode" type="text" required />
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input id="city" name="city" type="text" required />
          </div>
        </div>
      </form>
    </div>
  )
})

export default Checkout;
