import {
  Button,
  DateInput,
  Input,
  RadioButton,
  RadioGroup,
  SelectInput,
  Switch,
  TextArea,
} from "@/components";
import styles from "./additionalDetails.module.scss";
import { FormEvent, useState } from "react";
import { InputChangeProps } from "@/hooks/useInputChange";
import { IElement } from "@/types/elements.types";
import validationHandler from "@/utills/validation";
import { ElementAdditionalValidationSchema } from "../../element.validation";

interface Props {
  changeProps: InputChangeProps<IElement>;
  onBack: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  errorMessage?: string;
}
const MONTHS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const defultState = {
  processingType: "",
  status: "",
  prorate: "",
  effectiveStartDate: "",
  effectiveEndDate: "",
  selectedMonths: [],
  payFrequency: "",
};
export function AdditionaltDetailsForm({
  changeProps,
  onBack,
  onSubmit,
  isLoading,
  errorMessage,
}: Props) {
  const { state, onChange, onChangeByNameValue } = changeProps;
  const [errors, setErrors] = useState<Partial<IElement>>(defultState);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors(defultState);

    const { errors, isValid } = await validationHandler<IElement>(
      state,
      ElementAdditionalValidationSchema
    );

    if (isValid) {
      onSubmit();
    } else {
      setErrors(errors);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.flex}>
        <div className={styles.col}>
          <DateInput
            name="effectiveStartDate"
            value={state.effectiveStartDate}
            onChange={onChange}
            label="Effective Start Date"
            placeholder="Select Date"
            error={errors.effectiveStartDate ? true : false}
            errorMessage={errors.effectiveStartDate}
          />
        </div>
        <div className={styles.col}>
          <DateInput
            name="effectiveEndDate"
            value={state.effectiveEndDate}
            onChange={onChange}
            label="Effective End Date"
            placeholder="Select Date"
            error={errors.effectiveEndDate ? true : false}
            errorMessage={errors.effectiveEndDate}
          />
        </div>
      </div>

      <div className={styles.flex}>
        <div className={styles.col}>
          <RadioGroup
            value={state.processingType}
            onChange={onChange}
            label="Processing Type"
            error={errors.processingType ? true : false}
            errorMessage={errors.processingType}
          >
            <RadioButton name="processingType" label="Open" value="open" />
            <RadioButton name="processingType" label="Close" value="close" />
          </RadioGroup>
        </div>
        <div className={styles.col}>
          <RadioGroup
            onChange={onChange}
            value={state.payFrequency}
            label="Pay Frequency"
            error={errors.payFrequency ? true : false}
            errorMessage={errors.payFrequency}
          >
            <RadioButton name="payFrequency" label="Monthly" value="monthyly" />
            <RadioButton
              name="payFrequency"
              label="Selected Months"
              value="selectedMonths"
            />
          </RadioGroup>
        </div>
      </div>

      <div className={styles.flex}>
        <div className={styles.col}>
          <SelectInput
            name="selectedMonths"
            value={state.selectedMonths.toString()}
            label="Select Pay Months"
            placeholder="Select"
            isMulti
            isDisabled={state.payFrequency !== "selectedMonths"}
            onChangeHandler={({ target }) => {
              onChangeByNameValue("selectedMonths", target.value);
            }}
            options={
              MONTHS?.map((item) => ({
                label: item,
                value: item,
              })) || []
            }
            error={errors.selectedMonths ? true : false}
            errorMessage={errors.selectedMonths?.toString()}
          />
        </div>
      </div>

      <div className={styles.flex}>
        <div className={styles.col}>
          <RadioGroup
            onChange={onChange}
            value={state.prorate}
            label="Prorate "
            error={errors.prorate ? true : false}
            errorMessage={errors.prorate}
          >
            <RadioButton name="prorate" label="Yes" value="Yes" />
            <RadioButton name="prorate" label="No" value="No" />
          </RadioGroup>
        </div>
        <div className={styles.col}>
          <RadioGroup onChange={() => {}} label="Status"
           error={errors.status ? true : false}
           errorMessage={errors.status}
          >
            <Switch
              name="status"
              value={state.status}
              // checked={state.status === "active" ? true : false}
              onChange={({ target }) => {
                console.log(target.value, "why");
                onChangeByNameValue(
                  "status",
                  target.value ? "active" : "inactive"
                );
              }}
            />
          </RadioGroup>
        </div>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <div className={styles.actions}>
        <Button
          type="button"
          className={styles.col}
          intent="outline"
          onClick={onBack}
        >
          Back
        </Button>

        <Button type="submit" className={styles.col} isLoading={isLoading}>
          Create New Element
        </Button>
      </div>
    </form>
  );
}
