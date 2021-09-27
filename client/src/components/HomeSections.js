import React from "react";

function HomeSections() {
  return (
    <div>
      <div className="second-section h-auto grid">
        <div className="flex items-center flex-wrap justify-center">
          <div className="p-6 md:p-0 md:flex-1">
            <div className="max-w-4/5 mx-auto">
              <img
                src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Golden_Ticket_-_Bored_Ape_v4_-_Final_version__Transparent.png?v=1630894074"
                alt="Golden Ticket"
              />
            </div>
          </div>
          <div className="h-auto text-left p-6 md:p-0 md:flex-1">
            <div className="max-w-4/5 mx-auto">
              <div className="flex flex-col text-white space-y-8">
                <h2>
                  <b>Bid for the Golden Ticket NFT</b>
                </h2>
                <p>
                  Participate in our private auction and the winner will receive
                  a Golden Ticket NFT which you can redeem to get your own 1/1
                  physical Headphone with your preferred Bored Ape in your
                  collection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="third-section h-auto bg-black hidden md:grid">
        <div className="flex items-center flex-wrap justify-center">
          <div className="h-auto text-left p-6 md:p-0 md:flex-1">
            <div className="max-w-4/5 mx-auto">
              <div className="flex flex-col text-white space-y-8">
                <h2>
                  <b>Only you can have them</b>
                </h2>
                <p>
                  Only you, the winner of the auction can redeem the Golden
                  Ticket NFT and get a 1/1 physical Headphones with your
                  preferred Bored Ape in your collection.
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-0 md:flex-1 items-start">
            <div className="max-w-4/5 mx-auto">
              <img
                src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Image_13_1.png?v=1630391508"
                alt="Bored Ape SOUL Headphone"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="third-section mobile-section h-auto bg-black grid md:hidden">
        <div className="flex items-center flex-wrap justify-center">
          <div className="p-6 items-start">
            <div className="max-w-4/5 mx-auto">
              <img
                src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Image_13_1.png?v=1630391508"
                alt="Bored Ape SOUL Headphone"
              />
            </div>
          </div>
          <div className="h-auto text-left p-6">
            <div className="max-w-4/5 mx-auto">
              <div className="flex flex-col text-white space-y-8">
                <h2>
                  <b>Only you can have them</b>
                </h2>
                <p>
                  Only you, the winner of the auction can redeem the Golden
                  Ticket NFT and get a 1/1 physical Headphones with your
                  preferred Bored Ape in your collection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fourth-section h-auto bg-black">
        <div className="flex items-center flex-wrap justify-center">
          <div className="p-6 md:p-0 md:flex-1">
            <div className="max-w-4/5 mx-auto">
              <img
                className="mx-auto"
                src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Emotion_Max_-_Fungs_Ape_version__Beige_.494_1.png?v=1630391451"
                alt="Bored Ape SOUL Headphone"
              />
            </div>
          </div>
          <div className="h-auto text-left p-6 md:p-0 md:flex-1">
            <div className="max-w-4/5 mx-auto">
              <div className="flex flex-col text-white space-y-8">
                <h2>
                  <b>You also get a unique NFT with your headphones</b>
                </h2>
                <p>
                  Additionally to your 1/1 Bored Ape physical Headphones, you
                  also get an exclusive unique NFT featuring a beautiful digital
                  render of your headphones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSections;
