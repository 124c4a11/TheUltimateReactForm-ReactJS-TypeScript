import { Control, Controller } from 'react-hook-form';
import Dropzone from 'react-dropzone';

import { List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { CloudUpload, InsertDriveFile } from '@mui/icons-material';

import styles from './FileInput.module.scss';


interface FileInputProps {
  control: Control<any, any>;
  name: string;
}


export function FileInput({
  control,
  name,
}: FileInputProps): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <Dropzone onDrop={onChange}>
            {
              ({ getRootProps, getInputProps }) => (
                <Paper
                  className={styles['card']}
                  variant="outlined"
                  sx={{ backgroundColor: '#eee' }}
                  {...getRootProps()}
                >
                  <CloudUpload className={styles['icon']} />
                  <input
                    onBlur={onBlur}
                    {...getInputProps()}
                  />
                  <p>Drag 'n' drop files here, or click to select files</p>
                </Paper>
              )
            }
          </Dropzone>

          <List>
            {(value as File[]).map((file, ndx) => (
              <ListItem key={ndx}>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary={file.name} secondary={file.size} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    />
  );
}
