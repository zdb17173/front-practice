
//使用win8主题
// import 'jquery.fancytree/dist/skin-lion/ui.fancytree.less';  // CSS or LESS
import 'jquery.fancytree/dist/skin-win8-xxl/ui.fancytree.css'
//引用fancytree
import {createTree} from 'jquery.fancytree';

//extensions 引用edit扩展，修改node title
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
//引用jquery-ui menu包（右键菜单功能）及css
import 'ui-contextmenu'
import 'jquery-ui/themes/base/all.css';


//tree 数据
var treeData = [
    {title: "item1 with key and tooltip", tooltip: "Look, a tool tip!" },
    {title: "item2: selected on init"},
    {title: "Folder", folder: true, key: "id3",
        children: [
            {title: "Sub-item 3.1",
                children: [
                    {title: "Sub-item 3.1.1", key: "id3.1.1" },
                    {title: "Sub-item 3.1.2", key: "id3.1.2" }
                ]
            },
            {title: "Sub-item 3.2",
                children: [
                    {title: "Sub-item 3.2.1", key: "id3.2.1" },
                    {title: "Sub-item 3.2.2", key: "id3.2.2" }
                ]
            }
        ]
    },
    {title: "Document with some children (expanded on init)", key: "id4", expanded: true,
        children: [
            {title: "Sub-item 4.1 (active on init)",
                children: [
                    {title: "Sub-item 4.1.1", key: "id4.1.1" },
                    {title: "Sub-item 4.1.2", key: "id4.1.2" }
                ]
            },
            {title: "Sub-item 4.2 (selected on init)",
                children: [
                    {title: "Sub-item 4.2.1", key: "id4.2.1" },
                    {title: "Sub-item 4.2.2", key: "id4.2.2" }
                ]
            },
            {title: "Sub-item 4.3 (hideCheckbox)"},
            {title: "Sub-item 4.4 (unselectable)", unselectable: true }
        ]
    },
    {title: "Lazy folder", folder: true, lazy: true }
];

$(function(){
    $("#tree").fancytree({
         extensions: ["edit"],
//         checkbox: true,//开启复选功能
        edit: {
            triggerStart: ["clickActive", "dblclick", "f2", "mac+enter", "shift+click"],
            beforeEdit: function(event, data){
                // Return false to prevent edit mode
            },
            edit: function(event, data){
                // Editor was opened (available as data.input)
            },
            beforeClose: function(event, data){
                // Return false to prevent cancel/save (data.input is available)
                console.log(event.type, event, data);
                if( data.originalEvent.type === "mousedown" ) {
                    // We could prevent the mouse click from generating a blur event
                    // (which would then again close the editor) and return `false` to keep
                    // the editor open:
//                  data.originalEvent.preventDefault();
//                  return false;
                    // Or go on with closing the editor, but discard any changes:
//                  data.save = false;
                }
            },
            save: function(event, data){
                // Save data.input.val() or return false to keep editor open
                console.log("save...", this, data);
                // Simulate to start a slow ajax request...
                setTimeout(function(){
                    $(data.node.span).removeClass("pending");
                    // Let's pretend the server returned a slightly modified
                    // title:
                    data.node.setTitle(data.node.title + "!");
                }, 2000);
                // We return true, so ext-edit will set the current user input
                // as title
                return true;
            },
            close: function(event, data){
                // Editor was removed
                if( data.save ) {
                    // Since we started an async request, mark the node as preliminary
                    $(data.node.span).addClass("pending");
                }
            }
        },
        selectMode: 1,
        source: treeData,
        activate: function(event, data) {
            $("#echoActive1").text(data.node.title);
        },
        select: function(event, data) {
            // Display list of selected nodes
            var s = data.tree.getSelectedNodes().join(", ");
            $("#echoSelection1").text(s);
        },
        dblclick: function(event, data) {
            data.node.toggleSelected();
        },
        tooltip: function(event, data) {
            // Create dynamic tooltips
            return data.node.title + " (" + data.node.key + ")";
        },
        keydown: function(event, data) {
            if( event.which === 32 ) {
                data.node.toggleSelected();
                return false;
            }
        }
    });


    /*$("#tree").fancytree({
        source: [
            {title: "Node 1", key: "1"},
            {title: "Folder 2", key: "2", folder: true, children: [
                    {title: "Node 2.1", key: "3"},
                    {title: "Node 2.2", key: "4"}
                ]}]
    });*/

    $("#tree").contextmenu({
        delegate: "span.fancytree-node",
        menu: [
            {title: "Delete <kbd>[Del]</kbd>", cmd: "delete", uiIcon: "ui-icon-trash" },
            {title: "----"},
            {title: "New child <kbd>[Ctrl+Shift+N]</kbd>", cmd: "addChild", uiIcon: "ui-icon-arrowreturn-1-e" }
        ],
        beforeOpen: function(event, ui) {
            var node = $.ui.fancytree.getNode(ui.target);
            $("#tree").contextmenu("enableEntry", "paste");
            node.setActive();
        },
        select: function(event, ui) {

            if (!ui.cmd){
                return;
            }else if(ui.cmd == "addChild"){
                addChild();
            }else if(ui.cmd == "delete"){
                deleteNode();
            }

            /*var that = this;
            // delay the event, so the menu can close and the click event does
            // not interfere with the edit control
            setTimeout(function(){
                $(that).trigger("nodeCommand", {cmd: ui.cmd});
            }, 100);*/
        }
    });
});

function deleteNode(){
    var node = $("#tree").fancytree("getActiveNode");
    if( !node ) {
        alert("Please activate a parent node.");
        return;
    }
    node.remove();
}

function addChild(){
    var node = $("#tree").fancytree("getActiveNode");
    if( !node ) {
        alert("Please activate a parent node.");
        return;
    }
    node.editCreateNode("child", "Node title");
}
