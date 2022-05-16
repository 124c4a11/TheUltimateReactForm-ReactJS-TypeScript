import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Confetti from 'react-confetti';

import { InsertDriveFile } from '@mui/icons-material';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

import { useData } from '../../context/data.context';
import { PrimaryButton } from '../../components';


export function Result(): JSX.Element {
  const { data } = useData();
  const { files } = data;
  const [success, setSuccess] = useState<boolean>(false);


  const entries = Object.entries(data).filter((entry) => entry[0] !== 'files');

  function onSubmit() {
    const formData = new FormData();

    if (data.files) {
      data.files.forEach((file) => {
        formData.append('files', file, file.name);
      });
    }

    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    Swal.fire("Great job!", "You've passed the challenge!", "success");

    setSuccess(true);
  }

  if (success) return <Confetti />;

  return (
    <>
      <Typography
        component="h2"
        variant="h5"
        align="center"
        sx={{ mb: 2 }}
      >📋 Form Values</Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry[0]}>
                <TableCell component="th" scope="row">
                  {entry[0]}
                </TableCell>
                <TableCell align="right">{entry[1].toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {
        files &&
        <>
          <Typography
            component="h2"
            variant="h5"
            align="center"
          >📦 Files</Typography>
          <List>
            {files.map((f, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary={f.name} secondary={f.size} />
              </ListItem>
            ))}
          </List>
        </>
      }

      <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
      <Box textAlign="center" marginTop={2}>
        <Link to="/">Start over</Link>
      </Box>
    </>
  );
}
