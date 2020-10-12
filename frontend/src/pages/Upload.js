import React from 'react';
import axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone';
import { Button, Container, makeStyles, Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  dropzone: {
    margin: '25px 0px'
  },
  fileInfo: {
    marginBottom: '25px',
  },
}));

export default function Upload() {
  const classes = useStyles();
  const [files, setFiles] = React.useState([]);

  const handleDropzoneChange = (inFiles) => {
    setFiles(inFiles);
  };

  const submitFiles = () => {
    if(files.length === 0) {
      return;
    }
    var formData = new FormData();
    files.forEach(file => {
      formData.append('file', new File([file], file.name, { type: 'text/csv' }));
    });
    axios.post('http://localhost:2021/users/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        console.log(res);
        setFiles([]);
      }).catch((err) => {
        console.error(err);
      });
  }


  return (
    <Container maxWidth="md" >
      <DropzoneArea
        showPreviews={false}
        showPreviewsInDropzone={false}
        onChange={handleDropzoneChange}
        acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
        filesLimit={1}
        dropzoneText={"Drag and drop or click to upload a csv file"}
        dropzoneClass={classes.dropzone}
      />
      {files.map((file, index) => {
        return (
          <Paper key={index} className={classes.fileInfo}>
            {file.name}
          </Paper>
        )
      })}
      <Button variant="contained" color="primary" onClick={submitFiles}>Submit</Button>
    </Container>
  )
}