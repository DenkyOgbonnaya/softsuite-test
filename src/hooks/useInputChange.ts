import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export type InputChangeProps<T> = {
  onChange: (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onChangeByNameValue: (name: keyof T, value: any) => void;
  state: T;
  setState: Dispatch<SetStateAction<T>>;
};
export default function useInputChange<T>(val: T): InputChangeProps<T> {
  const [state, setState] = useState<T>(val);

  const onChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    // @ts-ignore
    const value = e.target.checked || e.target.value;

    setState((curr) => ({
      ...curr,
      [e.target.name]: value,
    }));
  };

  const onChangeByNameValue = (name: keyof T, value: any) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return { state, onChange, onChangeByNameValue, setState };
}
