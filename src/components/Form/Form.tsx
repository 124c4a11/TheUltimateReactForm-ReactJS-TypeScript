import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react';


interface FormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  children: ReactNode
}


export function Form({
  children,
  ...props
}: FormProps): JSX.Element {
  return (
    <form
      noValidate
      {...props}
    >{children}</form>
  );
}
