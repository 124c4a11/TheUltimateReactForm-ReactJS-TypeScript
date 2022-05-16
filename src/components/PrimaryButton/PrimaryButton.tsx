import { Button, ButtonProps } from '@mui/material';


export function PrimaryButton({
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      type="submit"
      sx={{ mt: 2 }}
      {...props}
    >{children}</Button>
  );
}
