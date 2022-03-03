import React, { useEffect, useRef, useState } from "react";
import GoldenTicketNFT from "./contracts/GoldenTicketNFT.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import $ from "jquery";
import Header from "./components/Header";
import Terms from "./components/Terms";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import ApeErrorPopup from "./components/ApeErrorPopup";
import AuctionSections from "./components/AuctionSections";
import AuctionWinner from "./components/AuctionWinner";
import Redeem from "./components/Redeem";
import NFT001 from "./components/NFT001";
import NFT002 from "./components/NFT002";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/terms">
          <Terms />
        </Route>
        <Route path="/auction-winner">
          <AuctionWinner />
        </Route>
        <Route path="/redeem">
          <Redeem />
        </Route>
        <Route path="/gallery/1">
          <NFT001 />
        </Route>
        <Route path="/gallery/2">
          <NFT002 />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  //const [loading, setLoading] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  //const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [popupFormInput, setPopUpFormInput] = useState("");
  const [formError, setFormError] = useState(null);
  const [popUpFormError, setPopUpFormError] = useState("");
  //const [isSignedUp, setIsSignedUp] = useState(false);
  const $form = useRef();
  const [popupActive, setPopupActive] = useState(false);
  const [apeErrorPopupActive, setApeErrorPopupActive] = useState(false);

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
        setPopupActive(false);
        setApeErrorPopupActive(false);
      } else {
        setAccounts(accounts);
      }
    });
  }

  /*const connectMeta = async () => {
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
  };*/

  const submitHandler = () => {
    $form.current.dispatchEvent(new Event("submit"));
  };

  const validateForm = (e) => {
    e.preventDefault();
    if (!input) {
      setFormError("Please fill in your email.");
      return;
    }
    const re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!re.test(String(input).toLowerCase())) {
      setFormError("The email format is wrong, please try again.");
      return;
    }
    $.ajax({
      type: "POST",
      url: "https://soulelectronics.us7.list-manage.com/subscribe/post-json?u=70e047ab5cb7346fc91e28eb2&id=0fb9218e3a&c=?",
      data: {
        EMAIL: input,
      },
      cache: false,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      error: (err) => {
        console.log("Error", err);
        setFormError("Something is wrong with the server, please try again.");
      },
      success: (res) => {
        console.log(res);
        //already subscribed
        if (res.result !== "success") {
          setFormError("You have already subscribed.");
          return;
        }
        setFormError("");
      },
    });

    return true;
  };

  const validatePopUpForm = (e) => {
    e.preventDefault();
    if (!accounts) {
      setPopUpFormError(
        "Please connect to your Metamask wallet before signing up."
      );
      return;
    }
    const consentChecked = document.querySelectorAll("input:checked");
    if (consentChecked.length !== 3) {
      setPopUpFormError("Please agree to the terms and consents.");
      return;
    }
    if (!popupFormInput) {
      setPopUpFormError("Please fill in your email.");
      return;
    }
    const re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!re.test(String(popupFormInput).toLowerCase())) {
      setPopUpFormError("The email format is wrong, please try again.");
      return;
    }
    $.ajax({
      type: "POST",
      url: "https://soulelectronics.us7.list-manage.com/subscribe/post-json?u=70e047ab5cb7346fc91e28eb2&id=7394424839&c=?",
      data: {
        EMAIL: popupFormInput,
        PUBLICADDR: accounts[0],
      },
      cache: false,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      error: (err) => {
        console.log("Error", err);
        setPopUpFormError(
          "Something is wrong with the server, please try again."
        );
      },
      success: (res) => {
        console.log(res);
        //already signed up
        if (res.result !== "success") {
          setPopUpFormError(
            "You have already signed up, please check your email for further instructions."
          );
          return;
        }
        //clear error and close the popup, display success message
        setPopUpFormError("");
        setPopupActive(false);
        //setIsSignedUp(true);
      },
    });

    return true;
  };

  /*const openPopup = async () => {
    try {
      setLoading(true);
      const userBAYCBalance = await contract.methods
        .fetchOwnerBAYCBalance(accounts[0])
        .call();
      const userMAYCBalance = await contract.methods
        .fetchOwnerMAYCBalance(accounts[0])
        .call();
      setLoading(false);
      //user doesn't own any BAYC or MAYC
      if (parseInt(userBAYCBalance) === 0 && parseInt(userMAYCBalance) === 0) {
        setApeErrorPopupActive(true);
        return;
      }
      setPopupActive(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closePopup = () => {
    setPopupActive(false);
    setApeErrorPopupActive(false);
  };

  const modals = document.querySelectorAll(".sign-up-popup");
  window.addEventListener("click", function (event) {
    for (let modal of modals) {
      if (event.target === modal) {
        setPopupActive(false);
        setApeErrorPopupActive(false);
        break;
      }
    }
  });

  //popup for auction sign up
  const popup = (
    <div className={`${popupActive ? "block" : "hidden"} sign-up-popup`}>
      <div className="sign-up-popup-inside p-2 md:p-6">
        <img
          src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Close_button.png?v=1631264960"
          alt="Close icon"
          className="close-popup cursor-pointer"
          width="25"
          onClick={closePopup}
        />
        <form
          action="https://soulelectronics.us7.list-manage.com/subscribe/post-json?u=70e047ab5cb7346fc91e28eb2&id=7394424839&c=?"
          onSubmit={validatePopUpForm}
          method="GET"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_blank">
          <div className="flex flex-col space-y-2 md:space-y-6">
            <div className="border-b flex flex-col space-y-2 pb-4">
              <h3 className="text-lg md:text-xl">
                <b>Sign up to Auction</b>
              </h3>
            </div>
            <div className="border-b">
              <div className="flex flex-col space-y-2 md:space-y-4 pb-2 md:pb-6 w-11/12 mx-auto">
                <p className="text-left text-sm md:text-md">
                  The Auction will be hosted in{" "}
                  <span className="font-bold underline">OpenSea</span> on
                  September 18th (Pacific Time), you will be required to own a
                  Bored Ape from BAYC and/or a Mutant Ape from MAYC in order to
                  participate.
                </p>
                <div className="checkbox-rows flex flex-col space-y-2">
                  <div className="flex items-center">
                    <label
                      htmlFor="1"
                      className="flex space-x-2 items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="1"
                        name="consent1"
                        value="true"
                        className="border-black rounded-none"
                      />
                      <span className="text-left text-sm">
                        I have copyrights to a Bored Ape (BAYC) and/or a Mutant
                        Ape (MAYC) in my wallet.
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="2"
                      className="flex space-x-2 items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="2"
                        name="consent2"
                        value="true"
                        className="border-black rounded-none"
                      />
                      <span className="text-left text-sm">
                        I read and accept the SOUL Service Terms & Conditions *
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="3"
                      className="flex space-x-2 items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="3"
                        name="consent3"
                        value="true"
                        className="border-black rounded-none"
                      />
                      <span className="text-left text-sm">
                        I agree that my data is used for the purpose of
                        receiving marketing materials*
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2 md:space-y-4 w-11/12 mx-auto">
              <p className="text-left text-sm md:text-md">
                Provide your email address to receive information about the
                status of the Auction
              </p>
              <input
                className="border-b border-gray-400 focus:outline-none md:py-2 text-black"
                type="email"
                value={popupFormInput}
                name="EMAIL"
                id="mce-EMAIL"
                onChange={(e) => setPopUpFormInput(e.target.value)}
                required=""
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                placeholder="E-mail Address*"
              />
              <input
                type="hidden"
                name="PUBLICADDR"
                value={accounts ? accounts[0] : ""}
              />

              <div id="mce-responses" className="hidden">
                <div id="mce-error-response" style={{ display: "none" }}></div>
                <div
                  id="mce-success-response"
                  style={{ display: "none" }}></div>
              </div>
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true">
                <input
                  type="text"
                  name="b_70e047ab5cb7346fc91e28eb2_7394424839"
                  tabIndex="-1"
                  defaultValue=""
                />
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-x-4">
                <div
                  className="md:w-2/3 text-left text-xs md:text-sm"
                  style={{ color: "#797979" }}>
                  You will need to pay for the GAS fee to transfer the Golden
                  Ticket if you become the winner for the auction.
                  <br />
                  *Requires consents
                  <br />
                  ** We have the right to reject your request if any of the
                  information Provided is deemed as non-verifiable.
                </div>
                <div className="w-full md:w-auto flex-auto">
                  <input
                    type="submit"
                    value="Sign Up"
                    className="bg-black text-center font-bold text-white w-full rounded-full p-2 md:p-4 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="popup-error text-red-500 w-full">
              {popUpFormError}
            </div>
          </div>
        </form>
      </div>
    </div>
  );*/

  return (
    <div className="App">
      {/*{popup}*/}
      <ApeErrorPopup
        apeErrorPopupActive={apeErrorPopupActive}
        //closePopup={closePopup}
        //openPopup={openPopup}
      />
      <Header />
      <div className="first-section h-auto hidden md:block">
        <div className="flex items-center flex-wrap justify-center">
          <div className="text-left p-6 md:p-0 grid place-items-center md:flex-1">
            <div className="max-w-4/5 mx-auto">
              <div className="flex flex-col text-white space-y-6">
                <h2>
                  <b>Way to go Apes!</b>
                </h2>
                <h1>
                  <b>The Auction has ended</b>
                </h1>
                <p className="pt-2">
                  However, feel free to subscribe if you haven’t done so to be
                  notified about future events.
                </p>

                {/*{accounts?.length > 0 && isSignedUp ? (
                  <>
                    <div className="mt-6 flex justify-center items-center space-x-4 px-10 py-2 success-msg rounded-full">
                      <img
                        src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Icon_awesome-check-circle.png?v=1631157938"
                        alt="A green tick"
                      />
                      <span>
                        <b>
                          You have already signed up for the OpenSea Auction
                        </b>
                      </span>
                    </div>
                    <div className="pt-4">
                      Please check your email for further instructions.
                      <br />
                      To change your associated email, please{" "}
                      <a
                        href="mailto:support@soulnation.com"
                        className="underline">
                        contact us here
                      </a>
                      .
                    </div>
                  </>
                ) : accounts?.length > 0 && !isSignedUp ? (
                  <div className="flex space-x-6 items-center w-11/12 pt-6">
                    <div className="flex flex-col flex-1 space-y-4 justify-center items-center">
                      <b className="text-xs">METAMASK IS CONNECTED</b>
                      <button
                        disabled={loading}
                        className="text-white rounded-full tracking-wider sign-up font-bold w-full"
                        onClick={openPopup}>
                        {!loading ? (
                          "Sign Up"
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
                      * You can only sign up if you own a BAYC and/or an MAYC
                      NFT and it’s in your wallet.
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
                      * You can only sign up if you own a BAYC and/or an MAYC
                      NFT and it’s in your wallet.
                    </span>
                  </div>
                )}
                <div className="text-red-600 font-bold">{error}</div>
                <Link
                  to="/terms"
                  target="_blank"
                  className="underline pt-8 text-sm">
                  Terms and Conditions
                </Link>*/}
                <form
                  action="https://soulelectronics.us7.list-manage.com/subscribe/post-json?u=70e047ab5cb7346fc91e28eb2&id=0fb9218e3a&c=?"
                  ref={$form}
                  onSubmit={validateForm}
                  className="flex flex-wrap items-center space-x-2 mb-6 subscription-form"
                  method="GET"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  target="_blank">
                  <input
                    className="bg-white rounded-3xl w-48 sm:w-80 h-12 p-4 focus:outline-none text-black"
                    type="email"
                    value={input}
                    name="EMAIL"
                    id="mce-EMAIL"
                    onChange={(e) => setInput(e.target.value)}
                    required=""
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    placeholder="Your Email Address"
                  />

                  <div id="mce-responses">
                    <div
                      id="mce-error-response"
                      style={{ display: "none" }}></div>
                    <div
                      id="mce-success-response"
                      style={{ display: "none" }}></div>
                  </div>
                  <div
                    style={{ position: "absolute", left: "-5000px" }}
                    aria-hidden="true">
                    <input
                      type="text"
                      name="b_70e047ab5cb7346fc91e28eb2_0fb9218e3a"
                      tabIndex="-1"
                      defaultValue=""
                    />
                  </div>
                  <img
                    src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/subscription-submit.png?v=1629451180"
                    alt="Submit"
                    onClick={submitHandler}
                    className="subscription-submit"
                  />
                  <div className="text-red-500 w-full text-xs">{formError}</div>
                </form>
                <div
                  className={`${
                    formError === "" ? "block" : "hidden"
                  } py-6 text-green-600`}>
                  Thank you for subscribing!
                </div>
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
                  <b>Way to go Apes!</b>
                </h2>
                <h1>
                  <b>The Auction has ended</b>
                </h1>
                <p className="pt-2">
                  However, feel free to subscribe if you haven’t done so to be
                  notified about future events.
                </p>

                <div className="flex flex-col space-y-6 items-center pt-6 mx-auto">
                  {/*{accounts?.length > 0 && isSignedUp ? (
                    <>
                      <div className="mt-6 flex justify-center items-center space-x-4 px-10 py-2 success-msg rounded-full">
                        <img
                          src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Icon_awesome-check-circle.png?v=1631157938"
                          alt="A green tick"
                        />
                        <span>
                          <b>
                            You have already signed up for the OpenSea Auction
                          </b>
                        </span>
                      </div>
                      <div className="pt-4 text-sm">
                        Please check your email for further instructions.
                        <br />
                        To change your associated email, please{" "}
                        <a
                          href="mailto:support@soulnation.com"
                          className="underline">
                          contact us here
                        </a>
                        .
                      </div>
                    </>
                  ) : accounts?.length > 0 && !isSignedUp ? (
                    <div className="flex flex-col space-y-4 items-center w-11/12 pt-4 md:pt-6 mx-auto">
                      <div className="flex flex-col flex-1 space-y-4 justify-center items-center">
                        <b className="text-xs">METAMASK IS CONNECTED</b>
                        <button
                          disabled={loading}
                          className="text-white rounded-full tracking-wider sign-up font-bold w-full"
                          onClick={openPopup}>
                          {!loading ? (
                            "Sign Up"
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
                        * You can only sign up if you own a BAYC and/or an MAYC
                        NFT and it’s in your wallet.
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
                        * You can only sign up if you own a BAYC and/or an MAYC
                        NFT and it’s in your wallet.
                      </span>
                    </div>
                  )}
                  <div className="text-red-600 font-bold">{error}</div>
                  <Link
                    to="/terms"
                    target="_blank"
                    className="underline pt-8 text-sm">
                    Terms and Conditions
                  </Link>*/}
                  <form
                    action="https://soulelectronics.us7.list-manage.com/subscribe/post-json?u=70e047ab5cb7346fc91e28eb2&id=0fb9218e3a&c=?"
                    ref={$form}
                    onSubmit={validateForm}
                    className="flex flex-wrap items-center space-x-2 mb-6 subscription-form justify-center"
                    method="GET"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    target="_blank">
                    <input
                      className="bg-white rounded-3xl w-48 sm:w-80 h-12 p-4 focus:outline-none text-black"
                      type="email"
                      value={input}
                      name="EMAIL"
                      id="mce-EMAIL"
                      onChange={(e) => setInput(e.target.value)}
                      required=""
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      placeholder="Your Email Address"
                    />

                    <div id="mce-responses">
                      <div
                        id="mce-error-response"
                        style={{ display: "none" }}></div>
                      <div
                        id="mce-success-response"
                        style={{ display: "none" }}></div>
                    </div>
                    <div
                      style={{ position: "absolute", left: "-5000px" }}
                      aria-hidden="true">
                      <input
                        type="text"
                        name="b_70e047ab5cb7346fc91e28eb2_0fb9218e3a"
                        tabIndex="-1"
                        defaultValue=""
                      />
                    </div>
                    <img
                      src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/subscription-submit.png?v=1629451180"
                      alt="Submit"
                      onClick={submitHandler}
                      className="subscription-submit"
                    />
                    <div className="text-red-500 w-full text-xs">
                      {formError}
                    </div>
                  </form>
                  <div
                    className={`${
                      formError === "" ? "block" : "hidden"
                    } py-6 text-green-600`}>
                    Thank you for subscribing!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuctionSections />
      <div className="flex items-center justify-center bg-black text-white subscribe-section h-80">
        <div className="flex flex-col space-y-6">
          <h3>
            <b>Subscribe to be notified first</b>
          </h3>
          <form
            action="https://soulelectronics.us7.list-manage.com/subscribe/post-json?u=70e047ab5cb7346fc91e28eb2&id=0fb9218e3a&c=?"
            ref={$form}
            onSubmit={validateForm}
            className="flex flex-wrap items-center space-x-2 mb-6 subscription-form justify-center"
            method="GET"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            target="_blank">
            <input
              className="bg-white rounded-3xl w-48 sm:w-80 h-12 p-4 focus:outline-none text-black"
              type="email"
              value={input}
              name="EMAIL"
              id="mce-EMAIL"
              onChange={(e) => setInput(e.target.value)}
              required=""
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              placeholder="Your Email Address"
            />

            <div id="mce-responses">
              <div id="mce-error-response" style={{ display: "none" }}></div>
              <div id="mce-success-response" style={{ display: "none" }}></div>
            </div>
            <div
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true">
              <input
                type="text"
                name="b_70e047ab5cb7346fc91e28eb2_0fb9218e3a"
                tabIndex="-1"
                defaultValue=""
              />
            </div>
            <img
              src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/subscription-submit.png?v=1629451180"
              alt="Submit"
              onClick={submitHandler}
              className="subscription-submit"
            />
            <div className="text-red-500 w-full text-xs">{formError}</div>
          </form>
          <div
            className={`${
              formError === "" ? "block" : "hidden"
            } py-6 text-green-600`}>
            Thank you for subscribing!
          </div>
          <span>
            * This promotion is only available for current BAYC and/or MAYC NFT
            holders
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center h-16 bg-black text-white">
        SOULNATION, 2021
      </div>
    </div>
  );
}
export default App;
