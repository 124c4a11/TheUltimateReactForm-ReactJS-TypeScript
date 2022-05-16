import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import parsePhoneNumberFromString from 'libphonenumber-js';

import { Checkbox, FormControlLabel, Typography } from '@mui/material';

import { IData } from '../../interfaces/IData';
import { useData } from '../../context/data.context';

import { Form, Input, PrimaryButton } from '../../components';


interface FormData extends Pick<IData, 'email' | 'hasPhone' | 'phoneNumber'> { };


const schema = yup.object({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is a required field"),
});


function normalizePhoneNumber(value: string) {
  const phoneNumber = parsePhoneNumberFromString(value);

  if (!phoneNumber) return value;

  return phoneNumber.formatInternational();
}


export function Step2(): JSX.Element {
  const navigate = useNavigate();
  const { data, setValues } = useData();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone || false,
      phoneNumber: data.phoneNumber,
    }
  });

  const hasPhone = watch('hasPhone');

  function normalizePhone(e: ChangeEvent<HTMLInputElement>) {
    return e.target.value = normalizePhoneNumber(e.target.value);
  }

  function onSubmit(data: FormData) {
    setValues(data);
    navigate('/step-3');
  }

  return (
    <>
      <Typography
        component="h2"
        variant="h5"
        align="center"
        sx={{ mb: 2 }}
      >Step 2</Typography>

      <Form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="email"
          label="Email"
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors?.email?.message}
          required
        />

        <FormControlLabel
          label="Do you have a phone"
          control={
            <Checkbox
              defaultValue={`${data.hasPhone}`}
              defaultChecked={data.hasPhone}
              color="primary"
              {...register('hasPhone')}
            />
          }
        />

        {
          hasPhone
          &&
          <Input
            id="phoneNumber"
            type="tel"
            label="Phone Number"
            {...register('phoneNumber')}
            onChange={normalizePhone}
          />
        }

        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </>
  );
}
