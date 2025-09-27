/****************************************************
 * CIS213 Unit 4, Guided Practice 3
 ****************************************************/
"use strict";

function canUseSessionStorage() {
  try {
    var k = "__test__";
    sessionStorage.setItem(k, "1");
    sessionStorage.removeItem(k);
    return true;
  } catch (e) { return false; }
}

function $(id) { return document.getElementById(id); }

function saveIfRemembered() {
  if (!canUseSessionStorage()) return;
  var remember = $("rememberinput");
  var unameEl  = $("usernameinput");
  if (!remember || !unameEl) return;

  if (remember.checked) {
    sessionStorage.setItem("username", unameEl.value || "");
  } else {
    sessionStorage.removeItem("username");
  }
}

function populateFromStorage() {
  if (!canUseSessionStorage()) return;
  var unameEl  = $("usernameinput");
  var remember = $("rememberinput");
  if (!unameEl || !remember) return;

  var saved = sessionStorage.getItem("username");
  if (saved !== null) {
    unameEl.value = saved;
    remember.checked = true;
  }
}

function handleSubmit() {
  // Ensure latest value is saved right before submit if checked
  saveIfRemembered();
}

function wireEvents() {
  var form     = document.getElementsByTagName("form")[0];
  var unameEl  = $("usernameinput");
  var remember = $("rememberinput");

  if (form) {
    if (form.addEventListener) form.addEventListener("submit", handleSubmit, false);
    else form.attachEvent("onsubmit", handleSubmit);
  }

  if (remember) {
    // Save immediately when the checkbox is toggled
    if (remember.addEventListener) remember.addEventListener("change", saveIfRemembered, false);
    else remember.attachEvent("onchange", saveIfRemembered);
  }

  if (unameEl) {
    // Keep storage in sync as the user types, but only if checked
    var onType = function () {
      if ($("rememberinput") && $("rememberinput").checked) saveIfRemembered();
    };
    if (unameEl.addEventListener) unameEl.addEventListener("input", onType, false);
    else unameEl.attachEvent("onkeyup", onType);
  }
}

function init() {
  populateFromStorage();
  wireEvents();
}

if (window.addEventListener) window.addEventListener("load", init, false);
else window.attachEvent("onload", init);
