import React, { useState, useEffect } from "react"
import { useMoralis } from "react-moralis"
import './BuyCrypto.scss'

function BuyCrypto() {
  const [ramper, setRamper] = useState();
  const { Moralis } = useMoralis();

  useEffect(() => {
    if (!Moralis?.["Plugins"]?.["fiat"]) return null;
    async function initPlugin() {
      Moralis.Plugins.fiat
        .buy({}, { disableTriggers: true })
        .then((data) => setRamper(data.data));
    }
    initPlugin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Moralis.Plugins]);

  return (
    <div className="buycrypto">
      <iframe
        className="buycrypto__iframe"
        src={ramper}
        title="ramper"
        frameBorder="no"
        allow="accelerometer; autoplay; camera; gyroscope; payment;"
      />
    </div>
  );
}

export default BuyCrypto;
