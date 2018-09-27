

# marked

## install
```bash
npm install marked
```

## usage

加载marked，使用高亮处理
```javascript

$(function() {
  var myMarked = require('marked');
      myMarked.setOptions({
          renderer: new myMarked.Renderer(),
          highlight: function(code) {
              var s =  hljs.highlightAuto(code).value;
              return s;
          },
          pedantic: false,
          gfm: true,
          tables: true,
          breaks: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
          xhtml: false
      });
  
  document.getElementById('content').innerHTML = myMarked(str);
});

```


# highlight

markdown语法高亮库，用于高亮`<pre><code>...</code></pre>`
中的代码
## install
```bash
npm install highlight.js
```



## usage

添加依赖,注册语法解析器
```javascript
import 'highlight.js/styles/dracula.css'

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
```

初始化（必须有）
```javascript
$(function() {
  hljs.initHighlightingOnLoad();
});
```


使用web workes添加高亮
```javascript
onmessage = function(event) {
  importScripts('<path>/highlight.pack.js');
  var result = self.hljs.highlightAuto(event.data);
  postMessage(result.value);
}
```

使用初始化方式，直接初始化代码高亮
```javascript
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
```
