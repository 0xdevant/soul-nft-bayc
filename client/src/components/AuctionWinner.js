import React, { useEffect, useState } from "react";
import GoldenTicketNFT from "../contracts/GoldenTicketNFT.json";
import getWeb3 from "../getWeb3";
import Header from "../components/Header";
import { Link, useHistory } from "react-router-dom";
import GoldenTicketErrorPopup from "../components/GoldenTicketErrorPopup";
import AuctionWinnerSections from "./AuctionWinnerSections";

function AuctionWinner() {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState("");
  const [goldenTicketErrorPopupActive, setGoldenTicketErrorPopupActive] =
    useState(false);
  const goldenTicketTokenId =
    "21787024092457674230796483934239099902041147234590111229764665228742539345921";
  const goldenTicket2TokenId =
    "21787024092457674230796483934239099902041147234590111229764665230941562601473";

  useEffect(() => {
    const checkConnection = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = GoldenTicketNFT.networks[networkId];
      const instance = new web3.eth.Contract(
        GoldenTicketNFT.abi,
        deployedNetwork && deployedNetwork.address
      );
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
    };
    checkConnection();
  }, []);

  //if account changed
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      //user disconnected metamask
      if (accounts.length === 0) {
        setAccounts(null);
        setGoldenTicketErrorPopupActive(false);
      } else {
        setAccounts(accounts);
      }
    });
  }

  const connectMeta = async () => {
    try {
      setLoading(true);
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => setLoading(false))
        .catch((err) => setLoading(false));
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      setError("");
    } catch (error) {
      //users didn't have metamask downloaded
      console.log(error.message);
      setError(
        "Please have the metamask extension downloaded on your browser."
      );
      setLoading(false);
    }
  };

  const goRedeem = async () => {
    try {
      setLoading(true);
      const userBAYCBalance = await contract.methods
        .fetchOwnerBAYCBalance(accounts[0])
        .call();
      const userMAYCBalance = await contract.methods
        .fetchOwnerMAYCBalance(accounts[0])
        .call();
      const goldenTicketBalance = await contract.methods
        .checkGoldenTicketBalance(accounts[0], goldenTicketTokenId)
        .call();
      const goldenTicket2Balance = await contract.methods
        .checkGoldenTicketBalance(accounts[0], goldenTicket2TokenId)
        .call();
      setLoading(false);
      //user doesn't own any BAYC or MAYC
      if (
        (parseInt(userBAYCBalance) === 0 && parseInt(userMAYCBalance) === 0) ||
        (parseInt(goldenTicketBalance) === 0 &&
          parseInt(goldenTicket2Balance) === 0)
      ) {
        setGoldenTicketErrorPopupActive(true);
        return;
      }
      history.push("/redeem");
    } catch (error) {
      console.log(error);
    }
  };

  const closePopup = () => {
    setGoldenTicketErrorPopupActive(false);
  };

  const modals = document.querySelectorAll(".sign-up-popup");
  window.addEventListener("click", function (event) {
    for (let modal of modals) {
      if (event.target === modal) {
        //setPopupActive(false);
        setGoldenTicketErrorPopupActive(false);
        break;
      }
    }
  });

  return (
    <div className="App">
      <GoldenTicketErrorPopup
        goldenTicketErrorPopupActive={goldenTicketErrorPopupActive}
        closePopup={closePopup}
        goRedeem={goRedeem}
      />
      <Header />
      <div className="first-section h-auto hidden md:block">
        <div className="flex items-center flex-wrap justify-center">
          <div className="text-left p-6 md:p-0 grid place-items-center md:flex-1">
            <div className="max-w-4/5 mx-auto">
              <div className="flex flex-col text-white space-y-6">
                <h2>
                  <b>Congratulations!</b>
                </h2>
                <h1>
                  <b>You won the Auction</b>
                </h1>
                {/*<Countdown />*/}
                <p className="pt-2">
                  You may now submit the Golden Ticket NFT to the Ape Guru in
                  order to redeem a physical headphone with your preferred Bored
                  Ape and/or Mutant Ape on it.
                </p>

                {accounts?.length > 0 ? (
                  <div className="flex space-x-6 items-center w-11/12 pt-6">
                    <div className="flex flex-col flex-1 space-y-4 justify-center items-center">
                      <b className="text-xs">METAMASK IS CONNECTED</b>
                      <button
                        disabled={loading}
                        className="text-white rounded-full tracking-wider sign-up font-bold w-full"
                        onClick={goRedeem}>
                        {!loading ? (
                          "Redeem"
                        ) : (
                          <svg
                            className="animate-spin mx-auto h-6 w-6 text-white"
                            viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                    <span className="flex-1">
                      * The Golden Ticket NFT can only be redeemed for current
                      BAYC and/or MAYC NFT holders.
                    </span>
                  </div>
                ) : (
                  <div className="flex space-x-6 items-center w-11/12 pt-6">
                    <div className="flex flex-col flex-1 space-y-4 justify-center items-center">
                      <b className="text-xs">CONNECT METAMASK TO SIGN UP</b>
                      <button
                        disabled={loading}
                        onClick={connectMeta}
                        className="bg-white text-black rounded-full tracking-wider w-full flex space-x-2 justify-center items-center">
                        {!loading ? (
                          <>
                            <img
                              src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Metamask_Icon_no_border_2x_326297a8-1e93-4508-8905-ce86e8415f6a.png?v=1631002453"
                              alt="Meta Mask Logo"
                              className="w-7"
                            />
                            <span className="font-bold tracking-widest">
                              METAMASK
                            </span>
                          </>
                        ) : (
                          <svg
                            className="animate-spin mx-auto h-6 w-6 text-black"
                            viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                    <span className="flex-1">
                      * The Golden Ticket NFT can only be redeemed for current
                      BAYC and/or MAYC NFT holders.
                    </span>
                  </div>
                )}
                <div className="text-red-600 font-bold">{error}</div>
                <Link
                  to="/terms"
                  target="_blank"
                  className="underline pt-8 text-sm">
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-0 md:flex-1">
            <div className="max-w-4/5 mx-auto self-end">
              <img
                src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/ape_headphone_nft.png?v=1630391149"
                alt="Bored Ape SOUL Headphone"
                width="600"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="first-section mobile-section h-auto block md:hidden">
        <div className="flex items-center flex-wrap justify-center">
          <div className="pt-6 w-full">
            <div className="max-w-4/5 mx-auto self-end">
              <img
                src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/ape_headphone_nft.png?v=1630391149"
                alt="Bored Ape SOUL Headphone"
                width="600"
              />
            </div>
          </div>
          <div className="w-full text-center p-6 grid place-items-center">
            <div className="max-w-9/10 mx-auto">
              <div className="flex flex-col text-white space-y-6">
                <h2>
                  <b>Congratulations!</b>
                </h2>
                <h1>
                  <b>You won the Auction</b>
                </h1>
                <p className="pt-2">
                  You may now submit the Golden Ticket NFT to the Ape Guru in
                  order to redeem a physical headphone with your preferred Bored
                  Ape and/or Mutant Ape on it.
                </p>

                <div className="flex flex-col space-y-6 items-center pt-6 mx-auto">
                  {accounts?.length > 0 ? (
                    <div className="flex flex-col space-y-4 items-center w-11/12 pt-4 md:pt-6 mx-auto">
                      <div className="flex flex-col flex-1 space-y-4 justify-center items-center">
                        <b className="text-xs">METAMASK IS CONNECTED</b>
                        <button
                          disabled={loading}
                          className="text-white rounded-full tracking-wider sign-up font-bold w-full"
                          onClick={goRedeem}>
                          {!loading ? (
                            "Redeem"
                          ) : (
                            <svg
                              className="animate-spin mx-auto h-6 w-6 text-white"
                              viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          )}
                        </button>
                      </div>
                      <span className="flex-1">
                        * The Golden Ticket NFT can only be redeemed for current
                        BAYC and/or MAYC NFT holders.
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-4 justify-center items-center w-11/12 pt-6 mx-auto">
                      <b className="text-xs">CONNECT METAMASK TO SIGN UP</b>
                      <button
                        disabled={loading}
                        onClick={connectMeta}
                        className="bg-white text-black rounded-full tracking-wider w-full flex space-x-2 justify-center items-center">
                        {!loading ? (
                          <>
                            <img
                              src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Metamask_Icon_no_border_2x_326297a8-1e93-4508-8905-ce86e8415f6a.png?v=1631002453"
                              alt="Meta Mask Logo"
                              className="w-7"
                            />
                            <span className="font-bold tracking-widest">
                              METAMASK
                            </span>
                          </>
                        ) : (
                          <svg
                            className="animate-spin mx-auto h-6 w-6 text-black"
                            viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                      </button>

                      <span>
                        * The Golden Ticket NFT can only be redeemed for current
                        BAYC and/or MAYC NFT holders.
                      </span>
                    </div>
                  )}
                  <div className="text-red-600 font-bold">{error}</div>
                  <Link
                    to="/terms"
                    target="_blank"
                    className="underline pt-8 text-sm">
                    Terms and Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuctionWinnerSections />
      <div className="flex items-center justify-center h-16 bg-black text-white">
        SOULNATION, 2021
      </div>
    </div>
  );
}

export default AuctionWinner;
