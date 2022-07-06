import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './styles.css'
 import FIND_EMAIL from '../graphql/getEmails.graphql'
 import UPDATE_EMAILS from '../graphql/updateEmails.graphql'
 import { useLazyQuery, useMutation} from 'react-apollo'



const FirstPurchase = () => {

  const [email, setEmail] = useState("")

  const [createDocument] = useMutation(UPDATE_EMAILS)

  const updateEmails = () => {
    createDocument ({
      variables: {
        document: 
          {
            fields: [{
              key: "email",
              value: email
            }]
          } 
      }
    })
  }

  const [displaymessage, setDisplayMessage] = useState("")

    const[filterQuery]= useLazyQuery(FIND_EMAIL, {
      onCompleted:( data) => {
       if (data.documents.length >0){ 
        setDisplayMessage('This email has been registered already');
      }
      else {
        updateEmails()
      }
    }
}
    )
   

  // closing button

  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {

    setTimeout(()=> {setOpenModal(true)}, 2000);
    
  }, [])


 







const checkQuery = (emailValue: string) => {
  filterQuery({
    variables: {
      email:`email=${emailValue.toLowerCase()}`
      
    }
  })
}

  const contentStyle = { background: 'rgba(255,255,255,0.5)' };
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
  const arrowStyle = { color: '#000' }

  const onSubmit = (e:any) => {
    e.preventDefault();
    checkQuery(email)
  }

  return <div>
    <Popup open = {openModal} position="right center"
    {...{   contentStyle, overlayStyle, arrowStyle }}
    modal>
    <div
      style={{
        height: "200px",
        width: "300px",
        borderRadius: "10px"
      }}>

     <button onClick={()=>{ setOpenModal(false) }}
     style= {{

     }}>
      X
      </button>
    <form onSubmit={
      onSubmit
    }

      style={{
       border: "1px solid black"
      }}>

<div>
      <input onChange={(e) => {setEmail(e.target.value)}}
        type="email"
        name="email"
        placeholder="Email"
        pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
        title="No se permiten caracteres especiales"
        required
      />
    </div>
    <div>
      <button >Submit Contact</button>
    </div>
</form>
<p>{displaymessage}</p>
    </div>
    </Popup>
  </div>


}

export default FirstPurchase
