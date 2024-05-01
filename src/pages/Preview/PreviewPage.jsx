import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import "../../pages/IdCard/idCard.css";
import companyLogo from "../../companyLogo.jpeg"


function PreviewPage() {
    const location = useLocation();
    const { color, csvData, idPhoto } = location.state;
    const [combinedData, setCombinedData] = useState([]);

    function matchImage(imgUrl){
        for(let i = 0; i < idPhoto.length; i++) {
            const imgPath = idPhoto[i].name;
            if (idPhoto[i].name === imgUrl) {
                console.log("matched ")
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
            const [companyName, domain,employeeName, role, csvPhotoUrl] = csvData[i];
            console.log("Hello ",companyName, domain, role, csvPhotoUrl)
            const photoData = matchImage(csvPhotoUrl);
           const photoUrl = URL.createObjectURL(photoData);
            newData.push({ companyName, domain, employeeName, role, photoUrl });
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
                        <div class='company-name'>${data.companyName}</div>
                        <div class='title'>${data.domain}</div>
                        <div class='company-logo'>
                            <img src=${companyLogo} alt="Company Logo" />
                        </div>
                    </div>
                    <div>
                        <img src=${data.photoUrl} alt="ID" />
                        <div class='role'>${data.role}</div>
                    </div>
                </div>
                <div class='border-bottom' style="height: 45px; width: 100%; background: ${color}">
                <div className='employeeName' style="color: white; font-size: larger; font-weight: 600; letter-spacing: 0.3rem;">${data.employeeName}</div>
                </div>
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
                                    <div className='company-name'>{data.companyName}</div>
                                    <div className='title'>{data.domain}</div>
                                    <div className='company-logo'>
                                        <img src={companyLogo} alt="Company Logo" />
                                    </div>
                                </div>
                                <div>
                                    <img src={data.photoUrl} alt="ID" />
                                    <div className='role'>{data.role}</div>
                                </div>
                            </div>
                            <div className='border-bottom' style={{ height: "45px", width: "100%", background: color }}>
                                <div className='employeeName'>{data.employeeName}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='download-btn' style={{ position: 'sticky', bottom: '20px', left: '20px' }} onClick={downloadPDF}>Download PDF</div>
        </div>
    );
}

export default PreviewPage;
