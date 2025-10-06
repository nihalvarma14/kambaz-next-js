export default function Float() {
  return (
    <div id="wd-css-float">
      <h2>Float</h2>
      <div>
        <img className="wd-float-left" 
             src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
             alt="Starship"
        />
        <img className="wd-float-right"
             src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
             alt="Starship"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic ...
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic ...
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic ...
        </p>
        <div className="wd-float-done"></div>
      </div>
      
      <div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
          Yellow
        </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
          Blue
        </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
          Red
        </div>
        <img className="wd-float-right"
             src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
             alt="Starship"
        />
        <img className="wd-float-left"
             src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
             alt="Starship"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic ...
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic ...
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic ...
        </p>
      </div>
    </div>
  );
}