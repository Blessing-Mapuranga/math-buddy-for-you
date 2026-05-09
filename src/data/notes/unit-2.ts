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
          "**Step 1 — recall the test.** Three smooth functions are linearly independent on an interval iff their Wronskian $W$ is non-zero somewhere on it.",
          "**Step 2 — compute the derivatives.** $y_1' = e^{x},\\; y_2' = -e^{-x},\\; y_3' = 2 e^{2x};\\; y_1'' = e^{x},\\; y_2'' = e^{-x},\\; y_3'' = 4 e^{2x}.$",
          "**Step 3 — assemble the Wronskian.** $$W = \\begin{vmatrix} e^x & e^{-x} & e^{2x} \\\\ e^x & -e^{-x} & 2 e^{2x} \\\\ e^x & e^{-x} & 4 e^{2x} \\end{vmatrix}.$$",
          "**Step 4 — factor out** $e^{x}$ from column 1, $e^{-x}$ from column 2, $e^{2x}$ from column 3 (giving an overall factor $e^{x} \\cdot e^{-x} \\cdot e^{2x} = e^{2x}$): $$W = e^{2x}\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & -1 & 2 \\\\ 1 & 1 & 4 \\end{vmatrix}.$$",
          "**Step 5 — expand along the first row.** $1\\,(-1\\cdot 4 - 2\\cdot 1) - 1\\,(1\\cdot 4 - 2\\cdot 1) + 1\\,(1\\cdot 1 - (-1)\\cdot 1) = -6 - 2 + 2 = -6.$",
          "**Step 6 — conclude.** $W = -6\\, e^{2x},$ which is never $0$. Therefore the three functions are linearly independent.",
          "**Answer.** $$\\boxed{\\,W = -6\\, e^{2x} \\neq 0 \\Rightarrow \\{e^x, e^{-x}, e^{2x}\\}\\text{ are linearly independent}.\\,}$$",
        ],
      },
      {
        problem: "Verify $y = c_1 e^{x} + c_2 e^{-x}$ solves $y'' - y = 0$ and find the particular solution with $y(0)=2,\\; y'(0)=0$.",
        steps: [
          "**Step 1 — verify.** $y' = c_1 e^x - c_2 e^{-x},\\; y'' = c_1 e^x + c_2 e^{-x}.$ Hence $y'' - y = (c_1 e^x + c_2 e^{-x}) - (c_1 e^x + c_2 e^{-x}) = 0.$ ✓",
          "**Step 2 — apply $y(0) = 2$.** $c_1 + c_2 = 2.$",
          "**Step 3 — apply $y'(0) = 0$.** $c_1 - c_2 = 0,$ so $c_1 = c_2.$",
          "**Step 4 — solve the system.** $2 c_1 = 2 \\Rightarrow c_1 = 1,\\; c_2 = 1.$",
          "**Step 5 — write the particular solution** and recognise the hyperbolic cosine identity $e^x + e^{-x} = 2\\cosh x.$",
          "**Answer.** $$\\boxed{\\,y = e^x + e^{-x} = 2\\cosh x.\\,}$$",
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
          "**Step 1 — write the auxiliary equation** by replacing $y^{(k)}$ with $m^k$: $m^2 - 5 m + 6 = 0.$",
          "**Step 2 — factor.** $(m - 2)(m - 3) = 0 \\Rightarrow m = 2,\\; 3.$ Two distinct real roots.",
          "**Step 3 — assemble the general solution** using one $e^{m x}$ for each root.",
          "**Answer.** $$\\boxed{\\,y = c_1 e^{2x} + c_2 e^{3x}.\\,}$$",
        ],
      },
      {
        problem: "Solve $y'' + 4y' + 4y = 0$.",
        steps: [
          "**Step 1 — auxiliary equation.** $m^2 + 4 m + 4 = 0.$",
          "**Step 2 — factor.** $(m + 2)^2 = 0 \\Rightarrow m = -2$ with multiplicity $2$.",
          "**Step 3 — repeated-root rule.** A repeated root of multiplicity $2$ contributes $(c_1 + c_2 x) e^{m x}.$",
          "**Answer.** $$\\boxed{\\,y = (c_1 + c_2 x)\\, e^{-2 x}.\\,}$$",
        ],
      },
      {
        problem: "Solve $y'' + 2y' + 5y = 0$.",
        steps: [
          "**Step 1 — auxiliary equation.** $m^2 + 2 m + 5 = 0.$",
          "**Step 2 — quadratic formula.** $m = \\dfrac{-2 \\pm \\sqrt{4 - 20}}{2} = \\dfrac{-2 \\pm 4 i}{2} = -1 \\pm 2 i.$ Complex roots $\\alpha \\pm i \\beta$ with $\\alpha = -1,\\; \\beta = 2.$",
          "**Step 3 — complex-roots rule.** Contribution is $e^{\\alpha x}(c_1 \\cos\\beta x + c_2 \\sin\\beta x).$",
          "**Answer.** $$\\boxed{\\,y = e^{-x}\\bigl(c_1 \\cos 2 x + c_2 \\sin 2 x\\bigr).\\,}$$",
        ],
      },
      {
        problem: "Solve $y^{(4)} - 2 y'' + y = 0$.",
        steps: [
          "**Step 1 — auxiliary equation.** $m^4 - 2 m^2 + 1 = 0.$",
          "**Step 2 — recognise it as $(m^2 - 1)^2 = 0$**, so $m^2 = 1$ with multiplicity 2 each.",
          "**Step 3 — extract roots.** $m = +1$ (double) and $m = -1$ (double).",
          "**Step 4 — build the general solution** using the repeated-root rule for each pair.",
          "**Answer.** $$\\boxed{\\,y = (c_1 + c_2 x)\\, e^{x} + (c_3 + c_4 x)\\, e^{-x}.\\,}$$",
        ],
      },
      {
        problem: "Solve $y''' - 3 y'' + 4 y = 0$.",
        steps: [
          "**Step 1 — auxiliary equation.** $m^3 - 3 m^2 + 4 = 0.$",
          "**Step 2 — search for a rational root** among $\\pm 1, \\pm 2, \\pm 4.$ Try $m = -1$: $(-1)^3 - 3(1) + 4 = -1 - 3 + 4 = 0.$ ✓",
          "**Step 3 — factor out $(m + 1)$** by polynomial division: $m^3 - 3 m^2 + 4 = (m + 1)(m^2 - 4 m + 4).$",
          "**Step 4 — factor the quadratic.** $m^2 - 4 m + 4 = (m - 2)^2.$ So roots are $m = -1$ (simple) and $m = 2$ (double).",
          "**Step 5 — assemble** using the simple-root and repeated-root rules.",
          "**Answer.** $$\\boxed{\\,y = c_1 e^{-x} + (c_2 + c_3 x)\\, e^{2 x}.\\,}$$",
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
          "**Step 1 — complementary function.** Aux: $m^2 - 5 m + 6 = 0 \\Rightarrow (m-2)(m-3) = 0 \\Rightarrow m = 2,3.$ So $y_c = c_1 e^{2x} + c_2 e^{3x}.$",
          "**Step 2 — particular integral.** With $\\phi(D) = D^2 - 5 D + 6$ and RHS $e^{a x}$ with $a = 4$, apply the **exponential rule** $\\dfrac{1}{\\phi(D)} e^{a x} = \\dfrac{e^{a x}}{\\phi(a)}$ provided $\\phi(a)\\neq 0.$",
          "**Step 3 — evaluate $\\phi(4)$.** $\\phi(4) = 16 - 20 + 6 = 2 \\neq 0.$",
          "**Step 4 — write $y_p$.** $y_p = \\dfrac{e^{4 x}}{2}.$",
          "**Step 5 — combine** $y = y_c + y_p$.",
          "**Answer.** $$\\boxed{\\,y = c_1 e^{2 x} + c_2 e^{3 x} + \\tfrac{1}{2} e^{4 x}.\\,}$$",
        ],
      },
      {
        problem: "Solve $(D^2 + 4) y = \\sin 3 x$.",
        steps: [
          "**Step 1 — complementary function.** Aux $m^2 + 4 = 0 \\Rightarrow m = \\pm 2 i \\Rightarrow y_c = c_1 \\cos 2 x + c_2 \\sin 2 x.$",
          "**Step 2 — sine rule.** For $\\dfrac{1}{\\phi(D^2)} \\sin a x$, replace $D^2$ by $-a^2.$ Here $\\phi(D^2) = D^2 + 4$ and $a = 3$, so replace $D^2 \\to -9$.",
          "**Step 3 — evaluate.** $y_p = \\dfrac{\\sin 3 x}{-9 + 4} = -\\dfrac{\\sin 3 x}{5}.$",
          "**Answer.** $$\\boxed{\\,y = c_1 \\cos 2 x + c_2 \\sin 2 x - \\tfrac{1}{5}\\sin 3 x.\\,}$$",
        ],
      },
      {
        problem: "Resonance case: solve $(D^2 + 1) y = \\cos x$.",
        steps: [
          "**Step 1 — complementary function.** $m^2 + 1 = 0 \\Rightarrow m = \\pm i \\Rightarrow y_c = c_1 \\cos x + c_2 \\sin x.$",
          "**Step 2 — try the sine/cosine rule.** Replace $D^2 \\to -1$: $\\phi(-1) = -1 + 1 = 0.$ Direct rule fails — this is **resonance**.",
          "**Step 3 — switch to the complex form.** $\\cos x = \\Re\\, e^{i x}$, so $y_p = \\Re\\, \\dfrac{1}{D^2 + 1} e^{i x}.$",
          "**Step 4 — apply the failure rule** $\\dfrac{1}{\\phi(D)} e^{a x} = x\\cdot\\dfrac{1}{\\phi'(D)} e^{a x}\\Big|_{D = a}$ with $\\phi(D) = D^2 + 1,\\;\\phi'(D) = 2 D,\\; a = i$: $$y_p = \\Re\\!\\left(x\\cdot\\dfrac{e^{i x}}{2 i}\\right).$$",
          "**Step 5 — simplify.** $\\dfrac{e^{i x}}{2 i} = \\dfrac{\\cos x + i \\sin x}{2 i} = \\dfrac{\\sin x - i \\cos x}{2}.$ Multiply by $x$ and take the real part: $y_p = \\dfrac{x \\sin x}{2}.$",
          "**Answer.** $$\\boxed{\\,y = c_1 \\cos x + c_2 \\sin x + \\tfrac{x}{2}\\sin x.\\,}$$",
        ],
      },
      {
        problem: "Solve $(D^2 - 2 D + 1) y = x e^{x}$.",
        steps: [
          "**Step 1 — complementary function.** $m^2 - 2 m + 1 = (m - 1)^2 = 0 \\Rightarrow m = 1$ double, so $y_c = (c_1 + c_2 x) e^{x}.$",
          "**Step 2 — apply the shift rule** $\\dfrac{1}{\\phi(D)} e^{a x} V(x) = e^{a x}\\dfrac{1}{\\phi(D + a)} V(x)$ with $a = 1,\\; V = x$: $$y_p = e^{x}\\dfrac{1}{(D + 1)^2 - 2(D + 1) + 1} x = e^{x}\\dfrac{1}{D^2} x.$$",
          "**Step 3 — invert $D^2$ by integrating twice.** $\\dfrac{1}{D} x = \\dfrac{x^2}{2},\\; \\dfrac{1}{D^2} x = \\dfrac{x^3}{6}.$",
          "**Step 4 — combine.** $y_p = \\dfrac{x^3}{6} e^{x}.$",
          "**Answer.** $$\\boxed{\\,y = (c_1 + c_2 x)\\, e^{x} + \\tfrac{x^3}{6}\\, e^{x}.\\,}$$",
        ],
      },
      {
        problem: "Solve $(D^2 + 2 D + 1) y = x^2$.",
        steps: [
          "**Step 1 — complementary function.** $m^2 + 2 m + 1 = (m + 1)^2 = 0 \\Rightarrow m = -1$ double, so $y_c = (c_1 + c_2 x) e^{-x}.$",
          "**Step 2 — write $\\phi(D) = (1 + D)^2.$** Then $y_p = (1 + D)^{-2} x^2.$",
          "**Step 3 — binomial-series expansion.** $(1 + D)^{-2} = 1 - 2 D + 3 D^2 - 4 D^3 + \\cdots$ (terms with $D^3$ and higher annihilate $x^2$).",
          "**Step 4 — apply to $x^2$.** $D x^2 = 2 x,\\; D^2 x^2 = 2.$ So $y_p = x^2 - 2(2 x) + 3(2) = x^2 - 4 x + 6.$",
          "**Answer.** $$\\boxed{\\,y = (c_1 + c_2 x)\\, e^{-x} + x^2 - 4 x + 6.\\,}$$",
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
          "**Step 1 — complementary function.** Aux $m^2 - 3 m + 2 = (m-1)(m-2) = 0 \\Rightarrow y_c = c_1 e^{x} + c_2 e^{2 x}.$",
          "**Step 2 — choose a trial.** RHS is a degree-1 polynomial and no constant or linear function is in $y_c$, so try $y_p = A x + B.$",
          "**Step 3 — compute derivatives.** $y_p' = A,\\; y_p'' = 0.$",
          "**Step 4 — substitute into the ODE.** $0 - 3 A + 2(A x + B) = 2 A x + (2 B - 3 A).$",
          "**Step 5 — match coefficients with $4 x + 3$.** Coefficient of $x$: $2 A = 4 \\Rightarrow A = 2.$ Constant term: $2 B - 3 A = 3 \\Rightarrow 2 B = 9 \\Rightarrow B = \\tfrac{9}{2}.$",
          "**Answer.** $$\\boxed{\\,y = c_1 e^{x} + c_2 e^{2 x} + 2 x + \\tfrac{9}{2}.\\,}$$",
        ],
      },
      {
        problem: "Solve $y'' + y = 4 \\cos x$ (resonance).",
        steps: [
          "**Step 1 — complementary function.** Aux $m^2 + 1 = 0 \\Rightarrow m = \\pm i \\Rightarrow y_c = c_1 \\cos x + c_2 \\sin x.$",
          "**Step 2 — detect resonance.** Standard trial $A\\cos x + B\\sin x$ duplicates terms in $y_c$, so multiply by $x$: $y_p = x(A\\cos x + B\\sin x).$",
          "**Step 3 — first derivative** (product rule): $y_p' = (A\\cos x + B\\sin x) + x(-A\\sin x + B\\cos x).$",
          "**Step 4 — second derivative.** $y_p'' = 2(-A\\sin x + B\\cos x) + x(-A\\cos x - B\\sin x) = -2 A \\sin x + 2 B \\cos x - x(A\\cos x + B\\sin x).$",
          "**Step 5 — substitute.** $y_p'' + y_p = -2 A \\sin x + 2 B \\cos x.$ The $x$-terms cancel.",
          "**Step 6 — match with $4\\cos x$.** $-2 A = 0 \\Rightarrow A = 0;\\; 2 B = 4 \\Rightarrow B = 2.$",
          "**Answer.** $$\\boxed{\\,y = c_1 \\cos x + c_2 \\sin x + 2 x \\sin x.\\,}$$",
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
          "**Step 1 — complementary function.** Aux $m^2 + 1 = 0 \\Rightarrow y_c = c_1 \\cos x + c_2 \\sin x.$ Take $y_1 = \\cos x,\\; y_2 = \\sin x.$",
          "**Step 2 — Wronskian.** $W = y_1 y_2' - y_2 y_1' = \\cos x \\cdot \\cos x - \\sin x \\cdot (-\\sin x) = \\cos^2 x + \\sin^2 x = 1.$",
          "**Step 3 — write the formula** $y_p = -y_1 \\!\\int \\dfrac{y_2 R}{W}\\, dx + y_2 \\!\\int \\dfrac{y_1 R}{W}\\, dx$ with $R = \\sec x$: $$y_p = -\\cos x\\!\\int \\sin x \\sec x\\, dx + \\sin x\\!\\int \\cos x \\sec x\\, dx.$$",
          "**Step 4 — evaluate the integrals.** $\\sin x \\sec x = \\tan x$, so $\\int \\tan x\\, dx = -\\ln|\\cos x|.$ And $\\cos x \\sec x = 1$, so $\\int 1\\, dx = x.$",
          "**Step 5 — assemble $y_p$.** $y_p = -\\cos x \\,(-\\ln|\\cos x|) + \\sin x \\cdot x = \\cos x \\ln|\\cos x| + x \\sin x.$",
          "**Answer.** $$\\boxed{\\,y = c_1 \\cos x + c_2 \\sin x + \\cos x \\ln|\\cos x| + x \\sin x.\\,}$$",
        ],
      },
      {
        problem: "Solve $y'' - 2 y' + y = e^{x}/x$.",
        steps: [
          "**Step 1 — complementary function.** $m^2 - 2 m + 1 = (m-1)^2 \\Rightarrow y_c = (c_1 + c_2 x)e^{x}.$ Take $y_1 = e^{x},\\; y_2 = x e^{x}.$",
          "**Step 2 — Wronskian.** $y_2' = e^{x} + x e^{x} = (1 + x) e^{x}.$ $W = e^{x}(1+x)e^{x} - x e^{x}\\cdot e^{x} = e^{2 x}.$",
          "**Step 3 — write the formula** with $R = e^{x}/x$: $$y_p = -e^{x}\\!\\int \\dfrac{x e^{x}\\cdot e^{x}/x}{e^{2 x}}\\, dx + x e^{x}\\!\\int \\dfrac{e^{x}\\cdot e^{x}/x}{e^{2 x}}\\, dx.$$",
          "**Step 4 — simplify the integrands.** First fraction: $\\dfrac{x e^{2 x}/x}{e^{2 x}} = 1.$ Second fraction: $\\dfrac{e^{2 x}/x}{e^{2 x}} = \\dfrac{1}{x}.$",
          "**Step 5 — integrate.** $\\int 1\\, dx = x;\\; \\int \\tfrac{1}{x}\\, dx = \\ln|x|.$",
          "**Step 6 — combine.** $y_p = -e^{x} \\cdot x + x e^{x} \\ln|x| = x e^{x}(\\ln|x| - 1).$",
          "**Answer.** $$\\boxed{\\,y = (c_1 + c_2 x)\\, e^{x} + x e^{x}(\\ln|x| - 1).\\,}$$",
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