/*! For license information please see app.bundle.js.LICENSE.txt */
(() => {
  "use strict";
  var t = "http://localhost:5678/api/";
  function e(t, e, r) {
    var n = "";
    if (r) {
      var o = new Date(),
        i = o.getTime() + 60 * r * 60 * 1e3;
      o.setTime(i), (n = "; expires=" + o.toUTCString() + ";");
    }
    document.cookie = t + "=" + (e || "") + n;
  }
  function r(t) {
    for (
      var e = t + "=", r = document.cookie.split(";"), n = 0;
      n < r.length;
      n++
    ) {
      for (var o = r[n]; " " == o.charAt(0); ) o = o.substring(1, o.length);
      if (0 == o.indexOf(e)) return o.substring(e.length, o.length);
    }
    return null;
  }
  function n(t) {
    return (
      (n =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      n(t)
    );
  }
  function o() {
    o = function () {
      return t;
    };
    var t = {},
      e = Object.prototype,
      r = e.hasOwnProperty,
      i =
        Object.defineProperty ||
        function (t, e, r) {
          t[e] = r.value;
        },
      a = "function" == typeof Symbol ? Symbol : {},
      c = a.iterator || "@@iterator",
      l = a.asyncIterator || "@@asyncIterator",
      u = a.toStringTag || "@@toStringTag";
    function s(t, e, r) {
      return (
        Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        t[e]
      );
    }
    try {
      s({}, "");
    } catch (t) {
      s = function (t, e, r) {
        return (t[e] = r);
      };
    }
    function d(t, e, r, n) {
      var o = e && e.prototype instanceof p ? e : p,
        a = Object.create(o.prototype),
        c = new A(n || []);
      return i(a, "_invoke", { value: x(t, r, c) }), a;
    }
    function f(t, e, r) {
      try {
        return { type: "normal", arg: t.call(e, r) };
      } catch (t) {
        return { type: "throw", arg: t };
      }
    }
    t.wrap = d;
    var h = {};
    function p() {}
    function y() {}
    function v() {}
    var m = {};
    s(m, c, function () {
      return this;
    });
    var g = Object.getPrototypeOf,
      w = g && g(g(O([])));
    w && w !== e && r.call(w, c) && (m = w);
    var b = (v.prototype = p.prototype = Object.create(m));
    function E(t) {
      ["next", "throw", "return"].forEach(function (e) {
        s(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function L(t, e) {
      function o(i, a, c, l) {
        var u = f(t[i], t, a);
        if ("throw" !== u.type) {
          var s = u.arg,
            d = s.value;
          return d && "object" == n(d) && r.call(d, "__await")
            ? e.resolve(d.__await).then(
                function (t) {
                  o("next", t, c, l);
                },
                function (t) {
                  o("throw", t, c, l);
                }
              )
            : e.resolve(d).then(
                function (t) {
                  (s.value = t), c(s);
                },
                function (t) {
                  return o("throw", t, c, l);
                }
              );
        }
        l(u.arg);
      }
      var a;
      i(this, "_invoke", {
        value: function (t, r) {
          function n() {
            return new e(function (e, n) {
              o(t, r, e, n);
            });
          }
          return (a = a ? a.then(n, n) : n());
        },
      });
    }
    function x(t, e, r) {
      var n = "suspendedStart";
      return function (o, i) {
        if ("executing" === n) throw new Error("Generator is already running");
        if ("completed" === n) {
          if ("throw" === o) throw i;
          return { value: void 0, done: !0 };
        }
        for (r.method = o, r.arg = i; ; ) {
          var a = r.delegate;
          if (a) {
            var c = S(a, r);
            if (c) {
              if (c === h) continue;
              return c;
            }
          }
          if ("next" === r.method) r.sent = r._sent = r.arg;
          else if ("throw" === r.method) {
            if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
            r.dispatchException(r.arg);
          } else "return" === r.method && r.abrupt("return", r.arg);
          n = "executing";
          var l = f(t, e, r);
          if ("normal" === l.type) {
            if (((n = r.done ? "completed" : "suspendedYield"), l.arg === h))
              continue;
            return { value: l.arg, done: r.done };
          }
          "throw" === l.type &&
            ((n = "completed"), (r.method = "throw"), (r.arg = l.arg));
        }
      };
    }
    function S(t, e) {
      var r = e.method,
        n = t.iterator[r];
      if (void 0 === n)
        return (
          (e.delegate = null),
          ("throw" === r &&
            t.iterator.return &&
            ((e.method = "return"),
            (e.arg = void 0),
            S(t, e),
            "throw" === e.method)) ||
            ("return" !== r &&
              ((e.method = "throw"),
              (e.arg = new TypeError(
                "The iterator does not provide a '" + r + "' method"
              )))),
          h
        );
      var o = f(n, t.iterator, e.arg);
      if ("throw" === o.type)
        return (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), h;
      var i = o.arg;
      return i
        ? i.done
          ? ((e[t.resultName] = i.value),
            (e.next = t.nextLoc),
            "return" !== e.method && ((e.method = "next"), (e.arg = void 0)),
            (e.delegate = null),
            h)
          : i
        : ((e.method = "throw"),
          (e.arg = new TypeError("iterator result is not an object")),
          (e.delegate = null),
          h);
    }
    function k(t) {
      var e = { tryLoc: t[0] };
      1 in t && (e.catchLoc = t[1]),
        2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
        this.tryEntries.push(e);
    }
    function j(t) {
      var e = t.completion || {};
      (e.type = "normal"), delete e.arg, (t.completion = e);
    }
    function A(t) {
      (this.tryEntries = [{ tryLoc: "root" }]),
        t.forEach(k, this),
        this.reset(!0);
    }
    function O(t) {
      if (t) {
        var e = t[c];
        if (e) return e.call(t);
        if ("function" == typeof t.next) return t;
        if (!isNaN(t.length)) {
          var n = -1,
            o = function e() {
              for (; ++n < t.length; )
                if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
              return (e.value = void 0), (e.done = !0), e;
            };
          return (o.next = o);
        }
      }
      return { next: I };
    }
    function I() {
      return { value: void 0, done: !0 };
    }
    return (
      (y.prototype = v),
      i(b, "constructor", { value: v, configurable: !0 }),
      i(v, "constructor", { value: y, configurable: !0 }),
      (y.displayName = s(v, u, "GeneratorFunction")),
      (t.isGeneratorFunction = function (t) {
        var e = "function" == typeof t && t.constructor;
        return (
          !!e && (e === y || "GeneratorFunction" === (e.displayName || e.name))
        );
      }),
      (t.mark = function (t) {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(t, v)
            : ((t.__proto__ = v), s(t, u, "GeneratorFunction")),
          (t.prototype = Object.create(b)),
          t
        );
      }),
      (t.awrap = function (t) {
        return { __await: t };
      }),
      E(L.prototype),
      s(L.prototype, l, function () {
        return this;
      }),
      (t.AsyncIterator = L),
      (t.async = function (e, r, n, o, i) {
        void 0 === i && (i = Promise);
        var a = new L(d(e, r, n, o), i);
        return t.isGeneratorFunction(r)
          ? a
          : a.next().then(function (t) {
              return t.done ? t.value : a.next();
            });
      }),
      E(b),
      s(b, u, "Generator"),
      s(b, c, function () {
        return this;
      }),
      s(b, "toString", function () {
        return "[object Generator]";
      }),
      (t.keys = function (t) {
        var e = Object(t),
          r = [];
        for (var n in e) r.push(n);
        return (
          r.reverse(),
          function t() {
            for (; r.length; ) {
              var n = r.pop();
              if (n in e) return (t.value = n), (t.done = !1), t;
            }
            return (t.done = !0), t;
          }
        );
      }),
      (t.values = O),
      (A.prototype = {
        constructor: A,
        reset: function (t) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = void 0),
            (this.done = !1),
            (this.delegate = null),
            (this.method = "next"),
            (this.arg = void 0),
            this.tryEntries.forEach(j),
            !t)
          )
            for (var e in this)
              "t" === e.charAt(0) &&
                r.call(this, e) &&
                !isNaN(+e.slice(1)) &&
                (this[e] = void 0);
        },
        stop: function () {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function (t) {
          if (this.done) throw t;
          var e = this;
          function n(r, n) {
            return (
              (a.type = "throw"),
              (a.arg = t),
              (e.next = r),
              n && ((e.method = "next"), (e.arg = void 0)),
              !!n
            );
          }
          for (var o = this.tryEntries.length - 1; o >= 0; --o) {
            var i = this.tryEntries[o],
              a = i.completion;
            if ("root" === i.tryLoc) return n("end");
            if (i.tryLoc <= this.prev) {
              var c = r.call(i, "catchLoc"),
                l = r.call(i, "finallyLoc");
              if (c && l) {
                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                if (this.prev < i.finallyLoc) return n(i.finallyLoc);
              } else if (c) {
                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
              } else {
                if (!l)
                  throw new Error("try statement without catch or finally");
                if (this.prev < i.finallyLoc) return n(i.finallyLoc);
              }
            }
          }
        },
        abrupt: function (t, e) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var o = this.tryEntries[n];
            if (
              o.tryLoc <= this.prev &&
              r.call(o, "finallyLoc") &&
              this.prev < o.finallyLoc
            ) {
              var i = o;
              break;
            }
          }
          i &&
            ("break" === t || "continue" === t) &&
            i.tryLoc <= e &&
            e <= i.finallyLoc &&
            (i = null);
          var a = i ? i.completion : {};
          return (
            (a.type = t),
            (a.arg = e),
            i
              ? ((this.method = "next"), (this.next = i.finallyLoc), h)
              : this.complete(a)
          );
        },
        complete: function (t, e) {
          if ("throw" === t.type) throw t.arg;
          return (
            "break" === t.type || "continue" === t.type
              ? (this.next = t.arg)
              : "return" === t.type
              ? ((this.rval = this.arg = t.arg),
                (this.method = "return"),
                (this.next = "end"))
              : "normal" === t.type && e && (this.next = e),
            h
          );
        },
        finish: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.finallyLoc === t)
              return this.complete(r.completion, r.afterLoc), j(r), h;
          }
        },
        catch: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.tryLoc === t) {
              var n = r.completion;
              if ("throw" === n.type) {
                var o = n.arg;
                j(r);
              }
              return o;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function (t, e, r) {
          return (
            (this.delegate = { iterator: O(t), resultName: e, nextLoc: r }),
            "next" === this.method && (this.arg = void 0),
            h
          );
        },
      }),
      t
    );
  }
  function i(t, e, r, n, o, i, a) {
    try {
      var c = t[i](a),
        l = c.value;
    } catch (t) {
      return void r(t);
    }
    c.done ? e(l) : Promise.resolve(l).then(n, o);
  }
  function a(t, e) {
    var r =
      ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
    if (!r) {
      if (
        Array.isArray(t) ||
        (r = (function (t, e) {
          if (t) {
            if ("string" == typeof t) return c(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            return (
              "Object" === r && t.constructor && (r = t.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(t)
                : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? c(t, e)
                : void 0
            );
          }
        })(t)) ||
        (e && t && "number" == typeof t.length)
      ) {
        r && (t = r);
        var n = 0,
          o = function () {};
        return {
          s: o,
          n: function () {
            return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] };
          },
          e: function (t) {
            throw t;
          },
          f: o,
        };
      }
      throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    }
    var i,
      a = !0,
      l = !1;
    return {
      s: function () {
        r = r.call(t);
      },
      n: function () {
        var t = r.next();
        return (a = t.done), t;
      },
      e: function (t) {
        (l = !0), (i = t);
      },
      f: function () {
        try {
          a || null == r.return || r.return();
        } finally {
          if (l) throw i;
        }
      },
    };
  }
  function c(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n;
  }
  var l = document.querySelector(".gallery"),
    u = function (t) {
      console.log(t);
      var e,
        r = a(t);
      try {
        for (r.s(); !(e = r.n()).done; ) {
          var n = e.value,
            o = document.createElement("figure");
          o.setAttribute("data-category", n.categoryId);
          var i = document.createElement("img");
          i.setAttribute("crossorigin", "anonymous"),
            i.setAttribute("src", n.imageUrl),
            i.setAttribute("alt", n.title);
          var c = document.createElement("figcaption");
          (c.innerHTML = n.title),
            o.appendChild(i),
            o.appendChild(c),
            l.appendChild(o);
        }
      } catch (t) {
        r.e(t);
      } finally {
        r.f();
      }
    },
    s = (function () {
      var t,
        e =
          ((t = o().mark(function t() {
            var e, r, n;
            return o().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    (e = document.getElementsByClassName("filter-button")),
                      (r = a(e));
                    try {
                      for (r.s(); !(n = r.n()).done; )
                        n.value.addEventListener("click", function () {
                          var t =
                            document.getElementsByClassName("selectedInput");
                          t.length > 0 &&
                            t[0].classList.remove("selectedInput"),
                            this.classList.add("selectedInput");
                          var e = Number(this.value),
                            r = JSON.parse(
                              window.sessionStorage.getItem("works")
                            );
                          if (e > 0) {
                            var n = r.filter(function (t) {
                              return t.categoryId === e;
                            });
                            l.replaceChildren(), u(n);
                          } else l.replaceChildren(), u(r);
                        });
                    } catch (t) {
                      r.e(t);
                    } finally {
                      r.f();
                    }
                  case 3:
                  case "end":
                    return t.stop();
                }
            }, t);
          })),
          function () {
            var e = this,
              r = arguments;
            return new Promise(function (n, o) {
              var a = t.apply(e, r);
              function c(t) {
                i(a, n, o, c, l, "next", t);
              }
              function l(t) {
                i(a, n, o, c, l, "throw", t);
              }
              c(void 0);
            });
          });
      return function () {
        return e.apply(this, arguments);
      };
    })();
  function d(t) {
    return (
      (d =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      d(t)
    );
  }
  function f() {
    f = function () {
      return t;
    };
    var t = {},
      e = Object.prototype,
      r = e.hasOwnProperty,
      n =
        Object.defineProperty ||
        function (t, e, r) {
          t[e] = r.value;
        },
      o = "function" == typeof Symbol ? Symbol : {},
      i = o.iterator || "@@iterator",
      a = o.asyncIterator || "@@asyncIterator",
      c = o.toStringTag || "@@toStringTag";
    function l(t, e, r) {
      return (
        Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        t[e]
      );
    }
    try {
      l({}, "");
    } catch (t) {
      l = function (t, e, r) {
        return (t[e] = r);
      };
    }
    function u(t, e, r, o) {
      var i = e && e.prototype instanceof p ? e : p,
        a = Object.create(i.prototype),
        c = new A(o || []);
      return n(a, "_invoke", { value: x(t, r, c) }), a;
    }
    function s(t, e, r) {
      try {
        return { type: "normal", arg: t.call(e, r) };
      } catch (t) {
        return { type: "throw", arg: t };
      }
    }
    t.wrap = u;
    var h = {};
    function p() {}
    function y() {}
    function v() {}
    var m = {};
    l(m, i, function () {
      return this;
    });
    var g = Object.getPrototypeOf,
      w = g && g(g(O([])));
    w && w !== e && r.call(w, i) && (m = w);
    var b = (v.prototype = p.prototype = Object.create(m));
    function E(t) {
      ["next", "throw", "return"].forEach(function (e) {
        l(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function L(t, e) {
      function o(n, i, a, c) {
        var l = s(t[n], t, i);
        if ("throw" !== l.type) {
          var u = l.arg,
            f = u.value;
          return f && "object" == d(f) && r.call(f, "__await")
            ? e.resolve(f.__await).then(
                function (t) {
                  o("next", t, a, c);
                },
                function (t) {
                  o("throw", t, a, c);
                }
              )
            : e.resolve(f).then(
                function (t) {
                  (u.value = t), a(u);
                },
                function (t) {
                  return o("throw", t, a, c);
                }
              );
        }
        c(l.arg);
      }
      var i;
      n(this, "_invoke", {
        value: function (t, r) {
          function n() {
            return new e(function (e, n) {
              o(t, r, e, n);
            });
          }
          return (i = i ? i.then(n, n) : n());
        },
      });
    }
    function x(t, e, r) {
      var n = "suspendedStart";
      return function (o, i) {
        if ("executing" === n) throw new Error("Generator is already running");
        if ("completed" === n) {
          if ("throw" === o) throw i;
          return { value: void 0, done: !0 };
        }
        for (r.method = o, r.arg = i; ; ) {
          var a = r.delegate;
          if (a) {
            var c = S(a, r);
            if (c) {
              if (c === h) continue;
              return c;
            }
          }
          if ("next" === r.method) r.sent = r._sent = r.arg;
          else if ("throw" === r.method) {
            if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
            r.dispatchException(r.arg);
          } else "return" === r.method && r.abrupt("return", r.arg);
          n = "executing";
          var l = s(t, e, r);
          if ("normal" === l.type) {
            if (((n = r.done ? "completed" : "suspendedYield"), l.arg === h))
              continue;
            return { value: l.arg, done: r.done };
          }
          "throw" === l.type &&
            ((n = "completed"), (r.method = "throw"), (r.arg = l.arg));
        }
      };
    }
    function S(t, e) {
      var r = e.method,
        n = t.iterator[r];
      if (void 0 === n)
        return (
          (e.delegate = null),
          ("throw" === r &&
            t.iterator.return &&
            ((e.method = "return"),
            (e.arg = void 0),
            S(t, e),
            "throw" === e.method)) ||
            ("return" !== r &&
              ((e.method = "throw"),
              (e.arg = new TypeError(
                "The iterator does not provide a '" + r + "' method"
              )))),
          h
        );
      var o = s(n, t.iterator, e.arg);
      if ("throw" === o.type)
        return (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), h;
      var i = o.arg;
      return i
        ? i.done
          ? ((e[t.resultName] = i.value),
            (e.next = t.nextLoc),
            "return" !== e.method && ((e.method = "next"), (e.arg = void 0)),
            (e.delegate = null),
            h)
          : i
        : ((e.method = "throw"),
          (e.arg = new TypeError("iterator result is not an object")),
          (e.delegate = null),
          h);
    }
    function k(t) {
      var e = { tryLoc: t[0] };
      1 in t && (e.catchLoc = t[1]),
        2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
        this.tryEntries.push(e);
    }
    function j(t) {
      var e = t.completion || {};
      (e.type = "normal"), delete e.arg, (t.completion = e);
    }
    function A(t) {
      (this.tryEntries = [{ tryLoc: "root" }]),
        t.forEach(k, this),
        this.reset(!0);
    }
    function O(t) {
      if (t) {
        var e = t[i];
        if (e) return e.call(t);
        if ("function" == typeof t.next) return t;
        if (!isNaN(t.length)) {
          var n = -1,
            o = function e() {
              for (; ++n < t.length; )
                if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
              return (e.value = void 0), (e.done = !0), e;
            };
          return (o.next = o);
        }
      }
      return { next: I };
    }
    function I() {
      return { value: void 0, done: !0 };
    }
    return (
      (y.prototype = v),
      n(b, "constructor", { value: v, configurable: !0 }),
      n(v, "constructor", { value: y, configurable: !0 }),
      (y.displayName = l(v, c, "GeneratorFunction")),
      (t.isGeneratorFunction = function (t) {
        var e = "function" == typeof t && t.constructor;
        return (
          !!e && (e === y || "GeneratorFunction" === (e.displayName || e.name))
        );
      }),
      (t.mark = function (t) {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(t, v)
            : ((t.__proto__ = v), l(t, c, "GeneratorFunction")),
          (t.prototype = Object.create(b)),
          t
        );
      }),
      (t.awrap = function (t) {
        return { __await: t };
      }),
      E(L.prototype),
      l(L.prototype, a, function () {
        return this;
      }),
      (t.AsyncIterator = L),
      (t.async = function (e, r, n, o, i) {
        void 0 === i && (i = Promise);
        var a = new L(u(e, r, n, o), i);
        return t.isGeneratorFunction(r)
          ? a
          : a.next().then(function (t) {
              return t.done ? t.value : a.next();
            });
      }),
      E(b),
      l(b, c, "Generator"),
      l(b, i, function () {
        return this;
      }),
      l(b, "toString", function () {
        return "[object Generator]";
      }),
      (t.keys = function (t) {
        var e = Object(t),
          r = [];
        for (var n in e) r.push(n);
        return (
          r.reverse(),
          function t() {
            for (; r.length; ) {
              var n = r.pop();
              if (n in e) return (t.value = n), (t.done = !1), t;
            }
            return (t.done = !0), t;
          }
        );
      }),
      (t.values = O),
      (A.prototype = {
        constructor: A,
        reset: function (t) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = void 0),
            (this.done = !1),
            (this.delegate = null),
            (this.method = "next"),
            (this.arg = void 0),
            this.tryEntries.forEach(j),
            !t)
          )
            for (var e in this)
              "t" === e.charAt(0) &&
                r.call(this, e) &&
                !isNaN(+e.slice(1)) &&
                (this[e] = void 0);
        },
        stop: function () {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function (t) {
          if (this.done) throw t;
          var e = this;
          function n(r, n) {
            return (
              (a.type = "throw"),
              (a.arg = t),
              (e.next = r),
              n && ((e.method = "next"), (e.arg = void 0)),
              !!n
            );
          }
          for (var o = this.tryEntries.length - 1; o >= 0; --o) {
            var i = this.tryEntries[o],
              a = i.completion;
            if ("root" === i.tryLoc) return n("end");
            if (i.tryLoc <= this.prev) {
              var c = r.call(i, "catchLoc"),
                l = r.call(i, "finallyLoc");
              if (c && l) {
                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                if (this.prev < i.finallyLoc) return n(i.finallyLoc);
              } else if (c) {
                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
              } else {
                if (!l)
                  throw new Error("try statement without catch or finally");
                if (this.prev < i.finallyLoc) return n(i.finallyLoc);
              }
            }
          }
        },
        abrupt: function (t, e) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var o = this.tryEntries[n];
            if (
              o.tryLoc <= this.prev &&
              r.call(o, "finallyLoc") &&
              this.prev < o.finallyLoc
            ) {
              var i = o;
              break;
            }
          }
          i &&
            ("break" === t || "continue" === t) &&
            i.tryLoc <= e &&
            e <= i.finallyLoc &&
            (i = null);
          var a = i ? i.completion : {};
          return (
            (a.type = t),
            (a.arg = e),
            i
              ? ((this.method = "next"), (this.next = i.finallyLoc), h)
              : this.complete(a)
          );
        },
        complete: function (t, e) {
          if ("throw" === t.type) throw t.arg;
          return (
            "break" === t.type || "continue" === t.type
              ? (this.next = t.arg)
              : "return" === t.type
              ? ((this.rval = this.arg = t.arg),
                (this.method = "return"),
                (this.next = "end"))
              : "normal" === t.type && e && (this.next = e),
            h
          );
        },
        finish: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.finallyLoc === t)
              return this.complete(r.completion, r.afterLoc), j(r), h;
          }
        },
        catch: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.tryLoc === t) {
              var n = r.completion;
              if ("throw" === n.type) {
                var o = n.arg;
                j(r);
              }
              return o;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function (t, e, r) {
          return (
            (this.delegate = { iterator: O(t), resultName: e, nextLoc: r }),
            "next" === this.method && (this.arg = void 0),
            h
          );
        },
      }),
      t
    );
  }
  function h(t, e, r, n, o, i, a) {
    try {
      var c = t[i](a),
        l = c.value;
    } catch (t) {
      return void r(t);
    }
    c.done ? e(l) : Promise.resolve(l).then(n, o);
  }
  var p = function (t) {
      var e = document.createElement("button");
      e.setAttribute("href", "#modal1"),
        e.classList.add("editButton"),
        e.classList.add("js-modal"),
        e.classList.add("defaultHoverDisabled"),
        (e.innerHTML =
          '<i class="fa-solid fa-pen-to-square"></i><span>modifier</span>'),
        "ARTICLE" === t.tagName ? t.prepend(e) : t.appendChild(e);
    },
    y = function (e) {
      e.preventDefault();
      var n = e.target.getAttribute("data-photo-id");
      fetch(t + "works/" + n, {
        headers: { Authorization: "BEARER " + r("token") },
        method: "DELETE",
      })
        .then(function (t) {
          if (t.ok) return t.json();
        })
        .then(function (t) {
          console.log(t);
        })
        .catch(function (t) {
          console.log(t);
        });
    },
    v = document.querySelector(".login-error-msg"),
    m = window.location.pathname,
    g = m.split("/")[m.split("/").length - 1];
  "index.html" === g
    ? (fetch(t + "works", { method: "GET" })
        .then(function (t) {
          if (t.ok) return t.json();
        })
        .then(function (t) {
          window.sessionStorage.setItem("works", JSON.stringify(t)),
            null !== l && (u(t), s());
        })
        .catch(function (t) {
          console.log(t);
        }),
      (function (e) {
        if (e) {
          document.querySelector(".filtersContainer").replaceChildren();
          var n = document.createElement("div");
          n.classList.add("admin-headband");
          var o = document.createElement("div");
          o.classList.add("edition-mode"),
            (o.innerHTML =
              '<i class="fa-solid fa-pen-to-square"></i><span>Mode édition</span>');
          var i = document.createElement("button");
          (i.innerHTML = "publier les changements"),
            n.appendChild(o),
            n.appendChild(i),
            document.getElementsByTagName("body")[0].prepend(n);
          var c = document.getElementsByTagName("article");
          p(c[0]);
          var l = document.querySelector("#introduction > figure > div");
          p(l);
          var u = document.querySelector(".mes-projets-title-container");
          p(u);
        }
        var s = document.querySelectorAll(".js-modal"),
          d = null,
          v = "button, a, input, textarea",
          m = [],
          g = null,
          w = document.getElementById("modal-portfolio"),
          b = function (t) {
            t.preventDefault(),
              (d = t.target.parentElement.getAttribute("href")
                ? document.querySelector(
                    t.target.parentElement.getAttribute("href")
                  )
                : document.querySelector(t.target.getAttribute("href"))),
              (m = Array.from(d.querySelectorAll(v))),
              (g = document.querySelector(":focus")),
              m[0].focus(),
              (d.style.display = null),
              d.setAttribute("aria-hidden", !1),
              d.setAttribute("aria-modal", !0),
              d.addEventListener("click", q),
              d.querySelector(".js-modal-close").addEventListener("click", q),
              d.querySelector(".js-modal-stop").addEventListener("click", P),
              d
                .querySelector(".js-modal-previous")
                .addEventListener("click", S),
              d
                .querySelector(".js-modal-previous")
                .addEventListener("click", P);
            var e = JSON.parse(window.sessionStorage.getItem("works"));
            !(function (t, e) {
              var r,
                n = a(e);
              try {
                for (n.s(); !(r = n.n()).done; ) {
                  var o = r.value,
                    i = document.createElement("figure");
                  i.setAttribute("data-category", o.categoryId);
                  var c = document.createElement("img");
                  c.setAttribute("crossorigin", "anonymous"),
                    c.setAttribute("src", o.imageUrl),
                    c.setAttribute("alt", o.title);
                  var l = document.createElement("i");
                  l.classList.add("fa-solid"),
                    l.classList.add("fa-trash-can"),
                    l.classList.add("modal-trash-icon"),
                    l.setAttribute("data-photo-id", o.id),
                    l.addEventListener("click", y);
                  var u = document.createElement("a");
                  u.classList.add("modal-trash-icon-container"),
                    u.appendChild(l);
                  var s = document.createElement("a");
                  if (
                    ((s.innerHTML = "éditer"),
                    i.appendChild(c),
                    i.appendChild(s),
                    i.appendChild(u),
                    0 === e.indexOf(o))
                  ) {
                    var d = document.createElement("i");
                    d.classList.add("fa-solid"),
                      d.classList.add("fa-arrows-up-down-left-right"),
                      d.classList.add("modal-arrows-icon");
                    var f = document.createElement("a");
                    f.classList.add("modal-trash-icon-container"),
                      f.classList.add("modal-displace-icon-container"),
                      f.appendChild(d),
                      i.appendChild(f);
                  }
                  t.appendChild(i);
                }
              } catch (t) {
                n.e(t);
              } finally {
                n.f();
              }
            })(w, e);
          },
          E = document.querySelector(".modal-add-button"),
          L = document.querySelector("#modal-opening"),
          x = document.querySelector("#modal-add-photo");
        E.addEventListener("click", function (t) {
          t.preventDefault,
            Array.from(d.querySelectorAll(v)),
            (L.style.display = "none"),
            (x.style.display = "flex");
        });
        var S = function () {
            (L.style.display = "flex"), (x.style.display = "none");
          },
          k = document.getElementById("img-preview"),
          j = document.getElementById("select-photo"),
          A = document.getElementById("select-photo-label"),
          O =
            (document.querySelector(".modal-add-photo-wrapper"),
            [
              j,
              document.querySelector(".modal-add-photo-wrapper > i"),
              document.querySelector(".js-image-type"),
            ]);
        j.addEventListener("change", function () {
          !(function () {
            var t = j.files[0];
            if (t) {
              var e = new FileReader();
              e.readAsDataURL(t),
                e.addEventListener("load", function () {
                  (k.style.display = "block"),
                    (k.innerHTML = '<img src="' + this.result + '" />');
                });
            }
          })(),
            O.forEach(function (t) {
              t.style.display = "none";
            }),
            A.classList.add("modal-change-selected-photo-btn"),
            (A.innerHTML = "Changer photo");
        });
        var I = document.querySelectorAll(".js-modal-add-photo-input"),
          T = document.getElementsByClassName("modal-validate-button")[0],
          _ = document.getElementsByClassName("form-error-msg")[0],
          C =
            (new FormData(),
            function () {
              var t = j.files[0],
                e = document.getElementById("photoTitleInput").value,
                r = document.getElementById("photoCategoryInput").value;
              void 0 !== t && e && r
                ? (T.removeAttribute("disabled"),
                  (_.style.visibility = "hidden"))
                : (T.setAttribute("disabled", !0),
                  (_.style.visibility = "visible"));
            });
        I.forEach(function (t) {
          t.addEventListener("input", C);
        });
        var N = document.getElementById("add-work-form");
        N.onsubmit = (function () {
          var e,
            n =
              ((e = f().mark(function e(n) {
                return f().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        n.preventDefault(),
                          (o = new FormData(N)),
                          fetch(t + "works", {
                            headers: { Authorization: "BEARER " + r("token") },
                            method: "POST",
                            body: o,
                          })
                            .then(function (t) {
                              console.log(t.status);
                            })
                            .catch(function (t) {
                              console.log(t);
                            });
                      case 3:
                      case "end":
                        return e.stop();
                    }
                  var o;
                }, e);
              })),
              function () {
                var t = this,
                  r = arguments;
                return new Promise(function (n, o) {
                  var i = e.apply(t, r);
                  function a(t) {
                    h(i, n, o, a, c, "next", t);
                  }
                  function c(t) {
                    h(i, n, o, a, c, "throw", t);
                  }
                  a(void 0);
                });
              });
          return function (t) {
            return n.apply(this, arguments);
          };
        })();
        var q = function t(e) {
            null !== d &&
              (null !== g && g.focus(),
              e.preventDefault(),
              d.setAttribute("aria-hidden", !0),
              d.removeAttribute("aria-modal"),
              d.removeEventListener("click", t),
              d
                .querySelector(".js-modal-close")
                .removeEventListener("click", t),
              d.querySelector(".js-modal-stop").removeEventListener("click", P),
              d.addEventListener("animationend", function t() {
                (d.style.display = "none"),
                  (x.style.display = "none"),
                  (L.style.display = "flex"),
                  d.removeEventListener("animationend", t),
                  w.replaceChildren(),
                  (d = null);
              }));
          },
          P = function (t) {
            t.stopPropagation();
          };
        s.forEach(function (t) {
          t.addEventListener("click", b);
        }),
          window.addEventListener("keydown", function (t) {
            ("Escape" !== t.key && "Esc" !== t.key) || q(t),
              "Tab" === t.key &&
                null != d &&
                (function (t) {
                  t.preventDefault();
                  var e = m.findIndex(function (t) {
                    return t === d.querySelector(":focus");
                  });
                  !0 === t.shiftKey ? e-- : e++,
                    e >= m.length && (e = 0),
                    e < 0 && (e = m.length - 1),
                    m[e].focus();
                })(t);
          });
      })(r("token")),
      console.log("page load"))
    : "login.html" === g &&
      document
        .getElementById("loginButton")
        .addEventListener("click", function (r) {
          var n;
          r.preventDefault(),
            (n = {
              email: document.getElementById("userEmailInput").value,
              password: document.getElementById("userPwdinput").value,
            }),
            fetch(t + "users/login", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(n),
            })
              .then(function (t) {
                if (t.ok) return (v.style.visibility = "hidden"), t.json();
                console.log(t.status), (v.style.visibility = "visible");
              })
              .then(function (t) {
                e("token", t.token, 24),
                  e("userId", t.userId, 24),
                  location.replace("http://127.0.0.1:5500/FrontEnd/index.html");
              })
              .catch(function (t) {
                console.log(t);
              });
        });
})();
