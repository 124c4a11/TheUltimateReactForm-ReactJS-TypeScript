import { Container, Typography } from '@mui/material';

import { AppRouter } from '../../router/AppRouter';


export function App() {
  return (
    <Container component="main" maxWidth="xs" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ mb: 4 }}
      >The Ultimate React Form</Typography>
      <AppRouter />
    </Container>
  );
}
