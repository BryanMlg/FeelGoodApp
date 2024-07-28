import { useEffect } from 'react';
import { useFormikContext } from 'formik';

const useWatchField = <T,>(fieldName: string, callback: (value: T) => void) => {
  const { values } = useFormikContext<{ [key: string]: any }>();

  useEffect(() => {
    const value = values[fieldName] as T;
    callback(value);
  }, [values, fieldName, callback]);
};

export default useWatchField;
