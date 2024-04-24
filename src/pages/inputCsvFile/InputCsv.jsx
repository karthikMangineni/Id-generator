import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./inputCsv.css"
import { useNavigate } from 'react-router-dom';
function InputCsv() {


  const location = useLocation();
  const navigate = useNavigate();
  
  const {color} = location.state
  const [isFileSelected, setFileSelected] = useState(false);
  const [file, setFile] = useState(null);
  const [theme, setTheme] = useState(color);


  const handleBack = () => {
    navigate(-1);
  }
  const [csvData, setCsvData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvString = event.target.result;
      const parsedData = parseCsv(csvString); // Implement this function to parse CSV string into array
      setCsvData(parsedData);
      console.log("hello ",parsedData)
      setFileSelected(true);
    };
    reader.readAsText(file);
  };

  const parseCsv = (csvString) => {
    // Implement parsing logic to convert CSV string into an array of data
    console.log("This is csv string", csvString)
    return csvString.split('\n').map((row) => row.split(','));
  };



 //hndleContinue
  const handleContinue = () => {
    navigate("/ImageDirectory",{
      state: {
      color: theme,
      csvData: csvData
    }})
  }


 return (
    <div className='inputCsv-body'>
     <div className='step-number-in-input'>
      <div className='back' onClick={handleBack}>back</div>
      2/3</div>
      <div>
        <div className='upload-label-text' style={{color: color}}>Upload Your CSV File Here</div>
        <input type='file'  className='csv-input' onChange={handleFileChange}></input>
        {
           isFileSelected &&(<div className='continue-btn' onClick={()=>{handleContinue()}}>
            continue
           </div>)
        }
      </div>

    </div>
  )
}

export default InputCsv