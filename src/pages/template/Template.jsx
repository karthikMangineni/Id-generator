import React from 'react'
import "./template.css"
import { templateTheme } from "../../template"
import "../IdCard/idCard.css";
import { useNavigate } from 'react-router-dom';

function Template() {

  const navigation = useNavigate();

  const handleClick = (theme) => {
    // Navigate to the desired page
    navigation('/inputPage', {
      state: {
        color: theme
      }
    });
  };


  function IDCard({ name, title, location, photo, theme }) {
    return (
      <div onClick={() => handleClick(theme)}>
        <div className='card' style={{ backgroundColor: 'white' }}>
          <div>
            <div className='id-content'>
              <div>
                <div className='company-name' style={{ color: theme }}>{name}</div>
                <div style={{ color: theme }}>{title}</div>
                <div className='company-logo'>
                  <img src='https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Saint_Louis_Billikens_logo.svg/800px-Saint_Louis_Billikens_logo.svg.png'></img>
                </div>
              </div>
              <div>
                <img src='https://as2.ftcdn.net/v2/jpg/02/67/99/59/1000_F_267995900_qg8jfTCHvCijDkXC5HOlPBK0pZ0i0dlh.jpg' alt="ID" />
                <div className='role' style={{ color: theme }}>software developer</div>
              </div>

            </div>

          </div>
          <div className='border-bottom' style={{ backgroundColor: theme, height: "45px", width: "100%" }}>

          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='template-body'>

      <div>
          <center><h1 className='label' >Choose a Template</h1></center>
      </div>
      <br />
      <div className='step-number-in-input'>1/3</div>
      <div className='grid-container'>
        {templateTheme.map((theme, index) => (
          <IDCard name={"saint Louis"} title={"john"} theme={theme.primaryColor} />
        ))}

      </div>
    </div>
  )
}

export default Template