import React, { useState } from 'react'
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




  // const arr = emailsList.users.data.map((obj:any)=> {return obj.id})

 console.log('dssssssss', emails)





 const validateEmail = () => {
  if (emails.includes(email)) {
    console.log('email is already registeredalllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll')}
  else {console.log('success');
  }
 }

  const contentStyle = { background: '#000' };
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
  const arrowStyle = { color: '#000' }

  const onSubmit = (e:any) => {
    e.preventDefault();
    validateEmail();
    console.log(email)
  }

  return <div>

    Fourth Component
    <Popup trigger={<button> Trigger</button>} position="right center"
    {...{   contentStyle, overlayStyle, arrowStyle }}
    modal>
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
    </Popup>
  </div>


}

export default FirstPurchase
