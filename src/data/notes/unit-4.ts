import type { ChapterNotes } from "./types";

export const unit4Notes: ChapterNotes[] = [
  {
    unitId: "unit-4",
    chapterIndex: 0,
    title: "Formation of PDEs",
    intro:
      "A partial differential equation involves an unknown function of two or more independent variables and its partial derivatives. PDEs arise from elimination of arbitrary constants or arbitrary functions.",
    sections: [
      {
        heading: "Notation",
        body: [
          "For $z = z(x, y)$, write $$p = \\frac{\\partial z}{\\partial x},\\; q = \\frac{\\partial z}{\\partial y},\\; r = \\frac{\\partial^2 z}{\\partial x^2},\\; s = \\frac{\\partial^2 z}{\\partial x\\partial y},\\; t = \\frac{\\partial^2 z}{\\partial y^2}.$$",
        ],
      },
      {
        heading: "Elimination of arbitrary constants",
        body: [
          "Given $z = f(x,y; a, b)$, differentiate with respect to $x$ and $y$ and eliminate $a, b$.",
        ],
      },
      {
        heading: "Elimination of arbitrary functions",
        body: [
          "Given $z = f(u(x,y,z), v(x,y,z))$ with $f$ arbitrary, eliminate $f$ to obtain a first-order PDE — typically of the Lagrange form $P p + Q q = R$.",
        ],
      },
    ],
    examples: [
      {
        problem: "Form the PDE from $z = a x + b y + a b$.",
        steps: [
          "$p = a,\\; q = b$. Substitute back: $z = p x + q y + p q$.",
          "$$\\boxed{\\,z = p x + q y + p q.\\,}$$ (Clairaut form.)",
        ],
      },
      {
        problem: "Form the PDE from $z = f(x^2 + y^2)$.",
        steps: [
          "$p = 2 x f',\\; q = 2 y f' \\Rightarrow \\dfrac{p}{q} = \\dfrac{x}{y}$.",
          "$$\\boxed{\\,y p - x q = 0.\\,}$$",
        ],
      },
      {
        problem: "Form the PDE from $z = f(x + a t) + g(x - a t)$.",
        steps: [
          "$\\dfrac{\\partial^2 z}{\\partial t^2} = a^2[f''(x+at) + g''(x-at)]$.",
          "$\\dfrac{\\partial^2 z}{\\partial x^2} = f''(x+at) + g''(x-at)$.",
          "$$\\boxed{\\,\\dfrac{\\partial^2 z}{\\partial t^2} = a^2\\dfrac{\\partial^2 z}{\\partial x^2}\\quad\\text{(1D wave equation)}.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Form the PDE from $z = (x+a)(y+b)$.", answer: "$z = p q.$" },
      { question: "Form the PDE from $z = a x + by + a^2 + b^2$.", answer: "$z = p x + q y + p^2 + q^2.$" },
      { question: "Form the PDE from $z = f(y/x)$.", answer: "$x p + y q = 0.$" },
      { question: "Form the PDE from $z = e^{a x + b y} \\phi(a x - b y)$.", answer: "$y p - x q = 0$ (after eliminating arbitrary $\\phi$); or relation involving $p, q, z$ depending on $a,b$." },
    ],
  },
  {
    unitId: "unit-4",
    chapterIndex: 1,
    title: "Lagrange's Linear Equations",
    intro:
      "First-order quasilinear PDEs of the form $$P(x,y,z)\\, p + Q(x,y,z)\\, q = R(x,y,z)$$ are called **Lagrange's equations**. Their general solution is $\\Phi(u, v) = 0$ where $u = c_1,\\; v = c_2$ are independent integrals of the auxiliary system $$\\frac{dx}{P} = \\frac{dy}{Q} = \\frac{dz}{R}.$$",
    sections: [
      {
        heading: "Solution recipe",
        body: [
          "1. Write the auxiliary equations.",
          "2. Find two independent solutions $u(x,y,z) = c_1$ and $v(x,y,z) = c_2$ by direct integration, by grouping, or by using **multipliers** $\\lambda, \\mu, \\nu$ such that $\\lambda P + \\mu Q + \\nu R = 0$ and the combination $\\lambda\\, dx + \\mu\\, dy + \\nu\\, dz$ is exact.",
          "3. The general solution is $\\Phi(u, v) = 0$.",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $y p + x q = z$.",
        steps: [
          "Auxiliary: $\\dfrac{dx}{y} = \\dfrac{dy}{x} = \\dfrac{dz}{z}$.",
          "From first pair: $x\\, dx = y\\, dy \\Rightarrow x^2 - y^2 = c_1$.",
          "Use $\\dfrac{dx + dy}{x + y} = \\dfrac{dz}{z}$: $\\ln(x + y) = \\ln z + C \\Rightarrow \\dfrac{x+y}{z} = c_2$.",
          "$$\\boxed{\\,\\Phi\\!\\left(x^2 - y^2,\\, \\dfrac{x+y}{z}\\right) = 0.\\,}$$",
        ],
      },
      {
        problem: "Solve $(y + z) p + (z + x) q = x + y$.",
        steps: [
          "Auxiliary: $\\dfrac{dx}{y+z} = \\dfrac{dy}{z+x} = \\dfrac{dz}{x+y}$.",
          "Use multipliers $1, -1, 0$: $\\dfrac{dx - dy}{(y+z) - (z+x)} = \\dfrac{dx - dy}{y - x}$, so $d(x - y) = -(x - y)\\,d\\xi$ ... after manipulation $u = (x - y)/(y - z) = c_1$.",
          "Use multipliers $1, 1, 1$: numerator $d(x+y+z)$, denominator $2(x+y+z)$. So $x + y + z = c_2 \\cdot$ const; combined with previous: $v = (x-y)(y-z)(z-x) = c_2$ is another standard integral.",
          "$$\\boxed{\\,\\Phi\\!\\bigl((x-y)/(y-z),\\,(x-y)(y-z)(z-x)\\bigr) = 0.\\,}$$",
        ],
      },
      {
        problem: "Solve $x^2 p + y^2 q = z^2$.",
        steps: [
          "Auxiliary: $\\dfrac{dx}{x^2} = \\dfrac{dy}{y^2} = \\dfrac{dz}{z^2}$.",
          "Integrate pairs: $-\\dfrac{1}{x} + \\dfrac{1}{y} = c_1,\\; -\\dfrac{1}{y} + \\dfrac{1}{z} = c_2$.",
          "$$\\boxed{\\,\\Phi\\!\\left(\\tfrac{1}{x} - \\tfrac{1}{y},\\, \\tfrac{1}{y} - \\tfrac{1}{z}\\right) = 0.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $p + q = z$.", answer: "$\\Phi(x - y,\\, z e^{-x}) = 0.$" },
      { question: "Solve $x p - y q = z$.", answer: "$\\Phi(xy,\\, z/x) = 0.$" },
      { question: "Solve $z(x p - y q) = y^2 - x^2$.", answer: "$\\Phi(xy,\\, x^2 + y^2 + z^2) = 0.$" },
      { question: "Solve $x(y - z) p + y(z - x) q = z(x - y)$.", answer: "$\\Phi(x + y + z,\\, x y z) = 0.$" },
      { question: "Solve $(x^2 - y^2 - z^2) p + 2 x y q = 2 x z$.", answer: "$\\Phi(y/z,\\, (x^2+y^2+z^2)/z) = 0.$" },
    ],
  },
  {
    unitId: "unit-4",
    chapterIndex: 2,
    title: "Non-Linear PDEs of First Order",
    intro:
      "Charpit's method gives a complete integral for any first-order PDE $F(x,y,z,p,q) = 0$. For special forms there are quicker recipes.",
    sections: [
      {
        heading: "Charpit's auxiliary equations",
        body: [
          "$$\\frac{dx}{F_p} = \\frac{dy}{F_q} = \\frac{dz}{p F_p + q F_q} = \\frac{-dp}{F_x + p F_z} = \\frac{-dq}{F_y + q F_z}.$$ Find one integrable combination, get a relation $\\Phi(p,q) = 0$, then integrate.",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $p^2 + q^2 = 1$ (Standard form $f(p,q)=0$).",
        steps: [
          "Take complete integral $z = a x + b y + c$ with $a^2 + b^2 = 1$.",
          "Parametrise $a = \\cos\\alpha,\\; b = \\sin\\alpha$.",
          "$$\\boxed{\\,z = x\\cos\\alpha + y\\sin\\alpha + c.\\,}$$",
        ],
      },
      {
        problem: "Solve $z = p x + q y + p q$ (Clairaut).",
        steps: [
          "Complete integral: replace $p, q$ by arbitrary $a, b$.",
          "$$\\boxed{\\,z = a x + b y + a b.\\,}$$",
        ],
      },
      {
        problem: "Solve $p^2 + q^2 = z$.",
        steps: [
          "Form $f(z, p, q) = 0$. Try $z = z(u),\\; u = x + a y$. Then $p = z',\\; q = a z'$, so $z'^2 (1 + a^2) = z$.",
          "$z' = \\sqrt{z/(1+a^2)}\\Rightarrow 2\\sqrt{z(1+a^2)} = u + b$.",
          "$$\\boxed{\\,4(1+a^2) z = (x + a y + b)^2.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $p q = z$.", answer: "$z = (x + a y + b)^2/(4 a).$" },
      { question: "Solve $z = p^2 + q^2$.", answer: "$4(1+a^2) z = (x + a y + b)^2.$" },
      { question: "Solve $p = q^2$.", answer: "$z = a^2 x + a y + b.$" },
      { question: "Find a complete integral of $z = p x + q y + \\sqrt{1 + p^2 + q^2}$.", answer: "$z = a x + b y + \\sqrt{1+a^2+b^2}.$" },
    ],
  },
  {
    unitId: "unit-4",
    chapterIndex: 3,
    title: "Standard Forms",
    intro:
      "Four standard forms of nonlinear first-order PDEs are solved by direct substitutions: $f(p,q) = 0$, $f(z,p,q) = 0$, $f_1(x,p) = f_2(y,q)$ (separable), and Clairaut's form.",
    sections: [
      {
        heading: "Standard Form I: $f(p,q) = 0$",
        body: [
          "Complete integral: $z = a x + b y + c$, with $f(a, b) = 0$.",
        ],
      },
      {
        heading: "Standard Form II: $f(z, p, q) = 0$",
        body: [
          "Try $z = z(u),\\; u = x + a y$, reducing to an ODE in $u$.",
        ],
      },
      {
        heading: "Standard Form III: $f_1(x, p) = f_2(y, q) = a$",
        body: [
          "Solve $f_1(x, p) = a$ for $p$ and $f_2(y, q) = a$ for $q$, then $z = \\int p\\, dx + \\int q\\, dy + b$.",
        ],
      },
      {
        heading: "Standard Form IV: Clairaut $z = p x + q y + f(p, q)$",
        body: [
          "Complete integral: $z = a x + b y + f(a, b)$.",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $p^2 + q^2 = x + y$ (separable form).",
        steps: [
          "Write $p^2 - x = -(q^2 - y) = a$. So $p = \\sqrt{a + x},\\; q = \\sqrt{y - a}$.",
          "Integrate: $z = \\tfrac{2}{3}(a + x)^{3/2} + \\tfrac{2}{3}(y - a)^{3/2} + b$.",
          "$$\\boxed{\\,z = \\tfrac{2}{3}(a + x)^{3/2} + \\tfrac{2}{3}(y - a)^{3/2} + b.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $p^2 q = 1$.", answer: "$z = a x + a^{-2} y + b.$" },
      { question: "Solve $p + q = p q$.", answer: "$z = a x + \\dfrac{a}{a-1} y + c.$" },
      { question: "Solve $z = p x + q y - 2\\sqrt{p q}$.", answer: "$z = a x + b y - 2\\sqrt{ab}.$" },
      { question: "Solve $\\sqrt{p} + \\sqrt{q} = 2 x$.", answer: "Use Form III with $\\sqrt p = a + x$ etc." },
    ],
  },
  {
    unitId: "unit-4",
    chapterIndex: 4,
    title: "Applications of PDEs",
    intro:
      "Three classical PDEs dominate engineering: the heat (diffusion) equation, the wave equation, and Laplace's equation. They are solved with separation of variables and Fourier series.",
    sections: [
      {
        heading: "Three classical PDEs",
        body: [
          "**Heat:** $\\dfrac{\\partial u}{\\partial t} = \\alpha^2 \\dfrac{\\partial^2 u}{\\partial x^2}$.",
          "**Wave:** $\\dfrac{\\partial^2 u}{\\partial t^2} = c^2 \\dfrac{\\partial^2 u}{\\partial x^2}$.",
          "**Laplace:** $\\dfrac{\\partial^2 u}{\\partial x^2} + \\dfrac{\\partial^2 u}{\\partial y^2} = 0$.",
        ],
      },
      {
        heading: "Separation of variables",
        body: [
          "Assume $u(x, t) = X(x) T(t)$, substitute, separate, equate to a constant $-\\lambda$.",
          "Apply boundary/initial conditions to determine $\\lambda_n$ and the Fourier coefficients.",
        ],
      },
    ],
    examples: [
      {
        problem: "Heat in a rod $0 \\le x \\le L$ with $u(0,t) = u(L,t) = 0,\\; u(x,0) = f(x)$.",
        steps: [
          "Separation: $u_n(x,t) = \\sin\\!\\left(\\tfrac{n\\pi x}{L}\\right) e^{-\\alpha^2 (n\\pi/L)^2 t}$.",
          "$u(x,t) = \\sum_{n=1}^\\infty B_n \\sin\\!\\left(\\tfrac{n\\pi x}{L}\\right) e^{-\\alpha^2(n\\pi/L)^2 t}$, with $B_n = \\dfrac{2}{L}\\int_0^L f(x)\\sin\\!\\left(\\tfrac{n\\pi x}{L}\\right) dx$.",
        ],
      },
      {
        problem: "Vibrating string $u_{tt} = c^2 u_{xx}$, fixed ends, $u(x,0) = f(x),\\; u_t(x,0) = 0$.",
        steps: [
          "$u(x, t) = \\sum_{n=1}^\\infty B_n \\sin\\!\\left(\\tfrac{n\\pi x}{L}\\right)\\cos\\!\\left(\\tfrac{n\\pi c t}{L}\\right)$, $B_n = \\dfrac{2}{L}\\int_0^L f(x)\\sin\\!\\left(\\tfrac{n\\pi x}{L}\\right) dx$.",
        ],
      },
    ],
    practice: [
      { question: "Solve $u_t = u_{xx},\\; u(0,t)=u(\\pi,t)=0,\\; u(x,0) = \\sin x$.", answer: "$u(x,t) = e^{-t}\\sin x.$" },
      { question: "Solve $u_{tt} = 4 u_{xx},\\; u(0,t)=u(\\pi,t)=0,\\; u(x,0)=\\sin 2x,\\; u_t(x,0)=0$.", answer: "$u = \\sin 2x \\cos 4 t.$" },
      { question: "Solve Laplace on a rectangle with $u(0,y)=u(a,y)=0,\\; u(x,0)=0,\\; u(x,b)=f(x)$.", answer: "$u = \\sum B_n \\sin\\tfrac{n\\pi x}{a}\\cdot \\sinh\\tfrac{n\\pi y}{a}/\\sinh\\tfrac{n\\pi b}{a}.$" },
    ],
  },
];