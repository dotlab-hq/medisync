var t = "&#8203;";
function e(t2, e2) {
  (null == e2 || e2 > t2.length) && (e2 = t2.length);
  for (var i2 = 0, n2 = new Array(e2); i2 < e2; i2++) n2[i2] = t2[i2];
  return n2;
}
function i(t2) {
  return (function(t3) {
    if (Array.isArray(t3)) return e(t3);
  })(t2) || (function(t3) {
    if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"]) return Array.from(t3);
  })(t2) || (function(t3, i2) {
    if (!t3) return;
    if ("string" == typeof t3) return e(t3, i2);
    var n2 = Object.prototype.toString.call(t3).slice(8, -1);
    "Object" === n2 && t3.constructor && (n2 = t3.constructor.name);
    if ("Map" === n2 || "Set" === n2) return Array.from(n2);
    if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return e(t3, i2);
  })(t2) || (function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  })();
}
var n = { isEnabled: function() {
  var t2;
  return null === (t2 = window.TAGIFY_DEBUG) || void 0 === t2 || t2;
}, log: function() {
  for (var t2 = arguments.length, e2 = new Array(t2), n2 = 0; n2 < t2; n2++) e2[n2] = arguments[n2];
  var a2;
  this.isEnabled() && (a2 = console).log.apply(a2, ["[Tagify]:"].concat(i(e2)));
}, warn: function() {
  for (var t2 = arguments.length, e2 = new Array(t2), n2 = 0; n2 < t2; n2++) e2[n2] = arguments[n2];
  var a2;
  this.isEnabled() && (a2 = console).warn.apply(a2, ["[Tagify]:"].concat(i(e2)));
} }, a = function(t2, e2, i2, n2) {
  return t2 = "" + t2, e2 = "" + e2, n2 && (t2 = t2.trim(), e2 = e2.trim()), i2 ? t2 == e2 : t2.toLowerCase() == e2.toLowerCase();
}, s = function(t2, e2) {
  return t2 && Array.isArray(t2) && t2.map((function(t3) {
    return o(t3, e2);
  }));
};
function o(t2, e2) {
  var i2, n2 = {};
  for (i2 in t2) e2.indexOf(i2) < 0 && (n2[i2] = t2[i2]);
  return n2;
}
function r(t2) {
  return new DOMParser().parseFromString(t2.trim(), "text/html").body.firstElementChild;
}
function l(t2, e2) {
  for (e2 = e2 || "previous"; t2 = t2[e2 + "Sibling"]; ) if (3 == t2.nodeType) return t2;
}
function d(t2) {
  return "string" == typeof t2 ? t2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/`|'/g, "&#039;") : t2;
}
function c(t2) {
  var e2 = Object.prototype.toString.call(t2).split(" ")[1].slice(0, -1);
  return t2 === Object(t2) && "Array" != e2 && "Function" != e2 && "RegExp" != e2 && "HTMLUnknownElement" != e2;
}
function u(t2, e2, i2) {
  var n2, a2;
  function s2(t3, e3) {
    for (var i3 in e3) if (e3.hasOwnProperty(i3)) {
      if (c(e3[i3])) {
        c(t3[i3]) ? s2(t3[i3], e3[i3]) : t3[i3] = Object.assign({}, e3[i3]);
        continue;
      }
      if (Array.isArray(e3[i3])) {
        t3[i3] = Object.assign([], e3[i3]);
        continue;
      }
      t3[i3] = e3[i3];
    }
  }
  return n2 = t2, (null != (a2 = Object) && "undefined" != typeof Symbol && a2[Symbol.hasInstance] ? a2[Symbol.hasInstance](n2) : n2 instanceof a2) || (t2 = {}), s2(t2, e2), i2 && s2(t2, i2), t2;
}
function g() {
  var t2 = [], e2 = {}, i2 = true, n2 = false, a2 = void 0;
  try {
    for (var s2, o2 = arguments[Symbol.iterator](); !(i2 = (s2 = o2.next()).done); i2 = true) {
      var r2 = s2.value, l2 = true, d2 = false, u2 = void 0;
      try {
        for (var g2, h2 = r2[Symbol.iterator](); !(l2 = (g2 = h2.next()).done); l2 = true) {
          var p2 = g2.value;
          c(p2) ? e2[p2.value] || (t2.push(p2), e2[p2.value] = 1) : t2.includes(p2) || t2.push(p2);
        }
      } catch (t3) {
        d2 = true, u2 = t3;
      } finally {
        try {
          l2 || null == h2.return || h2.return();
        } finally {
          if (d2) throw u2;
        }
      }
    }
  } catch (t3) {
    n2 = true, a2 = t3;
  } finally {
    try {
      i2 || null == o2.return || o2.return();
    } finally {
      if (n2) throw a2;
    }
  }
  return t2;
}
function h(t2) {
  return String.prototype.normalize ? "string" == typeof t2 ? t2.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : void 0 : t2;
}
var p = function() {
  return /(?=.*chrome)(?=.*android)/i.test(navigator.userAgent);
};
function f() {
  return ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, (function(t2) {
    return (t2 ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> t2 / 4).toString(16);
  }));
}
function v(t2) {
  var e2, i2 = b.call(this, t2), n2 = null == t2 || null === (e2 = t2.classList) || void 0 === e2 ? void 0 : e2.contains(this.settings.classNames.tag);
  return i2 && n2;
}
function m(t2) {
  return b.call(this, t2) && (null == t2 ? void 0 : t2.closest(this.settings.classNames.tagSelector));
}
function b(t2) {
  var e2;
  return (null == t2 || null === (e2 = t2.closest) || void 0 === e2 ? void 0 : e2.call(t2, this.settings.classNames.namespaceSelector)) === this.DOM.scope;
}
function y(t2, e2) {
  var i2 = window.getSelection();
  return e2 = e2 || i2.getRangeAt(0), "string" == typeof t2 && (t2 = document.createTextNode(t2)), e2 && (e2.deleteContents(), e2.insertNode(t2)), t2;
}
function w(t2, e2, i2) {
  return t2 ? (e2 && (t2.__tagifyTagData = i2 ? e2 : u({}, t2.__tagifyTagData || {}, e2)), t2.__tagifyTagData) : (n.warn("tag element doesn't exist", { tagElm: t2, data: e2 }), e2);
}
function T(t2) {
  if (t2 && t2.parentNode) {
    var e2 = t2, i2 = window.getSelection(), n2 = i2.getRangeAt(0);
    i2.rangeCount && (n2.setStartAfter(e2), n2.collapse(true), i2.removeAllRanges(), i2.addRange(n2));
  }
}
function O(t2, e2) {
  t2.forEach((function(t3) {
    if (w(t3.previousSibling) || !t3.previousSibling) {
      var i2 = document.createTextNode("​");
      t3.before(i2), e2 && T(i2);
    }
  }));
}
var x = { delimiters: ",", pattern: null, tagTextProp: "value", maxTags: 1 / 0, callbacks: {}, addTagOnBlur: true, addTagOn: ["blur", "tab", "enter"], onChangeAfterBlur: true, duplicates: false, whitelist: [], blacklist: [], enforceWhitelist: false, userInput: true, focusable: true, focusInputOnRemove: true, keepInvalidTags: false, createInvalidTags: true, mixTagsAllowedAfter: /,|\.|\:|\s/, mixTagsInterpolator: ["[[", "]]"], backspace: true, skipInvalid: false, pasteAsTags: true, editTags: { clicks: 2, keepInvalid: true }, transformTag: function() {
}, trim: true, a11y: { focusableTags: false, inputAriaLabel: "Tags input field" }, mixMode: { insertAfterTag: " " }, autoComplete: { enabled: true, rightKey: false, tabKey: false }, classNames: { namespace: "tagify", mixMode: "tagify--mix", selectMode: "tagify--select", input: "tagify__input", focus: "tagify--focus", tagNoAnimation: "tagify--noAnim", tagInvalid: "tagify--invalid", tagNotAllowed: "tagify--notAllowed", scopeLoading: "tagify--loading", hasMaxTags: "tagify--hasMaxTags", hasNoTags: "tagify--noTags", empty: "tagify--empty", inputInvalid: "tagify__input--invalid", dropdown: "tagify__dropdown", dropdownWrapper: "tagify__dropdown__wrapper", dropdownHeader: "tagify__dropdown__header", dropdownFooter: "tagify__dropdown__footer", dropdownItem: "tagify__dropdown__item", dropdownItemActive: "tagify__dropdown__item--active", dropdownItemHidden: "tagify__dropdown__item--hidden", dropdownItemSelected: "tagify__dropdown__item--selected", dropdownInital: "tagify__dropdown--initial", tag: "tagify__tag", tagText: "tagify__tag-text", tagX: "tagify__tag__removeBtn", tagLoading: "tagify__tag--loading", tagEditing: "tagify__tag--editable", tagFlash: "tagify__tag--flash", tagHide: "tagify__tag--hide" }, dropdown: { classname: "", enabled: 2, maxItems: 10, searchKeys: ["value", "searchBy"], fuzzySearch: true, caseSensitive: false, accentedSearch: true, includeSelectedTags: false, escapeHTML: true, highlightFirst: true, closeOnSelect: true, clearOnSelect: true, position: "all", appendTarget: null }, hooks: { beforeRemoveTag: function() {
  return Promise.resolve();
}, beforePaste: function() {
  return Promise.resolve();
}, suggestionClick: function() {
  return Promise.resolve();
}, beforeKeyDown: function() {
  return Promise.resolve();
} } };
function D(t2, e2, i2) {
  return e2 in t2 ? Object.defineProperty(t2, e2, { value: i2, enumerable: true, configurable: true, writable: true }) : t2[e2] = i2, t2;
}
function S(t2) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var i2 = null != arguments[e2] ? arguments[e2] : {}, n2 = Object.keys(i2);
    "function" == typeof Object.getOwnPropertySymbols && (n2 = n2.concat(Object.getOwnPropertySymbols(i2).filter((function(t3) {
      return Object.getOwnPropertyDescriptor(i2, t3).enumerable;
    })))), n2.forEach((function(e3) {
      D(t2, e3, i2[e3]);
    }));
  }
  return t2;
}
function I(t2, e2) {
  return e2 = null != e2 ? e2 : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(e2)) : (function(t3, e3) {
    var i2 = Object.keys(t3);
    if (Object.getOwnPropertySymbols) {
      var n2 = Object.getOwnPropertySymbols(t3);
      i2.push.apply(i2, n2);
    }
    return i2;
  })(Object(e2)).forEach((function(i2) {
    Object.defineProperty(t2, i2, Object.getOwnPropertyDescriptor(e2, i2));
  })), t2;
}
function E(t2, e2) {
  (null == e2 || e2 > t2.length) && (e2 = t2.length);
  for (var i2 = 0, n2 = new Array(e2); i2 < e2; i2++) n2[i2] = t2[i2];
  return n2;
}
function M(t2, e2, i2) {
  return e2 in t2 ? Object.defineProperty(t2, e2, { value: i2, enumerable: true, configurable: true, writable: true }) : t2[e2] = i2, t2;
}
function N(t2) {
  return (function(t3) {
    if (Array.isArray(t3)) return E(t3);
  })(t2) || (function(t3) {
    if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"]) return Array.from(t3);
  })(t2) || (function(t3, e2) {
    if (!t3) return;
    if ("string" == typeof t3) return E(t3, e2);
    var i2 = Object.prototype.toString.call(t3).slice(8, -1);
    "Object" === i2 && t3.constructor && (i2 = t3.constructor.name);
    if ("Map" === i2 || "Set" === i2) return Array.from(i2);
    if ("Arguments" === i2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i2)) return E(t3, e2);
  })(t2) || (function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  })();
}
function A() {
  for (var t2 in this.dropdown = {}, this._dropdown) this.dropdown[t2] = "function" == typeof this._dropdown[t2] ? this._dropdown[t2].bind(this) : this._dropdown[t2];
  this.dropdown.refs(), this.DOM.dropdown.__tagify = this;
}
var C, _, k = (C = (function(t2) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var i2 = null != arguments[e2] ? arguments[e2] : {}, n2 = Object.keys(i2);
    "function" == typeof Object.getOwnPropertySymbols && (n2 = n2.concat(Object.getOwnPropertySymbols(i2).filter((function(t3) {
      return Object.getOwnPropertyDescriptor(i2, t3).enumerable;
    })))), n2.forEach((function(e3) {
      M(t2, e3, i2[e3]);
    }));
  }
  return t2;
})({}, { events: { binding: function() {
  var t2 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], e2 = this.dropdown.events.callbacks, i2 = this.listeners.dropdown = this.listeners.dropdown || { position: this.dropdown.position.bind(this, null), onKeyDown: e2.onKeyDown.bind(this), onMouseOver: e2.onMouseOver.bind(this), onMouseLeave: e2.onMouseLeave.bind(this), onClick: e2.onClick.bind(this), onScroll: e2.onScroll.bind(this) }, n2 = t2 ? "addEventListener" : "removeEventListener";
  "manual" != this.settings.dropdown.position && (document[n2]("scroll", i2.position, true), window[n2]("resize", i2.position), window[n2]("keydown", i2.onKeyDown)), this.DOM.dropdown[n2]("mouseover", i2.onMouseOver), this.DOM.dropdown[n2]("mouseleave", i2.onMouseLeave), this.DOM.dropdown[n2]("mousedown", i2.onClick), this.DOM.dropdown.content[n2]("scroll", i2.onScroll);
}, callbacks: { onKeyDown: function(t2) {
  var e2 = this;
  if (this.state.hasFocus && !this.state.composing) {
    var i2 = this.settings, a2 = i2.dropdown.includeSelectedTags, s2 = this.DOM.dropdown.querySelector(i2.classNames.dropdownItemActiveSelector), o2 = this.dropdown.getSuggestionDataByNode(s2), r2 = "mix" == i2.mode, l2 = "select" == i2.mode;
    i2.hooks.beforeKeyDown(t2, { tagify: this }).then((function(d2) {
      switch (t2.key) {
        case "ArrowDown":
        case "ArrowUp":
        case "Down":
        case "Up":
          t2.preventDefault();
          var c2 = e2.dropdown.getAllSuggestionsRefs(), u2 = "ArrowUp" == t2.key || "Up" == t2.key;
          s2 && (s2 = e2.dropdown.getNextOrPrevOption(s2, !u2)), s2 && s2.matches(i2.classNames.dropdownItemSelector) || (s2 = c2[u2 ? c2.length - 1 : 0]), e2.dropdown.highlightOption(s2, true);
          break;
        case "PageUp":
        case "PageDown":
          var g2;
          t2.preventDefault();
          var h2 = e2.dropdown.getAllSuggestionsRefs(), p2 = Math.floor(e2.DOM.dropdown.content.clientHeight / (null === (g2 = h2[0]) || void 0 === g2 ? void 0 : g2.offsetHeight)) || 1, f2 = "PageUp" === t2.key;
          if (s2) {
            var v2 = h2.indexOf(s2), m2 = f2 ? Math.max(0, v2 - p2) : Math.min(h2.length - 1, v2 + p2);
            s2 = h2[m2];
          } else s2 = h2[0];
          e2.dropdown.highlightOption(s2, true);
          break;
        case "Home":
        case "End":
          t2.preventDefault();
          var b2 = e2.dropdown.getAllSuggestionsRefs();
          s2 = b2["Home" === t2.key ? 0 : b2.length - 1], e2.dropdown.highlightOption(s2, true);
          break;
        case "Escape":
        case "Esc":
          e2.dropdown.hide();
          break;
        case "ArrowRight":
          if (e2.state.actions.ArrowLeft || i2.autoComplete.rightKey) return;
        case "Tab":
          var y2 = !i2.autoComplete.rightKey || !i2.autoComplete.tabKey;
          if (!r2 && !l2 && s2 && y2 && !e2.state.editing && o2) {
            t2.preventDefault();
            var w2 = e2.dropdown.getMappedValue(o2);
            return e2.state.autoCompleteData = o2, e2.input.autocomplete.set.call(e2, w2), false;
          }
          return true;
        case "Enter":
          t2.preventDefault(), e2.state.actions.selectOption = true, setTimeout((function() {
            return e2.state.actions.selectOption = false;
          }), 100), i2.hooks.suggestionClick(t2, { tagify: e2, tagData: o2, suggestionElm: s2 }).then((function() {
            if (s2) {
              var i3 = a2 ? s2 : e2.dropdown.getNextOrPrevOption(s2, !u2);
              e2.dropdown.selectOption(s2, t2, (function() {
                if (i3) {
                  var t3 = i3.getAttribute("value");
                  i3 = e2.dropdown.getSuggestionNodeByValue(t3), e2.dropdown.highlightOption(i3);
                }
              }));
            } else e2.dropdown.hide(), r2 || e2.addTags(e2.state.inputText.trim(), true);
          })).catch((function(t3) {
            return n.warn(t3);
          }));
          break;
        case "Backspace":
          if (r2 || e2.state.editing.scope) return;
          var T2 = e2.input.raw.call(e2);
          "" != T2 && 8203 != T2.charCodeAt(0) || (true === i2.backspace ? e2.removeTags() : "edit" == i2.backspace && setTimeout(e2.editTag.bind(e2), 0));
      }
    }));
  }
}, onMouseOver: function(t2) {
  var e2 = t2.target.closest(this.settings.classNames.dropdownItemSelector);
  this.dropdown.highlightOption(e2);
}, onMouseLeave: function(t2) {
  this.dropdown.highlightOption();
}, onClick: function(t2) {
  var e2 = this;
  if (0 == t2.button && t2.target != this.DOM.dropdown && t2.target != this.DOM.dropdown.content) {
    var i2 = t2.target.closest(this.settings.classNames.dropdownItemSelector), a2 = this.dropdown.getSuggestionDataByNode(i2);
    this.state.actions.selectOption = true, setTimeout((function() {
      return e2.state.actions.selectOption = false;
    }), 100), this.settings.hooks.suggestionClick(t2, { tagify: this, tagData: a2, suggestionElm: i2 }).then((function() {
      i2 ? e2.dropdown.selectOption(i2, t2) : e2.dropdown.hide();
    })).catch((function(t3) {
      return n.warn(t3);
    }));
  }
}, onScroll: function(t2) {
  var e2 = t2.target, i2 = e2.scrollTop / (e2.scrollHeight - e2.parentNode.clientHeight) * 100;
  this.trigger("dropdown:scroll", { percentage: Math.round(i2) });
} } }, refilter: function(t2) {
  t2 = t2 || this.state.dropdown.query || "", this.suggestedListItems = this.dropdown.filterListItems(t2), this.dropdown.fill(), this.suggestedListItems.length || this.dropdown.hide(), this.trigger("dropdown:updated", this.DOM.dropdown);
}, getSuggestionDataByNode: function(t2) {
  for (var e2, i2 = t2 && t2.getAttribute("value"), n2 = this.suggestedListItems.length; n2--; ) {
    if (c(e2 = this.suggestedListItems[n2]) && e2.value == i2) return e2;
    if (e2 == i2) return { value: e2 };
  }
}, getSuggestionNodeByValue: function(t2) {
  return this.dropdown.getAllSuggestionsRefs().find((function(e2) {
    return e2.getAttribute("value") === t2;
  }));
}, getNextOrPrevOption: function(t2) {
  var e2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i2 = this.dropdown.getAllSuggestionsRefs(), n2 = i2.findIndex((function(e3) {
    return e3 === t2;
  }));
  return e2 ? i2[n2 + 1] : i2[n2 - 1];
}, highlightOption: function(t2, e2) {
  var i2, n2 = this.settings.classNames.dropdownItemActive;
  if (this.state.ddItemElm && (this.state.ddItemElm.classList.remove(n2), this.state.ddItemElm.removeAttribute("aria-selected")), !t2) return this.state.ddItemData = null, this.state.ddItemElm = null, void this.input.autocomplete.suggest.call(this);
  i2 = this.dropdown.getSuggestionDataByNode(t2), this.state.ddItemData = i2, this.state.ddItemElm = t2, t2.classList.add(n2), t2.setAttribute("aria-selected", true), e2 && (t2.parentNode.scrollTop = t2.clientHeight + t2.offsetTop - t2.parentNode.clientHeight), this.settings.autoComplete && (this.input.autocomplete.suggest.call(this, i2), this.dropdown.position());
}, selectOption: function(t2, e2, i2) {
  var n2 = this, a2 = this.settings, s2 = a2.dropdown.includeSelectedTags, o2 = a2.dropdown, r2 = o2.clearOnSelect, l2 = o2.closeOnSelect;
  if (!t2) return this.addTags(this.state.inputText, true), void (l2 && this.dropdown.hide());
  e2 = e2 || {};
  var d2 = t2.getAttribute("value"), c2 = "noMatch" == d2, g2 = "mix" == a2.mode, h2 = this.suggestedListItems.find((function(t3) {
    var e3;
    return (null !== (e3 = t3.value) && void 0 !== e3 ? e3 : t3) == d2;
  }));
  if (this.trigger("dropdown:select", { data: h2, elm: t2, event: e2 }), h2 || c2) {
    if (this.state.editing) {
      var p2 = this.normalizeTags([h2])[0];
      h2 = a2.transformTag.call(this, p2) || p2, this.onEditTagDone(null, u({ __isValid: true }, h2));
    } else this[g2 ? "addMixTags" : "addTags"]([h2 || this.input.raw.call(this)], r2);
    (g2 || this.DOM.input.parentNode) && (setTimeout((function() {
      n2.DOM.input.focus(), n2.toggleFocusClass(true);
    })), l2 && setTimeout(this.dropdown.hide.bind(this)), s2 ? i2 && i2() : (t2.addEventListener("transitionend", (function() {
      n2.dropdown.fillHeaderFooter(), setTimeout((function() {
        t2.remove(), n2.dropdown.refilter(), i2 && i2();
      }), 100);
    }), { once: true }), t2.classList.add(this.settings.classNames.dropdownItemHidden)));
  } else l2 && setTimeout(this.dropdown.hide.bind(this));
}, selectAll: function(t2) {
  this.suggestedListItems.length = 0, this.dropdown.hide(), this.dropdown.filterListItems("");
  var e2 = this.dropdown.filterListItems("");
  return t2 || (e2 = this.state.dropdown.suggestions), this.addTags(e2, true), this;
}, filterListItems: function(t2, e2) {
  var i2, n2, a2, s2, o2, r2, l2 = function() {
    var t3, l3, d3 = void 0, u3 = void 0;
    t3 = v2[T2], n2 = (null != (l3 = Object) && "undefined" != typeof Symbol && l3[Symbol.hasInstance] ? l3[Symbol.hasInstance](t3) : t3 instanceof l3) ? v2[T2] : { value: v2[T2] };
    var m3, b3 = !Object.keys(n2).some((function(t4) {
      return w2.includes(t4);
    })) ? ["value"] : w2;
    g2.fuzzySearch && !e2.exact ? (s2 = b3.reduce((function(t4, e3) {
      return t4 + " " + (n2[e3] || "");
    }), "").toLowerCase().trim(), g2.accentedSearch && (s2 = h(s2), r2 = h(r2)), d3 = 0 == s2.indexOf(r2), u3 = s2 === r2, m3 = s2, a2 = r2.toLowerCase().split(" ").every((function(t4) {
      return m3.includes(t4.toLowerCase());
    }))) : (d3 = true, a2 = b3.some((function(t4) {
      var i3 = "" + (n2[t4] || "");
      return g2.accentedSearch && (i3 = h(i3), r2 = h(r2)), g2.caseSensitive || (i3 = i3.toLowerCase()), u3 = i3 === r2, e2.exact ? i3 === r2 : 0 == i3.indexOf(r2);
    }))), o2 = !g2.includeSelectedTags && i2.isTagDuplicate(c(n2) ? n2.value : n2), a2 && !o2 && (u3 && d3 ? f2.push(n2) : "startsWith" == g2.sortby && d3 ? p2.unshift(n2) : p2.push(n2));
  }, d2 = this, u2 = this.settings, g2 = u2.dropdown, p2 = (e2 = e2 || {}, []), f2 = [], v2 = u2.whitelist, m2 = g2.maxItems >= 0 ? g2.maxItems : 1 / 0, b2 = g2.includeSelectedTags, y2 = "function" == typeof g2.sortby, w2 = g2.searchKeys, T2 = 0;
  if (!(t2 = "select" == u2.mode && this.value.length && this.value[0][u2.tagTextProp] == t2 ? "" : t2) || !w2.length) {
    p2 = b2 ? v2 : v2.filter((function(t3) {
      return !d2.isTagDuplicate(c(t3) ? t3.value : t3);
    }));
    var O2 = y2 ? g2.sortby(p2, r2) : p2.slice(0, m2);
    return this.state.dropdown.suggestions = O2, O2;
  }
  for (r2 = g2.caseSensitive ? "" + t2 : ("" + t2).toLowerCase(); T2 < v2.length; T2++) i2 = this, l2();
  this.state.dropdown.suggestions = f2.concat(p2);
  O2 = y2 ? g2.sortby(f2.concat(p2), r2) : f2.concat(p2).slice(0, m2);
  return this.state.dropdown.suggestions = O2, O2;
}, getMappedValue: function(t2) {
  var e2 = this.settings.dropdown.mapValueTo;
  return e2 ? "function" == typeof e2 ? e2(t2) : t2[e2] || t2.value : t2.value;
}, createListHTML: function(t2) {
  var e2 = this;
  return u([], t2).map((function(t3, i2) {
    "string" != typeof t3 && "number" != typeof t3 || (t3 = { value: t3 });
    var n2 = e2.dropdown.getMappedValue(t3);
    return n2 = "string" == typeof n2 && e2.settings.dropdown.escapeHTML ? d(n2) : n2, e2.settings.templates.dropdownItem.apply(e2, [I(S({}, t3), { mappedValue: n2 }), e2]);
  })).join("");
} }), _ = null != (_ = { refs: function() {
  this.DOM.dropdown = this.parseTemplate("dropdown", [this.settings]), this.DOM.dropdown.content = this.DOM.dropdown.querySelector("[data-selector='tagify-suggestions-wrapper']");
}, getHeaderRef: function() {
  return this.DOM.dropdown.querySelector("[data-selector='tagify-suggestions-header']");
}, getFooterRef: function() {
  return this.DOM.dropdown.querySelector("[data-selector='tagify-suggestions-footer']");
}, getAllSuggestionsRefs: function() {
  return N(this.DOM.dropdown.content.querySelectorAll(this.settings.classNames.dropdownItemSelector));
}, show: function(t2) {
  var e2, i2, n2, s2 = this, o2 = this.settings, r2 = "mix" == o2.mode && !o2.enforceWhitelist, l2 = !o2.whitelist || !o2.whitelist.length, d2 = "manual" == o2.dropdown.position;
  if (t2 = void 0 === t2 ? this.state.inputText : t2, !(l2 && !r2 && !o2.templates.dropdownItemNoMatch || false === o2.dropdown.enabled || this.state.isLoading || this.settings.readonly)) {
    if (clearTimeout(this.dropdownHide__bindEventsTimeout), this.suggestedListItems = this.dropdown.filterListItems(t2), t2 && !this.suggestedListItems.length && (this.trigger("dropdown:noMatch", t2), o2.templates.dropdownItemNoMatch && (n2 = o2.templates.dropdownItemNoMatch.call(this, { value: t2 }))), !n2) {
      if (this.suggestedListItems.length) t2 && r2 && !this.state.editing.scope && !a(this.suggestedListItems[0].value, t2) && this.suggestedListItems.unshift({ value: t2 });
      else {
        if (!t2 || !r2 || this.state.editing.scope) return this.input.autocomplete.suggest.call(this), void this.dropdown.hide();
        this.suggestedListItems = [{ value: t2 }];
      }
      i2 = "" + (c(e2 = this.suggestedListItems[0]) ? e2.value : e2), o2.autoComplete && i2 && 0 == i2.indexOf(t2) && this.input.autocomplete.suggest.call(this, e2);
    }
    this.dropdown.fill(n2), o2.dropdown.highlightFirst && this.dropdown.highlightOption(this.DOM.dropdown.content.querySelector(o2.classNames.dropdownItemSelector)), this.state.dropdown.visible || setTimeout(this.dropdown.events.binding.bind(this)), this.state.dropdown.visible = t2 || true, this.state.dropdown.query = t2, this.setStateSelection(), d2 || setTimeout((function() {
      s2.dropdown.position(), s2.dropdown.render();
    })), setTimeout((function() {
      s2.trigger("dropdown:show", s2.DOM.dropdown);
    }));
  }
}, hide: function(t2) {
  var e2 = this, i2 = this.DOM, n2 = i2.scope, a2 = i2.dropdown, s2 = "manual" == this.settings.dropdown.position && !t2;
  if (a2 && document.body.contains(a2) && !s2) return window.removeEventListener("resize", this.dropdown.position), this.dropdown.events.binding.call(this, false), n2.setAttribute("aria-expanded", false), a2.parentNode.removeChild(a2), setTimeout((function() {
    e2.state.dropdown.visible = false;
  }), 100), this.state.dropdown.query = this.state.ddItemData = this.state.ddItemElm = this.state.selection = null, this.state.tag && this.state.tag.value.length && (this.state.flaggedTags[this.state.tag.baseOffset] = this.state.tag), this.trigger("dropdown:hide", a2), this;
}, toggle: function(t2) {
  this.dropdown[this.state.dropdown.visible && !t2 ? "hide" : "show"]();
}, getAppendTarget: function() {
  var t2 = this.settings.dropdown;
  return "function" == typeof t2.appendTarget ? t2.appendTarget() : t2.appendTarget;
}, render: function() {
  var t2, e2, i2, n2 = this, a2 = (t2 = this.DOM.dropdown, (i2 = t2.cloneNode(true)).style.cssText = "position:fixed; top:-9999px; opacity:0", document.body.appendChild(i2), e2 = i2.clientHeight, i2.parentNode.removeChild(i2), e2), s2 = this.settings, o2 = this.dropdown.getAppendTarget();
  return false === s2.dropdown.enabled || (this.DOM.scope.setAttribute("aria-expanded", true), document.body.contains(this.DOM.dropdown) || (this.DOM.dropdown.classList.add(s2.classNames.dropdownInital), this.dropdown.position(a2), o2.appendChild(this.DOM.dropdown), setTimeout((function() {
    return n2.DOM.dropdown.classList.remove(s2.classNames.dropdownInital);
  })))), this;
}, fill: function(t2) {
  t2 = "string" == typeof t2 ? t2 : this.dropdown.createListHTML(t2 || this.suggestedListItems);
  var e2, i2 = this.settings.templates.dropdownContent.call(this, t2);
  this.DOM.dropdown.content.innerHTML = (e2 = i2) ? e2.replace(/\>[\r\n ]+\</g, "><").split(/>\s+</).join("><").trim() : "";
}, fillHeaderFooter: function() {
  var t2 = this.dropdown.filterListItems(this.state.dropdown.query), e2 = this.parseTemplate("dropdownHeader", [t2]), i2 = this.parseTemplate("dropdownFooter", [t2]), n2 = this.dropdown.getHeaderRef(), a2 = this.dropdown.getFooterRef();
  e2 && (null == n2 || n2.parentNode.replaceChild(e2, n2)), i2 && (null == a2 || a2.parentNode.replaceChild(i2, a2));
}, position: function(t2) {
  var e2 = this.settings.dropdown, i2 = this.dropdown.getAppendTarget();
  if ("manual" != e2.position && i2) {
    var n2, a2, s2, o2, r2, l2, d2, c2, u2, g2, h2 = this.DOM.dropdown, p2 = e2.RTL, f2 = i2 === document.body, v2 = i2 === this.DOM.scope, m2 = f2 ? window.pageYOffset : i2.scrollTop, b2 = document.fullscreenElement || document.webkitFullscreenElement || document.documentElement, y2 = b2.clientHeight, w2 = Math.max(b2.clientWidth || 0, window.innerWidth || 0), T2 = w2 > 480 ? e2.position : "all", O2 = this.DOM["input" == T2 ? "input" : "scope"];
    if (t2 = t2 || h2.clientHeight, this.state.dropdown.visible) {
      if ("text" == T2 ? (s2 = (n2 = (function() {
        var t3 = document.getSelection();
        if (t3.rangeCount) {
          var e3, i3, n3 = t3.getRangeAt(0), a3 = n3.startContainer, s3 = n3.startOffset;
          if (s3 > 0) return (i3 = document.createRange()).setStart(a3, s3 - 1), i3.setEnd(a3, s3), { left: (e3 = i3.getBoundingClientRect()).right, top: e3.top, bottom: e3.bottom };
          if (a3.getBoundingClientRect) return a3.getBoundingClientRect();
        }
        return { left: -9999, top: -9999 };
      })()).bottom, a2 = n2.top, o2 = n2.left, r2 = "auto") : (l2 = (function(t3) {
        var e3 = 0, i3 = 0;
        for (t3 = t3.parentNode; t3 && t3 != b2; ) e3 += t3.offsetTop || 0, i3 += t3.offsetLeft || 0, t3 = t3.parentNode;
        return { top: e3, left: i3 };
      })(i2), n2 = O2.getBoundingClientRect(), a2 = v2 ? -1 : n2.top - l2.top, s2 = (v2 ? n2.height : n2.bottom - l2.top) - 1, o2 = v2 ? -1 : n2.left - l2.left, r2 = n2.width + "px"), !f2) {
        var x2 = (function() {
          for (var t3 = 0, i3 = e2.appendTarget.parentNode; i3; ) t3 += i3.scrollTop || 0, i3 = i3.parentNode;
          return t3;
        })();
        a2 += x2, s2 += x2;
      }
      var D2;
      a2 = Math.floor(a2), s2 = Math.ceil(s2), c2 = w2 - o2 < 120, u2 = ((d2 = null !== (D2 = e2.placeAbove) && void 0 !== D2 ? D2 : y2 - n2.bottom < t2) ? a2 : s2) + m2, g2 = o2 + (p2 && n2.width || 0) + window.pageXOffset, g2 = "text" == T2 && c2 ? "right: 0;" : "left: ".concat(g2, "px;"), h2.style.cssText = "".concat(g2, " top: ").concat(u2, "px; min-width: ").concat(r2, "; max-width: ").concat(r2), h2.setAttribute("placement", d2 ? "top" : "bottom"), h2.setAttribute("position", T2);
    }
  }
} }) ? _ : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(C, Object.getOwnPropertyDescriptors(_)) : (function(t2, e2) {
  var i2 = Object.keys(t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(t2);
    i2.push.apply(i2, n2);
  }
  return i2;
})(Object(_)).forEach((function(t2) {
  Object.defineProperty(C, t2, Object.getOwnPropertyDescriptor(_, t2));
})), C), L = "@yaireo/tagify/", P = { empty: "empty", exceed: "number of tags exceeded", pattern: "pattern mismatch", duplicate: "already exists", notAllowed: "not allowed" }, j = { wrapper: function(e2, i2) {
  return '<tags class="'.concat(i2.classNames.namespace, " ").concat(i2.mode ? "".concat(i2.classNames[i2.mode + "Mode"]) : "", " ").concat(e2.className, '"\n                    ').concat(i2.readonly ? "readonly" : "", "\n                    ").concat(i2.disabled ? "disabled" : "", "\n                    ").concat(i2.required ? "required" : "", "\n                    ").concat("select" === i2.mode ? "spellcheck='false'" : "", '\n                    tabIndex="-1">\n                    ').concat(this.settings.templates.input.call(this), "\n                ").concat(t, "\n        </tags>");
}, input: function() {
  var e2 = this.settings, i2 = e2.placeholder || t;
  return "<span ".concat(!e2.readonly && e2.userInput ? "contenteditable" : "", ' data-can-editable tabIndex="0" data-placeholder="').concat(i2, '" aria-placeholder="').concat(e2.placeholder || "", '"\n                    class="').concat(e2.classNames.input, '"\n                    role="textbox"\n                    autocapitalize="false"\n                    autocorrect="off"\n                    aria-label="').concat(e2.a11y.inputAriaLabel, '"\n                    aria-autocomplete="both"\n                    aria-multiline="').concat("mix" == e2.mode, '"></span>');
}, tag: function(t2, e2) {
  var i2 = e2.settings;
  return '<tag title="'.concat(t2.title || t2.value, `"
                    contenteditable='false'
                    tabIndex="`).concat(i2.a11y.focusableTags ? 0 : -1, '"\n                    class="').concat(i2.classNames.tag, " ").concat(t2.class || "", '"\n                    ').concat(this.getAttributes(t2), `>
            <x title='' tabIndex="`).concat(i2.a11y.focusableTags ? 0 : -1, '" class="').concat(i2.classNames.tagX, `" role='button' aria-label='remove tag'></x>
            <div>
                <span `).concat("select" === i2.mode && i2.userInput ? "contenteditable='true'" : "", ` autocapitalize="false" autocorrect="off" spellcheck='false' class="`).concat(i2.classNames.tagText, '">').concat(t2[i2.tagTextProp] || t2.value, "</span>\n            </div>\n        </tag>");
}, dropdown: function(t2) {
  var e2 = t2.dropdown, i2 = "manual" == e2.position;
  return '<div class="'.concat(i2 ? "" : t2.classNames.dropdown, " ").concat(e2.classname, '" role="listbox" aria-labelledby="dropdown" dir="').concat(e2.RTL ? "rtl" : "", `">
                    <div data-selector='tagify-suggestions-wrapper' class="`).concat(t2.classNames.dropdownWrapper, '"></div>\n                </div>');
}, dropdownContent: function(t2) {
  var e2 = this.settings.templates, i2 = this.state.dropdown.suggestions;
  return "\n            ".concat(e2.dropdownHeader.call(this, i2), "\n            ").concat(t2, "\n            ").concat(e2.dropdownFooter.call(this, i2), "\n        ");
}, dropdownItem: function(t2) {
  return "<div ".concat(this.getAttributes(t2), "\n                    class='").concat(this.settings.classNames.dropdownItem, " ").concat(this.isTagDuplicate(t2.value) ? this.settings.classNames.dropdownItemSelected : "", " ").concat(t2.class || "", `'
                    tabindex="0"
                    role="option">`).concat(t2.mappedValue || t2.value, "</div>");
}, dropdownHeader: function(t2) {
  return `<header data-selector='tagify-suggestions-header' class="`.concat(this.settings.classNames.dropdownHeader, '"></header>');
}, dropdownFooter: function(t2) {
  var e2 = t2.length - this.settings.dropdown.maxItems;
  return e2 > 0 ? `<footer data-selector='tagify-suggestions-footer' class="`.concat(this.settings.classNames.dropdownFooter, '">\n                ').concat(e2, " more items. Refine your search.\n            </footer>") : "";
}, dropdownItemNoMatch: null };
function V(t2, e2) {
  (null == e2 || e2 > t2.length) && (e2 = t2.length);
  for (var i2 = 0, n2 = new Array(e2); i2 < e2; i2++) n2[i2] = t2[i2];
  return n2;
}
function R(t2, e2) {
  return null != e2 && "undefined" != typeof Symbol && e2[Symbol.hasInstance] ? !!e2[Symbol.hasInstance](t2) : t2 instanceof e2;
}
function F(t2, e2) {
  return (function(t3) {
    if (Array.isArray(t3)) return t3;
  })(t2) || (function(t3, e3) {
    var i2 = null == t3 ? null : "undefined" != typeof Symbol && t3[Symbol.iterator] || t3["@@iterator"];
    if (null != i2) {
      var n2, a2, s2 = [], o2 = true, r2 = false;
      try {
        for (i2 = i2.call(t3); !(o2 = (n2 = i2.next()).done) && (s2.push(n2.value), !e3 || s2.length !== e3); o2 = true) ;
      } catch (t4) {
        r2 = true, a2 = t4;
      } finally {
        try {
          o2 || null == i2.return || i2.return();
        } finally {
          if (r2) throw a2;
        }
      }
      return s2;
    }
  })(t2, e2) || (function(t3, e3) {
    if (!t3) return;
    if ("string" == typeof t3) return V(t3, e3);
    var i2 = Object.prototype.toString.call(t3).slice(8, -1);
    "Object" === i2 && t3.constructor && (i2 = t3.constructor.name);
    if ("Map" === i2 || "Set" === i2) return Array.from(i2);
    if ("Arguments" === i2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i2)) return V(t3, e3);
  })(t2, e2) || (function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  })();
}
function H(t2, e2) {
  (null == e2 || e2 > t2.length) && (e2 = t2.length);
  for (var i2 = 0, n2 = new Array(e2); i2 < e2; i2++) n2[i2] = t2[i2];
  return n2;
}
function B(t2, e2, i2) {
  return e2 in t2 ? Object.defineProperty(t2, e2, { value: i2, enumerable: true, configurable: true, writable: true }) : t2[e2] = i2, t2;
}
function W(t2, e2) {
  return null != e2 && "undefined" != typeof Symbol && e2[Symbol.hasInstance] ? !!e2[Symbol.hasInstance](t2) : t2 instanceof e2;
}
function q(t2, e2) {
  return e2 = null != e2 ? e2 : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(e2)) : (function(t3, e3) {
    var i2 = Object.keys(t3);
    if (Object.getOwnPropertySymbols) {
      var n2 = Object.getOwnPropertySymbols(t3);
      i2.push.apply(i2, n2);
    }
    return i2;
  })(Object(e2)).forEach((function(i2) {
    Object.defineProperty(t2, i2, Object.getOwnPropertyDescriptor(e2, i2));
  })), t2;
}
function U(t2) {
  return (function(t3) {
    if (Array.isArray(t3)) return H(t3);
  })(t2) || (function(t3) {
    if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"]) return Array.from(t3);
  })(t2) || (function(t3, e2) {
    if (!t3) return;
    if ("string" == typeof t3) return H(t3, e2);
    var i2 = Object.prototype.toString.call(t3).slice(8, -1);
    "Object" === i2 && t3.constructor && (i2 = t3.constructor.name);
    if ("Map" === i2 || "Set" === i2) return Array.from(i2);
    if ("Arguments" === i2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i2)) return H(t3, e2);
  })(t2) || (function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  })();
}
var K = { customBinding: function() {
  var t2 = this;
  this.customEventsList.forEach((function(e2) {
    t2.on(e2, t2.settings.callbacks[e2]);
  }));
}, binding: function() {
  var t2, e2 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], i2 = this.settings, n2 = this.events.callbacks, a2 = e2 ? "addEventListener" : "removeEventListener";
  if (!(this.state.mainEvents && e2 || i2.disabled || i2.readonly)) {
    for (var s2 in this.state.mainEvents = e2, e2 && !this.listeners.main && (this.events.bindGlobal.call(this), this.settings.isJQueryPlugin && jQuery(this.DOM.originalInput).on("tagify.removeAllTags", this.removeAllTags.bind(this))), t2 = this.listeners.main = this.listeners.main || { keydown: ["input", n2.onKeydown.bind(this)], click: ["scope", n2.onClickScope.bind(this)], dblclick: "select" != i2.mode && ["scope", n2.onDoubleClickScope.bind(this)], paste: ["input", n2.onPaste.bind(this)], drop: ["input", n2.onDrop.bind(this)], compositionstart: ["input", n2.onCompositionStart.bind(this)], compositionend: ["input", n2.onCompositionEnd.bind(this)] }) t2[s2] && this.DOM[t2[s2][0]][a2](s2, t2[s2][1]);
    var o2 = this.listeners.main.inputMutationObserver || new MutationObserver(n2.onInputDOMChange.bind(this));
    o2.disconnect(), "mix" == i2.mode && o2.observe(this.DOM.input, { childList: true }), this.events.bindOriginaInputListener.call(this), e2 && (this.listeners.main = void 0);
  }
}, bindOriginaInputListener: function(t2) {
  var e2 = (t2 || 0) + 500;
  this.listeners.main && (clearInterval(this.listeners.main.originalInputValueObserverInterval), this.listeners.main.originalInputValueObserverInterval = setInterval(this.events.callbacks.observeOriginalInputValue.bind(this), e2));
}, bindGlobal: function(t2) {
  var e2, i2 = this.events.callbacks, n2 = t2 ? "removeEventListener" : "addEventListener";
  if (this.listeners && (t2 || !this.listeners.global)) {
    this.listeners.global = this.listeners.global || [{ type: this.isIE ? "keydown" : "input", target: this.DOM.input, cb: i2[this.isIE ? "onInputIE" : "onInput"].bind(this) }, { type: "keydown", target: window, cb: i2.onWindowKeyDown.bind(this) }, { type: "focusin", target: this.DOM.scope, cb: i2.onFocusBlur.bind(this) }, { type: "focusout", target: this.DOM.scope, cb: i2.onFocusBlur.bind(this) }, { type: "click", target: document, cb: i2.onClickAnywhere.bind(this), useCapture: true }];
    var a2 = true, s2 = false, o2 = void 0;
    try {
      for (var r2, l2 = this.listeners.global[Symbol.iterator](); !(a2 = (r2 = l2.next()).done); a2 = true) (e2 = r2.value).target[n2](e2.type, e2.cb, !!e2.useCapture);
    } catch (t3) {
      s2 = true, o2 = t3;
    } finally {
      try {
        a2 || null == l2.return || l2.return();
      } finally {
        if (s2) throw o2;
      }
    }
    t2 && (this.listeners.global = void 0);
  }
}, unbindGlobal: function() {
  this.events.bindGlobal.call(this, true);
}, callbacks: { onFocusBlur: function(t2) {
  var e2, i2, n2 = this.settings, a2 = m.call(this, t2.relatedTarget), s2 = v.call(this, t2.target), o2 = t2.target.classList.contains(n2.classNames.tagX), r2 = "focusin" == t2.type, l2 = "focusout" == t2.type;
  o2 && "mix" != n2.mode && n2.focusInputOnRemove && this.DOM.input.focus(), a2 && r2 && !s2 && !o2 && this.toggleFocusClass(this.state.hasFocus = +/* @__PURE__ */ new Date());
  var d2 = t2.target ? this.trim(this.DOM.input.textContent) : "", c2 = null === (i2 = this.value) || void 0 === i2 || null === (e2 = i2[0]) || void 0 === e2 ? void 0 : e2[n2.tagTextProp], u2 = n2.dropdown.enabled >= 0, g2 = { relatedTarget: t2.relatedTarget }, h2 = this.state.actions.selectOption && (u2 || !n2.dropdown.closeOnSelect), p2 = this.state.actions.addNew && u2;
  if (l2) {
    if (t2.relatedTarget === this.DOM.scope) return this.dropdown.hide(), void this.DOM.input.focus();
    this.postUpdate(), n2.onChangeAfterBlur && this.triggerChangeEvent();
  }
  if (!(h2 || p2 || o2)) if (this.state.hasFocus = !(!r2 && !a2) && +/* @__PURE__ */ new Date(), this.toggleFocusClass(this.state.hasFocus), "mix" != n2.mode) {
    if (r2) {
      if (!n2.focusable) return;
      var f2 = 0 === n2.dropdown.enabled && !this.state.dropdown.visible, b2 = this.DOM.scope.querySelector(this.settings.classNames.tagTextSelector);
      return this.trigger("focus", g2), void (f2 && !s2 && (this.dropdown.show(this.value.length ? "" : void 0), "select" === n2.mode && this.setRangeAtStartEnd(false, b2)));
    }
    if (l2) {
      if (this.trigger("blur", g2), this.loading(false), "select" == n2.mode) {
        if (this.value.length) {
          var y2 = this.getTagElms()[0];
          d2 = this.trim(y2.textContent);
        }
        c2 === d2 && (d2 = "");
      }
      d2 && !this.state.actions.selectOption && n2.addTagOnBlur && n2.addTagOn.includes("blur") && this.addTags(d2, true);
    }
    a2 || (this.DOM.input.removeAttribute("style"), this.dropdown.hide());
  } else r2 ? this.trigger("focus", g2) : l2 && (this.trigger("blur", g2), this.loading(false), this.dropdown.hide(), this.state.dropdown.visible = void 0, this.setStateSelection());
}, onCompositionStart: function(t2) {
  this.state.composing = true;
}, onCompositionEnd: function(t2) {
  this.state.composing = false;
}, onWindowKeyDown: function(t2) {
  var e2, i2 = this.settings, n2 = document.activeElement, a2 = m.call(this, n2) && this.DOM.scope.contains(n2), s2 = n2 === this.DOM.input, o2 = a2 && n2.hasAttribute("readonly"), r2 = this.DOM.scope.querySelector(this.settings.classNames.tagTextSelector), l2 = this.state.dropdown.visible;
  if (("Tab" === t2.key && l2 || this.state.hasFocus || a2 && !o2) && !s2) {
    e2 = n2.nextElementSibling;
    var d2 = t2.target.classList.contains(i2.classNames.tagX);
    switch (t2.key) {
      case "Backspace":
        i2.readonly || this.state.editing || (this.removeTags(n2), (e2 || this.DOM.input).focus());
        break;
      case "Enter":
        if (d2) return void this.removeTags(t2.target.parentNode);
        i2.a11y.focusableTags && v.call(this, n2) && setTimeout(this.editTag.bind(this), 0, n2);
        break;
      case "ArrowDown":
        this.state.dropdown.visible || "mix" == i2.mode || this.dropdown.show();
        break;
      case "Tab":
        null == r2 || r2.focus();
    }
  }
}, onKeydown: function(t2) {
  var e2 = this, i2 = this.settings;
  if (!this.state.composing && i2.userInput) {
    "select" == i2.mode && i2.enforceWhitelist && this.value.length && "Tab" != t2.key && t2.preventDefault();
    var n2 = this.trim(t2.target.textContent);
    this.trigger("keydown", { event: t2 }), i2.hooks.beforeKeyDown(t2, { tagify: this }).then((function(a2) {
      if ("mix" == i2.mode) {
        switch (t2.key) {
          case "Left":
          case "ArrowLeft":
            e2.state.actions.ArrowLeft = true;
            break;
          case "Delete":
          case "Backspace":
            if (e2.state.editing) return;
            var s2 = document.getSelection(), o2 = "Delete" == t2.key && s2.anchorOffset == (s2.anchorNode.length || 0), r2 = s2.anchorNode.previousSibling, d2 = 1 == s2.anchorNode.nodeType || !s2.anchorOffset && r2 && 1 == r2.nodeType && s2.anchorNode.previousSibling;
            !(function(t3) {
              var e3 = document.createElement("div");
              t3.replace(/\&#?[0-9a-z]+;/gi, (function(t4) {
                return e3.innerHTML = t4, e3.innerText;
              }));
            })(e2.DOM.input.innerHTML);
            var c2, u2, g2, h2 = e2.getTagElms(), f2 = 1 === s2.anchorNode.length && s2.anchorNode.nodeValue == String.fromCharCode(8203);
            if ("edit" == i2.backspace && d2) return c2 = 1 == s2.anchorNode.nodeType ? null : s2.anchorNode.previousElementSibling, setTimeout(e2.editTag.bind(e2), 0, c2), void t2.preventDefault();
            if (p() && W(d2, Element)) return g2 = l(d2), d2.hasAttribute("readonly") || d2.remove(), e2.DOM.input.focus(), void setTimeout((function() {
              T(g2), e2.DOM.input.click();
            }));
            if ("BR" == s2.anchorNode.nodeName) return;
            if ((o2 || d2) && 1 == s2.anchorNode.nodeType ? u2 = 0 == s2.anchorOffset ? o2 ? h2[0] : null : h2[Math.min(h2.length, s2.anchorOffset) - 1] : o2 ? u2 = s2.anchorNode.nextElementSibling : W(d2, Element) && (u2 = d2), 3 == s2.anchorNode.nodeType && !s2.anchorNode.nodeValue && s2.anchorNode.previousElementSibling && t2.preventDefault(), (d2 || o2) && !i2.backspace) return void t2.preventDefault();
            if ("Range" != s2.type && !s2.anchorOffset && s2.anchorNode == e2.DOM.input && "Delete" != t2.key) return void t2.preventDefault();
            if ("Range" != s2.type && u2 && u2.hasAttribute("readonly")) return void T(l(u2));
            "Delete" == t2.key && f2 && w(s2.anchorNode.nextSibling) && e2.removeTags(s2.anchorNode.nextSibling);
            break;
          case "Enter":
            if (t2.preventDefault(), e2.state.tag) return;
            var v2 = window.getSelection();
            v2.getRangeAt(0).insertNode(document.createElement("br")), v2.collapseToEnd();
        }
        return true;
      }
      var m2 = "manual" == i2.dropdown.position;
      switch (t2.key) {
        case "Backspace":
          "select" == i2.mode && i2.enforceWhitelist && e2.value.length ? e2.removeTags() : e2.state.dropdown.visible && "manual" != i2.dropdown.position || "" != t2.target.textContent && 8203 != n2.charCodeAt(0) || (true === i2.backspace ? e2.removeTags() : "edit" == i2.backspace && setTimeout(e2.editTag.bind(e2), 0));
          break;
        case "Esc":
        case "Escape":
          if (e2.state.dropdown.visible) return;
          t2.target.blur();
          break;
        case "Down":
        case "ArrowDown":
          e2.state.dropdown.visible || e2.dropdown.show();
          break;
        case "ArrowRight":
          var b2 = e2.state.inputSuggestion || e2.state.ddItemData;
          if (b2 && i2.autoComplete.rightKey) return void e2.addTags([b2], true);
          break;
        case "Tab":
          if (!i2.addTagOn.includes(t2.key.toLowerCase())) break;
        case "Enter":
          if (e2.state.dropdown.visible && !m2) return;
          var y2 = e2.state.autoCompleteData || n2;
          if (!y2 && "Tab" === t2.key) return true;
          t2.preventDefault(), setTimeout((function() {
            e2.state.dropdown.visible && !m2 || e2.state.actions.selectOption || !i2.addTagOn.includes(t2.key.toLowerCase()) || (e2.addTags([y2], true), e2.state.autoCompleteData = null);
          }));
      }
    })).catch((function(t3) {
      return t3;
    }));
  }
}, onInput: function(t2) {
  this.postUpdate();
  var e2 = this.settings;
  if ("mix" == e2.mode) return this.events.callbacks.onMixTagsInput.call(this, t2);
  var i2 = this.input.normalize.call(this, void 0, { trim: false }), n2 = i2.length >= e2.dropdown.enabled, a2 = { value: i2, inputElm: this.DOM.input }, s2 = this.validateTag({ value: i2 });
  "select" == e2.mode && this.toggleScopeValidation(s2), a2.isValid = s2, this.state.inputText != i2 && (this.input.set.call(this, i2, false), -1 != i2.search(e2.delimiters) ? this.addTags(i2) && this.input.set.call(this) : e2.dropdown.enabled >= 0 && this.dropdown[n2 ? "show" : "hide"](i2), this.trigger("input", a2));
}, onMixTagsInput: function(t2) {
  var e2, i2, n2, a2, s2, o2, r2, l2, d2 = this, c2 = this.settings, g2 = this.value.length, h2 = this.getTagElms(), f2 = document.createDocumentFragment(), v2 = window.getSelection().getRangeAt(0), m2 = [].map.call(h2, (function(t3) {
    return w(t3).value;
  }));
  if ("deleteContentBackward" == t2.inputType && p() && this.events.callbacks.onKeydown.call(this, { target: t2.target, key: "Backspace" }), O(this.getTagElms()), this.value.slice().forEach((function(t3) {
    t3.readonly && !m2.includes(t3.value) && f2.appendChild(d2.createTagElem(t3));
  })), f2.childNodes.length && (v2.insertNode(f2), this.setRangeAtStartEnd(false, f2.lastChild)), h2.length != g2) return this.value = [].map.call(this.getTagElms(), (function(t3) {
    return w(t3);
  })), void this.update({ withoutChangeEvent: true });
  if (this.hasMaxTags()) return true;
  if (window.getSelection && (o2 = window.getSelection()).rangeCount > 0 && 3 == o2.anchorNode.nodeType) {
    if ((v2 = o2.getRangeAt(0).cloneRange()).collapse(true), v2.setStart(o2.focusNode, 0), n2 = (e2 = v2.toString().slice(0, v2.endOffset)).split(c2.pattern).length - 1, (i2 = e2.match(c2.pattern)) && (a2 = e2.slice(e2.lastIndexOf(i2[i2.length - 1]))), a2) {
      if (this.state.actions.ArrowLeft = false, this.state.tag = { prefix: a2.match(c2.pattern)[0], value: a2.replace(c2.pattern, "") }, this.state.tag.baseOffset = o2.baseOffset - this.state.tag.value.length, l2 = this.state.tag.value.match(c2.delimiters)) return this.state.tag.value = this.state.tag.value.replace(c2.delimiters, ""), this.state.tag.delimiters = l2[0], this.addTags(this.state.tag.value, c2.dropdown.clearOnSelect), void this.dropdown.hide();
      s2 = this.state.tag.value.length >= c2.dropdown.enabled;
      try {
        r2 = (r2 = this.state.flaggedTags[this.state.tag.baseOffset]).prefix == this.state.tag.prefix && r2.value[0] == this.state.tag.value[0], this.state.flaggedTags[this.state.tag.baseOffset] && !this.state.tag.value && delete this.state.flaggedTags[this.state.tag.baseOffset];
      } catch (t3) {
      }
      (r2 || n2 < this.state.mixMode.matchedPatternCount) && (s2 = false);
    } else this.state.flaggedTags = {};
    this.state.mixMode.matchedPatternCount = n2;
  }
  setTimeout((function() {
    d2.update({ withoutChangeEvent: true }), d2.trigger("input", u({}, d2.state.tag, { textContent: d2.DOM.input.textContent })), d2.state.tag && d2.dropdown[s2 ? "show" : "hide"](d2.state.tag.value);
  }), 10);
}, onInputIE: function(t2) {
  var e2 = this;
  setTimeout((function() {
    e2.events.callbacks.onInput.call(e2, t2);
  }));
}, observeOriginalInputValue: function() {
  this.DOM.originalInput.parentNode || this.destroy(), this.DOM.originalInput.value != this.DOM.originalInput.tagifyValue && this.loadOriginalValues();
}, onClickAnywhere: function(t2) {
  if (t2.target != this.DOM.scope && !this.DOM.scope.contains(t2.target)) {
    this.toggleFocusClass(false), this.state.hasFocus = false;
    var e2 = t2.target.closest(this.settings.classNames.dropdownSelector);
    (null == e2 ? void 0 : e2.__tagify) != this && this.dropdown.hide();
  }
}, onClickScope: function(t2) {
  var e2 = this.settings, i2 = t2.target.closest("." + e2.classNames.tag);
  t2.target, this.DOM.scope;
  var n2 = +/* @__PURE__ */ new Date() - this.state.hasFocus;
  if (!t2.target.classList.contains(e2.classNames.tagX)) return i2 && !this.state.editing ? (this.trigger("click", { tag: i2, index: this.getNodeIndex(i2), data: w(i2), event: t2 }), void (1 !== e2.editTags && 1 !== e2.editTags.clicks && "select" != e2.mode || this.events.callbacks.onDoubleClickScope.call(this, t2))) : void (t2.target == this.DOM.input && ("mix" == e2.mode && this.fixFirefoxLastTagNoCaret(), n2 > 500 || !e2.focusable) ? this.state.dropdown.visible ? this.dropdown.hide() : 0 === e2.dropdown.enabled && "mix" != e2.mode && this.dropdown.show(this.value.length ? "" : void 0) : "select" != e2.mode || 0 !== e2.dropdown.enabled || this.state.dropdown.visible || (this.events.callbacks.onDoubleClickScope.call(this, q((function(t3) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var i3 = null != arguments[e3] ? arguments[e3] : {}, n3 = Object.keys(i3);
      "function" == typeof Object.getOwnPropertySymbols && (n3 = n3.concat(Object.getOwnPropertySymbols(i3).filter((function(t4) {
        return Object.getOwnPropertyDescriptor(i3, t4).enumerable;
      })))), n3.forEach((function(e4) {
        B(t3, e4, i3[e4]);
      }));
    }
    return t3;
  })({}, t2), { target: this.getTagElms()[0] })), !e2.userInput && this.dropdown.show()));
  this.removeTags(t2.target.parentNode);
}, onPaste: function(t2) {
  var e2 = this;
  t2.preventDefault();
  var i2, n2, a2, s2 = this.settings;
  if (!s2.userInput) return false;
  s2.readonly || (n2 = t2.clipboardData || window.clipboardData, a2 = n2.getData("Text"), s2.hooks.beforePaste(t2, { tagify: this, pastedText: a2, clipboardData: n2 }).then((function(s3) {
    if (void 0 === s3 && (s3 = a2), s3) if ("mix" == e2.settings.mode) {
      if (e2.settings.pasteAsTags) {
        var o2 = e2.convertPastedTextToMixTags(s3), r2 = e2.parseMixTags(o2, { skipDOM: true }), l2 = r2.__tagifyTagsData || [];
        e2.injectAtCaret(r2, window.getSelection().getRangeAt(0)), l2.forEach((function(t3) {
          return e2.value.push(t3);
        }));
        var d2 = e2.getTagElms().slice(-l2.length);
        d2.forEach((function(t3, e3) {
          return w(t3, l2[e3]);
        })), e2.update(), O(d2);
      } else e2.injectAtCaret(s3, window.getSelection().getRangeAt(0));
      e2.events.callbacks.onMixTagsInput.call(e2, t2);
    } else e2.injectAtCaret(s3, window.getSelection().getRangeAt(0)), e2.settings.pasteAsTags ? i2 = e2.addTags(e2.state.inputText + s3, true) : (e2.state.inputText = s3, e2.dropdown.show(s3));
    e2.trigger("paste", { event: t2, pastedText: a2, clipboardData: n2, tagsElems: i2 });
  })).catch((function(t3) {
    return t3;
  })));
}, onDrop: function(t2) {
  t2.preventDefault();
}, onEditTagInput: function(t2, e2) {
  var i2, n2 = t2.closest("." + this.settings.classNames.tag), a2 = this.getNodeIndex(n2), s2 = w(n2), o2 = this.input.normalize.call(this, t2), r2 = (B(i2 = {}, this.settings.tagTextProp, o2), B(i2, "__tagId", s2.__tagId), i2), l2 = this.validateTag(r2);
  this.editTagChangeDetected(u(s2, r2)) || true !== t2.originalIsValid || (l2 = true), n2.classList.toggle(this.settings.classNames.tagInvalid, true !== l2), s2.__isValid = l2, n2.title = true === l2 ? s2.title || s2.value : l2, o2.length >= this.settings.dropdown.enabled && (this.state.editing && (this.state.editing.value = o2), this.dropdown.show(o2)), this.trigger("edit:input", { tag: n2, index: a2, data: u({}, this.value[a2], { newValue: o2 }), event: e2 });
}, onEditTagPaste: function(t2, e2) {
  var i2 = (e2.clipboardData || window.clipboardData).getData("Text");
  e2.preventDefault();
  var n2 = y(i2);
  this.setRangeAtStartEnd(false, n2);
}, onEditTagClick: function(t2, e2) {
  this.events.callbacks.onClickScope.call(this, e2);
}, onEditTagFocus: function(t2) {
  this.state.editing = { scope: t2, input: t2.querySelector("[contenteditable]") };
}, onEditTagBlur: function(t2, e2) {
  var i2 = v.call(this, e2.relatedTarget);
  if ("select" == this.settings.mode && i2 && e2.relatedTarget.contains(e2.target)) this.dropdown.hide();
  else if (this.state.editing && (this.state.hasFocus || this.toggleFocusClass(), this.DOM.scope.contains(document.activeElement) || this.trigger("blur", {}), this.DOM.scope.contains(t2))) {
    var n2, a2, s2, o2 = this.settings, r2 = t2.closest("." + o2.classNames.tag), l2 = w(r2), d2 = this.input.normalize.call(this, t2), c2 = (B(n2 = {}, o2.tagTextProp, d2), B(n2, "__tagId", l2.__tagId), n2), g2 = l2.__originalData, h2 = this.editTagChangeDetected(u(l2, c2)), p2 = this.validateTag(c2);
    if (d2) if (h2) {
      var f2;
      if (a2 = this.hasMaxTags(), s2 = u({}, g2, (B(f2 = {}, o2.tagTextProp, this.trim(d2)), B(f2, "__isValid", p2), f2)), o2.transformTag.call(this, s2, g2), true !== (p2 = (!a2 || true === g2.__isValid) && this.validateTag(s2))) {
        if (this.trigger("invalid", { data: s2, tag: r2, message: p2 }), o2.editTags.keepInvalid) return;
        o2.keepInvalidTags ? s2.__isValid = p2 : s2 = g2;
      } else o2.keepInvalidTags && (delete s2.title, delete s2["aria-invalid"], delete s2.class);
      this.onEditTagDone(r2, s2);
    } else this.onEditTagDone(r2, g2);
    else this.onEditTagDone(r2);
  }
}, onEditTagkeydown: function(t2, e2) {
  if (!this.state.composing) switch (this.trigger("edit:keydown", { event: t2 }), t2.key) {
    case "Esc":
    case "Escape":
      this.state.editing = false, !!e2.__tagifyTagData.__originalData.value ? e2.parentNode.replaceChild(e2.__tagifyTagData.__originalHTML, e2) : e2.remove();
      break;
    case "Enter":
    case "Tab":
      t2.preventDefault();
      setTimeout((function() {
        return t2.target.blur();
      }), 0);
  }
}, onDoubleClickScope: function(t2) {
  var e2 = t2.target.closest("." + this.settings.classNames.tag);
  if (e2) {
    var i2, n2, a2 = w(e2), s2 = this.settings;
    false !== (null == a2 ? void 0 : a2.editable) && (i2 = e2.classList.contains(this.settings.classNames.tagEditing), n2 = e2.hasAttribute("readonly"), s2.readonly || i2 || n2 || !this.settings.editTags || !s2.userInput || (this.events.callbacks.onEditTagFocus.call(this, e2), this.editTag(e2)), this.toggleFocusClass(true), "select" != s2.mode && this.trigger("dblclick", { tag: e2, index: this.getNodeIndex(e2), data: w(e2) }));
  }
}, onInputDOMChange: function(t2) {
  var e2 = this, i2 = this.DOM.input.lastChild;
  t2.forEach((function(t3) {
    t3.addedNodes.forEach((function(t4) {
      if ("<div><br></div>" == t4.outerHTML) t4.replaceWith(document.createElement("br"));
      else if (1 == t4.nodeType && t4.querySelector(e2.settings.classNames.tagSelector)) {
        var i3, n2 = document.createTextNode("");
        3 == t4.childNodes[0].nodeType && "BR" != t4.previousSibling.nodeName && (n2 = document.createTextNode("\n")), (i3 = t4).replaceWith.apply(i3, U([n2].concat(U(U(t4.childNodes).slice(0, -1))))), T(n2);
      } else if (v.call(e2, t4)) {
        var a2;
        if (3 != (null === (a2 = t4.previousSibling) || void 0 === a2 ? void 0 : a2.nodeType) || t4.previousSibling.textContent || t4.previousSibling.remove(), t4.previousSibling && "BR" == t4.previousSibling.nodeName) {
          t4.previousSibling.replaceWith("\n​");
          for (var s2 = t4.nextSibling, o2 = ""; s2; ) o2 += s2.textContent, s2 = s2.nextSibling;
          o2.trim() && T(t4.previousSibling);
        } else t4.previousSibling && !w(t4.previousSibling) || t4.before("​");
      }
    })), t3.removedNodes.forEach((function(t4) {
      t4 && "BR" == t4.nodeName && v.call(e2, i2) && (e2.removeTags(i2), e2.fixFirefoxLastTagNoCaret());
    }));
  })), i2 && "" == i2.nodeValue && i2.remove(), i2 && "BR" == i2.nodeName || this.DOM.input.appendChild(document.createElement("br"));
} } };
function z(t2, e2) {
  (null == e2 || e2 > t2.length) && (e2 = t2.length);
  for (var i2 = 0, n2 = new Array(e2); i2 < e2; i2++) n2[i2] = t2[i2];
  return n2;
}
function X(t2, e2, i2) {
  return e2 in t2 ? Object.defineProperty(t2, e2, { value: i2, enumerable: true, configurable: true, writable: true }) : t2[e2] = i2, t2;
}
function J(t2, e2) {
  return null != e2 && "undefined" != typeof Symbol && e2[Symbol.hasInstance] ? !!e2[Symbol.hasInstance](t2) : t2 instanceof e2;
}
function G(t2) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var i2 = null != arguments[e2] ? arguments[e2] : {}, n2 = Object.keys(i2);
    "function" == typeof Object.getOwnPropertySymbols && (n2 = n2.concat(Object.getOwnPropertySymbols(i2).filter((function(t3) {
      return Object.getOwnPropertyDescriptor(i2, t3).enumerable;
    })))), n2.forEach((function(e3) {
      X(t2, e3, i2[e3]);
    }));
  }
  return t2;
}
function $(t2, e2) {
  return e2 = null != e2 ? e2 : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(e2)) : (function(t3, e3) {
    var i2 = Object.keys(t3);
    if (Object.getOwnPropertySymbols) {
      var n2 = Object.getOwnPropertySymbols(t3);
      i2.push.apply(i2, n2);
    }
    return i2;
  })(Object(e2)).forEach((function(i2) {
    Object.defineProperty(t2, i2, Object.getOwnPropertyDescriptor(e2, i2));
  })), t2;
}
function Q(t2) {
  return (function(t3) {
    if (Array.isArray(t3)) return z(t3);
  })(t2) || (function(t3) {
    if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"]) return Array.from(t3);
  })(t2) || (function(t3, e2) {
    if (!t3) return;
    if ("string" == typeof t3) return z(t3, e2);
    var i2 = Object.prototype.toString.call(t3).slice(8, -1);
    "Object" === i2 && t3.constructor && (i2 = t3.constructor.name);
    if ("Map" === i2 || "Set" === i2) return Array.from(i2);
    if ("Arguments" === i2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i2)) return z(t3, e2);
  })(t2) || (function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  })();
}
function Y(t2, e2) {
  if (!t2) {
    n.warn("input element not found", t2);
    var i2 = new Proxy(this, { get: function() {
      return function() {
        return i2;
      };
    } });
    return i2;
  }
  if (t2.__tagify) return n.warn("input element is already Tagified - Same instance is returned.", t2), t2.__tagify;
  var a2;
  u(this, (function(t3) {
    var e3 = document.createTextNode(""), i3 = {};
    function a3(t4, i4, n2) {
      n2 && i4.split(/\s+/g).forEach((function(i5) {
        return e3[t4 + "EventListener"].call(e3, i5, n2);
      }));
    }
    return { removeAllCustomListeners: function() {
      Object.entries(i3).forEach((function(t4) {
        var e4 = F(t4, 2), i4 = e4[0];
        e4[1].forEach((function(t5) {
          return a3("remove", i4, t5);
        }));
      })), i3 = {};
    }, off: function(t4, e4) {
      return t4 && (e4 ? a3("remove", t4, e4) : t4.split(/\s+/g).forEach((function(t5) {
        var e5;
        null === (e5 = i3[t5]) || void 0 === e5 || e5.forEach((function(e6) {
          return a3("remove", t5, e6);
        })), delete i3[t5];
      }))), this;
    }, on: function(t4, e4) {
      return e4 && "function" == typeof e4 && (t4.split(/\s+/g).forEach((function(t5) {
        Array.isArray(i3[t5]) ? i3[t5].push(e4) : i3[t5] = [e4];
      })), a3("add", t4, e4)), this;
    }, trigger: function(i4, a4, s2) {
      var o2;
      if (s2 = s2 || { cloneData: true }, i4) if (t3.settings.isJQueryPlugin) "remove" == i4 && (i4 = "removeTag"), jQuery(t3.DOM.originalInput).triggerHandler(i4, [a4]);
      else {
        try {
          var r2 = "object" == typeof a4 ? a4 : { value: a4 };
          if ((r2 = s2.cloneData ? u({}, r2) : r2).tagify = this, a4.event && (r2.event = this.cloneEvent(a4.event)), R(a4, Object)) for (var l2 in a4) R(a4[l2], HTMLElement) && (r2[l2] = a4[l2]);
          o2 = new CustomEvent(i4, { detail: r2 });
        } catch (t4) {
          n.warn(t4);
        }
        e3.dispatchEvent(o2);
      }
    } };
  })(this)), this.isFirefox = /firefox|fxios/i.test(navigator.userAgent) && !/seamonkey/i.test(navigator.userAgent), this.isIE = window.document.documentMode, e2 = e2 || {}, this.getPersistedData = (a2 = e2.id, function(t3) {
    var e3;
    if (a2) {
      var i3, n2 = "/" + t3;
      if (1 === (null === (e3 = localStorage) || void 0 === e3 ? void 0 : e3.getItem(L + a2 + "/v"))) try {
        i3 = JSON.parse(localStorage[L + a2 + n2]);
      } catch (t4) {
      }
      return i3;
    }
  }), this.setPersistedData = (function(t3) {
    var e3;
    return t3 ? (null === (e3 = localStorage) || void 0 === e3 || e3.setItem(L + t3 + "/v", 1), function(e4, i3) {
      var n2, a3 = "/" + i3, s2 = JSON.stringify(e4);
      e4 && i3 && (null === (n2 = localStorage) || void 0 === n2 || n2.setItem(L + t3 + a3, s2), dispatchEvent(new Event("storage")));
    }) : function() {
    };
  })(e2.id), this.clearPersistedData = /* @__PURE__ */ (function(t3) {
    return function(e3) {
      var i3 = L + "/" + t3 + "/";
      if (e3) localStorage.removeItem(i3 + e3);
      else for (var n2 in localStorage) n2.includes(i3) && localStorage.removeItem(n2);
    };
  })(e2.id), this.applySettings(t2, e2), this.state = { inputText: "", editing: false, composing: false, actions: {}, mixMode: {}, dropdown: {}, flaggedTags: {} }, this.value = [], this.listeners = {}, this.DOM = {}, this.build(t2), A.call(this), this.getCSSVars(), this.loadOriginalValues(), this.events.customBinding.call(this), this.events.binding.call(this), t2.autofocus && this.DOM.input.focus(), t2.__tagify = this;
}
Y.prototype = { _dropdown: k, placeCaretAfterNode: T, getSetTagData: w, helpers: { sameStr: a, removeCollectionProp: s, omit: o, isObject: c, parseHTML: r, escapeHTML: d, extend: u, concatWithoutDups: g, getUID: f, isNodeTag: v }, customEventsList: ["change", "add", "remove", "invalid", "input", "paste", "click", "keydown", "focus", "blur", "edit:input", "edit:beforeUpdate", "edit:updated", "edit:start", "edit:keydown", "dropdown:show", "dropdown:hide", "dropdown:select", "dropdown:updated", "dropdown:noMatch", "dropdown:scroll"], dataProps: ["__isValid", "__removed", "__originalData", "__originalHTML", "__tagId"], trim: function(t2) {
  return this.settings.trim && t2 && "string" == typeof t2 ? t2.trim() : t2;
}, parseHTML: r, templates: j, parseTemplate: function(t2, e2) {
  return r((t2 = this.settings.templates[t2] || t2).apply(this, e2));
}, set whitelist(t2) {
  var e2 = t2 && Array.isArray(t2);
  this.settings.whitelist = e2 ? t2 : [], this.setPersistedData(e2 ? t2 : [], "whitelist");
}, get whitelist() {
  return this.settings.whitelist;
}, set userInput(t2) {
  this.settings.userInput = !!t2, this.setContentEditable(!!t2);
}, get userInput() {
  return this.settings.userInput;
}, generateClassSelectors: function(t2) {
  var e2 = function(e3) {
    var i3 = e3;
    Object.defineProperty(t2, i3 + "Selector", { get: function() {
      return "." + this[i3].split(" ")[0];
    } });
  };
  for (var i2 in t2) e2(i2);
}, applySettings: function(t2, e2) {
  var i2, n2;
  x.templates = this.templates;
  var a2 = u({}, x, "mix" == e2.mode ? { pasteAsTags: false, dropdown: { position: "text" } } : {}), s2 = this.settings = u({}, a2, e2);
  if (s2.disabled = t2.hasAttribute("disabled"), s2.readonly = s2.readonly || t2.hasAttribute("readonly"), s2.placeholder = d(t2.getAttribute("placeholder") || s2.placeholder || ""), s2.required = t2.hasAttribute("required"), this.generateClassSelectors(s2.classNames), this.isIE && (s2.autoComplete = false), ["whitelist", "blacklist"].forEach((function(e3) {
    var i3 = t2.getAttribute("data-" + e3);
    i3 && J(i3 = i3.split(s2.delimiters), Array) && (s2[e3] = i3);
  })), "autoComplete" in e2 && !c(e2.autoComplete) && (s2.autoComplete = x.autoComplete, s2.autoComplete.enabled = e2.autoComplete), "mix" == s2.mode && (s2.pattern = s2.pattern || /@/, s2.autoComplete.rightKey = true, s2.delimiters = e2.delimiters || null, s2.tagTextProp && !s2.dropdown.searchKeys.includes(s2.tagTextProp) && s2.dropdown.searchKeys.push(s2.tagTextProp)), t2.pattern) try {
    s2.pattern = new RegExp(t2.pattern);
  } catch (t3) {
  }
  if (s2.delimiters) {
    s2._delimiters = s2.delimiters;
    try {
      s2.delimiters = new RegExp(this.settings.delimiters, "g");
    } catch (t3) {
    }
  }
  (s2.disabled || s2.readonly) && (s2.userInput = false), this.TEXTS = G({}, P, s2.texts || {}), "select" == s2.mode && (s2.dropdown.includeSelectedTags = true), ("select" != s2.mode || (null === (i2 = e2.dropdown) || void 0 === i2 ? void 0 : i2.enabled)) && s2.userInput || (s2.dropdown.enabled = 0), s2.disabled && (s2.dropdown.enabled = false), s2.dropdown.appendTarget = (null === (n2 = e2.dropdown) || void 0 === n2 ? void 0 : n2.appendTarget) || document.body, void 0 === s2.dropdown.includeSelectedTags && (s2.dropdown.includeSelectedTags = s2.duplicates);
  var o2 = this.getPersistedData("whitelist");
  Array.isArray(o2) && (this.whitelist = Array.isArray(s2.whitelist) ? g(s2.whitelist, o2) : o2);
}, getAttributes: function(t2) {
  var e2, i2 = this.getCustomAttributes(t2), n2 = "";
  for (e2 in i2) n2 += " " + e2 + (void 0 !== t2[e2] ? '="'.concat(i2[e2], '"') : "");
  return n2;
}, getCustomAttributes: function(t2) {
  if (!c(t2)) return "";
  var e2, i2 = {};
  for (e2 in t2) "__" != e2.slice(0, 2) && "class" != e2 && t2.hasOwnProperty(e2) && void 0 !== t2[e2] && (i2[e2] = d(t2[e2]));
  return i2;
}, setStateSelection: function() {
  var t2 = window.getSelection(), e2 = { anchorOffset: t2.anchorOffset, anchorNode: t2.anchorNode, range: t2.getRangeAt && t2.rangeCount && t2.getRangeAt(0) };
  return this.state.selection = e2, e2;
}, getCSSVars: function() {
  var t2, e2, i2, n2 = getComputedStyle(this.DOM.scope, null);
  this.CSSVars = { tagHideTransition: (t2 = (function(t3) {
    if (!t3) return {};
    var e3 = (t3 = t3.trim().split(" ")[0]).split(/\d+/g).filter((function(t4) {
      return t4;
    })).pop().trim();
    return { value: +t3.split(e3).filter((function(t4) {
      return t4;
    }))[0].trim(), unit: e3 };
  })((i2 = "tag-hide-transition", n2.getPropertyValue("--" + i2))), e2 = t2.value, "s" == t2.unit ? 1e3 * e2 : e2) };
}, build: function(t2) {
  var e2 = this.DOM, i2 = t2.closest("label");
  this.settings.mixMode.integrated ? (e2.originalInput = null, e2.scope = t2, e2.input = t2) : (e2.originalInput = t2, e2.originalInput_tabIndex = t2.tabIndex, e2.scope = this.parseTemplate("wrapper", [t2, this.settings]), e2.input = e2.scope.querySelector(this.settings.classNames.inputSelector), t2.parentNode.insertBefore(e2.scope, t2), t2.tabIndex = -1), i2 && i2.setAttribute("for", "");
}, destroy: function() {
  var t2, e2, i2;
  this.events.unbindGlobal.call(this), null === (t2 = this.DOM.scope.parentNode) || void 0 === t2 || t2.removeChild(this.DOM.scope), this.DOM.originalInput.tabIndex = this.DOM.originalInput_tabIndex, delete this.DOM.originalInput.__tagify, this.dropdown.hide(true), this.removeAllCustomListeners(), clearTimeout(this.dropdownHide__bindEventsTimeout), clearInterval(null === (i2 = this.listeners) || void 0 === i2 || null === (e2 = i2.main) || void 0 === e2 ? void 0 : e2.originalInputValueObserverInterval);
}, loadOriginalValues: function(t2) {
  var e2, i2 = this.settings;
  if (this.state.blockChangeEvent = true, void 0 === t2) {
    var n2 = this.getPersistedData("value");
    t2 = n2 && !this.DOM.originalInput.value ? n2 : i2.mixMode.integrated ? this.DOM.input.textContent : this.DOM.originalInput.value;
  }
  if (this.removeAllTags(), t2) if ("mix" == i2.mode) this.parseMixTags(t2), (e2 = this.DOM.input.lastChild) && "BR" == e2.tagName || this.DOM.input.insertAdjacentHTML("beforeend", "<br>");
  else {
    try {
      J(JSON.parse(t2), Array) && (t2 = JSON.parse(t2));
    } catch (t3) {
    }
    this.addTags(t2, true).forEach((function(t3) {
      return t3 && t3.classList.add(i2.classNames.tagNoAnimation);
    }));
  }
  else this.postUpdate();
  this.state.lastOriginalValueReported = i2.mixMode.integrated ? "" : this.DOM.originalInput.value;
}, cloneEvent: function(t2) {
  var e2 = {};
  for (var i2 in t2) "path" != i2 && (e2[i2] = t2[i2]);
  return e2;
}, loading: function(t2) {
  return this.state.isLoading = t2, this.DOM.scope.classList[t2 ? "add" : "remove"](this.settings.classNames.scopeLoading), this;
}, tagLoading: function(t2, e2) {
  return t2 && t2.classList[e2 ? "add" : "remove"](this.settings.classNames.tagLoading), this;
}, toggleClass: function(t2, e2) {
  "string" == typeof t2 && this.DOM.scope.classList.toggle(t2, e2);
}, toggleScopeValidation: function(t2) {
  var e2 = true === t2 || void 0 === t2;
  !this.settings.required && t2 && t2 === this.TEXTS.empty && (e2 = true), this.toggleClass(this.settings.classNames.tagInvalid, !e2), this.DOM.scope.title = e2 ? "" : t2;
}, toggleFocusClass: function(t2) {
  this.toggleClass(this.settings.classNames.focus, !!t2);
}, setPlaceholder: function(t2) {
  var e2 = this;
  ["data", "aria"].forEach((function(i2) {
    return e2.DOM.input.setAttribute("".concat(i2, "-placeholder"), t2);
  }));
}, triggerChangeEvent: function() {
  if (!this.settings.mixMode.integrated) {
    var t2 = this.DOM.originalInput, e2 = this.state.lastOriginalValueReported !== t2.value, i2 = new CustomEvent("change", { bubbles: true });
    e2 && (this.state.lastOriginalValueReported = t2.value, i2.simulated = true, t2._valueTracker && t2._valueTracker.setValue(Math.random()), t2.dispatchEvent(i2), this.trigger("change", this.state.lastOriginalValueReported), t2.value = this.state.lastOriginalValueReported);
  }
}, events: K, fixFirefoxLastTagNoCaret: function() {
}, setRangeAtStartEnd: function(t2, e2) {
  if (e2) {
    t2 = "number" == typeof t2 ? t2 : !!t2, e2 = e2.lastChild || e2;
    var i2 = document.getSelection();
    if (J(i2.focusNode, Element) && !this.DOM.input.contains(i2.focusNode)) return true;
    try {
      i2.rangeCount >= 1 && ["Start", "End"].forEach((function(n2) {
        return i2.getRangeAt(0)["set" + n2](e2, t2 || e2.length);
      }));
    } catch (t3) {
      console.warn(t3);
    }
  }
}, insertAfterTag: function(t2, e2) {
  if (e2 = e2 || this.settings.mixMode.insertAfterTag, t2 && t2.parentNode && e2) return e2 = "string" == typeof e2 ? document.createTextNode(e2) : e2, t2.parentNode.insertBefore(e2, t2.nextSibling), e2;
}, editTagChangeDetected: function(t2) {
  var e2 = t2.__originalData;
  for (var i2 in e2) if (!this.dataProps.includes(i2) && t2[i2] != e2[i2]) return true;
  return false;
}, getTagTextNode: function(t2) {
  return t2.querySelector(this.settings.classNames.tagTextSelector);
}, setTagTextNode: function(t2, e2) {
  this.getTagTextNode(t2).innerHTML = d(e2);
}, editTag: function(t2, e2) {
  var i2 = this;
  t2 = t2 || this.getLastTag(), e2 = e2 || {};
  var a2 = this.settings, s2 = this.getTagTextNode(t2), o2 = this.getNodeIndex(t2), r2 = w(t2), l2 = this.events.callbacks, d2 = true, c2 = "select" == a2.mode;
  if (!c2 && this.dropdown.hide(), s2) {
    if (!J(r2, Object) || !("editable" in r2) || r2.editable) return r2 = w(t2, { __originalData: u({}, r2), __originalHTML: t2.cloneNode(true) }), w(r2.__originalHTML, r2.__originalData), s2.setAttribute("contenteditable", true), t2.classList.add(a2.classNames.tagEditing), this.events.callbacks.onEditTagFocus.call(this, t2), s2.addEventListener("click", l2.onEditTagClick.bind(this, t2)), s2.addEventListener("blur", l2.onEditTagBlur.bind(this, this.getTagTextNode(t2))), s2.addEventListener("input", l2.onEditTagInput.bind(this, s2)), s2.addEventListener("paste", l2.onEditTagPaste.bind(this, s2)), s2.addEventListener("keydown", (function(e3) {
      return l2.onEditTagkeydown.call(i2, e3, t2);
    })), s2.addEventListener("compositionstart", l2.onCompositionStart.bind(this)), s2.addEventListener("compositionend", l2.onCompositionEnd.bind(this)), e2.skipValidation || (d2 = this.editTagToggleValidity(t2)), s2.originalIsValid = d2, this.trigger("edit:start", { tag: t2, index: o2, data: r2, isValid: d2 }), s2.focus(), !c2 && this.setRangeAtStartEnd(false, s2), 0 === a2.dropdown.enabled && !c2 && this.dropdown.show(), this.state.hasFocus = true, this;
  } else n.warn("Cannot find element in Tag template: .", a2.classNames.tagTextSelector);
}, editTagToggleValidity: function(t2, e2) {
  var i2;
  if (e2 = e2 || w(t2)) return (i2 = !("__isValid" in e2) || true === e2.__isValid) || this.removeTagsFromValue(t2), this.update(), t2.classList.toggle(this.settings.classNames.tagNotAllowed, !i2), e2.__isValid = i2, e2.__isValid;
  n.warn("tag has no data: ", t2, e2);
}, onEditTagDone: function(t2, e2) {
  t2 = t2 || this.state.editing.scope, e2 = e2 || {};
  var i2, n2, a2 = this.settings, s2 = { tag: t2, index: this.getNodeIndex(t2), previousData: w(t2), data: e2 };
  this.trigger("edit:beforeUpdate", s2, { cloneData: false }), this.state.editing = false, delete e2.__originalData, delete e2.__originalHTML, t2 && t2.parentNode && ((void 0 !== (n2 = e2[a2.tagTextProp]) ? null === (i2 = (n2 += "").trim) || void 0 === i2 ? void 0 : i2.call(n2) : a2.tagTextProp in e2 ? void 0 : e2.value) ? (t2 = this.replaceTag(t2, e2), this.editTagToggleValidity(t2, e2), a2.a11y.focusableTags ? t2.focus() : "select" != a2.mode && T(t2)) : this.removeTags(t2)), this.trigger("edit:updated", s2), a2.dropdown.closeOnSelect && this.dropdown.hide(), this.settings.keepInvalidTags && this.reCheckInvalidTags();
}, replaceTag: function(t2, e2) {
  e2 && "" !== e2.value && void 0 !== e2.value || (e2 = t2.__tagifyTagData), e2.__isValid && 1 != e2.__isValid && u(e2, this.getInvalidTagAttrs(e2, e2.__isValid));
  var i2 = this.createTagElem(e2);
  return t2.parentNode.replaceChild(i2, t2), this.updateValueByDOMTags(), i2;
}, updateValueByDOMTags: function() {
  var t2 = this;
  this.value.length = 0;
  var e2 = this.settings.classNames, i2 = [e2.tagNotAllowed.split(" ")[0], e2.tagHide];
  [].forEach.call(this.getTagElms(), (function(e3) {
    Q(e3.classList).some((function(t3) {
      return i2.includes(t3);
    })) || t2.value.push(w(e3));
  })), this.update(), this.dropdown.refilter();
}, injectAtCaret: function(t2, e2) {
  var i2;
  if (e2 = e2 || (null === (i2 = this.state.selection) || void 0 === i2 ? void 0 : i2.range), "string" == typeof t2 && (t2 = document.createTextNode(t2)), !t2) return this;
  var n2 = 11 === t2.nodeType ? Array.prototype.slice.call(t2.childNodes) : [t2];
  if (!n2.length) return this;
  if (!e2) return this.appendMixTags(t2), this;
  if (!this.DOM.scope.contains(null == e2 ? void 0 : e2.startContainer)) return this;
  y(t2, e2);
  var a2 = n2[n2.length - 1] || t2;
  return (null == a2 ? void 0 : a2.parentNode) && T(a2), this.setStateSelection(), this.updateValueByDOMTags(), this.update(), this;
}, input: { set: function() {
  var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i2 = this.settings, n2 = i2.dropdown.closeOnSelect;
  this.state.inputText = t2, e2 && (this.DOM.input.innerHTML = d("" + t2), t2 && this.toggleClass(i2.classNames.empty, !this.DOM.input.innerHTML)), !t2 && n2 && this.dropdown.hide.bind(this), this.input.autocomplete.suggest.call(this), this.input.validate.call(this);
}, raw: function() {
  return this.DOM.input.textContent;
}, validate: function() {
  var t2 = !this.state.inputText || true === this.validateTag({ value: this.state.inputText });
  return this.DOM.input.classList.toggle(this.settings.classNames.inputInvalid, !t2), t2;
}, normalize: function(t2, e2) {
  var i2 = t2 || this.DOM.input, n2 = [];
  i2.childNodes.forEach((function(t3) {
    return 3 == t3.nodeType && n2.push(t3.nodeValue);
  })), n2 = n2.join("\n");
  try {
    n2 = n2.replace(/(?:\r\n|\r|\n)/g, this.settings.delimiters.source.charAt(0));
  } catch (t3) {
  }
  return n2 = n2.replace(/\s/g, " "), (null == e2 ? void 0 : e2.trim) ? this.trim(n2) : n2;
}, autocomplete: { suggest: function(t2) {
  if (this.settings.autoComplete.enabled) {
    "object" != typeof (t2 = t2 || { value: "" }) && (t2 = { value: t2 });
    var e2 = this.dropdown.getMappedValue(t2);
    if ("number" != typeof e2) {
      var i2 = this.state.inputText.toLowerCase(), n2 = e2.substr(0, this.state.inputText.length).toLowerCase(), a2 = e2.substring(this.state.inputText.length);
      e2 && this.state.inputText && n2 == i2 ? (this.DOM.input.setAttribute("data-suggest", a2), this.state.inputSuggestion = t2) : (this.DOM.input.removeAttribute("data-suggest"), delete this.state.inputSuggestion);
    }
  }
}, set: function(t2) {
  var e2 = this.DOM.input.getAttribute("data-suggest"), i2 = t2 || (e2 ? this.state.inputText + e2 : null);
  return !!i2 && ("mix" == this.settings.mode ? this.replaceTextWithNode(document.createTextNode(this.state.tag.prefix + i2)) : (this.input.set.call(this, i2), this.setRangeAtStartEnd(false, this.DOM.input)), this.input.autocomplete.suggest.call(this), this.dropdown.hide(), true);
} } }, getTagIdx: function(t2) {
  return this.value.findIndex((function(e2) {
    return e2.__tagId == (t2 || {}).__tagId;
  }));
}, getNodeIndex: function(t2) {
  var e2 = 0;
  if (t2) for (; t2 = t2.previousElementSibling; ) e2++;
  return e2;
}, getTagElms: function() {
  for (var t2 = arguments.length, e2 = new Array(t2), i2 = 0; i2 < t2; i2++) e2[i2] = arguments[i2];
  var n2 = "." + Q(this.settings.classNames.tag.split(" ")).concat(Q(e2)).join(".");
  return [].slice.call(this.DOM.scope.querySelectorAll(n2));
}, getLastTag: function() {
  var t2 = this.settings.classNames, e2 = this.DOM.scope.querySelectorAll("".concat(t2.tagSelector, ":not(.").concat(t2.tagHide, "):not([readonly])"));
  return e2[e2.length - 1];
}, isTagDuplicate: function(t2, e2, i2) {
  var n2 = 0, s2 = true, o2 = false, r2 = void 0;
  try {
    for (var l2, d2 = this.value[Symbol.iterator](); !(s2 = (l2 = d2.next()).done); s2 = true) {
      var c2 = l2.value;
      a(this.trim("" + t2), c2.value, e2) && i2 != c2.__tagId && n2++;
    }
  } catch (t3) {
    o2 = true, r2 = t3;
  } finally {
    try {
      s2 || null == d2.return || d2.return();
    } finally {
      if (o2) throw r2;
    }
  }
  return n2;
}, getTagIndexByValue: function(t2) {
  var e2 = this, i2 = [], n2 = this.settings.dropdown.caseSensitive;
  return this.getTagElms().forEach((function(s2, o2) {
    s2.__tagifyTagData && a(e2.trim(s2.__tagifyTagData.value), t2, n2) && i2.push(o2);
  })), i2;
}, getTagElmByValue: function(t2) {
  var e2 = this.getTagIndexByValue(t2)[0];
  return this.getTagElms()[e2];
}, flashTag: function(t2) {
  var e2 = this;
  t2 && (t2.classList.add(this.settings.classNames.tagFlash), setTimeout((function() {
    t2.classList.remove(e2.settings.classNames.tagFlash);
  }), 100));
}, isTagBlacklisted: function(t2) {
  return t2 = this.trim(t2.toLowerCase()), this.settings.blacklist.filter((function(e2) {
    return ("" + e2).toLowerCase() == t2;
  })).length;
}, isTagWhitelisted: function(t2) {
  return !!this.getWhitelistItem(t2);
}, getWhitelistItem: function(t2, e2, i2) {
  e2 = e2 || "value";
  var n2, s2 = this.settings;
  return (i2 = i2 || s2.whitelist).some((function(i3) {
    var o2 = "object" == typeof i3 ? i3[e2] || i3.value : i3;
    if (a(o2, t2, s2.dropdown.caseSensitive, s2.trim)) return n2 = "object" == typeof i3 ? i3 : { value: i3 }, true;
  })), n2 || "value" != e2 || "value" == s2.tagTextProp || (n2 = this.getWhitelistItem(t2, s2.tagTextProp, i2)), n2;
}, validateTag: function(t2) {
  var e2 = this.settings, i2 = "value" in t2 ? "value" : e2.tagTextProp, n2 = this.trim(t2[i2] + "");
  return (t2[i2] + "").trim() ? "mix" != e2.mode && e2.pattern && J(e2.pattern, RegExp) && !e2.pattern.test(n2) ? this.TEXTS.pattern : !e2.duplicates && this.isTagDuplicate(n2, e2.dropdown.caseSensitive, t2.__tagId) ? this.TEXTS.duplicate : this.isTagBlacklisted(n2) || e2.enforceWhitelist && !this.isTagWhitelisted(n2) ? this.TEXTS.notAllowed : !e2.validate || e2.validate(t2) : this.TEXTS.empty;
}, getInvalidTagAttrs: function(t2, e2) {
  return { "aria-invalid": true, class: "".concat(t2.class || "", " ").concat(this.settings.classNames.tagNotAllowed).trim(), title: e2 };
}, hasMaxTags: function() {
  return this.value.length >= this.settings.maxTags && this.TEXTS.exceed;
}, setReadonly: function(t2, e2) {
  var i2 = this.settings;
  this.DOM.scope.contains(document.activeElement) && document.activeElement.blur(), i2[e2 || "readonly"] = t2, this.DOM.scope[(t2 ? "set" : "remove") + "Attribute"](e2 || "readonly", true), this.settings.userInput = true, this.setContentEditable(!t2), t2 || (this.events.binding.call(this, true), this.events.binding.call(this));
}, setContentEditable: function(t2) {
  this.DOM.scope.querySelectorAll("[data-can-editable]").forEach((function(e2) {
    e2.contentEditable = t2, e2.tabIndex = t2 ? 0 : -1;
  }));
}, setDisabled: function(t2) {
  this.setReadonly(t2, "disabled");
}, normalizeTags: function(t2) {
  var e2 = this, i2 = this.settings, n2 = i2.whitelist, a2 = i2.delimiters, s2 = i2.mode, o2 = i2.tagTextProp, r2 = [], l2 = !!n2 && J(n2[0], Object), d2 = Array.isArray(t2), g2 = d2 && t2[0].value, h2 = function(t3) {
    return (t3 + "").split(a2).reduce((function(t4, i3) {
      var n3, a3 = e2.trim(i3);
      return a3 && t4.push((X(n3 = {}, o2, a3), X(n3, "value", a3), n3)), t4;
    }), []);
  };
  if ("number" == typeof t2 && (t2 = t2.toString()), "string" == typeof t2) {
    if (!t2.trim()) return [];
    t2 = h2(t2);
  } else d2 && (t2 = t2.reduce((function(t3, i3) {
    if (c(i3)) {
      var n3 = u({}, i3);
      o2 in n3 || (o2 = "value"), n3[o2] = e2.trim(n3[o2]), (n3[o2] || 0 === n3[o2]) && t3.push(n3);
    } else if (null != i3 && "" !== i3 && void 0 !== i3) {
      var a3;
      (a3 = t3).push.apply(a3, Q(h2(i3)));
    }
    return t3;
  }), []));
  return l2 && !g2 && (t2.forEach((function(t3) {
    var i3 = r2.map((function(t4) {
      return t4.value;
    })), n3 = e2.dropdown.filterListItems.call(e2, t3[o2], { exact: true });
    e2.settings.duplicates || (n3 = n3.filter((function(t4) {
      return !i3.includes(t4.value);
    })));
    var a3 = n3.length > 1 ? e2.getWhitelistItem(t3[o2], o2, n3) : n3[0];
    a3 && J(a3, Object) ? r2.push(a3) : "mix" != s2 && (null == t3.value && (t3.value = t3[o2]), r2.push(t3));
  })), r2.length && (t2 = r2)), t2;
}, parseMixTags: function(t2, e2) {
  var i2 = this, n2 = this.settings, a2 = n2.mixTagsInterpolator, s2 = n2.duplicates, o2 = n2.transformTag, r2 = n2.enforceWhitelist, l2 = n2.maxTags, d2 = n2.tagTextProp, c2 = null == e2 ? void 0 : e2.skipDOM, u2 = c2 ? document.createDocumentFragment() : null, g2 = [];
  if (t2 = t2.split(a2[0]).map((function(t3, e3) {
    var n3, h3, p2, f2 = t3.split(a2[1]), v2 = f2[0], m2 = g2.length == l2;
    if (c2 && 0 == e3 && t3) return u2.appendChild(document.createTextNode(t3)), "";
    try {
      if (v2 == +v2) throw Error;
      h3 = JSON.parse(v2);
    } catch (t4) {
      h3 = i2.normalizeTags(v2)[0] || { value: v2 };
    }
    if (o2.call(i2, h3), m2 || !(f2.length > 1) || r2 && !i2.isTagWhitelisted(h3.value) || !s2 && i2.isTagDuplicate(h3.value)) {
      if (t3) return c2 ? (u2.appendChild(document.createTextNode(a2[0] + t3)), "") : e3 ? a2[0] + t3 : t3;
    } else {
      if (h3[n3 = h3[d2] ? d2 : "value"] = i2.trim(h3[n3]), p2 = i2.createTagElem(h3), g2.push(h3), p2.classList.add(i2.settings.classNames.tagNoAnimation), c2) return u2.appendChild(p2), f2[1] && u2.appendChild(document.createTextNode(f2[1])), "";
      f2[0] = p2.outerHTML, i2.value.push(h3);
    }
    return f2.join("");
  })).join(""), c2) return u2.__tagifyTagsData = g2, u2;
  this.DOM.input.innerHTML = t2, this.DOM.input.appendChild(document.createTextNode("")), this.DOM.input.normalize();
  var h2 = this.getTagElms();
  return h2.forEach((function(t3, e3) {
    return w(t3, g2[e3]);
  })), this.update({ withoutChangeEvent: true }), O(h2, this.state.hasFocus), t2;
}, convertPastedTextToMixTags: function(t2) {
  var e2 = this.settings, i2 = e2.pattern, n2 = e2.whitelist, a2 = e2.mixTagsInterpolator, s2 = e2.mixTagsAllowedAfter, o2 = e2.tagTextProp;
  if (!i2 || !(null == n2 ? void 0 : n2.length)) return t2;
  var r2 = i2.source ? i2.source.split("|") : [i2], l2 = {};
  r2.forEach((function(t3) {
    var e3 = t3.replace(/\\/g, "");
    l2[e3] = n2.map((function(t4) {
      var e4;
      return e4 = "string" == typeof t4 ? t4 : t4[o2] || t4.value, { originalItem: t4, value: e4 = String(e4), searchValue: e4.toLowerCase() };
    })).sort((function(t4, e4) {
      return e4.value.length - t4.value.length;
    }));
  }));
  for (var d2, c2 = new RegExp(i2.source, "g"), u2 = []; null !== (d2 = c2.exec(t2)); ) {
    var g2 = d2[0], h2 = d2.index, p2 = h2 + g2.length, f2 = t2.slice(p2), v2 = l2[g2];
    if (v2) {
      var m2 = null, b2 = 0, y2 = true, w2 = false, T2 = void 0;
      try {
        for (var O2, x2 = v2[Symbol.iterator](); !(y2 = (O2 = x2.next()).done); y2 = true) {
          var D2 = O2.value, S2 = D2.value.length;
          if (f2.slice(0, S2).toLowerCase() === D2.searchValue) {
            var I2 = f2[S2];
            if (!I2 || s2.test(I2)) {
              m2 = D2, b2 = S2;
              break;
            }
          }
        }
      } catch (t3) {
        w2 = true, T2 = t3;
      } finally {
        try {
          y2 || null == x2.return || x2.return();
        } finally {
          if (w2) throw T2;
        }
      }
      if (m2) {
        var E2 = "string" == typeof m2.originalItem ? { value: m2.value, prefix: g2 } : $(G({}, m2.originalItem), { prefix: g2 });
        if (true === this.validateTag(E2)) {
          var M2 = "".concat(a2[0]).concat(JSON.stringify(E2)).concat(a2[1]);
          u2.push({ start: h2, end: p2 + b2, replacement: M2 }), c2.lastIndex = p2 + b2;
        }
      }
    }
  }
  var N2 = t2;
  return u2.reverse().forEach((function(t3) {
    var e3 = t3.start, i3 = t3.end, n3 = t3.replacement;
    N2 = N2.slice(0, e3) + n3 + N2.slice(i3);
  })), N2;
}, replaceTextWithNode: function(t2, e2) {
  if (this.state.tag || e2) {
    e2 = e2 || this.state.tag.prefix + this.state.tag.value;
    var i2, n2, a2 = this.state.selection || window.getSelection(), s2 = a2.anchorNode, o2 = this.state.tag.delimiters ? this.state.tag.delimiters.length : 0;
    return s2.splitText(a2.anchorOffset - o2), -1 == (i2 = s2.nodeValue.lastIndexOf(e2)) ? true : (n2 = s2.splitText(i2), t2 && s2.parentNode.replaceChild(t2, n2), true);
  }
}, prepareNewTagNode: function(t2, e2) {
  e2 = e2 || {};
  var i2 = this.settings, n2 = [], a2 = {}, s2 = Object.assign({}, t2, { value: t2.value + "" });
  if (t2 = Object.assign({}, s2), i2.transformTag.call(this, t2), t2.__isValid = this.hasMaxTags() || this.validateTag(t2), true !== t2.__isValid) {
    if (e2.skipInvalid) return;
    if (u(a2, this.getInvalidTagAttrs(t2, t2.__isValid), { __preInvalidData: s2 }), t2.__isValid == this.TEXTS.duplicate && this.flashTag(this.getTagElmByValue(t2.value)), !i2.createInvalidTags) return void n2.push(t2.value);
  }
  return "readonly" in t2 && (t2.readonly ? a2["aria-readonly"] = true : delete t2.readonly), { tagElm: this.createTagElem(t2, a2), tagData: t2, aggregatedInvalidInput: n2 };
}, postProcessNewTagNode: function(t2, e2) {
  var i2 = this, n2 = this.settings, a2 = e2.__isValid;
  a2 && true === a2 ? this.value.push(e2) : (this.trigger("invalid", { data: e2, index: this.value.length, tag: t2, message: a2 }), n2.keepInvalidTags || setTimeout((function() {
    return i2.removeTags(t2, true);
  }), 1e3)), this.dropdown.position();
}, selectTag: function(t2, e2) {
  var i2 = this;
  if (!this.settings.enforceWhitelist || this.isTagWhitelisted(e2.value)) {
    this.state.actions.selectOption && setTimeout((function() {
      return i2.setRangeAtStartEnd(false, i2.DOM.input);
    }));
    var n2 = this.getLastTag();
    return n2 ? this.replaceTag(n2, e2) : this.appendTag(t2), this.value[0] = e2, this.update(), this.trigger("add", { tag: t2, data: e2 }), [t2];
  }
}, addEmptyTag: function(t2) {
  var e2 = u({ value: "" }, t2 || {}), i2 = this.createTagElem(e2);
  w(i2, e2), this.appendTag(i2), this.editTag(i2, { skipValidation: true }), this.toggleFocusClass(true);
}, addTags: function(t2, e2, i2) {
  var n2 = this, a2 = [], s2 = this.settings, o2 = [], r2 = document.createDocumentFragment(), l2 = [];
  if (!t2 || 0 == t2.length) return a2;
  switch (t2 = this.normalizeTags(t2), s2.mode) {
    case "mix":
      return this.addMixTags(t2);
    case "select":
      e2 = false, this.removeAllTags();
  }
  return this.DOM.input.removeAttribute("style"), t2.forEach((function(t3) {
    var e3 = n2.prepareNewTagNode(t3, { skipInvalid: i2 || s2.skipInvalid });
    if (e3) {
      var d2 = e3.tagElm;
      if (t3 = e3.tagData, o2 = e3.aggregatedInvalidInput, a2.push(d2), "select" == s2.mode) return n2.selectTag(d2, t3);
      r2.appendChild(d2), n2.postProcessNewTagNode(d2, t3), l2.push({ tagElm: d2, tagData: t3 });
    }
  })), this.appendTag(r2), l2.forEach((function(t3) {
    var e3 = t3.tagElm, i3 = t3.tagData;
    return n2.trigger("add", { tag: e3, index: n2.getTagIdx(i3), data: i3 });
  })), this.update(), t2.length && e2 && (this.input.set.call(this, s2.createInvalidTags ? "" : o2.join(s2._delimiters)), this.setRangeAtStartEnd(false, this.DOM.input)), this.dropdown.refilter(), a2;
}, addMixTags: function(t2) {
  var e2 = this;
  if ((t2 = this.normalizeTags(t2))[0].prefix || this.state.tag) return this.prefixedTextToTag(t2[0]);
  var i2 = document.createDocumentFragment(), n2 = [];
  return t2.forEach((function(t3) {
    var a2 = e2.prepareNewTagNode(t3);
    i2.appendChild(a2.tagElm), e2.insertAfterTag(a2.tagElm), e2.postProcessNewTagNode(a2.tagElm, a2.tagData), n2.push({ tagElm: a2.tagElm, tagData: a2.tagData });
  })), this.appendMixTags(i2, n2), i2.children;
}, appendMixTags: function(t2, e2) {
  var i2, n2 = null === (i2 = this.state.selection) || void 0 === i2 ? void 0 : i2.range, a2 = !!n2 && this.DOM.scope.contains(n2.startContainer), s2 = t2 ? 11 === t2.nodeType ? Array.prototype.slice.call(t2.childNodes) : [t2] : [];
  if (a2) this.injectAtCaret(t2);
  else {
    this.DOM.input.focus();
    var o2 = this.setStateSelection();
    (null == o2 ? void 0 : o2.range) && (o2.range.setStart(this.DOM.input, o2.range.endOffset), o2.range.setEnd(this.DOM.input, o2.range.endOffset)), this.DOM.input.appendChild(t2), this.updateValueByDOMTags(), this.update();
    var r2 = s2[s2.length - 1];
    (null == r2 ? void 0 : r2.parentNode) && T(r2), this.setStateSelection();
  }
  var l2 = (null == e2 ? void 0 : e2.length) ? e2 : s2.filter((function(t3) {
    return 1 === t3.nodeType;
  }));
  (null == l2 ? void 0 : l2.length) && this.trigger("add", { tags: l2 });
}, prefixedTextToTag: function(t2) {
  var e2, i2, n2, a2 = this, s2 = this.settings, o2 = null === (e2 = this.state.tag) || void 0 === e2 ? void 0 : e2.delimiters;
  if (t2.prefix = t2.prefix || this.state.tag ? this.state.tag.prefix : (s2.pattern.source || s2.pattern)[0], n2 = this.prepareNewTagNode(t2), i2 = n2.tagElm, this.replaceTextWithNode(i2) || this.DOM.input.appendChild(i2), setTimeout((function() {
    return i2.classList.add(a2.settings.classNames.tagNoAnimation);
  }), 300), this.update(), !o2) {
    var r2 = this.insertAfterTag(i2) || i2;
    setTimeout(T, 0, r2);
  }
  return this.state.tag = null, this.postProcessNewTagNode(i2, n2.tagData), this.trigger("add", { tag: n2, data: t2 }), i2;
}, appendTag: function(t2) {
  var e2 = this.DOM, i2 = e2.input;
  e2.scope.insertBefore(t2, i2);
}, createTagElem: function(t2, e2) {
  var i2;
  t2.__tagId = f();
  var n2, a2 = u({}, t2, G((X(i2 = {}, this.settings.tagTextProp, d((t2[this.settings.tagTextProp] || t2.value) + "")), X(i2, "title", d((t2.title || t2.value) + "")), X(i2, "value", d(t2.value + "")), i2), e2));
  return (function(t3) {
    for (var e3, i3 = document.createNodeIterator(t3, NodeFilter.SHOW_TEXT, null, false); e3 = i3.nextNode(); ) e3.textContent.trim() || e3.parentNode.removeChild(e3);
  })(n2 = this.parseTemplate("tag", [a2, this])), w(n2, t2), n2;
}, reCheckInvalidTags: function() {
  var t2 = this, e2 = this.settings;
  this.getTagElms(e2.classNames.tagNotAllowed).forEach((function(i2, n2) {
    var a2 = w(i2), s2 = t2.hasMaxTags(), o2 = t2.validateTag(a2), r2 = true === o2 && !s2;
    if ("select" == e2.mode && t2.toggleScopeValidation(o2), r2) return a2 = a2.__preInvalidData ? a2.__preInvalidData : { value: a2.value }, t2.replaceTag(i2, a2);
    i2.title = s2 || o2;
  }));
}, removeTags: function(t2, e2, i2) {
  var n2, a2 = this, s2 = this.settings;
  if (t2 = t2 && J(t2, HTMLElement) ? [t2] : J(t2, Array) ? t2 : t2 ? [t2] : [this.getLastTag()].filter((function(t3) {
    return t3;
  })), n2 = t2.reduce((function(t3, e3) {
    e3 && "string" == typeof e3 && (e3 = a2.getTagElmByValue(e3));
    var i3 = w(e3);
    return e3 && i3 && !i3.readonly && t3.push({ node: e3, idx: a2.getTagIdx(i3), data: w(e3, { __removed: true }) }), t3;
  }), []), i2 = "number" == typeof i2 ? i2 : this.CSSVars.tagHideTransition, "select" == s2.mode && (i2 = 0, this.input.set.call(this)), 1 == n2.length && "select" != s2.mode && n2[0].node.classList.contains(s2.classNames.tagNotAllowed) && (e2 = true), n2.length) return s2.hooks.beforeRemoveTag(n2, { tagify: this }).then((function() {
    var t3 = function(t4) {
      t4.node.parentNode && (t4.node.parentNode.removeChild(t4.node), e2 ? s2.keepInvalidTags && this.trigger("remove", { tag: t4.node, index: t4.idx }) : (this.dropdown.refilter(), this.dropdown.position(), this.DOM.input.normalize(), s2.keepInvalidTags && this.reCheckInvalidTags(), this.trigger("remove", { tag: t4.node, index: t4.idx, data: t4.data })));
    };
    e2 || (a2.removeTagsFromValue(n2.map((function(t4) {
      return t4.node;
    }))), a2.update(), "select" == s2.mode && s2.userInput && a2.setContentEditable(true)), i2 && i2 > 10 && 1 == n2.length ? (function(e3) {
      e3.node.style.width = parseFloat(window.getComputedStyle(e3.node).width) + "px", document.body.clientTop, e3.node.classList.add(s2.classNames.tagHide), setTimeout(t3.bind(this), i2, e3);
    }).call(a2, n2[0]) : n2.forEach(t3.bind(a2));
  })).catch((function(t3) {
  }));
}, removeTagsFromDOM: function() {
  this.getTagElms().forEach((function(t2) {
    return t2.remove();
  }));
}, removeTagsFromValue: function(t2) {
  var e2 = this;
  (t2 = Array.isArray(t2) ? t2 : [t2]).forEach((function(t3) {
    var i2 = w(t3), n2 = e2.getTagIdx(i2);
    n2 > -1 && e2.value.splice(n2, 1);
  }));
}, removeAllTags: function(t2) {
  var e2 = this;
  t2 = t2 || {}, this.value = [], "mix" == this.settings.mode ? this.DOM.input.innerHTML = "" : this.removeTagsFromDOM(), this.dropdown.refilter(), this.dropdown.position(), this.state.dropdown.visible && setTimeout((function() {
    e2.DOM.input.focus();
  })), "select" == this.settings.mode && (this.input.set.call(this), this.settings.userInput && this.setContentEditable(true));
  var i2 = this.state.blockChangeEvent ? void 0 : function() {
    !e2.state.blockChangeEvent && e2.trigger("remove", {});
  };
  this.update(t2, i2);
}, postUpdate: function() {
  this.state.blockChangeEvent = false;
  var t2, e2, i2 = this.settings, n2 = i2.classNames, a2 = "mix" == i2.mode ? i2.mixMode.integrated ? this.DOM.input.textContent : this.DOM.originalInput.value.trim() : this.value.length + this.input.raw.call(this).length;
  (this.toggleClass(n2.hasMaxTags, this.value.length >= i2.maxTags), this.toggleClass(n2.hasNoTags, !this.value.length), this.toggleClass(n2.empty, !a2), "select" == i2.mode) && this.toggleScopeValidation(null === (e2 = this.value) || void 0 === e2 || null === (t2 = e2[0]) || void 0 === t2 ? void 0 : t2.__isValid);
}, setOriginalInputValue: function(t2) {
  var e2 = this.DOM.originalInput;
  this.settings.mixMode.integrated || (e2.value = t2, e2.tagifyValue = e2.value);
}, update: function(t2, e2) {
  clearTimeout(this.debouncedUpdateTimeout), this.debouncedUpdateTimeout = setTimeout((function() {
    this.setPersistedData(i2, "value"), this.settings.onChangeAfterBlur && (t2 || {}).withoutChangeEvent || this.state.blockChangeEvent || this.triggerChangeEvent();
    this.postUpdate(), null == e2 || e2();
  }).bind(this), 100), this.events.bindOriginaInputListener.call(this, 100);
  var i2 = this.getInputValue();
  this.setOriginalInputValue(i2);
}, getInputValue: function() {
  var t2 = this.getCleanValue();
  return "mix" == this.settings.mode ? this.getMixedTagsAsString(t2) : t2.length ? this.settings.originalInputValueFormat ? this.settings.originalInputValueFormat(t2) : JSON.stringify(t2) : "";
}, getCleanValue: function(t2) {
  return s(t2 || this.value, this.dataProps);
}, getMixedTagsAsString: function() {
  var t2 = "", e2 = this, i2 = this.settings, n2 = i2.originalInputValueFormat || JSON.stringify, a2 = i2.mixTagsInterpolator;
  return (function i3(s2) {
    s2.childNodes.forEach((function(s3) {
      if (1 == s3.nodeType) {
        var r2 = w(s3);
        if ("BR" == s3.tagName && (t2 += "\r\n"), r2 && v.call(e2, s3)) {
          if (r2.__removed) return;
          t2 += a2[0] + n2(o(r2, e2.dataProps)) + a2[1];
        } else s3.getAttribute("style") || ["B", "I", "U"].includes(s3.tagName) ? t2 += s3.textContent : "DIV" != s3.tagName && "P" != s3.tagName || (t2 += "\r\n", i3(s3));
      } else t2 += s3.textContent;
    }));
  })(this.DOM.input), t2;
} }, Y.prototype.removeTag = Y.prototype.removeTags;
export {
  Y
};
