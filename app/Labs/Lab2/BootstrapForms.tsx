import React from "react";
import { Form, Button } from "react-bootstrap";

export default function BootstrapForms() {
  return (
    <div>
      <div id="wd-css-styling-forms">
        <h2>Forms</h2>
        <Form>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form>
      </div>

      <div id="wd-css-styling-dropdowns">
        <h3>Dropdowns</h3>
        <Form.Select>
          <option value="0">Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>

      <div id="wd-css-styling-switches">
        <h3>Switches</h3>
        <Form.Check type="switch" label="Unchecked switch checkbox input" />
        <Form.Check type="switch" defaultChecked label="Checked switch checkbox input" />
        <Form.Check type="switch" label="Unchecked disabled switch checkbox input" disabled />
        <Form.Check type="switch" defaultChecked label="Checked disabled switch checkbox input" disabled />
      </div>

      <div id="wd-css-styling-range-and-sliders">
        <h3>Range</h3>
        <Form.Label>Example range</Form.Label>
        <Form.Range min={0} max={5} step={0.5} />
      </div>

      <div id="wd-css-styling-addons">
        <h3>Addons</h3>
        <div className="input-group mb-3">
          <span className="input-group-text">$</span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group">
          <input type="text" className="form-control" />
          <span className="input-group-text">0.00</span>
        </div>
      </div>

      <div id="wd-css-responsive-forms-1">
        <h3>Responsive forms 1</h3>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" defaultValue="email@example.com" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Bio</label>
            <textarea className="form-control" style={{ height: '100px' }}></textarea>
          </div>
        </div>
      </div>

      <div id="wd-css-responsive-forms-2">
        <h3>Responsive forms 2</h3>
        <form>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" placeholder="Email" />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" placeholder="Password" />
            </div>
          </div>
          <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-2">Radios</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="radios" id="radio1" />
                <label className="form-check-label" htmlFor="radio1">first radio</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="radios" id="radio2" />
                <label className="form-check-label" htmlFor="radio2">second radio</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="radios" id="radio3" />
                <label className="form-check-label" htmlFor="radio3">third radio</label>
              </div>
            </div>
          </fieldset>
          <div className="row">
            <div className="col-sm-10 offset-sm-2">
              <Button type="submit">Sign in</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}