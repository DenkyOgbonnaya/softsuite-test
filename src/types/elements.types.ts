export interface IElement {
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
  modifiedBy?: string
}

export interface CreateElentInput extends IElement {
 
}
