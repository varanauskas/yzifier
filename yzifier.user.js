// ==UserScript==
// @name        yzifier
// @namespace   com.tada5.yzifier
// @description Automatically solve math equations on egzaminatorius.lt
// @include     https://egzaminatorius.lt/app/testas/*
// @version     0.1
// @grant       none
// ==/UserScript==

$( document ).ready(function() {
  $("head").append (
    '<link '
    + 'href="//varanauskas.github.io/yzifier/style.css" '
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
  
  console.log(fullName);
  $( '.main-menu li.ico-mat' ).after('<li class="small addon">' +
    fullName +
    '<span class="addon-status">Loading...</span>' +
  '</li>');
  
  window.setTimeout(function() {
    $('script[type="math/tex"]').each(function (i, obj) {
      $(this).after('<span class="addon-tex no-mathjax">' + i + " | " + $(this).html() + "</span>");
    });
    updateStatus("Ready");
  }, 500);
  
  
  console.log(fullName + ' finished');
});

function updateStatus(status) {
  $('.addon-status').html(status);
}

function parseTeX(text) {
  //if (text.includes())
}