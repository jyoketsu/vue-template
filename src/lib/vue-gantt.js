import { inject as U, defineComponent as C, openBlock as m, createElementBlock as w, normalizeStyle as $, unref as o, Fragment as I, renderList as R, normalizeClass as be, renderSlot as S, toDisplayString as V, createCommentVNode as z, createElementVNode as D, createTextVNode as re, computed as O, ref as x, toRefs as ce, watch as ye, onMounted as xe, createVNode as H, Transition as ke, withCtx as T, createBlock as ee, provide as N } from "vue";
import E from "dayjs";
const de = Symbol("COLS"), ue = Symbol("CONFIG"), fe = Symbol(
  "EMIT_BAR_EVENT"
), ve = Symbol(
  "EMIT_ROW_EVENT"
);
function A() {
  const t = U(de);
  if (!t)
    throw Error("Failed to inject work days!");
  return t;
}
function Y() {
  const t = U(ue);
  if (!t)
    throw Error("Failed to inject config!");
  return t;
}
const $e = /* @__PURE__ */ C({
  __name: "TimeHead",
  setup(t) {
    const l = A(), { headHeight: e, colWidth: a, cellUnit: r } = Y();
    return (s, i) => (m(), w("div", {
      class: "relative w-fit flex border-b z-[999] bg-white",
      style: $({ height: `${o(e)}px` })
    }, [
      (m(!0), w(I, null, R(o(l), (n, v) => (m(), w("div", {
        key: v,
        class: be(["h-full flex-shrink-0 overflow-visible transition-width duration-500", { "border-r": o(r) === "month" }]),
        style: $({ width: `${o(a)}px` })
      }, [
        S(s.$slots, "gantt-head-cell", { cell: n }, () => [
          o(r) === "day" && n.day() === 1 ? (m(), w("span", {
            key: 0,
            class: "text-zinc-400 text-sm px-2",
            style: $({ lineHeight: `${o(e)}px` })
          }, V(n.format("MM/DD")), 5)) : z("", !0),
          o(r) === "month" ? (m(), w("span", {
            key: 1,
            class: "text-zinc-400 text-sm leading-8 px-2",
            style: $({ lineHeight: `${o(e)}px` })
          }, V(v === 0 || n.month() === 0 ? n.format("YYYY-MM") : n.format("MM")), 5)) : z("", !0)
        ])
      ], 6))), 128))
    ], 4));
  }
}), _e = { class: "size-full flex flex-col overflow-hidden text-zinc-400 text-sm z-[999] bg-white" }, De = { class: "flex-1 overflow-hidden" }, Ee = /* @__PURE__ */ C({
  __name: "Left",
  props: {
    scrolledY: {}
  },
  setup(t) {
    const { rowHeight: l, headHeight: e, data: a } = Y(), r = t;
    return (s, i) => (m(), w("div", _e, [
      D("div", {
        class: "w-full border-b px-2 whitespace-nowrap overflow-hidden text-ellipsis",
        style: $({ height: `${o(e)}px`, lineHeight: `${o(e)}px` })
      }, [
        S(s.$slots, "gantt-left-head", {}, () => [
          i[0] || (i[0] = re(" 姓名 "))
        ])
      ], 4),
      D("div", De, [
        D("div", {
          style: $({ transform: `translateY(-${r.scrolledY}px)` })
        }, [
          (m(!0), w(I, null, R(o(a), (n, v) => (m(), w("div", {
            class: "w-full border-b px-2 whitespace-nowrap overflow-hidden text-ellipsis",
            style: $({ height: `${o(l)}px`, lineHeight: `${o(l)}px` }),
            key: v
          }, [
            S(s.$slots, "gantt-left-row", { row: n }, () => [
              re(V(n.name), 1)
            ])
          ], 4))), 128))
        ], 4)
      ])
    ]));
  }
}), Me = /* @__PURE__ */ C({
  __name: "VerticalDivider",
  setup(t) {
    const l = A(), { colWidth: e } = Y(), a = O(() => {
      const r = [];
      for (let s = 0; s < l.value.length; s++)
        l.value[s].day() === 5 && r.push(s);
      return r;
    });
    return (r, s) => (m(!0), w(I, null, R(a.value, (i) => (m(), w("div", {
      class: "w-[1px] border-r absolute top-0 bottom-0",
      key: i,
      style: $({ left: `${(i + 1) * o(e)}px` })
    }, null, 4))), 128));
  }
});
function ge() {
  const { colWidth: t, startDate: l, cellUnit: e } = Y();
  return {
    time2position: (s, i) => {
      if (e.value === "day") {
        let n = Se(l.value, s);
        return n > 0 ? n = i ? n - 1 : n : n = i ? n + 1 : n, Math.ceil(n * t.value);
      } else {
        const n = i ? E(s).diff(l.value, "month", !0) : E(s).add(1, "day").diff(l.value, "month", !0);
        return Math.ceil(n * t.value);
      }
    },
    position2time: (s, i) => {
      if (e.value === "day") {
        let n = Math.floor(s / t.value);
        return i || (n = n - 1), Be(l.value, n);
      } else {
        const n = s / t.value, v = Math.floor(n), _ = n - v;
        let b = E(l.value).add(v, "month");
        const p = b.daysInMonth(), y = Math.round(_ * p);
        return b = b.add(y, "day"), i || (b = b.subtract(1, "day")), b.format("YYYY-MM-DD");
      }
    }
  };
}
function Se(t, l) {
  let e = E(t), a = E(l), r = !1;
  e.isAfter(a) && (r = !0, e = E(l), a = E(t));
  let s = 0;
  for (; e.isBefore(a) || e.isSame(a, "day"); ) {
    const i = e.day();
    i !== 0 && i !== 6 && s++, e = e.add(1, "day");
  }
  return r ? -s : s;
}
function Be(t, l) {
  let e = E(t), a = 0;
  if (l >= 0)
    for (; a < l; ) {
      e = e.add(1, "day");
      const r = e.day();
      r !== 0 && r !== 6 && a++;
    }
  else
    for (; a > l; ) {
      e = e.subtract(1, "day");
      const r = e.day();
      r !== 0 && r !== 6 && a--;
    }
  return e.format("YYYY-MM-DD");
}
function Ce() {
  const t = U(ve);
  if (!t)
    throw Error("Failed to inject emitRowEvent!");
  return t;
}
const se = [
  { background: "#d4b9b0", color: "#4a2d2b" },
  { background: "#b8a59d", color: "#3b2a27" },
  { background: "#9ea19e", color: "#2e3532" },
  { background: "#c8c1b7", color: "#463f36" },
  { background: "#c5a59f", color: "#4d3532" },
  { background: "#8c9d9b", color: "#2d3735" },
  { background: "#d2b4a1", color: "#4b362d" },
  { background: "#afa294", color: "#3c332d" },
  { background: "#bdbdb6", color: "#4a4a44" },
  { background: "#938b80", color: "#2f2d28" },
  { background: "#d5cdc5", color: "#504944" },
  { background: "#b5aba3", color: "#3b332d" },
  { background: "#c6bab4", color: "#463f39" },
  { background: "#bcae9e", color: "#3f332a" },
  { background: "#a0938b", color: "#322d28" },
  { background: "#d9d2ca", color: "#544e47" },
  { background: "#d0c6c0", color: "#4e4741" },
  { background: "#a59a8f", color: "#352e28" },
  { background: "#c3b7ae", color: "#4c423b" },
  { background: "#bfb0a4", color: "#463b34" }
];
function Ye() {
  const t = Math.floor(Math.random() * se.length);
  return se[t];
}
function We(t) {
  const l = t.day();
  return l !== 0 && l !== 6;
}
function ie(t) {
  return E(t).startOf("month").format("YYYY-MM-DD");
}
function X(t, l) {
  const e = x(0);
  return function(...a) {
    const r = Date.now();
    r - e.value >= l && (t(...a), e.value = r);
  };
}
function Te() {
  const t = U(fe);
  if (!t)
    throw Error("Failed to inject emitBarEvent!");
  return t;
}
const Le = ["id"], He = { class: "text-sm px-2" }, Z = 16.666, Xe = /* @__PURE__ */ C({
  __name: "GanttBar",
  props: {
    project: {},
    rowIndex: {},
    index: {}
  },
  emits: ["dragging-start", "dragging-end", "dragging"],
  setup(t, { emit: l }) {
    const e = t, a = l, r = Y(), s = Te(), { startDate: i, endDate: n, colWidth: v, rowHeight: _, cellUnit: b } = r, { project: p } = ce(e), y = x(0), k = x(0), d = x(""), h = x(""), c = x(!1), g = x(0), { time2position: M, position2time: B } = ge();
    ye([p, i, n, v], () => {
      y.value = M(p.value.startDate, !0), k.value = M(p.value.endDate, !1);
    }, { deep: !0, immediate: !0 }), xe(() => {
      if (!p.value.background || !p.value.color) {
        const f = Ye();
        d.value = f.background, h.value = f.color;
      }
    });
    const W = (f) => {
      if (f.preventDefault(), f.type === "mousedown") {
        g.value = f.clientX;
        let u;
        const L = f.target.className;
        L.includes("bar-handle-right") ? u = we : L.includes("bar-handle-left") ? u = pe : u = me, window.addEventListener("mousemove", u), window.addEventListener(
          "mouseup",
          (j) => {
            window.removeEventListener("mousemove", u), b.value === "day" && (y.value = te(y.value), k.value = te(k.value));
            const P = oe(B(y.value, !0)), F = oe(B(k.value, !1));
            c.value && s("dragend-bar", j, { ...p.value, startDate: P, endDate: F }, e.index, e.rowIndex), c.value = !1, a("dragging-end");
          },
          { once: !0 }
        );
      }
    }, he = (f) => {
      f.stopPropagation(), s("click-bar", f, { ...p.value }, e.index, e.rowIndex);
    }, me = X((f) => {
      c.value || (c.value = !0, a("dragging-start"));
      const u = f.clientX - g.value;
      G(u) && (y.value += u, k.value += u, a("dragging", { xStart: y.value, xEnd: k.value })), g.value = f.clientX;
    }, Z), pe = X((f) => {
      c.value || (c.value = !0, a("dragging-start"));
      const u = f.clientX - g.value;
      G(u) && k.value - (y.value + u) > v.value && (y.value += u, a("dragging", { xStart: y.value, xEnd: k.value })), g.value = f.clientX;
    }, Z), we = X((f) => {
      c.value || (c.value = !0, a("dragging-start"));
      const u = f.clientX - g.value;
      G(u) && k.value + u - y.value > v.value && (k.value += u, a("dragging", { xStart: y.value, xEnd: k.value })), g.value = f.clientX;
    }, Z), G = (f) => {
      var le;
      let u = !0;
      const L = document.getElementById(`gantt-row-${e.rowIndex}-bar-${e.index}`), j = L.offsetLeft, P = j + L.offsetWidth, F = j + f, ne = P + f, q = (le = document.getElementById(`gantt-row-${e.rowIndex}`)) == null ? void 0 : le.children;
      if (q)
        for (let J = 0; J < q.length; J++) {
          const K = q[J];
          if (K === L) continue;
          const Q = K.offsetLeft, ae = Q + K.offsetWidth;
          if (F < ae && ne > Q || // 当前div的左边和其他div的右边重叠
          ne > Q && F < ae) {
            u = !1;
            break;
          }
        }
      return u;
    }, te = (f) => Math.round(f / v.value) * v.value, oe = (f) => {
      let u = E(f);
      for (; u.day() === 0 || u.day() === 6; )
        u = u.add(1, "day");
      return u.format("YYYY-MM-DD");
    };
    return (f, u) => o(p).startDate && o(p).endDate && o(p).endDate > o(i) && o(p).startDate < o(n) ? (m(), w("div", {
      key: 0,
      id: `gantt-row-${f.rowIndex}-bar-${f.index}`,
      class: "absolute overflow-hidden text-ellipsis whitespace-nowrap text-center px-2",
      style: $({
        top: `${o(_) * 0.1}px`,
        left: `${y.value}px`,
        width: `${k.value - y.value}px`,
        height: `${o(_) * 0.8}px`,
        lineHeight: `${o(_) * 0.8}px`,
        background: o(p).background || d.value,
        color: o(p).color || h.value,
        zIndex: c.value ? 3 : 2,
        transition: c.value ? "none" : "left 0.5s,width 0.5s"
      }),
      onMousedown: W,
      onClick: he
    }, [
      S(f.$slots, "gantt-bar-content", { project: o(p) }, () => [
        D("span", He, V(o(p).name), 1)
      ]),
      u[0] || (u[0] = D("div", { class: "bar-handle-left absolute left-0 top-0 bottom-0 w-2 bg-white opacity-50 cursor-ew-resize" }, null, -1)),
      u[1] || (u[1] = D("div", { class: "bar-handle-right absolute right-0 top-0 bottom-0 w-2 bg-white opacity-50 cursor-ew-resize" }, null, -1))
    ], 44, Le)) : z("", !0);
  }
}), Ie = {
  key: 0,
  class: "size-full flex"
}, Re = ["id"], ze = /* @__PURE__ */ C({
  __name: "GanttRow",
  props: {
    gantt: {},
    index: {}
  },
  setup(t) {
    const l = t, e = x(!1), a = x(!1), r = x(0), s = x(0), i = O(() => b.value ? Math.floor(r.value / b.value) : 0), n = O(() => b.value ? Math.floor(s.value / b.value) : 0), { position2time: v } = ge(), { rowHeight: _, colWidth: b, rowActiveBackgroundColor: p, rowActiveBorderColor: y } = Y(), k = A(), d = Ce(), h = (c) => {
      c.stopPropagation();
      const g = v(c.offsetX, !0);
      d(c, l.gantt, g, l.index);
    };
    return (c, g) => (m(), w("div", {
      class: "w-full relative transition-colors duration-500",
      style: $({ height: `${o(_)}px`, backgroundColor: a.value ? o(p) : "unset" }),
      onClick: h,
      onMouseenter: g[3] || (g[3] = (M) => a.value = !0),
      onMouseleave: g[4] || (g[4] = (M) => a.value = !1)
    }, [
      H(ke, null, {
        default: T(() => [
          e.value ? (m(), w("div", Ie, [
            (m(!0), w(I, null, R(o(k), (M, B) => (m(), w("div", {
              key: `${B}-${M.toString()}`,
              class: "pointer-events-none h-full flex-shrink-0 border-l-2 transition-colors duration-500",
              style: $({ width: `${o(b)}px`, backgroundColor: B >= i.value && B <= n.value ? o(y) : o(p), borderColor: o(y) })
            }, null, 4))), 128))
          ])) : z("", !0)
        ]),
        _: 1
      }),
      D("div", {
        id: `gantt-row-${c.index}`
      }, [
        (m(!0), w(I, null, R(l.gantt.projects, (M, B) => (m(), ee(Xe, {
          project: M,
          "row-index": l.index,
          index: B,
          key: B,
          onDraggingStart: g[0] || (g[0] = (W) => e.value = !0),
          onDraggingEnd: g[1] || (g[1] = (W) => {
            e.value = !1, r.value = 0, s.value = 0;
          }),
          onDragging: g[2] || (g[2] = (W) => {
            r.value = W.xStart, s.value = W.xEnd;
          })
        }, {
          "gantt-bar-content": T(({ project: W }) => [
            S(c.$slots, "gantt-bar-content", { project: W })
          ]),
          _: 2
        }, 1032, ["project", "row-index", "index"]))), 128))
      ], 8, Re)
    ], 36));
  }
}), je = /* @__PURE__ */ C({
  __name: "index",
  props: {
    scrolledY: {}
  },
  setup(t) {
    const { data: l, cellUnit: e } = Y(), a = t;
    return (r, s) => (m(), w("div", {
      class: "w-full",
      style: $({ transform: `translateY(-${a.scrolledY}px)` })
    }, [
      o(e) === "day" ? (m(), ee(Me, { key: 0 })) : z("", !0),
      (m(!0), w(I, null, R(o(l), (i, n) => (m(), ee(ze, {
        key: n,
        index: n,
        gantt: i
      }, {
        "gantt-bar-content": T(({ project: v }) => [
          S(r.$slots, "gantt-bar-content", { project: v })
        ]),
        _: 2
      }, 1032, ["index", "gantt"]))), 128))
    ], 4));
  }
}), Fe = 16.666, Ne = /* @__PURE__ */ C({
  __name: "VerticalScrollBar",
  emits: ["scroll"],
  setup(t, { emit: l }) {
    const e = l, { data: a, rowHeight: r, headHeight: s } = Y(), i = x(null), n = X(() => {
      if (i.value) {
        const v = i.value.scrollTop;
        e("scroll", v);
      }
    }, Fe);
    return (v, _) => (m(), w("div", {
      class: "w-[17px] h-full overflow-y-auto overflow-x-hidden",
      ref_key: "scrollContainer",
      ref: i,
      onScroll: _[0] || (_[0] = //@ts-ignore
      (...b) => o(n) && o(n)(...b))
    }, [
      D("div", {
        style: $({ height: `${o(a).length * o(r) + o(s)}px` })
      }, null, 4)
    ], 544));
  }
}), Ve = 16.666, Oe = /* @__PURE__ */ C({
  __name: "HorizontalScrollBar",
  props: {
    leftWidth: {}
  },
  emits: ["scroll"],
  setup(t, { emit: l }) {
    const e = t, a = l, r = A(), { colWidth: s } = Y(), i = x(null), n = X(() => {
      if (i.value) {
        const v = i.value.scrollLeft;
        a("scroll", v);
      }
    }, Ve);
    return (v, _) => (m(), w("div", {
      class: "h-[17px] w-full overflow-x-auto overflow-y-hidden",
      ref_key: "scrollContainer",
      ref: i,
      onScroll: _[0] || (_[0] = //@ts-ignore
      (...b) => o(n) && o(n)(...b))
    }, [
      D("div", {
        style: $({ width: `${o(r).length * o(s) + e.leftWidth - 17}px` })
      }, null, 4)
    ], 544));
  }
}), Ue = { class: "size-full flex flex-col overflow-hidden bg-white" }, Ae = { class: "flex-1 overflow-hidden flex select-none" }, Ge = { class: "flex-1 overflow-hidden" }, Pe = 16.666, qe = /* @__PURE__ */ C({
  __name: "Gantt",
  props: {
    data: {},
    startDate: {},
    endDate: {},
    rowHeight: { default: 36 },
    headHeight: { default: 32 },
    colWidth: { default: 32 },
    rowActiveBackgroundColor: { default: "#cbe3f1" },
    rowActiveBorderColor: { default: "#a4cee7" },
    cellUnit: { default: "day" },
    leftWidth: { default: 320 }
  },
  emits: ["dragend-bar", "click-bar", "click-row"],
  setup(t, { emit: l }) {
    const e = t, a = l, r = x(e.leftWidth), s = x(!1), i = x(0), n = x(0), v = x(0), _ = O(() => {
      let d = e.cellUnit === "day" ? E(e.startDate) : E(ie(e.startDate));
      const h = e.cellUnit === "day" ? E(e.endDate) : E(ie(e.endDate)), c = [];
      if (e.cellUnit === "day")
        for (; d.isBefore(h) || d.isSame(h, "day"); )
          We(d) && c.push(d), d = d.add(1, "day");
      else
        for (; d.isBefore(h) || d.isSame(h, "day"); )
          c.push(d), d = d.add(1, "month");
      return c;
    }), b = (d) => {
      d.preventDefault(), d.type === "mousedown" && (v.value = d.clientX, window.addEventListener("mousemove", p), window.addEventListener(
        "mouseup",
        () => {
          window.removeEventListener("mousemove", p), s.value = !1;
        },
        { once: !0 }
      ));
    }, p = X((d) => {
      s.value || (s.value = !0);
      const h = d.clientX - v.value;
      r.value + h > 200 && (r.value += h), v.value = d.clientX;
    }, Pe), y = (d, h, c, g, M) => {
      switch (d) {
        case "dragend-bar":
          a(d, { e: h, bar: c, barIndex: g, rowIndex: M });
          break;
        case "click-bar":
          a(d, { e: h, bar: c, barIndex: g, rowIndex: M });
          break;
      }
    }, k = (d, h, c, g) => {
      a("click-row", { e: d, row: h, time: c, rowIndex: g });
    };
    return N(de, _), N(ue, {
      ...ce(e)
    }), N(fe, y), N(ve, k), (d, h) => (m(), w("div", Ue, [
      D("div", Ae, [
        D("div", {
          class: "h-full overflow-hidden",
          style: $({ width: `${r.value}px` })
        }, [
          H(Ee, { "scrolled-y": i.value }, {
            "gantt-left-head": T(() => [
              S(d.$slots, "gantt-left-head")
            ]),
            "gantt-left-row": T(({ row: c }) => [
              S(d.$slots, "gantt-left-row", { row: c })
            ]),
            _: 3
          }, 8, ["scrolled-y"])
        ], 4),
        D("div", {
          class: "w-[1px] h-full border-r relative overflow-visible cursor-ew-resize",
          onMousedown: b
        }, h[2] || (h[2] = [
          D("div", { class: "absolute -left-3 top-0 -right-3 bottom-0" }, null, -1)
        ]), 32),
        D("div", Ge, [
          D("div", {
            class: "w-fit h-full relative overflow-hidden",
            style: $({ transform: `translateX(-${n.value}px)` })
          }, [
            H($e, null, {
              "gantt-head-cell": T(({ cell: c }) => [
                S(d.$slots, "gantt-head-cell", { cell: c })
              ]),
              _: 3
            }),
            H(je, { "scrolled-y": i.value }, {
              "gantt-bar-content": T(({ project: c }) => [
                S(d.$slots, "gantt-bar-content", { project: c })
              ]),
              _: 3
            }, 8, ["scrolled-y"])
          ], 4)
        ]),
        H(Ne, {
          onScroll: h[0] || (h[0] = (c) => i.value = c)
        })
      ]),
      H(Oe, {
        "left-width": r.value,
        onScroll: h[1] || (h[1] = (c) => n.value = c)
      }, null, 8, ["left-width"])
    ]));
  }
}), Qe = {
  install(t) {
    t.component("VueGantt", qe);
  }
};
export {
  Qe as default,
  Qe as vueGantt
};
