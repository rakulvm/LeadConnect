import React from 'react';

const PaymentForm: React.FC = () => {
  return (
    <div className="flex place-items-start bg-gray-100">
      <div className="m-12 bg-cardWhite shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
        <form>
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Card Details</h3>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardName">
              Name on Card *
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cardName"
              type="text"
              placeholder="Your name"
            />
          </div>

          <div className="mb-6">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
    Card Number *
  </label>
  <div className="relative">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="cardNumber"
      type="text"
      placeholder="•••• •••• •••• ••••"
    />
    <img
      src="https://d2ogrdw2mh0rsl.cloudfront.net/production/react/images/web/cards/jcb.svg"
      alt="card-logo"
      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6"
    />
  </div>
</div>


          <div className="flex space-x-4 mb-6">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiry">
                Expiry *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="expiry"
                type="text"
                placeholder="MM/YY"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                CVV *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cvv"
                type="text"
                placeholder="•••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
             className='mt-2 bg-buttonBlue text-white px-4 py-2 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-600'>
                
            </button>
          </div>
        </form>
      </div>
                        
      <div className="mt-12 bg-white shadow-md rounded-lg p-6 w-full max-w-xs ">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between items-center mb-2">
          <p>Enterprise Tier</p>
          <p className="text-xl font-bold">$100/month</p>
        </div>
        <p className="text-right text-sm">(billed monthly)</p>
        <div className="flex justify-between items-center my-4">
          <p>$100.00 x 1 month</p>
          <p>$100.00</p>
        </div>
        <div className="flex justify-between items-center my-4">
          <p>HST 13%</p>
          <p>$13.00</p>
        </div>
        <div className="flex justify-between items-center font-bold mb-4">
          <p>Total Due</p>
          <p>$113.00</p>
        </div>
        <p className="text-left text-xs">By placing this order you agree to our Terms & Conditions and auto-renewal.</p>
        <p className="mt-6 text-center text-sm">We accept the folllowing cards</p>
        <div className="mt-2 flex justify-center">
      <img
        src="https://d2ogrdw2mh0rsl.cloudfront.net/production/assets/../react/images/web/discover_logo.svg"
        alt="discover-logo"
        className="h-6 mx-0.5"
      />
      <img
        src="https://d2ogrdw2mh0rsl.cloudfront.net/production/assets/../react/images/web/amex_logo.svg"
        alt="amex-logo"
        className="h-6 mx-0.5"
      />
      <img
        src="https://d2ogrdw2mh0rsl.cloudfront.net/production/assets/../react/images/web/visa_logo.svg"
        alt="visa-logo"
        className="h-6 mx-0.5"
      />
      <img
        src="https://d2ogrdw2mh0rsl.cloudfront.net/production/assets/../react/images/web/maestro_logo.svg"
        alt="maestro-logo"
        className="h-6 mx-0.5"
      />
      <img
        src="https://d2ogrdw2mh0rsl.cloudfront.net/production/assets/../react/images/web/mastercard_logo.svg"
        alt="mastercard-logo"
        className="h-6 mx-0.5"
      />
    </div>
        
      </div>
    </div>
  );
};

export default PaymentForm;
