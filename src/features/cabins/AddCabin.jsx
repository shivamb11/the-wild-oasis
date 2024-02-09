import Button from "../../ui/Button.jsx";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm.jsx";
import Modal from "../../ui/Modal.jsx";

function AddCabin() {
  return (
    <div>
      <Modal name="cabin-form">
        <Modal.Open name="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>

        <Modal.Window name="cabin-form">
          {/* Pass it as children prop and use createElement */}
          <CreateUpdateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
