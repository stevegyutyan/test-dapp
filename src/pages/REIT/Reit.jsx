import { Card, Form, notification } from "antd";
import { useMemo, useState } from "react";
import Address from "components/Address/Address";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import ContractMethods from "./ContractMethods";
import ContractResolver from "./ContractResolver";
import './Reit.scss'

export default function Reit() {
  const { Moralis, chainId } = useMoralis();
  const [responses, setResponses] = useState({});
  const [contract, setContract] = useState();

  const { data } = useMoralisQuery("Events", (query) => query, [], {
    live: true,
  });

  const displayedContractFunctions = useMemo(() => {
    if (!contract?.abi) return [];
    return contract.abi.filter((method) => method["type"] === "function");
  }, [contract]);

  const isDeployedToActiveChain = useMemo(() => {
    if (!contract?.networks) return undefined;
    return [parseInt(chainId, 16)] in contract.networks;
  }, [contract, chainId]);

  const contractAddress = useMemo(() => {
    if (!isDeployedToActiveChain) return null;
    return contract.networks[parseInt(chainId, 16)]?.["address"] || null;
  }, [chainId, contract, isDeployedToActiveChain]);

  const openNotification = ({ message, description }) => {
    notification.open({
      placement: "bottomRight",
      message,
      description,
    });
  };

  return (
    <div
      className="reit"
    >
      <Card
        className="reit__card"
        title={
          <div
            className="reit__div"
          >
            Your contract: {contract?.contractName}
            <Address
              avatar="left"
              copyable
              address={contractAddress}
              size={8}
              style={{}}
            />
          </div>
        }
        size="large"
      >
        <ContractResolver setContract={setContract} contract={contract} />

        {isDeployedToActiveChain === true && (
          <Form.Provider
            onFormFinish={async (name, { forms }) => {
              const params = forms[name].getFieldsValue();

              let isView = false;
              // eslint-disable-next-line no-unsafe-optional-chaining
              for (let method of contract?.abi) {
                if (method.name !== name) continue;
                console.log(method);
                if (method.stateMutability === "view") isView = true;
              }

              const options = {
                contractAddress,
                functionName: name,
                abi: contract?.abi,
                params,
              };

              if (!isView) {
                const tx = await Moralis.executeFunction({
                  awaitReceipt: false,
                  ...options,
                });
                tx.on("transactionHash", (hash) => {
                  setResponses({
                    ...responses,
                    [name]: { result: null, isLoading: true },
                  });
                  openNotification({
                    message: "🔊 New Transaction",
                    description: `${hash}`,
                  });
                  console.log("🔊 New Transaction", hash);
                })
                  .on("receipt", (receipt) => {
                    setResponses({
                      ...responses,
                      [name]: { result: null, isLoading: false },
                    });
                    openNotification({
                      message: "📃 New Receipt",
                      description: `${receipt.transactionHash}`,
                    });
                    console.log("🔊 New Receipt: ", receipt);
                  })
                  .on("error", (error) => {
                    console.error(error);
                  });
              } else {
                console.log("options22", options);
                Moralis.executeFunction(options).then((response) =>
                  setResponses({
                    ...responses,
                    [name]: { result: response, isLoading: false },
                  }),
                );
              }
            }}
          >
            <ContractMethods
              displayedContractFunctions={displayedContractFunctions}
              responses={responses}
            />
          </Form.Provider>
        )}
        {isDeployedToActiveChain === false && (
          <>{`The contract is not deployed to the active ${chainId} chain. Switch your active chain or try agan later.`}</>
        )}
      </Card>
      <Card
        className="reit__card-small"
        title={"Contract Events"}
        size="large"
      >
        {data.map((event, key) => (
          <Card
            title={"Transfer event"}
            size="small"
            style={{ marginBottom: "20px" }}
            key={key}
          >
            {getEllipsisTxt(event.attributes.transaction_hash, 14)}
          </Card>
        ))}
      </Card>
    </div>
  );
}
