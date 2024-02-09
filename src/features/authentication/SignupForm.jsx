import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input";

import { useSignup } from "./useSignup.js";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, handleSubmit, getValues } = useForm();
  const { errors } = formState;

  const { signupMutate, isSigning } = useSignup();

  function onSubmit({ email, password, fullName }) {
    signupMutate({ email, password, fullName });
  }

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" errorMessage={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field should not be empty",
          })}
          disabled={isSigning}
        />
      </FormRow>

      <FormRow label="Email address" errorMessage={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          name="email"
          {...register("email", {
            required: "This field should not be empty",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Enter a valid email address",
            },
          })}
          disabled={isSigning}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        errorMessage={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field should not be empty",
            minLength: {
              value: 8,
              message: "Password should contain minimum of 8 characters",
            },
          })}
          disabled={isSigning}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        errorMessage={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field should not be empty",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
          disabled={isSigning}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" disabled={isSigning}>
          Cancel
        </Button>
        <Button disabled={isSigning}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
