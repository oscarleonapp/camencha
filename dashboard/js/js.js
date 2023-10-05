/*!
   Copyright 2008-2020 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
 DataTables 1.10.23
 ©2008-2020 SpryMedia Ltd - datatables.net/license
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (k, y, z) {
  k instanceof String && (k = String(k));
  for (var q = k.length, G = 0; G < q; G++) {
    var O = k[G];
    if (y.call(z, O, G, k)) return { i: G, v: O };
  }
  return { i: -1, v: void 0 };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (k, y, z) {
        if (k == Array.prototype || k == Object.prototype) return k;
        k[y] = z.value;
        return k;
      };
$jscomp.getGlobal = function (k) {
  k = [
    "object" == typeof globalThis && globalThis,
    k,
    "object" == typeof window && window,
    "object" == typeof self && self,
    "object" == typeof global && global,
  ];
  for (var y = 0; y < k.length; ++y) {
    var z = k[y];
    if (z && z.Math == Math) return z;
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE =
  "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (k, y) {
  var z = $jscomp.propertyToPolyfillSymbol[y];
  if (null == z) return k[y];
  z = k[z];
  return void 0 !== z ? z : k[y];
};
$jscomp.polyfill = function (k, y, z, q) {
  y &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(k, y, z, q)
      : $jscomp.polyfillUnisolated(k, y, z, q));
};
$jscomp.polyfillUnisolated = function (k, y, z, q) {
  z = $jscomp.global;
  k = k.split(".");
  for (q = 0; q < k.length - 1; q++) {
    var G = k[q];
    if (!(G in z)) return;
    z = z[G];
  }
  k = k[k.length - 1];
  q = z[k];
  y = y(q);
  y != q &&
    null != y &&
    $jscomp.defineProperty(z, k, { configurable: !0, writable: !0, value: y });
};
$jscomp.polyfillIsolated = function (k, y, z, q) {
  var G = k.split(".");
  k = 1 === G.length;
  q = G[0];
  q = !k && q in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var O = 0; O < G.length - 1; O++) {
    var ma = G[O];
    if (!(ma in q)) return;
    q = q[ma];
  }
  G = G[G.length - 1];
  z = $jscomp.IS_SYMBOL_NATIVE && "es6" === z ? q[G] : null;
  y = y(z);
  null != y &&
    (k
      ? $jscomp.defineProperty($jscomp.polyfills, G, {
          configurable: !0,
          writable: !0,
          value: y,
        })
      : y !== z &&
        (($jscomp.propertyToPolyfillSymbol[G] = $jscomp.IS_SYMBOL_NATIVE
          ? $jscomp.global.Symbol(G)
          : $jscomp.POLYFILL_PREFIX + G),
        (G = $jscomp.propertyToPolyfillSymbol[G]),
        $jscomp.defineProperty(q, G, {
          configurable: !0,
          writable: !0,
          value: y,
        })));
};
$jscomp.polyfill(
  "Array.prototype.find",
  function (k) {
    return k
      ? k
      : function (y, z) {
          return $jscomp.findInternal(this, y, z).v;
        };
  },
  "es6",
  "es3"
);
(function (k) {
  "function" === typeof define && define.amd
    ? define(["jquery"], function (y) {
        return k(y, window, document);
      })
    : "object" === typeof exports
    ? (module.exports = function (y, z) {
        y || (y = window);
        z ||
          (z =
            "undefined" !== typeof window
              ? require("jquery")
              : require("jquery")(y));
        return k(z, y, y.document);
      })
    : k(jQuery, window, document);
})(function (k, y, z, q) {
  function G(a) {
    var b,
      c,
      d = {};
    k.each(a, function (e, f) {
      (b = e.match(/^([^A-Z]+?)([A-Z])/)) &&
        -1 !== "a aa ai ao as b fn i m o s ".indexOf(b[1] + " ") &&
        ((c = e.replace(b[0], b[2].toLowerCase())),
        (d[c] = e),
        "o" === b[1] && G(a[e]));
    });
    a._hungarianMap = d;
  }
  function O(a, b, c) {
    a._hungarianMap || G(a);
    var d;
    k.each(b, function (e, f) {
      d = a._hungarianMap[e];
      d === q ||
        (!c && b[d] !== q) ||
        ("o" === d.charAt(0)
          ? (b[d] || (b[d] = {}), k.extend(!0, b[d], b[e]), O(a[d], b[d], c))
          : (b[d] = b[e]));
    });
  }
  function ma(a) {
    var b = u.defaults.oLanguage,
      c = b.sDecimal;
    c && Va(c);
    if (a) {
      var d = a.sZeroRecords;
      !a.sEmptyTable &&
        d &&
        "No data available in table" === b.sEmptyTable &&
        V(a, a, "sZeroRecords", "sEmptyTable");
      !a.sLoadingRecords &&
        d &&
        "Loading..." === b.sLoadingRecords &&
        V(a, a, "sZeroRecords", "sLoadingRecords");
      a.sInfoThousands && (a.sThousands = a.sInfoThousands);
      (a = a.sDecimal) && c !== a && Va(a);
    }
  }
  function yb(a) {
    R(a, "ordering", "bSort");
    R(a, "orderMulti", "bSortMulti");
    R(a, "orderClasses", "bSortClasses");
    R(a, "orderCellsTop", "bSortCellsTop");
    R(a, "order", "aaSorting");
    R(a, "orderFixed", "aaSortingFixed");
    R(a, "paging", "bPaginate");
    R(a, "pagingType", "sPaginationType");
    R(a, "pageLength", "iDisplayLength");
    R(a, "searching", "bFilter");
    "boolean" === typeof a.sScrollX && (a.sScrollX = a.sScrollX ? "100%" : "");
    "boolean" === typeof a.scrollX && (a.scrollX = a.scrollX ? "100%" : "");
    if ((a = a.aoSearchCols))
      for (var b = 0, c = a.length; b < c; b++)
        a[b] && O(u.models.oSearch, a[b]);
  }
  function zb(a) {
    R(a, "orderable", "bSortable");
    R(a, "orderData", "aDataSort");
    R(a, "orderSequence", "asSorting");
    R(a, "orderDataType", "sortDataType");
    var b = a.aDataSort;
    "number" !== typeof b || Array.isArray(b) || (a.aDataSort = [b]);
  }
  function Ab(a) {
    if (!u.__browser) {
      var b = {};
      u.__browser = b;
      var c = k("<div/>")
          .css({
            position: "fixed",
            top: 0,
            left: -1 * k(y).scrollLeft(),
            height: 1,
            width: 1,
            overflow: "hidden",
          })
          .append(
            k("<div/>")
              .css({
                position: "absolute",
                top: 1,
                left: 1,
                width: 100,
                overflow: "scroll",
              })
              .append(k("<div/>").css({ width: "100%", height: 10 }))
          )
          .appendTo("body"),
        d = c.children(),
        e = d.children();
      b.barWidth = d[0].offsetWidth - d[0].clientWidth;
      b.bScrollOversize = 100 === e[0].offsetWidth && 100 !== d[0].clientWidth;
      b.bScrollbarLeft = 1 !== Math.round(e.offset().left);
      b.bBounding = c[0].getBoundingClientRect().width ? !0 : !1;
      c.remove();
    }
    k.extend(a.oBrowser, u.__browser);
    a.oScroll.iBarWidth = u.__browser.barWidth;
  }
  function Bb(a, b, c, d, e, f) {
    var g = !1;
    if (c !== q) {
      var h = c;
      g = !0;
    }
    for (; d !== e; )
      a.hasOwnProperty(d) &&
        ((h = g ? b(h, a[d], d, a) : a[d]), (g = !0), (d += f));
    return h;
  }
  function Wa(a, b) {
    var c = u.defaults.column,
      d = a.aoColumns.length;
    c = k.extend({}, u.models.oColumn, c, {
      nTh: b ? b : z.createElement("th"),
      sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "",
      aDataSort: c.aDataSort ? c.aDataSort : [d],
      mData: c.mData ? c.mData : d,
      idx: d,
    });
    a.aoColumns.push(c);
    c = a.aoPreSearchCols;
    c[d] = k.extend({}, u.models.oSearch, c[d]);
    Da(a, d, k(b).data());
  }
  function Da(a, b, c) {
    b = a.aoColumns[b];
    var d = a.oClasses,
      e = k(b.nTh);
    if (!b.sWidthOrig) {
      b.sWidthOrig = e.attr("width") || null;
      var f = (e.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
      f && (b.sWidthOrig = f[1]);
    }
    c !== q &&
      null !== c &&
      (zb(c),
      O(u.defaults.column, c, !0),
      c.mDataProp === q || c.mData || (c.mData = c.mDataProp),
      c.sType && (b._sManualType = c.sType),
      c.className && !c.sClass && (c.sClass = c.className),
      c.sClass && e.addClass(c.sClass),
      k.extend(b, c),
      V(b, c, "sWidth", "sWidthOrig"),
      c.iDataSort !== q && (b.aDataSort = [c.iDataSort]),
      V(b, c, "aDataSort"));
    var g = b.mData,
      h = ia(g),
      l = b.mRender ? ia(b.mRender) : null;
    c = function (n) {
      return "string" === typeof n && -1 !== n.indexOf("@");
    };
    b._bAttrSrc = k.isPlainObject(g) && (c(g.sort) || c(g.type) || c(g.filter));
    b._setter = null;
    b.fnGetData = function (n, m, p) {
      var t = h(n, m, q, p);
      return l && m ? l(t, m, n, p) : t;
    };
    b.fnSetData = function (n, m, p) {
      return da(g)(n, m, p);
    };
    "number" !== typeof g && (a._rowReadObject = !0);
    a.oFeatures.bSort || ((b.bSortable = !1), e.addClass(d.sSortableNone));
    a = -1 !== k.inArray("asc", b.asSorting);
    c = -1 !== k.inArray("desc", b.asSorting);
    b.bSortable && (a || c)
      ? a && !c
        ? ((b.sSortingClass = d.sSortableAsc),
          (b.sSortingClassJUI = d.sSortJUIAscAllowed))
        : !a && c
        ? ((b.sSortingClass = d.sSortableDesc),
          (b.sSortingClassJUI = d.sSortJUIDescAllowed))
        : ((b.sSortingClass = d.sSortable), (b.sSortingClassJUI = d.sSortJUI))
      : ((b.sSortingClass = d.sSortableNone), (b.sSortingClassJUI = ""));
  }
  function ra(a) {
    if (!1 !== a.oFeatures.bAutoWidth) {
      var b = a.aoColumns;
      Xa(a);
      for (var c = 0, d = b.length; c < d; c++)
        b[c].nTh.style.width = b[c].sWidth;
    }
    b = a.oScroll;
    ("" === b.sY && "" === b.sX) || Ea(a);
    I(a, null, "column-sizing", [a]);
  }
  function sa(a, b) {
    a = Fa(a, "bVisible");
    return "number" === typeof a[b] ? a[b] : null;
  }
  function ta(a, b) {
    a = Fa(a, "bVisible");
    b = k.inArray(b, a);
    return -1 !== b ? b : null;
  }
  function na(a) {
    var b = 0;
    k.each(a.aoColumns, function (c, d) {
      d.bVisible && "none" !== k(d.nTh).css("display") && b++;
    });
    return b;
  }
  function Fa(a, b) {
    var c = [];
    k.map(a.aoColumns, function (d, e) {
      d[b] && c.push(e);
    });
    return c;
  }
  function Ya(a) {
    var b = a.aoColumns,
      c = a.aoData,
      d = u.ext.type.detect,
      e,
      f,
      g;
    var h = 0;
    for (e = b.length; h < e; h++) {
      var l = b[h];
      var n = [];
      if (!l.sType && l._sManualType) l.sType = l._sManualType;
      else if (!l.sType) {
        var m = 0;
        for (f = d.length; m < f; m++) {
          var p = 0;
          for (g = c.length; p < g; p++) {
            n[p] === q && (n[p] = S(a, p, h, "type"));
            var t = d[m](n[p], a);
            if (!t && m !== d.length - 1) break;
            if ("html" === t) break;
          }
          if (t) {
            l.sType = t;
            break;
          }
        }
        l.sType || (l.sType = "string");
      }
    }
  }
  function Cb(a, b, c, d) {
    var e,
      f,
      g,
      h = a.aoColumns;
    if (b)
      for (e = b.length - 1; 0 <= e; e--) {
        var l = b[e];
        var n = l.targets !== q ? l.targets : l.aTargets;
        Array.isArray(n) || (n = [n]);
        var m = 0;
        for (f = n.length; m < f; m++)
          if ("number" === typeof n[m] && 0 <= n[m]) {
            for (; h.length <= n[m]; ) Wa(a);
            d(n[m], l);
          } else if ("number" === typeof n[m] && 0 > n[m])
            d(h.length + n[m], l);
          else if ("string" === typeof n[m]) {
            var p = 0;
            for (g = h.length; p < g; p++)
              ("_all" == n[m] || k(h[p].nTh).hasClass(n[m])) && d(p, l);
          }
      }
    if (c) for (e = 0, a = c.length; e < a; e++) d(e, c[e]);
  }
  function ea(a, b, c, d) {
    var e = a.aoData.length,
      f = k.extend(!0, {}, u.models.oRow, { src: c ? "dom" : "data", idx: e });
    f._aData = b;
    a.aoData.push(f);
    for (var g = a.aoColumns, h = 0, l = g.length; h < l; h++)
      g[h].sType = null;
    a.aiDisplayMaster.push(e);
    b = a.rowIdFn(b);
    b !== q && (a.aIds[b] = f);
    (!c && a.oFeatures.bDeferRender) || Za(a, e, c, d);
    return e;
  }
  function Ga(a, b) {
    var c;
    b instanceof k || (b = k(b));
    return b.map(function (d, e) {
      c = $a(a, e);
      return ea(a, c.data, e, c.cells);
    });
  }
  function S(a, b, c, d) {
    var e = a.iDraw,
      f = a.aoColumns[c],
      g = a.aoData[b]._aData,
      h = f.sDefaultContent,
      l = f.fnGetData(g, d, { settings: a, row: b, col: c });
    if (l === q)
      return (
        a.iDrawError != e &&
          null === h &&
          (aa(
            a,
            0,
            "Requested unknown parameter " +
              ("function" == typeof f.mData
                ? "{function}"
                : "'" + f.mData + "'") +
              " for row " +
              b +
              ", column " +
              c,
            4
          ),
          (a.iDrawError = e)),
        h
      );
    if ((l === g || null === l) && null !== h && d !== q) l = h;
    else if ("function" === typeof l) return l.call(g);
    return null === l && "display" == d ? "" : l;
  }
  function Db(a, b, c, d) {
    a.aoColumns[c].fnSetData(a.aoData[b]._aData, d, {
      settings: a,
      row: b,
      col: c,
    });
  }
  function ab(a) {
    return k.map(a.match(/(\\.|[^\.])+/g) || [""], function (b) {
      return b.replace(/\\\./g, ".");
    });
  }
  function ia(a) {
    if (k.isPlainObject(a)) {
      var b = {};
      k.each(a, function (d, e) {
        e && (b[d] = ia(e));
      });
      return function (d, e, f, g) {
        var h = b[e] || b._;
        return h !== q ? h(d, e, f, g) : d;
      };
    }
    if (null === a)
      return function (d) {
        return d;
      };
    if ("function" === typeof a)
      return function (d, e, f, g) {
        return a(d, e, f, g);
      };
    if (
      "string" !== typeof a ||
      (-1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("("))
    )
      return function (d, e) {
        return d[a];
      };
    var c = function (d, e, f) {
      if ("" !== f) {
        var g = ab(f);
        for (var h = 0, l = g.length; h < l; h++) {
          f = g[h].match(ua);
          var n = g[h].match(oa);
          if (f) {
            g[h] = g[h].replace(ua, "");
            "" !== g[h] && (d = d[g[h]]);
            n = [];
            g.splice(0, h + 1);
            g = g.join(".");
            if (Array.isArray(d))
              for (h = 0, l = d.length; h < l; h++) n.push(c(d[h], e, g));
            d = f[0].substring(1, f[0].length - 1);
            d = "" === d ? n : n.join(d);
            break;
          } else if (n) {
            g[h] = g[h].replace(oa, "");
            d = d[g[h]]();
            continue;
          }
          if (null === d || d[g[h]] === q) return q;
          d = d[g[h]];
        }
      }
      return d;
    };
    return function (d, e) {
      return c(d, e, a);
    };
  }
  function da(a) {
    if (k.isPlainObject(a)) return da(a._);
    if (null === a) return function () {};
    if ("function" === typeof a)
      return function (c, d, e) {
        a(c, "set", d, e);
      };
    if (
      "string" !== typeof a ||
      (-1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("("))
    )
      return function (c, d) {
        c[a] = d;
      };
    var b = function (c, d, e) {
      e = ab(e);
      var f = e[e.length - 1];
      for (var g, h, l = 0, n = e.length - 1; l < n; l++) {
        if ("__proto__" === e[l] || "constructor" === e[l])
          throw Error("Cannot set prototype values");
        g = e[l].match(ua);
        h = e[l].match(oa);
        if (g) {
          e[l] = e[l].replace(ua, "");
          c[e[l]] = [];
          f = e.slice();
          f.splice(0, l + 1);
          g = f.join(".");
          if (Array.isArray(d))
            for (h = 0, n = d.length; h < n; h++)
              (f = {}), b(f, d[h], g), c[e[l]].push(f);
          else c[e[l]] = d;
          return;
        }
        h && ((e[l] = e[l].replace(oa, "")), (c = c[e[l]](d)));
        if (null === c[e[l]] || c[e[l]] === q) c[e[l]] = {};
        c = c[e[l]];
      }
      if (f.match(oa)) c[f.replace(oa, "")](d);
      else c[f.replace(ua, "")] = d;
    };
    return function (c, d) {
      return b(c, d, a);
    };
  }
  function bb(a) {
    return T(a.aoData, "_aData");
  }
  function Ha(a) {
    a.aoData.length = 0;
    a.aiDisplayMaster.length = 0;
    a.aiDisplay.length = 0;
    a.aIds = {};
  }
  function Ia(a, b, c) {
    for (var d = -1, e = 0, f = a.length; e < f; e++)
      a[e] == b ? (d = e) : a[e] > b && a[e]--;
    -1 != d && c === q && a.splice(d, 1);
  }
  function va(a, b, c, d) {
    var e = a.aoData[b],
      f,
      g = function (l, n) {
        for (; l.childNodes.length; ) l.removeChild(l.firstChild);
        l.innerHTML = S(a, b, n, "display");
      };
    if ("dom" !== c && ((c && "auto" !== c) || "dom" !== e.src)) {
      var h = e.anCells;
      if (h)
        if (d !== q) g(h[d], d);
        else for (c = 0, f = h.length; c < f; c++) g(h[c], c);
    } else e._aData = $a(a, e, d, d === q ? q : e._aData).data;
    e._aSortData = null;
    e._aFilterData = null;
    g = a.aoColumns;
    if (d !== q) g[d].sType = null;
    else {
      c = 0;
      for (f = g.length; c < f; c++) g[c].sType = null;
      cb(a, e);
    }
  }
  function $a(a, b, c, d) {
    var e = [],
      f = b.firstChild,
      g,
      h = 0,
      l,
      n = a.aoColumns,
      m = a._rowReadObject;
    d = d !== q ? d : m ? {} : [];
    var p = function (x, r) {
        if ("string" === typeof x) {
          var A = x.indexOf("@");
          -1 !== A && ((A = x.substring(A + 1)), da(x)(d, r.getAttribute(A)));
        }
      },
      t = function (x) {
        if (c === q || c === h)
          (g = n[h]),
            (l = x.innerHTML.trim()),
            g && g._bAttrSrc
              ? (da(g.mData._)(d, l),
                p(g.mData.sort, x),
                p(g.mData.type, x),
                p(g.mData.filter, x))
              : m
              ? (g._setter || (g._setter = da(g.mData)), g._setter(d, l))
              : (d[h] = l);
        h++;
      };
    if (f)
      for (; f; ) {
        var v = f.nodeName.toUpperCase();
        if ("TD" == v || "TH" == v) t(f), e.push(f);
        f = f.nextSibling;
      }
    else for (e = b.anCells, f = 0, v = e.length; f < v; f++) t(e[f]);
    (b = b.firstChild ? b : b.nTr) &&
      (b = b.getAttribute("id")) &&
      da(a.rowId)(d, b);
    return { data: d, cells: e };
  }
  function Za(a, b, c, d) {
    var e = a.aoData[b],
      f = e._aData,
      g = [],
      h,
      l;
    if (null === e.nTr) {
      var n = c || z.createElement("tr");
      e.nTr = n;
      e.anCells = g;
      n._DT_RowIndex = b;
      cb(a, e);
      var m = 0;
      for (h = a.aoColumns.length; m < h; m++) {
        var p = a.aoColumns[m];
        e = (l = c ? !1 : !0) ? z.createElement(p.sCellType) : d[m];
        e._DT_CellIndex = { row: b, column: m };
        g.push(e);
        if (
          l ||
          !(
            (!p.mRender && p.mData === m) ||
            (k.isPlainObject(p.mData) && p.mData._ === m + ".display")
          )
        )
          e.innerHTML = S(a, b, m, "display");
        p.sClass && (e.className += " " + p.sClass);
        p.bVisible && !c
          ? n.appendChild(e)
          : !p.bVisible && c && e.parentNode.removeChild(e);
        p.fnCreatedCell &&
          p.fnCreatedCell.call(a.oInstance, e, S(a, b, m), f, b, m);
      }
      I(a, "aoRowCreatedCallback", null, [n, f, b, g]);
    }
  }
  function cb(a, b) {
    var c = b.nTr,
      d = b._aData;
    if (c) {
      if ((a = a.rowIdFn(d))) c.id = a;
      d.DT_RowClass &&
        ((a = d.DT_RowClass.split(" ")),
        (b.__rowc = b.__rowc ? Ja(b.__rowc.concat(a)) : a),
        k(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));
      d.DT_RowAttr && k(c).attr(d.DT_RowAttr);
      d.DT_RowData && k(c).data(d.DT_RowData);
    }
  }
  function Eb(a) {
    var b,
      c,
      d = a.nTHead,
      e = a.nTFoot,
      f = 0 === k("th, td", d).length,
      g = a.oClasses,
      h = a.aoColumns;
    f && (c = k("<tr/>").appendTo(d));
    var l = 0;
    for (b = h.length; l < b; l++) {
      var n = h[l];
      var m = k(n.nTh).addClass(n.sClass);
      f && m.appendTo(c);
      a.oFeatures.bSort &&
        (m.addClass(n.sSortingClass),
        !1 !== n.bSortable &&
          (m.attr("tabindex", a.iTabIndex).attr("aria-controls", a.sTableId),
          db(a, n.nTh, l)));
      n.sTitle != m[0].innerHTML && m.html(n.sTitle);
      eb(a, "header")(a, m, n, g);
    }
    f && wa(a.aoHeader, d);
    k(d).children("tr").attr("role", "row");
    k(d).children("tr").children("th, td").addClass(g.sHeaderTH);
    k(e).children("tr").children("th, td").addClass(g.sFooterTH);
    if (null !== e)
      for (a = a.aoFooter[0], l = 0, b = a.length; l < b; l++)
        (n = h[l]),
          (n.nTf = a[l].cell),
          n.sClass && k(n.nTf).addClass(n.sClass);
  }
  function xa(a, b, c) {
    var d,
      e,
      f = [],
      g = [],
      h = a.aoColumns.length;
    if (b) {
      c === q && (c = !1);
      var l = 0;
      for (d = b.length; l < d; l++) {
        f[l] = b[l].slice();
        f[l].nTr = b[l].nTr;
        for (e = h - 1; 0 <= e; e--)
          a.aoColumns[e].bVisible || c || f[l].splice(e, 1);
        g.push([]);
      }
      l = 0;
      for (d = f.length; l < d; l++) {
        if ((a = f[l].nTr)) for (; (e = a.firstChild); ) a.removeChild(e);
        e = 0;
        for (b = f[l].length; e < b; e++) {
          var n = (h = 1);
          if (g[l][e] === q) {
            a.appendChild(f[l][e].cell);
            for (
              g[l][e] = 1;
              f[l + h] !== q && f[l][e].cell == f[l + h][e].cell;

            )
              (g[l + h][e] = 1), h++;
            for (; f[l][e + n] !== q && f[l][e].cell == f[l][e + n].cell; ) {
              for (c = 0; c < h; c++) g[l + c][e + n] = 1;
              n++;
            }
            k(f[l][e].cell).attr("rowspan", h).attr("colspan", n);
          }
        }
      }
    }
  }
  function fa(a) {
    var b = I(a, "aoPreDrawCallback", "preDraw", [a]);
    if (-1 !== k.inArray(!1, b)) U(a, !1);
    else {
      b = [];
      var c = 0,
        d = a.asStripeClasses,
        e = d.length,
        f = a.oLanguage,
        g = a.iInitDisplayStart,
        h = "ssp" == P(a),
        l = a.aiDisplay;
      a.bDrawing = !0;
      g !== q &&
        -1 !== g &&
        ((a._iDisplayStart = h ? g : g >= a.fnRecordsDisplay() ? 0 : g),
        (a.iInitDisplayStart = -1));
      g = a._iDisplayStart;
      var n = a.fnDisplayEnd();
      if (a.bDeferLoading) (a.bDeferLoading = !1), a.iDraw++, U(a, !1);
      else if (!h) a.iDraw++;
      else if (!a.bDestroying && !Fb(a)) return;
      if (0 !== l.length)
        for (f = h ? a.aoData.length : n, h = h ? 0 : g; h < f; h++) {
          var m = l[h],
            p = a.aoData[m];
          null === p.nTr && Za(a, m);
          var t = p.nTr;
          if (0 !== e) {
            var v = d[c % e];
            p._sRowStripe != v &&
              (k(t).removeClass(p._sRowStripe).addClass(v),
              (p._sRowStripe = v));
          }
          I(a, "aoRowCallback", null, [t, p._aData, c, h, m]);
          b.push(t);
          c++;
        }
      else
        (c = f.sZeroRecords),
          1 == a.iDraw && "ajax" == P(a)
            ? (c = f.sLoadingRecords)
            : f.sEmptyTable && 0 === a.fnRecordsTotal() && (c = f.sEmptyTable),
          (b[0] = k("<tr/>", { class: e ? d[0] : "" }).append(
            k("<td />", {
              valign: "top",
              colSpan: na(a),
              class: a.oClasses.sRowEmpty,
            }).html(c)
          )[0]);
      I(a, "aoHeaderCallback", "header", [
        k(a.nTHead).children("tr")[0],
        bb(a),
        g,
        n,
        l,
      ]);
      I(a, "aoFooterCallback", "footer", [
        k(a.nTFoot).children("tr")[0],
        bb(a),
        g,
        n,
        l,
      ]);
      d = k(a.nTBody);
      d.children().detach();
      d.append(k(b));
      I(a, "aoDrawCallback", "draw", [a]);
      a.bSorted = !1;
      a.bFiltered = !1;
      a.bDrawing = !1;
    }
  }
  function ja(a, b) {
    var c = a.oFeatures,
      d = c.bFilter;
    c.bSort && Gb(a);
    d ? ya(a, a.oPreviousSearch) : (a.aiDisplay = a.aiDisplayMaster.slice());
    !0 !== b && (a._iDisplayStart = 0);
    a._drawHold = b;
    fa(a);
    a._drawHold = !1;
  }
  function Hb(a) {
    var b = a.oClasses,
      c = k(a.nTable);
    c = k("<div/>").insertBefore(c);
    var d = a.oFeatures,
      e = k("<div/>", {
        id: a.sTableId + "_wrapper",
        class: b.sWrapper + (a.nTFoot ? "" : " " + b.sNoFooter),
      });
    a.nHolding = c[0];
    a.nTableWrapper = e[0];
    a.nTableReinsertBefore = a.nTable.nextSibling;
    for (var f = a.sDom.split(""), g, h, l, n, m, p, t = 0; t < f.length; t++) {
      g = null;
      h = f[t];
      if ("<" == h) {
        l = k("<div/>")[0];
        n = f[t + 1];
        if ("'" == n || '"' == n) {
          m = "";
          for (p = 2; f[t + p] != n; ) (m += f[t + p]), p++;
          "H" == m ? (m = b.sJUIHeader) : "F" == m && (m = b.sJUIFooter);
          -1 != m.indexOf(".")
            ? ((n = m.split(".")),
              (l.id = n[0].substr(1, n[0].length - 1)),
              (l.className = n[1]))
            : "#" == m.charAt(0)
            ? (l.id = m.substr(1, m.length - 1))
            : (l.className = m);
          t += p;
        }
        e.append(l);
        e = k(l);
      } else if (">" == h) e = e.parent();
      else if ("l" == h && d.bPaginate && d.bLengthChange) g = Ib(a);
      else if ("f" == h && d.bFilter) g = Jb(a);
      else if ("r" == h && d.bProcessing) g = Kb(a);
      else if ("t" == h) g = Lb(a);
      else if ("i" == h && d.bInfo) g = Mb(a);
      else if ("p" == h && d.bPaginate) g = Nb(a);
      else if (0 !== u.ext.feature.length)
        for (l = u.ext.feature, p = 0, n = l.length; p < n; p++)
          if (h == l[p].cFeature) {
            g = l[p].fnInit(a);
            break;
          }
      g &&
        ((l = a.aanFeatures), l[h] || (l[h] = []), l[h].push(g), e.append(g));
    }
    c.replaceWith(e);
    a.nHolding = null;
  }
  function wa(a, b) {
    b = k(b).children("tr");
    var c, d, e;
    a.splice(0, a.length);
    var f = 0;
    for (e = b.length; f < e; f++) a.push([]);
    f = 0;
    for (e = b.length; f < e; f++) {
      var g = b[f];
      for (c = g.firstChild; c; ) {
        if (
          "TD" == c.nodeName.toUpperCase() ||
          "TH" == c.nodeName.toUpperCase()
        ) {
          var h = 1 * c.getAttribute("colspan");
          var l = 1 * c.getAttribute("rowspan");
          h = h && 0 !== h && 1 !== h ? h : 1;
          l = l && 0 !== l && 1 !== l ? l : 1;
          var n = 0;
          for (d = a[f]; d[n]; ) n++;
          var m = n;
          var p = 1 === h ? !0 : !1;
          for (d = 0; d < h; d++)
            for (n = 0; n < l; n++)
              (a[f + n][m + d] = { cell: c, unique: p }), (a[f + n].nTr = g);
        }
        c = c.nextSibling;
      }
    }
  }
  function Ka(a, b, c) {
    var d = [];
    c || ((c = a.aoHeader), b && ((c = []), wa(c, b)));
    b = 0;
    for (var e = c.length; b < e; b++)
      for (var f = 0, g = c[b].length; f < g; f++)
        !c[b][f].unique || (d[f] && a.bSortCellsTop) || (d[f] = c[b][f].cell);
    return d;
  }
  function La(a, b, c) {
    I(a, "aoServerParams", "serverParams", [b]);
    if (b && Array.isArray(b)) {
      var d = {},
        e = /(.*?)\[\]$/;
      k.each(b, function (m, p) {
        (m = p.name.match(e))
          ? ((m = m[0]), d[m] || (d[m] = []), d[m].push(p.value))
          : (d[p.name] = p.value);
      });
      b = d;
    }
    var f = a.ajax,
      g = a.oInstance,
      h = function (m) {
        I(a, null, "xhr", [a, m, a.jqXHR]);
        c(m);
      };
    if (k.isPlainObject(f) && f.data) {
      var l = f.data;
      var n = "function" === typeof l ? l(b, a) : l;
      b = "function" === typeof l && n ? n : k.extend(!0, b, n);
      delete f.data;
    }
    n = {
      data: b,
      success: function (m) {
        var p = m.error || m.sError;
        p && aa(a, 0, p);
        a.json = m;
        h(m);
      },
      dataType: "json",
      cache: !1,
      type: a.sServerMethod,
      error: function (m, p, t) {
        t = I(a, null, "xhr", [a, null, a.jqXHR]);
        -1 === k.inArray(!0, t) &&
          ("parsererror" == p
            ? aa(a, 0, "Invalid JSON response", 1)
            : 4 === m.readyState && aa(a, 0, "Ajax error", 7));
        U(a, !1);
      },
    };
    a.oAjaxData = b;
    I(a, null, "preXhr", [a, b]);
    a.fnServerData
      ? a.fnServerData.call(
          g,
          a.sAjaxSource,
          k.map(b, function (m, p) {
            return { name: p, value: m };
          }),
          h,
          a
        )
      : a.sAjaxSource || "string" === typeof f
      ? (a.jqXHR = k.ajax(k.extend(n, { url: f || a.sAjaxSource })))
      : "function" === typeof f
      ? (a.jqXHR = f.call(g, b, h, a))
      : ((a.jqXHR = k.ajax(k.extend(n, f))), (f.data = l));
  }
  function Fb(a) {
    return a.bAjaxDataGet
      ? (a.iDraw++,
        U(a, !0),
        La(a, Ob(a), function (b) {
          Pb(a, b);
        }),
        !1)
      : !0;
  }
  function Ob(a) {
    var b = a.aoColumns,
      c = b.length,
      d = a.oFeatures,
      e = a.oPreviousSearch,
      f = a.aoPreSearchCols,
      g = [],
      h = pa(a);
    var l = a._iDisplayStart;
    var n = !1 !== d.bPaginate ? a._iDisplayLength : -1;
    var m = function (x, r) {
      g.push({ name: x, value: r });
    };
    m("sEcho", a.iDraw);
    m("iColumns", c);
    m("sColumns", T(b, "sName").join(","));
    m("iDisplayStart", l);
    m("iDisplayLength", n);
    var p = {
      draw: a.iDraw,
      columns: [],
      order: [],
      start: l,
      length: n,
      search: { value: e.sSearch, regex: e.bRegex },
    };
    for (l = 0; l < c; l++) {
      var t = b[l];
      var v = f[l];
      n = "function" == typeof t.mData ? "function" : t.mData;
      p.columns.push({
        data: n,
        name: t.sName,
        searchable: t.bSearchable,
        orderable: t.bSortable,
        search: { value: v.sSearch, regex: v.bRegex },
      });
      m("mDataProp_" + l, n);
      d.bFilter &&
        (m("sSearch_" + l, v.sSearch),
        m("bRegex_" + l, v.bRegex),
        m("bSearchable_" + l, t.bSearchable));
      d.bSort && m("bSortable_" + l, t.bSortable);
    }
    d.bFilter && (m("sSearch", e.sSearch), m("bRegex", e.bRegex));
    d.bSort &&
      (k.each(h, function (x, r) {
        p.order.push({ column: r.col, dir: r.dir });
        m("iSortCol_" + x, r.col);
        m("sSortDir_" + x, r.dir);
      }),
      m("iSortingCols", h.length));
    b = u.ext.legacy.ajax;
    return null === b ? (a.sAjaxSource ? g : p) : b ? g : p;
  }
  function Pb(a, b) {
    var c = function (g, h) {
        return b[g] !== q ? b[g] : b[h];
      },
      d = Ma(a, b),
      e = c("sEcho", "draw"),
      f = c("iTotalRecords", "recordsTotal");
    c = c("iTotalDisplayRecords", "recordsFiltered");
    if (e !== q) {
      if (1 * e < a.iDraw) return;
      a.iDraw = 1 * e;
    }
    Ha(a);
    a._iRecordsTotal = parseInt(f, 10);
    a._iRecordsDisplay = parseInt(c, 10);
    e = 0;
    for (f = d.length; e < f; e++) ea(a, d[e]);
    a.aiDisplay = a.aiDisplayMaster.slice();
    a.bAjaxDataGet = !1;
    fa(a);
    a._bInitComplete || Na(a, b);
    a.bAjaxDataGet = !0;
    U(a, !1);
  }
  function Ma(a, b) {
    a =
      k.isPlainObject(a.ajax) && a.ajax.dataSrc !== q
        ? a.ajax.dataSrc
        : a.sAjaxDataProp;
    return "data" === a ? b.aaData || b[a] : "" !== a ? ia(a)(b) : b;
  }
  function Jb(a) {
    var b = a.oClasses,
      c = a.sTableId,
      d = a.oLanguage,
      e = a.oPreviousSearch,
      f = a.aanFeatures,
      g = '<input type="search" class="' + b.sFilterInput + '"/>',
      h = d.sSearch;
    h = h.match(/_INPUT_/) ? h.replace("_INPUT_", g) : h + g;
    b = k("<div/>", {
      id: f.f ? null : c + "_filter",
      class: b.sFilter,
    }).append(k("<label/>").append(h));
    var l = function () {
      var m = this.value ? this.value : "";
      m != e.sSearch &&
        (ya(a, {
          sSearch: m,
          bRegex: e.bRegex,
          bSmart: e.bSmart,
          bCaseInsensitive: e.bCaseInsensitive,
        }),
        (a._iDisplayStart = 0),
        fa(a));
    };
    f = null !== a.searchDelay ? a.searchDelay : "ssp" === P(a) ? 400 : 0;
    var n = k("input", b)
      .val(e.sSearch)
      .attr("placeholder", d.sSearchPlaceholder)
      .on("keyup.DT search.DT input.DT paste.DT cut.DT", f ? fb(l, f) : l)
      .on("mouseup", function (m) {
        setTimeout(function () {
          l.call(n[0]);
        }, 10);
      })
      .on("keypress.DT", function (m) {
        if (13 == m.keyCode) return !1;
      })
      .attr("aria-controls", c);
    k(a.nTable).on("search.dt.DT", function (m, p) {
      if (a === p)
        try {
          n[0] !== z.activeElement && n.val(e.sSearch);
        } catch (t) {}
    });
    return b[0];
  }
  function ya(a, b, c) {
    var d = a.oPreviousSearch,
      e = a.aoPreSearchCols,
      f = function (h) {
        d.sSearch = h.sSearch;
        d.bRegex = h.bRegex;
        d.bSmart = h.bSmart;
        d.bCaseInsensitive = h.bCaseInsensitive;
      },
      g = function (h) {
        return h.bEscapeRegex !== q ? !h.bEscapeRegex : h.bRegex;
      };
    Ya(a);
    if ("ssp" != P(a)) {
      Qb(a, b.sSearch, c, g(b), b.bSmart, b.bCaseInsensitive);
      f(b);
      for (b = 0; b < e.length; b++)
        Rb(a, e[b].sSearch, b, g(e[b]), e[b].bSmart, e[b].bCaseInsensitive);
      Sb(a);
    } else f(b);
    a.bFiltered = !0;
    I(a, null, "search", [a]);
  }
  function Sb(a) {
    for (
      var b = u.ext.search, c = a.aiDisplay, d, e, f = 0, g = b.length;
      f < g;
      f++
    ) {
      for (var h = [], l = 0, n = c.length; l < n; l++)
        (e = c[l]),
          (d = a.aoData[e]),
          b[f](a, d._aFilterData, e, d._aData, l) && h.push(e);
      c.length = 0;
      k.merge(c, h);
    }
  }
  function Rb(a, b, c, d, e, f) {
    if ("" !== b) {
      var g = [],
        h = a.aiDisplay;
      d = gb(b, d, e, f);
      for (e = 0; e < h.length; e++)
        (b = a.aoData[h[e]]._aFilterData[c]), d.test(b) && g.push(h[e]);
      a.aiDisplay = g;
    }
  }
  function Qb(a, b, c, d, e, f) {
    e = gb(b, d, e, f);
    var g = a.oPreviousSearch.sSearch,
      h = a.aiDisplayMaster;
    f = [];
    0 !== u.ext.search.length && (c = !0);
    var l = Tb(a);
    if (0 >= b.length) a.aiDisplay = h.slice();
    else {
      if (l || c || d || g.length > b.length || 0 !== b.indexOf(g) || a.bSorted)
        a.aiDisplay = h.slice();
      b = a.aiDisplay;
      for (c = 0; c < b.length; c++)
        e.test(a.aoData[b[c]]._sFilterRow) && f.push(b[c]);
      a.aiDisplay = f;
    }
  }
  function gb(a, b, c, d) {
    a = b ? a : hb(a);
    c &&
      (a =
        "^(?=.*?" +
        k
          .map(a.match(/"[^"]+"|[^ ]+/g) || [""], function (e) {
            if ('"' === e.charAt(0)) {
              var f = e.match(/^"(.*)"$/);
              e = f ? f[1] : e;
            }
            return e.replace('"', "");
          })
          .join(")(?=.*?") +
        ").*$");
    return new RegExp(a, d ? "i" : "");
  }
  function Tb(a) {
    var b = a.aoColumns,
      c,
      d,
      e = u.ext.type.search;
    var f = !1;
    var g = 0;
    for (c = a.aoData.length; g < c; g++) {
      var h = a.aoData[g];
      if (!h._aFilterData) {
        var l = [];
        var n = 0;
        for (d = b.length; n < d; n++) {
          f = b[n];
          if (f.bSearchable) {
            var m = S(a, g, n, "filter");
            e[f.sType] && (m = e[f.sType](m));
            null === m && (m = "");
            "string" !== typeof m && m.toString && (m = m.toString());
          } else m = "";
          m.indexOf &&
            -1 !== m.indexOf("&") &&
            ((Oa.innerHTML = m), (m = rc ? Oa.textContent : Oa.innerText));
          m.replace && (m = m.replace(/[\r\n\u2028]/g, ""));
          l.push(m);
        }
        h._aFilterData = l;
        h._sFilterRow = l.join("  ");
        f = !0;
      }
    }
    return f;
  }
  function Ub(a) {
    return {
      search: a.sSearch,
      smart: a.bSmart,
      regex: a.bRegex,
      caseInsensitive: a.bCaseInsensitive,
    };
  }
  function Vb(a) {
    return {
      sSearch: a.search,
      bSmart: a.smart,
      bRegex: a.regex,
      bCaseInsensitive: a.caseInsensitive,
    };
  }
  function Mb(a) {
    var b = a.sTableId,
      c = a.aanFeatures.i,
      d = k("<div/>", { class: a.oClasses.sInfo, id: c ? null : b + "_info" });
    c ||
      (a.aoDrawCallback.push({ fn: Wb, sName: "information" }),
      d.attr("role", "status").attr("aria-live", "polite"),
      k(a.nTable).attr("aria-describedby", b + "_info"));
    return d[0];
  }
  function Wb(a) {
    var b = a.aanFeatures.i;
    if (0 !== b.length) {
      var c = a.oLanguage,
        d = a._iDisplayStart + 1,
        e = a.fnDisplayEnd(),
        f = a.fnRecordsTotal(),
        g = a.fnRecordsDisplay(),
        h = g ? c.sInfo : c.sInfoEmpty;
      g !== f && (h += " " + c.sInfoFiltered);
      h += c.sInfoPostFix;
      h = Xb(a, h);
      c = c.fnInfoCallback;
      null !== c && (h = c.call(a.oInstance, a, d, e, f, g, h));
      k(b).html(h);
    }
  }
  function Xb(a, b) {
    var c = a.fnFormatNumber,
      d = a._iDisplayStart + 1,
      e = a._iDisplayLength,
      f = a.fnRecordsDisplay(),
      g = -1 === e;
    return b
      .replace(/_START_/g, c.call(a, d))
      .replace(/_END_/g, c.call(a, a.fnDisplayEnd()))
      .replace(/_MAX_/g, c.call(a, a.fnRecordsTotal()))
      .replace(/_TOTAL_/g, c.call(a, f))
      .replace(/_PAGE_/g, c.call(a, g ? 1 : Math.ceil(d / e)))
      .replace(/_PAGES_/g, c.call(a, g ? 1 : Math.ceil(f / e)));
  }
  function za(a) {
    var b = a.iInitDisplayStart,
      c = a.aoColumns;
    var d = a.oFeatures;
    var e = a.bDeferLoading;
    if (a.bInitialised) {
      Hb(a);
      Eb(a);
      xa(a, a.aoHeader);
      xa(a, a.aoFooter);
      U(a, !0);
      d.bAutoWidth && Xa(a);
      var f = 0;
      for (d = c.length; f < d; f++) {
        var g = c[f];
        g.sWidth && (g.nTh.style.width = K(g.sWidth));
      }
      I(a, null, "preInit", [a]);
      ja(a);
      c = P(a);
      if ("ssp" != c || e)
        "ajax" == c
          ? La(
              a,
              [],
              function (h) {
                var l = Ma(a, h);
                for (f = 0; f < l.length; f++) ea(a, l[f]);
                a.iInitDisplayStart = b;
                ja(a);
                U(a, !1);
                Na(a, h);
              },
              a
            )
          : (U(a, !1), Na(a));
    } else
      setTimeout(function () {
        za(a);
      }, 200);
  }
  function Na(a, b) {
    a._bInitComplete = !0;
    (b || a.oInit.aaData) && ra(a);
    I(a, null, "plugin-init", [a, b]);
    I(a, "aoInitComplete", "init", [a, b]);
  }
  function ib(a, b) {
    b = parseInt(b, 10);
    a._iDisplayLength = b;
    jb(a);
    I(a, null, "length", [a, b]);
  }
  function Ib(a) {
    var b = a.oClasses,
      c = a.sTableId,
      d = a.aLengthMenu,
      e = Array.isArray(d[0]),
      f = e ? d[0] : d;
    d = e ? d[1] : d;
    e = k("<select/>", {
      name: c + "_length",
      "aria-controls": c,
      class: b.sLengthSelect,
    });
    for (var g = 0, h = f.length; g < h; g++)
      e[0][g] = new Option(
        "number" === typeof d[g] ? a.fnFormatNumber(d[g]) : d[g],
        f[g]
      );
    var l = k("<div><label/></div>").addClass(b.sLength);
    a.aanFeatures.l || (l[0].id = c + "_length");
    l.children().append(
      a.oLanguage.sLengthMenu.replace("_MENU_", e[0].outerHTML)
    );
    k("select", l)
      .val(a._iDisplayLength)
      .on("change.DT", function (n) {
        ib(a, k(this).val());
        fa(a);
      });
    k(a.nTable).on("length.dt.DT", function (n, m, p) {
      a === m && k("select", l).val(p);
    });
    return l[0];
  }
  function Nb(a) {
    var b = a.sPaginationType,
      c = u.ext.pager[b],
      d = "function" === typeof c,
      e = function (g) {
        fa(g);
      };
    b = k("<div/>").addClass(a.oClasses.sPaging + b)[0];
    var f = a.aanFeatures;
    d || c.fnInit(a, b, e);
    f.p ||
      ((b.id = a.sTableId + "_paginate"),
      a.aoDrawCallback.push({
        fn: function (g) {
          if (d) {
            var h = g._iDisplayStart,
              l = g._iDisplayLength,
              n = g.fnRecordsDisplay(),
              m = -1 === l;
            h = m ? 0 : Math.ceil(h / l);
            l = m ? 1 : Math.ceil(n / l);
            n = c(h, l);
            var p;
            m = 0;
            for (p = f.p.length; m < p; m++)
              eb(g, "pageButton")(g, f.p[m], m, n, h, l);
          } else c.fnUpdate(g, e);
        },
        sName: "pagination",
      }));
    return b;
  }
  function kb(a, b, c) {
    var d = a._iDisplayStart,
      e = a._iDisplayLength,
      f = a.fnRecordsDisplay();
    0 === f || -1 === e
      ? (d = 0)
      : "number" === typeof b
      ? ((d = b * e), d > f && (d = 0))
      : "first" == b
      ? (d = 0)
      : "previous" == b
      ? ((d = 0 <= e ? d - e : 0), 0 > d && (d = 0))
      : "next" == b
      ? d + e < f && (d += e)
      : "last" == b
      ? (d = Math.floor((f - 1) / e) * e)
      : aa(a, 0, "Unknown paging action: " + b, 5);
    b = a._iDisplayStart !== d;
    a._iDisplayStart = d;
    b && (I(a, null, "page", [a]), c && fa(a));
    return b;
  }
  function Kb(a) {
    return k("<div/>", {
      id: a.aanFeatures.r ? null : a.sTableId + "_processing",
      class: a.oClasses.sProcessing,
    })
      .html(a.oLanguage.sProcessing)
      .insertBefore(a.nTable)[0];
  }
  function U(a, b) {
    a.oFeatures.bProcessing &&
      k(a.aanFeatures.r).css("display", b ? "block" : "none");
    I(a, null, "processing", [a, b]);
  }
  function Lb(a) {
    var b = k(a.nTable);
    b.attr("role", "grid");
    var c = a.oScroll;
    if ("" === c.sX && "" === c.sY) return a.nTable;
    var d = c.sX,
      e = c.sY,
      f = a.oClasses,
      g = b.children("caption"),
      h = g.length ? g[0]._captionSide : null,
      l = k(b[0].cloneNode(!1)),
      n = k(b[0].cloneNode(!1)),
      m = b.children("tfoot");
    m.length || (m = null);
    l = k("<div/>", { class: f.sScrollWrapper })
      .append(
        k("<div/>", { class: f.sScrollHead })
          .css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: d ? (d ? K(d) : null) : "100%",
          })
          .append(
            k("<div/>", { class: f.sScrollHeadInner })
              .css({ "box-sizing": "content-box", width: c.sXInner || "100%" })
              .append(
                l
                  .removeAttr("id")
                  .css("margin-left", 0)
                  .append("top" === h ? g : null)
                  .append(b.children("thead"))
              )
          )
      )
      .append(
        k("<div/>", { class: f.sScrollBody })
          .css({
            position: "relative",
            overflow: "auto",
            width: d ? K(d) : null,
          })
          .append(b)
      );
    m &&
      l.append(
        k("<div/>", { class: f.sScrollFoot })
          .css({
            overflow: "hidden",
            border: 0,
            width: d ? (d ? K(d) : null) : "100%",
          })
          .append(
            k("<div/>", { class: f.sScrollFootInner }).append(
              n
                .removeAttr("id")
                .css("margin-left", 0)
                .append("bottom" === h ? g : null)
                .append(b.children("tfoot"))
            )
          )
      );
    b = l.children();
    var p = b[0];
    f = b[1];
    var t = m ? b[2] : null;
    if (d)
      k(f).on("scroll.DT", function (v) {
        v = this.scrollLeft;
        p.scrollLeft = v;
        m && (t.scrollLeft = v);
      });
    k(f).css("max-height", e);
    c.bCollapse || k(f).css("height", e);
    a.nScrollHead = p;
    a.nScrollBody = f;
    a.nScrollFoot = t;
    a.aoDrawCallback.push({ fn: Ea, sName: "scrolling" });
    return l[0];
  }
  function Ea(a) {
    var b = a.oScroll,
      c = b.sX,
      d = b.sXInner,
      e = b.sY;
    b = b.iBarWidth;
    var f = k(a.nScrollHead),
      g = f[0].style,
      h = f.children("div"),
      l = h[0].style,
      n = h.children("table");
    h = a.nScrollBody;
    var m = k(h),
      p = h.style,
      t = k(a.nScrollFoot).children("div"),
      v = t.children("table"),
      x = k(a.nTHead),
      r = k(a.nTable),
      A = r[0],
      E = A.style,
      H = a.nTFoot ? k(a.nTFoot) : null,
      W = a.oBrowser,
      M = W.bScrollOversize,
      C = T(a.aoColumns, "nTh"),
      B = [],
      ba = [],
      X = [],
      lb = [],
      Aa,
      Yb = function (F) {
        F = F.style;
        F.paddingTop = "0";
        F.paddingBottom = "0";
        F.borderTopWidth = "0";
        F.borderBottomWidth = "0";
        F.height = 0;
      };
    var ha = h.scrollHeight > h.clientHeight;
    if (a.scrollBarVis !== ha && a.scrollBarVis !== q)
      (a.scrollBarVis = ha), ra(a);
    else {
      a.scrollBarVis = ha;
      r.children("thead, tfoot").remove();
      if (H) {
        var ka = H.clone().prependTo(r);
        var la = H.find("tr");
        ka = ka.find("tr");
      }
      var mb = x.clone().prependTo(r);
      x = x.find("tr");
      ha = mb.find("tr");
      mb.find("th, td").removeAttr("tabindex");
      c || ((p.width = "100%"), (f[0].style.width = "100%"));
      k.each(Ka(a, mb), function (F, Y) {
        Aa = sa(a, F);
        Y.style.width = a.aoColumns[Aa].sWidth;
      });
      H &&
        Z(function (F) {
          F.style.width = "";
        }, ka);
      f = r.outerWidth();
      "" === c
        ? ((E.width = "100%"),
          M &&
            (r.find("tbody").height() > h.offsetHeight ||
              "scroll" == m.css("overflow-y")) &&
            (E.width = K(r.outerWidth() - b)),
          (f = r.outerWidth()))
        : "" !== d && ((E.width = K(d)), (f = r.outerWidth()));
      Z(Yb, ha);
      Z(function (F) {
        X.push(F.innerHTML);
        B.push(K(k(F).css("width")));
      }, ha);
      Z(function (F, Y) {
        -1 !== k.inArray(F, C) && (F.style.width = B[Y]);
      }, x);
      k(ha).height(0);
      H &&
        (Z(Yb, ka),
        Z(function (F) {
          lb.push(F.innerHTML);
          ba.push(K(k(F).css("width")));
        }, ka),
        Z(function (F, Y) {
          F.style.width = ba[Y];
        }, la),
        k(ka).height(0));
      Z(function (F, Y) {
        F.innerHTML = '<div class="dataTables_sizing">' + X[Y] + "</div>";
        F.childNodes[0].style.height = "0";
        F.childNodes[0].style.overflow = "hidden";
        F.style.width = B[Y];
      }, ha);
      H &&
        Z(function (F, Y) {
          F.innerHTML = '<div class="dataTables_sizing">' + lb[Y] + "</div>";
          F.childNodes[0].style.height = "0";
          F.childNodes[0].style.overflow = "hidden";
          F.style.width = ba[Y];
        }, ka);
      r.outerWidth() < f
        ? ((la =
            h.scrollHeight > h.offsetHeight || "scroll" == m.css("overflow-y")
              ? f + b
              : f),
          M &&
            (h.scrollHeight > h.offsetHeight ||
              "scroll" == m.css("overflow-y")) &&
            (E.width = K(la - b)),
          ("" !== c && "" === d) || aa(a, 1, "Possible column misalignment", 6))
        : (la = "100%");
      p.width = K(la);
      g.width = K(la);
      H && (a.nScrollFoot.style.width = K(la));
      !e && M && (p.height = K(A.offsetHeight + b));
      c = r.outerWidth();
      n[0].style.width = K(c);
      l.width = K(c);
      d = r.height() > h.clientHeight || "scroll" == m.css("overflow-y");
      e = "padding" + (W.bScrollbarLeft ? "Left" : "Right");
      l[e] = d ? b + "px" : "0px";
      H &&
        ((v[0].style.width = K(c)),
        (t[0].style.width = K(c)),
        (t[0].style[e] = d ? b + "px" : "0px"));
      r.children("colgroup").insertBefore(r.children("thead"));
      m.trigger("scroll");
      (!a.bSorted && !a.bFiltered) || a._drawHold || (h.scrollTop = 0);
    }
  }
  function Z(a, b, c) {
    for (var d = 0, e = 0, f = b.length, g, h; e < f; ) {
      g = b[e].firstChild;
      for (h = c ? c[e].firstChild : null; g; )
        1 === g.nodeType && (c ? a(g, h, d) : a(g, d), d++),
          (g = g.nextSibling),
          (h = c ? h.nextSibling : null);
      e++;
    }
  }
  function Xa(a) {
    var b = a.nTable,
      c = a.aoColumns,
      d = a.oScroll,
      e = d.sY,
      f = d.sX,
      g = d.sXInner,
      h = c.length,
      l = Fa(a, "bVisible"),
      n = k("th", a.nTHead),
      m = b.getAttribute("width"),
      p = b.parentNode,
      t = !1,
      v,
      x = a.oBrowser;
    d = x.bScrollOversize;
    (v = b.style.width) && -1 !== v.indexOf("%") && (m = v);
    for (v = 0; v < l.length; v++) {
      var r = c[l[v]];
      null !== r.sWidth && ((r.sWidth = Zb(r.sWidthOrig, p)), (t = !0));
    }
    if (d || (!t && !f && !e && h == na(a) && h == n.length))
      for (v = 0; v < h; v++)
        (l = sa(a, v)), null !== l && (c[l].sWidth = K(n.eq(v).width()));
    else {
      h = k(b).clone().css("visibility", "hidden").removeAttr("id");
      h.find("tbody tr").remove();
      var A = k("<tr/>").appendTo(h.find("tbody"));
      h.find("thead, tfoot").remove();
      h.append(k(a.nTHead).clone()).append(k(a.nTFoot).clone());
      h.find("tfoot th, tfoot td").css("width", "");
      n = Ka(a, h.find("thead")[0]);
      for (v = 0; v < l.length; v++)
        (r = c[l[v]]),
          (n[v].style.width =
            null !== r.sWidthOrig && "" !== r.sWidthOrig
              ? K(r.sWidthOrig)
              : ""),
          r.sWidthOrig &&
            f &&
            k(n[v]).append(
              k("<div/>").css({
                width: r.sWidthOrig,
                margin: 0,
                padding: 0,
                border: 0,
                height: 1,
              })
            );
      if (a.aoData.length)
        for (v = 0; v < l.length; v++)
          (t = l[v]),
            (r = c[t]),
            k($b(a, t)).clone(!1).append(r.sContentPadding).appendTo(A);
      k("[name]", h).removeAttr("name");
      r = k("<div/>")
        .css(
          f || e
            ? {
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                right: 0,
                overflow: "hidden",
              }
            : {}
        )
        .append(h)
        .appendTo(p);
      f && g
        ? h.width(g)
        : f
        ? (h.css("width", "auto"),
          h.removeAttr("width"),
          h.width() < p.clientWidth && m && h.width(p.clientWidth))
        : e
        ? h.width(p.clientWidth)
        : m && h.width(m);
      for (v = e = 0; v < l.length; v++)
        (p = k(n[v])),
          (g = p.outerWidth() - p.width()),
          (p = x.bBounding
            ? Math.ceil(n[v].getBoundingClientRect().width)
            : p.outerWidth()),
          (e += p),
          (c[l[v]].sWidth = K(p - g));
      b.style.width = K(e);
      r.remove();
    }
    m && (b.style.width = K(m));
    (!m && !f) ||
      a._reszEvt ||
      ((b = function () {
        k(y).on(
          "resize.DT-" + a.sInstance,
          fb(function () {
            ra(a);
          })
        );
      }),
      d ? setTimeout(b, 1e3) : b(),
      (a._reszEvt = !0));
  }
  function Zb(a, b) {
    if (!a) return 0;
    a = k("<div/>")
      .css("width", K(a))
      .appendTo(b || z.body);
    b = a[0].offsetWidth;
    a.remove();
    return b;
  }
  function $b(a, b) {
    var c = ac(a, b);
    if (0 > c) return null;
    var d = a.aoData[c];
    return d.nTr ? d.anCells[b] : k("<td/>").html(S(a, c, b, "display"))[0];
  }
  function ac(a, b) {
    for (var c, d = -1, e = -1, f = 0, g = a.aoData.length; f < g; f++)
      (c = S(a, f, b, "display") + ""),
        (c = c.replace(sc, "")),
        (c = c.replace(/&nbsp;/g, " ")),
        c.length > d && ((d = c.length), (e = f));
    return e;
  }
  function K(a) {
    return null === a
      ? "0px"
      : "number" == typeof a
      ? 0 > a
        ? "0px"
        : a + "px"
      : a.match(/\d$/)
      ? a + "px"
      : a;
  }
  function pa(a) {
    var b = [],
      c = a.aoColumns;
    var d = a.aaSortingFixed;
    var e = k.isPlainObject(d);
    var f = [];
    var g = function (m) {
      m.length && !Array.isArray(m[0]) ? f.push(m) : k.merge(f, m);
    };
    Array.isArray(d) && g(d);
    e && d.pre && g(d.pre);
    g(a.aaSorting);
    e && d.post && g(d.post);
    for (a = 0; a < f.length; a++) {
      var h = f[a][0];
      g = c[h].aDataSort;
      d = 0;
      for (e = g.length; d < e; d++) {
        var l = g[d];
        var n = c[l].sType || "string";
        f[a]._idx === q && (f[a]._idx = k.inArray(f[a][1], c[l].asSorting));
        b.push({
          src: h,
          col: l,
          dir: f[a][1],
          index: f[a]._idx,
          type: n,
          formatter: u.ext.type.order[n + "-pre"],
        });
      }
    }
    return b;
  }
  function Gb(a) {
    var b,
      c = [],
      d = u.ext.type.order,
      e = a.aoData,
      f = 0,
      g = a.aiDisplayMaster;
    Ya(a);
    var h = pa(a);
    var l = 0;
    for (b = h.length; l < b; l++) {
      var n = h[l];
      n.formatter && f++;
      bc(a, n.col);
    }
    if ("ssp" != P(a) && 0 !== h.length) {
      l = 0;
      for (b = g.length; l < b; l++) c[g[l]] = l;
      f === h.length
        ? g.sort(function (m, p) {
            var t,
              v = h.length,
              x = e[m]._aSortData,
              r = e[p]._aSortData;
            for (t = 0; t < v; t++) {
              var A = h[t];
              var E = x[A.col];
              var H = r[A.col];
              E = E < H ? -1 : E > H ? 1 : 0;
              if (0 !== E) return "asc" === A.dir ? E : -E;
            }
            E = c[m];
            H = c[p];
            return E < H ? -1 : E > H ? 1 : 0;
          })
        : g.sort(function (m, p) {
            var t,
              v = h.length,
              x = e[m]._aSortData,
              r = e[p]._aSortData;
            for (t = 0; t < v; t++) {
              var A = h[t];
              var E = x[A.col];
              var H = r[A.col];
              A = d[A.type + "-" + A.dir] || d["string-" + A.dir];
              E = A(E, H);
              if (0 !== E) return E;
            }
            E = c[m];
            H = c[p];
            return E < H ? -1 : E > H ? 1 : 0;
          });
    }
    a.bSorted = !0;
  }
  function cc(a) {
    var b = a.aoColumns,
      c = pa(a);
    a = a.oLanguage.oAria;
    for (var d = 0, e = b.length; d < e; d++) {
      var f = b[d];
      var g = f.asSorting;
      var h = f.sTitle.replace(/<.*?>/g, "");
      var l = f.nTh;
      l.removeAttribute("aria-sort");
      f.bSortable &&
        (0 < c.length && c[0].col == d
          ? (l.setAttribute(
              "aria-sort",
              "asc" == c[0].dir ? "ascending" : "descending"
            ),
            (f = g[c[0].index + 1] || g[0]))
          : (f = g[0]),
        (h += "asc" === f ? a.sSortAscending : a.sSortDescending));
      l.setAttribute("aria-label", h);
    }
  }
  function nb(a, b, c, d) {
    var e = a.aaSorting,
      f = a.aoColumns[b].asSorting,
      g = function (h, l) {
        var n = h._idx;
        n === q && (n = k.inArray(h[1], f));
        return n + 1 < f.length ? n + 1 : l ? null : 0;
      };
    "number" === typeof e[0] && (e = a.aaSorting = [e]);
    c && a.oFeatures.bSortMulti
      ? ((c = k.inArray(b, T(e, "0"))),
        -1 !== c
          ? ((b = g(e[c], !0)),
            null === b && 1 === e.length && (b = 0),
            null === b ? e.splice(c, 1) : ((e[c][1] = f[b]), (e[c]._idx = b)))
          : (e.push([b, f[0], 0]), (e[e.length - 1]._idx = 0)))
      : e.length && e[0][0] == b
      ? ((b = g(e[0])), (e.length = 1), (e[0][1] = f[b]), (e[0]._idx = b))
      : ((e.length = 0), e.push([b, f[0]]), (e[0]._idx = 0));
    ja(a);
    "function" == typeof d && d(a);
  }
  function db(a, b, c, d) {
    var e = a.aoColumns[c];
    ob(b, {}, function (f) {
      !1 !== e.bSortable &&
        (a.oFeatures.bProcessing
          ? (U(a, !0),
            setTimeout(function () {
              nb(a, c, f.shiftKey, d);
              "ssp" !== P(a) && U(a, !1);
            }, 0))
          : nb(a, c, f.shiftKey, d));
    });
  }
  function Pa(a) {
    var b = a.aLastSort,
      c = a.oClasses.sSortColumn,
      d = pa(a),
      e = a.oFeatures,
      f;
    if (e.bSort && e.bSortClasses) {
      e = 0;
      for (f = b.length; e < f; e++) {
        var g = b[e].src;
        k(T(a.aoData, "anCells", g)).removeClass(c + (2 > e ? e + 1 : 3));
      }
      e = 0;
      for (f = d.length; e < f; e++)
        (g = d[e].src),
          k(T(a.aoData, "anCells", g)).addClass(c + (2 > e ? e + 1 : 3));
    }
    a.aLastSort = d;
  }
  function bc(a, b) {
    var c = a.aoColumns[b],
      d = u.ext.order[c.sSortDataType],
      e;
    d && (e = d.call(a.oInstance, a, b, ta(a, b)));
    for (
      var f, g = u.ext.type.order[c.sType + "-pre"], h = 0, l = a.aoData.length;
      h < l;
      h++
    )
      if (
        ((c = a.aoData[h]),
        c._aSortData || (c._aSortData = []),
        !c._aSortData[b] || d)
      )
        (f = d ? e[h] : S(a, h, b, "sort")), (c._aSortData[b] = g ? g(f) : f);
  }
  function Qa(a) {
    if (a.oFeatures.bStateSave && !a.bDestroying) {
      var b = {
        time: +new Date(),
        start: a._iDisplayStart,
        length: a._iDisplayLength,
        order: k.extend(!0, [], a.aaSorting),
        search: Ub(a.oPreviousSearch),
        columns: k.map(a.aoColumns, function (c, d) {
          return { visible: c.bVisible, search: Ub(a.aoPreSearchCols[d]) };
        }),
      };
      I(a, "aoStateSaveParams", "stateSaveParams", [a, b]);
      a.oSavedState = b;
      a.fnStateSaveCallback.call(a.oInstance, a, b);
    }
  }
  function dc(a, b, c) {
    var d,
      e,
      f = a.aoColumns;
    b = function (h) {
      if (h && h.time) {
        var l = I(a, "aoStateLoadParams", "stateLoadParams", [a, h]);
        if (
          -1 === k.inArray(!1, l) &&
          ((l = a.iStateDuration),
          !(
            (0 < l && h.time < +new Date() - 1e3 * l) ||
            (h.columns && f.length !== h.columns.length)
          ))
        ) {
          a.oLoadedState = k.extend(!0, {}, h);
          h.start !== q &&
            ((a._iDisplayStart = h.start), (a.iInitDisplayStart = h.start));
          h.length !== q && (a._iDisplayLength = h.length);
          h.order !== q &&
            ((a.aaSorting = []),
            k.each(h.order, function (n, m) {
              a.aaSorting.push(m[0] >= f.length ? [0, m[1]] : m);
            }));
          h.search !== q && k.extend(a.oPreviousSearch, Vb(h.search));
          if (h.columns)
            for (d = 0, e = h.columns.length; d < e; d++)
              (l = h.columns[d]),
                l.visible !== q && (f[d].bVisible = l.visible),
                l.search !== q && k.extend(a.aoPreSearchCols[d], Vb(l.search));
          I(a, "aoStateLoaded", "stateLoaded", [a, h]);
        }
      }
      c();
    };
    if (a.oFeatures.bStateSave) {
      var g = a.fnStateLoadCallback.call(a.oInstance, a, b);
      g !== q && b(g);
    } else c();
  }
  function Ra(a) {
    var b = u.settings;
    a = k.inArray(a, T(b, "nTable"));
    return -1 !== a ? b[a] : null;
  }
  function aa(a, b, c, d) {
    c =
      "DataTables warning: " + (a ? "table id=" + a.sTableId + " - " : "") + c;
    d &&
      (c +=
        ". For more information about this error, please see http://datatables.net/tn/" +
        d);
    if (b) y.console && console.log && console.log(c);
    else if (
      ((b = u.ext),
      (b = b.sErrMode || b.errMode),
      a && I(a, null, "error", [a, d, c]),
      "alert" == b)
    )
      alert(c);
    else {
      if ("throw" == b) throw Error(c);
      "function" == typeof b && b(a, d, c);
    }
  }
  function V(a, b, c, d) {
    Array.isArray(c)
      ? k.each(c, function (e, f) {
          Array.isArray(f) ? V(a, b, f[0], f[1]) : V(a, b, f);
        })
      : (d === q && (d = c), b[c] !== q && (a[d] = b[c]));
  }
  function pb(a, b, c) {
    var d;
    for (d in b)
      if (b.hasOwnProperty(d)) {
        var e = b[d];
        k.isPlainObject(e)
          ? (k.isPlainObject(a[d]) || (a[d] = {}), k.extend(!0, a[d], e))
          : c && "data" !== d && "aaData" !== d && Array.isArray(e)
          ? (a[d] = e.slice())
          : (a[d] = e);
      }
    return a;
  }
  function ob(a, b, c) {
    k(a)
      .on("click.DT", b, function (d) {
        k(a).trigger("blur");
        c(d);
      })
      .on("keypress.DT", b, function (d) {
        13 === d.which && (d.preventDefault(), c(d));
      })
      .on("selectstart.DT", function () {
        return !1;
      });
  }
  function Q(a, b, c, d) {
    c && a[b].push({ fn: c, sName: d });
  }
  function I(a, b, c, d) {
    var e = [];
    b &&
      (e = k.map(a[b].slice().reverse(), function (f, g) {
        return f.fn.apply(a.oInstance, d);
      }));
    null !== c &&
      ((b = k.Event(c + ".dt")), k(a.nTable).trigger(b, d), e.push(b.result));
    return e;
  }
  function jb(a) {
    var b = a._iDisplayStart,
      c = a.fnDisplayEnd(),
      d = a._iDisplayLength;
    b >= c && (b = c - d);
    b -= b % d;
    if (-1 === d || 0 > b) b = 0;
    a._iDisplayStart = b;
  }
  function eb(a, b) {
    a = a.renderer;
    var c = u.ext.renderer[b];
    return k.isPlainObject(a) && a[b]
      ? c[a[b]] || c._
      : "string" === typeof a
      ? c[a] || c._
      : c._;
  }
  function P(a) {
    return a.oFeatures.bServerSide
      ? "ssp"
      : a.ajax || a.sAjaxSource
      ? "ajax"
      : "dom";
  }
  function Ba(a, b) {
    var c = ec.numbers_length,
      d = Math.floor(c / 2);
    b <= c
      ? (a = qa(0, b))
      : a <= d
      ? ((a = qa(0, c - 2)), a.push("ellipsis"), a.push(b - 1))
      : (a >= b - 1 - d
          ? (a = qa(b - (c - 2), b))
          : ((a = qa(a - d + 2, a + d - 1)), a.push("ellipsis"), a.push(b - 1)),
        a.splice(0, 0, "ellipsis"),
        a.splice(0, 0, 0));
    a.DT_el = "span";
    return a;
  }
  function Va(a) {
    k.each(
      {
        num: function (b) {
          return Sa(b, a);
        },
        "num-fmt": function (b) {
          return Sa(b, a, qb);
        },
        "html-num": function (b) {
          return Sa(b, a, Ta);
        },
        "html-num-fmt": function (b) {
          return Sa(b, a, Ta, qb);
        },
      },
      function (b, c) {
        L.type.order[b + a + "-pre"] = c;
        b.match(/^html\-/) && (L.type.search[b + a] = L.type.search.html);
      }
    );
  }
  function fc(a) {
    return function () {
      var b = [Ra(this[u.ext.iApiIndex])].concat(
        Array.prototype.slice.call(arguments)
      );
      return u.ext.internal[a].apply(this, b);
    };
  }
  var u = function (a) {
      this.$ = function (f, g) {
        return this.api(!0).$(f, g);
      };
      this._ = function (f, g) {
        return this.api(!0).rows(f, g).data();
      };
      this.api = function (f) {
        return f ? new D(Ra(this[L.iApiIndex])) : new D(this);
      };
      this.fnAddData = function (f, g) {
        var h = this.api(!0);
        f =
          Array.isArray(f) && (Array.isArray(f[0]) || k.isPlainObject(f[0]))
            ? h.rows.add(f)
            : h.row.add(f);
        (g === q || g) && h.draw();
        return f.flatten().toArray();
      };
      this.fnAdjustColumnSizing = function (f) {
        var g = this.api(!0).columns.adjust(),
          h = g.settings()[0],
          l = h.oScroll;
        f === q || f ? g.draw(!1) : ("" !== l.sX || "" !== l.sY) && Ea(h);
      };
      this.fnClearTable = function (f) {
        var g = this.api(!0).clear();
        (f === q || f) && g.draw();
      };
      this.fnClose = function (f) {
        this.api(!0).row(f).child.hide();
      };
      this.fnDeleteRow = function (f, g, h) {
        var l = this.api(!0);
        f = l.rows(f);
        var n = f.settings()[0],
          m = n.aoData[f[0][0]];
        f.remove();
        g && g.call(this, n, m);
        (h === q || h) && l.draw();
        return m;
      };
      this.fnDestroy = function (f) {
        this.api(!0).destroy(f);
      };
      this.fnDraw = function (f) {
        this.api(!0).draw(f);
      };
      this.fnFilter = function (f, g, h, l, n, m) {
        n = this.api(!0);
        null === g || g === q
          ? n.search(f, h, l, m)
          : n.column(g).search(f, h, l, m);
        n.draw();
      };
      this.fnGetData = function (f, g) {
        var h = this.api(!0);
        if (f !== q) {
          var l = f.nodeName ? f.nodeName.toLowerCase() : "";
          return g !== q || "td" == l || "th" == l
            ? h.cell(f, g).data()
            : h.row(f).data() || null;
        }
        return h.data().toArray();
      };
      this.fnGetNodes = function (f) {
        var g = this.api(!0);
        return f !== q ? g.row(f).node() : g.rows().nodes().flatten().toArray();
      };
      this.fnGetPosition = function (f) {
        var g = this.api(!0),
          h = f.nodeName.toUpperCase();
        return "TR" == h
          ? g.row(f).index()
          : "TD" == h || "TH" == h
          ? ((f = g.cell(f).index()), [f.row, f.columnVisible, f.column])
          : null;
      };
      this.fnIsOpen = function (f) {
        return this.api(!0).row(f).child.isShown();
      };
      this.fnOpen = function (f, g, h) {
        return this.api(!0).row(f).child(g, h).show().child()[0];
      };
      this.fnPageChange = function (f, g) {
        f = this.api(!0).page(f);
        (g === q || g) && f.draw(!1);
      };
      this.fnSetColumnVis = function (f, g, h) {
        f = this.api(!0).column(f).visible(g);
        (h === q || h) && f.columns.adjust().draw();
      };
      this.fnSettings = function () {
        return Ra(this[L.iApiIndex]);
      };
      this.fnSort = function (f) {
        this.api(!0).order(f).draw();
      };
      this.fnSortListener = function (f, g, h) {
        this.api(!0).order.listener(f, g, h);
      };
      this.fnUpdate = function (f, g, h, l, n) {
        var m = this.api(!0);
        h === q || null === h ? m.row(g).data(f) : m.cell(g, h).data(f);
        (n === q || n) && m.columns.adjust();
        (l === q || l) && m.draw();
        return 0;
      };
      this.fnVersionCheck = L.fnVersionCheck;
      var b = this,
        c = a === q,
        d = this.length;
      c && (a = {});
      this.oApi = this.internal = L.internal;
      for (var e in u.ext.internal) e && (this[e] = fc(e));
      this.each(function () {
        var f = {},
          g = 1 < d ? pb(f, a, !0) : a,
          h = 0,
          l;
        f = this.getAttribute("id");
        var n = !1,
          m = u.defaults,
          p = k(this);
        if ("table" != this.nodeName.toLowerCase())
          aa(
            null,
            0,
            "Non-table node initialisation (" + this.nodeName + ")",
            2
          );
        else {
          yb(m);
          zb(m.column);
          O(m, m, !0);
          O(m.column, m.column, !0);
          O(m, k.extend(g, p.data()), !0);
          var t = u.settings;
          h = 0;
          for (l = t.length; h < l; h++) {
            var v = t[h];
            if (
              v.nTable == this ||
              (v.nTHead && v.nTHead.parentNode == this) ||
              (v.nTFoot && v.nTFoot.parentNode == this)
            ) {
              var x = g.bRetrieve !== q ? g.bRetrieve : m.bRetrieve;
              if (c || x) return v.oInstance;
              if (g.bDestroy !== q ? g.bDestroy : m.bDestroy) {
                v.oInstance.fnDestroy();
                break;
              } else {
                aa(v, 0, "Cannot reinitialise DataTable", 3);
                return;
              }
            }
            if (v.sTableId == this.id) {
              t.splice(h, 1);
              break;
            }
          }
          if (null === f || "" === f)
            this.id = f = "DataTables_Table_" + u.ext._unique++;
          var r = k.extend(!0, {}, u.models.oSettings, {
            sDestroyWidth: p[0].style.width,
            sInstance: f,
            sTableId: f,
          });
          r.nTable = this;
          r.oApi = b.internal;
          r.oInit = g;
          t.push(r);
          r.oInstance = 1 === b.length ? b : p.dataTable();
          yb(g);
          ma(g.oLanguage);
          g.aLengthMenu &&
            !g.iDisplayLength &&
            (g.iDisplayLength = Array.isArray(g.aLengthMenu[0])
              ? g.aLengthMenu[0][0]
              : g.aLengthMenu[0]);
          g = pb(k.extend(!0, {}, m), g);
          V(
            r.oFeatures,
            g,
            "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(
              " "
            )
          );
          V(r, g, [
            "asStripeClasses",
            "ajax",
            "fnServerData",
            "fnFormatNumber",
            "sServerMethod",
            "aaSorting",
            "aaSortingFixed",
            "aLengthMenu",
            "sPaginationType",
            "sAjaxSource",
            "sAjaxDataProp",
            "iStateDuration",
            "sDom",
            "bSortCellsTop",
            "iTabIndex",
            "fnStateLoadCallback",
            "fnStateSaveCallback",
            "renderer",
            "searchDelay",
            "rowId",
            ["iCookieDuration", "iStateDuration"],
            ["oSearch", "oPreviousSearch"],
            ["aoSearchCols", "aoPreSearchCols"],
            ["iDisplayLength", "_iDisplayLength"],
          ]);
          V(r.oScroll, g, [
            ["sScrollX", "sX"],
            ["sScrollXInner", "sXInner"],
            ["sScrollY", "sY"],
            ["bScrollCollapse", "bCollapse"],
          ]);
          V(r.oLanguage, g, "fnInfoCallback");
          Q(r, "aoDrawCallback", g.fnDrawCallback, "user");
          Q(r, "aoServerParams", g.fnServerParams, "user");
          Q(r, "aoStateSaveParams", g.fnStateSaveParams, "user");
          Q(r, "aoStateLoadParams", g.fnStateLoadParams, "user");
          Q(r, "aoStateLoaded", g.fnStateLoaded, "user");
          Q(r, "aoRowCallback", g.fnRowCallback, "user");
          Q(r, "aoRowCreatedCallback", g.fnCreatedRow, "user");
          Q(r, "aoHeaderCallback", g.fnHeaderCallback, "user");
          Q(r, "aoFooterCallback", g.fnFooterCallback, "user");
          Q(r, "aoInitComplete", g.fnInitComplete, "user");
          Q(r, "aoPreDrawCallback", g.fnPreDrawCallback, "user");
          r.rowIdFn = ia(g.rowId);
          Ab(r);
          var A = r.oClasses;
          k.extend(A, u.ext.classes, g.oClasses);
          p.addClass(A.sTable);
          r.iInitDisplayStart === q &&
            ((r.iInitDisplayStart = g.iDisplayStart),
            (r._iDisplayStart = g.iDisplayStart));
          null !== g.iDeferLoading &&
            ((r.bDeferLoading = !0),
            (f = Array.isArray(g.iDeferLoading)),
            (r._iRecordsDisplay = f ? g.iDeferLoading[0] : g.iDeferLoading),
            (r._iRecordsTotal = f ? g.iDeferLoading[1] : g.iDeferLoading));
          var E = r.oLanguage;
          k.extend(!0, E, g.oLanguage);
          E.sUrl &&
            (k.ajax({
              dataType: "json",
              url: E.sUrl,
              success: function (C) {
                ma(C);
                O(m.oLanguage, C);
                k.extend(!0, E, C);
                za(r);
              },
              error: function () {
                za(r);
              },
            }),
            (n = !0));
          null === g.asStripeClasses &&
            (r.asStripeClasses = [A.sStripeOdd, A.sStripeEven]);
          f = r.asStripeClasses;
          var H = p.children("tbody").find("tr").eq(0);
          -1 !==
            k.inArray(
              !0,
              k.map(f, function (C, B) {
                return H.hasClass(C);
              })
            ) &&
            (k("tbody tr", this).removeClass(f.join(" ")),
            (r.asDestroyStripes = f.slice()));
          f = [];
          t = this.getElementsByTagName("thead");
          0 !== t.length && (wa(r.aoHeader, t[0]), (f = Ka(r)));
          if (null === g.aoColumns)
            for (t = [], h = 0, l = f.length; h < l; h++) t.push(null);
          else t = g.aoColumns;
          h = 0;
          for (l = t.length; h < l; h++) Wa(r, f ? f[h] : null);
          Cb(r, g.aoColumnDefs, t, function (C, B) {
            Da(r, C, B);
          });
          if (H.length) {
            var W = function (C, B) {
              return null !== C.getAttribute("data-" + B) ? B : null;
            };
            k(H[0])
              .children("th, td")
              .each(function (C, B) {
                var ba = r.aoColumns[C];
                if (ba.mData === C) {
                  var X = W(B, "sort") || W(B, "order");
                  B = W(B, "filter") || W(B, "search");
                  if (null !== X || null !== B)
                    (ba.mData = {
                      _: C + ".display",
                      sort: null !== X ? C + ".@data-" + X : q,
                      type: null !== X ? C + ".@data-" + X : q,
                      filter: null !== B ? C + ".@data-" + B : q,
                    }),
                      Da(r, C);
                }
              });
          }
          var M = r.oFeatures;
          f = function () {
            if (g.aaSorting === q) {
              var C = r.aaSorting;
              h = 0;
              for (l = C.length; h < l; h++)
                C[h][1] = r.aoColumns[h].asSorting[0];
            }
            Pa(r);
            M.bSort &&
              Q(r, "aoDrawCallback", function () {
                if (r.bSorted) {
                  var ba = pa(r),
                    X = {};
                  k.each(ba, function (lb, Aa) {
                    X[Aa.src] = Aa.dir;
                  });
                  I(r, null, "order", [r, ba, X]);
                  cc(r);
                }
              });
            Q(
              r,
              "aoDrawCallback",
              function () {
                (r.bSorted || "ssp" === P(r) || M.bDeferRender) && Pa(r);
              },
              "sc"
            );
            C = p.children("caption").each(function () {
              this._captionSide = k(this).css("caption-side");
            });
            var B = p.children("thead");
            0 === B.length && (B = k("<thead/>").appendTo(p));
            r.nTHead = B[0];
            B = p.children("tbody");
            0 === B.length && (B = k("<tbody/>").appendTo(p));
            r.nTBody = B[0];
            B = p.children("tfoot");
            0 === B.length &&
              0 < C.length &&
              ("" !== r.oScroll.sX || "" !== r.oScroll.sY) &&
              (B = k("<tfoot/>").appendTo(p));
            0 === B.length || 0 === B.children().length
              ? p.addClass(A.sNoFooter)
              : 0 < B.length && ((r.nTFoot = B[0]), wa(r.aoFooter, r.nTFoot));
            if (g.aaData)
              for (h = 0; h < g.aaData.length; h++) ea(r, g.aaData[h]);
            else
              (r.bDeferLoading || "dom" == P(r)) &&
                Ga(r, k(r.nTBody).children("tr"));
            r.aiDisplay = r.aiDisplayMaster.slice();
            r.bInitialised = !0;
            !1 === n && za(r);
          };
          g.bStateSave
            ? ((M.bStateSave = !0),
              Q(r, "aoDrawCallback", Qa, "state_save"),
              dc(r, g, f))
            : f();
        }
      });
      b = null;
      return this;
    },
    L,
    w,
    J,
    rb = {},
    gc = /[\r\n\u2028]/g,
    Ta = /<.*?>/g,
    tc =
      /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
    uc = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\$|\^|\-)/g,
    qb = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
    ca = function (a) {
      return a && !0 !== a && "-" !== a ? !1 : !0;
    },
    hc = function (a) {
      var b = parseInt(a, 10);
      return !isNaN(b) && isFinite(a) ? b : null;
    },
    ic = function (a, b) {
      rb[b] || (rb[b] = new RegExp(hb(b), "g"));
      return "string" === typeof a && "." !== b
        ? a.replace(/\./g, "").replace(rb[b], ".")
        : a;
    },
    sb = function (a, b, c) {
      var d = "string" === typeof a;
      if (ca(a)) return !0;
      b && d && (a = ic(a, b));
      c && d && (a = a.replace(qb, ""));
      return !isNaN(parseFloat(a)) && isFinite(a);
    },
    jc = function (a, b, c) {
      return ca(a)
        ? !0
        : ca(a) || "string" === typeof a
        ? sb(a.replace(Ta, ""), b, c)
          ? !0
          : null
        : null;
    },
    T = function (a, b, c) {
      var d = [],
        e = 0,
        f = a.length;
      if (c !== q) for (; e < f; e++) a[e] && a[e][b] && d.push(a[e][b][c]);
      else for (; e < f; e++) a[e] && d.push(a[e][b]);
      return d;
    },
    Ca = function (a, b, c, d) {
      var e = [],
        f = 0,
        g = b.length;
      if (d !== q) for (; f < g; f++) a[b[f]][c] && e.push(a[b[f]][c][d]);
      else for (; f < g; f++) e.push(a[b[f]][c]);
      return e;
    },
    qa = function (a, b) {
      var c = [];
      if (b === q) {
        b = 0;
        var d = a;
      } else (d = b), (b = a);
      for (a = b; a < d; a++) c.push(a);
      return c;
    },
    kc = function (a) {
      for (var b = [], c = 0, d = a.length; c < d; c++) a[c] && b.push(a[c]);
      return b;
    },
    Ja = function (a) {
      a: {
        if (!(2 > a.length)) {
          var b = a.slice().sort();
          for (var c = b[0], d = 1, e = b.length; d < e; d++) {
            if (b[d] === c) {
              b = !1;
              break a;
            }
            c = b[d];
          }
        }
        b = !0;
      }
      if (b) return a.slice();
      b = [];
      e = a.length;
      var f,
        g = 0;
      d = 0;
      a: for (; d < e; d++) {
        c = a[d];
        for (f = 0; f < g; f++) if (b[f] === c) continue a;
        b.push(c);
        g++;
      }
      return b;
    },
    lc = function (a, b) {
      if (Array.isArray(b)) for (var c = 0; c < b.length; c++) lc(a, b[c]);
      else a.push(b);
      return a;
    };
  Array.isArray ||
    (Array.isArray = function (a) {
      return "[object Array]" === Object.prototype.toString.call(a);
    });
  String.prototype.trim ||
    (String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    });
  u.util = {
    throttle: function (a, b) {
      var c = b !== q ? b : 200,
        d,
        e;
      return function () {
        var f = this,
          g = +new Date(),
          h = arguments;
        d && g < d + c
          ? (clearTimeout(e),
            (e = setTimeout(function () {
              d = q;
              a.apply(f, h);
            }, c)))
          : ((d = g), a.apply(f, h));
      };
    },
    escapeRegex: function (a) {
      return a.replace(uc, "\\$1");
    },
  };
  var R = function (a, b, c) {
      a[b] !== q && (a[c] = a[b]);
    },
    ua = /\[.*?\]$/,
    oa = /\(\)$/,
    hb = u.util.escapeRegex,
    Oa = k("<div>")[0],
    rc = Oa.textContent !== q,
    sc = /<.*?>/g,
    fb = u.util.throttle,
    mc = [],
    N = Array.prototype,
    vc = function (a) {
      var b,
        c = u.settings,
        d = k.map(c, function (f, g) {
          return f.nTable;
        });
      if (a) {
        if (a.nTable && a.oApi) return [a];
        if (a.nodeName && "table" === a.nodeName.toLowerCase()) {
          var e = k.inArray(a, d);
          return -1 !== e ? [c[e]] : null;
        }
        if (a && "function" === typeof a.settings)
          return a.settings().toArray();
        "string" === typeof a ? (b = k(a)) : a instanceof k && (b = a);
      } else return [];
      if (b)
        return b
          .map(function (f) {
            e = k.inArray(this, d);
            return -1 !== e ? c[e] : null;
          })
          .toArray();
    };
  var D = function (a, b) {
    if (!(this instanceof D)) return new D(a, b);
    var c = [],
      d = function (g) {
        (g = vc(g)) && c.push.apply(c, g);
      };
    if (Array.isArray(a)) for (var e = 0, f = a.length; e < f; e++) d(a[e]);
    else d(a);
    this.context = Ja(c);
    b && k.merge(this, b);
    this.selector = { rows: null, cols: null, opts: null };
    D.extend(this, this, mc);
  };
  u.Api = D;
  k.extend(D.prototype, {
    any: function () {
      return 0 !== this.count();
    },
    concat: N.concat,
    context: [],
    count: function () {
      return this.flatten().length;
    },
    each: function (a) {
      for (var b = 0, c = this.length; b < c; b++)
        a.call(this, this[b], b, this);
      return this;
    },
    eq: function (a) {
      var b = this.context;
      return b.length > a ? new D(b[a], this[a]) : null;
    },
    filter: function (a) {
      var b = [];
      if (N.filter) b = N.filter.call(this, a, this);
      else
        for (var c = 0, d = this.length; c < d; c++)
          a.call(this, this[c], c, this) && b.push(this[c]);
      return new D(this.context, b);
    },
    flatten: function () {
      var a = [];
      return new D(this.context, a.concat.apply(a, this.toArray()));
    },
    join: N.join,
    indexOf:
      N.indexOf ||
      function (a, b) {
        b = b || 0;
        for (var c = this.length; b < c; b++) if (this[b] === a) return b;
        return -1;
      },
    iterator: function (a, b, c, d) {
      var e = [],
        f,
        g,
        h = this.context,
        l,
        n = this.selector;
      "string" === typeof a && ((d = c), (c = b), (b = a), (a = !1));
      var m = 0;
      for (f = h.length; m < f; m++) {
        var p = new D(h[m]);
        if ("table" === b) {
          var t = c.call(p, h[m], m);
          t !== q && e.push(t);
        } else if ("columns" === b || "rows" === b)
          (t = c.call(p, h[m], this[m], m)), t !== q && e.push(t);
        else if (
          "column" === b ||
          "column-rows" === b ||
          "row" === b ||
          "cell" === b
        ) {
          var v = this[m];
          "column-rows" === b && (l = Ua(h[m], n.opts));
          var x = 0;
          for (g = v.length; x < g; x++)
            (t = v[x]),
              (t =
                "cell" === b
                  ? c.call(p, h[m], t.row, t.column, m, x)
                  : c.call(p, h[m], t, m, x, l)),
              t !== q && e.push(t);
        }
      }
      return e.length || d
        ? ((a = new D(h, a ? e.concat.apply([], e) : e)),
          (b = a.selector),
          (b.rows = n.rows),
          (b.cols = n.cols),
          (b.opts = n.opts),
          a)
        : this;
    },
    lastIndexOf:
      N.lastIndexOf ||
      function (a, b) {
        return this.indexOf.apply(this.toArray.reverse(), arguments);
      },
    length: 0,
    map: function (a) {
      var b = [];
      if (N.map) b = N.map.call(this, a, this);
      else
        for (var c = 0, d = this.length; c < d; c++)
          b.push(a.call(this, this[c], c));
      return new D(this.context, b);
    },
    pluck: function (a) {
      return this.map(function (b) {
        return b[a];
      });
    },
    pop: N.pop,
    push: N.push,
    reduce:
      N.reduce ||
      function (a, b) {
        return Bb(this, a, b, 0, this.length, 1);
      },
    reduceRight:
      N.reduceRight ||
      function (a, b) {
        return Bb(this, a, b, this.length - 1, -1, -1);
      },
    reverse: N.reverse,
    selector: null,
    shift: N.shift,
    slice: function () {
      return new D(this.context, this);
    },
    sort: N.sort,
    splice: N.splice,
    toArray: function () {
      return N.slice.call(this);
    },
    to$: function () {
      return k(this);
    },
    toJQuery: function () {
      return k(this);
    },
    unique: function () {
      return new D(this.context, Ja(this));
    },
    unshift: N.unshift,
  });
  D.extend = function (a, b, c) {
    if (c.length && b && (b instanceof D || b.__dt_wrapper)) {
      var d,
        e = function (h, l, n) {
          return function () {
            var m = l.apply(h, arguments);
            D.extend(m, m, n.methodExt);
            return m;
          };
        };
      var f = 0;
      for (d = c.length; f < d; f++) {
        var g = c[f];
        b[g.name] =
          "function" === g.type
            ? e(a, g.val, g)
            : "object" === g.type
            ? {}
            : g.val;
        b[g.name].__dt_wrapper = !0;
        D.extend(a, b[g.name], g.propExt);
      }
    }
  };
  D.register = w = function (a, b) {
    if (Array.isArray(a))
      for (var c = 0, d = a.length; c < d; c++) D.register(a[c], b);
    else {
      d = a.split(".");
      var e = mc,
        f;
      a = 0;
      for (c = d.length; a < c; a++) {
        var g = (f = -1 !== d[a].indexOf("()")) ? d[a].replace("()", "") : d[a];
        a: {
          var h = 0;
          for (var l = e.length; h < l; h++)
            if (e[h].name === g) {
              h = e[h];
              break a;
            }
          h = null;
        }
        h ||
          ((h = {
            name: g,
            val: {},
            methodExt: [],
            propExt: [],
            type: "object",
          }),
          e.push(h));
        a === c - 1
          ? ((h.val = b),
            (h.type =
              "function" === typeof b
                ? "function"
                : k.isPlainObject(b)
                ? "object"
                : "other"))
          : (e = f ? h.methodExt : h.propExt);
      }
    }
  };
  D.registerPlural = J = function (a, b, c) {
    D.register(a, c);
    D.register(b, function () {
      var d = c.apply(this, arguments);
      return d === this
        ? this
        : d instanceof D
        ? d.length
          ? Array.isArray(d[0])
            ? new D(d.context, d[0])
            : d[0]
          : q
        : d;
    });
  };
  var nc = function (a, b) {
    if (Array.isArray(a))
      return k.map(a, function (d) {
        return nc(d, b);
      });
    if ("number" === typeof a) return [b[a]];
    var c = k.map(b, function (d, e) {
      return d.nTable;
    });
    return k(c)
      .filter(a)
      .map(function (d) {
        d = k.inArray(this, c);
        return b[d];
      })
      .toArray();
  };
  w("tables()", function (a) {
    return a !== q && null !== a ? new D(nc(a, this.context)) : this;
  });
  w("table()", function (a) {
    a = this.tables(a);
    var b = a.context;
    return b.length ? new D(b[0]) : a;
  });
  J("tables().nodes()", "table().node()", function () {
    return this.iterator(
      "table",
      function (a) {
        return a.nTable;
      },
      1
    );
  });
  J("tables().body()", "table().body()", function () {
    return this.iterator(
      "table",
      function (a) {
        return a.nTBody;
      },
      1
    );
  });
  J("tables().header()", "table().header()", function () {
    return this.iterator(
      "table",
      function (a) {
        return a.nTHead;
      },
      1
    );
  });
  J("tables().footer()", "table().footer()", function () {
    return this.iterator(
      "table",
      function (a) {
        return a.nTFoot;
      },
      1
    );
  });
  J("tables().containers()", "table().container()", function () {
    return this.iterator(
      "table",
      function (a) {
        return a.nTableWrapper;
      },
      1
    );
  });
  w("draw()", function (a) {
    return this.iterator("table", function (b) {
      "page" === a
        ? fa(b)
        : ("string" === typeof a && (a = "full-hold" === a ? !1 : !0),
          ja(b, !1 === a));
    });
  });
  w("page()", function (a) {
    return a === q
      ? this.page.info().page
      : this.iterator("table", function (b) {
          kb(b, a);
        });
  });
  w("page.info()", function (a) {
    if (0 === this.context.length) return q;
    a = this.context[0];
    var b = a._iDisplayStart,
      c = a.oFeatures.bPaginate ? a._iDisplayLength : -1,
      d = a.fnRecordsDisplay(),
      e = -1 === c;
    return {
      page: e ? 0 : Math.floor(b / c),
      pages: e ? 1 : Math.ceil(d / c),
      start: b,
      end: a.fnDisplayEnd(),
      length: c,
      recordsTotal: a.fnRecordsTotal(),
      recordsDisplay: d,
      serverSide: "ssp" === P(a),
    };
  });
  w("page.len()", function (a) {
    return a === q
      ? 0 !== this.context.length
        ? this.context[0]._iDisplayLength
        : q
      : this.iterator("table", function (b) {
          ib(b, a);
        });
  });
  var oc = function (a, b, c) {
    if (c) {
      var d = new D(a);
      d.one("draw", function () {
        c(d.ajax.json());
      });
    }
    if ("ssp" == P(a)) ja(a, b);
    else {
      U(a, !0);
      var e = a.jqXHR;
      e && 4 !== e.readyState && e.abort();
      La(a, [], function (f) {
        Ha(a);
        f = Ma(a, f);
        for (var g = 0, h = f.length; g < h; g++) ea(a, f[g]);
        ja(a, b);
        U(a, !1);
      });
    }
  };
  w("ajax.json()", function () {
    var a = this.context;
    if (0 < a.length) return a[0].json;
  });
  w("ajax.params()", function () {
    var a = this.context;
    if (0 < a.length) return a[0].oAjaxData;
  });
  w("ajax.reload()", function (a, b) {
    return this.iterator("table", function (c) {
      oc(c, !1 === b, a);
    });
  });
  w("ajax.url()", function (a) {
    var b = this.context;
    if (a === q) {
      if (0 === b.length) return q;
      b = b[0];
      return b.ajax
        ? k.isPlainObject(b.ajax)
          ? b.ajax.url
          : b.ajax
        : b.sAjaxSource;
    }
    return this.iterator("table", function (c) {
      k.isPlainObject(c.ajax) ? (c.ajax.url = a) : (c.ajax = a);
    });
  });
  w("ajax.url().load()", function (a, b) {
    return this.iterator("table", function (c) {
      oc(c, !1 === b, a);
    });
  });
  var tb = function (a, b, c, d, e) {
      var f = [],
        g,
        h,
        l;
      var n = typeof b;
      (b && "string" !== n && "function" !== n && b.length !== q) || (b = [b]);
      n = 0;
      for (h = b.length; n < h; n++) {
        var m =
          b[n] && b[n].split && !b[n].match(/[\[\(:]/)
            ? b[n].split(",")
            : [b[n]];
        var p = 0;
        for (l = m.length; p < l; p++)
          (g = c("string" === typeof m[p] ? m[p].trim() : m[p])) &&
            g.length &&
            (f = f.concat(g));
      }
      a = L.selector[a];
      if (a.length) for (n = 0, h = a.length; n < h; n++) f = a[n](d, e, f);
      return Ja(f);
    },
    ub = function (a) {
      a || (a = {});
      a.filter && a.search === q && (a.search = a.filter);
      return k.extend({ search: "none", order: "current", page: "all" }, a);
    },
    vb = function (a) {
      for (var b = 0, c = a.length; b < c; b++)
        if (0 < a[b].length)
          return (
            (a[0] = a[b]),
            (a[0].length = 1),
            (a.length = 1),
            (a.context = [a.context[b]]),
            a
          );
      a.length = 0;
      return a;
    },
    Ua = function (a, b) {
      var c = [],
        d = a.aiDisplay;
      var e = a.aiDisplayMaster;
      var f = b.search;
      var g = b.order;
      b = b.page;
      if ("ssp" == P(a)) return "removed" === f ? [] : qa(0, e.length);
      if ("current" == b)
        for (g = a._iDisplayStart, a = a.fnDisplayEnd(); g < a; g++)
          c.push(d[g]);
      else if ("current" == g || "applied" == g)
        if ("none" == f) c = e.slice();
        else if ("applied" == f) c = d.slice();
        else {
          if ("removed" == f) {
            var h = {};
            g = 0;
            for (a = d.length; g < a; g++) h[d[g]] = null;
            c = k.map(e, function (l) {
              return h.hasOwnProperty(l) ? null : l;
            });
          }
        }
      else if ("index" == g || "original" == g)
        for (g = 0, a = a.aoData.length; g < a; g++)
          "none" == f
            ? c.push(g)
            : ((e = k.inArray(g, d)),
              ((-1 === e && "removed" == f) || (0 <= e && "applied" == f)) &&
                c.push(g));
      return c;
    },
    wc = function (a, b, c) {
      var d;
      return tb(
        "row",
        b,
        function (e) {
          var f = hc(e),
            g = a.aoData;
          if (null !== f && !c) return [f];
          d || (d = Ua(a, c));
          if (null !== f && -1 !== k.inArray(f, d)) return [f];
          if (null === e || e === q || "" === e) return d;
          if ("function" === typeof e)
            return k.map(d, function (l) {
              var n = g[l];
              return e(l, n._aData, n.nTr) ? l : null;
            });
          if (e.nodeName) {
            f = e._DT_RowIndex;
            var h = e._DT_CellIndex;
            if (f !== q) return g[f] && g[f].nTr === e ? [f] : [];
            if (h)
              return g[h.row] && g[h.row].nTr === e.parentNode ? [h.row] : [];
            f = k(e).closest("*[data-dt-row]");
            return f.length ? [f.data("dt-row")] : [];
          }
          if (
            "string" === typeof e &&
            "#" === e.charAt(0) &&
            ((f = a.aIds[e.replace(/^#/, "")]), f !== q)
          )
            return [f.idx];
          f = kc(Ca(a.aoData, d, "nTr"));
          return k(f)
            .filter(e)
            .map(function () {
              return this._DT_RowIndex;
            })
            .toArray();
        },
        a,
        c
      );
    };
  w("rows()", function (a, b) {
    a === q ? (a = "") : k.isPlainObject(a) && ((b = a), (a = ""));
    b = ub(b);
    var c = this.iterator(
      "table",
      function (d) {
        return wc(d, a, b);
      },
      1
    );
    c.selector.rows = a;
    c.selector.opts = b;
    return c;
  });
  w("rows().nodes()", function () {
    return this.iterator(
      "row",
      function (a, b) {
        return a.aoData[b].nTr || q;
      },
      1
    );
  });
  w("rows().data()", function () {
    return this.iterator(
      !0,
      "rows",
      function (a, b) {
        return Ca(a.aoData, b, "_aData");
      },
      1
    );
  });
  J("rows().cache()", "row().cache()", function (a) {
    return this.iterator(
      "row",
      function (b, c) {
        b = b.aoData[c];
        return "search" === a ? b._aFilterData : b._aSortData;
      },
      1
    );
  });
  J("rows().invalidate()", "row().invalidate()", function (a) {
    return this.iterator("row", function (b, c) {
      va(b, c, a);
    });
  });
  J("rows().indexes()", "row().index()", function () {
    return this.iterator(
      "row",
      function (a, b) {
        return b;
      },
      1
    );
  });
  J("rows().ids()", "row().id()", function (a) {
    for (var b = [], c = this.context, d = 0, e = c.length; d < e; d++)
      for (var f = 0, g = this[d].length; f < g; f++) {
        var h = c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);
        b.push((!0 === a ? "#" : "") + h);
      }
    return new D(c, b);
  });
  J("rows().remove()", "row().remove()", function () {
    var a = this;
    this.iterator("row", function (b, c, d) {
      var e = b.aoData,
        f = e[c],
        g,
        h;
      e.splice(c, 1);
      var l = 0;
      for (g = e.length; l < g; l++) {
        var n = e[l];
        var m = n.anCells;
        null !== n.nTr && (n.nTr._DT_RowIndex = l);
        if (null !== m)
          for (n = 0, h = m.length; n < h; n++) m[n]._DT_CellIndex.row = l;
      }
      Ia(b.aiDisplayMaster, c);
      Ia(b.aiDisplay, c);
      Ia(a[d], c, !1);
      0 < b._iRecordsDisplay && b._iRecordsDisplay--;
      jb(b);
      c = b.rowIdFn(f._aData);
      c !== q && delete b.aIds[c];
    });
    this.iterator("table", function (b) {
      for (var c = 0, d = b.aoData.length; c < d; c++) b.aoData[c].idx = c;
    });
    return this;
  });
  w("rows.add()", function (a) {
    var b = this.iterator(
        "table",
        function (d) {
          var e,
            f = [];
          var g = 0;
          for (e = a.length; g < e; g++) {
            var h = a[g];
            h.nodeName && "TR" === h.nodeName.toUpperCase()
              ? f.push(Ga(d, h)[0])
              : f.push(ea(d, h));
          }
          return f;
        },
        1
      ),
      c = this.rows(-1);
    c.pop();
    k.merge(c, b);
    return c;
  });
  w("row()", function (a, b) {
    return vb(this.rows(a, b));
  });
  w("row().data()", function (a) {
    var b = this.context;
    if (a === q)
      return b.length && this.length ? b[0].aoData[this[0]]._aData : q;
    var c = b[0].aoData[this[0]];
    c._aData = a;
    Array.isArray(a) && c.nTr && c.nTr.id && da(b[0].rowId)(a, c.nTr.id);
    va(b[0], this[0], "data");
    return this;
  });
  w("row().node()", function () {
    var a = this.context;
    return a.length && this.length ? a[0].aoData[this[0]].nTr || null : null;
  });
  w("row.add()", function (a) {
    a instanceof k && a.length && (a = a[0]);
    var b = this.iterator("table", function (c) {
      return a.nodeName && "TR" === a.nodeName.toUpperCase()
        ? Ga(c, a)[0]
        : ea(c, a);
    });
    return this.row(b[0]);
  });
  var xc = function (a, b, c, d) {
      var e = [],
        f = function (g, h) {
          if (Array.isArray(g) || g instanceof k)
            for (var l = 0, n = g.length; l < n; l++) f(g[l], h);
          else
            g.nodeName && "tr" === g.nodeName.toLowerCase()
              ? e.push(g)
              : ((l = k("<tr><td></td></tr>").addClass(h)),
                (k("td", l).addClass(h).html(g)[0].colSpan = na(a)),
                e.push(l[0]));
        };
      f(c, d);
      b._details && b._details.detach();
      b._details = k(e);
      b._detailsShow && b._details.insertAfter(b.nTr);
    },
    wb = function (a, b) {
      var c = a.context;
      c.length &&
        (a = c[0].aoData[b !== q ? b : a[0]]) &&
        a._details &&
        (a._details.remove(), (a._detailsShow = q), (a._details = q));
    },
    pc = function (a, b) {
      var c = a.context;
      c.length &&
        a.length &&
        ((a = c[0].aoData[a[0]]),
        a._details &&
          ((a._detailsShow = b)
            ? a._details.insertAfter(a.nTr)
            : a._details.detach(),
          yc(c[0])));
    },
    yc = function (a) {
      var b = new D(a),
        c = a.aoData;
      b.off(
        "draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details"
      );
      0 < T(c, "_details").length &&
        (b.on("draw.dt.DT_details", function (d, e) {
          a === e &&
            b
              .rows({ page: "current" })
              .eq(0)
              .each(function (f) {
                f = c[f];
                f._detailsShow && f._details.insertAfter(f.nTr);
              });
        }),
        b.on("column-visibility.dt.DT_details", function (d, e, f, g) {
          if (a === e)
            for (e = na(e), f = 0, g = c.length; f < g; f++)
              (d = c[f]),
                d._details &&
                  d._details.children("td[colspan]").attr("colspan", e);
        }),
        b.on("destroy.dt.DT_details", function (d, e) {
          if (a === e)
            for (d = 0, e = c.length; d < e; d++) c[d]._details && wb(b, d);
        }));
    };
  w("row().child()", function (a, b) {
    var c = this.context;
    if (a === q)
      return c.length && this.length ? c[0].aoData[this[0]]._details : q;
    !0 === a
      ? this.child.show()
      : !1 === a
      ? wb(this)
      : c.length && this.length && xc(c[0], c[0].aoData[this[0]], a, b);
    return this;
  });
  w(["row().child.show()", "row().child().show()"], function (a) {
    pc(this, !0);
    return this;
  });
  w(["row().child.hide()", "row().child().hide()"], function () {
    pc(this, !1);
    return this;
  });
  w(["row().child.remove()", "row().child().remove()"], function () {
    wb(this);
    return this;
  });
  w("row().child.isShown()", function () {
    var a = this.context;
    return a.length && this.length
      ? a[0].aoData[this[0]]._detailsShow || !1
      : !1;
  });
  var zc = /^([^:]+):(name|visIdx|visible)$/,
    qc = function (a, b, c, d, e) {
      c = [];
      d = 0;
      for (var f = e.length; d < f; d++) c.push(S(a, e[d], b));
      return c;
    },
    Ac = function (a, b, c) {
      var d = a.aoColumns,
        e = T(d, "sName"),
        f = T(d, "nTh");
      return tb(
        "column",
        b,
        function (g) {
          var h = hc(g);
          if ("" === g) return qa(d.length);
          if (null !== h) return [0 <= h ? h : d.length + h];
          if ("function" === typeof g) {
            var l = Ua(a, c);
            return k.map(d, function (p, t) {
              return g(t, qc(a, t, 0, 0, l), f[t]) ? t : null;
            });
          }
          var n = "string" === typeof g ? g.match(zc) : "";
          if (n)
            switch (n[2]) {
              case "visIdx":
              case "visible":
                h = parseInt(n[1], 10);
                if (0 > h) {
                  var m = k.map(d, function (p, t) {
                    return p.bVisible ? t : null;
                  });
                  return [m[m.length + h]];
                }
                return [sa(a, h)];
              case "name":
                return k.map(e, function (p, t) {
                  return p === n[1] ? t : null;
                });
              default:
                return [];
            }
          if (g.nodeName && g._DT_CellIndex) return [g._DT_CellIndex.column];
          h = k(f)
            .filter(g)
            .map(function () {
              return k.inArray(this, f);
            })
            .toArray();
          if (h.length || !g.nodeName) return h;
          h = k(g).closest("*[data-dt-column]");
          return h.length ? [h.data("dt-column")] : [];
        },
        a,
        c
      );
    };
  w("columns()", function (a, b) {
    a === q ? (a = "") : k.isPlainObject(a) && ((b = a), (a = ""));
    b = ub(b);
    var c = this.iterator(
      "table",
      function (d) {
        return Ac(d, a, b);
      },
      1
    );
    c.selector.cols = a;
    c.selector.opts = b;
    return c;
  });
  J("columns().header()", "column().header()", function (a, b) {
    return this.iterator(
      "column",
      function (c, d) {
        return c.aoColumns[d].nTh;
      },
      1
    );
  });
  J("columns().footer()", "column().footer()", function (a, b) {
    return this.iterator(
      "column",
      function (c, d) {
        return c.aoColumns[d].nTf;
      },
      1
    );
  });
  J("columns().data()", "column().data()", function () {
    return this.iterator("column-rows", qc, 1);
  });
  J("columns().dataSrc()", "column().dataSrc()", function () {
    return this.iterator(
      "column",
      function (a, b) {
        return a.aoColumns[b].mData;
      },
      1
    );
  });
  J("columns().cache()", "column().cache()", function (a) {
    return this.iterator(
      "column-rows",
      function (b, c, d, e, f) {
        return Ca(
          b.aoData,
          f,
          "search" === a ? "_aFilterData" : "_aSortData",
          c
        );
      },
      1
    );
  });
  J("columns().nodes()", "column().nodes()", function () {
    return this.iterator(
      "column-rows",
      function (a, b, c, d, e) {
        return Ca(a.aoData, e, "anCells", b);
      },
      1
    );
  });
  J("columns().visible()", "column().visible()", function (a, b) {
    var c = this,
      d = this.iterator("column", function (e, f) {
        if (a === q) return e.aoColumns[f].bVisible;
        var g = e.aoColumns,
          h = g[f],
          l = e.aoData,
          n;
        if (a !== q && h.bVisible !== a) {
          if (a) {
            var m = k.inArray(!0, T(g, "bVisible"), f + 1);
            g = 0;
            for (n = l.length; g < n; g++) {
              var p = l[g].nTr;
              e = l[g].anCells;
              p && p.insertBefore(e[f], e[m] || null);
            }
          } else k(T(e.aoData, "anCells", f)).detach();
          h.bVisible = a;
        }
      });
    a !== q &&
      this.iterator("table", function (e) {
        xa(e, e.aoHeader);
        xa(e, e.aoFooter);
        e.aiDisplay.length ||
          k(e.nTBody).find("td[colspan]").attr("colspan", na(e));
        Qa(e);
        c.iterator("column", function (f, g) {
          I(f, null, "column-visibility", [f, g, a, b]);
        });
        (b === q || b) && c.columns.adjust();
      });
    return d;
  });
  J("columns().indexes()", "column().index()", function (a) {
    return this.iterator(
      "column",
      function (b, c) {
        return "visible" === a ? ta(b, c) : c;
      },
      1
    );
  });
  w("columns.adjust()", function () {
    return this.iterator(
      "table",
      function (a) {
        ra(a);
      },
      1
    );
  });
  w("column.index()", function (a, b) {
    if (0 !== this.context.length) {
      var c = this.context[0];
      if ("fromVisible" === a || "toData" === a) return sa(c, b);
      if ("fromData" === a || "toVisible" === a) return ta(c, b);
    }
  });
  w("column()", function (a, b) {
    return vb(this.columns(a, b));
  });
  var Bc = function (a, b, c) {
    var d = a.aoData,
      e = Ua(a, c),
      f = kc(Ca(d, e, "anCells")),
      g = k(lc([], f)),
      h,
      l = a.aoColumns.length,
      n,
      m,
      p,
      t,
      v,
      x;
    return tb(
      "cell",
      b,
      function (r) {
        var A = "function" === typeof r;
        if (null === r || r === q || A) {
          n = [];
          m = 0;
          for (p = e.length; m < p; m++)
            for (h = e[m], t = 0; t < l; t++)
              (v = { row: h, column: t }),
                A
                  ? ((x = d[h]),
                    r(v, S(a, h, t), x.anCells ? x.anCells[t] : null) &&
                      n.push(v))
                  : n.push(v);
          return n;
        }
        if (k.isPlainObject(r))
          return r.column !== q && r.row !== q && -1 !== k.inArray(r.row, e)
            ? [r]
            : [];
        A = g
          .filter(r)
          .map(function (E, H) {
            return { row: H._DT_CellIndex.row, column: H._DT_CellIndex.column };
          })
          .toArray();
        if (A.length || !r.nodeName) return A;
        x = k(r).closest("*[data-dt-row]");
        return x.length
          ? [{ row: x.data("dt-row"), column: x.data("dt-column") }]
          : [];
      },
      a,
      c
    );
  };
  w("cells()", function (a, b, c) {
    k.isPlainObject(a) &&
      (a.row === q ? ((c = a), (a = null)) : ((c = b), (b = null)));
    k.isPlainObject(b) && ((c = b), (b = null));
    if (null === b || b === q)
      return this.iterator("table", function (m) {
        return Bc(m, a, ub(c));
      });
    var d = c ? { page: c.page, order: c.order, search: c.search } : {},
      e = this.columns(b, d),
      f = this.rows(a, d),
      g,
      h,
      l,
      n;
    d = this.iterator(
      "table",
      function (m, p) {
        m = [];
        g = 0;
        for (h = f[p].length; g < h; g++)
          for (l = 0, n = e[p].length; l < n; l++)
            m.push({ row: f[p][g], column: e[p][l] });
        return m;
      },
      1
    );
    d = c && c.selected ? this.cells(d, c) : d;
    k.extend(d.selector, { cols: b, rows: a, opts: c });
    return d;
  });
  J("cells().nodes()", "cell().node()", function () {
    return this.iterator(
      "cell",
      function (a, b, c) {
        return (a = a.aoData[b]) && a.anCells ? a.anCells[c] : q;
      },
      1
    );
  });
  w("cells().data()", function () {
    return this.iterator(
      "cell",
      function (a, b, c) {
        return S(a, b, c);
      },
      1
    );
  });
  J("cells().cache()", "cell().cache()", function (a) {
    a = "search" === a ? "_aFilterData" : "_aSortData";
    return this.iterator(
      "cell",
      function (b, c, d) {
        return b.aoData[c][a][d];
      },
      1
    );
  });
  J("cells().render()", "cell().render()", function (a) {
    return this.iterator(
      "cell",
      function (b, c, d) {
        return S(b, c, d, a);
      },
      1
    );
  });
  J("cells().indexes()", "cell().index()", function () {
    return this.iterator(
      "cell",
      function (a, b, c) {
        return { row: b, column: c, columnVisible: ta(a, c) };
      },
      1
    );
  });
  J("cells().invalidate()", "cell().invalidate()", function (a) {
    return this.iterator("cell", function (b, c, d) {
      va(b, c, a, d);
    });
  });
  w("cell()", function (a, b, c) {
    return vb(this.cells(a, b, c));
  });
  w("cell().data()", function (a) {
    var b = this.context,
      c = this[0];
    if (a === q)
      return b.length && c.length ? S(b[0], c[0].row, c[0].column) : q;
    Db(b[0], c[0].row, c[0].column, a);
    va(b[0], c[0].row, "data", c[0].column);
    return this;
  });
  w("order()", function (a, b) {
    var c = this.context;
    if (a === q) return 0 !== c.length ? c[0].aaSorting : q;
    "number" === typeof a
      ? (a = [[a, b]])
      : a.length &&
        !Array.isArray(a[0]) &&
        (a = Array.prototype.slice.call(arguments));
    return this.iterator("table", function (d) {
      d.aaSorting = a.slice();
    });
  });
  w("order.listener()", function (a, b, c) {
    return this.iterator("table", function (d) {
      db(d, a, b, c);
    });
  });
  w("order.fixed()", function (a) {
    if (!a) {
      var b = this.context;
      b = b.length ? b[0].aaSortingFixed : q;
      return Array.isArray(b) ? { pre: b } : b;
    }
    return this.iterator("table", function (c) {
      c.aaSortingFixed = k.extend(!0, {}, a);
    });
  });
  w(["columns().order()", "column().order()"], function (a) {
    var b = this;
    return this.iterator("table", function (c, d) {
      var e = [];
      k.each(b[d], function (f, g) {
        e.push([g, a]);
      });
      c.aaSorting = e;
    });
  });
  w("search()", function (a, b, c, d) {
    var e = this.context;
    return a === q
      ? 0 !== e.length
        ? e[0].oPreviousSearch.sSearch
        : q
      : this.iterator("table", function (f) {
          f.oFeatures.bFilter &&
            ya(
              f,
              k.extend({}, f.oPreviousSearch, {
                sSearch: a + "",
                bRegex: null === b ? !1 : b,
                bSmart: null === c ? !0 : c,
                bCaseInsensitive: null === d ? !0 : d,
              }),
              1
            );
        });
  });
  J("columns().search()", "column().search()", function (a, b, c, d) {
    return this.iterator("column", function (e, f) {
      var g = e.aoPreSearchCols;
      if (a === q) return g[f].sSearch;
      e.oFeatures.bFilter &&
        (k.extend(g[f], {
          sSearch: a + "",
          bRegex: null === b ? !1 : b,
          bSmart: null === c ? !0 : c,
          bCaseInsensitive: null === d ? !0 : d,
        }),
        ya(e, e.oPreviousSearch, 1));
    });
  });
  w("state()", function () {
    return this.context.length ? this.context[0].oSavedState : null;
  });
  w("state.clear()", function () {
    return this.iterator("table", function (a) {
      a.fnStateSaveCallback.call(a.oInstance, a, {});
    });
  });
  w("state.loaded()", function () {
    return this.context.length ? this.context[0].oLoadedState : null;
  });
  w("state.save()", function () {
    return this.iterator("table", function (a) {
      Qa(a);
    });
  });
  u.versionCheck = u.fnVersionCheck = function (a) {
    var b = u.version.split(".");
    a = a.split(".");
    for (var c, d, e = 0, f = a.length; e < f; e++)
      if (
        ((c = parseInt(b[e], 10) || 0), (d = parseInt(a[e], 10) || 0), c !== d)
      )
        return c > d;
    return !0;
  };
  u.isDataTable = u.fnIsDataTable = function (a) {
    var b = k(a).get(0),
      c = !1;
    if (a instanceof u.Api) return !0;
    k.each(u.settings, function (d, e) {
      d = e.nScrollHead ? k("table", e.nScrollHead)[0] : null;
      var f = e.nScrollFoot ? k("table", e.nScrollFoot)[0] : null;
      if (e.nTable === b || d === b || f === b) c = !0;
    });
    return c;
  };
  u.tables = u.fnTables = function (a) {
    var b = !1;
    k.isPlainObject(a) && ((b = a.api), (a = a.visible));
    var c = k.map(u.settings, function (d) {
      if (!a || (a && k(d.nTable).is(":visible"))) return d.nTable;
    });
    return b ? new D(c) : c;
  };
  u.camelToHungarian = O;
  w("$()", function (a, b) {
    b = this.rows(b).nodes();
    b = k(b);
    return k([].concat(b.filter(a).toArray(), b.find(a).toArray()));
  });
  k.each(["on", "one", "off"], function (a, b) {
    w(b + "()", function () {
      var c = Array.prototype.slice.call(arguments);
      c[0] = k
        .map(c[0].split(/\s/), function (e) {
          return e.match(/\.dt\b/) ? e : e + ".dt";
        })
        .join(" ");
      var d = k(this.tables().nodes());
      d[b].apply(d, c);
      return this;
    });
  });
  w("clear()", function () {
    return this.iterator("table", function (a) {
      Ha(a);
    });
  });
  w("settings()", function () {
    return new D(this.context, this.context);
  });
  w("init()", function () {
    var a = this.context;
    return a.length ? a[0].oInit : null;
  });
  w("data()", function () {
    return this.iterator("table", function (a) {
      return T(a.aoData, "_aData");
    }).flatten();
  });
  w("destroy()", function (a) {
    a = a || !1;
    return this.iterator("table", function (b) {
      var c = b.nTableWrapper.parentNode,
        d = b.oClasses,
        e = b.nTable,
        f = b.nTBody,
        g = b.nTHead,
        h = b.nTFoot,
        l = k(e);
      f = k(f);
      var n = k(b.nTableWrapper),
        m = k.map(b.aoData, function (t) {
          return t.nTr;
        }),
        p;
      b.bDestroying = !0;
      I(b, "aoDestroyCallback", "destroy", [b]);
      a || new D(b).columns().visible(!0);
      n.off(".DT").find(":not(tbody *)").off(".DT");
      k(y).off(".DT-" + b.sInstance);
      e != g.parentNode && (l.children("thead").detach(), l.append(g));
      h && e != h.parentNode && (l.children("tfoot").detach(), l.append(h));
      b.aaSorting = [];
      b.aaSortingFixed = [];
      Pa(b);
      k(m).removeClass(b.asStripeClasses.join(" "));
      k("th, td", g).removeClass(
        d.sSortable +
          " " +
          d.sSortableAsc +
          " " +
          d.sSortableDesc +
          " " +
          d.sSortableNone
      );
      f.children().detach();
      f.append(m);
      g = a ? "remove" : "detach";
      l[g]();
      n[g]();
      !a &&
        c &&
        (c.insertBefore(e, b.nTableReinsertBefore),
        l.css("width", b.sDestroyWidth).removeClass(d.sTable),
        (p = b.asDestroyStripes.length) &&
          f.children().each(function (t) {
            k(this).addClass(b.asDestroyStripes[t % p]);
          }));
      c = k.inArray(b, u.settings);
      -1 !== c && u.settings.splice(c, 1);
    });
  });
  k.each(["column", "row", "cell"], function (a, b) {
    w(b + "s().every()", function (c) {
      var d = this.selector.opts,
        e = this;
      return this.iterator(b, function (f, g, h, l, n) {
        c.call(e[b](g, "cell" === b ? h : d, "cell" === b ? d : q), g, h, l, n);
      });
    });
  });
  w("i18n()", function (a, b, c) {
    var d = this.context[0];
    a = ia(a)(d.oLanguage);
    a === q && (a = b);
    c !== q && k.isPlainObject(a) && (a = a[c] !== q ? a[c] : a._);
    return a.replace("%d", c);
  });
  u.version = "1.10.23";
  u.settings = [];
  u.models = {};
  u.models.oSearch = {
    bCaseInsensitive: !0,
    sSearch: "",
    bRegex: !1,
    bSmart: !0,
  };
  u.models.oRow = {
    nTr: null,
    anCells: null,
    _aData: [],
    _aSortData: null,
    _aFilterData: null,
    _sFilterRow: null,
    _sRowStripe: "",
    src: null,
    idx: -1,
  };
  u.models.oColumn = {
    idx: null,
    aDataSort: null,
    asSorting: null,
    bSearchable: null,
    bSortable: null,
    bVisible: null,
    _sManualType: null,
    _bAttrSrc: !1,
    fnCreatedCell: null,
    fnGetData: null,
    fnSetData: null,
    mData: null,
    mRender: null,
    nTh: null,
    nTf: null,
    sClass: null,
    sContentPadding: null,
    sDefaultContent: null,
    sName: null,
    sSortDataType: "std",
    sSortingClass: null,
    sSortingClassJUI: null,
    sTitle: null,
    sType: null,
    sWidth: null,
    sWidthOrig: null,
  };
  u.defaults = {
    aaData: null,
    aaSorting: [[0, "asc"]],
    aaSortingFixed: [],
    ajax: null,
    aLengthMenu: [10, 25, 50, 100],
    aoColumns: null,
    aoColumnDefs: null,
    aoSearchCols: [],
    asStripeClasses: null,
    bAutoWidth: !0,
    bDeferRender: !1,
    bDestroy: !1,
    bFilter: !0,
    bInfo: !0,
    bLengthChange: !0,
    bPaginate: !0,
    bProcessing: !1,
    bRetrieve: !1,
    bScrollCollapse: !1,
    bServerSide: !1,
    bSort: !0,
    bSortMulti: !0,
    bSortCellsTop: !1,
    bSortClasses: !0,
    bStateSave: !1,
    fnCreatedRow: null,
    fnDrawCallback: null,
    fnFooterCallback: null,
    fnFormatNumber: function (a) {
      return a
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
    },
    fnHeaderCallback: null,
    fnInfoCallback: null,
    fnInitComplete: null,
    fnPreDrawCallback: null,
    fnRowCallback: null,
    fnServerData: null,
    fnServerParams: null,
    fnStateLoadCallback: function (a) {
      try {
        return JSON.parse(
          (-1 === a.iStateDuration ? sessionStorage : localStorage).getItem(
            "DataTables_" + a.sInstance + "_" + location.pathname
          )
        );
      } catch (b) {
        return {};
      }
    },
    fnStateLoadParams: null,
    fnStateLoaded: null,
    fnStateSaveCallback: function (a, b) {
      try {
        (-1 === a.iStateDuration ? sessionStorage : localStorage).setItem(
          "DataTables_" + a.sInstance + "_" + location.pathname,
          JSON.stringify(b)
        );
      } catch (c) {}
    },
    fnStateSaveParams: null,
    iStateDuration: 7200,
    iDeferLoading: null,
    iDisplayLength: 10,
    iDisplayStart: 0,
    iTabIndex: 0,
    oClasses: {},
    oLanguage: {
      oAria: {
        sSortAscending: ": activate to sort column ascending",
        sSortDescending: ": activate to sort column descending",
      },
      oPaginate: {
        sFirst: "Primero",
        sLast: "Último",
        sNext: "Siguiente",
        sPrevious: "Anterior",
      },
      sEmptyTable: "Sin información de los productos para mostrar",
      sInfo: "Mostrando _START_ a _END_ de _TOTAL_ Productos",
      sInfoEmpty: "Mostrando 0 a 0 de 0 Productos",
      sInfoFiltered: "(filtered from _MAX_ total Productos)",
      sInfoPostFix: "",
      sDecimal: "",
      sThousands: ",",
      sLengthMenu: "Mostrar _MENU_ Productos",
      sLoadingRecords: "Cargando...",
      sProcessing: "Procesando...",
      sSearch: "Buscar un producto:",
      sSearchPlaceholder: "",
      sUrl: "",
      sZeroRecords: "No se encontraron productos con esa búsqueda",
    },
    oSearch: k.extend({}, u.models.oSearch),
    sAjaxDataProp: "data",
    sAjaxSource: null,
    sDom: "lfrtip",
    searchDelay: null,
    sPaginationType: "simple_numbers",
    sScrollX: "",
    sScrollXInner: "",
    sScrollY: "",
    sServerMethod: "GET",
    renderer: null,
    rowId: "DT_RowId",
  };
  G(u.defaults);
  u.defaults.column = {
    aDataSort: null,
    iDataSort: -1,
    asSorting: ["asc", "desc"],
    bSearchable: !0,
    bSortable: !0,
    bVisible: !0,
    fnCreatedCell: null,
    mData: null,
    mRender: null,
    sCellType: "td",
    sClass: "",
    sContentPadding: "",
    sDefaultContent: null,
    sName: "",
    sSortDataType: "std",
    sTitle: null,
    sType: null,
    sWidth: null,
  };
  G(u.defaults.column);
  u.models.oSettings = {
    oFeatures: {
      bAutoWidth: null,
      bDeferRender: null,
      bFilter: null,
      bInfo: null,
      bLengthChange: null,
      bPaginate: null,
      bProcessing: null,
      bServerSide: null,
      bSort: null,
      bSortMulti: null,
      bSortClasses: null,
      bStateSave: null,
    },
    oScroll: {
      bCollapse: null,
      iBarWidth: 0,
      sX: null,
      sXInner: null,
      sY: null,
    },
    oLanguage: { fnInfoCallback: null },
    oBrowser: {
      bScrollOversize: !1,
      bScrollbarLeft: !1,
      bBounding: !1,
      barWidth: 0,
    },
    ajax: null,
    aanFeatures: [],
    aoData: [],
    aiDisplay: [],
    aiDisplayMaster: [],
    aIds: {},
    aoColumns: [],
    aoHeader: [],
    aoFooter: [],
    oPreviousSearch: {},
    aoPreSearchCols: [],
    aaSorting: null,
    aaSortingFixed: [],
    asStripeClasses: null,
    asDestroyStripes: [],
    sDestroyWidth: 0,
    aoRowCallback: [],
    aoHeaderCallback: [],
    aoFooterCallback: [],
    aoDrawCallback: [],
    aoRowCreatedCallback: [],
    aoPreDrawCallback: [],
    aoInitComplete: [],
    aoStateSaveParams: [],
    aoStateLoadParams: [],
    aoStateLoaded: [],
    sTableId: "",
    nTable: null,
    nTHead: null,
    nTFoot: null,
    nTBody: null,
    nTableWrapper: null,
    bDeferLoading: !1,
    bInitialised: !1,
    aoOpenRows: [],
    sDom: null,
    searchDelay: null,
    sPaginationType: "two_button",
    iStateDuration: 0,
    aoStateSave: [],
    aoStateLoad: [],
    oSavedState: null,
    oLoadedState: null,
    sAjaxSource: null,
    sAjaxDataProp: null,
    bAjaxDataGet: !0,
    jqXHR: null,
    json: q,
    oAjaxData: q,
    fnServerData: null,
    aoServerParams: [],
    sServerMethod: null,
    fnFormatNumber: null,
    aLengthMenu: null,
    iDraw: 0,
    bDrawing: !1,
    iDrawError: -1,
    _iDisplayLength: 10,
    _iDisplayStart: 0,
    _iRecordsTotal: 0,
    _iRecordsDisplay: 0,
    oClasses: {},
    bFiltered: !1,
    bSorted: !1,
    bSortCellsTop: null,
    oInit: null,
    aoDestroyCallback: [],
    fnRecordsTotal: function () {
      return "ssp" == P(this)
        ? 1 * this._iRecordsTotal
        : this.aiDisplayMaster.length;
    },
    fnRecordsDisplay: function () {
      return "ssp" == P(this)
        ? 1 * this._iRecordsDisplay
        : this.aiDisplay.length;
    },
    fnDisplayEnd: function () {
      var a = this._iDisplayLength,
        b = this._iDisplayStart,
        c = b + a,
        d = this.aiDisplay.length,
        e = this.oFeatures,
        f = e.bPaginate;
      return e.bServerSide
        ? !1 === f || -1 === a
          ? b + d
          : Math.min(b + a, this._iRecordsDisplay)
        : !f || c > d || -1 === a
        ? d
        : c;
    },
    oInstance: null,
    sInstance: null,
    iTabIndex: 0,
    nScrollHead: null,
    nScrollFoot: null,
    aLastSort: [],
    oPlugins: {},
    rowIdFn: null,
    rowId: null,
  };
  u.ext = L = {
    buttons: {},
    classes: {},
    builder: "-source-",
    errMode: "alert",
    feature: [],
    search: [],
    selector: { cell: [], column: [], row: [] },
    internal: {},
    legacy: { ajax: null },
    pager: {},
    renderer: { pageButton: {}, header: {} },
    order: {},
    type: { detect: [], search: {}, order: {} },
    _unique: 0,
    fnVersionCheck: u.fnVersionCheck,
    iApiIndex: 0,
    oJUIClasses: {},
    sVersion: u.version,
  };
  k.extend(L, {
    afnFiltering: L.search,
    aTypes: L.type.detect,
    ofnSearch: L.type.search,
    oSort: L.type.order,
    afnSortData: L.order,
    aoFeatures: L.feature,
    oApi: L.internal,
    oStdClasses: L.classes,
    oPagination: L.pager,
  });
  k.extend(u.ext.classes, {
    sTable: "dataTable",
    sNoFooter: "no-footer",
    sPageButton: "paginate_button",
    sPageButtonActive: "current",
    sPageButtonDisabled: "disabled",
    sStripeOdd: "odd",
    sStripeEven: "even",
    sRowEmpty: "dataTables_empty",
    sWrapper: "dataTables_wrapper",
    sFilter: "dataTables_filter",
    sInfo: "dataTables_info",
    sPaging: "dataTables_paginate paging_",
    sLength: "dataTables_length",
    sProcessing: "dataTables_processing",
    sSortAsc: "sorting_asc",
    sSortDesc: "sorting_desc",
    sSortable: "sorting",
    sSortableAsc: "sorting_asc_disabled",
    sSortableDesc: "sorting_desc_disabled",
    sSortableNone: "sorting_disabled",
    sSortColumn: "sorting_",
    sFilterInput: "",
    sLengthSelect: "",
    sScrollWrapper: "dataTables_scroll",
    sScrollHead: "dataTables_scrollHead",
    sScrollHeadInner: "dataTables_scrollHeadInner",
    sScrollBody: "dataTables_scrollBody",
    sScrollFoot: "dataTables_scrollFoot",
    sScrollFootInner: "dataTables_scrollFootInner",
    sHeaderTH: "",
    sFooterTH: "",
    sSortJUIAsc: "",
    sSortJUIDesc: "",
    sSortJUI: "",
    sSortJUIAscAllowed: "",
    sSortJUIDescAllowed: "",
    sSortJUIWrapper: "",
    sSortIcon: "",
    sJUIHeader: "",
    sJUIFooter: "",
  });
  var ec = u.ext.pager;
  k.extend(ec, {
    simple: function (a, b) {
      return ["previous", "next"];
    },
    full: function (a, b) {
      return ["first", "previous", "next", "last"];
    },
    numbers: function (a, b) {
      return [Ba(a, b)];
    },
    simple_numbers: function (a, b) {
      return ["previous", Ba(a, b), "next"];
    },
    full_numbers: function (a, b) {
      return ["first", "previous", Ba(a, b), "next", "last"];
    },
    first_last_numbers: function (a, b) {
      return ["first", Ba(a, b), "last"];
    },
    _numbers: Ba,
    numbers_length: 7,
  });
  k.extend(!0, u.ext.renderer, {
    pageButton: {
      _: function (a, b, c, d, e, f) {
        var g = a.oClasses,
          h = a.oLanguage.oPaginate,
          l = a.oLanguage.oAria.paginate || {},
          n,
          m,
          p = 0,
          t = function (x, r) {
            var A,
              E = g.sPageButtonDisabled,
              H = function (B) {
                kb(a, B.data.action, !0);
              };
            var W = 0;
            for (A = r.length; W < A; W++) {
              var M = r[W];
              if (Array.isArray(M)) {
                var C = k("<" + (M.DT_el || "div") + "/>").appendTo(x);
                t(C, M);
              } else {
                n = null;
                m = M;
                C = a.iTabIndex;
                switch (M) {
                  case "ellipsis":
                    x.append('<span class="ellipsis">&#x2026;</span>');
                    break;
                  case "first":
                    n = h.sFirst;
                    0 === e && ((C = -1), (m += " " + E));
                    break;
                  case "previous":
                    n = h.sPrevious;
                    0 === e && ((C = -1), (m += " " + E));
                    break;
                  case "next":
                    n = h.sNext;
                    if (0 === f || e === f - 1) (C = -1), (m += " " + E);
                    break;
                  case "last":
                    n = h.sLast;
                    if (0 === f || e === f - 1) (C = -1), (m += " " + E);
                    break;
                  default:
                    (n = a.fnFormatNumber(M + 1)),
                      (m = e === M ? g.sPageButtonActive : "");
                }
                null !== n &&
                  ((C = k("<a>", {
                    class: g.sPageButton + " " + m,
                    "aria-controls": a.sTableId,
                    "aria-label": l[M],
                    "data-dt-idx": p,
                    tabindex: C,
                    id:
                      0 === c && "string" === typeof M
                        ? a.sTableId + "_" + M
                        : null,
                  })
                    .html(n)
                    .appendTo(x)),
                  ob(C, { action: M }, H),
                  p++);
              }
            }
          };
        try {
          var v = k(b).find(z.activeElement).data("dt-idx");
        } catch (x) {}
        t(k(b).empty(), d);
        v !== q &&
          k(b)
            .find("[data-dt-idx=" + v + "]")
            .trigger("focus");
      },
    },
  });
  k.extend(u.ext.type.detect, [
    function (a, b) {
      b = b.oLanguage.sDecimal;
      return sb(a, b) ? "num" + b : null;
    },
    function (a, b) {
      if (a && !(a instanceof Date) && !tc.test(a)) return null;
      b = Date.parse(a);
      return (null !== b && !isNaN(b)) || ca(a) ? "date" : null;
    },
    function (a, b) {
      b = b.oLanguage.sDecimal;
      return sb(a, b, !0) ? "num-fmt" + b : null;
    },
    function (a, b) {
      b = b.oLanguage.sDecimal;
      return jc(a, b) ? "html-num" + b : null;
    },
    function (a, b) {
      b = b.oLanguage.sDecimal;
      return jc(a, b, !0) ? "html-num-fmt" + b : null;
    },
    function (a, b) {
      return ca(a) || ("string" === typeof a && -1 !== a.indexOf("<"))
        ? "html"
        : null;
    },
  ]);
  k.extend(u.ext.type.search, {
    html: function (a) {
      return ca(a)
        ? a
        : "string" === typeof a
        ? a.replace(gc, " ").replace(Ta, "")
        : "";
    },
    string: function (a) {
      return ca(a) ? a : "string" === typeof a ? a.replace(gc, " ") : a;
    },
  });
  var Sa = function (a, b, c, d) {
    if (0 !== a && (!a || "-" === a)) return -Infinity;
    b && (a = ic(a, b));
    a.replace && (c && (a = a.replace(c, "")), d && (a = a.replace(d, "")));
    return 1 * a;
  };
  k.extend(L.type.order, {
    "date-pre": function (a) {
      a = Date.parse(a);
      return isNaN(a) ? -Infinity : a;
    },
    "html-pre": function (a) {
      return ca(a)
        ? ""
        : a.replace
        ? a.replace(/<.*?>/g, "").toLowerCase()
        : a + "";
    },
    "string-pre": function (a) {
      return ca(a)
        ? ""
        : "string" === typeof a
        ? a.toLowerCase()
        : a.toString
        ? a.toString()
        : "";
    },
    "string-asc": function (a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    },
    "string-desc": function (a, b) {
      return a < b ? 1 : a > b ? -1 : 0;
    },
  });
  Va("");
  k.extend(!0, u.ext.renderer, {
    header: {
      _: function (a, b, c, d) {
        k(a.nTable).on("order.dt.DT", function (e, f, g, h) {
          a === f &&
            ((e = c.idx),
            b
              .removeClass(
                c.sSortingClass + " " + d.sSortAsc + " " + d.sSortDesc
              )
              .addClass(
                "asc" == h[e]
                  ? d.sSortAsc
                  : "desc" == h[e]
                  ? d.sSortDesc
                  : c.sSortingClass
              ));
        });
      },
      jqueryui: function (a, b, c, d) {
        k("<div/>")
          .addClass(d.sSortJUIWrapper)
          .append(b.contents())
          .append(k("<span/>").addClass(d.sSortIcon + " " + c.sSortingClassJUI))
          .appendTo(b);
        k(a.nTable).on("order.dt.DT", function (e, f, g, h) {
          a === f &&
            ((e = c.idx),
            b
              .removeClass(d.sSortAsc + " " + d.sSortDesc)
              .addClass(
                "asc" == h[e]
                  ? d.sSortAsc
                  : "desc" == h[e]
                  ? d.sSortDesc
                  : c.sSortingClass
              ),
            b
              .find("span." + d.sSortIcon)
              .removeClass(
                d.sSortJUIAsc +
                  " " +
                  d.sSortJUIDesc +
                  " " +
                  d.sSortJUI +
                  " " +
                  d.sSortJUIAscAllowed +
                  " " +
                  d.sSortJUIDescAllowed
              )
              .addClass(
                "asc" == h[e]
                  ? d.sSortJUIAsc
                  : "desc" == h[e]
                  ? d.sSortJUIDesc
                  : c.sSortingClassJUI
              ));
        });
      },
    },
  });
  var xb = function (a) {
    return "string" === typeof a
      ? a
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
      : a;
  };
  u.render = {
    number: function (a, b, c, d, e) {
      return {
        display: function (f) {
          if ("number" !== typeof f && "string" !== typeof f) return f;
          var g = 0 > f ? "-" : "",
            h = parseFloat(f);
          if (isNaN(h)) return xb(f);
          h = h.toFixed(c);
          f = Math.abs(h);
          h = parseInt(f, 10);
          f = c ? b + (f - h).toFixed(c).substring(2) : "";
          return (
            g +
            (d || "") +
            h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) +
            f +
            (e || "")
          );
        },
      };
    },
    text: function () {
      return { display: xb, filter: xb };
    },
  };
  k.extend(u.ext.internal, {
    _fnExternApiFunc: fc,
    _fnBuildAjax: La,
    _fnAjaxUpdate: Fb,
    _fnAjaxParameters: Ob,
    _fnAjaxUpdateDraw: Pb,
    _fnAjaxDataSrc: Ma,
    _fnAddColumn: Wa,
    _fnColumnOptions: Da,
    _fnAdjustColumnSizing: ra,
    _fnVisibleToColumnIndex: sa,
    _fnColumnIndexToVisible: ta,
    _fnVisbleColumns: na,
    _fnGetColumns: Fa,
    _fnColumnTypes: Ya,
    _fnApplyColumnDefs: Cb,
    _fnHungarianMap: G,
    _fnCamelToHungarian: O,
    _fnLanguageCompat: ma,
    _fnBrowserDetect: Ab,
    _fnAddData: ea,
    _fnAddTr: Ga,
    _fnNodeToDataIndex: function (a, b) {
      return b._DT_RowIndex !== q ? b._DT_RowIndex : null;
    },
    _fnNodeToColumnIndex: function (a, b, c) {
      return k.inArray(c, a.aoData[b].anCells);
    },
    _fnGetCellData: S,
    _fnSetCellData: Db,
    _fnSplitObjNotation: ab,
    _fnGetObjectDataFn: ia,
    _fnSetObjectDataFn: da,
    _fnGetDataMaster: bb,
    _fnClearTable: Ha,
    _fnDeleteIndex: Ia,
    _fnInvalidate: va,
    _fnGetRowElements: $a,
    _fnCreateTr: Za,
    _fnBuildHead: Eb,
    _fnDrawHead: xa,
    _fnDraw: fa,
    _fnReDraw: ja,
    _fnAddOptionsHtml: Hb,
    _fnDetectHeader: wa,
    _fnGetUniqueThs: Ka,
    _fnFeatureHtmlFilter: Jb,
    _fnFilterComplete: ya,
    _fnFilterCustom: Sb,
    _fnFilterColumn: Rb,
    _fnFilter: Qb,
    _fnFilterCreateSearch: gb,
    _fnEscapeRegex: hb,
    _fnFilterData: Tb,
    _fnFeatureHtmlInfo: Mb,
    _fnUpdateInfo: Wb,
    _fnInfoMacros: Xb,
    _fnInitialise: za,
    _fnInitComplete: Na,
    _fnLengthChange: ib,
    _fnFeatureHtmlLength: Ib,
    _fnFeatureHtmlPaginate: Nb,
    _fnPageChange: kb,
    _fnFeatureHtmlProcessing: Kb,
    _fnProcessingDisplay: U,
    _fnFeatureHtmlTable: Lb,
    _fnScrollDraw: Ea,
    _fnApplyToChildren: Z,
    _fnCalculateColumnWidths: Xa,
    _fnThrottle: fb,
    _fnConvertToWidth: Zb,
    _fnGetWidestNode: $b,
    _fnGetMaxLenString: ac,
    _fnStringToCss: K,
    _fnSortFlatten: pa,
    _fnSort: Gb,
    _fnSortAria: cc,
    _fnSortListener: nb,
    _fnSortAttachListener: db,
    _fnSortingClasses: Pa,
    _fnSortData: bc,
    _fnSaveState: Qa,
    _fnLoadState: dc,
    _fnSettingsFromNode: Ra,
    _fnLog: aa,
    _fnMap: V,
    _fnBindAction: ob,
    _fnCallbackReg: Q,
    _fnCallbackFire: I,
    _fnLengthOverflow: jb,
    _fnRenderer: eb,
    _fnDataSource: P,
    _fnRowAttributes: cb,
    _fnExtend: pb,
    _fnCalculateEnd: function () {},
  });
  k.fn.dataTable = u;
  u.$ = k;
  k.fn.dataTableSettings = u.settings;
  k.fn.dataTableExt = u.ext;
  k.fn.DataTable = function (a) {
    return k(this).dataTable(a).api();
  };
  k.each(u, function (a, b) {
    k.fn.DataTable[a] = b;
  });
  return k.fn.dataTable;
});
