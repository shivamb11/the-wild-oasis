import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateNewBookingForm from "./CreateNewBookingForm.jsx";

function AddBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open name="newBooking-form">
          <Button>Add new booking</Button>
        </Modal.Open>

        <Modal.Window name="newBooking-form">
          <CreateNewBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
