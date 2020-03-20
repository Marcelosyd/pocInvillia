import React from "react";
import Styles from "./styles.module.css";

const Header = props => {
  return (
    <header className={Styles.mainHeader}>
      <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center">
        <div className={Styles.logo + " col-lg-12 col-md-12 col-sm-6 col-xs-6"}>
          Star Wars
        </div>
        <div
          className={Styles.subLogo + " col-lg-12 col-md-12 col-sm-6 col-xs-6"}
        >
          Character List
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 input-group">
        <input
          type="text"
          className={Styles.inputSearch + " form-control"}
          placeholder="Search a character"
          onChange={props.handleSearch}
        />
        <div className="input-group-append">
          <button className="btn btn-secondary" type="button">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
