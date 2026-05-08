import type { ChapterNotes } from "./types";

export const unit2Notes: ChapterNotes[] = [
  {
    unitId: "unit-2",
    chapterIndex: 0,
    title: "Higher Order Linear ODEs",
    intro:
      "Linear differential equations of order $n \\geq 2$ describe oscillating mechanical systems, electrical circuits, beams, and many other engineering phenomena. They have an elegant general theory based on the principle of superposition.",
    sections: [
      {
        heading: "Standard form",
        body: [
          "$$a_n(x)\\, y^{(n)} + a_{n-1}(x)\\, y^{(n-1)} + \\cdots + a_1(x)\\, y' + a_0(x)\\, y = f(x).$$",
          "If $f(x) \\equiv 0$ the equation is **homogeneous**; otherwise **non-homogeneous**.",
        ],
      },
      {
        heading: "Linear independence and Wronskian",
        body: [
          "Functions $y_1, y_2, \\ldots, y_n$ are linearly independent on an interval iff their **Wronskian** $$W(y_1,\\ldots,y_n) = \\begin{vmatrix} y_1 & y_2 & \\cdots & y_n \\\\ y_1' & y_2' & \\cdots & y_n' \\\\ \\vdots & & & \\vdots \\\\ y_1^{(n-1)} & y_2^{(n-1)} & \\cdots & y_n^{(n-1)} \\end{vmatrix} \\neq 0.$$",
        ],
      },
      {
        heading: "Structure of the general solution",
        body: [
          "If $y_c$ is the general solution of the homogeneous equation (the **complementary function**) and $y_p$ is any particular solution, then the general solution is $$y = y_c + y_p.$$",
        ],
      },
    ],
    examples: [
      {
        problem: "Show that $y_1 = e^x,\\; y_2 = e^{-x},\\; y_3 = e^{2x}$ are linearly independent.",
        steps: [
          "Compute $W = \\begin{vmatrix} e^x & e^{-x} & e^{2x} \\\\ e^x & -e^{-x} & 2 e^{2x} \\\\ e^x & e^{-x} & 4 e^{2x} \\end{vmatrix} = e^{2x}\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & -1 & 2 \\\\ 1 & 1 & 4 \\end{vmatrix}$.",
          "Expanding: $1(-4 - 2) - 1(4 - 2) + 1(1 + 1) = -6 - 2 + 2 = -6 \\neq 0$.",
          "Hence linearly independent. $\\boxed{W = -6\\, e^{2x} \\neq 0}.$",
        ],
      },
      {
        problem: "Verify $y = c_1 e^{x} + c_2 e^{-x}$ solves $y'' - y = 0$ and find the particular solution with $y(0)=2,\\; y'(0)=0$.",
        steps: [
          "$y'' = c_1 e^x + c_2 e^{-x} = y$, so $y'' - y = 0$. ✓",
          "$y(0) = c_1 + c_2 = 2,\\; y'(0) = c_1 - c_2 = 0 \\Rightarrow c_1 = c_2 = 1$.",
          "Particular: $\\boxed{y = e^x + e^{-x} = 2\\cosh x.}$",
        ],
      },
    ],
    practice: [
      { question: "Compute the Wronskian of $\\sin x,\\, \\cos x$.", answer: "$W = -1.$" },
      { question: "Are $1, x, x^2$ linearly independent?", answer: "Yes; $W = 2 \\neq 0.$" },
      { question: "Show $\\sin x$ and $\\sin(x + \\pi/4)$ are linearly dependent.", answer: "$\\sin(x+\\pi/4) = \\tfrac{1}{\\sqrt 2}(\\sin x + \\cos x)$ — depends on $\\sin x, \\cos x$ pair only — actually independent. (Trick question; write as a counterexample showing $\\sin x, \\sin(x+\\pi)$ are dependent because $\\sin(x+\\pi) = -\\sin x$.)" },
      { question: "Solve $y'' - 4y = 0$ with $y(0)=1, y'(0)=0$.", answer: "$y = \\cosh 2x.$" },
      { question: "Find the IVP solution of $y''+y=0,\\; y(0)=0, y'(0)=3$.", answer: "$y = 3\\sin x.$" },
    ],
  },
  {
    unitId: "unit-2",
    chapterIndex: 1,
    title: "Homogeneous Equations with Constant Coefficients",
    intro:
      "For $a_n y^{(n)} + a_{n-1} y^{(n-1)} + \\cdots + a_0 y = 0$ with constant $a_i$, the solution is built from roots of the auxiliary equation.",
    sections: [
      {
        heading: "Auxiliary (characteristic) equation",
        body: [
          "Substitute $y = e^{m x}$ to obtain $$a_n m^n + a_{n-1} m^{n-1} + \\cdots + a_0 = 0.$$",
        ],
      },
      {
        heading: "Cases for the roots",
        body: [
          "**Distinct real roots** $m_1, \\ldots, m_n$: $y = c_1 e^{m_1 x} + \\cdots + c_n e^{m_n x}$.",
          "**Repeated real root** $m$ of multiplicity $k$: contribution $\\,(c_1 + c_2 x + \\cdots + c_k x^{k-1}) e^{m x}$.",
          "**Complex conjugate roots** $\\alpha \\pm i\\beta$: contribution $e^{\\alpha x}(c_1 \\cos\\beta x + c_2 \\sin\\beta x)$.",
          "**Repeated complex roots** $\\alpha \\pm i\\beta$ of multiplicity $k$: $e^{\\alpha x}\\bigl[(A_0 + A_1 x + \\cdots + A_{k-1} x^{k-1})\\cos\\beta x + (B_0 + \\cdots + B_{k-1} x^{k-1})\\sin\\beta x\\bigr]$.",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $y'' - 5y' + 6y = 0$.",
        steps: [
          "Aux: $m^2 - 5 m + 6 = 0 \\Rightarrow (m-2)(m-3) = 0 \\Rightarrow m = 2, 3$.",
          "$$\\boxed{\\,y = c_1 e^{2x} + c_2 e^{3x}.\\,}$$",
        ],
      },
      {
        problem: "Solve $y'' + 4y' + 4y = 0$.",
        steps: [
          "Aux: $m^2 + 4 m + 4 = (m + 2)^2 = 0 \\Rightarrow m = -2$ (double).",
          "$$\\boxed{\\,y = (c_1 + c_2 x) e^{-2x}.\\,}$$",
        ],
      },
      {
        problem: "Solve $y'' + 2y' + 5y = 0$.",
        steps: [
          "Aux: $m^2 + 2 m + 5 = 0 \\Rightarrow m = -1 \\pm 2 i$.",
          "$$\\boxed{\\,y = e^{-x}\\bigl(c_1 \\cos 2x + c_2 \\sin 2x\\bigr).\\,}$$",
        ],
      },
      {
        problem: "Solve $y^{(4)} - 2 y'' + y = 0$.",
        steps: [
          "Aux: $m^4 - 2 m^2 + 1 = (m^2 - 1)^2 = 0 \\Rightarrow m = \\pm 1$ (each double).",
          "$$\\boxed{\\,y = (c_1 + c_2 x) e^{x} + (c_3 + c_4 x) e^{-x}.\\,}$$",
        ],
      },
      {
        problem: "Solve $y''' - 3 y'' + 4 y = 0$.",
        steps: [
          "Aux: $m^3 - 3 m^2 + 4 = 0$. Try $m = -1$: $-1 - 3 + 4 = 0$ ✓.",
          "Factor: $m^3 - 3 m^2 + 4 = (m + 1)(m^2 - 4 m + 4) = (m + 1)(m - 2)^2$.",
          "$$\\boxed{\\,y = c_1 e^{-x} + (c_2 + c_3 x) e^{2x}.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $y'' - 7 y' + 12 y = 0$.", answer: "$y = c_1 e^{3x} + c_2 e^{4x}.$" },
      { question: "Solve $y'' + 6 y' + 9 y = 0$.", answer: "$y = (c_1 + c_2 x)e^{-3x}.$" },
      { question: "Solve $y'' + 9 y = 0$.", answer: "$y = c_1\\cos 3x + c_2\\sin 3x.$" },
      { question: "Solve $y''' - 6 y'' + 11 y' - 6 y = 0$.", answer: "$y = c_1 e^x + c_2 e^{2x} + c_3 e^{3x}.$" },
      { question: "Solve $y^{(4)} + 8 y'' + 16 y = 0$.", answer: "$y = (c_1 + c_2 x)\\cos 2x + (c_3 + c_4 x)\\sin 2x.$" },
      { question: "Solve $y'' - 2 y' + 5 y = 0,\\; y(0)=0, y'(0)=2$.", answer: "$y = e^{x}\\sin 2x.$" },
    ],
  },
  {
    unitId: "unit-2",
    chapterIndex: 2,
    title: "Non-Homogeneous Equations",
    intro:
      "For $L[y] = f(x)$ with constant coefficients we write $y = y_c + y_p$, where $y_c$ solves $L[y]=0$ and $y_p$ is a particular integral. Operator notation $D = d/dx$ and the inverse operator $1/\\phi(D)$ give a powerful method.",
    sections: [
      {
        heading: "Operator method — particular integral",
        body: [
          "Write $L[y] = \\phi(D)\\, y = f(x)$. Then $y_p = \\dfrac{1}{\\phi(D)} f(x).$",
          "**Rule 1** (exponential): $\\dfrac{1}{\\phi(D)} e^{a x} = \\dfrac{e^{ax}}{\\phi(a)}\\;$ (provided $\\phi(a) \\neq 0$).",
          "**Rule 2** (sine/cosine): $\\dfrac{1}{\\phi(D^2)} \\sin a x = \\dfrac{\\sin a x}{\\phi(-a^2)}$ when $\\phi(-a^2) \\neq 0$ (similar for $\\cos a x$).",
          "**Rule 3** (polynomial): expand $\\dfrac{1}{\\phi(D)}$ as a series in $D$ and apply.",
          "**Rule 4** (shift): $\\dfrac{1}{\\phi(D)} e^{a x} V(x) = e^{a x}\\, \\dfrac{1}{\\phi(D + a)} V(x)$.",
          "**Failure case**: when $\\phi(a) = 0$, multiply by $x$ and use $\\dfrac{1}{\\phi(D)} e^{a x} = x \\cdot \\dfrac{1}{\\phi'(D)} e^{a x}$.",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $(D^2 - 5 D + 6) y = e^{4 x}$.",
        steps: [
          "$y_c$: $m^2 - 5 m + 6 = 0 \\Rightarrow m = 2, 3 \\Rightarrow y_c = c_1 e^{2x} + c_2 e^{3x}$.",
          "$y_p = \\dfrac{e^{4x}}{16 - 20 + 6} = \\dfrac{e^{4x}}{2}$.",
          "$$\\boxed{\\,y = c_1 e^{2x} + c_2 e^{3x} + \\tfrac{1}{2} e^{4x}.\\,}$$",
        ],
      },
      {
        problem: "Solve $(D^2 + 4) y = \\sin 3 x$.",
        steps: [
          "$y_c = c_1 \\cos 2x + c_2 \\sin 2x$.",
          "$y_p = \\dfrac{\\sin 3x}{-9 + 4} = -\\dfrac{\\sin 3x}{5}$.",
          "$$\\boxed{\\,y = c_1 \\cos 2x + c_2 \\sin 2x - \\tfrac{1}{5} \\sin 3x.\\,}$$",
        ],
      },
      {
        problem: "Resonance case: solve $(D^2 + 1) y = \\cos x$.",
        steps: [
          "$y_c = c_1 \\cos x + c_2 \\sin x$. Direct rule fails ($\\phi(-1) = 0$).",
          "Use $\\dfrac{1}{D^2 + 1}\\cos x = \\Re\\!\\dfrac{e^{ix}}{D^2+1}$ with the failure rule: replace by $x \\cdot \\dfrac{e^{ix}}{2 D}\\Big|_{D = i} = \\dfrac{x}{2 i} e^{ix}$.",
          "Real part: $y_p = \\tfrac{x}{2}\\sin x$.",
          "$$\\boxed{\\,y = c_1 \\cos x + c_2 \\sin x + \\tfrac{x}{2}\\sin x.\\,}$$",
        ],
      },
      {
        problem: "Solve $(D^2 - 2 D + 1) y = x e^{x}$.",
        steps: [
          "$y_c = (c_1 + c_2 x) e^{x}$.",
          "Use shift: $y_p = e^{x}\\dfrac{1}{(D)^2} x = e^{x} \\cdot \\tfrac{x^3}{6}$.",
          "$$\\boxed{\\,y = (c_1 + c_2 x) e^{x} + \\tfrac{x^3}{6} e^{x}.\\,}$$",
        ],
      },
      {
        problem: "Solve $(D^2 + 2 D + 1) y = x^2$.",
        steps: [
          "$y_c = (c_1 + c_2 x) e^{-x}$.",
          "$y_p = (1 + D)^{-2} x^2 = (1 - 2D + 3 D^2 - \\cdots) x^2 = x^2 - 4 x + 6$.",
          "$$\\boxed{\\,y = (c_1 + c_2 x) e^{-x} + x^2 - 4 x + 6.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $(D^2 - 1) y = e^{2x}$.", answer: "$y = c_1 e^x + c_2 e^{-x} + \\tfrac{1}{3} e^{2x}.$" },
      { question: "Solve $(D^2 + 4) y = \\cos 2x$.", answer: "Resonance: $y = c_1\\cos 2x + c_2\\sin 2x + \\tfrac{x}{4}\\sin 2x.$" },
      { question: "Solve $(D^2 - 3 D + 2) y = e^x$.", answer: "Resonance: $y = c_1 e^x + c_2 e^{2x} - x e^x.$" },
      { question: "Solve $(D^2 + 1) y = x^3$.", answer: "$y = c_1\\cos x + c_2\\sin x + x^3 - 6 x.$" },
      { question: "Solve $(D^2 - 4 D + 4) y = e^{2x}/x^2$ (variation needed).", answer: "$y = (c_1 + c_2 x)e^{2x} - e^{2x}\\ln x.$" },
      { question: "Solve $(D^2 + 2 D + 5) y = e^{-x}\\cos 2x$.", answer: "$y = e^{-x}(c_1\\cos 2x + c_2\\sin 2x) + \\tfrac{x}{4} e^{-x}\\sin 2x.$" },
    ],
  },
  {
    unitId: "unit-2",
    chapterIndex: 3,
    title: "Method of Undetermined Coefficients",
    intro:
      "For constant-coefficient equations whose RHS is a polynomial, exponential, sine/cosine, or product of these, we guess $y_p$ with the same form and undetermined coefficients.",
    sections: [
      {
        heading: "Trial solutions",
        body: [
          "RHS $e^{a x}$ → trial $A e^{a x}$.",
          "RHS polynomial of degree $n$ → trial polynomial of degree $n$.",
          "RHS $\\sin a x$ or $\\cos a x$ → trial $A\\cos a x + B\\sin a x$.",
          "**Modification**: if the trial duplicates a term of $y_c$, multiply the trial by $x$ (or $x^2$, etc., as needed).",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $y'' - 3 y' + 2 y = 4 x + 3$.",
        steps: [
          "$y_c = c_1 e^{x} + c_2 e^{2x}$.",
          "Trial $y_p = A x + B$. Then $y_p'' - 3 y_p' + 2 y_p = -3 A + 2(Ax + B) = 2 A x + (2 B - 3 A)$.",
          "Match: $2 A = 4 \\Rightarrow A = 2$; $2 B - 6 = 3 \\Rightarrow B = 9/2$.",
          "$$\\boxed{\\,y = c_1 e^x + c_2 e^{2x} + 2 x + \\tfrac{9}{2}.\\,}$$",
        ],
      },
      {
        problem: "Solve $y'' + y = 4 \\cos x$ (resonance).",
        steps: [
          "$y_c = c_1\\cos x + c_2 \\sin x$. Standard trial duplicates; use $y_p = x(A\\cos x + B\\sin x)$.",
          "Compute $y_p'' = -2 A\\sin x + 2 B\\cos x - x(A\\cos x + B\\sin x)$.",
          "$y_p'' + y_p = -2 A\\sin x + 2 B\\cos x = 4 \\cos x \\Rightarrow A = 0,\\; B = 2$.",
          "$$\\boxed{\\,y = c_1\\cos x + c_2\\sin x + 2 x \\sin x.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $y'' - y = 6 x$.", answer: "$y = c_1 e^x + c_2 e^{-x} - 6 x.$" },
      { question: "Solve $y'' + 4 y = 8 \\sin 2 x$.", answer: "Resonance; $y = c_1\\cos 2x + c_2\\sin 2x - 2 x \\cos 2x.$" },
      { question: "Solve $y'' - 2 y' + y = e^{x}$.", answer: "Double resonance; $y = (c_1 + c_2 x)e^x + \\tfrac{x^2}{2} e^x.$" },
      { question: "Solve $y'' + 2 y' + 5 y = 10 \\cos x$.", answer: "$y = e^{-x}(c_1\\cos 2x + c_2\\sin 2x) + 2\\cos x + \\sin x.$" },
    ],
  },
  {
    unitId: "unit-2",
    chapterIndex: 4,
    title: "Variation of Parameters",
    intro:
      "When the RHS is not of the standard exponential/polynomial/trigonometric form (e.g. $\\tan x,\\, \\sec x,\\, \\ln x$), use variation of parameters. It always works for second-order linear ODEs.",
    sections: [
      {
        heading: "Formula",
        body: [
          "For $y'' + P(x) y' + Q(x) y = R(x)$ with $y_c = c_1 y_1 + c_2 y_2$:",
          "$$y_p = -y_1 \\int \\frac{y_2 R}{W}\\, dx + y_2 \\int \\frac{y_1 R}{W}\\, dx,$$ where $W = y_1 y_2' - y_2 y_1'$ is the Wronskian.",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $y'' + y = \\sec x$.",
        steps: [
          "$y_c = c_1\\cos x + c_2\\sin x$, so $y_1 = \\cos x,\\; y_2 = \\sin x,\\; W = 1$.",
          "$y_p = -\\cos x\\!\\int\\sin x\\sec x\\, dx + \\sin x\\!\\int\\cos x\\sec x\\, dx$.",
          "$= -\\cos x\\!\\int \\tan x\\, dx + \\sin x\\!\\int dx = -\\cos x\\,(-\\ln|\\cos x|) + x\\sin x$.",
          "$$\\boxed{\\,y = c_1\\cos x + c_2\\sin x + \\cos x\\,\\ln|\\cos x| + x\\sin x.\\,}$$",
        ],
      },
      {
        problem: "Solve $y'' - 2 y' + y = e^{x}/x$.",
        steps: [
          "$y_c = (c_1 + c_2 x) e^{x}$. Take $y_1 = e^{x},\\, y_2 = x e^{x}$. $W = e^{2x}$.",
          "$y_p = -e^{x}\\!\\int \\dfrac{x e^{x}\\cdot e^{x}/x}{e^{2x}} dx + x e^{x}\\!\\int \\dfrac{e^{x}\\cdot e^{x}/x}{e^{2x}} dx$.",
          "$= -e^{x}\\!\\int dx + x e^{x}\\!\\int \\dfrac{dx}{x} = -x e^{x} + x e^{x}\\ln|x|$.",
          "$$\\boxed{\\,y = (c_1 + c_2 x) e^x + x e^x (\\ln|x| - 1).\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $y'' + y = \\csc x$.", answer: "$y = c_1\\cos x + c_2\\sin x - x\\cos x + \\sin x\\,\\ln|\\sin x|.$" },
      { question: "Solve $y'' + y = \\tan x$.", answer: "$y = c_1\\cos x + c_2\\sin x - \\cos x\\,\\ln|\\sec x + \\tan x|.$" },
      { question: "Solve $y'' - 3 y' + 2 y = \\dfrac{1}{1 + e^{-x}}$.", answer: "Use $y_1 = e^x,\\, y_2 = e^{2x}$; sol $y = c_1 e^x + c_2 e^{2x} + (e^x + e^{2x})\\ln(1+e^{-x}).$" },
      { question: "Solve $y'' + 4 y = 4\\sec^2 2x$.", answer: "$y = c_1\\cos 2x + c_2\\sin 2x - 1 + \\sin 2x\\,\\ln|\\sec 2x + \\tan 2x|.$" },
    ],
  },
];