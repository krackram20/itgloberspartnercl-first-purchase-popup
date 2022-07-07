import React, {  useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import FIND_EMAIL from '../graphql/getEmails.graphql'
import UPDATE_EMAILS from '../graphql/updateEmails.graphql'
import { useLazyQuery, useMutation } from 'react-apollo'

type Props = {
  setOpenModal: any
}

const EmailForm = ({setOpenModal}: Props) => {
    
    const [email, setEmail] = useState("")

    const [emailMessage, setEmailMessage] = useState("")

    const [createDocument] = useMutation(UPDATE_EMAILS, {
      
      onCompleted:()=>setEmailMessage('Email successfully registered'),
      onError: (error) =>
      console.log(error)})

    

    const updateEmails = () => { 
        createDocument ({
          variables: {
              document: 
              {
              fields: [{key: "email",value: email}]
              } 
            }
          })
      }
     
    const [ filterQuery ] = useLazyQuery(FIND_EMAIL, {
        onCompleted:(data) => {
            if (data?.documents.length > 0){ 
                setEmailMessage('This email has been registered already');  
                console.log(data?.documents.length);   
            }
            else {
                updateEmails();   
                setTimeout(
                 ()=> {setOpenModal(false)}, 1000
                )  
            }
        }
    }
        )

    const checkQuery = (emailValue: string) => {
        filterQuery({
          variables: {
            email:`email=${emailValue}` 
          }
        });
        console.log(emailValue);
        
      }

    const onSubmit = (evt:any) => {
        evt.preventDefault();
        checkQuery(email)
        console.log('holi');
    }

      const CSS_HANDLES = [
        'submit__button',
        'message'
       ]
     
       const handles = useCssHandles(CSS_HANDLES)

 return   (
    <div  
    style={{
        display: "flex",
        flexDirection: "column"
        
    }}
    >
   <form onSubmit={onSubmit}
        style={{
             display: "flex"
             
        }}>
            <div>
                <input onChange={(e) => {setEmail(e.target.value)}}
                    type="email"
                    name="email"
                    placeholder="Email"
                    pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                    required />
            </div>
       <div>
           <button className={handles.submit__button} >
                Submit
            </button>
        </div>
      </form>
      <p
      style={{
        color: 'red',
        fontWeight: "bold"
      }}
      className={handles.message}>
        {emailMessage}
      </p>
    </div>
    
 )
}

export default  EmailForm