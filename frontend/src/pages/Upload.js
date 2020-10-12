import React from 'react';
import axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone';
import { Box, Button, Container, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  dropzone: {
    margin: '25px 0px'
  }
}));

export default function Upload() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    files: []
  });

  const handleDropzoneChange = (inFiles) => {
    setState((prevState) => ({
      ...prevState,
      files: inFiles,
    }));
  };

  const submitFiles = () => {
    var formData = new FormData();
    state.files.forEach(file => {
      formData.append('file', new File([file], file.name, { type: 'text/csv' }));
    });
    axios.post('http://localhost:2021/users/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error(error);
      });
  }


  return (
    <Container maxWidth="md" >
      <DropzoneArea
        showFileNamesInPreview={true}
        showPreviews={true}
        previewText={"Files added:"}
        showPreviewsInDropzone={false}
        onChange={handleDropzoneChange}
        acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
        filesLimit={1}
        dropzoneText={"Drag and drop or click to upload a csv file"}
        dropzoneClass={classes.dropzone}
      />
      <Button variant="contained" color="primary" onClick={submitFiles}>Submit</Button>
    </Container>
  )
}