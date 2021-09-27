import React from "react";

function AuctionWinnerSections() {
  return (
    <div className="auction-sections auction-winner-sections">
      <div className="second-section h-auto grid">
        <div className="flex items-center flex-wrap justify-center">
          <div className="p-6 md:p-0 md:flex-1">
            <div className="max-w-full md:max-w-2/3 mx-auto">
              <img
                src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/auction-winner-wallet.png?v=1631517665"
                alt="Metamask Wallet with the golden ticket"
              />
            </div>
          </div>
          <div className="h-auto text-left p-6 md:p-0 md:flex-1">
            <div className="max-w-full md:max-w-2/3 mx-auto">
              <div className="flex flex-col text-white space-y-8">
                <h2
                  className="border-b-2 pb-4"
                  style={{ borderColor: "#ffaa33" }}>
                  <b>How to redeem?</b>
                </h2>
                <div className="flex space-x-4 items-start">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/step1.png?v=1631517665"
                    alt="Step 1"
                  />
                  <div className="flex flex-col space-y-12 flex-1">
                    <div className="flex flex-col space-y-2">
                      <h3>
                        <b>Connect your Metamask wallet</b>
                      </h3>
                      <p>
                        Connect the Metamask wallet that contains the Golden
                        Ticket NFT. Your Bored Ape and/or Mutant Ape should be
                        in the same wallet as you will be able to select them to
                        create the custom headphones later.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="third-section h-auto bg-black grid">
        <div className="flex items-center flex-wrap justify-center">
          <div className="h-auto text-left p-6 md:p-0 md:flex-1">
            <div className="max-w-full md:max-w-2/3 mx-auto">
              <div className="flex flex-col text-white space-y-8">
                <div className="flex space-x-4 items-start">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/step2.png?v=1631517665"
                    alt="Step 2"
                  />
                  <div className="flex flex-col space-y-12 flex-1">
                    <div className="flex flex-col space-y-2">
                      <h3>
                        <b>Select your preferred Ape</b>
                      </h3>
                      <p>
                        Select your preferred Bored Ape and/or Mutant Ape to
                        create your 1/1 custom Headphone. Please keep in mind
                        that the Bored Ape needs to be in the same wallet that
                        holds your Gold Ticket.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-0 md:flex-1 items-start">
            <div className="max-w-full md:max-w-2/3 mx-auto">
              <img
                src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/auction-winner-2.png?v=1631517665"
                alt="Selection of two Bored Ape NFTs"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fourth-section h-auto grid">
        <div className="flex items-center flex-wrap justify-center">
          <div className="p-6 md:p-0 md:flex-1">
            <div className="max-w-full md:max-w-2/3 mx-auto">
              <img
                src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Mokey_Guru_1.png?v=1631517666"
                alt="Monkey Guru meditating"
              />
            </div>
          </div>
          <div className="h-auto text-left p-6 md:p-0 md:flex-1">
            <div className="max-w-full md:max-w-2/3 mx-auto">
              <div className="flex flex-col text-white space-y-8">
                <div className="flex space-x-4 items-start">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/step3.png?v=1631517665"
                    alt="Step 3"
                  />
                  <div className="flex flex-col space-y-12 flex-1">
                    <div className="flex flex-col space-y-2">
                      <h3>
                        <b>Transfer the Golden Ticket to the Ape Guru</b>
                      </h3>
                      <p>
                        We will ask you to transfer the Gold Ticket into our
                        wallet in order to redeem the physical headphones. You
                        will need to pay for the transfer gas fee. We will take
                        care of the rest (Manufacturing and shipping).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionWinnerSections;
