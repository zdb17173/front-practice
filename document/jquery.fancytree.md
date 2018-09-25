
# jquery.fancytree


[fancytree demo](http://wwwendt.de/tech/fancytree/demo/#sample-ext-table.html)

[fancytree git](https://github.com/mar10/fancytree)

## install

安装fancytree：`npm install jquery.fancytree`

安装右键menu组件：`npm install ui-contextmenu`

安装menu依赖jquery-ui：`npm install jquery-ui`

## hello world

tree.html
```html
<div id="tree"></div>
```

tree.js
```javascript

var treeData = [
    {title: "item1 with key and tooltip", tooltip: "Look, a tool tip!" },
    {title: "item1 with key and tooltip", tooltip: "Look, a tool tip!" }
];

$(function(){
    $("#tree").fancytree({
        extensions: ["add", "edit", "delete"],
        selectMode: 1,
        source: treeData
    });
});
```