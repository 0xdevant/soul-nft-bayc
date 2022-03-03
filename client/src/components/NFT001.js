import React, { useState } from "react";
import Header from "./Header";

function NFT001() {
  const [tooltip, setTooltip] = useState("Copy");
  const tokenId =
    "20380798278448505662861399834612724564619233566642749688288578971401281601537";
  const copyHandler = () => {
    navigator.clipboard.writeText(tokenId);
    setTooltip("Copied!");
    setTimeout(() => {
      setTooltip("Copy");
    }, 1000);
  };
  return (
    <div>
      <Header />
      <div className="p-6 text-white" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="w-full md:max-w-1/2 mx-auto">
          <div className="flex flex-col space-y-8">
            <div className="font-bold text-center">
              SOUL NFT HEADPHONE
              <br />
              <span className="text-4xl">#001</span>
            </div>
            <img
              width="772"
              src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/SOUL_NFT_headphone__001.png?v=1634710510"
              alt="Headphone NFT 001"
              className="mx-auto"
            />

            <div>
              <div className="text-2xl">Description</div>
              <br />
              This piece is a digital NFT that represents the physical 1 / 1
              customized headphone designed upon request of the BAYC #2967
              current holder.
              <br />
              <br />
              Inspired by the BAYC #2967’s rugged, but devil-may-care attitude,
              SOULNATION designed a mosaic pattern wrapped around the headphone.
            </div>
            <div>
              <div className="text-2xl pb-4">Notes</div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-wrap">
                  <div className="flex-1">
                    <b>Date Created:</b>
                    <br />
                    October 7, 2021
                    <br /> <br />
                    <b>Original Resolution:</b>
                    <br />
                    3,840 x 3,840 px
                    <br /> <br />
                    <b>Contract Address:</b>
                    <br />
                    <a
                      href="https://etherscan.io/address/0x495f947276749Ce646f68AC8c248420045cb7b5e"
                      target="_blank"
                      className="hover:text-gray-200">
                      0x495f947276749Ce646f68AC...
                    </a>
                  </div>
                  <div className="flex-1">
                    <b>Token ID:</b>
                    <br />
                    <span
                      className="text-base cursor-pointer hover:text-gray-200 relative tooltip"
                      onClick={() => {
                        copyHandler();
                      }}>
                      203807982784485056628613998...
                      <span className="tooltipText">{tooltip}</span>
                    </span>
                    <br /> <br />
                    <b>Token Standard:</b>
                    <br />
                    ERC-1155
                    <br /> <br />
                    <b>Blockchain:</b>
                    <br />
                    Ethereum
                  </div>
                </div>
              </div>
            </div>
            <img
              src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/SOUL_NFT_STICKER.png?v=1634710510"
              alt="SOUL NFT Sticker"
              width="198"
              className="mx-auto"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-16 bg-black text-white">
        SOULNATION, 2021
      </div>
    </div>
  );
}

export default NFT001;
