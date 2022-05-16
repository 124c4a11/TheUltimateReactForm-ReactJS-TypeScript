import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { IData } from '../../interfaces/IData';

import { Form, Input, PrimaryButton } from '../../components';
import { useData } from '../../context/data.context';


interface FormData extends Pick<IData, 'firstName' | 'lastName'> { };


const schema = yup.object({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name should not contain numbers"),

  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
});


export function Step1(): JSX.Element {
  const navigate = useNavigate();
  const { data, setValues } = useData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
    }
  });


  function onSubmit(data: FormData) {
    setValues(data);
    navigate('/step-2');
  }

  return (
    <>
      <Typography
        component="h2"
        variant="h5"
        align="center"
        sx={{ mb: 2 }}
      >Step 1</Typography>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="firsName"
          label="Firs Name"
          type="text"
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          id="lastName"
          label="Last Name"
          type="text"
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </>
  );
}
