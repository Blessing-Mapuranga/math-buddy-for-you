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
          "**Step 1 — differentiate.** $p = \\dfrac{\\partial z}{\\partial x} = a,\\; q = \\dfrac{\\partial z}{\\partial y} = b.$",
          "**Step 2 — eliminate $a, b$** by substituting $a = p,\\; b = q$ into the original relation: $z = p x + q y + p q.$",
          "**Answer.** $$\\boxed{\\,z = p x + q y + p q\\quad\\text{(Clairaut form)}.\\,}$$",
        ],
      },
      {
        problem: "Form the PDE from $z = f(x^2 + y^2)$.",
        steps: [
          "**Step 1 — chain rule.** Let $u = x^2 + y^2$, so $z = f(u)$. Then $p = f'(u)\\cdot 2 x$ and $q = f'(u)\\cdot 2 y.$",
          "**Step 2 — eliminate $f'(u)$** by taking the ratio: $\\dfrac{p}{q} = \\dfrac{2 x}{2 y} = \\dfrac{x}{y}.$",
          "**Step 3 — cross-multiply.** $y p = x q.$",
          "**Answer.** $$\\boxed{\\,y p - x q = 0.\\,}$$",
        ],
      },
      {
        problem: "Form the PDE from $z = f(x + a t) + g(x - a t)$.",
        steps: [
          "**Step 1 — first $t$-derivative.** $\\dfrac{\\partial z}{\\partial t} = a f'(x+at) - a g'(x-at).$",
          "**Step 2 — second $t$-derivative.** $\\dfrac{\\partial^2 z}{\\partial t^2} = a^2 f''(x+at) + a^2 g''(x-at).$",
          "**Step 3 — second $x$-derivative.** $\\dfrac{\\partial^2 z}{\\partial x^2} = f''(x+at) + g''(x-at).$",
          "**Step 4 — eliminate $f''$ and $g''$** by dividing: $\\dfrac{\\partial^2 z}{\\partial t^2} = a^2 \\dfrac{\\partial^2 z}{\\partial x^2}.$",
          "**Answer.** $$\\boxed{\\,\\dfrac{\\partial^2 z}{\\partial t^2} = a^2 \\dfrac{\\partial^2 z}{\\partial x^2}\\quad\\text{(1D wave equation)}.\\,}$$",
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
          "**Step 1 — Lagrange auxiliary system.** With $P = y,\\; Q = x,\\; R = z$: $\\dfrac{dx}{y} = \\dfrac{dy}{x} = \\dfrac{dz}{z}.$",
          "**Step 2 — first integral from the $(x,y)$ pair.** Cross-multiply: $x\\, dx = y\\, dy.$ Integrate: $\\tfrac{x^2}{2} = \\tfrac{y^2}{2} + \\text{const} \\Rightarrow x^2 - y^2 = c_1.$",
          "**Step 3 — combine to get a second integral.** Using the property $\\dfrac{a}{p} = \\dfrac{b}{q} = \\dfrac{a + b}{p + q}$: $\\dfrac{dx + dy}{y + x} = \\dfrac{dz}{z}.$",
          "**Step 4 — integrate.** $\\ln(x + y) = \\ln z + C \\Rightarrow \\dfrac{x + y}{z} = c_2.$",
          "**Step 5 — write the general solution.**",
          "**Answer.** $$\\boxed{\\,\\Phi\\!\\left(x^2 - y^2,\\; \\dfrac{x + y}{z}\\right) = 0.\\,}$$",
        ],
      },
      {
        problem: "Solve $(y + z) p + (z + x) q = x + y$.",
        steps: [
          "**Step 1 — auxiliary equations.** $\\dfrac{dx}{y + z} = \\dfrac{dy}{z + x} = \\dfrac{dz}{x + y}.$",
          "**Step 2 — first integral** using multipliers $(1, -1, 0)$. Numerator: $dx - dy.$ Denominator: $(y+z) - (z+x) = y - x = -(x - y).$ So $\\dfrac{d(x - y)}{-(x - y)} = \\dfrac{d(y - z)}{-(y - z)},$ giving $\\dfrac{x - y}{y - z} = c_1.$",
          "**Step 3 — second integral** using multipliers $(1, 1, 1)$. Numerator: $dx + dy + dz = d(x + y + z).$ Denominator sum: $2(x + y + z).$ Equate to any of the original ratios; comparing with multipliers $(x, y, z)$ on the auxiliary system shows the symmetric combination $u_2 = (x - y)(y - z)(z - x)$ is constant.",
          "**Step 4 — write general solution.**",
          "**Answer.** $$\\boxed{\\,\\Phi\\!\\left(\\dfrac{x - y}{y - z},\\;(x - y)(y - z)(z - x)\\right) = 0.\\,}$$",
        ],
      },
      {
        problem: "Solve $x^2 p + y^2 q = z^2$.",
        steps: [
          "**Step 1 — auxiliary equations.** $\\dfrac{dx}{x^2} = \\dfrac{dy}{y^2} = \\dfrac{dz}{z^2}.$",
          "**Step 2 — integrate the $(x, y)$ pair.** $\\int \\dfrac{dx}{x^2} = \\int \\dfrac{dy}{y^2} \\Rightarrow -\\dfrac{1}{x} = -\\dfrac{1}{y} + C_1 \\Rightarrow \\dfrac{1}{x} - \\dfrac{1}{y} = c_1.$",
          "**Step 3 — integrate the $(y, z)$ pair similarly.** $\\dfrac{1}{y} - \\dfrac{1}{z} = c_2.$",
          "**Step 4 — write the general solution.**",
          "**Answer.** $$\\boxed{\\,\\Phi\\!\\left(\\dfrac{1}{x} - \\dfrac{1}{y},\\;\\dfrac{1}{y} - \\dfrac{1}{z}\\right) = 0.\\,}$$",
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
          "**Step 1 — Standard Form I.** Equation involves only $p, q$, so try a planar complete integral $z = a x + b y + c.$ Then $p = a,\\; q = b.$",
          "**Step 2 — substitute** into the PDE: $a^2 + b^2 = 1.$ This is one constraint on the two constants $a, b.$",
          "**Step 3 — parametrise** with one free angle: $a = \\cos\\alpha,\\; b = \\sin\\alpha,\\; \\alpha\\in\\mathbb R.$",
          "**Answer.** $$\\boxed{\\,z = x \\cos\\alpha + y \\sin\\alpha + c.\\,}$$",
        ],
      },
      {
        problem: "Solve $z = p x + q y + p q$ (Clairaut).",
        steps: [
          "**Step 1 — recognise Clairaut form** $z = p x + q y + f(p, q).$",
          "**Step 2 — complete integral** is obtained by replacing $p \\to a,\\; q \\to b$ (any constants).",
          "**Answer.** $$\\boxed{\\,z = a x + b y + a b.\\,}$$",
        ],
      },
      {
        problem: "Solve $p^2 + q^2 = z$.",
        steps: [
          "**Step 1 — Standard Form II** $f(z, p, q) = 0$: independent variables $x, y$ absent. Try $z = z(u)$ with $u = x + a y$ ($a$ a constant).",
          "**Step 2 — derivatives via chain rule.** $p = z'(u)\\cdot 1 = z'$ and $q = z'(u)\\cdot a = a z'.$",
          "**Step 3 — substitute.** $z'^2 + a^2 z'^2 = z \\Rightarrow (1 + a^2) z'^2 = z.$",
          "**Step 4 — separate.** $\\dfrac{dz}{\\sqrt z} = \\dfrac{du}{\\sqrt{1 + a^2}}.$",
          "**Step 5 — integrate.** $2\\sqrt z = \\dfrac{u}{\\sqrt{1 + a^2}} + C \\Rightarrow 2\\sqrt{z(1 + a^2)} = u + b$ (with $b = C\\sqrt{1+a^2}$).",
          "**Step 6 — square.** $4 (1 + a^2) z = (u + b)^2 = (x + a y + b)^2.$",
          "**Answer.** $$\\boxed{\\,4(1 + a^2)\\, z = (x + a y + b)^2.\\,}$$",
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
          "**Step 1 — Standard Form III** $f_1(x, p) = f_2(y, q).$ Rewrite the PDE as $p^2 - x = -(q^2 - y).$ Each side depends only on its own pair, so each equals a constant $a$.",
          "**Step 2 — solve for $p$ and $q$.** $p^2 = a + x \\Rightarrow p = \\sqrt{a + x};\\quad q^2 = y - a \\Rightarrow q = \\sqrt{y - a}.$",
          "**Step 3 — integrate $dz = p\\, dx + q\\, dy.$** $\\int \\sqrt{a + x}\\, dx = \\tfrac{2}{3}(a + x)^{3/2};\\; \\int \\sqrt{y - a}\\, dy = \\tfrac{2}{3}(y - a)^{3/2}.$",
          "**Step 4 — add the constant of integration $b$.**",
          "**Answer.** $$\\boxed{\\,z = \\tfrac{2}{3}(a + x)^{3/2} + \\tfrac{2}{3}(y - a)^{3/2} + b.\\,}$$",
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
          "**Step 1 — separate variables.** Assume $u(x, t) = X(x) T(t).$ Substitute into $u_t = \\alpha^2 u_{xx}$: $X T' = \\alpha^2 X'' T \\Rightarrow \\dfrac{T'}{\\alpha^2 T} = \\dfrac{X''}{X} = -\\lambda$ (separation constant).",
          "**Step 2 — solve the spatial ODE.** $X'' + \\lambda X = 0$ with $X(0) = X(L) = 0$ has non-trivial solutions only when $\\lambda = (n\\pi/L)^2,\\; n = 1, 2, \\ldots$ giving $X_n(x) = \\sin\\!\\dfrac{n\\pi x}{L}.$",
          "**Step 3 — solve the time ODE.** $T' + \\alpha^2 \\lambda_n T = 0 \\Rightarrow T_n(t) = e^{-\\alpha^2 (n\\pi/L)^2 t}.$",
          "**Step 4 — superposition.** $u(x, t) = \\displaystyle\\sum_{n=1}^{\\infty} B_n \\sin\\!\\dfrac{n\\pi x}{L}\\, e^{-\\alpha^2 (n\\pi/L)^2 t}.$",
          "**Step 5 — apply $u(x, 0) = f(x)$.** $f(x) = \\displaystyle\\sum B_n \\sin\\!\\dfrac{n\\pi x}{L},$ a Fourier sine series. Coefficients: $B_n = \\dfrac{2}{L}\\!\\displaystyle\\int_0^L f(x) \\sin\\!\\dfrac{n\\pi x}{L}\\, dx.$",
          "**Answer.** $$\\boxed{\\,u(x,t) = \\sum_{n=1}^{\\infty} B_n \\sin\\!\\dfrac{n\\pi x}{L}\\, e^{-\\alpha^2 (n\\pi/L)^2 t},\\; B_n = \\tfrac{2}{L}\\!\\int_0^L f(x)\\sin\\!\\tfrac{n\\pi x}{L}\\, dx.\\,}$$",
        ],
      },
      {
        problem: "Vibrating string $u_{tt} = c^2 u_{xx}$, fixed ends, $u(x,0) = f(x),\\; u_t(x,0) = 0$.",
        steps: [
          "**Step 1 — separate** $u = X(x) T(t)$: $\\dfrac{T''}{c^2 T} = \\dfrac{X''}{X} = -\\lambda.$",
          "**Step 2 — spatial eigenproblem** with $X(0) = X(L) = 0$: $\\lambda_n = (n\\pi/L)^2,\\; X_n = \\sin\\!\\dfrac{n\\pi x}{L}.$",
          "**Step 3 — time ODE.** $T'' + c^2 \\lambda_n T = 0 \\Rightarrow T_n = A_n \\cos\\!\\dfrac{n\\pi c t}{L} + B_n^* \\sin\\!\\dfrac{n\\pi c t}{L}.$",
          "**Step 4 — initial velocity** $u_t(x, 0) = 0$ kills the sine-in-$t$ part: $B_n^* = 0.$",
          "**Step 5 — superposition.** $u(x, t) = \\displaystyle\\sum B_n \\sin\\!\\dfrac{n\\pi x}{L}\\cos\\!\\dfrac{n\\pi c t}{L}.$",
          "**Step 6 — apply $u(x, 0) = f(x)$** (Fourier sine series): $B_n = \\dfrac{2}{L}\\!\\displaystyle\\int_0^L f(x)\\sin\\!\\dfrac{n\\pi x}{L}\\, dx.$",
          "**Answer.** $$\\boxed{\\,u(x,t) = \\sum_{n=1}^{\\infty} B_n \\sin\\!\\tfrac{n\\pi x}{L}\\cos\\!\\tfrac{n\\pi c t}{L},\\; B_n = \\tfrac{2}{L}\\!\\int_0^L f(x)\\sin\\!\\tfrac{n\\pi x}{L}\\, dx.\\,}$$",
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