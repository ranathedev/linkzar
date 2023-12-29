import React, { useEffect } from 'react'
import clsx from 'clsx'
import { Field, ErrorMessage } from 'formik'

import stl from './InputContainer.module.scss'

interface Props {
  label: string
  id: string
  placeholder: string
  type: string
  theme: string
}

const InputContainer = ({ label, id, placeholder, type, theme }: Props) => {
  const [className, setClassName] = React.useState('')

  useEffect(() => {
    if (theme === 'dark') setClassName(stl.darkInputContainer)
    else setClassName('')
  }, [theme])

  return (
    <div className={clsx(stl.inputContainer, className)}>
      <label htmlFor={id}>{label}</label>
      <Field
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        spellCheck={false}
      />
      <ErrorMessage name={id} component="div" className={stl.error} />
    </div>
  )
}

InputContainer.defaultProps = {
  label: 'First name',
  id: 'fname',
  placeholder: '',
  type: 'text',
}

export default InputContainer
