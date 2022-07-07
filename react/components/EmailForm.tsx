import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import FIND_EMAIL from '../graphql/getEmails.graphql'
import UPDATE_EMAILS from '../graphql/updateEmails.graphql'
import { useLazyQuery, useMutation } from 'react-apollo'

type Props = {
  setOpenPopUp: any
}

const EmailForm = ({ setOpenPopUp }: Props) => {

  const CSS_HANDLES = [
    'submit__button',
    'message'
  ]

  const handles = useCssHandles(CSS_HANDLES)

  const [email, setEmail] = useState('')

  const [submitMessage, setSubmitMessage] = useState('')

  const [createDocument] = useMutation(UPDATE_EMAILS, {
    onCompleted: () =>
      setSubmitMessage('Email successfully registered'),
    onError: () =>
      console.log('Try again later')
  })

  const updateEmails = () => {
    createDocument({
      variables: {
        document:
        {
          fields: [{ key: 'email', value: email }]
        }
      }
    });

    setTimeout(() => { setOpenPopUp(false) }, 1000);

    localStorage.setItem('neverShowAgain', 'true')
  }

  const [filterQuery] = useLazyQuery(FIND_EMAIL, {
    onCompleted: (data) => {
      if (data?.documents.length > 0) {
        setSubmitMessage('This email has been registered already');
      }
      else {
        updateEmails();
      }
    }
  }
  )

  const checkQuery = (emailValue: string) => {
    filterQuery({
      variables: {
        email: `email=${emailValue}`
      }
    })

  }

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    checkQuery(email)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <form onSubmit={onSubmit}
        style={{
          display: 'flex'
        }}>
        <div>
          <input onChange={(e) => { setEmail(e.target.value) }}
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
        {submitMessage}
      </p>
    </div>
  )
}

export default EmailForm
