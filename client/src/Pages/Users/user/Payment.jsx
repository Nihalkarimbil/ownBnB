import React from 'react'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'
import { useLocation } from 'react-router-dom'



const stripe = loadStripe("pk_test_51Q7YVcRxy6hGX3ZUkqhdD2NSbcJyZJ5JxvqNAybvOpSNjCMtYvtReReIZRzV3zxuhBWBsfT6KByMohUX8sOXu0eX001tF322L2")
function Payment() {
    const location=useLocation()
    const { clientsecret } = location.state||{}
    const options = { clientSecret: clientsecret }
  
    return (
        <div className='p-10'>
            <EmbeddedCheckoutProvider stripe={stripe}  options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>

        </div>
    )
}

export default Payment
