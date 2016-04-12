// ==UserScript==
// @name        yzifier
// @namespace   com.tada5.yzifier
// @description Automatically solve math equations on egzaminatorius.lt
// @downloadURL http://varanauskas.github.io/yzifier/yzifier.user.js
// @updateURL   http://varanauskas.github.io/yzifier/yzifier.user.js
// @icon        http://varanauskas.github.io/yzifier/assets/icon.png
// @include     https://egzaminatorius.lt/app/testas/*
// @version     1.1 "Ka Vilmute"
// @grant       none
// ==/UserScript==

$( document ).ready(function() {
  // Adding custom stylesheet
  $('head').append (
    '<link '
    + 'href="//varanauskas.github.io/yzifier/assets/style.css" '
    + 'rel="stylesheet" type="text/css">'
  );
  
  logConsole('INIT');
  
  $( '.main-menu li.ico-mat' ).after('<li class="small addon"><a target="_blank" href="https://github.com/varanauskas/yzifier/" title="' + GM_info.script.name + ' v(' + GM_info.script.version + ')' + '">' +
    GM_info.script.name +
    '<span class="addon-status">Loading...</span>' +
  '</a></li>');
  
  // Adding WolframAlpha links
  MathJax.Hub.Queue(typeset);
  function typeset() {
    logConsole('Enumerating elements')
    
    MathJax.Hub.Typeset(document.body, addLink);
  }
  function addLink() {
    var jax = MathJax.Hub.getJaxByInputType('math/tex');
    jax.forEach(function(e, i, arr) {
      var ex = i + '/' + (arr.length - 1);
      var url = 'https://www.wolframalpha.com/input/?i=' + encodeURIComponent(parseTeX(e.originalText));
      var html =
          '<a class="addon yzify" target="wolframalpha" href="'+url +'" title="' + GM_info.script.name + " " + ex + '"> yzify <img src="//varanauskas.github.io/yzifier/assets/icon.png" />'+
          '</a>';
      $(html).insertAfter('#'+e.inputID+'-Frame');
      updateStatus('Loading ' + ex + '...');
      logConsole('Loading: ' + ex);
    });
    updateStatus('Ready'); 
    logConsole('END');
  }
 
});

function updateStatus(status) {
  $('.addon-status').text(status);
}

function logConsole(status) {
  console.log(GM_info.script.name + ' v(' + GM_info.script.version + ') | ' + status);
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
  tex = tex.split('{,}').join('.');
  tex = tex.split('\\frac{').join('(');
  tex = tex.split('}{').join(')/(');
  tex = tex.split('}').join(')');
  tex = tex.split('~').join('');
  return tex; 
}