import { object, string, number, array } from "yup";

export const ElementDetailsValidationSchema = object({
  name: string().required("Name is required"),
  classificationId: string().required("Element classification  is required"),
  categoryId: string().required("Element category  is required"),
  payRunId: string().required("Payrun is required"),
  description: string().required("Description is required"),
  reportingName: string().required("Reporting name is required"),
});

export const ElementAdditionalValidationSchema = object({
  processingType: string().required("Processing type is required"),
  status: string().required("Status  is required"),
  effectiveStartDate: string().required("Effective start date  is required"),
  effectiveEndDate: string().required("Effective end date is required"),
  selectedMonths: array().optional(),
  payFrequency: string().required("Pay frequency is required"),
  prorate: string().required("Prorate is required"),
});
