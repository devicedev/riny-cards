import React from "react";

import { DecksMenu } from "..";
import DecksContainer from "../decks-container/decks-container.component";

import "./decks-tab.styles.css";

const DecksTab = () => {
  return (
    <div className={"decks-tab"}>
      <DecksMenu />
      <DecksContainer />
    </div>
  );
};

export default DecksTab;
