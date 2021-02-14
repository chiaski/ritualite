// client-side js
// run by the browser each time your view template referencing it is loaded

const acts = [];

// define variables that reference elements on our page
const form = document.forms[0];

const dreamsList = document.getElementById("rituals");
const clearButton = document.querySelector('#clear-dreams');

// request the dreams from our app's sqlite database
fetch("/getDreams", {})
  .then(res => res.json())
  .then(response => {
    response.forEach(row => {
      appendNewDream(row.dream);
    });
  });

// a helper function that creates a list item for a given dream
const appendNewDream = dream => {
  const newListItem = document.createElement("li");
  newListItem.innerText = dream;
  dreamsList.appendChild(newListItem);
};

// listen for the form to be submitted and add a new dream when it is
form.onsubmit = event => {
  // stop our form submission from refreshing the page

  event.preventDefault();
var dreamInput = "i put the " + $("select[name=item_1] option:selected").val() + " and " + $("select[name=item_2] option:selected").val() + " by " + $("select[name=action] option:selected").val() + " for " + $("select[name=time] option:selected").val();
  

  const data = { dream: dreamInput };
  console.log(dreamInput);

  fetch("/addDream", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
    });
  // get dream value and add it to the list
  acts.push(dreamInput);
  appendNewDream(dreamInput);
  
  refresh();

};

// Remove all
// clearButton.addEventListener('click', event => {
//   fetch("/clearDreams", {})
//     .then(res => res.json())
//     .then(response => {
//       console.log("cleared dreams");
//     });
//   dreamsList.innerHTML = "";
// });
