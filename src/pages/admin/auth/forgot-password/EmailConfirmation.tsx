import React from 'react'
import { Link } from 'react-router'

const EmailConfirmation: React.FC = () => {
  return (
    <div className="flex flex-col items-start gap-6">
      <div className='space-y-4'>
        <h2 className="font-bold text-3xl md:text-4xl">Password Reset </h2>
        <p className="text-sm md:text-base font-light text-black/70">
          Please check your email for a link to reset your password.
        </p>
      </div>
     
      <div className="ml-auto">
        <p>
          Back to {" "}
          <span className="text-sky-400 underline">
            <Link to={"../"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default EmailConfirmation