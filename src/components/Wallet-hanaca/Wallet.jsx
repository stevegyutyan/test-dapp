import Transfer from "./components/Transfer";
import NativeBalance from "../HeaderMenu/NativeBalance";
import Address from "../Address/Address";
import Blockie from "../Blockie";
import { Card } from "antd";
// import { styles } from './styles';
import './Wallet.scss'

function Wallet() {
  return (
    <Card
      className="wallet"
      // style={styles.card}
      title={
        <div className="wallet__header">
          <Blockie scale={5} avatar currentWallet style />
          <Address size="6" copyable />
          <NativeBalance />
        </div>
      }
    >
      <Transfer />
    </Card>
  );
}

export default Wallet;
