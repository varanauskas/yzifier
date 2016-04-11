// ==UserScript==
// @name        yzifier
// @namespace   com.tada5.yzifier
// @description Automatically solve math equations on egzaminatorius.lt
// @downloadURL http://varanauskas.github.io/yzifier/yzifier.user.js
// @updateURL   http://varanauskas.github.io/yzifier/yzifier.user.js
// @icon        http://varanauskas.github.io/yzifier/assets/icon.png
// @require     http://varanauskas.github.io/yzifier/assets/algebra.min.js
// @include     https://egzaminatorius.lt/app/testas/*
// @version     0.1
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
  $( '.main-menu li.ico-mat' ).after('<li class="small addon">' +
    fullName +
    '<span class="addon-status">Loading...</span>' +
  '</li>');
  
  window.setTimeout(function() {
    $('script[type="math/tex"]').each(function (i, obj) {
      var tex = $(this).text();
      var plain = parseTeX(tex);
      $(this).after('<span class="addon-tex no-mathjax">' + i + " | " + plain + "</span>");
    });
    updateStatus("Ready");
  }, 500);
  
  
  console.log(fullName + ' finished');
});

function updateStatus(status) {
  $('.addon-status').text(status);
}

function parseTeX(tex) {
  tex = tex.replace(' \\'+'\\', ',');
  tex = tex.replace('\\begin{cases}', '');
  tex = tex.replace('\\end{cases}', '');
  tex = tex.replace(' -', '-');
  tex = tex.replace(' - ', '-');
  tex = tex.replace('- ', '-');
  tex = tex.replace(' +', '+');
  tex = tex.replace(' + ', '+');
  tex = tex.replace('- ', '+');
  return tex; 
}

function wolframSolve(eq) {
  $ajax({
    type: "GET",
    url: "http://api.wolframalpha.com/v2/query?input=" + encodeURIComponent(eq) + "&appid=HTYY68-H55RW2Q3A6",
    cache: false,
    dataType: "xml",
    success: function(xml) {
      $(xml).find()
    }
  });
}