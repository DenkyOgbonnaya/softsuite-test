export interface Lookup {
  createdAt: string;
  name: string;
  description: string;
  type: string;
  id: string;
}

export interface LookupValue {
  id: number;
  name: string;
  description: string;
  status: string;
  lookupId: number;
  lookupName: string;
  createdAt: string;
}
