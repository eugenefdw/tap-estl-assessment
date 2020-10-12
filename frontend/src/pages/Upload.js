import React from 'react';
import axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from '@material-ui/core';

export default function Upload() {
  const [state, setState] = React.useState({
    files: []
  });

  const handleDropzoneChange = (inFiles) => {
    console.log(inFiles);
    setState((prevState) => ({
      ...prevState,
      files: inFiles,
    }));
  };

  const submitFiles = () => {
    var formData = new FormData();
    state.files.forEach(file => {
      formData.append('file', file);
    });
    console.log('posted');
    axios.post('http://localhost:2021/users/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then((response) => {
      console.log(response)
    }).catch((error) => {
      console.error(error);
    });
  }


  return (
    <div>
      <DropzoneArea 
      showFileNamesInPreview={true}
      showPreviews={true}
      previewText={"Files added:"}
      showPreviewsInDropzone={false}
      onChange={handleDropzoneChange}
      acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
      filesLimit={1}
      dropzoneText={"Drag and drop or click to upload a csv file"}
      />
      <Button variant="contained" color="primary" onClick={submitFiles}>Submit</Button>
    </div>
  )
}