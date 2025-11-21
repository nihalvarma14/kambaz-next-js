export default function Corners() {
  return (
    <div id="wd-css-corners">
      <h2>Corners</h2>
      <p className="wd-rounded-corners-top wd-border-fat wd-border-red wd-border-solid wd-bg-color-yellow">
        Rounded corners on the top
      </p>
      <p className="wd-rounded-corners-bottom wd-border-fat wd-border-blue wd-border-solid wd-bg-color-yellow">
        Rounded corners on the bottom
      </p>
      <p className="wd-rounded-corners-all-around wd-border-fat wd-border-yellow wd-border-solid wd-bg-color-blue wd-fg-color-white">
        Rounded corners all around
      </p>
      <p className="wd-circle wd-border-fat wd-border-green wd-border-solid wd-bg-color-yellow">
        Circle
      </p>
    </div>
  );
}