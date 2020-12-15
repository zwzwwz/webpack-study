'use strict';

var componnent = require('./component.js');

document.body.appendChild(componnent())

fetch('/xhx_middle/getMessage?channel=1').then(res => {
  // 被代理到 http://debug.xxx.com/device/space
  return res.json();
}).then(res => {
  console.log(res);
})
