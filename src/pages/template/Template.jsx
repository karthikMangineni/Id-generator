import React from 'react'
import "./template.css"
import { templateTheme } from "../../template"
import "../IdCard/idCard.css";
import { useNavigate } from 'react-router-dom';
import companyLogo from "../../companyLogo.jpeg"
function Template() {

  const navigation = useNavigate();

  const handleClick = () => {
    // Navigate to the desired page
    navigation('/inputPage', {
      state: {
        color: 'rgb(256,92,4)',
      }
    });
  };


  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100vh', width: 'auto'}}>
     
      <div className='template-body'>
      <h1>This is your pre-defined id template</h1>
      <div style={{marginLeft: '80px'}}>click on the below template to continue</div>
<div onClick={() => handleClick()}>
        <div className='template-card' style={{ backgroundColor: 'white' }}>
          <div>
            <div className='template-id-content'>
              <div>
                <div className='template-company-name'>Unsolvability</div>
                <div className='template-title'>Tie Enterprises</div>
                <div className='template-company-logo'>
                  <img src={companyLogo}></img>
                </div>
              </div>
              <div>
                <img src='https://as2.ftcdn.net/v2/jpg/02/67/99/59/1000_F_267995900_qg8jfTCHvCijDkXC5HOlPBK0pZ0i0dlh.jpg' alt="ID" />
                <div className='template-role'>software developer</div>
              </div>

            </div>

          </div>
          <div className='template-border-bottom' >

          </div>
        </div>
      </div>
    
    </div>
    </div>
  )
}

export default Template