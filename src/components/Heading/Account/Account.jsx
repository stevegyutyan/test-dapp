import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import Blockie from "../../Blockie";
import { Button, Card, Modal } from "antd";
import { useState } from "react";
import Address from "../../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
import { connectors } from "./config";
import './Account.scss';

const Account = () => {

  const { authenticate, isAuthenticated, account, chainId, logout } = useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  if (!isAuthenticated || !account) {
    return (
      <>
        <button
          className="account__auth"
          onClick={() => setIsAuthModalVisible(true)}>
          Authenticate
        </button>
        <Modal
          className="account__modal"
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          width="340px"
        >
          <div className="account__connect">Connect Wallet</div>
          <div className="account__wallets">
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                className="account__connector"
                key={key}
                onClick={async () => {
                  try {
                    await authenticate({ provider: connectorId });
                    window.localStorage.setItem("connectorId", connectorId);
                    setIsAuthModalVisible(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <img className="account__icon" src={icon} alt={title} />
                <p style={{ fontSize: "14px" }}>{title}</p>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div className="account" onClick={() => setIsModalVisible(true)}>
        <p>{getEllipsisTxt(account, 6)}</p>
        <Blockie currentWallet scale={3} />
      </div>
      <Modal
        className="account__modal"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}/address/${account}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          className="account__btn"
          size="large"
          type="primary"
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
