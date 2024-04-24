import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../inputCsvFile/inputCsv.css"

function ImageDirectoryInput() {
     
    const location = useLocation();
    const navigate = useNavigate();
    const { color, csvData } = location.state;
    const [isFileSelected, setFileSelected] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState([]);

    const handleFolderChange = (e) => {
        const files = e.target.files;
        console.log(files)
        if (files.length > 0) {
            console.log("Inside if ");
            // Store all the selected files in the photos state array
            setSelectedFolder(Array.from(files));
            setFileSelected(true);
            return; // Exit the function early after setting the selected folder
        }
        console.log("Outside if")
        // If no files are selected, show the alert message
        alert('Please select some files');
    };
      
     
      

    const handleContinue = () => {
        
            navigate("/previewPage",{state:{
                color: color,
                csvData: csvData,
                idPhoto: selectedFolder,
            }})
    }
    const handleBack = () => {
        navigate(-1);
      }
    return (
        <div className='inputCsv-body'>
            <div className='step-number-in-input'>
                <div className='back' onClick={handleBack}>back</div>
                3/3</div>     <div>
                <div className='upload-label-text' style={{ color: color }}>Upload ID photo Directory</div>
                <input type='file' directory='' webkitdirectory='' className='csv-input' onChange={handleFolderChange}></input>
                {
                    isFileSelected && (<div className='continue-btn' onClick={() => { handleContinue() }}>
                        continue
                    </div>)
                }
            </div>
            
        </div>
    )
}

export default ImageDirectoryInput