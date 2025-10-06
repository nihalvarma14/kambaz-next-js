import React from "react";

export default function BootstrapNavigation() {
  return (
    <div>
      <div id="wd-css-navigating-with-tabs">
        <h2>Tabs</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="/Labs/Lab2/active">Active</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Labs/Lab2/Link1">Link 1</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Labs/Lab2/Link2">Link 2</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="/Labs/Lab2/Disabled">Disabled</a>
          </li>
        </ul>
      </div>

      <div id="wd-css-navigating-with-cards">
        <h2>Cards</h2>
        <div className="card" style={{ width: '18rem' }}>
          <img src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" className="card-img-top" alt="Stacking Starship" />
          <div className="card-body">
            <h5 className="card-title">Stacking Starship</h5>
            <p className="card-text">
              Stacking the most powerful rocket in history. Mars or bust!
            </p>
            <button className="btn btn-primary">Boldly Go</button>
          </div>
        </div>
      </div>
    </div>
  );
}