import { useState, useEffect, useMemo } from "react";
import { useMoralis } from "react-moralis";
import InchModal from "./InchModal";
import useInchDex from "hooks/useInchDex";
import { Button, Card, Image, Input, InputNumber, Modal } from "antd";
import Text from "antd/lib/typography/Text";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useTokenPrice } from "react-moralis";
import { tokenValue } from "helpers/formatters";
import { getWrappedNative } from "helpers/networks";
import './Exchange.scss';

const nativeAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

const chainIds = {
  "0x1": "eth",
  "0x38": "bsc",
  "0x89": "polygon",
};

const getChainIdByName = (chainName) => {
  for (let chainId in chainIds) {
    if (chainIds[chainId] === chainName) return chainId;
  }
};

const IsNative = (address) =>
  address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";


function Exchange({ chain, customTokens = {} }) {

  const { trySwap, tokenList, getQuote } = useInchDex(chain);
  const { Moralis, isInitialized, chainId } = useMoralis();
  const [isFromModalActive, setFromModalActive] = useState(false);
  const [isToModalActive, setToModalActive] = useState(false);
  const [fromToken, setFromToken] = useState();
  const [toToken, setToToken] = useState();
  const [fromAmount, setFromAmount] = useState();
  const [quote, setQuote] = useState();
  const [currentTrade, setCurrentTrade] = useState();
  const { fetchTokenPrice } = useTokenPrice();
  const [tokenPricesUSD, setTokenPricesUSD] = useState({});

  const tokens = useMemo(() => {
    return { ...customTokens, ...tokenList };
  }, [customTokens, tokenList]);

  const fromTokenPriceUsd = useMemo(
    () =>
      tokenPricesUSD?.[fromToken?.["address"]]
        ? tokenPricesUSD[fromToken?.["address"]]
        : null,
    [tokenPricesUSD, fromToken],
  );

  const toTokenPriceUsd = useMemo(
    () =>
      tokenPricesUSD?.[toToken?.["address"]]
        ? tokenPricesUSD[toToken?.["address"]]
        : null,
    [tokenPricesUSD, toToken],
  );

  const fromTokenAmountUsd = useMemo(() => {
    if (!fromTokenPriceUsd || !fromAmount) return null;
    return `~$ ${(fromAmount * fromTokenPriceUsd).toFixed(4)}`;
  }, [fromTokenPriceUsd, fromAmount]);

  const toTokenAmountUsd = useMemo(() => {
    if (!toTokenPriceUsd || !quote) return null;
    return `~$ ${(
      Moralis?.Units?.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals) *
      toTokenPriceUsd
    ).toFixed(4)}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toTokenPriceUsd, quote]);

  // tokenPrices
  useEffect(() => {
    if (!isInitialized || !fromToken || !chain) return null;
    const validatedChain = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(fromToken["address"])
      ? getWrappedNative(validatedChain)
      : fromToken["address"];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price) =>
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [fromToken["address"]]: price["usdPrice"],
        }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, fromToken]);

  useEffect(() => {
    if (!isInitialized || !toToken || !chain) return null;
    const validatedChain = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(toToken["address"])
      ? getWrappedNative(validatedChain)
      : toToken["address"];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price) =>
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [toToken["address"]]: price["usdPrice"],
        }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, toToken]);

  useEffect(() => {
    if (!tokens || fromToken) return null;
    setFromToken(tokens[nativeAddress]);
  }, [tokens, fromToken]);

  const ButtonState = useMemo(() => {
    if (chainIds?.[chainId] !== chain)
      return { isActive: false, text: `Switch to ${chain}` };

    if (!fromAmount) return { isActive: false, text: "Enter an amount" };
    if (fromAmount && currentTrade) return { isActive: true, text: "Swap" };
    return { isActive: false, text: "Select tokens" };
  }, [fromAmount, currentTrade, chainId, chain]);

  useEffect(() => {
    if (fromToken && toToken && fromAmount)
      setCurrentTrade({ fromToken, toToken, fromAmount, chain });
  }, [toToken, fromToken, fromAmount, chain]);

  useEffect(() => {
    if (currentTrade) getQuote(currentTrade).then((quote) => setQuote(quote));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrade]);

  const PriceSwap = () => {
    const Quote = quote;
    if (!Quote || !tokenPricesUSD?.[toToken?.["address"]]) return null;
    if (Quote?.statusCode === 400) return <>{Quote.message}</>;
    console.log(Quote);
    const { fromTokenAmount, toTokenAmount } = Quote;
    const { symbol: fromSymbol } = fromToken;
    const { symbol: toSymbol } = toToken;
    const pricePerToken = parseFloat(
      tokenValue(fromTokenAmount, fromToken["decimals"]) /
      tokenValue(toTokenAmount, toToken["decimals"]),
    ).toFixed(6);
    return (
      <Text className="exchange__text">
        Price:{" "}
        <Text>{`1 ${toSymbol} = ${pricePerToken} ${fromSymbol} ($${tokenPricesUSD[
          [toToken["address"]]
        ].toFixed(6)})`}</Text>
      </Text>
    );
  };

  return (
    <>
      <Card
        className="exchange__card"
        bodyStyle={{ padding: "20px" }}>
        <Card
          className="exchange__card-inner"
          bodyStyle={{ padding: "0.8rem" }}
        >
          <div
            style={{ marginBottom: "5px", fontSize: "14px", color: "#434343" }}
          >
            From
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
            }}
          >
            <div>
              <InputNumber
                bordered={false}
                placeholder="0.00"
                style={{
                  padding: "0",
                  fontWeight: "500",
                  fontSize: "23px",
                  display: "block",
                  width: "100%",
                  marginLeft: "-10px"
                }}
                onChange={setFromAmount}
                value={fromAmount}
              />
              <Text style={{ fontWeight: "600", color: "#434343" }}>
                {fromTokenAmountUsd}
              </Text>
            </div>
            <Button
              className="exchange__btn"
              onClick={() => setFromModalActive(true)}
            >
              {fromToken ? (
                <Image
                  className="exchange__img"
                  src={
                    fromToken?.logoURI ||
                    "https://etherscan.io/images/main/empty-token.png"
                  }
                  alt="nologo"
                  preview={false}
                />
              ) : (
                <span>Select a token</span>
              )}
              <span>{fromToken?.symbol}</span>
              <Arrow />
            </Button>
          </div>
        </Card>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "10px" }}
        >
          <ArrowDownOutlined />
        </div>
        <Card
          className="exchange__card-inner"
          bodyStyle={{ padding: "0.8rem" }}
        >
          <div
            style={{ marginBottom: "5px", fontSize: "14px", color: "#434343" }}
          >
            To
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
            }}
          >
            <div>
              <Input
                className="exchange__input"
                bordered={false}
                placeholder="0.00"
                readOnly
                value={
                  quote
                    ? parseFloat(
                      Moralis?.Units?.FromWei(
                        quote?.toTokenAmount,
                        quote?.toToken?.decimals,
                      ),
                    ).toFixed(6)
                    : ""
                }
              />
              <Text style={{ fontWeight: "600", color: "#434343" }}>
                {toTokenAmountUsd}
              </Text>
            </div>
            <Button
              className="exchange__btn"
              onClick={() => setToModalActive(true)}
              type={toToken ? "default" : "primary"}
            >
              {toToken ? (
                <Image
                  className="exchange__img"
                  src={
                    toToken?.logoURI ||
                    "https://etherscan.io/images/main/empty-token.png"
                  }
                  alt="nologo"
                  preview={false}
                />
              ) : (
                <span>Select a token</span>
              )}
              <span>{toToken?.symbol}</span>
              <Arrow />
            </Button>
          </div>
        </Card>
        {quote && (
          <div>
            <Text
              className="exchange__text"
            >
              Estimated Gas: <Text>{quote?.estimatedGas}</Text>
            </Text>
            <PriceSwap />
          </div>
        )}
        <Button
          type="primary"
          size="large"
          className="exchange__swap"
          onClick={() => trySwap(currentTrade)}
          disabled={!ButtonState.isActive}
        >
          {ButtonState.text}
        </Button>
      </Card>
      <Modal
        title="Select a token"
        visible={isFromModalActive}
        onCancel={() => setFromModalActive(false)}
        bodyStyle={{ padding: 0 }}
        width="450px"
        footer={null}
      >
        <div>
          {/* search */}
          <InchModal
            open={isFromModalActive}
            onClose={() => setFromModalActive(false)}
            setToken={setFromToken}
            tokenList={tokens}
          />
        </div>
      </Modal>
      <Modal
        title="Select a token"
        visible={isToModalActive}
        onCancel={() => setToModalActive(false)}
        bodyStyle={{ padding: 0 }}
        width="450px"
        footer={null}
      >
        <div>
          {/* search */}
          <InchModal
            open={isToModalActive}
            onClose={() => setToModalActive(false)}
            setToken={setToToken}
            tokenList={tokens}
          />
        </div>
      </Modal>
    </>
  );
}

export default Exchange;

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
