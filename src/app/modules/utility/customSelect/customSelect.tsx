import React from 'react'
import {Form} from 'react-bootstrap-v5'
import {Field} from 'formik'
import useWatchField from '../hooks/useWatchField'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  fieldName: string
  label: string
  options: Option[]
  onChange?: (value: string) => void
  required?: boolean
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  fieldName,
  label,
  options,
  onChange,
  required = false,
}) => {
  useWatchField<string>(fieldName, (value) => {
    console.log(`${label} seleccionada:`, value)
    if (onChange) {
      onChange(value)
    }
  })

  return (
    <Form.Group controlId={`form${fieldName}`}>
      <Form.Label>
        {label} {required && <span className='text-danger'>*</span>}
      </Form.Label>
      <Field as='select' name={fieldName} className='form-control'>
        <option value=''>Seleccione una Opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    </Form.Group>
  )
}

export default CustomSelect
