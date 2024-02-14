import { useForm } from "react-hook-form";
import { differenceInDays } from "date-fns";

import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow.jsx";
import SelectVertical from "../../ui/SelectVertical.jsx";
import Input from "../../ui/Input.jsx";
import Button from "../../ui/Button.jsx";
import Checkbox from "../../ui/Checkbox.jsx";

import { useCreateBooking } from "./useCreateBooking.js";
import { useCabinsIdAndName } from "../cabins/useCabinsIdAndName.js";
import { useGuestsIdAndName } from "../guests/useGuestsIdAndName.js";
import { useSettings } from "../settings/useSettings.js";

const statusList = [
  { status: "unconfirmed", id: "unconfirmed" },
  { status: "checked-in", id: "checked-in" },
  { status: "checked-out", id: "checked-out" },
];

function CreateNewBookingForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { cabins, isLoadingCabins } = useCabinsIdAndName();
  const { guests, isLoadingGuests } = useGuestsIdAndName();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { createBookingMutate, isCreatingBooking } = useCreateBooking();

  function onSubmit(data) {
    const { cabinId, guestId, startDate, endDate, hasBreakfast, isPaid } = data;

    const cabin = cabins.find((cabin) => cabin.id === Number(cabinId));

    const convertedData = {
      ...data,
      cabinId: Number(cabinId),
      guestId: Number(guestId),
      numNights: differenceInDays(new Date(endDate), new Date(startDate)),
      cabinPrice: cabin.regularPrice - cabin.discount,
      extrasPrice: hasBreakfast === true ? settings.breakFastPrice : 0,
      totalPrice:
        cabin.regularPrice -
        cabin.discount +
        (hasBreakfast === true ? settings.breakFastPrice : 0),
      hasBreakfast: hasBreakfast === true,
      isPaid: isPaid === true,
    };

    createBookingMutate(convertedData, {
      onSuccess: () => {
        reset(getValues());
        onCloseModal?.();
      },
    });
  }

  const isLoading =
    isLoadingCabins ||
    isLoadingGuests ||
    isLoadingSettings ||
    isCreatingBooking;

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormRow label="Guest Id" errorMessage={errors?.guestId?.message}>
        <SelectVertical
          list={guests}
          fieldName="fullName"
          id="guestId"
          disabled={isLoading}
          register={register}
        />
      </FormRow>

      <FormRow label="Cabin Id" errorMessage={errors?.cabinId?.message}>
        <SelectVertical
          list={cabins}
          fieldName="name"
          id="cabinId"
          disabled={isLoading}
          register={register}
          validate={(value) =>
            cabins?.find((cabin) => cabin.id == getValues("cabinId"))
              ?.maxCapacity >= value || "Can't exceed maximum capacity"
          }
        />
      </FormRow>

      <FormRow label="Start Date" errorMessage={errors?.startDate?.message}>
        <Input
          type="date"
          disabled={isLoading}
          {...register("startDate", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="End Date" errorMessage={errors?.endDate?.message}>
        <Input
          type="date"
          disabled={isLoading}
          {...register("endDate", {
            required: "This field is required",
            validate: (value) =>
              (differenceInDays(
                new Date(value),
                new Date(getValues("startDate"))
              ) <= settings.maxBookingLength &&
                differenceInDays(
                  new Date(value),
                  new Date(getValues("startDate"))
                ) >= settings.minBookingLength) ||
              `Booking length should be between ${settings.minBookingLength} & ${settings.maxBookingLength} days`,
          })}
        />
      </FormRow>

      <FormRow
        label="Number of guests"
        errorMessage={errors?.numGuests?.message}
      >
        <Input
          type="number"
          disabled={isLoading}
          {...register("numGuests", {
            required: "This field is required",
            validate: (value) =>
              settings.maxGuestPerBooking >= value ||
              "Can't exceed maximum capacity",
          })}
        />
      </FormRow>

      <FormRow label="Status" errorMessage={errors?.status?.message}>
        <SelectVertical
          list={statusList}
          id="status"
          disabled={isLoading}
          register={register}
        />
      </FormRow>

      <FormRow label="Any Observations ?">
        <Input type="text" disabled={isLoading} {...register("observations")} />
      </FormRow>

      <FormRow label="Has choosen breakfast ?">
        <Checkbox id="hasBreakfast" disabled={isLoading} register={register} />
      </FormRow>

      <FormRow label="Is paid ?">
        <Checkbox id="isPaid" disabled={isLoading} register={register} />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" disabled={isLoading}>
          Reset
        </Button>
        <Button disabled={isLoading}>Create booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateNewBookingForm;
