// ==UserScript==
// @name        yzifier
// @namespace   com.tada5.yzifier
// @description Automatically solve math equations on egzaminatorius.lt
// @downloadURL http://varanauskas.github.io/yzifier/yzifier.user.js
// @updateURL   http://varanauskas.github.io/yzifier/yzifier.user.js
// @icon        http://varanauskas.github.io/yzifier/assets/icon.png
// @require     http://varanauskas.github.io/yzifier/assets/algebra.min.js
// @include     https://egzaminatorius.lt/app/testas/*
// @version     1.0 "Ka Vilmute"
// @grant       none
// ==/UserScript==

var Expression = algebra.Expression;
var Equation = algebra.Equation;

$( document ).ready(function() {
  $("head").append (
    '<link '
    + 'href="//varanauskas.github.io/yzifier/assets/style.css" '
    + 'rel="stylesheet" type="text/css">'
  );
  $("body").append(
    '<script type="text/x-mathjax-config">'
    + ' MathJax.Hub.Config({'
    + '   tex2jax: {'
    + '     ignoreClass: "no-mathjax"'
    + '   }'
    + ' });'
    + '</script>'
  );
  
  var fullName = GM_info.script.name + " v" + GM_info.script.version;

  
  console.log(fullName + ' started');
  $( '.main-menu li.ico-mat' ).after('<li class="small addon toggle">' +
    fullName +
    '<span class="addon-status">Loading...</span>' +
  '</li>');
  
  window.setTimeout(function() {
    /*
    $('script[type="math/tex"]').each(function (i, obj) {
      var tex = $(this).text();
      var plain = parseTeX(tex);
      $(this).after('<span style="background-color: green; padding: 5px;" class="addon-tex no-mathjax">' + plain + "</span>");
    });
    */
    
    MathJax.Hub.Queue(typeset);

    function typeset() {
      MathJax.Hub.Typeset(document.body, addLink);
    }

    function addLink() {
      var jax = MathJax.Hub.getJaxByInputType("math/tex");
      jax.forEach(function(e) {
        var cls = 'toWolframAlpha' + (e.HTMLCSS.display ? ' display' : '');
        var text = '&spades;';
        var title = 'Result';
        var target = 'wolframalpha';
        var url = 'https://www.wolframalpha.com/input/?i=' + encodeURIComponent(e.originalText);
        var html =
          '<span class="'+cls+'">'+
          '<a href="'+url +'" target="'+target+'" title="'+title+'">'+text+
          '</a></span>';
        $(html).insertAfter("#"+e.inputID+"-Frame");
      });
    }
    
    updateStatus("Ready");
  }, 1000);
  
  
  console.log(fullName + ' finished');
  
  
});

function updateStatus(status) {
  $('.addon-status').text(status);
}

function parseTeX(tex) {
  tex = tex.split('\\'+'\\').join(',');
  tex = tex.split('\\begin{cases}').join('');
  tex = tex.split('\\end{cases}').join('');
  tex = tex.split(' -').join('-');
  tex = tex.split(' - ').join('-');
  tex = tex.split('- ').join('-');
  tex = tex.split(' +').join('+');
  tex = tex.split(' + ').join('+');
  tex = tex.split('- ').join('+');
  //tex = tex.split(':').join('/');
  tex = tex.split('\\frac{').join('(');
  tex = tex.split('}{').join('/');
  tex = tex.split('}').join(')');
  return tex; 
}