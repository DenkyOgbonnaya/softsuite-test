import { ReactNode, useEffect, useState } from "react";
// import { Stepper } from "react-form-stepper";
import { ElementDetailsForm } from "../elementDetialsFoem";
import styles from "./elementForm.module.scss";
import { AdditionaltDetailsForm } from "../additionalDetailsForm";
import { useInputChange } from "@/hooks";
import Stepper from "react-stepper-horizontal";
import { IElement } from "@/types/elements.types";

interface Props {
  onClose: () => void;
  onSubmit: (data: IElement) => void;
  isLoading?: boolean;
  data?: IElement;
  erroMessage?: string;
}
export default function ElementForm({
  data,
  isLoading,
  erroMessage,
  onSubmit,
  onClose,
}: Props) {
  const [currentForm, setCurrentForm] = useState(0);
  const changeProps = useInputChange<IElement>(
    data || {
      name: "",
      description: "",
      payRunId: undefined,
      payRunValueId: undefined,
      classificationId: undefined,
      classificationValueId: undefined,
      categoryId: undefined,
      categoryValueId: undefined,
      reportingName: "",
      processingType: "",
      status: "",
      prorate: "",
      effectiveStartDate: "",
      effectiveEndDate: "",
      selectedMonths: [],
      payFrequency: "",
    }
  );

  const { setState } = changeProps;
  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data, setState]);

  const handleNext = () => {
    setCurrentForm((currentForm) => currentForm + 1);
  };
  const handlePrevius = () => {
    setCurrentForm((currentForm) => currentForm - 1);
  };

  const handleSubmit = () => {
    onSubmit(changeProps.state);
  };
  const forms: Record<number, ReactNode> = {
    0: (
      <ElementDetailsForm
        changeProps={changeProps}
        onCancel={onClose}
        onSubmit={handleNext}
      />
    ),
    1: (
      <AdditionaltDetailsForm
        changeProps={changeProps}
        onBack={handlePrevius}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errorMessage={erroMessage}
      />
    ),
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepper}>
      <Stepper
        steps={[{ title: "Element Details" }, { title: "Additional Details" }]}
        activeStep={currentForm+1}
        activeColor="#CDE1E3"
        defaultColor="#4BAA79"
        completeColor="#4BAA79"
        activeTitleColor="#4BAA79"
        completeTitleColor="#4BAA79"
        defaultTitleColor="#4BAA79"
        circleFontColor="white"
        completeBarColor="#4BAA79"
        activeBorderColor="#4BAA79"
        borderColor="#4BAA79"
        defaultBorderColor="#4BAA79"
        
      />
      </div>
    
      {forms[currentForm]}
    </div>
  );
}
