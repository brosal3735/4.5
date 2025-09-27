/****************************************************
 * CIS213 Unit 4, Guided Practice 3
 * Author: <Your Name Here>
 * Date:   <Date Here>
 ****************************************************/
"use strict";

function canUseSessionStorage() {
  try {
    var testKey = "__test__";
    sessionStorage.setItem(testKey, "1");
    sessionStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

function getEl(id) {
  return document.getElementById(id);
}

function processStorage() {
  var remember = getEl("rememberinput");
  var unameEl  = getEl("usernameinput");

  if (!unameEl || !remember || !canUseSessionStorage()) return;

  if (remember.checked) {
    sessionStorage.setItem("username", unameEl.value);
  } else {
    sessionStorage.removeItem("username");
  }
}

function populateInfo() {
  var unameEl = getEl("usernameinput");
  if (!unameEl || !canUseSessionStorage()) return;

  var saved = sessionStorage.getItem("username");
  if (saved) unameEl.value = saved;
}

function handleSubmit(evt) {
  // Save before the native form submit occurs
  processStorage();
  // Let the browser submit normally (no preventDefault)
}

function createEventListener() {
  var form = document.getElementsByTagName("form")[0];
  if (!form) return;

  if (form.addEventListener) {
    form.addEventListener("submit", handleSubmit, false);
  } else if (form.attachEvent) {
    form.attachEvent("onsubmit", handleSubmit);
  }
}

function setUpPage() {
  populateInfo();
  createEventListener();
}

if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", setUpPage);
}
