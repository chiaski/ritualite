
let items = ["bible", "chemicals", "mirror", "turpentine", "plustrite", "salt", "eggs", "vinegar", "bone marrow", "windowwasher", "bleach", "gas", "vitamins", "cogs"];

let action = ["mix", "displace", "incantate", "chant", "whisk", "simmer", "wash", "watch"];

let timers = ["for an hour", "for a year", "every second for ten seconds", "every time it foams", "every passing decade"];

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
addItems("item_1", 5, items);