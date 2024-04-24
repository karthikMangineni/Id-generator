import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import "./idCard.css"
import papa from "papaparse"
import { useLocation } from 'react-router-dom';


const IdCard = () => {

  const location = useLocation();
  const {color} = location.state;
  const [csvData, setCsvData] = useState([]);
  function IDCard({ name, title, location, photo }) {
    return (
      <div>
        <div className='card'>
          <div>
            <div className='id-content'>
              <div>
                <div className='company-name'>{name}</div>
                <div>{title}</div>
                <div className='company-logo'>
                  <img src='https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Saint_Louis_Billikens_logo.svg/800px-Saint_Louis_Billikens_logo.svg.png'></img>
                </div>
              </div>
              <div>
              <img src={photo} alt="ID" />
              <div className='role'>software developer</div>
            </div>
           
            </div>
            
          </div>
          <div className='border-bottom'> 

</div>
        </div>
        <button onClick={generatePDF}>Download PDF</button>
      </div>
    );
  }

  const generateSampleData = (numCards) => {
    const newData = [];
    for (let i = 0; i < numCards; i++) {
      const name = `Saint Louis`;
      const title = `john`;
      const location = `Location ${i + 1}`;
      const photo = `https://via.placeholder.com/150?text=Photo${i + 1}`; // Placeholder URL for photo
      newData.push({ name, title, location, photo });
    }
    return newData;
  };

  useEffect(() => {
    
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  const fetchCSVData = async () => {
    // Placeholder for fetching data from CSV file
    // Process CSV data and set it to the state (data)
  };

  const fetchIDPhotos = async () => {
    // Placeholder for reading the directory of ID photos
    // Process ID photos and set them to the state
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const pages = pdfDoc.getPages();

    // Placeholder for generating PDF pages based on the data and ID photos

    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), 'id_cards.pdf');
  };

  return (
    <div className="grid-container">
      {/* Render ID cards */}
      {csvData.map((item, index) => (
        <IDCard key={index} {...item} />
      ))}
        <h2 style={{color: color}}>Hello there</h2>
    </div>
  );
}

export default IdCard
