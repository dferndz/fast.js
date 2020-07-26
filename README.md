# fast.js
JQuery like library. Lite, fast and easy.

## Getting started
Add to your html file: <br />
```<script src="http://fastjs.exetech.org/releases/<version>/index.js"></script>```

The version tag matches the release version tag from github releases.

## Using fast.js

Similarly to JQuery, everything in fast.js in done using the $ function.

```javascript
<script>
    $(() => {
      //this is the document ready function
      
      //select all h1 tags and set color to red
      $("h1").css("color", "red");
    })
</script>
```

### .css

The css function accepts two strings: value, key or an object.
```javascript
// setting css attributes
$("p").css("color", "blue");

//passing a css object
$("p").css({
  color: "blue",
  fontSize: "20px"
})

```

When called with no parameters, .css returns a dictionary of css attributes for the selected object, or a list of dictionaries for each html object selected.
```javascript
$("h1").css()
```

### .text

```javascript
$("p").text("Hello world!");

// when called with no parameter, returns the text string or list of texts, if more than one element is found
console.log($("h1").text());
```

### .on

Adds and event listener to the selected item/items.
```javascript
$("button.action").on("click", () => {
  console.log("Clicked");
});
```
The event string could be any [DOM event](https://www.w3schools.com/jsref/dom_obj_event.asp)

### .map

Maps every element selected.
Each object mapped is of type FastNode, which contains all the functions described on here.

```javascript
$(".container").map((element, index) => {
  console.log(`${element.text()} at position ${index}`);
});
```

### .each

Similar to map, but instead of mapping FastNode objects, it will map HTMLElement objects, for direct access to the DOM.

### .hide

Hides every item selected

### .show

Shows every item selected if previously hidden

### .toggleHide

Show item/items if hidden or hide if visible
