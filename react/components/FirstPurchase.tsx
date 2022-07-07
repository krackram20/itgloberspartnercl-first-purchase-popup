import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './styles.css'
import { useCssHandles } from 'vtex.css-handles'
import EmailForm from './EmailForm';


type Props = {
  backgroundImage: string
  popupText: string
}

const FirstPurchase = ({ backgroundImage, popupText }: Props) => {

  const CSS_HANDLES = [
    'close__button',
    'main__container',
    'text',
    'form__container'
  ]
  const handles = useCssHandles(CSS_HANDLES)

  //popup styles
  const contentStyle = { background: 'rgba(255,255,255,0.5)' };
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
  const arrowStyle = { color: '#000' }

  const [openPopUp, setOpenPopUp] = useState(false)

  //Using local storage to avoid render in case the close button is clicked
  const closedWindow = localStorage.getItem('neverShowAgain')

  useEffect(() => {
    if (closedWindow === 'true') {
      setOpenPopUp(false)
    } else {
      setTimeout(() => { setOpenPopUp(true) }, 2000);
    }
  }, [])

  const handleClose = () => {
    setOpenPopUp(false)
    localStorage.setItem('neverShowAgain', 'true')
  }

  return <div>
    <Popup open={openPopUp} position="right center"
      {...{ contentStyle, overlayStyle, arrowStyle }} >

      <div
        className={handles.main__container}
        style={{
          height: "350px",
          width: "350px",
          borderRadius: "10px",
          backgroundImage: `url(${backgroundImage})`
        }}>
        <button onClick={handleClose}
          className={handles.close__button}
          style={{
            position: "absolute",
            right: "1px",
            top: "1px",
          }}>
          X
        </button>
        <div className={handles.form__container}
          style={{
            position: "absolute",
            bottom: "20px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            left: "20px"
          }}
        >
          <h3 className={handles.text}>
            {popupText}
          </h3>
          <EmailForm setOpenPopUp={setOpenPopUp} />
        </div>
      </div>
    </Popup>
  </div>


}

FirstPurchase.schema = {
  title: "Popup",
  type: "object",
  properties: {
    backgroundImage: {
      title: "Upload image",
      type: 'string',
      widget: {
        "ui:widget": "image-uploader"
      }
    },

    popupText: {
      title: "popup text",
      type: 'string',
      widget: {
        "ui:widget": "textarea"
      }
    }
  }

}

export default FirstPurchase
