import styled from "styled-components";

const StyledSelectVertical = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

function SelectVertical({ list, fieldName, id, register }) {
  return (
    <StyledSelectVertical
      {...register(id, { required: "This field is required" })}
      required
    >
      <option value="">--Select an option--</option>
      {list?.map((item) => (
        <option key={item.id} value={item.id}>
          {fieldName ? `${item[fieldName]} (${item.id})` : item[id]}
        </option>
      ))}
    </StyledSelectVertical>
  );
}

export default SelectVertical;
