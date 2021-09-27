import React, { useEffect, useState } from "react";
import GoldenTicketNFT from "../contracts/GoldenTicketNFT.json";
import ERC1155 from "../abi/ERC1155.json";
import getWeb3 from "../getWeb3";
import $ from "jquery";
import Header from "../components/Header";
import { Link, useHistory } from "react-router-dom";
import GoldenTicketErrorPopup from "../components/GoldenTicketErrorPopup";

function Redeem() {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState("");
  const [popupFormInput, setPopUpFormInput] = useState("");
  const [popUpFormError, setPopUpFormError] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [goldenTicketErrorPopupActive, setGoldenTicketErrorPopupActive] =
    useState(false);
  const [approvalContract, setApprovalContract] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedTokenArrayIndex, setSelectedTokenArrayIndex] = useState(null);
  const [isApeSelect, setIsApeSelect] = useState(false);
  const goldenTicketContractAddress =
    "0x88B48F654c30e99bc2e4A1559b4Dcf1aD93FA656";
  const goldenTicketTokenId =
    "21787024092457674230796483934239099902041147234590111229764665228742539345921";
  const goldenTicket2TokenId =
    "21787024092457674230796483934239099902041147234590111229764665230941562601473";

  //mainnet golden ticket
  /*const goldenTicketTokenId =
    "20380798278448505662861399834612724564619233566642749688288578969202258345985";
  const goldenTicket2TokenId =
    "20380798278448505662861399834612724564619233566642749688288578970301769973761";*/

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
      const openSeaInstance = new web3.eth.Contract(
        ERC1155.abi,
        goldenTicketContractAddress
      );
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
      setApprovalContract(openSeaInstance);
      return { accounts, instance };
    };
    checkConnection().then((res) => (isApeSelect ? "" : checkOwnToken(res)));
  }, []);

  //if account changed
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      //user disconnected metamask
      if (accounts.length === 0) {
        setAccounts(null);
        setTokenInfo([]);
        setPopupActive(false);
        setGoldenTicketErrorPopupActive(false);
      } else {
        setAccounts(accounts);
      }
    });
  }

  const fetchBAYCIPFS = async (tokenId, instance) => {
    setError("");
    if (tokenId != null) {
      const tokenURI = await instance.methods
        .fetchOwnerBAYCTokenURI(tokenId)
        .call();
      const response = await fetch(
        tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        const tokenURIPromise = await response.json();
        const tokenURIJson = await tokenURIPromise;

        const imageUrl =
          "https://ipfs.io/ipfs/" +
          (await tokenURIJson.image.replace("ipfs://", ""));
        //console.log(imageUrl);
        return imageUrl;
      }
    } else {
      setError("No token Id");
    }
  };

  const fetchMAYCIPFS = async (tokenId) => {
    setError("");
    if (tokenId != null) {
      const tokenURI = "https://boredapeyachtclub.com/api/mutants/" + tokenId;
      const response = await fetch(tokenURI);

      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        const tokenURIPromise = await response.json();
        const tokenURIJson = await tokenURIPromise;

        const imageUrl =
          "https://ipfs.io/ipfs/" +
          (await tokenURIJson.image.replace("ipfs://", ""));
        //console.log(imageUrl);
        return imageUrl;
      }
    } else {
      setError("No token Id");
    }
  };

  const checkOwnToken = async ({ accounts, instance }) => {
    const updatedTokenInfo = [];
    const numOfAllTokens = { baycs: 0, maycs: 0 };
    //check if user logged in
    if (accounts?.length > 0) {
      setError("");
      const numOfBAYCToken = await instance.methods
        .fetchOwnerBAYCBalance(accounts[0])
        .call();
      const numOfMAYCToken = await instance.methods
        .fetchOwnerMAYCBalance(accounts[0])
        .call();
      numOfAllTokens.baycs = parseInt(numOfBAYCToken);
      numOfAllTokens.maycs = parseInt(numOfMAYCToken);
      //console.log(numOfAllTokens);
      //users doesn't have any BAYC / MAYC, end the check
      if (numOfAllTokens.baycs === 0 && numOfAllTokens.maycs === 0) {
        console.log("You don't have any Ape NFTs");
        return;
      }
      try {
        //fetch BAYC token infos
        for (let i = 0; i <= numOfAllTokens.baycs - 1; i++) {
          const tokenIndex = await instance.methods
            .fetchOwnerBAYCTokenId(accounts[0], i)
            .call();

          fetchBAYCIPFS(tokenIndex, instance).then((res) => {
            setTokenInfo([
              ...updatedTokenInfo,
              {
                tokenId: `BAYC-${tokenIndex}`,
                image: res,
              },
            ]);
            updatedTokenInfo.push({
              tokenId: `BAYC-${tokenIndex}`,
              image: res,
            });
          });
        }
        //fetch MAYC token infos
        for (let i = 0; i <= numOfAllTokens.maycs - 1; i++) {
          const tokenIndex2 = await instance.methods
            .fetchOwnerMAYCTokenId(accounts[0], i)
            .call();

          fetchMAYCIPFS(tokenIndex2, instance).then((res) => {
            setTokenInfo([
              ...updatedTokenInfo,
              {
                tokenId: `MAYC-${tokenIndex2}`,
                image: res,
              },
            ]);
            updatedTokenInfo.push({
              tokenId: `MAYC-${tokenIndex2}`,
              image: res,
            });
          });
        }
      } catch (error) {
        setError("No Such Token");
        console.log(error);
      }
    } else {
      setError("You are not logged in");
    }
  };

  const transferTicket = async () => {
    try {
      const isGoldenTicketOwner = await contract.methods
        .isGoldenTicketOwner(accounts[0], goldenTicketTokenId)
        .call();
      const isGoldenTicket2Owner = await contract.methods
        .isGoldenTicketOwner(accounts[0], goldenTicket2TokenId)
        .call();
      //if verify the user is the owner of golden ticket, then ask for user's approval
      if (isGoldenTicketOwner) {
        setError("");
        await approvalContract.methods
          .setApprovalForAll(contract.options.address, true)
          .send({ from: accounts[0] });
        await contract.methods
          .transferGoldenTicket(
            accounts[0],
            goldenTicketTokenId,
            [],
            contract.options.address
          )
          .send({ from: accounts[0] });
        return true;
      } else if (isGoldenTicket2Owner) {
        setError("");
        await approvalContract.methods
          .setApprovalForAll(contract.options.address, true)
          .send({ from: accounts[0] });
        await contract.methods
          .transferGoldenTicket(
            accounts[0],
            goldenTicket2TokenId,
            [],
            contract.options.address
          )
          .send({ from: accounts[0] });
        return true;
      } else {
        //User doesn't own golden ticket
        setError(
          "Make sure you are connecting the Metamask wallet that contains your Golden Ticket NFT."
        );
        setPopupActive(false);
        setIsSignedUp(false);
        return false;
      }
    } catch (error) {
      setError(
        "Make sure to confirm the transfer from your Metamask wallet in order to initiate the Golden Ticket Transfer."
      );
      setPopupActive(false);
      setIsSignedUp(false);
      return false;
    }
  };

  const selectedTokenHandler = (tokenId, tokenArrayIndex) => {
    setSelectedToken(tokenId);
    setSelectedTokenArrayIndex(tokenArrayIndex);
  };

  const validatePopUpForm = async (e) => {
    e.preventDefault();
    if (!accounts) {
      setPopUpFormError(
        "Please connect to your Metamask wallet before signing up."
      );
      return;
    }
    const consentChecked = document.querySelectorAll(
      ".transfer-golden-ticket-form input:checked"
    );
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
    setLoading(true);
    const transferTicketStatus = await transferTicket();
    if (transferTicketStatus) {
      $.ajax({
        type: "POST",
        url: "https://soulelectronics.us7.list-manage.com/subscribe/post-json?u=70e047ab5cb7346fc91e28eb2&id=a92dbafe0f&c=?",
        data: {
          EMAIL: popupFormInput,
          PUBLICADDR: accounts[0],
          TOKENID: selectedToken,
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
          //console.log(res);
          //already signed up
          if (res.result !== "success") {
            setPopUpFormError(
              "You either signed up already or there is something wrong with the server, please try again."
            );
            return;
          }
          //clear error and close the popup, display success message
          setPopUpFormError("");
          setPopupActive(false);
          setIsSignedUp(true);
        },
      });
    }
    setLoading(false);
  };

  const openPopup = async () => {
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
        setGoldenTicketErrorPopupActive(true);
        return;
      }
      setPopupActive(true);
    } catch (error) {
      console.log(error);
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
      setLoading(false);
      //user doesn't own any BAYC or MAYC
      if (
        (parseInt(userBAYCBalance) === 0 && parseInt(userMAYCBalance) === 0) ||
        parseInt(goldenTicketBalance) === 0
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
    setPopupActive(false);
    setGoldenTicketErrorPopupActive(false);
  };

  const modals = document.querySelectorAll(".sign-up-popup");
  window.addEventListener("click", function (event) {
    for (let modal of modals) {
      if (event.target === modal) {
        setPopupActive(false);
        setGoldenTicketErrorPopupActive(false);
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
          action="https://soulelectronics.us7.list-manage.com/subscribe/post-json?u=70e047ab5cb7346fc91e28eb2&id=a92dbafe0f&c=?"
          onSubmit={validatePopUpForm}
          method="GET"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_blank"
          className="transfer-golden-ticket-form">
          <div className="flex flex-col space-y-2 md:space-y-6">
            <div className="border-b flex flex-col space-y-2 pb-4">
              <h3 className="text-lg md:text-xl">
                <b>Transfer Golden Ticket</b>
              </h3>
            </div>
            <div className="border-b">
              <div className="flex flex-col space-y-2 md:space-y-4 pb-2 md:pb-6 w-11/12 mx-auto">
                <p className="text-left text-sm md:text-md">
                  To create the Bored/Mutant Ape headphones, confirm the
                  copyrights, read and Accept SOUL Service Terms & Conditions,
                  and apply for the item approval process required to mint NFT.
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
                        I have copyrights to this item *
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
                        I read and accept the SOUL Service{" "}
                        <b>
                          <u>Terms & Conditions</u>
                        </b>{" "}
                        *
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
                Provide your email address to receive information about progress
                of the Bored/Mutant Ape Headphones status
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
              <input type="hidden" name="TOKENID" value={selectedToken} />

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
                  name="b_70e047ab5cb7346fc91e28eb2_a92dbafe0f"
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
                  {loading ? (
                    <button
                      disabled
                      className="bg-black text-center font-bold text-white w-full rounded-full p-2 md:p-4 cursor-pointer">
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
                    </button>
                  ) : (
                    <input
                      type="submit"
                      value="Transfer Gold Ticket"
                      className="bg-black text-center font-bold text-white w-full rounded-full p-2 md:p-4 cursor-pointer"
                    />
                  )}
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
  );
  return (
    <div className="App">
      {popup}
      <GoldenTicketErrorPopup
        goldenTicketErrorPopupActive={goldenTicketErrorPopupActive}
        closePopup={closePopup}
        goRedeem={goRedeem}
      />
      <Header />
      <div
        className={`select-ape-section h-auto ${
          isApeSelect ? "block" : "hidden"
        }`}
        style={{ background: "#15112b" }}>
        <div className="flex items-center flex-wrap justify-center">
          <div className="text-center p-6 md:p-0 md:flex-1">
            <div className="max-w-4/5 mx-auto mt-20">
              {!isSignedUp ? (
                <div className="flex flex-col text-white space-y-6">
                  <h3>
                    <b>Transfer your Golden Ticket to the Ape Guru</b>
                  </h3>
                  <p className="pt-2">
                    Connect your Metamask Wallet holding the Gold Ticket NFT and
                    transfer it to the Ape Guru’s wallet to initiate the
                    Headphones transmutation process.
                  </p>
                  <button
                    className="p-4 rounded-full text-white font-bold w-60 sm:w-72 mx-auto"
                    style={{ backgroundColor: "#be4d60" }}
                    onClick={openPopup}>
                    {!loading ? (
                      "Transfer Golden Ticket"
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
                  <span className="text-sm">
                    You will need to pay for the GAS transfer fee
                  </span>
                  <span>
                    Your Ape selection will be used to create the unique
                    headphones. If you wish to change you may go back now. The
                    selection cannot be changed once the Gold Ticket has been
                    transferred.
                  </span>
                  <div
                    key={tokenInfo[selectedTokenArrayIndex]?.tokenId}
                    className="rounder-full sm:w-3/4 lg:w-5/12 mx-auto p-4 m-6 text-black select-ape flex flex-col space-y-4"
                    style={{ backgroundColor: "#eaf2f4" }}>
                    <label
                      htmlFor={tokenInfo[selectedTokenArrayIndex]?.tokenId}
                      className="cursor-pointer">
                      <img
                        src={tokenInfo[selectedTokenArrayIndex]?.image}
                        alt="Bored Ape"
                        width="240"
                        className="mx-auto"
                      />
                    </label>
                    <div className="flex space-x-4 justify-center items-center">
                      <div className="font-bold">{`${
                        tokenInfo[selectedTokenArrayIndex]?.tokenId.match(
                          /(^\w{4})/
                        )[0] === "BAYC"
                          ? "Bored"
                          : "Mutant"
                      } Ape #${tokenInfo[
                        selectedTokenArrayIndex
                      ]?.tokenId.replace(/(^\w{4})-/, "")}`}</div>
                    </div>
                  </div>

                  <div className="text-red-600 font-bold">{error}</div>
                  <div
                    onClick={() => setIsApeSelect(false)}
                    className="font-bold mb-10 text-lg cursor-pointer">
                    &lt; Change Selection
                  </div>
                  <Link
                    to="/terms"
                    target="_blank"
                    className="underline pt-8 text-sm">
                    Terms and Conditions
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col text-white space-y-6 justify-center">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Icon_awesome-check-circle_1.png?v=1631607865"
                    alt="A green tick"
                    width="84"
                    className="mx-auto"
                  />
                  <h2>
                    <b>
                      Your Golden Ticket has been successfully transferred to
                      the Ape Guru
                    </b>
                  </h2>
                  <p className="pt-2">
                    The Ape Guru received your transmutation request, we will
                    contact you via email with updates regarding the status of
                    your unique headphones as soon as possible. If you have any
                    questions you may contact us at{" "}
                    <a
                      href="mailto:info@soulnation.com"
                      className="underline font-bold">
                      info@soulnation.com
                    </a>
                  </p>

                  <Link
                    to="/terms"
                    target="_blank"
                    className="underline pt-20 text-sm">
                    Terms and Conditions
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white flex items-center md:flex-1 guru-section">
            <img
              src="https://cdn.shopify.com/s/files/1/0276/0176/4435/files/Monkey_Meditating.png?v=1631517666"
              alt="Monkey Medidating"
            />
          </div>
        </div>
      </div>
      <div
        className={`select-ape-section h-auto ${
          isApeSelect ? "hidden" : "block"
        }`}
        style={{ background: "#151414" }}>
        <div className="flex items-center md:items-start flex-wrap justify-center">
          <div className="text-left p-6 md:p-0 md:w-5/12 select-ape-left">
            <div className="max-w-4/5 mx-auto py-10 md:mt-20">
              <div className="flex flex-col text-white space-y-6">
                <Link to="/auction-winner" className="font-bold mb-10 text-lg">
                  &lt; Back
                </Link>
                <h1>
                  <b>Select your Ape</b>
                </h1>
                <p className="pt-2">
                  You may now select your preferred Ape, we will then start to
                  create a unique 1/1 Headphone exclusively for you.
                  <br />
                  <br />
                  <b>
                    Please select carefully, you may not change your selection
                    after you submit the Golden Ticket NFT.
                  </b>
                </p>
                <Link
                  to="/terms"
                  target="_blank"
                  className="underline pt-8 text-sm">
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
          <div
            className="p-6 md:w-7/12 bg-white flex items-center py-20"
            style={{ minHeight: "910px" }}>
            <div className="max-w-4/5 mx-auto">
              <div className="md:-m-2 flex justify-center items-center flex-wrap">
                <div className="flex flex-col space-y-10">
                  <div className="flex flex-col border-b-2 border-black space-y-2 text-left text-lg pb-2">
                    <div className="font-bold">Wallet Address</div>
                    <div className="text-sm sm:text-md md:text-lg">
                      {accounts ? accounts[0] : ""}
                    </div>
                  </div>
                  <div className="md:-m-2 flex justify-center items-center flex-wrap">
                    {tokenInfo != null &&
                      tokenInfo.map((tokenData, index) => (
                        <label
                          key={index}
                          htmlFor={tokenData.tokenId}
                          className="rounder-full sm:w-3/4 lg:w-5/12 p-4 m-6 hover:bg-gray-200 cursor-pointer select-ape flex flex-col space-y-4">
                          <img
                            src={tokenData.image}
                            alt="Bored Ape"
                            width="240"
                            className="mx-auto"
                          />
                          <div className="flex space-x-4 justify-center items-center">
                            <input
                              type="radio"
                              name="TOKENID"
                              id={tokenData.tokenId}
                              value={tokenData.tokenId}
                              onChange={() =>
                                selectedTokenHandler(tokenData.tokenId, index)
                              }
                            />
                            <div className="font-bold">{`${
                              tokenData.tokenId.match(/(^\w{4})/)[0] === "BAYC"
                                ? "Bored"
                                : "Mutant"
                            } Ape #${tokenData.tokenId.replace(
                              /(^\w{4})-/,
                              ""
                            )}`}</div>
                          </div>
                        </label>
                      ))}
                  </div>
                  <button
                    className="mx-auto md:ml-auto md:mr-0 w-44 p-4 bg-black rounded-full text-white"
                    onClick={() => setIsApeSelect(true)}>
                    Next &gt;
                  </button>
                  <span className="text-sm" style={{ color: "#747474" }}>
                    Don’t see your Ape? Make sure your preferred Ape is in the
                    same wallet as your Golden Ticket NFT.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-16 bg-black text-white">
        SOULNATION, 2021
      </div>
    </div>
  );
}

export default Redeem;
