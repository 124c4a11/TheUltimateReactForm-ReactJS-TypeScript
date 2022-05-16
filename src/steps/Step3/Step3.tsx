import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Typography } from '@mui/material';

import { IData } from '../../interfaces/IData';
import { useData } from '../../context/data.context';

import { FileInput, Form, PrimaryButton } from '../../components';


interface FormData extends Pick<IData, 'files'> { };


export function Step3(): JSX.Element {
  const navigate = useNavigate()
  const { data, setValues } = useData();

  const {
    control,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: { files: data.files }
  });


  function onSubmit(data: FormData) {
    setValues(data);
    navigate('/result');
  }

  return (
    <>
      <Typography
        component="h2"
        variant="h5"
        align="center"
        sx={{ mb: 2 }}
      >Step 3</Typography>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput name="files" control={control} />

        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </>
  );
}
