import React from "react";
import SearchBar from "../components/searchBar";
import menu from "../icons/menu.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from "./main";
import TechOptions from "./techOptions";

var MenuIconClickCount = 0;

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      headStyle: {},
      rotateDeg: 0,
      menuMove: -999,
      menuSlideDown: -200,
      searchValue: ""
    };
  }

  mouseLeave = () => {
    MenuIconClickCount % 2 !== 0 && MenuIconClickCount++;
    var degChange = 0;
    var slide = 0;
    var move = 0;
    MenuIconClickCount % 2 !== 0 ? (slide = -5) : (slide = -200);
    MenuIconClickCount % 2 === 0 ? (degChange = 0) : (degChange = -90);
    MenuIconClickCount % 2 !== 0 ? (move = 60) : (move = -999);

    this.setState({
      menuClick: false,
      rotateDeg: degChange,
      menuSlideDown: slide,
      menuMove: move
    });
  };

  rotateMenuIcon = () => {
    MenuIconClickCount++;
    var degChange = 0;
    var slide = 0;
    var move = 0;

    MenuIconClickCount % 2 !== 0 ? (degChange = 90) : (degChange = -90);
    MenuIconClickCount % 2 !== 0 ? (slide = -85) : (slide = -200);
    MenuIconClickCount % 2 !== 0 ? (move = 60) : (move = -999);

    this.setState(preState => {
      return {
        menuClick: !preState.menuClick,
        rotateDeg: preState.rotateDeg + degChange,
        menuSlideDown: slide,
        menuMove: move
      };
    });
  };

  onSearch = e => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    return (
      <Router>
        <header onMouseLeave={this.mouseLeave} style={this.state.headStyle}>
          <h1>
            <Link to="/fedhub_beta/">FEDHUB</Link>
          </h1>
          <img
            id="smallest-screen-menu"
            alt="menu"
            src={menu}
            style={{ transform: `rotate(${this.state.rotateDeg}deg)` }}
            onClick={this.rotateMenuIcon}
          />
          {window.innerWidth < 600 ? (
            <div
              id="smallest-screen"
              style={{ top: `${this.state.menuMove}px` }}
            >
              <div id="tech-kind">
                <ul style={{ top: `${this.state.menuSlideDown}px` }}>
                  <li>
                    <Link to="/fedhub_beta/Html&CSS">Html&CSS</Link>
                  </li>
                  <li>
                    <Link to="/fedhub_beta/JavaScript">JavaScript</Link>
                  </li>
                  <li>
                    <Link to="/fedhub_beta/React">React</Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <TechOptions />
          )}
          <Route
            render={({ history }) => (
              <SearchBar
                value={this.state.searchValue}
                onSearch={this.onSearch}
                onSubmit={e => {
                  history.push(`/fedhub_beta/?search=${this.state.searchValue}`);
                  e.preventDefault();
                  console.log(`history type: ${typeof history}`);
                }}
              />
            )}
          />
        </header>
        <Route path="/:name?" component={Main} />
      </Router>
    );
  }
}
