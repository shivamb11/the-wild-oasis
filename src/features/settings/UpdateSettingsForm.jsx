import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useSettings } from "./useSettings.js";
import { useUpdateSettings } from "./useUpdateSettings.js";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakFastPrice,
    } = {},
    error,
  } = useSettings();

  const { isEditing, editMutate } = useUpdateSettings();

  function handleBlurSettings(e) {
    const { id, value } = e.target;

    // if(!value || value === data[id])

    editMutate({ [id]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          onBlur={(e) => handleBlurSettings(e)}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleBlurSettings(e)}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestPerBooking"
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleBlurSettings(e)}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakFastPrice"
          defaultValue={breakFastPrice}
          onBlur={(e) => handleBlurSettings(e)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
