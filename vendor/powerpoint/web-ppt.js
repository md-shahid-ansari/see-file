// .ppt-build/node_modules/@web-ppt/core/dist/geometry.js
var e = (t2) => Number.isFinite(t2) ? String(Math.round(t2 * 1e3) / 1e3) : "0";
var o = (t2) => t2 * Math.PI / 180;
var i = (t2) => ({ d: t2, open: true });
var h = (t2, n2, a3) => (t2[n2] ?? a3) / 1e5;
var u = (t2, n2, a3) => (t2[n2] ?? a3) / 6e4;
function c(t2, n2 = true) {
  return t2.length ? "M " + t2.map(([t3, n3]) => `${e(t3)} ${e(n3)}`).join(" L ") + (n2 ? " Z" : "") : "";
}
function s(t2, n2, a3, $3, r2) {
  return [t2 + a3 * Math.cos(o(r2)), n2 + $3 * Math.sin(o(r2))];
}
function M(t2, n2, a3, $3, r2, o4) {
  const i4 = Math.max(-359.99, Math.min(359.99, o4)), [h4, u4] = s(t2, n2, a3, $3, r2 + i4);
  return `A ${e(a3)} ${e($3)} 0 ${Math.abs(i4) > 180 ? 1 : 0} ${i4 >= 0 ? 1 : 0} ${e(h4)} ${e(u4)}`;
}
function d(t2, n2, a3, $3, r2, o4) {
  const [i4, h4] = s(t2, n2, a3, $3, r2);
  return `M ${e(i4)} ${e(h4)} ${M(t2, n2, a3, $3, r2, o4)}`;
}
function m(t2) {
  if (t2.length < 2) return "";
  const n2 = t2.slice(0, -1).reverse();
  return "M " + [...t2, ...n2].map(([t3, n3]) => `${e(t3)} ${e(n3)}`).join(" L ");
}
function l(t2, n2, a3, $3) {
  return j(t2, n2, a3, $3) + " " + j(t2, n2, a3, $3, true);
}
function j(t2, n2, a3, $3, r2 = false) {
  const o4 = r2 ? -180 : 180;
  return `M ${e(t2 - a3)} ${e(n2)} ${M(t2, n2, a3, $3, 180, o4)} ${M(t2, n2, a3, $3, 180 + o4, o4)} Z`;
}
function L(t2, n2) {
  return (a3, $3) => {
    const r2 = [];
    for (let e3 = 0; e3 < t2; e3++) r2.push(s(a3 / 2, $3 / 2, a3 / 2, $3 / 2, n2 + 360 * e3 / t2));
    return c(r2);
  };
}
function p(t2, n2) {
  return (a3, $3, r2) => {
    const e3 = r2.adj !== void 0 ? r2.adj / 1e5 : n2, o4 = Math.min(0.95, Math.max(0.05, e3)), i4 = [];
    for (let n3 = 0; n3 < t2 * 2; n3++) {
      const r3 = n3 % 2 === 0 ? 1 : o4;
      i4.push(s(a3 / 2, $3 / 2, a3 / 2 * r3, $3 / 2 * r3, -90 + n3 * 180 / t2));
    }
    return c(i4);
  };
}
function f(t2, n2, a3, $3) {
  const r2 = [[0, 0], [t2, 0], [t2, n2], [0, n2]], o4 = [[1, 0], [0, 1], [-1, 0], [0, -1]], i4 = [];
  for (let t3 = 0; t3 < 4; t3++) {
    const [n3, h4] = r2[t3], u4 = Math.max(0, a3[t3]), c4 = o4[(t3 + 3) % 4], s4 = o4[t3], M4 = [n3 - c4[0] * u4, h4 - c4[1] * u4], d4 = [n3 + s4[0] * u4, h4 + s4[1] * u4];
    i4.push(`${t3 === 0 ? "M" : "L"} ${e(M4[0])} ${e(M4[1])}`), u4 > 0 && i4.push($3[t3] === "r" ? `A ${e(u4)} ${e(u4)} 0 0 1 ${e(d4[0])} ${e(d4[1])}` : `L ${e(d4[0])} ${e(d4[1])}`);
  }
  return i4.join(" ") + " Z";
}
var A = (t2, n2, a3) => ($3, r2, e3) => {
  const o4 = n2.map((t3, n3) => t3 ? Math.min($3, r2) * Math.min(h(e3, t3, a3[n3]), 0.5) : 0);
  return f($3, r2, o4, t2);
};
var C = { r: ([t2, n2]) => [t2, n2], l: ([t2, n2], a3) => [a3 - t2, n2], d: ([t2, n2]) => [n2, t2], u: ([t2, n2], a3, $3) => [n2, $3 - t2] };
function w(t2) {
  return (n2, a3, $3) => {
    const r2 = t2 === "r" || t2 === "l", e3 = r2 ? n2 : a3, o4 = r2 ? a3 : n2, i4 = o4 * Math.min(h($3, "adj1", 5e4), 1) / 2, u4 = Math.min(e3, o4 * h($3, "adj2", 5e4)), s4 = o4 / 2, M4 = [[0, s4 - i4], [e3 - u4, s4 - i4], [e3 - u4, 0], [e3, s4], [e3 - u4, o4], [e3 - u4, s4 + i4], [0, s4 + i4]];
    return c(M4.map(($4) => C[t2]($4, n2, a3)));
  };
}
function g(t2) {
  return (n2, a3, $3) => {
    const r2 = t2 === "r" || t2 === "l", e3 = r2 ? n2 : a3, o4 = r2 ? a3 : n2, i4 = o4 * h($3, "adj1", 18515) / 2, u4 = Math.min(e3 / 2, o4 * h($3, "adj2", 18515)), s4 = Math.max(0, e3 - Math.max(u4, e3 * (1 - h($3, "adj4", 66667)))), M4 = o4 / 2, d4 = [[0, 0], [s4, 0], [s4, M4 - i4], [e3 - u4, M4 - i4], [e3 - u4, 0], [e3, M4], [e3 - u4, o4], [e3 - u4, M4 + i4], [s4, M4 + i4], [s4, o4], [0, o4]];
    return c(d4.map(($4) => C[t2]($4, n2, a3)));
  };
}
function b(t2, n2, a3) {
  return [t2 / 2 + t2 * h(a3, "adj1", -20833), n2 / 2 + n2 * h(a3, "adj2", 62500)];
}
function Z(t2, n2, a3) {
  const $3 = b(t2, n2, a3), r2 = $3[0] - t2 / 2, e3 = $3[1] - n2 / 2, o4 = t2 === 0 ? 0 : r2 * n2 / t2, i4 = Math.abs(e3) - Math.abs(o4) > 0, h4 = t2 * (r2 > 0 ? 7 : 2) / 12, u4 = n2 * (e3 > 0 ? 7 : 2) / 12;
  return { x1: h4, x2: t2 * (r2 > 0 ? 10 : 5) / 12, y1: u4, y2: n2 * (e3 > 0 ? 10 : 5) / 12, top: i4 && e3 <= 0 ? $3 : [h4, 0], right: !i4 && r2 > 0 ? $3 : [t2, u4], bottom: i4 && e3 > 0 ? $3 : [h4, n2], left: !i4 && r2 <= 0 ? $3 : [0, u4] };
}
function x(t2, n2, a3, $3) {
  const r2 = [[t2 * 0.15, n2]];
  return $3 === 1 ? r2.push([t2 * h(a3, "adj2", -8333), n2 + n2 * h(a3, "adj1", 18750)]) : (r2.push([t2 * 0.05, n2 * 1.2]), r2.push([t2 * h(a3, "adj4", -16667), n2 + n2 * h(a3, "adj3", 44444)]), $3 >= 3 && r2.push([t2 * h(a3, "adj6", -16667) - t2 * 0.12, n2 + n2 * h(a3, "adj5", 44444)])), " " + m(r2);
}
function v(t2, n2) {
  return (a3, $3, r2) => c([[0, 0], [a3, 0], [a3, $3], [0, $3]]) + (n2 ? " " + m([[0, 0], [0, $3]]) : "") + x(a3, $3, r2, t2);
}
function y(t2) {
  return (n2, a3) => {
    const $3 = Math.min(Math.hypot(n2, a3) / 20, Math.min(n2, a3) / 2), r2 = (n3, a4, r3, o4) => {
      const [i4, h4] = [n3 + r3 * $3, a4], [u4, s4] = [n3, a4 + o4 * $3];
      if (t2 === "s") return c([[n3, a4], [i4, h4], [i4, s4], [u4, s4]]);
      const M4 = t2 === "q" ? r3 * o4 > 0 ? 1 : 0 : r3 * o4 > 0 ? 0 : 1;
      return `M ${e(n3)} ${e(a4)} L ${e(i4)} ${e(h4)} A ${e($3)} ${e($3)} 0 0 ${M4} ${e(u4)} ${e(s4)} Z`;
    };
    return [r2(0, 0, 1, 1), r2(n2, 0, -1, 1), r2(n2, a3, -1, -1), r2(0, a3, 1, -1)].join(" ");
  };
}
function R(t2, n2, a3, $3) {
  const r2 = n2 / 4;
  return $3 ? `C ${e(n2 - r2)} ${e(t2 + a3)} ${e(r2)} ${e(t2 - a3)} 0 ${e(t2)}` : `C ${e(r2)} ${e(t2 - a3)} ${e(r2 * 3)} ${e(t2 + a3)} ${e(n2)} ${e(t2)}`;
}
function S(t2, n2, a3, $3, r2, o4, i4, h4, u4 = false) {
  const c4 = h4 >= i4 ? 1 : -1, d4 = Math.max(1, Math.min(o4, Math.min(a3, $3) - r2 - 1)), m4 = (a3 + $3) / 2 - r2 / 2, l3 = Math.min(Math.abs(h4 - i4) * (u4 ? 0.35 : 0.6), d4 / Math.max(m4, 1) * (180 / Math.PI)), j4 = h4 - c4 * l3, L4 = u4 ? i4 + c4 * l3 : i4, p4 = j4 - L4, [f4, A4] = s(t2, n2, a3, $3, L4), [C4, w4] = s(t2, n2, a3 + d4, $3 + d4, j4), [g4, b4] = s(t2, n2, a3 - r2 / 2, $3 - r2 / 2, h4), [Z4, x4] = s(t2, n2, a3 - r2 - d4, $3 - r2 - d4, j4), [v4, y4] = s(t2, n2, a3 - r2, $3 - r2, j4);
  let R4 = "";
  if (u4) {
    const [o5, h5] = s(t2, n2, a3 - r2 - d4, $3 - r2 - d4, L4), [u5, c5] = s(t2, n2, a3 - r2 / 2, $3 - r2 / 2, i4), [M4, m5] = s(t2, n2, a3 + d4, $3 + d4, L4);
    R4 = `L ${e(o5)} ${e(h5)} L ${e(u5)} ${e(c5)} L ${e(M4)} ${e(m5)} `;
  }
  return `M ${e(f4)} ${e(A4)} ${M(t2, n2, a3, $3, L4, p4)} L ${e(C4)} ${e(w4)} L ${e(g4)} ${e(b4)} L ${e(Z4)} ${e(x4)} L ${e(v4)} ${e(y4)} ${M(t2, n2, a3 - r2, $3 - r2, j4, -p4)} ${R4}Z`;
}
function B(t2, n2, a3) {
  const $3 = t2 / 2, r2 = n2 / 2, e3 = Math.min(t2, n2) / 2, o4 = e3 * 0.78, i4 = 360 / a3, h4 = [];
  for (let t3 = 0; t3 < a3; t3++) {
    const n3 = t3 * i4;
    h4.push(s($3, r2, o4, o4, n3 - i4 * 0.28)), h4.push(s($3, r2, e3, e3, n3 - i4 * 0.16)), h4.push(s($3, r2, e3, e3, n3 + i4 * 0.16)), h4.push(s($3, r2, o4, o4, n3 + i4 * 0.28));
  }
  return c(h4) + " " + j($3, r2, e3 * 0.36, e3 * 0.36, true);
}
function P(t2, n2, a3) {
  return c([[0, 0], [t2, 0], [t2, n2], [0, n2]]) + " " + m([[a3, a3], [t2 - a3, a3], [t2 - a3, n2 - a3], [a3, n2 - a3], [a3, a3]]);
}
function D(t2, n2, a3) {
  const $3 = Math.min(t2, n2) * 0.125;
  return P(t2, n2, $3) + " " + a3(Math.min(t2, n2) * 0.24, t2 / 2, n2 / 2);
}
var I = { rect: (t2, n2) => c([[0, 0], [t2, 0], [t2, n2], [0, n2]]), roundRect: A(["r", "r", "r", "r"], ["adj", "adj", "adj", "adj"], [16667, 16667, 16667, 16667]), round1Rect: A(["n", "r", "n", "n"], [null, "adj", null, null], [0, 16667, 0, 0]), round2SameRect: A(["r", "r", "r", "r"], ["adj1", "adj1", "adj2", "adj2"], [16667, 16667, 0, 0]), round2DiagRect: A(["r", "r", "r", "r"], ["adj1", "adj2", "adj1", "adj2"], [16667, 0, 16667, 0]), snip1Rect: A(["n", "s", "n", "n"], [null, "adj", null, null], [0, 16667, 0, 0]), snip2SameRect: A(["s", "s", "s", "s"], ["adj1", "adj1", "adj2", "adj2"], [16667, 16667, 0, 0]), snip2DiagRect: A(["s", "s", "s", "s"], ["adj1", "adj2", "adj1", "adj2"], [0, 16667, 0, 16667]), snipRoundRect: A(["r", "s", "n", "n"], ["adj1", "adj2", null, null], [16667, 16667, 0, 0]), plaque: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * Math.min(h(a3, "adj", 16667), 0.5);
  return `M ${e($3)} 0 L ${e(t2 - $3)} 0 A ${e($3)} ${e($3)} 0 0 0 ${e(t2)} ${e($3)} L ${e(t2)} ${e(n2 - $3)} A ${e($3)} ${e($3)} 0 0 0 ${e(t2 - $3)} ${e(n2)} L ${e($3)} ${e(n2)} A ${e($3)} ${e($3)} 0 0 0 0 ${e(n2 - $3)} L 0 ${e($3)} A ${e($3)} ${e($3)} 0 0 0 ${e($3)} 0 Z`;
}, bevel: (t2, n2, a3) => P(t2, n2, Math.min(t2, n2) * Math.min(h(a3, "adj", 12500), 0.5)), cornerTabs: y("q"), squareTabs: y("s"), plaqueTabs: y("c"), frame: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * Math.min(h(a3, "adj1", 12500), 0.5);
  return c([[0, 0], [t2, 0], [t2, n2], [0, n2]]) + " " + c([[$3, $3], [$3, n2 - $3], [t2 - $3, n2 - $3], [t2 - $3, $3]]);
}, halfFrame: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * h(a3, "adj1", 33333), r2 = Math.min(t2, n2) * h(a3, "adj2", 33333);
  return c([[0, 0], [t2, 0], [t2 - r2, $3], [r2, $3], [r2, n2 - $3], [0, n2]]);
}, corner: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * h(a3, "adj1", 5e4), r2 = Math.min(t2, n2) * h(a3, "adj2", 5e4);
  return c([[0, 0], [r2, 0], [r2, n2 - $3], [t2, n2 - $3], [t2, n2], [0, n2]]);
}, diagStripe: (t2, n2, a3) => {
  const $3 = Math.min(h(a3, "adj", 5e4), 1);
  return c([[0, n2 * (1 - $3)], [t2 * (1 - $3), 0], [t2, 0], [0, n2]]);
}, foldedCorner: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * h(a3, "adj", 16667);
  return c([[0, 0], [t2, 0], [t2, n2 - $3], [t2 - $3, n2], [0, n2]]) + ` M ${e(t2 - $3)} ${e(n2)} L ${e(t2 - $3 * 0.72)} ${e(n2 - $3 * 0.72)} L ${e(t2)} ${e(n2 - $3)} Z`;
}, ellipse: (t2, n2) => j(t2 / 2, n2 / 2, t2 / 2, n2 / 2), triangle: (t2, n2, a3) => c([[t2 * h(a3, "adj", 5e4), 0], [t2, n2], [0, n2]]), rtTriangle: (t2, n2) => c([[0, 0], [t2, n2], [0, n2]]), diamond: (t2, n2) => c([[t2 / 2, 0], [t2, n2 / 2], [t2 / 2, n2], [0, n2 / 2]]), parallelogram: (t2, n2, a3) => {
  const $3 = Math.min(t2, Math.min(t2, n2) * h(a3, "adj", 25e3));
  return c([[$3, 0], [t2, 0], [t2 - $3, n2], [0, n2]]);
}, trapezoid: (t2, n2, a3) => {
  const $3 = Math.min(t2 / 2, Math.min(t2, n2) * h(a3, "adj", 25e3));
  return c([[$3, 0], [t2 - $3, 0], [t2, n2], [0, n2]]);
}, nonIsoscelesTrapezoid: (t2, n2, a3) => c([[t2 * h(a3, "adj1", 25e3), 0], [t2 - t2 * h(a3, "adj2", 25e3), 0], [t2, n2], [0, n2]]), pentagon: L(5, -90), heptagon: L(7, -90), decagon: L(10, -90), dodecagon: L(12, -90), hexagon: (t2, n2, a3) => {
  const $3 = Math.min(t2 / 2, Math.min(t2, n2) * h(a3, "adj", 25e3));
  return c([[$3, 0], [t2 - $3, 0], [t2, n2 / 2], [t2 - $3, n2], [$3, n2], [0, n2 / 2]]);
}, octagon: (t2, n2, a3) => {
  const $3 = Math.min(Math.min(t2, n2) / 2, Math.min(t2, n2) * h(a3, "adj", 29289));
  return c([[$3, 0], [t2 - $3, 0], [t2, $3], [t2, n2 - $3], [t2 - $3, n2], [$3, n2], [0, n2 - $3], [0, $3]]);
}, homePlate: (t2, n2, a3) => {
  const $3 = Math.min(t2, Math.min(t2, n2) * h(a3, "adj", 5e4));
  return c([[0, 0], [t2 - $3, 0], [t2, n2 / 2], [t2 - $3, n2], [0, n2]]);
}, chevron: (t2, n2, a3) => {
  const $3 = Math.min(t2, Math.min(t2, n2) * h(a3, "adj", 5e4));
  return c([[0, 0], [t2 - $3, 0], [t2, n2 / 2], [t2 - $3, n2], [0, n2], [$3, n2 / 2]]);
}, plus: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * Math.min(h(a3, "adj", 25e3), 0.5);
  return c([[$3, 0], [t2 - $3, 0], [t2 - $3, $3], [t2, $3], [t2, n2 - $3], [t2 - $3, n2 - $3], [t2 - $3, n2], [$3, n2], [$3, n2 - $3], [0, n2 - $3], [0, $3], [$3, $3]]);
}, teardrop: (t2, n2, a3) => {
  const $3 = Math.max(0, h(a3, "adj", 1e5)), r2 = Math.SQRT1_2 + $3 * (1 - Math.SQRT1_2), o4 = t2 / 2, i4 = n2 / 2;
  return `M 0 ${e(i4)} ${M(o4, i4, t2 / 2, n2 / 2, 180, 90)} L ${e(o4 + t2 / 2 * r2)} ${e(i4 - n2 / 2 * r2)} L ${e(t2)} ${e(i4)} ${M(o4, i4, t2 / 2, n2 / 2, 0, 180)} Z`;
}, can: (t2, n2, a3) => {
  const $3 = Math.min(n2 / 2, n2 * h(a3, "adj", 25e3) / 2);
  return `M 0 ${e($3)} ${M(t2 / 2, $3, t2 / 2, $3, 180, 180)} L ${e(t2)} ${e(n2 - $3)} ${M(t2 / 2, n2 - $3, t2 / 2, $3, 0, 180)} Z ` + l(t2 / 2, $3, t2 / 2, $3);
}, cube: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * Math.min(h(a3, "adj", 25e3), 0.5);
  return c([[0, $3], [$3, 0], [t2, 0], [t2, n2 - $3], [t2 - $3, n2], [0, n2]]) + " " + m([[0, $3], [t2 - $3, $3], [t2, 0]]) + " " + m([[t2 - $3, $3], [t2 - $3, n2]]);
}, donut: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * Math.min(h(a3, "adj", 25e3), 0.5);
  return j(t2 / 2, n2 / 2, t2 / 2, n2 / 2) + " " + j(t2 / 2, n2 / 2, t2 / 2 - $3, n2 / 2 - $3, true);
}, noSmoking: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * Math.min(h(a3, "adj", 18750), 0.5), r2 = t2 / 2 - $3, e3 = n2 / 2 - $3, i4 = t2 / 2, u4 = n2 / 2, s4 = $3 / 2, M4 = Math.cos(o(-45)), d4 = Math.sin(o(-45)), m4 = -d4, l3 = M4, [L4, p4] = [i4 - M4 * r2, u4 - d4 * e3], [f4, A4] = [i4 + M4 * r2, u4 + d4 * e3], C4 = c([[L4 + m4 * s4, p4 + l3 * s4], [f4 + m4 * s4, A4 + l3 * s4], [f4 - m4 * s4, A4 - l3 * s4], [L4 - m4 * s4, p4 - l3 * s4]]);
  return j(i4, u4, t2 / 2, n2 / 2) + " " + j(i4, u4, r2, e3, true) + " " + C4;
}, pie: (t2, n2, a3) => {
  const $3 = u(a3, "adj1", 0), r2 = ((u(a3, "adj2", 270 * 6e4) - $3) % 360 + 360) % 360, [o4, i4] = s(t2 / 2, n2 / 2, t2 / 2, n2 / 2, $3);
  return `M ${e(t2 / 2)} ${e(n2 / 2)} L ${e(o4)} ${e(i4)} ${M(t2 / 2, n2 / 2, t2 / 2, n2 / 2, $3, r2)} Z`;
}, pieWedge: (t2, n2) => `M 0 ${e(n2)} ${M(t2, n2, t2, n2, 180, 90)} L ${e(t2)} ${e(n2)} Z`, chord: (t2, n2, a3) => {
  const $3 = u(a3, "adj1", 27e5), r2 = ((u(a3, "adj2", 270 * 6e4) - $3) % 360 + 360) % 360;
  return d(t2 / 2, n2 / 2, t2 / 2, n2 / 2, $3, r2) + " Z";
}, arc: (t2, n2, a3) => {
  const $3 = u(a3, "adj1", 162e5), r2 = ((u(a3, "adj2", 0) - $3) % 360 + 360) % 360;
  return i(d(t2 / 2, n2 / 2, t2 / 2, n2 / 2, $3, r2));
}, blockArc: (t2, n2, a3) => {
  const $3 = u(a3, "adj1", 108e5), r2 = ((u(a3, "adj2", 0) - $3) % 360 + 360) % 360, o4 = Math.min(t2, n2) * Math.min(h(a3, "adj3", 25e3), 0.5), [i4, c4] = s(t2 / 2, n2 / 2, t2 / 2 - o4, n2 / 2 - o4, $3 + r2);
  return d(t2 / 2, n2 / 2, t2 / 2, n2 / 2, $3, r2) + ` L ${e(i4)} ${e(c4)} ${M(t2 / 2, n2 / 2, t2 / 2 - o4, n2 / 2 - o4, $3 + r2, -r2)} Z`;
}, cloud: (t2, n2) => {
  const a3 = (n3) => n3 * t2, $3 = (t3) => t3 * n2, r2 = (t3, n3, r3, o4, i4, h4) => `C ${e(a3(t3))} ${e($3(n3))} ${e(a3(r3))} ${e($3(o4))} ${e(a3(i4))} ${e($3(h4))} `;
  return `M ${e(a3(0.2))} ${e($3(0.79))} ` + r2(0.06, 0.79, 0, 0.66, 0.07, 0.55) + r2(0, 0.43, 0.1, 0.31, 0.22, 0.34) + r2(0.25, 0.16, 0.44, 0.09, 0.56, 0.19) + r2(0.65, 0.05, 0.86, 0.09, 0.88, 0.26) + r2(1, 0.3, 1.01, 0.48, 0.92, 0.56) + r2(1, 0.69, 0.9, 0.83, 0.76, 0.79) + r2(0.68, 0.91, 0.5, 0.93, 0.42, 0.84) + r2(0.36, 0.91, 0.25, 0.89, 0.2, 0.79) + "Z";
}, heart: (t2, n2) => {
  const a3 = (n3) => n3 * t2, $3 = (t3) => t3 * n2;
  return `M ${e(a3(0.5))} ${e($3(1))} C ${e(a3(-0.06))} ${e($3(0.53))} ${e(a3(0.08))} ${e($3(-0.11))} ${e(a3(0.5))} ${e($3(0.25))} C ${e(a3(0.92))} ${e($3(-0.11))} ${e(a3(1.06))} ${e($3(0.53))} ${e(a3(0.5))} ${e($3(1))} Z`;
}, lightningBolt: (t2, n2) => c([[0.55, 0], [1, 0.55], [0.68, 0.55], [0.8, 1], [0, 0.42], [0.42, 0.42]].map(([a3, $3]) => [a3 * t2, $3 * n2])), sun: (t2, n2, a3) => {
  const $3 = Math.min(h(a3, "adj", 25e3), 0.45), r2 = t2 / 2, o4 = n2 / 2, i4 = r2 * (1 - $3 * 1.4), u4 = o4 * (1 - $3 * 1.4), c4 = [];
  for (let t3 = 0; t3 < 8; t3++) {
    const n3 = t3 * 45, [a4, $4] = s(r2, o4, i4, u4, n3 - 9), [h4, M4] = s(r2, o4, r2, o4, n3), [d4, m4] = s(r2, o4, i4, u4, n3 + 9);
    c4.push(`M ${e(a4)} ${e($4)} L ${e(h4)} ${e(M4)} L ${e(d4)} ${e(m4)} Z`);
  }
  return j(r2, o4, i4, u4) + " " + c4.join(" ");
}, moon: (t2, n2, a3) => {
  const $3 = h(a3, "adj", 5e4);
  return `M ${e(t2)} 0 C ${e(t2 * (1 - $3 * 1.6))} ${e(n2 * 0.15)} ${e(t2 * (1 - $3 * 1.6))} ${e(n2 * 0.85)} ${e(t2)} ${e(n2)} C ${e(t2 * 0.1)} ${e(n2 * 0.92)} ${e(t2 * 0.1)} ${e(n2 * 0.08)} ${e(t2)} 0 Z`;
}, smileyFace: (t2, n2, a3) => {
  const $3 = n2 * h(a3, "adj", 4653) * 2;
  return j(t2 / 2, n2 / 2, t2 / 2, n2 / 2) + " " + j(t2 * 0.32, n2 * 0.35, t2 * 0.055, n2 * 0.08, true) + " " + j(t2 * 0.68, n2 * 0.35, t2 * 0.055, n2 * 0.08, true) + ` M ${e(t2 * 0.26)} ${e(n2 * 0.63)} Q ${e(t2 * 0.5)} ${e(n2 * 0.85 + $3)} ${e(t2 * 0.74)} ${e(n2 * 0.63)} Q ${e(t2 * 0.5)} ${e(n2 * 0.85 + $3)} ${e(t2 * 0.26)} ${e(n2 * 0.63)}`;
}, irregularSeal1: (t2, n2) => c([[0.09, 0.28], [0.24, 0.35], [0.13, 0.09], [0.35, 0.26], [0.42, 0], [0.53, 0.24], [0.72, 0.06], [0.7, 0.31], [0.93, 0.24], [0.81, 0.45], [1, 0.53], [0.83, 0.64], [0.96, 0.83], [0.73, 0.79], [0.75, 1], [0.56, 0.86], [0.45, 1], [0.38, 0.83], [0.19, 0.94], [0.23, 0.72], [0, 0.75], [0.16, 0.58], [0, 0.45]].map(([a3, $3]) => [a3 * t2, $3 * n2])), irregularSeal2: (t2, n2) => c([[0.11, 0.32], [0.25, 0.28], [0.15, 0.11], [0.36, 0.2], [0.4, 0.02], [0.55, 0.17], [0.68, 0], [0.71, 0.2], [0.9, 0.14], [0.85, 0.36], [1, 0.42], [0.86, 0.55], [0.98, 0.72], [0.79, 0.72], [0.82, 0.93], [0.63, 0.82], [0.55, 1], [0.44, 0.85], [0.28, 0.96], [0.28, 0.76], [0.06, 0.8], [0.17, 0.62], [0, 0.5]].map(([a3, $3]) => [a3 * t2, $3 * n2])), gear6: (t2, n2) => B(t2, n2, 6), gear9: (t2, n2) => B(t2, n2, 9), funnel: (t2, n2) => {
  const a3 = n2 * 0.1;
  return `M 0 ${e(a3)} ${M(t2 / 2, a3, t2 / 2, a3, 180, 180)} L ${e(t2 * 0.56)} ${e(n2 * 0.72)} L ${e(t2 * 0.56)} ${e(n2)} L ${e(t2 * 0.44)} ${e(n2)} L ${e(t2 * 0.44)} ${e(n2 * 0.72)} Z`;
}, star4: p(4, 0.3), star5: p(5, 0.382), star6: p(6, 0.577), star7: p(7, 0.605), star8: p(8, 0.375), star10: p(10, 0.618), star12: p(12, 0.5), star16: p(16, 0.375), star24: p(24, 0.375), star32: p(32, 0.375), rightArrow: w("r"), leftArrow: w("l"), upArrow: w("u"), downArrow: w("d"), leftRightArrow: (t2, n2, a3) => {
  const $3 = n2 * Math.min(h(a3, "adj1", 5e4), 1) / 2, r2 = Math.min(t2 / 2, n2 * h(a3, "adj2", 5e4)), e3 = n2 / 2;
  return c([[0, e3], [r2, 0], [r2, e3 - $3], [t2 - r2, e3 - $3], [t2 - r2, 0], [t2, e3], [t2 - r2, n2], [t2 - r2, e3 + $3], [r2, e3 + $3], [r2, n2]]);
}, upDownArrow: (t2, n2, a3) => {
  const $3 = t2 * Math.min(h(a3, "adj1", 5e4), 1) / 2, r2 = Math.min(n2 / 2, t2 * h(a3, "adj2", 5e4)), e3 = t2 / 2;
  return c([[e3, 0], [t2, r2], [e3 + $3, r2], [e3 + $3, n2 - r2], [t2, n2 - r2], [e3, n2], [0, n2 - r2], [e3 - $3, n2 - r2], [e3 - $3, r2], [0, r2]]);
}, quadArrow: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * h(a3, "adj2", 22500) / 2, r2 = Math.min(t2, n2) * h(a3, "adj3", 25e3), e3 = t2 / 2, o4 = n2 / 2;
  return c([[e3, 0], [e3 + r2, r2], [e3 + $3, r2], [e3 + $3, o4 - $3], [t2 - r2, o4 - $3], [t2 - r2, o4 - r2], [t2, o4], [t2 - r2, o4 + r2], [t2 - r2, o4 + $3], [e3 + $3, o4 + $3], [e3 + $3, n2 - r2], [e3 + r2, n2 - r2], [e3, n2], [e3 - r2, n2 - r2], [e3 - $3, n2 - r2], [e3 - $3, o4 + $3], [r2, o4 + $3], [r2, o4 + r2], [0, o4], [r2, o4 - r2], [r2, o4 - $3], [e3 - $3, o4 - $3], [e3 - $3, r2], [e3 - r2, r2]]);
}, leftRightUpArrow: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * h(a3, "adj2", 22500) / 2, r2 = Math.min(t2, n2) * h(a3, "adj3", 25e3), e3 = t2 / 2, o4 = n2 - $3;
  return c([[e3, 0], [e3 + r2, r2], [e3 + $3, r2], [e3 + $3, o4 - $3], [t2 - r2, o4 - $3], [t2 - r2, o4 - r2], [t2, o4], [t2 - r2, o4 + r2], [t2 - r2, n2], [r2, n2], [r2, o4 + r2], [0, o4], [r2, o4 - r2], [r2, o4 - $3], [e3 - $3, o4 - $3], [e3 - $3, r2], [e3 - r2, r2]]);
}, bentUpArrow: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * Math.min(h(a3, "adj3", 25e3), 0.6), r2 = Math.min(t2 / 2, Math.max(Math.min(t2, n2) * h(a3, "adj1", 25e3), $3 * 0.6)), e3 = Math.min(n2, Math.min(t2, n2) * h(a3, "adj2", 25e3)), o4 = t2 - r2;
  return c([[0, n2], [o4 + $3 / 2, n2], [o4 + $3 / 2, e3], [t2, e3], [o4, 0], [o4 - r2, e3], [o4 - $3 / 2, e3], [o4 - $3 / 2, n2 - $3], [0, n2 - $3]]);
}, leftUpArrow: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2), r2 = $3 * Math.min(h(a3, "adj1", 25e3), 0.6), e3 = Math.min($3 / 2, Math.max($3 * h(a3, "adj2", 25e3), r2 * 0.6)), o4 = Math.min($3, $3 * h(a3, "adj3", 25e3));
  return c([[t2 - e3, 0], [t2, o4], [t2 - e3 + r2 / 2, o4], [t2 - e3 + r2 / 2, n2], [o4, n2], [0, n2 - e3], [o4, n2 - 2 * e3], [o4, n2 - e3 - r2 / 2], [t2 - e3 - r2 / 2, n2 - e3 - r2 / 2], [t2 - e3 - r2 / 2, o4], [t2 - 2 * e3, o4]]);
}, bentArrow: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * h(a3, "adj1", 25e3), r2 = Math.min(Math.min(t2, n2) * h(a3, "adj2", 25e3), n2 / 2), e3 = r2;
  return c([[0, n2], [0, e3 - $3 / 2], [t2 - r2, e3 - $3 / 2], [t2 - r2, e3 - r2], [t2, e3], [t2 - r2, e3 + r2], [t2 - r2, e3 + $3 / 2], [$3, e3 + $3 / 2], [$3, n2]]);
}, uturnArrow: (t2, n2, a3) => {
  const $3 = Math.min(t2 / 3, t2 * Math.max(h(a3, "adj1", 25e3), 0.08)), r2 = $3 / 2, o4 = Math.min($3 * 1.1, t2 / 4), i4 = Math.min(n2 / 3, o4 * 1.6), u4 = t2 - o4, c4 = (u4 + r2) / 2, s4 = Math.min(c4, n2 - i4 - 4);
  return `M 0 ${e(n2)} L 0 ${e(s4)} A ${e(c4)} ${e(s4)} 0 0 1 ${e(c4 * 2)} ${e(s4)} L ${e(u4 + r2)} ${e(n2 - i4)} L ${e(u4 + o4)} ${e(n2 - i4)} L ${e(u4)} ${e(n2)} L ${e(u4 - o4)} ${e(n2 - i4)} L ${e(u4 - r2)} ${e(n2 - i4)} L ${e(u4 - r2)} ${e(s4)} A ${e(c4 - $3)} ${e(s4 - $3)} 0 0 0 ${e($3)} ${e(s4)} L ${e($3)} ${e(n2)} Z`;
}, curvedRightArrow: (t2, n2, a3) => {
  const $3 = n2 * Math.min(h(a3, "adj1", 25e3), 0.5), r2 = Math.min(t2, n2) * Math.min(h(a3, "adj3", 25e3), 0.4);
  return S(0, n2, t2 - r2, n2 - r2, $3, r2, 270, 360);
}, curvedLeftArrow: (t2, n2, a3) => {
  const $3 = n2 * Math.min(h(a3, "adj1", 25e3), 0.5), r2 = Math.min(t2, n2) * Math.min(h(a3, "adj3", 25e3), 0.4);
  return S(t2, n2, t2 - r2, n2 - r2, $3, r2, 270, 180);
}, curvedUpArrow: (t2, n2, a3) => {
  const $3 = t2 * Math.min(h(a3, "adj1", 25e3), 0.5), r2 = Math.min(t2, n2) * Math.min(h(a3, "adj3", 25e3), 0.4);
  return S(t2, n2, t2 - r2, n2 - r2, $3, r2, 180, 270);
}, curvedDownArrow: (t2, n2, a3) => {
  const $3 = t2 * Math.min(h(a3, "adj1", 25e3), 0.5), r2 = Math.min(t2, n2) * Math.min(h(a3, "adj3", 25e3), 0.4);
  return S(t2, 0, t2 - r2, n2 - r2, $3, r2, 180, 90);
}, stripedRightArrow: (t2, n2, a3) => {
  const $3 = n2 * Math.min(h(a3, "adj1", 5e4), 1) / 2, r2 = Math.min(t2, n2 * h(a3, "adj2", 5e4)), e3 = n2 / 2, o4 = t2 * 0.05;
  return c([[o4 * 2.4, e3 - $3], [t2 - r2, e3 - $3], [t2 - r2, 0], [t2, e3], [t2 - r2, n2], [t2 - r2, e3 + $3], [o4 * 2.4, e3 + $3]]) + " " + c([[0, e3 - $3], [o4, e3 - $3], [o4, e3 + $3], [0, e3 + $3]]) + " " + c([[o4 * 1.4, e3 - $3], [o4 * 2, e3 - $3], [o4 * 2, e3 + $3], [o4 * 1.4, e3 + $3]]);
}, notchedRightArrow: (t2, n2, a3) => {
  const $3 = n2 * Math.min(h(a3, "adj1", 5e4), 1) / 2, r2 = Math.min(t2, n2 * h(a3, "adj2", 5e4)), e3 = n2 / 2;
  return c([[0, e3 - $3], [t2 - r2, e3 - $3], [t2 - r2, 0], [t2, e3], [t2 - r2, n2], [t2 - r2, e3 + $3], [0, e3 + $3], [r2 * 0.5, e3]]);
}, circularArrow: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) / 2, r2 = $3 * Math.min(Math.max(h(a3, "adj1", 12500), 0.06), 0.35), e3 = r2 * 1.6, o4 = $3 - e3;
  return S(t2 / 2, n2 / 2, o4, o4, r2, e3, 200, 450);
}, leftCircularArrow: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) / 2, r2 = $3 * Math.min(Math.max(h(a3, "adj1", 12500), 0.06), 0.35), e3 = r2 * 1.6;
  return S(t2 / 2, n2 / 2, $3 - e3, $3 - e3, r2, e3, -20, -270);
}, leftRightCircularArrow: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) / 2, r2 = $3 * Math.min(Math.max(h(a3, "adj1", 12500), 0.06), 0.35), e3 = r2 * 1.6;
  return S(t2 / 2, n2 / 2, $3 - e3, $3 - e3, r2, e3, 200, 430, true);
}, swooshArrow: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2), r2 = $3 * Math.min(Math.max(h(a3, "adj2", 16667), 0.04), 0.4), o4 = $3 * Math.min(Math.max(h(a3, "adj1", 25e3), 0.08), 0.6), i4 = r2 * 1.6;
  return `M 0 ${e(n2)} Q ${e(t2 * 0.65)} ${e(n2 * 0.95)} ${e(t2 - o4 * 1.2)} ${e(o4 * 0.1)} L ${e(t2)} 0 L ${e(t2 - o4 * 0.1)} ${e(o4 * 1.2)} Q ${e(t2 * 0.65 - i4)} ${e(n2 * 0.95 - i4)} 0 ${e(n2)} Z`;
}, rightArrowCallout: g("r"), leftArrowCallout: g("l"), upArrowCallout: g("u"), downArrowCallout: g("d"), leftRightArrowCallout: (t2, n2, a3) => {
  const $3 = n2 * h(a3, "adj1", 18515) / 2, r2 = Math.min(t2 / 3, n2 * h(a3, "adj2", 18515)), e3 = t2 * h(a3, "adj4", 48123), o4 = n2 / 2, i4 = (t2 - e3) / 2, u4 = (t2 + e3) / 2;
  return c([[0, o4], [r2, 0], [r2, o4 - $3], [i4, o4 - $3], [i4, 0], [u4, 0], [u4, o4 - $3], [t2 - r2, o4 - $3], [t2 - r2, 0], [t2, o4], [t2 - r2, n2], [t2 - r2, o4 + $3], [u4, o4 + $3], [u4, n2], [i4, n2], [i4, o4 + $3], [r2, o4 + $3], [r2, n2]]);
}, upDownArrowCallout: (t2, n2, a3) => {
  const $3 = t2 * h(a3, "adj1", 18515) / 2, r2 = Math.min(t2 / 2, $3 + t2 * h(a3, "adj2", 18515)), e3 = Math.min(n2 * 0.3, t2 * h(a3, "adj3", 18515)), o4 = Math.max(0, Math.min(n2 * h(a3, "adj4", 48123), n2 - 2.4 * e3)), i4 = t2 / 2, u4 = (n2 - o4) / 2, s4 = (n2 + o4) / 2;
  return c([[i4, 0], [i4 + r2, e3], [i4 + $3, e3], [i4 + $3, u4], [t2, u4], [t2, s4], [i4 + $3, s4], [i4 + $3, n2 - e3], [i4 + r2, n2 - e3], [i4, n2], [i4 - r2, n2 - e3], [i4 - $3, n2 - e3], [i4 - $3, s4], [0, s4], [0, u4], [i4 - $3, u4], [i4 - $3, e3], [i4 - r2, e3]]);
}, quadArrowCallout: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2), r2 = $3 * h(a3, "adj3", 18515), e3 = $3 * h(a3, "adj2", 18515) / 2, o4 = Math.min(Math.max($3 * h(a3, "adj4", 48123) / 2, e3 * 1.2), $3 / 2 - r2), i4 = t2 / 2, u4 = n2 / 2;
  return c([[i4, 0], [i4 + r2, r2], [i4 + e3, r2], [i4 + e3, u4 - o4], [i4 + o4, u4 - o4], [i4 + o4, u4 - e3], [t2 - r2, u4 - e3], [t2 - r2, u4 - r2], [t2, u4], [t2 - r2, u4 + r2], [t2 - r2, u4 + e3], [i4 + o4, u4 + e3], [i4 + o4, u4 + o4], [i4 + e3, u4 + o4], [i4 + e3, n2 - r2], [i4 + r2, n2 - r2], [i4, n2], [i4 - r2, n2 - r2], [i4 - e3, n2 - r2], [i4 - e3, u4 + o4], [i4 - o4, u4 + o4], [i4 - o4, u4 + e3], [r2, u4 + e3], [r2, u4 + r2], [0, u4], [r2, u4 - r2], [r2, u4 - e3], [i4 - o4, u4 - e3], [i4 - o4, u4 - o4], [i4 - e3, u4 - o4], [i4 - e3, r2], [i4 - r2, r2]]);
}, mathPlus: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * h(a3, "adj1", 23520) / 2, r2 = t2 / 2, e3 = n2 / 2, o4 = t2 * 0.45, i4 = n2 * 0.45;
  return c([[r2 - $3, e3 - i4], [r2 + $3, e3 - i4], [r2 + $3, e3 - $3], [r2 + o4, e3 - $3], [r2 + o4, e3 + $3], [r2 + $3, e3 + $3], [r2 + $3, e3 + i4], [r2 - $3, e3 + i4], [r2 - $3, e3 + $3], [r2 - o4, e3 + $3], [r2 - o4, e3 - $3], [r2 - $3, e3 - $3]]);
}, mathMinus: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * h(a3, "adj1", 23520) / 2;
  return c([[t2 * 0.05, n2 / 2 - $3], [t2 * 0.95, n2 / 2 - $3], [t2 * 0.95, n2 / 2 + $3], [t2 * 0.05, n2 / 2 + $3]]);
}, mathMultiply: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * h(a3, "adj1", 23520) / 2, r2 = t2 / 2, e3 = n2 / 2, o4 = Math.min(t2, n2) * 0.42, i4 = $3 * Math.SQRT2;
  return c([[r2 - o4, e3 - o4 + i4], [r2 - o4 + i4, e3 - o4], [r2, e3 - i4], [r2 + o4 - i4, e3 - o4], [r2 + o4, e3 - o4 + i4], [r2 + i4, e3], [r2 + o4, e3 + o4 - i4], [r2 + o4 - i4, e3 + o4], [r2, e3 + i4], [r2 - o4 + i4, e3 + o4], [r2 - o4, e3 + o4 - i4], [r2 - i4, e3]]);
}, mathDivide: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * h(a3, "adj1", 23520) / 2, r2 = Math.min(t2, n2) * 0.09;
  return c([[t2 * 0.08, n2 / 2 - $3], [t2 * 0.92, n2 / 2 - $3], [t2 * 0.92, n2 / 2 + $3], [t2 * 0.08, n2 / 2 + $3]]) + " " + j(t2 / 2, n2 * 0.22, r2, r2) + " " + j(t2 / 2, n2 * 0.78, r2, r2);
}, mathEqual: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * h(a3, "adj1", 23520) / 2, r2 = n2 * h(a3, "adj2", 11760);
  return c([[t2 * 0.05, n2 / 2 - r2 - $3], [t2 * 0.95, n2 / 2 - r2 - $3], [t2 * 0.95, n2 / 2 - r2 + $3], [t2 * 0.05, n2 / 2 - r2 + $3]]) + " " + c([[t2 * 0.05, n2 / 2 + r2 - $3], [t2 * 0.95, n2 / 2 + r2 - $3], [t2 * 0.95, n2 / 2 + r2 + $3], [t2 * 0.05, n2 / 2 + r2 + $3]]);
}, mathNotEqual: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * h(a3, "adj1", 23520) / 2, r2 = n2 * 0.16;
  return c([[t2 * 0.05, n2 / 2 - r2 - $3], [t2 * 0.95, n2 / 2 - r2 - $3], [t2 * 0.95, n2 / 2 - r2 + $3], [t2 * 0.05, n2 / 2 - r2 + $3]]) + " " + c([[t2 * 0.05, n2 / 2 + r2 - $3], [t2 * 0.95, n2 / 2 + r2 - $3], [t2 * 0.95, n2 / 2 + r2 + $3], [t2 * 0.05, n2 / 2 + r2 + $3]]) + " " + c([[t2 * 0.42, 0], [t2 * 0.56, 0], [t2 * 0.62, n2], [t2 * 0.48, n2]]);
}, leftBracket: (t2, n2, a3) => {
  const $3 = Math.min(n2 / 2, n2 * h(a3, "adj", 8333));
  return i(`M ${e(t2)} 0 L ${e($3)} 0 A ${e($3)} ${e($3)} 0 0 0 0 ${e($3)} L 0 ${e(n2 - $3)} A ${e($3)} ${e($3)} 0 0 0 ${e($3)} ${e(n2)} L ${e(t2)} ${e(n2)}`);
}, rightBracket: (t2, n2, a3) => {
  const $3 = Math.min(n2 / 2, n2 * h(a3, "adj", 8333));
  return i(`M 0 0 L ${e(t2 - $3)} 0 A ${e($3)} ${e($3)} 0 0 1 ${e(t2)} ${e($3)} L ${e(t2)} ${e(n2 - $3)} A ${e($3)} ${e($3)} 0 0 1 ${e(t2 - $3)} ${e(n2)} L 0 ${e(n2)}`);
}, bracketPair: (t2, n2, a3) => {
  const $3 = Math.min(Math.min(t2, n2) / 2, Math.min(t2, n2) * h(a3, "adj", 16667));
  return i(`M ${e($3)} 0 A ${e($3)} ${e($3)} 0 0 0 0 ${e($3)} L 0 ${e(n2 - $3)} A ${e($3)} ${e($3)} 0 0 0 ${e($3)} ${e(n2)} M ${e(t2 - $3)} 0 A ${e($3)} ${e($3)} 0 0 1 ${e(t2)} ${e($3)} L ${e(t2)} ${e(n2 - $3)} A ${e($3)} ${e($3)} 0 0 1 ${e(t2 - $3)} ${e(n2)}`);
}, leftBrace: (t2, n2, a3) => {
  const $3 = Math.min(n2 / 4, n2 * h(a3, "adj1", 8333)), r2 = n2 * h(a3, "adj2", 5e4);
  return i(`M ${e(t2)} 0 A ${e(t2)} ${e($3)} 0 0 0 ${e(t2 / 2)} ${e($3)} L ${e(t2 / 2)} ${e(r2 - $3)} A ${e(t2 / 2)} ${e($3)} 0 0 1 0 ${e(r2)} A ${e(t2 / 2)} ${e($3)} 0 0 1 ${e(t2 / 2)} ${e(r2 + $3)} L ${e(t2 / 2)} ${e(n2 - $3)} A ${e(t2)} ${e($3)} 0 0 0 ${e(t2)} ${e(n2)}`);
}, rightBrace: (t2, n2, a3) => {
  const $3 = Math.min(n2 / 4, n2 * h(a3, "adj1", 8333)), r2 = n2 * h(a3, "adj2", 5e4);
  return i(`M 0 0 A ${e(t2)} ${e($3)} 0 0 1 ${e(t2 / 2)} ${e($3)} L ${e(t2 / 2)} ${e(r2 - $3)} A ${e(t2 / 2)} ${e($3)} 0 0 0 ${e(t2)} ${e(r2)} A ${e(t2 / 2)} ${e($3)} 0 0 0 ${e(t2 / 2)} ${e(r2 + $3)} L ${e(t2 / 2)} ${e(n2 - $3)} A ${e(t2)} ${e($3)} 0 0 1 0 ${e(n2)}`);
}, bracePair: (t2, n2, a3) => {
  const $3 = Math.min(n2 / 4, n2 * h(a3, "adj", 8333)), r2 = t2 / 4;
  return i(`M ${e(r2)} 0 A ${e(r2)} ${e($3)} 0 0 0 ${e(r2)} ${e($3)} L ${e(r2)} ${e(n2 / 2 - $3)} A ${e(r2)} ${e($3)} 0 0 1 0 ${e(n2 / 2)} A ${e(r2)} ${e($3)} 0 0 1 ${e(r2)} ${e(n2 / 2 + $3)} L ${e(r2)} ${e(n2 - $3)} A ${e(r2)} ${e($3)} 0 0 0 ${e(r2)} ${e(n2)} M ${e(t2 - r2)} 0 A ${e(r2)} ${e($3)} 0 0 1 ${e(t2 - r2)} ${e($3)} L ${e(t2 - r2)} ${e(n2 / 2 - $3)} A ${e(r2)} ${e($3)} 0 0 0 ${e(t2)} ${e(n2 / 2)} A ${e(r2)} ${e($3)} 0 0 0 ${e(t2 - r2)} ${e(n2 / 2 + $3)} L ${e(t2 - r2)} ${e(n2 - $3)} A ${e(r2)} ${e($3)} 0 0 1 ${e(t2 - r2)} ${e(n2)}`);
}, ribbon: (t2, n2, a3) => {
  const $3 = n2 * h(a3, "adj1", 16667), r2 = t2 * h(a3, "adj2", 5e4) / 2, e3 = t2 / 2, o4 = [[0, 0], [e3 - r2, 0], [e3 - r2 + $3, n2 * 0.5], [e3 - r2, n2], [0, n2], [$3, n2 * 0.5]], i4 = [[t2, 0], [e3 + r2, 0], [e3 + r2 - $3, n2 * 0.5], [e3 + r2, n2], [t2, n2], [t2 - $3, n2 * 0.5]], u4 = [[e3 - r2, 0], [e3 + r2, 0], [e3 + r2, n2], [e3 - r2, n2]];
  return c(o4) + " " + c(i4) + " " + c(u4);
}, ribbon2: (t2, n2, a3) => {
  const $3 = n2 * h(a3, "adj1", 16667), r2 = t2 * h(a3, "adj2", 5e4) / 2, e3 = t2 / 2, o4 = [[e3 - r2, n2], [e3 + r2, n2], [e3 + r2, 0], [e3 - r2, 0]], i4 = [[0, n2], [e3 - r2, n2], [e3 - r2 + $3, n2 * 0.5], [e3 - r2, 0], [0, 0], [$3, n2 * 0.5]], u4 = [[t2, n2], [e3 + r2, n2], [e3 + r2 - $3, n2 * 0.5], [e3 + r2, 0], [t2, 0], [t2 - $3, n2 * 0.5]];
  return c(o4) + " " + c(i4) + " " + c(u4);
}, ellipseRibbon: (t2, n2, a3) => {
  const $3 = n2 * Math.min(h(a3, "adj3", 12500) * 2, 0.5), r2 = n2 * Math.min(h(a3, "adj1", 25e3), 0.35), o4 = t2 * Math.min(h(a3, "adj2", 5e4) / 2, 0.3), i4 = n2 * 0.12, u4 = `M 0 ${e(r2)} Q ${e(t2 / 2)} ${e(-r2)} ${e(t2)} ${e(r2)} L ${e(t2)} ${e(r2 + $3)} Q ${e(t2 / 2)} ${e($3 - r2)} 0 ${e(r2 + $3)} Z`, s4 = (t3) => c([[t3, r2 + $3 * 0.2], [t3 + o4, r2 + $3 * 0.2], [t3 + o4, n2], [t3 + o4 / 2, n2 - i4], [t3, n2]]);
  return `${u4} ${s4(0)} ${s4(t2 - o4)}`;
}, ellipseRibbon2: (t2, n2, a3) => {
  const $3 = n2 * Math.min(h(a3, "adj3", 12500) * 2, 0.5), r2 = n2 * Math.min(h(a3, "adj1", 25e3), 0.35), o4 = t2 * Math.min(h(a3, "adj2", 5e4) / 2, 0.3), i4 = n2 * 0.12, u4 = `M 0 ${e(n2 - r2)} Q ${e(t2 / 2)} ${e(n2 + r2)} ${e(t2)} ${e(n2 - r2)} L ${e(t2)} ${e(n2 - r2 - $3)} Q ${e(t2 / 2)} ${e(n2 + r2 - $3)} 0 ${e(n2 - r2 - $3)} Z`, s4 = (t3) => c([[t3, n2 - r2 - $3 * 0.2], [t3 + o4, n2 - r2 - $3 * 0.2], [t3 + o4, 0], [t3 + o4 / 2, i4], [t3, 0]]);
  return `${u4} ${s4(0)} ${s4(t2 - o4)}`;
}, leftRightRibbon: (t2, n2, a3) => {
  const $3 = Math.min(n2 * Math.min(h(a3, "adj1", 5e4), 1) / 2, n2 / 4), r2 = t2 * Math.min(h(a3, "adj2", 5e4), 0.9) / 2, e3 = Math.min((t2 / 2 - r2) * 0.6, Math.max(n2 * h(a3, "adj3", 16667) * 2, 1)), o4 = $3 * 1.8, i4 = t2 / 2, u4 = n2 / 2;
  return c([[0, u4], [e3, u4 - o4], [e3, u4 - $3], [i4 - r2, u4 - $3], [i4 - r2, 0], [i4 + r2, 0], [i4 + r2, u4 - $3], [t2 - e3, u4 - $3], [t2 - e3, u4 - o4], [t2, u4], [t2 - e3, u4 + o4], [t2 - e3, u4 + $3], [i4 + r2, u4 + $3], [i4 + r2, n2], [i4 - r2, n2], [i4 - r2, u4 + $3], [e3, u4 + $3], [e3, u4 + o4]]);
}, verticalScroll: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * Math.min(h(a3, "adj", 12500), 0.25);
  return `M ${e($3)} ${e($3)} L ${e($3)} ${e(n2 - $3)} A ${e($3)} ${e($3)} 0 0 0 ${e($3 * 2)} ${e(n2)} L ${e(t2)} ${e(n2)} L ${e(t2)} ${e($3)} A ${e($3)} ${e($3)} 0 0 0 ${e(t2 - $3 * 2)} ${e($3)} Z M ${e($3)} ${e($3)} A ${e($3)} ${e($3)} 0 0 1 ${e($3 * 2)} 0 L ${e(t2 - $3)} 0 A ${e($3)} ${e($3)} 0 0 1 ${e(t2 - $3 * 2)} ${e($3)} Z`;
}, horizontalScroll: (t2, n2, a3) => {
  const $3 = Math.min(t2, n2) * Math.min(h(a3, "adj", 12500), 0.25);
  return `M ${e($3)} ${e($3)} L ${e(t2 - $3)} ${e($3)} A ${e($3)} ${e($3)} 0 0 1 ${e(t2)} ${e($3 * 2)} L ${e(t2)} ${e(n2)} L ${e($3 * 2)} ${e(n2)} A ${e($3)} ${e($3)} 0 0 1 ${e($3)} ${e(n2 - $3 * 2)} Z M ${e($3)} ${e($3)} A ${e($3)} ${e($3)} 0 0 0 0 ${e($3 * 2)} L 0 ${e(n2 - $3)} A ${e($3)} ${e($3)} 0 0 0 ${e($3)} ${e(n2 - $3 * 2)} Z`;
}, wave: (t2, n2, a3) => {
  const $3 = n2 * Math.min(h(a3, "adj1", 12500), 0.4);
  return `M 0 ${e($3)} ${R($3, t2, $3, false)} L ${e(t2)} ${e(n2 - $3)} ${R(n2 - $3, t2, $3, true)} Z`;
}, doubleWave: (t2, n2, a3) => {
  const $3 = n2 * Math.min(h(a3, "adj1", 6250), 0.25), r2 = t2 / 8, o4 = `C ${e(r2)} ${e($3 - $3 * 2)} ${e(r2 * 3)} ${e($3 + $3 * 2)} ${e(t2 / 2)} ${e($3)} C ${e(t2 / 2 + r2)} ${e($3 - $3 * 2)} ${e(t2 / 2 + r2 * 3)} ${e($3 + $3 * 2)} ${e(t2)} ${e($3)}`, i4 = `C ${e(t2 - r2)} ${e(n2 - $3 + $3 * 2)} ${e(t2 - r2 * 3)} ${e(n2 - $3 - $3 * 2)} ${e(t2 / 2)} ${e(n2 - $3)} C ${e(t2 / 2 - r2)} ${e(n2 - $3 + $3 * 2)} ${e(t2 / 2 - r2 * 3)} ${e(n2 - $3 - $3 * 2)} 0 ${e(n2 - $3)}`;
  return `M 0 ${e($3)} ${o4} L ${e(t2)} ${e(n2 - $3)} ${i4} Z`;
}, wedgeRectCallout: (t2, n2, a3) => {
  const { x1: $3, x2: r2, y1: e3, y2: o4, top: i4, right: h4, bottom: u4, left: s4 } = Z(t2, n2, a3);
  return c([[0, 0], [$3, 0], i4, [r2, 0], [t2, 0], [t2, e3], h4, [t2, o4], [t2, n2], [r2, n2], u4, [$3, n2], [0, n2], [0, o4], s4, [0, e3]]);
}, wedgeRoundRectCallout: (t2, n2, a3) => {
  const { x1: $3, x2: r2, y1: o4, y2: i4, top: u4, right: c4, bottom: s4, left: M4 } = Z(t2, n2, a3), d4 = Math.min(t2, n2) * h(a3, "adj3", 16667), m4 = (t3, n3) => `A ${e(d4)} ${e(d4)} 0 0 1 ${e(t3)} ${e(n3)}`, l3 = (...t3) => t3.map(([t4, n3]) => `L ${e(t4)} ${e(n3)}`).join(" ");
  return [`M 0 ${e(d4)}`, m4(d4, 0), l3([$3, 0], u4, [r2, 0], [t2 - d4, 0]), m4(t2, d4), l3([t2, o4], c4, [t2, i4], [t2, n2 - d4]), m4(t2 - d4, n2), l3([r2, n2], s4, [$3, n2], [d4, n2]), m4(0, n2 - d4), l3([0, i4], M4, [0, o4]), "Z"].join(" ");
}, wedgeEllipseCallout: (t2, n2, a3) => {
  const [$3, r2] = b(t2, n2, a3), o4 = t2 / 2, i4 = n2 / 2, h4 = Math.atan2(r2 - i4, $3 - o4) * 180 / Math.PI, [u4, c4] = s(o4, i4, t2 / 2, n2 / 2, h4 + 8);
  return `M ${e(u4)} ${e(c4)} ${M(o4, i4, t2 / 2, n2 / 2, h4 + 8, 344)} L ${e($3)} ${e(r2)} Z`;
}, cloudCallout: (t2, n2, a3) => {
  const [$3, r2] = b(t2, n2, a3);
  return I.cloud(t2, n2 * 0.8, {}) + " " + j(t2 * 0.36, n2 * 0.88, t2 * 0.045, n2 * 0.045) + " " + j($3, r2, t2 * 0.025, n2 * 0.025);
}, borderCallout1: v(1, false), borderCallout2: v(2, false), borderCallout3: v(3, false), callout1: v(1, false), callout2: v(2, false), callout3: v(3, false), accentCallout1: v(1, true), accentCallout2: v(2, true), accentCallout3: v(3, true), accentBorderCallout1: v(1, true), accentBorderCallout2: v(2, true), accentBorderCallout3: v(3, true), flowChartProcess: (t2, n2) => c([[0, 0], [t2, 0], [t2, n2], [0, n2]]), flowChartAlternateProcess: (t2, n2) => {
  const a3 = Math.min(t2, n2) * 0.1667;
  return f(t2, n2, [a3, a3, a3, a3], ["r", "r", "r", "r"]);
}, flowChartDecision: (t2, n2) => c([[t2 / 2, 0], [t2, n2 / 2], [t2 / 2, n2], [0, n2 / 2]]), flowChartInputOutput: (t2, n2) => c([[t2 * 0.2, 0], [t2, 0], [t2 * 0.8, n2], [0, n2]]), flowChartPredefinedProcess: (t2, n2) => c([[0, 0], [t2, 0], [t2, n2], [0, n2]]) + " " + m([[t2 / 8, 0], [t2 / 8, n2]]) + " " + m([[t2 * 7 / 8, 0], [t2 * 7 / 8, n2]]), flowChartInternalStorage: (t2, n2) => c([[0, 0], [t2, 0], [t2, n2], [0, n2]]) + " " + m([[t2 / 8, 0], [t2 / 8, n2]]) + " " + m([[0, n2 / 8], [t2, n2 / 8]]), flowChartDocument: (t2, n2) => `M 0 0 L ${e(t2)} 0 L ${e(t2)} ${e(n2 * 0.84)} C ${e(t2 * 0.75)} ${e(n2 * 1.06)} ${e(t2 * 0.25)} ${e(n2 * 0.62)} 0 ${e(n2 * 0.84)} Z`, flowChartMultidocument: (t2, n2) => `M 0 ${e(n2 * 0.2)} L ${e(t2 * 0.9)} ${e(n2 * 0.2)} L ${e(t2 * 0.9)} ${e(n2 * 0.86)} C ${e(t2 * 0.68)} ${e(n2 * 1.04)} ${e(t2 * 0.22)} ${e(n2 * 0.66)} 0 ${e(n2 * 0.86)} Z ` + m([[t2 * 0.05, n2 * 0.1], [t2 * 0.95, n2 * 0.1], [t2 * 0.95, n2 * 0.76]]) + " " + m([[t2 * 0.1, 0], [t2, 0], [t2, n2 * 0.66]]), flowChartTerminator: (t2, n2) => {
  const a3 = Math.min(n2 / 2, t2 / 2);
  return `M ${e(a3)} 0 L ${e(t2 - a3)} 0 A ${e(a3)} ${e(n2 / 2)} 0 0 1 ${e(t2 - a3)} ${e(n2)} L ${e(a3)} ${e(n2)} A ${e(a3)} ${e(n2 / 2)} 0 0 1 ${e(a3)} 0 Z`;
}, flowChartPreparation: (t2, n2) => c([[t2 * 0.2, 0], [t2 * 0.8, 0], [t2, n2 / 2], [t2 * 0.8, n2], [t2 * 0.2, n2], [0, n2 / 2]]), flowChartManualInput: (t2, n2) => c([[0, n2 * 0.2], [t2, 0], [t2, n2], [0, n2]]), flowChartManualOperation: (t2, n2) => c([[0, 0], [t2, 0], [t2 * 0.8, n2], [t2 * 0.2, n2]]), flowChartConnector: (t2, n2) => j(t2 / 2, n2 / 2, t2 / 2, n2 / 2), flowChartOffpageConnector: (t2, n2) => c([[0, 0], [t2, 0], [t2, n2 * 0.8], [t2 / 2, n2], [0, n2 * 0.8]]), flowChartPunchedCard: (t2, n2) => c([[t2 * 0.2, 0], [t2, 0], [t2, n2], [0, n2], [0, n2 * 0.2]]), flowChartPunchedTape: (t2, n2) => `M 0 ${e(n2 * 0.11)} ${R(n2 * 0.11, t2, n2 * 0.11, false)} L ${e(t2)} ${e(n2 * 0.89)} ${R(n2 * 0.89, t2, n2 * 0.11, true)} Z`, flowChartSummingJunction: (t2, n2) => j(t2 / 2, n2 / 2, t2 / 2, n2 / 2) + " " + m([[t2 * 0.1464, n2 * 0.1464], [t2 * (1 - 0.1464), n2 * (1 - 0.1464)]]) + " " + m([[t2 * (1 - 0.1464), n2 * 0.1464], [t2 * 0.1464, n2 * (1 - 0.1464)]]), flowChartOr: (t2, n2) => j(t2 / 2, n2 / 2, t2 / 2, n2 / 2) + " " + m([[t2 / 2, 0], [t2 / 2, n2]]) + " " + m([[0, n2 / 2], [t2, n2 / 2]]), flowChartCollate: (t2, n2) => c([[0, 0], [t2, 0], [t2 / 2, n2 / 2], [t2, n2], [0, n2], [t2 / 2, n2 / 2]]), flowChartSort: (t2, n2) => c([[t2 / 2, 0], [t2, n2 / 2], [t2 / 2, n2], [0, n2 / 2]]) + " " + m([[0, n2 / 2], [t2, n2 / 2]]), flowChartExtract: (t2, n2) => c([[t2 / 2, 0], [t2, n2], [0, n2]]), flowChartMerge: (t2, n2) => c([[0, 0], [t2, 0], [t2 / 2, n2]]), flowChartOnlineStorage: (t2, n2) => `M ${e(t2 * 0.16)} 0 L ${e(t2)} 0 A ${e(t2 * 0.16)} ${e(n2 / 2)} 0 0 0 ${e(t2)} ${e(n2)} L ${e(t2 * 0.16)} ${e(n2)} A ${e(t2 * 0.16)} ${e(n2 / 2)} 0 0 1 ${e(t2 * 0.16)} 0 Z`, flowChartOfflineStorage: (t2, n2) => c([[0, 0], [t2, 0], [t2 / 2, n2]]) + " " + m([[t2 * 0.1, n2 * 0.2], [t2 * 0.9, n2 * 0.2]]), flowChartMagneticTape: (t2, n2) => j(t2 / 2, n2 * 0.46, t2 / 2, n2 * 0.46) + ` M ${e(t2 * 0.5)} ${e(n2 * 0.92)} L ${e(t2)} ${e(n2 * 0.92)} L ${e(t2)} ${e(n2)} L ${e(t2 * 0.5)} ${e(n2)} Z`, flowChartMagneticDisk: (t2, n2) => I.can(t2, n2, { adj: 25e3 }), flowChartMagneticDrum: (t2, n2) => {
  const a3 = Math.min(t2 / 2, t2 * 0.125);
  return `M ${e(a3)} 0 L ${e(t2 - a3)} 0 ${M(t2 - a3, n2 / 2, a3, n2 / 2, -90, 180)} L ${e(a3)} ${e(n2)} ${M(a3, n2 / 2, a3, n2 / 2, 90, 180)} Z ` + l(t2 - a3, n2 / 2, a3, n2 / 2);
}, flowChartDisplay: (t2, n2) => `M ${e(t2 * 0.16)} 0 L ${e(t2 * 0.84)} 0 A ${e(t2 * 0.16)} ${e(n2 / 2)} 0 0 1 ${e(t2 * 0.84)} ${e(n2)} L ${e(t2 * 0.16)} ${e(n2)} L 0 ${e(n2 / 2)} Z`, flowChartDelay: (t2, n2) => `M 0 0 L ${e(t2 / 2)} 0 A ${e(t2 / 2)} ${e(n2 / 2)} 0 0 1 ${e(t2 / 2)} ${e(n2)} L 0 ${e(n2)} Z`, actionButtonBlank: (t2, n2) => P(t2, n2, Math.min(t2, n2) * 0.125), actionButtonHome: (t2, n2) => D(t2, n2, (t3, n3, a3) => c([[n3, a3 - t3], [n3 + t3, a3], [n3 + t3 * 0.6, a3], [n3 + t3 * 0.6, a3 + t3], [n3 - t3 * 0.6, a3 + t3], [n3 - t3 * 0.6, a3], [n3 - t3, a3]])), actionButtonForwardNext: (t2, n2) => D(t2, n2, (t3, n3, a3) => c([[n3 - t3 * 0.6, a3 - t3], [n3 + t3 * 0.7, a3], [n3 - t3 * 0.6, a3 + t3]])), actionButtonBackPrevious: (t2, n2) => D(t2, n2, (t3, n3, a3) => c([[n3 + t3 * 0.6, a3 - t3], [n3 - t3 * 0.7, a3], [n3 + t3 * 0.6, a3 + t3]])), actionButtonBeginning: (t2, n2) => D(t2, n2, (t3, n3, a3) => c([[n3 + t3 * 0.7, a3 - t3], [n3 - t3 * 0.3, a3], [n3 + t3 * 0.7, a3 + t3]]) + " " + c([[n3 - t3 * 0.7, a3 - t3], [n3 - t3 * 0.45, a3 - t3], [n3 - t3 * 0.45, a3 + t3], [n3 - t3 * 0.7, a3 + t3]])), actionButtonEnd: (t2, n2) => D(t2, n2, (t3, n3, a3) => c([[n3 - t3 * 0.7, a3 - t3], [n3 + t3 * 0.3, a3], [n3 - t3 * 0.7, a3 + t3]]) + " " + c([[n3 + t3 * 0.45, a3 - t3], [n3 + t3 * 0.7, a3 - t3], [n3 + t3 * 0.7, a3 + t3], [n3 + t3 * 0.45, a3 + t3]])), actionButtonInformation: (t2, n2) => D(t2, n2, (t3, n3, a3) => j(n3, a3, t3, t3) + " " + j(n3, a3 - t3 * 0.45, t3 * 0.16, t3 * 0.16) + " " + c([[n3 - t3 * 0.16, a3 - t3 * 0.15], [n3 + t3 * 0.16, a3 - t3 * 0.15], [n3 + t3 * 0.16, a3 + t3 * 0.6], [n3 - t3 * 0.16, a3 + t3 * 0.6]])), actionButtonReturn: (t2, n2) => D(t2, n2, (t3, n3, a3) => `M ${e(n3 - t3 * 0.6)} ${e(a3 + t3 * 0.7)} L ${e(n3 + t3 * 0.2)} ${e(a3 + t3 * 0.7)} A ${e(t3 * 0.5)} ${e(t3 * 0.5)} 0 0 0 ${e(n3 + t3 * 0.2)} ${e(a3 - t3 * 0.3)} L ${e(n3 - t3 * 0.2)} ${e(a3 - t3 * 0.3)} M ${e(n3 - t3 * 0.2)} ${e(a3 - t3 * 0.6)} L ${e(n3 - t3 * 0.6)} ${e(a3 - t3 * 0.3)} L ${e(n3 - t3 * 0.2)} ${e(a3)} Z`), actionButtonDocument: (t2, n2) => D(t2, n2, (t3, n3, a3) => c([[n3 - t3 * 0.55, a3 - t3 * 0.8], [n3 + t3 * 0.2, a3 - t3 * 0.8], [n3 + t3 * 0.55, a3 - t3 * 0.45], [n3 + t3 * 0.55, a3 + t3 * 0.8], [n3 - t3 * 0.55, a3 + t3 * 0.8]])), actionButtonSound: (t2, n2) => D(t2, n2, (t3, n3, a3) => c([[n3 - t3 * 0.7, a3 - t3 * 0.3], [n3 - t3 * 0.3, a3 - t3 * 0.3], [n3 + t3 * 0.1, a3 - t3 * 0.8], [n3 + t3 * 0.1, a3 + t3 * 0.8], [n3 - t3 * 0.3, a3 + t3 * 0.3], [n3 - t3 * 0.7, a3 + t3 * 0.3]]) + " " + m([[n3 + t3 * 0.35, a3 - t3 * 0.4], [n3 + t3 * 0.75, a3 - t3 * 0.6]]) + " " + m([[n3 + t3 * 0.35, a3], [n3 + t3 * 0.8, a3]]) + " " + m([[n3 + t3 * 0.35, a3 + t3 * 0.4], [n3 + t3 * 0.75, a3 + t3 * 0.6]])), actionButtonMovie: (t2, n2) => D(t2, n2, (t3, n3, a3) => c([[n3 - t3 * 0.8, a3 - t3 * 0.5], [n3 + t3 * 0.35, a3 - t3 * 0.5], [n3 + t3 * 0.35, a3 - t3 * 0.15], [n3 + t3 * 0.8, a3 - t3 * 0.45], [n3 + t3 * 0.8, a3 + t3 * 0.45], [n3 + t3 * 0.35, a3 + t3 * 0.15], [n3 + t3 * 0.35, a3 + t3 * 0.5], [n3 - t3 * 0.8, a3 + t3 * 0.5]])), actionButtonHelp: (t2, n2) => D(t2, n2, (t3, n3, a3) => `M ${e(n3 - t3 * 0.35)} ${e(a3 - t3 * 0.3)} A ${e(t3 * 0.35)} ${e(t3 * 0.35)} 0 1 1 ${e(n3)} ${e(a3 + t3 * 0.1)} L ${e(n3)} ${e(a3 + t3 * 0.35)} ` + j(n3, a3 + t3 * 0.68, t3 * 0.13, t3 * 0.13)), chartX: (t2, n2) => i(`M 0 0 L ${e(t2)} ${e(n2)} M ${e(t2)} 0 L 0 ${e(n2)}`), chartPlus: (t2, n2) => i(`M ${e(t2 / 2)} 0 L ${e(t2 / 2)} ${e(n2)} M 0 ${e(n2 / 2)} L ${e(t2)} ${e(n2 / 2)}`), chartStar: (t2, n2) => i(`M 0 0 L ${e(t2)} ${e(n2)} M ${e(t2)} 0 L 0 ${e(n2)} M ${e(t2 / 2)} 0 L ${e(t2 / 2)} ${e(n2)}`), line: (t2, n2) => i(`M 0 0 L ${e(t2)} ${e(n2)}`), lineInv: (t2, n2) => i(`M 0 ${e(n2)} L ${e(t2)} 0`), straightConnector1: (t2, n2) => i(`M 0 0 L ${e(t2)} ${e(n2)}`), bentConnector2: (t2, n2) => i(`M 0 0 L ${e(t2)} 0 L ${e(t2)} ${e(n2)}`), bentConnector3: (t2, n2, a3) => {
  const $3 = t2 * h(a3, "adj1", 5e4);
  return i(`M 0 0 L ${e($3)} 0 L ${e($3)} ${e(n2)} L ${e(t2)} ${e(n2)}`);
}, bentConnector4: (t2, n2, a3) => {
  const $3 = t2 * h(a3, "adj1", 5e4), r2 = n2 * h(a3, "adj2", 5e4);
  return i(`M 0 0 L ${e($3)} 0 L ${e($3)} ${e(r2)} L ${e(t2)} ${e(r2)} L ${e(t2)} ${e(n2)}`);
}, bentConnector5: (t2, n2, a3) => {
  const $3 = t2 * h(a3, "adj1", 5e4), r2 = n2 * h(a3, "adj2", 5e4), o4 = t2 * h(a3, "adj3", 5e4);
  return i(`M 0 0 L ${e($3)} 0 L ${e($3)} ${e(r2)} L ${e(o4)} ${e(r2)} L ${e(o4)} ${e(n2)} L ${e(t2)} ${e(n2)}`);
}, curvedConnector2: (t2, n2) => i(`M 0 0 Q ${e(t2)} 0 ${e(t2)} ${e(n2)}`), curvedConnector3: (t2, n2, a3) => {
  const $3 = t2 * h(a3, "adj1", 5e4);
  return i(`M 0 0 C ${e($3)} 0 ${e($3)} ${e(n2)} ${e(t2)} ${e(n2)}`);
}, curvedConnector4: (t2, n2) => i(`M 0 0 C ${e(t2 * 0.5)} 0 ${e(t2 * 0.5)} ${e(n2 * 0.5)} ${e(t2 * 0.75)} ${e(n2 * 0.5)} S ${e(t2)} ${e(n2 * 0.75)} ${e(t2)} ${e(n2)}`), curvedConnector5: (t2, n2) => i(`M 0 0 C ${e(t2 * 0.4)} 0 ${e(t2 * 0.4)} ${e(n2 * 0.5)} ${e(t2 * 0.5)} ${e(n2 * 0.5)} S ${e(t2 * 0.6)} ${e(n2)} ${e(t2)} ${e(n2)}`) };
function Q(t2, n2, a3, $3) {
  const r2 = I[t2] ?? I.rect, e3 = Math.max(n2, 0), o4 = Math.max(a3, 0);
  let i4;
  try {
    const t3 = r2(e3, o4, $3);
    i4 = typeof t3 == "string" ? { d: t3, open: false } : t3;
  } catch {
    return { d: I.rect(e3, o4, {}), open: false };
  }
  const h4 = Math.max(e3, o4) * 20 + 1e3;
  for (const t3 of i4.d.match(/-?\d+(?:\.\d+)?/g) ?? []) if (Math.abs(Number(t3)) > h4) return { d: I.rect(e3, o4, {}), open: false };
  return i4;
}

// .ppt-build/node_modules/@web-ppt/core/dist/zip-dBMiX7Zm.js
var t = Uint8Array;
var r = Uint16Array;
var e2 = Int32Array;
var n = new t([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var i2 = new t([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
var a = new t([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var o2 = function(t2, n2) {
  for (var i4 = new r(31), a3 = 0; a3 < 31; ++a3) i4[a3] = n2 += 1 << t2[a3 - 1];
  for (var o4 = new e2(i4[30]), a3 = 1; a3 < 30; ++a3) for (var s4 = i4[a3]; s4 < i4[a3 + 1]; ++s4) o4[s4] = s4 - i4[a3] << 5 | a3;
  return { b: i4, r: o4 };
};
var s2 = o2(n, 2);
var f2 = s2.b;
var l2 = s2.r;
f2[28] = 258, l2[258] = 28;
var u2 = o2(i2, 0);
var c2 = u2.b;
var v2 = u2.r;
var h2 = new r(32768);
for (m2 = 0; m2 < 32768; ++m2) {
  g2 = (m2 & 43690) >> 1 | (m2 & 21845) << 1;
  g2 = (g2 & 52428) >> 2 | (g2 & 13107) << 2, g2 = (g2 & 61680) >> 4 | (g2 & 3855) << 4, h2[m2] = ((g2 & 65280) >> 8 | (g2 & 255) << 8) >> 1;
}
var g2;
var m2;
var p2 = function(t2, e3, n2) {
  for (var i4 = t2.length, a3 = 0, o4 = new r(e3); a3 < i4; ++a3) t2[a3] && ++o4[t2[a3] - 1];
  var s4 = new r(e3);
  for (a3 = 1; a3 < e3; ++a3) s4[a3] = s4[a3 - 1] + o4[a3 - 1] << 1;
  var f4;
  if (n2) {
    f4 = new r(1 << e3);
    var l3 = 15 - e3;
    for (a3 = 0; a3 < i4; ++a3) if (t2[a3]) for (var u4 = a3 << 4 | t2[a3], c4 = e3 - t2[a3], v4 = s4[t2[a3] - 1]++ << c4, m4 = v4 | (1 << c4) - 1; v4 <= m4; ++v4) f4[h2[v4] >> l3] = u4;
  } else for (f4 = new r(i4), a3 = 0; a3 < i4; ++a3) t2[a3] && (f4[a3] = h2[s4[t2[a3] - 1]++] >> 15 - t2[a3]);
  return f4;
};
var d2 = new t(288);
for (m2 = 0; m2 < 144; ++m2) d2[m2] = 8;
var m2;
for (m2 = 144; m2 < 256; ++m2) d2[m2] = 9;
var m2;
for (m2 = 256; m2 < 280; ++m2) d2[m2] = 7;
var m2;
for (m2 = 280; m2 < 288; ++m2) d2[m2] = 8;
var m2;
var y2 = new t(32);
for (m2 = 0; m2 < 32; ++m2) y2[m2] = 5;
var m2;
var w2 = /* @__PURE__ */ p2(d2, 9, 0);
var b2 = /* @__PURE__ */ p2(d2, 9, 1);
var z = /* @__PURE__ */ p2(y2, 5, 0);
var x2 = /* @__PURE__ */ p2(y2, 5, 1);
var U = function(t2) {
  for (var r2 = t2[0], e3 = 1; e3 < t2.length; ++e3) t2[e3] > r2 && (r2 = t2[e3]);
  return r2;
};
var $ = function(t2, r2, e3) {
  var n2 = r2 / 8 | 0;
  return (t2[n2] | t2[n2 + 1] << 8) >> (r2 & 7) & e3;
};
var I2 = function(t2, r2) {
  var e3 = r2 / 8 | 0;
  return (t2[e3] | t2[e3 + 1] << 8 | t2[e3 + 2] << 16) >> (r2 & 7);
};
var Z2 = function(t2) {
  return (t2 + 7) / 8 | 0;
};
var P2 = function(r2, e3, n2) {
  return (n2 == null || n2 > r2.length) && (n2 = r2.length), new t(r2.subarray(e3, n2));
};
var E = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"];
var M2 = function(t2, r2, e3) {
  var n2 = new Error(r2 || E[t2]);
  if (n2.code = t2, Error.captureStackTrace && Error.captureStackTrace(n2, M2), !e3) throw n2;
  return n2;
};
var C2 = function(r2, e3, o4, s4) {
  var l3 = r2.length, u4 = s4 ? s4.length : 0;
  if (!l3 || e3.f && !e3.l) return o4 || new t(0);
  var v4 = !o4, h4 = v4 || e3.i != 2, m4 = e3.i;
  v4 && (o4 = new t(l3 * 3));
  var g4 = function(r3) {
    var e4 = o4.length;
    if (r3 > e4) {
      var n2 = new t(Math.max(e4 * 2, r3));
      n2.set(o4), o4 = n2;
    }
  }, d4 = e3.f || 0, y4 = e3.p || 0, w4 = e3.b || 0, z3 = e3.l, E3 = e3.d, C4 = e3.m, S4 = e3.n, T3 = l3 * 8;
  do {
    if (!z3) {
      d4 = $(r2, y4, 1);
      var k3 = $(r2, y4 + 1, 3);
      if (y4 += 3, k3) if (k3 == 1) z3 = b2, E3 = x2, C4 = 9, S4 = 5;
      else if (k3 == 2) {
        var B4 = $(r2, y4, 31) + 257, D4 = $(r2, y4 + 10, 15) + 4, O3 = B4 + $(r2, y4 + 5, 31) + 1;
        y4 += 14;
        for (var R4 = new t(O3), A4 = new t(19), F3 = 0; F3 < D4; ++F3) A4[a[F3]] = $(r2, y4 + F3 * 3, 7);
        y4 += D4 * 3;
        for (var N3 = U(A4), L4 = (1 << N3) - 1, j4 = p2(A4, N3, 1), F3 = 0; F3 < O3; ) {
          var V3 = j4[$(r2, y4, L4)];
          y4 += V3 & 15;
          var W3 = V3 >> 4;
          if (W3 < 16) R4[F3++] = W3;
          else {
            var q3 = 0, G3 = 0;
            for (W3 == 16 ? (G3 = 3 + $(r2, y4, 3), y4 += 2, q3 = R4[F3 - 1]) : W3 == 17 ? (G3 = 3 + $(r2, y4, 7), y4 += 3) : W3 == 18 && (G3 = 11 + $(r2, y4, 127), y4 += 7); G3--; ) R4[F3++] = q3;
          }
        }
        var H3 = R4.subarray(0, B4), J3 = R4.subarray(B4);
        C4 = U(H3), S4 = U(J3), z3 = p2(H3, C4, 1), E3 = p2(J3, S4, 1);
      } else M2(1);
      else {
        var W3 = Z2(y4) + 4, K3 = r2[W3 - 4] | r2[W3 - 3] << 8, Q4 = W3 + K3;
        if (Q4 > l3) {
          m4 && M2(0);
          break;
        }
        h4 && g4(w4 + K3), o4.set(r2.subarray(W3, Q4), w4), e3.b = w4 += K3, e3.p = y4 = Q4 * 8, e3.f = d4;
        continue;
      }
      if (y4 > T3) {
        m4 && M2(0);
        break;
      }
    }
    h4 && g4(w4 + 131072);
    for (var X3 = (1 << C4) - 1, Y3 = (1 << S4) - 1, _3 = y4; ; _3 = y4) {
      var q3 = z3[I2(r2, y4) & X3], tt3 = q3 >> 4;
      if (y4 += q3 & 15, y4 > T3) {
        m4 && M2(0);
        break;
      }
      if (q3 || M2(2), tt3 < 256) o4[w4++] = tt3;
      else if (tt3 == 256) {
        _3 = y4, z3 = null;
        break;
      } else {
        var rt3 = tt3 - 254;
        if (tt3 > 264) {
          var F3 = tt3 - 257, et3 = n[F3];
          rt3 = $(r2, y4, (1 << et3) - 1) + f2[F3], y4 += et3;
        }
        var nt3 = E3[I2(r2, y4) & Y3], it3 = nt3 >> 4;
        nt3 || M2(3), y4 += nt3 & 15;
        var J3 = c2[it3];
        if (it3 > 3) {
          var et3 = i2[it3];
          J3 += I2(r2, y4) & (1 << et3) - 1, y4 += et3;
        }
        if (y4 > T3) {
          m4 && M2(0);
          break;
        }
        h4 && g4(w4 + 131072);
        var at4 = w4 + rt3;
        if (w4 < J3) {
          var ot3 = u4 - J3, st2 = Math.min(J3, at4);
          for (ot3 + w4 < 0 && M2(3); w4 < st2; ++w4) o4[w4] = s4[ot3 + w4];
        }
        for (; w4 < at4; ++w4) o4[w4] = o4[w4 - J3];
      }
    }
    e3.l = z3, e3.p = _3, e3.b = w4, e3.f = d4, z3 && (d4 = 1, e3.m = C4, e3.d = E3, e3.n = S4);
  } while (!d4);
  return w4 != o4.length && v4 ? P2(o4, 0, w4) : o4.subarray(0, w4);
};
var S2 = function(t2, r2, e3) {
  e3 <<= r2 & 7;
  var n2 = r2 / 8 | 0;
  t2[n2] |= e3, t2[n2 + 1] |= e3 >> 8;
};
var T = function(t2, r2, e3) {
  e3 <<= r2 & 7;
  var n2 = r2 / 8 | 0;
  t2[n2] |= e3, t2[n2 + 1] |= e3 >> 8, t2[n2 + 2] |= e3 >> 16;
};
var k = function(e3, n2) {
  for (var i4 = [], a3 = 0; a3 < e3.length; ++a3) e3[a3] && i4.push({ s: a3, f: e3[a3] });
  var o4 = i4.length, s4 = i4.slice();
  if (!o4) return { t: N, l: 0 };
  if (o4 == 1) {
    var f4 = new t(i4[0].s + 1);
    return f4[i4[0].s] = 1, { t: f4, l: 1 };
  }
  i4.sort(function(t2, r2) {
    return t2.f - r2.f;
  }), i4.push({ s: -1, f: 25001 });
  var l3 = i4[0], u4 = i4[1], c4 = 0, v4 = 1, h4 = 2;
  for (i4[0] = { s: -1, f: l3.f + u4.f, l: l3, r: u4 }; v4 != o4 - 1; ) l3 = i4[i4[c4].f < i4[h4].f ? c4++ : h4++], u4 = i4[c4 != v4 && i4[c4].f < i4[h4].f ? c4++ : h4++], i4[v4++] = { s: -1, f: l3.f + u4.f, l: l3, r: u4 };
  for (var m4 = s4[0].s, a3 = 1; a3 < o4; ++a3) s4[a3].s > m4 && (m4 = s4[a3].s);
  var g4 = new r(m4 + 1), p4 = B2(i4[v4 - 1], g4, 0);
  if (p4 > n2) {
    var a3 = 0, d4 = 0, y4 = p4 - n2, w4 = 1 << y4;
    for (s4.sort(function(t2, r2) {
      return g4[r2.s] - g4[t2.s] || t2.f - r2.f;
    }); a3 < o4; ++a3) {
      var b4 = s4[a3].s;
      if (g4[b4] > n2) d4 += w4 - (1 << p4 - g4[b4]), g4[b4] = n2;
      else break;
    }
    for (d4 >>= y4; d4 > 0; ) {
      var z3 = s4[a3].s;
      g4[z3] < n2 ? d4 -= 1 << n2 - g4[z3]++ - 1 : ++a3;
    }
    for (; a3 >= 0 && d4; --a3) {
      var x4 = s4[a3].s;
      g4[x4] == n2 && (--g4[x4], ++d4);
    }
    p4 = n2;
  }
  return { t: new t(g4), l: p4 };
};
var B2 = function(t2, r2, e3) {
  return t2.s == -1 ? Math.max(B2(t2.l, r2, e3 + 1), B2(t2.r, r2, e3 + 1)) : r2[t2.s] = e3;
};
var D2 = function(t2) {
  for (var e3 = t2.length; e3 && !t2[--e3]; ) ;
  for (var n2 = new r(++e3), i4 = 0, a3 = t2[0], o4 = 1, s4 = function(t3) {
    n2[i4++] = t3;
  }, f4 = 1; f4 <= e3; ++f4) if (t2[f4] == a3 && f4 != e3) ++o4;
  else {
    if (!a3 && o4 > 2) {
      for (; o4 > 138; o4 -= 138) s4(32754);
      o4 > 2 && (s4(o4 > 10 ? o4 - 11 << 5 | 28690 : o4 - 3 << 5 | 12305), o4 = 0);
    } else if (o4 > 3) {
      for (s4(a3), --o4; o4 > 6; o4 -= 6) s4(8304);
      o4 > 2 && (s4(o4 - 3 << 5 | 8208), o4 = 0);
    }
    for (; o4--; ) s4(a3);
    o4 = 1, a3 = t2[f4];
  }
  return { c: n2.subarray(0, i4), n: e3 };
};
var O = function(t2, r2) {
  for (var e3 = 0, n2 = 0; n2 < r2.length; ++n2) e3 += t2[n2] * r2[n2];
  return e3;
};
var R2 = function(t2, r2, e3) {
  var n2 = e3.length, i4 = Z2(r2 + 2);
  t2[i4] = n2 & 255, t2[i4 + 1] = n2 >> 8, t2[i4 + 2] = t2[i4] ^ 255, t2[i4 + 3] = t2[i4 + 1] ^ 255;
  for (var a3 = 0; a3 < n2; ++a3) t2[i4 + a3 + 4] = e3[a3];
  return (i4 + 4 + n2) * 8;
};
var A2 = function(t2, e3, o4, s4, f4, l3, u4, c4, v4, h4, m4) {
  S2(e3, m4++, o4), ++f4[256];
  for (var g4 = k(f4, 15), b4 = g4.t, x4 = g4.l, U3 = k(l3, 15), $3 = U3.t, I4 = U3.l, Z4 = D2(b4), P4 = Z4.c, E3 = Z4.n, M4 = D2($3), C4 = M4.c, B4 = M4.n, A4 = new r(19), F3 = 0; F3 < P4.length; ++F3) ++A4[P4[F3] & 31];
  for (var F3 = 0; F3 < C4.length; ++F3) ++A4[C4[F3] & 31];
  for (var N3 = k(A4, 7), L4 = N3.t, j4 = N3.l, V3 = 19; V3 > 4 && !L4[a[V3 - 1]]; --V3) ;
  var W3 = h4 + 5 << 3, q3 = O(f4, d2) + O(l3, y2) + u4, G3 = O(f4, b4) + O(l3, $3) + u4 + 14 + 3 * V3 + O(A4, L4) + 2 * A4[16] + 3 * A4[17] + 7 * A4[18];
  if (v4 >= 0 && W3 <= q3 && W3 <= G3) return R2(e3, m4, t2.subarray(v4, v4 + h4));
  var H3, J3, K3, Q4;
  if (S2(e3, m4, 1 + (G3 < q3)), m4 += 2, G3 < q3) {
    H3 = p2(b4, x4, 0), J3 = b4, K3 = p2($3, I4, 0), Q4 = $3;
    var X3 = p2(L4, j4, 0);
    S2(e3, m4, E3 - 257), S2(e3, m4 + 5, B4 - 1), S2(e3, m4 + 10, V3 - 4), m4 += 14;
    for (var F3 = 0; F3 < V3; ++F3) S2(e3, m4 + 3 * F3, L4[a[F3]]);
    m4 += 3 * V3;
    for (var Y3 = [P4, C4], _3 = 0; _3 < 2; ++_3) for (var tt3 = Y3[_3], F3 = 0; F3 < tt3.length; ++F3) {
      var rt3 = tt3[F3] & 31;
      S2(e3, m4, X3[rt3]), m4 += L4[rt3], rt3 > 15 && (S2(e3, m4, tt3[F3] >> 5 & 127), m4 += tt3[F3] >> 12);
    }
  } else H3 = w2, J3 = d2, K3 = z, Q4 = y2;
  for (var F3 = 0; F3 < c4; ++F3) {
    var et3 = s4[F3];
    if (et3 > 255) {
      var rt3 = et3 >> 18 & 31;
      T(e3, m4, H3[rt3 + 257]), m4 += J3[rt3 + 257], rt3 > 7 && (S2(e3, m4, et3 >> 23 & 31), m4 += n[rt3]);
      var nt3 = et3 & 31;
      T(e3, m4, K3[nt3]), m4 += Q4[nt3], nt3 > 3 && (T(e3, m4, et3 >> 5 & 8191), m4 += i2[nt3]);
    } else T(e3, m4, H3[et3]), m4 += J3[et3];
  }
  return T(e3, m4, H3[256]), m4 + J3[256];
};
var F = /* @__PURE__ */ new e2([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var N = /* @__PURE__ */ new t(0);
var L2 = function(a3, o4, s4, f4, u4, c4) {
  var h4 = c4.z || a3.length, m4 = new t(f4 + h4 + 5 * (1 + Math.ceil(h4 / 7e3)) + u4), g4 = m4.subarray(f4, m4.length - u4), p4 = c4.l, d4 = (c4.r || 0) & 7;
  if (o4) {
    d4 && (g4[0] = c4.r >> 3);
    for (var y4 = F[o4 - 1], w4 = y4 >> 13, b4 = y4 & 8191, z3 = (1 << s4) - 1, x4 = c4.p || new r(32768), U3 = c4.h || new r(z3 + 1), $3 = Math.ceil(s4 / 3), I4 = 2 * $3, E3 = function(t2) {
      return (a3[t2] ^ a3[t2 + 1] << $3 ^ a3[t2 + 2] << I4) & z3;
    }, M4 = new e2(25e3), C4 = new r(288), S4 = new r(32), T3 = 0, k3 = 0, B4 = c4.i || 0, D4 = 0, O3 = c4.w || 0, N3 = 0; B4 + 2 < h4; ++B4) {
      var L4 = E3(B4), j4 = B4 & 32767, V3 = U3[L4];
      if (x4[j4] = V3, U3[L4] = j4, O3 <= B4) {
        var W3 = h4 - B4;
        if ((T3 > 7e3 || D4 > 24576) && (W3 > 423 || !p4)) {
          d4 = A2(a3, g4, 0, M4, C4, S4, k3, D4, N3, B4 - N3, d4), D4 = T3 = k3 = 0, N3 = B4;
          for (var q3 = 0; q3 < 286; ++q3) C4[q3] = 0;
          for (var q3 = 0; q3 < 30; ++q3) S4[q3] = 0;
        }
        var G3 = 2, H3 = 0, J3 = b4, K3 = j4 - V3 & 32767;
        if (W3 > 2 && L4 == E3(B4 - K3)) for (var Q4 = Math.min(w4, W3) - 1, X3 = Math.min(32767, B4), Y3 = Math.min(258, W3); K3 <= X3 && --J3 && j4 != V3; ) {
          if (a3[B4 + G3] == a3[B4 + G3 - K3]) {
            for (var _3 = 0; _3 < Y3 && a3[B4 + _3] == a3[B4 + _3 - K3]; ++_3) ;
            if (_3 > G3) {
              if (G3 = _3, H3 = K3, _3 > Q4) break;
              for (var tt3 = Math.min(K3, _3 - 2), rt3 = 0, q3 = 0; q3 < tt3; ++q3) {
                var et3 = B4 - K3 + q3 & 32767, nt3 = x4[et3], it3 = et3 - nt3 & 32767;
                it3 > rt3 && (rt3 = it3, V3 = et3);
              }
            }
          }
          j4 = V3, V3 = x4[j4], K3 += j4 - V3 & 32767;
        }
        if (H3) {
          M4[D4++] = 268435456 | l2[G3] << 18 | v2[H3];
          var at4 = l2[G3] & 31, ot3 = v2[H3] & 31;
          k3 += n[at4] + i2[ot3], ++C4[257 + at4], ++S4[ot3], O3 = B4 + G3, ++T3;
        } else M4[D4++] = a3[B4], ++C4[a3[B4]];
      }
    }
    for (B4 = Math.max(B4, O3); B4 < h4; ++B4) M4[D4++] = a3[B4], ++C4[a3[B4]];
    d4 = A2(a3, g4, p4, M4, C4, S4, k3, D4, N3, B4 - N3, d4), p4 || (c4.r = d4 & 7 | g4[d4 / 8 | 0] << 3, d4 -= 7, c4.h = U3, c4.p = x4, c4.i = B4, c4.w = O3);
  } else {
    for (var B4 = c4.w || 0; B4 < h4 + p4; B4 += 65535) {
      var st2 = B4 + 65535;
      st2 >= h4 && (g4[d4 / 8 | 0] = p4, st2 = h4), d4 = R2(g4, d4 + 1, a3.subarray(B4, st2));
    }
    c4.i = h4;
  }
  return P2(m4, 0, f4 + Z2(d4) + u4);
};
var j2 = function() {
  var t2 = 1, r2 = 0;
  return { p: function(e3) {
    for (var n2 = t2, i4 = r2, a3 = e3.length | 0, o4 = 0; o4 != a3; ) {
      for (var s4 = Math.min(o4 + 2655, a3); o4 < s4; ++o4) i4 += n2 += e3[o4];
      n2 = (n2 & 65535) + 15 * (n2 >> 16), i4 = (i4 & 65535) + 15 * (i4 >> 16);
    }
    t2 = n2, r2 = i4;
  }, d: function() {
    return t2 %= 65521, r2 %= 65521, (t2 & 255) << 24 | (t2 & 65280) << 8 | (r2 & 255) << 8 | r2 >> 8;
  } };
};
var V = function(r2, e3, n2, i4, a3) {
  if (!a3 && (a3 = { l: 1 }, e3.dictionary)) {
    var o4 = e3.dictionary.subarray(-32768), s4 = new t(o4.length + r2.length);
    s4.set(o4), s4.set(r2, o4.length), r2 = s4, a3.w = o4.length;
  }
  return L2(r2, e3.level == null ? 6 : e3.level, e3.mem == null ? a3.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(r2.length))) * 1.5) : 20 : 12 + e3.mem, n2, i4, a3);
};
var W = function(t2, r2, e3) {
  for (; e3; ++r2) t2[r2] = e3, e3 >>>= 8;
};
var q = function(t2, r2) {
  var e3 = r2.level, n2 = e3 == 0 ? 0 : e3 < 6 ? 1 : e3 == 9 ? 3 : 2;
  if (t2[0] = 120, t2[1] = n2 << 6 | (r2.dictionary && 32), t2[1] |= 31 - (t2[0] << 8 | t2[1]) % 31, r2.dictionary) {
    var i4 = j2();
    i4.p(r2.dictionary), W(t2, 2, i4.d());
  }
};
var G = function(t2, r2) {
  return ((t2[0] & 15) != 8 || t2[0] >> 4 > 7 || (t2[0] << 8 | t2[1]) % 31) && M2(6, "invalid zlib data"), (t2[1] >> 5 & 1) == +!r2 && M2(6, "invalid zlib data: " + (t2[1] & 32 ? "need" : "unexpected") + " dictionary"), (t2[1] >> 3 & 4) + 2;
};
function H(t2, r2) {
  return C2(t2, { i: 2 }, r2 && r2.out, r2 && r2.dictionary);
}
function J(t2, r2) {
  r2 || (r2 = {});
  var e3 = j2();
  e3.p(t2);
  var n2 = V(t2, r2, r2.dictionary ? 6 : 2, 4);
  return q(n2, r2), W(n2, n2.length - 4, e3.d()), n2;
}
function K(t2, r2) {
  return C2(t2.subarray(G(t2, r2 && r2.dictionary), -4), { i: 2 }, r2 && r2.out, r2 && r2.dictionary);
}
var Q2 = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder();
var X = 0;
try {
  Q2.decode(N, { stream: true }), X = 1;
} catch {
}
var Y = 101010256;
var _ = 33639248;
var tt = 67324752;
var rt = 117853008;
var et = 65557;
var nt = new TextDecoder("utf-8", { fatal: true });
var it = class extends Error {
  constructor(t2, r2) {
    super(r2), this.reason = t2, this.name = "ZipSafetyError";
  }
};
var at = Object.freeze({ maxEntries: 4096, maxEntryBytes: 128 * 1024 * 1024, maxTotalBytes: 512 * 1024 * 1024, maxCompressionRatio: 1e3 });
function ot(t2, r2) {
  throw new it(t2, r2);
}
function st(t2) {
  const r2 = { ...at, ...t2 };
  for (const t3 of ["maxEntries", "maxEntryBytes", "maxTotalBytes"]) (!Number.isSafeInteger(r2[t3]) || r2[t3] <= 0) && ot("zip-invalid-limit", `ZIP ${t3} \u5FC5\u987B\u662F\u6B63\u5B89\u5168\u6574\u6570\uFF0C\u6536\u5230 ${r2[t3]}`);
  return (!Number.isFinite(r2.maxCompressionRatio) || r2.maxCompressionRatio <= 0) && ot("zip-invalid-limit", `ZIP maxCompressionRatio \u5FC5\u987B\u662F\u6B63\u6709\u9650\u6570\uFF0C\u6536\u5230 ${r2.maxCompressionRatio}`), r2;
}
function ft(t2) {
  const r2 = t2.replace(/\\/g, "/");
  (!r2 || r2.includes("\0") || r2.startsWith("/") || /^[a-z]:/i.test(r2)) && ot("zip-invalid-name", `ZIP \u6761\u76EE\u540D\u79F0\u4E0D\u662F\u5B89\u5168\u7684\u5305\u5185\u76F8\u5BF9\u8DEF\u5F84\uFF1A${t2}`);
  const e3 = r2.split("/"), n2 = r2.endsWith("/");
  return e3.some((t3, r3) => t3 === "." || t3 === ".." || !t3 && !(n2 && r3 === e3.length - 1)) && ot("zip-invalid-name", `ZIP \u6761\u76EE\u5305\u542B\u8DEF\u5F84\u7A7F\u8D8A\u3001\u5F53\u524D\u76EE\u5F55\u6216\u7A7A\u8DEF\u5F84\u6BB5\uFF1A${t2}`), r2;
}
function lt(t2) {
  t2.length < 22 && ot("zip-invalid-structure", "ZIP \u957F\u5EA6\u4E0D\u8DB3\uFF0C\u7F3A\u5C11 EOCD");
  const r2 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength), e3 = Math.max(0, t2.length - et);
  for (let n2 = t2.length - 22; n2 >= e3; n2--) {
    if (r2.getUint32(n2, true) !== Y) continue;
    const e4 = r2.getUint16(n2 + 20, true);
    if (n2 + 22 + e4 === t2.length) return n2;
    const i4 = t2.length - n2 - 22;
    if (e4 === 0 && (i4 === 1 && t2[n2 + 22] === 10 || i4 === 2 && t2[n2 + 22] === 13 && t2[n2 + 23] === 10)) return n2;
  }
  return ot("zip-invalid-structure", "ZIP EOCD \u6216\u6CE8\u91CA\u957F\u5EA6\u65E0\u6548");
}
function ut(t2, r2, e3, n2, i4) {
  (!Number.isSafeInteger(r2) || !Number.isSafeInteger(e3) || r2 < 0 || e3 < 0 || r2 + e3 > n2 || r2 + e3 > t2.length) && ot("zip-invalid-structure", `ZIP ${i4} \u8D85\u51FA\u5141\u8BB8\u8FB9\u754C`);
}
function ct(t2, r2, e3) {
  try {
    return ft(nt.decode(t2.subarray(r2, r2 + e3)));
  } catch (t3) {
    if (t3 instanceof it) throw t3;
    return ot("zip-invalid-name", "ZIP \u6761\u76EE\u540D\u79F0\u4E0D\u662F\u6709\u6548 UTF-8");
  }
}
var vt = class {
  constructor(t2, r2) {
    this.source = t2, this.entries = /* @__PURE__ */ new Map(), this.limits = st(r2), this.inspectCentral();
  }
  inspectCentral() {
    const t2 = lt(this.source), r2 = new DataView(this.source.buffer, this.source.byteOffset, this.source.byteLength);
    (t2 >= 20 && r2.getUint32(t2 - 20, true) === rt || r2.getUint16(t2 + 8, true) === 65535 || r2.getUint16(t2 + 10, true) === 65535 || r2.getUint32(t2 + 12, true) === 4294967295 || r2.getUint32(t2 + 16, true) === 4294967295) && ot("zip64-unsupported", "ZIP64 \u5F53\u524D\u4E0D\u652F\u6301\u5B89\u5168\u5927\u5C0F\u4E0E\u8FB9\u754C\u6821\u9A8C");
    const e3 = r2.getUint16(t2 + 4, true), n2 = r2.getUint16(t2 + 6, true), i4 = r2.getUint16(t2 + 8, true), a3 = r2.getUint16(t2 + 10, true), o4 = r2.getUint32(t2 + 12, true), s4 = r2.getUint32(t2 + 16, true);
    (e3 !== 0 || n2 !== 0 || i4 !== a3) && ot("zip-invalid-structure", "ZIP \u591A\u78C1\u76D8\u6216 EOCD \u6761\u76EE\u8BA1\u6570\u4E0D\u4E00\u81F4"), (s4 > t2 || o4 !== t2 - s4) && ot("zip-invalid-structure", "ZIP \u4E2D\u592E\u76EE\u5F55\u8FB9\u754C\u4E0E EOCD \u4E0D\u4E00\u81F4"), a3 > this.limits.maxEntries && ot("zip-too-many-entries", `ZIP \u6761\u76EE\u6570 ${a3} \u8D85\u8FC7\u4E0A\u9650 ${this.limits.maxEntries}`);
    const f4 = /* @__PURE__ */ new Set();
    let l3 = 0, u4 = s4;
    for (let e4 = 0; e4 < a3; e4++) {
      ut(this.source, u4, 46, t2, `\u4E2D\u592E\u76EE\u5F55\u6761\u76EE ${e4 + 1}`), r2.getUint32(u4, true) !== _ && ot("zip-invalid-structure", `ZIP \u4E2D\u592E\u76EE\u5F55\u6761\u76EE ${e4 + 1} \u7B7E\u540D\u9519\u8BEF`);
      const n3 = r2.getUint16(u4 + 8, true), i5 = r2.getUint16(u4 + 10, true), a4 = r2.getUint32(u4 + 20, true), o5 = r2.getUint32(u4 + 24, true), c4 = r2.getUint16(u4 + 28, true), v4 = r2.getUint16(u4 + 30, true), h4 = r2.getUint16(u4 + 32, true), m4 = r2.getUint16(u4 + 34, true), g4 = r2.getUint32(u4 + 42, true), p4 = 46 + c4 + v4 + h4;
      ut(this.source, u4, p4, t2, `\u4E2D\u592E\u76EE\u5F55\u6761\u76EE ${e4 + 1}`), (m4 !== 0 || n3 & 1) && ot("zip-invalid-structure", `ZIP \u6761\u76EE ${e4 + 1} \u8DE8\u78C1\u76D8\u6216\u5DF2\u52A0\u5BC6`), i5 !== 0 && i5 !== 8 && ot("zip-invalid-structure", `ZIP \u6761\u76EE ${e4 + 1} \u4F7F\u7528\u4E0D\u652F\u6301\u7684\u538B\u7F29\u65B9\u6CD5 ${i5}`);
      const d4 = ct(this.source, u4 + 46, c4), y4 = d4.toLowerCase();
      f4.has(y4) && ot("zip-duplicate-name", `ZIP \u5B58\u5728\u91CD\u590D\u6216\u7B49\u4EF7\u6761\u76EE\u540D\u79F0\uFF1A${d4}`), f4.add(y4), o5 > this.limits.maxEntryBytes && ot("zip-entry-too-large", `ZIP \u6761\u76EE ${d4} \u58F0\u660E ${o5} \u5B57\u8282\uFF0C\u8D85\u8FC7\u4E0A\u9650 ${this.limits.maxEntryBytes}`), l3 += o5, l3 > this.limits.maxTotalBytes && ot("zip-total-too-large", `ZIP \u58F0\u660E\u89E3\u538B\u603B\u91CF ${l3} \u5B57\u8282\uFF0C\u8D85\u8FC7\u4E0A\u9650 ${this.limits.maxTotalBytes}`), o5 > 0 && o5 / Math.max(1, a4) > this.limits.maxCompressionRatio && ot("zip-compression-ratio", `ZIP \u6761\u76EE ${d4} \u538B\u7F29\u6BD4\u8D85\u8FC7\u4E0A\u9650 ${this.limits.maxCompressionRatio}`), ut(this.source, g4, 30, s4, `\u672C\u5730\u5934 ${d4}`), r2.getUint32(g4, true) !== tt && ot("zip-invalid-structure", `ZIP \u672C\u5730\u5934\u7B7E\u540D\u9519\u8BEF\uFF1A${d4}`);
      const w4 = r2.getUint16(g4 + 6, true), b4 = r2.getUint16(g4 + 8, true), z3 = r2.getUint16(g4 + 26, true), x4 = r2.getUint16(g4 + 28, true), U3 = g4 + 30 + z3 + x4;
      ut(this.source, g4, 30 + z3 + x4, s4, `\u672C\u5730\u5934 ${d4}`), (ct(this.source, g4 + 30, z3) !== d4 || b4 !== i5 || w4 !== n3) && ot("zip-invalid-structure", `ZIP \u672C\u5730\u5934\u4E0E\u4E2D\u592E\u76EE\u5F55\u5143\u6570\u636E\u4E0D\u4E00\u81F4\uFF1A${d4}`), !(n3 & 8) && (r2.getUint32(g4 + 18, true) !== a4 || r2.getUint32(g4 + 22, true) !== o5) && ot("zip-invalid-structure", `ZIP \u672C\u5730\u5934\u4E0E\u4E2D\u592E\u76EE\u5F55\u5927\u5C0F\u4E0D\u4E00\u81F4\uFF1A${d4}`), ut(this.source, U3, a4, s4, `\u538B\u7F29\u6570\u636E ${d4}`), this.entries.set(d4, { name: d4, size: a4, originalSize: o5, compression: i5, flags: n3, payload: this.source.subarray(U3, U3 + a4) }), u4 += p4;
    }
    u4 !== t2 && ot("zip-invalid-structure", "ZIP \u4E2D\u592E\u76EE\u5F55\u5305\u542B\u672A\u8BC6\u522B\u8BB0\u5F55");
  }
  unzip(t2) {
    const r2 = {};
    let e3 = 0;
    for (const n2 of this.entries.values()) {
      const i4 = { name: n2.name, size: n2.size, originalSize: n2.originalSize, compression: n2.compression };
      if (t2 && !t2(i4)) continue;
      let a3;
      try {
        n2.compression === 0 ? a3 = n2.payload : a3 = H(n2.payload, { out: new Uint8Array(n2.originalSize + 1) });
      } catch (t3) {
        if (t3 instanceof it) throw t3;
        ot("zip-invalid-structure", `ZIP \u6761\u76EE ${n2.name} \u89E3\u538B\u5931\u8D25\uFF1A${t3 instanceof Error ? t3.message : String(t3)}`);
      }
      a3.length !== n2.originalSize && ot("zip-size-mismatch", `ZIP \u6761\u76EE ${n2.name} \u5B9E\u9645\u8F93\u51FA ${a3.length} \u5B57\u8282\uFF0C\u58F0\u660E ${n2.originalSize} \u5B57\u8282`), e3 += a3.length, (a3.length > this.limits.maxEntryBytes || e3 > this.limits.maxTotalBytes) && ot("zip-output-too-large", `ZIP \u6761\u76EE ${n2.name} \u5B9E\u9645\u8F93\u51FA\u8D85\u8FC7\u914D\u7F6E\u4E0A\u9650`), Object.defineProperty(r2, n2.name, { value: a3, enumerable: true, configurable: true, writable: true });
    }
    return r2;
  }
};

// .ppt-build/node_modules/@web-ppt/core/dist/parser-C9d4nRaU.js
var o3 = /* @__PURE__ */ new Map([["xml", "http://www.w3.org/XML/1998/namespace"]]);
var s3 = class {
  constructor(t2) {
    this.namespaceURI = null, this.attributes = [], this.childNodes = [], this.nextElementSibling = null, this.namespaceBindings = o3, this.tagName = t2;
    const e3 = t2.indexOf(":");
    this.prefix = e3 < 0 ? null : t2.slice(0, e3), this.localName = e3 < 0 ? t2 : t2.slice(e3 + 1);
  }
  resolveNamespaces(t2) {
    let e3;
    for (const n2 of this.attributes) n2.name === "xmlns" ? (e3 ?? (e3 = new Map((t2 == null ? void 0 : t2.namespaceBindings) ?? o3))).set("", n2.value) : n2.prefix === "xmlns" && (e3 ?? (e3 = new Map((t2 == null ? void 0 : t2.namespaceBindings) ?? o3))).set(n2.localName, n2.value);
    this.namespaceBindings = e3 ?? (t2 == null ? void 0 : t2.namespaceBindings) ?? o3, this.namespaceURI = this.lookupNamespaceURI(this.prefix);
    for (const t3 of this.attributes) t3.name === "xmlns" || t3.prefix === "xmlns" ? t3.namespaceURI = "http://www.w3.org/2000/xmlns/" : t3.prefix && (t3.namespaceURI = this.lookupNamespaceURI(t3.prefix));
  }
  get firstElementChild() {
    for (const t2 of this.childNodes) if (typeof t2 != "string") return t2;
    return null;
  }
  get children() {
    return this.childNodes.filter((t2) => typeof t2 != "string");
  }
  getAttribute(t2) {
    for (const e3 of this.attributes) if (e3.name === t2) return e3.value;
    return null;
  }
  lookupNamespaceURI(t2) {
    const e3 = t2 ?? "";
    return this.namespaceBindings.get(e3) || null;
  }
  get textContent() {
    let t2 = "";
    for (const e3 of this.childNodes) t2 += typeof e3 == "string" ? e3 : e3.textContent;
    return t2;
  }
  getElementsByTagName(t2) {
    const e3 = [], n2 = (r2) => {
      for (const l3 of r2.children) (t2 === "*" || l3.localName === t2 || l3.tagName === t2) && e3.push(l3), n2(l3);
    };
    return n2(this), e3;
  }
};
var i3 = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
function a2(t2) {
  return t2.indexOf("&") < 0 ? t2 : t2.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (t3, e3) => {
    if (e3[0] === "#") {
      const n2 = e3[1] === "x" || e3[1] === "X" ? parseInt(e3.slice(2), 16) : parseInt(e3.slice(1), 10);
      return Number.isFinite(n2) && n2 >= 0 ? String.fromCodePoint(n2) : t3;
    }
    return i3[e3] ?? t3;
  });
}
function c3(t2) {
  let e3 = 0;
  const n2 = t2.length, r2 = [];
  let l3 = null;
  const o4 = (t3, e4) => {
    const n3 = t3.children;
    n3.length && (n3[n3.length - 1].nextElementSibling = e4), t3.childNodes.push(e4);
  };
  for (; e3 < n2; ) {
    const i4 = t2.indexOf("<", e3);
    if (i4 < 0) break;
    if (i4 > e3) {
      const n3 = t2.slice(e3, i4);
      r2.length && n3.trim() ? r2[r2.length - 1].childNodes.push(a2(n3)) : r2.length && n3.includes(" ") && r2[r2.length - 1].childNodes.push(n3);
    }
    if (t2.startsWith("<!--", i4)) {
      const r3 = t2.indexOf("-->", i4 + 4);
      e3 = r3 < 0 ? n2 : r3 + 3;
      continue;
    }
    if (t2.startsWith("<![CDATA[", i4)) {
      const l4 = t2.indexOf("]]>", i4 + 9), o5 = t2.slice(i4 + 9, l4 < 0 ? n2 : l4);
      r2.length && r2[r2.length - 1].childNodes.push(o5), e3 = l4 < 0 ? n2 : l4 + 3;
      continue;
    }
    if (t2.startsWith("<?", i4) || t2.startsWith("<!", i4)) {
      const r3 = t2.indexOf(">", i4);
      e3 = r3 < 0 ? n2 : r3 + 1;
      continue;
    }
    if (t2[i4 + 1] === "/") {
      const n3 = t2.indexOf(">", i4);
      if (n3 < 0) break;
      r2.pop(), e3 = n3 + 1;
      continue;
    }
    let c4 = i4 + 1, u4 = "";
    for (; c4 < n2; ) {
      const e4 = t2[c4];
      if (u4) e4 === u4 && (u4 = "");
      else if (e4 === '"' || e4 === "'") u4 = e4;
      else if (e4 === ">") break;
      c4++;
    }
    if (c4 >= n2) break;
    const d4 = t2[c4 - 1] === "/", f4 = t2.slice(i4 + 1, d4 ? c4 - 1 : c4);
    let h4 = 0;
    for (; h4 < f4.length && !/[\s/]/.test(f4[h4]); ) h4++;
    const p4 = new s3(f4.slice(0, h4)), m4 = /([^\s=/]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
    m4.lastIndex = h4;
    let g4;
    for (; (g4 = m4.exec(f4)) !== null; ) {
      const t3 = g4[1], e4 = t3.indexOf(":");
      p4.attributes.push({ name: t3, localName: e4 < 0 ? t3 : t3.slice(e4 + 1), prefix: e4 < 0 ? null : t3.slice(0, e4), namespaceURI: null, value: a2(g4[3] ?? g4[4] ?? "") });
    }
    p4.resolveNamespaces(r2[r2.length - 1]), r2.length ? o4(r2[r2.length - 1], p4) : l3 || (l3 = p4), d4 || r2.push(p4), e3 = c4 + 1;
  }
  if (!l3) throw new Error("XML \u89E3\u6790\u5931\u8D25\uFF1A\u672A\u627E\u5230\u6839\u5143\u7D20");
  return l3;
}
var u3 = typeof DOMParser < "u" ? new DOMParser() : null;
function d3(t2) {
  if (!u3) return c3(t2);
  const e3 = u3.parseFromString(t2, "application/xml"), n2 = e3.getElementsByTagName("parsererror")[0];
  if (n2) throw new Error("XML \u89E3\u6790\u5931\u8D25: " + (n2.textContent ?? "").slice(0, 200));
  return e3.documentElement;
}
function f3(t2, e3) {
  const n2 = [];
  if (!t2) return n2;
  for (let r2 = t2.firstElementChild; r2; r2 = r2.nextElementSibling) r2.localName === e3 && n2.push(r2);
  return n2;
}
function h3(t2, e3) {
  if (!t2) return null;
  for (let n2 = t2.firstElementChild; n2; n2 = n2.nextElementSibling) if (n2.localName === e3) return n2;
  return null;
}
function p3(t2, ...e3) {
  let n2 = t2;
  for (const t3 of e3) if (n2 = h3(n2, t3), !n2) return null;
  return n2;
}
function m3(t2, e3) {
  if (!t2) return null;
  if (e3.includes(":")) {
    for (const n4 of Array.from(t2.attributes)) if (n4.name === e3) return n4.value;
    const n3 = e3.split(":")[1];
    for (const e4 of Array.from(t2.attributes)) if (e4.localName === n3) return e4.value;
    return null;
  }
  const n2 = t2.getAttribute(e3);
  if (n2 !== null) return n2;
  for (const n3 of Array.from(t2.attributes)) if (n3.localName === e3) return n3.value;
  return null;
}
function g3(t2, e3) {
  const n2 = m3(t2, e3);
  if (n2 === null || n2 === "") return null;
  const r2 = Number(n2);
  return Number.isFinite(r2) ? r2 : null;
}
function b3(t2, e3, n2 = false) {
  const r2 = m3(t2, e3);
  return r2 === null ? n2 : r2 === "1" || r2 === "true";
}
var v3 = (t2) => (t2 ?? 0) / 9525;
var y3 = (t2) => t2 / 100 * (96 / 72);
var x3 = { window: "FFFFFF", windowText: "000000" };
var w3 = { black: "000000", white: "FFFFFF", red: "FF0000", green: "008000", lime: "00FF00", blue: "0000FF", yellow: "FFFF00", cyan: "00FFFF", magenta: "FF00FF", gray: "808080", ltGray: "C0C0C0", dkGray: "404040", orange: "FFA500", purple: "800080", brown: "A52A2A" };
var k2 = ["srgbClr", "schemeClr", "sysClr", "prstClr", "scrgbClr", "hslClr"];
function C3(t2, e3) {
  if (!t2) return null;
  for (const n2 of k2) {
    const r2 = h3(t2, n2);
    if (r2) return S3(r2, e3);
  }
  return null;
}
function S3(t2, e3) {
  let n2 = P3(t2, e3), r2 = 1;
  for (let e4 = t2.firstElementChild; e4; e4 = e4.nextElementSibling) {
    const t3 = (g3(e4, "val") ?? 0) / 1e5;
    switch (e4.localName) {
      case "alpha":
        r2 = t3;
        break;
      case "shade":
        n2 = A3(n2, (e5) => e5 * t3);
        break;
      case "tint":
        n2 = A3(n2, (e5) => e5 * t3 + (1 - t3));
        break;
      case "lumMod":
        n2 = $2(n2, (e5, n3, r3) => [e5, n3, r3 * t3]);
        break;
      case "lumOff":
        n2 = $2(n2, (e5, n3, r3) => [e5, n3, r3 + t3]);
        break;
      case "satMod":
        n2 = $2(n2, (e5, n3, r3) => [e5, n3 * t3, r3]);
        break;
    }
  }
  const [l3, o4, s4] = n2.map((t3) => Math.round(F2(t3, 0, 255)));
  return r2 >= 1 ? `rgb(${l3},${o4},${s4})` : `rgba(${l3},${o4},${s4},${Math.round(r2 * 1e3) / 1e3})`;
}
function P3(t2, e3) {
  switch (t2.localName) {
    case "srgbClr":
      return M3(m3(t2, "val") ?? "000000");
    case "sysClr":
      return M3(m3(t2, "lastClr") ?? x3[m3(t2, "val") ?? ""] ?? "000000");
    case "prstClr":
      return M3(w3[m3(t2, "val") ?? ""] ?? "808080");
    case "scrgbClr":
      return [(g3(t2, "r") ?? 0) / 1e5 * 255, (g3(t2, "g") ?? 0) / 1e5 * 255, (g3(t2, "b") ?? 0) / 1e5 * 255];
    case "hslClr":
      return T2((g3(t2, "hue") ?? 0) / 6e4 / 360, (g3(t2, "sat") ?? 0) / 1e5, (g3(t2, "lum") ?? 0) / 1e5);
    case "schemeClr": {
      const n2 = m3(t2, "val") ?? "tx1";
      if (n2 === "phClr") return e3.phClr ? N2(e3.phClr) : [128, 128, 128];
      const r2 = e3.clrMap[n2] ?? n2;
      return M3(e3.theme[r2] ?? e3.theme[n2] ?? "000000");
    }
  }
  return [0, 0, 0];
}
function N2(t2) {
  const e3 = t2.match(/rgba?\(([^)]+)\)/);
  if (e3) {
    const t3 = e3[1].split(",").map((t4) => Number(t4.trim()));
    return [t3[0] || 0, t3[1] || 0, t3[2] || 0];
  }
  return M3(t2);
}
function M3(t2) {
  const e3 = t2.replace("#", "").padStart(6, "0");
  return [parseInt(e3.slice(0, 2), 16) || 0, parseInt(e3.slice(2, 4), 16) || 0, parseInt(e3.slice(4, 6), 16) || 0];
}
function F2(t2, e3, n2) {
  return Math.min(n2, Math.max(e3, t2));
}
var I3 = (t2) => {
  const e3 = t2 / 255;
  return e3 <= 0.04045 ? e3 / 12.92 : ((e3 + 0.055) / 1.055) ** 2.4;
};
var R3 = (t2) => {
  const e3 = F2(t2, 0, 1);
  return (e3 <= 31308e-7 ? e3 * 12.92 : 1.055 * e3 ** (1 / 2.4) - 0.055) * 255;
};
function A3(t2, e3) {
  return t2.map((t3) => R3(e3(I3(t3))));
}
function $2(t2, e3) {
  const [n2, r2, l3] = E2(t2), [o4, s4, i4] = e3(n2, r2, l3);
  return T2(o4, F2(s4, 0, 1), F2(i4, 0, 1));
}
function E2([t2, e3, n2]) {
  t2 /= 255, e3 /= 255, n2 /= 255;
  const r2 = Math.max(t2, e3, n2), l3 = Math.min(t2, e3, n2), o4 = (r2 + l3) / 2;
  if (r2 === l3) return [0, 0, o4];
  const s4 = r2 - l3, i4 = o4 > 0.5 ? s4 / (2 - r2 - l3) : s4 / (r2 + l3);
  let a3;
  return r2 === t2 ? a3 = (e3 - n2) / s4 + (e3 < n2 ? 6 : 0) : r2 === e3 ? a3 = (n2 - t2) / s4 + 2 : a3 = (t2 - e3) / s4 + 4, [a3 / 6, i4, o4];
}
function T2(t2, e3, n2) {
  if (e3 === 0) return [n2 * 255, n2 * 255, n2 * 255];
  const r2 = n2 < 0.5 ? n2 * (1 + e3) : n2 + e3 - n2 * e3, l3 = 2 * n2 - r2, o4 = (t3) => (t3 < 0 && (t3 += 1), t3 > 1 && (t3 -= 1), t3 < 1 / 6 ? l3 + (r2 - l3) * 6 * t3 : t3 < 1 / 2 ? r2 : t3 < 2 / 3 ? l3 + (r2 - l3) * (2 / 3 - t3) * 6 : l3);
  return [o4(t2 + 1 / 3) * 255, o4(t2) * 255, o4(t2 - 1 / 3) * 255];
}
var L3 = (t2, e3, n2) => [...n2].every((n3, r2) => t2[e3 + r2] === n3.charCodeAt(0));
var B3 = (t2, e3) => t2[e3] * 256 + t2[e3 + 1];
var z2 = (t2, e3) => t2[e3] + t2[e3 + 1] * 256;
var j3 = (t2, e3) => t2[e3] + t2[e3 + 1] * 256 + t2[e3 + 2] * 65536;
var O2 = (t2, e3) => t2[e3] * 16777216 + t2[e3 + 1] * 65536 + t2[e3 + 2] * 256 + t2[e3 + 3];
var U2 = (t2, e3) => t2[e3] + t2[e3 + 1] * 256 + t2[e3 + 2] * 65536 + t2[e3 + 3] * 16777216 >>> 0;
var D3 = (t2, e3) => {
  const n2 = B3(t2, e3);
  return n2 > 32767 ? n2 - 65536 : n2;
};
var H2 = (t2, e3) => {
  const n2 = z2(t2, e3);
  return n2 > 32767 ? n2 - 65536 : n2;
};
var W2 = (t2, e3) => U2(t2, e3) | 0;
var G2 = (t2, e3, n2 = 96, r2 = 96) => Number.isFinite(t2) && Number.isFinite(e3) && t2 > 0 && e3 > 0 ? { width: t2, height: e3, dpiX: n2 > 0 ? n2 : 96, dpiY: r2 > 0 ? r2 : 96 } : null;
function X2(t2) {
  if (t2.length < 24 || !L3(t2, 1, "PNG")) return null;
  const e3 = O2(t2, 16), n2 = O2(t2, 20);
  let r2 = 96, l3 = 96;
  for (let e4 = 8; e4 + 12 <= t2.length; ) {
    const n3 = O2(t2, e4);
    if (n3 > t2.length - e4 - 12) break;
    L3(t2, e4 + 4, "pHYs") && n3 === 9 && t2[e4 + 16] === 1 && (r2 = O2(t2, e4 + 8) * 0.0254, l3 = O2(t2, e4 + 12) * 0.0254), e4 += n3 + 12;
  }
  return G2(e3, n2, r2, l3);
}
var V2 = /* @__PURE__ */ new Set([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207]);
function q2(t2, e3, n2) {
  if (e3 + 14 > n2 || !L3(t2, e3, "Exif\0\0")) return null;
  const r2 = e3 + 6, l3 = L3(t2, r2, "II");
  if (!l3 && !L3(t2, r2, "MM")) return null;
  const o4 = (t3, e4) => t3 >= r2 && t3 + e4 <= n2, s4 = (e4) => l3 ? z2(t2, e4) : B3(t2, e4), i4 = (e4) => l3 ? U2(t2, e4) : O2(t2, e4);
  if (!o4(r2, 8) || s4(r2 + 2) !== 42) return null;
  const a3 = r2 + i4(r2 + 4);
  if (!o4(a3, 2)) return null;
  let c4 = 0, u4 = 0, d4 = 2;
  const f4 = s4(a3);
  for (let t3 = 0; t3 < f4; t3++) {
    const e4 = a3 + 2 + t3 * 12;
    if (!o4(e4, 12)) break;
    const n3 = s4(e4), l4 = s4(e4 + 2), f5 = i4(e4 + 4);
    let h5 = 0;
    if (f5 === 1 && l4 === 3) h5 = s4(e4 + 8);
    else if (f5 === 1 && l4 === 5) {
      const t4 = r2 + i4(e4 + 8);
      o4(t4, 8) && (h5 = i4(t4) / Math.max(i4(t4 + 4), 1));
    }
    n3 === 282 ? c4 = h5 : n3 === 283 ? u4 = h5 : n3 === 296 && h5 && (d4 = h5);
  }
  const h4 = d4 === 3 ? 2.54 : d4 === 2 ? 1 : 0;
  return c4 > 0 && h4 ? [c4 * h4, (u4 || c4) * h4] : null;
}
function Y2(t2) {
  if (t2.length < 12 || t2[0] !== 255 || t2[1] !== 216) return null;
  let e3 = 0, n2 = 0, r2 = null, l3 = null;
  for (let o5 = 2; o5 + 4 <= t2.length; ) {
    if (t2[o5++] !== 255) continue;
    for (; t2[o5] === 255; ) o5++;
    const s4 = t2[o5++];
    if (s4 === 218 || s4 === 217) break;
    if (s4 === 1 || s4 >= 208 && s4 <= 215) continue;
    if (o5 + 2 > t2.length) break;
    const i4 = B3(t2, o5);
    if (i4 < 2 || o5 + i4 > t2.length) break;
    const a3 = o5 + 2;
    if (s4 === 224 && i4 >= 14 && L3(t2, a3, "JFIF\0")) {
      const e4 = t2[a3 + 7], n3 = e4 === 1 ? 1 : e4 === 2 ? 2.54 : 0;
      n3 && (r2 = [B3(t2, a3 + 8) * n3, B3(t2, a3 + 10) * n3]);
    } else s4 === 225 && i4 >= 16 ? l3 ?? (l3 = q2(t2, a3, o5 + i4)) : V2.has(s4) && i4 >= 7 && (n2 = B3(t2, a3 + 1), e3 = B3(t2, a3 + 3));
    o5 += i4;
  }
  const o4 = r2 ?? l3 ?? [96, 96];
  return G2(e3, n2, o4[0], o4[1]);
}
function _2(t2) {
  return t2.length < 10 || !L3(t2, 0, "GIF87a") && !L3(t2, 0, "GIF89a") ? null : G2(z2(t2, 6), z2(t2, 8));
}
function Z3(t2) {
  if (t2.length < 26 || !L3(t2, 0, "BM")) return null;
  const e3 = U2(t2, 14);
  if (e3 === 12) return G2(z2(t2, 18), z2(t2, 20));
  if (e3 < 40 || t2.length < 46) return null;
  const n2 = Math.abs(W2(t2, 18)), r2 = Math.abs(W2(t2, 22)), l3 = W2(t2, 38) * 0.0254, o4 = W2(t2, 42) * 0.0254;
  return G2(n2, r2, l3, o4);
}
function J2(t2) {
  if (t2.length < 30 || !L3(t2, 0, "RIFF") || !L3(t2, 8, "WEBP")) return null;
  for (let e3 = 12; e3 + 8 <= t2.length; ) {
    const n2 = U2(t2, e3 + 4), r2 = e3 + 8;
    if (n2 > t2.length - r2) break;
    if (L3(t2, e3, "VP8X") && n2 >= 10) return G2(j3(t2, r2 + 4) + 1, j3(t2, r2 + 7) + 1);
    if (L3(t2, e3, "VP8L") && n2 >= 5 && t2[r2] === 47) {
      const e4 = U2(t2, r2 + 1);
      return G2((e4 & 16383) + 1, (e4 >>> 14 & 16383) + 1);
    }
    if (L3(t2, e3, "VP8 ") && n2 >= 10 && L3(t2, r2 + 3, "\x9D*")) return G2(z2(t2, r2 + 6) & 16383, z2(t2, r2 + 8) & 16383);
    e3 = r2 + n2 + (n2 & 1);
  }
  return null;
}
function K2(t2) {
  if (t2.length < 16) return null;
  const e3 = L3(t2, 0, "II");
  if (!e3 && !L3(t2, 0, "MM")) return null;
  const n2 = (n3) => e3 ? z2(t2, n3) : B3(t2, n3), r2 = (n3) => e3 ? U2(t2, n3) : O2(t2, n3);
  if (n2(2) !== 42) return null;
  const l3 = r2(4);
  if (l3 + 2 > t2.length) return null;
  const o4 = n2(l3), s4 = /* @__PURE__ */ new Map();
  for (let e4 = 0; e4 < o4; e4++) {
    const o5 = l3 + 2 + e4 * 12;
    if (o5 + 12 > t2.length) break;
    const i5 = n2(o5), a4 = n2(o5 + 2), c4 = r2(o5 + 4);
    let u4 = 0;
    if (c4 === 1 && a4 === 3) u4 = n2(o5 + 8);
    else if (c4 === 1 && a4 === 4) u4 = r2(o5 + 8);
    else if (c4 === 1 && a4 === 5) {
      const e5 = r2(o5 + 8);
      e5 + 8 <= t2.length && (u4 = r2(e5) / Math.max(r2(e5 + 4), 1));
    }
    u4 && s4.set(i5, u4);
  }
  const i4 = s4.get(296) ?? 2, a3 = i4 === 3 ? 2.54 : i4 === 2 ? 1 : 0;
  return G2(s4.get(256) ?? 0, s4.get(257) ?? 0, a3 ? (s4.get(282) ?? 96) * a3 : 96, a3 ? (s4.get(283) ?? s4.get(282) ?? 96) * a3 : 96);
}
function Q3(t2) {
  var e3, n2;
  const r2 = (e3 = new TextDecoder().decode(t2.subarray(0, Math.min(t2.length, 65536))).match(/<svg\b[^>]*>/i)) == null ? void 0 : e3[0];
  if (!r2) return null;
  const l3 = (t3) => {
    var e4;
    const n3 = (e4 = r2.match(new RegExp(`\\b${t3}\\s*=\\s*["']([^"']+)["']`, "i"))) == null ? void 0 : e4[1], l4 = n3 == null ? void 0 : n3.trim().match(/^([0-9]+(?:\.[0-9]+)?)(px|in|cm|mm|pt|pc)?$/i);
    if (!l4) return null;
    const o5 = { px: 1, in: 96, cm: 96 / 2.54, mm: 96 / 25.4, pt: 96 / 72, pc: 16 };
    return Number(l4[1]) * o5[(l4[2] ?? "px").toLowerCase()];
  };
  let o4 = l3("width"), s4 = l3("height");
  const i4 = (n2 = r2.match(/\bviewBox\s*=\s*["']([^"']+)["']/i)) == null ? void 0 : n2[1].trim().split(/[ ,]+/).map(Number);
  return (!o4 || !s4) && (i4 == null ? void 0 : i4.length) === 4 && i4.every(Number.isFinite) && (o4 || (o4 = Math.abs(i4[2])), s4 || (s4 = Math.abs(i4[3]))), G2(o4 ?? 0, s4 ?? 0);
}
function tt2(t2) {
  if (t2.length >= 44 && U2(t2, 0) === 1 && U2(t2, 40) === 1179469088) {
    const e3 = Math.abs(W2(t2, 16) - W2(t2, 8)), n2 = Math.abs(W2(t2, 20) - W2(t2, 12)), r2 = Math.abs(W2(t2, 32) - W2(t2, 24)), l3 = Math.abs(W2(t2, 36) - W2(t2, 28));
    return G2(e3 || r2 * 96 / 2540, n2 || l3 * 96 / 2540, r2 ? e3 * 2540 / r2 : 96, l3 ? n2 * 2540 / l3 : 96);
  }
  if (t2.length >= 22 && U2(t2, 0) === 2596720087) return G2(Math.abs(H2(t2, 10) - H2(t2, 6)), Math.abs(H2(t2, 12) - H2(t2, 8)), z2(t2, 14), z2(t2, 14));
  for (const e3 of [512, 0]) {
    if (e3 + 14 > t2.length) continue;
    const n2 = D3(t2, e3 + 2), r2 = D3(t2, e3 + 4), l3 = D3(t2, e3 + 6), o4 = D3(t2, e3 + 8);
    if (o4 > r2 && l3 > n2) return G2(o4 - r2, l3 - n2, 72, 72);
  }
  return null;
}
function et2(t2) {
  return X2(t2) ?? Y2(t2) ?? _2(t2) ?? Z3(t2) ?? J2(t2) ?? K2(t2) ?? Q3(t2) ?? tt2(t2);
}
var nt2 = null;
var rt2 = null;
var lt2 = /* @__PURE__ */ new WeakMap();
function ot2(t2, e3) {
  const n2 = e3 ? lt2.get(e3) : rt2;
  n2 ? lt2.set(t2, n2) : lt2.delete(t2);
}
function at2(t2, e3) {
  return lt2.has(e3) && /^http:\/\/schemas.microsoft.com\/office\/drawing\/(2014|2015\/9\/8|2015\/10\/21|2016\/5\/(9|10|11|12|13|14|15))\/chartex$/.test(t2);
}
function ct2(t2) {
  nt2 = t2;
}
function dt(t2 = false, e3) {
  return t2 ? e3 ? lt2.get(e3) ?? null : rt2 : nt2;
}
var ft2 = null;
function ht(t2) {
  ft2 = t2;
}
function mt(t2, e3) {
  if (!ft2) return null;
  let n2 = null;
  try {
    n2 = ft2(t2, e3);
  } catch {
    return null;
  }
  if (!n2) return null;
  try {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(n2)}`;
  } catch {
    return null;
  }
}
var gt = /* @__PURE__ */ new Set(["emf", "wmf", "pict", "pct", "pic"]);
var bt = { 1: "appear", 2: "fly", 3: "blinds", 4: "zoom", 5: "checkerboard", 6: "circle", 7: "fly", 8: "diamond", 9: "dissolve", 10: "fade", 11: "appear", 12: "fly", 13: "plus", 14: "randomBar", 15: "spin", 16: "split", 17: "stretch", 18: "strips", 19: "swivel", 20: "wheel", 21: "wheel", 22: "wipe", 23: "zoom", 24: "random", 25: "bounce", 26: "bounce", 28: "fade", 29: "float", 30: "float", 31: "grow", 32: "spin", 33: "float", 34: "swivel", 35: "fly", 36: "stretch", 37: "stretch", 38: "fly", 39: "float", 40: "spin", 41: "swivel", 42: "float", 43: "fly", 44: "spin", 45: "stretch", 46: "stretch", 47: "float", 48: "zoom", 49: "fly", 50: "stretch", 51: "swivel", 52: "stretch", 53: "grow", 59: "grow", 61: "spin", 62: "fade" };
var vt2 = { 1: "u", 2: "r", 4: "d", 8: "l", 3: "rd", 6: "ru", 9: "lu", 12: "ld", 5: "horz", 10: "vert", 16: "in", 32: "out", 26: "in-vert", 42: "out-vert", 21: "in-horz", 37: "out-horz" };
var yt = { fade: "fade", wipe: "wipe", barn: "split", blinds: "blinds", box: "zoom", checkerboard: "checkerboard", circle: "circle", diamond: "diamond", dissolve: "dissolve", plus: "plus", randombar: "randomBar", slide: "fly", strips: "strips", wedge: "wheel", wheel: "wheel", image: "fade" };
var xt = /* @__PURE__ */ new Set([19, 26, 30, 31, 62]);
function wt(t2, e3, n2) {
  const r2 = bt[t2], l3 = n2 == null ? void 0 : n2.match(/^([a-zA-Z]+)(?:\(([^)]*)\))?/), o4 = l3 == null ? void 0 : l3[1].toLowerCase(), s4 = ((l3 == null ? void 0 : l3[2]) ?? "").toLowerCase(), i4 = o4 ? yt[o4] : void 0, a3 = (xt.has(t2) ? r2 : i4 ?? r2) ?? "fade";
  if (o4 === "box") return { effect: "zoom", dir: s4 === "out" ? "out" : "in" };
  if (o4 === "circle" || o4 === "diamond" || o4 === "plus") return { effect: a3, dir: s4 === "in" ? "in" : "out" };
  if (o4 === "barn") return { effect: a3, dir: `${s4.startsWith("in") ? "in" : "out"}-${s4.includes("vertical") ? "vert" : "horz"}` };
  if (o4 === "wheel") return { effect: a3, dir: s4 || String(e3 || 1) };
  if (o4 === "checkerboard") return { effect: a3, dir: s4 === "down" ? "down" : "across" };
  if (o4 === "randombar" || o4 === "blinds") return { effect: a3, dir: s4.startsWith("vert") ? "vert" : "horz" };
  if (o4 === "strips") return { effect: a3, dir: { downleft: "ld", upleft: "lu", downright: "rd", upright: "ru" }[s4] ?? vt2[e3] };
  if (o4 === "wipe" || o4 === "slide") {
    const t3 = s4.includes("left") ? "l" : s4.includes("right") ? "r" : s4.includes("top") || s4.includes("up") ? "u" : s4.includes("bottom") || s4.includes("down") ? "d" : void 0, e4 = { l: "r", r: "l", u: "d", d: "u" };
    return { effect: a3, dir: t3 && (s4.startsWith("from") ? t3 : e4[t3]) };
  }
  return t2 === 23 && !n2 ? { effect: a3, dir: void 0 } : { effect: a3, dir: vt2[e3] };
}
var kt = "http://www.w3.org/2003/InkML";
var Ct = (t2, e3) => [...t2.getElementsByTagName("*")].filter((t3) => t3.namespaceURI === kt && t3.localName === e3);
function St(t2, e3) {
  if (t2.length > 4e6) throw new Error("InkML \u91C7\u6837\u6570\u636E\u8D85\u9650");
  const n2 = [], r2 = [], l3 = [], o4 = [], s4 = e3.indexOf("X"), i4 = e3.indexOf("Y");
  if (s4 < 0 || i4 < 0 || e3.length > 32) throw new Error("InkML \u901A\u9053\u4E0D\u652F\u6301\u7F16\u8F91");
  for (const a3 of t2.split(",")) {
    if (!a3.trim()) continue;
    const t3 = /\s*([!'\"]?)\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|\*)/gy;
    let c4 = 0, u4 = 0;
    for (; c4 < a3.length && a3.slice(c4).trim(); ) {
      t3.lastIndex = c4;
      const s5 = t3.exec(a3);
      if (!s5 || u4 >= e3.length) throw new Error("InkML \u542B\u65E0\u6CD5\u7F16\u8F91\u7684\u91C7\u6837\u7F16\u7801");
      c4 = t3.lastIndex;
      const [, i5, d4] = s5;
      if (d4 !== "*") {
        const t4 = Number(d4);
        if (!Number.isFinite(t4)) throw new Error("InkML \u975E\u6709\u9650\u91C7\u6837\u503C");
        const e4 = n2.length && (i5 || o4[u4]) || "!";
        o4[u4] = e4, e4 === "'" ? (l3[u4] = t4, r2[u4] = (r2[u4] ?? 0) + t4) : e4 === '"' ? (l3[u4] = (l3[u4] ?? 0) + t4, r2[u4] = (r2[u4] ?? 0) + l3[u4]) : (r2[u4] = t4, l3[u4] = 0);
      }
      if (!Number.isFinite(r2[u4])) throw new Error("InkML \u7F3A\u5C11\u9996\u70B9\u901A\u9053\u503C");
      u4++;
    }
    if (!Number.isFinite(r2[s4]) || !Number.isFinite(r2[i4])) throw new Error("InkML \u7F3A\u5C11\u5750\u6807");
    if (n2.push({ x: r2[s4], y: r2[i4], values: r2.slice(0, u4) }), n2.length > 1e5) throw new Error("InkML \u7B14\u753B\u91C7\u6837\u8D85\u9650");
  }
  return n2;
}
function Pt(t2) {
  if (t2.namespaceURI !== kt || t2.localName !== "ink") throw new Error("\u4E0D\u662F InkML \u6587\u6863");
  const e3 = [t2, ...t2.getElementsByTagName("*")], n2 = /* @__PURE__ */ new Map(), r2 = /* @__PURE__ */ new Map();
  for (const t3 of e3) for (const e4 of Array.from(t3.children)) r2.set(e4, t3);
  const l3 = (t3, e4) => {
    let n3 = t3;
    for (; n3; ) {
      const t4 = m3(n3, e4);
      if (t4 !== null) return t4;
      n3 = r2.get(n3);
    }
    return null;
  };
  for (const t3 of e3) {
    const e4 = m3(t3, "xml:id");
    if (e4) {
      if (n2.has(e4)) throw new Error("InkML \u8EAB\u4EFD\u91CD\u590D");
      n2.set(e4, t3);
    }
  }
  const o4 = (t3) => t3 != null && t3.startsWith("#") ? n2.get(t3.slice(1)) : void 0, s4 = Ct(t2, "trace"), i4 = [];
  if (s4.length > 1e3) throw new Error("InkML \u7B14\u753B\u6570\u91CF\u8D85\u9650");
  const a3 = h3(t2, "traceFormat") ?? Ct(t2, "traceFormat")[0], c4 = Ct(t2, "brush");
  let u4, d4 = 0;
  if (s4.forEach((t3, e4) => {
    var n3;
    const r3 = [], s5 = /* @__PURE__ */ new Set();
    let p4 = o4(l3(t3, "contextRef"));
    for (; p4; ) {
      if (s5.has(p4) || r3.length > 32) throw new Error("InkML \u4E0A\u4E0B\u6587\u5F15\u7528\u5FAA\u73AF");
      s5.add(p4), r3.push(p4), p4 = o4(m3(p4, "contextRef"));
    }
    const g4 = (t4) => r3.map((e5) => m3(e5, t4)).find((t5) => t5 !== null) ?? null, b4 = (t4) => r3.map((e5) => h3(e5, t4)).find((t5) => t5 !== null) ?? null, v4 = b4("inkSource") ?? o4(g4("inkSourceRef")), y4 = b4("traceFormat") ?? o4(g4("traceFormatRef")) ?? h3(v4 ?? null, "traceFormat") ?? a3, x4 = y4 ? f3(y4, "channel").map((t4) => (m3(t4, "name") ?? "").toUpperCase()) : ["X", "Y"], w4 = St(t3.textContent ?? "", x4);
    if ((d4 += w4.length) > 1e5) throw new Error("InkML \u91C7\u6837\u603B\u91CF\u8D85\u9650");
    const k3 = o4(l3(t3, "brushRef")) ?? o4(g4("brushRef")) ?? c4[0];
    let C4 = "#000000", S4 = 0;
    for (const t4 of f3(k3 ?? null, "brushProperty")) {
      const e5 = (n3 = m3(t4, "name")) == null ? void 0 : n3.toLowerCase(), r4 = m3(t4, "value") ?? "";
      e5 === "color" ? C4 = /^[\da-f]{6}$/i.test(r4) ? "#" + r4 : r4 : (e5 === "width" || e5 === "height") && (S4 = Math.max(S4, Number(r4) || 0));
    }
    const P4 = o4(g4("canvasRef")), N3 = h3(P4 ?? null, "traceFormat"), M4 = f3(N3, "channel").find((t4) => m3(t4, "name") === "X"), F3 = f3(N3, "channel").find((t4) => m3(t4, "name") === "Y");
    if (M4 && F3 && ["min", "max"].every((t4) => m3(M4, t4) !== null && m3(F3, t4) !== null)) {
      const t4 = { x: Number(m3(M4, "min")), y: Number(m3(F3, "min")), width: Number(m3(M4, "max")) - Number(m3(M4, "min")), height: Number(m3(F3, "max")) - Number(m3(F3, "min")) };
      if (Object.values(t4).every(Number.isFinite) && t4.width >= 0 && t4.height >= 0) {
        if (u4 && JSON.stringify(u4) !== JSON.stringify(t4)) throw new Error("InkML \u591A\u753B\u5E03\u4E0D\u652F\u6301\u5171\u540C\u7F16\u8F91");
        u4 = t4;
      }
    }
    i4.push({ id: m3(t3, "xml:id") ?? `trace-${e4 + 1}`, points: w4, channels: x4, color: C4, width: S4 });
  }), !u4) {
    let t3 = 1 / 0, e4 = 1 / 0, n3 = -1 / 0, r3 = -1 / 0;
    for (const l4 of i4) for (const o5 of l4.points) t3 = Math.min(t3, o5.x), e4 = Math.min(e4, o5.y), n3 = Math.max(n3, o5.x), r3 = Math.max(r3, o5.y);
    u4 = Number.isFinite(t3) ? { x: t3, y: e4, width: n3 - t3, height: r3 - e4 } : { x: 0, y: 0, width: 1, height: 1 };
  }
  return { strokes: i4, bounds: u4 };
}
function Nt(t2, e3, n2) {
  var r2, l3;
  const o4 = Pt(t2), s4 = o4.strokes.filter((t3) => t3.points.length >= 2).map((t3) => ({ pts: t3.points.map((t4) => [t4.x, t4.y]), brush: t3 }));
  if (!s4.length) return [];
  const { x: i4, y: a3, width: c4, height: u4 } = o4.bounds, d4 = i4 + c4, f4 = a3 + u4, h4 = d4 - i4, p4 = f4 - a3, m4 = Math.min(h4 > 0 ? e3 / h4 : 1 / 0, p4 > 0 ? n2 / p4 : 1 / 0), g4 = Number.isFinite(m4) && m4 > 0 ? m4 : 1, b4 = (e3 - h4 * g4) / 2, v4 = (n2 - p4 * g4) / 2, y4 = [];
  for (const t3 of s4) {
    const e4 = t3.pts.map(([t4, e5]) => [b4 + (t4 - i4) * g4, v4 + (e5 - a3) * g4]);
    let n3 = 1 / 0, o5 = 1 / 0, s5 = -1 / 0, c5 = -1 / 0;
    for (const [t4, r3] of e4) t4 < n3 && (n3 = t4), r3 < o5 && (o5 = r3), t4 > s5 && (s5 = t4), r3 > c5 && (c5 = r3);
    const u5 = (t4) => String(Math.round(t4 * 100) / 100), d5 = "M " + e4.map(([t4, e5]) => `${u5(t4 - n3)} ${u5(e5 - o5)}`).join(" L "), f5 = Math.max(0.75, Math.min((((r2 = t3.brush) == null ? void 0 : r2.width) ?? 0) * g4 || 2, 24));
    y4.push({ kind: "shape", x: n3, y: o5, w: Math.max(s5 - n3, 0), h: Math.max(c5 - o5, 0), rot: 0, flipH: false, flipV: false, path: d5, fill: { type: "none" }, stroke: { color: ((l3 = t3.brush) == null ? void 0 : l3.color) ?? "rgb(0,0,0)", width: f5, dash: null, cap: "round", join: "round" }, text: null, openGeom: true });
  }
  return y4;
}
var Mt = new RegExp("[" + ["Arabic", "Hebrew", "Syriac", "Thaana", "Nko", "Thai", "Lao", "Khmer", "Myanmar", "Tibetan", "Devanagari", "Bengali", "Gurmukhi", "Gujarati", "Oriya", "Tamil", "Telugu", "Kannada", "Malayalam", "Sinhala"].map((t2) => `\\p{Script=${t2}}`).join("") + "]", "u");
function Ft(t2, e3) {
  const { latin: n2, eastAsian: r2, complexScript: l3 } = t2, o4 = [];
  return n2 && o4.push(n2), r2 && r2 !== n2 && o4.push(r2), l3 && l3 !== n2 && l3 !== r2 && Mt.test(e3) && o4.push(l3), o4;
}
var It = { transform: 1, geometry: 2, fill: 4, stroke: 8, effects: 16, style: 32 };
var Rt = { b: 1, i: 2, u: 4, strike: 8, size: 16, fonts: 32, color: 64, baseline: 128, spacing: 256, caps: 512, outline: 1024, gradient: 2048, highlight: 4096, underlineColor: 8192, fontLatin: 16384, fontEastAsian: 32768, fontComplexScript: 65536 };
var At = { bullet: 1, bulletColor: 2, bulletFont: 4, bulletSize: 8, rtl: 16 };
var Lt = { title: ["title", "ctrTitle"], ctrTitle: ["ctrTitle", "title"], body: ["body", "subTitle", "obj"], subTitle: ["subTitle", "body"], obj: ["obj", "body"] };
function Bt(t2, e3, n2) {
  const r2 = n2.idx ?? null;
  if (r2 !== null) {
    const n3 = t2.find((t3) => {
      var n4;
      return ((n4 = e3(t3)) == null ? void 0 : n4.idx) === r2;
    });
    if (n3) return n3;
  }
  const l3 = n2.type ?? null;
  if (l3) for (const n3 of Lt[l3] ?? [l3]) {
    const r3 = t2.find((t3) => {
      var r4;
      return ((r4 = e3(t3)) == null ? void 0 : r4.type) === n3;
    });
    if (r3) return r3;
  }
  if (!l3 && r2 === null) return t2.find((t3) => {
    var n3;
    return ((n3 = e3(t3)) == null ? void 0 : n3.type) === "body";
  });
}
function zt(t2, e3) {
  if (!t2) return;
  const n2 = {}, r2 = h3(t2, "outerShdw"), l3 = h3(t2, "innerShdw"), o4 = r2 ?? l3;
  if (o4) {
    const t3 = v3(g3(o4, "dist") ?? 0), r3 = (g3(o4, "dir") ?? 0) / 6e4 * (Math.PI / 180);
    n2.shadow = { dx: t3 * Math.cos(r3), dy: t3 * Math.sin(r3), blur: v3(g3(o4, "blurRad") ?? 0), color: C3(o4, e3) ?? "rgba(0,0,0,0.4)", inner: o4 === l3 };
  }
  const s4 = h3(t2, "glow");
  s4 && (n2.glow = { radius: v3(g3(s4, "rad") ?? 0), color: C3(s4, e3) ?? "rgba(0,0,0,0.4)" });
  const i4 = h3(t2, "softEdge");
  i4 && (n2.softEdge = v3(g3(i4, "rad") ?? 0));
  const a3 = h3(t2, "reflection");
  return a3 && (n2.reflection = { alpha: (g3(a3, "stA") ?? 5e4) / 1e5, size: (g3(a3, "endPos") ?? 35e3) / 1e5, distance: v3(g3(a3, "dist") ?? 0) }), Object.keys(n2).length || t2.localName === "effectLst" ? n2 : void 0;
}
var jt = { none: "none", triangle: "triangle", stealth: "stealth", diamond: "diamond", oval: "oval", arrow: "arrow" };
var Ot = { sm: 2, med: 3, lg: 5 };
function Ut(t2) {
  if (!t2) return;
  const e3 = jt[m3(t2, "type") ?? "none"];
  if (e3) return { type: e3, w: Ot[m3(t2, "w") ?? "med"] ?? 3, h: Ot[m3(t2, "len") ?? "med"] ?? 3 };
}
function Dt(t2, e3) {
  if (!t2) return;
  const n2 = h3(t2, "sp3d"), r2 = h3(t2, "scene3d");
  if (!n2 && !r2) return;
  const l3 = {}, o4 = g3(n2, "extrusionH");
  o4 !== null && (l3.extrusion = v3(o4));
  const s4 = h3(n2, "bevelT");
  s4 && (l3.bevelTop = v3(g3(s4, "h") ?? 38100));
  const i4 = h3(n2, "bevelB");
  i4 && (l3.bevelBottom = v3(g3(i4, "h") ?? 38100));
  const a3 = g3(n2, "contourW");
  a3 !== null && (l3.contourWidth = v3(a3));
  for (const [t3, r3] of [["extrusionClr", "extrusionColor"], ["contourClr", "contourColor"]]) {
    const o5 = C3(h3(n2, t3), e3);
    o5 && (l3[r3] = o5);
  }
  const c4 = m3(n2, "prstMaterial");
  c4 && (l3.material = c4);
  const u4 = h3(r2, "camera"), d4 = m3(u4, "prst");
  d4 && (l3.camera = d4);
  const f4 = g3(u4, "fov"), p4 = g3(u4, "zoom");
  f4 !== null && (l3.fieldOfView = f4 / 6e4), p4 !== null && (l3.zoom = p4 / 1e5);
  const b4 = g3(n2, "z");
  b4 !== null && (l3.z = v3(b4));
  const y4 = h3(r2, "lightRig"), x4 = m3(y4, "rig"), w4 = m3(y4, "dir");
  x4 && (l3.lightRig = x4), w4 && (l3.lightDirection = w4), s4 && (l3.bevelTopWidth = v3(g3(s4, "w") ?? 76200)), i4 && (l3.bevelBottomWidth = v3(g3(i4, "w") ?? 76200));
  const k3 = h3(u4, "rot");
  return k3 && (l3.rotX = (g3(k3, "lat") ?? 0) / 6e4, l3.rotY = (g3(k3, "lon") ?? 0) / 6e4, l3.rotZ = (g3(k3, "rev") ?? 0) / 6e4), Object.keys(l3).length ? l3 : void 0;
}
var Ht = Object.freeze({ push: "l", pull: "l", cover: "l", wipe: "l", split: "horz-out", zoom: "out", checker: "horz", blinds: "horz", comb: "horz", randomBar: "horz", strips: "lu", vortex: "l", ripple: "center", glitter: "l", warp: "out", flythrough: "in", shred: "in", reveal: "l", pan: "l", doors: "horz", window: "horz", prism: "l" });
var Wt = Object.freeze({ ...Ht, switch: "l", flip: "l", ferris: "l", gallery: "l", conveyor: "l" });
function Gt(t2) {
  return Ht[t2];
}
var Vt = "http://schemas.openxmlformats.org/markup-compatibility/2006";
function qt(t2, e3) {
  var n2;
  if (t2.namespaceURI !== Vt) return null;
  let r2 = null;
  for (let l3 = t2.firstElementChild; l3; l3 = l3.nextElementSibling) {
    if (l3.namespaceURI !== Vt || (l3.localName === "Fallback" && (r2 ?? (r2 = l3)), l3.localName !== "Choice")) continue;
    const t3 = ((n2 = l3.getAttribute("Requires")) == null ? void 0 : n2.trim().split(/\s+/).filter(Boolean)) ?? [];
    if (t3.length && t3.every((t4) => {
      const n3 = l3.lookupNamespaceURI(t4);
      return n3 !== null && e3.has(n3);
    })) return l3;
  }
  return r2;
}
var Yt = "http://schemas.openxmlformats.org/presentationml/2006/main";
var _t = "http://schemas.openxmlformats.org/markup-compatibility/2006";
var Zt = "http://www.w3.org/2000/xmlns/";
var Jt = "http://www.w3.org/XML/1998/namespace";
var Kt = 4096;
function Qt(t2, e3, n2) {
  const r2 = [];
  for (let l3 = (t2 == null ? void 0 : t2.firstElementChild) ?? null; l3; l3 = l3.nextElementSibling) l3.namespaceURI === e3 && (!n2 || l3.localName === n2) && r2.push(l3);
  return r2;
}
function te(t2) {
  if (!t2) return { timing: null, readonly: false };
  const e3 = Qt(t2, Yt, "timing"), n2 = Qt(t2, _t, "AlternateContent").filter((t3) => Qt(t3, _t).some((t4) => Qt(t4, Yt, "timing").length > 0));
  if (e3.length) return { timing: e3[0], readonly: e3.length > 1 || n2.length > 0 };
  if (!n2.length) return { timing: null, readonly: false };
  const r2 = Qt(n2[0], _t, "Fallback")[0] ?? null;
  return { timing: Qt(r2, Yt, "timing")[0] ?? null, readonly: true };
}
function ee(t2, e3) {
  return t2.seen.has(e3) ? true : (t2.seen.add(e3), t2.nodes++, t2.nodes <= Kt);
}
function ne(t2, e3) {
  if (!ee(e3, t2)) return null;
  const n2 = [];
  for (let r2 = t2.firstElementChild; r2; r2 = r2.nextElementSibling) {
    if (!ee(e3, r2) || r2.namespaceURI !== Yt) return null;
    n2.push(r2);
  }
  return n2;
}
function re(t2, e3, n2) {
  const r2 = ne(t2, n2);
  return r2 && r2.length === e3.length && r2.every((t3, n3) => t3.localName === e3[n3]) ? r2 : null;
}
function le(t2, e3) {
  const n2 = new Set(e3);
  return Array.from(t2.attributes).every((t3) => t3.namespaceURI === Zt || t3.namespaceURI === Jt ? true : t3.namespaceURI === null && n2.has(t3.localName));
}
function oe(t2, e3, n2) {
  if (!t2 || !/^\d+$/.test(t2)) return null;
  const r2 = Number(t2);
  return Number.isSafeInteger(r2) && r2 >= e3 && r2 <= n2 ? r2 : null;
}
function se(t2, e3) {
  const n2 = oe(t2.getAttribute("id"), 1, 2147483647);
  return n2 === null || e3.ids.has(n2) ? false : (e3.ids.add(n2), true);
}
function ie(t2, e3, n2) {
  var r2;
  if (t2.localName !== "stCondLst" || !le(t2, [])) return false;
  const l3 = re(t2, ["cond"], n2);
  return !!l3 && le(l3[0], ["delay"]) && l3[0].getAttribute("delay") === String(e3) && (((r2 = ne(l3[0], n2)) == null ? void 0 : r2.length) ?? -1) === 0;
}
function ae(t2, e3) {
  var n2;
  if (t2.localName !== "tgtEl" || !le(t2, [])) return null;
  const r2 = re(t2, ["spTgt"], e3);
  return !r2 || !le(r2[0], ["spid"]) || (((n2 = ne(r2[0], e3)) == null ? void 0 : n2.length) ?? -1) !== 0 ? null : oe(r2[0].getAttribute("spid"), 1, 2147483647);
}
function ce(t2, e3, n2) {
  if (t2.localName !== "attrNameLst" || !le(t2, [])) return false;
  const r2 = ne(t2, n2);
  return !!r2 && r2.length === e3.length && r2.every((t3, r3) => {
    var l3;
    return t3.localName === "attrName" && le(t3, []) && (((l3 = ne(t3, n2)) == null ? void 0 : l3.length) ?? -1) === 0 && t3.textContent === e3[r3];
  });
}
function ue(t2, e3, n2, r2, l3) {
  if (t2.localName !== "cBhvr" || !le(t2, [])) return null;
  const o4 = n2.length ? ["cTn", "tgtEl", "attrNameLst"] : ["cTn", "tgtEl"], s4 = re(t2, o4, r2);
  if (!s4) return null;
  const i4 = s4[0];
  if (!le(i4, ["id", "dur", "fill"]) || !se(i4, r2) || i4.getAttribute("dur") !== String(e3) || i4.getAttribute("fill") !== "hold") return null;
  const a3 = ne(i4, r2);
  if (!a3 || (l3 === void 0 ? a3.length !== 0 : a3.length !== 1 || !ie(a3[0], l3, r2))) return null;
  const c4 = ae(s4[1], r2);
  return c4 === null || n2.length && !ce(s4[2], n2, r2) ? null : c4;
}
function de(t2, e3, n2, r2) {
  var l3;
  if (t2.localName !== "set" || !le(t2, [])) return null;
  const o4 = re(t2, ["cBhvr", "to"], r2), s4 = o4 ? ue(o4[0], 1, ["style.visibility"], r2, n2) : null, i4 = o4 && le(o4[1], []) ? re(o4[1], ["strVal"], r2) : null;
  return s4 === null || !i4 || !le(i4[0], ["val"]) || i4[0].getAttribute("val") !== e3 || (((l3 = ne(i4[0], r2)) == null ? void 0 : l3.length) ?? -1) !== 0 ? null : s4;
}
var fe = Object.freeze({ 2: Object.freeze({ 8: "slide(fromLeft)", 2: "slide(fromRight)", 1: "slide(fromTop)", 4: "slide(fromBottom)" }), 22: Object.freeze({ 8: "wipe(right)", 2: "wipe(left)", 1: "wipe(down)", 4: "wipe(up)" }), 23: Object.freeze({ 16: "box(in)", 32: "box(out)" }) });
function he(t2, e3, n2, r2, l3, o4) {
  var s4;
  if (t2.localName !== "animEffect" || !le(t2, ["transition", "filter"])) return null;
  const i4 = e3 === "10" ? "fade" : e3 === "9" ? "dissolve" : n2 ? (s4 = fe[e3]) == null ? void 0 : s4[n2] : void 0;
  if (!i4 || t2.getAttribute("filter") !== i4 || t2.getAttribute("transition") !== (r2 === "exit" ? "out" : "in")) return null;
  const a3 = re(t2, ["cBhvr"], o4);
  return a3 ? ue(a3[0], l3, [], o4) : null;
}
function pe(t2, e3, n2, r2) {
  var l3;
  if (e3 === "61") {
    if (t2.localName !== "animRot" || !le(t2, ["by"]) || t2.getAttribute("by") !== "21600000") return null;
    const e4 = re(t2, ["cBhvr"], r2);
    return e4 ? ue(e4[0], n2, ["r"], r2) : null;
  }
  if (t2.localName !== "animScale" || !le(t2, [])) return null;
  const o4 = re(t2, ["cBhvr", "by"], r2);
  return !o4 || !le(o4[1], ["x", "y"]) || o4[1].getAttribute("x") !== "125000" || o4[1].getAttribute("y") !== "125000" || (((l3 = ne(o4[1], r2)) == null ? void 0 : l3.length) ?? -1) !== 0 ? null : ue(o4[0], n2, ["ppt_w", "ppt_h"], r2);
}
function me(t2) {
  if (!t2) return false;
  const e3 = t2.trim().split(/\s+/);
  if (e3.length < 7 || e3[0] !== "M" || e3[e3.length - 1] !== "E") return false;
  let n2 = 0;
  for (let t3 = 0; t3 < e3.length - 1; ) {
    const r2 = e3[t3++];
    if ((n2 === 0 ? r2 !== "M" : r2 !== "L") || t3 + 1 >= e3.length) return false;
    const l3 = Number(e3[t3++]), o4 = Number(e3[t3++]);
    if (!Number.isFinite(l3) || !Number.isFinite(o4) || n2 === 0 && (l3 !== 0 || o4 !== 0)) return false;
    n2++;
  }
  return n2 >= 2 && n2 <= 256;
}
function ge(t2, e3, n2) {
  if (t2.localName !== "animMotion" || !le(t2, ["origin", "path", "pathEditMode"]) || t2.getAttribute("origin") !== "layout" || t2.getAttribute("pathEditMode") !== "relative" || !me(t2.getAttribute("path"))) return null;
  const r2 = re(t2, ["cBhvr"], n2);
  return r2 ? ue(r2[0], e3, ["ppt_x", "ppt_y"], n2) : null;
}
function be(t2, e3) {
  var n2, r2;
  if (t2.localName !== "par" || !le(t2, [])) return null;
  const l3 = (n2 = re(t2, ["cTn"], e3)) == null ? void 0 : n2[0];
  if (!l3 || !le(l3, ["id", "presetID", "presetClass", "presetSubtype", "dur", "fill", "nodeType"]) || !se(l3, e3)) return null;
  const o4 = l3.getAttribute("presetID"), s4 = l3.getAttribute("presetClass"), i4 = l3.getAttribute("presetSubtype"), a3 = oe(l3.getAttribute("dur"), 60, 1e4), c4 = l3.getAttribute("nodeType");
  if (!o4 || !s4 || a3 === null || l3.getAttribute("fill") !== "hold" || !["clickEffect", "withEffect", "afterEffect"].includes(c4 ?? "")) return null;
  const u4 = re(l3, ["stCondLst", "childTnLst"], e3), d4 = u4 ? oe(((r2 = u4[0].firstElementChild) == null ? void 0 : r2.getAttribute("delay")) ?? null, 0, 3e5) : null;
  if (!u4 || d4 === null || !ie(u4[0], d4, e3) || !le(u4[1], [])) return null;
  const f4 = ne(u4[1], e3);
  if (!f4) return null;
  let h4 = [];
  if (s4 === "path" && o4 === "0" && i4 === null && f4.length === 1) h4 = [ge(f4[0], a3, e3)];
  else if (s4 === "emph" && ["59", "61"].includes(o4) && i4 === null && f4.length === 1) h4 = [pe(f4[0], o4, a3, e3)];
  else if (["entr", "exit"].includes(s4) && ["1", "2", "9", "10", "22", "23"].includes(o4)) {
    if (["2", "22", "23"].includes(o4) !== (i4 !== null)) return null;
    const t3 = s4 === "entr" ? "visible" : "hidden", n3 = s4 === "entr" ? 0 : a3;
    if (o4 === "1" && f4.length === 1) h4 = [de(f4[0], t3, n3, e3)];
    else if (f4.length === 2) {
      const r3 = s4 === "entr" ? 1 : 0, l4 = 1 - r3;
      h4 = [he(f4[r3], o4, i4, s4, a3, e3), de(f4[l4], t3, n3, e3)];
    }
  }
  return !h4.length || h4.some((t3) => t3 === null) || h4.some((t3) => t3 !== h4[0]) ? null : c4;
}
function ve(t2, e3) {
  var n2;
  if (t2.localName !== "par" || !le(t2, [])) return false;
  const r2 = (n2 = re(t2, ["cTn"], e3)) == null ? void 0 : n2[0];
  if (!r2 || !le(r2, ["id", "fill", "nodeType"]) || !se(r2, e3) || r2.getAttribute("fill") !== "hold" || r2.getAttribute("nodeType") !== "clickEffect") return false;
  const l3 = re(r2, ["stCondLst", "childTnLst"], e3);
  if (!l3 || !ie(l3[0], "indefinite", e3) || !le(l3[1], [])) return false;
  const o4 = ne(l3[1], e3);
  if (!(o4 != null && o4.length)) return false;
  const s4 = o4.map((t3) => be(t3, e3));
  return s4[0] === "clickEffect" && s4.slice(1).every((t3) => t3 === "withEffect" || t3 === "afterEffect");
}
function ye(t2) {
  var e3, n2, r2, l3, o4, s4, i4;
  const a3 = { nodes: 0, ids: /* @__PURE__ */ new Set(), seen: /* @__PURE__ */ new Set() };
  if (t2.namespaceURI !== Yt || t2.localName !== "timing" || !le(t2, [])) return false;
  const c4 = (e3 = re(t2, ["tnLst"], a3)) == null ? void 0 : e3[0];
  if (!c4 || !le(c4, [])) return false;
  const u4 = (n2 = re(c4, ["par"], a3)) == null ? void 0 : n2[0];
  if (!u4 || !le(u4, [])) return false;
  const d4 = (r2 = re(u4, ["cTn"], a3)) == null ? void 0 : r2[0];
  if (!d4 || !le(d4, ["id", "dur", "restart", "nodeType"]) || !se(d4, a3) || d4.getAttribute("dur") !== "indefinite" || d4.getAttribute("restart") !== "never" || d4.getAttribute("nodeType") !== "tmRoot") return false;
  const f4 = (l3 = re(d4, ["childTnLst"], a3)) == null ? void 0 : l3[0];
  if (!f4 || !le(f4, [])) return false;
  const h4 = (o4 = re(f4, ["seq"], a3)) == null ? void 0 : o4[0];
  if (!h4 || !le(h4, ["concurrent", "nextAc"]) || h4.getAttribute("concurrent") !== "1" || h4.getAttribute("nextAc") !== "seek") return false;
  const p4 = (s4 = re(h4, ["cTn"], a3)) == null ? void 0 : s4[0];
  if (!p4 || !le(p4, ["id", "dur", "nodeType"]) || !se(p4, a3) || p4.getAttribute("dur") !== "indefinite" || p4.getAttribute("nodeType") !== "mainSeq") return false;
  const m4 = (i4 = re(p4, ["childTnLst"], a3)) == null ? void 0 : i4[0];
  if (!m4 || !le(m4, [])) return false;
  const g4 = ne(m4, a3);
  return !!(g4 != null && g4.length) && g4.every((t3) => ve(t3, a3));
}
function xe(t2) {
  return !ye(t2);
}
var we = { slow: 1e3, med: 750, fast: 500 };
var ke = "http://schemas.openxmlformats.org/presentationml/2006/main";
var Ce = "http://schemas.microsoft.com/office/powerpoint/2010/main";
var Se = "http://schemas.microsoft.com/office/powerpoint/2015/09/main";
var Pe = /* @__PURE__ */ new Set([Ce, Se]);
var Ne = { fade: "fade", cut: "cut", push: "push", pull: "pull", cover: "cover", wipe: "wipe", split: "split", zoom: "zoom", dissolve: "dissolve", checker: "checker", blinds: "blinds", comb: "comb", wheel: "wheel", circle: "circle", diamond: "diamond", plus: "plus", wedge: "wedge", newsflash: "newsflash", randomBar: "randomBar", strips: "strips", random: "dissolve", fadeThroughBlack: "fade", vortex: "vortex", switch: "switch", flip: "flip", ripple: "ripple", honeycomb: "honeycomb", glitter: "glitter", warp: "warp", flythrough: "flythrough", flash: "flash", shred: "shred", reveal: "reveal", wheelReverse: "wheelReverse", ferris: "ferris", gallery: "gallery", conveyor: "conveyor", pan: "pan", doors: "doors", window: "window", prism: "prism", morph: "morph" };
var Me = /* @__PURE__ */ new Set(["vortex", "switch", "flip", "ripple", "honeycomb", "glitter", "warp", "flythrough", "flash", "shred", "reveal", "wheelReverse", "ferris", "gallery", "conveyor", "pan", "doors", "window", "prism"]);
function Fe(t2) {
  const e3 = Ne[t2.localName];
  if (!e3) return;
  const n2 = t2.namespaceURI;
  return t2.localName === "morph" ? n2 === Se ? e3 : void 0 : Me.has(t2.localName) ? n2 === Ce ? e3 : void 0 : n2 === ke ? e3 : void 0;
}
function Ie(t2, e3, n2) {
  const r2 = Array.from(t2.attributes).find((t3) => t3.localName === e3 && t3.namespaceURI === n2);
  if (!r2 || r2.value === "") return null;
  const l3 = Number(r2.value);
  return Number.isFinite(l3) ? l3 : null;
}
function Re(t2, e3, n2) {
  if (!t2) return null;
  for (let r2 = t2.firstElementChild; r2; r2 = r2.nextElementSibling) if (r2.namespaceURI === e3 && r2.localName === n2) return r2;
  return null;
}
function Ae(t2, e3, n2) {
  const r2 = [];
  if (!t2) return r2;
  for (let l3 = t2.firstElementChild; l3; l3 = l3.nextElementSibling) l3.namespaceURI === e3 && l3.localName === n2 && r2.push(l3);
  return r2;
}
function $e(t2) {
  const e3 = Ee(t2);
  if (!e3) return;
  let n2 = "none", r2, l3;
  for (let t3 = e3.firstElementChild; t3; t3 = t3.nextElementSibling) {
    const e4 = Fe(t3);
    if (e4) {
      if (n2 = e4, r2 = t3.getAttribute("dir") ?? t3.getAttribute("orient") ?? void 0, t3.localName === "morph") {
        const e5 = t3.getAttribute("option");
        l3 = e5 === "byWord" || e5 === "byChar" ? e5 : "byObject";
      }
      if (t3.localName === "split") {
        const e5 = t3.getAttribute("orient") ?? "horz", n3 = t3.getAttribute("dir") ?? "out";
        r2 = `${e5}-${n3}`;
      }
      break;
    }
  }
  const o4 = Ie(e3, "dur", Ce) ?? Ie(e3, "dur", null), s4 = n2 === "none" ? 0 : o4 ?? we[e3.getAttribute("spd") ?? "fast"] ?? 500, i4 = Ie(e3, "advTm", null);
  return r2 ?? (r2 = Gt(n2)), { type: n2, dir: r2, durationMs: n2 === "none" ? 0 : Math.max(80, Math.min(5e3, s4)), advanceAfterMs: i4 ?? void 0, morphBy: l3 };
}
function Ee(t2) {
  if (!t2) return null;
  const e3 = Re(t2, ke, "transition");
  if (e3) return e3;
  for (const e4 of Ae(t2, Vt, "AlternateContent")) {
    const t3 = qt(e4, Pe), n2 = Re(t3, ke, "transition");
    if (n2) return n2;
  }
  return null;
}
var Te = { entr: "entrance", exit: "exit", emph: "emphasis", path: "motion", mediacall: "emphasis", verb: "emphasis" };
function Le(t2, e3, n2, r2 = 256) {
  const l3 = t2.match(/[MLCZEmlcze]|-?\d*\.?\d+(?:[eE][-+]?\d+)?/g);
  if (!l3) return;
  const o4 = [];
  let s4 = [0, 0], i4 = [0, 0], a3 = 0;
  const c4 = () => {
    const t3 = Number(l3[a3++]);
    return Number.isFinite(t3) ? t3 : 0;
  }, u4 = (t3) => {
    o4.push(t3), s4 = t3;
  };
  for (; a3 < l3.length; ) switch (l3[a3++]) {
    case "M":
    case "m": {
      const t3 = [c4(), c4()];
      i4 = t3, o4.length = 0, u4(t3);
      break;
    }
    case "L":
    case "l":
      u4([c4(), c4()]);
      break;
    case "C":
    case "c": {
      const [t3, e4, n3, r3, l4, i5] = [c4(), c4(), c4(), c4(), c4(), c4()], [a4, u5] = s4;
      for (let s5 = 1; s5 <= 16; s5++) {
        const c5 = s5 / 16, d5 = 1 - c5;
        o4.push([d5 * d5 * d5 * a4 + 3 * d5 * d5 * c5 * t3 + 3 * d5 * c5 * c5 * n3 + c5 * c5 * c5 * l4, d5 * d5 * d5 * u5 + 3 * d5 * d5 * c5 * e4 + 3 * d5 * c5 * c5 * r3 + c5 * c5 * c5 * i5]);
      }
      s4 = [l4, i5];
      break;
    }
    case "Z":
    case "z":
      u4([i4[0], i4[1]]);
      break;
    default:
      a3 = l3.length;
  }
  if (o4.length < 2) return;
  const [d4, f4] = o4[0], h4 = o4.map(([t3, r3]) => [(t3 - d4) * e3, (r3 - f4) * n2]);
  if (h4.length <= r2) return h4;
  const p4 = [0];
  for (let t3 = 1; t3 < h4.length; t3++) p4.push(p4[t3 - 1] + Math.hypot(h4[t3][0] - h4[t3 - 1][0], h4[t3][1] - h4[t3 - 1][1]));
  const m4 = p4[p4.length - 1];
  if (!(m4 > 0)) return;
  const g4 = [];
  let b4 = 1;
  for (let t3 = 0; t3 < r2; t3++) {
    const e4 = m4 * t3 / (r2 - 1);
    for (; b4 < p4.length - 1 && p4[b4] < e4; ) b4++;
    const n3 = p4[b4] - p4[b4 - 1], l4 = n3 > 0 ? (e4 - p4[b4 - 1]) / n3 : 0;
    g4.push([h4[b4 - 1][0] + (h4[b4][0] - h4[b4 - 1][0]) * l4, h4[b4 - 1][1] + (h4[b4][1] - h4[b4 - 1][1]) * l4]);
  }
  return g4;
}
function Be(t2, e3 = 8) {
  for (let n2 = t2.firstElementChild; n2; n2 = n2.nextElementSibling) {
    if (n2.localName === "animMotion") {
      const t3 = m3(n2, "path");
      if (t3) return t3;
    }
    if (e3 > 0) {
      const t3 = Be(n2, e3 - 1);
      if (t3) return t3;
    }
  }
  return null;
}
function ze(t2, e3 = 8) {
  for (let n2 = t2.firstElementChild; n2; n2 = n2.nextElementSibling) {
    if (n2.localName === "spTgt") {
      const t3 = g3(n2, "spid");
      if (t3 !== null) return t3;
    }
    if (e3 > 0) {
      const t3 = ze(n2, e3 - 1);
      if (t3 !== null) return t3;
    }
  }
  return null;
}
function je(t2, e3 = 8) {
  for (let n2 = t2.firstElementChild; n2; n2 = n2.nextElementSibling) {
    if (n2.localName === "pRg") {
      const t3 = g3(n2, "st"), e4 = g3(n2, "end");
      if (t3 !== null && e4 !== null && e4 >= t3) return { start: t3, end: e4 };
    }
    if (e3 > 0) {
      const t3 = je(n2, e3 - 1);
      if (t3) return t3;
    }
  }
}
var Oe = /* @__PURE__ */ new Set(["animEffect", "anim", "animRot", "animScale", "animClr", "animMotion"]);
function Ue(t2, e3 = 8, n2 = false) {
  let r2 = null;
  for (let l3 = t2.firstElementChild; l3; l3 = l3.nextElementSibling) {
    const t3 = n2 || Oe.has(l3.localName);
    if (l3.localName === "cTn") {
      const t4 = m3(l3, "dur");
      if (t4 && t4 !== "indefinite") {
        const e4 = Number(t4);
        if (Number.isFinite(e4) && e4 > 1 && n2) return e4;
        Number.isFinite(e4) && e4 > 1 && (r2 === null || e4 > r2) && (r2 = e4);
      }
    }
    if (e3 > 0) {
      const n3 = Ue(l3, e3 - 1, t3);
      if (n3 !== null && t3) return n3;
      n3 !== null && (r2 === null || n3 > r2) && (r2 = n3);
    }
  }
  return r2;
}
function De(t2, e3 = 8) {
  for (let n2 = t2.firstElementChild; n2; n2 = n2.nextElementSibling) {
    if (n2.localName === "animEffect") {
      const t3 = m3(n2, "filter");
      if (t3) return t3;
    }
    if (e3 > 0) {
      const t3 = De(n2, e3 - 1);
      if (t3) return t3;
    }
  }
  return null;
}
function He(t2, e3 = 8) {
  for (let n2 = t2.firstElementChild; n2; n2 = n2.nextElementSibling) {
    if (n2.localName === "animScale") {
      const t3 = h3(n2, "from"), e4 = h3(n2, "to"), r2 = [g3(t3, "x"), g3(t3, "y"), g3(e4, "x"), g3(e4, "y")];
      if (r2.every((t4) => t4 !== null && Number.isFinite(t4))) return { fromX: r2[0] / 1e5, fromY: r2[1] / 1e5, toX: r2[2] / 1e5, toY: r2[3] / 1e5 };
    }
    if (e3 > 0) {
      const t3 = He(n2, e3 - 1);
      if (t3) return t3;
    }
  }
}
function We(t2, e3 = 8) {
  for (let n2 = t2.firstElementChild; n2; n2 = n2.nextElementSibling) {
    if (n2.localName === "animRot") {
      const t3 = g3(n2, "from"), e4 = g3(n2, "to"), r2 = g3(n2, "by");
      if (t3 !== null || e4 !== null || r2 !== null) {
        const n3 = t3 ?? 0;
        return { from: n3 / 6e4, to: (e4 ?? n3 + (r2 ?? 0)) / 6e4 };
      }
    }
    if (e3 > 0) {
      const t3 = We(n2, e3 - 1);
      if (t3) return t3;
    }
  }
}
function Ge(t2, e3 = 8) {
  for (let n2 = t2.firstElementChild; n2; n2 = n2.nextElementSibling) {
    if (n2.localName === "cmd") {
      if ((m3(n2, "type") ?? "call") !== "call") return null;
      const t3 = m3(n2, "cmd");
      if (t3 === "play" || t3 === "pause" || t3 === "resume" || t3 === "stop" || t3 === "togglePause") return { action: t3 };
      const e4 = /^playFrom\((\d+(?:\.\d+)?)\)$/.exec(t3 ?? "");
      if (!e4) return null;
      const r2 = Number(e4[1]);
      return Number.isFinite(r2) ? { action: "play", fromSeconds: r2 } : null;
    }
    if (e3 > 0) {
      const t3 = Ge(n2, e3 - 1);
      if (t3) return t3;
    }
  }
  return null;
}
function Xe(t2) {
  const e3 = h3(h3(t2, "stCondLst"), "cond"), n2 = m3(e3, "delay");
  if (!n2 || n2 === "indefinite") return 0;
  const r2 = Number(n2);
  return Number.isFinite(r2) ? Math.max(0, r2) : 0;
}
function Ve(t2) {
  const e3 = [], n2 = [], r2 = [];
  let l3 = { element: t2, depth: 0, insidePreset: false }, o4 = 0;
  for (; l3; ) {
    if (++o4 > Kt) return null;
    const t3 = !l3.insidePreset && l3.depth <= 25 && l3.element.localName === "cTn" && !!m3(l3.element, "presetClass");
    t3 && e3.push({ element: l3.element, order: o4 }), !l3.insidePreset && (l3.element.localName === "audio" || l3.element.localName === "video") && n2.push({ element: l3.element, order: o4, kind: l3.element.localName });
    const s4 = l3.insidePreset || t3, i4 = l3.element.firstElementChild;
    if (i4) {
      r2.push({ next: i4.nextElementSibling, depth: l3.depth + 1, insidePreset: s4 }), l3 = { element: i4, depth: l3.depth + 1, insidePreset: s4 };
      continue;
    }
    for (l3 = null; r2.length && !l3; ) {
      const t4 = r2[r2.length - 1], e4 = t4.next;
      if (!e4) {
        r2.pop();
        continue;
      }
      t4.next = e4.nextElementSibling, l3 = { element: e4, depth: t4.depth, insidePreset: t4.insidePreset };
    }
  }
  return { presets: e3, medias: n2 };
}
function qe(t2) {
  const e3 = h3(t2.element, "cMediaNode") ?? null;
  if (!e3) return null;
  const n2 = g3(h3(h3(e3, "tgtEl"), "spTgt"), "spid");
  if (n2 === null) return null;
  const r2 = g3(e3, "vol") ?? 8e4, l3 = g3(e3, "mute") === 1, o4 = h3(e3, "cTn");
  return { spid: n2, kind: t2.kind, volume: l3 ? 0 : Math.max(0, Math.min(1, r2 / 1e5)), loop: m3(o4, "repeatCount") === "indefinite", clickGroup: 0 };
}
function Ye(t2, e3 = 0, n2 = 0) {
  if (!t2) return { readonly: false };
  const r2 = [];
  let l3 = xe(t2);
  const o4 = Ve(t2);
  if (!o4) return { readonly: true };
  const s4 = [];
  for (const { element: t3, order: r3 } of o4.presets) {
    const o5 = Ze(t3, e3, n2);
    o5 ? s4.push({ order: r3, step: o5 }) : l3 = true;
  }
  if (!s4.length && !o4.medias.length) return { readonly: l3 };
  const i4 = o4.medias.map((t3) => ({ raw: t3, timing: qe(t3) })).filter((t3) => t3.timing !== null), a3 = [...s4.map((t3) => ({ order: t3.order, step: t3.step })), ...i4.filter((t3) => t3.timing).map((t3) => ({ order: t3.raw.order, media: t3 }))].sort((t3, e4) => t3.order - e4.order);
  let c4 = -1;
  const u4 = [];
  for (const t3 of a3) (t3.step ? t3.step.trigger === "click" || c4 < 0 : c4 < 0 || m3(h3(h3(t3.media.raw.element, "cMediaNode"), "cTn"), "nodeType") === "clickEffect") && c4++, t3.step ? t3.step.clickGroup = c4 : (t3.media.timing.clickGroup = c4, u4.push(t3.media.timing));
  return r2.push(...a3.filter((t3) => t3.step).map((t3) => t3.step)), { animations: r2, media: u4, readonly: l3 };
}
function _e(t2, e3 = 0, n2 = 0) {
  const r2 = te(t2), l3 = Ye(r2.timing, e3, n2);
  return { ...l3, readonly: r2.readonly || l3.readonly };
}
function Ze(t2, e3, n2) {
  const r2 = ze(t2);
  if (r2 === null) return null;
  const l3 = m3(t2, "presetClass") ?? "entr", o4 = l3 === "mediacall" ? Ge(t2) : null;
  if (l3 === "mediacall" && !o4) return null;
  const s4 = Te[l3] ?? "entrance", i4 = g3(t2, "presetID") ?? 10, a3 = g3(t2, "presetSubtype") ?? 0, c4 = m3(t2, "nodeType") ?? "clickEffect", u4 = De(t2), { effect: d4, dir: f4 } = wt(i4, a3, u4 ?? void 0), h4 = c4 === "withEffect" ? "withPrev" : c4 === "afterEffect" ? "afterPrev" : "click", p4 = g3(t2, "dur") ?? Ue(t2) ?? 500, b4 = s4 === "motion" ? Be(t2) : null, v4 = b4 && e3 > 0 && n2 > 0 ? Le(b4, e3, n2) : void 0, y4 = je(t2), x4 = He(t2), w4 = We(t2);
  return { target: r2, effect: d4, dir: f4, delayMs: Xe(t2), durationMs: o4 ? Math.max(0, p4) : Math.max(60, Math.min(1e4, p4)), trigger: h4, kind: s4, motionPath: v4, ...x4 ? { scale: x4 } : {}, ...w4 ? { rotation: w4 } : {}, ...o4 ? { mediaCommand: o4 } : {}, ...y4 ? { paragraphRange: y4 } : {} };
}
var Je = (t2) => t2 * Math.PI / 180;
var Ke = 6e4;
function Qe(t2, e3) {
  const n2 = Math.min(t2, e3), r2 = { l: 0, t: 0, r: t2, b: e3, w: t2, h: e3, hc: t2 / 2, vc: e3 / 2, ls: Math.max(t2, e3), ss: n2, cd2: 180 * Ke, cd4: 90 * Ke, cd8: 45 * Ke, "3cd4": 270 * Ke, "3cd8": 135 * Ke, "5cd8": 225 * Ke, "7cd8": 315 * Ke };
  for (const n3 of [2, 3, 4, 5, 6, 8, 10, 32]) r2[`hd${n3}`] = e3 / n3, r2[`wd${n3}`] = t2 / n3;
  for (const t3 of [2, 4, 6, 8, 16, 32]) r2[`ssd${t3}`] = n2 / t3;
  return r2;
}
function tn(t2, e3) {
  if (t2 === null) return 0;
  if (Object.prototype.hasOwnProperty.call(e3, t2)) return e3[t2];
  const n2 = Number(t2);
  return Number.isFinite(n2) ? n2 : 0;
}
function en(t2, e3) {
  const [n2, ...r2] = t2.trim().split(/\s+/), l3 = tn(r2[0] ?? "0", e3), o4 = tn(r2[1] ?? "0", e3), s4 = tn(r2[2] ?? "0", e3);
  let i4;
  switch (n2) {
    case "*/":
      i4 = s4 === 0 ? 0 : l3 * o4 / s4;
      break;
    case "+-":
      i4 = l3 + o4 - s4;
      break;
    case "+/":
      i4 = s4 === 0 ? 0 : (l3 + o4) / s4;
      break;
    case "?:":
      i4 = l3 > 0 ? o4 : s4;
      break;
    case "abs":
      i4 = Math.abs(l3);
      break;
    case "at2":
      i4 = Math.atan2(o4, l3) * 180 * Ke / Math.PI;
      break;
    case "cat2":
      i4 = l3 * Math.cos(Math.atan2(s4, o4));
      break;
    case "cos":
      i4 = l3 * Math.cos(Je(o4 / Ke));
      break;
    case "max":
      i4 = Math.max(l3, o4);
      break;
    case "min":
      i4 = Math.min(l3, o4);
      break;
    case "mod":
      i4 = Math.sqrt(l3 * l3 + o4 * o4 + s4 * s4);
      break;
    case "pin":
      i4 = o4 < l3 ? l3 : o4 > s4 ? s4 : o4;
      break;
    case "sat2":
      i4 = l3 * Math.sin(Math.atan2(s4, o4));
      break;
    case "sin":
      i4 = l3 * Math.sin(Je(o4 / Ke));
      break;
    case "sqrt":
      i4 = Math.sqrt(Math.max(l3, 0));
      break;
    case "tan":
      i4 = l3 * Math.tan(Je(o4 / Ke));
      break;
    case "val":
      i4 = l3;
      break;
    default:
      i4 = 0;
  }
  return Number.isFinite(i4) ? i4 : 0;
}
function nn(t2, e3, n2 = /* @__PURE__ */ new Set()) {
  for (const [r2, l3] of t2) n2.has(r2) || (e3[r2] = en(l3, e3));
  return e3;
}
function rn(t2) {
  const e3 = {};
  for (const n2 of f3(t2, "gd")) {
    const t3 = m3(n2, "name"), r2 = m3(n2, "fmla");
    if (t3 && (r2 != null && r2.startsWith("val "))) {
      const n3 = Number(r2.slice(4));
      Number.isFinite(n3) && (e3[t3] = n3);
    }
  }
  return e3;
}
function ln(t2) {
  return f3(t2, "gd").flatMap((t3) => {
    const e3 = m3(t3, "name"), n2 = m3(t3, "fmla");
    return e3 && n2 ? [[e3, n2]] : [];
  });
}
var on = (t2) => t2.map(([t3, e3]) => ({ name: t3, formula: e3 }));
function sn(t2, e3, n2) {
  const r2 = ln(h3(t2, "avLst")), l3 = ln(h3(t2, "gdLst")), o4 = on(r2), s4 = on(l3), i4 = f3(h3(t2, "pathLst"), "path").map((t3, o5) => {
    const s5 = g3(t3, "w") || e3 * 9525, i5 = g3(t3, "h") || n2 * 9525, a3 = Qe(s5, i5);
    nn(r2, a3), nn(l3, a3);
    const c4 = (t4) => {
      const e4 = t4 ?? "0", n3 = e4 in a3 ? a3[e4] : Number(e4);
      return { expression: e4, value: Number.isFinite(n3) ? n3 : 0 };
    }, u4 = (t4, e4, n3) => ({ id: e4, role: n3, x: c4(m3(t4 ?? null, "x")), y: c4(m3(t4 ?? null, "y")) }), d4 = [];
    let h4 = false;
    const p4 = [];
    for (let e4 = t3.firstElementChild; e4; e4 = e4.nextElementSibling) ["moveTo", "lnTo", "cubicBezTo", "quadBezTo", "arcTo", "close"].includes(e4.localName) && p4.push(e4);
    return p4.forEach((t4, e4) => {
      const n3 = d4.length, r3 = `p${o5}-c${n3}`, l4 = f3(t4, "pt");
      if (t4.localName === "moveTo" || t4.localName === "lnTo") {
        const e5 = u4(l4[0], `${r3}-a`, "anchor");
        d4.push({ id: r3, type: t4.localName === "moveTo" ? "move" : "line", points: [e5] });
      } else if (t4.localName === "cubicBezTo") {
        const t5 = [u4(l4[0], `${r3}-c0`, "control"), u4(l4[1], `${r3}-c1`, "control"), u4(l4[2], `${r3}-a`, "anchor")];
        d4.push({ id: r3, type: "cubic", points: t5 });
      } else if (t4.localName === "quadBezTo") {
        const t5 = [u4(l4[0], `${r3}-c0`, "control"), u4(l4[1], `${r3}-a`, "anchor")];
        d4.push({ id: r3, type: "quadratic", points: t5 });
      } else t4.localName === "arcTo" ? d4.push({ id: r3, type: "arc", points: [], widthRadius: c4(m3(t4, "wR")), heightRadius: c4(m3(t4, "hR")), startAngle: c4(m3(t4, "stAng")), sweepAngle: c4(m3(t4, "swAng")) }) : t4.localName === "close" && (e4 === p4.length - 1 ? h4 = true : d4.push({ id: r3, type: "close", points: [] }));
    }), { id: `p${o5}`, width: s5, height: i5, fill: m3(t3, "fill") ?? "norm", stroke: !["0", "false"].includes(m3(t3, "stroke") ?? "1"), extrusionOk: !["0", "false"].includes(m3(t3, "extrusionOk") ?? "1"), closed: h4, commands: d4 };
  });
  return { adjustments: o4, guides: s4, paths: i4 };
}
function an(r2, l3, o4) {
  const s4 = f3(h3(r2, "pathLst"), "path");
  if (!s4.length) return null;
  const i4 = ln(h3(r2, "avLst")), a3 = ln(h3(r2, "gdLst")), c4 = [];
  let u4 = false, d4 = false;
  for (const r3 of s4) {
    const s5 = g3(r3, "w") || 0, h4 = g3(r3, "h") || 0, p5 = s5 || l3 * 9525, b4 = h4 || o4 * 9525, v4 = Qe(p5, b4);
    nn(i4, v4), nn(a3, v4);
    const y4 = p5 ? l3 / p5 : 1, x4 = b4 ? o4 / b4 : 1, w4 = (t2) => tn(t2, v4), k3 = (t2) => [w4(m3(t2, "x")) * y4, w4(m3(t2, "y")) * x4];
    (m3(r3, "fill") ?? "norm") !== "none" && (u4 = true);
    const C4 = m3(r3, "stroke");
    C4 !== "0" && C4 !== "false" && (d4 = true);
    let S4 = 0, P4 = 0, N3 = 0, M4 = 0;
    for (let l4 = r3.firstElementChild; l4; l4 = l4.nextElementSibling) {
      const r4 = f3(l4, "pt");
      switch (l4.localName) {
        case "moveTo":
          [S4, P4] = k3(r4[0]), [N3, M4] = [S4, P4], c4.push(`M ${e(S4)} ${e(P4)}`);
          break;
        case "lnTo":
          [S4, P4] = k3(r4[0]), c4.push(`L ${e(S4)} ${e(P4)}`);
          break;
        case "cubicBezTo": {
          const [t2, n2] = k3(r4[0]), [l5, o5] = k3(r4[1]);
          [S4, P4] = k3(r4[2]), c4.push(`C ${e(t2)} ${e(n2)} ${e(l5)} ${e(o5)} ${e(S4)} ${e(P4)}`);
          break;
        }
        case "quadBezTo": {
          const [t2, n2] = k3(r4[0]);
          [S4, P4] = k3(r4[1]), c4.push(`Q ${e(t2)} ${e(n2)} ${e(S4)} ${e(P4)}`);
          break;
        }
        case "arcTo": {
          const r5 = w4(m3(l4, "wR")) * y4, o5 = w4(m3(l4, "hR")) * x4, s6 = w4(m3(l4, "stAng")) / Ke, i5 = w4(m3(l4, "swAng")) / Ke, a4 = S4 - r5 * Math.cos(o(s6)), u5 = P4 - o5 * Math.sin(o(s6)), d5 = Math.max(1, Math.ceil(Math.abs(i5) / 180));
          for (let n2 = 0; n2 < d5; n2++) {
            const l5 = i5 / d5, [f4, h5] = s(a4, u5, r5, o5, s6 + l5 * (n2 + 1));
            c4.push(`A ${e(r5)} ${e(o5)} 0 ${Math.abs(l5) > 180 ? 1 : 0} ${l5 >= 0 ? 1 : 0} ${e(f4)} ${e(h5)}`), S4 = f4, P4 = h5;
          }
          break;
        }
        case "close":
          c4.push("Z"), [S4, P4] = [N3, M4];
          break;
      }
    }
  }
  const p4 = c4.join(" ");
  return p4.trim() ? { d: p4, open: !u4 && d4 } : null;
}
var cn = 2048;
function un(t2) {
  if (t2.length > cn || /[\u0000-\u001f\u007f]/.test(t2)) return null;
  let e3;
  try {
    e3 = new URL(t2);
  } catch {
    return null;
  }
  return e3.protocol !== "http:" && e3.protocol !== "https:" && e3.protocol !== "mailto:" || e3.username || e3.password || (e3.protocol === "http:" || e3.protocol === "https:") && !e3.hostname ? null : e3.href.length <= cn ? e3 : null;
}
var dn = ["dk1", "lt1", "dk2", "lt2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6", "hlink", "folHlink"];
var fn = 1.2;
var hn = Object.freeze(["none", "words", "sng", "dbl", "heavy", "dotted", "dottedHeavy", "dash", "dashHeavy", "dashLong", "dashLongHeavy", "dotDash", "dotDashHeavy", "dotDotDash", "dotDotDashHeavy", "wavy", "wavyHeavy", "wavyDbl"]);
var pn = Object.freeze(["noStrike", "sngStrike", "dblStrike"]);
var mn = Object.freeze(["none", "all", "small"]);
function gn(t2, e3) {
  const n2 = h3(t2, e3);
  return n2 ? m3(n2, "val") : null;
}
function bn(t2) {
  if (!t2) return "";
  let e3 = "";
  for (const n2 of f3(t2, "t")) e3 += n2.textContent ?? "";
  return e3;
}
function vn(t2, e3 = 12) {
  let n2 = "";
  for (let r2 = t2.firstElementChild; r2; r2 = r2.nextElementSibling) r2.localName === "t" ? n2 += r2.textContent ?? "" : e3 > 0 && (n2 += vn(r2, e3 - 1));
  return n2;
}
function yn(t2, e3, n2) {
  const r2 = h3(t2, e3);
  return r2 ? xn(r2, n2) : [];
}
function xn(t2, e3) {
  const n2 = [];
  for (let r2 = t2.firstElementChild; r2; r2 = r2.nextElementSibling) {
    const t3 = wn(r2, e3);
    t3 && n2.push(...t3);
  }
  return n2;
}
function wn(t2, e3) {
  if (e3 <= 0) {
    const e4 = vn(t2);
    return e4 ? [{ kind: "run", text: e4 }] : null;
  }
  const n2 = e3 - 1;
  switch (t2.localName) {
    case "r": {
      const e4 = bn(t2);
      if (!e4) return null;
      const n3 = gn(h3(t2, "rPr"), "sty");
      return [{ kind: "run", text: e4, sty: n3 === "p" || n3 === "b" || n3 === "bi" ? n3 : "i" }];
    }
    case "f": {
      const e4 = gn(h3(t2, "fPr"), "type");
      return [{ kind: "frac", num: yn(t2, "num", n2), den: yn(t2, "den", n2), type: e4 === "noBar" || e4 === "skw" || e4 === "lin" ? e4 : "bar" }];
    }
    case "rad": {
      const e4 = gn(h3(t2, "radPr"), "degHide");
      return [{ kind: "rad", deg: e4 === "1" || e4 === "on" || e4 === "true" ? [] : yn(t2, "deg", n2), base: yn(t2, "e", n2) }];
    }
    case "sSup":
      return [{ kind: "script", base: yn(t2, "e", n2), sup: yn(t2, "sup", n2) }];
    case "sSub":
      return [{ kind: "script", base: yn(t2, "e", n2), sub: yn(t2, "sub", n2) }];
    case "sSubSup":
      return [{ kind: "script", base: yn(t2, "e", n2), sub: yn(t2, "sub", n2), sup: yn(t2, "sup", n2) }];
    case "sPre":
      return [{ kind: "script", base: [], sub: yn(t2, "sub", n2), sup: yn(t2, "sup", n2) }, ...yn(t2, "e", n2)];
    case "nary": {
      const e4 = h3(t2, "naryPr"), r2 = gn(e4, "limLoc"), l3 = gn(e4, "chr") ?? "\u222B", o4 = gn(e4, "subHide") === "1", s4 = gn(e4, "supHide") === "1";
      return [{ kind: "nary", chr: l3, sub: o4 ? [] : yn(t2, "sub", n2), sup: s4 ? [] : yn(t2, "sup", n2), base: yn(t2, "e", n2), underOver: r2 ? r2 === "undOvr" : l3 !== "\u222B" && l3 !== "\u222E" && l3 !== "\u222C" && l3 !== "\u222D" }];
    }
    case "d": {
      const e4 = h3(t2, "dPr"), r2 = f3(t2, "e").map((t3) => xn(t3, n2));
      return [{ kind: "delim", beg: gn(e4, "begChr") ?? "(", end: gn(e4, "endChr") ?? ")", sep: gn(e4, "sepChr") ?? ",", items: r2.length ? r2 : [[]] }];
    }
    case "m":
      return [{ kind: "matrix", rows: f3(t2, "mr").map((t3) => f3(t3, "e").map((t4) => xn(t4, n2))) }];
    case "acc":
      return [{ kind: "acc", chr: gn(h3(t2, "accPr"), "chr") ?? "\u0302", base: yn(t2, "e", n2) }];
    case "bar": {
      const e4 = gn(h3(t2, "barPr"), "pos");
      return [{ kind: "acc", chr: "\u0305", base: yn(t2, "e", n2), below: e4 === "bot" }];
    }
    case "groupChr": {
      const e4 = h3(t2, "groupChrPr"), r2 = gn(e4, "pos");
      return [{ kind: "acc", chr: gn(e4, "chr") ?? "\u23DF", base: yn(t2, "e", n2), below: r2 !== "top" }];
    }
    case "limLow":
      return [{ kind: "lim", base: yn(t2, "e", n2), limit: yn(t2, "lim", n2), below: true }];
    case "limUpp":
      return [{ kind: "lim", base: yn(t2, "e", n2), limit: yn(t2, "lim", n2), below: false }];
    case "func":
      return [...yn(t2, "fName", n2), { kind: "run", text: "\u2009" }, ...yn(t2, "e", n2)];
    case "eqArr":
      return [{ kind: "stack", rows: f3(t2, "e").map((t3) => xn(t3, n2)) }];
    case "box":
    case "borderBox":
    case "e":
    case "oMath":
      return xn(t2, n2);
    case "phant":
      return [{ kind: "run", text: " ".repeat(Math.max(1, vn(t2).length)), sty: "p" }];
    case "rPr":
    case "ctrlPr":
    case "argPr":
    case "fPr":
    case "radPr":
    case "naryPr":
    case "dPr":
    case "mPr":
    case "accPr":
    case "barPr":
    case "groupChrPr":
    case "limLowPr":
    case "limUppPr":
    case "funcPr":
    case "eqArrPr":
    case "boxPr":
    case "phantPr":
    case "sSupPr":
    case "sSubPr":
    case "sSubSupPr":
    case "sPrePr":
      return null;
    default: {
      const e4 = xn(t2, n2);
      if (e4.length) return e4;
      const r2 = vn(t2);
      return r2 ? [{ kind: "run", text: r2 }] : null;
    }
  }
}
function kn(t2) {
  if (t2.localName === "oMathPara") {
    const e3 = f3(t2, "oMath").map((t3) => xn(t3, 16));
    return e3.length > 1 ? [{ kind: "stack", rows: e3 }] : e3[0] ?? [];
  }
  return xn(t2, 16);
}
function Cn(t2) {
  var e3, n2;
  let r2 = "";
  for (const l3 of t2) switch (l3.kind) {
    case "run":
      r2 += l3.text;
      break;
    case "frac":
      r2 += `${Cn(l3.num)}/${Cn(l3.den)}`;
      break;
    case "rad":
      r2 += `\u221A(${Cn(l3.base)})`;
      break;
    case "script":
      r2 += Cn(l3.base), (e3 = l3.sub) != null && e3.length && (r2 += `_${Cn(l3.sub)}`), (n2 = l3.sup) != null && n2.length && (r2 += `^${Cn(l3.sup)}`);
      break;
    case "nary":
      r2 += l3.chr, l3.sub.length && (r2 += `_${Cn(l3.sub)}`), l3.sup.length && (r2 += `^${Cn(l3.sup)}`), r2 += Cn(l3.base);
      break;
    case "delim":
      r2 += l3.beg + l3.items.map((t3) => Cn(t3)).join(l3.sep) + l3.end;
      break;
    case "matrix":
      r2 += l3.rows.map((t3) => t3.map((t4) => Cn(t4)).join(" ")).join("; ");
      break;
    case "acc":
      r2 += Cn(l3.base) + l3.chr;
      break;
    case "lim":
      r2 += `${Cn(l3.base)}(${Cn(l3.limit)})`;
      break;
    case "stack":
      r2 += l3.rows.map((t3) => Cn(t3)).join(" ");
      break;
  }
  return r2;
}
var Sn = { l: "left", ctr: "center", r: "right", just: "justify", dist: "justify" };
function Pn(t2, e3) {
  const n2 = { ...t2, ...e3, rp: { ...t2.rp, ...e3.rp } };
  return e3.lnPct !== void 0 && delete n2.lnPx, e3.lnPx !== void 0 && delete n2.lnPct, e3.buSizePct !== void 0 && delete n2.buSizePts, e3.buSizePts !== void 0 && delete n2.buSizePct, n2;
}
function Nn(t2, e3) {
  let n2 = { rp: {} };
  for (const r2 of t2) {
    r2.def && (n2 = Pn(n2, r2.def));
    const t3 = r2.lvls[e3];
    t3 && (n2 = Pn(n2, t3));
  }
  return n2;
}
function Mn(t2, e3, n2) {
  let r2 = t2.lnPct !== void 0 ? t2.lnPct * fn : null;
  return r2 === null && t2.lnPx && (r2 = t2.lnPx / e3), n2 && (r2 = Math.max(0.5, (r2 ?? fn) - n2)), { align: Sn[t2.algn ?? "l"] ?? "left", lineHeight: r2, spaceBefore: t2.spcBef ?? 0, spaceAfter: t2.spcAft ?? 0, marginLeft: t2.marL ?? 0, indent: t2.indent ?? 0 };
}
function Fn(t2) {
  return { ...t2.lvl !== void 0 ? { level: true } : {}, ...t2.algn !== void 0 ? { align: true } : {}, ...t2.lnPct !== void 0 || t2.lnPx !== void 0 ? { lineHeight: true } : {}, ...t2.spcBef !== void 0 ? { spaceBefore: true } : {}, ...t2.spcAft !== void 0 ? { spaceAfter: true } : {}, ...t2.marL !== void 0 ? { marginLeft: true } : {}, ...t2.indent !== void 0 ? { indent: true } : {} };
}
function In(t2) {
  let e3 = "", n2 = t2;
  for (; n2 > 0; ) e3 = String.fromCharCode(65 + (n2 - 1) % 26) + e3, n2 = Math.floor((n2 - 1) / 26);
  return e3;
}
function Rn(t2) {
  const e3 = [[1e3, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let n2 = "", r2 = t2;
  for (const [t3, l3] of e3) for (; r2 >= t3; ) n2 += l3, r2 -= t3;
  return n2;
}
function An(t2, e3) {
  let n2;
  return t2.startsWith("alphaLc") ? n2 = In(e3).toLowerCase() : t2.startsWith("alphaUc") ? n2 = In(e3) : t2.startsWith("romanLc") ? n2 = Rn(e3).toLowerCase() : t2.startsWith("romanUc") ? n2 = Rn(e3) : t2.startsWith("circleNum") ? n2 = e3 >= 1 && e3 <= 20 ? String.fromCharCode(9312 + e3 - 1) : String(e3) : n2 = String(e3), t2.endsWith("ParenBoth") ? `(${n2})` : t2.endsWith("ParenR") ? `${n2})` : t2.endsWith("Period") ? `${n2}.` : n2;
}
var $n = { "\uF0A7": "\u25AA", "\uF0B7": "\u2022", "\uF0D8": "\u27A2", "\uF0FC": "\u2713", "\uF06C": "\u25CF", "\uF075": "\u25C6", "\uF0A8": "\u25A1", "\uF076": "\u2756", "\xA7": "\u25AA", n: "\u25AA", l: "\u25CF", u: "\u25C6", p: "\u2751", v: "\u2756", w: "\u2666", "\xD8": "\u27A2", "\xFC": "\u2713", F: "\u261E", q: "\u2751" };
function En(t2, e3, n2) {
  if ((!t2 || t2.kind !== "auto") && (e3.length = n2 + 1, delete e3[n2]), !t2 || t2.kind === "none" || t2.kind === "image") return null;
  if (t2.kind === "char") {
    const e4 = $n[t2.char];
    return e4 || (t2.font && /wingdings|webdings|symbol/i.test(t2.font) ? "\u2022" : t2.char);
  }
  return e3.length = n2 + 1, e3[n2] = (e3[n2] ?? t2.startAt - 1) + 1, An(t2.scheme, e3[n2]);
}
function Tn(t2, e3) {
  const n2 = t2.bullet;
  if (!n2 || n2.kind === "none") return { kind: "none" };
  const r2 = { ...t2.buColor !== void 0 ? { color: t2.buColor } : {}, ...t2.buFont !== void 0 ? { font: t2.buFont } : {}, ...t2.buSizePts !== void 0 ? { size: { kind: "points", value: t2.buSizePts * 0.75 } } : t2.buSizePct !== void 0 ? { size: t2.buSizePct === null ? null : { kind: "percent", value: t2.buSizePct } } : {} };
  return n2.kind === "char" ? { kind: "char", char: n2.char, ...n2.font && r2.font === void 0 ? { font: n2.font } : {}, ...r2 } : n2.kind === "auto" ? { kind: "autoNum", type: n2.scheme, startAt: n2.startAt, ...r2 } : { kind: "image", rid: n2.rid, src: (e3 == null ? void 0 : e3(n2.rid)) ?? null, ...r2 };
}
function Ln(t2) {
  let e3 = 0;
  return t2.bullet !== void 0 && (e3 |= At.bullet), t2.buColor !== void 0 && (e3 |= At.bulletColor), t2.buFont !== void 0 && (e3 |= At.bulletFont), (t2.buSizePct !== void 0 || t2.buSizePts !== void 0) && (e3 |= At.bulletSize), t2.rtl !== void 0 && (e3 |= At.rtl), e3;
}
function Bn(t2) {
  var e3, n2;
  const { lvl: r2, resolved: l3, inherited: o4, direct: s4, directRun: i4, runs: a3, counters: c4, lnSpcReduction: u4, env: d4 } = t2, f4 = Math.max(...a3.map((t3) => t3.size), 1), h4 = Mn(l3, f4, u4), p4 = ((e3 = l3.bullet) == null ? void 0 : e3.kind) === "image" && d4.resolveImage ? d4.resolveImage(l3.bullet.rid) : null;
  return { align: h4.align, lvl: r2, marL: h4.marginLeft, indent: h4.indent, bullet: En(l3.bullet, c4, r2), lineHeight: h4.lineHeight, spaceBefore: h4.spaceBefore, spaceAfter: h4.spaceAfter, runs: a3, bulletColor: l3.buColor ?? null, bulletFont: l3.buFont ?? null, bulletSize: l3.buSizePts !== void 0 ? l3.buSizePts / f4 : l3.buSizePct ?? null, bulletImage: p4, rtl: l3.rtl, ...d4.edit ? { editInfo: { inheritedParagraphProps: { level: 0, ...Mn(o4, f4, u4) }, directParagraphProps: Fn(s4), directRun: i4, directLayout: Ln(s4), ...((n2 = l3.bullet) == null ? void 0 : n2.kind) === "auto" ? { autoNumbering: { scheme: l3.bullet.scheme, startAt: l3.bullet.startAt } } : {}, bullet: Tn(l3, d4.resolveImage), inheritedBullet: Tn(o4, d4.resolveImage) } } : {} };
}
var zn = { anchor: 1, insets: 2, wrap: 4, vert: 8, anchorCtr: 16, columns: 32, columnGap: 64, autoFit: 128 };
var jn = { horz: "horz", vert: "vert", vert270: "vert270", wordArtVert: "wordArtVert", eaVert: "vert", mongolianVert: "vert" };
function On(t2, e3) {
  for (const n2 of t2) {
    const t3 = m3(n2, e3);
    if (t3 !== null) return t3;
  }
  return null;
}
function Un(t2) {
  for (const e3 of t2) {
    if (!e3) continue;
    const t3 = h3(e3, "noAutofit") ?? h3(e3, "normAutofit") ?? h3(e3, "spAutoFit");
    if (t3) return t3;
  }
  return null;
}
function Dn(t2) {
  const e3 = On(t2, "anchor") ?? "t", n2 = (e4, n3) => {
    const r3 = On(t2, e4);
    return v3(r3 === null ? n3 : Number(r3));
  }, r2 = Un(t2), l3 = (r2 == null ? void 0 : r2.localName) === "normAutofit", o4 = (r2 == null ? void 0 : r2.localName) === "spAutoFit", s4 = l3 ? g3(r2, "fontScale") : null, i4 = Number(On(t2, "numCol") ?? "1"), a3 = Number(On(t2, "spcCol") ?? "0"), c4 = jn[On(t2, "vert") ?? "horz"];
  return { anchor: e3 === "ctr" ? "middle" : e3 === "b" ? "bottom" : "top", insets: [n2("tIns", 45720), n2("rIns", 91440), n2("bIns", 45720), n2("lIns", 91440)], wrap: On(t2, "wrap") !== "none", fontScale: s4 != null ? s4 / 1e5 : 1, ...l3 ? { autoFitNormal: true } : {}, ...l3 && s4 == null ? { autoFitCompute: true } : {}, ...l3 && (g3(r2, "lnSpcReduction") ?? 0) ? { lnSpcReduction: (g3(r2, "lnSpcReduction") ?? 0) / 1e5 } : {}, ...o4 ? { autoFitShape: true } : {}, ...c4 !== "horz" ? { vert: c4 } : {}, ...On(t2, "anchorCtr") === "1" ? { anchorCtr: true } : {}, ...i4 > 1 ? { columns: i4 } : {}, ...Number.isFinite(a3) && a3 !== 0 ? { columnGap: v3(a3) } : {} };
}
function Hn(t2) {
  if (!t2) return 0;
  let e3 = 0;
  return m3(t2, "anchor") !== null && (e3 |= zn.anchor), ["tIns", "rIns", "bIns", "lIns"].some((e4) => m3(t2, e4) !== null) && (e3 |= zn.insets), m3(t2, "wrap") !== null && (e3 |= zn.wrap), m3(t2, "vert") !== null && (e3 |= zn.vert), m3(t2, "anchorCtr") !== null && (e3 |= zn.anchorCtr), m3(t2, "numCol") !== null && (e3 |= zn.columns), m3(t2, "spcCol") !== null && (e3 |= zn.columnGap), (h3(t2, "noAutofit") || h3(t2, "normAutofit") || h3(t2, "spAutoFit")) && (e3 |= zn.autoFit), e3;
}
function Wn(t2, e3) {
  return { latin: t2.latin ?? e3.fonts.minor.latin, eastAsian: t2.ea ?? e3.fonts.minor.ea, complexScript: t2.cs ?? e3.fonts.minor.cs ?? null };
}
function Gn(t2) {
  const e3 = t2.u ?? "none", n2 = t2.strike ?? "noStrike";
  return { u: e3 !== "none", strike: n2 !== "noStrike", ...e3 !== "none" ? { underline: e3 } : {}, ...n2 !== "noStrike" ? { strikeType: n2 } : {} };
}
function Xn(t2, e3, n2) {
  var r2;
  const l3 = Wn(t2, e3);
  return { fontSlots: l3, props: { b: t2.b ?? false, i: t2.i ?? false, ...Gn(t2), size: y3(t2.sz ?? 1800), color: t2.color ?? e3.defaultColor ?? "rgb(0,0,0)", fonts: Ft(l3, n2), baseline: t2.baseline || void 0, spacing: t2.spc || void 0, caps: t2.caps && t2.caps !== "none" ? t2.caps : void 0, outline: t2.outline ?? null, gradient: t2.gradient ?? null, highlight: t2.highlight ?? null, underlineColor: t2.uColor ?? null, ...t2.gradientFill !== void 0 ? { gradientFill: t2.gradientFill } : {}, ...t2.shadowEffect !== void 0 ? { shadow: t2.shadow, shadowEffect: t2.shadowEffect } : {}, ...(r2 = t2.generationIssues) != null && r2.length ? { generationIssues: t2.generationIssues } : {} } };
}
function Vn(t2, e3, n2, r2, l3 = 0) {
  const o4 = Xn(e3, n2, t2), s4 = n2.edit && r2 ? Xn(r2, n2, t2) : null;
  return { text: t2, ...o4.props, link: e3.link, ...s4 ? { editInfo: { inheritedRunProps: s4.props, inheritedFontSlots: s4.fontSlots, direct: l3, fontSlots: o4.fontSlots } } : {} };
}
function qn(t2, e3) {
  var n2;
  if (!t2) return {};
  const r2 = {}, l3 = [], o4 = h3(t2, "gradFill");
  if (o4) {
    (m3(o4, "rotWithShape") === "0" || m3(o4, "rotWithShape") === "false" || m3(o4, "flip") !== null) && l3.push("\u6587\u5B57\u6E10\u53D8\u65CB\u8F6C/\u7FFB\u8F6C");
    const t3 = h3(o4, "lin");
    !t3 || h3(o4, "path") || h3(o4, "tileRect") ? l3.push("\u6587\u5B57\u6E10\u53D8\u8DEF\u5F84/\u5E73\u94FA\u8303\u56F4") : r2.gradientFill = { angle: (g3(t3, "ang") ?? 0) / 6e4, scaled: b3(t3, "scaled") ?? false, stops: f3(h3(o4, "gsLst"), "gs").map((t4) => ({ pos: (g3(t4, "pos") ?? 0) / 1e5, color: C3(t4, e3) ?? "#000000" })).sort((t4, e4) => t4.pos - e4.pos) };
  } else ["solidFill", "noFill", "blipFill", "pattFill", "grpFill"].some((e4) => h3(t2, e4)) && (r2.gradientFill = null);
  for (const e4 of ["blipFill", "pattFill", "grpFill", "effectDag", "uLn", "uLnTx"]) h3(t2, e4) && l3.push(`\u6587\u5B57 ${e4}`);
  const s4 = h3(t2, "ln");
  if (s4) {
    for (const t3 of Array.from(s4.children)) ["solidFill", "noFill"].includes(t3.localName) || l3.push(`\u6587\u5B57\u63CF\u8FB9 ${t3.localName}`);
    for (const t3 of ["cap", "cmpd", "algn"]) m3(s4, t3) !== null && l3.push(`\u6587\u5B57\u63CF\u8FB9 ${t3}`);
  }
  const i4 = h3(t2, "uFill");
  i4 && !h3(i4, "solidFill") && l3.push("\u4E0B\u5212\u7EBF\u975E\u7EAF\u8272\u586B\u5145");
  const a3 = h3(t2, "effectLst");
  if (a3) {
    const t3 = (n2 = zt(a3, e3)) == null ? void 0 : n2.shadow;
    r2.shadowEffect = t3 ?? null, r2.shadow = t3 ? `${t3.dx}px ${t3.dy}px ${t3.blur}px ${t3.color}` : null, a3.children.length > 1 && l3.push("\u591A\u91CD\u6587\u5B57\u6548\u679C");
    for (const t4 of Array.from(a3.children)) {
      t4.localName !== "outerShdw" && l3.push(`\u6587\u5B57\u6548\u679C ${t4.localName}`);
      for (const [e4, n3] of [["sx", "100000"], ["sy", "100000"], ["kx", "0"], ["ky", "0"], ["algn", "b"], ["rotWithShape", "1"]]) {
        const r3 = m3(t4, e4);
        r3 !== null && r3 !== n3 && l3.push(`\u6587\u5B57\u9634\u5F71 ${e4}`);
      }
    }
  }
  return l3.length && (r2.generationIssues = l3), r2;
}
var Yn = /* @__PURE__ */ new Set(["oMathPara", "oMath", "r", "t", "f", "num", "den", "rad", "deg", "e", "sSup", "sSub", "sSubSup", "sup", "sub", "nary", "d", "m", "mr", "acc", "bar", "groupChr", "limLow", "limUpp", "lim", "eqArr", "rPr", "fPr", "radPr", "naryPr", "dPr", "mPr", "accPr", "barPr", "groupChrPr", "limLowPr", "limUppPr", "eqArrPr", "sSupPr", "sSubPr", "sSubSupPr", "sty", "type", "degHide", "chr", "limLoc", "subHide", "supHide", "begChr", "endChr", "sepChr", "pos"]);
var _n = "http://schemas.openxmlformats.org/officeDocument/2006/math";
var Zn = /* @__PURE__ */ new Set(["sty", "type", "degHide", "chr", "limLoc", "subHide", "supHide", "begChr", "endChr", "sepChr", "pos"]);
function Jn(t2) {
  const e3 = /* @__PURE__ */ new Set(), n2 = (t3, r2) => {
    var l3;
    if (r2 > 16) {
      e3.add("\u516C\u5F0F\u8D85\u51FA\u89E3\u6790\u6DF1\u5EA6");
      return;
    }
    (t3.namespaceURI !== _n || !Yn.has(t3.localName)) && e3.add(`\u516C\u5F0F ${t3.tagName}`);
    for (const n3 of Array.from(t3.attributes)) {
      const r3 = n3.namespaceURI;
      r3 !== "http://www.w3.org/2000/xmlns/" && (t3.localName === "t" && n3.name === "xml:space" || Zn.has(t3.localName) && n3.localName === "val" && (!r3 || r3 === _n) || e3.add(`\u516C\u5F0F\u5C5E\u6027 ${t3.tagName}@${n3.name}`));
    }
    const o4 = t3.localName === "rad" ? [["radPr", "degHide", "deg"]] : t3.localName === "nary" ? [["naryPr", "subHide", "sub"], ["naryPr", "supHide", "sup"]] : [];
    for (const [n3, r3, s4] of o4) {
      const o5 = h3(h3(t3, n3), r3);
      o5 && !["0", "false", "off"].includes(m3(o5, "val") ?? "") && ((l3 = h3(t3, s4)) != null && l3.children.length) && e3.add(`\u516C\u5F0F\u9690\u85CF\u53C2\u6570 ${s4}`);
    }
    for (const e4 of Array.from(t3.children)) n2(e4, r2 + 1);
  };
  return n2(t2, 0), [...e3];
}
function Kn(t2, e3, n2) {
  const r2 = { lvls: [] };
  if (!t2) return r2;
  const l3 = h3(t2, "defPPr");
  l3 && (r2.def = Qn(l3, e3, n2));
  for (let l4 = 1; l4 <= 9; l4++) {
    const o4 = h3(t2, `lvl${l4}pPr`);
    o4 && (r2.lvls[l4 - 1] = Qn(o4, e3, n2));
  }
  return r2;
}
function Qn(t2, e3, n2) {
  return tr(t2, e3, n2).props;
}
function tr(t2, e3, n2) {
  const r2 = { rp: {} };
  if (!t2) return { props: r2, directRun: 0 };
  const l3 = g3(t2, "lvl");
  l3 !== null && (r2.lvl = l3);
  const o4 = m3(t2, "algn");
  o4 && (r2.algn = o4);
  const s4 = g3(t2, "marL");
  s4 !== null && (r2.marL = v3(s4));
  const i4 = g3(t2, "indent");
  i4 !== null && (r2.indent = v3(i4)), m3(t2, "rtl") !== null && (r2.rtl = b3(t2, "rtl"));
  const a3 = h3(t2, "lnSpc"), c4 = g3(h3(a3, "spcPct"), "val");
  c4 !== null && (r2.lnPct = c4 / 1e5);
  const u4 = g3(h3(a3, "spcPts"), "val");
  u4 !== null && (r2.lnPx = y3(u4));
  const d4 = g3(h3(h3(t2, "spcBef"), "spcPts"), "val");
  d4 !== null && (r2.spcBef = y3(d4));
  const f4 = g3(h3(h3(t2, "spcAft"), "spcPts"), "val");
  f4 !== null && (r2.spcAft = y3(f4)), h3(t2, "buNone") && (r2.bullet = { kind: "none" });
  const p4 = h3(t2, "buChar");
  p4 && (r2.bullet = { kind: "char", char: m3(p4, "char") ?? "\u2022", font: m3(h3(t2, "buFont"), "typeface") });
  const x4 = h3(t2, "buAutoNum");
  x4 && (r2.bullet = { kind: "auto", scheme: m3(x4, "type") ?? "arabicPeriod", startAt: g3(x4, "startAt") ?? 1 });
  const w4 = h3(h3(t2, "buBlip"), "blip");
  if (w4) {
    const t3 = m3(w4, "r:embed");
    t3 && (r2.bullet = { kind: "image", rid: t3 });
  }
  const k3 = h3(t2, "buClr");
  k3 ? r2.buColor = C3(k3, e3) ?? null : h3(t2, "buClrTx") && (r2.buColor = null);
  const S4 = h3(t2, "buFont");
  S4 ? r2.buFont = m3(S4, "typeface") : h3(t2, "buFontTx") && (r2.buFont = null);
  const P4 = g3(h3(t2, "buSzPct"), "val");
  if (P4 !== null) r2.buSizePct = P4 / 1e5;
  else {
    const e4 = g3(h3(t2, "buSzPts"), "val");
    e4 !== null ? r2.buSizePts = y3(e4) : h3(t2, "buSzTx") && (r2.buSizePct = null);
  }
  const N3 = h3(t2, "defRPr"), M4 = er(N3, e3, n2);
  return r2.rp = M4.props, { props: r2, directRun: M4.direct };
}
function er(t2, e3, n2) {
  const r2 = {};
  let l3 = 0;
  if (!t2) return { props: r2, direct: l3 };
  const o4 = g3(t2, "sz");
  o4 !== null && (r2.sz = o4, l3 |= Rt.size), m3(t2, "b") !== null && (r2.b = b3(t2, "b"), l3 |= Rt.b), m3(t2, "i") !== null && (r2.i = b3(t2, "i"), l3 |= Rt.i);
  const s4 = m3(t2, "u");
  s4 !== null && (r2.u = hn.includes(s4) ? s4 : "sng", l3 |= Rt.u);
  const i4 = m3(t2, "strike");
  i4 !== null && (r2.strike = pn.includes(i4) ? i4 : "sngStrike", l3 |= Rt.strike);
  const a3 = g3(t2, "baseline");
  a3 !== null && (r2.baseline = a3 / 1e3, l3 |= Rt.baseline);
  const c4 = g3(t2, "spc");
  c4 !== null && (r2.spc = y3(c4), l3 |= Rt.spacing);
  const u4 = m3(t2, "cap");
  u4 && (r2.caps = u4 === "all" ? "all" : u4 === "small" ? "small" : "none", l3 |= Rt.caps);
  const d4 = h3(t2, "solidFill"), p4 = C3(d4, e3);
  p4 && (r2.color = p4), d4 && (r2.gradient = null);
  const x4 = h3(t2, "gradFill");
  if (x4) {
    const t3 = f3(h3(x4, "gsLst"), "gs").map((t4) => ({ pos: (g3(t4, "pos") ?? 0) / 1e5, color: C3(t4, e3) ?? "#000" })).sort((t4, e4) => t4.pos - e4.pos);
    if (t3.length) {
      const e4 = h3(x4, "lin"), n3 = e4 ? (g3(e4, "ang") ?? 0) / 6e4 + 90 : 180;
      r2.gradient = `linear-gradient(${Math.round(n3)}deg,${t3.map((t4) => `${t4.color} ${Math.round(t4.pos * 100)}%`).join(",")})`, r2.color || (r2.color = t3[0].color);
    }
  }
  h3(t2, "noFill") && (r2.color = "transparent", r2.gradient = null), (d4 || x4 || ["noFill", "blipFill", "pattFill", "grpFill"].some((e4) => !!h3(t2, e4))) && (l3 |= Rt.color | Rt.gradient), !d4 && !x4 && ["blipFill", "pattFill", "grpFill"].some((e4) => !!h3(t2, e4)) && (r2.color = "transparent", r2.gradient = null);
  const w4 = C3(h3(t2, "uFill"), e3) ?? C3(h3(h3(t2, "uFill"), "solidFill"), e3);
  w4 && (r2.uColor = w4), (h3(t2, "uFillTx") || h3(t2, "uFill") && !w4) && (r2.uColor = null), (h3(t2, "uFillTx") || h3(t2, "uFill")) && (l3 |= Rt.underlineColor);
  const k3 = h3(t2, "highlight");
  k3 && (r2.highlight = C3(k3, e3) ?? null), k3 && (l3 |= Rt.highlight);
  const S4 = h3(t2, "ln");
  if (h3(S4, "noFill")) r2.outline = null;
  else if (S4) {
    const t3 = C3(h3(S4, "solidFill"), e3);
    t3 ? r2.outline = { color: t3, width: v3(g3(S4, "w") ?? 9525) } : r2.outline = null;
  }
  S4 && (l3 |= Rt.outline);
  const P4 = h3(t2, "latin"), N3 = nr(m3(P4, "typeface"), n2);
  N3 && (r2.latin = N3), m3(P4, "typeface") !== null && (l3 |= Rt.fontLatin);
  const M4 = h3(t2, "ea"), F3 = nr(m3(M4, "typeface"), n2);
  F3 && (r2.ea = F3), m3(M4, "typeface") !== null && (l3 |= Rt.fontEastAsian);
  const I4 = h3(t2, "cs"), R4 = nr(m3(I4, "typeface"), n2);
  return R4 && (r2.cs = R4), m3(I4, "typeface") !== null && (l3 |= Rt.fontComplexScript), Object.assign(r2, qn(t2, e3)), { props: r2, direct: l3 };
}
function nr(t2, e3) {
  return t2 ? t2 === "+mj-lt" ? e3.major.latin : t2 === "+mj-ea" ? e3.major.ea : t2 === "+mj-cs" ? e3.major.cs ?? e3.major.latin : t2 === "+mn-lt" ? e3.minor.latin : t2 === "+mn-ea" ? e3.minor.ea : t2 === "+mn-cs" ? e3.minor.cs ?? e3.minor.latin : t2 : null;
}
var rr = (t2, e3) => ({ ...t2, ...e3 });
function lr(t2) {
  for (const e3 of t2) {
    const t3 = h3(e3, "prstTxWarp");
    if (!t3) continue;
    const n2 = m3(t3, "prst");
    if (!n2 || n2 === "textNoShape") return;
    const r2 = {}, l3 = [];
    for (const e4 of f3(h3(t3, "avLst"), "gd")) {
      const t4 = m3(e4, "name"), n3 = m3(e4, "fmla") ?? "", o4 = Number(n3.replace(/^val\s+/, ""));
      t4 && Number.isFinite(o4) && (r2[t4] = o4), (!t4 || !/^val\s+-?\d+$/.test(n3) || !Number.isSafeInteger(o4)) && l3.push(`\u827A\u672F\u5B57\u8C03\u6574\u503C ${t4 ?? "(\u65E0\u540D)"}\uFF1A${n3}`);
    }
    return { preset: n2, adj: r2, ...l3.length ? { generationIssues: l3 } : {} };
  }
}
function or(t2, e3, n2 = false) {
  if (!t2) return null;
  const r2 = h3(t2, "bodyPr"), l3 = [r2, ...e3.bodyPrFallbacks ?? []], o4 = Dn(l3), s4 = (e3.bodyPrFallbacks ?? []).some(Boolean), i4 = e3.edit && s4 ? Dn(l3.slice(1)) : void 0, a3 = [], c4 = [];
  let u4 = false;
  for (const n3 of f3(t2, "p")) {
    const t3 = h3(n3, "pPr"), r3 = g3(t3, "lvl") ?? 0, l4 = Nn(e3.chain, r3), s5 = tr(t3, e3.ctx, e3.fonts), i5 = s5.props, d4 = Pn(l4, i5), f4 = [], p4 = (t4, n4) => {
      var r4;
      for (let l5 = t4.firstElementChild; l5; l5 = l5.nextElementSibling) if (l5.localName === "r" || l5.localName === "fld") {
        const t5 = h3(l5, "rPr"), n5 = er(t5, e3.ctx, e3.fonts), o5 = rr(d4.rp, n5.props), s6 = h3(t5, "hlinkClick");
        let i6 = false;
        if (s6 && e3.resolveLink) {
          const t6 = e3.resolveLink(m3(s6, "r:id") ?? "", m3(s6, "action"));
          t6 ? o5.link = t6 : i6 = true;
        }
        let a4 = ((r4 = h3(l5, "t")) == null ? void 0 : r4.textContent) ?? "";
        l5.localName === "fld" && !a4 && (a4 = ir(m3(l5, "type"), e3));
        const c5 = Vn(a4, o5, e3, d4.rp, n5.direct);
        e3.edit && i6 && c5.editInfo && (c5.editInfo = { ...c5.editInfo, readonlyLink: true }), f4.push(l5.localName === "fld" ? { ...c5, field: m3(l5, "type") ?? "unknown" } : c5), a4.trim() && (u4 = true);
      } else if (l5.localName === "br") {
        const t5 = h3(l5, "rPr"), n5 = er(t5, e3.ctx, e3.fonts), r5 = rr(d4.rp, n5.props);
        f4.push(Vn(`
`, r5, e3, d4.rp, n5.direct));
      } else if (l5.localName === "m" && l5.namespaceURI === "http://schemas.microsoft.com/office/drawing/2010/main") n4 > 0 && p4(l5, n4 - 1);
      else if (l5.localName === "AlternateContent") {
        const t5 = h3(l5, "Choice") ?? h3(l5, "Fallback");
        t5 && n4 > 0 && p4(t5, n4 - 1);
      } else if (l5.localName === "oMathPara" || l5.localName === "oMath") {
        const t5 = kn(l5), n5 = t5.length ? Cn(t5) : sr(l5), r5 = Jn(l5);
        if (t5.length || n5 || r5.length) {
          const l6 = Vn(n5, { ...d4.rp, i: true }, e3, d4.rp);
          t5.length && (l6.math = t5), r5.length && (l6.generationIssues = [...l6.generationIssues ?? [], ...r5]), f4.push(l6), u4 = true;
        }
      } else n4 > 0 && (l5.localName === "Choice" || l5.localName === "Fallback") && p4(l5, n4 - 1);
    };
    if (p4(n3, 4), f4.length === 0) {
      const t4 = h3(n3, "endParaRPr"), r4 = er(t4, e3.ctx, e3.fonts);
      f4.push(Vn("", rr(d4.rp, r4.props), e3, d4.rp, r4.direct));
    }
    c4.push(Bn({ lvl: r3, resolved: d4, inherited: l4, direct: i5, directRun: s5.directRun, runs: f4, counters: a3, lnSpcReduction: o4.lnSpcReduction ?? 0, env: e3 }));
  }
  return !u4 && !n2 ? null : { ...o4, paragraphs: c4, warp: lr(l3), ...e3.edit ? { editInfo: { direct: Hn(r2), ...i4 ? { inherited: i4 } : {} } } : {} };
}
function sr(t2) {
  const e3 = [], n2 = (t3, r2) => {
    for (let l3 = t3.firstElementChild; l3; l3 = l3.nextElementSibling) l3.localName === "t" ? e3.push(l3.textContent ?? "") : r2 > 0 && n2(l3, r2 - 1);
  };
  return n2(t2, 12), e3.join("").trim();
}
function ir(t2, e3) {
  return t2 ? t2 === "slidenum" ? String(e3.slideNum) : t2.startsWith("datetime") ? e3.dateText ?? /* @__PURE__ */ (/* @__PURE__ */ new Date()).toLocaleDateString() : t2 === "footer" ? e3.footerText ?? "" : "" : "";
}
function ar(t2) {
  return { ...t2, runs: t2.runs.length ? [{ ...t2.runs[t2.runs.length - 1], text: "" }] : [] };
}
function cr(t2, e3, n2 = false) {
  const r2 = /* @__PURE__ */ new Map();
  if (n2) for (const e4 of t2.paragraphs) r2.has(e4.lvl) || r2.set(e4.lvl, ar(e4));
  const l3 = [], o4 = Array.from({ length: 9 }, (n3, o5) => {
    const s4 = r2.get(o5);
    if (s4) return s4;
    const i4 = Nn(e3.chain, o5), a3 = Vn("", i4.rp, e3, i4.rp);
    return Bn({ lvl: o5, resolved: i4, inherited: i4, direct: { rp: {} }, directRun: 0, runs: [a3], counters: l3, lnSpcReduction: t2.lnSpcReduction ?? 0, env: e3 });
  });
  return { ...t2, paragraphs: o4 };
}
function ur(t2) {
  const e3 = (m3(t2, "uniqueId") ?? "").toLowerCase();
  if (/orgchart|hierarchy/.test(e3)) return "hierarchy";
  if (/pyramid/.test(e3)) return "pyramid";
  if (/radial|cycle.*matrix/.test(e3)) return "radial";
  if (/cycle|gear/.test(e3)) return "cycle";
  if (/matrix|grid/.test(e3)) return "snake";
  const n2 = /* @__PURE__ */ new Set(), r2 = (t3, e4) => {
    if (!(!t3 || e4 < 0)) for (let l3 = t3.firstElementChild; l3; l3 = l3.nextElementSibling) {
      if (l3.localName === "alg") {
        const t4 = m3(l3, "type");
        t4 && n2.add(t4);
      }
      r2(l3, e4 - 1);
    }
  };
  return r2(t2, 12), n2.has("hierRoot") || n2.has("hierChild") ? "hierarchy" : n2.has("pyra") ? "pyramid" : n2.has("cycle") ? "cycle" : n2.has("snake") ? "snake" : n2.has("sp") && !n2.has("lin") ? "radial" : "linear";
}
function dr(t2) {
  const e3 = (m3(t2, "uniqueId") ?? "").toLowerCase();
  if (/vlist|vertical|^.*\/list1$/.test(e3)) return true;
  const n2 = t2 == null ? void 0 : t2.getElementsByTagName("*");
  for (let t3 = 0; n2 && t3 < n2.length; t3++) if (n2[t3].localName === "param" && m3(n2[t3], "type") === "linDir") return m3(n2[t3], "val") === "fromT" || m3(n2[t3], "val") === "fromB";
  return false;
}
function fr(t2) {
  if (!t2) return [];
  const e3 = t2.localName === "dataModel" ? t2 : h3(t2, "dataModel"), n2 = h3(e3, "ptLst"), r2 = h3(e3, "cxnLst");
  if (!n2) return [];
  const l3 = /* @__PURE__ */ new Map();
  let o4 = null;
  for (const t3 of f3(n2, "pt")) {
    const e4 = m3(t3, "modelId");
    if (!e4) continue;
    const n3 = m3(t3, "type") ?? "node";
    n3 === "parTrans" || n3 === "sibTrans" || n3 === "pres" || (n3 === "doc" && (o4 = e4), l3.set(e4, { id: e4, txBody: h3(t3, "t"), kids: [] }));
  }
  for (const t3 of f3(r2, "cxn")) {
    if ((m3(t3, "type") ?? "parOf") !== "parOf") continue;
    const e4 = m3(t3, "srcId"), n3 = m3(t3, "destId");
    if (!e4 || !n3) continue;
    const r3 = l3.get(e4);
    !r3 || !l3.has(n3) || r3.kids.push({ id: n3, ord: g3(t3, "srcOrd") ?? 0 });
  }
  const s4 = /* @__PURE__ */ new Set(), i4 = (t3, e4) => {
    if (s4.has(t3) || e4 > 12) return null;
    s4.add(t3);
    const n3 = l3.get(t3);
    return n3 ? (n3.kids.sort((t4, e5) => t4.ord - e5.ord), { id: t3, text: null, children: n3.kids.map((t4) => i4(t4.id, e4 + 1)).filter((t4) => t4 !== null), depth: e4 }) : null;
  };
  if (o4) {
    const t3 = i4(o4, -1);
    return t3 ? t3.children : [];
  }
  const a3 = /* @__PURE__ */ new Set();
  for (const t3 of l3.values()) for (const e4 of t3.kids) a3.add(e4.id);
  return [...l3.keys()].filter((t3) => !a3.has(t3)).map((t3) => i4(t3, 0)).filter((t3) => t3 !== null);
}
function hr(t2, e3) {
  const n2 = (t2 == null ? void 0 : t2.localName) === "dataModel" ? t2 : h3(t2, "dataModel");
  for (const t3 of f3(h3(n2, "ptLst"), "pt")) if (m3(t3, "modelId") === e3) return h3(t3, "t");
  return null;
}
function pr(t2) {
  if (!t2) return [];
  const e3 = [], n2 = f3(t2, "styleLbl"), r2 = n2.find((t3) => (m3(t3, "name") ?? "").startsWith("node")) ?? n2[0], l3 = h3(r2 ?? null, "fillClrLst");
  for (let t3 = (l3 == null ? void 0 : l3.firstElementChild) ?? null; t3; t3 = t3.nextElementSibling) {
    const n3 = m3(t3, "val");
    n3 && e3.push(n3);
  }
  return e3;
}
function mr(t2) {
  const e3 = [], n2 = (t3) => {
    for (const r2 of t3) e3.push(r2), n2(r2.children);
  };
  return n2(t2), e3;
}
function gr(t2, e3, n2, r2) {
  const l3 = t2.length ? t2 : [];
  if (!l3.length) return [];
  const o4 = (r2 ? n2 : e3) * 0.04, s4 = l3.length;
  if (r2) {
    const t3 = (n2 - o4 * (s4 - 1)) / s4, r3 = Math.min(e3, t3 * 5);
    return l3.map((n3, l4) => ({ x: (e3 - r3) / 2, y: l4 * (t3 + o4), w: r3, h: t3, pt: n3, prst: "roundRect", colorIdx: l4 }));
  }
  const i4 = (e3 - o4 * (s4 - 1)) / s4, a3 = Math.min(n2, i4 * 0.8);
  return l3.map((t3, e4) => ({ x: e4 * (i4 + o4), y: (n2 - a3) / 2, w: i4, h: a3, pt: t3, prst: "roundRect", colorIdx: e4 }));
}
function br(t2, e3, n2) {
  const r2 = t2.length;
  if (!r2) return [];
  const l3 = Math.min(e3, n2) * (r2 <= 4 ? 0.34 : 0.28), o4 = l3 * 0.62, s4 = (e3 - l3) / 2, i4 = (n2 - o4) / 2;
  return t2.map((t3, a3) => {
    const c4 = -Math.PI / 2 + a3 * 2 * Math.PI / r2;
    return { x: e3 / 2 + s4 * Math.cos(c4) - l3 / 2, y: n2 / 2 + i4 * Math.sin(c4) - o4 / 2, w: l3, h: o4, pt: t3, prst: "ellipse", colorIdx: a3 };
  });
}
function vr(t2, e3, n2) {
  const r2 = t2.length;
  if (!r2) return [];
  const l3 = n2 / r2;
  return t2.map((t3, n3) => {
    const o4 = (n3 + 1) / r2 * e3;
    return { x: (e3 - o4) / 2, y: n3 * l3, w: o4, h: l3 * 0.94, pt: t3, prst: "trapezoid", colorIdx: n3 };
  });
}
function yr(t2, e3, n2) {
  const r2 = t2.length;
  if (!r2) return [];
  const l3 = Math.ceil(Math.sqrt(r2)), o4 = Math.ceil(r2 / l3), s4 = e3 * 0.03, i4 = n2 * 0.05, a3 = (e3 - s4 * (l3 - 1)) / l3, c4 = (n2 - i4 * (o4 - 1)) / o4;
  return t2.map((t3, e4) => ({ x: e4 % l3 * (a3 + s4), y: Math.floor(e4 / l3) * (c4 + i4), w: a3, h: c4, pt: t3, prst: "roundRect", colorIdx: e4 }));
}
function xr(t2, e3, n2) {
  if (!t2.length) return [];
  const [r2, ...l3] = t2, o4 = Math.min(e3, n2) * 0.3, s4 = [{ x: (e3 - o4) / 2, y: (n2 - o4) / 2, w: o4, h: o4, pt: r2, prst: "ellipse", colorIdx: 0 }], i4 = l3.length, a3 = Math.min(e3, n2) * 0.26, c4 = a3 * 0.62;
  return l3.forEach((t3, r3) => {
    const l4 = -Math.PI / 2 + r3 * 2 * Math.PI / Math.max(i4, 1);
    s4.push({ x: e3 / 2 + (e3 - a3) / 2 * Math.cos(l4) - a3 / 2, y: n2 / 2 + (n2 - c4) / 2 * Math.sin(l4) - c4 / 2, w: a3, h: c4, pt: t3, prst: "ellipse", colorIdx: r3 + 1 });
  }), s4;
}
function wr(t2, e3, n2) {
  const r2 = [], l3 = (t3, e4) => {
    if (t3.length) {
      (r2[e4] ?? (r2[e4] = [])).push(...t3);
      for (const n3 of t3) l3(n3.children, e4 + 1);
    }
  };
  if (l3(t2, 0), !r2.length) return [];
  const o4 = n2 / r2.length, s4 = o4 * 0.62, i4 = [];
  return r2.forEach((t3, n3) => {
    const r3 = e3 * 0.03, l4 = (e3 - r3 * (t3.length - 1)) / t3.length;
    t3.forEach((t4, e4) => {
      i4.push({ x: e4 * (l4 + r3), y: n3 * o4 + (o4 - s4) / 2, w: l4, h: s4, pt: t4, prst: "roundRect", colorIdx: n3 });
    });
  }), i4;
}
var kr = { linear: gr, cycle: (t2, e3, n2) => br(t2, e3, n2), pyramid: (t2, e3, n2) => vr(t2, e3, n2), hierarchy: (t2, e3, n2) => wr(t2, e3, n2), snake: (t2, e3, n2) => yr(t2, e3, n2), radial: (t2, e3, n2) => xr(t2, e3, n2) };
function Cr(t2, e3, n2, l3) {
  const o4 = l3.family === "hierarchy" ? t2 : mr(t2), s4 = kr[l3.family](o4, e3, n2, l3.vertical);
  if (!s4.length) return [];
  const i4 = [];
  if (l3.family === "hierarchy") {
    const e4 = new Map(s4.map((t3) => [t3.pt.id, t3])), n3 = (t3, e5) => {
      const n4 = t3.x + t3.w / 2, r3 = t3.y + t3.h, o5 = e5.x + e5.w / 2, s5 = e5.y, a3 = (r3 + s5) / 2, c4 = Math.min(n4, o5), u4 = Math.min(r3, s5), d4 = Math.max(Math.abs(o5 - n4), 1), f4 = Math.max(s5 - r3, 1), h4 = `M ${n4 - c4} 0 L ${n4 - c4} ${a3 - u4} L ${o5 - c4} ${a3 - u4} L ${o5 - c4} ${f4}`;
      i4.push({ kind: "shape", x: c4, y: u4, w: d4, h: f4, rot: 0, flipH: false, flipV: false, path: h4, fill: null, stroke: { color: l3.colors[0] ?? "rgb(68,114,196)", width: 1.5, dash: null }, text: null, openGeom: true, name: "SmartArt \u8FDE\u7EBF" });
    }, r2 = (t3) => {
      for (const l4 of t3) {
        const t4 = e4.get(l4.id);
        for (const r3 of l4.children) {
          const l5 = e4.get(r3.id);
          t4 && l5 && n3(t4, l5);
        }
        r2(l4.children);
      }
    };
    r2(t2);
  }
  for (const t3 of s4) {
    const e4 = { type: "solid", color: l3.colors[t3.colorIdx % Math.max(l3.colors.length, 1)] ?? "rgb(68,114,196)" }, n3 = Q(t3.prst, t3.w, t3.h, {}), o5 = { kind: "shape", x: t3.x, y: t3.y, w: t3.w, h: t3.h, rot: 0, flipH: false, flipV: false, path: n3.d, fill: e4, stroke: null, text: l3.textOf(t3.pt.id), name: "SmartArt \u8282\u70B9" };
    i4.push(o5);
  }
  return i4;
}
function Sr(t2, e3) {
  return { kind: "group", ...e3, childX: 0, childY: 0, scaleX: 1, scaleY: 1, children: t2, name: "SmartArt" };
}
var Pr = /* @__PURE__ */ new Set(["dt", "ftr", "sldNum", "hdr"]);
function Nr(t2, e3, n2, r2) {
  return Mr(t2, e3, n2, r2).flatMap((t3) => t3.layoutIds);
}
function Mr(t2, e3, n2, r2) {
  var l3, o4;
  const s4 = [], i4 = /* @__PURE__ */ new Set();
  for (const a3 of f3(h3(t2, "sldMasterIdLst"), "sldMasterId")) {
    const t3 = m3(a3, "r:id"), c4 = t3 ? (l3 = e3[t3]) == null ? void 0 : l3.target : null;
    if (!c4 || i4.has(c4)) continue;
    i4.add(c4);
    const u4 = c4 ? n2(c4) : null, d4 = c4 ? r2(c4) : {}, p4 = [];
    for (const t4 of f3(h3(u4, "sldLayoutIdLst"), "sldLayoutId")) {
      const e4 = m3(t4, "r:id"), n3 = e4 ? (o4 = d4[e4]) == null ? void 0 : o4.target : null;
      n3 && !p4.includes(n3) && p4.push(n3);
    }
    s4.push({ part: c4, layoutIds: p4 });
  }
  return s4;
}
function Fr(t2) {
  var e3, n2;
  const r2 = (e3 = t2.editInfo) == null ? void 0 : e3.placeholder;
  if (!r2) return null;
  if (t2.kind !== "shape") return t2;
  const l3 = ((n2 = t2.editInfo) == null ? void 0 : n2.textTemplate) ?? t2.text ?? void 0, o4 = l3 == null ? void 0 : l3.paragraphs[0], s4 = l3 && o4 ? { ...l3, paragraphs: [{ ...o4, runs: o4.runs.length ? [{ ...o4.runs[o4.runs.length - 1], text: "" }] : [] }] } : l3;
  return { ...t2, text: Pr.has(r2.type) ? t2.text : null, editInfo: { ...t2.editInfo, ...s4 ? { textTemplate: s4 } : {} } };
}
function Ir(t2, e3, n2) {
  if (n2 != null && n2.includes("nextslide")) return t2.edit ? "slide:next" : `slide:${t2.slideNum + 1}`;
  if (n2 != null && n2.includes("previousslide")) return t2.edit ? "slide:previous" : `slide:${t2.slideNum - 1}`;
  if (n2 != null && n2.includes("firstslide")) return t2.edit ? "slide:first" : "slide:1";
  if (n2 != null && n2.includes("lastslide")) return "slide:last";
  const r2 = t2.rels[e3];
  if (!r2) return null;
  if (un(r2.target)) return r2.target;
  const l3 = t2.slideIdMap[r2.target];
  return l3 === void 0 ? null : t2.edit ? `slide-part:${encodeURIComponent(r2.target)}` : `slide:${l3}`;
}
function Rr(t2, e3) {
  const n2 = h3(t2, "hlinkClick");
  if (!n2) return { unsupported: false };
  const r2 = Ir(e3, m3(n2, "r:id") ?? "", m3(n2, "action")) ?? void 0;
  return { ...r2 ? { link: r2 } : {}, unsupported: !r2 };
}
var Ar = "rgb(0,0,0)";
function $r(t2) {
  const e3 = {};
  for (const n2 of f3(t2, "font")) {
    const t3 = m3(n2, "script"), r2 = m3(n2, "typeface");
    t3 && r2 && (e3[t3] = r2);
  }
  return { latin: m3(h3(t2, "latin"), "typeface") ?? "", ea: m3(h3(t2, "ea"), "typeface") ?? "", cs: m3(h3(t2, "cs"), "typeface") ?? "", scripts: e3 };
}
function Er(t2, e3 = "") {
  const n2 = p3(t2, "themeElements", "clrScheme"), r2 = Object.fromEntries(dn.map((t3) => {
    const e4 = h3(h3(n2, t3), "srgbClr") ?? h3(h3(n2, t3), "sysClr") ?? h3(h3(n2, t3), "prstClr") ?? h3(h3(n2, t3), "scrgbClr") ?? h3(h3(n2, t3), "hslClr");
    return [t3, e4 ? S3(e4, { theme: {}, clrMap: {} }) : Ar];
  })), l3 = p3(t2, "themeElements", "fontScheme"), o4 = { major: $r(h3(l3, "majorFont")), minor: $r(h3(l3, "minorFont")) };
  return { id: e3, name: m3(t2, "name") ?? e3, colors: r2, fonts: o4 };
}
function Tr(t2) {
  return Object.fromEntries(Object.entries(t2.colors).map(([t3, e3]) => {
    const [n2, r2, l3] = N2(e3);
    return [t3, [n2, r2, l3].map((t4) => Math.round(t4).toString(16).padStart(2, "0")).join("").toUpperCase()];
  }));
}
function Lr(t2, e3, n2, r2) {
  var l3, o4;
  const s4 = [], i4 = {}, a3 = /* @__PURE__ */ new Set();
  for (const c4 of f3(h3(t2, "sldMasterIdLst"), "sldMasterId")) {
    const t3 = m3(c4, "r:id"), u4 = t3 ? (l3 = e3[t3]) == null ? void 0 : l3.target : null;
    if (!u4) continue;
    const d4 = (o4 = Object.values(r2(u4)).find((t4) => t4.type.endsWith("/theme"))) == null ? void 0 : o4.target;
    d4 && (i4[u4] = d4, !a3.has(d4) && (a3.add(d4), s4.push(Er(n2(d4), d4))));
  }
  return { themes: s4, themeByMaster: i4 };
}
function Br(t2, e3) {
  for (const n2 of Object.values(t2)) if (n2.type.endsWith(e3)) return n2.target;
  return null;
}
function zr(t2) {
  const e3 = Er(t2), n2 = p3(t2, "themeElements", "fmtScheme"), r2 = (t3) => {
    var e4;
    const r3 = [];
    for (let l3 = ((e4 = h3(n2, t3)) == null ? void 0 : e4.firstElementChild) ?? null; l3; l3 = l3.nextElementSibling) r3.push(l3);
    return r3;
  };
  return { colors: Tr(e3), fonts: e3.fonts, fillStyles: r2("fillStyleLst"), lnStyles: r2("lnStyleLst"), effectStyles: r2("effectStyleLst"), bgFillStyles: r2("bgFillStyleLst") };
}
function jr(t2) {
  const e3 = [];
  for (const n2 of Array.from((t2 == null ? void 0 : t2.children) ?? []).filter((t3) => t3.localName === "sp")) {
    const t3 = p3(n2, "nvSpPr", "nvPr", "ph");
    t3 && e3.push({ type: m3(t3, "type"), idx: m3(t3, "idx"), sp: n2 });
  }
  return e3;
}
function Or(t2, e3, n2) {
  var r2;
  return ((r2 = Bt(t2, (t3) => t3, { type: e3, idx: n2 })) == null ? void 0 : r2.sp) ?? null;
}
function Ur(t2, e3, n2, r2, l3, o4, s4, i4, a3) {
  const c4 = n2 ? t2.xml(n2) : null, u4 = n2 ? t2.rels(n2) : {}, d4 = n2 ? Br(u4, "/slideMaster") : null, f4 = d4 ? t2.xml(d4) : null;
  return Hr(t2, e3, n2, c4, d4, f4, r2, l3, o4, s4, i4, a3);
}
function Dr(t2, e3, n2, r2, l3, o4, s4, i4) {
  return Hr(t2, null, null, null, e3, t2.xml(e3), n2, r2, l3, o4, s4, i4);
}
function Hr(t2, e3, n2, r2, l3, o4, s4, i4, a3, c4, u4, d4) {
  const f4 = l3 ? t2.rels(l3) : {}, g4 = l3 ? Br(f4, "/theme") : null, b4 = zr(g4 ? t2.xml(g4) : null), v4 = {}, y4 = h3(o4, "clrMap");
  if (y4) for (const t3 of Array.from(y4.attributes)) v4[t3.localName] = t3.value;
  const x4 = p3(e3, "clrMapOvr", "overrideClrMapping") ?? p3(r2, "clrMapOvr", "overrideClrMapping");
  if (x4) for (const t3 of Array.from(x4.attributes)) v4[t3.localName] = t3.value;
  const w4 = { theme: b4.colors, clrMap: v4 }, k3 = `${g4 ?? ""}\0${Object.entries(v4).sort(([t3], [e4]) => t3.localeCompare(e4)).map(([t3, e4]) => `${t3}=${e4}`).join(";")}`;
  let C4 = d4 == null ? void 0 : d4.get(k3);
  if (!C4) {
    C4 = { lvls: [] };
    const t3 = Kn(h3(s4, "defaultTextStyle"), w4, b4.fonts);
    C4.def = t3.def, C4.lvls = t3.lvls, d4 == null || d4.set(k3, C4);
  }
  const S4 = h3(o4, "txStyles"), P4 = { title: Kn(h3(S4, "titleStyle"), w4, b4.fonts), body: Kn(h3(S4, "bodyStyle"), w4, b4.fonts), other: Kn(h3(S4, "otherStyle"), w4, b4.fonts) }, N3 = p3(o4, "cSld", "spTree"), M4 = p3(r2, "cSld", "spTree"), F3 = jr(M4), I4 = jr(N3), R4 = /* @__PURE__ */ new Set(), A4 = u4 ? /* @__PURE__ */ new Map() : void 0, $3 = h3(r2, "hf") ?? h3(o4, "hf");
  if ($3) for (const t3 of ["sldNum", "ftr", "dt", "hdr"]) m3($3, t3) === "0" && R4.add(t3);
  return { layoutPath: n2, layoutRoot: r2, masterPath: l3, masterRoot: o4, masterTree: N3, layoutTree: M4, envFor: (e4, n3) => ({ pkg: t2, ctx: w4, theme: b4, rels: e4 ? t2.rels(e4) : {}, partPath: e4 ?? "", docDefaults: C4, masterStyles: P4, layoutPh: n3 ? F3 : [], masterPh: n3 ? I4 : [], slideNum: c4, tableStyles: i4, hiddenPh: R4, slideIdMap: a3, edit: u4, textLevelTemplateCache: A4 }) };
}
var Wr = 20556;
var Gr = 4;
var Xr = 268435456;
var Vr = null;
var _r = (t2, e3) => (t2[e3] << 24 | t2[e3 + 1] << 16 | t2[e3 + 2] << 8 | t2[e3 + 3]) >>> 0;
var Zr = (t2, e3) => (t2[e3 + 3] << 24 | t2[e3 + 2] << 16 | t2[e3 + 1] << 8 | t2[e3]) >>> 0;
var Jr = (t2, e3) => t2[e3 + 1] << 8 | t2[e3];
function Kr(t2) {
  if (t2.length < 4) return null;
  switch (_r(t2, 0)) {
    case 65536:
    case 1953658213:
    case 1953784678:
      return "font/ttf";
    case 1330926671:
      return "font/otf";
    case 2001684038:
      return "font/woff";
    case 2001684018:
      return "font/woff2";
    default:
      return null;
  }
}
function Qr(t2) {
  const e3 = Kr(t2);
  if (e3) return { data: t2, mime: e3 };
  if (t2.length < 82 || Jr(t2, 34) !== Wr) return null;
  const n2 = Zr(t2, 12);
  if (n2 & Gr) {
    if (!Vr) return null;
    let e4 = null;
    try {
      e4 = Vr(t2);
    } catch {
      return null;
    }
    return e4 != null && e4.length ? { data: e4, mime: Kr(e4) ?? "font/ttf" } : null;
  }
  const r2 = Zr(t2, 4);
  if (!r2 || r2 > t2.length - 82) return null;
  let l3 = t2.subarray(t2.length - r2);
  if (n2 & Xr) {
    l3 = l3.slice();
    for (let t3 = 0; t3 < l3.length; t3++) l3[t3] ^= 80;
  }
  const o4 = Kr(l3);
  return o4 ? { data: l3, mime: o4 } : null;
}
var tl = class {
  constructor(t2, e3 = "asset:") {
    this.publishAssets = t2, this.tokenPrefix = e3, this.mode = "blob", this.deferred = [], this.deferredIndex = /* @__PURE__ */ new Map(), this.urlCache = /* @__PURE__ */ new Map(), this.objectUrls = [], this.packageAssets = /* @__PURE__ */ Object.create(null);
  }
  get published() {
    return this.packageAssets;
  }
  store(t2, e3, n2, r2) {
    let l3;
    if (this.mode === "defer") {
      let r3 = this.deferredIndex.get(t2);
      r3 === void 0 && (r3 = `${this.tokenPrefix}${this.deferred.length}`, this.deferred.push({ mime: n2, data: e3 }), this.deferredIndex.set(t2, r3)), l3 = r3;
    } else {
      let r3 = this.urlCache.get(t2);
      r3 === void 0 && (r3 = URL.createObjectURL(new Blob([e3.slice().buffer], { type: n2 })), this.objectUrls.push(r3), this.urlCache.set(t2, r3)), l3 = r3;
    }
    return this.publishAssets && (this.packageAssets[l3] = { mime: n2, bytes: e3, sourcePart: r2 }), l3;
  }
  cached(t2, e3) {
    return this.urlCache.has(t2) || this.urlCache.set(t2, e3()), this.urlCache.get(t2) ?? null;
  }
  publish(t2, e3, n2, r2) {
    this.publishAssets && (this.packageAssets[t2] = { mime: n2, bytes: e3, sourcePart: r2 });
  }
  dispose() {
    for (const t2 of this.objectUrls) try {
      URL.revokeObjectURL(t2);
    } catch {
    }
    this.objectUrls = [], this.deferred.length = 0, this.deferredIndex.clear(), this.urlCache.clear(), this.packageAssets = /* @__PURE__ */ Object.create(null);
  }
};
function el(t2) {
  return t2.endsWith("/") ? false : /\/(?:media|embeddings)\//i.test(t2) || /^ppt\/slides\/(?:_rels\/)?slide[^/]+$/i.test(t2) || /^ppt\/(?:notesSlides|comments|charts|diagrams)\//i.test(t2) || /^ppt\/vbaProject/i.test(t2);
}
function nl(t2) {
  const e3 = /* @__PURE__ */ new Set(), n2 = t2.unzip((t3) => el(t3.name) ? (e3.add(t3.name), false) : true);
  if (e3.size === 0) return n2;
  const r2 = (r3) => {
    if (Object.prototype.hasOwnProperty.call(n2, r3)) return n2[r3];
    if (!e3.has(r3)) return;
    const l3 = t2.unzip((t3) => t3.name === r3);
    e3.delete(r3);
    const o4 = l3[r3];
    if (o4) return n2[r3] = o4, o4;
  };
  return new Proxy(n2, { get(t3, n3, l3) {
    return typeof n3 == "string" && e3.has(n3) ? r2(n3) : Reflect.get(t3, n3, l3);
  }, has(t3, n3) {
    return Reflect.has(t3, n3) || typeof n3 == "string" && e3.has(n3);
  } });
}
var rl = new TextDecoder();
var ll = new Uint8Array(0);
var ol = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", bmp: "image/bmp", webp: "image/webp", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff" };
var sl = { emf: "image/x-emf", wmf: "image/x-wmf", pict: "image/x-pict", pct: "image/x-pict", pic: "image/x-pict" };
function il(t2, e3) {
  if (e3.startsWith("/")) return e3.slice(1);
  const n2 = [];
  for (const r2 of (t2 + e3).split("/")) r2 === ".." ? n2.pop() : r2 !== "." && r2 !== "" && n2.push(r2);
  return n2.join("/");
}
var al = class {
  constructor(t2, e3 = false, n2) {
    this.existingAssetUrls = /* @__PURE__ */ new Map(), this.xmlCache = /* @__PURE__ */ new Map(), this.relsCache = /* @__PURE__ */ new Map(), this.imageMetadataCache = /* @__PURE__ */ new Map(), this.cacheTrace = null, this.sourceBytes = null, this.isDisposed = false;
    const r2 = !(t2 instanceof Uint8Array);
    if (ot2(this, r2 ? t2 : void 0), r2) this.files = t2.parts;
    else {
      const r3 = new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength), o4 = new vt(r3, n2);
      this.files = e3 ? o4.unzip() : nl(o4);
    }
    if (this.assetStore = new tl(e3, r2 ? "layout-asset:" : "asset:"), r2) for (const [e4, n3] of Object.entries(t2.assets ?? {})) n3.sourcePart && this.existingAssetUrls.set(n3.sourcePart, e4);
    else if (e3) {
      this.sourceBytes = t2;
      const e4 = this;
      this.opcHandle = Object.freeze({ format: "pptx", get bytes() {
        return e4.sourceBytes ?? ll;
      }, get parts() {
        return e4.files;
      }, get assets() {
        return e4.assetStore.published;
      }, get disposed() {
        return e4.isDisposed;
      } }), ot2(this.opcHandle, this);
    }
  }
  set assetMode(t2) {
    this.assetStore.mode = t2;
  }
  get deferred() {
    return this.assetStore.deferred;
  }
  get opcPackage() {
    return this.opcHandle;
  }
  xml(t2) {
    var e3;
    if ((e3 = this.cacheTrace) == null || e3.add(t2), !this.xmlCache.has(t2)) {
      const e4 = this.files[t2];
      let n2 = null;
      if (e4) try {
        n2 = d3(rl.decode(e4));
      } catch {
        n2 = null;
      }
      this.xmlCache.set(t2, n2);
    }
    return this.xmlCache.get(t2) ?? null;
  }
  forgetXml(t2) {
    this.xmlCache.delete(t2);
  }
  forgetPart(t2) {
    const e3 = t2.slice(0, t2.lastIndexOf("/") + 1);
    this.xmlCache.delete(t2), this.relsCache.delete(t2), this.xmlCache.delete(`${e3}_rels/${t2.slice(e3.length)}.rels`), this.imageMetadataCache.delete(t2);
  }
  beginCacheTrace() {
    if (this.cacheTrace) throw new Error("OPC \u7F13\u5B58\u8BBF\u95EE\u4F5C\u7528\u57DF\u4E0D\u80FD\u5D4C\u5957");
    return this.cacheTrace = /* @__PURE__ */ new Set(), this.cacheTrace;
  }
  endCacheTrace(t2) {
    if (this.cacheTrace !== t2) throw new Error("OPC \u7F13\u5B58\u8BBF\u95EE\u4F5C\u7528\u57DF\u4E0D\u5339\u914D");
    return this.cacheTrace = null, [...t2];
  }
  rels(t2) {
    var e3;
    if ((e3 = this.cacheTrace) == null || e3.add(t2), !this.relsCache.has(t2)) {
      const e4 = t2.slice(0, t2.lastIndexOf("/") + 1), n2 = {}, r2 = this.xml(`${e4}_rels/${t2.slice(e4.length)}.rels`);
      for (const t3 of f3(r2, "Relationship")) {
        const r3 = m3(t3, "Id"), l3 = m3(t3, "Target");
        if (!r3 || !l3) continue;
        const o4 = m3(t3, "TargetMode") === "External";
        n2[r3] = o4 ? { type: m3(t3, "Type") ?? "", target: l3, external: true } : { type: m3(t3, "Type") ?? "", target: il(e4, l3) };
      }
      this.relsCache.set(t2, n2);
    }
    return this.relsCache.get(t2);
  }
  blobUrl(t2, e3) {
    const n2 = this.existingAssetUrls.get(t2);
    if (n2) return n2;
    const r2 = this.files[t2];
    return r2 ? this.assetStore.store(`${e3}|${t2}`, r2, e3, t2) : null;
  }
  fontUrl(t2) {
    const e3 = this.existingAssetUrls.get(t2);
    if (e3) return e3;
    const n2 = this.files[t2];
    if (!n2) return null;
    const r2 = Qr(n2);
    return r2 ? this.assetStore.store(`font|${t2}`, r2.data, r2.mime, t2) : null;
  }
  fontSourceUrl(t2) {
    const e3 = this.files[t2];
    return e3 ? this.assetStore.store(`font-source|${t2}`, e3, "application/octet-stream") : null;
  }
  dispose() {
    this.assetStore.dispose(), this.xmlCache.clear(), this.relsCache.clear(), this.imageMetadataCache.clear(), this.files = {}, this.sourceBytes = null, this.isDisposed = true;
  }
  mediaUrl(t2) {
    const e3 = this.existingAssetUrls.get(t2);
    if (e3) return e3;
    const n2 = t2.slice(t2.lastIndexOf(".") + 1).toLowerCase();
    if (gt.has(n2)) {
      const e4 = `mf|${t2}`, r3 = this.assetStore.cached(e4, () => {
        const e5 = this.files[t2];
        return e5 ? mt(e5) : null;
      }), l3 = this.files[t2];
      return r3 && l3 && this.assetStore.publish(r3, l3, sl[n2] ?? "application/octet-stream", t2), r3;
    }
    const r2 = ol[n2];
    return r2 ? this.blobUrl(t2, r2) : null;
  }
  imageMetadata(t2) {
    var e3;
    if ((e3 = this.cacheTrace) == null || e3.add(t2), !this.imageMetadataCache.has(t2)) {
      const e4 = this.files[t2];
      this.imageMetadataCache.set(t2, e4 ? et2(e4) : null);
    }
    return this.imageMetadataCache.get(t2) ?? null;
  }
};
function ul(t2, e3) {
  if (e3) {
    e3.fill !== void 0 && (t2.fill = structuredClone(e3.fill));
    for (const [n2, r2] of Object.entries(e3.borders ?? {})) t2.borders[n2] = structuredClone(r2);
  }
}
function dl(t2, e3, n2, r2, l3, o4) {
  const s4 = { fill: null, borders: {} }, { parts: i4 } = t2, a3 = e3.firstRow && n2 === 0, c4 = e3.lastRow && n2 === l3 - 1, u4 = e3.firstCol && r2 === 0, d4 = e3.lastCol && r2 === o4 - 1, f4 = e3.bandRow ? e3.firstRow ? n2 - 1 : n2 : -1, h4 = e3.bandCol ? e3.firstCol ? r2 - 1 : r2 : -1, p4 = [i4.wholeTbl];
  f4 >= 0 && !a3 && !c4 && p4.push(f4 % 2 === 0 ? i4.band1H : i4.band2H), h4 >= 0 && !u4 && !d4 && p4.push(h4 % 2 === 0 ? i4.band1V : i4.band2V), u4 && p4.push(i4.firstCol), d4 && p4.push(i4.lastCol), a3 && p4.push(i4.firstRow), c4 && p4.push(i4.lastRow), a3 && u4 && p4.push(i4.nwCell), a3 && d4 && p4.push(i4.neCell), c4 && u4 && p4.push(i4.swCell), c4 && d4 && p4.push(i4.seCell);
  let m4;
  for (const t3 of p4) ul(s4, t3), t3 != null && t3.text && (m4 = { ...m4, ...t3.text });
  return { ...s4, text: m4 };
}
var hl = "{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}";
var pl = Object.freeze({ [hl]: `<a:tblStyle styleId="${hl}" styleName="Medium Style 2 - Accent 1">
<a:wholeTbl><a:tcTxStyle><a:fontRef idx="minor"><a:scrgbClr r="0" g="0" b="0"/></a:fontRef><a:schemeClr val="dk1"/></a:tcTxStyle>
<a:tcStyle><a:tcBdr>
<a:left><a:ln w="12700" cmpd="sng"><a:solidFill><a:schemeClr val="lt1"/></a:solidFill></a:ln></a:left>
<a:right><a:ln w="12700" cmpd="sng"><a:solidFill><a:schemeClr val="lt1"/></a:solidFill></a:ln></a:right>
<a:top><a:ln w="12700" cmpd="sng"><a:solidFill><a:schemeClr val="lt1"/></a:solidFill></a:ln></a:top>
<a:bottom><a:ln w="12700" cmpd="sng"><a:solidFill><a:schemeClr val="lt1"/></a:solidFill></a:ln></a:bottom>
</a:tcBdr><a:fill><a:solidFill><a:schemeClr val="accent1"><a:tint val="20000"/></a:schemeClr></a:solidFill></a:fill></a:tcStyle></a:wholeTbl>
<a:band1H><a:tcStyle><a:tcBdr/><a:fill><a:solidFill><a:schemeClr val="accent1"><a:tint val="40000"/></a:schemeClr></a:solidFill></a:fill></a:tcStyle></a:band1H>
<a:band2H><a:tcStyle><a:tcBdr/><a:fill><a:solidFill><a:schemeClr val="lt1"/></a:solidFill></a:fill></a:tcStyle></a:band2H>
<a:firstRow><a:tcTxStyle b="on"><a:fontRef idx="minor"><a:scrgbClr r="0" g="0" b="0"/></a:fontRef><a:schemeClr val="lt1"/></a:tcTxStyle>
<a:tcStyle><a:tcBdr><a:bottom><a:ln w="38100" cmpd="sng"><a:solidFill><a:schemeClr val="lt1"/></a:solidFill></a:ln></a:bottom></a:tcBdr>
<a:fill><a:solidFill><a:schemeClr val="accent1"/></a:solidFill></a:fill></a:tcStyle></a:firstRow>
</a:tblStyle>` });
var ml = Object.freeze([Object.freeze({ styleId: hl, name: "Medium Style 2 - Accent 1", markup: pl[hl] })]);
function gl() {
  return ml;
}
function bl(t2) {
  return t2 ? pl[t2.toUpperCase()] ?? null : null;
}
var vl = /* @__PURE__ */ new Map();
function yl(t2) {
  if (!t2) return null;
  const e3 = t2.toUpperCase(), n2 = vl.get(e3);
  if (n2) return n2;
  const r2 = bl(e3);
  if (!r2) return null;
  const l3 = d3(`<root xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">${r2}</root>`), o4 = h3(l3, "tblStyle"), s4 = { root: l3, style: o4 };
  return vl.set(e3, s4), s4;
}
function xl(t2, e3) {
  const n2 = f3(t2, "tblStyle"), r2 = m3(t2, "def"), l3 = n2.find((t3) => {
    var n3;
    return ((n3 = m3(t3, "styleId")) == null ? void 0 : n3.toUpperCase()) === (e3 == null ? void 0 : e3.toUpperCase());
  });
  if (l3 && t2) return { style: l3, namespaceRoot: t2, source: "document" };
  const o4 = yl(e3);
  if (o4) return { ...o4, namespaceRoot: o4.root, source: "builtin" };
  const s4 = n2.find((t3) => {
    var e4;
    return ((e4 = m3(t3, "styleId")) == null ? void 0 : e4.toUpperCase()) === (r2 == null ? void 0 : r2.toUpperCase());
  });
  if (s4 && t2) return { style: s4, namespaceRoot: t2, source: "document" };
  const i4 = yl(r2);
  return i4 ? { ...i4, namespaceRoot: i4.root, source: "builtin" } : null;
}
function wl(t2) {
  return t2 ? { wholeTbl: h3(t2, "wholeTbl"), band1H: h3(t2, "band1H"), band2H: h3(t2, "band2H"), band1V: h3(t2, "band1V"), band2V: h3(t2, "band2V"), firstRow: h3(t2, "firstRow"), lastRow: h3(t2, "lastRow"), firstCol: h3(t2, "firstCol"), lastCol: h3(t2, "lastCol"), nwCell: h3(t2, "nwCell"), neCell: h3(t2, "neCell"), swCell: h3(t2, "swCell"), seCell: h3(t2, "seCell") } : null;
}
var kl = [["l", "left", "lnL"], ["r", "right", "lnR"], ["t", "top", "lnT"], ["b", "bottom", "lnB"]];
function Cl(t2, e3, n2) {
  if (!t2) return;
  const r2 = h3(t2, "tcStyle"), l3 = n2.fill(h3(r2, "fill") ?? r2, e3), o4 = {}, s4 = h3(r2, "tcBdr");
  for (const [t3, r3] of kl) {
    const l4 = h3(s4, r3);
    l4 && (o4[t3] = n2.line(h3(l4, "ln"), e3, null));
  }
  const i4 = h3(t2, "tcTxStyle"), a3 = m3(i4, "b"), c4 = i4 ? C3(i4, e3.ctx) : null, u4 = { ...a3 !== null ? { b: a3 === "on" || a3 === "1" || a3 === "true" } : {}, ...c4 ? { color: c4 } : {} };
  return { ...l3 ? { fill: l3 } : {}, ...Object.keys(o4).length ? { borders: o4 } : {}, ...Object.keys(u4).length ? { text: u4 } : {} };
}
function Sl(t2) {
  return t2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Pl(t2) {
  return Array.from(t2.attributes).filter((t3) => t3.name === "xmlns" || t3.name.startsWith("xmlns:")).map((t3) => ({ name: t3.name, value: t3.value }));
}
function Nl(t2, e3 = t2.tagName, n2 = []) {
  const r2 = new Set(Array.from(t2.attributes).map((t3) => t3.name)), l3 = [...n2.filter((t3) => !r2.has(t3.name)), ...Array.from(t2.attributes).map((t3) => ({ name: t3.name, value: t3.value }))].map((t3) => ` ${t3.name}="${Sl(t3.value)}"`).join(""), o4 = Array.from(t2.childNodes);
  if (!o4.length) return `<${e3}${l3}/>`;
  const s4 = o4.map((t3) => {
    if (typeof t3 == "string") return Sl(t3);
    const e4 = t3;
    return e4.nodeType === 1 || e4.tagName ? Nl(t3) : Sl(e4.nodeValue ?? "");
  }).join("");
  return `<${e3}${l3}>${s4}</${e3}>`;
}
var Ml = ["wholeTbl", "band1H", "band2H", "band1V", "band2V", "firstRow", "lastRow", "firstCol", "lastCol", "nwCell", "neCell", "swCell", "seCell"];
function Fl(t2, e3, n2) {
  var r2, l3;
  const o4 = (r2 = m3(t2.style, "styleId")) == null ? void 0 : r2.trim();
  if (!o4) return null;
  const s4 = {};
  for (const r3 of Ml) {
    const l4 = Cl(h3(t2.style, r3), e3, n2);
    l4 && (s4[r3] = l4);
  }
  return { styleId: o4, name: ((l3 = m3(t2.style, "styleName")) == null ? void 0 : l3.trim()) || t2.fallbackName || o4, source: t2.source, markup: Nl(t2.style, t2.style.tagName, Pl(t2.namespaceRoot)), parts: s4 };
}
function Il(t2, e3, n2) {
  const r2 = [], l3 = /* @__PURE__ */ new Set(), o4 = (t3) => {
    const e4 = t3 == null ? void 0 : t3.styleId.toUpperCase();
    !t3 || l3.has(e4) || (l3.add(e4), r2.push(t3));
  };
  for (const r3 of f3(t2, "tblStyle")) o4(Fl({ style: r3, namespaceRoot: t2, source: "document" }, e3, n2));
  for (const t3 of gl()) {
    const r3 = yl(t3.styleId);
    o4(Fl({ style: r3.style, namespaceRoot: r3.root, source: "builtin", fallbackName: t3.name }, e3, n2));
  }
  return r2;
}
function Rl(t2, e3, n2) {
  const r2 = h3(t2, "tcPr"), l3 = n2.fill(r2, e3), o4 = {};
  for (const [t3, , l4] of kl) {
    const s4 = h3(r2, l4);
    s4 && (o4[t3] = n2.line(s4, e3, null));
  }
  return { fill: l3, borders: o4 };
}
function Al(t2, e3, n2, r2, l3) {
  var o4, s4;
  const i4 = h3(t2, "tblPr"), a3 = ((s4 = (o4 = h3(i4, "tableStyleId")) == null ? void 0 : o4.textContent) == null ? void 0 : s4.trim()) ?? null, c4 = xl(n2.tableStyles, a3), u4 = c4 ? Fl(c4, n2, r2) : null, d4 = { styleId: a3 ?? (u4 == null ? void 0 : u4.styleId) ?? "", firstRow: b3(i4, "firstRow"), lastRow: b3(i4, "lastRow"), bandRow: b3(i4, "bandRow"), firstCol: b3(i4, "firstCol"), lastCol: b3(i4, "lastCol"), bandCol: b3(i4, "bandCol") }, p4 = f3(h3(t2, "tblGrid"), "gridCol").map((t3) => v3(g3(t3, "w"))), y4 = f3(t2, "tr"), x4 = (t3, e4, l4) => {
    const o5 = f3(t3, "tc");
    return { height: v3(g3(t3, "h")), cells: o5.map((t4, s5) => {
      var i5, a4, c5, f4;
      const p5 = u4 ? dl(u4, d4, e4, s5, l4, o5.length) : { fill: null, borders: {}, text: void 0 }, y5 = Rl(t4, n2, r2), x5 = structuredClone(p5.borders);
      for (const [t5, e5] of Object.entries(y5.borders)) x5[t5] = e5;
      const w5 = h3(t4, "txBody"), k4 = { ctx: n2.ctx, fonts: n2.theme.fonts, chain: [n2.docDefaults], slideNum: n2.slideNum, defaultColor: ((i5 = p5.text) == null ? void 0 : i5.color) ?? null, resolveLink: (t5, e5) => Ir(n2, t5, e5), edit: n2.edit }, C5 = or(w5, k4), S4 = !C5 && n2.edit ? or(w5, k4, true) ?? void 0 : void 0;
      if (((a4 = p5.text) == null ? void 0 : a4.b) !== void 0) {
        for (const t5 of [C5, S4]) if (t5) for (const e5 of t5.paragraphs) for (const t6 of e5.runs) ((((c5 = e5.editInfo) == null ? void 0 : c5.directRun) ?? 0) | (((f4 = t6.editInfo) == null ? void 0 : f4.direct) ?? 0)) & Rt.b || (t6.b = p5.text.b);
      }
      let P4;
      if (n2.edit) {
        const t5 = { ...k4, defaultColor: null }, e5 = or(w5, t5), n3 = e5 ? void 0 : or(w5, t5, true) ?? void 0;
        P4 = { fill: y5.fill, borders: y5.borders, text: e5, ...n3 ? { textTemplate: n3 } : {} };
      }
      const N3 = h3(t4, "tcPr"), M4 = (t5, e5) => {
        const n3 = g3(N3, t5);
        return v3(n3 === null ? e5 : n3);
      };
      return { colSpan: g3(t4, "gridSpan") ?? 1, rowSpan: g3(t4, "rowSpan") ?? 1, merged: b3(t4, "hMerge") || b3(t4, "vMerge"), fill: y5.fill ?? p5.fill, text: C5, borders: x5, margins: [M4("marT", 45720), M4("marR", 91440), M4("marB", 45720), M4("marL", 91440)], vAlign: m3(N3, "anchor") === "ctr" ? "middle" : m3(N3, "anchor") === "b" ? "bottom" : "top", vert: m3(N3, "vert") === "vert" ? "vert" : m3(N3, "vert") === "vert270" ? "vert270" : void 0, ...S4 || P4 ? { editInfo: { ...S4 ? { textTemplate: S4 } : {}, ...P4 ? { styleBase: P4 } : {} } } : {} };
    }) };
  }, w4 = y4.map((t3, e4) => x4(t3, e4, y4.length));
  let k3 = n2.edit && a3 ? { tableStyle: d4 } : void 0;
  const C4 = y4[y4.length - 1];
  if (n2.edit && C4) {
    const t3 = y4.length;
    k3 = { ...k3, tableRowAppend: { ...t3 === 1 ? { previousLast: x4(C4, 0, 2) } : {}, regular: [x4(C4, t3, t3 + 2), x4(C4, t3 + 1, t3 + 3)], last: [x4(C4, t3, t3 + 1), x4(C4, t3 + 1, t3 + 2)] } };
  }
  return { kind: "table", ...e3, colWidths: p4, rows: w4, name: l3, ...k3 ? { editInfo: k3 } : {} };
}
var $l = /* @__PURE__ */ new WeakMap();
var El = null;
var Tl = '<a:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="zh-CN"/></a:p></a:txBody>';
var Ll = '<a:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="zh-CN" b="0"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill></a:endParaRPr></a:p></a:txBody>';
var Bl = '<a:solidFill><a:schemeClr val="tx1"><a:alpha val="25000"/></a:schemeClr></a:solidFill>';
function zl(t2, e3) {
  const n2 = [(t2 == null ? void 0 : t2.wholeTbl) ?? null, e3];
  return `<a:tcPr>${kl.map(([, t3, e4]) => {
    let r2 = null;
    for (const e5 of n2) {
      const n3 = h3(h3(h3(e5, "tcStyle"), "tcBdr"), t3);
      n3 && (r2 = h3(n3, "ln"));
    }
    return r2 ? Nl(r2, `a:${e4}`) : `<a:${e4} w="9525">${Bl}</a:${e4}>`;
  }).join("")}${t2 ? "" : '<a:solidFill><a:schemeClr val="lt1"/></a:solidFill>'}</a:tcPr>`;
}
function jl(t2, e3, n2) {
  const r2 = `${e3}\0${t2.join("\0")}`, l3 = n2 ? $l.get(n2) : null, o4 = n2 ? l3 == null ? void 0 : l3.get(r2) : El;
  if (o4) return o4;
  const s4 = (t3) => `<a:tc>${e3}${t3}</a:tc>`, i4 = d3(`<root xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
<a:tbl><a:tblPr firstRow="1" bandRow="1"/><a:tblGrid><a:gridCol w="9525"/></a:tblGrid>
<a:tr h="9525">${s4(t2[0])}</a:tr>
<a:tr h="9525">${s4(t2[1])}</a:tr>
<a:tr h="9525">${s4(t2[2])}</a:tr>
</a:tbl></root>`), a3 = h3(i4, "tbl");
  if (n2) {
    const t3 = l3 ?? /* @__PURE__ */ new Map();
    t3.set(r2, a3), l3 || $l.set(n2, t3);
  } else El = a3;
  return a3;
}
function Ol(t2, e3) {
  var n2, r2, l3, o4;
  const s4 = (n2 = m3(t2.tableStyles, "def")) == null ? void 0 : n2.trim(), i4 = s4 ? xl(t2.tableStyles, s4) : null, a3 = wl((i4 == null ? void 0 : i4.style) ?? null), c4 = [zl(a3, (a3 == null ? void 0 : a3.firstRow) ?? null), zl(a3, (a3 == null ? void 0 : a3.band1H) ?? null), zl(a3, (a3 == null ? void 0 : a3.band2H) ?? null)], u4 = a3 ? Tl : Ll, d4 = Al(jl(c4, u4, a3 ? t2.tableStyles : null), { x: 0, y: 0, w: 1, h: 3, rot: 0, flipH: false, flipV: false }, t2, e3), [f4, h4, p4] = d4.rows.map((t3) => t3.cells[0]);
  if (!((r2 = f4 == null ? void 0 : f4.editInfo) != null && r2.textTemplate) || !((l3 = h4 == null ? void 0 : h4.editInfo) != null && l3.textTemplate) || !((o4 = p4 == null ? void 0 : p4.editInfo) != null && o4.textTemplate)) throw new Error("\u65E0\u6CD5\u6784\u9020\u65B0\u589E\u8868\u683C\u5355\u5143\u683C\u6A21\u677F");
  return { ...s4 ? { styleId: s4 } : {}, textBodyMarkup: u4, cellPropertiesMarkup: c4, firstRow: f4, bandRows: [h4, p4] };
}
function Ul(t2) {
  const e3 = m3(t2, "title"), n2 = m3(t2, "descr");
  if (!(e3 === null && n2 === null)) return { ...e3 === null ? {} : { title: e3 }, ...n2 === null ? {} : { descr: n2 } };
}
function Dl(t2, e3) {
  const n2 = [], r2 = t2.getElementsByTagName("*");
  for (let t3 = 0; t3 < r2.length; t3++) if (r2[t3].localName === "sectionLst") {
    for (const l3 of f3(r2[t3], "section")) {
      const t4 = [], r3 = [];
      for (const n3 of f3(h3(l3, "sldIdLst"), "sldId")) {
        const l4 = g3(n3, "id");
        if (l4 === null) continue;
        t4.push(l4);
        const o5 = e3.get(l4);
        o5 !== void 0 && r3.push(o5);
      }
      const o4 = m3(l3, "id");
      n2.push({ name: m3(l3, "name") ?? `\u8282 ${n2.length + 1}`, slideIds: t4, slideIndexes: r3, ...o4 === null ? {} : { id: o4 } });
    }
    break;
  }
  return n2;
}
var Hl = /* @__PURE__ */ new Set(["http://schemas.openxmlformats.org/presentationml/2006/main", "http://schemas.openxmlformats.org/drawingml/2006/main", "http://schemas.openxmlformats.org/officeDocument/2006/math", "http://schemas.microsoft.com/office/powerpoint/2010/main", "http://schemas.microsoft.com/office/drawing/2010/main"]);
function Wl(t2) {
  return t2.some((t3) => t3.kind === "unsupported" || t3.kind === "group" && Wl(t3.children));
}
function Gl(t2) {
  return Array.from(t2.children).filter((t3) => t3.namespaceURI === Vt).flatMap((t3) => Array.from(t3.children).flatMap((t4) => t4.namespaceURI === Vt && t4.localName === "AlternateContent" ? Gl(t4) : [t4]));
}
function Xl(t2, e3, n2, r2, l3) {
  var o4;
  if (t2.namespaceURI !== Vt) return [];
  const s4 = qt(t2, { has: (t3) => Hl.has(t3) || at2(t3, l3) }), i4 = f3(t2, "Choice").find((t3) => t3.namespaceURI === Vt);
  let a3 = s4 ? e3(s4) : Array.from((i4 == null ? void 0 : i4.children) ?? []).flatMap((t3) => {
    const e4 = n2(t3);
    return e4 ? [e4] : [];
  });
  if ((s4 == null ? void 0 : s4.localName) === "Choice" && Wl(a3)) {
    const n3 = f3(t2, "Fallback").find((t3) => t3.namespaceURI === Vt), r3 = n3 ? e3(n3) : [];
    r3.length && !Wl(r3) && (a3 = r3);
  }
  if (r2) {
    const e4 = Gl(t2).some((t3) => {
      var e5, r3;
      return (r3 = (e5 = n2(t3)) == null ? void 0 : e5.editInfo) == null ? void 0 : r3.moveLocked;
    });
    for (const t3 of a3) t3.editInfo = { ...t3.editInfo, editable: ((o4 = t3.editInfo) == null ? void 0 : o4.editable) === "none" ? "none" : "frame", requiresOriginal: true, ...e4 ? { moveLocked: true } : {} };
  }
  return a3;
}
var Vl = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
var ql = /* @__PURE__ */ new WeakMap();
function Yl(t2, e3, n2) {
  const r2 = t2.files;
  if (!r2) return;
  let l3 = ql.get(t2);
  l3 || ql.set(t2, l3 = /* @__PURE__ */ new Map());
  const o4 = (t3) => {
    const e4 = r2[t3];
    e4 && l3.set(t3, { url: `web-ppt-source:${t3}`, mime: "application/octet-stream", bytes: e4 });
  }, s4 = (t3) => {
    const e4 = t3.lastIndexOf("/") + 1;
    return `${t3.slice(0, e4)}_rels/${t3.slice(e4)}.rels`;
  }, i4 = /* @__PURE__ */ new Set(), a3 = (e4) => {
    if (!(i4.has(e4) || !r2[e4])) {
      i4.add(e4), o4(e4), o4(s4(e4));
      for (const n3 of Object.values(t2.rels(e4))) a3(n3.target);
    }
  };
  o4(n2), o4(s4(n2)), o4("[Content_Types].xml");
  const c4 = t2.rels(n2), u4 = (t3) => {
    var e4;
    if (t3.localName === "relIds" && ((e4 = t3.namespaceURI) != null && e4.endsWith("/diagram"))) for (const t4 of Object.values(c4)) t4.type.endsWith("/diagramDrawing") && a3(t4.target);
    for (const e5 of Array.from(t3.attributes)) if (e5.namespaceURI === Vl) {
      const t4 = c4[e5.value];
      t4 && a3(t4.target);
    }
    for (const e5 of Array.from(t3.children)) u4(e5);
  };
  u4(e3);
}
function _l(t2) {
  var e3;
  return [...((e3 = ql.get(t2)) == null ? void 0 : e3.values()) ?? []];
}
function Zl(t2) {
  ql.delete(t2);
}
var Jl = { mp4: "video/mp4", m4v: "video/mp4", mov: "video/quicktime", webm: "video/webm", ogv: "video/ogg", avi: "video/x-msvideo", wmv: "video/x-ms-wmv", mpg: "video/mpeg", mpeg: "video/mpeg", mp3: "audio/mpeg", m4a: "audio/mp4", wav: "audio/wav", wma: "audio/x-ms-wma", ogg: "audio/ogg", oga: "audio/ogg", aac: "audio/aac", mid: "audio/midi", midi: "audio/midi" };
function Kl(t2) {
  if (!t2) return null;
  const e3 = h3(t2, "off"), n2 = h3(t2, "ext"), r2 = h3(t2, "chOff"), l3 = h3(t2, "chExt");
  return { x: v3(g3(e3, "x")), y: v3(g3(e3, "y")), w: v3(g3(n2, "cx")), h: v3(g3(n2, "cy")), rot: (g3(t2, "rot") ?? 0) / 6e4, flipH: b3(t2, "flipH"), flipV: b3(t2, "flipV"), chX: v3(g3(r2, "x")), chY: v3(g3(r2, "y")), chW: v3(g3(l3, "cx")), chH: v3(g3(l3, "cy")) };
}
var Ql = (t2) => ({ x: t2.x, y: t2.y, w: t2.w, h: t2.h, rot: t2.rot, flipH: t2.flipH, flipV: t2.flipV });
function to(t2) {
  const e3 = h3(t2, "cNvSpPr") ?? h3(t2, "cNvCxnSpPr") ?? h3(t2, "cNvPicPr") ?? h3(t2, "cNvGrpSpPr") ?? h3(t2, "cNvGraphicFramePr"), n2 = h3(e3, "spLocks") ?? h3(e3, "cxnSpLocks") ?? h3(e3, "picLocks") ?? h3(e3, "grpSpLocks") ?? h3(e3, "graphicFrameLocks");
  return b3(n2, "noMove");
}
function eo(t2, e3, n2 = null, r2, l3, o4 = false, s4 = false, i4 = 0, a3) {
  if (!t2.edit) return {};
  const c4 = g3(e3, "id"), u4 = {};
  if (c4 !== null && (u4.origin = { part: t2.partPath, spid: c4 }), n2) {
    const t3 = m3(n2, "idx");
    u4.placeholder = { type: m3(n2, "type") ?? "obj", ...t3 === null ? {} : { idx: t3 } };
  }
  r2 && (u4.geom = r2), a3 && (u4.customGeometry = a3), n2 && i4 && (u4.placeholderDirect = i4), l3 && (u4.editable = l3), o4 && (u4.moveLocked = true), s4 && (u4.readonlyLink = true);
  const d4 = Ul(e3);
  return d4 && (u4.altText = d4), u4.origin || u4.placeholder || u4.placeholderDirect || u4.geom || u4.customGeometry || u4.editable || u4.moveLocked || u4.readonlyLink || u4.altText ? { editInfo: u4 } : {};
}
function no(t2, e3) {
  return e3 ? { ...t2, ctx: { ...t2.ctx, phClr: e3 } } : t2;
}
var ro = ["noFill", "solidFill", "gradFill", "blipFill", "pattFill", "grpFill"];
function lo(t2, e3) {
  let n2 = 0;
  return h3(t2, "xfrm") && (n2 |= It.transform), (h3(t2, "prstGeom") || h3(t2, "custGeom")) && (n2 |= It.geometry), ro.some((e4) => !!h3(t2, e4)) && (n2 |= It.fill), h3(t2, "ln") && (n2 |= It.stroke), (h3(t2, "effectLst") || h3(t2, "effectDag")) && (n2 |= It.effects), e3 && (n2 |= It.style), n2;
}
var oo = /* @__PURE__ */ new Set(["tl", "t", "tr", "l", "ctr", "r", "bl", "b", "br"]);
function so(t2, e3) {
  if (!t2) return null;
  for (const n2 of ro) {
    const r2 = h3(t2, n2);
    if (r2) return io(r2, e3);
  }
  return null;
}
function io(t2, e3) {
  if (!t2) return null;
  switch (t2.localName) {
    case "noFill":
      return { type: "none" };
    case "solidFill":
      return { type: "solid", color: C3(t2, e3.ctx) ?? "rgb(0,0,0)" };
    case "gradFill": {
      const n2 = f3(h3(t2, "gsLst"), "gs").map((t3) => ({ pos: (g3(t3, "pos") ?? 0) / 1e5, color: C3(t3, e3.ctx) ?? "rgb(0,0,0)" })).sort((t3, e4) => t3.pos - e4.pos);
      if (!n2.length) return null;
      if (h3(t2, "path")) return { type: "gradient", angle: 0, stops: n2, radial: true };
      const r2 = h3(t2, "lin");
      return { type: "gradient", angle: r2 ? (g3(r2, "ang") ?? 0) / 6e4 : 90, stops: n2 };
    }
    case "blipFill": {
      const n2 = co(t2, e3);
      if (!n2) return { type: "none" };
      const r2 = h3(t2, "tile"), l3 = g3(h3(h3(t2, "blip"), "alphaModFix"), "amt"), o4 = h3(t2, "srcRect"), s4 = (t3) => (g3(o4, t3) ?? 0) / 1e5, i4 = !!o4 && ["l", "t", "r", "b"].some((t3) => m3(o4, t3) !== null), a3 = ao(t2, e3), c4 = a3 && !/^https?:/i.test(a3) ? e3.pkg.imageMetadata(a3) : null, u4 = g3(t2, "dpi") ?? 0, d4 = c4 ? { sourceWidth: c4.width * 96 / (u4 > 0 ? u4 : c4.dpiX), sourceHeight: c4.height * 96 / (u4 > 0 ? u4 : c4.dpiY) } : {}, f4 = m3(r2, "algn"), p4 = oo.has(f4) ? f4 : "tl";
      return { type: "image", src: n2, alpha: l3 !== null ? l3 / 1e5 : void 0, crop: i4 ? { l: s4("l"), t: s4("t"), r: s4("r"), b: s4("b") } : void 0, tile: r2 ? { sx: (g3(r2, "sx") ?? 1e5) / 1e5, sy: (g3(r2, "sy") ?? 1e5) / 1e5, flip: m3(r2, "flip") ?? "none", tx: v3(g3(r2, "tx") ?? 0), ty: v3(g3(r2, "ty") ?? 0), algn: p4, ...d4 } : void 0 };
    }
    case "pattFill":
      return { type: "pattern", fg: C3(h3(t2, "fgClr"), e3.ctx) ?? "rgb(0,0,0)", bg: C3(h3(t2, "bgClr"), e3.ctx) ?? "rgba(0,0,0,0)", preset: m3(t2, "prst") ?? "pct50" };
    case "grpFill":
      return null;
  }
  return null;
}
function ao(t2, e3) {
  var n2;
  const r2 = h3(t2, "blip"), l3 = f3(h3(r2, "extLst"), "ext").map((t3) => h3(t3, "svgBlip")).find((t3) => t3 !== null) ?? null, o4 = m3(r2, "r:embed") ?? m3(r2, "r:link") ?? m3(l3, "r:embed") ?? m3(l3, "r:link");
  return o4 ? ((n2 = e3.rels[o4]) == null ? void 0 : n2.target) ?? null : null;
}
function co(t2, e3) {
  const n2 = ao(t2, e3);
  return n2 ? /^https?:/i.test(n2) ? n2 : e3.pkg.mediaUrl(n2) : null;
}
function uo(t2) {
  const e3 = h3(t2, "blip");
  if (!e3) return;
  const n2 = [];
  h3(e3, "grayscl") && n2.push("grayscale(1)");
  const r2 = h3(e3, "lum");
  if (r2) {
    const t3 = (g3(r2, "bright") ?? 0) / 1e5, e4 = (g3(r2, "contrast") ?? 0) / 1e5;
    t3 && n2.push(`brightness(${(1 + t3).toFixed(2)})`), e4 && n2.push(`contrast(${(1 + e4).toFixed(2)})`);
  }
  return n2.length ? n2.join(" ") : void 0;
}
var fo = { dash: [4, 3], dashDot: [4, 3, 1, 3], dot: [1, 3], lgDash: [8, 3], lgDashDot: [8, 3, 1, 3], lgDashDotDot: [8, 3, 1, 3, 1, 3], sysDash: [3, 3], sysDashDot: [3, 3, 1, 3], sysDashDotDot: [3, 3, 1, 3, 1, 3], sysDot: [1, 1] };
var ho = { flat: "butt", rnd: "round", sq: "square" };
function po(t2, e3, n2) {
  if (!t2) return n2;
  if (h3(t2, "noFill")) return null;
  const r2 = g3(t2, "w") !== null ? v3(g3(t2, "w")) : (n2 == null ? void 0 : n2.width) ?? 1, l3 = so(t2, e3);
  let o4 = (n2 == null ? void 0 : n2.color) ?? null;
  if ((l3 == null ? void 0 : l3.type) === "solid" ? o4 = l3.color : (l3 == null ? void 0 : l3.type) === "gradient" && l3.stops.length && (o4 = l3.stops[0].color), !o4) return n2 ? { ...n2, width: r2 } : null;
  const s4 = m3(h3(t2, "prstDash"), "val"), i4 = Math.max(r2, 1), a3 = s4 ? s4 === "solid" ? null : (fo[s4] ?? [4, 3]).map((t3) => t3 * i4) : (n2 == null ? void 0 : n2.dash) ?? null, c4 = Ut(h3(t2, "headEnd")) ?? (n2 == null ? void 0 : n2.head), u4 = Ut(h3(t2, "tailEnd")) ?? (n2 == null ? void 0 : n2.tail), d4 = ho[m3(t2, "cap") ?? ""] ?? (n2 == null ? void 0 : n2.cap), f4 = h3(t2, "round") ? "round" : h3(t2, "bevel") ? "bevel" : h3(t2, "miter") ? "miter" : n2 == null ? void 0 : n2.join;
  return { color: o4, width: r2, dash: a3, cap: d4, join: f4, head: c4, tail: u4, compound: m3(t2, "cmpd") ?? (n2 == null ? void 0 : n2.compound) };
}
function mo(t2) {
  return t2 ? [{ def: { rp: { color: t2 } }, lvls: [] }] : [];
}
function go(t2, e3) {
  if (!t2) return { fill: null, stroke: null, fontColor: null, effects: void 0 };
  const n2 = (n3, r3) => {
    const l4 = h3(t2, n3), o5 = Number(m3(l4, "idx") ?? "0");
    if (!l4 || !o5) return { el: null, env: e3 };
    const s4 = C3(l4, e3.ctx);
    return { el: r3[Math.min(o5, r3.length) - 1] ?? null, env: no(e3, s4) };
  }, r2 = n2("fillRef", e3.theme.fillStyles), l3 = n2("lnRef", e3.theme.lnStyles), o4 = n2("effectRef", e3.theme.effectStyles);
  return { fill: r2.el ? io(r2.el, r2.env) : null, stroke: l3.el ? po(l3.el, l3.env, null) : null, fontColor: C3(h3(t2, "fontRef"), e3.ctx), effects: o4.el ? zt(h3(o4.el, "effectLst") ?? o4.el, o4.env.ctx) : void 0 };
}
var bo = null;
var vo = `<p:style><a:lnRef idx="2"><a:schemeClr val="accent1"><a:shade val="50000"/></a:schemeClr></a:lnRef>
<a:fillRef idx="1"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="0"><a:schemeClr val="accent1"/></a:effectRef>
<a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></p:style>`;
var yo = '<p:txBody><a:bodyPr anchor="ctr"/><a:lstStyle/><a:p><a:pPr algn="ctr"/><a:endParaRPr lang="zh-CN"/></a:p></p:txBody>';
function xo() {
  if (bo) return bo;
  const t2 = d3(`<root xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
${vo}
${yo}
</root>`);
  return bo = { style: h3(t2, "style"), text: h3(t2, "txBody") }, bo;
}
function wo(t2) {
  const e3 = xo(), n2 = go(e3.style, t2), r2 = or(e3.text, { ctx: t2.ctx, fonts: t2.theme.fonts, chain: [t2.docDefaults, ...mo(n2.fontColor), Kn(h3(e3.text, "lstStyle"), t2.ctx, t2.theme.fonts)], defaultColor: n2.fontColor, slideNum: t2.slideNum, edit: true }, true);
  if (!r2) throw new Error("\u65E0\u6CD5\u6784\u9020\u65B0\u589E\u5F62\u72B6\u6587\u5B57\u6A21\u677F");
  return { fill: n2.fill, stroke: n2.stroke, effects: n2.effects, textTemplate: r2, styleMarkup: vo, textBodyMarkup: yo };
}
function ko(t2, e3, n2) {
  const r2 = [];
  if (!t2) return r2;
  for (let l3 = t2.firstElementChild; l3; l3 = l3.nextElementSibling) {
    let t3 = null;
    try {
      t3 = Co(l3, e3, n2);
    } catch (n3) {
      t3 = So(l3, n3, e3);
    }
    Array.isArray(t3) ? r2.push(...t3) : t3 && r2.push(t3);
  }
  return r2;
}
function Co(t2, e3, n2) {
  {
    let r2 = null;
    switch (t2.localName) {
      case "sp":
      case "cxnSp": {
        const l3 = t2.localName === "sp" ? "nvSpPr" : "nvCxnSpPr", o4 = p3(t2, l3, "nvPr", "ph");
        if (n2 && o4 || o4 && e3.hiddenPh.has(m3(o4, "type") ?? "")) break;
        r2 = Po(t2, e3);
        break;
      }
      case "pic":
        r2 = Ro(t2, e3);
        break;
      case "grpSp":
        r2 = $o(t2, e3, n2);
        break;
      case "graphicFrame":
        r2 = Eo(t2, e3);
        break;
      case "contentPart":
        r2 = Ao(t2, e3);
        break;
      case "AlternateContent":
        return e3.edit && Yl(e3.pkg, t2, e3.partPath), Xl(t2, (t3) => ko(t3, e3, n2), (t3) => So(t3, "\u4E0D\u652F\u6301\u7684\u517C\u5BB9\u5185\u5BB9", e3), e3.edit, e3.pkg);
    }
    return r2;
  }
}
function So(t2, e3, n2) {
  const r2 = h3(t2, "nvSpPr") ?? h3(t2, "nvPicPr") ?? h3(t2, "nvGrpSpPr") ?? h3(t2, "nvCxnSpPr") ?? h3(t2, "nvGraphicFramePr") ?? h3(t2, "nvContentPartPr"), l3 = Kl(p3(t2, "spPr", "xfrm") ?? p3(t2, "grpSpPr", "xfrm") ?? h3(t2, "xfrm"));
  if (!l3 || l3.w <= 0 || l3.h <= 0) return null;
  const o4 = h3(r2, "cNvPr"), s4 = m3(o4, "name") ?? t2.localName, i4 = e3 instanceof Error ? e3.message : String(e3);
  return { kind: "unsupported", ...Ql(l3), id: g3(o4, "id") ?? void 0, label: `${s4}\uFF08\u89E3\u6790\u5931\u8D25\uFF1A${i4.slice(0, 40)}\uFF09`, ...eo(n2, o4, p3(r2, "nvPr", "ph"), void 0, "frame", to(r2)) };
}
function Po(t2, e3) {
  var n2, l3;
  const o4 = t2.localName === "cxnSp" ? "nvCxnSpPr" : "nvSpPr", s4 = h3(t2, o4), i4 = h3(s4, "cNvPr"), a3 = p3(s4, "nvPr", "ph"), c4 = m3(a3, "type"), u4 = m3(a3, "idx"), d4 = h3(t2, "spPr"), f4 = a3 ? Or(e3.layoutPh, c4, u4) : null, b4 = a3 ? Or(e3.masterPh, c4, u4) : null;
  let v4 = Kl(h3(d4, "xfrm"));
  if (!v4 && a3 && (v4 = Kl(p3(f4, "spPr", "xfrm")) ?? Kl(p3(b4, "spPr", "xfrm"))), !v4) return null;
  const y4 = go(h3(t2, "style"), e3);
  let x4 = d4;
  !h3(d4, "prstGeom") && !h3(d4, "custGeom") && a3 && (x4 = p3(f4, "spPr") ?? p3(b4, "spPr") ?? d4);
  const w4 = h3(x4, "prstGeom"), k3 = h3(x4, "custGeom");
  let C4 = null, S4 = false, P4, N3;
  if (w4) {
    const t3 = m3(w4, "prst") ?? "rect", n3 = rn(h3(w4, "avLst")), l4 = Q(t3, v4.w, v4.h, n3);
    C4 = l4.d, S4 = l4.open, e3.edit && (P4 = { preset: t3, adj: n3 });
  } else if (k3) {
    const t3 = an(k3, v4.w, v4.h);
    t3 && (C4 = t3.d, S4 = t3.open), e3.edit && (N3 = sn(k3, v4.w, v4.h));
  }
  let M4 = so(d4, e3);
  !M4 && a3 && (M4 = so(p3(f4, "spPr"), e3) ?? so(p3(b4, "spPr"), e3)), M4 || (M4 = y4.fill), S4 && (M4 = { type: "none" });
  let F3 = po(h3(d4, "ln"), e3, y4.stroke);
  !h3(d4, "ln") && a3 && (F3 = po(p3(f4, "spPr", "ln") ?? p3(b4, "spPr", "ln"), e3, F3));
  const I4 = zt(h3(d4, "effectLst"), e3.ctx) ?? y4.effects, R4 = e3.edit && !I4 && a3 && !h3(t2, "style") ? zt(p3(f4, "spPr", "effectLst") ?? p3(b4, "spPr", "effectLst"), e3.ctx) ?? void 0 : void 0;
  !C4 && (M4 || F3) && (C4 = Q("rect", v4.w, v4.h, {}).d);
  const A4 = h3(t2, "txBody");
  let $3 = null, E3, T3;
  if (A4) {
    const t3 = [e3.docDefaults];
    if (a3) {
      const n3 = c4 === "title" || c4 === "ctrTitle" ? "title" : !c4 || Lt.body.includes(c4) ? "body" : "other";
      t3.push(e3.masterStyles[n3]), t3.push(Kn(p3(b4, "txBody", "lstStyle"), e3.ctx, e3.theme.fonts)), t3.push(Kn(p3(f4, "txBody", "lstStyle"), e3.ctx, e3.theme.fonts));
    } else t3.push(...mo(y4.fontColor));
    t3.push(Kn(h3(A4, "lstStyle"), e3.ctx, e3.theme.fonts));
    const r2 = { ctx: e3.ctx, fonts: e3.theme.fonts, chain: t3, defaultColor: y4.fontColor, slideNum: e3.slideNum, bodyPrFallbacks: [p3(f4, "txBody", "bodyPr"), p3(b4, "txBody", "bodyPr")], resolveLink: (t4, n3) => Ir(e3, t4, n3), resolveImage: (t4) => {
      var n3;
      const r3 = (n3 = e3.rels[t4]) == null ? void 0 : n3.target;
      return r3 ? e3.pkg.mediaUrl(r3) : null;
    }, edit: e3.edit };
    $3 = or(A4, r2), !$3 && e3.edit && (E3 = or(A4, r2, true) ?? void 0);
    const o5 = $3 ?? E3;
    if (e3.edit && o5) {
      const t4 = cr(o5, r2, e3.layoutCatalog === true), s5 = JSON.stringify(t4);
      T3 = ((n2 = e3.textLevelTemplateCache) == null ? void 0 : n2.get(s5)) ?? t4, (l3 = e3.textLevelTemplateCache) == null || l3.set(s5, T3);
    }
  }
  if (!C4 && !$3 && !E3) return null;
  const L4 = Rr(i4, e3), B4 = eo(e3, i4, a3, P4, void 0, to(s4), L4.unsupported, lo(d4, h3(t2, "style")), N3);
  return B4.editInfo && E3 && (B4.editInfo.textTemplate = E3), B4.editInfo && T3 && (B4.editInfo.textLevelTemplate = T3), B4.editInfo && R4 && (B4.editInfo.placeholderInheritedEffects = R4), { kind: "shape", ...Ql(v4), path: C4, fill: M4, stroke: F3, text: $3, openGeom: S4 || void 0, effects: I4, scene3d: Dt(d4, e3.ctx), link: L4.link, name: m3(i4, "name") ?? void 0, id: g3(i4, "id") ?? void 0, ...B4 };
}
var No = /* @__PURE__ */ new Set(["videoFile", "quickTimeFile"]);
var Mo = /* @__PURE__ */ new Set(["audioFile", "wavAudioFile", "audioCd"]);
var Fo = (t2) => /^[a-z][a-z0-9+.-]*:/i.test(t2);
function Io(t2, e3) {
  if (!t2) return;
  let n2 = null, r2 = null, l3 = null;
  const o4 = t2.getElementsByTagName("*");
  for (let t3 = 0; t3 < o4.length; t3++) {
    const e4 = o4[t3].localName;
    !n2 && Mo.has(e4) ? n2 = o4[t3] : !r2 && No.has(e4) ? r2 = o4[t3] : !l3 && e4 === "media" && (l3 = o4[t3]);
  }
  const s4 = n2 ? "audio" : r2 || l3 ? "video" : null;
  if (!s4) return;
  const i4 = [n2 ?? r2, l3].flatMap((t3) => t3 ? [m3(t3, "r:link"), m3(t3, "r:embed")] : []);
  for (const t3 of i4) {
    const n3 = t3 ? e3.rels[t3] : void 0;
    if (!n3) continue;
    if (n3.external) {
      if (Fo(n3.target)) return { kind: s4, src: n3.target, external: true };
      continue;
    }
    const r3 = n3.target.slice(n3.target.lastIndexOf(".") + 1).toLowerCase(), l4 = Jl[r3] ?? (s4 === "audio" ? "audio/mpeg" : "video/mp4"), o5 = e3.pkg.blobUrl(n3.target, l4);
    if (o5) return { kind: s4, src: o5, mime: l4 };
  }
  return { kind: s4, src: null };
}
function Ro(t2, e3) {
  var n2, l3;
  const o4 = h3(t2, "nvPicPr"), s4 = h3(t2, "spPr"), i4 = p3(o4, "nvPr", "ph");
  let a3 = Kl(h3(s4, "xfrm"));
  if (!a3 && i4) {
    const t3 = m3(i4, "type"), n3 = m3(i4, "idx");
    a3 = Kl(p3(Or(e3.layoutPh, t3, n3), "spPr", "xfrm")) ?? Kl(p3(Or(e3.masterPh, t3, n3), "spPr", "xfrm"));
  }
  if (!a3) return null;
  const c4 = h3(o4, "cNvPr"), u4 = h3(t2, "blipFill"), d4 = co(u4, e3), f4 = m3(c4, "name") ?? "\u56FE\u7247", b4 = Io(h3(o4, "nvPr"), e3);
  b4 && (b4.spid = g3(c4, "id") ?? void 0);
  const v4 = Rr(c4, e3);
  if (!d4 && !b4) return { kind: "unsupported", ...Ql(a3), label: `${f4}\uFF08\u683C\u5F0F\u4E0D\u652F\u6301\uFF09`, link: v4.link, name: m3(c4, "name") ?? void 0, id: g3(c4, "id") ?? void 0, ...eo(e3, c4, i4, void 0, "frame", to(o4), v4.unsupported) };
  const y4 = h3(u4, "srcRect"), x4 = (t3) => (g3(y4, t3) ?? 0) / 1e5, w4 = y4 ? { l: x4("l"), t: x4("t"), r: x4("r"), b: x4("b") } : null;
  let k3 = null;
  const C4 = h3(s4, "prstGeom"), P4 = h3(s4, "custGeom");
  let N3;
  if (C4) {
    const t3 = m3(C4, "prst") ?? "rect", n3 = rn(h3(C4, "avLst"));
    t3 !== "rect" && (k3 = Q(t3, a3.w, a3.h, n3).d), e3.edit && (N3 = { preset: t3, adj: n3 });
  } else if (P4) k3 = ((n2 = an(P4, a3.w, a3.h)) == null ? void 0 : n2.d) ?? null;
  else if (e3.edit && i4) {
    const t3 = m3(i4, "type"), n3 = m3(i4, "idx"), r2 = p3(Or(e3.layoutPh, t3, n3), "spPr", "prstGeom") ?? p3(Or(e3.masterPh, t3, n3), "spPr", "prstGeom");
    r2 && (N3 = { preset: m3(r2, "prst") ?? "rect", adj: rn(h3(r2, "avLst")) });
  }
  const M4 = g3(h3(h3(u4, "blip"), "alphaModFix"), "amt"), F3 = Array.from(((l3 = h3(h3(u4, "blip"), "duotone")) == null ? void 0 : l3.children) ?? []).map((t3) => S3(t3, e3.ctx));
  return { kind: "image", ...Ql(a3), src: d4 ?? "", crop: w4, clipPath: k3, alpha: M4 !== null ? M4 / 1e5 : void 0, filter: uo(u4), ...F3.length === 2 ? { duotone: F3 } : {}, stroke: po(h3(s4, "ln"), e3, null), effects: zt(h3(s4, "effectLst"), e3.ctx), link: v4.link, name: m3(c4, "name") ?? void 0, id: g3(c4, "id") ?? void 0, media: b4, ...eo(e3, c4, i4, N3, b4 ? "frame" : void 0, to(o4), v4.unsupported, lo(s4, null)) };
}
function Ao(t2, e3) {
  var n2;
  const r2 = Kl(h3(t2, "xfrm"));
  if (!r2 || r2.w <= 0 || r2.h <= 0) return null;
  const l3 = m3(t2, "r:id"), o4 = l3 ? (n2 = e3.rels[l3]) == null ? void 0 : n2.target : null, s4 = o4 ? e3.pkg.xml(o4) : null;
  if (!s4) throw new Error("\u7F3A\u5C11 InkML \u5185\u5BB9");
  const i4 = Nt(s4, r2.w, r2.h);
  if (!i4.length) throw new Error("InkML \u6CA1\u6709\u53EF\u7528\u7B14\u8FF9");
  const a3 = p3(t2, "nvContentPartPr", "cNvPr"), c4 = eo(e3, a3, null, void 0, "frame");
  return e3.edit && (Yl(e3.pkg, t2, e3.partPath), c4.editInfo = { ...c4.editInfo, requiresOriginal: true }), { kind: "group", ...Ql(r2), childX: 0, childY: 0, scaleX: 1, scaleY: 1, children: i4, name: m3(a3, "name") ?? "\u58A8\u8FF9", id: g3(a3, "id") ?? void 0, ...c4 };
}
function $o(t2, e3, n2) {
  const r2 = h3(t2, "nvGrpSpPr"), l3 = h3(t2, "grpSpPr"), o4 = Kl(h3(l3, "xfrm"));
  if (!o4) return null;
  const s4 = ko(t2, e3, n2);
  if (!s4.length) return null;
  const i4 = h3(r2, "cNvPr"), a3 = Rr(i4, e3);
  return { kind: "group", ...Ql(o4), childX: o4.chX, childY: o4.chY, scaleX: o4.chW ? o4.w / o4.chW : 1, scaleY: o4.chH ? o4.h / o4.chH : 1, children: s4, effects: zt(h3(l3, "effectLst"), e3.ctx), link: a3.link, name: m3(i4, "name") ?? void 0, id: g3(i4, "id") ?? void 0, ...eo(e3, i4, null, void 0, void 0, to(r2), a3.unsupported) };
}
function Eo(t2, e3) {
  const n2 = h3(t2, "nvGraphicFramePr"), r2 = Kl(h3(t2, "xfrm"));
  if (!r2) return null;
  const l3 = p3(t2, "graphic", "graphicData"), o4 = m3(l3, "uri") ?? "", s4 = h3(n2, "cNvPr"), i4 = p3(n2, "nvPr", "ph"), a3 = m3(s4, "name") ?? void 0, c4 = g3(s4, "id") ?? void 0, u4 = eo(e3, s4, i4, void 0, void 0, to(n2)), d4 = eo(e3, s4, i4, void 0, "frame", to(n2)), f4 = h3(l3, "tbl");
  if (f4) {
    const t3 = Al(f4, Ql(r2), e3, jo, a3), n3 = e3.edit ? { ...t3.editInfo, ...u4.editInfo } : void 0;
    return { ...t3, id: c4, ...u4, ...n3 ? { editInfo: n3 } : {} };
  }
  if (e3.edit && (Yl(e3.pkg, t2, e3.partPath), d4.editInfo = { ...d4.editInfo, requiresOriginal: true }), o4.endsWith("/chart") || o4 === "http://schemas.microsoft.com/office/drawing/2014/chartex") {
    const t3 = Lo(l3, r2, e3, o4.endsWith("/chartex"));
    return t3 ? { ...t3, id: c4, ...d4 } : { kind: "unsupported", ...Ql(r2), label: "\u56FE\u8868", name: a3, id: c4, ...d4 };
  }
  if (o4.endsWith("/diagram")) {
    const t3 = Bo(l3, r2, e3);
    return t3 ? { ...t3, id: c4, ...d4 } : { kind: "unsupported", ...Ql(r2), label: "SmartArt", name: a3, id: c4, ...d4 };
  }
  if (o4.endsWith("/ole") || o4.includes("oleObject")) {
    const t3 = h3(l3, "oleObj");
    if (t3) {
      const n3 = h3(t3, "pic");
      if (n3) {
        const t4 = Ro(n3, e3);
        if (t4 && t4.kind === "image" && t4.src) return { ...t4, ...Ql(r2), name: a3 ?? t4.name, id: c4, ...d4 };
      }
      const l4 = To(t3, e3);
      if (l4) return { kind: "image", ...Ql(r2), src: l4, crop: null, name: a3, id: c4, ...d4 };
    }
    return { kind: "unsupported", ...Ql(r2), label: "OLE \u5BF9\u8C61", name: a3, id: c4, ...d4 };
  }
  const b4 = o4.includes("/media") || o4.includes("video") ? "\u5A92\u4F53\u5BF9\u8C61" : "\u4E0D\u652F\u6301\u7684\u5BF9\u8C61";
  return { kind: "unsupported", ...Ql(r2), label: b4, name: a3, id: c4, ...d4 };
}
function To(t2, e3) {
  var n2;
  const r2 = m3(t2, "spid");
  if (!r2) return null;
  const l3 = Br(e3.rels, "/vmlDrawing");
  if (!l3) return null;
  const o4 = e3.pkg.xml(l3);
  if (!o4) return null;
  for (const t3 of o4.getElementsByTagName("*")) if (!(t3.localName !== "shape" || m3(t3, "id") !== r2)) for (const r3 of t3.getElementsByTagName("*")) {
    if (r3.localName !== "imagedata") continue;
    const t4 = m3(r3, "o:relid") ?? m3(r3, "r:id"), o5 = t4 ? (n2 = e3.pkg.rels(l3)[t4]) == null ? void 0 : n2.target : null;
    return o5 ? e3.pkg.mediaUrl(o5) : null;
  }
  return null;
}
function Lo(t2, e3, n2, r2 = false) {
  var l3;
  if (!t2) return null;
  const o4 = dt(r2, n2.pkg), s4 = m3(h3(t2, "chart"), "r:id"), i4 = s4 ? (l3 = n2.rels[s4]) == null ? void 0 : l3.target : null;
  if (!o4 || !i4) return null;
  const a3 = n2.pkg.xml(i4);
  if (!a3) return null;
  let c4;
  try {
    c4 = o4(a3, e3.w, e3.h, { ctx: n2.ctx, fonts: n2.theme.fonts, rels: n2.pkg.rels(i4), ...r2 ? { readPart: (t3) => {
      var e4;
      return (e4 = n2.pkg.files) == null ? void 0 : e4[t3];
    } } : {} });
  } catch {
    return null;
  }
  return c4.length ? { kind: "group", ...Ql(e3), childX: 0, childY: 0, scaleX: 1, scaleY: 1, children: c4, name: "\u56FE\u8868" } : null;
}
function Bo(t2, e3, n2) {
  var r2;
  if (!t2) return null;
  const l3 = h3(t2, "relIds");
  let o4 = null;
  const s4 = m3(l3, "r:dm"), i4 = s4 ? (r2 = n2.rels[s4]) == null ? void 0 : r2.target : null;
  if (i4) {
    const t3 = n2.pkg.xml(i4), e4 = t3 == null ? void 0 : t3.getElementsByTagName("*");
    for (let t4 = 0; e4 && t4 < e4.length; t4++) if (e4[t4].localName === "dataModelExt") {
      const r3 = m3(e4[t4], "relId");
      r3 && n2.rels[r3] && (o4 = n2.rels[r3].target);
      break;
    }
  }
  if (o4 || (o4 = Br(n2.rels, "/diagramDrawing")), !o4) return zo(l3, e3, n2);
  const a3 = n2.pkg.xml(o4), c4 = h3(a3, "spTree");
  if (!c4) return zo(l3, e3, n2);
  const u4 = { ...n2, rels: n2.pkg.rels(o4), partPath: o4, layoutPh: [], masterPh: [] }, d4 = ko(c4, u4, false);
  return d4.length ? { kind: "group", ...Ql(e3), childX: 0, childY: 0, scaleX: 1, scaleY: 1, children: d4, name: "SmartArt" } : zo(l3, e3, n2);
}
function zo(t2, e3, n2) {
  const r2 = (e4) => {
    var r3;
    const l4 = m3(t2, e4), o5 = l4 ? (r3 = n2.rels[l4]) == null ? void 0 : r3.target : null;
    return o5 ? n2.pkg.xml(o5) : null;
  }, l3 = r2("r:dm"), o4 = fr(l3);
  if (!o4.length) return null;
  const s4 = r2("r:lo"), i4 = r2("r:cs"), a3 = pr(i4), c4 = (a3.length ? a3 : ["accent1", "accent2", "accent3", "accent4", "accent5", "accent6"]).map((t3) => /^[0-9a-fA-F]{6}$/.test(t3) ? `#${t3}` : `#${n2.ctx.theme[n2.ctx.clrMap[t3] ?? t3] ?? "4472C4"}`), u4 = { ctx: n2.ctx, fonts: n2.theme.fonts, chain: [n2.docDefaults, n2.masterStyles.other], defaultColor: "rgb(255,255,255)", slideNum: n2.slideNum }, d4 = Cr(o4, e3.w, e3.h, { family: ur(s4), vertical: dr(s4), colors: c4, textOf: (t3) => {
    const e4 = or(hr(l3, t3), u4);
    return e4 ? { ...e4, anchor: "middle", paragraphs: e4.paragraphs.map((t4) => ({ ...t4, align: "center" })) } : null;
  } });
  return d4.length ? Sr(d4, { ...Ql(e3), name: "SmartArt" }) : null;
}
var jo = { fill: so, line: po };
function Oo(t2) {
  if (!t2) return "";
  const e3 = [], n2 = t2.getElementsByTagName("*");
  for (let t3 = 0; t3 < n2.length; t3++) n2[t3].localName === "t" ? e3.push(n2[t3].textContent ?? "") : n2[t3].localName === "p" && e3.length && e3.push(`
`);
  return e3.join("").replace(/\n+/g, `
`).trim();
}
function Uo(t2) {
  const e3 = p3(t2, "cSld", "spTree");
  for (const t3 of f3(e3, "sp")) {
    const e4 = p3(h3(t3, "nvSpPr"), "nvPr", "ph");
    if (m3(e4, "type") !== "body") continue;
    const n2 = h3(t3, "txBody");
    return f3(n2, "p").map((t4) => {
      const e5 = [], n3 = t4.getElementsByTagName("*");
      for (let t5 = 0; t5 < n3.length; t5++) {
        const r2 = n3[t5];
        r2.localName === "t" ? e5.push(r2.textContent ?? "") : r2.localName === "br" ? e5.push(`
`) : r2.localName === "tab" && m3(r2, "pos") === null && e5.push("	");
      }
      return e5.join("");
    }).join(`
`);
  }
  return "";
}
function Do(t2, e3) {
  const n2 = /* @__PURE__ */ new Map();
  for (const r2 of Object.values(e3)) {
    if (!/\/(commentAuthors|authors)$/.test(r2.type)) continue;
    const e4 = t2.xml(r2.target);
    if (!e4) continue;
    const l3 = e4.getElementsByTagName("*");
    for (let t3 = 0; t3 < l3.length; t3++) {
      const e5 = l3[t3];
      if (e5.localName !== "cmAuthor" && e5.localName !== "author") continue;
      const r3 = m3(e5, "id"), o4 = m3(e5, "name");
      r3 === null || !o4 || n2.set(r3, { name: o4, initials: m3(e5, "initials") || void 0 });
    }
  }
  return n2;
}
function Ho(t2, e3, n2) {
  const r2 = [];
  for (const l3 of Object.values(e3)) {
    if (!l3.type.endsWith("/comments")) continue;
    const e4 = t2.xml(l3.target);
    if (e4) for (const t3 of f3(e4, "cm")) {
      const e5 = m3(t3, "authorId") ?? "", l4 = n2.get(e5), o4 = h3(t3, "pos"), s4 = h3(t3, "text"), i4 = (s4 == null ? void 0 : s4.textContent) ?? Oo(h3(t3, "txBody")).trim(), a3 = g3(t3, "idx"), c4 = Array.from(t3.getElementsByTagName("*")).find((t4) => t4.localName === "parentCm" && t4.namespaceURI === "http://schemas.microsoft.com/office/powerpoint/2012/main");
      r2.push({ id: m3(t3, "id") ?? `${e5}:${a3 ?? r2.length}`, ...c4 ? { parentId: `${m3(c4, "authorId") ?? ""}:${g3(c4, "idx")}` } : {}, author: (l4 == null ? void 0 : l4.name) ?? (e5 ? `\u4F5C\u8005 ${e5}` : "\u672A\u77E5\u4F5C\u8005"), initials: l4 == null ? void 0 : l4.initials, date: m3(t3, "dt") ?? m3(t3, "created") ?? void 0, text: i4, x: v3(g3(o4, "x")), y: v3(g3(o4, "y")), idx: a3 !== null ? a3 : void 0 });
    }
  }
  return r2.sort((t3, e4) => (t3.idx ?? 0) - (e4.idx ?? 0)), r2;
}
function Wo(t2, e3, n2, r2, l3 = true) {
  var o4;
  const s4 = [];
  for (const i4 of f3(h3(e3, "embeddedFontLst"), "embeddedFont")) {
    const e4 = m3(h3(i4, "font"), "typeface");
    if (e4) for (const [a3, c4, u4] of [["regular", false, false], ["bold", true, false], ["italic", false, true], ["boldItalic", true, true]]) {
      const d4 = m3(h3(i4, a3), "r:id"), f4 = d4 ? (o4 = n2[d4]) == null ? void 0 : o4.target : null, p4 = l3 && f4 ? t2.fontUrl(f4) : null;
      p4 && s4.push({ family: e4, src: p4, bold: c4, italic: u4 });
      const g4 = r2 && f4 ? t2.fontSourceUrl(f4) : null;
      g4 && r2.push({ family: e4, src: g4, bold: c4, italic: u4 });
    }
  }
  return s4;
}
function Xo(t2, e3 = {}) {
  const n2 = new al(t2, e3.keepPackage === true, e3.zip);
  return e3.assets === "defer" && (n2.assetMode = "defer"), Vo(n2, e3);
}
function Vo(t2, e3) {
  var n2;
  const r2 = "ppt/presentation.xml", l3 = t2.xml(r2);
  if (!l3) throw new Error("\u65E0\u6548\u7684 .pptx\uFF1A\u627E\u4E0D\u5230 ppt/presentation.xml");
  const o4 = t2.rels(r2), s4 = h3(l3, "sldSz"), i4 = v3(g3(s4, "cx") ?? 12192e3), a3 = v3(g3(s4, "cy") ?? 6858e3), c4 = Br(o4, "/tableStyles"), u4 = c4 ? t2.xml(c4) : null, d4 = /* @__PURE__ */ new Map(), p4 = f3(h3(l3, "sldIdLst"), "sldId"), b4 = {}, y4 = /* @__PURE__ */ new Map();
  p4.forEach((t3, e4) => {
    var n3;
    const r3 = m3(t3, "r:id"), l4 = r3 ? (n3 = o4[r3]) == null ? void 0 : n3.target : null;
    l4 && (b4[l4] = e4 + 1);
    const s5 = g3(t3, "id");
    s5 !== null && y4.set(s5, e4);
  });
  const x4 = Do(t2, o4), w4 = [];
  for (const t3 of p4) {
    const e4 = m3(t3, "r:id"), r3 = e4 ? (n2 = o4[e4]) == null ? void 0 : n2.target : null;
    r3 && w4.push(r3);
  }
  const k3 = (t3, n3) => ({ background: { type: "solid", color: "rgb(255,255,255)" }, elements: [{ kind: "unsupported", x: i4 * 0.1, y: a3 * 0.4, w: i4 * 0.8, h: a3 * 0.2, rot: 0, flipH: false, flipV: false, label: `\u7B2C ${t3 + 1} \u9875\u89E3\u6790\u5931\u8D25\uFF1A${n3 instanceof Error ? n3.message : String(n3)}` }], ...e3.edit ? { editInfo: { origin: { part: w4[t3] } } } : {} }), C4 = (n3) => {
    try {
      return Jo(t2, w4[n3], n3 + 1, l3, u4, b4, x4, e3.edit === true, void 0, d4);
    } catch (t3) {
      return k3(n3, t3);
    }
  };
  let S4;
  e3.lazy === false ? S4 = w4.map((t3, e4) => C4(e4)) : (S4 = new Array(w4.length), w4.forEach((t3, e4) => {
    let n3;
    Object.defineProperty(S4, e4, { enumerable: true, configurable: true, get() {
      return n3 === void 0 && (n3 = C4(e4)), n3;
    }, set(t4) {
      n3 = t4;
    } });
  }));
  const P4 = Dl(l3, y4), N3 = e3.edit ? Lr(l3, o4, (e4) => t2.xml(e4), (e4) => t2.rels(e4)) : void 0, M4 = N3 ? Zo(t2, l3, o4, u4, b4, N3.themeByMaster) : void 0, F3 = N3 ? Yo(t2, l3, o4, u4, b4, N3.themeByMaster) : void 0, I4 = t2.opcPackage, R4 = e3.edit || e3.embeddedFonts === "source" ? [] : void 0, A4 = Wo(t2, l3, o4, R4, e3.embeddedFonts !== "source");
  return { width: i4, height: a3, slides: S4, source: "pptx", dispose: () => {
    Zl(t2), t2.dispose();
  }, ...I4 ? { package: I4 } : {}, embeddedFonts: A4, ...R4 != null && R4.length ? { embeddedFontSources: R4 } : {}, sections: P4.length ? P4 : void 0, ...M4 && F3 ? { editInfo: { layouts: M4, masters: F3, themes: N3.themes, get assets() {
    return _l(t2);
  }, ...c4 ? { tableStylesPart: c4 } : {} } } : {} };
}
function qo(t2, e3) {
  return cr({ anchor: "top", insets: [0, 0, 0, 0], wrap: true, fontScale: 1, paragraphs: [] }, { ctx: t2.ctx, fonts: t2.theme.fonts, chain: [t2.docDefaults, t2.masterStyles[e3]], slideNum: 1, edit: true });
}
function Yo(t2, e3, n2, r2, l3, o4) {
  return Mr(e3, n2, (e4) => t2.xml(e4), (e4) => t2.rels(e4)).flatMap(({ part: n3, layoutIds: s4 }) => {
    const i4 = Dr(t2, n3, e3, r2, l3, 1, true);
    if (!i4.masterRoot || i4.masterPath !== n3) return [];
    const a3 = i4.envFor(n3, false);
    return [{ id: n3, name: m3(p3(i4.masterRoot, "cSld"), "name") ?? n3, ...o4[n3] ? { themeId: o4[n3] } : {}, layoutIds: [...s4], background: _o(i4.masterRoot, n3, i4), elements: ko(i4.masterTree, a3, false), textStyles: { title: qo(a3, "title"), body: qo(a3, "body"), other: qo(a3, "other") }, defaultShape: wo(a3), defaultTable: Ol(a3, jo), tableStyles: Il(r2, a3, jo) }];
  });
}
function _o(t2, e3, n2) {
  const { layoutRoot: r2, layoutPath: l3, masterRoot: o4, masterPath: s4, envFor: i4 } = n2;
  for (const [n3, a3] of [[t2, e3], [r2, l3], [o4, s4]]) {
    const t3 = p3(n3, "cSld", "bg");
    if (!t3 || !a3) continue;
    const e4 = i4(a3, false), r3 = h3(t3, "bgPr");
    if (r3) {
      const t4 = so(r3, e4);
      if (t4) return t4;
      continue;
    }
    const l4 = h3(t3, "bgRef");
    if (!l4) continue;
    const o5 = Number(m3(l4, "idx") ?? "0"), s5 = C3(l4, e4.ctx), c4 = o5 > 1e3 ? e4.theme.bgFillStyles : e4.theme.fillStyles, u4 = o5 > 1e3 ? o5 - 1e3 : o5, d4 = u4 > 0 ? c4[Math.min(u4, c4.length) - 1] ?? null : null, f4 = d4 ? io(d4, no(e4, s5)) : s5 ? { type: "solid", color: s5 } : null;
    if (f4) return f4;
  }
  return null;
}
function Zo(t2, e3, n2, r2, l3, o4) {
  return Nr(e3, n2, (e4) => t2.xml(e4), (e4) => t2.rels(e4)).flatMap((n3) => {
    const s4 = Ur(t2, null, n3, e3, r2, l3, 1, true);
    if (!s4.layoutRoot || !s4.masterPath) return [];
    const i4 = [];
    b3(s4.layoutRoot, "showMasterSp", true) && i4.push(...ko(s4.masterTree, s4.envFor(s4.masterPath, false), true)), i4.push(...ko(s4.layoutTree, s4.envFor(n3, false), true));
    const a3 = ko(s4.layoutTree, { ...s4.envFor(n3, true), layoutCatalog: true }, false).flatMap((t3) => {
      const e4 = Fr(t3);
      return e4 ? [e4] : [];
    }), c4 = s4.envFor(n3, true);
    return [{ id: n3, name: m3(p3(s4.layoutRoot, "cSld"), "name") ?? n3, origin: { part: n3, masterPart: s4.masterPath }, themeId: o4[s4.masterPath], background: _o(null, null, s4), ...p3(s4.layoutRoot, "cSld", "bg") ? { directBackground: true } : {}, showMasterShapes: b3(s4.layoutRoot, "showMasterSp", true), elements: [...i4, ...a3], transition: $e(s4.layoutRoot) ?? void 0, defaultShape: wo(c4), defaultTable: Ol(c4, jo), tableStyles: Il(r2, c4, jo) }];
  });
}
function Jo(t2, e3, n2, r2, l3, o4, s4, i4, a3, c4) {
  const u4 = t2.xml(e3), d4 = t2.rels(e3), f4 = a3 ?? Br(d4, "/slideLayout"), y4 = Ur(t2, u4, f4, r2, l3, o4, n2, i4, c4), { layoutRoot: x4, masterPath: w4, masterTree: k3, layoutTree: C4, envFor: S4 } = y4, P4 = p3(u4, "cSld", "spTree"), N3 = [];
  b3(u4, "showMasterSp", true) && b3(x4, "showMasterSp", true) && w4 && N3.push(...ko(k3, S4(w4, false), true)), N3.push(...ko(C4, S4(f4, false), true)), N3.push(...ko(P4, S4(e3, true), false));
  const M4 = _o(u4, e3, y4), F3 = h3(r2, "sldSz"), I4 = v3(g3(F3, "cx") ?? 12192e3), R4 = v3(g3(F3, "cy") ?? 6858e3), A4 = Object.entries(d4).find(([, t3]) => t3.type.endsWith("/notesSlide")), $3 = (A4 == null ? void 0 : A4[1].target) ?? null, E3 = $3 ? Uo(t2.xml($3)) : "", T3 = Ho(t2, d4, s4), L4 = $e(u4), B4 = _e(u4, I4, R4);
  for (const t3 of B4.media ?? []) {
    const e4 = N3.find((e5) => {
      var n3;
      return e5.kind === "image" && ((n3 = e5.media) == null ? void 0 : n3.spid) === t3.spid;
    });
    e4 && e4.kind === "image" && e4.media && (e4.media.playback = { volume: t3.volume, loop: t3.loop, clickGroup: t3.clickGroup });
  }
  const z3 = i4 ? S4(e3, true) : null;
  return { background: M4, elements: N3, notes: E3 || void 0, comments: T3.length ? T3 : void 0, hidden: m3(u4, "show") === "0" || void 0, layoutName: m3(p3(x4, "cSld"), "name") ?? void 0, transition: L4 ?? $e(x4), animations: B4.animations, ...i4 ? { editInfo: { origin: { part: e3 }, ...f4 ? { layoutId: f4 } : {}, ...$3 && A4 ? { notes: { part: $3, relationshipId: A4[0] } } : {}, ...p3(u4, "cSld", "bg") ? { directBackground: true } : {}, ...L4 ? { directTransition: true } : {}, ...B4.readonly ? { animationSourceReadonly: true } : {}, ...b3(u4, "showMasterSp", true) ? {} : { hideMasterShapes: true }, defaultShape: wo(z3), defaultTable: Ol(z3, jo), tableStyles: Il(l3, z3, jo) } } : {} };
}

// .ppt-build/node_modules/@web-ppt/core/dist/core.js
var it2 = (t2) => t2 * 96 / 72;
var at3 = (t2) => {
  if (!Number.isFinite(t2)) return "0";
  const e3 = Math.round(t2 * 100) / 100;
  return Object.is(e3, -0) ? "0" : String(e3);
};
var lt3 = (t2, e3, n2) => t2 < e3 ? e3 : t2 > n2 ? n2 : t2;
var ct3 = (t2, e3 = 0) => Number.isFinite(t2) ? t2 : e3;
function ut2(t2, e3, n2, r2, s4, o4, i4) {
  return { kind: "shape", x: ct3(t2), y: ct3(e3), w: Math.max(ct3(n2), 0), h: Math.max(ct3(r2), 0), rot: 0, flipH: false, flipV: false, path: s4, fill: o4, stroke: i4, text: null };
}
var ht2 = (t2, e3) => `M 0 0 L ${at3(t2)} 0 L ${at3(t2)} ${at3(e3)} L 0 ${at3(e3)} Z`;
function ft3(t2, e3, n2) {
  return ut2(t2.x, t2.y, t2.w, t2.h, ht2(t2.w, t2.h), e3, n2);
}
function dt2(t2, e3, n2, r2, s4) {
  if (!s4 || ![t2, e3, n2, r2].every(Number.isFinite)) return null;
  const o4 = Math.min(t2, n2), i4 = Math.min(e3, r2);
  return ut2(o4, i4, Math.abs(n2 - t2), Math.abs(r2 - e3), `M ${at3(t2 - o4)} ${at3(e3 - i4)} L ${at3(n2 - o4)} ${at3(r2 - i4)}`, null, s4);
}
function pt(t2, e3, n2, r2) {
  const s4 = t2.map((t3) => t3.filter(([t4, e4]) => Number.isFinite(t4) && Number.isFinite(e4))).filter((t3) => t3.length >= 3);
  if (!s4.length) return null;
  let o4 = 1 / 0, i4 = 1 / 0, a3 = -1 / 0, l3 = -1 / 0;
  for (const t3 of s4) for (const [e4, n3] of t3) o4 = Math.min(o4, e4), i4 = Math.min(i4, n3), a3 = Math.max(a3, e4), l3 = Math.max(l3, n3);
  const c4 = s4.map((t3) => "M " + t3.map(([t4, e4]) => `${at3(t4 - o4)} ${at3(e4 - i4)}`).join(" L ") + " Z").join(" ");
  return ut2(o4, i4, a3 - o4, l3 - i4, c4, e3, n2);
}
var gt2 = (t2, e3 = 0.25) => vt3(t2, "#ffffff", e3);
var mt2 = (t2, e3 = 0.2) => vt3(t2, "#000000", e3);
function xt2(t2, e3, n2) {
  return pt([t2], e3, n2);
}
function bt2(t2, e3, n2, r2, s4, o4 = {}) {
  const i4 = { text: s4, b: o4.bold ?? false, i: false, u: false, strike: false, size: o4.size ?? it2(10), color: o4.color ?? "rgb(0,0,0)", fonts: o4.fonts ?? [] }, a3 = { align: o4.align ?? "center", lvl: 0, marL: 0, indent: 0, bullet: null, lineHeight: 1.15, spaceBefore: 0, spaceAfter: 0, runs: [i4] }, l3 = { anchor: o4.anchor ?? "middle", insets: [0, 0, 0, 0], wrap: false, fontScale: 1, paragraphs: [a3] };
  return { kind: "shape", x: ct3(t2), y: ct3(e3), w: Math.max(ct3(n2), 0), h: Math.max(ct3(r2), 0), rot: o4.rot ?? 0, flipH: false, flipV: false, path: null, fill: null, stroke: null, text: l3 };
}
function wt2(t2, e3) {
  let n2 = 0;
  for (const e4 of t2) {
    const t3 = e4.codePointAt(0) ?? 32;
    t3 >= 4352 && t3 <= 8191 || t3 >= 11904 && t3 <= 42191 || t3 >= 44032 && t3 <= 55203 || t3 >= 63744 && t3 <= 64255 || t3 >= 65072 && t3 <= 65376 ? n2 += 1 : `iljtf.,:;'"|!I[]()`.includes(e4) ? n2 += 0.3 : "mwMW@%".includes(e4) ? n2 += 0.85 : e4 >= "A" && e4 <= "Z" ? n2 += 0.66 : n2 += 0.53;
  }
  return n2 * e3;
}
var yt2 = (t2) => ({ type: "solid", color: t2 });
function $t(t2, e3) {
  const n2 = t2.clrMap[e3] ?? e3, r2 = (t2.theme[n2] ?? t2.theme[e3] ?? "000000").replace(/^#/, "");
  return "#" + (r2.length >= 6 ? r2.slice(0, 6) : r2.padStart(6, "0"));
}
function Mt2(t2) {
  const e3 = t2.trim();
  if (e3.startsWith("#")) {
    const t3 = e3.slice(1), n3 = t3.length === 3 ? t3.split("").map((t4) => t4 + t4).join("") : t3.padStart(6, "0");
    return [parseInt(n3.slice(0, 2), 16) || 0, parseInt(n3.slice(2, 4), 16) || 0, parseInt(n3.slice(4, 6), 16) || 0];
  }
  const n2 = e3.match(/-?[\d.]+/g);
  return n2 && n2.length >= 3 ? [Number(n2[0]) || 0, Number(n2[1]) || 0, Number(n2[2]) || 0] : [0, 0, 0];
}
function vt3(t2, e3, n2) {
  const r2 = Mt2(t2), s4 = Mt2(e3), o4 = lt3(n2, 0, 1), i4 = r2.map((t3, e4) => Math.round(t3 + (s4[e4] - t3) * o4));
  return `rgb(${i4[0]},${i4[1]},${i4[2]})`;
}
function kt2(t2, e3) {
  const n2 = (e3 % 6 + 6) % 6, r2 = $t(t2, `accent${n2 + 1}`), s4 = Math.floor(e3 / 6);
  return s4 <= 0 ? r2 : s4 % 2 === 1 ? vt3(r2, "#ffffff", lt3(0.3 * Math.ceil(s4 / 2), 0, 0.72)) : vt3(r2, "#000000", lt3(0.22 * (s4 / 2), 0, 0.6));
}
function Et(r2, s4) {
  if (!r2) return null;
  if (h3(r2, "noFill")) return { type: "none" };
  const i4 = h3(r2, "solidFill");
  if (i4) return yt2(C3(i4, s4) ?? "rgb(0,0,0)");
  const a3 = h3(r2, "gradFill");
  if (a3) {
    const r3 = f3(h3(a3, "gsLst"), "gs").map((t2) => ({ pos: (g3(t2, "pos") ?? 0) / 1e5, color: C3(t2, s4) ?? "rgb(0,0,0)" })).sort((t2, e3) => t2.pos - e3.pos);
    if (!r3.length) return null;
    const i5 = h3(a3, "lin");
    return { type: "gradient", angle: i5 ? (g3(i5, "ang") ?? 0) / 6e4 : 90, stops: r3 };
  }
  const l3 = h3(r2, "pattFill");
  if (l3) {
    const n2 = C3(h3(l3, "fgClr"), s4);
    if (n2) return yt2(n2);
  }
  return null;
}
var Tt = { dash: [4, 3], dashDot: [4, 3, 1, 3], dot: [1, 3], lgDash: [8, 3], lgDashDot: [8, 3, 1, 3], lgDashDotDot: [8, 3, 1, 3, 1, 3], sysDash: [3, 3], sysDashDot: [3, 3, 1, 3], sysDashDotDot: [3, 3, 1, 3, 1, 3], sysDot: [1, 1] };
var Ct2 = { color: null, width: null, dash: null, none: false, present: false };
function St2(o4, i4) {
  if (!o4) return { ...Ct2 };
  const a3 = { color: null, width: null, dash: null, none: false, present: true };
  if (h3(o4, "noFill")) return a3.none = true, a3;
  a3.color = C3(h3(o4, "solidFill"), i4);
  const l3 = g3(o4, "w");
  l3 !== null && (a3.width = v3(l3));
  const c4 = m3(h3(o4, "prstDash"), "val");
  return c4 && c4 !== "solid" && (a3.dash = (Tt[c4] ?? [4, 3]).map((t2) => t2 * Math.max(a3.width ?? 1, 1))), a3;
}
function Lt2(t2, e3, n2) {
  const r2 = t2 ?? Ct2;
  if (r2.none) return null;
  const s4 = r2.color ?? e3;
  if (!s4) return null;
  const o4 = r2.width ?? n2;
  return o4 > 0 ? { color: s4, width: o4, dash: r2.dash } : null;
}
function At2(t2) {
  const e3 = [];
  let n2 = "", r2 = false;
  for (let s4 = 0; s4 < t2.length; s4++) {
    const o4 = t2[s4];
    if (o4 === '"') {
      r2 = !r2, n2 += o4;
      continue;
    }
    if (o4 === "\\") {
      n2 += o4 + (t2[s4 + 1] ?? ""), s4++;
      continue;
    }
    if (o4 === ";" && !r2) {
      e3.push(n2), n2 = "";
      continue;
    }
    n2 += o4;
  }
  return e3.push(n2), e3;
}
var Pt2 = (t2) => t2.replace(/\\(.)/g, "$1").replace(/"/g, "").replace(/[*_](.)/g, "").replace(/@/g, "");
function It2(t2) {
  if (Number.isInteger(t2)) return String(t2);
  const e3 = Math.abs(t2);
  return e3 !== 0 && (e3 >= 1e11 || e3 < 1e-4) ? t2.toExponential(2) : String(Math.round(t2 * 1e6) / 1e6);
}
function Ot2(t2) {
  return t2.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function zt2(t2, e3) {
  const n2 = e3.replace(/\[[^\]]*\]/g, "");
  let r2 = t2;
  const s4 = r2 < 0;
  r2 = Math.abs(r2);
  const o4 = (n2.match(/%/g) ?? []).length;
  o4 && (r2 *= Math.pow(100, o4));
  const i4 = n2.match(/[#0?][#0?,]*(\.[#0?]+)?/);
  if (!i4) return (s4 ? "-" : "") + Pt2(n2);
  const a3 = i4[0], l3 = i4.index ?? 0, c4 = Pt2(n2.slice(0, l3)), u4 = Pt2(n2.slice(l3 + a3.length)), h4 = a3.indexOf(".");
  let f4 = h4 < 0 ? a3 : a3.slice(0, h4);
  const d4 = h4 < 0 ? "" : a3.slice(h4 + 1), p4 = f4.match(/,+$/);
  p4 && (r2 /= Math.pow(1e3, p4[0].length), f4 = f4.slice(0, -p4[0].length));
  const g4 = f4.includes(","), m4 = d4.length, x4 = (d4.match(/0/g) ?? []).length;
  let b4 = r2.toFixed(Math.min(m4, 20));
  m4 > x4 && (b4 = b4.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, ""), (b4.split(".")[1] ?? "").length < x4 && (b4 = r2.toFixed(x4)));
  let [w4, y4] = b4.split(".");
  const $3 = (f4.match(/0/g) ?? []).length;
  return w4.length < $3 && (w4 = w4.padStart($3, "0")), $3 === 0 && w4 === "0" && y4 && (w4 = ""), g4 && (w4 = Ot2(w4)), (s4 ? "-" : "") + c4 + w4 + (y4 ? "." + y4 : "") + u4;
}
function Rt2(t2, e3) {
  if (!Number.isFinite(t2)) return "";
  const n2 = (e3 ?? "").trim();
  if (!n2 || /^general$/i.test(n2)) return It2(t2);
  if (/e[+-]/i.test(n2)) return t2.toExponential(2);
  const r2 = At2(n2);
  return t2 < 0 && r2.length > 1 && r2[1].trim() ? zt2(-t2, r2[1]) : t2 === 0 && r2.length > 2 && r2[2].trim() ? zt2(0, r2[2]) : zt2(t2, r2[0] ?? "");
}
var Ut2 = (t2) => Number(t2.toPrecision(12));
function Dt2(t2, e3, n2 = 5) {
  let r2 = Number.isFinite(t2) ? t2 : 0, s4 = Number.isFinite(e3) ? e3 : 1;
  if (s4 < r2 && ([r2, s4] = [s4, r2]), r2 === s4) if (r2 === 0) r2 = 0, s4 = 1;
  else {
    const t3 = Math.abs(r2) * 0.5;
    r2 -= t3, s4 += t3;
  }
  const o4 = (s4 - r2) / Math.max(1, n2), i4 = Math.pow(10, Math.floor(Math.log10(o4))), a3 = o4 / i4, l3 = (a3 <= 1 ? 1 : a3 <= 2 ? 2 : a3 <= 5 ? 5 : 10) * i4, c4 = Ut2(Math.floor(r2 / l3 + 1e-9) * l3);
  let u4 = Ut2(Math.ceil(s4 / l3 - 1e-9) * l3);
  return u4 > c4 || (u4 = Ut2(c4 + l3)), { min: c4, max: u4, step: l3 };
}
function Nt2(t2) {
  const e3 = [];
  if (!(t2.step > 0) || !Number.isFinite(t2.min) || !Number.isFinite(t2.max)) return [t2.min];
  const n2 = Math.floor((t2.max - t2.min) / t2.step + 1e-6), r2 = Math.min(n2, 60);
  for (let n3 = 0; n3 <= r2; n3++) e3.push(Ut2(t2.min + n3 * t2.step));
  const s4 = e3[e3.length - 1];
  return s4 !== void 0 && t2.max - s4 > t2.step * 1e-6 && e3.push(Ut2(t2.max)), e3;
}
var Bt2 = { barChart: "bar", bar3DChart: "bar", lineChart: "line", line3DChart: "line", stockChart: "stock", pieChart: "pie", pie3DChart: "pie", ofPieChart: "ofPie", doughnutChart: "doughnut", areaChart: "area", area3DChart: "area", scatterChart: "scatter", bubbleChart: "bubble", radarChart: "radar", surfaceChart: "surface", surface3DChart: "surface" };
var Ft2 = (t2) => t2 === "scatter" || t2 === "bubble";
var jt2 = (e3, n2, r2) => {
  const s4 = h3(e3, n2);
  return s4 ? b3(s4, "val", true) : r2;
};
var Ht2 = (e3, r2) => g3(h3(e3, r2), "val");
var Vt2 = (e3, n2) => m3(h3(e3, n2), "val");
function Wt2(e3) {
  if (!e3) return null;
  for (const n2 of ["numRef", "strRef", "multiLvlStrRef"]) {
    const r2 = h3(e3, n2);
    if (r2) return h3(r2, "numCache") ?? h3(r2, "strCache") ?? h3(r2, "multiLvlStrCache");
  }
  return h3(e3, "numLit") ?? h3(e3, "strLit") ?? null;
}
function Xt(e3, r2) {
  var s4;
  const i4 = new Array(Math.max(0, Math.min(r2, 2e4))).fill("");
  for (const r3 of f3(e3, "pt")) {
    const e4 = g3(r3, "idx") ?? -1;
    if (!(e4 < 0 || e4 > 2e4)) {
      for (; i4.length <= e4; ) i4.push("");
      i4[e4] = ((s4 = h3(r3, "v")) == null ? void 0 : s4.textContent) ?? "";
    }
  }
  return i4;
}
function Yt2(e3) {
  var r2;
  const s4 = Wt2(e3);
  if (!s4) return { vals: [], fmt: null };
  const o4 = ((r2 = h3(s4, "formatCode")) == null ? void 0 : r2.textContent) ?? null;
  return { vals: Xt(s4, g3(h3(s4, "ptCount"), "val") ?? 0).map((t2) => {
    if (t2 === "") return null;
    const e4 = Number(t2);
    return Number.isFinite(e4) ? e4 : null;
  }), fmt: o4 };
}
function _t2(e3) {
  const r2 = Wt2(e3);
  if (!r2) return [];
  if (r2.localName === "numCache" || r2.localName === "numLit") {
    const { vals: t2, fmt: n2 } = Yt2(e3);
    return t2.map((t3) => t3 === null ? "" : Rt2(t3, n2));
  }
  const s4 = f3(r2, "lvl"), i4 = s4.length ? s4[0] : r2;
  return Xt(i4, g3(h3(r2, "ptCount"), "val") ?? 0);
}
function Gt2(e3) {
  var n2;
  const r2 = h3(e3, "rich");
  if (r2) return f3(r2, "p").map((e4) => {
    var n3;
    let r3 = "";
    for (let s5 = e4.firstElementChild; s5; s5 = s5.nextElementSibling) s5.localName === "r" || s5.localName === "fld" ? r3 += ((n3 = h3(s5, "t")) == null ? void 0 : n3.textContent) ?? "" : s5.localName === "br" && (r3 += " ");
    return r3;
  }).join(" ").trim();
  const s4 = h3(e3, "strRef");
  if (s4) {
    const e4 = h3(s4, "strCache"), r3 = f3(e4, "pt")[0];
    return (((n2 = h3(r3, "v")) == null ? void 0 : n2.textContent) ?? "").trim();
  }
  const i4 = h3(e3, "v");
  return ((i4 == null ? void 0 : i4.textContent) ?? "").trim();
}
function qt2(r2, s4) {
  const o4 = p3(r2, "p", "pPr", "defRPr") ?? p3(r2, "rich", "p", "pPr", "defRPr"), l3 = p3(r2, "rich", "p", "r", "rPr"), c4 = o4 ?? l3;
  if (!c4) return { size: null, color: null, bold: false };
  const u4 = g3(c4, "sz");
  return { size: u4 !== null ? it2(u4 / 100) : null, color: C3(h3(c4, "solidFill"), s4), bold: b3(c4, "b", false) };
}
var Zt2 = { del: true, showVal: false, showCat: false, showSer: false, showPercent: false, showSize: false, fmt: null, pos: null, size: null, color: null };
function Kt2(e3, n2, r2) {
  if (!e3) return r2;
  const o4 = jt2(e3, "delete", false), i4 = qt2(h3(e3, "txPr"), n2), a3 = { del: o4, showVal: jt2(e3, "showVal", r2.showVal), showCat: jt2(e3, "showCatName", r2.showCat), showSer: jt2(e3, "showSerName", r2.showSer), showPercent: jt2(e3, "showPercent", r2.showPercent), showSize: jt2(e3, "showBubbleSize", r2.showSize), fmt: m3(h3(e3, "numFmt"), "formatCode") ?? r2.fmt, pos: Vt2(e3, "dLblPos") ?? r2.pos, size: i4.size ?? r2.size, color: i4.color ?? r2.color };
  return o4 ? { ...Zt2, fmt: a3.fmt } : a3;
}
var Jt2 = (t2) => !t2.del && (t2.showVal || t2.showCat || t2.showSer || t2.showPercent || t2.showSize);
function Qt2(e3, n2) {
  if (!e3) return null;
  const r2 = h3(e3, "spPr");
  return { symbol: Vt2(e3, "symbol") ?? "auto", size: Ht2(e3, "size") ?? 5, fill: Et(r2, n2), ln: St2(h3(r2, "ln"), n2) };
}
function te2(e3, n2, r2, s4, i4) {
  const a3 = h3(e3, "spPr"), l3 = Et(a3, r2), c4 = St2(h3(a3, "ln"), r2), u4 = Ft2(n2), h4 = h3(e3, "val") ?? h3(e3, "yVal") ?? h3(e3, "bubbleSize"), { vals: f4, fmt: d4 } = Yt2(h4), p4 = h3(e3, "xVal"), g4 = u4 && p4 ? Yt2(p4).vals : null, m4 = n2 === "bubble" ? h3(e3, "bubbleSize") : null, x4 = m4 ? Yt2(m4) : null, b4 = _t2(h3(e3, "cat") ?? (u4 ? p4 : null)), w4 = /* @__PURE__ */ new Map();
  for (const n3 of f3(e3, "dPt")) {
    const e4 = Ht2(n3, "idx");
    if (e4 === null || e4 < 0) continue;
    const s5 = h3(n3, "spPr");
    w4.set(e4, { fill: Et(s5, r2), ln: St2(h3(s5, "ln"), r2), explosion: Ht2(n3, "explosion") ?? 0 });
  }
  const y4 = n2 === "line" || n2 === "scatter" || n2 === "radar" || n2 === "stock";
  let $3;
  return l3 && l3.type === "solid" ? $3 = l3.color : y4 && c4.color ? $3 = c4.color : $3 = kt2(r2, s4), { idx: Ht2(e3, "idx") ?? s4, order: Ht2(e3, "order") ?? s4, name: Gt2(h3(e3, "tx")) || `\u7CFB\u5217 ${s4 + 1}`, cats: b4, vals: f4, xs: g4, sizes: x4 ? x4.vals : null, sizeFmt: x4 ? x4.fmt : null, fill: l3, ln: c4, marker: Qt2(h3(e3, "marker"), r2), smooth: jt2(e3, "smooth", false), fmt: d4, dLbls: Kt2(h3(e3, "dLbls"), r2, i4), dPts: w4, color: $3 };
}
var ee2 = (t2) => t2.grouping === "stacked" || t2.grouping === "percentStacked";
function ne2(e3, n2) {
  if (!e3) return null;
  const r2 = h3(e3, "upBars"), s4 = h3(e3, "downBars");
  return { gapWidth: Ht2(e3, "gapWidth") ?? 150, upFill: Et(h3(r2, "spPr"), n2), downFill: Et(h3(s4, "spPr"), n2), upLn: St2(p3(r2, "spPr", "ln"), n2), downLn: St2(p3(s4, "spPr", "ln"), n2) };
}
function re2(e3) {
  return { type: (Vt2(e3, "ofPieType") ?? "pie") === "bar" ? "bar" : "pie", splitType: Vt2(e3, "splitType") ?? "auto", splitPos: Ht2(e3, "splitPos"), custSplit: f3(h3(e3, "custSplit"), "secondPiePt").map((t2) => g3(t2, "val") ?? -1).filter((t2) => t2 >= 0), secondSize: Ht2(e3, "secondPieSize") ?? 75, serLines: h3(e3, "serLines") !== null };
}
function se2(e3, n2, r2, a3) {
  const l3 = Vt2(e3, "grouping") ?? (n2 === "bar" ? "clustered" : "standard"), c4 = Kt2(h3(e3, "dLbls"), r2, Zt2), u4 = f3(e3, "ser").map((t2, e4) => te2(t2, n2, r2, a3 + e4, c4));
  u4.sort((t2, e4) => t2.order - e4.order);
  const h4 = /* @__PURE__ */ new Map();
  for (const n3 of f3(h3(e3, "bandFmts"), "bandFmt")) {
    const e4 = Ht2(n3, "idx"), s4 = Et(h3(n3, "spPr"), r2);
    e4 !== null && e4 >= 0 && s4 && h4.set(e4, s4);
  }
  return { kind: n2, tag: e3.localName, is3D: e3.localName.endsWith("3DChart"), grouping: l3, barDir: (Vt2(e3, "barDir") ?? "col") === "bar" ? "bar" : "col", gapWidth: Ht2(e3, "gapWidth") ?? 150, overlap: Ht2(e3, "overlap") ?? (l3 === "stacked" || l3 === "percentStacked" ? 100 : 0), holeSize: Ht2(e3, "holeSize") ?? 50, firstSliceAng: Ht2(e3, "firstSliceAng") ?? 0, varyColors: jt2(e3, "varyColors", n2 === "pie" || n2 === "doughnut" || n2 === "ofPie"), showMarker: jt2(e3, "marker", false), radarStyle: Vt2(e3, "radarStyle") ?? "marker", scatterStyle: Vt2(e3, "scatterStyle") ?? "lineMarker", axIds: f3(e3, "axId").map((t2) => m3(t2, "val") ?? ""), series: u4, dLbls: c4, bubbleScale: Ht2(e3, "bubbleScale") ?? 100, bubbleSizeBy: Vt2(e3, "sizeRepresents") ?? "area", upDown: ne2(h3(e3, "upDownBars"), r2), hiLowLines: h3(e3, "hiLowLines") ? St2(p3(h3(e3, "hiLowLines"), "spPr", "ln"), r2) : null, ofPie: n2 === "ofPie" ? re2(e3) : null, wireframe: jt2(e3, "wireframe", false), bandFills: h4 };
}
var oe2 = { catAx: "cat", valAx: "val", dateAx: "date", serAx: "ser" };
function ie2(t2) {
  return { id: "", kind: t2, del: false, pos: null, crosses: null, crossAx: "", crossBetween: "between", min: null, max: null, majorUnit: null, reversed: false, fmt: null, majorGrid: null, line: { ...Ct2 }, tickLblPos: "nextTo", majorTick: "out", lblSize: null, lblColor: null, title: null };
}
function ae2(e3, n2, r2) {
  const o4 = h3(e3, "scaling"), a3 = h3(e3, "majorGridlines"), l3 = qt2(h3(e3, "txPr"), r2);
  return { id: Vt2(e3, "axId") ?? "", kind: n2, del: jt2(e3, "delete", false), pos: Vt2(e3, "axPos"), crosses: Vt2(e3, "crosses"), crossAx: Vt2(e3, "crossAx") ?? "", crossBetween: Vt2(e3, "crossBetween") ?? "between", min: Ht2(o4, "min"), max: Ht2(o4, "max"), majorUnit: Ht2(e3, "majorUnit"), reversed: Vt2(o4, "orientation") === "maxMin", fmt: m3(h3(e3, "numFmt"), "formatCode"), majorGrid: a3 ? St2(p3(a3, "spPr", "ln"), r2) : null, line: St2(p3(e3, "spPr", "ln"), r2), tickLblPos: Vt2(e3, "tickLblPos") ?? "nextTo", majorTick: Vt2(e3, "majorTickMark") ?? "out", lblSize: l3.size, lblColor: l3.color, title: (() => {
    const n3 = h3(e3, "title");
    return !n3 || jt2(e3, "delete", false) ? null : Gt2(h3(n3, "tx")) || null;
  })() };
}
function le2(e3) {
  const n2 = h3(e3, "manualLayout");
  if (!n2) return null;
  const r2 = (t2) => Ht2(n2, t2), s4 = { target: Vt2(n2, "layoutTarget") ?? "outer", x: r2("x"), y: r2("y"), w: r2("w"), h: r2("h") };
  return s4.x === null && s4.y === null && s4.w === null && s4.h === null ? null : s4;
}
function ce2(t2) {
  return t2 ? { rotX: Ht2(t2, "rotX") ?? 15, rotY: Ht2(t2, "rotY") ?? 20, depthPercent: Ht2(t2, "depthPercent") ?? 100 } : null;
}
function ue2(e3, n2) {
  const r2 = h3(e3, "chart"), s4 = h3(r2, "plotArea"), i4 = qt2(h3(e3, "txPr"), n2), a3 = [], l3 = [];
  let c4 = 0;
  if (s4) for (let t2 = s4.firstElementChild; t2; t2 = t2.nextElementSibling) {
    const e4 = Bt2[t2.localName];
    if (!e4) continue;
    if (e4 === "other") {
      l3.push(t2.localName);
      continue;
    }
    const r3 = se2(t2, e4, n2, c4);
    c4 += r3.series.length, a3.push(r3);
  }
  const u4 = [];
  if (s4) for (let t2 = s4.firstElementChild; t2; t2 = t2.nextElementSibling) {
    const e4 = oe2[t2.localName];
    e4 && u4.push(ae2(t2, e4, n2));
  }
  const h4 = h3(r2, "title"), f4 = jt2(r2, "autoTitleDeleted", false), d4 = h3(h4, "tx"), p4 = h4 && !jt2(h4, "delete", false) ? Gt2(d4) : "", g4 = qt2(d4 ?? h3(h4, "txPr"), n2), m4 = qt2(h3(h4, "txPr"), n2), x4 = h3(r2, "legend"), b4 = /* @__PURE__ */ new Set();
  for (const t2 of f3(x4, "legendEntry")) {
    const e4 = Ht2(t2, "idx");
    e4 !== null && jt2(t2, "delete", false) && b4.add(e4);
  }
  const w4 = h3(e3, "spPr"), y4 = h3(s4, "spPr");
  return { title: p4 && !f4 ? p4 : null, titleSize: g4.size ?? m4.size ?? it2(14), titleColor: g4.color ?? m4.color, titleBold: g4.bold || m4.bold, legendPos: x4 ? Vt2(x4, "legendPos") ?? "r" : null, legendOverlay: jt2(x4, "overlay", false), legendDeleted: b4, groups: a3, axes: u4, view3D: ce2(h3(r2, "view3D")), fill: Et(w4, n2), ln: St2(h3(w4, "ln"), n2), plotFill: Et(y4, n2), plotLn: St2(h3(y4, "ln"), n2), plotLayout: le2(h3(s4, "layout")), textSize: i4.size ?? it2(10), textColor: i4.color ?? $t(n2, "tx1"), unsupported: l3 };
}
var he2 = (t2) => t2 * 1.4;
var fe2 = (t2) => t2 * 2.9;
var de2 = (t2, e3) => wt2(t2, e3) + e3 * 0.5;
function pe2(t2) {
  let e3 = 0;
  for (const n2 of t2.labels) {
    const r2 = de2(n2, t2.size);
    r2 > e3 && (e3 = r2);
  }
  return e3;
}
var ge2 = (t2) => !t2.axis.del && t2.axis.tickLblPos !== "none";
var me2 = 0.08;
function xe2(t2, e3) {
  const n2 = Math.max(Math.min(e3.h, e3.w * 1.2) * me2, 6), r2 = lt3(t2 ? t2.rotX : 15, -60, 60), s4 = lt3(t2 ? t2.rotY : 20, -90, 90), o4 = lt3((t2 ? t2.depthPercent : 100) / 100, 0.2, 3), i4 = n2 * lt3(s4 / 20, -2, 2) * o4, a3 = -n2 * lt3(r2 / 20, -2, 2) * o4;
  return Math.abs(i4) < 1 && Math.abs(a3) < 1 ? { dx: n2 * 0.5, dy: -n2 * 0.4 } : { dx: i4, dy: a3 };
}
function be2(t2, e3) {
  const n2 = Math.abs(e3.dx), r2 = Math.abs(e3.dy);
  return { x: t2.x + (e3.dx < 0 ? n2 : 0), y: t2.y + (e3.dy < 0 ? r2 : 0), w: Math.max(t2.w - n2, 8), h: Math.max(t2.h - r2, 8) };
}
function we2(t2, e3, n2) {
  const r2 = [], s4 = t2.x, o4 = t2.x + t2.w, i4 = t2.y, a3 = t2.y + t2.h, l3 = yt2(vt3(n2, "#ffffff", 0.93)), c4 = yt2(vt3(n2, "#ffffff", 0.86)), u4 = yt2(vt3(n2, "#ffffff", 0.89)), h4 = (t3, e4) => {
    const n3 = xt2(t3, e4, null);
    n3 && r2.push(n3);
  };
  h4([[s4 + e3.dx, i4 + e3.dy], [o4 + e3.dx, i4 + e3.dy], [o4 + e3.dx, a3 + e3.dy], [s4 + e3.dx, a3 + e3.dy]], l3);
  const f4 = e3.dx >= 0 ? s4 : o4;
  h4([[f4, i4], [f4 + e3.dx, i4 + e3.dy], [f4 + e3.dx, a3 + e3.dy], [f4, a3]], u4);
  const d4 = e3.dy <= 0 ? a3 : i4;
  return h4([[s4, d4], [o4, d4], [o4 + e3.dx, d4 + e3.dy], [s4 + e3.dx, d4 + e3.dy]], c4), r2;
}
function ye2(t2, e3) {
  return t2 > 0 && e3 > 0 && t2 <= e3 * (5 / 6) ? 0 : t2;
}
function $e2(t2) {
  if (t2.lo !== t2.hi) return t2;
  if (t2.lo === 0) return { lo: 0, hi: 1 };
  const e3 = Math.abs(t2.lo) * 0.2;
  return { lo: t2.lo - e3, hi: t2.hi + e3 };
}
function Me2(t2) {
  let e3 = 1 / 0, n2 = -1 / 0, r2 = false;
  const s4 = (t3) => {
    Number.isFinite(t3) && (t3 < e3 && (e3 = t3), t3 > n2 && (n2 = t3));
  };
  for (const e4 of t2) if ((e4.kind === "bar" || e4.kind === "area") && (r2 = true), e4.grouping === "percentStacked") {
    let t3 = false, n3 = false;
    for (const r3 of e4.series) for (const e5 of r3.vals) e5 !== null && (e5 < 0 ? t3 = true : e5 > 0 && (n3 = true));
    s4(0), (n3 || !t3) && s4(1), t3 && s4(-1);
  } else if (ee2(e4)) {
    let t3 = 0;
    for (const n3 of e4.series) t3 = Math.max(t3, n3.vals.length);
    for (let n3 = 0; n3 < t3; n3++) {
      let t4 = 0, r3 = 0;
      for (const s5 of e4.series) {
        const e5 = s5.vals[n3];
        e5 == null || !Number.isFinite(e5) || (e5 >= 0 ? t4 += e5 : r3 += e5);
      }
      s4(t4), s4(r3);
    }
  } else for (const t3 of e4.series) for (const e5 of t3.vals) e5 !== null && s4(e5);
  return e3 === 1 / 0 ? { lo: 0, hi: 1 } : (r2 ? (e3 = Math.min(e3, 0), n2 = Math.max(n2, 0)) : e3 = ye2(e3, n2), $e2({ lo: e3, hi: n2 }));
}
function ve2(t2) {
  let e3 = 1 / 0, n2 = -1 / 0;
  for (const r2 of t2) for (const t3 of r2.series) if (t3.xs) for (const r3 of t3.xs) r3 === null || !Number.isFinite(r3) || (r3 < e3 && (e3 = r3), r3 > n2 && (n2 = r3));
  else t3.vals.length && (e3 = Math.min(e3, 1), n2 = Math.max(n2, t3.vals.length));
  return e3 === 1 / 0 ? { lo: 0, hi: 1 } : $e2({ lo: ye2(e3, n2), hi: n2 });
}
function ke2(t2, e3, n2) {
  const r2 = Dt2(t2.lo, t2.hi, n2);
  let s4 = e3.min !== null && Number.isFinite(e3.min) ? e3.min : r2.min, o4 = e3.max !== null && Number.isFinite(e3.max) ? e3.max : r2.max;
  o4 < s4 && ([s4, o4] = [o4, s4]);
  let i4 = e3.majorUnit !== null && Number.isFinite(e3.majorUnit) ? e3.majorUnit : r2.step;
  for (o4 === s4 && (o4 = s4 + Math.abs(i4) || s4 + 1), i4 > 0 || (i4 = (o4 - s4) / Math.max(1, n2)), i4 > 0 || (i4 = 1); (o4 - s4) / i4 > 100; ) i4 *= 2;
  return { min: s4, max: o4, step: i4 };
}
var Ee2 = (t2, e3) => Math.round(lt3(t2 / Math.max(e3 * 3.2, 1), 2, 12));
function Te2(t2, e3, n2, r2, s4, o4) {
  const i4 = ke2(n2, t2, r2), a3 = Nt2(i4), l3 = t2.fmt ?? s4;
  return { axis: t2, side: e3, scale: i4, ticks: a3, labels: a3.map((t3) => Rt2(t3, l3)), between: false, catCount: a3.length, size: t2.lblSize ?? o4.textSize, color: t2.lblColor ?? o4.textColor };
}
function Ce2(t2, e3, n2, r2, s4) {
  return { axis: t2, side: e3, scale: null, ticks: n2.map((t3, e4) => e4), labels: n2.slice(), between: r2, catCount: n2.length, size: t2.lblSize ?? s4.textSize, color: t2.lblColor ?? s4.textColor };
}
function Se2(t2, e3, n2, r2) {
  const s4 = e3 ? t2.h : t2.w, o4 = Math.max(n2.catCount, 1), i4 = n2.between ? s4 / o4 : o4 > 1 ? s4 / (o4 - 1) : s4, a3 = n2.axis.reversed, l3 = (n3) => {
    const r3 = a3 ? s4 - n3 : n3;
    return e3 ? t2.y + t2.h - r3 : t2.x + r3;
  }, c4 = (t3) => l3(n2.between ? (t3 + 0.5) * i4 : t3 * i4), u4 = (t3) => l3(t3 * i4), { at: h4, clampValue: f4 } = Le2(t2, e3, r2), d4 = (t3, n3) => e3 ? [n3, t3] : [t3, n3];
  return { rect: t2, horizontal: e3, catView: n2, valView: r2, band: i4, cat: c4, edge: u4, val: h4, clampVal: f4, zero: h4(f4(0)), pt: d4 };
}
function Le2(t2, e3, n2) {
  const r2 = n2.scale ?? { min: 0, max: 1 }, s4 = r2.max - r2.min || 1;
  return { at: (o4) => {
    let i4 = (o4 - r2.min) / s4;
    return Number.isFinite(i4) || (i4 = 0), n2.axis.reversed && (i4 = 1 - i4), e3 ? t2.x + i4 * t2.w : t2.y + t2.h - i4 * t2.h;
  }, clampValue: (t3) => Number.isFinite(t3) ? lt3(t3, r2.min, r2.max) : r2.min };
}
function Ae2(t2, e3, n2) {
  const r2 = Le2(t2, true, e3), s4 = Le2(t2, false, n2);
  return { rect: t2, x: r2.at, y: s4.at, clampX: r2.clampValue, clampY: s4.clampValue };
}
function Pe2(t2, e3, n2, r2, s4 = null) {
  const o4 = t2.textSize * 0.45, i4 = he2(t2.textSize * 1.05) + o4 * 0.6, a3 = { l: t2.textSize * 0.4, r: t2.textSize * 0.8, t: t2.textSize * 0.8, b: t2.textSize * 0.3 }, l3 = (t3, e4, n3, r3 = false) => {
    ge2(t3) && (a3[e4] += (n3 ? r3 ? fe2(t3.size) : he2(t3.size) : pe2(t3)) + o4), t3.axis.title && (a3[e4] += i4);
  };
  if (l3(n2, n2.side === "r" ? "r" : "l", false), s4 && l3(s4, s4.side, s4.side === "t" || s4.side === "b"), l3(e3, e3.side === "t" ? "t" : "b", true, r2), ge2(e3) && e3.scale) {
    const t3 = pe2(e3) / 2;
    a3.l += t3, a3.r += t3;
  }
  return a3;
}
function Ie2(t2, e3) {
  const n2 = t2.w * 0.72, r2 = t2.h * 0.72;
  let { l: s4, r: o4, t: i4, b: a3 } = e3;
  if (s4 + o4 > n2) {
    const t3 = n2 / (s4 + o4);
    s4 *= t3, o4 *= t3;
  }
  if (i4 + a3 > r2) {
    const t3 = r2 / (i4 + a3);
    i4 *= t3, a3 *= t3;
  }
  return { x: t2.x + s4, y: t2.y + i4, w: Math.max(t2.w - s4 - o4, 8), h: Math.max(t2.h - i4 - a3, 8) };
}
function Oe2(t2, e3, n2, r2, s4, o4) {
  const i4 = s4 ? s4.dx : 0, a3 = s4 ? s4.dy : 0, l3 = dt2(t2 + i4, e3 + a3, n2 + i4, r2 + a3, o4);
  return l3 ? [l3] : [];
}
function ze2(t2, e3, n2) {
  const r2 = [], { rect: s4, hAxis: o4, vAxis: i4 } = e3, a3 = vt3(t2.textColor, "#ffffff", 0.78), l3 = vt3(t2.textColor, "#ffffff", 0.45), c4 = t2.textSize * 0.45, u4 = e3.depth;
  for (const t3 of [false, true]) {
    const n3 = t3 ? o4 : i4, l4 = n3.axis.majorGrid ? Lt2(n3.axis.majorGrid, a3, 1) : null;
    if (!l4) continue;
    const c5 = t3 ? e3.hEdge : e3.vEdge, h5 = c5 ?? (t3 ? e3.hPos : e3.vPos), f5 = c5 ? t3 ? e3.hEdgeCount : e3.vEdgeCount : n3.ticks.length;
    for (let n4 = 0; n4 < f5; n4++) {
      const o5 = h5(n4), i5 = t3 ? o5 : s4.x, a4 = t3 ? s4.y : o5;
      if (r2.push(...Oe2(i5, a4, t3 ? o5 : s4.x + s4.w, t3 ? s4.y + s4.h : o5, u4, l4)), u4 && e3.gridWalls !== false) {
        const e4 = t3 ? o5 : u4.dx < 0 ? s4.x + s4.w : s4.x, n5 = t3 ? u4.dy > 0 ? s4.y : s4.y + s4.h : o5, i6 = dt2(e4, n5, e4 + u4.dx, n5 + u4.dy, l4);
        i6 && r2.push(i6);
      }
    }
  }
  const h4 = [], f4 = [], d4 = [];
  for (const r3 of [true, false]) {
    const a4 = r3 ? o4 : i4, u5 = r3 ? e3.hPos : e3.vPos, p4 = r3 ? e3.hLineAt : e3.vLineAt;
    if (!a4.axis.del) {
      const t3 = Lt2(a4.axis.line, l3, 1), e4 = r3 ? dt2(s4.x, p4, s4.x + s4.w, p4, t3) : dt2(p4, s4.y, p4, s4.y + s4.h, t3);
      e4 && h4.push(e4);
    }
    const g4 = a4.size, m4 = r3 && e3.hWrap, x4 = m4 ? fe2(g4) : he2(g4);
    let b4 = 0;
    if (ge2(a4)) {
      b4 = (r3 ? x4 : pe2(a4)) + c4;
      for (let t3 = 0; t3 < a4.labels.length; t3++) {
        const o5 = a4.labels[t3];
        if (!o5) continue;
        const i5 = m4 ? Math.max(e3.hBand * 0.98, g4 * 2) : de2(o5, g4), l4 = r3 ? u5(t3) - i5 / 2 : a4.side === "r" ? s4.x + s4.w + c4 : s4.x - c4 - i5, h5 = r3 ? a4.side === "t" ? s4.y - c4 - x4 : s4.y + s4.h + c4 : u5(t3) - x4 / 2, d5 = bt2(l4, h5, i5, x4, o5, { size: g4, color: a4.color, align: r3 ? "center" : a4.side === "r" ? "left" : "right", anchor: r3 ? a4.side === "t" ? "bottom" : "top" : "middle", fonts: n2 });
        m4 && d5.text && (d5.text.wrap = true), f4.push(d5);
      }
    }
    if (a4.axis.title) {
      const e4 = t2.textSize * 1.05, o5 = he2(e4);
      if (r3) {
        const r4 = a4.side === "t" ? s4.y - b4 - c4 - o5 : s4.y + s4.h + b4 + c4 * 0.4;
        d4.push(bt2(s4.x, r4, s4.w, o5, a4.axis.title, { size: e4, color: t2.textColor, align: "center", anchor: "middle", fonts: n2 }));
      } else {
        const r4 = a4.side === "r" ? s4.x + s4.w + b4 + c4 * 0.4 + o5 / 2 : s4.x - b4 - c4 * 0.4 - o5 / 2;
        d4.push(bt2(r4 - s4.h / 2, s4.y + s4.h / 2 - o5 / 2, s4.h, o5, a4.axis.title, { size: e4, color: t2.textColor, align: "center", anchor: "middle", fonts: n2, rot: a4.side === "r" ? 90 : -90 }));
      }
    }
  }
  return r2.push(...h4, ...f4, ...d4), r2;
}
function Re2(t2, e3, n2) {
  const r2 = e3.view.side === "l" || e3.view.side === "r", s4 = e3.grid ? e3.view : { ...e3.view, axis: { ...e3.view.axis, majorGrid: null } }, o4 = { ...s4, axis: { ...s4.axis, del: true, majorGrid: null, title: null } };
  return ze2(t2, { rect: e3.rect, hAxis: r2 ? o4 : s4, vAxis: r2 ? s4 : o4, hPos: e3.pos, vPos: e3.pos, hEdge: null, hEdgeCount: 0, vEdge: null, vEdgeCount: 0, hLineAt: e3.at, vLineAt: e3.at, hWrap: false, hBand: 0, depth: e3.depth, gridWalls: false }, n2);
}
function Ue2(t2, e3) {
  return !ge2(t2) || t2.scale ? false : pe2(t2) > e3 * 1.02;
}
var De2 = Math.PI * 2;
var Ne2 = ["circle", "square", "diamond", "triangle", "x", "plus", "star", "dot"];
function Be2(t2, e3, n2, r2) {
  const s4 = e3.dPts.get(n2), o4 = t2.varyColors ? kt2(r2, n2) : e3.color, i4 = (s4 == null ? void 0 : s4.fill) ?? e3.fill ?? yt2(o4);
  return { fill: i4, color: i4.type === "solid" ? i4.color : o4 };
}
function Fe2(t2, e3, n2, r2) {
  const s4 = t2.dPts.get(e3);
  return Lt2(s4 != null && s4.ln.present ? s4.ln : t2.ln, n2, r2);
}
var je2 = (t2) => t2 == null || !Number.isFinite(t2) ? null : t2;
function He2(t2) {
  let e3 = 1 / 0, n2 = 1 / 0, r2 = -1 / 0, s4 = -1 / 0;
  for (const [o4, i4] of t2) o4 < e3 && (e3 = o4), i4 < n2 && (n2 = i4), o4 > r2 && (r2 = o4), i4 > s4 && (s4 = i4);
  return { x: e3, y: n2, w: r2 - e3, h: s4 - n2 };
}
function Ve2(t2, e3, n2) {
  const r2 = t2.map(([t3, r3]) => [t3 - e3, r3 - n2]);
  let s4 = `M ${at3(r2[0][0])} ${at3(r2[0][1])}`;
  for (let t3 = 0; t3 < r2.length - 1; t3++) {
    const e4 = r2[t3 === 0 ? 0 : t3 - 1], n3 = r2[t3], o4 = r2[t3 + 1], i4 = r2[t3 + 2 < r2.length ? t3 + 2 : r2.length - 1], a3 = [n3[0] + (o4[0] - e4[0]) / 6, n3[1] + (o4[1] - e4[1]) / 6], l3 = [o4[0] - (i4[0] - n3[0]) / 6, o4[1] - (i4[1] - n3[1]) / 6];
    s4 += ` C ${at3(a3[0])} ${at3(a3[1])} ${at3(l3[0])} ${at3(l3[1])} ${at3(o4[0])} ${at3(o4[1])}`;
  }
  return s4;
}
function We2(t2, e3, n2, r2, s4) {
  const o4 = t2.map((t3) => t3.filter(([t4, e4]) => Number.isFinite(t4) && Number.isFinite(e4))).filter((t3) => t3.length >= (r2 ? 3 : 2));
  if (!o4.length) return null;
  const i4 = He2(o4.flat()), a3 = o4.map((t3) => (s4 && t3.length > 2 ? Ve2(t3, i4.x, i4.y) : "M " + t3.map(([t4, e4]) => `${at3(t4 - i4.x)} ${at3(e4 - i4.y)}`).join(" L ")) + (r2 ? " Z" : "")).join(" ");
  return ut2(i4.x, i4.y, i4.w, i4.h, a3, e3, n2);
}
function Xe2(t2, e3, n2) {
  return `M ${at3(t2 - n2)} ${at3(e3)} A ${at3(n2)} ${at3(n2)} 0 1 1 ${at3(t2 + n2)} ${at3(e3)} A ${at3(n2)} ${at3(n2)} 0 1 1 ${at3(t2 - n2)} ${at3(e3)} Z`;
}
function Ye2(t2, e3) {
  const n2 = e3, r2 = e3 * 2;
  switch (t2) {
    case "square":
      return { d: `M 0 0 L ${at3(r2)} 0 L ${at3(r2)} ${at3(r2)} L 0 ${at3(r2)} Z`, open: false };
    case "diamond":
      return { d: `M ${at3(n2)} 0 L ${at3(r2)} ${at3(n2)} L ${at3(n2)} ${at3(r2)} L 0 ${at3(n2)} Z`, open: false };
    case "triangle":
      return { d: `M ${at3(n2)} 0 L ${at3(r2)} ${at3(r2)} L 0 ${at3(r2)} Z`, open: false };
    case "x":
      return { d: `M 0 0 L ${at3(r2)} ${at3(r2)} M ${at3(r2)} 0 L 0 ${at3(r2)}`, open: true };
    case "plus":
      return { d: `M ${at3(n2)} 0 L ${at3(n2)} ${at3(r2)} M 0 ${at3(n2)} L ${at3(r2)} ${at3(n2)}`, open: true };
    case "star":
      return { d: `M ${at3(n2)} 0 L ${at3(n2)} ${at3(r2)} M 0 ${at3(n2)} L ${at3(r2)} ${at3(n2)} M 0 0 L ${at3(r2)} ${at3(r2)} M ${at3(r2)} 0 L 0 ${at3(r2)}`, open: true };
    case "dash":
      return { d: `M 0 ${at3(n2)} L ${at3(r2)} ${at3(n2)}`, open: true };
    case "dot":
      return { d: Xe2(n2, n2, e3 * 0.55), open: false };
    default:
      return { d: Xe2(n2, n2, e3), open: false };
  }
}
function _e2(t2, e3, n2) {
  const r2 = t2.kind === "scatter" ? t2.scatterStyle !== "line" && t2.scatterStyle !== "smooth" : t2.showMarker;
  let s4 = e3.marker ? e3.marker.symbol : r2 ? "auto" : "none";
  return s4 === "auto" && (s4 = r2 ? Ne2[n2 % Ne2.length] : "none"), s4;
}
function Ge2(t2, e3, n2, r2, s4) {
  var o4, i4;
  if (n2 === "none" || !Number.isFinite(t2) || !Number.isFinite(e3)) return null;
  const a3 = Math.max(it2(lt3(((o4 = r2.marker) == null ? void 0 : o4.size) ?? 5, 2, 72)) / 2, 1), { d: l3, open: c4 } = Ye2(n2, a3), u4 = (i4 = r2.marker) == null ? void 0 : i4.fill, h4 = r2.marker ? Lt2(r2.marker.ln, null, 0) : null;
  return c4 ? ut2(t2 - a3, e3 - a3, a3 * 2, a3 * 2, l3, null, h4 ?? { color: s4, width: 1.25, dash: null }) : ut2(t2 - a3, e3 - a3, a3 * 2, a3 * 2, l3, u4 ?? yt2(s4), h4);
}
function qe2(t2, e3, n2, r2, s4, o4 = null, i4 = s4.cats[e3] ?? "") {
  const a3 = t2.dLbls, l3 = [];
  return a3.showSer && l3.push(t2.name), a3.showCat && l3.push(i4), a3.showVal && l3.push(Rt2(n2, a3.fmt ?? t2.fmt)), a3.showSize && o4 !== null && l3.push(Rt2(o4, t2.sizeFmt ?? a3.fmt ?? t2.fmt)), a3.showPercent && r2 !== null && l3.push(Rt2(r2, a3.fmt && a3.fmt.includes("%") ? a3.fmt : "0%")), l3.filter((t3) => t3 !== "").join(" ");
}
function Ze2(t2, e3, n2, r2, s4) {
  if (!n2 || !Number.isFinite(t2) || !Number.isFinite(e3)) return null;
  const o4 = r2.size ?? s4.size * 0.92, i4 = Math.max(n2.length * o4 * 0.75, o4 * 2), a3 = he2(o4);
  return bt2(t2 - i4 / 2, e3 - a3 / 2, i4, a3, n2, { size: o4, color: r2.color ?? s4.color, align: "center", anchor: "middle", fonts: s4.fonts });
}
function Ke2(t2, e3, n2, r2, s4) {
  const o4 = [], i4 = t2.x, a3 = t2.x + t2.w, l3 = t2.y, c4 = t2.y + t2.h, u4 = (t3, e4) => {
    const n3 = xt2(t3, yt2(e4), s4);
    n3 && o4.push(n3);
  }, h4 = e3.dx >= 0 ? a3 : i4;
  u4([[h4, l3], [h4 + e3.dx, l3 + e3.dy], [h4 + e3.dx, c4 + e3.dy], [h4, c4]], mt2(r2));
  const f4 = e3.dy <= 0 ? l3 : c4;
  return u4([[i4, f4], [a3, f4], [a3 + e3.dx, f4 + e3.dy], [i4 + e3.dx, f4 + e3.dy]], gt2(r2)), o4.push(ut2(t2.x, t2.y, t2.w, t2.h, `M 0 0 L ${at3(t2.w)} 0 L ${at3(t2.w)} ${at3(t2.h)} L 0 ${at3(t2.h)} Z`, n2, s4)), o4;
}
function Je2(t2, e3, n2, r2, s4 = null) {
  const o4 = [], i4 = lt3(t2.gapWidth, 0, 800) / 100, a3 = lt3(t2.overlap, -100, 100) / 100, l3 = Math.max(n2.total, 1), c4 = 1 + (l3 - 1) * (1 - a3) + i4;
  let u4 = e3.band / (c4 > 0 ? c4 : 1);
  u4 > 0 || (u4 = e3.band * 0.6), u4 = Math.min(u4, e3.band);
  const h4 = u4 * (1 + (l3 - 1) * (1 - a3)), f4 = u4 * (1 - a3), d4 = ee2(t2), p4 = t2.grouping === "percentStacked", g4 = t2.series.reduce((t3, e4) => Math.max(t3, e4.vals.length), 0), m4 = new Array(g4).fill(0), x4 = new Array(g4).fill(0), b4 = new Array(g4).fill(0);
  if (p4) for (let e4 = 0; e4 < g4; e4++) {
    let n3 = 0;
    for (const r3 of t2.series) n3 += Math.abs(je2(r3.vals[e4]) ?? 0);
    b4[e4] = n3;
  }
  const w4 = [], y4 = [];
  if (t2.series.forEach((s5, o5) => {
    const i5 = n2.base + (d4 ? 0 : o5), a4 = e3.horizontal ? -1 : 1;
    for (let n3 = 0; n3 < g4; n3++) {
      const o6 = je2(s5.vals[n3]);
      if (o6 === null) continue;
      const l4 = p4 ? b4[n3] > 0 ? o6 / b4[n3] : 0 : o6;
      let c5 = 0;
      d4 && (c5 = l4 >= 0 ? m4[n3] : x4[n3], l4 >= 0 ? m4[n3] += l4 : x4[n3] += l4);
      const g5 = e3.cat(n3) + a4 * (-h4 / 2 + i5 * f4 + u4 / 2), $3 = e3.val(e3.clampVal(c5)), M4 = e3.val(e3.clampVal(c5 + l4)), [v4, k3] = e3.pt(g5 - u4 / 2, $3), [E3, T3] = e3.pt(g5 + u4 / 2, M4), C4 = { x: Math.min(v4, E3), y: Math.min(k3, T3), w: Math.abs(E3 - v4), h: Math.abs(T3 - k3) }, { fill: S4, color: L4 } = Be2(t2, s5, n3, r2.ctx);
      if (C4.w > 0.05 && C4.h > 0.05 && y4.push({ r: C4, fill: S4, color: L4, stroke: Fe2(s5, n3, null, 0), anchor: e3.pt(g5, $3) }), Jt2(s5.dLbls)) {
        const t3 = qe2(s5, n3, o6, p4 && b4[n3] > 0 ? Math.abs(o6) / b4[n3] : null, r2), i6 = s5.dLbls.size ?? r2.size * 0.92, a5 = he2(i6) * 0.6, c6 = s5.dLbls.pos ?? (d4 ? "ctr" : "outEnd");
        let u5 = (C4.x + C4.x + C4.w) / 2, h5 = (C4.y + C4.y + C4.h) / 2;
        if (c6 !== "ctr") {
          const t4 = c6 === "inEnd" || c6 === "inBase" ? -1 : 1;
          e3.horizontal ? u5 = (l4 >= 0 ? C4.x + C4.w : C4.x) + t4 * (l4 >= 0 ? a5 : -a5) : h5 = (l4 >= 0 ? C4.y : C4.y + C4.h) - t4 * (l4 >= 0 ? a5 : -a5);
        }
        const f5 = Ze2(u5, h5, t3, s5.dLbls, r2);
        f5 && w4.push(f5);
      }
    }
  }), s4) {
    const t3 = (t4) => t4.anchor[0] * s4.dx + t4.anchor[1] * s4.dy;
    y4.sort((e4, n3) => t3(e4) - t3(n3));
    for (const t4 of y4) o4.push(...Ke2(t4.r, s4, t4.fill, t4.color, t4.stroke));
  } else for (const t3 of y4) o4.push(ut2(t3.r.x, t3.r.y, t3.r.w, t3.r.h, `M 0 0 L ${at3(t3.r.w)} 0 L ${at3(t3.r.w)} ${at3(t3.r.h)} L 0 ${at3(t3.r.h)} Z`, t3.fill, t3.stroke));
  return o4.concat(w4);
}
function Qe2(t2) {
  const e3 = t2.series.reduce((t3, e4) => Math.max(t3, e4.vals.length), 0), n2 = ee2(t2), r2 = t2.grouping === "percentStacked", s4 = new Array(e3).fill(0);
  if (r2) for (let n3 = 0; n3 < e3; n3++) {
    let e4 = 0;
    for (const r3 of t2.series) e4 += Math.abs(je2(r3.vals[n3]) ?? 0);
    s4[n3] = e4;
  }
  const o4 = new Array(e3).fill(0), i4 = [], a3 = [];
  for (const l3 of t2.series) {
    const t3 = [], c4 = [];
    for (let i5 = 0; i5 < e3; i5++) {
      const e4 = je2(l3.vals[i5]);
      if (e4 === null) {
        t3.push(null), c4.push(null);
        continue;
      }
      const a4 = r2 ? s4[i5] > 0 ? e4 / s4[i5] : 0 : e4;
      n2 ? (c4.push(o4[i5]), o4[i5] += a4, t3.push(o4[i5])) : (c4.push(0), t3.push(a4));
    }
    i4.push(t3), a3.push(c4);
  }
  return { top: i4, bottom: a3 };
}
function tn2(t2, e3, n2) {
  const r2 = [], s4 = [], { top: o4 } = Qe2(t2), i4 = t2.grouping === "percentStacked";
  return t2.series.forEach((a3, l3) => {
    const c4 = o4[l3] ?? [], u4 = [];
    let h4 = [];
    const f4 = [];
    for (let t3 = 0; t3 < c4.length; t3++) {
      const n3 = c4[t3];
      if (n3 === null) {
        h4.length && u4.push(h4), h4 = [], f4.push(null);
        continue;
      }
      const r3 = e3.pt(e3.cat(t3), e3.val(e3.clampVal(n3)));
      h4.push(r3), f4.push(r3);
    }
    h4.length && u4.push(h4);
    const d4 = Lt2(a3.ln, a3.color, it2(2.25)), p4 = We2(u4, null, d4, false, a3.smooth);
    p4 && r2.push(p4);
    const g4 = _e2(t2, a3, l3);
    for (let e4 = 0; e4 < f4.length; e4++) {
      const r3 = f4[e4];
      if (!r3) continue;
      const { color: o5 } = Be2(t2, a3, e4, n2.ctx), l4 = Ge2(r3[0], r3[1], g4, a3, t2.varyColors ? o5 : a3.color);
      if (l4 && s4.push(l4), Jt2(a3.dLbls)) {
        const t3 = je2(a3.vals[e4]) ?? 0, o6 = qe2(a3, e4, t3, i4 ? c4[e4] ?? 0 : null, n2), l5 = a3.dLbls.size ?? n2.size * 0.92, u5 = Ze2(r3[0], r3[1] - he2(l5) * 0.85, o6, a3.dLbls, n2);
        u5 && s4.push(u5);
      }
    }
  }), r2.concat(s4);
}
function en2(t2, e3, n2) {
  const r2 = [], s4 = [], { top: o4, bottom: i4 } = Qe2(t2), a3 = t2.grouping === "percentStacked";
  return t2.series.forEach((l3, c4) => {
    const u4 = o4[c4] ?? [], h4 = i4[c4] ?? [], f4 = [];
    let d4 = [], p4 = [];
    const g4 = () => {
      d4.length >= 2 && f4.push(d4.concat(p4.slice().reverse())), d4 = [], p4 = [];
    };
    for (let t3 = 0; t3 < u4.length; t3++) {
      const n3 = u4[t3];
      if (n3 === null) {
        g4();
        continue;
      }
      d4.push(e3.pt(e3.cat(t3), e3.val(e3.clampVal(n3)))), p4.push(e3.pt(e3.cat(t3), e3.val(e3.clampVal(h4[t3] ?? 0))));
    }
    g4();
    const { fill: m4 } = Be2(t2, l3, 0, n2.ctx), x4 = We2(f4, m4, Lt2(l3.ln, null, 0), true, l3.smooth);
    if (x4 && r2.push(x4), Jt2(l3.dLbls)) for (let t3 = 0; t3 < u4.length; t3++) {
      const r3 = u4[t3];
      if (r3 === null) continue;
      const [o5, i5] = e3.pt(e3.cat(t3), e3.val(e3.clampVal(r3))), c5 = je2(l3.vals[t3]) ?? 0, h5 = l3.dLbls.size ?? n2.size * 0.92, f5 = Ze2(o5, i5 - he2(h5) * 0.8, qe2(l3, t3, c5, a3 ? r3 : null, n2), l3.dLbls, n2);
      f5 && s4.push(f5);
    }
  }), r2.concat(s4);
}
function nn2(t2, e3, n2) {
  const r2 = [], s4 = [], o4 = t2.scatterStyle !== "marker" && t2.scatterStyle !== "none";
  return t2.series.forEach((i4, a3) => {
    const l3 = [];
    let c4 = [];
    const u4 = [];
    for (let t3 = 0; t3 < i4.vals.length; t3++) {
      const n3 = je2(i4.vals[t3]), r3 = i4.xs ? je2(i4.xs[t3]) : t3 + 1;
      if (n3 === null || r3 === null) {
        c4.length && l3.push(c4), c4 = [], u4.push(null);
        continue;
      }
      const s5 = [e3.x(e3.clampX(r3)), e3.y(e3.clampY(n3))];
      c4.push(s5), u4.push(s5);
    }
    if (c4.length && l3.push(c4), o4) {
      const e4 = Lt2(i4.ln, i4.color, it2(2.25)), n3 = We2(l3, null, e4, false, i4.smooth || t2.scatterStyle === "smoothMarker");
      n3 && r2.push(n3);
    }
    const h4 = _e2(t2, i4, a3);
    for (let e4 = 0; e4 < u4.length; e4++) {
      const r3 = u4[e4];
      if (!r3) continue;
      const { color: a4 } = Be2(t2, i4, e4, n2.ctx), l4 = Ge2(r3[0], r3[1], h4 === "none" && !o4 ? "circle" : h4, i4, t2.varyColors ? a4 : i4.color);
      if (l4 && s4.push(l4), Jt2(i4.dLbls)) {
        const t3 = i4.dLbls.size ?? n2.size * 0.92, o5 = Ze2(r3[0], r3[1] - he2(t3) * 0.85, qe2(i4, e4, je2(i4.vals[e4]) ?? 0, null, n2, null, i4.cats[e4] ?? String(e4 + 1)), i4.dLbls, n2);
        o5 && s4.push(o5);
      }
    }
  }), r2.concat(s4);
}
function rn2(t2, e3, n2) {
  const r2 = lt3(t2.bubbleScale, 0, 300) / 100, s4 = Math.max(2, Math.min(e3.rect.w, e3.rect.h) * 0.13 * r2);
  let o4 = 0;
  for (const e4 of t2.series) for (const t3 of e4.sizes ?? []) {
    const e5 = je2(t3);
    e5 !== null && (o4 = Math.max(o4, Math.abs(e5)));
  }
  const i4 = t2.bubbleSizeBy !== "w", a3 = [];
  for (const r3 of t2.series) for (let l4 = 0; l4 < r3.vals.length; l4++) {
    const c5 = je2(r3.vals[l4]), u4 = r3.xs ? je2(r3.xs[l4]) : l4 + 1;
    if (c5 === null || u4 === null) continue;
    const h4 = r3.sizes ? Math.abs(je2(r3.sizes[l4]) ?? 0) : 0, f4 = o4 > 0 ? h4 / o4 : 1, d4 = Math.max(1.5, s4 * (i4 ? Math.sqrt(f4) : f4)), { fill: p4, color: g4 } = Be2(t2, r3, l4, n2.ctx), m4 = t2.varyColors ? g4 : r3.color;
    a3.push({ x: e3.x(e3.clampX(u4)), y: e3.y(e3.clampY(c5)), r: d4, fill: t2.varyColors ? yt2(m4) : p4, color: m4, stroke: Fe2(r3, l4, mt2(m4, 0.35), Math.max(1, it2(0.75))), label: Jt2(r3.dLbls) ? qe2(r3, l4, c5, null, n2, r3.sizes ? je2(r3.sizes[l4]) : null, r3.cats[l4] ?? String(l4 + 1)) : "", lblSpec: r3 });
  }
  a3.sort((t3, e4) => e4.r - t3.r);
  const l3 = [], c4 = [];
  for (const t3 of a3) if (l3.push(ut2(t3.x - t3.r, t3.y - t3.r, t3.r * 2, t3.r * 2, Xe2(t3.r, t3.r, t3.r), t3.fill, t3.stroke)), t3.label) {
    const e4 = Ze2(t3.x, t3.y, t3.label, t3.lblSpec.dLbls, n2);
    e4 && c4.push(e4);
  }
  return l3.concat(c4);
}
function sn2(t2, e3, n2) {
  var r2;
  const s4 = t2.series.length;
  if (s4 < 3) return [];
  const o4 = s4 >= 4 ? t2.series.slice(s4 - 4) : t2.series, i4 = s4 >= 4 ? o4[0] : null, a3 = o4[s4 >= 4 ? 1 : 0], l3 = o4[s4 >= 4 ? 2 : 1], c4 = o4[s4 >= 4 ? 3 : 2], u4 = vt3(n2.color, "rgb(255,255,255)", 0.15), h4 = Lt2(t2.hiLowLines, u4, 1) ?? { color: u4, width: 1, dash: null }, f4 = Math.max(a3.vals.length, l3.vals.length, c4.vals.length), d4 = lt3(((r2 = t2.upDown) == null ? void 0 : r2.gapWidth) ?? 150, 0, 500) / 100, p4 = Math.max(1.5, Math.min(e3.band / (1 + d4), e3.band * 0.9)), g4 = Math.max(1.5, p4 / 2), m4 = [];
  for (let r3 = 0; r3 < f4; r3++) {
    const s5 = je2(a3.vals[r3]), o5 = je2(l3.vals[r3]), f5 = je2(c4.vals[r3]), d5 = i4 ? je2(i4.vals[r3]) : null;
    if (s5 === null || o5 === null) continue;
    const x4 = e3.cat(r3), b4 = e3.val(e3.clampVal(Math.max(s5, o5))), w4 = e3.val(e3.clampVal(Math.min(s5, o5))), [y4, $3] = e3.pt(x4, b4), [M4, v4] = e3.pt(x4, w4), k3 = dt2(y4, $3, M4, v4, h4);
    if (k3 && m4.push(k3), t2.upDown && d5 !== null && f5 !== null) {
      const n3 = f5 >= d5, r4 = e3.val(e3.clampVal(d5)), s6 = e3.val(e3.clampVal(f5)), [o6, i5] = e3.pt(x4 - p4 / 2, Math.min(r4, s6)), [a4, l4] = e3.pt(x4 + p4 / 2, Math.max(r4, s6)), c5 = { x: Math.min(o6, a4), y: Math.min(i5, l4), w: Math.max(Math.abs(a4 - o6), 1), h: Math.max(Math.abs(l4 - i5), 1) }, h5 = (n3 ? t2.upDown.upFill : t2.upDown.downFill) ?? yt2(n3 ? "rgb(255,255,255)" : u4), g5 = Lt2(n3 ? t2.upDown.upLn : t2.upDown.downLn, u4, 1) ?? { color: u4, width: 1, dash: null };
      m4.push(ut2(c5.x, c5.y, c5.w, c5.h, `M 0 0 L ${at3(c5.w)} 0 L ${at3(c5.w)} ${at3(c5.h)} L 0 ${at3(c5.h)} Z`, h5, g5));
    } else {
      if (d5 !== null) {
        const [t3, n3] = e3.pt(x4, e3.val(e3.clampVal(d5))), r4 = dt2(t3 - (e3.horizontal ? 0 : g4), n3 - (e3.horizontal ? g4 : 0), t3, n3, h4);
        r4 && m4.push(r4);
      }
      if (f5 !== null) {
        const [t3, n3] = e3.pt(x4, e3.val(e3.clampVal(f5))), r4 = dt2(t3, n3, t3 + (e3.horizontal ? 0 : g4), n3 + (e3.horizontal ? g4 : 0), h4);
        r4 && m4.push(r4);
      }
    }
    if (Jt2(c4.dLbls) && f5 !== null) {
      const [t3, s6] = e3.pt(x4, e3.val(e3.clampVal(f5))), o6 = c4.dLbls.size ?? n2.size * 0.92, i5 = Ze2(t3 + p4, s6 - he2(o6) * 0.2, qe2(c4, r3, f5, null, n2), c4.dLbls, n2);
      i5 && m4.push(i5);
    }
  }
  return m4;
}
function on2(t2, e3, n2, r2, s4, o4) {
  const i4 = (n3, r3) => `${at3(t2 + n3 * Math.cos(r3))} ${at3(e3 + n3 * Math.sin(r3))}`, a3 = o4 - s4;
  if (a3 >= De2 - 1e-6) {
    const s5 = Xe2(t2, e3, r2);
    return n2 > 0.01 ? `${s5} ${Xe2(t2, e3, n2)}` : s5;
  }
  const l3 = a3 > Math.PI ? 1 : 0;
  return n2 <= 0.01 ? `M ${at3(t2)} ${at3(e3)} L ${i4(r2, s4)} A ${at3(r2)} ${at3(r2)} 0 ${l3} 1 ${i4(r2, o4)} Z` : `M ${i4(r2, s4)} A ${at3(r2)} ${at3(r2)} 0 ${l3} 1 ${i4(r2, o4)} L ${i4(n2, o4)} A ${at3(n2)} ${at3(n2)} 0 ${l3} 0 ${i4(n2, s4)} Z`;
}
var an2 = 0.55;
var ln2 = 0.17;
var cn2 = (t2, e3, n2, r2, s4) => `${at3(t2 + n2 * Math.cos(s4))} ${at3(e3 + r2 * Math.sin(s4))}`;
function un2(t2, e3, n2, r2, s4, o4) {
  const i4 = (s5) => cn2(t2, e3, n2, r2, s5), a3 = o4 - s4;
  if (a3 >= De2 - 1e-6) return `M ${at3(t2 - n2)} ${at3(e3)} A ${at3(n2)} ${at3(r2)} 0 1 1 ${at3(t2 + n2)} ${at3(e3)} A ${at3(n2)} ${at3(r2)} 0 1 1 ${at3(t2 - n2)} ${at3(e3)} Z`;
  const l3 = a3 > Math.PI ? 1 : 0;
  return `M ${at3(t2)} ${at3(e3)} L ${i4(s4)} A ${at3(n2)} ${at3(r2)} 0 ${l3} 1 ${i4(o4)} Z`;
}
function hn2(t2, e3) {
  const n2 = [];
  for (let r2 = -1; r2 <= 2; r2++) {
    const s4 = Math.max(t2, r2 * De2), o4 = Math.min(e3, r2 * De2 + Math.PI);
    o4 - s4 > 1e-4 && n2.push([s4, o4]);
  }
  return n2;
}
function fn2(t2, e3, n2, r2, s4, o4, i4) {
  const a3 = (s5, o5) => cn2(t2, e3 + o5, n2, r2, s5), l3 = o4 - s4 > Math.PI ? 1 : 0;
  return `M ${a3(s4, 0)} A ${at3(n2)} ${at3(r2)} 0 ${l3} 1 ${a3(o4, 0)} L ${a3(o4, i4)} A ${at3(n2)} ${at3(r2)} 0 ${l3} 0 ${a3(s4, i4)} Z`;
}
function dn2(t2, e3, n2) {
  var r2;
  const s4 = t2.series[0];
  if (!s4) return [];
  const o4 = Jt2(s4.dLbls) ? 0.8 : 0.94, i4 = Math.min(e3.w / 2, e3.h / (2 * an2 + ln2)) * o4;
  if (!(i4 > 0)) return [];
  const a3 = i4 * an2, l3 = i4 * ln2, c4 = e3.x + e3.w / 2, u4 = e3.y + (e3.h - (2 * a3 + l3)) / 2 + a3, h4 = s4.vals.map((t3) => Math.abs(je2(t3) ?? 0)), f4 = h4.reduce((t3, e4) => t3 + e4, 0);
  if (!(f4 > 0)) return [];
  const d4 = [], p4 = [], g4 = [];
  let m4 = (lt3(t2.firstSliceAng, 0, 360) - 90) * (Math.PI / 180);
  for (let e4 = 0; e4 < h4.length; e4++) {
    const o5 = h4[e4] / f4, x4 = o5 * De2;
    if (!(x4 > 0)) continue;
    const b4 = m4 + x4, w4 = m4 + x4 / 2, y4 = lt3(((r2 = s4.dPts.get(e4)) == null ? void 0 : r2.explosion) ?? 0, 0, 400) / 100 * i4 * 0.5, $3 = c4 + Math.cos(w4) * y4, M4 = u4 + Math.sin(w4) * y4 * an2, { fill: v4, color: k3 } = Be2(t2, s4, e4, n2.ctx), E3 = Fe2(s4, e4, null, 0);
    for (const [t3, e5] of hn2(m4, b4)) {
      const n3 = ut2($3 - i4, M4 - a3, i4 * 2, a3 * 2 + l3, fn2(i4, a3, i4, a3, t3, e5, l3), yt2(mt2(k3)), E3);
      d4.push({ el: n3, depth: Math.sin((t3 + e5) / 2) });
    }
    if (p4.push(ut2($3 - i4, M4 - a3, i4 * 2, a3 * 2, un2(i4, a3, i4, a3, m4, b4), v4, E3)), Jt2(s4.dLbls)) {
      const t3 = s4.dLbls.pos === "outEnd" || s4.dLbls.pos === "bestFit", r3 = t3 ? 1.2 : 0.62, c5 = Math.sin(w4), u5 = c5 > 0 ? l3 * (t3 ? 1 : 0.5) : 0, h5 = qe2(s4, e4, je2(s4.vals[e4]) ?? 0, o5, n2), f5 = Ze2($3 + Math.cos(w4) * i4 * r3, M4 + c5 * a3 * r3 + u5, h5, s4.dLbls, n2);
      f5 && g4.push(f5);
    }
    m4 = b4;
  }
  return d4.sort((t3, e4) => t3.depth - e4.depth), d4.map((t3) => t3.el).concat(p4, g4);
}
function pn2(t2, e3, n2) {
  const r2 = [], s4 = [], o4 = t2.kind === "doughnut" ? t2.series : t2.series.slice(0, 1);
  if (!o4.length) return r2;
  const i4 = o4.some((t3) => Jt2(t3.dLbls)), a3 = Math.min(e3.w, e3.h) / 2 * (i4 ? 0.78 : 0.92);
  if (!(a3 > 0)) return r2;
  const l3 = e3.x + e3.w / 2, c4 = e3.y + e3.h / 2, u4 = t2.kind === "doughnut" ? lt3(t2.holeSize, 0, 90) / 100 : 0, h4 = a3 * (1 - u4) / o4.length;
  return o4.forEach((e4, o5) => {
    var i5;
    const f4 = a3 * u4 + o5 * h4, d4 = f4 + h4, p4 = e4.vals.map((t3) => Math.abs(je2(t3) ?? 0)), g4 = p4.reduce((t3, e5) => t3 + e5, 0);
    if (!(g4 > 0)) return;
    let m4 = (lt3(t2.firstSliceAng, 0, 360) - 90) * (Math.PI / 180);
    for (let o6 = 0; o6 < p4.length; o6++) {
      const a4 = p4[o6] / g4, u5 = a4 * De2;
      if (!(u5 > 0)) continue;
      const h5 = m4 + u5 / 2, x4 = lt3(((i5 = e4.dPts.get(o6)) == null ? void 0 : i5.explosion) ?? 0, 0, 400) / 100 * d4 * 0.5, b4 = l3 + Math.cos(h5) * x4, w4 = c4 + Math.sin(h5) * x4, { fill: y4 } = Be2(t2, e4, o6, n2.ctx);
      if (r2.push(ut2(b4 - d4, w4 - d4, d4 * 2, d4 * 2, on2(d4, d4, f4, d4, m4, m4 + u5), y4, Fe2(e4, o6, null, 0))), Jt2(e4.dLbls)) {
        const t3 = e4.dLbls.pos === "outEnd" || e4.dLbls.pos === "bestFit" ? d4 * 1.16 : (f4 + d4) / 2 + (f4 > 0 ? 0 : d4 * 0.12), r3 = qe2(e4, o6, je2(e4.vals[o6]) ?? 0, a4, n2), i6 = Ze2(b4 + Math.cos(h5) * t3, w4 + Math.sin(h5) * t3, r3, e4.dLbls, n2);
        i6 && s4.push(i6);
      }
      m4 += u5;
    }
  }), r2.concat(s4);
}
function gn2(t2, e3) {
  const n2 = t2.ofPie, r2 = /* @__PURE__ */ new Set();
  if (!n2 || !e3.length) return r2;
  const s4 = e3.reduce((t3, e4) => t3 + e4, 0);
  switch (n2.splitType) {
    case "val": {
      const t3 = n2.splitPos ?? 0;
      e3.forEach((e4, n3) => {
        e4 < t3 && r2.add(n3);
      });
      break;
    }
    case "percent": {
      const t3 = (n2.splitPos ?? 0) / 100;
      e3.forEach((e4, n3) => {
        s4 > 0 && e4 / s4 < t3 && r2.add(n3);
      });
      break;
    }
    case "custom":
      for (const t3 of n2.custSplit) t3 >= 0 && t3 < e3.length && r2.add(t3);
      break;
    default: {
      const t3 = lt3(Math.round(n2.splitPos ?? 2), 1, Math.max(e3.length - 1, 1));
      for (let n3 = Math.max(e3.length - t3, 1); n3 < e3.length; n3++) r2.add(n3);
    }
  }
  return r2.size >= e3.length && r2.delete(0), r2;
}
function mn2(t2, e3, n2) {
  const r2 = t2.series[0], s4 = t2.ofPie;
  if (!r2 || !s4) return [];
  const o4 = r2.vals.map((t3) => Math.abs(je2(t3) ?? 0)), i4 = o4.reduce((t3, e4) => t3 + e4, 0);
  if (!(i4 > 0)) return [];
  const a3 = gn2(t2, o4), l3 = o4.map((t3, e4) => e4).filter((t3) => !a3.has(t3)), c4 = o4.map((t3, e4) => e4).filter((t3) => a3.has(t3)), u4 = c4.reduce((t3, e4) => t3 + o4[e4], 0), h4 = Jt2(r2.dLbls), f4 = e3.w * 0.08, d4 = (e3.w - f4) / 2, p4 = Math.max(6, Math.min(d4 * (h4 ? 0.72 : 0.86), e3.h * (h4 ? 0.38 : 0.46))), g4 = Math.max(4, Math.min(p4 * lt3(s4.secondSize, 5, 200) / 100, d4 * 0.86, e3.h * 0.46)), m4 = e3.y + e3.h / 2, x4 = e3.x + d4 / 2, b4 = e3.x + d4 + f4 + d4 / 2, w4 = [], y4 = [], $3 = vt3(n2.color, "rgb(255,255,255)", 0.55), M4 = (t3, e4, s5, o5) => {
    if (!h4) return;
    const a4 = s5 === null ? `\u5176\u4ED6 ${Rt2(u4 / i4, "0%")}` : qe2(r2, s5, o5, i4 > 0 ? o5 / i4 : null, n2), l4 = Ze2(t3, e4, a4, r2.dLbls, n2);
    l4 && y4.push(l4);
  }, v4 = l3.map((t3) => ({ idx: t3, v: o4[t3] }));
  u4 > 0 && v4.push({ idx: null, v: u4 });
  let k3 = (lt3(t2.firstSliceAng, 0, 360) - 90) * (Math.PI / 180), E3 = 0, T3 = 0;
  for (const e4 of v4) {
    const s5 = e4.v / i4 * De2;
    if (!(s5 > 0)) continue;
    const o5 = k3 + s5 / 2, a4 = e4.idx === null ? yt2($3) : Be2(t2, r2, e4.idx, n2.ctx).fill, l4 = e4.idx === null ? null : Fe2(r2, e4.idx, null, 0);
    w4.push(ut2(x4 - p4, m4 - p4, p4 * 2, p4 * 2, on2(p4, p4, 0, p4, k3, k3 + s5), a4, l4));
    const c5 = r2.dLbls.pos === "outEnd" || r2.dLbls.pos === "bestFit" ? p4 * 1.15 : p4 * 0.62;
    M4(x4 + Math.cos(o5) * c5, m4 + Math.sin(o5) * c5, e4.idx, e4.v), e4.idx === null && (E3 = k3, T3 = k3 + s5), k3 += s5;
  }
  const C4 = u4 > 0 ? u4 : 1;
  let S4 = m4 - g4, L4 = m4 + g4, A4 = b4 - g4;
  if (s4.type === "bar") {
    const e4 = Math.max(8, g4 * 0.9), s5 = Math.max(12, g4 * 2);
    S4 = m4 - s5 / 2, L4 = m4 + s5 / 2, A4 = b4 - e4 / 2;
    let i5 = S4;
    for (const a4 of c4) {
      const l4 = o4[a4] / C4 * s5;
      if (!(l4 > 0)) continue;
      const { fill: c5 } = Be2(t2, r2, a4, n2.ctx);
      w4.push(ut2(A4, i5, e4, l4, `M 0 0 L ${at3(e4)} 0 L ${at3(e4)} ${at3(l4)} L 0 ${at3(l4)} Z`, c5, Fe2(r2, a4, null, 0))), M4(A4 + e4 / 2, i5 + l4 / 2, a4, o4[a4]), i5 += l4;
    }
  } else {
    let e4 = -Math.PI / 2;
    for (const s5 of c4) {
      const i5 = o4[s5] / C4 * De2;
      if (!(i5 > 0)) continue;
      const a4 = e4 + i5 / 2, { fill: l4 } = Be2(t2, r2, s5, n2.ctx);
      w4.push(ut2(b4 - g4, m4 - g4, g4 * 2, g4 * 2, on2(g4, g4, 0, g4, e4, e4 + i5), l4, Fe2(r2, s5, null, 0)));
      const c5 = r2.dLbls.pos === "outEnd" || r2.dLbls.pos === "bestFit" ? g4 * 1.18 : g4 * 0.62;
      M4(b4 + Math.cos(a4) * c5, m4 + Math.sin(a4) * c5, s5, o4[s5]), e4 += i5;
    }
  }
  if (s4.serLines !== false && u4 > 0) {
    const t3 = { color: vt3(n2.color, "rgb(255,255,255)", 0.45), width: 1, dash: null }, e4 = [x4 + Math.cos(E3) * p4, m4 + Math.sin(E3) * p4], r3 = [x4 + Math.cos(T3) * p4, m4 + Math.sin(T3) * p4], s5 = e4[1] <= r3[1] ? e4 : r3, o5 = e4[1] <= r3[1] ? r3 : e4, i5 = dt2(s5[0], s5[1], A4, S4, t3), a4 = dt2(o5[0], o5[1], A4, L4, t3);
    i5 && w4.push(i5), a4 && w4.push(a4);
  }
  return w4.concat(y4);
}
var xn2 = ["rgb(49,84,163)", "rgb(84,148,200)", "rgb(160,208,224)", "rgb(224,238,196)", "rgb(253,224,144)", "rgb(244,146,74)", "rgb(200,60,44)"];
function bn2(t2) {
  const e3 = lt3(t2, 0, 1) * (xn2.length - 1), n2 = Math.min(Math.floor(e3), xn2.length - 2);
  return vt3(xn2[n2], xn2[n2 + 1], e3 - n2);
}
function wn2(t2, e3, n2) {
  const r2 = t2.series.length, s4 = t2.series.reduce((t3, e4) => Math.max(t3, e4.vals.length), 0);
  if (!r2 || !s4) return [];
  const o4 = Math.min(e3.rect.w * 0.16, n2.size * 7), i4 = Math.min(e3.rect.w * 0.2, Math.max(n2.size * 4, wt2(yn2(t2.series.map((t3) => t3.name)), n2.size) + n2.size)), a3 = he2(n2.size) * 1.2, l3 = e3.rect.x + i4, c4 = e3.rect.y, u4 = Math.max(e3.rect.w - i4 - o4 - n2.size, 12), h4 = Math.max(e3.rect.h - a3, 12), f4 = u4 / s4, d4 = h4 / r2, p4 = e3.max - e3.min || 1, g4 = [], m4 = { color: "rgba(255,255,255,0.75)", width: 0.75, dash: null };
  t2.series.forEach((r3, o5) => {
    const u5 = c4 + h4 - (o5 + 1) * d4;
    for (let n3 = 0; n3 < s4; n3++) {
      const s5 = je2(r3.vals[n3]);
      if (s5 === null) continue;
      const o6 = (s5 - e3.min) / p4, i5 = lt3(Math.floor(o6 * e3.bands), 0, e3.bands - 1), a4 = t2.bandFills.get(i5) ?? yt2(bn2(e3.bands > 1 ? i5 / (e3.bands - 1) : o6));
      g4.push(ft3({ x: l3 + n3 * f4, y: u5, w: f4, h: d4 }, a4, m4));
    }
    g4.push(bt2(e3.rect.x, u5 + d4 / 2 - a3 / 2, Math.max(i4 - n2.size * 0.4, 8), a3, r3.name, { size: n2.size, color: n2.color, align: "right", anchor: "middle", fonts: n2.fonts }));
  });
  for (let t3 = 0; t3 < s4 && t3 < n2.cats.length; t3++) g4.push(bt2(l3 + t3 * f4, c4 + h4, f4, a3, n2.cats[t3], { size: n2.size, color: n2.color, align: "center", anchor: "middle", fonts: n2.fonts }));
  const x4 = Math.min(n2.size * 1.1, o4 * 0.35), b4 = l3 + u4 + n2.size * 0.6, w4 = h4 * 0.9, y4 = c4 + (h4 - w4) / 2, $3 = w4 / e3.bands;
  for (let r3 = 0; r3 < e3.bands; r3++) {
    const s5 = t2.bandFills.get(r3) ?? yt2(bn2(e3.bands > 1 ? r3 / (e3.bands - 1) : 0.5));
    g4.push(ft3({ x: b4, y: y4 + w4 - (r3 + 1) * $3, w: x4, h: $3 }, s5, null)), g4.push(bt2(b4 + x4 + n2.size * 0.3, y4 + w4 - (r3 + 1) * $3 - he2(n2.size * 0.85) / 2, o4, he2(n2.size * 0.85), Rt2(e3.min + (r3 + 1) * p4 / e3.bands, e3.fmt), { size: n2.size * 0.85, color: n2.color, align: "left", anchor: "middle", fonts: n2.fonts }));
  }
  return g4;
}
var yn2 = (t2) => t2.reduce((t3, e3) => e3.length > t3.length ? e3 : t3, "");
function $n2(t2, e3, n2) {
  const r2 = t2.angle(e3), s4 = t2.radius * t2.norm(n2);
  return [t2.cx + s4 * Math.sin(r2), t2.cy - s4 * Math.cos(r2)];
}
function Mn2(t2, e3, n2, r2, s4, o4) {
  const i4 = [];
  if (t2.count < 3) return i4;
  for (const n3 of e3) {
    const e4 = [];
    for (let r3 = 0; r3 < t2.count; r3++) e4.push($n2(t2, r3, n3));
    const s5 = pt([e4], null, r2);
    s5 && i4.push(s5);
  }
  for (let e4 = 0; e4 < t2.count; e4++) {
    const n3 = t2.angle(e4), r3 = dt2(t2.cx, t2.cy, t2.cx + t2.radius * Math.sin(n3), t2.cy - t2.radius * Math.cos(n3), s4);
    r3 && i4.push(r3);
  }
  const a3 = n2.size * 1.4;
  for (let e4 = 0; e4 < t2.count && e4 < n2.cats.length; e4++) {
    const r3 = t2.angle(e4), s5 = n2.size * 0.9, o5 = t2.cx + (t2.radius + s5) * Math.sin(r3), l3 = t2.cy - (t2.radius + s5) * Math.cos(r3), c4 = Math.sin(r3), u4 = c4 > 0.2 ? "left" : c4 < -0.2 ? "right" : "center", h4 = Math.max(n2.size * 6, 30), f4 = u4 === "left" ? o5 : u4 === "right" ? o5 - h4 : o5 - h4 / 2;
    i4.push(bt2(f4, l3 - a3 / 2, h4, a3, n2.cats[e4], { size: n2.size, color: n2.color, align: u4, fonts: n2.fonts }));
  }
  for (const r3 of e3) {
    if (r3 === 0) continue;
    const [e4, s5] = $n2(t2, 0, r3);
    i4.push(bt2(e4 + 2, s5 - a3 / 2, n2.size * 5, a3, o4(r3), { size: n2.size * 0.9, color: n2.color, align: "left", fonts: n2.fonts }));
  }
  return i4;
}
function vn2(t2, e3, n2) {
  const r2 = [], s4 = [], o4 = t2.radarStyle === "filled", i4 = t2.radarStyle === "marker";
  return t2.series.forEach((a3, l3) => {
    const { fill: c4, color: u4 } = Be2(t2, a3, 0, n2.ctx), h4 = [];
    for (let t3 = 0; t3 < e3.count; t3++) {
      const n3 = a3.vals[t3];
      n3 == null || !Number.isFinite(n3) || h4.push($n2(e3, t3, n3));
    }
    if (h4.length < 2) return;
    const f4 = Lt2(a3.ln, u4, 2) ?? { color: u4, width: 2, dash: null }, d4 = o4 ? c4.type === "solid" ? { type: "solid", color: kn2(c4.color, 0.45) } : c4 : null, p4 = pt([h4], d4, f4);
    if (p4 && r2.push(p4), i4) {
      const e4 = _e2(t2, a3, l3);
      for (const [t3, n3] of h4) {
        const r3 = Ge2(t3, n3, e4, a3, u4);
        r3 && s4.push(r3);
      }
    }
  }), r2.concat(s4);
}
function kn2(t2, e3) {
  const n2 = t2.match(/rgba?\(([^)]+)\)/);
  if (!n2) return t2;
  const r2 = n2[1].split(",").map((t3) => Number(t3.trim()));
  return `rgba(${r2[0] || 0},${r2[1] || 0},${r2[2] || 0},${e3})`;
}
function En2(t2, e3) {
  const n2 = t2.axes.filter((t3) => t3.kind === "val");
  return e3.map((t3) => {
    const e4 = n2.filter((e5) => t3.axIds.includes(e5.id)), r2 = e4.length ? e4 : n2, s4 = r2.find((t4) => t4.pos === "b" || t4.pos === "t") ?? r2[0] ?? ie2("val"), o4 = r2.find((t4) => t4 !== s4) ?? ie2("val");
    return { group: t3, x: s4, y: o4 };
  });
}
function Tn2(t2, e3, n2, r2 = []) {
  const s4 = En2(t2, e3), o4 = (t3, e4 = { lo: 0, hi: 1 }) => {
    const n3 = s4.filter((e5) => e5.x === t3).map((t4) => t4.group), o5 = [...r2.filter((e5) => t3.id && e5.axIds.includes(t3.id)), ...s4.filter((e5) => e5.y === t3).map((t4) => t4.group)], i4 = n3.length ? ve2(n3) : null, a3 = o5.length ? Me2(o5) : null;
    return i4 && a3 ? { lo: Math.min(i4.lo, a3.lo), hi: Math.max(i4.hi, a3.hi) } : i4 ?? a3 ?? e4;
  };
  return { axes: (e4 = []) => {
    const r3 = new Map(e4.map((t3) => [t3.axis, t3])), i4 = (e5, s5, i5) => {
      let a3 = r3.get(e5);
      return a3 || (a3 = Te2(e5, s5 ? e5.pos === "t" ? "t" : "b" : e5.pos === "r" ? "r" : "l", o4(e5), Ee2(s5 ? n2.w : n2.h, t2.textSize), s5 ? null : i5, t2), r3.set(e5, a3)), a3;
    };
    return s4.map(({ group: t3, x: e5, y: n3 }) => {
      var r4;
      return { group: t3, x: i4(e5, true, null), y: i4(n3, false, ((r4 = t3.series.find((t4) => t4.fmt)) == null ? void 0 : r4.fmt) ?? null) };
    });
  }, extent: o4 };
}
function Cn2(t2, e3, n2) {
  const r2 = { ...n2 };
  for (const n3 of e3) {
    const e4 = Pe2(t2, n3.x, n3.y, false);
    for (const t3 of ["l", "r", "t", "b"]) r2[t3] = Math.max(r2[t3], e4[t3]);
  }
  return r2;
}
function Sn2(t2, e3, n2, r2, s4, o4 = /* @__PURE__ */ new Set()) {
  const i4 = [], a3 = [], l3 = (t3) => o4.has(t3.axis) ? { ...t3, axis: { ...t3.axis, del: true, title: null, majorGrid: null } } : (o4.add(t3.axis), t3);
  for (const { group: o5, x: c4, y: u4 } of e3) {
    const e4 = Ae2(n2, c4, u4);
    i4.push(...ze2(t2, { rect: n2, hAxis: l3(c4), vAxis: l3(u4), hPos: (t3) => e4.x(c4.ticks[t3] ?? 0), vPos: (t3) => e4.y(u4.ticks[t3] ?? 0), hEdge: null, hEdgeCount: 0, vEdge: null, vEdgeCount: 0, hLineAt: e4.y(e4.clampY(0)), vLineAt: e4.x(e4.clampX(0)), hWrap: false, hBand: 0, depth: null }, r2)), a3.push(...o5.kind === "bubble" ? rn2(o5, e4, s4) : nn2(o5, e4, s4));
  }
  return { axes: i4, plots: a3 };
}
function Ln2(t2, e3, n2, r2) {
  const s4 = Math.max(Number.isFinite(e3) ? e3 : 0, 1), o4 = Math.max(Number.isFinite(n2) ? n2 : 0, 1);
  try {
    return Un2(t2, s4, o4, r2);
  } catch {
    return [An2(s4, o4, "\u56FE\u8868\u6E32\u67D3\u5931\u8D25")];
  }
}
function An2(t2, e3, n2) {
  return { kind: "unsupported", x: 0, y: 0, w: t2, h: e3, rot: 0, flipH: false, flipV: false, label: n2 };
}
function Pn2(t2, e3, n2, r2) {
  const s4 = [];
  if (e3.length > 0 && e3.every((t3) => t3.kind === "pie" || t3.kind === "doughnut" || t3.kind === "ofPie")) {
    const o5 = e3[0], i4 = o5.series[0];
    if (!i4) return s4;
    const a3 = Math.max(i4.vals.length, n2.length);
    for (let e4 = 0; e4 < a3; e4++) {
      if (t2.legendDeleted.has(e4)) continue;
      const { fill: a4, color: l3 } = Be2(o5, i4, e4, r2);
      s4.push({ label: n2[e4] ?? String(e4 + 1), fill: a4, color: l3, stroke: null, marker: null, line: false });
    }
    return s4;
  }
  let o4 = 0;
  for (const n3 of e3) n3.series.forEach((e4, r3) => {
    const i4 = o4++;
    if (t2.legendDeleted.has(i4)) return;
    const a3 = n3.kind === "line" || n3.kind === "scatter";
    s4.push({ label: e4.name, fill: a3 ? yt2(e4.color) : e4.fill ?? yt2(e4.color), color: e4.color, stroke: a3 ? Lt2(e4.ln, e4.color, it2(2)) : null, marker: a3 ? { sym: _e2(n3, e4, r3), s: e4 } : null, line: a3 });
  });
  return s4;
}
function In2(t2, e3, n2, r2) {
  const s4 = [];
  if (!t2.legendPos || !e3.length) return { els: s4, region: n2 };
  const o4 = t2.textSize, i4 = o4 * 1.2, a3 = o4 * 0.72, l3 = o4 * 1.75, c4 = o4 * 0.35, u4 = o4 * 0.9, h4 = e3.map((t3) => i4 + c4 + wt2(t3.label, o4) + u4), f4 = t2.legendPos, d4 = f4 === "t" || f4 === "b";
  let p4, g4 = n2;
  const m4 = (e4, n3, u5, h5) => {
    const f5 = u5 + l3 / 2;
    if (e4.line) {
      const t3 = dt2(n3, f5, n3 + i4, f5, e4.stroke ?? { color: e4.color, width: it2(2), dash: null });
      if (t3 && s4.push(t3), e4.marker && e4.marker.sym !== "none") {
        const t4 = Ge2(n3 + i4 / 2, f5, e4.marker.sym, e4.marker.s, e4.color);
        t4 && s4.push(t4);
      }
    } else s4.push(ft3({ x: n3, y: f5 - a3 / 2, w: i4, h: a3 }, e4.fill, null));
    s4.push(bt2(n3 + i4 + c4, u5, h5, l3, e4.label, { size: o4, color: t2.textColor, align: "left", anchor: "middle", fonts: r2 }));
  };
  if (d4) {
    const r3 = n2.w, s5 = [];
    let a4 = [], d5 = 0;
    for (let t3 = 0; t3 < e3.length; t3++) {
      const e4 = Math.min(h4[t3], r3);
      a4.length && d5 + e4 > r3 && (s5.push(a4), a4 = [], d5 = 0), a4.push(t3), d5 += e4;
    }
    a4.length && s5.push(a4);
    const x4 = Math.max(1, Math.floor(n2.h * 0.4 / l3)), b4 = s5.slice(0, x4), w4 = b4.length * l3;
    p4 = f4 === "t" ? { x: n2.x, y: n2.y, w: n2.w, h: w4 } : { x: n2.x, y: n2.y + n2.h - w4, w: n2.w, h: w4 }, t2.legendOverlay || (g4 = f4 === "t" ? { x: n2.x, y: n2.y + w4, w: n2.w, h: n2.h - w4 } : { x: n2.x, y: n2.y, w: n2.w, h: n2.h - w4 }), b4.forEach((t3, n3) => {
      const s6 = t3.reduce((t4, e4) => t4 + Math.min(h4[e4], r3), 0);
      let a5 = p4.x + Math.max((p4.w - s6) / 2, 0);
      const f5 = p4.y + n3 * l3;
      for (const n4 of t3) {
        const t4 = Math.min(h4[n4], r3);
        m4(e3[n4], a5, f5, Math.max(t4 - i4 - c4 - u4 * 0.5, o4)), a5 += t4;
      }
    });
  } else {
    const r3 = Math.max(1, Math.floor(n2.h / l3)), s5 = Math.max(1, Math.ceil(e3.length / r3)), a4 = h4.reduce((t3, e4) => e4 > t3 ? e4 : t3, 0), u5 = Math.min(a4 * s5, n2.w * 0.45), d5 = u5 / s5, x4 = Math.min(r3, Math.ceil(e3.length / s5)), b4 = f4 !== "l";
    p4 = { x: b4 ? n2.x + n2.w - u5 : n2.x, y: n2.y, w: u5, h: n2.h }, t2.legendOverlay || (g4 = b4 ? { x: n2.x, y: n2.y, w: n2.w - u5, h: n2.h } : { x: n2.x + u5, y: n2.y, w: n2.w - u5, h: n2.h });
    const w4 = x4 * l3, y4 = f4 === "tr" ? p4.y : p4.y + Math.max((p4.h - w4) / 2, 0);
    for (let t3 = 0; t3 < e3.length && t3 < x4 * s5; t3++) {
      const n3 = Math.floor(t3 / x4), r4 = t3 % x4;
      m4(e3[t3], p4.x + n3 * d5, y4 + r4 * l3, Math.max(d5 - i4 - c4 - o4 * 0.2, o4));
    }
  }
  return { els: s4, region: g4 };
}
function On2(t2) {
  let e3 = [], n2 = 0;
  for (const r3 of t2) for (const t3 of r3.series) t3.vals.length > n2 && (n2 = t3.vals.length), t3.cats.length > e3.length && (e3 = t3.cats);
  const r2 = Math.max(n2, e3.length), s4 = [];
  for (let t3 = 0; t3 < r2; t3++) s4.push(e3[t3] ?? String(t3 + 1));
  return s4;
}
function zn2(t2, e3, n2, r2) {
  if (!e3) return t2;
  const s4 = e3.x !== null ? e3.x * n2 : t2.x, o4 = e3.y !== null ? e3.y * r2 : t2.y, i4 = e3.w !== null ? e3.w * n2 : t2.w, a3 = e3.h !== null ? e3.h * r2 : t2.h;
  return !(i4 > 4) || !(a3 > 4) || !Number.isFinite(s4) || !Number.isFinite(o4) ? t2 : { x: s4, y: o4, w: i4, h: a3 };
}
var Rn2 = (t2) => {
  for (const e3 of t2) for (const t3 of e3.series) if (t3.fmt) return t3.fmt;
  return null;
};
function Un2(t2, e3, n2, r2) {
  const s4 = ue2(t2, r2.ctx), o4 = [r2.fonts.minor.latin, r2.fonts.minor.ea].filter((t3) => !!t3), i4 = [], a3 = s4.fill ?? yt2("rgb(255,255,255)"), l3 = Lt2(s4.ln, null, 0);
  (a3.type !== "none" || l3) && i4.push(ft3({ x: 0, y: 0, w: e3, h: n2 }, a3.type === "none" ? null : a3, l3));
  const c4 = s4.groups.filter((t3) => t3.series.length > 0), u4 = c4.filter((t3) => t3.kind === "bar" || t3.kind === "line" || t3.kind === "area" || t3.kind === "stock"), h4 = c4.filter((t3) => Ft2(t3.kind)), f4 = c4.filter((t3) => t3.kind === "pie" || t3.kind === "doughnut"), d4 = c4.filter((t3) => t3.kind === "ofPie"), p4 = c4.filter((t3) => t3.kind === "radar"), g4 = c4.filter((t3) => t3.kind === "surface"), m4 = s4.unsupported.slice();
  if (!u4.length && !h4.length && !f4.length && !p4.length && !d4.length && !g4.length) {
    const t3 = m4.length ? Array.from(new Set(m4)).join("/") : "\u672A\u77E5\u7C7B\u578B";
    return i4.concat([An2(e3, n2, `\u4E0D\u652F\u6301\u7684\u56FE\u8868\u7C7B\u578B: ${t3}`)]);
  }
  const x4 = Math.min(s4.textSize * 0.55, Math.min(e3, n2) * 0.06);
  let b4 = { x: x4, y: x4, w: Math.max(e3 - x4 * 2, 8), h: Math.max(n2 - x4 * 2, 8) };
  if (s4.title) {
    const t3 = s4.titleSize, e4 = Math.min(he2(t3) + s4.textSize * 0.5, b4.h * 0.3);
    i4.push(bt2(b4.x, b4.y, b4.w, e4, s4.title, { size: t3, bold: s4.titleBold, color: s4.titleColor ?? s4.textColor, align: "center", anchor: "middle", fonts: o4 })), b4 = { x: b4.x, y: b4.y + e4, w: b4.w, h: Math.max(b4.h - e4, 8) };
  }
  const w4 = u4.length ? c4.filter((t3) => u4.includes(t3) || h4.includes(t3)) : h4.length ? h4 : p4.length ? p4 : g4.length ? g4 : d4.length ? d4 : f4, y4 = On2(u4.length ? u4 : w4), $3 = g4.length && g4.length === c4.length ? [] : Pn2(s4, w4, y4, r2.ctx), M4 = In2(s4, $3, b4, o4);
  b4 = M4.region, s4.plotLayout && s4.plotLayout.target !== "inner" && (b4 = zn2(b4, s4.plotLayout, e3, n2));
  const v4 = { ctx: r2.ctx, fonts: o4, size: s4.textSize, color: s4.textColor, cats: y4 }, k3 = [];
  if (u4.length ? k3.push(...Bn2(s4, u4, y4, b4, e3, n2, o4, v4, h4)) : h4.length ? k3.push(...Fn2(s4, h4, b4, e3, n2, o4, v4)) : p4.length ? k3.push(...Vn2(s4, p4, b4, e3, n2, v4)) : g4.length ? k3.push(...jn2(s4, g4, b4, e3, n2, v4)) : d4.length ? k3.push(...Hn2(s4, d4, b4, e3, n2, v4)) : k3.push(...Yn2(s4, f4, b4, e3, n2, v4)), i4.push(...k3, ...M4.els), m4.length) {
    const t3 = Array.from(new Set(m4)).join("/"), e4 = s4.textSize * 0.9;
    i4.push(bt2(b4.x, b4.y + b4.h - he2(e4), b4.w, he2(e4), `\u672A\u6E32\u67D3: ${t3}`, { size: e4, color: s4.textColor, align: "right", anchor: "middle", fonts: o4 }));
  }
  return i4;
}
function Dn2(t2, e3) {
  return t2.crosses === "max" ? true : e3 ? t2.pos === "t" : t2.pos === "r";
}
function Nn2(t2, e3, n2) {
  const r2 = /* @__PURE__ */ new Map();
  for (const e4 of t2.axes) e4.id && r2.set(e4.id, e4);
  const s4 = t2.axes.find((t3) => t3.kind === "cat" || t3.kind === "date") ?? ie2("cat"), o4 = t2.axes.find((t3) => t3.kind === "val") ?? ie2("val"), i4 = [], a3 = /* @__PURE__ */ new Map();
  for (const t3 of e3) {
    let e4 = null, n3 = null;
    for (const s5 of t3.axIds) {
      const t4 = r2.get(s5);
      t4 && (t4.kind === "val" ? n3 || (n3 = t4) : (t4.kind === "cat" || t4.kind === "date") && (e4 || (e4 = t4)));
    }
    const l4 = n3 && n3.id || "v#";
    let c5 = a3.get(l4);
    c5 || (c5 = { cat: e4 ?? s4, val: n3 ?? o4, groups: [] }, a3.set(l4, c5), i4.push(l4)), c5.groups.push(t3);
  }
  if (!i4.length) return { primary: { cat: s4, val: o4, groups: e3 }, secondary: null };
  if (i4.length === 1) return { primary: a3.get(i4[0]), secondary: null };
  let l3 = i4.findIndex((t3) => !Dn2(a3.get(t3).val, n2));
  l3 < 0 && (l3 = 0);
  const c4 = a3.get(i4[l3]), u4 = i4.filter((t3, e4) => e4 !== l3).map((t3) => a3.get(t3)), h4 = { cat: u4[0].cat, val: u4[0].val, groups: u4.flatMap((t3) => t3.groups) };
  return { primary: c4, secondary: h4 };
}
function Bn2(t2, e3, n2, r2, s4, o4, i4, a3, l3) {
  const c4 = e3.some((t3) => t3.kind === "bar" && t3.barDir === "bar"), { primary: u4, secondary: h4 } = Nn2(t2, e3, c4), f4 = u4.cat, d4 = c4 ? f4.pos === "r" ? "r" : "l" : f4.pos === "t" ? "t" : "b", p4 = c4 ? u4.val.pos === "t" ? "t" : "b" : u4.val.pos === "r" ? "r" : "l", g4 = c4 ? p4 === "b" ? "t" : "b" : p4 === "l" ? "r" : "l", m4 = c4 ? r2.w : r2.h, x4 = Ee2(m4, t2.textSize), b4 = Tn2(t2, l3, r2, e3), w4 = (e4, n3) => {
    const r3 = e4.groups.some((t3) => t3.grouping === "percentStacked") ? "0%" : Rn2(e4.groups);
    return Te2(e4.val, n3, b4.extent(e4.val, Me2(e4.groups)), x4, r3, t2);
  }, y4 = w4(u4, p4), $3 = h4 ? w4(h4, g4) : null, M4 = e3.some((t3) => t3.kind === "bar"), v4 = e3.every((t3) => t3.kind === "area"), k3 = M4 ? true : v4 ? false : f4.crossBetween !== "midCat", E3 = Ce2(f4, d4, n2, k3, t2), T3 = c4 ? y4 : E3, C4 = c4 ? E3 : y4, S4 = b4.axes($3 ? [y4, $3] : [y4]);
  let L4 = Ie2(r2, Cn2(t2, S4, Pe2(t2, T3, C4, false, $3))), A4 = false;
  if (!c4 && n2.length) {
    const e4 = k3 ? L4.w / Math.max(n2.length, 1) : L4.w / Math.max(n2.length - 1, 1);
    A4 = Ue2(E3, e4), A4 && (L4 = Ie2(r2, Cn2(t2, S4, Pe2(t2, T3, C4, true, $3))));
  }
  t2.plotLayout && t2.plotLayout.target === "inner" && (L4 = zn2(L4, t2.plotLayout, s4, o4));
  const P4 = e3.some((t3) => t3.is3D);
  let I4 = null;
  P4 && (I4 = xe2(t2.view3D, L4), L4 = be2(L4, I4));
  const O3 = Se2(L4, c4, E3, y4), z3 = $3 ? Se2(L4, c4, E3, $3) : null, R4 = k3 ? n2.length + 1 : n2.length, U3 = c4 ? { rect: L4, hAxis: y4, vAxis: E3, hPos: (t3) => O3.val(y4.ticks[t3] ?? 0), vPos: (t3) => O3.cat(t3), hEdge: null, hEdgeCount: 0, vEdge: (t3) => O3.edge(t3), vEdgeCount: R4, hLineAt: p4 === "t" ? L4.y : L4.y + L4.h, vLineAt: O3.zero, hWrap: false, hBand: 0, depth: I4 } : { rect: L4, hAxis: E3, vAxis: y4, hPos: (t3) => O3.cat(t3), vPos: (t3) => O3.val(y4.ticks[t3] ?? 0), hEdge: (t3) => O3.edge(t3), hEdgeCount: R4, vEdge: null, vEdgeCount: 0, hLineAt: O3.zero, vLineAt: p4 === "r" ? L4.x + L4.w : L4.x, hWrap: A4, hBand: O3.band, depth: I4 }, D4 = [];
  if (D4.push(..._n2(t2, L4)), I4 && D4.push(...we2(L4, I4, t2.textColor)), D4.push(...ze2(t2, U3, i4)), $3 && z3) {
    const e4 = g4 === "l" || g4 === "r";
    D4.push(...Re2(t2, { rect: L4, view: $3, pos: (t3) => z3.val($3.ticks[t3] ?? 0), at: e4 ? g4 === "r" ? L4.x + L4.w : L4.x : g4 === "t" ? L4.y : L4.y + L4.h, grid: !y4.axis.majorGrid && !!$3.axis.majorGrid, depth: I4 }, i4));
  }
  const N3 = (t3) => {
    const e4 = /* @__PURE__ */ new Map();
    let n3 = 0;
    for (const r3 of t3) e4.set(r3, n3), n3 += ee2(r3) ? 1 : r3.series.length;
    return (t4) => ({ base: e4.get(t4) ?? 0, total: Math.max(n3, 1) });
  }, B4 = (t3, e4) => {
    const n3 = t3.groups.filter((t4) => t4.kind === "bar"), r3 = N3(n3);
    for (const n4 of t3.groups) n4.kind === "area" && D4.push(...en2(n4, e4, a3));
    for (const t4 of n3) D4.push(...Je2(t4, e4, r3(t4), a3, t4.is3D ? I4 : null));
    for (const n4 of t3.groups) n4.kind === "line" && D4.push(...tn2(n4, e4, a3));
    for (const n4 of t3.groups) n4.kind === "stock" && D4.push(...sn2(n4, e4, a3));
  }, F3 = Sn2(t2, S4, L4, i4, a3, /* @__PURE__ */ new Set([u4.cat, u4.val, ...h4 ? [h4.val] : []]));
  return D4.push(...F3.axes), B4(u4, O3), h4 && z3 && B4(h4, z3), D4.push(...F3.plots), D4;
}
function Fn2(t2, e3, n2, r2, s4, o4, i4) {
  const a3 = Tn2(t2, e3, n2).axes();
  let l3 = Ie2(n2, Cn2(t2, a3, { l: 0, r: 0, t: 0, b: 0 }));
  t2.plotLayout && t2.plotLayout.target === "inner" && (l3 = zn2(l3, t2.plotLayout, r2, s4));
  const c4 = Sn2(t2, a3, l3, o4, i4);
  return [..._n2(t2, l3), ...c4.axes, ...c4.plots];
}
function jn2(t2, e3, n2, r2, s4, o4) {
  let i4 = n2;
  t2.plotLayout && (i4 = zn2(i4, t2.plotLayout, r2, s4));
  const a3 = Me2(e3), l3 = Dt2(a3.lo, a3.hi, Ee2(i4.h, t2.textSize)), c4 = Math.max(2, Math.min(Math.round((l3.max - l3.min) / l3.step), 12)), u4 = t2.axes.find((t3) => t3.kind === "val"), h4 = { rect: i4, min: l3.min, max: l3.max, bands: c4, fmt: (u4 == null ? void 0 : u4.fmt) ?? Rn2(e3) }, f4 = _n2(t2, i4);
  for (const t3 of e3) f4.push(...wn2(t3, h4, o4));
  return f4;
}
function Hn2(t2, e3, n2, r2, s4, o4) {
  let i4 = n2;
  t2.plotLayout && (i4 = zn2(i4, t2.plotLayout, r2, s4));
  const a3 = _n2(t2, i4);
  for (const t3 of e3) a3.push(...mn2(t3, i4, o4));
  return a3;
}
function Vn2(t2, e3, n2, r2, s4, o4) {
  var i4, a3;
  let l3 = n2;
  t2.plotLayout && (l3 = zn2(l3, t2.plotLayout, r2, s4));
  const c4 = On2(e3), u4 = Math.max(c4.length, ((a3 = (i4 = e3[0]) == null ? void 0 : i4.series[0]) == null ? void 0 : a3.vals.length) ?? 0);
  if (u4 < 3) return [An2(r2, s4, "\u96F7\u8FBE\u56FE\u81F3\u5C11\u9700\u8981 3 \u4E2A\u7C7B\u76EE")];
  const h4 = Me2(e3), f4 = Dt2(Math.min(h4.lo, 0), h4.hi, Ee2(Math.min(l3.w, l3.h), t2.textSize)), d4 = f4.max - f4.min || 1, p4 = t2.textSize * 4, g4 = Math.max(Math.min(l3.w, l3.h) - p4, 24), m4 = l3.x + l3.w / 2, x4 = l3.y + l3.h / 2, b4 = { cx: m4, cy: x4, radius: g4 / 2, norm: (t3) => Wn2((t3 - f4.min) / d4), angle: (t3) => t3 * Math.PI * 2 / u4, count: u4 }, w4 = [];
  for (let t3 = f4.min; t3 <= f4.max + f4.step * 0.5; t3 += f4.step) w4.push(Xn2(t3));
  const y4 = t2.axes.find((t3) => t3.kind === "val"), $3 = t2.axes.find((t3) => t3.kind === "cat"), M4 = vt3(t2.textColor, "rgb(255,255,255)", 0.72), v4 = vt3(t2.textColor, "rgb(255,255,255)", 0.55), k3 = Lt2((y4 == null ? void 0 : y4.majorGrid) ?? null, M4, 1) ?? { color: M4, width: 1, dash: null }, E3 = Lt2(($3 == null ? void 0 : $3.line) ?? null, v4, 1) ?? { color: v4, width: 1, dash: null }, T3 = (y4 == null ? void 0 : y4.fmt) ?? null, C4 = Mn2(b4, w4, o4, k3, E3, (t3) => Rt2(t3, T3));
  for (const t3 of e3) C4.push(...vn2(t3, b4, o4));
  return C4;
}
var Wn2 = (t2) => Number.isFinite(t2) ? Math.max(0, Math.min(1, t2)) : 0;
var Xn2 = (t2) => Number(t2.toPrecision(12));
function Yn2(t2, e3, n2, r2, s4, o4) {
  let i4 = n2;
  t2.plotLayout && (i4 = zn2(i4, t2.plotLayout, r2, s4));
  const a3 = Math.max(Math.min(i4.w, i4.h), 8), l3 = { x: i4.x + (i4.w - a3) / 2, y: i4.y + (i4.h - a3) / 2, w: a3, h: a3 }, c4 = [];
  c4.push(..._n2(t2, i4));
  for (const t3 of e3) c4.push(...t3.is3D ? dn2(t3, i4, o4) : pn2(t3, l3, o4));
  return c4;
}
function _n2(t2, e3) {
  const n2 = Lt2(t2.plotLn, null, 0), r2 = t2.plotFill && t2.plotFill.type !== "none" ? t2.plotFill : null;
  return !r2 && !n2 ? [] : [ft3(e3, r2, n2)];
}
var Gn2 = 0;
var qn2 = (t2) => `${t2}${(++Gn2).toString(36)}`;
var Zn2 = (t2) => Number.isFinite(t2) ? String(Math.round(t2 * 100) / 100) : "0";
var Kn2 = (t2) => t2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
var Jn2 = [1, 0, 0, 1, 0, 0];
function Qn2(t2, e3) {
  const [n2, r2, s4, o4, i4, a3] = t2, [l3, c4, u4, h4, f4, d4] = e3;
  return [l3 * n2 + u4 * r2, c4 * n2 + h4 * r2, l3 * s4 + u4 * o4, c4 * s4 + h4 * o4, l3 * i4 + u4 * a3 + f4, c4 * i4 + h4 * a3 + d4];
}
function tr2(t2, e3, n2) {
  return { x: t2[0] * e3 + t2[2] * n2 + t2[4], y: t2[1] * e3 + t2[3] * n2 + t2[5] };
}
function er2(t2) {
  const e3 = Math.abs(t2[0] * t2[3] - t2[1] * t2[2]), n2 = Math.sqrt(e3);
  return Number.isFinite(n2) && n2 > 1e-9 ? n2 : 1;
}
function nr2(t2) {
  const e3 = Math.hypot(t2[2], t2[3]);
  return Number.isFinite(e3) && e3 > 1e-9 ? e3 : 1;
}
var rr2 = class {
  constructor(t2, e3 = 0, n2) {
    this.p = 0, this.dv = new DataView(t2.buffer, t2.byteOffset, t2.byteLength), this.end = Math.min(n2 ?? t2.length, t2.length), this.p = e3;
  }
  has(t2) {
    return this.p + t2 <= this.end;
  }
  get left() {
    return Math.max(0, this.end - this.p);
  }
  skip(t2) {
    this.p += t2;
  }
  seek(t2) {
    this.p = t2;
  }
  u8() {
    return this.has(1) ? this.dv.getUint8(this.p++) : (this.p += 1, 0);
  }
  i16() {
    if (!this.has(2)) return this.p += 2, 0;
    const t2 = this.dv.getInt16(this.p, true);
    return this.p += 2, t2;
  }
  u16() {
    if (!this.has(2)) return this.p += 2, 0;
    const t2 = this.dv.getUint16(this.p, true);
    return this.p += 2, t2;
  }
  i32() {
    if (!this.has(4)) return this.p += 4, 0;
    const t2 = this.dv.getInt32(this.p, true);
    return this.p += 4, t2;
  }
  u32() {
    if (!this.has(4)) return this.p += 4, 0;
    const t2 = this.dv.getUint32(this.p, true);
    return this.p += 4, t2;
  }
  f32() {
    if (!this.has(4)) return this.p += 4, 0;
    const t2 = this.dv.getFloat32(this.p, true);
    return this.p += 4, Number.isFinite(t2) ? t2 : 0;
  }
  color() {
    const t2 = this.u32();
    return or2(t2 & 255, t2 >> 8 & 255, t2 >> 16 & 255);
  }
  ptL() {
    return { x: this.i32(), y: this.i32() };
  }
  pt16() {
    return { x: this.i16(), y: this.i16() };
  }
  rectL() {
    return { l: this.i32(), t: this.i32(), r: this.i32(), b: this.i32() };
  }
  utf16(t2) {
    let e3 = "";
    const n2 = t2 >> 1;
    for (let t3 = 0; t3 < n2; t3++) {
      const r2 = this.u16();
      if (r2 === 0) {
        this.skip((n2 - t3 - 1) * 2);
        break;
      }
      e3 += String.fromCharCode(r2);
    }
    return e3;
  }
  ansi(t2) {
    let e3 = "";
    for (let n2 = 0; n2 < t2; n2++) {
      const r2 = this.u8();
      if (r2 === 0) {
        this.skip(t2 - n2 - 1);
        break;
      }
      e3 += String.fromCharCode(r2);
    }
    return e3;
  }
  get pos() {
    return this.p;
  }
  get limit() {
    return this.end;
  }
  i8() {
    return this.u8() << 24 >> 24;
  }
  i16be() {
    if (!this.has(2)) return this.p += 2, 0;
    const t2 = this.dv.getInt16(this.p, false);
    return this.p += 2, t2;
  }
  u16be() {
    if (!this.has(2)) return this.p += 2, 0;
    const t2 = this.dv.getUint16(this.p, false);
    return this.p += 2, t2;
  }
  u32be() {
    if (!this.has(4)) return this.p += 4, 0;
    const t2 = this.dv.getUint32(this.p, false);
    return this.p += 4, t2;
  }
  take(t2) {
    const e3 = Math.max(0, Math.min(t2, this.end - this.p)), n2 = new Uint8Array(this.dv.buffer, this.dv.byteOffset + this.p, e3);
    return this.p += t2, n2;
  }
};
var sr2 = (t2) => (t2 & 255).toString(16).padStart(2, "0");
var or2 = (t2, e3, n2) => `#${sr2(t2)}${sr2(e3)}${sr2(n2)}`;
var ir2 = 1;
var ar2 = 5;
var lr2 = 1;
var cr2 = 0;
var ur2 = 1;
var hr2 = 2;
var fr2 = 3;
var dr2 = 4;
var pr2 = 5;
var gr2 = 0;
var mr2 = 1;
var xr2 = 2;
var br2 = 3;
var wr2 = 5;
var yr2 = () => ({ kind: "pen", style: cr2, width: 1, color: "#000000", cap: 0, join: 0 });
var $r2 = () => ({ kind: "brush", style: gr2, color: "#ffffff", hatch: 0, href: null });
var Mr2 = () => ({ kind: "font", height: -12, escapement: 0, weight: 400, italic: false, underline: false, strike: false, face: "Arial", charset: 0 });
var vr2 = () => ({ ...yr2(), style: pr2 });
var kr2 = (t2) => ({ kind: "brush", style: gr2, color: t2, hatch: 0, href: null });
function Er2(t2) {
  switch (t2 & 255) {
    case 0:
      return kr2("#ffffff");
    case 1:
      return kr2("#c0c0c0");
    case 2:
      return kr2("#808080");
    case 3:
      return kr2("#404040");
    case 4:
      return kr2("#000000");
    case 5:
      return { ...$r2(), style: mr2 };
    case 6:
      return { ...yr2(), color: "#ffffff" };
    case 7:
      return yr2();
    case 8:
      return vr2();
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 16:
    case 17:
      return Mr2();
    case 18:
      return kr2("#ffffff");
    case 19:
      return yr2();
    default:
      return null;
  }
}
var Tr2 = 1;
var Cr2 = 7;
var Sr2 = 8;
function Lr2(t2) {
  return { ...t2, pen: { ...t2.pen }, brush: { ...t2.brush }, font: { ...t2.font }, world: [...t2.world], winOrg: { ...t2.winOrg }, winExt: { ...t2.winExt }, vpOrg: { ...t2.vpOrg }, vpExt: { ...t2.vpExt }, pos: { ...t2.pos } };
}
var Ar2 = { 2: 0.1, 3: 0.01, 4: 25.4 / 100, 5: 25.4 / 1e3, 6: 25.4 / 1440 };
var Pr2 = class {
  constructor() {
    this.els = [], this.defs = [], this.cache = /* @__PURE__ */ new Map(), this.count = 0;
  }
  add(t2) {
    this.els.push(t2), this.count++;
  }
  def(t2, e3, n2) {
    const r2 = this.cache.get(t2);
    if (r2 !== void 0) return r2;
    const s4 = qn2(e3);
    return this.defs.push(n2(s4)), this.cache.set(t2, s4), s4;
  }
  render(t2, e3, n2) {
    const r2 = Math.max(1, t2.r - t2.l), s4 = Math.max(1, t2.b - t2.t), o4 = this.defs.length ? `<defs>${this.defs.join("")}</defs>` : "";
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${Zn2(e3)}" height="${Zn2(n2)}" viewBox="${Zn2(t2.l)} ${Zn2(t2.t)} ${Zn2(r2)} ${Zn2(s4)}" preserveAspectRatio="xMidYMid meet">` + o4 + this.els.join("") + "</svg>";
  }
};
var Ir2 = class {
  constructor() {
    this.d = [], this.started = false;
  }
  get empty() {
    return this.d.length === 0;
  }
  get data() {
    return this.d.join("");
  }
  clear() {
    this.d = [], this.started = false;
  }
  move(t2) {
    Or2(t2) && (this.d.push(`M${Zn2(t2.x)} ${Zn2(t2.y)}`), this.started = true);
  }
  line(t2) {
    Or2(t2) && (this.started ? this.d.push(`L${Zn2(t2.x)} ${Zn2(t2.y)}`) : this.move(t2));
  }
  cubic(t2, e3, n2) {
    !Or2(t2) || !Or2(e3) || !Or2(n2) || (this.started || this.move(t2), this.d.push(`C${Zn2(t2.x)} ${Zn2(t2.y)} ${Zn2(e3.x)} ${Zn2(e3.y)} ${Zn2(n2.x)} ${Zn2(n2.y)}`));
  }
  close() {
    this.started && this.d.push("Z");
  }
};
var Or2 = (t2) => Number.isFinite(t2.x) && Number.isFinite(t2.y);
var zr2 = 0.5522847498307936;
function Rr2(t2, e3, n2, r2, s4, o4, i4) {
  const a3 = [], l3 = o4 - s4, c4 = Math.max(1, Math.ceil(Math.abs(l3) / (Math.PI / 2))), u4 = l3 / c4, h4 = zr2 * Math.abs(u4) / (Math.PI / 2) * Math.sign(u4);
  let f4 = s4;
  for (let s5 = 0; s5 < c4; s5++) {
    const s6 = f4 + u4, o5 = Math.cos(f4), l4 = Math.sin(f4), c5 = Math.cos(s6), d4 = Math.sin(s6), p4 = { x: t2 + n2 * (o5 - h4 * l4), y: e3 + r2 * (l4 + h4 * o5) }, g4 = { x: t2 + n2 * (c5 + h4 * d4), y: e3 + r2 * (d4 - h4 * c5) }, m4 = { x: t2 + n2 * c5, y: e3 + r2 * d4 };
    a3.push([tr2(i4, p4.x, p4.y), tr2(i4, g4.x, g4.y), tr2(i4, m4.x, m4.y)]), f4 = s6;
  }
  return a3;
}
var Ur2 = (t2, e3, n2, r2, s4, o4) => tr2(o4, t2 + n2 * Math.cos(s4), e3 + r2 * Math.sin(s4));
function Dr2(t2, e3, n2, r2, s4, o4) {
  const i4 = n2 !== 0 ? (s4 - t2) / n2 : 0, a3 = r2 !== 0 ? (o4 - e3) / r2 : 0;
  return i4 === 0 && a3 === 0 ? 0 : Math.atan2(a3, i4);
}
var Nr2 = class {
  constructor(t2) {
    this.stack = [], this.objs = [], this.svg = new Pr2(), this.path = new Ir2(), this.inPath = false, this.dev = t2, this.dc = { pen: yr2(), brush: $r2(), font: Mr2(), textColor: "#000000", bkColor: "#ffffff", bkMode: 2, polyFill: 1, textAlign: 0, world: [...Jn2], mapMode: Tr2, winOrg: { x: 0, y: 0 }, winExt: { x: 1, y: 1 }, vpOrg: { x: 0, y: 0 }, vpExt: { x: 1, y: 1 }, clip: null, pos: { x: 0, y: 0 } };
  }
  get drawn() {
    return this.svg.count;
  }
  xf() {
    const t2 = this.dc;
    let e3, n2;
    const r2 = Ar2[t2.mapMode];
    if (t2.mapMode === Tr2) e3 = 1, n2 = 1;
    else if (r2 !== void 0) e3 = r2 * this.dev.pxPerMmX, n2 = -r2 * this.dev.pxPerMmY;
    else if (e3 = t2.winExt.x !== 0 ? t2.vpExt.x / t2.winExt.x : 1, n2 = t2.winExt.y !== 0 ? t2.vpExt.y / t2.winExt.y : 1, t2.mapMode === Cr2) {
      const t3 = Math.min(Math.abs(e3), Math.abs(n2));
      e3 = t3 * Math.sign(e3 || 1), n2 = t3 * Math.sign(n2 || 1);
    }
    (!Number.isFinite(e3) || e3 === 0) && (e3 = 1), (!Number.isFinite(n2) || n2 === 0) && (n2 = 1);
    const s4 = [e3, 0, 0, n2, t2.vpOrg.x - t2.winOrg.x * e3, t2.vpOrg.y - t2.winOrg.y * n2];
    return Qn2(t2.world, s4);
  }
  tp(t2, e3) {
    return tr2(this.xf(), t2, e3);
  }
  save() {
    this.stack.push(Lr2(this.dc));
  }
  restore(t2 = -1) {
    if (!this.stack.length) return;
    let e3 = t2 < 0 ? -t2 : Math.max(1, this.stack.length - t2);
    e3 = Math.min(e3, this.stack.length);
    let n2;
    for (let t3 = 0; t3 < e3; t3++) n2 = this.stack.pop();
    n2 && (this.dc = n2);
  }
  putObj(t2, e3) {
    t2 < 0 || t2 > 65535 || (this.objs[t2] = e3);
  }
  addObj(t2) {
    for (let e3 = 0; e3 < this.objs.length; e3++) if (!this.objs[e3]) {
      this.objs[e3] = t2;
      return;
    }
    this.objs.length < 65536 && this.objs.push(t2);
  }
  delObj(t2) {
    t2 >= 0 && t2 < this.objs.length && (this.objs[t2] = null);
  }
  selectIdx(t2) {
    const e3 = t2 & 2147483648 || (t2 & 4294934528) === 32768 ? Er2(t2) : this.objs[t2] ?? null;
    e3 && this.select(e3);
  }
  select(t2) {
    t2.kind === "pen" ? this.dc.pen = t2 : t2.kind === "brush" ? this.dc.brush = t2 : this.dc.font = t2;
  }
  intersectClip(t2) {
    const e3 = this.xf(), n2 = [tr2(e3, t2.l, t2.t), tr2(e3, t2.r, t2.t), tr2(e3, t2.r, t2.b), tr2(e3, t2.l, t2.b)];
    if (n2.some((t3) => !Or2(t3))) return;
    const r2 = `M${Zn2(n2[0].x)} ${Zn2(n2[0].y)}L${Zn2(n2[1].x)} ${Zn2(n2[1].y)}L${Zn2(n2[2].x)} ${Zn2(n2[2].y)}L${Zn2(n2[3].x)} ${Zn2(n2[3].y)}Z`, s4 = this.dc.clip, o4 = `clip:${r2}|${s4 ?? ""}`;
    this.dc.clip = this.svg.def(o4, "c", (t3) => `<clipPath id="${t3}"${s4 ? ` clip-path="url(#${s4})"` : ""}><path d="${r2}"/></clipPath>`);
  }
  clearClip() {
    this.dc.clip = null;
  }
  setClipRects(t2, e3) {
    const n2 = this.xf(), r2 = [];
    for (const e4 of t2) {
      const t3 = tr2(n2, e4.l, e4.t), s5 = tr2(n2, e4.r, e4.b);
      if (!Or2(t3) || !Or2(s5)) continue;
      const o5 = Math.min(t3.x, s5.x), i5 = Math.min(t3.y, s5.y), a3 = Math.abs(s5.x - t3.x), l3 = Math.abs(s5.y - t3.y);
      !(a3 > 0) || !(l3 > 0) || r2.push(`<rect x="${Zn2(o5)}" y="${Zn2(i5)}" width="${Zn2(a3)}" height="${Zn2(l3)}"/>`);
    }
    if (!r2.length) return;
    const s4 = e3 ? this.dc.clip : null, o4 = r2.join(""), i4 = `rgn:${o4}|${s4 ?? ""}`;
    this.dc.clip = this.svg.def(i4, "c", (t3) => `<clipPath id="${t3}"${s4 ? ` clip-path="url(#${s4})"` : ""}>${o4}</clipPath>`);
  }
  clipAttr() {
    return this.dc.clip ? ` clip-path="url(#${this.dc.clip})"` : "";
  }
  strokeAttrs() {
    const t2 = this.dc.pen;
    if (t2.style === pr2) return ' stroke="none"';
    const e3 = Math.max(t2.width, 0) * er2(this.xf()), n2 = e3 < 0.75 ? 0.75 : e3;
    let r2 = ` stroke="${t2.color}" stroke-width="${Zn2(n2)}"`;
    const s4 = Br2(t2.style, n2);
    return s4 && (r2 += ` stroke-dasharray="${s4}"`), s4 ? r2 += ' stroke-linecap="butt"' : t2.cap === 256 ? r2 += ' stroke-linecap="square"' : t2.cap === 512 ? r2 += ' stroke-linecap="butt"' : t2.cap === 0 && (r2 += ' stroke-linecap="round"'), t2.join === 4096 ? r2 += ' stroke-linejoin="bevel"' : t2.join === 8192 ? r2 += ' stroke-linejoin="miter"' : t2.join === 0 && (r2 += ' stroke-linejoin="round"'), r2;
  }
  fillAttrs() {
    const t2 = this.dc.brush;
    if (t2.style === mr2) return ' fill="none"';
    if (t2.style === xr2) {
      const e3 = this.dc.bkMode === 2 ? this.dc.bkColor : "none", n2 = `h:${t2.hatch}:${t2.color}:${e3}`;
      return ` fill="url(#${this.svg.def(n2, "h", (n3) => jr2(n3, t2.hatch, t2.color, e3))})"`;
    }
    if ((t2.style === br2 || t2.style === wr2) && t2.href) {
      const e3 = `p:${t2.href.length}:${t2.href.slice(-32)}`;
      return ` fill="url(#${this.svg.def(e3, "q", (e4) => `<pattern id="${e4}" width="16" height="16" patternUnits="userSpaceOnUse"><image xlink:href="${t2.href}" width="16" height="16" preserveAspectRatio="none"/></pattern>`)})"`;
    }
    return t2.style === br2 || t2.style === wr2 ? ` fill="${t2.color}"` : ` fill="${t2.color}"`;
  }
  ruleAttr() {
    return this.dc.polyFill === 1 ? ' fill-rule="evenodd"' : "";
  }
  emit(t2, e3) {
    if (!t2) return;
    const n2 = e3 === "stroke" ? ' fill="none"' : this.fillAttrs() + this.ruleAttr(), r2 = e3 === "fill" ? ' stroke="none"' : this.strokeAttrs();
    this.svg.add(`<path d="${t2}"${n2}${r2}${this.clipAttr()}/>`);
  }
  draw(t2, e3) {
    if (this.inPath) {
      t2(this.path);
      return;
    }
    const n2 = new Ir2();
    t2(n2), this.emit(n2.data, e3);
  }
  beginPath() {
    this.path.clear(), this.inPath = true;
  }
  endPath() {
    this.inPath = false;
  }
  abortPath() {
    this.path.clear(), this.inPath = false;
  }
  closeFigure() {
    this.path.close();
  }
  finishPath(t2) {
    this.inPath = false, this.emit(this.path.data, t2), this.path.clear();
  }
  clipToPath() {
    const t2 = this.path.data;
    if (this.inPath = false, !t2) return;
    const e3 = this.dc.clip;
    this.dc.clip = this.svg.def(`clipP:${t2}|${e3 ?? ""}`, "c", (n2) => `<clipPath id="${n2}"${e3 ? ` clip-path="url(#${e3})"` : ""}><path d="${t2}"/></clipPath>`), this.path.clear();
  }
  moveTo(t2, e3) {
    this.dc.pos = { x: t2, y: e3 }, this.inPath && this.path.move(this.tp(t2, e3));
  }
  lineTo(t2, e3) {
    const n2 = this.xf(), r2 = tr2(n2, this.dc.pos.x, this.dc.pos.y), s4 = tr2(n2, t2, e3);
    this.inPath ? this.path.line(s4) : this.emit(`M${Zn2(r2.x)} ${Zn2(r2.y)}L${Zn2(s4.x)} ${Zn2(s4.y)}`, "stroke"), this.dc.pos = { x: t2, y: e3 };
  }
  polyline(t2, e3) {
    if (t2.length < 2) return;
    const n2 = this.xf(), r2 = t2.map((t3) => tr2(n2, t3.x, t3.y));
    this.draw((t3) => {
      t3.move(r2[0]);
      for (let e4 = 1; e4 < r2.length; e4++) t3.line(r2[e4]);
      e3 && t3.close();
    }, e3 ? "both" : "stroke");
    const s4 = t2[t2.length - 1];
    this.dc.pos = { x: s4.x, y: s4.y };
  }
  polylineTo(t2) {
    if (!t2.length) return;
    const e3 = this.xf();
    if (this.inPath) for (const n3 of t2) this.path.line(tr2(e3, n3.x, n3.y));
    else {
      const n3 = tr2(e3, this.dc.pos.x, this.dc.pos.y);
      let r2 = `M${Zn2(n3.x)} ${Zn2(n3.y)}`;
      for (const n4 of t2) {
        const t3 = tr2(e3, n4.x, n4.y);
        r2 += `L${Zn2(t3.x)} ${Zn2(t3.y)}`;
      }
      this.emit(r2, "stroke");
    }
    const n2 = t2[t2.length - 1];
    this.dc.pos = { x: n2.x, y: n2.y };
  }
  polyBezier(t2, e3) {
    const n2 = this.xf(), r2 = t2.map((t3) => tr2(n2, t3.x, t3.y)), s4 = (t3) => {
      let s5 = 0;
      if (e3) this.inPath || t3.move(tr2(n2, this.dc.pos.x, this.dc.pos.y));
      else {
        if (!r2.length) return;
        t3.move(r2[0]), s5 = 1;
      }
      for (; s5 + 2 < r2.length; s5 += 3) t3.cubic(r2[s5], r2[s5 + 1], r2[s5 + 2]);
    };
    if (this.inPath) s4(this.path);
    else {
      const t3 = new Ir2();
      s4(t3), this.emit(t3.data, "stroke");
    }
    if (t2.length) {
      const e4 = t2[t2.length - 1];
      this.dc.pos = { x: e4.x, y: e4.y };
    }
  }
  polyPoly(t2, e3) {
    const n2 = this.xf();
    this.draw((r2) => {
      for (const s4 of t2) if (!(s4.length < 2)) {
        r2.move(tr2(n2, s4[0].x, s4[0].y));
        for (let t3 = 1; t3 < s4.length; t3++) r2.line(tr2(n2, s4[t3].x, s4[t3].y));
        e3 && r2.close();
      }
    }, e3 ? "both" : "stroke");
  }
  rect(t2) {
    const e3 = this.xf();
    if (!this.inPath && e3[1] === 0 && e3[2] === 0) {
      const n3 = tr2(e3, t2.l, t2.t), r2 = tr2(e3, t2.r, t2.b);
      if (Or2(n3) && Or2(r2)) {
        const t3 = Math.abs(r2.x - n3.x), e4 = Math.abs(r2.y - n3.y);
        this.svg.add(`<rect x="${Zn2(Math.min(n3.x, r2.x))}" y="${Zn2(Math.min(n3.y, r2.y))}" width="${Zn2(t3)}" height="${Zn2(e4)}"${this.fillAttrs()}${this.strokeAttrs()}${this.clipAttr()}/>`);
        return;
      }
    }
    const n2 = [tr2(e3, t2.l, t2.t), tr2(e3, t2.r, t2.t), tr2(e3, t2.r, t2.b), tr2(e3, t2.l, t2.b)];
    this.draw((t3) => {
      t3.move(n2[0]), t3.line(n2[1]), t3.line(n2[2]), t3.line(n2[3]), t3.close();
    }, "both");
  }
  ellipse(t2) {
    const e3 = this.xf(), n2 = (t2.l + t2.r) / 2, r2 = (t2.t + t2.b) / 2, s4 = Math.abs(t2.r - t2.l) / 2, o4 = Math.abs(t2.b - t2.t) / 2;
    this.draw((t3) => {
      t3.move(Ur2(n2, r2, s4, o4, 0, e3));
      for (const i4 of Rr2(n2, r2, s4, o4, 0, Math.PI * 2, e3)) t3.cubic(i4[0], i4[1], i4[2]);
      t3.close();
    }, "both");
  }
  roundRect(t2, e3, n2) {
    const r2 = this.xf(), s4 = Math.min(t2.l, t2.r), o4 = Math.min(t2.t, t2.b), i4 = Math.max(t2.l, t2.r), a3 = Math.max(t2.t, t2.b), l3 = Math.min(Math.abs(e3) / 2, (i4 - s4) / 2), c4 = Math.min(Math.abs(n2) / 2, (a3 - o4) / 2);
    if (l3 <= 0 || c4 <= 0) {
      this.rect(t2);
      return;
    }
    this.draw((t3) => {
      t3.move(tr2(r2, s4 + l3, o4)), t3.line(tr2(r2, i4 - l3, o4));
      for (const e4 of Rr2(i4 - l3, o4 + c4, l3, c4, -Math.PI / 2, 0, r2)) t3.cubic(e4[0], e4[1], e4[2]);
      t3.line(tr2(r2, i4, a3 - c4));
      for (const e4 of Rr2(i4 - l3, a3 - c4, l3, c4, 0, Math.PI / 2, r2)) t3.cubic(e4[0], e4[1], e4[2]);
      t3.line(tr2(r2, s4 + l3, a3));
      for (const e4 of Rr2(s4 + l3, a3 - c4, l3, c4, Math.PI / 2, Math.PI, r2)) t3.cubic(e4[0], e4[1], e4[2]);
      t3.line(tr2(r2, s4, o4 + c4));
      for (const e4 of Rr2(s4 + l3, o4 + c4, l3, c4, Math.PI, Math.PI * 1.5, r2)) t3.cubic(e4[0], e4[1], e4[2]);
      t3.close();
    }, "both");
  }
  arc(t2, e3, n2, r2, s4, o4, i4 = false) {
    const a3 = this.xf(), l3 = (t2.l + t2.r) / 2, c4 = (t2.t + t2.b) / 2, u4 = Math.abs(t2.r - t2.l) / 2, h4 = Math.abs(t2.b - t2.t) / 2;
    if (u4 <= 0 || h4 <= 0) return;
    const f4 = Dr2(l3, c4, u4, h4, e3, n2);
    let d4 = Dr2(l3, c4, u4, h4, r2, s4), p4 = f4 - d4;
    for (; p4 <= 0; ) p4 += Math.PI * 2;
    d4 = f4 - p4;
    const g4 = o4 === "arc" ? "stroke" : "both";
    this.draw((t3) => {
      const e4 = Ur2(l3, c4, u4, h4, f4, a3);
      o4 === "pie" ? (t3.move(tr2(a3, l3, c4)), t3.line(e4)) : i4 && this.inPath ? t3.line(e4) : t3.move(e4);
      for (const e5 of Rr2(l3, c4, u4, h4, f4, d4, a3)) t3.cubic(e5[0], e5[1], e5[2]);
      o4 !== "arc" && t3.close();
    }, g4);
    const m4 = { x: l3 + u4 * Math.cos(d4), y: c4 + h4 * Math.sin(d4) };
    this.dc.pos = m4;
  }
  polyDraw(t2, e3) {
    const n2 = this.xf(), r2 = Math.min(t2.length, e3.length);
    this.draw((s4) => {
      for (let o4 = 0; o4 < r2; o4++) {
        const i4 = e3[o4] & 6;
        i4 === 4 && o4 + 2 < r2 ? (s4.cubic(tr2(n2, t2[o4].x, t2[o4].y), tr2(n2, t2[o4 + 1].x, t2[o4 + 1].y), tr2(n2, t2[o4 + 2].x, t2[o4 + 2].y)), o4 += 2) : i4 === 6 ? s4.move(tr2(n2, t2[o4].x, t2[o4].y)) : s4.line(tr2(n2, t2[o4].x, t2[o4].y)), e3[o4] & 1 && s4.close();
      }
    }, "stroke"), r2 && (this.dc.pos = { x: t2[r2 - 1].x, y: t2[r2 - 1].y });
  }
  text(t2, e3, n2, r2, s4) {
    if (!n2) return;
    const o4 = this.xf(), i4 = tr2(o4, t2, e3);
    if (!Or2(i4)) return;
    const a3 = this.dc.font, l3 = (a3.height < 0 ? -a3.height : a3.height * 0.87) * nr2(o4);
    if (!(l3 > 0) || !Number.isFinite(l3)) return;
    if (s4 && this.dc.bkMode === 2) {
      const t3 = tr2(o4, s4.l, s4.t), e4 = tr2(o4, s4.r, s4.b);
      Or2(t3) && Or2(e4) && this.svg.add(`<rect x="${Zn2(Math.min(t3.x, e4.x))}" y="${Zn2(Math.min(t3.y, e4.y))}" width="${Zn2(Math.abs(e4.x - t3.x))}" height="${Zn2(Math.abs(e4.y - t3.y))}" fill="${this.dc.bkColor}"${this.clipAttr()}/>`);
    }
    const c4 = this.dc.textAlign, u4 = (c4 & 6) === 2 ? "end" : (c4 & 6) === 6 ? "middle" : "start", h4 = (c4 & 24) === 24 ? "" : (c4 & 24) === 8 ? "text-after-edge" : "text-before-edge";
    let f4 = ` x="${Zn2(i4.x)}" y="${Zn2(i4.y)}"`;
    if (a3.escapement && (f4 += ` transform="rotate(${Zn2(-a3.escapement / 10)} ${Zn2(i4.x)} ${Zn2(i4.y)})"`), f4 += ` font-family="${Kn2(Vr2(a3.face))}" font-size="${Zn2(l3)}" fill="${this.dc.textColor}"`, a3.weight >= 600 && (f4 += ` font-weight="${a3.weight}"`), a3.italic && (f4 += ' font-style="italic"'), a3.underline && a3.strike ? f4 += ' text-decoration="underline line-through"' : a3.underline ? f4 += ' text-decoration="underline"' : a3.strike && (f4 += ' text-decoration="line-through"'), u4 !== "start" && (f4 += ` text-anchor="${u4}"`), h4 && (f4 += ` dominant-baseline="${h4}"`), r2 && r2.length) {
      let t3 = 0;
      for (const e5 of r2) t3 += e5;
      const e4 = t3 * er2(o4);
      e4 > 0 && Number.isFinite(e4) && (f4 += ` textLength="${Zn2(e4)}" lengthAdjust="spacingAndGlyphs"`);
    }
    this.svg.add(`<text${f4} xml:space="preserve"${this.clipAttr()}>${Kn2(n2)}</text>`);
  }
  image(t2, e3) {
    const n2 = this.xf(), r2 = t2.r - t2.l, s4 = t2.b - t2.t, o4 = tr2(n2, t2.l, t2.t), i4 = tr2(n2, t2.l + r2, t2.t + s4);
    if (!Or2(o4) || !Or2(i4)) return;
    const a3 = Math.min(o4.x, i4.x), l3 = Math.min(o4.y, i4.y), c4 = Math.abs(i4.x - o4.x), u4 = Math.abs(i4.y - o4.y);
    !(c4 > 0) || !(u4 > 0) || this.svg.add(`<image x="${Zn2(a3)}" y="${Zn2(l3)}" width="${Zn2(c4)}" height="${Zn2(u4)}" preserveAspectRatio="none" xlink:href="${e3}"${this.clipAttr()}/>`);
  }
  render(t2, e3, n2) {
    return this.svg.render(t2, e3, n2);
  }
};
function Br2(t2, e3) {
  const n2 = Math.max(e3, 1);
  switch (t2) {
    case ur2:
      return `${Zn2(n2 * 6)} ${Zn2(n2 * 3)}`;
    case hr2:
      return `${Zn2(n2)} ${Zn2(n2 * 3)}`;
    case fr2:
      return `${Zn2(n2 * 6)} ${Zn2(n2 * 3)} ${Zn2(n2)} ${Zn2(n2 * 3)}`;
    case dr2:
      return `${Zn2(n2 * 6)} ${Zn2(n2 * 3)} ${Zn2(n2)} ${Zn2(n2 * 3)} ${Zn2(n2)} ${Zn2(n2 * 3)}`;
    default:
      return "";
  }
}
var Fr2 = { 0: "M0 4H8", 1: "M4 0V8", 2: "M0 0L8 8", 3: "M0 8L8 0", 4: "M0 4H8M4 0V8", 5: "M0 0L8 8M0 8L8 0" };
function jr2(t2, e3, n2, r2) {
  const s4 = Fr2[e3] ?? Fr2[0], o4 = r2 === "none" ? "" : `<rect width="8" height="8" fill="${r2}"/>`;
  return `<pattern id="${t2}" width="8" height="8" patternUnits="userSpaceOnUse">${o4}<path d="${s4}" stroke="${n2}" stroke-width="1" fill="none"/></pattern>`;
}
var Hr2 = ", 'Helvetica Neue', Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif";
function Vr2(t2) {
  const e3 = t2.trim();
  return e3 ? /^(symbol|wingdings|webdings)/i.test(e3) ? `'${e3}'` : `'${e3}'${Hr2}` : `Arial${Hr2}`;
}
var Wr2 = { 0: "windows-1252", 1: "windows-1252", 2: "windows-1252", 77: "macintosh", 128: "shift_jis", 129: "euc-kr", 130: "euc-kr", 134: "gbk", 136: "big5", 161: "windows-1253", 162: "windows-1254", 163: "windows-1258", 177: "windows-1255", 178: "windows-1256", 186: "windows-1257", 204: "windows-1251", 222: "windows-874", 238: "windows-1250" };
function Xr2(t2, e3) {
  const n2 = Wr2[e3];
  if (n2 && typeof TextDecoder < "u") try {
    return new TextDecoder(n2, { fatal: false }).decode(t2).replace(/\0+$/, "");
  } catch {
  }
  let r2 = "";
  for (let e4 = 0; e4 < t2.length && t2[e4] !== 0; e4++) r2 += String.fromCharCode(t2[e4]);
  return r2;
}
var Yr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function _r2(t2) {
  let e3 = "", n2 = 0;
  for (; n2 + 2 < t2.length; n2 += 3) {
    const r3 = t2[n2] << 16 | t2[n2 + 1] << 8 | t2[n2 + 2];
    e3 += Yr[r3 >> 18 & 63] + Yr[r3 >> 12 & 63] + Yr[r3 >> 6 & 63] + Yr[r3 & 63];
  }
  const r2 = t2.length - n2;
  if (r2 === 1) {
    const r3 = t2[n2] << 16;
    e3 += Yr[r3 >> 18 & 63] + Yr[r3 >> 12 & 63] + "==";
  } else if (r2 === 2) {
    const r3 = t2[n2] << 16 | t2[n2 + 1] << 8;
    e3 += Yr[r3 >> 18 & 63] + Yr[r3 >> 12 & 63] + Yr[r3 >> 6 & 63] + "=";
  }
  return e3;
}
var Gr2 = null;
function qr(t2) {
  if (!Gr2) {
    const t3 = new Int32Array(256);
    for (let e4 = 0; e4 < 256; e4++) {
      let n2 = e4;
      for (let t4 = 0; t4 < 8; t4++) n2 = n2 & 1 ? 3988292384 ^ n2 >>> 1 : n2 >>> 1;
      t3[e4] = n2;
    }
    Gr2 = t3;
  }
  let e3 = -1;
  for (let n2 = 0; n2 < t2.length; n2++) e3 = Gr2[(e3 ^ t2[n2]) & 255] ^ e3 >>> 8;
  return (e3 ^ -1) >>> 0;
}
function Zr2(t2, e3) {
  const n2 = new Uint8Array(e3.length + 12), r2 = new DataView(n2.buffer);
  r2.setUint32(0, e3.length);
  for (let e4 = 0; e4 < 4; e4++) n2[4 + e4] = t2.charCodeAt(e4);
  return n2.set(e3, 8), r2.setUint32(e3.length + 8, qr(n2.subarray(4, e3.length + 8))), n2;
}
function Kr2(t2, e3, n2) {
  const r2 = new Uint8Array(n2 * (e3 * 4 + 1));
  for (let s5 = 0; s5 < n2; s5++) r2[s5 * (e3 * 4 + 1)] = 0, r2.set(t2.subarray(s5 * e3 * 4, (s5 + 1) * e3 * 4), s5 * (e3 * 4 + 1) + 1);
  const s4 = new Uint8Array(13), o4 = new DataView(s4.buffer);
  o4.setUint32(0, e3), o4.setUint32(4, n2), s4[8] = 8, s4[9] = 6;
  const i4 = [new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), Zr2("IHDR", s4), Zr2("IDAT", J(r2, { level: 6 })), Zr2("IEND", new Uint8Array(0))];
  let a3 = 0;
  for (const t3 of i4) a3 += t3.length;
  const l3 = new Uint8Array(a3);
  let c4 = 0;
  for (const t3 of i4) l3.set(t3, c4), c4 += t3.length;
  return l3;
}
var Jr2 = 8192 * 8192;
function Qr2(t2) {
  if (!t2) return { shift: 0, scale: 0 };
  let e3 = 0, n2 = t2;
  for (; !(n2 & 1); ) n2 >>>= 1, e3++;
  let r2 = 0;
  for (; n2 & 1; ) n2 >>>= 1, r2++;
  return { shift: e3, scale: r2 > 0 ? 255 / ((1 << r2) - 1) : 0 };
}
function ts(t2, e3, n2, r2, s4, o4) {
  if (!(r2 > 0) || !(s4 > 0)) return null;
  const i4 = new Uint8Array(r2 * s4);
  let a3 = e3;
  const l3 = Math.min(t2.length, e3 + n2);
  let c4 = 0, u4 = s4 - 1;
  const h4 = (t3) => {
    c4 >= 0 && c4 < r2 && u4 >= 0 && u4 < s4 && (i4[u4 * r2 + c4] = t3), c4++;
  };
  for (; a3 + 1 < l3 && u4 >= 0; ) {
    const e4 = t2[a3++], n3 = t2[a3++];
    if (e4 > 0) {
      if (o4) {
        const t3 = n3 >> 4 & 15, r3 = n3 & 15;
        for (let n4 = 0; n4 < e4; n4++) h4(n4 % 2 === 0 ? t3 : r3);
      } else for (let t3 = 0; t3 < e4; t3++) h4(n3);
      continue;
    }
    if (n3 === 0) {
      c4 = 0, u4--;
      continue;
    }
    if (n3 === 1) break;
    if (n3 === 2) {
      if (a3 + 1 >= l3) break;
      c4 += t2[a3++], u4 -= t2[a3++];
      continue;
    }
    if (o4) {
      const e5 = n3 + 1 >> 1;
      if (a3 + e5 > l3) break;
      for (let e6 = 0; e6 < n3; e6++) {
        const n4 = t2[a3 + (e6 >> 1)];
        h4(e6 % 2 === 0 ? n4 >> 4 & 15 : n4 & 15);
      }
      a3 += e5 + (e5 & 1);
    } else {
      if (a3 + n3 > l3) break;
      for (let e5 = 0; e5 < n3; e5++) h4(t2[a3 + e5]);
      a3 += n3 + (n3 & 1);
    }
  }
  return i4;
}
function es(t2, e3, n2, r2, s4) {
  if (e3 < 0 || n2 < 12 || e3 + 12 > t2.length) return null;
  const o4 = new rr2(t2, e3, Math.min(t2.length, e3 + Math.max(n2, 12))), i4 = o4.u32();
  let a3, l3, c4, u4 = 0, h4 = 0, f4 = false;
  if (i4 === 12) f4 = true, a3 = o4.i16(), l3 = o4.i16(), o4.u16(), c4 = o4.u16();
  else if (i4 >= 16) a3 = o4.i32(), l3 = o4.i32(), o4.u16(), c4 = o4.u16(), i4 >= 24 && (u4 = o4.u32(), o4.u32()), i4 >= 36 && (o4.u32(), o4.u32(), h4 = o4.u32());
  else return null;
  const d4 = l3 < 0;
  if (l3 = Math.abs(l3), !(a3 > 0) || !(l3 > 0) || a3 * l3 > Jr2 || u4 === 4 || u4 === 5) return null;
  const p4 = u4 === 1, g4 = u4 === 2;
  if (u4 !== 0 && u4 !== 3 && !p4 && !g4 || p4 && c4 !== 8 || g4 && c4 !== 4 || ![1, 4, 8, 16, 24, 32].includes(c4)) return null;
  let m4 = 0, x4 = 0, b4 = 0;
  if (u4 === 3) {
    const n3 = new rr2(t2, e3 + i4, t2.length);
    m4 = n3.u32(), x4 = n3.u32(), b4 = n3.u32();
  } else c4 === 16 ? (m4 = 31744, x4 = 992, b4 = 31) : c4 === 32 && (m4 = 16711680, x4 = 65280, b4 = 255);
  let w4 = null;
  if (c4 <= 8) {
    const n3 = h4 > 0 ? Math.min(h4, 1 << c4) : 1 << c4, r3 = f4 ? 3 : 4, s5 = e3 + i4 + (u4 === 3 ? 12 : 0);
    w4 = new Uint8Array(n3 * 3);
    const o5 = new rr2(t2, s5, t2.length);
    for (let t3 = 0; t3 < n3; t3++) {
      const e4 = o5.u8(), n4 = o5.u8(), s6 = o5.u8();
      r3 === 4 && o5.u8(), w4[t3 * 3] = s6, w4[t3 * 3 + 1] = n4, w4[t3 * 3 + 2] = e4;
    }
  }
  const y4 = a3 * c4 + 31 >> 5 << 2, $3 = r2, M4 = Math.min(s4 > 0 ? s4 : t2.length - $3, t2.length - $3);
  if ($3 < 0 || $3 >= t2.length) return null;
  if (p4 || g4) {
    const e4 = ts(t2, $3, M4, a3, l3, g4);
    if (!e4) return null;
    const n3 = new Uint8Array(a3 * l3 * 4);
    for (let t3 = 0; t3 < e4.length; t3++) {
      const r3 = e4[t3] * 3, s5 = t3 * 4;
      w4 && r3 + 2 < w4.length && (n3[s5] = w4[r3], n3[s5 + 1] = w4[r3 + 1], n3[s5 + 2] = w4[r3 + 2]), n3[s5 + 3] = 255;
    }
    return { w: a3, h: l3, rgba: n3 };
  }
  if (M4 < y4) return null;
  const v4 = Math.min(l3, Math.floor(M4 / y4));
  if (v4 <= 0) return null;
  const k3 = new Uint8Array(a3 * l3 * 4), E3 = Qr2(m4), T3 = Qr2(x4), C4 = Qr2(b4);
  let S4 = false;
  for (let e4 = 0; e4 < v4; e4++) {
    const n3 = d4 ? e4 : l3 - 1 - e4;
    let r3 = $3 + e4 * y4, s5 = n3 * a3 * 4;
    for (let n4 = 0; n4 < a3; n4++) {
      let o5 = 0, i5 = 0, a4 = 0, l4 = 255;
      if (c4 === 24) a4 = t2[r3], i5 = t2[r3 + 1], o5 = t2[r3 + 2], r3 += 3;
      else if (c4 === 32) {
        const e5 = t2[r3] | t2[r3 + 1] << 8 | t2[r3 + 2] << 16 | t2[r3 + 3] << 24;
        o5 = E3.scale ? ((e5 & m4) >>> E3.shift) * E3.scale : 0, i5 = T3.scale ? ((e5 & x4) >>> T3.shift) * T3.scale : 0, a4 = C4.scale ? ((e5 & b4) >>> C4.shift) * C4.scale : 0, l4 = t2[r3 + 3], l4 !== 0 && (S4 = true), r3 += 4;
      } else if (c4 === 16) {
        const e5 = t2[r3] | t2[r3 + 1] << 8;
        o5 = ((e5 & m4) >>> E3.shift) * E3.scale, i5 = ((e5 & x4) >>> T3.shift) * T3.scale, a4 = ((e5 & b4) >>> C4.shift) * C4.scale, r3 += 2;
      } else {
        const r4 = n4 * c4, s6 = t2[$3 + e4 * y4 + (r4 >> 3)] ?? 0, l5 = c4 === 8 ? s6 : c4 === 4 ? r4 % 8 === 0 ? s6 >> 4 : s6 & 15 : s6 >> 7 - (r4 & 7) & 1, u5 = l5 * 3;
        w4 && u5 + 2 < w4.length ? (o5 = w4[u5], i5 = w4[u5 + 1], a4 = w4[u5 + 2]) : o5 = i5 = a4 = l5 ? 255 : 0;
      }
      k3[s5] = o5 | 0, k3[s5 + 1] = i5 | 0, k3[s5 + 2] = a4 | 0, k3[s5 + 3] = l4, s5 += 4;
    }
  }
  if (c4 === 32 && !S4) for (let t3 = 3; t3 < k3.length; t3 += 4) k3[t3] = 255;
  return { w: a3, h: l3, rgba: k3 };
}
function ns(t2, e3, n2, r2, s4) {
  try {
    if (e3 >= 0 && e3 + 20 <= t2.length) {
      const n3 = new rr2(t2, e3, t2.length);
      if (n3.u32() >= 24) {
        n3.skip(12);
        const e4 = n3.u32();
        if ((e4 === 4 || e4 === 5) && s4 > 0 && r2 + s4 <= t2.length) return `data:${e4 === 4 ? "image/jpeg" : "image/png"};base64,${_r2(t2.subarray(r2, r2 + s4))}`;
      }
    }
    const o4 = es(t2, e3, n2, r2, s4);
    return o4 ? `data:image/png;base64,${_r2(Kr2(o4.rgba, o4.w, o4.h))}` : null;
  } catch {
    return null;
  }
}
function rs(t2, e3) {
  if (e3 + 4 > t2.length) return 0;
  const n2 = new rr2(t2, e3, t2.length), r2 = n2.u32();
  if (r2 === 12) {
    n2.skip(4);
    const r3 = new rr2(t2, e3 + 10, t2.length).u16();
    return 12 + (r3 <= 8 ? (1 << r3) * 3 : 0);
  }
  if (r2 < 16 || r2 > 200) return 0;
  const s4 = new rr2(t2, e3 + 14, t2.length).u16(), o4 = r2 >= 20 ? new rr2(t2, e3 + 16, t2.length).u32() : 0;
  let i4 = r2 >= 36 ? new rr2(t2, e3 + 32, t2.length).u32() : 0;
  return s4 <= 8 ? i4 = i4 > 0 ? Math.min(i4, 1 << s4) : 1 << s4 : i4 = 0, r2 + (o4 === 3 ? 12 : 0) + i4 * 4;
}
var ss = 1179469088;
var os = 1e5;
var is = { HEADER: 1, POLYBEZIER: 2, POLYGON: 3, POLYLINE: 4, POLYBEZIERTO: 5, POLYLINETO: 6, POLYPOLYLINE: 7, POLYPOLYGON: 8, SETWINDOWEXTEX: 9, SETWINDOWORGEX: 10, SETVIEWPORTEXTEX: 11, SETVIEWPORTORGEX: 12, EOF: 14, SETPIXELV: 15, SETMAPMODE: 17, SETBKMODE: 18, SETPOLYFILLMODE: 19, SETTEXTALIGN: 22, SETTEXTCOLOR: 24, SETBKCOLOR: 25, MOVETOEX: 27, INTERSECTCLIPRECT: 30, SCALEVIEWPORTEXTEX: 31, SCALEWINDOWEXTEX: 32, SAVEDC: 33, RESTOREDC: 34, SETWORLDTRANSFORM: 35, MODIFYWORLDTRANSFORM: 36, SELECTOBJECT: 37, CREATEPEN: 38, CREATEBRUSHINDIRECT: 39, DELETEOBJECT: 40, ELLIPSE: 42, RECTANGLE: 43, ROUNDRECT: 44, ARC: 45, CHORD: 46, PIE: 47, LINETO: 54, ARCTO: 55, POLYDRAW: 56, BEGINPATH: 59, ENDPATH: 60, CLOSEFIGURE: 61, FILLPATH: 62, STROKEANDFILLPATH: 63, STROKEPATH: 64, SELECTCLIPPATH: 67, ABORTPATH: 68, EXTSELECTCLIPRGN: 75, BITBLT: 76, STRETCHBLT: 77, STRETCHDIBITS: 81, EXTCREATEFONTINDIRECTW: 82, EXTTEXTOUTA: 83, EXTTEXTOUTW: 84, POLYBEZIER16: 85, POLYGON16: 86, POLYLINE16: 87, POLYBEZIERTO16: 88, POLYLINETO16: 89, POLYPOLYLINE16: 90, POLYPOLYGON16: 91, POLYDRAW16: 92, CREATEMONOBRUSH: 93, CREATEDIBPATTERNBRUSHPT: 94, EXTCREATEPEN: 95 };
function as(t2) {
  if (t2.length < 88) return false;
  const e3 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength);
  return e3.getUint32(0, true) === 1 && e3.getUint32(40, true) === ss;
}
function ls(t2, e3 = {}) {
  try {
    return cs(t2, e3);
  } catch {
    return null;
  }
}
function cs(t2, e3) {
  if (!as(t2)) return null;
  const n2 = new rr2(t2, 0, t2.length);
  n2.skip(8);
  const r2 = n2.rectL(), s4 = n2.rectL();
  n2.skip(16), n2.skip(16);
  const o4 = n2.i32(), i4 = n2.i32(), a3 = n2.i32(), l3 = n2.i32(), c4 = a3 > 0 && o4 > 0 ? o4 / a3 : 96 / 25.4, u4 = l3 > 0 && i4 > 0 ? i4 / l3 : 96 / 25.4, h4 = new Nr2({ pxPerMmX: c4, pxPerMmY: u4 });
  let f4 = r2;
  if (!(f4.r > f4.l) || !(f4.b > f4.t)) {
    const t3 = Math.round((s4.r - s4.l) * c4 / 100), e4 = Math.round((s4.b - s4.t) * u4 / 100);
    f4 = { l: 0, t: 0, r: t3 > 0 ? t3 : 1024, b: e4 > 0 ? e4 : 768 };
  }
  f4 = { l: f4.l, t: f4.t, r: f4.r + 1, b: f4.b + 1 };
  const d4 = (s4.r - s4.l) * 96 / 2540, p4 = (s4.b - s4.t) * 96 / 2540, g4 = e3.width ?? (d4 > 0 ? d4 : f4.r - f4.l), m4 = e3.height ?? (p4 > 0 ? p4 : f4.b - f4.t);
  h4.dc.mapMode = Tr2;
  let x4 = 0, b4 = 0;
  for (; x4 + 8 <= t2.length && b4 < os; ) {
    const e4 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength), n3 = e4.getUint32(x4, true), r3 = e4.getUint32(x4 + 4, true);
    if (r3 < 8 || r3 % 4 !== 0 || x4 + r3 > t2.length || n3 === is.EOF) break;
    n3 !== is.HEADER && us(h4, t2, n3, x4, r3), x4 += r3, b4++;
  }
  return h4.render(f4, g4, m4);
}
function us(t2, e3, n2, r2, s4) {
  const o4 = new rr2(e3, r2 + 8, r2 + s4);
  switch (n2) {
    case is.POLYGON:
      t2.polyline(ds(o4), true);
      break;
    case is.POLYLINE:
      t2.polyline(ds(o4), false);
      break;
    case is.POLYBEZIER:
      t2.polyBezier(ds(o4), false);
      break;
    case is.POLYLINETO:
      t2.polylineTo(ds(o4));
      break;
    case is.POLYBEZIERTO:
      t2.polyBezier(ds(o4), true);
      break;
    case is.POLYGON16:
      t2.polyline(ps(o4), true);
      break;
    case is.POLYLINE16:
      t2.polyline(ps(o4), false);
      break;
    case is.POLYBEZIER16:
      t2.polyBezier(ps(o4), false);
      break;
    case is.POLYLINETO16:
      t2.polylineTo(ps(o4));
      break;
    case is.POLYBEZIERTO16:
      t2.polyBezier(ps(o4), true);
      break;
    case is.POLYPOLYGON:
      t2.polyPoly(gs(o4, false), true);
      break;
    case is.POLYPOLYLINE:
      t2.polyPoly(gs(o4, false), false);
      break;
    case is.POLYPOLYGON16:
      t2.polyPoly(gs(o4, true), true);
      break;
    case is.POLYPOLYLINE16:
      t2.polyPoly(gs(o4, true), false);
      break;
    case is.POLYDRAW:
    case is.POLYDRAW16: {
      o4.skip(16);
      const e4 = fs(o4.i32()), r3 = [];
      for (let t3 = 0; t3 < e4; t3++) r3.push(n2 === is.POLYDRAW ? o4.ptL() : o4.pt16());
      const s5 = [];
      for (let t3 = 0; t3 < e4; t3++) s5.push(o4.u8());
      t2.polyDraw(r3, s5);
      break;
    }
    case is.RECTANGLE:
      t2.rect(o4.rectL());
      break;
    case is.ELLIPSE:
      t2.ellipse(o4.rectL());
      break;
    case is.ROUNDRECT: {
      const e4 = o4.rectL();
      t2.roundRect(e4, o4.i32(), o4.i32());
      break;
    }
    case is.ARC:
    case is.CHORD:
    case is.PIE:
    case is.ARCTO: {
      const e4 = o4.rectL(), r3 = o4.ptL(), s5 = o4.ptL(), i4 = n2 === is.CHORD ? "chord" : n2 === is.PIE ? "pie" : "arc";
      t2.arc(e4, r3.x, r3.y, s5.x, s5.y, i4, n2 === is.ARCTO);
      break;
    }
    case is.MOVETOEX: {
      const e4 = o4.ptL();
      t2.moveTo(e4.x, e4.y);
      break;
    }
    case is.LINETO: {
      const e4 = o4.ptL();
      t2.lineTo(e4.x, e4.y);
      break;
    }
    case is.SETPIXELV: {
      const e4 = o4.ptL(), n3 = o4.color();
      t2.dc.brush = { kind: "brush", style: gr2, color: n3, hatch: 0, href: null }, t2.dc.pen = { ...t2.dc.pen, style: pr2 }, t2.rect({ l: e4.x, t: e4.y, r: e4.x + 1, b: e4.y + 1 });
      break;
    }
    case is.BEGINPATH:
      t2.beginPath();
      break;
    case is.ENDPATH:
      t2.endPath();
      break;
    case is.CLOSEFIGURE:
      t2.closeFigure();
      break;
    case is.FILLPATH:
      t2.finishPath("fill");
      break;
    case is.STROKEPATH:
      t2.finishPath("stroke");
      break;
    case is.STROKEANDFILLPATH:
      t2.finishPath("both");
      break;
    case is.ABORTPATH:
      t2.abortPath();
      break;
    case is.SELECTCLIPPATH:
      t2.clipToPath();
      break;
    case is.CREATEPEN: {
      const e4 = o4.i32();
      t2.putObj(e4, ms(o4));
      break;
    }
    case is.EXTCREATEPEN: {
      const e4 = o4.i32();
      t2.putObj(e4, xs(o4));
      break;
    }
    case is.CREATEBRUSHINDIRECT: {
      const e4 = o4.i32();
      t2.putObj(e4, bs(o4));
      break;
    }
    case is.CREATEMONOBRUSH:
    case is.CREATEDIBPATTERNBRUSHPT: {
      const n3 = o4.i32();
      t2.putObj(n3, ws(o4, e3, r2));
      break;
    }
    case is.EXTCREATEFONTINDIRECTW: {
      const e4 = o4.i32();
      t2.putObj(e4, ys(o4));
      break;
    }
    case is.SELECTOBJECT:
      t2.selectIdx(o4.u32());
      break;
    case is.DELETEOBJECT:
      t2.delObj(o4.u32());
      break;
    case is.SETWORLDTRANSFORM:
      t2.dc.world = $s(o4);
      break;
    case is.MODIFYWORLDTRANSFORM: {
      const e4 = $s(o4), n3 = o4.u32();
      n3 === 1 ? t2.dc.world = [...Jn2] : n3 === 2 ? t2.dc.world = Qn2(e4, t2.dc.world) : n3 === 3 && (t2.dc.world = Qn2(t2.dc.world, e4));
      break;
    }
    case is.SETWINDOWEXTEX:
      t2.dc.winExt = { x: o4.i32(), y: o4.i32() };
      break;
    case is.SETWINDOWORGEX:
      t2.dc.winOrg = o4.ptL();
      break;
    case is.SETVIEWPORTEXTEX:
      t2.dc.vpExt = { x: o4.i32(), y: o4.i32() };
      break;
    case is.SETVIEWPORTORGEX:
      t2.dc.vpOrg = o4.ptL();
      break;
    case is.SETMAPMODE:
      t2.dc.mapMode = o4.u32();
      break;
    case is.SCALEVIEWPORTEXTEX: {
      const e4 = o4.i32(), n3 = o4.i32(), r3 = o4.i32(), s5 = o4.i32();
      n3 && (t2.dc.vpExt.x = t2.dc.vpExt.x * e4 / n3), s5 && (t2.dc.vpExt.y = t2.dc.vpExt.y * r3 / s5);
      break;
    }
    case is.SCALEWINDOWEXTEX: {
      const e4 = o4.i32(), n3 = o4.i32(), r3 = o4.i32(), s5 = o4.i32();
      n3 && (t2.dc.winExt.x = t2.dc.winExt.x * e4 / n3), s5 && (t2.dc.winExt.y = t2.dc.winExt.y * r3 / s5);
      break;
    }
    case is.SAVEDC:
      t2.save();
      break;
    case is.RESTOREDC:
      t2.restore(o4.i32());
      break;
    case is.SETBKMODE:
      t2.dc.bkMode = o4.u32();
      break;
    case is.SETPOLYFILLMODE:
      t2.dc.polyFill = o4.u32();
      break;
    case is.SETTEXTALIGN:
      t2.dc.textAlign = o4.u32();
      break;
    case is.SETTEXTCOLOR:
      t2.dc.textColor = o4.color();
      break;
    case is.SETBKCOLOR:
      t2.dc.bkColor = o4.color();
      break;
    case is.INTERSECTCLIPRECT:
      t2.intersectClip(o4.rectL());
      break;
    case is.EXTSELECTCLIPRGN:
      Ms(t2, o4);
      break;
    case is.EXTTEXTOUTW:
    case is.EXTTEXTOUTA:
      vs(t2, o4, e3, r2, s4, n2 === is.EXTTEXTOUTW);
      break;
    case is.STRETCHDIBITS:
      ks(t2, o4, e3, r2);
      break;
    case is.BITBLT:
    case is.STRETCHBLT:
      Es(t2, o4, e3, r2, n2 === is.STRETCHBLT);
      break;
  }
}
var hs = 1 << 20;
var fs = (t2) => t2 > 0 && t2 < hs ? t2 | 0 : 0;
function ds(t2) {
  t2.skip(16);
  const e3 = Math.min(fs(t2.i32()), t2.left >> 3), n2 = [];
  for (let r2 = 0; r2 < e3; r2++) n2.push(t2.ptL());
  return n2;
}
function ps(t2) {
  t2.skip(16);
  const e3 = Math.min(fs(t2.i32()), t2.left >> 2), n2 = [];
  for (let r2 = 0; r2 < e3; r2++) n2.push(t2.pt16());
  return n2;
}
function gs(t2, e3) {
  t2.skip(16);
  const n2 = fs(t2.i32()), r2 = fs(t2.i32());
  if (!n2 || !r2 || n2 > r2) return [];
  const s4 = [];
  let o4 = 0;
  for (let e4 = 0; e4 < n2; e4++) {
    const e5 = fs(t2.i32());
    s4.push(e5), o4 += e5;
  }
  if (o4 > r2) return [];
  const i4 = e3 ? t2.left >> 2 : t2.left >> 3, a3 = [];
  let l3 = 0;
  for (const n3 of s4) {
    const r3 = [];
    for (let s5 = 0; s5 < n3 && l3 < i4; s5++, l3++) r3.push(e3 ? t2.pt16() : t2.ptL());
    a3.push(r3);
  }
  return a3;
}
function ms(t2) {
  const e3 = t2.u32(), n2 = t2.i32();
  return t2.i32(), { kind: "pen", style: e3 & 15, width: Math.abs(n2) || 1, color: t2.color(), cap: 0, join: 0 };
}
function xs(t2) {
  t2.skip(16);
  const e3 = t2.u32(), n2 = t2.u32(), r2 = t2.u32(), s4 = t2.color();
  return { kind: "pen", style: r2 === mr2 ? pr2 : e3 & 15, width: Math.max(n2 || 1, 1), color: s4, cap: e3 & 3840, join: e3 & 61440 };
}
function bs(t2) {
  const e3 = t2.u32(), n2 = t2.color(), r2 = t2.u32();
  return { kind: "brush", style: e3, color: n2, hatch: r2, href: null };
}
function ws(t2, e3, n2) {
  t2.u32();
  const r2 = t2.u32(), s4 = t2.u32(), o4 = t2.u32(), i4 = t2.u32(), a3 = s4 > 0 ? ns(e3, n2 + r2, s4, n2 + o4, i4) : null;
  return { kind: "brush", style: a3 ? 5 : gr2, color: "#808080", hatch: 0, href: a3 };
}
function ys(t2) {
  const e3 = t2.i32();
  t2.i32();
  const n2 = t2.i32();
  t2.i32();
  const r2 = t2.i32(), s4 = t2.u8() !== 0, o4 = t2.u8() !== 0, i4 = t2.u8() !== 0, a3 = t2.u8();
  t2.skip(4);
  const l3 = t2.utf16(64), c4 = Mr2();
  return { kind: "font", height: e3 || c4.height, escapement: n2, weight: r2 > 0 ? r2 : 400, italic: s4, underline: o4, strike: i4, charset: a3, face: l3 || c4.face };
}
function $s(t2) {
  return [t2.f32(), t2.f32(), t2.f32(), t2.f32(), t2.f32(), t2.f32()];
}
function Ms(t2, e3) {
  const n2 = e3.u32(), r2 = e3.u32();
  if (n2 === 0) {
    r2 === ar2 && t2.clearClip();
    return;
  }
  e3.u32();
  const s4 = e3.u32(), o4 = e3.u32();
  if (e3.u32(), e3.rectL(), s4 !== lr2 || o4 <= 0 || o4 > 65536) return;
  const i4 = [];
  for (let t3 = 0; t3 < o4; t3++) i4.push(e3.rectL());
  r2 === ar2 ? t2.setClipRects(i4, false) : r2 === ir2 && t2.setClipRects(i4, true);
}
function vs(t2, e3, n2, r2, s4, o4) {
  e3.skip(16), e3.u32();
  const i4 = e3.f32();
  e3.f32();
  const a3 = e3.ptL(), l3 = e3.u32(), c4 = e3.u32(), u4 = e3.u32(), h4 = e3.rectL(), f4 = e3.u32();
  if (!l3 || l3 > 65536) return;
  const d4 = r2 + c4, p4 = o4 ? l3 * 2 : l3;
  if (c4 < 8 || d4 + p4 > r2 + s4) return;
  const g4 = o4 ? new rr2(n2, d4, d4 + p4).utf16(p4) : Xr2(n2.subarray(d4, d4 + p4), t2.dc.font.charset);
  if (!g4) return;
  let m4 = null;
  const x4 = r2 + f4;
  if (f4 >= 8 && x4 + l3 * 4 <= r2 + s4) {
    const t3 = new rr2(n2, x4, x4 + l3 * 4);
    m4 = [];
    for (let e4 = 0; e4 < l3; e4++) m4.push(t3.i32());
    i4 > 0 && i4 !== 1 && Number.isFinite(i4) && (m4 = m4.map((t4) => t4 * i4));
  }
  const b4 = u4 & 2 ? h4 : null;
  t2.text(a3.x, a3.y, g4, m4, b4);
}
function ks(t2, e3, n2, r2) {
  e3.skip(16);
  const s4 = e3.i32(), o4 = e3.i32();
  e3.i32(), e3.i32(), e3.i32(), e3.i32();
  const i4 = e3.u32(), a3 = e3.u32(), l3 = e3.u32(), c4 = e3.u32();
  e3.u32(), e3.u32();
  const u4 = e3.i32(), h4 = e3.i32();
  if (!a3 || !c4) return;
  const f4 = ns(n2, r2 + i4, a3, r2 + l3, c4);
  f4 && t2.image({ l: s4, t: o4, r: s4 + u4, b: o4 + h4 }, f4);
}
function Es(t2, e3, n2, r2, s4) {
  e3.skip(16);
  const o4 = e3.i32(), i4 = e3.i32(), a3 = e3.i32(), l3 = e3.i32();
  e3.u32(), e3.i32(), e3.i32(), e3.skip(24), e3.u32(), e3.u32();
  const c4 = e3.u32(), u4 = e3.u32(), h4 = e3.u32(), f4 = e3.u32();
  if (s4 && (e3.i32(), e3.i32()), !u4 || !f4) return;
  const d4 = ns(n2, r2 + c4, u4, r2 + h4, f4);
  d4 && t2.image({ l: o4, t: i4, r: o4 + a3, b: i4 + l3 }, d4);
}
var Ts = 2596720087;
var Cs = 1e5;
var Ss = { EOF: 0, SAVEDC: 30, SETBKMODE: 258, SETMAPMODE: 259, SETPOLYFILLMODE: 262, RESTOREDC: 295, SELECTOBJECT: 301, SETTEXTALIGN: 302, DELETEOBJECT: 496, SETBKCOLOR: 513, SETTEXTCOLOR: 521, SETWINDOWORG: 523, SETWINDOWEXT: 524, SETVIEWPORTORG: 525, SETVIEWPORTEXT: 526, OFFSETWINDOWORG: 527, OFFSETVIEWPORTORG: 529, LINETO: 531, MOVETO: 532, CREATEPENINDIRECT: 762, CREATEFONTINDIRECT: 763, CREATEBRUSHINDIRECT: 764, POLYGON: 804, POLYLINE: 805, SCALEWINDOWEXT: 1040, SCALEVIEWPORTEXT: 1042, INTERSECTCLIPRECT: 1046, ELLIPSE: 1048, ARC: 2071, RECTANGLE: 1051, SETPIXEL: 1055, TEXTOUT: 1313, POLYPOLYGON: 1336, ROUNDRECT: 1564, PATBLT: 1565, PIE: 2074, CHORD: 2096, EXTTEXTOUT: 2610, DIBBITBLT: 2368, DIBSTRETCHBLT: 2881, STRETCHDIB: 3907, CREATEPALETTE: 247, CREATEBRUSH: 248, CREATEPATTERNBRUSH: 505, DIBCREATEPATTERNBRUSH: 322, CREATEREGION: 1791, CREATEBITMAP: 1790, CREATEBITMAPINDIRECT: 765 };
function Ls(t2) {
  if (t2.length < 20) return false;
  const e3 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength);
  if (e3.getUint32(0, true) === Ts) return true;
  const n2 = e3.getUint16(0, true), r2 = e3.getUint16(2, true), s4 = e3.getUint16(4, true);
  return (n2 === 1 || n2 === 2) && r2 === 9 && (s4 === 256 || s4 === 768);
}
function As(t2, e3 = {}) {
  try {
    return Ps(t2, e3);
  } catch {
    return null;
  }
}
function Ps(t2, e3) {
  if (!Ls(t2)) return null;
  const n2 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength);
  let r2 = 0, s4 = null, o4 = 1440;
  if (n2.getUint32(0, true) === Ts && (s4 = { l: n2.getInt16(6, true), t: n2.getInt16(8, true), r: n2.getInt16(10, true), b: n2.getInt16(12, true) }, o4 = n2.getUint16(14, true) || 1440, r2 = 22), r2 + 18 > t2.length) return null;
  r2 += 18, (!s4 || !(s4.r > s4.l) || !(s4.b > s4.t)) && (s4 = Is(t2, n2, r2), o4 = 96);
  const i4 = s4.r - s4.l, a3 = s4.b - s4.t, l3 = o4 / 25.4, c4 = new Nr2({ pxPerMmX: l3, pxPerMmY: l3 });
  c4.dc.mapMode = Sr2, c4.dc.winOrg = { x: s4.l, y: s4.t }, c4.dc.winExt = { x: i4, y: a3 }, c4.dc.vpOrg = { x: s4.l, y: s4.t }, c4.dc.vpExt = { x: i4, y: a3 };
  const u4 = e3.width ?? i4 / o4 * 96, h4 = e3.height ?? a3 / o4 * 96;
  let f4 = 0;
  for (; r2 + 6 <= t2.length && f4 < Cs; ) {
    const e4 = n2.getUint32(r2, true), s5 = n2.getUint16(r2 + 4, true);
    if (e4 < 3) break;
    const o5 = e4 * 2;
    if (r2 + o5 > t2.length || s5 === Ss.EOF) break;
    Os(c4, t2, s5, r2, o5), r2 += o5, f4++;
  }
  return c4.render({ l: s4.l, t: s4.t, r: s4.r, b: s4.b }, u4, h4);
}
function Is(t2, e3, n2) {
  let r2 = { x: 0, y: 0 }, s4 = null, o4 = n2, i4 = 0;
  for (; o4 + 6 <= t2.length && i4 < 2e3; ) {
    const n3 = e3.getUint32(o4, true), a4 = e3.getUint16(o4 + 4, true);
    if (n3 < 3 || o4 + n3 * 2 > t2.length || a4 === Ss.EOF) break;
    a4 === Ss.SETWINDOWORG && n3 >= 5 && (r2 = { x: e3.getInt16(o4 + 8, true), y: e3.getInt16(o4 + 6, true) }), a4 === Ss.SETWINDOWEXT && n3 >= 5 && !s4 && (s4 = { x: e3.getInt16(o4 + 8, true), y: e3.getInt16(o4 + 6, true) }), o4 += n3 * 2, i4++;
  }
  const a3 = s4 ? Math.abs(s4.x) : 0, l3 = s4 ? Math.abs(s4.y) : 0;
  return { l: r2.x, t: r2.y, r: r2.x + (a3 || 1024), b: r2.y + (l3 || 768) };
}
function Os(t2, e3, n2, r2, s4) {
  const o4 = r2 + s4, i4 = new rr2(e3, r2 + 6, o4);
  switch (n2) {
    case Ss.POLYGON:
      t2.polyline(Us(i4), true);
      break;
    case Ss.POLYLINE:
      t2.polyline(Us(i4), false);
      break;
    case Ss.POLYPOLYGON: {
      const e4 = i4.u16();
      if (!e4 || e4 > 16384) break;
      const n3 = [];
      for (let t3 = 0; t3 < e4; t3++) n3.push(i4.u16());
      const r3 = [];
      for (const t3 of n3) {
        const e5 = [];
        for (let n4 = 0; n4 < t3 && i4.has(4); n4++) e5.push(i4.pt16());
        r3.push(e5);
      }
      t2.polyPoly(r3, true);
      break;
    }
    case Ss.RECTANGLE:
      t2.rect(Ds(i4));
      break;
    case Ss.ELLIPSE:
      t2.ellipse(Ds(i4));
      break;
    case Ss.ROUNDRECT: {
      const e4 = i4.i16(), n3 = i4.i16();
      t2.roundRect(Ds(i4), n3, e4);
      break;
    }
    case Ss.ARC:
    case Ss.CHORD:
    case Ss.PIE: {
      const e4 = i4.i16(), r3 = i4.i16(), s5 = i4.i16(), o5 = i4.i16(), a3 = Ds(i4);
      t2.arc(a3, o5, s5, r3, e4, n2 === Ss.CHORD ? "chord" : n2 === Ss.PIE ? "pie" : "arc");
      break;
    }
    case Ss.MOVETO: {
      const e4 = i4.i16(), n3 = i4.i16();
      t2.moveTo(n3, e4);
      break;
    }
    case Ss.LINETO: {
      const e4 = i4.i16(), n3 = i4.i16();
      t2.lineTo(n3, e4);
      break;
    }
    case Ss.SETPIXEL: {
      const e4 = i4.color(), n3 = i4.i16(), r3 = i4.i16();
      t2.dc.brush = { kind: "brush", style: gr2, color: e4, hatch: 0, href: null }, t2.dc.pen = { ...t2.dc.pen, style: pr2 }, t2.rect({ l: r3, t: n3, r: r3 + 1, b: n3 + 1 });
      break;
    }
    case Ss.PATBLT: {
      i4.u32();
      const e4 = i4.i16(), n3 = i4.i16(), r3 = i4.i16(), s5 = i4.i16();
      t2.dc.pen = { ...t2.dc.pen, style: pr2 }, t2.rect({ l: s5, t: r3, r: s5 + n3, b: r3 + e4 });
      break;
    }
    case Ss.CREATEPENINDIRECT:
      t2.addObj(Ns(i4));
      break;
    case Ss.CREATEBRUSHINDIRECT:
      t2.addObj(Bs(i4));
      break;
    case Ss.CREATEFONTINDIRECT:
      t2.addObj(Fs(i4));
      break;
    case Ss.SELECTOBJECT:
      t2.selectIdx(i4.u16());
      break;
    case Ss.DELETEOBJECT:
      t2.delObj(i4.u16());
      break;
    case Ss.CREATEPALETTE:
    case Ss.CREATEBRUSH:
    case Ss.CREATEREGION:
    case Ss.CREATEBITMAP:
    case Ss.CREATEBITMAPINDIRECT:
      t2.addObj({ kind: "brush", style: mr2, color: "#000000", hatch: 0, href: null });
      break;
    case Ss.CREATEPATTERNBRUSH:
    case Ss.DIBCREATEPATTERNBRUSH:
      t2.addObj(js(e3, r2, s4, n2));
      break;
    case Ss.SETWINDOWORG: {
      const e4 = i4.i16(), n3 = i4.i16();
      t2.dc.winOrg = { x: n3, y: e4 };
      break;
    }
    case Ss.SETWINDOWEXT: {
      const e4 = i4.i16(), n3 = i4.i16();
      t2.dc.winExt = { x: n3, y: e4 };
      break;
    }
    case Ss.SETVIEWPORTORG: {
      const e4 = i4.i16(), n3 = i4.i16();
      t2.dc.vpOrg = { x: n3, y: e4 };
      break;
    }
    case Ss.SETVIEWPORTEXT: {
      const e4 = i4.i16(), n3 = i4.i16();
      t2.dc.vpExt = { x: n3, y: e4 };
      break;
    }
    case Ss.OFFSETWINDOWORG: {
      const e4 = i4.i16(), n3 = i4.i16();
      t2.dc.winOrg = { x: t2.dc.winOrg.x + n3, y: t2.dc.winOrg.y + e4 };
      break;
    }
    case Ss.OFFSETVIEWPORTORG: {
      const e4 = i4.i16(), n3 = i4.i16();
      t2.dc.vpOrg = { x: t2.dc.vpOrg.x + n3, y: t2.dc.vpOrg.y + e4 };
      break;
    }
    case Ss.SCALEWINDOWEXT: {
      const e4 = i4.i16(), n3 = i4.i16(), r3 = i4.i16(), s5 = i4.i16();
      r3 && (t2.dc.winExt.x = t2.dc.winExt.x * s5 / r3), e4 && (t2.dc.winExt.y = t2.dc.winExt.y * n3 / e4);
      break;
    }
    case Ss.SCALEVIEWPORTEXT: {
      const e4 = i4.i16(), n3 = i4.i16(), r3 = i4.i16(), s5 = i4.i16();
      r3 && (t2.dc.vpExt.x = t2.dc.vpExt.x * s5 / r3), e4 && (t2.dc.vpExt.y = t2.dc.vpExt.y * n3 / e4);
      break;
    }
    case Ss.SETMAPMODE:
      t2.dc.mapMode = i4.u16();
      break;
    case Ss.SAVEDC:
      t2.save();
      break;
    case Ss.RESTOREDC:
      t2.restore(i4.i16());
      break;
    case Ss.SETBKMODE:
      t2.dc.bkMode = i4.u16();
      break;
    case Ss.SETBKCOLOR:
      t2.dc.bkColor = i4.color();
      break;
    case Ss.SETTEXTCOLOR:
      t2.dc.textColor = i4.color();
      break;
    case Ss.SETTEXTALIGN:
      t2.dc.textAlign = i4.u16();
      break;
    case Ss.SETPOLYFILLMODE:
      t2.dc.polyFill = i4.u16();
      break;
    case Ss.INTERSECTCLIPRECT:
      t2.intersectClip(Ds(i4));
      break;
    case Ss.TEXTOUT: {
      const n3 = i4.u16();
      if (n3 > 32768) break;
      const r3 = i4.p, s5 = n3 + (n3 & 1);
      i4.skip(s5);
      const a3 = i4.i16(), l3 = i4.i16(), c4 = Xr2(e3.subarray(r3, Math.min(r3 + n3, o4)), t2.dc.font.charset);
      t2.text(l3, a3, c4, null, null);
      break;
    }
    case Ss.EXTTEXTOUT: {
      const n3 = i4.i16(), r3 = i4.i16(), s5 = i4.u16(), a3 = i4.u16();
      if (s5 > 32768) break;
      let l3 = null;
      if (a3 & 6) {
        const t3 = i4.i16(), e4 = i4.i16(), n4 = i4.i16(), r4 = i4.i16();
        l3 = { l: t3, t: e4, r: n4, b: r4 };
      }
      const c4 = i4.p, u4 = s5 + (s5 & 1);
      i4.skip(u4);
      let h4 = null;
      if (i4.left >= s5 * 2 && s5 > 0) {
        h4 = [];
        for (let t3 = 0; t3 < s5; t3++) h4.push(i4.i16());
      }
      const f4 = Xr2(e3.subarray(c4, Math.min(c4 + s5, o4)), t2.dc.font.charset);
      t2.text(r3, n3, f4, h4, a3 & 2 ? l3 : null);
      break;
    }
    case Ss.STRETCHDIB: {
      i4.u32(), i4.u16(), i4.i16(), i4.i16(), i4.i16(), i4.i16();
      const n3 = i4.i16(), r3 = i4.i16(), s5 = i4.i16(), a3 = i4.i16();
      zs(t2, e3, i4.p, o4, a3, s5, r3, n3);
      break;
    }
    case Ss.DIBSTRETCHBLT: {
      const n3 = s4 === 28;
      if (i4.u32(), i4.i16(), i4.i16(), i4.i16(), i4.i16(), n3) break;
      const r3 = i4.i16(), a3 = i4.i16(), l3 = i4.i16(), c4 = i4.i16();
      zs(t2, e3, i4.p, o4, c4, l3, a3, r3);
      break;
    }
    case Ss.DIBBITBLT: {
      const n3 = s4 === 24;
      if (i4.u32(), i4.i16(), i4.i16(), n3) break;
      const r3 = i4.i16(), a3 = i4.i16(), l3 = i4.i16(), c4 = i4.i16();
      zs(t2, e3, i4.p, o4, c4, l3, a3, r3);
      break;
    }
  }
}
function zs(t2, e3, n2, r2, s4, o4, i4, a3) {
  if (n2 >= r2 || i4 === 0 || a3 === 0) return;
  const l3 = rs(e3, n2);
  if (!l3) return;
  const c4 = ns(e3, n2, l3, n2 + l3, r2 - n2 - l3);
  c4 && t2.image({ l: s4, t: o4, r: s4 + i4, b: o4 + a3 }, c4);
}
var Rs = 1 << 18;
function Us(t2) {
  const e3 = t2.u16();
  if (!e3 || e3 > Rs) return [];
  const n2 = Math.min(e3, t2.left >> 2), r2 = [];
  for (let e4 = 0; e4 < n2; e4++) r2.push(t2.pt16());
  return r2;
}
function Ds(t2) {
  const e3 = t2.i16(), n2 = t2.i16(), r2 = t2.i16();
  return { l: t2.i16(), t: r2, r: n2, b: e3 };
}
function Ns(t2) {
  const e3 = t2.u16(), n2 = t2.i16();
  return t2.i16(), { kind: "pen", style: e3 & 15, width: Math.abs(n2) || 1, color: t2.color(), cap: e3 & 3840, join: e3 & 61440 };
}
function Bs(t2) {
  const e3 = t2.u16(), n2 = t2.color(), r2 = t2.u16();
  return { kind: "brush", style: e3, color: n2, hatch: r2, href: null };
}
function Fs(t2) {
  const e3 = t2.i16();
  t2.i16();
  const n2 = t2.i16();
  t2.i16();
  const r2 = t2.i16(), s4 = t2.u8() !== 0, o4 = t2.u8() !== 0, i4 = t2.u8() !== 0, a3 = t2.u8();
  t2.skip(4);
  const l3 = t2.ansi(Math.min(32, t2.left)), c4 = Mr2();
  return { kind: "font", height: e3 || c4.height, escapement: n2, weight: r2 > 0 ? r2 : 400, italic: s4, underline: o4, strike: i4, charset: a3, face: l3 || c4.face };
}
function js(t2, e3, n2, r2) {
  const s4 = { kind: "brush", style: gr2, color: "#808080", hatch: 0, href: null };
  if (r2 !== Ss.DIBCREATEPATTERNBRUSH) return s4;
  const o4 = e3 + 6 + 4, i4 = e3 + n2, a3 = rs(t2, o4);
  if (!a3 || o4 + a3 >= i4) return s4;
  const l3 = ns(t2, o4, a3, o4 + a3, i4 - o4 - a3);
  return l3 ? { kind: "brush", style: 5, color: "#808080", hatch: 0, href: l3 } : s4;
}
var Hs = 2e5;
var Vs = 0;
var Ws = 1;
var Xs = 2;
var Ys = 3;
var _s = 4;
var Gs = { 0: 0, 2: 8, 3: 2, 4: 2, 5: 2, 6: 4, 7: 4, 8: 2, 9: 8, 10: 8, 11: 4, 12: 4, 13: 2, 14: 4, 15: 4, 16: 8, 21: 2, 22: 2, 23: 0, 24: 0, 25: 0, 26: 6, 27: 6, 28: 0, 29: 6, 30: 0, 31: 6, 35: 2, 45: 6, 46: 0, 47: 0, 61: 0, 62: 0, 63: 0, 77: 0, 78: 0, 79: 0, 93: 0, 94: 0, 95: 0, 109: 12, 110: 12, 111: 12, 125: 0, 126: 0, 127: 0, 141: 0, 142: 0, 143: 0 };
function qs(t2) {
  return Zs(t2) !== null;
}
function Zs(t2) {
  if (!t2 || t2.length < 16) return null;
  for (const e3 of [512, 0]) {
    if (e3 + 12 > t2.length) continue;
    const n2 = new DataView(t2.buffer, t2.byteOffset + e3, t2.length - e3), r2 = n2.getInt16(2, false), s4 = n2.getInt16(4, false), o4 = n2.getInt16(6, false), i4 = n2.getInt16(8, false);
    if (!(i4 > s4) || !(o4 > r2)) continue;
    const a3 = n2.getUint16(10, false);
    if (a3 === 17 && n2.getUint16(12, false) === 767) return { off: e3 + 14, v2: true, bounds: { l: s4, t: r2, r: i4, b: o4 } };
    if (a3 >> 8 === 17 && (a3 & 255) === 1) return { off: e3 + 12, v2: false, bounds: { l: s4, t: r2, r: i4, b: o4 } };
  }
  return null;
}
function Ks(t2, e3 = {}) {
  try {
    return Qs(t2, e3);
  } catch {
    return null;
  }
}
function Js() {
  return { fg: "#000000", bg: "#ffffff", penW: 1, penH: 1, penSolid: true, fillSolid: true, fillColor: "#000000", txFont: 0, txSize: 12, txFace: 0, ovalW: 0, ovalH: 0, origin: { x: 0, y: 0 } };
}
function Qs(t2, e3) {
  const n2 = Zs(t2);
  if (!n2) return null;
  const { bounds: r2, v2: s4 } = n2, o4 = r2.r - r2.l, i4 = r2.b - r2.t, a3 = new Nr2({ pxPerMmX: 72 / 25.4, pxPerMmY: 72 / 25.4 }), l3 = new rr2(t2, n2.off, t2.length), c4 = Js(), u4 = () => ({ kind: "pen", style: c4.penSolid && c4.penW > 0 ? cr2 : pr2, width: Math.max(c4.penW, c4.penH), color: c4.fg, cap: 0, join: 0 }), h4 = (t3, e4) => ({ kind: "brush", style: e4 ? gr2 : mr2, color: t3, hatch: 0, href: null }), f4 = (t3) => {
    switch (t3) {
      case Vs:
        return a3.select(u4()), a3.select(h4("#000000", false)), true;
      case Ws:
      case _s:
        return a3.select({ ...u4(), style: pr2 }), a3.select(h4(t3 === _s ? c4.fillColor : c4.fg, t3 === _s ? c4.fillSolid : c4.penSolid)), true;
      case Xs:
        return a3.select({ ...u4(), style: pr2 }), a3.select(h4(c4.bg, true)), true;
      case Ys:
        return a3.select({ ...u4(), style: pr2 }), a3.select(h4(c4.fg, true)), true;
      default:
        return false;
    }
  }, d4 = () => {
    const t3 = l3.i16be(), e4 = l3.i16be(), n3 = l3.i16be(), r3 = l3.i16be();
    return { l: e4, t: t3, r: r3, b: n3 };
  }, p4 = () => {
    const t3 = l3.i16be();
    return { x: l3.i16be(), y: t3 };
  }, g4 = () => {
    const t3 = l3.u16be(), e4 = l3.u16be(), n3 = l3.u16be();
    return or2(t3 >> 8, e4 >> 8, n3 >> 8);
  }, m4 = () => {
    const t3 = l3.u16be();
    if (t3 < 10) return l3.skip(Math.max(0, t3 - 2)), null;
    const e4 = d4();
    return l3.skip(t3 - 10), e4;
  };
  let x4 = { l: 0, t: 0, r: 0, b: 0 }, b4 = { l: 0, t: 0, r: 0, b: 0 }, w4 = { l: 0, t: 0, r: 0, b: 0 }, y4 = [], $3 = null, M4 = { x: 0, y: 0 }, v4 = false;
  const k3 = (t3, e4) => {
    if (f4(e4)) {
      switch (t3) {
        case "rect":
          a3.rect(x4);
          break;
        case "rrect":
          a3.roundRect(w4, c4.ovalW, c4.ovalH);
          break;
        case "oval":
          a3.ellipse(b4);
          break;
        case "poly":
          y4.length > 1 && a3.polyline(y4, true);
          break;
        case "arc": {
          if (!$3) return;
          const { rect: t4, start: n3, ext: r3 } = $3, s5 = (t4.l + t4.r) / 2, o5 = (t4.t + t4.b) / 2, i5 = (t4.r - t4.l) / 2, l4 = (t4.b - t4.t) / 2, c5 = (t5) => {
            const e5 = (90 - t5) * Math.PI / 180;
            return { x: s5 + i5 * Math.cos(e5), y: o5 - l4 * Math.sin(e5) };
          }, u5 = c5(n3), h5 = c5(n3 + r3);
          a3.arc(t4, u5.x, u5.y, h5.x, h5.y, e4 === Vs ? "arc" : "pie");
          break;
        }
      }
      v4 = true;
    }
  }, E3 = (t3, e4, n3) => {
    if (!n3) return;
    const r3 = { ...Mr2(), height: -Math.max(c4.txSize, 1), weight: c4.txFace & 1 ? 700 : 400, italic: !!(c4.txFace & 2) };
    a3.select(r3), a3.dc.textAlign = 24, a3.dc.textColor = c4.fg, a3.text(t3, e4, n3, null, null), v4 = true;
  };
  let T3 = 0;
  for (; l3.has(s4 ? 2 : 1) && T3++ < Hs && (s4 && (l3.pos - n2.off) % 2 === 1 && l3.skip(1), !!l3.has(s4 ? 2 : 1)); ) {
    const e4 = s4 ? l3.u16be() : l3.u8();
    if (e4 === 255) break;
    switch (e4) {
      case 1: {
        const t3 = m4();
        t3 && a3.intersectClip(t3);
        break;
      }
      case 7: {
        const t3 = p4();
        c4.penW = Math.abs(t3.x), c4.penH = Math.abs(t3.y);
        break;
      }
      case 9:
      case 10: {
        const t3 = [l3.u8(), l3.u8(), l3.u8(), l3.u8(), l3.u8(), l3.u8(), l3.u8(), l3.u8()].some((t4) => t4 !== 0);
        e4 === 9 ? c4.penSolid = t3 : (c4.fillSolid = t3, c4.fillColor = c4.fg);
        break;
      }
      case 11: {
        const t3 = p4();
        c4.ovalW = Math.abs(t3.x), c4.ovalH = Math.abs(t3.y);
        break;
      }
      case 12: {
        const t3 = p4();
        c4.origin = t3;
        break;
      }
      case 13:
        c4.txSize = l3.u16be();
        break;
      case 3:
        c4.txFont = l3.u16be();
        break;
      case 4:
        c4.txFace = l3.u8(), l3.skip(1);
        break;
      case 14:
      case 15: {
        const t3 = l3.u32be(), n3 = t3 === 0 ? "#000000" : t3 === 30 ? "#ffffff" : or2(t3 >> 16 & 255, t3 >> 8 & 255, t3 & 255);
        e4 === 14 ? c4.fg = n3 : c4.bg = n3;
        break;
      }
      case 26:
        c4.fg = g4();
        break;
      case 27:
        c4.bg = g4();
        break;
      case 32: {
        const t3 = p4(), e5 = p4();
        a3.select(u4()), a3.moveTo(t3.x, t3.y), a3.lineTo(e5.x, e5.y), M4 = e5, v4 = true;
        break;
      }
      case 33: {
        const t3 = p4();
        a3.select(u4()), a3.moveTo(M4.x, M4.y), a3.lineTo(t3.x, t3.y), M4 = t3, v4 = true;
        break;
      }
      case 34: {
        const t3 = p4(), e5 = l3.i8(), n3 = l3.i8();
        a3.select(u4()), a3.moveTo(t3.x, t3.y), a3.lineTo(t3.x + e5, t3.y + n3), M4 = { x: t3.x + e5, y: t3.y + n3 }, v4 = true;
        break;
      }
      case 35: {
        const t3 = l3.i8(), e5 = l3.i8();
        a3.select(u4()), a3.moveTo(M4.x, M4.y), a3.lineTo(M4.x + t3, M4.y + e5), M4 = { x: M4.x + t3, y: M4.y + e5 }, v4 = true;
        break;
      }
      case 40: {
        const t3 = p4();
        E3(t3.x, t3.y, l3.ansi(l3.u8())), M4 = t3;
        break;
      }
      case 41: {
        const t3 = l3.u8(), e5 = l3.ansi(l3.u8());
        M4 = { x: M4.x + t3, y: M4.y }, E3(M4.x, M4.y, e5);
        break;
      }
      case 42: {
        const t3 = l3.u8(), e5 = l3.ansi(l3.u8());
        M4 = { x: M4.x, y: M4.y + t3 }, E3(M4.x, M4.y, e5);
        break;
      }
      case 43: {
        const t3 = l3.u8(), e5 = l3.u8(), n3 = l3.ansi(l3.u8());
        M4 = { x: M4.x + t3, y: M4.y + e5 }, E3(M4.x, M4.y, n3);
        break;
      }
      case 44: {
        const t3 = l3.u16be();
        l3.skip(Math.max(0, t3));
        break;
      }
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
        x4 = d4(), k3("rect", e4 & 7);
        break;
      case 56:
      case 57:
      case 58:
      case 59:
      case 60:
        k3("rect", e4 & 7);
        break;
      case 64:
      case 65:
      case 66:
      case 67:
      case 68:
        w4 = d4(), k3("rrect", e4 & 7);
        break;
      case 72:
      case 73:
      case 74:
      case 75:
      case 76:
        k3("rrect", e4 & 7);
        break;
      case 80:
      case 81:
      case 82:
      case 83:
      case 84:
        b4 = d4(), k3("oval", e4 & 7);
        break;
      case 88:
      case 89:
      case 90:
      case 91:
      case 92:
        k3("oval", e4 & 7);
        break;
      case 96:
      case 97:
      case 98:
      case 99:
      case 100: {
        const t3 = d4(), n3 = l3.i16be(), r3 = l3.i16be();
        $3 = { rect: t3, start: n3, ext: r3 }, k3("arc", e4 & 7);
        break;
      }
      case 104:
      case 105:
      case 106:
      case 107:
      case 108: {
        const t3 = l3.i16be(), n3 = l3.i16be();
        $3 && ($3 = { rect: $3.rect, start: t3, ext: n3 }), k3("arc", e4 & 7);
        break;
      }
      case 112:
      case 113:
      case 114:
      case 115:
      case 116: {
        const t3 = l3.u16be(), n3 = l3.pos + t3 - 2;
        d4();
        const r3 = [];
        for (; l3.pos + 4 <= n3; ) r3.push(p4());
        l3.seek(n3), y4 = r3, k3("poly", e4 & 7);
        break;
      }
      case 120:
      case 121:
      case 122:
      case 123:
      case 124:
        k3("poly", e4 & 7);
        break;
      case 128:
      case 129:
      case 130:
      case 131:
      case 132: {
        const t3 = m4();
        t3 && (x4 = t3, k3("rect", e4 & 7));
        break;
      }
      case 136:
      case 137:
      case 138:
      case 139:
      case 140:
        k3("rect", e4 & 7);
        break;
      case 144:
      case 145:
      case 152:
      case 153:
      case 154:
      case 155: {
        if (!no2(l3, e4, a3)) return null;
        v4 = true;
        break;
      }
      case 160:
        l3.skip(2);
        break;
      case 161: {
        l3.skip(2);
        const t3 = l3.u16be();
        l3.skip(t3);
        break;
      }
      case 3072:
        l3.skip(24);
        break;
      case 33280:
      case 33281: {
        const e5 = l3.u32be(), n3 = l3.pos + e5, s5 = eo2(l3, n3);
        s5 && (a3.image(r2, s5), v4 = true), l3.seek(Math.min(n3, t2.length));
        break;
      }
      default: {
        const t3 = Gs[e4];
        if (t3 !== void 0) {
          l3.skip(t3);
          break;
        }
        const n3 = to2(e4, l3);
        if (n3 < 0) {
          T3 = Hs;
          break;
        }
        l3.skip(n3);
      }
    }
  }
  return v4 ? a3.render(r2, e3.width ?? o4, e3.height ?? i4) : null;
}
function to2(t2, e3) {
  return t2 >= 256 && t2 <= 32767 ? (t2 >> 8 & 255) * 2 : t2 >= 32768 && t2 <= 33023 ? 0 : t2 >= 33024 && e3.has(4) ? e3.u32be() : -1;
}
function eo2(t2, e3) {
  const n2 = t2.pos, r2 = t2.take(Math.max(0, Math.min(e3, t2.limit) - n2));
  t2.seek(n2);
  for (let t3 = 0; t3 + 3 < r2.length; t3++) {
    if (r2[t3] === 255 && r2[t3 + 1] === 216 && r2[t3 + 2] === 255) return `data:image/jpeg;base64,${_r2(r2.subarray(t3))}`;
    if (r2[t3] === 137 && r2[t3 + 1] === 80 && r2[t3 + 2] === 78 && r2[t3 + 3] === 71) return `data:image/png;base64,${_r2(r2.subarray(t3))}`;
  }
  return null;
}
function no2(t2, e3, n2) {
  const r2 = e3 === 154 || e3 === 155, s4 = e3 === 145 || e3 === 153 || e3 === 155;
  r2 && t2.skip(4);
  const o4 = t2.u16be() & 32767, i4 = t2.i16be(), a3 = t2.i16be(), l3 = t2.i16be(), c4 = t2.i16be() - a3, u4 = l3 - i4;
  if (c4 <= 0 || u4 <= 0 || c4 > 2e4 || u4 > 2e4) return false;
  const h4 = o4 >= 8;
  let f4 = 1, d4 = 1, p4 = [];
  if (r2 || (o4 & 32768) !== 0 || e3 === 152 || e3 === 153) {
    if (t2.skip(2), t2.u16be(), t2.skip(4), t2.skip(8), t2.skip(2), f4 = t2.u16be(), d4 = t2.u16be(), t2.u16be(), t2.skip(4), t2.skip(8), !r2) {
      t2.skip(4), t2.skip(2);
      const e4 = t2.u16be() + 1;
      if (e4 > 0 && e4 <= 256) {
        p4 = new Array(e4);
        for (let n3 = 0; n3 < e4; n3++) t2.skip(2), p4[n3] = [t2.u16be() >> 8, t2.u16be() >> 8, t2.u16be() >> 8];
      }
    }
  } else f4 = 1;
  t2.i16be(), t2.i16be(), t2.i16be(), t2.i16be();
  const g4 = { t: t2.i16be(), l: t2.i16be(), b: t2.i16be(), r: t2.i16be() };
  if (t2.skip(2), s4) {
    const e4 = t2.u16be();
    t2.skip(Math.max(0, e4 - 2));
  }
  const m4 = o4;
  if (m4 * u4 > 64 * 1024 * 1024) return false;
  const x4 = new Uint8Array(m4 * u4).fill(255);
  let b4 = 0;
  for (let e4 = 0; e4 < u4; e4++) {
    if (!h4) {
      if (!t2.has(m4)) break;
      x4.set(t2.take(m4), e4 * m4), b4++;
      continue;
    }
    const n3 = o4 > 250 ? t2.u16be() : t2.u8();
    if (n3 <= 0 || !t2.has(n3)) break;
    ro2(t2.take(n3), x4, e4 * m4, m4), b4++;
  }
  if (!b4) return false;
  const w4 = new Uint8Array(c4 * u4 * 4);
  for (let t3 = 0; t3 < u4; t3++) for (let e4 = 0; e4 < c4; e4++) {
    let n3 = 0, s5 = 0, o5 = 0;
    if (r2 && f4 === 32) {
      const r3 = t3 * m4, i6 = d4 === 3 ? 0 : c4;
      n3 = x4[r3 + i6 + e4], s5 = x4[r3 + i6 + c4 + e4], o5 = x4[r3 + i6 + c4 * 2 + e4];
    } else if (r2 && f4 === 16) {
      const r3 = x4[t3 * m4 + e4 * 2] << 8 | x4[t3 * m4 + e4 * 2 + 1];
      n3 = (r3 >> 10 & 31) * 8, s5 = (r3 >> 5 & 31) * 8, o5 = (r3 & 31) * 8;
    } else if (f4 === 8) {
      const r3 = x4[t3 * m4 + e4];
      [n3, s5, o5] = p4[r3] ?? [r3, r3, r3];
    } else if (f4 === 4) {
      const r3 = x4[t3 * m4 + (e4 >> 1)], i6 = e4 & 1 ? r3 & 15 : r3 >> 4;
      [n3, s5, o5] = p4[i6] ?? [0, 0, 0];
    } else {
      const r3 = x4[t3 * m4 + (e4 >> 3)] >> 7 - (e4 & 7) & 1;
      [n3, s5, o5] = p4[r3] ?? (r3 ? [0, 0, 0] : [255, 255, 255]);
    }
    const i5 = (t3 * c4 + e4) * 4;
    w4[i5] = n3, w4[i5 + 1] = s5, w4[i5 + 2] = o5, w4[i5 + 3] = 255;
  }
  const y4 = `data:image/png;base64,${_r2(Kr2(w4, c4, u4))}`;
  return n2.image({ l: g4.l, t: g4.t, r: g4.r, b: g4.b }, y4), true;
}
function ro2(t2, e3, n2, r2) {
  let s4 = 0, o4 = n2;
  const i4 = n2 + r2;
  for (; s4 < t2.length && o4 < i4; ) {
    const n3 = t2[s4++] << 24 >> 24;
    if (n3 >= 0) {
      const r3 = Math.min(n3 + 1, i4 - o4, t2.length - s4);
      e3.set(t2.subarray(s4, s4 + r3), o4), s4 += r3, o4 += r3;
    } else {
      if (s4 >= t2.length) break;
      const r3 = Math.min(1 - n3, i4 - o4);
      e3.fill(t2[s4++], o4, o4 + r3), o4 += r3;
    }
  }
}
function so2(t2) {
  return !t2 || t2.length < 20 ? null : as(t2) ? "emf" : Ls(t2) ? "wmf" : qs(t2) ? "pict" : null;
}
function oo2(t2, e3) {
  try {
    const n2 = so2(t2);
    return n2 === "emf" ? ls(t2, e3) : n2 === "wmf" ? As(t2, e3) : n2 === "pict" ? Ks(t2, e3) : null;
  } catch {
    return null;
  }
}
var io2 = 4294967294;
var ao2 = 4294967295;
var lo2 = class {
  constructor(t2) {
    if (this.fat = [], this.miniFat = [], this.dir = [], this.miniStream = new Uint8Array(0), t2.length < 512 || t2[0] !== 208 || t2[1] !== 207) throw new Error("\u4E0D\u662F\u6709\u6548\u7684 CFB \u590D\u5408\u6587\u6863");
    this.bytes = t2, this.view = new DataView(t2.buffer, t2.byteOffset, t2.byteLength), this.sectorSize = 1 << this.view.getUint16(30, true), this.miniSectorSize = 1 << this.view.getUint16(32, true), this.miniCutoff = this.view.getUint32(56, true), this.readFat(), this.readDirectory(), this.readMiniFat();
  }
  offsetOf(t2) {
    return (t2 + 1) * this.sectorSize;
  }
  readFat() {
    const t2 = [];
    for (let e4 = 0; e4 < 109; e4++) t2.push(this.view.getUint32(76 + e4 * 4, true));
    let e3 = this.view.getUint32(68, true);
    const n2 = this.sectorSize / 4;
    let r2 = 0;
    for (; e3 !== io2 && e3 !== ao2 && r2++ < 1e5; ) {
      const r3 = this.offsetOf(e3);
      if (r3 + this.sectorSize > this.bytes.length) break;
      for (let e4 = 0; e4 < n2 - 1; e4++) t2.push(this.view.getUint32(r3 + e4 * 4, true));
      e3 = this.view.getUint32(r3 + (n2 - 1) * 4, true);
    }
    for (const e4 of t2) {
      if (e4 === ao2 || e4 === io2) continue;
      const t3 = this.offsetOf(e4);
      if (!(t3 + this.sectorSize > this.bytes.length)) for (let e5 = 0; e5 < n2; e5++) this.fat.push(this.view.getUint32(t3 + e5 * 4, true));
    }
  }
  chain(t2, e3) {
    const n2 = [];
    let r2 = t2, s4 = 0;
    for (; r2 !== io2 && r2 !== ao2 && r2 >= 0 && r2 < e3.length && s4++ < 1e6; ) n2.push(r2), r2 = e3[r2];
    return n2;
  }
  readChain(t2, e3) {
    const n2 = this.chain(t2, this.fat), r2 = new Uint8Array(n2.length * this.sectorSize);
    return n2.forEach((t3, e4) => {
      const n3 = this.offsetOf(t3);
      r2.set(this.bytes.subarray(n3, Math.min(n3 + this.sectorSize, this.bytes.length)), e4 * this.sectorSize);
    }), r2.subarray(0, e3);
  }
  readDirectory() {
    const t2 = this.view.getUint32(48, true), e3 = this.chain(t2, this.fat), n2 = this.readChain(t2, e3.length * this.sectorSize), r2 = new DataView(n2.buffer, n2.byteOffset, n2.byteLength);
    for (let t3 = 0; t3 + 128 <= n2.length; t3 += 128) {
      const e4 = r2.getUint16(t3 + 64, true);
      if (e4 === 0 || e4 > 64) continue;
      let n3 = "";
      for (let s4 = 0; s4 < e4 - 2; s4 += 2) n3 += String.fromCharCode(r2.getUint16(t3 + s4, true));
      this.dir.push({ name: n3, type: r2.getUint8(t3 + 66), start: r2.getUint32(t3 + 116, true), size: r2.getUint32(t3 + 120, true) });
    }
  }
  readMiniFat() {
    const t2 = this.view.getUint32(60, true);
    if (t2 !== io2 && t2 !== ao2) {
      const e4 = this.chain(t2, this.fat), n2 = this.readChain(t2, e4.length * this.sectorSize), r2 = new DataView(n2.buffer, n2.byteOffset, n2.byteLength);
      for (let t3 = 0; t3 + 4 <= n2.length; t3 += 4) this.miniFat.push(r2.getUint32(t3, true));
    }
    const e3 = this.dir.find((t3) => t3.type === 5);
    e3 && (this.miniStream = this.readChain(e3.start, e3.size));
  }
  streamNames() {
    return this.dir.filter((t2) => t2.type === 2).map((t2) => t2.name);
  }
  stream(t2) {
    const e3 = this.dir.find((e4) => e4.type === 2 && e4.name.toLowerCase() === t2.toLowerCase());
    if (!e3) return null;
    if (e3.size >= this.miniCutoff) return this.readChain(e3.start, e3.size);
    const n2 = this.chain(e3.start, this.miniFat), r2 = new Uint8Array(n2.length * this.miniSectorSize);
    return n2.forEach((t3, e4) => {
      r2.set(this.miniStream.subarray(t3 * this.miniSectorSize, (t3 + 1) * this.miniSectorSize), e4 * this.miniSectorSize);
    }), r2.subarray(0, e3.size);
  }
};
var co2 = null;
var uo2 = null;
function ho2(t2) {
  uo2 = t2;
}
function fo2() {
  return uo2;
}
function po2(t2) {
  co2 = t2;
}
function mo2() {
  return co2;
}
function xo2(t2, e3) {
  return (t2 << e3 | t2 >>> 32 - e3) >>> 0;
}
function bo2(t2, e3, n2) {
  const r2 = t2.length * 8, s4 = Math.ceil((t2.length + 1 + n2) / e3) * e3, o4 = new Uint8Array(s4);
  o4.set(t2), o4[t2.length] = 128;
  const i4 = new DataView(o4.buffer);
  return i4.setUint32(s4 - 4, r2 >>> 0, false), i4.setUint32(s4 - 8, Math.floor(r2 / 4294967296), false), o4;
}
function wo2(t2) {
  const e3 = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], n2 = bo2(t2, 64, 8), r2 = new Uint32Array(80), s4 = new DataView(n2.buffer);
  for (let t3 = 0; t3 < n2.length; t3 += 64) {
    for (let e4 = 0; e4 < 16; e4++) r2[e4] = s4.getUint32(t3 + e4 * 4, false);
    for (let t4 = 16; t4 < 80; t4++) r2[t4] = xo2(r2[t4 - 3] ^ r2[t4 - 8] ^ r2[t4 - 14] ^ r2[t4 - 16], 1);
    let [n3, o5, i5, a3, l3] = e3;
    for (let t4 = 0; t4 < 80; t4++) {
      let e4, s5;
      t4 < 20 ? (e4 = o5 & i5 | ~o5 & a3, s5 = 1518500249) : t4 < 40 ? (e4 = o5 ^ i5 ^ a3, s5 = 1859775393) : t4 < 60 ? (e4 = o5 & i5 | o5 & a3 | i5 & a3, s5 = 2400959708) : (e4 = o5 ^ i5 ^ a3, s5 = 3395469782);
      const c4 = xo2(n3, 5) + e4 + l3 + s5 + r2[t4] >>> 0;
      l3 = a3, a3 = i5, i5 = xo2(o5, 30), o5 = n3, n3 = c4;
    }
    e3[0] = e3[0] + n3 >>> 0, e3[1] = e3[1] + o5 >>> 0, e3[2] = e3[2] + i5 >>> 0, e3[3] = e3[3] + a3 >>> 0, e3[4] = e3[4] + l3 >>> 0;
  }
  const o4 = new Uint8Array(20), i4 = new DataView(o4.buffer);
  for (let t3 = 0; t3 < 5; t3++) i4.setUint32(t3 * 4, e3[t3], false);
  return o4;
}
var yo2 = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
function $o2(t2) {
  const e3 = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), n2 = bo2(t2, 64, 8), r2 = new DataView(n2.buffer), s4 = new Uint32Array(64), o4 = (t3, e4) => t3 >>> e4 | t3 << 32 - e4;
  for (let t3 = 0; t3 < n2.length; t3 += 64) {
    for (let e4 = 0; e4 < 16; e4++) s4[e4] = r2.getUint32(t3 + e4 * 4, false);
    for (let t4 = 16; t4 < 64; t4++) {
      const e4 = o4(s4[t4 - 15], 7) ^ o4(s4[t4 - 15], 18) ^ s4[t4 - 15] >>> 3, n4 = o4(s4[t4 - 2], 17) ^ o4(s4[t4 - 2], 19) ^ s4[t4 - 2] >>> 10;
      s4[t4] = s4[t4 - 16] + e4 + s4[t4 - 7] + n4 >>> 0;
    }
    let [n3, i5, a4, l3, c4, u4, h4, f4] = e3;
    for (let t4 = 0; t4 < 64; t4++) {
      const e4 = o4(c4, 6) ^ o4(c4, 11) ^ o4(c4, 25), r3 = c4 & u4 ^ ~c4 & h4, d5 = f4 + e4 + r3 + yo2[t4] + s4[t4] >>> 0, p4 = o4(n3, 2) ^ o4(n3, 13) ^ o4(n3, 22), g4 = n3 & i5 ^ n3 & a4 ^ i5 & a4, m4 = p4 + g4 >>> 0;
      f4 = h4, h4 = u4, u4 = c4, c4 = l3 + d5 >>> 0, l3 = a4, a4 = i5, i5 = n3, n3 = d5 + m4 >>> 0;
    }
    const d4 = [n3, i5, a4, l3, c4, u4, h4, f4];
    for (let t4 = 0; t4 < 8; t4++) e3[t4] = e3[t4] + d4[t4] >>> 0;
  }
  const i4 = new Uint8Array(32), a3 = new DataView(i4.buffer);
  for (let t3 = 0; t3 < 8; t3++) a3.setUint32(t3 * 4, e3[t3], false);
  return i4;
}
var Mo2 = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298, 3391569614, 3515267271, 3940187606, 4118630271, 116418474, 174292421, 289380356, 460393269, 685471733, 852142971, 1017036298, 1126000580, 1288033470, 1501505948, 1607167915, 1816402316]);
var vo2 = new Uint32Array([3609767458, 602891725, 3964484399, 2173295548, 4081628472, 3053834265, 2937671579, 3664609560, 2734883394, 1164996542, 1323610764, 3590304994, 4068182383, 991336113, 633803317, 3479774868, 2666613458, 944711139, 2341262773, 2007800933, 1495990901, 1856431235, 3175218132, 2198950837, 3999719339, 766784016, 2566594879, 3203337956, 1034457026, 2466948901, 3758326383, 168717936, 1188179964, 1546045734, 1522805485, 2643833823, 2343527390, 1014477480, 1206759142, 344077627, 1290863460, 3158454273, 3505952657, 106217008, 3606008344, 1432725776, 1467031594, 851169720, 3100823752, 1363258195, 3750685593, 3785050280, 3318307427, 3812723403, 2003034995, 3602036899, 1575990012, 1125592928, 2716904306, 442776044, 593698344, 3733110249, 2999351573, 3815920427, 3928383900, 566280711, 3454069534, 4000239992, 1914138554, 2731055270, 3203993006, 320620315, 587496836, 1086792851, 365543100, 2618297676, 3409855158, 4234509866, 987167468, 1246189591]);
var ko2 = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209];
var Eo2 = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428];
function To2(t2, e3, n2) {
  const r2 = new Uint32Array(8), s4 = new Uint32Array(8);
  for (let t3 = 0; t3 < 8; t3++) r2[t3] = e3[t3 * 2], s4[t3] = e3[t3 * 2 + 1];
  const o4 = bo2(t2, 128, 16), i4 = new DataView(o4.buffer), a3 = new Uint32Array(80), l3 = new Uint32Array(80);
  let c4 = 0, u4 = 0;
  const h4 = (t3, e4, n3) => {
    if (n3 < 32) c4 = t3 >>> n3 | e4 << 32 - n3, u4 = e4 >>> n3 | t3 << 32 - n3;
    else if (n3 === 32) c4 = e4, u4 = t3;
    else {
      const r3 = n3 - 32;
      c4 = e4 >>> r3 | t3 << 32 - r3, u4 = t3 >>> r3 | e4 << 32 - r3;
    }
  }, f4 = (t3, e4, n3) => {
    n3 < 32 ? (c4 = t3 >>> n3, u4 = e4 >>> n3 | t3 << 32 - n3) : (c4 = 0, u4 = t3 >>> n3 - 32);
  };
  for (let t3 = 0; t3 < o4.length; t3 += 128) {
    for (let e5 = 0; e5 < 16; e5++) a3[e5] = i4.getUint32(t3 + e5 * 8, false), l3[e5] = i4.getUint32(t3 + e5 * 8 + 4, false);
    for (let t4 = 16; t4 < 80; t4++) {
      h4(a3[t4 - 15], l3[t4 - 15], 1);
      let e5 = c4, n4 = u4;
      h4(a3[t4 - 15], l3[t4 - 15], 8), e5 ^= c4, n4 ^= u4, f4(a3[t4 - 15], l3[t4 - 15], 7), e5 ^= c4, n4 ^= u4, h4(a3[t4 - 2], l3[t4 - 2], 19);
      let r3 = c4, s5 = u4;
      h4(a3[t4 - 2], l3[t4 - 2], 61), r3 ^= c4, s5 ^= u4, f4(a3[t4 - 2], l3[t4 - 2], 6), r3 ^= c4, s5 ^= u4;
      const o6 = (l3[t4 - 16] >>> 0) + (n4 >>> 0) + (l3[t4 - 7] >>> 0) + (s5 >>> 0);
      l3[t4] = o6 >>> 0, a3[t4] = a3[t4 - 16] + e5 + a3[t4 - 7] + r3 + Math.floor(o6 / 4294967296) >>> 0;
    }
    let e4 = r2[0], n3 = s4[0], o5 = r2[1], d5 = s4[1], p5 = r2[2], g4 = s4[2], m4 = r2[3], x4 = s4[3], b4 = r2[4], w4 = s4[4], y4 = r2[5], $3 = s4[5], M4 = r2[6], v4 = s4[6], k3 = r2[7], E3 = s4[7];
    for (let t4 = 0; t4 < 80; t4++) {
      h4(b4, w4, 14);
      let r3 = c4, s5 = u4;
      h4(b4, w4, 18), r3 ^= c4, s5 ^= u4, h4(b4, w4, 41), r3 ^= c4, s5 ^= u4;
      const i5 = b4 & y4 ^ ~b4 & M4, f5 = w4 & $3 ^ ~w4 & v4;
      let T4 = (E3 >>> 0) + (s5 >>> 0) + (f5 >>> 0) + vo2[t4] + (l3[t4] >>> 0);
      const C5 = T4 >>> 0, S4 = k3 + r3 + i5 + Mo2[t4] + a3[t4] + Math.floor(T4 / 4294967296) >>> 0;
      h4(e4, n3, 28);
      let L4 = c4, A4 = u4;
      h4(e4, n3, 34), L4 ^= c4, A4 ^= u4, h4(e4, n3, 39), L4 ^= c4, A4 ^= u4;
      const P4 = e4 & o5 ^ e4 & p5 ^ o5 & p5, I4 = n3 & d5 ^ n3 & g4 ^ d5 & g4;
      T4 = (A4 >>> 0) + (I4 >>> 0);
      const O3 = T4 >>> 0, z3 = L4 + P4 + Math.floor(T4 / 4294967296) >>> 0;
      k3 = M4, E3 = v4, M4 = y4, v4 = $3, y4 = b4, $3 = w4, T4 = (x4 >>> 0) + (C5 >>> 0), w4 = T4 >>> 0, b4 = m4 + S4 + Math.floor(T4 / 4294967296) >>> 0, m4 = p5, x4 = g4, p5 = o5, g4 = d5, o5 = e4, d5 = n3, T4 = (C5 >>> 0) + (O3 >>> 0), n3 = T4 >>> 0, e4 = S4 + z3 + Math.floor(T4 / 4294967296) >>> 0;
    }
    const T3 = [e4, o5, p5, m4, b4, y4, M4, k3], C4 = [n3, d5, g4, x4, w4, $3, v4, E3];
    for (let t4 = 0; t4 < 8; t4++) {
      const e5 = (s4[t4] >>> 0) + (C4[t4] >>> 0);
      s4[t4] = e5 >>> 0, r2[t4] = r2[t4] + T3[t4] + Math.floor(e5 / 4294967296) >>> 0;
    }
  }
  const d4 = new Uint8Array(64), p4 = new DataView(d4.buffer);
  for (let t3 = 0; t3 < 8; t3++) p4.setUint32(t3 * 8, r2[t3], false), p4.setUint32(t3 * 8 + 4, s4[t3], false);
  return d4.subarray(0, n2);
}
var Co2 = (t2) => To2(t2, ko2, 64);
var So2 = (t2) => To2(t2, Eo2, 48);
function Lo2(t2) {
  switch (t2.toUpperCase().replace(/[-_]/g, "")) {
    case "SHA1":
      return wo2;
    case "SHA256":
      return $o2;
    case "SHA384":
      return So2;
    case "SHA512":
      return Co2;
    default:
      return null;
  }
}
var Ao2 = new Uint8Array(256);
var Po2 = new Uint8Array(256);
var Io2 = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77]);
(function() {
  const t2 = new Uint8Array(256), e3 = new Uint8Array(256);
  let n2 = 1;
  for (let r2 = 0; r2 < 256; r2++) t2[r2] = n2, e3[n2] = r2, n2 ^= n2 << 1 ^ (n2 & 128 ? 283 : 0), n2 &= 255;
  for (let n3 = 0; n3 < 256; n3++) {
    let r2 = n3 ? t2[255 - e3[n3]] : 0, s4 = r2;
    for (let t3 = 0; t3 < 4; t3++) r2 = (r2 << 1 | r2 >>> 7) & 255, s4 ^= r2;
    Ao2[n3] = s4 ^ 99;
  }
  for (let t3 = 0; t3 < 256; t3++) Po2[Ao2[t3]] = t3;
})();
function Oo2(t2) {
  return (t2 << 1 ^ (t2 & 128 ? 27 : 0)) & 255;
}
function zo2(t2, e3) {
  let n2 = 0;
  for (; e3; ) e3 & 1 && (n2 ^= t2), t2 = Oo2(t2), e3 >>= 1;
  return n2 & 255;
}
function Ro2(t2) {
  const e3 = t2.length / 4, n2 = e3 + 6, r2 = [];
  for (let n3 = 0; n3 < e3; n3++) r2.push([t2[n3 * 4], t2[n3 * 4 + 1], t2[n3 * 4 + 2], t2[n3 * 4 + 3]]);
  for (let t3 = e3; t3 < 4 * (n2 + 1); t3++) {
    let n3 = r2[t3 - 1].slice();
    t3 % e3 === 0 ? n3 = [Ao2[n3[1]] ^ Io2[t3 / e3 - 1], Ao2[n3[2]], Ao2[n3[3]], Ao2[n3[0]]] : e3 > 6 && t3 % e3 === 4 && (n3 = n3.map((t4) => Ao2[t4])), r2.push(n3.map((n4, s5) => n4 ^ r2[t3 - e3][s5]));
  }
  const s4 = [];
  for (let t3 = 0; t3 <= n2; t3++) {
    const e4 = new Uint8Array(16);
    for (let n3 = 0; n3 < 4; n3++) for (let s5 = 0; s5 < 4; s5++) e4[n3 * 4 + s5] = r2[t3 * 4 + n3][s5];
    s4.push(e4);
  }
  return s4;
}
function Uo2(t2, e3, n2, r2, s4) {
  const o4 = new Uint8Array(16);
  for (let r3 = 0; r3 < 16; r3++) o4[r3] = e3[n2 + r3] ^ t2[t2.length - 1][r3];
  for (let e4 = t2.length - 2; e4 >= 0; e4--) {
    const n3 = o4.slice();
    for (let t3 = 0; t3 < 4; t3++) for (let e5 = 0; e5 < 4; e5++) o4[(t3 + e5) % 4 * 4 + e5] = n3[t3 * 4 + e5];
    for (let t3 = 0; t3 < 16; t3++) o4[t3] = Po2[o4[t3]];
    for (let n4 = 0; n4 < 16; n4++) o4[n4] ^= t2[e4][n4];
    if (e4 > 0) for (let t3 = 0; t3 < 4; t3++) {
      const e5 = o4[t3 * 4], n4 = o4[t3 * 4 + 1], r3 = o4[t3 * 4 + 2], s5 = o4[t3 * 4 + 3];
      o4[t3 * 4] = zo2(e5, 14) ^ zo2(n4, 11) ^ zo2(r3, 13) ^ zo2(s5, 9), o4[t3 * 4 + 1] = zo2(e5, 9) ^ zo2(n4, 14) ^ zo2(r3, 11) ^ zo2(s5, 13), o4[t3 * 4 + 2] = zo2(e5, 13) ^ zo2(n4, 9) ^ zo2(r3, 14) ^ zo2(s5, 11), o4[t3 * 4 + 3] = zo2(e5, 11) ^ zo2(n4, 13) ^ zo2(r3, 9) ^ zo2(s5, 14);
    }
  }
  r2.set(o4, s4);
}
function Do2(t2, e3) {
  const n2 = Ro2(t2), r2 = new Uint8Array(e3.length - e3.length % 16);
  for (let t3 = 0; t3 + 16 <= e3.length; t3 += 16) Uo2(n2, e3, t3, r2, t3);
  return r2;
}
function No2(t2, e3, n2) {
  const r2 = Ro2(t2), s4 = n2.length - n2.length % 16, o4 = new Uint8Array(s4);
  let i4 = e3.subarray(0, 16);
  for (let t3 = 0; t3 + 16 <= s4; t3 += 16) {
    Uo2(r2, n2, t3, o4, t3);
    for (let e4 = 0; e4 < 16; e4++) o4[t3 + e4] ^= i4[e4];
    i4 = n2.subarray(t3, t3 + 16);
  }
  return o4;
}
var Bo2 = 5e4;
var Fo2 = new Uint8Array([254, 167, 210, 118, 59, 75, 158, 121]);
var jo2 = new Uint8Array([215, 170, 15, 109, 48, 97, 52, 78]);
var Ho2 = new Uint8Array([20, 110, 11, 231, 171, 172, 208, 214]);
var Vo2 = class extends Error {
  constructor() {
    super("\u5BC6\u7801\u9519\u8BEF"), this.name = "WrongPasswordError";
  }
};
var Wo2 = class extends Error {
  constructor() {
    super("\u8BE5\u6587\u4EF6\u5DF2\u52A0\u5BC6\uFF0C\u9700\u8981\u63D0\u4F9B\u6253\u5F00\u5BC6\u7801"), this.name = "PasswordRequiredError";
  }
};
function Xo2(...t2) {
  const e3 = t2.reduce((t3, e4) => t3 + e4.length, 0), n2 = new Uint8Array(e3);
  let r2 = 0;
  for (const e4 of t2) n2.set(e4, r2), r2 += e4.length;
  return n2;
}
function Yo2(t2) {
  const e3 = new Uint8Array(t2.length * 2), n2 = new DataView(e3.buffer);
  for (let e4 = 0; e4 < t2.length; e4++) n2.setUint16(e4 * 2, t2.charCodeAt(e4), true);
  return e3;
}
function _o2(t2) {
  const e3 = new Uint8Array(4);
  return new DataView(e3.buffer).setUint32(0, t2 >>> 0, true), e3;
}
function Go(t2, e3, n2) {
  if (t2.length < n2 || e3.length < n2) return false;
  let r2 = 0;
  for (let s4 = 0; s4 < n2; s4++) r2 |= t2[s4] ^ e3[s4];
  return r2 === 0;
}
function qo2(t2, e3, n2, r2) {
  let s4 = t2(Xo2(e3, Yo2(n2)));
  for (let e4 = 0; e4 < r2; e4++) s4 = t2(Xo2(_o2(e4), s4));
  return s4;
}
function Zo2(t2, e3) {
  if (t2.length >= e3) return t2.subarray(0, e3);
  const n2 = new Uint8Array(e3).fill(54);
  return n2.set(t2), n2;
}
function Ko(t2) {
  const e3 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength), n2 = e3.getUint32(8, true);
  if (n2 < 32 || 12 + n2 + 8 > t2.length) return null;
  const r2 = e3.getUint32(28, true), s4 = r2 >= 8 ? r2 / 8 : 16;
  let o4 = 12 + n2;
  const i4 = e3.getUint32(o4, true);
  if (o4 += 4, i4 !== 16) return null;
  const a3 = t2.subarray(o4, o4 + 16);
  o4 += 16;
  const l3 = t2.subarray(o4, o4 + 16);
  o4 += 16;
  const c4 = e3.getUint32(o4, true);
  if (o4 += 4, c4 < 20) return null;
  const u4 = t2.subarray(o4, o4 + 32);
  return { keyBytes: s4, salt: a3, encryptedVerifier: l3, encryptedVerifierHash: u4 };
}
function Jo2(t2, e3) {
  const n2 = qo2(wo2, t2.salt, e3, Bo2), r2 = wo2(Xo2(n2, _o2(0))), s4 = wo2(new Uint8Array(64).map((t3, e4) => (e4 < r2.length ? r2[e4] : 0) ^ 54)), o4 = wo2(new Uint8Array(64).map((t3, e4) => (e4 < r2.length ? r2[e4] : 0) ^ 92));
  return Zo2(Xo2(s4, o4), t2.keyBytes);
}
function Qo(t2, e3, n2) {
  const r2 = Ko(t2);
  if (!r2) throw new Error("\u65E0\u6CD5\u89E3\u6790\u6807\u51C6\u52A0\u5BC6\u7684 EncryptionInfo");
  const s4 = Jo2(r2, n2), o4 = Do2(s4, r2.encryptedVerifier), i4 = Do2(s4, r2.encryptedVerifierHash);
  if (!Go(wo2(o4), i4, 20)) throw new Vo2();
  const a3 = Number(new DataView(e3.buffer, e3.byteOffset, e3.byteLength).getBigUint64(0, true)), l3 = Do2(s4, e3.subarray(8));
  return l3.subarray(0, Math.min(a3, l3.length));
}
function ti(t2) {
  const e3 = typeof atob == "function" ? atob(t2) : globalThis.Buffer.from(t2, "base64").toString("binary"), n2 = new Uint8Array(e3.length);
  for (let t3 = 0; t3 < e3.length; t3++) n2[t3] = e3.charCodeAt(t3);
  return n2;
}
function ei(t2) {
  var e3, n2;
  const r2 = new TextDecoder().decode(t2.subarray(8)), s4 = ((e3 = /<[^>]*keyData\b[^>]*>/.exec(r2)) == null ? void 0 : e3[0]) ?? "", o4 = ((n2 = /<[^>]*encryptedKey\b[^>]*>/.exec(r2)) == null ? void 0 : n2[0]) ?? "";
  if (!s4 || !o4) return null;
  const i4 = (t3, e4) => {
    const n3 = new RegExp(`\\b${e4}="([^"]*)"`).exec(t3);
    return n3 ? n3[1] : null;
  }, a3 = Lo2(i4(s4, "hashAlgorithm") ?? ""), l3 = Lo2(i4(o4, "hashAlgorithm") ?? "");
  if (!a3 || !l3 || (i4(s4, "cipherAlgorithm") ?? "AES") !== "AES") return null;
  const c4 = (t3, e4, n3) => {
    const r3 = Number(i4(t3, e4));
    return Number.isFinite(r3) && r3 > 0 ? r3 : n3;
  };
  return { hash: a3, hashSize: c4(s4, "hashSize", 64), blockSize: c4(s4, "blockSize", 16), keyBytes: c4(s4, "keyBits", 256) / 8, keySalt: ti(i4(s4, "saltValue") ?? ""), spinCount: c4(o4, "spinCount", 1e5), pwSalt: ti(i4(o4, "saltValue") ?? ""), pwKeyBytes: c4(o4, "keyBits", 256) / 8, pwHash: l3, encryptedKeyValue: ti(i4(o4, "encryptedKeyValue") ?? ""), encryptedVerifierHashInput: ti(i4(o4, "encryptedVerifierHashInput") ?? ""), encryptedVerifierHashValue: ti(i4(o4, "encryptedVerifierHashValue") ?? "") };
}
function ni(t2, e3, n2) {
  return Zo2(t2.pwHash(Xo2(e3, n2)), t2.pwKeyBytes);
}
function ri(t2, e3, n2) {
  const r2 = ei(t2);
  if (!r2) throw new Error("\u65E0\u6CD5\u89E3\u6790\u654F\u6377\u52A0\u5BC6\u7684 EncryptionInfo");
  const s4 = qo2(r2.pwHash, r2.pwSalt, n2, r2.spinCount), o4 = No2(ni(r2, s4, Fo2), r2.pwSalt, r2.encryptedVerifierHashInput), i4 = No2(ni(r2, s4, jo2), r2.pwSalt, r2.encryptedVerifierHashValue);
  if (!Go(r2.pwHash(o4.subarray(0, 16)), i4, Math.min(r2.hashSize, i4.length))) throw new Vo2();
  const a3 = No2(ni(r2, s4, Ho2), r2.pwSalt, r2.encryptedKeyValue).subarray(0, r2.keyBytes), l3 = Number(new DataView(e3.buffer, e3.byteOffset, e3.byteLength).getBigUint64(0, true)), c4 = e3.subarray(8), u4 = 4096, h4 = new Uint8Array(c4.length);
  for (let t3 = 0, e4 = 0; e4 < c4.length; t3++, e4 += u4) {
    const n3 = Zo2(r2.hash(Xo2(r2.keySalt, _o2(t3))), r2.blockSize), s5 = c4.subarray(e4, Math.min(e4 + u4, c4.length));
    h4.set(No2(a3, n3, s5), e4);
  }
  return h4.subarray(0, Math.min(l3, h4.length));
}
function si(t2, e3, n2) {
  if (t2.length < 16 || e3.length < 16) throw new Error("\u52A0\u5BC6\u6D41\u4E0D\u5B8C\u6574");
  const r2 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength), s4 = r2.getUint16(0, true), o4 = r2.getUint16(2, true);
  if (s4 === 4 && o4 === 4) return ri(t2, e3, n2);
  if (s4 === 4 && o4 === 3) throw new Error("\u4E0D\u652F\u6301\u6269\u5C55\u52A0\u5BC6\uFF08\u81EA\u5B9A\u4E49\u52A0\u5BC6\u63D0\u4F9B\u7A0B\u5E8F\uFF09");
  return Qo(t2, e3, n2);
}
var ii = 4090610911;
var ai = 4085;
var li = 6002;
var ci = 12052;
function ui(t2, e3) {
  const n2 = new Uint8Array(256);
  for (let t3 = 0; t3 < 256; t3++) n2[t3] = t3;
  let r2 = 0;
  for (let e4 = 0; e4 < 256; e4++) {
    r2 = r2 + n2[e4] + t2[e4 % t2.length] & 255;
    const s5 = n2[e4];
    n2[e4] = n2[r2], n2[r2] = s5;
  }
  const s4 = new Uint8Array(e3.length);
  let o4 = 0;
  r2 = 0;
  for (let t3 = 0; t3 < e3.length; t3++) {
    o4 = o4 + 1 & 255, r2 = r2 + n2[o4] & 255;
    const i4 = n2[o4];
    n2[o4] = n2[r2], n2[r2] = i4, s4[t3] = e3[t3] ^ n2[n2[o4] + n2[r2] & 255];
  }
  return s4;
}
function hi(t2) {
  const e3 = new Uint8Array(t2.length * 2), n2 = new DataView(e3.buffer);
  for (let e4 = 0; e4 < t2.length; e4++) n2.setUint16(e4 * 2, t2.charCodeAt(e4), true);
  return e3;
}
function fi(t2) {
  const e3 = new Uint8Array(4);
  return new DataView(e3.buffer).setUint32(0, t2 >>> 0, true), e3;
}
function di(t2, e3) {
  const n2 = new Uint8Array(t2.length + e3.length);
  return n2.set(t2), n2.set(e3, t2.length), n2;
}
function pi(t2) {
  return !t2 || t2.length < 16 ? false : new DataView(t2.buffer, t2.byteOffset, t2.byteLength).getUint32(12, true) === ii;
}
function gi(t2) {
  if (t2.length < 40) return null;
  const e3 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength), n2 = e3.getUint32(8, true);
  if (n2 < 20 || 12 + n2 + 40 > t2.length) return null;
  const r2 = e3.getUint32(28, true) || 40;
  let s4 = 12 + n2;
  const o4 = e3.getUint32(s4, true);
  if (s4 += 4, o4 !== 16) return null;
  const i4 = t2.subarray(s4, s4 + 16);
  s4 += 16;
  const a3 = t2.subarray(s4, s4 + 16);
  s4 += 16;
  const l3 = e3.getUint32(s4, true);
  return s4 += 4, l3 < 20 ? null : { keyBytes: Math.max(1, Math.floor(r2 / 8)), salt: i4, encVerifier: a3, encVerifierHash: t2.subarray(s4, s4 + 20) };
}
function mi(t2, e3, n2) {
  const r2 = wo2(di(e3, fi(n2))).subarray(0, t2.keyBytes);
  if (t2.keyBytes !== 5) return r2;
  const s4 = new Uint8Array(16);
  return s4.set(r2), s4;
}
function xi(t2, e3) {
  const n2 = new DataView(e3.buffer, e3.byteOffset, e3.byteLength), r2 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength), s4 = (t3) => r2.getUint32(t3 + 4, true), o4 = (t3) => r2.getUint16(t3 + 2, true), i4 = [], a3 = /* @__PURE__ */ new Map();
  let l3 = -1, c4 = n2.getUint32(16, true), u4 = 0;
  for (; c4 > 0 && c4 + 8 <= t2.length && u4++ < 64; ) {
    if (o4(c4) !== ai) return null;
    const e4 = s4(c4);
    i4.push([c4, 8 + e4]);
    const n3 = c4 + 8, u5 = r2.getUint32(n3 + 8, true), h5 = r2.getUint32(n3 + 12, true);
    if (e4 >= 32 && l3 < 0 && (l3 = r2.getUint32(n3 + 28, true)), h5 > 0 && h5 + 8 <= t2.length && o4(h5) === li) {
      const e5 = s4(h5);
      i4.push([h5, 8 + e5]);
      let n4 = h5 + 8;
      const o5 = Math.min(n4 + e5, t2.length);
      for (; n4 + 4 <= o5; ) {
        const t3 = r2.getUint32(n4, true);
        n4 += 4;
        const e6 = t3 & 1048575, s5 = t3 >>> 20;
        for (let t4 = 0; t4 < s5 && n4 + 4 <= o5; t4++) a3.has(e6 + t4) || a3.set(e6 + t4, r2.getUint32(n4, true)), n4 += 4;
      }
    }
    c4 = u5;
  }
  const h4 = l3 >= 0 ? a3.get(l3) : void 0;
  if (h4 === void 0 || h4 + 8 > t2.length || o4(h4) !== ci) return null;
  const f4 = s4(h4);
  i4.push([h4, 8 + f4]);
  const d4 = gi(t2.subarray(h4 + 8, h4 + 8 + f4));
  return d4 ? { info: d4, persists: [...a3.entries()].filter(([t3]) => t3 !== l3).map(([t3, e4]) => ({ id: t3, offset: e4 })), plain: i4 } : null;
}
function bi(t2, e3, n2) {
  const r2 = xi(t2, e3);
  if (!r2) return null;
  const { info: s4, persists: o4, plain: i4 } = r2, a3 = wo2(di(s4.salt, hi(n2))), l3 = mi(s4, a3, 0), c4 = ui(l3, di(s4.encVerifier, s4.encVerifierHash)), u4 = wo2(c4.subarray(0, 16));
  let h4 = 0;
  for (let t3 = 0; t3 < 20; t3++) h4 |= u4[t3] ^ c4[16 + t3];
  if (h4 !== 0) throw new Vo2();
  const f4 = new Uint8Array(t2);
  new DataView(t2.buffer, t2.byteOffset, t2.byteLength);
  const d4 = [];
  for (const { id: e4, offset: n3 } of o4) {
    if (n3 + 8 > t2.length) continue;
    const r3 = ui(mi(s4, a3, e4), t2.subarray(n3, n3 + 8)), o5 = new DataView(r3.buffer).getUint32(4, true), i5 = Math.min(8 + o5, t2.length - n3);
    !(i5 > 8) || i5 > t2.length || (f4.set(ui(mi(s4, a3, e4), t2.subarray(n3, n3 + i5)), n3), d4.push([n3, i5]));
  }
  if (!d4.length) return null;
  for (const [e4, n3] of i4) e4 >= 0 && e4 + n3 <= t2.length && f4.set(t2.subarray(e4, e4 + n3), e4);
  return f4;
}
function* wi(t2, e3, n2) {
  let r2 = e3;
  for (; r2 + 8 <= n2; ) {
    const e4 = t2.getUint16(r2, true), s4 = t2.getUint16(r2 + 2, true), o4 = t2.getUint32(r2 + 4, true), i4 = r2 + 8;
    if (o4 < 0 || i4 + o4 > n2) return;
    const a3 = e4 & 15;
    yield { type: s4, instance: e4 >> 4, version: a3, isContainer: a3 === 15, start: i4, len: o4 }, r2 = i4 + o4;
  }
}
function yi(t2, e3, n2, r2) {
  for (const s4 of wi(t2, e3, n2)) if (s4.type === r2) return s4;
  return null;
}
function $i(t2, e3, n2, r2) {
  const s4 = [];
  for (const o4 of wi(t2, e3, n2)) o4.type === r2 && s4.push(o4);
  return s4;
}
function Mi(t2, e3, n2) {
  let r2 = "";
  for (let s4 = 0; s4 + 2 <= n2; s4 += 2) r2 += String.fromCharCode(t2.getUint16(e3 + s4, true));
  return r2;
}
function vi(t2, e3, n2) {
  let r2 = "";
  for (let s4 = 0; s4 < n2; s4++) r2 += String.fromCharCode(t2.getUint8(e3 + s4));
  return r2;
}
function ki(t2, e3, n2) {
  const r2 = [], s4 = (e4, o4, i4) => {
    for (const a3 of wi(t2, e4, o4)) {
      if (a3.type === Ei.ProgBinaryTag) {
        let e5 = "";
        for (const s5 of wi(t2, a3.start, a3.start + a3.len)) s5.type === Ei.CString ? e5 = Mi(t2, s5.start, s5.len).replace(/\0+$/, "") : s5.type === Ei.BinaryTagDataBlob && e5 === n2 && r2.push(s5);
        continue;
      }
      a3.isContainer && i4 > 0 && s4(a3.start, a3.start + a3.len, i4 - 1);
    }
  };
  return s4(e3.start, e3.start + e3.len, 6), r2;
}
var Ei = { Document: 1e3, DocumentAtom: 1001, Slide: 1006, SlideAtom: 1007, Notes: 1008, NotesAtom: 1009, MainMaster: 1016, SSSlideInfoAtom: 1017, SlidePersistAtom: 1011, ExObjList: 1033, PPDrawing: 1036, ColorSchemeAtom: 2032, SlideListWithText: 4080, TextHeaderAtom: 3999, TextCharsAtom: 4e3, TextBytesAtom: 4008, StyleTextPropAtom: 4001, TxMasterStyleAtom: 4003, FontEntityAtom: 4023, OEPlaceholderAtom: 3011, ExHyperlinkAtom: 4051, ExHyperlink: 4055, CString: 4026, TextInteractiveInfoAtom: 4063, InteractiveInfo: 4082, InteractiveInfoAtom: 4083, PersistDirectoryAtom: 6002, ProgBinaryTag: 5002, BinaryTagDataBlob: 5003, StyleTextProp9Atom: 4012 };
var Ti = { ExtTimeNodeContainer: 61764, TimeNodeAtom: 61735, TimeConditionContainer: 61733, TimeConditionAtom: 61736, ClientVisualElement: 61756, TimePropertyList: 61757, TimeVariant: 61762, VisualShapeAtom: 11003 };
var Ci = { DgContainer: 61442, SpgrContainer: 61443, SpContainer: 61444, Spgr: 61449, Sp: 61450, Opt: 61451, ClientTextbox: 61453, ChildAnchor: 61455, ClientAnchor: 61456, ClientData: 61457 };
var Si = 8388608;
var Li = 16777216;
var Ai = 33554432;
var Pi = 1048576;
var Ii = [[1, 2], [2, 2], [4, 2], [32, 2], [64, 4], [128, 4]];
var Oi = 256;
function zi(t2, e3) {
  const n2 = [], r2 = e3.start + e3.len;
  let s4 = e3.start;
  for (; s4 + 4 <= r2; ) {
    const e4 = t2.getUint32(s4, true);
    s4 += 4, e4 & Si && (s4 += 2);
    let o4 = null;
    if (e4 & Ai) {
      if (s4 + 2 > r2) return [];
      o4 = t2.getUint16(s4, true) !== 0, s4 += 2;
    }
    let i4 = null;
    if (e4 & Li) {
      if (s4 + 4 > r2) return [];
      i4 = { scheme: t2.getUint16(s4, true), startNum: t2.getUint16(s4 + 2, true) || 1 }, s4 += 4;
    }
    if (s4 + 4 > r2) return [];
    const a3 = t2.getUint32(s4, true);
    if (s4 += 4, a3 & Pi && (s4 += 4), s4 + 4 > r2) return [];
    const l3 = t2.getUint32(s4, true);
    s4 += 4;
    for (const [t3, e5] of Ii) l3 & t3 && (s4 += e5);
    if (l3 & Oi) {
      if (s4 + 4 > r2) return [];
      s4 += 4 + t2.getUint32(s4, true) * 4;
    }
    if (s4 > r2) return [];
    n2.push(o4 === false ? null : i4);
  }
  return s4 === r2 ? n2 : [];
}
function Ri(t2, e3) {
  const n2 = [];
  for (const r2 of ki(t2, e3, "___PPT9")) for (const e4 of $i(t2, r2.start, r2.start + r2.len, Ei.StyleTextProp9Atom)) n2.push(...zi(t2, e4));
  return n2;
}
function Ui(t2, e3) {
  const n2 = Di[t2] ?? "arabic", r2 = n2 === "alphaLc" ? Bi(e3).toLowerCase() : n2 === "alphaUc" ? Bi(e3) : n2 === "romanLc" ? Fi(e3).toLowerCase() : n2 === "romanUc" ? Fi(e3) : n2 === "circle" ? ji(e3) : String(e3), s4 = Ni[t2] ?? "";
  return s4 === "both" ? `(${r2})` : s4 === "right" ? `${r2})` : s4 === "period" ? `${r2}.` : s4 === "minus" ? `-${r2}-` : r2;
}
var Di = { 0: "alphaLc", 1: "alphaUc", 2: "arabic", 3: "arabic", 4: "romanLc", 5: "romanLc", 6: "romanLc", 7: "romanUc", 8: "alphaLc", 9: "alphaLc", 10: "alphaUc", 11: "alphaUc", 12: "arabic", 13: "arabic", 14: "romanUc", 15: "romanUc", 16: "arabic", 17: "arabic", 18: "circle", 19: "circle", 20: "circle", 21: "arabic", 22: "arabic", 23: "arabic", 24: "arabic", 25: "arabic", 26: "arabic", 27: "arabic", 28: "arabic", 29: "arabic", 30: "arabic", 31: "arabic", 32: "arabic" };
var Ni = { 0: "period", 1: "period", 2: "right", 3: "period", 4: "both", 5: "right", 6: "period", 7: "period", 8: "both", 9: "right", 10: "both", 11: "right", 12: "both", 14: "both", 15: "right", 17: "period", 21: "period", 23: "period", 25: "period", 27: "period", 29: "period", 30: "minus", 31: "minus", 32: "minus" };
function Bi(t2) {
  let e3 = "", n2 = t2;
  for (; n2 > 0; ) e3 = String.fromCharCode(65 + (n2 - 1) % 26) + e3, n2 = Math.floor((n2 - 1) / 26);
  return e3 || "A";
}
function Fi(t2) {
  const e3 = [[1e3, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let n2 = "", r2 = t2;
  for (const [t3, s4] of e3) for (; r2 >= t3; ) n2 += s4, r2 -= t3;
  return n2 || "I";
}
var ji = (t2) => t2 >= 1 && t2 <= 20 ? String.fromCharCode(9312 + t2 - 1) : String(t2);
function Hi(t2, e3) {
  const n2 = /* @__PURE__ */ new Map(), r2 = /* @__PURE__ */ new Map(), s4 = e3.instance;
  let o4 = e3.start;
  const i4 = e3.start + Math.min(s4 * 6, e3.len), a3 = [];
  for (let r3 = 0; r3 < s4 && o4 + 6 <= e3.start + e3.len; r3++, o4 += 6) {
    const e4 = t2.getUint16(o4, true), r4 = e4 & 16383, s5 = (e4 & 32768) !== 0, i5 = t2.getUint32(o4 + 2, true);
    s5 ? a3.push({ id: r4, len: i5 }) : n2.set(r4, i5);
  }
  let l3 = i4;
  for (const t3 of a3) {
    if (l3 + t3.len > e3.start + e3.len) break;
    r2.set(t3.id, { start: l3, len: t3.len }), l3 += t3.len;
  }
  return { simple: n2, complex: r2 };
}
var Vi = { rotation: 4, tableProperties: 927, tableRowProperties: 928, lTxid: 128, anchorText: 135, pib: 260, cropFromTop: 256, cropFromBottom: 257, cropFromLeft: 258, cropFromRight: 259, wzName: 896, geoLeft: 320, geoTop: 321, geoRight: 322, geoBottom: 323, pVertices: 325, pSegmentInfo: 326, adjustValue: 327, adjust2Value: 328, adjust3Value: 329, adjust4Value: 330, fillType: 384, fillColor: 385, fillOpacity: 386, fillBackColor: 387, fillBackOpacity: 388, fillFocus: 396, fillBlip: 390, fillAngle: 395, fillStyleBooleans: 447, lineColor: 448, lineOpacity: 449, lineWidth: 459, lineDashing: 462, lineStartArrow: 464, lineEndArrow: 465, lineStyleBooleans: 511, shadowColor: 513, shadowOpacity: 516, shadowOffsetX: 517, shadowOffsetY: 518, shadowStyleBooleans: 575 };
var Wi = (t2) => t2 > 2147483647 ? t2 - 4294967296 : t2;
function Xi(t2, e3, n2 = 1) {
  const r2 = t2 >> 24 & 255;
  let s4, o4, i4;
  if (r2 === 8 || r2 === 1) {
    const n3 = t2 & 255, r3 = e3[n3] ?? "000000";
    s4 = parseInt(r3.slice(0, 2), 16), o4 = parseInt(r3.slice(2, 4), 16), i4 = parseInt(r3.slice(4, 6), 16);
  } else s4 = t2 & 255, o4 = t2 >> 8 & 255, i4 = t2 >> 16 & 255;
  return n2 >= 1 ? `rgb(${s4},${o4},${i4})` : `rgba(${s4},${o4},${i4},${Math.round(n2 * 1e3) / 1e3})`;
}
var Yi = (t2, e3) => t2 === void 0 || !(t2 & e3 << 16) ? null : (t2 & e3) !== 0;
function _i(t2) {
  const e3 = t2.simple.get(Vi.fillAngle), n2 = e3 === void 0 ? 0 : Wi(e3) / 65536;
  let r2 = n2 >= 0, s4 = Wi(t2.simple.get(Vi.fillFocus) ?? 0);
  s4 === 0 ? r2 = !r2 : s4 < 0 && (s4 = -s4, r2 = !r2);
  const o4 = s4 > 40 && s4 < 60;
  o4 && (r2 = !r2);
  let i4 = 90 - n2;
  for (; i4 < 0; ) i4 += 360;
  for (; i4 >= 360; ) i4 -= 360;
  return { angle: Math.round(i4 * 1e3) / 1e3, backFirst: !r2, axial: o4 };
}
function Gi(t2, e3, n2) {
  const r2 = Yi(t2.simple.get(Vi.fillStyleBooleans), 16);
  if (r2 === false) return { type: "none" };
  const s4 = t2.simple.get(Vi.fillType) ?? 0, o4 = (t2.simple.get(Vi.fillOpacity) ?? 65536) / 65536;
  if (s4 === 3 || s4 === 2) {
    const e4 = t2.simple.get(Vi.fillBlip) ?? t2.simple.get(Vi.pib), r3 = e4 !== void 0 ? n2(e4) : null;
    if (r3) return { type: "image", src: r3, alpha: o4 < 1 ? o4 : void 0 };
  }
  if (s4 === 4 || s4 === 5 || s4 === 6 || s4 === 7) {
    const n3 = t2.simple.get(Vi.fillColor), r3 = t2.simple.get(Vi.fillBackColor), i5 = (t2.simple.get(Vi.fillBackOpacity) ?? 65536) / 65536;
    if (n3 !== void 0 || r3 !== void 0) {
      const a3 = Xi(n3 ?? 16777215, e3, o4), l3 = Xi(r3 ?? 16777215, e3, i5);
      if (s4 === 5 || s4 === 6) return { type: "gradient", angle: 90, stops: [{ pos: 0, color: a3 }, { pos: 1, color: l3 }] };
      const c4 = _i(t2), [u4, h4] = c4.backFirst ? [l3, a3] : [a3, l3];
      return { type: "gradient", angle: c4.angle, stops: c4.axial ? [{ pos: 0, color: u4 }, { pos: 0.5, color: h4 }, { pos: 1, color: u4 }] : [{ pos: 0, color: u4 }, { pos: 1, color: h4 }] };
    }
  }
  const i4 = t2.simple.get(Vi.fillColor);
  return i4 === void 0 ? r2 === true ? { type: "solid", color: Xi(16777215, e3) } : null : { type: "solid", color: Xi(i4, e3, o4) };
}
var qi = { 1: [4, 3], 2: [1, 3], 3: [4, 3, 1, 3], 4: [4, 3, 1, 3, 1, 3], 5: [8, 3], 6: [8, 3, 1, 3], 7: [8, 3, 1, 3, 1, 3], 8: [1, 1], 9: [3, 3], 10: [3, 3, 1, 3] };
function Zi(t2) {
  const e3 = (e4) => Wi(t2.simple.get(e4) ?? 0) / 65536, n2 = { t: e3(Vi.cropFromTop), b: e3(Vi.cropFromBottom), l: e3(Vi.cropFromLeft), r: e3(Vi.cropFromRight) };
  return Object.values(n2).some((t3) => Math.abs(t3) > 1e-9) ? n2 : null;
}
var Ki = { 1: "triangle", 2: "stealth", 3: "diamond", 4: "oval", 5: "arrow" };
function Ji(t2, e3) {
  const n2 = Yi(t2.simple.get(Vi.lineStyleBooleans), 8);
  if (n2 === false) return null;
  const r2 = t2.simple.get(Vi.lineColor);
  if (r2 === void 0 && n2 !== true) return null;
  const s4 = (t2.simple.get(Vi.lineWidth) ?? 9525) / 9525, o4 = t2.simple.get(Vi.lineDashing), i4 = (t2.simple.get(Vi.lineOpacity) ?? 65536) / 65536, a3 = t2.simple.get(Vi.lineStartArrow), l3 = t2.simple.get(Vi.lineEndArrow);
  return { color: Xi(r2 ?? 0, e3, i4), width: s4, dash: o4 ? (qi[o4] ?? [4, 3]).map((t3) => t3 * Math.max(s4, 1)) : null, head: a3 && Ki[a3] ? { type: Ki[a3], w: 3, h: 3 } : void 0, tail: l3 && Ki[l3] ? { type: Ki[l3], w: 3, h: 3 } : void 0 };
}
function Qi(t2, e3) {
  if (Yi(t2.simple.get(Vi.shadowStyleBooleans), 2) !== true) return;
  const n2 = Wi(t2.simple.get(Vi.shadowOffsetX) ?? 25400) / 9525, r2 = Wi(t2.simple.get(Vi.shadowOffsetY) ?? 25400) / 9525, s4 = Math.max(0, Math.min(1, (t2.simple.get(Vi.shadowOpacity) ?? 65536) / 65536)), o4 = t2.simple.get(Vi.shadowColor) ?? 8421504;
  if (!(s4 <= 0 || n2 === 0 && r2 === 0)) return { dx: n2, dy: r2, blur: 4, color: Xi(o4, e3, s4) };
}
var ta = { 1: "rect", 2: "roundRect", 3: "ellipse", 4: "diamond", 5: "triangle", 6: "rtTriangle", 7: "parallelogram", 8: "trapezoid", 9: "hexagon", 10: "octagon", 11: "plus", 12: "star5", 13: "rightArrow", 14: "rightArrow", 15: "homePlate", 16: "cube", 17: "wedgeRoundRectCallout", 18: "star8", 19: "arc", 20: "line", 21: "plaque", 22: "can", 23: "donut", 24: "rect", 25: "octagon", 26: "hexagon", 27: "rect", 28: "wave", 29: "donut", 30: "rect", 31: "donut", 32: "straightConnector1", 33: "bentConnector2", 34: "bentConnector3", 35: "bentConnector4", 36: "bentConnector5", 37: "curvedConnector2", 38: "curvedConnector3", 39: "curvedConnector4", 40: "curvedConnector5", 41: "callout1", 42: "callout2", 43: "callout2", 44: "callout1", 45: "callout2", 46: "callout2", 47: "borderCallout1", 48: "borderCallout2", 49: "borderCallout2", 50: "borderCallout1", 51: "borderCallout2", 52: "borderCallout2", 53: "ribbon", 54: "ribbon2", 55: "chevron", 56: "pentagon", 57: "noSmoking", 58: "star8", 59: "star16", 60: "star32", 61: "wedgeRectCallout", 62: "wedgeRoundRectCallout", 63: "wedgeEllipseCallout", 64: "wave", 65: "foldedCorner", 66: "leftArrow", 67: "downArrow", 68: "upArrow", 69: "leftRightArrow", 70: "upDownArrow", 71: "irregularSeal1", 72: "irregularSeal2", 73: "lightningBolt", 74: "heart", 75: "rect", 76: "quadArrow", 77: "leftArrowCallout", 78: "rightArrowCallout", 79: "upArrowCallout", 80: "downArrowCallout", 81: "leftRightArrowCallout", 82: "upArrowCallout", 83: "quadArrow", 84: "bevel", 85: "leftBracket", 86: "rightBracket", 87: "leftBrace", 88: "rightBrace", 89: "leftRightUpArrow", 90: "bentArrow", 91: "bentArrow", 92: "star24", 93: "stripedRightArrow", 94: "notchedRightArrow", 95: "blockArc", 96: "smileyFace", 97: "verticalScroll", 98: "horizontalScroll", 99: "circularArrow", 100: "circularArrow", 101: "uturnArrow", 102: "curvedRightArrow", 103: "curvedLeftArrow", 104: "curvedUpArrow", 105: "curvedDownArrow", 106: "cloudCallout", 107: "ribbon", 108: "ribbon2", 109: "flowChartProcess", 110: "flowChartDecision", 111: "flowChartInputOutput", 112: "flowChartPredefinedProcess", 113: "flowChartInternalStorage", 114: "flowChartDocument", 115: "flowChartMultidocument", 116: "flowChartTerminator", 117: "flowChartPreparation", 118: "flowChartManualInput", 119: "flowChartManualOperation", 120: "flowChartConnector", 121: "flowChartPunchedCard", 122: "flowChartPunchedTape", 123: "flowChartSummingJunction", 124: "flowChartOr", 125: "flowChartCollate", 126: "flowChartSort", 127: "flowChartExtract", 128: "flowChartMerge", 129: "flowChartOnlineStorage", 130: "flowChartOnlineStorage", 131: "flowChartMagneticTape", 132: "flowChartMagneticDisk", 133: "flowChartMagneticDrum", 134: "flowChartDisplay", 135: "flowChartDelay", 176: "flowChartAlternateProcess", 177: "flowChartOffpageConnector", 178: "callout1", 179: "callout1", 180: "borderCallout1", 181: "borderCallout1", 182: "leftRightUpArrow", 183: "sun", 184: "moon", 185: "bracketPair", 186: "bracePair", 187: "star4", 188: "doubleWave", 189: "actionButtonBlank", 190: "actionButtonHome", 191: "actionButtonHelp", 192: "actionButtonInformation", 193: "actionButtonForwardNext", 194: "actionButtonBackPrevious", 195: "actionButtonEnd", 196: "actionButtonBeginning", 197: "actionButtonReturn", 198: "actionButtonDocument", 199: "actionButtonSound", 200: "actionButtonMovie", 202: "rect" };
var ea = 75;
function na(t2) {
  const e3 = [];
  if (!t2.length) return e3;
  const n2 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength), r2 = { 61469: "image/jpeg", 61470: "image/png", 61471: "image/bmp", 61481: "image/tiff", 61482: "image/jpeg" }, s4 = { 61466: "image/emf", 61467: "image/wmf", 61468: "image/pict" };
  for (const o4 of wi(n2, 0, t2.length)) {
    const i4 = o4.type in s4, a3 = i4 ? s4[o4.type] : r2[o4.type];
    if (!a3) continue;
    let l3 = o4.start + ((o4.instance & 1) === 1 ? 32 : 16);
    const c4 = o4.start + o4.len;
    if (l3 >= c4) continue;
    if (!i4) {
      e3.push({ mime: a3, data: t2.subarray(l3 + 1, c4) });
      continue;
    }
    if (l3 + 34 > c4) continue;
    const u4 = n2.getUint32(l3, true), h4 = n2.getUint8(l3 + 32), f4 = t2.subarray(l3 + 34, c4);
    if (h4 === 0) try {
      const t3 = K(f4, u4 ? { out: new Uint8Array(u4) } : void 0);
      e3.push({ mime: a3, data: t3 });
    } catch {
      try {
        e3.push({ mime: a3, data: H(f4) });
      } catch {
      }
    }
    else e3.push({ mime: a3, data: f4 });
  }
  return e3;
}
function ra(t2, e3) {
  if (e3.len < 8) return null;
  const n2 = t2.getInt16(e3.start, true), r2 = t2.getInt16(e3.start + 2, true), s4 = t2.getInt16(e3.start + 4, true), o4 = t2.getInt16(e3.start + 6, true);
  return { x: r2, y: n2, w: s4 - r2, h: o4 - n2 };
}
function sa(t2, e3) {
  if (e3.len < 16) return null;
  const n2 = t2.getInt32(e3.start, true), r2 = t2.getInt32(e3.start + 4, true), s4 = t2.getInt32(e3.start + 8, true), o4 = t2.getInt32(e3.start + 12, true);
  return { x: n2, y: r2, w: s4 - n2, h: o4 - r2 };
}
function oa(t2, e3) {
  if (e3.len < 16) return null;
  const n2 = t2.getInt32(e3.start, true), r2 = t2.getInt32(e3.start + 4, true), s4 = t2.getInt32(e3.start + 8, true), o4 = t2.getInt32(e3.start + 12, true);
  return { x: n2, y: r2, w: s4 - n2, h: o4 - r2 };
}
function ia(t2, e3) {
  return { id: t2.getUint32(e3.start, true), flags: t2.getUint32(e3.start + 4, true) };
}
var aa = { GROUP: 1, PATRIARCH: 4, DELETED: 8, OLE: 16, FLIPH: 64, FLIPV: 128, BACKGROUND: 1024 };
function la(t2, e3, n2) {
  const r2 = e3.complex.get(n2);
  return r2 ? Mi(t2, r2.start, r2.len).replace(/\0+$/, "") : null;
}
function ca(t2, e3) {
  const n2 = e3.complex.get(Vi.tableRowProperties);
  if (!n2 || n2.len < 6) return [];
  const r2 = t2.getUint16(n2.start, true), s4 = t2.getInt16(n2.start + 4, true), o4 = s4 > 0 ? s4 : 4, i4 = [];
  for (let e4 = 0; e4 < r2; e4++) {
    const r3 = n2.start + 6 + e4 * o4;
    if (r3 + 4 > n2.start + n2.len) break;
    i4.push(t2.getInt32(r3, true));
  }
  return i4;
}
function ua(t2) {
  return t2.simple.has(Vi.tableProperties) || t2.complex.has(Vi.tableRowProperties);
}
var ha = { 1: "dissolve", 2: "blinds", 3: "checker", 4: "cover", 5: "dissolve", 6: "fade", 7: "pull", 8: "randomBar", 9: "strips", 10: "wipe", 11: "zoom", 12: "zoom", 13: "split", 17: "zoom", 18: "blinds", 19: "blinds", 20: "push", 21: "comb", 22: "newsflash", 23: "fade", 26: "wedge", 27: "wheel", 28: "circle", 29: "diamond", 30: "plus" };
var fa = { 0: "l", 1: "u", 2: "r", 3: "d" };
var da = { 0: "horz-out", 1: "horz-in", 2: "vert-out", 3: "vert-in" };
var pa = { 0: "out", 1: "in" };
function ga(t2, e3) {
  if (t2 === "split") return da[e3];
  if (t2 === "zoom" || t2 === "circle" || t2 === "diamond" || t2 === "plus" || t2 === "wedge") return pa[e3];
  if (t2 === "push" || t2 === "pull" || t2 === "cover" || t2 === "wipe" || t2 === "strips" || t2 === "blinds" || t2 === "comb" || t2 === "wheel" || t2 === "randomBar") return fa[e3];
}
var ma = { 0: 1e3, 1: 750, 2: 500 };
var xa = 4;
var ba = 1024;
function wa(t2, e3) {
  const n2 = yi(t2, e3.start, e3.start + e3.len, Ei.SSSlideInfoAtom);
  if (!n2 || n2.len < 13) return null;
  const r2 = t2.getInt32(n2.start, true), s4 = t2.getUint8(n2.start + 8), o4 = t2.getUint8(n2.start + 9), i4 = t2.getUint16(n2.start + 10, true), a3 = t2.getUint8(n2.start + 12), l3 = ha[o4], c4 = l3 === void 0 ? void 0 : { type: l3, dir: ga(l3, s4), durationMs: ma[a3] ?? 750, advanceAfterMs: i4 & ba && r2 > 0 ? r2 : void 0 };
  return { hidden: (i4 & xa) !== 0, transition: c4 };
}
var ya = { effectId: 9, effectDir: 10, effectClass: 11, nodeType: 20 };
var $a = 1;
var Ma = 2;
var va = 3;
var ka = { 1: "entrance", 2: "exit", 3: "emphasis", 4: "motion", 5: "emphasis", 6: "emphasis" };
function Ea(t2, e3) {
  if (e3.len < 5) return null;
  const n2 = t2.getUint8(e3.start);
  return n2 !== 1 && n2 !== 0 ? null : n2 === 1 ? t2.getInt32(e3.start + 1, true) : t2.getUint8(e3.start + 1);
}
function Ta(t2, e3) {
  return e3.len < 3 || t2.getUint8(e3.start) !== 3 ? null : Mi(t2, e3.start + 1, e3.len - 1).replace(/\0+$/, "");
}
function Ca(t2, e3) {
  const n2 = /* @__PURE__ */ new Map(), r2 = yi(t2, e3.start, e3.start + e3.len, Ti.TimePropertyList);
  if (!r2) return n2;
  for (const e4 of $i(t2, r2.start, r2.start + r2.len, Ti.TimeVariant)) {
    const r3 = Ea(t2, e4);
    r3 !== null && n2.set(e4.instance, r3);
  }
  return n2;
}
function Sa(t2, e3) {
  for (const n2 of $i(t2, e3.start, e3.start + e3.len, Ti.TimeConditionContainer)) {
    if (n2.instance !== 1) continue;
    const e4 = yi(t2, n2.start, n2.start + n2.len, Ti.TimeConditionAtom);
    if (!e4 || e4.len < 16) continue;
    const r2 = t2.getInt32(e4.start + 12, true);
    return r2 > 0 ? r2 : 0;
  }
  return 0;
}
function La(t2, e3) {
  const n2 = yi(t2, e3.start, e3.start + e3.len, Ti.TimeNodeAtom);
  if (!n2 || n2.len < 32) return null;
  const r2 = t2.getInt32(n2.start + 24, true);
  return r2 > 1 ? r2 : null;
}
function Aa(t2, e3, n2, r2, s4 = 12) {
  for (const o4 of wi(t2, e3, n2)) {
    if (o4.type === Ti.ClientVisualElement) {
      const e4 = yi(t2, o4.start, o4.start + o4.len, Ti.VisualShapeAtom);
      e4 && e4.len >= 12 && r2.target === void 0 && (r2.target = t2.getUint32(e4.start + 8, true));
      continue;
    }
    if (o4.type === Ti.TimeVariant && r2.filter === void 0) {
      const e4 = Ta(t2, o4);
      e4 && (r2.filter = e4);
      continue;
    }
    if (o4.type === Ti.TimeNodeAtom && o4.len >= 32 && r2.duration === void 0) {
      const e4 = t2.getInt32(o4.start + 24, true);
      e4 > 1 && (r2.duration = e4);
      continue;
    }
    o4.type === Ti.ExtTimeNodeContainer && Ca(t2, o4).has(ya.effectId) || o4.isContainer && s4 > 0 && Aa(t2, o4.start, o4.start + o4.len, r2, s4 - 1);
  }
}
function Pa(t2, e3) {
  const n2 = [], r2 = (e4, s5, o4) => {
    for (const i4 of $i(t2, e4, s5, Ti.ExtTimeNodeContainer)) {
      const e5 = Ca(t2, i4);
      if (e5.has(ya.effectId)) {
        const r3 = Ia(t2, i4, e5);
        r3 && n2.push(r3);
        continue;
      }
      o4 > 0 && r2(i4.start, i4.start + i4.len, o4 - 1);
    }
  };
  for (const n3 of ki(t2, e3, "___PPT10")) r2(n3.start, n3.start + n3.len, 16);
  if (!n2.length) return;
  let s4 = -1;
  for (const t3 of n2) (t3.trigger === "click" || s4 < 0) && s4++, t3.clickGroup = s4;
  return n2;
}
function Ia(t2, e3, n2) {
  const r2 = {};
  if (Aa(t2, e3.start, e3.start + e3.len, r2), r2.target === void 0) return null;
  const { effect: s4, dir: o4 } = wt(n2.get(ya.effectId) ?? 10, n2.get(ya.effectDir) ?? 0, r2.filter), i4 = n2.get(ya.nodeType) ?? $a, a3 = r2.duration ?? La(t2, e3) ?? 500;
  return { target: r2.target, effect: s4, dir: o4, delayMs: Sa(t2, e3), durationMs: Math.max(60, Math.min(1e4, a3)), trigger: i4 === Ma ? "withPrev" : i4 === va ? "afterPrev" : "click", kind: ka[n2.get(ya.effectClass) ?? 1] ?? "entrance" };
}
function Oa(t2, e3, n2, r2) {
  const s4 = e3.complex.get(Vi.pVertices), o4 = e3.complex.get(Vi.pSegmentInfo);
  if (!s4) return null;
  const i4 = (e4, n3) => {
    if (e4.len < 6 || e4.start < 0 || e4.start + 6 > t2.byteLength) return [];
    const r3 = t2.getUint16(e4.start, true), s5 = t2.getInt16(e4.start + 4, true), o5 = s5 === -4 ? 8 : s5;
    if (o5 <= 0) return [];
    const i5 = Math.min(e4.start + e4.len, t2.byteLength), a4 = [];
    for (let t3 = 0; t3 < r3; t3++) {
      const r4 = e4.start + 6 + t3 * o5;
      if (r4 + o5 > i5) break;
      a4.push(n3(r4));
    }
    return a4;
  };
  if (s4.len < 6 || s4.start < 0 || s4.start + 6 > t2.byteLength) return null;
  const a3 = t2.getInt16(s4.start + 4, true), l3 = i4(s4, (e4) => a3 === 4 ? [t2.getInt16(e4, true), t2.getInt16(e4 + 2, true)] : [t2.getInt32(e4, true), t2.getInt32(e4 + 4, true)]);
  if (!l3.length) return null;
  const c4 = e3.simple.get(Vi.geoLeft) ?? 0, u4 = e3.simple.get(Vi.geoTop) ?? 0, h4 = e3.simple.get(Vi.geoRight) ?? 21600, f4 = e3.simple.get(Vi.geoBottom) ?? 21600, d4 = n2 / Math.max(1, h4 - c4), p4 = r2 / Math.max(1, f4 - u4), g4 = (t3) => `${((t3[0] - c4) * d4).toFixed(2)} ${((t3[1] - u4) * p4).toFixed(2)}`;
  if (!o4) return `M ${l3.map(g4).join(" L ")} Z`;
  const m4 = i4(o4, (e4) => [t2.getUint16(e4, true)]), x4 = [];
  let b4 = 0;
  for (const [t3] of m4) {
    const e4 = t3 >> 13;
    if (t3 === 16384) x4.push(`M ${g4(l3[b4++] ?? [0, 0])}`);
    else if (t3 === 24577) x4.push("Z");
    else {
      if (t3 === 32768) break;
      if (e4 === 1 || t3 === 45824) {
        const e5 = t3 === 45824 ? 1 : t3 & 8191;
        for (let t4 = 0; t4 < e5; t4++) {
          const t5 = l3[b4++], e6 = l3[b4++], n3 = l3[b4++];
          t5 && e6 && n3 && x4.push(`C ${g4(t5)} ${g4(e6)} ${g4(n3)}`);
        }
      } else if (e4 === 0) {
        const e5 = t3 & 8191;
        for (let t4 = 0; t4 < Math.max(1, e5) && l3[b4]; t4++) x4.push(`L ${g4(l3[b4++])}`);
      }
    }
  }
  return x4.length ? x4.join(" ") : `M ${l3.map(g4).join(" L ")} Z`;
}
var za = (t2) => {
  const e3 = (t2 ?? "000000").padStart(6, "0");
  return `rgb(${parseInt(e3.slice(0, 2), 16) || 0},${parseInt(e3.slice(2, 4), 16) || 0},${parseInt(e3.slice(4, 6), 16) || 0})`;
};
var Ra = (t2, e3) => ({ latin: t2, ea: e3, cs: "", scripts: {} });
function Ua(t2, e3) {
  return { id: "ppt:theme:1", name: "PowerPoint 97-2003", colors: { lt1: za(t2[0]), dk1: za(t2[1]), lt2: za(t2[2]), dk2: za(t2[3]), accent1: za(t2[4]), accent2: za(t2[5]), accent3: za(t2[2]), accent4: za(t2[3]), accent5: za(t2[6]), accent6: za(t2[7]), hlink: za(t2[6]), folHlink: za(t2[7]) }, fonts: { major: Ra(e3.majorLatin, e3.majorEa), minor: Ra(e3.minorLatin, e3.minorEa) } };
}
var Da = 96 / 576;
var Na = ["FFFFFF", "000000", "808080", "000000", "CCFFFF", "B2B2B2", "3333CC", "009999"];
var Ba = 15;
var Fa = 1048576;
var ja = [[Ba, 2], [128, 2], [16, 2], [64, 2], [32, 4], [2048, 2], [4096, 2], [8192, 2], [16384, 2], [256, 2], [1024, 2], [32768, 2], [Fa, -1], [65536, 2], [917504, 2], [2097152, 2]];
var Ha = [[65535, 2], [65536, 2], [2097152, 2], [4194304, 2], [8388608, 2], [131072, 2], [262144, 4], [524288, 2]];
function Va(t2, e3, n2, r2, s4) {
  let o4 = e3;
  for (const [e4, i4] of ja) {
    if (!(r2 & e4)) continue;
    if (e4 === Fa) {
      if (o4 + 2 > n2 || (o4 += 2 + t2.getUint16(o4, true) * 4, o4 > n2)) return -1;
      continue;
    }
    if (o4 + i4 > n2) return -1;
    const a3 = i4 === 2 ? t2.getUint16(o4, true) : t2.getUint32(o4, true);
    e4 === Ba ? s4.hasBullet = (a3 & 1) !== 0 : e4 === 128 ? s4.bulletChar = String.fromCharCode(a3) : e4 === 256 ? s4.leftMargin = a3 : e4 === 1024 ? s4.indent = a3 : e4 === 2048 && (s4.align = a3), o4 += i4;
  }
  return s4.hasBullet === void 0 && r2 & 128 && (s4.hasBullet = true), o4;
}
function Wa(t2, e3, n2, r2, s4) {
  let o4 = e3;
  for (const [e4, i4] of Ha) {
    if (!(r2 & e4)) continue;
    if (o4 + i4 > n2) return -1;
    const a3 = i4 === 2 ? t2.getUint16(o4, true) : t2.getUint32(o4, true);
    e4 === 65535 ? (r2 & 1 && (s4.bold = (a3 & 1) !== 0), r2 & 2 && (s4.italic = (a3 & 2) !== 0), r2 & 4 && (s4.underline = (a3 & 4) !== 0)) : e4 === 65536 ? s4.fontIdx = a3 : e4 === 2097152 ? s4.asianFontIdx = a3 : e4 === 131072 ? s4.size = a3 : e4 === 262144 && (s4.color = a3), o4 += i4;
  }
  return o4;
}
function Xa(t2, e3, n2) {
  const r2 = [], s4 = [];
  let o4 = e3.start;
  const i4 = e3.start + e3.len, a3 = n2 + 1;
  let l3 = 0;
  for (; o4 + 10 <= i4 && l3 < a3; ) {
    const e4 = t2.getUint32(o4, true), n3 = t2.getUint16(o4 + 4, true), s5 = t2.getUint32(o4 + 6, true), a4 = { indentLevel: n3 }, c4 = Va(t2, o4 + 10, i4, s5, a4);
    if (c4 < 0 || (o4 = c4, r2.push({ chars: e4, props: a4 }), l3 += e4, e4 === 0)) break;
  }
  for (l3 = 0; o4 + 8 <= i4 && l3 < a3; ) {
    const e4 = t2.getUint32(o4, true);
    if (e4 > a3) break;
    const n3 = t2.getUint32(o4 + 4, true), r3 = {}, c4 = Wa(t2, o4 + 8, i4, n3, r3);
    if (c4 < 0 || (o4 = c4, s4.push({ chars: e4, props: r3 }), l3 += e4, e4 === 0)) break;
  }
  return { para: r2, char: s4 };
}
var Ya = { TITLE: 0, BODY: 1, NOTES: 2, OTHER: 4, CENTER_BODY: 5, CENTER_TITLE: 6 };
var _a = { 1: Ya.TITLE, 2: Ya.BODY, 3: Ya.CENTER_TITLE, 4: Ya.CENTER_BODY, 6: Ya.NOTES, 12: Ya.NOTES, 13: Ya.TITLE, 14: Ya.BODY, 15: Ya.CENTER_TITLE, 16: Ya.CENTER_BODY, 17: Ya.TITLE, 18: Ya.BODY, 19: Ya.BODY };
function Ga(t2, e3, n2) {
  const r2 = e3.start + e3.len;
  let s4 = e3.start;
  if (s4 + 2 > r2) return;
  const o4 = t2.getUint16(s4, true);
  s4 += 2;
  const i4 = [];
  for (let n3 = 0; n3 < o4 && (e3.instance >= 5 && (s4 += 2), !(s4 + 4 > r2)); n3++) {
    const e4 = t2.getUint32(s4, true), n4 = {};
    let o5 = Va(t2, s4 + 4, r2, e4, n4);
    if (o5 < 0 || o5 + 4 > r2) break;
    const a3 = t2.getUint32(o5, true), l3 = {};
    if (o5 = Wa(t2, o5 + 4, r2, a3, l3), o5 < 0) break;
    s4 = o5, i4.push({ para: n4, char: l3 });
  }
  i4.length && n2.set(e3.instance, i4);
}
var qa = { 0: "left", 1: "center", 2: "right", 3: "justify", 4: "justify" };
function Za(t2, e3, n2) {
  const r2 = t2.text.replace(/\r\n?/g, `
`).replace(/\v/g, `
`);
  if (!r2.trim()) return null;
  const s4 = [];
  let o4 = 0, i4 = 0, a3 = 0;
  const l3 = (e4) => {
    for (; i4 < t2.charProps.length && a3 >= t2.charProps[i4].chars; ) a3 = 0, i4++;
    const n3 = t2.charProps[i4];
    if (!n3) return { props: {}, take: e4 };
    const r3 = Math.max(1, n3.chars - a3);
    return { props: n3.props, take: Math.min(e4, r3) };
  }, c4 = t2.links ?? [], u4 = (t3) => {
    var e4;
    return (e4 = c4.find((e5) => t3 >= e5.begin && t3 < e5.end)) == null ? void 0 : e4.link;
  }, h4 = (t3, e4) => {
    let n3 = e4;
    for (const e5 of c4) e5.begin > t3 && e5.begin - t3 < n3 && (n3 = e5.begin - t3), e5.end > t3 && e5.end - t3 < n3 && (n3 = e5.end - t3);
    return Math.max(1, n3);
  }, f4 = t2.paraProps.length ? t2.paraProps : [{ chars: r2.length + 1, props: {} }], d4 = e3.claimAutoNums(f4.length), p4 = [];
  return f4.forEach((t3, n3) => {
    const i5 = r2.slice(o4, o4 + t3.chars), c5 = o4;
    o4 += t3.chars;
    const f5 = i5.split(`
`), g4 = f5.length > 1 && f5[f5.length - 1] === "", m4 = g4 ? f5.slice(0, -1) : f5, x4 = t3.props, b4 = e3.levelStyle(x4.indentLevel ?? 0), w4 = x4.indentLevel ?? 0, y4 = (d4 == null ? void 0 : d4[n3]) ?? null;
    let $3 = null;
    y4 && (p4.length = w4 + 1, p4[w4] = (p4[w4] ?? y4.startNum - 1) + 1, $3 = Ui(y4.scheme, p4[w4]));
    let M4 = c5;
    m4.forEach((t4, n4) => {
      const r3 = [];
      let o5 = 0;
      for (; o5 < t4.length; ) {
        const { props: n5, take: s5 } = l3(t4.length - o5), i7 = M4 + o5, c7 = h4(i7, s5), f7 = t4.slice(o5, o5 + c7);
        a3 += c7, o5 += c7, r3.push(Ka(f7, n5, b4.char, e3, u4(i7)));
      }
      if ((n4 < m4.length - 1 || g4) && (a3 += 1), !r3.length) {
        const { props: t5 } = l3(1);
        r3.push(Ka("", t5, b4.char, e3, void 0));
      }
      M4 += t4.length + 1;
      const i6 = n4 === 0 ? $3 : null, c6 = i6 !== null || (x4.hasBullet ?? b4.para.hasBullet ?? false), f6 = x4.leftMargin ?? b4.para.leftMargin, d5 = f6 !== void 0 ? f6 * Da : c6 ? 24 : 0;
      s4.push({ align: qa[x4.align ?? b4.para.align ?? 0] ?? "left", lvl: w4, marL: d5, indent: c6 ? -Math.min(d5, 24) : 0, bullet: i6 ?? (c6 ? Qa(x4.bulletChar ?? b4.para.bulletChar) : null), lineHeight: null, spaceBefore: 0, spaceAfter: 2, runs: r3 });
    });
  }), s4.length ? { anchor: n2 === 1 || n2 === 5 ? "middle" : n2 === 2 || n2 === 6 ? "bottom" : "top", insets: [3.6, 7.2, 3.6, 7.2], wrap: true, fontScale: 1, paragraphs: s4 } : null;
}
function Ka(t2, e3, n2, r2, s4) {
  const o4 = e3.color ?? n2.color, i4 = [];
  for (const t3 of [e3.fontIdx ?? n2.fontIdx, e3.asianFontIdx ?? n2.asianFontIdx]) {
    const e4 = t3 !== void 0 ? r2.fonts[t3] : void 0;
    e4 && !i4.includes(e4) && i4.push(e4);
  }
  return { text: t2, b: e3.bold ?? n2.bold ?? false, i: e3.italic ?? n2.italic ?? false, u: e3.underline ?? n2.underline ?? false, strike: false, size: (e3.size ?? n2.size ?? 18) * (96 / 72), color: o4 !== void 0 ? Xi(o4, r2.scheme) : "rgb(0,0,0)", fonts: i4, link: s4 };
}
var Ja = { 108: "\u25CF", 110: "\u25A0", 109: "\u2751", 113: "\u2751", 117: "\u25C6", 118: "\u2756", 167: "\u25AA", 168: "\u25FB", 183: "\u2022", 216: "\u27A2", 252: "\u2713", 254: "\u2611" };
function Qa(t2) {
  if (!t2) return "\u2022";
  const e3 = t2.charCodeAt(0), n2 = e3 >= 61440 && e3 <= 61695 ? e3 - 61440 : e3, r2 = Ja[n2];
  return r2 && (e3 >= 61440 || e3 > 127) ? r2 : e3 >= 61440 || e3 < 32 || e3 === 65533 ? "\u2022" : t2;
}
function tl2(t2, e3) {
  const n2 = t2.autoNumCursor;
  if (e3 <= 0 || n2 + e3 > t2.autoNums.length) return;
  const r2 = t2.autoNums.slice(n2, n2 + e3);
  if (r2.some((t3) => t3 !== null)) return t2.autoNumCursor = n2 + e3, r2;
}
function el2(t2, e3, n2) {
  const r2 = `${e3}:${n2}`, s4 = t2.levelCache.get(r2);
  if (s4) return s4;
  const o4 = (t3, e4) => {
    const r3 = t3.get(e4);
    if (!(!r3 || !r3.length)) return r3[Math.min(n2, r3.length - 1)];
  }, i4 = [o4(t2.envStyles, Ya.OTHER), o4(t2.styles, Ya.OTHER), o4(t2.styles, e3)], a3 = { para: Object.assign({}, ...i4.map((t3) => (t3 == null ? void 0 : t3.para) ?? {})), char: Object.assign({}, ...i4.map((t3) => (t3 == null ? void 0 : t3.char) ?? {})) };
  return t2.levelCache.set(r2, a3), a3;
}
function nl2(t2, e3) {
  return { fonts: t2.fonts, scheme: t2.scheme, levelStyle: (n2) => el2(t2, e3, n2), claimAutoNums: (e4) => tl2(t2, e4) };
}
function rl2(t2, e3) {
  const { dv: n2 } = t2;
  let r2 = null, s4 = null, o4;
  const i4 = [];
  let a3;
  for (const l4 of wi(n2, e3.start, e3.start + e3.len)) if (l4.type === Ei.TextCharsAtom) r2 = Mi(n2, l4.start, l4.len);
  else if (l4.type === Ei.TextBytesAtom) r2 = vi(n2, l4.start, l4.len);
  else if (l4.type === Ei.StyleTextPropAtom) s4 = l4;
  else if (l4.type === Ei.TextHeaderAtom && l4.len >= 4) o4 = n2.getUint32(l4.start, true);
  else if (l4.type === Ei.InteractiveInfo) a3 = il2(t2, l4);
  else if (l4.type === Ei.TextInteractiveInfoAtom && l4.len >= 8) {
    const t3 = n2.getUint32(l4.start, true), e4 = n2.getUint32(l4.start + 4, true);
    a3 && e4 > t3 && i4.push({ begin: t3, end: e4, link: a3 }), a3 = void 0;
  }
  if (r2 === null) return null;
  const l3 = s4 ? Xa(n2, s4, r2.length) : { para: [], char: [] };
  return { text: r2, paraProps: l3.para, charProps: l3.char, textType: o4, links: i4.length ? i4 : void 0 };
}
function sl2(t2, e3) {
  const { dv: n2 } = t2, r2 = yi(n2, e3.start, e3.start + e3.len, Ci.ClientData);
  if (!r2) return null;
  const s4 = yi(n2, r2.start, r2.start + r2.len, Ei.OEPlaceholderAtom);
  return s4 && s4.len >= 6 ? n2.getUint8(s4.start + 4) : null;
}
var ol2 = { 1: (t2, e3) => Math.min(t2 + 1, e3), 2: (t2) => Math.max(t2 - 1, 1), 3: () => 1, 4: (t2, e3) => e3 };
function il2(t2, e3) {
  const { dv: n2 } = t2, r2 = yi(n2, e3.start, e3.start + e3.len, Ei.InteractiveInfoAtom);
  if (!r2 || r2.len < 16) return;
  const s4 = n2.getUint32(r2.start + 4, true), o4 = t2.links.get(s4);
  if (o4) return o4;
  const i4 = ol2[n2.getUint8(r2.start + 10)];
  return i4 ? `slide:${i4(t2.slideIndex, t2.slideCount)}` : void 0;
}
function al2(t2, e3) {
  const { dv: n2 } = t2, r2 = yi(n2, e3.start, e3.start + e3.len, Ci.ClientData);
  if (!r2) return;
  const s4 = yi(n2, r2.start, r2.start + r2.len, Ei.InteractiveInfo);
  return s4 ? il2(t2, s4) : void 0;
}
function ll2(t2, e3) {
  const n2 = /* @__PURE__ */ new Map(), r2 = yi(t2, e3.start, e3.start + e3.len, Ei.ExObjList);
  if (!r2) return n2;
  for (const e4 of $i(t2, r2.start, r2.start + r2.len, Ei.ExHyperlink)) {
    let r3 = null, s4 = null, o4 = null;
    for (const n3 of wi(t2, e4.start, e4.start + e4.len)) if (n3.type === Ei.ExHyperlinkAtom && n3.len >= 4) r3 = t2.getUint32(n3.start, true);
    else if (n3.type === Ei.CString) {
      const e5 = Mi(t2, n3.start, n3.len).replace(/\0+$/, "");
      n3.instance === 1 ? s4 = e5 : n3.instance === 0 && (o4 = e5);
    }
    const i4 = s4 ?? o4;
    r3 !== null && i4 && n2.set(r3, i4);
  }
  return n2;
}
function cl(t2, e3, n2) {
  const r2 = t2.trim();
  if (!r2) return null;
  const s4 = r2.toLowerCase(), o4 = /^#?action\?jump=(.+)$/.exec(s4) ?? /^#action\?jump=(.+)$/.exec(s4);
  if (o4) {
    const t3 = o4[1];
    if (t3 === "firstslide") return "slide:1";
    if (t3 === "lastslide") return `slide:${n2}`;
    if (t3 === "nextslide") return `slide:${Math.min(e3 + 1, n2)}`;
    if (t3 === "previousslide") return `slide:${Math.max(e3 - 1, 1)}`;
    const r3 = /(\d+)/.exec(t3);
    return r3 ? `slide:${r3[1]}` : null;
  }
  const i4 = /^\s*\d+\s*,\s*(\d+)\s*,/.exec(r2);
  if (i4) return `slide:${i4[1]}`;
  if (r2.startsWith("#")) {
    const t3 = /(\d+)\s*$/.exec(r2);
    return t3 ? `slide:${t3[1]}` : null;
  }
  return /^[a-z][a-z0-9+.-]*:/.test(s4) ? r2 : /^www\./.test(s4) ? `https://${r2}` : r2;
}
function ul2(t2, e3, n2) {
  const { dv: r2 } = t2, s4 = yi(r2, e3.start, e3.start + e3.len, Ci.ClientAnchor);
  if (s4) {
    const e4 = ra(r2, s4);
    if (e4) return { x: e4.x * t2.scale, y: e4.y * t2.scale, w: e4.w * t2.scale, h: e4.h * t2.scale };
  }
  const o4 = yi(r2, e3.start, e3.start + e3.len, Ci.ChildAnchor);
  if (o4) {
    const t3 = sa(r2, o4);
    if (t3) return { x: n2.x + t3.x * n2.sx, y: n2.y + t3.y * n2.sy, w: t3.w * n2.sx, h: t3.h * n2.sy };
  }
  return null;
}
function hl2(t2, e3, n2, r2, s4) {
  const o4 = n2.simple.get(Vi.rotation), i4 = { x: t2.x, y: t2.y, w: t2.w, h: t2.h, rot: o4 !== void 0 ? o4 / 65536 % 360 : 0, flipH: (e3.flags & aa.FLIPH) !== 0, flipV: (e3.flags & aa.FLIPV) !== 0, id: e3.id };
  if (s4) {
    const t3 = la(s4, n2, Vi.wzName);
    t3 && (i4.name = t3);
  }
  const a3 = Qi(n2, r2);
  return a3 && (i4.effects = { shadow: a3 }), i4;
}
function fl(t2, e3, n2) {
  const { dv: r2 } = t2, s4 = yi(r2, e3.start, e3.start + e3.len, Ci.Sp);
  if (!s4) return null;
  const o4 = ia(r2, s4);
  if (o4.flags & aa.DELETED || o4.flags & (aa.PATRIARCH | aa.GROUP) || o4.flags & aa.BACKGROUND) return null;
  const i4 = sl2(t2, e3);
  if (t2.masterPass && i4 !== null && i4 !== 0) return null;
  const a3 = s4.instance, l3 = yi(r2, e3.start, e3.start + e3.len, Ci.Opt), c4 = l3 ? Hi(r2, l3) : { simple: /* @__PURE__ */ new Map(), complex: /* @__PURE__ */ new Map() }, u4 = ul2(t2, e3, n2);
  if (!u4 || u4.w <= 0 || u4.h <= 0) return null;
  const h4 = hl2(u4, o4, c4, t2.scheme, r2), f4 = al2(t2, e3);
  f4 && (h4.link = f4);
  const d4 = (e4) => t2.blobs[e4 - 1] ?? null, p4 = c4.simple.get(Vi.pib), g4 = p4 === void 0 ? null : d4(p4);
  if (o4.flags & aa.OLE) return { kind: "unsupported", ...h4, label: "\u4E0D\u652F\u6301\u7F16\u8F91\u7684\u65E7\u7248 OLE \u5BF9\u8C61", ...g4 ? { preview: g4 } : {} };
  if (p4 !== void 0 && (a3 === ea || p4 > 0) && g4) return { kind: "image", ...h4, src: g4, crop: Zi(c4), stroke: Ji(c4, t2.scheme) };
  const m4 = Gi(c4, t2.scheme, d4), x4 = Ji(c4, t2.scheme);
  let b4 = null, w4 = false;
  a3 === 0 && c4.complex.has(Vi.pVertices) && (b4 = Oa(r2, c4, u4.w, u4.h));
  const y4 = ta[a3] ?? (a3 === 4095 ? "rect" : null);
  if (!b4 && !y4) return { kind: "unsupported", ...h4, label: `\u4E0D\u652F\u6301\u7684\u65E7\u7248\u5F62\u72B6\uFF08MSOSPT ${a3}\uFF09` };
  if (!b4) {
    const e4 = pl2(c4, a3), n3 = Q(y4, u4.w, u4.h, e4);
    b4 = n3.d, w4 = n3.open, t2.edit && (h4.editInfo = { geom: { preset: y4, adj: e4 } });
  }
  const $3 = yi(r2, e3.start, e3.start + e3.len, Ci.ClientTextbox);
  let M4 = $3 ? rl2(t2, $3) : null;
  if (!M4) {
    const e4 = c4.simple.get(Vi.lTxid);
    e4 !== void 0 && t2.listText[e4] && (M4 = t2.listText[e4]);
  }
  const v4 = (M4 == null ? void 0 : M4.textType) ?? (i4 !== null ? _a[i4] : void 0) ?? Ya.OTHER, k3 = M4 ? Za(M4, nl2(t2, v4), c4.simple.get(Vi.anchorText)) : null;
  return !k3 && (!m4 || m4.type === "none") && !x4 ? null : { kind: "shape", ...h4, path: b4, fill: w4 ? { type: "none" } : m4, stroke: x4, text: k3, openGeom: w4 || void 0 };
}
var dl2 = /* @__PURE__ */ new Set([19, 98, 102, 103]);
function pl2(t2, e3) {
  const n2 = dl2.has(e3), r2 = {}, s4 = [[Vi.adjustValue, "adj1"], [Vi.adjust2Value, "adj2"], [Vi.adjust3Value, "adj3"], [Vi.adjust4Value, "adj4"]];
  for (const [e4, o4] of s4) {
    const s5 = t2.simple.get(e4);
    if (s5 === void 0) continue;
    const i4 = s5 > 2147483647 ? s5 - 4294967296 : s5;
    if (n2) {
      r2[o4] = i4 / 65536 * 6e4;
      continue;
    }
    Math.abs(i4) > 21600 * 4 || (r2[o4] = i4 / 21600 * 1e5);
  }
  return r2.adj1 !== void 0 && (r2.adj = r2.adj1), r2;
}
var gl2 = (t2) => ({ x: 0, y: 0, sx: t2.scale, sy: t2.scale });
function ml2(t2, e3, n2, r2 = 0) {
  const { dv: s4 } = t2, o4 = [], i4 = [...wi(s4, e3.start, e3.start + e3.len)], a3 = i4.find((t3) => t3.type === Ci.SpContainer), l3 = a3 ? xl2(t2, a3, n2) : null, c4 = (l3 == null ? void 0 : l3.rec) ?? null;
  let u4 = n2;
  if (l3) {
    const t3 = l3.box.w / l3.space.w, e4 = l3.box.h / l3.space.h;
    u4 = { x: l3.box.x - l3.space.x * t3, y: l3.box.y - l3.space.y * e4, sx: t3, sy: e4 };
  }
  const h4 = (e4) => {
    const n3 = [];
    for (const r3 of i4) {
      if (r3 === c4 || r3.type !== Ci.SpContainer) continue;
      const s5 = fl(t2, r3, e4);
      s5 && n3.push(s5);
    }
    return n3;
  };
  if (l3 && ua(l3.props)) {
    const e4 = h4(u4), n3 = yl2(e4, ca(s4, l3.props).map((e5) => e5 * t2.scale));
    return n3 ? [n3] : e4;
  }
  if (l3 && i4.filter((t3) => t3.type === Ci.SpContainer).length >= 4) {
    const t3 = bl2(h4(u4));
    if (wl2(t3)) {
      const e4 = yl2(t3, []);
      if (e4) return [e4];
    }
  }
  const f4 = (e4, n3) => {
    for (const s5 of i4) if (s5 !== c4) if (s5.type === Ci.SpContainer) {
      const r3 = fl(t2, s5, e4);
      r3 && n3.push(r3);
    } else s5.type === Ci.SpgrContainer && r2 < 8 && n3.push(...ml2(t2, s5, e4, r2 + 1));
  };
  if (l3) {
    const e4 = [];
    if (f4(gl2(t2), e4), !e4.length) return [];
    const n3 = l3.space.w * t2.scale, r3 = l3.space.h * t2.scale;
    return [{ kind: "group", ...hl2(l3.box, l3.sp, l3.props, t2.scheme, t2.dv), childX: l3.space.x * t2.scale, childY: l3.space.y * t2.scale, scaleX: l3.box.w / n3, scaleY: l3.box.h / r3, children: e4 }];
  }
  return f4(u4, o4), o4;
}
function xl2(t2, e3, n2) {
  const { dv: r2 } = t2, s4 = yi(r2, e3.start, e3.start + e3.len, Ci.Spgr), o4 = yi(r2, e3.start, e3.start + e3.len, Ci.Sp);
  if (!s4 || !o4) return null;
  const i4 = ia(r2, o4);
  if (!(i4.flags & aa.GROUP) || i4.flags & aa.PATRIARCH) return null;
  const a3 = oa(r2, s4), l3 = ul2(t2, e3, n2);
  if (!a3 || !l3 || a3.w <= 0 || a3.h <= 0 || l3.w <= 0 || l3.h <= 0) return null;
  const c4 = yi(r2, e3.start, e3.start + e3.len, Ci.Opt), u4 = c4 ? Hi(r2, c4) : { simple: /* @__PURE__ */ new Map(), complex: /* @__PURE__ */ new Map() };
  return { rec: e3, sp: i4, props: u4, box: l3, space: a3 };
}
function bl2(t2) {
  const e3 = t2.filter((t3) => t3.kind === "shape");
  if (e3.length !== t2.length) return t2;
  const n2 = 3, r2 = [];
  for (const t3 of e3) {
    const e4 = r2.find((e5) => Math.abs(e5.x - t3.x) <= n2 && Math.abs(e5.y - t3.y) <= n2 && Math.abs(e5.w - t3.w) <= n2 * 2 && Math.abs(e5.h - t3.h) <= n2 * 2);
    if (!e4) {
      r2.push({ ...t3 });
      continue;
    }
    !e4.text && t3.text && (e4.text = t3.text), (!e4.fill || e4.fill.type === "none") && t3.fill && t3.fill.type !== "none" && (e4.fill = t3.fill), !e4.stroke && t3.stroke && (e4.stroke = t3.stroke);
  }
  return r2;
}
function wl2(t2) {
  const e3 = t2.filter((t3) => t3.kind === "shape" && t3.path !== null);
  if (e3.length < 4 || e3.length !== t2.length) return false;
  const n2 = 2.5, r2 = (t3) => {
    const e4 = [...t3].sort((t4, e5) => t4 - e5), r3 = [];
    for (const t4 of e4) (!r3.length || t4 - r3[r3.length - 1] > n2) && r3.push(t4);
    return r3;
  }, s4 = r2(e3.map((t3) => t3.x)), o4 = r2(e3.map((t3) => t3.y));
  if (s4.length < 2 || o4.length < 2 || e3.length > s4.length * o4.length || e3.length < s4.length * o4.length * 0.5) return false;
  const i4 = (t3, e4, r3) => {
    for (let s5 = 0; s5 + 1 < t3.length; s5++) if (!e4.some((e5, o5) => Math.abs(e5 - t3[s5]) <= n2 && Math.abs(r3[o5] - t3[s5 + 1]) <= n2 * 2)) return false;
    return true;
  }, a3 = i4(s4, e3.map((t3) => t3.x), e3.map((t3) => t3.x + t3.w)), l3 = i4(o4, e3.map((t3) => t3.y), e3.map((t3) => t3.y + t3.h));
  return a3 && l3;
}
function yl2(t2, e3) {
  var n2, r2, s4;
  const o4 = t2.filter((t3) => t3.kind === "shape");
  if (o4.length < 2) return null;
  const i4 = 2, a3 = (t3) => {
    const e4 = [...t3].sort((t4, e5) => t4 - e5), n3 = [];
    for (const t4 of e4) (!n3.length || t4 - n3[n3.length - 1] > i4) && n3.push(t4);
    return n3;
  }, l3 = a3(o4.map((t3) => t3.x)), c4 = a3(o4.map((t3) => t3.y));
  if (l3.length < 1 || c4.length < 1) return null;
  const u4 = l3[0], h4 = c4[0], f4 = Math.max(...o4.map((t3) => t3.x + t3.w)), d4 = Math.max(...o4.map((t3) => t3.y + t3.h)), p4 = l3.map((t3, e4) => (e4 + 1 < l3.length ? l3[e4 + 1] : f4) - t3), g4 = c4.map((t3, e4) => (e4 + 1 < c4.length ? c4[e4 + 1] : d4) - t3), m4 = e3.length === c4.length ? e3 : g4, x4 = (t3) => {
    let e4 = 0;
    for (let n3 = 0; n3 < l3.length; n3++) t3 >= l3[n3] - i4 && (e4 = n3);
    return e4;
  }, b4 = (t3) => {
    let e4 = 0;
    for (let n3 = 0; n3 < c4.length; n3++) t3 >= c4[n3] - i4 && (e4 = n3);
    return e4;
  }, w4 = c4.map(() => l3.map(() => null));
  for (const t3 of o4) {
    const e4 = b4(t3.y), o5 = x4(t3.x);
    if (w4[e4][o5]) continue;
    let a4 = 0;
    for (let e5 = o5; e5 < l3.length && l3[e5] < t3.x + t3.w - i4; e5++) a4++;
    let u5 = 0;
    for (let n3 = e4; n3 < c4.length && c4[n3] < t3.y + t3.h - i4; n3++) u5++;
    w4[e4][o5] = { colSpan: Math.max(1, a4), rowSpan: Math.max(1, u5), merged: false, fill: t3.fill, text: t3.text, borders: { l: t3.stroke, r: t3.stroke, t: t3.stroke, b: t3.stroke }, vAlign: ((n2 = t3.text) == null ? void 0 : n2.anchor) === "middle" ? "middle" : ((r2 = t3.text) == null ? void 0 : r2.anchor) === "bottom" ? "bottom" : "top" };
    for (let t4 = e4; t4 < e4 + Math.max(1, u5); t4++) for (let n3 = o5; n3 < o5 + Math.max(1, a4); n3++) t4 === e4 && n3 === o5 || ((s4 = w4[t4]) == null ? void 0 : s4[n3]) === null && (w4[t4][n3] = { colSpan: 1, rowSpan: 1, merged: true, fill: null, text: null });
  }
  const y4 = w4.map((t3, e4) => ({ height: m4[e4] ?? 0, cells: t3.map((t4) => t4 ?? { colSpan: 1, rowSpan: 1, merged: false, fill: null, text: null }) }));
  return { kind: "table", x: u4, y: h4, w: f4 - u4, h: d4 - h4, rot: 0, flipH: false, flipV: false, colWidths: p4, rows: y4, name: "\u8868\u683C" };
}
function $l2(t2, e3) {
  const n2 = /* @__PURE__ */ new Map();
  for (const r2 of wi(t2, 0, e3)) {
    if (r2.type !== Ei.PersistDirectoryAtom) continue;
    const e4 = r2.start + r2.len;
    let s4 = r2.start;
    for (; s4 + 4 <= e4; ) {
      const r3 = t2.getUint32(s4, true);
      s4 += 4;
      const o4 = r3 & 1048575, i4 = r3 >>> 20;
      for (let r4 = 0; r4 < i4 && s4 + 4 <= e4; r4++, s4 += 4) n2.set(o4 + r4, t2.getUint32(s4, true));
    }
  }
  return n2;
}
function Ml2(t2, e3, n2, r2, s4, o4) {
  const i4 = [];
  for (const a3 of $i(t2, e3.start, e3.start + e3.len, Ei.SlideListWithText)) if (a3.instance === n2) for (const e4 of $i(t2, a3.start, a3.start + a3.len, Ei.SlidePersistAtom)) {
    if (e4.len < 16) continue;
    const n3 = r2.get(t2.getUint32(e4.start, true)), a4 = n3 !== void 0 ? s4.get(n3) : void 0;
    a4 && o4.includes(a4.type) && i4.push({ rec: a4, slideId: t2.getUint32(e4.start + 12, true) });
  }
  return i4;
}
function vl2(t2, e3, n2, r2) {
  var s4, o4, i4;
  const a3 = [(s4 = e3.get(Ya.OTHER)) == null ? void 0 : s4[0], (o4 = t2 == null ? void 0 : t2.get(Ya.OTHER)) == null ? void 0 : o4[0]];
  for (const e4 of n2) a3.push((i4 = t2 == null ? void 0 : t2.get(e4)) == null ? void 0 : i4[0]);
  let l3;
  for (const t3 of a3) (t3 == null ? void 0 : t3.char[r2]) !== void 0 && (l3 = t3.char[r2]);
  return l3;
}
function kl2(t2, e3) {
  const n2 = (t3) => t3 === void 0 ? "" : e3.fonts[t3] ?? "";
  return { majorLatin: n2(vl2(t2 == null ? void 0 : t2.styles, e3.envStyles, [Ya.TITLE, Ya.CENTER_TITLE], "fontIdx")), majorEa: n2(vl2(t2 == null ? void 0 : t2.styles, e3.envStyles, [Ya.TITLE, Ya.CENTER_TITLE], "asianFontIdx")), minorLatin: n2(vl2(t2 == null ? void 0 : t2.styles, e3.envStyles, [Ya.BODY, Ya.CENTER_BODY], "fontIdx")), minorEa: n2(vl2(t2 == null ? void 0 : t2.styles, e3.envStyles, [Ya.BODY, Ya.CENTER_BODY], "asianFontIdx")) };
}
function El2(t2, e3, n2) {
  for (const r2 of $i(t2, e3.start, e3.start + e3.len, Ei.ColorSchemeAtom)) {
    if (r2.instance !== n2 || r2.len < 32) continue;
    const e4 = [];
    for (let n3 = 0; n3 < 8; n3++) {
      const s4 = t2.getUint32(r2.start + n3 * 4, true), o4 = [s4 & 255, s4 >> 8 & 255, s4 >> 16 & 255];
      e4.push(o4.map((t3) => t3.toString(16).padStart(2, "0")).join(""));
    }
    return e4;
  }
  return null;
}
function Tl2(t2, e3, n2, r2) {
  const s4 = yi(t2, e3.start, e3.start + e3.len, Ci.DgContainer);
  if (!s4) return null;
  for (const e4 of $i(t2, s4.start, s4.start + s4.len, Ci.SpContainer)) {
    const s5 = yi(t2, e4.start, e4.start + e4.len, Ci.Sp);
    if (!s5 || !(ia(t2, s5).flags & aa.BACKGROUND)) continue;
    const o4 = yi(t2, e4.start, e4.start + e4.len, Ci.Opt);
    if (!o4) continue;
    const i4 = Hi(t2, o4);
    if (!i4.simple.has(Vi.fillColor) && !i4.simple.has(Vi.fillType) && !i4.simple.has(Vi.fillBlip)) continue;
    const a3 = Gi(i4, n2, r2);
    if (a3 && a3.type !== "none") return a3;
  }
  return null;
}
function Cl2(t2, e3) {
  const n2 = [], r2 = yi(t2.dv, e3.start, e3.start + e3.len, Ci.DgContainer);
  if (!r2) return n2;
  for (const e4 of $i(t2.dv, r2.start, r2.start + r2.len, Ci.SpgrContainer)) n2.push(...ml2(t2, e4, { x: 0, y: 0, sx: t2.scale, sy: t2.scale }));
  return n2;
}
function Sl2(t2, e3, n2) {
  const r2 = El2(t2, e3, 1) ?? El2(t2, e3, 6) ?? Na, s4 = /* @__PURE__ */ new Map();
  for (const n3 of $i(t2, e3.start, e3.start + e3.len, Ei.TxMasterStyleAtom)) Ga(t2, n3, s4);
  const o4 = yi(t2, e3.start, e3.start + e3.len, Ei.PPDrawing), i4 = o4 ? Tl2(t2, o4, r2, (t3) => n2.blobs[t3 - 1] ?? null) : null, a3 = { dv: t2, scheme: r2, fonts: n2.fonts, blobs: n2.blobs, listText: [], scale: n2.scale, styles: s4, envStyles: n2.envStyles, links: /* @__PURE__ */ new Map(), masterPass: true, levelCache: /* @__PURE__ */ new Map(), slideIndex: 1, slideCount: 1, autoNums: Ri(t2, e3), autoNumCursor: 0, edit: n2.edit }, l3 = o4 ? Cl2(a3, o4) : [];
  return { scheme: r2, styles: s4, background: i4, elements: l3 };
}
function Ll2(t2, e3) {
  const n2 = [];
  let r2 = -1;
  const s4 = (e4, o4, i4) => {
    for (const a3 of wi(t2, e4, o4)) if (a3.type === Ei.TextHeaderAtom && a3.len >= 4) r2 = t2.getUint32(a3.start, true);
    else if (a3.type === Ei.TextCharsAtom || a3.type === Ei.TextBytesAtom) {
      if (r2 === Ya.NOTES) {
        const e5 = (a3.type === Ei.TextCharsAtom ? Mi(t2, a3.start, a3.len) : vi(t2, a3.start, a3.len)).replace(/\r\n?/g, `
`).replace(/\v/g, `
`).replace(/\0/g, "").trim();
        e5 && n2.push(e5);
      }
      r2 = -1;
    } else (a3.isContainer || a3.type === Ci.ClientTextbox) && i4 < 8 && s4(a3.start, a3.start + a3.len, i4 + 1);
  };
  return s4(e3.start, e3.start + e3.len, 0), n2.join(`
`);
}
function Al2(t2, e3, n2 = false) {
  var r2;
  const s4 = new lo2(t2);
  if (s4.stream("EncryptedPackage") || s4.stream("EncryptionInfo")) throw new Error("\u8BE5\u6587\u4EF6\u662F\u52A0\u5BC6\u7684 OOXML \u5BB9\u5668\uFF0C\u8BF7\u7528 parse(input, { password })");
  let o4 = s4.stream("PowerPoint Document");
  if (!o4) throw new Error("\u65E0\u6548\u7684 .ppt\uFF1A\u627E\u4E0D\u5230 PowerPoint Document \u6D41");
  const i4 = s4.stream("Current User");
  if (pi(i4) && i4) {
    const t3 = fo2();
    if (!t3) throw new Error("\u8BE5 .ppt \u5DF2\u52A0\u5BC6\uFF0C\u4F46\u672A\u6CE8\u5165\u89E3\u5BC6\u5668\uFF08setPptDecryptor\uFF09");
    if (e3 === void 0) throw new Wo2();
    const n3 = t3(o4, i4, e3);
    if (!n3) throw new Error("\u8BE5 .ppt \u5DF2\u52A0\u5BC6\uFF0C\u4F46\u52A0\u5BC6\u7ED3\u6784\u65E0\u6CD5\u8BC6\u522B");
    o4 = n3;
  }
  const a3 = new DataView(o4.buffer, o4.byteOffset, o4.byteLength);
  let l3 = 720 * (96 / 72), u4 = 540 * (96 / 72);
  const h4 = s4.stream("Pictures"), f4 = h4 ? na(h4) : [], d4 = f4.map((t3) => {
    try {
      return t3.mime === "image/emf" || t3.mime === "image/wmf" || t3.mime === "image/pict" ? mt(t3.data) : URL.createObjectURL(new Blob([t3.data.slice().buffer], { type: t3.mime }));
    } catch {
      return null;
    }
  }), p4 = /* @__PURE__ */ new Map(), g4 = [];
  for (const t3 of wi(a3, 0, o4.length)) p4.set(t3.start - 8, t3), g4.push(t3);
  const m4 = [], x4 = /* @__PURE__ */ new Map(), b4 = yi(a3, 0, o4.length, Ei.Document), w4 = (t3, e4, n3) => {
    for (const r3 of wi(a3, t3, e4)) {
      if (r3.type === Ei.DocumentAtom && r3.len >= 8) l3 = a3.getInt32(r3.start, true) * Da, u4 = a3.getInt32(r3.start + 4, true) * Da;
      else if (r3.type === Ei.FontEntityAtom) {
        const t4 = Mi(a3, r3.start, Math.min(r3.len, 64)).replace(/\0.*$/, "");
        t4 && (m4[r3.instance < 512 ? r3.instance : m4.length] = t4);
      } else r3.type === Ei.TxMasterStyleAtom && Ga(a3, r3, x4);
      r3.isContainer && n3 < 4 && w4(r3.start, r3.start + r3.len, n3 + 1);
    }
  };
  b4 && w4(b4.start, b4.start + b4.len, 0);
  const y4 = { fonts: m4, blobs: d4, scale: Da, envStyles: x4, edit: n2 }, $3 = $l2(a3, o4.length), M4 = (t3) => g4.filter((e4) => e4.type === t3);
  let v4 = b4 ? Ml2(a3, b4, 0, $3, p4, [Ei.Slide]) : [];
  v4.length || (v4 = M4(Ei.Slide).map((t3) => ({ rec: t3, slideId: 0 })));
  const k3 = b4 ? Ml2(a3, b4, 1, $3, p4, [Ei.MainMaster, Ei.Slide]) : [], E3 = b4 ? Ml2(a3, b4, 2, $3, p4, [Ei.Notes]) : [], T3 = /* @__PURE__ */ new Map(), C4 = /* @__PURE__ */ new Map();
  for (const t3 of k3) C4.set(t3.slideId, t3.rec);
  const S4 = ((r2 = k3[0]) == null ? void 0 : r2.rec) ?? M4(Ei.MainMaster)[0] ?? null, L4 = (t3) => {
    const e4 = C4.get(t3) ?? S4;
    if (!e4) return null;
    const n3 = e4.start;
    let r3 = T3.get(n3);
    return r3 || (r3 = Sl2(a3, e4, y4), T3.set(n3, r3)), r3;
  }, A4 = /* @__PURE__ */ new Map();
  for (const t3 of E3) A4.set(t3.slideId, t3.rec);
  const P4 = /* @__PURE__ */ new Map();
  for (const t3 of M4(Ei.Notes)) {
    const e4 = yi(a3, t3.start, t3.start + t3.len, Ei.NotesAtom);
    e4 && e4.len >= 4 && P4.set(a3.getUint32(e4.start, true), t3);
  }
  const I4 = b4 ? ll2(a3, b4) : /* @__PURE__ */ new Map(), O3 = v4.length;
  let z3 = null, R4 = v4.map((t3, e4) => {
    const n3 = yi(a3, t3.rec.start, t3.rec.start + t3.rec.len, Ei.SlideAtom), r3 = n3 && n3.len >= 24 ? a3.getUint32(n3.start + 12, true) : 0, s5 = n3 && n3.len >= 24 ? a3.getUint32(n3.start + 16, true) : 0, o5 = n3 && n3.len >= 24 ? a3.getUint16(n3.start + 20, true) : 7, i5 = A4.get(s5) ?? P4.get(t3.slideId) ?? null, l4 = L4(r3);
    return z3 ?? (z3 = l4), Il2(a3, t3.rec, y4, { master: l4, followMasterObjects: (o5 & 1) !== 0, followMasterBackground: (o5 & 4) !== 0, notes: i5 ? Ll2(a3, i5) : "", hyperlinks: I4, index: e4 + 1, count: O3 });
  });
  if (!R4.length || R4.every((t3) => !t3.elements.length)) {
    const t3 = Pl2(a3, o4.length, l3, u4);
    t3.length && (R4 = t3);
  }
  if (!R4.length) throw new Error(".ppt \u4E2D\u672A\u627E\u5230\u5E7B\u706F\u7247");
  const U3 = n2 ? d4.flatMap((t3, e4) => {
    const n3 = t3 != null && t3.startsWith("blob:") ? f4[e4] : void 0;
    return t3 && n3 ? [{ url: t3, mime: n3.mime, bytes: n3.data.slice() }] : [];
  }) : [];
  let D4 = false;
  return { width: l3, height: u4, slides: R4, source: "ppt", ...n2 ? { editInfo: { layouts: [], masters: [], themes: [Ua((z3 == null ? void 0 : z3.scheme) ?? Na, kl2(z3, y4))], assets: U3 } } : {}, dispose: () => {
    if (!D4) {
      D4 = true;
      for (const t3 of d4) if (t3 != null && t3.startsWith("blob:")) try {
        URL.revokeObjectURL(t3);
      } catch {
      }
    }
  } };
}
function Pl2(t2, e3, n2, r2) {
  const s4 = (function e4(n3, r3, s5) {
    for (const o5 of wi(t2, n3, r3)) {
      if (o5.type === Ei.SlideListWithText && o5.instance === 0) return o5;
      if (o5.isContainer && s5 < 4) {
        const t3 = e4(o5.start, o5.start + o5.len, s5 + 1);
        if (t3) return t3;
      }
    }
    return null;
  })(0, e3, 0);
  if (!s4) return [];
  const o4 = [];
  let i4 = null, a3 = 4;
  for (const e4 of wi(t2, s4.start, s4.start + s4.len)) if (e4.type === Ei.SlidePersistAtom) i4 = { titles: [], bodies: [] }, o4.push(i4);
  else if (e4.type === Ei.TextHeaderAtom && e4.len >= 4) a3 = t2.getUint32(e4.start, true);
  else if (i4 && (e4.type === Ei.TextCharsAtom || e4.type === Ei.TextBytesAtom)) {
    const n3 = e4.type === Ei.TextCharsAtom ? Mi(t2, e4.start, e4.len) : vi(t2, e4.start, e4.len);
    (a3 === 0 || a3 === 6 ? i4.titles : i4.bodies).push(n3);
  }
  const l3 = (t3, e4, n3, r3) => ({ text: t3, b: n3, i: false, u: false, strike: false, size: e4, color: r3, fonts: [] }), c4 = (t3, e4) => ({ align: "left", lvl: 0, marL: e4 ? 24 : 0, indent: e4 ? -24 : 0, bullet: e4, lineHeight: null, spaceBefore: 0, spaceAfter: 6, runs: t3 }), u4 = (t3) => t3.split(/[\r\n\v]/).map((t4) => t4.trim()).filter(Boolean);
  return o4.filter((t3) => t3.titles.length || t3.bodies.length).map((t3) => {
    const e4 = [];
    return t3.titles.length && e4.push({ kind: "shape", x: n2 * 0.06, y: r2 * 0.05, w: n2 * 0.88, h: r2 * 0.16, rot: 0, flipH: false, flipV: false, path: null, fill: null, stroke: null, text: { anchor: "middle", insets: [4, 8, 4, 8], wrap: true, fontScale: 1, paragraphs: t3.titles.flatMap((t4) => u4(t4).map((t5) => c4([l3(t5, 34, true, "rgb(30,30,30)")], null))) } }), t3.bodies.length && e4.push({ kind: "shape", x: n2 * 0.06, y: r2 * 0.24, w: n2 * 0.88, h: r2 * 0.68, rot: 0, flipH: false, flipV: false, path: null, fill: null, stroke: null, text: { anchor: "top", insets: [4, 8, 4, 8], wrap: true, fontScale: 1, paragraphs: t3.bodies.flatMap((t4) => u4(t4).map((t5) => c4([l3(t5, 20, false, "rgb(50,50,50)")], "\u2022"))) } }), { background: { type: "solid", color: "rgb(255,255,255)" }, elements: e4 };
  });
}
function Il2(t2, e3, n2, r2) {
  var s4, o4, i4;
  const a3 = e3.start + e3.len, l3 = El2(t2, e3, 1) ?? ((s4 = r2.master) == null ? void 0 : s4.scheme) ?? Na, c4 = [];
  let u4 = null, h4 = null, f4;
  const d4 = () => {
    if (h4 === null) return;
    const e4 = u4 ? Xa(t2, u4, h4.length) : { para: [], char: [] };
    c4.push({ text: h4, paraProps: e4.para, charProps: e4.char, textType: f4 }), h4 = null, u4 = null, f4 = void 0;
  };
  for (const n3 of wi(t2, e3.start, a3)) n3.type === Ei.TextHeaderAtom ? (d4(), n3.len >= 4 && (f4 = t2.getUint32(n3.start, true))) : n3.type === Ei.TextCharsAtom ? h4 = Mi(t2, n3.start, n3.len) : n3.type === Ei.TextBytesAtom ? h4 = vi(t2, n3.start, n3.len) : n3.type === Ei.StyleTextPropAtom && (u4 = n3);
  d4();
  const p4 = /* @__PURE__ */ new Map();
  for (const [t3, e4] of r2.hyperlinks) {
    const n3 = cl(e4, r2.index, r2.count);
    n3 && p4.set(t3, n3);
  }
  const g4 = { dv: t2, scheme: l3, fonts: n2.fonts, blobs: n2.blobs, listText: c4, scale: n2.scale, styles: ((o4 = r2.master) == null ? void 0 : o4.styles) ?? /* @__PURE__ */ new Map(), envStyles: n2.envStyles, links: p4, masterPass: false, levelCache: /* @__PURE__ */ new Map(), slideIndex: r2.index, slideCount: r2.count, autoNums: Ri(t2, e3), autoNumCursor: 0, edit: n2.edit }, m4 = [];
  r2.master && r2.followMasterObjects && m4.push(...r2.master.elements);
  const x4 = yi(t2, e3.start, a3, Ei.PPDrawing);
  x4 && m4.push(...Cl2(g4, x4));
  const b4 = x4 ? Tl2(t2, x4, l3, (t3) => n2.blobs[t3 - 1] ?? null) : null, w4 = (r2.followMasterBackground ? ((i4 = r2.master) == null ? void 0 : i4.background) ?? null : null) ?? b4 ?? { type: "solid", color: Xi(134217728, l3) }, y4 = wa(t2, e3), $3 = y4 == null ? void 0 : y4.transition, M4 = Pa(t2, e3);
  return { background: w4, elements: m4, notes: r2.notes || void 0, hidden: y4 != null && y4.hidden ? true : void 0, transition: $3, animations: M4 };
}
var Bl2 = /[、。，．：；！？」』】〕）》〉｝］”]/;
var Fl2 = /[「『【〔（《〈｛［“]/;
var jl2 = (t2) => Fl2.test(t2);
function Hl2(t2) {
  return Bl2.test(t2) || Fl2.test(t2) ? 0.5 : 0;
}
function Vl2(t2) {
  let e3 = 0;
  for (const n2 of t2) e3 += Hl2(n2);
  return e3;
}
function Wl2(t2, e3) {
  const n2 = t2.length, r2 = new Array(n2).fill(0), s4 = new Array(n2).fill(0);
  let o4 = 0;
  for (let i4 = 0; i4 < n2; i4++) {
    const a3 = Hl2(t2[i4]);
    !a3 || !(e3 || i4 === 0 && jl2(t2[i4]) || i4 === n2 - 1 && !jl2(t2[i4]) || i4 > 0 && Hl2(t2[i4 - 1]) > 0) || (s4[i4] = a3, o4 += a3, jl2(t2[i4]) ? r2[i4] -= a3 : i4 + 1 < n2 && (r2[i4 + 1] -= a3));
  }
  return { dx: r2, amount: s4, total: o4 };
}
function Xl2(t2) {
  const e3 = t2.codePointAt(0) ?? 0;
  return e3 >= 4352 && e3 <= 4447 || e3 >= 11904 && e3 <= 12350 || e3 >= 12353 && e3 <= 13311 || e3 >= 13312 && e3 <= 19903 || e3 >= 19968 && e3 <= 40959 || e3 >= 40960 && e3 <= 42191 || e3 >= 44032 && e3 <= 55203 || e3 >= 63744 && e3 <= 64255 || e3 >= 65072 && e3 <= 65135 || e3 >= 65280 && e3 <= 65376 || e3 >= 65504 && e3 <= 65510 || e3 >= 131072 && e3 <= 262141;
}
var Yl2 = (t2) => t2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
var _l2 = (t2) => Number.isFinite(t2) ? String(Math.round(t2 * 100) / 100) : "0";
function Gl2(t2) {
  return t2.replace(/['"\\<>&\u0000-\u001f\u007f]/gu, (t3) => `\\${t3.codePointAt(0).toString(16)} `);
}
var ql2 = "'Cambria Math','Latin Modern Math','STIX Two Math','Times New Roman',serif";
var Zl2 = { "\u0300": "\u02CB", "\u0301": "\u02CA", "\u0302": "\u02C6", "\u0303": "\u02DC", "\u0306": "\u02D8", "\u0307": "\u02D9", "\u0308": "\xA8", "\u030A": "\u02DA", "\u030C": "\u02C7", "\u20D6": "\u2190", "\u20D7": "\u2192", "\u20E1": "\u2194", "\u20DB": "\u22EF", "\u20DC": "\u22EF" };
var Kl2 = /* @__PURE__ */ new Set(["\u0305", "\u0304", "\u203E", "\xAF", "\u0332", "\u0333", "_"]);
var Jl2 = /* @__PURE__ */ new Set(["\u23DE", "\u23DF", "\u23B4", "\u23B5", "\u23DC", "\u23DD"]);
var Ql2 = 0.72;
var tc = 0.5;
var ec = (t2, e3) => ({ ...t2, size: Math.max(t2.size * e3, t2.size * tc) });
function nc() {
  return { w: 0, h: 0, d: 0, draw: () => "" };
}
var rc = 0.72;
var sc = 0.22;
function oc(t2, e3, n2, r2, s4, o4, i4 = "") {
  const a3 = `font-family:${ql2};font-size:${_l2(e3.size)}px;` + (n2 ? "font-style:italic;" : "") + (r2 ? "font-weight:700;" : "");
  return i4 ? `<text x="0" y="0" style="${a3}" fill="${e3.color}" xml:space="preserve" transform="${i4}">${Yl2(t2)}</text>` : `<text x="${_l2(s4)}" y="${_l2(o4)}" style="${a3}" fill="${e3.color}" xml:space="preserve">${Yl2(t2)}</text>`;
}
function ic(t2, e3, n2, r2) {
  return { w: e3.measure(t2, e3.size, n2, r2), h: e3.size * rc, d: e3.size * sc, draw: (s4, o4) => oc(t2, e3, n2, r2, s4, o4) };
}
function ac(t2, e3, n2, r2) {
  const s4 = ic(t2, e3, false, false), o4 = e3.size * (rc + sc), i4 = n2 + r2;
  if (i4 <= o4 * 1.02) return s4;
  const a3 = i4 / o4, l3 = (r2 - n2) / 2 + (rc - sc) / 2 * e3.size * a3;
  return { w: s4.w, h: n2, d: r2, draw: (n3, r3) => oc(t2, e3, false, false, 0, 0, `translate(${_l2(n3)} ${_l2(r3 + l3)}) scale(1 ${_l2(a3)})`) };
}
function lc(t2, e3, n2) {
  return { w: t2, h: e3, d: 0, draw: (r2, s4) => `<rect x="${_l2(r2)}" y="${_l2(s4 - e3)}" width="${_l2(t2)}" height="${_l2(e3)}" fill="${n2}"/>` };
}
function cc(t2) {
  if (!t2.length) return nc();
  const e3 = t2.reduce((t3, e4) => t3 + e4.w, 0), n2 = Math.max(...t2.map((t3) => t3.h)), r2 = Math.max(...t2.map((t3) => t3.d));
  return { w: e3, h: n2, d: r2, draw: (e4, n3) => {
    let r3 = e4;
    const s4 = [];
    for (const e5 of t2) s4.push(e5.draw(r3, n3)), r3 += e5.w;
    return s4.join("");
  } };
}
function uc(t2, e3, n2) {
  if (!t2.length) return nc();
  const r2 = Math.max(...t2.map((t3) => t3.w));
  let s4 = 0, o4 = 0;
  return t2.forEach((t3, r3) => {
    r3 < n2 ? s4 += t3.h + t3.d + e3 : r3 === n2 ? (s4 += t3.h, o4 += t3.d) : o4 += t3.h + t3.d + e3;
  }), { w: r2, h: s4, d: o4, draw: (n3, o5) => {
    let i4 = o5 - s4;
    const a3 = [];
    for (const s5 of t2) i4 += s5.h, a3.push(s5.draw(n3 + (r2 - s5.w) / 2, i4)), i4 += s5.d + e3;
    return a3.join("");
  } };
}
function hc(t2, e3) {
  return cc(t2.map((t3) => fc(t3, e3)));
}
function fc(t2, e3) {
  var n2, r2;
  switch (t2.kind) {
    case "run": {
      const n3 = t2.sty ?? "i", r3 = /^[\d\s.,+\-=<>()[\]{}|/*]+$/.test(t2.text);
      return ic(t2.text, e3, (n3 === "i" || n3 === "bi") && !r3, n3 === "b" || n3 === "bi");
    }
    case "frac": {
      if (t2.type === "lin") return cc([hc(t2.num, e3), ic("/", e3, false, false), hc(t2.den, e3)]);
      if (t2.type === "skw") {
        const n4 = ec(e3, 0.85);
        return cc([hc(t2.num, n4), ic("\u2044", e3, false, false), hc(t2.den, n4)]);
      }
      const n3 = ec(e3, 0.9), r3 = hc(t2.num, n3), s4 = hc(t2.den, n3), o4 = e3.size * 0.22, i4 = Math.max(r3.w, s4.w) + o4 * 2, a3 = Math.max(0.6, e3.size * 0.055), l3 = e3.size * 0.28, c4 = e3.size * 0.18, u4 = l3 + a3 + c4 + r3.h + r3.d, h4 = -l3 + a3 + c4 + s4.h + s4.d;
      return { w: i4, h: u4, d: h4, draw: (n4, u5) => {
        const h5 = u5 - l3, f4 = [r3.draw(n4 + (i4 - r3.w) / 2, h5 - c4 - r3.d), s4.draw(n4 + (i4 - s4.w) / 2, h5 + a3 + c4 + s4.h)];
        return t2.type !== "noBar" && f4.push(`<rect x="${_l2(n4 + o4 * 0.4)}" y="${_l2(h5)}" width="${_l2(i4 - o4 * 0.8)}" height="${_l2(a3)}" fill="${e3.color}"/>`), f4.join("");
      } };
    }
    case "rad": {
      const n3 = hc(t2.base, e3), r3 = Math.max(0.6, e3.size * 0.05), s4 = e3.size * 0.12, o4 = e3.size * 0.55, i4 = t2.deg.length ? hc(t2.deg, ec(e3, 0.55)) : null, a3 = i4 ? Math.max(0, i4.w - o4 * 0.35) : 0, l3 = n3.h + s4 + r3, c4 = n3.d, u4 = a3 + o4 + n3.w + e3.size * 0.12;
      return { w: u4, h: Math.max(l3, i4 ? l3 + i4.h * 0.3 : l3), d: c4, draw: (t3, s5) => {
        const h4 = t3 + a3, f4 = s5 - l3, d4 = s5 + c4, p4 = [`<path d="${`M ${_l2(h4)} ${_l2(d4 - (d4 - f4) * 0.45)} L ${_l2(h4 + o4 * 0.3)} ${_l2(d4 - (d4 - f4) * 0.3)} L ${_l2(h4 + o4 * 0.62)} ${_l2(d4)} L ${_l2(h4 + o4)} ${_l2(f4)} L ${_l2(t3 + u4)} ${_l2(f4)}`}" fill="none" stroke="${e3.color}" stroke-width="${_l2(r3)}" stroke-linejoin="miter"/>`, n3.draw(h4 + o4 + e3.size * 0.06, s5)];
        return i4 && p4.push(i4.draw(t3, s5 - (d4 - f4) * 0.42)), p4.join("");
      } };
    }
    case "script": {
      const s4 = t2.base.length ? hc(t2.base, e3) : nc(), o4 = ec(e3, Ql2), i4 = (n2 = t2.sup) != null && n2.length ? hc(t2.sup, o4) : null, a3 = (r2 = t2.sub) != null && r2.length ? hc(t2.sub, o4) : null, l3 = e3.size * 0.42, c4 = e3.size * 0.22;
      return { w: s4.w + Math.max((i4 == null ? void 0 : i4.w) ?? 0, (a3 == null ? void 0 : a3.w) ?? 0) + e3.size * 0.04, h: Math.max(s4.h, i4 ? l3 + i4.h : 0), d: Math.max(s4.d, a3 ? c4 + a3.d : 0), draw: (t3, n3) => {
        const r3 = [s4.draw(t3, n3)], o5 = t3 + s4.w + e3.size * 0.02;
        return i4 && r3.push(i4.draw(o5, n3 - l3)), a3 && r3.push(a3.draw(o5, n3 + c4)), r3.join("");
      } };
    }
    case "nary": {
      const n3 = { ...e3, size: e3.size * 1.45 }, r3 = ic(t2.chr, n3, false, false), s4 = ec(e3, Ql2), o4 = t2.sup.length ? hc(t2.sup, s4) : null, i4 = t2.sub.length ? hc(t2.sub, s4) : null, a3 = hc(t2.base, e3);
      if (t2.underOver) {
        const t3 = [];
        o4 && t3.push(o4), t3.push(r3), i4 && t3.push(i4);
        const n4 = uc(t3, e3.size * 0.08, o4 ? 1 : 0);
        return cc([n4, { ...nc(), w: e3.size * 0.12 }, a3]);
      }
      const l3 = e3.size * 0.55, c4 = e3.size * 0.45, u4 = Math.max((o4 == null ? void 0 : o4.w) ?? 0, (i4 == null ? void 0 : i4.w) ?? 0), h4 = { w: r3.w + u4 + e3.size * 0.06, h: Math.max(r3.h, o4 ? l3 + o4.h : 0), d: Math.max(r3.d, i4 ? c4 + i4.d : 0), draw: (t3, n4) => {
        const s5 = [r3.draw(t3, n4)];
        return o4 && s5.push(o4.draw(t3 + r3.w + e3.size * 0.04, n4 - l3)), i4 && s5.push(i4.draw(t3 + r3.w + e3.size * 0.04, n4 + c4)), s5.join("");
      } };
      return cc([h4, { ...nc(), w: e3.size * 0.1 }, a3]);
    }
    case "delim": {
      const n3 = [];
      t2.items.forEach((r4, s5) => {
        s5 > 0 && t2.sep && n3.push(ic(t2.sep, e3, false, false)), n3.push(hc(r4, e3));
      });
      const r3 = cc(n3), s4 = e3.size * 0.06, o4 = Math.max(r3.h + s4, e3.size * rc), i4 = Math.max(r3.d + s4, e3.size * sc), a3 = t2.beg && t2.beg !== " " ? ac(t2.beg, e3, o4, i4) : null, l3 = t2.end && t2.end !== " " ? ac(t2.end, e3, o4, i4) : null, c4 = [a3, r3, l3].filter((t3) => t3 !== null);
      return { w: c4.reduce((t3, e4) => t3 + e4.w, 0), h: Math.max(r3.h, a3 ? a3.h : 0), d: Math.max(r3.d, a3 ? a3.d : 0), draw: (t3, e4) => {
        let n4 = t3;
        const r4 = [];
        for (const t4 of c4) r4.push(t4.draw(n4, e4)), n4 += t4.w;
        return r4.join("");
      } };
    }
    case "matrix": {
      const n3 = t2.rows.map((t3) => t3.map((t4) => hc(t4, e3))), r3 = Math.max(0, ...n3.map((t3) => t3.length)), s4 = [];
      for (let t3 = 0; t3 < r3; t3++) s4.push(Math.max(0, ...n3.map((e4) => {
        var n4;
        return ((n4 = e4[t3]) == null ? void 0 : n4.w) ?? 0;
      })));
      const o4 = e3.size * 0.5, i4 = e3.size * 0.35, a3 = n3.map((t3) => Math.max(e3.size * 0.72, ...t3.map((t4) => t4.h))), l3 = n3.map((t3) => Math.max(e3.size * 0.22, ...t3.map((t4) => t4.d))), c4 = s4.reduce((t3, e4) => t3 + e4, 0) + o4 * Math.max(0, r3 - 1), u4 = a3.reduce((t3, e4, n4) => t3 + e4 + l3[n4], 0) + i4 * Math.max(0, n3.length - 1), h4 = e3.size * 0.28;
      return { w: c4, h: u4 / 2 + h4, d: u4 / 2 - h4, draw: (t3, e4) => {
        const r4 = [];
        let c5 = e4 - (u4 / 2 + h4);
        return n3.forEach((e5, n4) => {
          c5 += a3[n4];
          let u5 = t3;
          e5.forEach((t4, e6) => {
            r4.push(t4.draw(u5 + (s4[e6] - t4.w) / 2, c5)), u5 += s4[e6] + o4;
          }), c5 += l3[n4] + i4;
        }), r4.join("");
      } };
    }
    case "acc": {
      const n3 = hc(t2.base, e3), r3 = e3.size * 0.9, s4 = t2.chr.trim(), o4 = Math.max(0.6, e3.size * 0.05), i4 = e3.size * (Kl2.has(t2.chr) || Kl2.has(t2.chr.trim()) ? 0.06 : 0.02);
      let a3;
      if (Kl2.has(t2.chr) || Kl2.has(s4)) a3 = lc(n3.w, o4, e3.color);
      else if (Jl2.has(s4)) {
        const t3 = ic(s4, { ...e3, size: r3 }, false, false), o5 = t3.w > 0 ? n3.w / t3.w : 1;
        a3 = { w: n3.w, h: t3.h, d: t3.d, draw: (e4, n4) => `<g transform="translate(${_l2(e4)} ${_l2(n4)}) scale(${_l2(o5)} 1)">${t3.draw(0, 0)}</g>` };
      } else {
        const o5 = Zl2[s4] ?? Zl2[t2.chr] ?? (s4 || "^"), i5 = ic(o5, { ...e3, size: r3 }, false, false), l3 = i5.w > n3.w * 1.1 && n3.w > 0 ? n3.w * 1.1 / i5.w : 1;
        a3 = l3 === 1 ? i5 : { w: i5.w * l3, h: i5.h, d: i5.d, draw: (t3, e4) => `<g transform="translate(${_l2(t3)} ${_l2(e4)}) scale(${_l2(l3)} 1)">${i5.draw(0, 0)}</g>` };
      }
      return t2.below ? { w: Math.max(n3.w, a3.w), h: n3.h, d: n3.d + i4 + a3.h + a3.d, draw: (t3, e4) => n3.draw(t3 + (Math.max(n3.w, a3.w) - n3.w) / 2, e4) + a3.draw(t3 + (Math.max(n3.w, a3.w) - a3.w) / 2, e4 + n3.d + i4 + a3.h) } : { w: Math.max(n3.w, a3.w), h: n3.h + i4 + a3.h, d: n3.d, draw: (t3, e4) => n3.draw(t3 + (Math.max(n3.w, a3.w) - n3.w) / 2, e4) + a3.draw(t3 + (Math.max(n3.w, a3.w) - a3.w) / 2, e4 - n3.h - i4) };
    }
    case "lim": {
      const n3 = hc(t2.base, e3), r3 = hc(t2.limit, ec(e3, Ql2));
      return t2.below ? uc([n3, r3], e3.size * 0.08, 0) : uc([r3, n3], e3.size * 0.08, 1);
    }
    case "stack": {
      const n3 = t2.rows.map((t3) => hc(t3, e3));
      return uc(n3, e3.size * 0.3, Math.floor((n3.length - 1) / 2));
    }
  }
}
function dc(t2, e3, n2, r2) {
  const s4 = hc(t2, { size: e3, measure: r2, color: n2 });
  return { w: s4.w, h: s4.h, d: s4.d, svg: s4.draw(0, 0) };
}
var pc = "'Cambria Math','Latin Modern Math','STIX Two Math','Times New Roman',serif";
var gc = ["'PingFang SC'", "'Hiragino Sans GB'", "'Microsoft YaHei'", "sans-serif"];
var mc = { boldSizeAdjust: 95.4, underscoreSizeAdjust: 74.6 };
var xc = "WebPPT DengXian Latin";
var bc = [`'${xc}'`, "'Arial'", "'Helvetica'", "'Arimo'", "'Liberation Sans'"];
var wc = ["Arial", "ArialMT", "Helvetica", "Arimo", "Arimo-Regular", "Liberation Sans", "LiberationSans"];
var yc = ["Arial Bold", "Arial-BoldMT", "Helvetica Bold", "Helvetica-Bold", "Arimo Bold", "Arimo-Bold", "Liberation Sans Bold", "LiberationSans-Bold"];
function $c(t2) {
  return /^(等线|dengxian)$/i.test(t2.fonts[0] ?? "");
}
function Mc() {
  const { boldSizeAdjust: t2, underscoreSizeAdjust: e3 } = mc, n2 = (t3, e4, n3) => `@font-face{font-family:'${xc}';src:${t3.map((t4) => `local('${t4}')`).join(",")};font-weight:${e4};${n3}}`;
  return n2(wc, "1 599", "") + n2(yc, "600 1000", `size-adjust:${t2}%;`) + n2(wc, "1 599", `unicode-range:U+5F;size-adjust:${e3}%;`) + n2(yc, "600 1000", `unicode-range:U+5F;size-adjust:${e3}%;`);
}
var vc = null;
var kc = false;
function Ec() {
  if (kc) return vc;
  kc = true;
  try {
    const t2 = document.createElement("canvas").getContext("2d");
    vc = t2 && typeof t2.measureText == "function" ? t2 : null;
  } catch {
    vc = null;
  }
  return vc;
}
function Tc(t2, e3) {
  const n2 = [], r2 = /* @__PURE__ */ new Set();
  for (const e4 of t2) {
    const t3 = e4.toLowerCase();
    e4 && !r2.has(t3) && (r2.add(t3), n2.push(`'${Gl2(e4)}'`));
  }
  for (const t3 of e3) {
    const e4 = t3.replace(/'/g, "").toLowerCase();
    r2.has(e4) || (r2.add(e4), n2.push(t3));
  }
  return n2.join(",");
}
function Cc(t2) {
  const e3 = $c(t2) ? [...bc, ...gc] : gc;
  return t2.fonts.length ? Tc(t2.fonts, e3) : Tc(["Helvetica", "Arial"], e3);
}
function Sc(t2, e3) {
  const n2 = t2.size * e3;
  return t2.baseline ? n2 * 0.65 : n2;
}
function Lc(t2, e3, n2, r2) {
  const s4 = Ec();
  return s4 ? (s4.font = `${n2 ? "italic " : ""}${r2 ? "700 " : "400 "}${e3}px ${pc}`, s4.measureText(t2).width) : t2.length * e3 * 0.55;
}
var Ac = /* @__PURE__ */ new Map();
function Pc(t2, e3) {
  var n2;
  if (!((n2 = t2.math) != null && n2.length)) return null;
  const r2 = t2.size * e3, s4 = `${r2}|${t2.color}|${JSON.stringify(t2.math)}`;
  let o4 = Ac.get(s4);
  return o4 || (o4 = dc(t2.math, r2, t2.color, Lc), Ac.size > 512 && Ac.clear(), Ac.set(s4, o4)), o4;
}
function Oc(t2, e3, n2, r2) {
  var s4, o4;
  if ((s4 = e3.math) != null && s4.length) return ((o4 = Pc(e3, n2)) == null ? void 0 : o4.w) ?? 0;
  if (r2) {
    const s5 = r2(t2, e3, n2);
    return Number.isFinite(s5) && s5 > 0 ? s5 : 0;
  }
  if (!t2) return 0;
  const i4 = Ec(), a3 = Sc(e3, n2);
  if (!i4) {
    let e4 = 0;
    for (const n3 of t2) e4 += Xl2(n3) ? a3 : a3 * 0.55;
    return e4;
  }
  return i4.font = `${e3.i ? "italic " : ""}${e3.b ? "700 " : "400 "}${a3}px ${Cc(e3)}`, i4.measureText(t2).width + (e3.spacing ?? 0) * t2.length;
}
var zc = (t2) => t2.squeezed ? t2.width - t2.squeeze : t2.width;
function Rc(t2) {
  const e3 = [], n2 = t2.run.text;
  for (let r2 = t2.from; r2 < t2.to; ) {
    const s4 = n2.codePointAt(r2), o4 = String.fromCodePoint(s4), i4 = Math.min(t2.to, r2 + o4.length);
    e3.push({ from: r2, to: i4, display: t2.run.caps === "all" ? o4.toUpperCase() : o4 }), r2 = i4;
  }
  return e3;
}
function Uc(t2, e3, n2, r2, s4) {
  const o4 = t2.width - (n2 ? t2.squeeze : 0);
  if (t2.atomic) return [{ offset: t2.from, x: e3 }, { offset: t2.to, x: e3 + o4 }];
  const i4 = Rc(t2);
  if (!i4.length) return [{ offset: t2.from, x: e3 }];
  const a3 = i4.map((e4) => Oc(e4.display, t2.run, r2, s4)), l3 = a3.reduce((t3, e4) => t3 + e4, 0), c4 = l3 > 0 ? t2.width / l3 : 0, u4 = l3 > 0 ? 0 : t2.width / i4.length;
  let h4 = e3;
  const f4 = [{ offset: i4[0].from, x: h4 }];
  return i4.forEach((e4, s5) => {
    const o5 = n2 ? Hl2(e4.display) * Sc(t2.run, r2) : 0;
    o5 && jl2(e4.display) && (h4 -= o5, f4[f4.length - 1].x = h4), h4 += l3 > 0 ? a3[s5] * c4 : u4, o5 && !jl2(e4.display) && (h4 -= o5), f4.push({ offset: e4.to, x: h4 });
  }), f4[f4.length - 1].x = e3 + o4, f4;
}
function Dc(t2, e3, n2, r2, s4, o4) {
  let i4 = e3;
  const a3 = t2.segs.map((e4) => {
    const r3 = e4.width - (t2.squeezed ? Vl2(e4.text) * Sc(e4.run, n2) : 0), a4 = [];
    let l4 = i4;
    if (s4 && !e4.bullet) for (const r4 of e4.tokens ?? []) {
      const e5 = Uc(r4, l4, t2.squeezed, n2, o4);
      a4.length && e5.length && a4[a4.length - 1].offset === e5[0].offset && e5.shift(), a4.push(...e5), l4 += r4.width - (t2.squeezed ? r4.squeeze : 0);
    }
    const c4 = { runIndex: e4.runIndex ?? -1, from: e4.from ?? 0, to: e4.to ?? 0, text: e4.text, x: i4, width: r3, naturalWidth: e4.width, bullet: e4.bullet === true, atomic: e4.atomic === true, carets: e4.bullet ? [] : a4 };
    return i4 += r3, c4;
  });
  if (!r2) return a3;
  const l3 = e3 * 2 + zc(t2);
  for (const t3 of a3) t3.carets.length ? (t3.carets = t3.carets.map((t4) => ({ ...t4, x: l3 - t4.x })), t3.x = Math.min(...t3.carets.map((t4) => t4.x))) : t3.x = l3 - t3.x - t3.width;
  return a3;
}
var Nc = /* @__PURE__ */ new Set(["textArchUp", "textArchDown", "textArchUpPour", "textArchDownPour", "textCircle", "textWave1", "textWave2", "textCurveUp", "textCurveDown", "textCanUp", "textCanDown", "textTriangle", "textChevron", "textInflate", "textDeflate"]);
var Bc = (t2) => !!t2 && Nc.has(t2);
function Fc(t2) {
  return t2 === "dbl" ? "double" : t2 === "dotted" || t2 === "dottedHeavy" ? "dotted" : t2.startsWith("wavy") ? "wavy" : t2 === "dash" || t2 === "dashHeavy" || t2 === "dashLong" || t2 === "dashLongHeavy" || t2.startsWith("dotDash") || t2.startsWith("dotDotDash") ? "dashed" : "solid";
}
var jc = (t2) => t2 === "heavy" || t2.endsWith("Heavy");
function Hc(t2) {
  const e3 = t2.underline ?? (t2.u ? "sng" : "none"), n2 = t2.strikeType ?? (t2.strike ? "sngStrike" : "noStrike"), r2 = t2.underlineColor ? `;text-decoration-color:${t2.underlineColor}` : "", s4 = jc(e3) ? ";text-decoration-thickness:0.12em" : "", o4 = e3 === "words" ? ";text-decoration-skip-spaces:all" : "";
  return { ...e3 !== "none" ? { underline: `text-decoration-line:underline;text-decoration-style:${Fc(e3)}${r2}${s4}${o4}` } : {}, ...n2 !== "noStrike" ? { strike: `text-decoration-line:line-through;text-decoration-style:${n2 === "dblStrike" ? "double" : "solid"}` } : {} };
}
function Vc(t2, e3, n2, r2 = e3.color) {
  const s4 = Hc(e3);
  let o4 = t2;
  return s4.strike && (o4 = `<${n2} style="${s4.strike}">${o4}</${n2}>`), s4.underline && (o4 = n2 === "tspan" && e3.underlineColor ? `<tspan style="${s4.underline}" fill="${Yl2(e3.underlineColor)}"><tspan fill="${Yl2(r2)}">${o4}</tspan></tspan>` : `<${n2} style="${s4.underline}">${o4}</${n2}>`), o4;
}
function Wc(t2) {
  return { text: t2.text, b: false, i: false, u: false, strike: false, size: t2.size, color: t2.color, fonts: [...t2.fonts] };
}
function Xc(t2) {
  if (t2.caps !== "all") {
    const e4 = Array.from({ length: t2.text.length + 1 }, (t3, e5) => e5);
    return { text: t2.text, starts: e4, ends: e4 };
  }
  let e3 = "";
  const n2 = [0], r2 = [0];
  for (let s4 = 0; s4 < t2.text.length; ) {
    const o4 = t2.text.codePointAt(s4), i4 = String.fromCodePoint(o4), a3 = s4 + i4.length, l3 = i4.toUpperCase(), c4 = e3.length;
    e3 += l3;
    for (let t3 = 0; t3 <= l3.length; t3++) n2[c4 + t3] = t3 === l3.length ? a3 : s4, r2[c4 + t3] = t3 === 0 ? s4 : a3;
    s4 = a3;
  }
  return { text: e3, starts: n2, ends: r2 };
}
function Yc(t2, e3, n2) {
  var r2;
  const s4 = [];
  for (const o4 of t2) {
    const { run: t3, runIndex: i4, bullet: a3 } = o4;
    if ((r2 = t3.math) != null && r2.length) {
      s4.push({ text: t3.text, run: t3, runIndex: i4, from: 0, to: t3.text.length, bullet: a3, atomic: true, width: Oc(t3.text, t3, e3, n2), br: false, space: false, squeeze: 0 });
      continue;
    }
    const l3 = Xc(t3), c4 = l3.text;
    if (!c4) continue;
    const u4 = c4.matchAll(/\n|[^\S\n]+|[⺀-鿿가-퟿＀-｠　-〿]|[^\s⺀-鿿가-퟿＀-｠　-〿]+/g);
    for (const r3 of u4) {
      const o5 = r3[0], c5 = r3.index, u5 = c5 + o5.length;
      s4.push({ text: o5, run: t3, runIndex: i4, from: l3.starts[c5] ?? 0, to: l3.ends[u5] ?? t3.text.length, bullet: a3, atomic: false, width: o5 === `
` ? 0 : Oc(o5, t3, e3, n2), br: o5 === `
`, space: /^[^\S\n]+$/.test(o5), squeeze: Vl2(o5) * Sc(t3, e3) });
    }
  }
  return s4;
}
var _c = (t2) => t2.squeezed ? t2.width - t2.squeeze : t2.width - t2.baseSqueeze;
function Gc(t2) {
  const e3 = [], n2 = [];
  for (const r3 of t2.segs) for (const t3 of r3.text) e3.push(t3), n2.push(r3.run.size);
  const r2 = Wl2(e3, false);
  let s4 = 0;
  for (let t3 = 0; t3 < e3.length; t3++) s4 += r2.amount[t3] * n2[t3];
  return s4;
}
function qc(t2, e3) {
  var n2;
  const r2 = t2.segs[t2.segs.length - 1];
  r2 && r2.run === e3.run && r2.to === e3.from && r2.bullet === e3.bullet ? (r2.text += e3.text, r2.width += e3.width, r2.to = e3.to, r2.atomic || (r2.atomic = e3.atomic), r2.tokens.push(e3)) : t2.segs.push({ text: e3.text, run: e3.run, runIndex: e3.runIndex, from: e3.from, to: e3.to, bullet: e3.bullet, atomic: e3.atomic, tokens: [e3], width: e3.width }), t2.width += e3.width, t2.squeeze += e3.squeeze;
  const s4 = (n2 = e3.run.math) != null && n2.length ? Pc(e3.run, 1) : null;
  t2.size = Math.max(t2.size, s4 ? (s4.h + s4.d) / 1.2 : e3.run.size);
}
function Zc(t2, e3, n2, r2) {
  const s4 = [], o4 = () => ({ segs: [], width: 0, size: 0, squeeze: 0, squeezed: false, baseSqueeze: 0 });
  let i4 = o4(), a3 = Math.max(1, e3 - Math.max(0, r2));
  const l3 = () => {
    i4.squeezed = i4.width > a3 && i4.width - i4.squeeze <= a3, i4.baseSqueeze = i4.squeezed ? 0 : Gc(i4), s4.push(i4), i4 = o4(), a3 = Math.max(1, e3);
  };
  for (const e4 of t2) {
    if (e4.br) {
      l3();
      continue;
    }
    const t3 = i4.width + e4.width - (i4.squeeze + e4.squeeze) <= a3;
    if (n2 && i4.width > 0 && !t3) {
      if (e4.space) continue;
      l3();
    }
    qc(i4, e4);
  }
  return l3(), s4;
}
function Kc(t2, e3, n2, r2, s4) {
  if (e3 <= 0 || !t2.runs.some((t3) => Vl2(t3.text) > 0)) return false;
  const o4 = t2.runs.map((t3, e4) => ({ run: t3, runIndex: e4, bullet: false }));
  return Zc(Yc(o4, n2, s4), e3, r2, t2.indent).some((t3) => t3.squeezed);
}
var Jc = { left: "start", center: "middle", right: "end", justify: "start" };
function Qc(t2, e3, n2, r2) {
  return t2.paragraphs.map((s4) => {
    const o4 = s4.runs[0], i4 = s4.bullet && o4 ? Wc({ ...o4, text: `${s4.bullet} `, size: o4.size * (s4.bulletSize ?? 1), color: s4.bulletColor ?? o4.color }) : null, a3 = [...i4 ? [{ run: i4, runIndex: -1, bullet: true }] : [], ...s4.runs.map((t3, e4) => ({ run: t3, runIndex: e4, bullet: false }))], l3 = Math.max(1, e3 - Math.max(0, s4.marL)), c4 = Zc(Yc(a3, n2, r2), l3, t2.wrap, s4.indent), u4 = c4.map((t3) => (t3.size || (o4 == null ? void 0 : o4.size) || 18) * n2 * (s4.lineHeight ?? 1.2));
    return { lines: c4, para: s4, before: s4.spaceBefore, after: s4.spaceAfter, lineHeights: u4 };
  });
}
function tu(t2, e3, n2, r2) {
  return Qc(t2, e3, n2, r2).reduce((t3, e4) => t3 + e4.before + e4.after + e4.lineHeights.reduce((t4, e5) => t4 + e5, 0), 0);
}
function eu(t2, e3, n2, r2, s4 = {}) {
  const [o4, i4, a3, l3] = s4.insets ?? t2.insets, c4 = s4.vert ?? t2.vert ?? "horz", u4 = c4 === "vert" || c4 === "wordArtVert" || c4 === "vert270" ? n2 : e3, h4 = c4 === "vert" || c4 === "wordArtVert" || c4 === "vert270" ? e3 : n2, f4 = Math.max(1, u4 - l3 - i4), d4 = Math.max(1, h4 - o4 - a3);
  if (tu(t2, f4, 1, r2) <= d4) return 1;
  let p4 = nu, g4 = 1;
  for (let e4 = 0; e4 < 12; e4++) {
    const e5 = (p4 + g4) / 2;
    tu(t2, f4, e5, r2) <= d4 ? p4 = e5 : g4 = e5;
  }
  return p4;
}
var nu = 0.25;
function ru(t2, e3, n2, r2, s4 = {}) {
  const o4 = Number.isFinite(t2.fontScale) && t2.fontScale > 0 ? t2.fontScale : 1;
  return !t2.autoFitCompute || t2.autoFitShape ? o4 : o4 * eu(t2, e3, n2, r2, s4);
}
function su(t2) {
  const e3 = [];
  return t2.forEach((t3, n2) => {
    t3.lines.forEach((r2, s4) => {
      e3.push({ lp: t3, line: r2, paragraphIndex: n2, li: s4, h: t3.lineHeights[s4] + (s4 === 0 ? t3.before : 0) + (s4 === t3.lines.length - 1 ? t3.after : 0), padTop: s4 === 0 ? t3.before : 0 });
    });
  }), e3;
}
var ou = (t2) => t2.reduce((t3, e3) => t3 + e3.h, 0);
function iu(t2, e3, n2, r2 = {}) {
  var s4, o4;
  const i4 = r2.vert ?? t2.vert ?? "horz", a3 = Number.isFinite(r2.scale) && r2.scale > 0 ? r2.scale : ru(t2, e3, n2, r2.measureText, { insets: r2.insets, vert: r2.vert }), l3 = t2.autoFitShape ? "shape" : t2.autoFitNormal || t2.autoFitCompute ? "normal" : "none";
  if (i4 === "vert" || i4 === "wordArtVert" || i4 === "vert270") {
    const o5 = iu({ ...t2, vert: void 0 }, n2, e3, { ...r2, vert: "horz", scale: a3 }), [, c5, , u5] = r2.insets ?? t2.insets, h5 = o5.lines.some((t3) => t3.x < u5 - 1e-9 || t3.x + t3.width > n2 - c5 + 1e-9);
    return { ...o5, width: e3, height: n2, layoutWidth: n2, layoutHeight: e3, scale: a3, autoFit: l3, vert: i4, transform: i4 === "vert270" ? [0, -1, 1, 0, 0, n2] : [0, 1, -1, 0, e3, 0], unwarped: Bc((s4 = t2.warp) == null ? void 0 : s4.preset), overflow: o5.overflow || h5 };
  }
  const [c4, u4, h4, f4] = r2.insets ?? t2.insets, d4 = Math.max(1, e3 - f4 - u4), p4 = Math.max(1, Math.min(Math.floor(t2.columns ?? 1), 16)), g4 = t2.columnGap ?? 0, m4 = p4 === 1 ? d4 : Math.max(1, (d4 - g4 * (p4 - 1)) / p4), x4 = su(Qc(t2, m4, a3, r2.measureText)), b4 = [[]];
  if (p4 === 1) b4[0].push(...x4);
  else {
    const t3 = Math.max(1, n2 - c4 - h4);
    let e4 = 0;
    for (const n3 of x4) e4 > 0 && e4 + n3.h > t3 && b4.length < p4 && (b4.push([]), e4 = 0), b4[b4.length - 1].push(n3), e4 += n3.h;
  }
  const w4 = r2.anchor ?? t2.anchor, y4 = [];
  return b4.forEach((t3, e4) => {
    let s5 = c4;
    const o5 = ou(t3);
    w4 === "middle" ? s5 = c4 + Math.max(0, (n2 - c4 - h4 - o5) / 2) : w4 === "bottom" && (s5 = Math.max(c4, n2 - h4 - o5));
    const i5 = f4 + e4 * (m4 + g4);
    for (const { lp: n3, line: o6, paragraphIndex: l4, li: c5, padTop: u5 } of t3) {
      s5 += u5;
      const t4 = n3.lineHeights[c5], h5 = s5 + t4 * 0.78, f5 = c5 === 0 ? n3.para.indent : 0, d5 = i5 + Math.max(0, n3.para.marL) + f5, p5 = Jc[n3.para.align], g5 = p5 === "middle" ? i5 + m4 / 2 : p5 === "end" ? i5 + m4 : d5, x5 = _c(o6), b5 = p5 === "middle" ? g5 - x5 / 2 : p5 === "end" ? g5 - x5 : g5, w5 = n3.para.rtl === true;
      y4.push({ paragraphIndex: l4, lineIndex: c5, columnIndex: e4, x: b5, y: s5, width: x5, naturalWidth: o6.width, height: t4, baseline: h5, anchorX: g5, align: n3.para.align, rtl: w5, squeezed: o6.squeezed, segments: Dc(o6, b5, a3, w5, r2.includeCarets !== false, r2.measureText) }), s5 += t4 + (c5 === n3.lines.length - 1 ? n3.after : 0);
    }
  }), { width: e3, height: n2, layoutWidth: e3, layoutHeight: n2, scale: a3, autoFit: l3, columns: p4, vert: i4, transform: [1, 0, 0, 1, 0, 0], unwarped: Bc((o4 = t2.warp) == null ? void 0 : o4.preset), overflow: b4.some((t3) => ou(t3) > n2 - c4 - h4 + 1e-9), lines: y4 };
}
function au(t2) {
  return t2.startsWith("slide:") ? `data-slide="${Yl2(t2.slice(6))}" tabindex="0" role="link" style="cursor:pointer;text-decoration:underline"` : un(t2) ? `href="${Yl2(t2)}" target="_blank" rel="noopener noreferrer"` : `data-unsafe-href="${Yl2(t2)}" aria-disabled="true"`;
}
function lu(t2, e3) {
  return e3 ? `<a ${au(e3)}>${t2}</a>` : t2;
}
var cu = { top: "flex-start", middle: "center", bottom: "flex-end" };
var uu = { vert: "writing-mode:vertical-rl;", vert270: "writing-mode:vertical-rl;transform:rotate(180deg);", wordArtVert: "writing-mode:vertical-rl;text-orientation:upright;" };
var hu = ["'PingFang SC'", "'Hiragino Sans GB'", "'Microsoft YaHei'", "sans-serif"];
function fu(t2, e3) {
  const n2 = [], r2 = /* @__PURE__ */ new Set();
  for (const e4 of t2) {
    const t3 = e4.toLowerCase();
    e4 && !r2.has(t3) && (r2.add(t3), n2.push(`'${Gl2(e4)}'`));
  }
  for (const t3 of e3) {
    const e4 = t3.replace(/'/g, "").toLowerCase();
    r2.has(e4) || (r2.add(e4), n2.push(t3));
  }
  return n2.join(",");
}
function du(t2, e3) {
  const n2 = t2.size * e3;
  let r2 = `font-size:${_l2(n2)}px;`;
  return r2 += t2.gradient ? `background-image:${t2.gradient};-webkit-background-clip:text;background-clip:text;color:transparent;` : `color:${t2.color};`, t2.b && (r2 += "font-weight:700;"), t2.i && (r2 += "font-style:italic;"), t2.fonts.length && (r2 += `font-family:${Cc(t2)};`), t2.spacing && (r2 += `letter-spacing:${_l2(t2.spacing)}px;`), t2.caps === "all" ? r2 += "text-transform:uppercase;" : t2.caps === "small" && (r2 += "font-variant:small-caps;"), t2.highlight && (r2 += `background-color:${t2.highlight};`), t2.outline && (r2 += `-webkit-text-stroke:${_l2(t2.outline.width)}px ${t2.outline.color};`), t2.shadow && (r2 += `text-shadow:${t2.shadow};`), t2.baseline && (r2 += `vertical-align:${t2.baseline > 0 ? "super" : "sub"};font-size:${_l2(n2 * 0.65)}px;`), r2;
}
function pu(t2, e3) {
  const n2 = [...t2];
  let r2 = "";
  for (let t3 = 0; t3 < n2.length; t3++) {
    const s4 = n2[t3];
    if (s4 === `
`) {
      r2 += "<br/>";
      continue;
    }
    const o4 = Hl2(s4);
    if (!o4 || !(e3 || t3 > 0 && Hl2(n2[t3 - 1]) > 0)) {
      r2 += Yl2(s4);
      continue;
    }
    r2 += `<span style="margin-${jl2(s4) ? "left" : "right"}:-${o4}em">${Yl2(s4)}</span>`;
  }
  return r2;
}
function gu(t2, e3, n2, r2) {
  var s4;
  if ((s4 = t2.math) != null && s4.length) {
    const n3 = Pc(t2, e3);
    if (n3 && n3.w > 0) return `<svg${r2} xmlns="http://www.w3.org/2000/svg" width="${_l2(n3.w)}" height="${_l2(n3.h + n3.d)}" viewBox="0 ${_l2(-n3.h)} ${_l2(n3.w)} ${_l2(n3.h + n3.d)}" style="display:inline-block;vertical-align:${_l2(-n3.d)}px;overflow:visible">${n3.svg}</svg>`;
  }
  const o4 = !t2.text, i4 = t2.text ? pu(t2.text, n2) : "&#160;", a3 = `<span${r2}${r2 && o4 ? ' data-empty="true"' : ""} style="${Yl2(du(t2, e3))}">${Vc(i4, t2, "span")}</span>`;
  return lu(a3, t2.link);
}
function mu(t2, e3, n2, r2) {
  const s4 = r2.scale, o4 = Number.isFinite(s4) && s4 > 0 ? s4 : ru(t2, e3, n2, r2.measureText, { insets: r2.insets, vert: r2.vert });
  return o4 === t2.fontScale ? t2 : { ...t2, fontScale: o4 };
}
function xu(t2, e3, n2, r2) {
  return ` data-r="${t2}.${e3}" data-from="${n2}" data-to="${r2}"`;
}
function bu(t2, e3, n2, r2, s4, o4, i4, a3 = false) {
  const l3 = gu({ ...t2, text: e3 }, n2, r2, s4), c4 = `position:absolute;left:${_l2(o4)}px;top:0;height:${_l2(i4)}px;line-height:${_l2(i4)}px;white-space:pre;` + (a3 ? "width:0;overflow:hidden;opacity:0;" : "overflow:visible;");
  return `<span data-engine-${a3 ? "semantic" : "segment"}="true" style="${Yl2(c4)}">${l3}</span>`;
}
function wu(t2, e3, n2, r2) {
  var s4;
  const o4 = t2.paragraphs[e3], i4 = n2.map((t3) => ({ line: t3, pieces: [] }));
  if (!i4.length) return `<div data-p="${e3}"></div>`;
  const a3 = o4.runs.map(() => 0), l3 = o4.runs.map(() => false);
  let c4 = 0, u4 = i4[0];
  const h4 = (t3, n3, s5, i5, a4) => {
    const c5 = o4.runs[t3], u5 = !c5.text.length;
    s5 <= n3 && (!u5 || l3[t3]) || (l3[t3] || (l3[t3] = u5), i5.pieces.push(bu(c5, c5.text.slice(n3, s5), r2, i5.line.squeezed, xu(e3, t3, n3, s5), a4 - i5.line.x, i5.line.height, true)));
  }, f4 = (t3, e4, n3) => {
    const r3 = o4.runs[t3];
    h4(t3, a3[t3], r3.text.length, e4, n3), a3[t3] = r3.text.length;
  };
  for (const t3 of i4) {
    u4 = t3;
    for (const n3 of t3.line.segments) {
      if (n3.bullet) {
        const e4 = o4.runs[0];
        if (e4) {
          const s5 = Wc({ ...e4, text: n3.text, size: e4.size * (o4.bulletSize ?? 1), color: o4.bulletColor ?? e4.color });
          t3.pieces.push(bu(s5, n3.text, r2, t3.line.squeezed, ' data-bullet="true" contenteditable="false"', n3.x - t3.line.x, t3.line.height));
        }
        continue;
      }
      for (; c4 < n3.runIndex; ) f4(c4, t3, n3.x), c4++;
      const i5 = o4.runs[n3.runIndex];
      if (!i5) continue;
      h4(n3.runIndex, a3[n3.runIndex], n3.from, t3, n3.x);
      const l4 = !!((s4 = i5.math) != null && s4.length), u5 = l4 ? 0 : n3.from, d5 = l4 ? 1 : n3.to;
      t3.pieces.push(bu(i5, l4 ? i5.text : i5.text.slice(n3.from, n3.to), r2, t3.line.squeezed, xu(e3, n3.runIndex, u5, d5), n3.x - t3.line.x, t3.line.height)), a3[n3.runIndex] = n3.to, c4 = n3.runIndex;
    }
  }
  const d4 = u4.line.x + u4.line.width;
  for (; c4 < o4.runs.length; ) f4(c4, u4, d4), c4++;
  const p4 = i4.map(({ line: t3, pieces: n3 }) => {
    const r3 = `position:absolute;left:${_l2(t3.x)}px;top:${_l2(t3.y)}px;width:${_l2(Math.max(1, t3.width))}px;height:${_l2(t3.height)}px;line-height:${_l2(t3.height)}px;white-space:pre;overflow:visible;` + (t3.rtl ? "direction:rtl;unicode-bidi:plaintext;" : "");
    return `<span data-engine-line="${e3}.${t3.lineIndex}" data-x="${_l2(t3.x)}" data-y="${_l2(t3.y)}" style="${Yl2(r3)}">${n3.join("")}</span>`;
  }).join("");
  return `<div data-p="${e3}" style="position:absolute;inset:0">${p4}</div>`;
}
function yu(t2, e3, n2, r2) {
  const s4 = iu(t2, e3, n2, { insets: r2.insets, anchor: r2.anchor, vert: r2.vert, scale: r2.scale, measureText: r2.measureText }), o4 = t2.paragraphs.map((t3, e4) => s4.lines.filter((t4) => t4.paragraphIndex === e4)), i4 = t2.paragraphs.map((e4, n3) => wu(t2, n3, o4[n3], s4.scale)).join(""), [a3, l3, c4, u4, h4, f4] = s4.transform, d4 = `position:relative;width:${_l2(s4.layoutWidth)}px;height:${_l2(s4.layoutHeight)}px;box-sizing:border-box;white-space:pre;overflow:visible;transform-origin:0 0;transform:matrix(${_l2(a3)},${_l2(l3)},${_l2(c4)},${_l2(u4)},${_l2(h4)},${_l2(f4)});`;
  return `<div data-layout="engine" data-font-scale="${_l2(s4.scale)}" data-autofit="${s4.autoFit}" xmlns="http://www.w3.org/1999/xhtml" style="${Yl2(d4)}">${i4}</div>`;
}
function $u(t2, e3, n2, r2 = {}) {
  if (r2.layout === "engine") return yu(t2, e3, n2, r2);
  const s4 = mu(t2, e3, n2, r2), [o4, i4, a3, l3] = r2.insets ?? s4.insets, c4 = s4.fontScale, u4 = r2.includeEditMarkers !== false, h4 = s4.paragraphs.map((t3, n3) => {
    const o5 = t3.runs[0], a4 = ((o5 == null ? void 0 : o5.size) ?? 18) * c4, h5 = s4.wrap && Kc(t3, e3 - l3 - i4 - Math.max(0, t3.marL), c4, true, r2.measureText), f5 = t3.runs.map((t4, e4) => gu(t4, c4, h5, u4 ? ` data-r="${n3}.${e4}"` : "")).join("");
    let d5 = "";
    const p5 = u4 ? ' data-bullet="true" contenteditable="false"' : "";
    if (t3.bulletImage) d5 = `<img${p5} src="${Yl2(t3.bulletImage)}" style="height:${_l2(a4 * 0.8)}px;vertical-align:middle;margin-right:4px"/>`;
    else if (t3.bullet) {
      const e4 = a4 * (t3.bulletSize ?? 1), n4 = t3.bulletColor ?? (o5 == null ? void 0 : o5.color) ?? "#000", r3 = t3.bulletFont && !/wingdings|webdings|symbol/i.test(t3.bulletFont) ? `font-family:${fu([t3.bulletFont], hu)};` : "";
      d5 = `<span${p5} style="${Yl2(`font-size:${_l2(e4)}px;color:${n4};${r3}`)}">${Yl2(t3.bullet)}&#160;</span>`;
    }
    const g5 = `margin:${_l2(t3.spaceBefore)}px 0 ${_l2(t3.spaceAfter)}px 0;text-align:${t3.align};padding-left:${_l2(Math.max(0, t3.marL))}px;text-indent:${_l2(t3.indent)}px;line-height:${t3.lineHeight !== null ? _l2(t3.lineHeight) : "1.2"};` + (t3.rtl ? "direction:rtl;" : "") + `white-space:${s4.wrap ? "pre-wrap" : "pre"};word-break:break-word;`;
    return `<div${u4 ? ` data-p="${n3}"` : ""} style="${Yl2(g5)}">${d5}${f5}</div>`;
  }).join(""), f4 = r2.anchor ?? s4.anchor, d4 = r2.vert ?? s4.vert, p4 = `width:${_l2(e3)}px;height:${_l2(n2)}px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:${cu[f4]};` + (s4.anchorCtr ? "align-items:center;" : "") + `padding:${_l2(o4)}px ${_l2(i4)}px ${_l2(a3)}px ${_l2(l3)}px;` + (s4.columns ? `column-count:${s4.columns};column-gap:${_l2(s4.columnGap ?? 0)}px;display:block;` : "") + (d4 ? uu[d4] ?? "" : "") + "overflow:visible;", g4 = s4.autoFitShape ? "shape" : t2.autoFitNormal || t2.autoFitCompute ? "normal" : "none";
  return `<div${u4 ? ` data-font-scale="${_l2(c4)}" data-autofit="${g4}"` : ""} xmlns="http://www.w3.org/1999/xhtml" style="${Yl2(p4)}">${h4}</div>`;
}
var Mu = { left: "start", center: "middle", right: "end", justify: "start" };
var vu = (t2) => t2 === "start" ? "end" : t2 === "end" ? "start" : t2;
var ku = (t2, e3) => e3.caps === "all" ? t2.toUpperCase() : t2;
function Eu(t2, e3, n2, r2, s4, o4, i4 = false, a3) {
  var l3;
  if (t2.vert === "vert" || t2.vert === "wordArtVert") {
    const l4 = Eu({ ...t2, vert: void 0 }, n2, e3, r2, s4, o4, i4, a3);
    return `<g transform="translate(${_l2(e3)} 0) rotate(90)">${l4}</g>`;
  }
  if (t2.vert === "vert270") {
    const l4 = Eu({ ...t2, vert: void 0 }, n2, e3, r2, s4, o4, i4, a3);
    return `<g transform="translate(0 ${_l2(n2)}) rotate(-90)">${l4}</g>`;
  }
  const [c4, u4, h4, f4] = s4 ?? t2.insets, d4 = t2.fontScale, p4 = Ru(t2, e3, n2, r2, [c4, u4, h4, f4], o4 ?? t2.anchor, a3);
  if (p4) return p4;
  const g4 = iu(t2, e3, n2, { insets: s4, anchor: o4, vert: "horz", scale: d4, includeCarets: false, measureText: a3 }), m4 = [];
  for (const e4 of g4.lines) {
    const n3 = t2.paragraphs[e4.paragraphIndex], s5 = n3.runs[0], o5 = e4.segments.map((t3) => {
      const r3 = t3.runIndex >= 0 ? n3.runs[t3.runIndex] : Wc({ ...s5, text: `${n3.bullet} `, size: s5.size * (n3.bulletSize ?? 1), color: n3.bulletColor ?? s5.color });
      return { text: t3.text, run: r3, width: t3.naturalWidth, paragraphIndex: e4.paragraphIndex, runIndex: t3.runIndex, from: t3.from, to: t3.to };
    });
    if (!o5.length) continue;
    const a4 = [], c5 = [];
    for (const t3 of o5) {
      const e5 = [...t3.text];
      c5.push([a4.length, a4.length + e5.length]), a4.push(...e5);
    }
    const u5 = Wl2(a4, e4.squeezed), h5 = o5.map((t3, e5) => {
      const [n4, r3] = c5[e5];
      let s6 = 0;
      for (let t4 = n4; t4 < r3; t4++) s6 += u5.amount[t4];
      return s6 * Sc(t3.run, d4);
    });
    let f5 = e4.x;
    for (const [t3, n4] of o5.entries()) {
      if (n4.run.highlight) {
        const t4 = Sc(n4.run, d4);
        m4.push(`<rect x="${_l2(f5)}" y="${_l2(e4.baseline - t4 * 0.82)}" width="${_l2(n4.width)}" height="${_l2(t4 * 1.12)}" fill="${Yl2(n4.run.highlight)}"/>`);
      }
      f5 += n4.width - h5[t3];
    }
    const p5 = Mu[e4.align];
    if (o5.some((t3) => {
      var e5;
      return (e5 = t3.run.math) == null ? void 0 : e5.length;
    })) {
      let t3 = e4.x;
      for (const [n4, s6] of o5.entries()) {
        const o6 = (l3 = s6.run.math) != null && l3.length ? Pc(s6.run, d4) : null;
        o6 ? m4.push(lu(`<g transform="translate(${_l2(t3)} ${_l2(e4.baseline)})">${o6.svg}</g>`, s6.run.link)) : m4.push(`<text x="${_l2(t3)}" y="${_l2(e4.baseline)}" text-anchor="start"` + (e4.rtl ? ' direction="rtl" unicode-bidi="embed"' : "") + ` xml:space="preserve">${Su(s6, d4, r2, void 0, i4)}</text>`), t3 += s6.width - h5[n4];
      }
    } else {
      const t3 = u5.total > 0 ? Cu(o5, c5, u5, d4, r2, i4) : o5.map((t4) => Su(t4, d4, r2, void 0, i4)).join("");
      m4.push(`<text x="${_l2(e4.anchorX)}" y="${_l2(e4.baseline)}" text-anchor="${e4.rtl ? vu(p5) : p5}"` + (e4.rtl ? ' direction="rtl" unicode-bidi="embed"' : "") + ` xml:space="preserve">${t3}</text>`);
    }
  }
  return m4.join("");
}
function Tu(t2, e3) {
  var n2;
  const r2 = (n2 = t2.match(/linear-gradient\(([^]*)\)$/)) == null ? void 0 : n2[1];
  if (!r2) return null;
  const s4 = r2.split(/,(?![^(]*\))/).map((t3) => t3.trim()), o4 = s4[0].match(/^(-?[\d.]+)deg$/), i4 = o4 ? Number(o4[1]) : 180, a3 = (o4 ? s4.slice(1) : s4).map((t3) => {
    const e4 = t3.match(/^(.*?)\s+([\d.]+)%$/);
    return e4 ? { color: e4[1].trim(), pos: Number(e4[2]) } : { color: t3, pos: null };
  }).map((t3, e4, n3) => ({ color: t3.color, pos: t3.pos ?? (n3.length > 1 ? e4 / (n3.length - 1) * 100 : 0) }));
  if (!a3.length) return null;
  const l3 = (i4 - 90) * Math.PI / 180, c4 = Math.cos(l3) / 2, u4 = Math.sin(l3) / 2;
  return `url(#${e3(`<linearGradient id="__ID__" x1="${_l2(0.5 - c4)}" y1="${_l2(0.5 - u4)}" x2="${_l2(0.5 + c4)}" y2="${_l2(0.5 + u4)}">` + a3.map((t3) => `<stop offset="${_l2(t3.pos)}%" stop-color="${Yl2(t3.color)}"/>`).join("") + "</linearGradient>")})`;
}
function Cu(t2, e3, n2, r2, s4, o4 = false) {
  return t2.map((t3, i4) => {
    const [a3, l3] = e3[i4], c4 = Sc(t3.run, r2), u4 = n2.dx.slice(a3, l3).map((t4) => t4 * c4), h4 = u4.some((t4) => t4 !== 0);
    return Su(t3, r2, s4, h4 ? u4 : void 0, o4);
  }).join("");
}
function Su(t2, e3, n2, r2, s4 = false) {
  const o4 = t2.run, i4 = Sc(o4, e3), a3 = o4.gradient ? Tu(o4.gradient, n2) : null, l3 = [`font-size="${_l2(i4)}"`, `font-family="${Yl2(Cc(o4))}"`, `fill="${Yl2(a3 ?? o4.color)}"`];
  o4.b && l3.push('font-weight="700"'), o4.i && l3.push('font-style="italic"'), o4.spacing && l3.push(`letter-spacing="${_l2(o4.spacing)}"`), o4.caps === "small" && l3.push('font-variant="small-caps"'), o4.baseline && l3.push(`dy="${_l2(o4.baseline > 0 ? -i4 * 0.45 : i4 * 0.25)}"`), o4.outline && l3.push(`stroke="${Yl2(o4.outline.color)}" stroke-width="${_l2(o4.outline.width)}" paint-order="stroke"`), r2 != null && r2.some((t3) => t3 !== 0) && l3.push(`dx="${r2.map((t3) => _l2(t3)).join(" ")}"`);
  const c4 = `<tspan${s4 && t2.runIndex !== void 0 && t2.runIndex >= 0 ? ` data-r="${t2.paragraphIndex}.${t2.runIndex}" data-from="${t2.from}" data-to="${t2.to}"` : ""} ${l3.join(" ")}>${Vc(Yl2(t2.text), o4, "tspan", a3 ?? o4.color)}</tspan>`, u4 = o4.baseline ? `${c4}<tspan dy="${_l2(o4.baseline > 0 ? i4 * 0.45 : -i4 * 0.25)}"></tspan>` : c4;
  return lu(u4, o4.link);
}
var Lu = (t2, e3, n2) => Math.min(n2, Math.max(e3, t2));
function Au(t2, e3, n2, r2, s4, o4) {
  const i4 = (s5) => {
    const o5 = s5 * Math.PI / 180;
    return [t2 + n2 * Math.cos(o5), e3 + r2 * Math.sin(o5)];
  }, [a3, l3] = i4(s4), [c4, u4] = i4(o4), h4 = Math.abs(o4 - s4);
  return { d: `M${_l2(a3)} ${_l2(l3)}A${_l2(n2)} ${_l2(r2)} 0 ${h4 > 180 ? 1 : 0} ${o4 > s4 ? 1 : 0} ${_l2(c4)} ${_l2(u4)}`, len: h4 * Math.PI / 180 * ((n2 + r2) / 2), fill: true };
}
function Pu(t2, e3, n2 = 28) {
  const r2 = [];
  for (let s5 = 0; s5 <= n2; s5++) r2.push([e3 * s5 / n2, t2(s5 / n2)]);
  let s4 = `M${_l2(r2[0][0])} ${_l2(r2[0][1])}`, o4 = 0;
  for (let t3 = 0; t3 < n2; t3++) {
    const e4 = r2[Math.max(0, t3 - 1)], i4 = r2[t3], a3 = r2[t3 + 1], l3 = r2[Math.min(n2, t3 + 2)];
    s4 += `C${_l2(i4[0] + (a3[0] - e4[0]) / 6)} ${_l2(i4[1] + (a3[1] - e4[1]) / 6)} ${_l2(a3[0] - (l3[0] - i4[0]) / 6)} ${_l2(a3[1] - (l3[1] - i4[1]) / 6)} ${_l2(a3[0])} ${_l2(a3[1])}`, o4 += Math.hypot(a3[0] - i4[0], a3[1] - i4[1]);
  }
  return { d: s4, len: o4 };
}
var Iu = { textCurveUp: 0.3, textCurveDown: -0.3, textCanUp: 0.16, textCanDown: -0.16, textDeflate: 0.22, textInflate: -0.22, textTriangle: 0.2, textChevron: 0.34 };
var Ou = /* @__PURE__ */ new Set(["textTriangle", "textChevron"]);
function zu(t2, e3, n2, r2, s4, o4) {
  const i4 = n2 / 2, a3 = r2 / 2, l3 = Lu((e3.adj ?? e3.adj1 ?? 108e5) / 6e4, 20, 350);
  if (t2 === "textCircle") {
    const t3 = Math.max(1, i4 - s4 * 0.3), e4 = Math.max(1, a3 - s4 * 0.3);
    return { d: `M${_l2(i4)} ${_l2(a3 + e4)}A${_l2(t3)} ${_l2(e4)} 0 1 1 ${_l2(i4)} ${_l2(a3 - e4)}A${_l2(t3)} ${_l2(e4)} 0 1 1 ${_l2(i4)} ${_l2(a3 + e4)}`, len: Math.PI * (t3 + e4), fill: true };
  }
  if (t2.startsWith("textArch")) {
    const e4 = t2.startsWith("textArchDown"), n3 = t2.endsWith("Pour"), r3 = s4 * 0.4, o5 = Math.max(1, (i4 - s4 * 0.1) * (n3 ? 0.72 : 1)), c5 = Math.max(1, (a3 - r3) * (n3 ? 0.72 : 1));
    return e4 ? Au(i4, a3 - r3, o5, c5, 90 + l3 / 2, 90 - l3 / 2) : Au(i4, a3 + r3, o5, c5, -90 - l3 / 2, -90 + l3 / 2);
  }
  const c4 = t2 === "textWave1" ? 1 : t2 === "textWave2" ? -1 : 0, u4 = o4 === "top" ? s4 * 0.85 : o4 === "bottom" ? r2 - s4 * 0.2 : a3 + s4 * 0.32;
  if (c4) {
    const t3 = r2 * 0.16 * Lu((e3.adj1 ?? 6250) / 6250, 0.25, 3);
    return Pu((e4) => u4 - c4 * t3 * Math.sin(2 * Math.PI * e4), n2);
  }
  const h4 = Iu[t2];
  if (h4 === void 0) return null;
  const f4 = h4 * r2, d4 = Ou.has(t2) ? (t3) => 1 - Math.abs(2 * t3 - 1) : (t3) => Math.sin(Math.PI * t3);
  return Pu((t3) => u4 + f4 / 2 - f4 * d4(t3), n2);
}
function Ru(t2, e3, n2, r2, s4, o4, i4) {
  const a3 = t2.warp;
  if (!a3 || !Bc(a3.preset)) return null;
  const [l3, c4, u4, h4] = s4, f4 = Math.max(1, e3 - h4 - c4), d4 = Math.max(1, n2 - l3 - u4), p4 = t2.fontScale, g4 = t2.paragraphs.filter((t3) => t3.runs.some((t4) => t4.text.trim()));
  if (!g4.length) return null;
  const m4 = d4 / g4.length, x4 = [];
  return g4.forEach((t3, e4) => {
    const n3 = t3.runs.filter((t4) => t4.text);
    if (!n3.length) return;
    const s5 = Math.max(...n3.map((t4) => t4.size), 1) * p4, c5 = zu(a3.preset, a3.adj, f4, m4, s5, g4.length > 1 ? "middle" : o4);
    if (!c5) return;
    const u5 = n3.map((t4) => ({ text: ku(t4.text, t4).replace(/\n/g, " "), run: t4, width: Oc(t4.text, t4, p4, i4) })), d5 = u5.reduce((t4, e5) => t4 + e5.width, 0), b4 = d5 > c5.len ? Math.max(0.25, c5.len / d5) : 1, w4 = d5 * b4, y4 = u5.reduce((t4, e5) => t4 + e5.text.length, 0), $3 = c5.fill && y4 > 1 && w4 > 0 ? (w4 * Lu(c5.len / w4, 1, 2.2) - w4) / y4 : 0, M4 = r2(`<path id="__ID__" fill="none" d="${c5.d}"/>`), v4 = Mu[t3.align], k3 = t3.rtl === true, E3 = v4 === "end" ? "100%" : v4 === "middle" ? "50%" : "0%", T3 = u5.map((t4) => Su(t4, p4 * b4, r2)).join("");
    x4.push(`<g transform="translate(${_l2(h4)} ${_l2(l3 + m4 * e4)})"><text text-anchor="${k3 ? vu(v4) : v4}"` + ($3 > 0.05 ? ` letter-spacing="${_l2($3)}"` : "") + (k3 ? ' direction="rtl" unicode-bidi="embed"' : "") + ` xml:space="preserve"><textPath href="#${M4}" xlink:href="#${M4}" startOffset="${E3}">${T3}</textPath></text></g>`);
  }), x4.length ? x4.join("") : null;
}
var Uu = 1 / 1e5;
var Du = 0.01;
function Nu(t2, e3, n2, r2, s4, o4, i4) {
  const a3 = t2.crop ?? { l: 0, t: 0, r: 0, b: 0 }, l3 = r2 / Math.max(1 - a3.l - a3.r, Uu), c4 = s4 / Math.max(1 - a3.t - a3.b, Uu), u4 = `<image href="${Yl2(t2.src)}" x="${_l2(-a3.l * l3)}" y="${_l2(-a3.t * c4)}" width="${_l2(l3)}" height="${_l2(c4)}" preserveAspectRatio="none"` + (t2.alpha !== void 0 ? ` opacity="${_l2(t2.alpha)}"` : "") + "/>", h4 = o4 || i4 ? `<g transform="translate(${_l2(o4 ? r2 : 0)} ${_l2(i4 ? s4 : 0)}) scale(${o4 ? -1 : 1} ${i4 ? -1 : 1})">${u4}</g>` : u4;
  return `<svg x="${_l2(e3)}" y="${_l2(n2)}" width="${_l2(r2)}" height="${_l2(s4)}" overflow="hidden">${h4}</svg>`;
}
function Bu(t2) {
  switch (t2 ?? "tl") {
    case "t":
      return [0.5, 0];
    case "tr":
      return [1, 0];
    case "l":
      return [0, 0.5];
    case "ctr":
      return [0.5, 0.5];
    case "r":
      return [1, 0.5];
    case "bl":
      return [0, 1];
    case "b":
      return [0.5, 1];
    case "br":
      return [1, 1];
    default:
      return [0, 0];
  }
}
function Fu(t2, e3, n2, r2, s4) {
  const o4 = t2.tile, i4 = t2.crop ?? { l: 0, t: 0, r: 0, b: 0 }, a3 = Math.max(1 - i4.l - i4.r, Uu), l3 = Math.max(1 - i4.t - i4.b, Uu), c4 = o4.sourceWidth ?? r2 * 0.25, u4 = o4.sourceHeight ?? s4 * 0.25, h4 = Math.max(Du, c4 * a3 * o4.sx), f4 = Math.max(Du, u4 * l3 * o4.sy), [d4, p4] = Bu(o4.algn), g4 = (r2 - h4) * d4 + (o4.tx ?? 0), m4 = (s4 - f4) * p4 + (o4.ty ?? 0), x4 = o4.flip === "x" || o4.flip === "xy", b4 = o4.flip === "y" || o4.flip === "xy", w4 = x4 ? 2 : 1, y4 = b4 ? 2 : 1;
  let $3 = "";
  for (let e4 = 0; e4 < y4; e4++) for (let n3 = 0; n3 < w4; n3++) $3 += Nu(t2, n3 * h4, e4 * f4, h4, f4, n3 === 1, e4 === 1);
  e3.defs.push(`<pattern id="${n2}" patternUnits="userSpaceOnUse" x="${_l2(g4)}" y="${_l2(m4)}" width="${_l2(h4 * w4)}" height="${_l2(f4 * y4)}">${$3}</pattern>`);
}
function ju(t2, e3, n2, r2) {
  const s4 = e3.nextId("p");
  if (t2.tile) Fu(t2, e3, s4, n2, r2);
  else if (t2.crop && (t2.crop.l || t2.crop.t || t2.crop.r || t2.crop.b)) {
    const o4 = t2.crop, i4 = n2 / Math.max(1 - o4.l - o4.r, Uu), a3 = r2 / Math.max(1 - o4.t - o4.b, Uu);
    e3.defs.push(`<pattern id="${s4}" patternUnits="userSpaceOnUse" width="${_l2(n2)}" height="${_l2(r2)}"><image href="${Yl2(t2.src)}" x="${_l2(-o4.l * i4)}" y="${_l2(-o4.t * a3)}" width="${_l2(i4)}" height="${_l2(a3)}" preserveAspectRatio="none"` + (t2.alpha !== void 0 ? ` opacity="${_l2(t2.alpha)}"` : "") + "/></pattern>");
  } else e3.defs.push(`<pattern id="${s4}" patternUnits="userSpaceOnUse" width="${_l2(n2)}" height="${_l2(r2)}"><image href="${Yl2(t2.src)}" width="${_l2(n2)}" height="${_l2(r2)}" preserveAspectRatio="none"` + (t2.alpha !== void 0 ? ` opacity="${_l2(t2.alpha)}"` : "") + "/></pattern>");
  return `url(#${s4})`;
}
var Hu = { pct5: "M0 0h1v1H0z", pct10: "M0 0h1v1H0z", pct20: "M0 0h2v2H0z", pct25: "M0 0h2v2H0z", pct30: "M0 0h2v2H0zM2 2h2v2H2z", pct40: "M0 0h2v2H0zM2 2h2v2H2z", pct50: "M0 0h2v2H0zM2 2h2v2H2z", pct60: "M0 0h3v3H0z", pct70: "M0 0h3v3H0z", pct75: "M0 0h3v3H0z", pct80: "M0 0h4v4H0z", pct90: "M0 0h4v4H0z", ltHorz: "M0 2h8v1H0z", horz: "M0 2h8v2H0z", dkHorz: "M0 1h8v3H0z", ltVert: "M2 0h1v8H0z", vert: "M2 0h2v8H2z", dkVert: "M1 0h3v8H1z", ltUpDiag: "M0 8L8 0M-2 2L2 -2M6 10L10 6", upDiag: "M0 8L8 0M-2 2L2 -2M6 10L10 6", ltDnDiag: "M0 0L8 8M-2 6L2 10M6 -2L10 2", dnDiag: "M0 0L8 8M-2 6L2 10M6 -2L10 2", smGrid: "M0 0h8v1H0zM0 0h1v8H0z", lgGrid: "M0 0h8v1H0zM0 0h1v8H0z", cross: "M0 3h8v2H0zM3 0h2v8H3z", diagCross: "M0 0L8 8M8 0L0 8", trellis: "M0 0L8 8M8 0L0 8", wave: "M0 4Q2 2 4 4T8 4" };
var Vu = { pct5: 8, pct10: 6, pct20: 5, pct25: 4, pct30: 4, pct40: 4, pct50: 4, pct60: 4, pct70: 4, pct75: 4, pct80: 5, pct90: 5 };
function Wu(t2, e3, n2, r2) {
  switch (t2.type) {
    case "none":
      return "none";
    case "solid":
      return t2.color;
    case "gradient": {
      const n3 = e3.nextId("g"), r3 = t2.stops.map((t3) => `<stop offset="${_l2(Math.max(0, Math.min(1, t3.pos)) * 100)}%" stop-color="${t3.color}"/>`).join("");
      if (t2.radial) e3.defs.push(`<radialGradient id="${n3}" cx="50%" cy="50%" r="70%">${r3}</radialGradient>`);
      else {
        const s4 = t2.angle * Math.PI / 180, o4 = Math.cos(s4) / 2, i4 = Math.sin(s4) / 2;
        e3.defs.push(`<linearGradient id="${n3}" x1="${_l2(0.5 - o4)}" y1="${_l2(0.5 - i4)}" x2="${_l2(0.5 + o4)}" y2="${_l2(0.5 + i4)}">${r3}</linearGradient>`);
      }
      return `url(#${n3})`;
    }
    case "image":
      return ju(t2, e3, n2, r2);
    case "pattern": {
      const n3 = e3.nextId("pt"), r3 = Vu[t2.preset] ?? 8, s4 = Hu[t2.preset] ?? Hu.pct50, o4 = /^[MLQT].*[ML]/.test(s4) && !s4.includes("h") && !s4.includes("v");
      return e3.defs.push(`<pattern id="${n3}" patternUnits="userSpaceOnUse" width="${r3}" height="${r3}"><rect width="${r3}" height="${r3}" fill="${t2.bg}"/><path d="${s4}" ${o4 ? `stroke="${t2.fg}" stroke-width="1" fill="none"` : `fill="${t2.fg}"`}/></pattern>`), `url(#${n3})`;
    }
  }
}
function Xu(t2, e3) {
  if (!t2) return "";
  const n2 = [];
  let r2 = "SourceGraphic", s4 = 0;
  const o4 = (t3) => {
    const e4 = `e${++s4}`;
    n2.push(t3.replace(/__IN__/g, r2).replace(/__OUT__/g, e4)), r2 = e4;
  };
  t2.glow && o4(`<feDropShadow in="__IN__" dx="0" dy="0" stdDeviation="${_l2(t2.glow.radius / 2)}" flood-color="${t2.glow.color}" flood-opacity="1" result="__OUT__"/>`);
  const i4 = t2.shadow;
  if (i4 && !i4.inner && o4(`<feDropShadow in="__IN__" dx="${_l2(i4.dx)}" dy="${_l2(i4.dy)}" stdDeviation="${_l2(i4.blur / 2)}" flood-color="${i4.color}" result="__OUT__"/>`), i4 != null && i4.inner) {
    const t3 = `is${s4}`;
    n2.push(`<feComponentTransfer in="SourceAlpha" result="${t3}a"><feFuncA type="table" tableValues="1 0"/></feComponentTransfer><feGaussianBlur in="${t3}a" stdDeviation="${_l2(i4.blur / 2)}" result="${t3}b"/><feOffset in="${t3}b" dx="${_l2(i4.dx)}" dy="${_l2(i4.dy)}" result="${t3}c"/><feComposite in="${t3}c" in2="SourceAlpha" operator="in" result="${t3}d"/><feFlood flood-color="${i4.color}" result="${t3}e"/><feComposite in="${t3}e" in2="${t3}d" operator="in" result="${t3}f"/>`), o4(`<feComposite in="${t3}f" in2="__IN__" operator="over" result="__OUT__"/>`);
  }
  if (t2.softEdge && (n2.push(`<feGaussianBlur in="SourceAlpha" stdDeviation="${_l2(t2.softEdge / 2)}" result="se"/><feComponentTransfer in="se" result="seMask"><feFuncA type="linear" slope="2.2" intercept="-0.6"/></feComponentTransfer>`), o4('<feComposite in="__IN__" in2="seMask" operator="in" result="__OUT__"/>')), !n2.length) return "";
  const a3 = e3.nextId("f");
  return e3.defs.push(`<filter id="${a3}" x="-30%" y="-30%" width="160%" height="160%">${n2.join("")}</filter>`), ` filter="url(#${a3})"`;
}
function Yu(t2, e3, n2) {
  var r2;
  const s4 = (r2 = t2.effects) == null ? void 0 : r2.reflection;
  if (!s4) return "";
  const o4 = Math.max(0, Math.min(1, s4.alpha));
  if (o4 <= 0 || t2.h <= 0) return "";
  const i4 = Math.max(0, s4.distance), a3 = t2.h + i4, l3 = Math.max(1, t2.h * Math.max(0.02, Math.min(1, s4.size))), c4 = -t2.w * 0.25, u4 = t2.w * 1.5, h4 = n2.nextId("rg"), f4 = n2.nextId("rm");
  return n2.defs.push(`<linearGradient id="${h4}" gradientUnits="userSpaceOnUse" x1="0" y1="${_l2(a3)}" x2="0" y2="${_l2(a3 + l3)}"><stop offset="0" stop-color="#fff" stop-opacity="${_l2(o4)}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`), n2.defs.push(`<mask id="${f4}" maskUnits="userSpaceOnUse" x="${_l2(c4)}" y="${_l2(a3)}" width="${_l2(u4)}" height="${_l2(l3)}"><rect x="${_l2(c4)}" y="${_l2(a3)}" width="${_l2(u4)}" height="${_l2(l3)}" fill="url(#${h4})"/></mask>`), `<g mask="url(#${f4})" aria-hidden="true"><use href="#${e3}" xlink:href="#${e3}" transform="translate(0 ${_l2(2 * t2.h + i4)}) scale(1 -1)"/></g>`;
}
var _u;
function qu(t2) {
  const e3 = t2.match(/rgba?\(([^)]+)\)/);
  if (e3) {
    const t3 = e3[1].split(",").map(Number);
    return [t3[0] || 0, t3[1] || 0, t3[2] || 0];
  }
  const n2 = t2.replace("#", "");
  return n2.length >= 6 ? [parseInt(n2.slice(0, 2), 16), parseInt(n2.slice(2, 4), 16), parseInt(n2.slice(4, 6), 16)] : [128, 128, 128];
}
function Zu(t2, e3, n2) {
  const r2 = qu(t2), s4 = qu(e3);
  return `rgb(${r2.map((t3, e4) => Math.round(t3 * (1 - n2) + s4[e4] * n2)).join(",")})`;
}
function Ku(t2, e3, n2) {
  const r2 = Math.min(e3.extrusion ?? 0, Math.max(t2.w, t2.h));
  if (r2 <= 0.5) return "";
  const s4 = ((e3.rotY ?? 0) || 35) * Math.PI / 180, o4 = Math.cos(s4) * r2, i4 = Math.sin(((e3.rotX ?? 0) || 20) * Math.PI / 180) * r2, a3 = e3.extrusionColor ?? Zu(n2, "#000", 0.32), l3 = Math.max(2, Math.min(14, Math.round(r2))), c4 = [];
  for (let e4 = l3; e4 >= 1; e4--) {
    const n3 = e4 / l3;
    c4.push(`<g transform="translate(${_l2(o4 * n3)} ${_l2(i4 * n3)})"><path d="${t2.path}" fill="${a3}" fill-rule="nonzero"/></g>`);
  }
  return c4.join("");
}
function Ju(t2, e3, n2, r2) {
  const s4 = e3.bevelTop ?? 0;
  if (s4 <= 0.3 || !t2.path) return "";
  const o4 = Zu(n2, "#fff", 0.5), i4 = Zu(n2, "#000", 0.25), a3 = Math.min(s4 * 2, Math.min(t2.w, t2.h) / 3), l3 = r2.nextId("bv");
  return r2.defs.push(`<clipPath id="${l3}"><path d="${t2.path}"/></clipPath>`), `<g clip-path="url(#${l3})"><path d="${t2.path}" fill="none" stroke="${o4}" stroke-width="${_l2(a3)}" stroke-linejoin="round" opacity="0.55"/><path d="${t2.path}" fill="none" stroke="${i4}" stroke-width="${_l2(a3 / 3)}" stroke-linejoin="round" opacity="0.35" transform="translate(0 ${_l2(a3 / 3)})"/></g>`;
}
function Qu(t2, e3) {
  const [n2, r2] = t2.map(qu), s4 = n2.flatMap((t3, e4) => [...[0.213, 0.715, 0.072].map((n3) => n3 * (r2[e4] - t3) / 255), 0, t3 / 255]);
  return `<filter id="${e3}" color-interpolation-filters="sRGB"><feColorMatrix values="${s4.join(" ")} 0 0 0 1 0"/></filter>`;
}
var th = { m: ["x", "y"], l: ["x", "y"], t: ["x", "y"], h: ["x"], v: ["y"], c: ["x", "y", "x", "y", "x", "y"], s: ["x", "y", "x", "y"], q: ["x", "y", "x", "y"], a: ["rx", "ry", "angle", "flag", "flag", "x", "y"], z: [] };
var eh = (t2) => t2 === " " || t2 === "	" || t2 === `
` || t2 === "\r" || t2 === "\f";
var nh = (t2) => t2 >= "0" && t2 <= "9";
function rh(t2) {
  const e3 = [];
  let n2 = 0;
  const r2 = (e4) => new Error(`\u8DEF\u5F84\u6570\u636E\u65E0\u6548\uFF1A\u4F4D\u7F6E ${n2} \u671F\u671B${e4}\uFF0C\u5B9E\u9645\u4E3A\u300C${t2.slice(n2, n2 + 12)}\u300D\uFF08${t2.slice(0, 60)}\uFF09`), s4 = () => {
    for (; n2 < t2.length && eh(t2[n2]); ) n2++;
    if (t2[n2] === ",") for (n2++; n2 < t2.length && eh(t2[n2]); ) n2++;
  }, o4 = () => {
    const e4 = n2;
    (t2[n2] === "+" || t2[n2] === "-") && n2++;
    let s5 = 0;
    for (; nh(t2[n2]); ) n2++, s5++;
    if (t2[n2] === ".") for (n2++; nh(t2[n2]); ) n2++, s5++;
    if (!s5) throw n2 = e4, r2("\u6570\u503C");
    if (t2[n2] === "e" || t2[n2] === "E") {
      const e5 = n2;
      if (n2++, (t2[n2] === "+" || t2[n2] === "-") && n2++, !nh(t2[n2])) throw n2 = e5, r2("\u6307\u6570");
      for (; nh(t2[n2]); ) n2++;
    }
    return Number(t2.slice(e4, n2));
  }, i4 = () => {
    if (t2[n2] !== "0" && t2[n2] !== "1") throw r2("\u5F27\u7EBF\u6807\u5FD7 0 \u6216 1");
    return Number(t2[n2++]);
  };
  for (; n2 < t2.length && eh(t2[n2]); ) n2++;
  for (; n2 < t2.length; ) {
    const a3 = t2[n2], l3 = th[a3.toLowerCase()];
    if (!l3) throw r2("\u8DEF\u5F84\u547D\u4EE4");
    if (!e3.length && a3.toLowerCase() !== "m") throw r2("\u4EE5 M/m \u5F00\u5934");
    if (n2++, s4(), !l3.length) {
      e3.push({ command: a3, values: [] });
      continue;
    }
    let c4 = a3;
    do {
      const t3 = l3.map((t4, e4) => (e4 && s4(), t4 === "flag" ? i4() : o4()));
      e3.push({ command: c4, values: t3 }), c4 === "M" ? c4 = "L" : c4 === "m" && (c4 = "l"), s4();
    } while (n2 < t2.length && !th[t2[n2].toLowerCase()]);
  }
  return e3;
}
function sh(t2, e3, n2, r2, s4) {
  t2 = Math.abs(t2), e3 = Math.abs(e3);
  const o4 = n2 * Math.PI / 180, i4 = Math.cos(o4), a3 = Math.sin(o4);
  if (r2 === s4 || a3 === 0 || i4 === 0) {
    const o5 = i4 === 0 && a3 !== 0;
    return [t2 * (o5 ? s4 : r2), e3 * (o5 ? r2 : s4), n2];
  }
  const l3 = (t2 * t2 * i4 * i4 + e3 * e3 * a3 * a3) * r2 * r2, c4 = (t2 * t2 - e3 * e3) * i4 * a3 * r2 * s4, u4 = (t2 * t2 * a3 * a3 + e3 * e3 * i4 * i4) * s4 * s4, h4 = (l3 + u4) / 2, f4 = Math.hypot((l3 - u4) / 2, c4);
  return [Math.sqrt(h4 + f4), Math.sqrt(Math.max(0, h4 - f4)), Math.atan2(2 * c4, l3 - u4) / 2 * 180 / Math.PI];
}
function oh(t2, e3, n2) {
  if (!(Number.isFinite(e3) && e3 > 0 && Number.isFinite(n2) && n2 > 0)) throw new Error(`\u8DEF\u5F84\u7F29\u653E\u6BD4\u4F8B\u5FC5\u987B\u662F\u6B63\u6709\u9650\u6570\uFF1Akx=${e3}\uFF0Cky=${n2}`);
  return rh(t2).map(({ command: t3, values: r2 }) => {
    const s4 = th[t3.toLowerCase()];
    if (s4.includes("rx")) {
      const [t4, s5, o4] = sh(r2[0], r2[1], r2[2], e3, n2);
      r2 = [t4, s5, o4, r2[3], r2[4], r2[5] * e3, r2[6] * n2];
    } else r2 = r2.map((t4, r3) => t4 * (s4[r3] === "y" ? n2 : e3));
    return r2.length ? `${t3} ${r2.map(_l2).join(" ")}` : t3;
  }).join(" ");
}
function ih(t2) {
  const e3 = (t2 % 360 + 360) % 360;
  return e3 >= 45 && e3 < 135 || e3 >= 225 && e3 < 315;
}
function ah(t2, e3, n2) {
  const r2 = t2 || 1;
  if (!Number.isFinite(r2) || r2 <= 0) throw new Error(`\u7EC4\u5408 ${n2.name ?? n2.id ?? ""} \u7684 ${e3} \u7F29\u653E\u65E0\u6548\uFF1A${t2}`);
  return r2;
}
function lh(t2, e3) {
  const n2 = ah(t2.scaleX, "scaleX", t2), r2 = ah(t2.scaleY, "scaleY", t2), s4 = ih(e3.rot), o4 = s4 ? r2 : n2, i4 = s4 ? n2 : r2, a3 = e3.w * o4, l3 = e3.h * i4;
  return { x: (e3.x + e3.w / 2 - t2.childX) * n2 - a3 / 2, y: (e3.y + e3.h / 2 - t2.childY) * r2 - l3 / 2, w: a3, h: l3, kx: o4, ky: i4 };
}
function uh(t2, e3) {
  const { kx: n2, ky: r2, ...s4 } = lh(t2, e3);
  if (n2 === 1 && r2 === 1) return { ...e3, ...s4 };
  switch (e3.kind) {
    case "shape":
      return { ...e3, ...s4, path: e3.path && oh(e3.path, n2, r2) };
    case "image":
      return { ...e3, ...s4, ...e3.clipPath ? { clipPath: oh(e3.clipPath, n2, r2) } : {} };
    case "group":
      return { ...e3, ...s4, scaleX: (e3.scaleX || 1) * n2, scaleY: (e3.scaleY || 1) * r2 };
    case "table":
      return { ...e3, ...s4, colWidths: e3.colWidths.map((t3) => t3 * n2), rows: e3.rows.map((t3) => ({ ...t3, height: t3.height * r2 })) };
    case "unsupported":
      return { ...e3, ...s4 };
  }
}
var hh = 0;
var fh = (t2) => `${t2}${++hh}`;
function dh(t2) {
  return t2.replace(/^[0-9-]|[^A-Za-z0-9-]/gu, (t3) => `_u${t3.codePointAt(0).toString(16)}_`);
}
var ph = 1 / 1e5;
function gh(t2) {
  const e3 = t2.textMode ?? "html";
  let n2 = 0;
  const r2 = t2.idPrefix === void 0 ? null : dh(t2.idPrefix);
  return { defs: [], nextId: r2 === null ? fh : (t3) => `${r2}${t3}${++n2}`, textMode: e3, measureText: t2.measureText, media: t2.media === "player" && e3 === "html" ? "player" : "badge", hidden: t2.hiddenElements && t2.hiddenElements.length ? new Set(t2.hiddenElements) : null, includeEditMarkers: t2.includeEditMarkers === true, resolveLink: (t3) => t3 };
}
function mh(t2, e3) {
  const n2 = t2.slides.indexOf(e3) + 1;
  return (e4) => {
    if (!e4) return e4;
    if (e4.startsWith("slide-part:")) try {
      const n3 = decodeURIComponent(e4.slice(11)), r2 = t2.slides.findIndex((t3) => t3.editInfo && t3.editInfo.origin.part === n3);
      return r2 < 0 ? e4 : `slide:${r2 + 1}`;
    } catch {
      return e4;
    }
    return e4.startsWith("slide:") ? e4 === "slide:next" ? `slide:${n2 + 1}` : e4 === "slide:previous" ? `slide:${n2 - 1}` : e4 === "slide:first" ? "slide:1" : e4 === "slide:last" ? `slide:${t2.slides.length}` : e4 : e4;
  };
}
function bh(t2, e3, n2 = {}) {
  const r2 = gh(n2);
  r2.resolveLink = mh(t2, e3);
  let s4 = "#fff";
  try {
    e3.background && (s4 = Wu(e3.background, r2, t2.width, t2.height));
  } catch {
  }
  const o4 = `<rect width="${_l2(t2.width)}" height="${_l2(t2.height)}" fill="${s4}"/>`, i4 = e3.elements.map((t3) => Th(t3, r2)).join("") + (n2.showComments ? Dh(e3.comments, t2.width, t2.height) : ""), a3 = (t2.embeddedFonts ?? []).map((t3) => `@font-face{font-family:'${Gl2(t3.family)}';src:url('${Gl2(t3.src)}');font-weight:${t3.bold ? 700 : 400};font-style:${t3.italic ? "italic" : "normal"};}`).join("") + (i4.includes(xc) ? Mc() : ""), l3 = a3 ? `<style>${a3}</style>` : "", c4 = n2.includeNotes && e3.notes ? `<desc>${Yl2(e3.notes)}</desc>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${_l2(t2.width)} ${_l2(t2.height)}" font-family="Helvetica, Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif">` + c4 + `<defs>${l3}${r2.defs.join("")}</defs>` + o4 + i4 + "</svg>";
}
function wh(t2, e3, n2) {
  const r2 = Xu(t2.effects, n2);
  if (!t2.effects || !t2.effects.reflection) return `<g transform="${vh(t2)}"${r2}>${e3}</g>`;
  const s4 = n2.nextId("rc"), o4 = `<g id="${s4}">${e3}</g>`;
  return `<g transform="${vh(t2)}">` + Yu(t2, s4, n2) + (r2 ? `<g${r2}>${o4}</g>` : o4) + "</g>";
}
var yh = { none: { d: "", fill: false }, triangle: { d: "M0 0 L10 5 L0 10 z", fill: true }, stealth: { d: "M0 0 L10 5 L0 10 L3 5 z", fill: true }, diamond: { d: "M0 5 L5 0 L10 5 L5 10 z", fill: true }, oval: { d: "M0 5 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0", fill: true }, arrow: { d: "M0 0 L10 5 L0 10", fill: false } };
function $h(t2, e3, n2, r2) {
  const s4 = yh[t2.type];
  if (!s4.d) return "";
  const o4 = n2.nextId("m"), i4 = Math.max(1, t2.h), a3 = Math.max(1, t2.w);
  return n2.defs.push(`<marker id="${o4}" viewBox="0 0 10 10" refX="${r2 ? 0 : 10}" refY="5" markerWidth="${_l2(i4)}" markerHeight="${_l2(a3)}" markerUnits="strokeWidth" orient="${r2 ? "auto-start-reverse" : "auto"}"><path d="${s4.d}" ${s4.fill ? `fill="${e3}"` : `fill="none" stroke="${e3}" stroke-width="1.6"`}/></marker>`), `url(#${o4})`;
}
function Mh(t2, e3) {
  if (!t2) return "";
  let n2 = ` stroke="${t2.color}" stroke-width="${_l2(t2.width)}"`;
  if (t2.dash && (n2 += ` stroke-dasharray="${t2.dash.map(_l2).join(" ")}"`), t2.cap && (n2 += ` stroke-linecap="${t2.cap}"`), t2.join && (n2 += ` stroke-linejoin="${t2.join}"`), t2.head) {
    const r2 = $h(t2.head, t2.color, e3, true);
    r2 && (n2 += ` marker-start="${r2}"`);
  }
  if (t2.tail) {
    const r2 = $h(t2.tail, t2.color, e3, false);
    r2 && (n2 += ` marker-end="${r2}"`);
  }
  return n2;
}
function vh(t2) {
  return `${t2.rot ? `rotate(${_l2(t2.rot)} ${_l2(t2.x + t2.w / 2)} ${_l2(t2.y + t2.h / 2)}) ` : ""}translate(${_l2(t2.x)} ${_l2(t2.y)})`;
}
function kh(t2) {
  return !t2.flipH && !t2.flipV ? "" : `translate(${_l2(t2.w / 2)} ${_l2(t2.h / 2)}) scale(${t2.flipH ? -1 : 1} ${t2.flipV ? -1 : 1}) translate(${_l2(-t2.w / 2)} ${_l2(-t2.h / 2)})`;
}
function Eh(t2, e3) {
  try {
    const n2 = e3 instanceof Error ? e3.message : String(e3), r2 = t2.name ? `${t2.kind} \xB7 ${t2.name}` : t2.kind;
    return `<g transform="${vh(t2)}" data-render-error="1"><title>${Yl2(r2)} \u6E32\u67D3\u5931\u8D25\uFF1A${Yl2(n2.slice(0, 200))}</title><rect width="${_l2(t2.w)}" height="${_l2(t2.h)}" fill="rgba(220,38,38,0.06)" stroke="#dc2626" stroke-width="1" stroke-dasharray="5 4"/></g>`;
  } catch {
    return "";
  }
}
function Th(t2, e3, n2) {
  var r2;
  let s4;
  try {
    const r3 = n2 ? uh(n2, t2) : t2;
    switch (r3.kind) {
      case "shape":
        s4 = Ch(r3, e3);
        break;
      case "image":
        s4 = Ih(r3, e3);
        break;
      case "group":
        s4 = Oh(r3, e3);
        break;
      case "table":
        s4 = Uh(r3, e3);
        break;
      case "unsupported":
        s4 = Nh(r3);
        break;
    }
  } catch (e4) {
    s4 = Eh(n2 ? { ...t2, ...lh(n2, t2) } : t2, e4);
  }
  if (e3.includeEditMarkers !== null && (t2.id !== void 0 || e3.includeEditMarkers)) {
    const n3 = t2.id !== void 0 && ((r2 = e3.hidden) != null && r2.has(t2.id)) ? "visibility:hidden;" : "";
    s4 = `<g data-el="${t2.id ?? ""}" style="${n3}transform-box:fill-box;transform-origin:center">${s4}</g>`;
  }
  return lu(s4, e3.resolveLink(t2.link));
}
function Ch(t2, e3) {
  var n2, r2;
  let s4 = "", o4;
  const i4 = t2.scene3d;
  if (t2.path) {
    const a3 = t2.openGeom ? "none" : t2.fill ? Wu(t2.fill, e3, t2.w, t2.h) : "none", l3 = ((n2 = t2.fill) == null ? void 0 : n2.type) === "solid" ? t2.fill.color : ((r2 = t2.fill) == null ? void 0 : r2.type) === "gradient" && t2.fill.stops.length ? t2.fill.stops[0].color : "rgb(128,128,128)";
    i4 && !_u && (s4 += Ku(t2, i4, l3));
    const c4 = i4 != null && i4.contourWidth ? ` stroke="${i4.contourColor ?? Zu(l3, "#000", 0.45)}" stroke-width="${_l2(i4.contourWidth)}"` : Mh(t2.stroke, e3);
    o4 = `<path d="${t2.path}" fill="${a3}" fill-rule="nonzero"${c4}/>`;
    const u4 = kh(t2);
    s4 += u4 ? `<g transform="${u4}">${o4}</g>` : o4, i4 && !_u && (s4 += Ju(t2, i4, l3, e3));
  }
  return t2.text && (s4 += Bh(t2.text, t2.w, t2.h, i4 && _u ? { ...e3, textMode: "svg" } : e3)), i4 && _u && (s4 = _u(t2, s4, e3, o4)), wh(t2, s4, e3);
}
function Sh(t2, e3) {
  const n2 = Math.max(6, Math.min(Math.min(t2.w, t2.h) * 0.22, 34)), r2 = t2.w / 2, s4 = t2.h / 2, o4 = `<circle cx="${_l2(r2)}" cy="${_l2(s4)}" r="${_l2(n2)}" fill="rgba(17,17,17,0.55)" stroke="rgba(255,255,255,0.92)" stroke-width="${_l2(Math.max(1, n2 * 0.09))}"/>`;
  let i4;
  if (e3.kind === "audio") {
    const t3 = n2 * 0.42, e4 = r2 - t3 * 1.15;
    i4 = `<path d="M${_l2(e4)} ${_l2(s4 - t3 * 0.42)} H${_l2(e4 + t3 * 0.62)} L${_l2(e4 + t3 * 1.5)} ${_l2(s4 - t3)} V${_l2(s4 + t3)} L${_l2(e4 + t3 * 0.62)} ${_l2(s4 + t3 * 0.42)} H${_l2(e4)} Z" fill="#fff"/><path d="M${_l2(r2 + t3 * 0.65)} ${_l2(s4 - t3 * 0.6)} A ${_l2(t3 * 0.75)} ${_l2(t3 * 0.75)} 0 0 1 ${_l2(r2 + t3 * 0.65)} ${_l2(s4 + t3 * 0.6)}" fill="none" stroke="#fff" stroke-width="${_l2(Math.max(1, t3 * 0.26))}" stroke-linecap="round"/><path d="M${_l2(r2 + t3 * 1.15)} ${_l2(s4 - t3 * 1.05)} A ${_l2(t3 * 1.35)} ${_l2(t3 * 1.35)} 0 0 1 ${_l2(r2 + t3 * 1.15)} ${_l2(s4 + t3 * 1.05)}" fill="none" stroke="#fff" stroke-width="${_l2(Math.max(1, t3 * 0.26))}" stroke-linecap="round" opacity="0.85"/>`;
  } else {
    const t3 = n2 * 0.46;
    i4 = `<path d="M${_l2(r2 - t3 * 0.62)} ${_l2(s4 - t3)} L${_l2(r2 + t3)} ${_l2(s4)} L${_l2(r2 - t3 * 0.62)} ${_l2(s4 + t3)} Z" fill="#fff"/>`;
  }
  return `<g aria-hidden="true" pointer-events="none">${Lh(e3)}${o4}${i4}</g>`;
}
function Lh(t2) {
  const e3 = t2.kind === "audio" ? "\u97F3\u9891" : "\u89C6\u9891", n2 = t2.src ? t2.external ? `${e3}\uFF08\u5916\u94FE\uFF09` : e3 : `${e3}\uFF08\u6E90\u4E0D\u53EF\u7528\uFF09`;
  return `<title>${Yl2(n2)}</title>`;
}
function Ah(t2, e3) {
  return `<foreignObject x="0" y="0" width="${_l2(t2.w)}" height="${_l2(t2.h)}"><div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%"><video controls preload="metadata" src="${Yl2(e3.src ?? "")}"` + (t2.src ? ` poster="${Yl2(t2.src)}"` : "") + ' style="width:100%;height:100%;display:block;object-fit:contain;background:#000"></video></div></foreignObject>';
}
function Ph(t2, e3) {
  return `<g data-media-toggle="" style="cursor:pointer">${t2}<foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml"><audio preload="none" src="${Yl2(e3.src ?? "")}"></audio></div></foreignObject></g>`;
}
function Ih(t2, e3) {
  let n2 = t2.filter ?? "";
  if (t2.duotone) {
    const r3 = e3.nextId("dt");
    e3.defs.push(Qu(t2.duotone, r3)), n2 = `${n2} url(#${r3})`.trim();
  }
  const r2 = (t2.alpha !== void 0 && t2.alpha < 1 ? ` opacity="${_l2(t2.alpha)}"` : "") + (n2 ? ` style="filter:${Yl2(n2)}"` : "");
  let s4;
  if (!t2.src) s4 = `<rect width="${_l2(t2.w)}" height="${_l2(t2.h)}" fill="rgb(38,42,48)"/>`;
  else if (t2.crop && (t2.crop.l || t2.crop.t || t2.crop.r || t2.crop.b)) {
    const n3 = t2.w / Math.max(1 - t2.crop.l - t2.crop.r, ph), o5 = t2.h / Math.max(1 - t2.crop.t - t2.crop.b, ph), i4 = e3.nextId("c");
    e3.defs.push(`<clipPath id="${i4}"><rect width="${_l2(t2.w)}" height="${_l2(t2.h)}"/></clipPath>`), s4 = `<g clip-path="url(#${i4})"><image href="${Yl2(t2.src)}" x="${_l2(-t2.crop.l * n3)}" y="${_l2(-t2.crop.t * o5)}" width="${_l2(n3)}" height="${_l2(o5)}" preserveAspectRatio="none"${r2}/></g>`;
  } else s4 = `<image href="${Yl2(t2.src)}" width="${_l2(t2.w)}" height="${_l2(t2.h)}" preserveAspectRatio="none"${r2}/>`;
  if (t2.clipPath) {
    const n3 = e3.nextId("cs");
    e3.defs.push(`<clipPath id="${n3}"><path d="${t2.clipPath}"/></clipPath>`), s4 = `<g clip-path="url(#${n3})">${s4}</g>`;
  }
  t2.stroke && (s4 += `<path d="${t2.clipPath ?? `M0 0 H${_l2(t2.w)} V${_l2(t2.h)} H0 Z`}" fill="none"${Mh(t2.stroke, e3)}/>`);
  const o4 = kh(t2);
  if (o4 && (s4 = `<g transform="${o4}">${s4}</g>`), t2.media) {
    const n3 = e3.media === "player" && !!t2.media.src;
    n3 && t2.media.kind === "video" ? s4 += Ah(t2, t2.media) : (s4 = t2.media.kind === "video" || !t2.src || !t2.media.src ? s4 + Sh(t2, t2.media) : Lh(t2.media) + s4, n3 && (s4 = Ph(s4, t2.media)));
  }
  return wh(t2, s4, e3);
}
function Oh(t2, e3) {
  const n2 = e3.includeEditMarkers && t2.editInfo && t2.editInfo.editable === "frame" ? { ...e3, includeEditMarkers: null } : e3, r2 = t2.children.map((e4) => Th(e4, n2, t2)).join(""), s4 = e3.includeEditMarkers ? ' data-edit-group-children="1"' : "", o4 = kh(t2);
  return wh(t2, `<g${s4}${o4 ? ` transform="${o4}"` : ""}>${r2}</g>`, e3);
}
var zh = { color: "rgba(0,0,0,0.25)", width: 1, dash: null };
function Rh(t2, e3, n2, r2, s4, o4) {
  if (t2 === null) return "";
  const i4 = t2 ?? zh;
  return `<line x1="${_l2(e3)}" y1="${_l2(n2)}" x2="${_l2(r2)}" y2="${_l2(s4)}"${Mh(i4, o4)}/>`;
}
function Uh(t2, e3) {
  const n2 = [], r2 = [];
  let s4 = 0;
  t2.rows.forEach((o5, i4) => {
    let a3 = 0;
    o5.cells.forEach((l3, c4) => {
      const u4 = t2.colWidths.slice(c4, c4 + l3.colSpan).reduce((t3, e4) => t3 + e4, 0) || t2.colWidths[c4] || 0;
      if (l3.merged) {
        a3 += t2.colWidths[c4] ?? 0;
        return;
      }
      const h4 = t2.rows.slice(i4, i4 + l3.rowSpan).reduce((t3, e4) => t3 + e4.height, 0) || o5.height, f4 = l3.fill ? Wu(l3.fill, e3, u4, h4) : "none", d4 = l3.borders ?? {};
      n2.push(`<g${e3.includeEditMarkers ? ` data-table-cell="${i4}:${c4}"` : ""} transform="translate(${_l2(a3)} ${_l2(s4)})"><rect width="${_l2(u4)}" height="${_l2(h4)}" fill="${f4}"${e3.includeEditMarkers ? ' pointer-events="visibleFill"' : ""}/>` + (l3.text ? Bh(l3.text, u4, h4, e3, l3.margins, l3.vAlign, l3.vert) : "") + "</g>"), r2.push(`<g transform="translate(${_l2(a3)} ${_l2(s4)})">` + Rh(d4.t, 0, 0, u4, 0, e3) + Rh(d4.b, 0, h4, u4, h4, e3) + Rh(d4.l, 0, 0, 0, h4, e3) + Rh(d4.r, u4, 0, u4, h4, e3) + "</g>"), a3 += t2.colWidths[c4] ?? 0;
    }), s4 += o5.height;
  });
  const o4 = n2.join("") + r2.join("");
  return wh(t2, t2.flipH || t2.flipV ? `<g transform="${kh(t2)}">${o4}</g>` : o4, e3);
}
function Dh(t2, e3, n2) {
  if (!(t2 != null && t2.length)) return "";
  const r2 = Math.max(14, Math.min(e3, n2) * 0.036), s4 = [];
  return t2.forEach((t3, o4) => {
    const i4 = Math.max(0, Math.min(Number.isFinite(t3.x) ? t3.x : 0, e3 - r2)), a3 = Math.max(0, Math.min(Number.isFinite(t3.y) ? t3.y : 0, n2 - r2)), l3 = String(t3.idx ?? o4 + 1), c4 = [t3.author, t3.date, t3.text].filter(Boolean).join(" \xB7 ");
    s4.push(`<g class="ppt-comment" data-comment="${Yl2(l3)}" transform="translate(${_l2(i4)} ${_l2(a3)})"><title>${Yl2(c4)}</title><path d="M${_l2(r2 * 0.16)} 0 H${_l2(r2 * 0.84)} A ${_l2(r2 * 0.16)} ${_l2(r2 * 0.16)} 0 0 1 ${_l2(r2)} ${_l2(r2 * 0.16)} V${_l2(r2 * 0.62)} A ${_l2(r2 * 0.16)} ${_l2(r2 * 0.16)} 0 0 1 ${_l2(r2 * 0.84)} ${_l2(r2 * 0.78)} H${_l2(r2 * 0.42)} L${_l2(r2 * 0.16)} ${_l2(r2)} V${_l2(r2 * 0.78)} A ${_l2(r2 * 0.16)} ${_l2(r2 * 0.16)} 0 0 1 0 ${_l2(r2 * 0.62)} V${_l2(r2 * 0.16)} A ${_l2(r2 * 0.16)} ${_l2(r2 * 0.16)} 0 0 1 ${_l2(r2 * 0.16)} 0 Z" fill="rgb(255,196,60)" stroke="rgba(120,80,0,0.55)" stroke-width="${_l2(Math.max(0.6, r2 * 0.045))}"/><text x="${_l2(r2 * 0.5)}" y="${_l2(r2 * 0.42)}" text-anchor="middle" dominant-baseline="central" fill="rgb(60,40,0)" font-size="${_l2(r2 * 0.52)}" font-weight="700">${Yl2(l3)}</text></g>`);
  }), s4.join("");
}
function Nh(t2) {
  const e3 = Math.max(10, Math.min(16, t2.h / 6)), n2 = t2.preview ? `<image href="${Yl2(t2.preview)}" width="${_l2(t2.w)}" height="${_l2(t2.h)}" preserveAspectRatio="none"/>` : "";
  return `<g transform="${vh(t2)}">` + n2 + `<rect width="${_l2(t2.w)}" height="${_l2(t2.h)}" fill="rgba(127,127,127,0.07)" stroke="#aaa" stroke-dasharray="6 4"/><text x="${_l2(t2.w / 2)}" y="${_l2(t2.h / 2)}" text-anchor="middle" dominant-baseline="middle" fill="#888" font-size="${_l2(e3)}">${Yl2(t2.label)}</text></g>`;
}
function Bh(t2, e3, n2, r2, s4, o4, i4) {
  var a3;
  if (t2.paragraphs.some((t3) => t3.runs.some((t4) => {
    var e4;
    return ((e4 = t4.link) == null ? void 0 : e4.startsWith("slide-part:")) || /^slide:(next|previous|first|last)$/.test(t4.link ?? "");
  })) && (t2 = { ...t2, paragraphs: t2.paragraphs.map((t3) => ({ ...t3, runs: t3.runs.map((t4) => {
    const e4 = r2.resolveLink(t4.link);
    return e4 === t4.link ? t4 : { ...t4, link: e4 };
  }) })) }), r2.textMode === "svg" || Bc((a3 = t2.warp) == null ? void 0 : a3.preset)) {
    if (t2.autoFitCompute && !t2.autoFitShape) {
      const o5 = ru(t2, e3, n2, r2.measureText, { insets: s4, vert: i4 });
      o5 !== t2.fontScale && (t2 = { ...t2, fontScale: o5 });
    }
    const a4 = (t3) => {
      const e4 = r2.nextId("tg");
      return r2.defs.push(t3.replace("__ID__", e4)), e4;
    };
    return Eu(i4 && i4 !== t2.vert ? { ...t2, vert: i4 } : t2, e3, n2, a4, s4, o4, !!r2.includeEditMarkers, r2.measureText);
  }
  const l3 = $u(t2, e3, n2, { insets: s4, anchor: o4, vert: i4, includeEditMarkers: !!r2.includeEditMarkers, measureText: r2.measureText });
  return `<foreignObject width="${_l2(e3)}" height="${_l2(n2)}" style="overflow:visible">${l3}</foreignObject>`;
}
ct2(Ln2);
ht(oo2);
po2(si);
ho2(bi);
function ff(t2) {
  let e3;
  try {
    e3 = new lo2(t2);
  } catch {
    return null;
  }
  const n2 = e3.stream("EncryptedPackage");
  return n2 ? { info: e3.stream("EncryptionInfo"), pkg: n2 } : null;
}
async function df(t2, e3 = {}) {
  let n2;
  if (t2 instanceof Uint8Array ? n2 = t2 : t2 instanceof ArrayBuffer ? n2 = new Uint8Array(t2) : n2 = new Uint8Array(await t2.arrayBuffer()), n2[0] === 80 && n2[1] === 75) return Xo(n2, e3);
  if (n2[0] === 208 && n2[1] === 207) {
    const t3 = ff(n2);
    if (t3) {
      if (!t3.info) throw new Error("\u8BE5\u6587\u4EF6\u5DF2\u52A0\u5BC6\uFF0C\u4F46 EncryptionInfo \u6D41\u7F3A\u5931\uFF0C\u6587\u4EF6\u53EF\u80FD\u5DF2\u635F\u574F");
      const n3 = mo2();
      if (!n3) throw new Error("\u8BE5\u6587\u4EF6\u5DF2\u52A0\u5BC6\uFF0C\u4F46\u672A\u6CE8\u5165\u89E3\u5BC6\u5668\uFF08setDecryptor\uFF09");
      if (e3.password === void 0) throw new Wo2();
      return Xo(n3(t3.info, t3.pkg, e3.password), e3);
    }
    return Al2(n2, e3.password, e3.edit === true);
  }
  throw new Error("\u65E0\u6CD5\u8BC6\u522B\u7684\u6587\u4EF6\u683C\u5F0F\uFF1A\u65E2\u4E0D\u662F .pptx\uFF08Zip\uFF09\u4E5F\u4E0D\u662F .ppt\uFF08CFB\uFF09");
}
export {
  df as parse,
  bh as renderSlideToSvg
};
