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

const FirstPurchase = ({
  backgroundImage,
  popupText
}: Props) => {

  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setTimeout(()=> {setOpenModal(true)}, 2000);
  }, [])

  const CSS_HANDLES = [
   'close__button',
   'main__container',
   'text',
   'form__container'
  ]

  const handles = useCssHandles(CSS_HANDLES)

  const contentStyle = { background: 'rgba(255,255,255,0.5)' };
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
  const arrowStyle = { color: '#000' }

  
  return <div>
    <Popup open = {openModal} position="right center"
    {...{   contentStyle, overlayStyle, arrowStyle }} modal>

    <div
      className={handles.main__container}
      style={{
        height: "350px",
        width: "350px",
        borderRadius: "10px",
        backgroundImage: `url(${backgroundImage})`
      }}>

     <button onClick={()=>{ setOpenModal(false) }}
     className={handles.close__button}
     style= {{
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
        <h3 className={handles.text}>{popupText}</h3>
      <EmailForm  setOpenModal= {setOpenModal} />
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
      widget : {
        "ui:widget": "image-uploader"
      }
    },

    popupText: {
      title: "popup text",
      type: 'string',
      widget : {
        "ui:widget": "textarea"
      }
    }
}

}

export default FirstPurchase
