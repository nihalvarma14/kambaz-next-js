export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>
      <h4>Venkata Sai Siva Nihalvarma Pericherla</h4>
      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1"> ... </p>
        <p id="wd-p-2">
This is the first paragraph. The paragraph tag is used to format
vertical gaps between long pieces of text like this one.
        </p>
        <p id="wd-p-3">
This is the second paragraph. Even though there is a deliberate white
gap between the paragraph above and this paragraph, by default
browsers render them as one contiguous piece of text as shown here on
the right.
        </p>
        <p id="wd-p-4">
This is the third paragraph. Wrap each paragraph with the paragraph
tag to tell browsers to render the gaps.
        </p>
      </div>
      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag</h5>
        How to make pancakes:
        <ol id="wd-pancakes">
            <li>Mix dry ingredients.</li>
            <li>Add wet ingredients.</li>
            <li>Stir to combine.</li>
            <li>Heat a skillet or griddle.</li>
            <li>Pour batter onto the skillet.</li>
            <li>Cook until bubbly on top.</li>
            <li>Flip and cook the other side.</li>
            <li>Serve and enjoy!</li>
        </ol>
        My favourite recipe:
        <ol id="wd-your-favorite-recipe">
            <li>Take and boil buldak carbonara noodles</li>
            <li>Drain the water</li>
            <li>Open the seasoning packet</li>
            <li>Mix the seasoning with the boiled noodles</li>
            <li>Add cheese</li>
            <li>Add an egg</li>
            <li>Stir fry</li>
            <li>Serve it hot</li>
        </ol>
        <h5>Unordered List Tag</h5>
        My favorite books (in no particular order)
        <ul id="wd-my-books">
        <li>Dune</li>
        <li>Lord of the Rings</li>
        <li>Ender's Game</li>
        <li>Red Mars</li>
        <li>The Forever War</li>
        </ul>
        Your favorite books (in no particular order)
        <ul id="wd-your-books">
        <li>The Diary of a Wimpy Kid</li>
        <li>Mahabharata</li>
        <li>Atomic Habits</li>
        <li>Ikigai</li>
        <li>Maze Runner</li>
        </ul>
        <div id="wd-tables">
        <h6>Table Tag</h6>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>HTML</td>
              <td>2/3/21</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>CSS</td>
              <td>2/10/21</td>
              <td>90</td>
            </tr>
            <tr>
                <td>Q3</td>
                <td>React</td>
                <td>12/12/21</td>
                <td>93</td>
            </tr>
            <tr>
                <td>Q4</td>
                <td>Javascript</td>
                <td>2/10/21</td>
                <td>91</td>
            </tr>
            <tr>
                <td>Q5</td>
                <td>Frontend</td>
                <td>22/10/21</td>
                <td>99</td>
            </tr>
            <tr>
                <td>Q6</td>
                <td>Backend</td>
                <td>23/10/21</td>
                <td>95</td>
            </tr>
            <tr>
                <td>Q7</td>
                <td>Database Management</td>
                <td>24/10/21</td>
                <td>98</td>
            </tr>
            <tr>
                <td>Q8</td>
                <td>User Interface</td>
                <td>25/10/21</td>
                <td>100</td>
            </tr>
            <tr>
                <td>Q9</td>
                <td>Design elements</td>
                <td>26/10/21</td>
                <td>74</td>
            </tr>
            <tr>
                <td>Q10</td>
                <td>Product development</td>
                <td>7/10/21</td>
                <td>88</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td>90</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div id = "wd-images">
        <h4>Image Tag</h4>
        Loading an image from the internet: <br />
        <img id = "wd-starship" width = "400px" src = "https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
      <br />
      Loading a local image: <br />
        <img id = "wd-teslabot" src="/images/teslabot.jpg" height = "200px" /> </div>
      </div>
      <div id="wd-forms">
  <h4>Form Elements</h4>
  <form id="wd-text-fields">
    <h5>Text Fields</h5>
    <label htmlFor="wd-text-fields-username">Username:</label>
    <input placeholder="jdoe" id="wd-text-fields-username" /> <br />
    <label htmlFor="wd-text-fields-password">Password:</label>
    <input type="password" defaultValue="123@#$asd"
           id="wd-text-fields-password" /><br />
    <label htmlFor="wd-text-fields-first-name">First name:</label>
    <input type="text" title="John" id="wd-text-fields-first-name" /> <br />
    <label htmlFor="wd-text-fields-last-name">Last name:</label>
    <input type="text" placeholder="Doe"
           defaultValue="Wonderland"
           title="The last name"
           id="wd-text-fields-last-name" />
    {/* copy rest of form elements here  */}
  </form>
  <h5>Text boxes</h5>
<label>Biography:</label><br/>
<textarea 
  id="wd-textarea" 
  cols={30} 
  rows={10}
  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
/>


<h5 id="wd-radio-buttons">Radio buttons</h5>

<label>Favorite movie genre:</label><br />

<input type="radio" name="radio-genre" id="wd-radio-comedy"/>
<label htmlFor="wd-radio-comedy">Comedy</label><br />

<input type="radio" name="radio-genre" id="wd-radio-drama"/>
<label htmlFor="wd-radio-drama">Drama</label><br />

<input type="radio" name="radio-genre" id="wd-radio-scifi"/>
<label htmlFor="wd-radio-scifi">Science Fiction</label><br />
<input type="radio" name="radio-genre" id="wd-radio-fantasy"/>
<label htmlFor="wd-radio-fantasy">Fantasy</label>


<h5 id="wd-checkboxes">Checkboxes</h5>
<label>Favorite movie genre:</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
<label htmlFor="wd-chkbox-comedy">Comedy</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
<label htmlFor="wd-chkbox-drama">Drama</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
<label htmlFor="wd-chkbox-scifi">Science Fiction</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
<label htmlFor="wd-chkbox-fantasy">Fantasy</label>

<h4 id="wd-dropdowns">Dropdowns</h4>

<h5>Select one</h5>
<label  htmlFor="wd-select-one-genre"> Favorite movie genre: </label><br/>
<select id="wd-select-one-genre">
   <option value="COMEDY">Comedy</option>
   <option value="DRAMA">Drama</option>
   <option defaultValue ="SCIFI">
       Science Fiction</option>
   <option value="FANTASY">Fantasy</option>
</select>

<h5>Select many</h5>
<label  htmlFor="wd-select-many-genre"> Favorite movie genres: </label><br/>
<select multiple id="wd-select-many-genre">
   <option value="COMEDY">Comedy</option>
   <option value="DRAMA">Drama</option>
   <option value="SCIFI"> Science Fiction</option>
   <option value="FANTASY">Fantasy</option>
</select>


<h4>Other HTML field types</h4>

<label htmlFor="wd-text-fields-email"> Email: </label>
<input type="email"
       placeholder="jdoe@somewhere.com"
       id="wd-text-fields-email"/><br/>

<label htmlFor="wd-text-fields-salary-start"> Starting salary:</label>
<input type="number"
       defaultValue="100000"
       placeholder="1000"
       id="wd-text-fields-salary-start"/><br/>

<label htmlFor="wd-text-fields-rating"> Rating: </label>
<input type="range"
       defaultValue="4"
       max="5"
       placeholder="Doe"
       id="wd-text-fields-rating"/><br/>

<label htmlFor="wd-text-fields-dob"> Date of birth: </label>
<input type="date"
       defaultValue="2000-01-21"
       id="wd-text-fields-dob"/><br/>

<h4>Anchor tag</h4>
Please
<a href="https://www.lipsum.com" id="wd-lipsum">click here</a>
to get dummy text<br/>


</div>

    </div>
);}


