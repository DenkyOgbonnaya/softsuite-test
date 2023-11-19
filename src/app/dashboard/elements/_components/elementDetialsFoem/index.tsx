import { Button, Input, SelectInput, TextArea } from "@/components";
import styles from "./elementDetails.module.scss";
import { FormEvent, useMemo, useState } from "react";
import { InputChangeProps } from "@/hooks/useInputChange";
import { IElement } from "@/types/elements.types";
import {
  useGetLookupsQuery,
  useGetLookupsValuesQuery,
} from "@/services/lookups.services";
import validationHandler from "@/utills/validation";
import { ElementDetailsValidationSchema } from "../../element.validation";

interface Props {
  changeProps: InputChangeProps<IElement>;
  onCancel: () => void;
  onSubmit: () => void;
}

const lookupsNames = {
  classification: "Element Classification",
  category: "Element Category",
  payrun: "Pay Run",
};

const defultState = {
  name: "",
  description: "",
  payRunId: undefined,
  payRunValueId: undefined,
  classificationId: undefined,
  classificationValueId: undefined,
  categoryId: undefined,
  categoryValueId: undefined,
  reportingName: "",
};

export function ElementDetailsForm({ changeProps, onCancel, onSubmit }: Props) {
  const [errors, setErrors] = useState<Partial<IElement>>(defultState);
  const { state, onChange, onChangeByNameValue } = changeProps;
  const { data: lookups } = useGetLookupsQuery();

  const getLookupId = (lookupName: string) => {
    const lookup = lookups?.data?.find(
      (lookup) => lookup.name.toLowerCase() === lookupName.toLowerCase()
    );
    return lookup?.id;
  };
  const classificationId = getLookupId(lookupsNames.classification);
  const payrunId = getLookupId(lookupsNames.payrun);
  const categoryId = getLookupId(lookupsNames.category);

  const { data: classifications } = useGetLookupsValuesQuery(
    classificationId!,
    { skip: classificationId === undefined }
  );
  const { data: payruns } = useGetLookupsValuesQuery(payrunId!, {
    skip: payrunId === undefined,
  });
  const { data: categories } = useGetLookupsValuesQuery(categoryId!, {
    skip: categoryId === undefined,
  });

  const getCategories = useMemo(
    () => () => {
      const selectedClassification = classifications?.find(
        (classification) => classification.id == state.classificationId
      );

      if (
        selectedClassification &&
        selectedClassification.name.toLowerCase().includes("deduction")
      ) {
        return categories?.filter((cat) =>
          cat.name.toLowerCase().includes("deduction")
        );
      }
      if (
        selectedClassification &&
        selectedClassification.name.toLowerCase().includes("earning")
      ) {
        return categories?.filter((cat) =>
          cat.name.toLowerCase().includes("earning")
        );
      } else {
        return [];
      }
    },
    [state.classificationId, classifications, categories]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors(defultState);

    const { errors, isValid } = await validationHandler<IElement>(
      state,
      ElementDetailsValidationSchema
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
          <Input
            name="name"
            value={state.name}
            onChange={onChange}
            label="Name"
            placeholder="Input Name"
            error={errors.name ? true : false}
            errorMessage={errors.name}
          />
        </div>
        <div className={styles.col}>
          <SelectInput
            name="classificationId"
            value={state.classificationId!}
            onChangeHandler={({ target }) =>
              onChangeByNameValue("classificationId", target.value)
            }
            label="Element Classification"
            placeholder="Select Classification"
            options={
              classifications?.map((item) => ({
                label: item.name,
                value: item.id,
              })) || []
            }
            error={errors.classificationId ? true : false}
            errorMessage={
              errors.classificationId !== undefined
                ? errors.classificationId.toString()
                : ""
            }
          />
        </div>
      </div>

      <div className={styles.flex}>
        <div className={styles.col}>
          <SelectInput
            name="categoryId"
            value={state.categoryId!}
            onChangeHandler={({ target }) =>
              onChangeByNameValue("categoryId", target.value)
            }
            label="Element Category"
            placeholder="Select Element Category"
            options={
              getCategories()?.map((item) => ({
                label: item.name,
                value: item.id,
              })) || []
            }
            error={errors.categoryId ? true : false}
            errorMessage={
              errors.categoryId !== undefined
                ? errors.categoryId.toString()
                : ""
            }
          />
        </div>
        <div className={styles.col}>
          <SelectInput
            name="payRunId"
            value={state.payRunId!}
            onChangeHandler={({ target }) =>
              onChangeByNameValue("payRunId", target.value)
            }
            label="Payrun"
            placeholder="Select Payrun"
            options={
              payruns?.map((item) => ({
                label: item.name,
                value: item.id,
              })) || []
            }
            error={errors.payRunId ? true : false}
            errorMessage={
              errors.payRunId !== undefined ? errors.payRunId.toString() : ""
            }
          />
        </div>
      </div>

      <div className={styles.flex}>
        <div className={styles.col}>
          <TextArea
            name="description"
            value={state.description}
            onChange={onChange}
            label="Description"
            rows={6}
            placeholder="Input Description"
            error={errors.description ? true : false}
            errorMessage={errors.description}
          />
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.col}>
          <TextArea
            name="reportingName"
            value={state.reportingName}
            onChange={onChange}
            label="Reporting Name"
            placeholder="Input Reporting Name"
            rows={6}
            error={errors.reportingName ? true : false}
            errorMessage={errors.reportingName}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <Button
          type="button"
          className={styles.col}
          intent="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" className={styles.col}>
          Next
        </Button>
      </div>
    </form>
  );
}
