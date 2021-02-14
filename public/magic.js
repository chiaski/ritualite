
let items = ["bible", "chemicals", "mirror", "turpentine", "plustrite", "salt", "eggs", "vinegar", "bone marrow", "windowwasher", "bleach", "gas", "vitamins", "cogs", "grime", "muk", "chloroform", "clippings", "seafoam", "memories"];

let actions = ["mixing", "displacing them", "incantation", "chanting", "whisking", "simmering", "imbuing", "condensation", "evaporation", "washing", "merely watching"];

let timers = ["an hour", "a year", "every second for ten seconds", "every time it foams", "every passing decade", "a memory", "a moment", "an epoch", "as long as you'd like", "as long as you'd need"];

// provide options

function addItems(element, count, list){
  
  // get count items from list
  let items = getRandom(list, count);
  for(let i = 0; i < count; i++){
    $("select[name=" + element + "]").append('<option value="' + items[i] + '">' + items[i] + '</option>');
  }
  
}


function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

// items to fill

function refresh(){
  
  $("select[name='item_1']").html("");
  $("select[name='item_2']").html("");
  $("select[name='action']").html("");
  $("select[name='time']").html("");
  
addItems("item_1", 5, items);
addItems("item_2", 5, items);
addItems("action", 3, actions);
addItems("time", 2, timers);
}

refresh();