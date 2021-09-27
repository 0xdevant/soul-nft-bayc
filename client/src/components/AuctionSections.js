import React from "react";

function AuctionSections() {
  return (
    <div className="auction-sections">
      <div className="second-section h-auto grid">
        <div className="flex items-center flex-wrap justify-center">
          <div className="p-6 md:p-0 md:flex-1">
            <div className="max-w-full md:max-w-2/3 mx-auto">
              <img
                src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/auction-pr-1.png?v=1631093440"
                alt="Golden Ticket and an Ape"
              />
            </div>
          </div>
          <div className="h-auto text-left p-6 md:p-0 md:flex-1">
            <div className="max-w-full md:max-w-2/3 mx-auto">
              <div className="flex flex-col text-white space-y-8">
                <h2
                  className="border-b-2 pb-4"
                  style={{ borderColor: "#a5a397" }}>
                  <b>How does it work?</b>
                </h2>
                <h2>
                  <b>Auction</b>
                </h2>
                <div className="flex space-x-4 items-center">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Steps_line_1.png?v=1631093365"
                    alt="Step 1 to 3"
                    className="hidden md:block"
                  />
                  <img
                    src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Steps_line_1_mobile.png?v=1631260177"
                    alt="Step 1 to 3"
                    className="block md:hidden"
                  />
                  <div className="flex flex-col space-y-12 flex-1">
                    <div className="flex flex-col space-y-2">
                      <h3>
                        <b>Sign up to the Auction</b>
                      </h3>
                      <p>
                        Sign up through this page to be invited to the auction.
                        Please note that the auction for the Golden Ticket will
                        only be available for current BAYC and/or MAYC NFT
                        owners. You will need to connect your Metamask wallet in
                        order to confirm ownership.
                      </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <h3>
                        <b>Review Terms & Conditions</b>
                      </h3>
                      <p>
                        Read the terms and conditions and opt-in to the auction.
                        Your wallet address will be invited to participate in
                        the OpenSea auction. We will send an email to you with a
                        link to the Auction room.
                      </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <h3>
                        <b>Golden Ticket Auction goes live</b>
                      </h3>
                      <div>
                        We will auction an exclusive Headphone NFT ticket that
                        can be redeemed by the winner. The BAYC or MAYC
                        Headphones ticket NFT will be transferred to the
                        winner’s wallet.{" "}
                      </div>
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
                <h2
                  className="border-b-2 pb-4"
                  style={{ borderColor: "#a5a397" }}>
                  <b>Redeem Headphones</b>
                </h2>
                <h2>
                  <b>Steps for the Auction Winner</b>
                </h2>
                <div className="flex space-x-4 items-center">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Steps_line_2.png?v=1631093365"
                    alt="Step 1 to 3"
                    className="hidden md:block"
                  />
                  <img
                    src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Steps_line_2_mobile.png?v=1631260177"
                    alt="Step 1 to 3"
                    className="block md:hidden"
                  />
                  <div className="flex flex-col space-y-12 flex-1">
                    <div className="flex flex-col space-y-2">
                      <h3>
                        <b>Check your Wallet</b>
                      </h3>
                      <p>
                        After winning the auction for the Bored Ape Headphone
                        auction you will receive an NFT Ticket. Check your email
                        for instructions on how to redeem your NFT Ticket.
                      </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <h3>
                        <b>Redeem your Gold Ticket NFT</b>
                      </h3>
                      <p>
                        You can redeem your NFT ticket by putting it into the
                        SOUL Forge, we will create a custom BAYC or MAYC
                        headphone for you with the BAYC or MAYC NFT of your
                        choosing in your collection (You can only select a BAYC
                        or MAYC NFT that you currently own).
                      </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <h3>
                        <b>Your custom headphones are created</b>
                      </h3>
                      <div>
                        After you transfer your NFT ticket into the SOUL Forge,
                        we will then start producing the custom BAYC or MAYC
                        headphone for you. We will ship to your preferred
                        address a real 1/1 physical headphone with your own BAYC
                        or MAYC ape printed on it, additionally you will receive
                        a digital NFT rendering of your custom headphones into
                        your wallet.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-0 md:flex-1 items-start">
            <div className="max-w-4/5 mx-auto">
              <img
                src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/auction-pr-2.png?v=1631093378"
                alt="Bored Ape NFT turns to SOUL Headphone"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionSections;
