export interface IElement {
  id?: number;
  name: string;
  description: string;
  payRunId: number | undefined;
  payRunValueId: number | undefined;
  classificationId: number | undefined;
  classificationValueId: number | undefined;
  categoryId: number | undefined;
  categoryValueId: number | undefined;
  reportingName: string;
  processingType: string;
  status: string;
  prorate: string;
  effectiveStartDate: string;
  effectiveEndDate: string;
  selectedMonths: string[];
  payFrequency: string;
  modifiedBy?: string;
}

export interface CreateElentInput extends IElement {}

export interface EditElementInput {
  id: number;
  data: IElement;
}

interface AdditionalInfo {
  lookupId: number;
  lookupValueId: number;
}
export interface ElementLink {
  name: string;
  elementId: number;
  suborganizationId: number;
  locationId: number;
  departmentId: number;
  employeeCategoryId: number;
  employeeCategoryValueId: number;
  employeeTypeId: number;
  employeeTypeValueId: number;
  jobTitleId: number;
  grade: number;
  gradeStep: number;
  unionId: number;
  amountType: string;
  amount: number;
  rate: number;
  effectiveStartDate: string;
  effectiveEndDate: string;
  status: string;
  automate: string;
  additionalInfo: AdditionalInfo[];
}
