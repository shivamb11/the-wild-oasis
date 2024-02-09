import { useForm } from "react-hook-form";

import Input from "../../ui/Input.jsx";
import Form from "../../ui/Form.jsx";
import Button from "../../ui/Button.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Textarea from "../../ui/Textarea.jsx";
import FormRow from "../../ui/FormRow.jsx";

import { useCreateCabin } from "./useCreateCabin.js";
import { useUpdateCabin } from "./useUpdateCabin.js";

function CreateUpdateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isAdding, addMutate } = useCreateCabin();

  const { isEditing, editMutate } = useUpdateCabin();

  const isLoading = isAdding || isEditing;

  const { id: editId, ...editCabin } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: isEditSession ? editCabin : {},
  });

  function onSubmit(data) {
    if (isEditSession) {
      // This is done to prevent a bug in which the user first click upload and then cancels it. In that case, the previous one will be used.
      const image =
        typeof data.image === "string" || data.image.length > 0
          ? data.image
          : editCabin.image;

      editMutate(
        { editCabin: { ...data, image }, editId },
        {
          onSuccess: () => {
            reset(getValues());
            onCloseModal?.();
          },
        }
      );
    } else {
      addMutate(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" errorMessage={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        errorMessage={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity can't be lower than 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        errorMessage={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" errorMessage={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isLoading}
          {...register("discount", {
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount can't be greater than the cabin price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        errorMessage={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          disabled={isLoading}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isLoading}
          {...register("image", {
            required: !isEditSession && "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          size="small"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateUpdateCabinForm;
