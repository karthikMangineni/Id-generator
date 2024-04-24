import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import "../../pages/IdCard/idCard.css";
import logo from "../../images/logo1.png"
function PreviewPage() {
    const location = useLocation();
    const { color, csvData, idPhoto } = location.state;
    const [combinedData, setCombinedData] = useState([]);

    function matchImage(imgUrl){
        for(let i = 0; i < idPhoto.length; i++) {
            const imgPath = idPhoto[i].name;
            if (idPhoto[i].name === imgUrl) {
                return idPhoto[i];
            }
        }
    }

    const handleCombineData = () => {
        const csvLength = csvData.length;
        const idLength = idPhoto.length;
        const len = Math.min(csvLength, idLength);
        const newData = [];

        for (let i = 0; i < len; i++) {
            const [name, jobTitle, csvPhotoUrl] = csvData[i];
            const photoData = matchImage(csvPhotoUrl);
            const photoUrl = URL.createObjectURL(photoData);
            newData.push({ name, jobTitle, photoUrl });
        }
        setCombinedData(newData);
    };

    useEffect(() => {
        handleCombineData();
    }, [csvData, idPhoto]); 

    useEffect(() => {
        console.log("This is combined data ", combinedData);
    }, [combinedData]); 

    const downloadPDF = () => {
        const opt = {
            margin: 0.5,
            filename: 'id_cards.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
    
        const containerStyle = {
            display: 'block',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        };
    
        const container = document.createElement("div");
        container.style.cssText = Object.entries(containerStyle).map(([key, value]) => `${key}: ${value}`).join(';');
    
        combinedData.forEach((data, index) => {
            const cardContainer = document.createElement("div");
            cardContainer.className = "card-container";
    
            const card = document.createElement("div");
            card.className = "card";
            card.style.width = "3.375in"; // Standard ID card width
            card.style.height = "1.82in"; // Standard ID card height
            card.style.backgroundColor = "white";
            card.innerHTML = `
                <div class='id-content'>
                    <div>
                        <div class='company-name'>${data.name}</div>
                        <div class='title'>${data.jobTitle}</div>
                        <div class='company-logo'>
                            <img src=${logo} alt="Company Logo" />
                        </div>
                    </div>
                    <div>
                        <img src=${data.photoUrl} alt="ID" />
                        <div class='role'>software developer</div>
                    </div>
                </div>
                <div class='border-bottom' style="height: 45px; width: 100%; background: ${color}"></div>
            `;
            cardContainer.appendChild(card);
    
            container.appendChild(cardContainer);
    
            // Add page break after each card except the last one
            if (index !== combinedData.length - 1) {
                const pageBreak = document.createElement("div");
                pageBreak.style.pageBreakAfter = "always";
                container.appendChild(pageBreak);
            }
        });
    
        html2pdf().from(container).set(opt).save();
    };
    
    
    
    
    
    return (
        <div>
            <div className='grid-container'>
                {combinedData.map((data, index) => (
                    <div key={index}>
                        <div className='card' style={{ backgroundColor: 'white' }}>
                            <div className='id-content'>
                                <div>
                                    <div className='company-name'>{data.name}</div>
                                    <div className='title'>{data.jobTitle}</div>
                                    <div className='company-logo'>
                                        <img src='https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Saint_Louis_Billikens_logo.svg/800px-Saint_Louis_Billikens_logo.svg.png' alt="Company Logo" />
                                    </div>
                                </div>
                                <div>
                                    <img src={data.photoUrl} alt="ID" />
                                    <div className='role'>software developer</div>
                                </div>
                            </div>
                            <div className='border-bottom' style={{ height: "45px", width: "100%", background: color }}></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='download-btn' style={{ position: 'sticky', bottom: '20px', left: '20px' }} onClick={downloadPDF}>Download PDF</div>
        </div>
    );
}

export default PreviewPage;