import { AnyObject, ObjectSchema } from "yup";

const validationHandler = async <T extends AnyObject>(
  data: T,
  formSchema: any
): Promise<{ errors: T; isValid: boolean }> => {
  const isValid = await formSchema.isValid(data, { abortEarly: false });
  const errors = await formSchema
    .validate(data, { abortEarly: false })
    .catch((err:any) => {
      const errors = err.inner.reduce(
        (acc: any, error: any) => ({ ...acc, [error.path]: error.message }),
        {}
      );

      return errors;
    });
  return { errors, isValid };
};

export default validationHandler;