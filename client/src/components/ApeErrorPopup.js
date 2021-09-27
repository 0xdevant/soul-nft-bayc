import React from "react";

function ApeErrorPopup({ apeErrorPopupActive, closePopup, openPopup }) {
  return (
    <div
      className={`${
        apeErrorPopupActive ? "block" : "hidden"
      } sign-up-popup ape-error-popup`}>
      <div className="sign-up-popup-inside p-6">
        <img
          src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Icon_ionic-ios-close-circle.png?v=1631006645"
          alt="Close icon"
          className="close-popup cursor-pointer"
          onClick={closePopup}
        />

        <div className="flex flex-col space-y-6 items-center">
          <div className="border-b pb-4 w-full">
            <h3>
              <b>Sign up to Private Auction</b>
            </h3>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Icon_awesome-exclamation-circle.png?v=1631083139"
            alt="Error"
            className="w-12"
          />
          <h3>
            <b>Something went wrong</b>
          </h3>
          <p>
            We were not able to confirm that there is a BAYC Bored Ape and/or a
            MAYC Mutant Ape inside your wallet, please make sure you are
            connected using the correct wallet.
          </p>
          <div className="flex justify-center items-center space-x-6 w-full max-w-full md:max-w-1/2 pt-10">
            <div className="flex-auto">
              <button
                onClick={closePopup}
                className="bg-white text-center font-bold text-black w-full rounded-full p-4 cursor-pointer border border-black">
                Cancel
              </button>
            </div>
            <div className="flex-auto">
              <button
                onClick={openPopup}
                className="bg-black text-center font-bold text-white w-full rounded-full p-4 cursor-pointer">
                Try Again
              </button>
            </div>
          </div>
          <p>
            Feel free to{" "}
            <b>
              <a className="underline" href="mailto:support@soulnation.com">
                send us an email
              </a>
            </b>{" "}
            if you need further assistance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ApeErrorPopup;
