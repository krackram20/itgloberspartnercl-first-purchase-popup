import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './styles.css'
 import QUERY_VALUE from '../graphql/getEmails.graphql'
 import { useQuery} from 'react-apollo'



const FirstPurchase = () => {



  const [email, setEmail] = useState("")

   const {data, error} = useQuery(QUERY_VALUE)

   let emails: any[] = []

   if(data) {


  console.log(data.users)

   emails  = data.users.data.map((obj:any)=> {return obj.email})
  }
  if(error) {
    console.log(error);
    return "error";
  }


  // closing button

  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {

    setTimeout(()=> {setOpenModal(true)}, 5000)
  }, [])

  // const arr = emailsList.users.data.map((obj:any)=> {return obj.id})

 console.log('dssssssss', emails)



 const [displaymessage, setDisplayMessage] = useState("")

 const validateEmail = () => {
  if (emails.includes(email)) {

    setDisplayMessage('use another one')}
  else {
     setDisplayMessage('Success')
  }
 }

  const contentStyle = { background: 'rgba(255,255,255,0.5)' };
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
  const arrowStyle = { color: '#000' }

  const onSubmit = (e:any) => {
    e.preventDefault();
    validateEmail();
    console.log(email)
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
    <form onSubmit={onSubmit}

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
