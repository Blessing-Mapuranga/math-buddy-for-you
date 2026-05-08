import type { ChapterNotes } from "./types";

export const unit6Notes: ChapterNotes[] = [
  {
    unitId: "unit-6",
    chapterIndex: 0,
    title: "Line Integrals",
    intro:
      "A **line integral** $\\int_C \\vec F \\cdot d\\vec r$ measures the work done by a force field $\\vec F$ along a curve $C$. It depends, in general, on the path; for conservative fields it depends only on the endpoints.",
    sections: [
      {
        heading: "Computation",
        body: [
          "Parametrise $C$ as $\\vec r(t) = (x(t), y(t), z(t)),\\; t \\in [a, b]$. Then $$\\int_C \\vec F\\cdot d\\vec r = \\int_a^b \\vec F(\\vec r(t)) \\cdot \\vec r'(t)\\, dt.$$",
        ],
      },
      {
        heading: "Conservative fields",
        body: [
          "If $\\vec F = \\nabla\\phi$, then $\\int_C \\vec F\\cdot d\\vec r = \\phi(B) - \\phi(A)$, independent of path.",
        ],
      },
    ],
    examples: [
      {
        problem: "Evaluate $\\int_C \\vec F\\cdot d\\vec r$ where $\\vec F = (3 x^2, 2 x z - y, z)$ and $C$ is the line from $(0,0,0)$ to $(2, 1, 3)$.",
        steps: [
          "Parametrise $C$: $\\vec r(t) = (2 t, t, 3 t),\\; t \\in [0, 1]$. $\\vec r'(t) = (2, 1, 3)$.",
          "$\\vec F = (12 t^2,\\, 12 t^2 - t,\\, 3 t)$. $\\vec F \\cdot \\vec r' = 24 t^2 + 12 t^2 - t + 9 t = 36 t^2 + 8 t$.",
          "$\\int_0^1 (36 t^2 + 8 t)\\, dt = 12 + 4 = 16$.",
          "$$\\boxed{\\,\\int_C \\vec F\\cdot d\\vec r = 16.\\,}$$",
        ],
      },
      {
        problem: "Show $\\vec F = (2 x y + z^3, x^2, 3 x z^2)$ is conservative and compute $\\int_C \\vec F\\cdot d\\vec r$ from $(0,0,0)$ to $(1,2,1)$.",
        steps: [
          "$\\operatorname{curl}\\vec F = \\vec 0$, so $\\vec F = \\nabla\\phi$ with $\\phi = x^2 y + x z^3$ (cf. Unit V).",
          "Value $= \\phi(1,2,1) - \\phi(0,0,0) = (2 + 1) - 0 = 3$.",
          "$$\\boxed{\\,\\int_C \\vec F\\cdot d\\vec r = 3.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Compute $\\int_C (x\\, dx + y\\, dy)$ along $y = x^2$ from $(0,0)$ to $(1,1)$.", answer: "$1.$" },
      { question: "Compute $\\int_C \\vec F\\cdot d\\vec r$ for $\\vec F = (y, -x)$ around the unit circle counterclockwise.", answer: "$-2\\pi.$" },
      { question: "Find the work done by $\\vec F = (y, x)$ from $(0,0)$ to $(1,1)$ along $y = x$.", answer: "$1.$" },
      { question: "Compute $\\int_C (3x^2\\, dx + 4xy\\, dy)$ along $y = x^2$ from $(0,0)$ to $(1,1)$.", answer: "$1 + 4/3 \\cdot$ check; $= 1 + 4/3 = 7/3.$" },
    ],
  },
  {
    unitId: "unit-6",
    chapterIndex: 1,
    title: "Surface and Volume Integrals",
    intro:
      "Generalisations of line integrals: integrate a scalar or vector field over a surface or solid region.",
    sections: [
      {
        heading: "Surface integral of a vector field (flux)",
        body: [
          "$$\\iint_S \\vec F \\cdot \\hat n\\, dS = \\iint_R \\vec F\\cdot \\frac{\\vec r_u \\times \\vec r_v}{|\\vec r_u\\times \\vec r_v|}\\, |\\vec r_u\\times\\vec r_v|\\, du\\, dv = \\iint_R \\vec F\\cdot(\\vec r_u\\times \\vec r_v)\\, du\\, dv.$$",
        ],
      },
      {
        heading: "Volume integral",
        body: [
          "$\\iiint_V f\\, dV$ is computed in convenient coordinates (Cartesian, cylindrical, spherical).",
        ],
      },
    ],
    examples: [
      {
        problem: "Find the flux of $\\vec F = (x, y, z)$ through the closed surface of the unit cube $[0,1]^3$.",
        steps: [
          "By the divergence theorem (anticipating Gauss): flux $= \\iiint \\operatorname{div}\\vec F\\, dV = 3 \\cdot \\text{vol} = 3$.",
          "$$\\boxed{\\,\\Phi = 3.\\,}$$",
        ],
      },
      {
        problem: "Compute $\\iint_S \\vec F\\cdot\\hat n\\, dS$ for $\\vec F = (4 x z, -y^2, y z)$ over the surface of the unit cube.",
        steps: [
          "$\\operatorname{div}\\vec F = 4 z - 2 y + y = 4 z - y$.",
          "$\\iiint (4 z - y)\\, dV = \\int_0^1\\!\\int_0^1\\!\\int_0^1 (4 z - y)\\, dz\\, dy\\, dx = 2 - \\tfrac{1}{2} = \\tfrac{3}{2}$.",
          "$$\\boxed{\\,\\Phi = \\tfrac{3}{2}.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Volume of the region inside $z = x^2 + y^2$ and below $z = 4$.", answer: "$8\\pi.$" },
      { question: "Compute $\\iint_S z\\, dS$ over the upper hemisphere of $x^2+y^2+z^2 = a^2$.", answer: "$\\pi a^3.$" },
      { question: "Flux of $\\vec F = (y, -x, z)$ through the unit sphere.", answer: "$\\tfrac{4}{3}\\pi$ (by divergence theorem)." },
    ],
  },
  {
    unitId: "unit-6",
    chapterIndex: 2,
    title: "Green's Theorem",
    intro:
      "Green's theorem connects a line integral around a simple closed curve $C$ in the plane with a double integral over the region $R$ enclosed by $C$.",
    sections: [
      {
        heading: "Statement",
        body: [
          "$$\\oint_C (P\\, dx + Q\\, dy) = \\iint_R \\!\\left(\\dfrac{\\partial Q}{\\partial x} - \\dfrac{\\partial P}{\\partial y}\\right) dA.$$",
          "Orientation: $C$ is traversed counterclockwise.",
        ],
      },
    ],
    examples: [
      {
        problem: "Verify Green's theorem for $P = x y,\\; Q = x^2$ over the square $0 \\le x, y \\le 1$.",
        steps: [
          "Right side: $Q_x - P_y = 2 x - x = x$. $\\iint_R x\\, dA = \\tfrac{1}{2}$.",
          "Left side: split the boundary into four segments, parametrise and add. The total works out to $\\tfrac{1}{2}$. ✓",
        ],
      },
      {
        problem: "Use Green's theorem to evaluate $\\oint_C (x^2 - y^2)\\, dx + 2 x y\\, dy$ over the boundary of the rectangle $0\\le x \\le a,\\; 0 \\le y \\le b$.",
        steps: [
          "$Q_x - P_y = 2 y - (-2 y) = 4 y$.",
          "$\\iint_R 4 y\\, dA = 4 \\cdot a \\cdot \\tfrac{b^2}{2} = 2 a b^2$.",
          "$$\\boxed{\\,\\oint_C = 2 a b^2.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Evaluate $\\oint_C (3 x^2 y\\, dx + x^3\\, dy)$ around the unit circle.", answer: "$0$ (the field is conservative)." },
      { question: "Area of an ellipse $\\tfrac{x^2}{a^2} + \\tfrac{y^2}{b^2} = 1$ via Green: $\\tfrac{1}{2}\\oint (x\\, dy - y\\, dx)$.", answer: "$\\pi a b.$" },
      { question: "Evaluate $\\oint_C (y\\, dx - x\\, dy)$ around the unit square $[0,1]^2$.", answer: "$-2.$" },
    ],
  },
  {
    unitId: "unit-6",
    chapterIndex: 3,
    title: "Stokes' Theorem",
    intro:
      "Stokes' theorem extends Green's theorem to oriented surfaces in three dimensions: it relates a line integral around the boundary $\\partial S$ to a surface integral of the curl.",
    sections: [
      {
        heading: "Statement",
        body: [
          "$$\\oint_{\\partial S} \\vec F\\cdot d\\vec r = \\iint_S (\\operatorname{curl}\\vec F)\\cdot \\hat n\\, dS,$$ where the orientation of $\\partial S$ is consistent with $\\hat n$ (right-hand rule).",
        ],
      },
    ],
    examples: [
      {
        problem: "Verify Stokes' theorem for $\\vec F = (y, -x, 0)$ over the upper hemisphere of $x^2 + y^2 + z^2 = 1$.",
        steps: [
          "$\\operatorname{curl}\\vec F = (0, 0, -2)$.",
          "Boundary $\\partial S$ is the unit circle in the $xy$-plane (counterclockwise as seen from $+z$).",
          "RHS: $\\iint_S (-2)\\, \\hat k \\cdot \\hat n\\, dS = -2 \\cdot \\pi(1)^2 = -2\\pi$ (projection).",
          "LHS: parametrise circle $\\vec r = (\\cos t, \\sin t, 0)$: $\\vec F\\cdot \\vec r' = (\\sin t)(-\\sin t) + (-\\cos t)(\\cos t) = -1$. Integral $= -2\\pi$. ✓",
        ],
      },
      {
        problem: "Use Stokes' theorem to evaluate $\\oint_C \\vec F\\cdot d\\vec r$ for $\\vec F = (y - z, z - x, x - y)$ where $C$ is the boundary of the triangle with vertices $(1,0,0),(0,1,0),(0,0,1)$.",
        steps: [
          "$\\operatorname{curl}\\vec F = (-1 - 1, -1 - 1, -1 - 1) = (-2, -2, -2)$.",
          "Plane $x + y + z = 1$ has unit normal $\\hat n = \\tfrac{1}{\\sqrt 3}(1,1,1)$. $\\operatorname{curl}\\vec F \\cdot \\hat n = -2\\sqrt 3$.",
          "Area of triangle $= \\tfrac{\\sqrt 3}{2}$.",
          "$$\\boxed{\\,\\oint_C \\vec F\\cdot d\\vec r = -2\\sqrt 3 \\cdot \\tfrac{\\sqrt 3}{2} = -3.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Use Stokes for $\\vec F = (z, x, y)$ around the boundary of the disc $x^2+y^2\\le 1$ in $z = 0$.", answer: "$\\pi.$" },
      { question: "Verify Stokes for $\\vec F = (2 y, 3 x, -z^2)$ over the upper hemisphere of $x^2+y^2+z^2 = 9$.", answer: "Both sides equal $9\\pi.$" },
      { question: "Evaluate $\\oint_C \\vec F\\cdot d\\vec r$ for $\\vec F = (x^2, x y, 0)$ around the unit square in the $xy$-plane.", answer: "$\\tfrac{1}{2}.$" },
    ],
  },
  {
    unitId: "unit-6",
    chapterIndex: 4,
    title: "Gauss Divergence Theorem",
    intro:
      "The divergence theorem relates the outward flux of a vector field through a closed surface to the volume integral of its divergence.",
    sections: [
      {
        heading: "Statement",
        body: [
          "$$\\oiint_{\\partial V} \\vec F\\cdot \\hat n\\, dS = \\iiint_V \\operatorname{div}\\vec F\\, dV.$$",
        ],
      },
    ],
    examples: [
      {
        problem: "Verify the divergence theorem for $\\vec F = (x, y, z)$ over the unit ball.",
        steps: [
          "$\\operatorname{div}\\vec F = 3$, $\\iiint_V 3\\, dV = 3 \\cdot \\tfrac{4}{3}\\pi = 4\\pi$.",
          "Surface integral: $\\hat n = \\vec r$ on the unit sphere, $\\vec F\\cdot \\hat n = 1$, so flux $= 4\\pi$. ✓",
        ],
      },
      {
        problem: "Use the divergence theorem to compute $\\oiint_S \\vec F\\cdot \\hat n\\, dS$ for $\\vec F = (x^3, y^3, z^3)$ over the sphere of radius $a$.",
        steps: [
          "$\\operatorname{div}\\vec F = 3(x^2 + y^2 + z^2) = 3 r^2$.",
          "$\\iiint 3 r^2\\, dV = 3\\cdot\\int_0^a r^2 \\cdot 4\\pi r^2\\, dr = 12\\pi \\cdot \\tfrac{a^5}{5} = \\tfrac{12\\pi a^5}{5}$.",
          "$$\\boxed{\\,\\Phi = \\tfrac{12\\pi a^5}{5}.\\,}$$",
        ],
      },
      {
        problem: "Find the flux of $\\vec F = (x^2, y^2, z^2)$ out of the cube $[0,1]^3$.",
        steps: [
          "$\\operatorname{div}\\vec F = 2(x + y + z)$.",
          "$\\iiint 2(x + y + z)\\, dV = 2\\cdot 3\\cdot \\tfrac{1}{2} = 3$.",
          "$$\\boxed{\\,\\Phi = 3.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Flux of $\\vec F = (x, y, 0)$ out of the unit ball.", answer: "$\\tfrac{8\\pi}{3}.$" },
      { question: "Flux of $\\vec F = (y z, z x, x y)$ out of the unit cube.", answer: "$0.$" },
      { question: "Use Gauss to evaluate $\\oiint (x\\, dy\\, dz + y\\, dz\\, dx + z\\, dx\\, dy)$ over a closed surface enclosing volume $V$.", answer: "$3 V.$" },
      { question: "Flux of $\\vec F = r^2 \\vec r$ through the sphere of radius $a$.", answer: "$4\\pi a^5.$" },
    ],
  },
];