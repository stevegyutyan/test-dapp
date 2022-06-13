import React, { useState } from "react"
import Search from "antd/lib/input/Search"
import './InchModal.scss'

function InchModal({ open, onClose, setToken, tokenList = [] }) {

  const [searchTerm, setSearchTerm] = useState("")
  // console.log(tokenList)
  if (!open) return null;

  return (
    <div className="inchmodal">
      <Search
        placeholder="Search..."
        onChange={e => { setSearchTerm(e.target.value) }}
      // enterButton
      />
      {!tokenList
        ? null
        // eslint-disable-next-line array-callback-return
        : Object.keys(tokenList).filter((val) => {
          if (searchTerm === "") {
            return val
          } else if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
          }
        }).map((token, index) => (
          <div
            className="inchmodal__token"
            onClick={() => {
              setToken(tokenList[token]);
              onClose();
            }}
            key={index}
          >
            <img
              className="inchmodal__img"
              src={tokenList[token].logoURI}
              alt="noLogo"
            />
            <div>
              <h4>{tokenList[token].name}</h4>
              <span
                className="inchmodal__span"
              >
                {tokenList[token].symbol}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default InchModal;
