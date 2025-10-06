export default function Positions() {
  return (
    <div>
      <h2>Position</h2>
      <div id="wd-css-position-relative">
        <h3>Relative</h3>
        <div className="wd-bg-color-gray">
          <div className="wd-bg-color-yellow wd-dimension-portrait">
            <div className="wd-pos-relative-nudge-up-right">
              Portrait
            </div>
          </div>
          <div className="wd-pos-relative-nudge-down-right wd-bg-color-blue wd-fg-color-white wd-dimension-landscape">
            Landscape
          </div>
          <div className="wd-pos-relative wd-bg-color-red wd-dimension-square">
            Square
          </div>
        </div>
      </div>

      <div id="wd-css-position-absolute">
        <h3>Absolute position</h3>
        <div className="wd-pos-relative-container wd-bg-color-gray">
          <div className="wd-pos-absolute-10-10 wd-bg-color-yellow wd-dimension-portrait">
            Portrait
          </div>
          <div className="wd-pos-absolute-50-50 wd-bg-color-blue wd-fg-color-white wd-dimension-landscape">
            Landscape
          </div>
          <div className="wd-pos-absolute-120-20 wd-bg-color-red wd-dimension-square">
            Square
          </div>
        </div>
      </div>

      <div id="wd-css-position-fixed">
        <h3>Fixed position</h3>
        <div>
          Checkout the blue square that says Fixed position stuck all the way on the right and half
          way down the page. It doesn't scroll with the rest of the page. Its position is fixed.
          <div className="wd-pos-fixed wd-dimension-square wd-bg-color-blue wd-fg-color-white">
            Fixed position
          </div>
        </div>
      </div>
    </div>
  );
}