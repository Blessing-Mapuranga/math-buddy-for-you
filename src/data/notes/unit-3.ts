import type { ChapterNotes } from "./types";

export const unit3Notes: ChapterNotes[] = [
  {
    unitId: "unit-3",
    chapterIndex: 0,
    title: "Cauchy–Euler Equations",
    intro:
      "Linear ODEs of the form $$x^n y^{(n)} + a_{n-1} x^{n-1} y^{(n-1)} + \\cdots + a_0 y = f(x)$$ are reduced to constant-coefficient equations by the substitution $x = e^{t}$.",
    sections: [
      {
        heading: "Standard substitution",
        body: [
          "Let $x = e^{t}$, so $t = \\ln x$. Denote $D = \\dfrac{d}{dt}$. Then $$x \\frac{d}{dx} = D,\\quad x^2 \\frac{d^2}{dx^2} = D(D-1),\\quad x^3 \\frac{d^3}{dx^3} = D(D-1)(D-2),$$ and so on.",
          "The transformed equation has constant coefficients in $t$ and is solved by the methods of Unit II.",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $x^2 y'' - 3 x y' + 4 y = 0$.",
        steps: [
          "**Step 1 — recognise the type.** Each term has $x^k y^{(k)}$, so this is a **Cauchy–Euler** equation.",
          "**Step 2 — substitute** $x = e^{t}$ (so $t = \\ln x$). Use $x y' \\to D y$ and $x^2 y'' \\to D(D-1) y$, where $D = d/dt$.",
          "**Step 3 — transform.** $D(D-1) y - 3 D y + 4 y = 0 \\Rightarrow (D^2 - D - 3 D + 4) y = 0 \\Rightarrow (D^2 - 4 D + 4) y = 0.$",
          "**Step 4 — auxiliary equation.** $m^2 - 4 m + 4 = (m - 2)^2 = 0 \\Rightarrow m = 2$ double.",
          "**Step 5 — solution in $t$.** $y = (c_1 + c_2 t) e^{2 t}.$",
          "**Step 6 — restore $t = \\ln x$** so $e^{2 t} = x^2$.",
          "**Answer.** $$\\boxed{\\,y = (c_1 + c_2 \\ln x)\\, x^2.\\,}$$",
        ],
      },
      {
        problem: "Solve $x^2 y'' + x y' + y = \\ln x$.",
        steps: [
          "**Step 1 — substitute** $x = e^{t},\\; t = \\ln x$. Then RHS $\\ln x = t$.",
          "**Step 2 — transform LHS.** $x^2 y'' \\to D(D-1) y,\\; x y' \\to D y$. So $[D(D-1) + D + 1] y = t \\Rightarrow (D^2 + 1) y = t.$",
          "**Step 3 — complementary function.** Aux $m^2 + 1 = 0 \\Rightarrow m = \\pm i \\Rightarrow y_c = c_1 \\cos t + c_2 \\sin t.$",
          "**Step 4 — particular integral.** $y_p = (1 + D^2)^{-1} t.$ Expand $(1 + D^2)^{-1} = 1 - D^2 + \\cdots$; on $t$ the $D^2$ term gives $0$, so $y_p = t.$",
          "**Step 5 — total** $y = c_1 \\cos t + c_2 \\sin t + t$ and restore $t = \\ln x$.",
          "**Answer.** $$\\boxed{\\,y = c_1 \\cos(\\ln x) + c_2 \\sin(\\ln x) + \\ln x.\\,}$$",
        ],
      },
      {
        problem: "Solve $x^3 y''' + 3 x^2 y'' + x y' - y = 0$.",
        steps: [
          "**Step 1 — substitute** $x = e^{t}$. Use $x^3 y''' \\to D(D-1)(D-2) y,\\; x^2 y'' \\to D(D-1) y,\\; x y' \\to D y$.",
          "**Step 2 — transform.** $D(D-1)(D-2) y + 3 D(D-1) y + D y - y = 0.$",
          "**Step 3 — expand** $D(D-1)(D-2) = D^3 - 3 D^2 + 2 D$ and $3 D(D-1) = 3 D^2 - 3 D$; sum: $D^3 - 3 D^2 + 2 D + 3 D^2 - 3 D + D - 1 = D^3 - 1.$ Wait — recompute: $(D^3 - 3D^2 + 2D) + (3D^2 - 3D) + D - 1 = D^3 + 0 \\cdot D^2 + 0 \\cdot D - 1 = D^3 - 1.$ So equation is $(D^3 - 1) y = 0.$",
          "**Step 4 — auxiliary equation.** $m^3 - 1 = 0 \\Rightarrow (m - 1)(m^2 + m + 1) = 0 \\Rightarrow m = 1$ or $m = \\tfrac{-1 \\pm i\\sqrt 3}{2}.$",
          "**Step 5 — solution in $t$.** $y = c_1 e^{t} + e^{-t/2}\\!\\left(c_2 \\cos\\tfrac{\\sqrt 3}{2} t + c_3 \\sin\\tfrac{\\sqrt 3}{2} t\\right).$",
          "**Step 6 — restore $t = \\ln x$.** $e^{t} = x,\\; e^{-t/2} = x^{-1/2}$, and $\\tfrac{\\sqrt 3}{2} t = \\tfrac{\\sqrt 3}{2}\\ln x.$",
          "**Answer.** $$\\boxed{\\,y = c_1\\, x + x^{-1/2}\\!\\left[c_2 \\cos\\!\\tfrac{\\sqrt 3}{2}\\ln x + c_3 \\sin\\!\\tfrac{\\sqrt 3}{2}\\ln x\\right].\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $x^2 y'' + x y' - y = 0$.", answer: "$y = c_1 x + c_2/x.$" },
      { question: "Solve $x^2 y'' - x y' + y = \\ln x$.", answer: "$y = (c_1 + c_2\\ln x)x + \\ln x + 2.$" },
      { question: "Solve $x^2 y'' + 4 x y' + 2 y = e^{x}$.", answer: "$y = c_1/x + c_2/x^2 + e^x/x^2 \\cdot$ correction; final $y = c_1/x + c_2/x^2 + (x^2 - 2x + 2)e^x/x^2.$" },
      { question: "Solve $x^2 y'' - 3 x y' + 5 y = x^2 \\sin(\\ln x)$.", answer: "$y = x^2[c_1\\cos(\\ln x) + c_2\\sin(\\ln x)] - \\tfrac{x^2 \\ln x}{2}\\cos(\\ln x).$" },
    ],
  },
  {
    unitId: "unit-3",
    chapterIndex: 1,
    title: "Legendre's Linear Equations",
    intro:
      "Equations of the form $(a x + b)^n y^{(n)} + a_{n-1}(a x + b)^{n-1} y^{(n-1)} + \\cdots + a_0 y = f(x)$ generalise Cauchy–Euler. Substitute $a x + b = e^{t}$.",
    sections: [
      {
        heading: "Reduction",
        body: [
          "With $a x + b = e^{t}$ and $D = d/dt$:",
          "$(a x + b)\\dfrac{d}{dx} = a D,\\quad (ax+b)^2\\dfrac{d^2}{dx^2} = a^2 D(D-1),\\quad \\ldots$.",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $(2 x + 3)^2 y'' - 2(2 x + 3) y' - 12 y = 6 x$.",
        steps: [
          "**Step 1 — substitution.** Let $2 x + 3 = e^{t}$, so $t = \\ln(2 x + 3)$ and $x = \\tfrac{e^{t} - 3}{2}.$ With $a = 2,\\; (2x+3) y' \\to a D y = 2 D y,\\; (2x+3)^2 y'' \\to a^2 D(D-1) y = 4 D(D-1) y.$",
          "**Step 2 — transform LHS.** $4 D(D-1) y - 2(2 D y) - 12 y = 4 D^2 y - 4 D y - 4 D y - 12 y = (4 D^2 - 8 D - 12) y.$",
          "**Step 3 — transform RHS.** $6 x = 6 \\cdot \\dfrac{e^{t} - 3}{2} = 3 e^{t} - 9.$",
          "**Step 4 — divide by 4** to standardise: $(D^2 - 2 D - 3) y = \\tfrac{3}{4} e^{t} - \\tfrac{9}{4}.$",
          "**Step 5 — complementary function.** Aux $m^2 - 2 m - 3 = (m - 3)(m + 1) = 0 \\Rightarrow m = 3, -1.$ So $y_c = c_1 e^{3 t} + c_2 e^{-t}.$",
          "**Step 6 — particular integrals.** For $\\tfrac{3}{4} e^{t}$: $\\phi(1) = 1 - 2 - 3 = -4$, so $y_{p1} = \\dfrac{3 e^{t}/4}{-4} = -\\tfrac{3}{16} e^{t}.$ For $-\\tfrac{9}{4}$ (a constant $= e^{0\\cdot t}$): $\\phi(0) = -3$, so $y_{p2} = \\dfrac{-9/4}{-3} = \\tfrac{3}{4}.$",
          "**Step 7 — restore $t = \\ln(2x+3)$**: $e^{3 t} = (2x+3)^3,\\; e^{-t} = 1/(2x+3),\\; e^{t} = 2x+3.$",
          "**Answer.** $$\\boxed{\\,y = c_1 (2 x + 3)^3 + \\tfrac{c_2}{2 x + 3} - \\tfrac{3}{16}(2 x + 3) + \\tfrac{3}{4}.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $(x+1)^2 y'' - (x+1) y' + y = 0$.", answer: "$y = (x+1)[c_1 + c_2 \\ln(x+1)].$" },
      { question: "Solve $(3x+2)^2 y'' + 3(3x+2) y' - 36 y = 3 x^2 + 4 x + 1$.", answer: "$y = c_1(3x+2)^2 + c_2(3x+2)^{-2} + \\tfrac{1}{27}\\bigl[(3x+2)^2 \\ln(3x+2)\\bigr] + $ polynomial particular term." },
      { question: "Solve $(2x-1)^2 y'' + (2x-1) y' - 2 y = 0$.", answer: "$y = c_1 (2x-1)^{1} + c_2 (2x-1)^{-1/2}\\cdot$ etc.; in general roots from $4m(m-1)+2m-2 = 0.$" },
    ],
  },
  {
    unitId: "unit-3",
    chapterIndex: 2,
    title: "Simultaneous Differential Equations",
    intro:
      "Systems of linear ODEs in two or more dependent variables are solved by elimination using operator $D$, by matrix methods, or by Laplace transforms.",
    sections: [
      {
        heading: "Operator elimination",
        body: [
          "Write the system in operator form $\\phi_1(D) x + \\phi_2(D) y = f_1(t),\\; \\phi_3(D) x + \\phi_4(D) y = f_2(t)$.",
          "Eliminate one variable to obtain a single higher-order equation in the other.",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $\\dfrac{dx}{dt} + y = \\sin t,\\; \\dfrac{dy}{dt} + x = \\cos t$.",
        steps: [
          "**Step 1 — operator form.** $(D x) + y = \\sin t \\quad (1),\\quad x + (D y) = \\cos t \\quad (2),$ with $D = d/dt.$",
          "**Step 2 — eliminate $y$.** Apply $D$ to (1): $D^2 x + D y = \\cos t.$",
          "**Step 3 — subtract (2)** from this: $D^2 x + D y - x - D y = \\cos t - \\cos t \\Rightarrow (D^2 - 1) x = 0.$",
          "**Step 4 — solve.** Aux $m^2 - 1 = 0 \\Rightarrow m = \\pm 1 \\Rightarrow x = c_1 e^{t} + c_2 e^{-t}.$",
          "**Step 5 — recover $y$ from (1).** $y = \\sin t - D x = \\sin t - (c_1 e^{t} - c_2 e^{-t}) = \\sin t - c_1 e^{t} + c_2 e^{-t}.$",
          "**Answer.** $$\\boxed{\\,x = c_1 e^{t} + c_2 e^{-t},\\quad y = \\sin t - c_1 e^{t} + c_2 e^{-t}.\\,}$$",
        ],
      },
      {
        problem: "Solve $D x - y = e^{t},\\; D y + x = e^{-t}$.",
        steps: [
          "**Step 1 — equations.** $D x - y = e^{t} \\quad (1),\\quad D y + x = e^{-t} \\quad (2).$",
          "**Step 2 — eliminate $y$.** Apply $D$ to (1): $D^2 x - D y = D e^{t} = e^{t}.$",
          "**Step 3 — add to (2).** $D^2 x - D y + D y + x = e^{t} + e^{-t} \\Rightarrow (D^2 + 1) x = e^{t} + e^{-t}.$",
          "**Step 4 — complementary function.** Aux $m^2 + 1 = 0 \\Rightarrow x_c = c_1 \\cos t + c_2 \\sin t.$",
          "**Step 5 — particular integral.** Apply the exponential rule: $\\dfrac{e^{a t}}{a^2 + 1}$ with $a = \\pm 1$ gives $\\tfrac{e^{t}}{2} + \\tfrac{e^{-t}}{2} = \\cosh t.$",
          "**Step 6 — recover $y$ from (1).** $y = D x - e^{t} = -c_1 \\sin t + c_2 \\cos t + \\sinh t - e^{t}.$",
          "**Answer.** $$\\boxed{\\,x = c_1 \\cos t + c_2 \\sin t + \\cosh t,\\quad y = -c_1 \\sin t + c_2 \\cos t + \\sinh t - e^{t}.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $\\dfrac{dx}{dt} = y,\\; \\dfrac{dy}{dt} = -x$.", answer: "$x = A\\cos t + B\\sin t,\\; y = -A\\sin t + B\\cos t.$" },
      { question: "Solve $\\dfrac{dx}{dt} - 2 y = 0,\\; \\dfrac{dy}{dt} - 2 x = 0$.", answer: "$x = c_1 e^{2t} + c_2 e^{-2t},\\; y = c_1 e^{2t} - c_2 e^{-2t}.$" },
      { question: "Solve $\\dfrac{dx}{dt} + \\dfrac{dy}{dt} = e^{t},\\; x - y = t$.", answer: "$x = (e^t + t + C)/2 + D e^{-t}/2$ etc." },
    ],
  },
  {
    unitId: "unit-3",
    chapterIndex: 3,
    title: "Applications in Engineering Systems",
    intro:
      "Higher-order linear ODEs model spring–mass–damper systems and series RLC circuits. The mathematical structure is identical, so the same solutions apply.",
    sections: [
      {
        heading: "Spring–mass–damper",
        body: [
          "Newton's second law gives $$m\\,\\ddot x + c\\,\\dot x + k\\,x = F(t),$$ with damping ratio $\\zeta = \\dfrac{c}{2\\sqrt{m k}}$ and natural frequency $\\omega_n = \\sqrt{k/m}$.",
          "Cases: under-damped ($\\zeta < 1$), critically damped ($\\zeta = 1$), over-damped ($\\zeta > 1$).",
        ],
      },
      {
        heading: "Series RLC circuit",
        body: [
          "$$L \\ddot q + R \\dot q + \\frac{q}{C} = E(t).$$ Resonant frequency $\\omega_0 = 1/\\sqrt{LC}$.",
        ],
      },
    ],
    examples: [
      {
        problem: "A mass $m = 1$ kg, $k = 25$ N/m, no damping, is set in motion with $x(0) = 0.1,\\; \\dot x(0) = 0$. Find $x(t)$.",
        steps: [
          "**Step 1 — ODE.** With $c = 0$, Newton's law gives $m \\ddot x + k x = 0 \\Rightarrow \\ddot x + 25 x = 0.$ Natural frequency $\\omega_n = \\sqrt{k/m} = 5$ rad/s.",
          "**Step 2 — general solution.** $x(t) = A \\cos 5 t + B \\sin 5 t.$",
          "**Step 3 — apply $x(0) = 0.1$.** $A = 0.1.$",
          "**Step 4 — apply $\\dot x(0) = 0$.** $\\dot x = -5 A \\sin 5 t + 5 B \\cos 5 t,\\; \\dot x(0) = 5 B = 0 \\Rightarrow B = 0.$",
          "**Answer.** $$\\boxed{\\,x(t) = 0.1\\cos 5 t \\text{ m}.\\,}$$",
        ],
      },
      {
        problem: "Series RLC: $L = 1\\,\\mathrm{H},\\; R = 6\\,\\Omega,\\; C = 0.04\\,\\mathrm{F},\\; E = 24\\,\\mathrm{V}$, $q(0) = i(0) = 0$. Find $q(t)$.",
        steps: [
          "**Step 1 — write the ODE.** $L \\ddot q + R \\dot q + q/C = E$ becomes $\\ddot q + 6 \\dot q + 25 q = 24.$",
          "**Step 2 — complementary function.** Aux $m^2 + 6 m + 25 = 0 \\Rightarrow m = \\dfrac{-6 \\pm \\sqrt{36 - 100}}{2} = -3 \\pm 4 i.$ So $q_c = e^{-3 t}(c_1 \\cos 4 t + c_2 \\sin 4 t).$",
          "**Step 3 — particular integral.** RHS is constant $24$; try $q_p = K$: $25 K = 24 \\Rightarrow K = 24/25.$",
          "**Step 4 — general solution.** $q(t) = e^{-3 t}(c_1 \\cos 4 t + c_2 \\sin 4 t) + \\tfrac{24}{25}.$",
          "**Step 5 — apply $q(0) = 0$.** $c_1 + \\tfrac{24}{25} = 0 \\Rightarrow c_1 = -\\tfrac{24}{25}.$",
          "**Step 6 — compute $\\dot q$.** $\\dot q = e^{-3 t}\\bigl[(-3 c_1 + 4 c_2)\\cos 4 t + (-3 c_2 - 4 c_1)\\sin 4 t\\bigr].$",
          "**Step 7 — apply $\\dot q(0) = i(0) = 0$.** $-3 c_1 + 4 c_2 = 0 \\Rightarrow c_2 = \\tfrac{3 c_1}{4} = \\tfrac{3}{4}\\cdot\\!\\left(-\\tfrac{24}{25}\\right) = -\\tfrac{18}{25}.$",
          "**Step 8 — assemble.** $q(t) = \\tfrac{24}{25} - \\tfrac{1}{25} e^{-3 t}(24 \\cos 4 t + 18 \\sin 4 t) = \\tfrac{24}{25} - \\tfrac{6}{25} e^{-3 t}(4 \\cos 4 t + 3 \\sin 4 t).$",
          "**Answer.** $$\\boxed{\\,q(t) = \\tfrac{24}{25} - \\tfrac{6}{25} e^{-3 t}\\bigl(4 \\cos 4 t + 3 \\sin 4 t\\bigr)\\text{ C}.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Critically damped: $m=1, c=4, k=4, x(0)=1, \\dot x(0)=0$. Find $x(t)$.", answer: "$x(t) = (1 + 2 t) e^{-2 t}.$" },
      { question: "Forced undamped: $\\ddot x + 4 x = \\sin 2 t,\\; x(0)=\\dot x(0)=0$.", answer: "$x = -\\tfrac{t}{4}\\cos 2 t + \\tfrac{1}{8}\\sin 2 t.$" },
      { question: "Series RLC at resonance ($\\omega = 1/\\sqrt{LC}$): describe response.", answer: "Amplitude grows linearly with $t$ in the lossless case." },
    ],
  },
];