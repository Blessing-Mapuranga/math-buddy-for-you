import type { ChapterNotes } from "./types";

export const unit1Notes: ChapterNotes[] = [
  {
    unitId: "unit-1",
    chapterIndex: 0,
    title: "Introduction to ODEs",
    intro:
      "An ordinary differential equation (ODE) relates an unknown function of one independent variable with its derivatives. ODEs model a wide variety of engineering problems including motion, growth, decay, electric circuits and heat flow.",
    sections: [
      {
        heading: "Definition",
        body: [
          "An equation of the form $$F\\left(x,\\, y,\\, \\tfrac{dy}{dx},\\, \\tfrac{d^2y}{dx^2},\\, \\ldots,\\, \\tfrac{d^n y}{dx^n}\\right) = 0$$ is called an ordinary differential equation of order $n$.",
          "The **order** is the order of the highest derivative present. The **degree** is the highest power of the highest-order derivative when the equation is rationalised and free from radicals.",
        ],
      },
      {
        heading: "Linear vs Non-linear",
        body: [
          "An ODE is **linear** if the dependent variable $y$ and all its derivatives appear to the first power and are not multiplied together. Otherwise it is **non-linear**.",
          "General linear $n$-th order form: $$a_n(x)\\, y^{(n)} + a_{n-1}(x)\\, y^{(n-1)} + \\cdots + a_1(x)\\, y' + a_0(x)\\, y = f(x).$$",
        ],
      },
      {
        heading: "Solutions",
        body: [
          "A **general solution** of an $n$-th order ODE contains $n$ arbitrary constants. A **particular solution** is obtained by assigning specific values (using initial / boundary conditions). A **singular solution** is one that cannot be obtained from the general solution.",
          "Geometrically, the general solution represents a family of curves; each particular solution is one curve of the family.",
        ],
      },
      {
        heading: "Formation of an ODE",
        body: [
          "Given a family of curves with $n$ arbitrary constants, the corresponding ODE is obtained by differentiating $n$ times and eliminating the constants.",
        ],
      },
    ],
    examples: [
      {
        problem: "Find the order and degree of $$\\left(\\frac{d^2y}{dx^2}\\right)^3 + 4\\left(\\frac{dy}{dx}\\right)^2 + y = \\sin x.$$",
        steps: [
          "**Step 1 — identify the highest derivative.** Scan the equation: the derivatives present are $\\dfrac{dy}{dx}$ and $\\dfrac{d^2y}{dx^2}$. The highest one is $\\dfrac{d^2y}{dx^2}$, so the **order = 2**.",
          "**Step 2 — check that the equation is polynomial in the derivatives.** No radicals, no fractional powers of derivatives — the equation is already polynomial in $\\dfrac{d^2y}{dx^2}$ and $\\dfrac{dy}{dx}$.",
          "**Step 3 — read off the power of the highest-order derivative.** $\\dfrac{d^2y}{dx^2}$ appears as $\\left(\\dfrac{d^2y}{dx^2}\\right)^3$, so the **degree = 3**.",
          "**Answer.** $$\\boxed{\\,\\text{Order} = 2,\\quad \\text{Degree} = 3.\\,}$$",
        ],
      },
      {
        problem: "Form the ODE whose general solution is $y = A\\cos x + B\\sin x$.",
        steps: [
          "**Step 1 — count the arbitrary constants.** There are two ($A$ and $B$), so we must differentiate twice and eliminate them.",
          "**Step 2 — first derivative.** $\\dfrac{dy}{dx} = -A\\sin x + B\\cos x.$",
          "**Step 3 — second derivative.** $\\dfrac{d^2 y}{dx^2} = -A\\cos x - B\\sin x.$",
          "**Step 4 — eliminate $A$ and $B$.** The right-hand side equals $-(A\\cos x + B\\sin x) = -y$.",
          "**Step 5 — write the ODE.** $$\\boxed{\\,y'' + y = 0.\\,}$$",
        ],
      },
      {
        problem: "Form the ODE of the family $y = c\\, e^{2x}$.",
        steps: [
          "**Step 1 — only one constant**, so differentiate once.",
          "**Step 2 — differentiate.** $\\dfrac{dy}{dx} = 2 c\\, e^{2x}.$",
          "**Step 3 — eliminate $c$.** Notice $c\\, e^{2x} = y$, so $\\dfrac{dy}{dx} = 2 y$.",
          "**Answer.** $$\\boxed{\\,y' - 2 y = 0.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "State the order and degree of $\\sqrt{1+\\left(\\dfrac{dy}{dx}\\right)^2} = \\dfrac{d^2y}{dx^2}$.", answer: "Order $2$, degree $2$ (after squaring)." },
      { question: "Form the ODE of the family $y = ax^2 + bx$.", answer: "$x^2 y'' - 2x y' + 2y = 0$." },
      { question: "Verify that $y = e^{-x}$ is a solution of $y'' + y' = 0$.", answer: "$y' = -e^{-x},\\, y'' = e^{-x}$, so $y'' + y' = 0$. ✓" },
    ],
  },
  {
    unitId: "unit-1",
    chapterIndex: 1,
    title: "Variable Separable & Homogeneous Equations",
    intro:
      "Two of the most fundamental classes of first-order ODEs: those whose variables can be separated by simple algebra, and those that become separable after the substitution $y = vx$.",
    sections: [
      {
        heading: "Variable separable form",
        body: [
          "If a first-order ODE can be written as $$\\frac{dy}{dx} = f(x)\\, g(y),$$ then it is variable separable. Rearrange and integrate: $$\\int \\frac{dy}{g(y)} = \\int f(x)\\, dx + C.$$",
        ],
      },
      {
        heading: "Homogeneous equations",
        body: [
          "A function $f(x,y)$ is **homogeneous of degree $n$** if $f(tx, ty) = t^n f(x,y)$. A first-order ODE $\\dfrac{dy}{dx} = \\dfrac{M(x,y)}{N(x,y)}$ is homogeneous if $M$ and $N$ are homogeneous of the same degree.",
          "Substitute $y = v x$, so $\\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}$. The equation reduces to a separable form in $v$ and $x$.",
        ],
      },
      {
        heading: "Equations reducible to homogeneous",
        body: [
          "Equations of the form $$\\frac{dy}{dx} = \\frac{a_1 x + b_1 y + c_1}{a_2 x + b_2 y + c_2}$$ become homogeneous via the shift $x = X + h,\\; y = Y + k$, where $(h,k)$ is chosen so that $a_1 h + b_1 k + c_1 = 0$ and $a_2 h + b_2 k + c_2 = 0$ (provided $a_1 b_2 \\neq a_2 b_1$).",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $\\dfrac{dy}{dx} = \\dfrac{x(1+y^2)}{y(1+x^2)}$.",
        steps: [
          "**Step 1 — recognise the type.** The RHS is a product of a function of $x$ and a function of $y$, so the equation is **variable separable**.",
          "**Step 2 — separate.** Multiply both sides by $\\dfrac{y}{1+y^2}\\, dx$ to put $y$-terms on the left and $x$-terms on the right: $$\\dfrac{y\\, dy}{1+y^2} = \\dfrac{x\\, dx}{1+x^2}.$$",
          "**Step 3 — integrate both sides.** Each side is of the form $\\int \\dfrac{u'}{u}\\, du = \\ln|u|$ (with an extra $\\tfrac12$ from the inner derivative): $$\\tfrac{1}{2}\\ln(1+y^2) = \\tfrac{1}{2}\\ln(1+x^2) + C_1.$$",
          "**Step 4 — simplify.** Multiply by $2$, then exponentiate: $\\ln(1+y^2) - \\ln(1+x^2) = 2 C_1 \\Rightarrow \\dfrac{1+y^2}{1+x^2} = e^{2 C_1} = C.$",
          "**Answer.** $$\\boxed{\\,1 + y^2 = C\\,(1 + x^2),\\quad C = e^{2 C_1}.\\,}$$",
        ],
      },
      {
        problem: "Solve $(x^2 + y^2)\\, dx - 2xy\\, dy = 0$.",
        steps: [
          "**Step 1 — test for homogeneity.** $M = x^2+y^2$ and $N = -2xy$ are both polynomials of degree $2$, so the equation is **homogeneous**.",
          "**Step 2 — apply the standard substitution** $y = v x$. Then $dy = v\\, dx + x\\, dv.$",
          "**Step 3 — substitute and simplify.** $(x^2 + v^2 x^2)\\, dx - 2 x (v x)(v\\, dx + x\\, dv) = 0 \\Rightarrow x^2(1 + v^2 - 2 v^2)\\, dx = 2 v x^3\\, dv,$ i.e. $x^2(1 - v^2)\\, dx = 2 v x^3\\, dv.$",
          "**Step 4 — separate.** Divide by $x^3 (1 - v^2)$: $$\\dfrac{dx}{x} = \\dfrac{2 v\\, dv}{1 - v^2}.$$",
          "**Step 5 — integrate.** The RHS is $-\\dfrac{d(1 - v^2)}{1 - v^2}$, so $\\ln|x| = -\\ln|1 - v^2| + C_1 \\Rightarrow x(1 - v^2) = C.$",
          "**Step 6 — back-substitute** $v = y/x$: $x\\!\\left(1 - \\dfrac{y^2}{x^2}\\right) = C \\Rightarrow \\dfrac{x^2 - y^2}{x} = C.$",
          "**Answer.** $$\\boxed{\\,x^2 - y^2 = C\\, x.\\,}$$",
        ],
      },
      {
        problem: "Solve $\\dfrac{dy}{dx} = \\dfrac{x + 2y - 3}{2x + y - 3}$.",
        steps: [
          "**Step 1 — recognise the type.** RHS is a ratio of two linear expressions whose constant terms are non-zero, so we shift the origin to make it homogeneous.",
          "**Step 2 — find the shift $(h,k)$.** Solve the system $\\,h + 2 k - 3 = 0,\\; 2 h + k - 3 = 0.\\,$ Subtract: $h - k = 0 \\Rightarrow h = k$. Substitute back: $3 h = 3 \\Rightarrow h = 1,\\; k = 1.$",
          "**Step 3 — change variables** $x = X + 1,\\; y = Y + 1$. The constants disappear: $$\\dfrac{dY}{dX} = \\dfrac{X + 2 Y}{2 X + Y}.$$",
          "**Step 4 — solve the homogeneous equation** by $Y = v X,\\; \\dfrac{dY}{dX} = v + X\\dfrac{dv}{dX}$: $$v + X\\dfrac{dv}{dX} = \\dfrac{1 + 2 v}{2 + v}.$$",
          "**Step 5 — isolate the $v$-derivative.** $X\\dfrac{dv}{dX} = \\dfrac{1 + 2 v}{2 + v} - v = \\dfrac{1 + 2 v - v(2 + v)}{2 + v} = \\dfrac{1 - v^2}{2 + v}.$",
          "**Step 6 — separate.** $\\dfrac{(2 + v)\\, dv}{1 - v^2} = \\dfrac{dX}{X}.$",
          "**Step 7 — partial fractions** for the LHS: $\\dfrac{2+v}{(1-v)(1+v)} = \\dfrac{3/2}{1-v} - \\dfrac{1/2}{1+v}.$",
          "**Step 8 — integrate.** $-\\tfrac{3}{2}\\ln|1-v| - \\tfrac{1}{2}\\ln|1+v| = \\ln|X| + C_1.$ Multiply by $-2$ and exponentiate: $(1-v)^3 (1+v) = \\dfrac{C'}{X^2}.$",
          "**Step 9 — restore variables.** Use $v = Y/X$, multiply through by $X^4$, and put $X = x - 1,\\; Y = y - 1$.",
          "**Answer.** $$\\boxed{\\,(X - Y)^3 (X + Y) = C,\\quad X = x - 1,\\; Y = y - 1.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $\\dfrac{dy}{dx} = e^{x-y}$.", answer: "$e^y = e^x + C$." },
      { question: "Solve $(x^2 - y^2)\\, dy = 2xy\\, dx$.", answer: "$x^2 + y^2 = C y$." },
      { question: "Solve $\\dfrac{dy}{dx} = \\dfrac{2x + y + 1}{4x + 2y - 1}$.", answer: "$\\,3(2x+y) - \\ln|6x + 3y - 2| = x + C.$" },
    ],
  },
  {
    unitId: "unit-1",
    chapterIndex: 2,
    title: "Exact Equations and Integrating Factors",
    intro:
      "An equation $M(x,y)\\, dx + N(x,y)\\, dy = 0$ is exact when it is the total differential of some function $u(x,y)$. When it is not exact, an integrating factor can sometimes make it so.",
    sections: [
      {
        heading: "Exactness criterion",
        body: [
          "$M\\, dx + N\\, dy = 0$ is exact iff $$\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}.$$",
          "When exact, there exists $u(x,y)$ with $u_x = M$ and $u_y = N$, and the solution is $u(x,y) = C$.",
        ],
      },
      {
        heading: "Solution recipe",
        body: [
          "1. Integrate $M$ with respect to $x$: $u = \\int M\\, dx + g(y)$.",
          "2. Differentiate with respect to $y$ and equate to $N$ to find $g(y)$.",
          "3. Write $u(x,y) = C$.",
        ],
      },
      {
        heading: "Standard integrating factors (IF)",
        body: [
          "If $\\dfrac{1}{N}\\!\\left(M_y - N_x\\right) = f(x)$ depends on $x$ only, then $\\mathrm{IF} = e^{\\int f(x)\\, dx}$.",
          "If $\\dfrac{1}{M}\\!\\left(N_x - M_y\\right) = g(y)$ depends on $y$ only, then $\\mathrm{IF} = e^{\\int g(y)\\, dy}$.",
          "If $M = y\\, f_1(xy),\\; N = x\\, f_2(xy)$ and $Mx - Ny \\neq 0$, then $\\mathrm{IF} = \\dfrac{1}{Mx - Ny}$.",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $(2xy + y^2)\\, dx + (x^2 + 2xy)\\, dy = 0$.",
        steps: [
          "**Step 1 — identify $M$ and $N$.** $M = 2 x y + y^2,\\; N = x^2 + 2 x y.$",
          "**Step 2 — test exactness.** $M_y = 2 x + 2 y,\\; N_x = 2 x + 2 y.$ Since $M_y = N_x$, the equation **is exact**.",
          "**Step 3 — integrate $M$ with respect to $x$**, treating $y$ as a constant: $u = \\int (2 x y + y^2)\\, dx = x^2 y + x y^2 + g(y),$ where $g(y)$ absorbs the missing $y$-only terms.",
          "**Step 4 — find $g(y)$.** Differentiate $u$ wrt $y$ and set equal to $N$: $u_y = x^2 + 2 x y + g'(y) \\stackrel{!}{=} x^2 + 2 x y \\Rightarrow g'(y) = 0 \\Rightarrow g(y) = \\text{const}.$",
          "**Step 5 — write the solution** $u(x,y) = C$.",
          "**Answer.** $$\\boxed{\\,x^2 y + x y^2 = C.\\,}$$",
        ],
      },
      {
        problem: "Solve $(x^2 + y^2 + x)\\, dx + xy\\, dy = 0$.",
        steps: [
          "**Step 1 — identify $M, N$ and test.** $M = x^2 + y^2 + x,\\; N = x y$. $M_y = 2 y,\\; N_x = y.$ Since $M_y \\neq N_x$, the equation is **not exact**.",
          "**Step 2 — search for an integrating factor.** Compute $\\dfrac{M_y - N_x}{N} = \\dfrac{2 y - y}{x y} = \\dfrac{1}{x}.$ This depends on $x$ alone, so an IF depending on $x$ exists.",
          "**Step 3 — build the IF.** $\\mathrm{IF} = e^{\\int (1/x)\\, dx} = e^{\\ln x} = x.$",
          "**Step 4 — multiply through by $x$.** $(x^3 + x y^2 + x^2)\\, dx + x^2 y\\, dy = 0.$ Now $M_y = 2 x y = N_x$, so the new equation is exact.",
          "**Step 5 — integrate the new $M$ wrt $x$.** $u = \\int (x^3 + x y^2 + x^2)\\, dx = \\tfrac{x^4}{4} + \\tfrac{x^2 y^2}{2} + \\tfrac{x^3}{3} + g(y).$",
          "**Step 6 — match with new $N$.** $u_y = x^2 y + g'(y) \\stackrel{!}{=} x^2 y \\Rightarrow g'(y) = 0.$",
          "**Answer.** $$\\boxed{\\,\\tfrac{x^4}{4} + \\tfrac{x^2 y^2}{2} + \\tfrac{x^3}{3} = C.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $(3x^2 + 6xy^2)\\, dx + (6x^2 y + 4y^3)\\, dy = 0$.", answer: "$x^3 + 3x^2 y^2 + y^4 = C.$" },
      { question: "Solve $y(2x - y + 1)\\, dx + x(3x - 4y + 3)\\, dy = 0$.", answer: "Use IF $= x^2 y$; sol: $x^3 y(2x - 2y + 1) - x^2 y^2 = C.$" },
    ],
  },
  {
    unitId: "unit-1",
    chapterIndex: 3,
    title: "Linear & Bernoulli Equations",
    intro:
      "Linear first-order ODEs are solved with an integrating factor; Bernoulli equations are reduced to linear form by a power substitution.",
    sections: [
      {
        heading: "Linear first-order ODE",
        body: [
          "Standard form: $$\\frac{dy}{dx} + P(x)\\, y = Q(x).$$",
          "Integrating factor: $\\mathrm{IF} = e^{\\int P(x)\\, dx}$. Multiply through to get $\\dfrac{d}{dx}\\!\\left(y\\cdot \\mathrm{IF}\\right) = Q(x)\\cdot \\mathrm{IF}$.",
          "General solution: $$y \\cdot \\mathrm{IF} = \\int Q(x)\\, \\mathrm{IF}\\; dx + C.$$",
        ],
      },
      {
        heading: "Bernoulli equation",
        body: [
          "Form $\\dfrac{dy}{dx} + P(x)\\, y = Q(x)\\, y^n$, $n \\neq 0, 1$.",
          "Divide by $y^n$ and substitute $v = y^{1-n}$, so $\\dfrac{dv}{dx} = (1-n)\\, y^{-n}\\, \\dfrac{dy}{dx}$.",
          "The equation becomes linear: $\\dfrac{dv}{dx} + (1-n)\\, P(x)\\, v = (1-n)\\, Q(x)$.",
        ],
      },
    ],
    examples: [
      {
        problem: "Solve $\\dfrac{dy}{dx} + 2y = e^{-x}$.",
        steps: [
          "**Step 1 — identify $P$ and $Q$.** Already in standard linear form $y' + P y = Q$ with $P(x) = 2,\\; Q(x) = e^{-x}$.",
          "**Step 2 — compute the integrating factor.** $\\mathrm{IF} = e^{\\int P\\, dx} = e^{2 x}.$",
          "**Step 3 — multiply through.** $e^{2x} y' + 2 e^{2x} y = e^{2x} \\cdot e^{-x} = e^{x},$ which is exactly $\\dfrac{d}{dx}(y\\, e^{2x}) = e^{x}.$",
          "**Step 4 — integrate both sides.** $y\\, e^{2x} = \\int e^{x}\\, dx + C = e^{x} + C.$",
          "**Step 5 — solve for $y$.** Divide by $e^{2x}$.",
          "**Answer.** $$\\boxed{\\,y = e^{-x} + C\\, e^{-2x}.\\,}$$",
        ],
      },
      {
        problem: "Solve $x\\dfrac{dy}{dx} + y = x^3 y^6$.",
        steps: [
          "**Step 1 — put in standard form.** Divide by $x$: $\\dfrac{dy}{dx} + \\dfrac{1}{x} y = x^2 y^6.$ This is **Bernoulli** with $n = 6.$",
          "**Step 2 — divide by $y^n = y^6$** to set up the substitution: $y^{-6}\\, y' + \\dfrac{1}{x}\\, y^{-5} = x^2.$",
          "**Step 3 — substitute $v = y^{1-n} = y^{-5}$.** Then $\\dfrac{dv}{dx} = -5\\, y^{-6}\\, y' \\Rightarrow y^{-6} y' = -\\tfrac{1}{5} v'.$",
          "**Step 4 — write the linear equation in $v$.** $-\\tfrac{1}{5} v' + \\tfrac{1}{x} v = x^2 \\;\\Rightarrow\\; v' - \\tfrac{5}{x} v = -5 x^2.$",
          "**Step 5 — integrating factor.** $\\mathrm{IF} = e^{\\int -5/x\\, dx} = e^{-5 \\ln x} = x^{-5}.$",
          "**Step 6 — integrate.** $\\dfrac{d}{dx}(v\\, x^{-5}) = -5 x^{-3} \\Rightarrow v\\, x^{-5} = \\int -5 x^{-3}\\, dx = \\tfrac{5}{2} x^{-2} + C.$",
          "**Step 7 — solve for $v$ then back-substitute.** $v = \\tfrac{5}{2} x^{3} + C\\, x^{5},$ and $v = y^{-5}$.",
          "**Answer.** $$\\boxed{\\,\\dfrac{1}{y^5} = \\tfrac{5}{2}\\, x^{3} + C\\, x^{5}.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Solve $\\dfrac{dy}{dx} - \\dfrac{y}{x} = x^2$.", answer: "$y = \\tfrac{x^3}{2} + Cx.$" },
      { question: "Solve $\\dfrac{dy}{dx} + y\\tan x = \\sec x$.", answer: "$y\\sec x = \\tan x + C.$" },
      { question: "Solve $\\dfrac{dy}{dx} + \\dfrac{y}{x} = y^2 \\ln x$.", answer: "Bernoulli, $n=2$: $\\tfrac{1}{y}\\cdot x = -\\int x \\ln x\\, dx + C = -\\tfrac{x^2}{2}\\ln x + \\tfrac{x^2}{4} + C.$" },
    ],
  },
  {
    unitId: "unit-1",
    chapterIndex: 4,
    title: "Applications of First-Order ODEs",
    intro:
      "First-order ODEs model exponential growth/decay, Newton's law of cooling, RL/RC electrical circuits, mixing problems and orthogonal trajectories.",
    sections: [
      {
        heading: "Newton's law of cooling",
        body: [
          "$$\\frac{dT}{dt} = -k\\,(T - T_a),$$ where $T_a$ is ambient temperature and $k > 0$. Solution: $T(t) = T_a + (T_0 - T_a) e^{-k t}$.",
        ],
      },
      {
        heading: "RL circuit",
        body: [
          "Kirchhoff's voltage law: $L\\dfrac{di}{dt} + R\\, i = E(t)$.",
          "For constant EMF $E$: $$i(t) = \\frac{E}{R}\\!\\left(1 - e^{-Rt/L}\\right) + i_0\\, e^{-Rt/L}.$$",
        ],
      },
      {
        heading: "Orthogonal trajectories",
        body: [
          "Given a family $f(x,y,c) = 0$, eliminate $c$ to obtain $\\dfrac{dy}{dx} = F(x,y)$. Replace $\\dfrac{dy}{dx}$ by $-\\dfrac{1}{dy/dx}$ and integrate to obtain the orthogonal family.",
        ],
      },
    ],
    examples: [
      {
        problem: "A body cools from $80^{\\circ}\\mathrm{C}$ to $60^{\\circ}\\mathrm{C}$ in $20$ min in a room at $20^{\\circ}\\mathrm{C}$. Find its temperature after $40$ min.",
        steps: [
          "**Step 1 — write Newton's cooling law and solve in general.** $\\dfrac{dT}{dt} = -k(T - T_a)$ with $T_a = 20$. Solution: $T(t) = T_a + (T_0 - T_a) e^{-k t} = 20 + 60\\, e^{-k t}.$",
          "**Step 2 — use the 20-minute data to find $k$.** At $t = 20$: $60 = 20 + 60\\, e^{-20 k} \\Rightarrow e^{-20 k} = \\dfrac{40}{60} = \\dfrac{2}{3}.$",
          "**Step 3 — exploit exponent rules** to avoid computing $k$ explicitly: $e^{-40 k} = \\bigl(e^{-20 k}\\bigr)^{2} = \\bigl(\\tfrac{2}{3}\\bigr)^{2} = \\dfrac{4}{9}.$",
          "**Step 4 — evaluate $T(40)$.** $T(40) = 20 + 60 \\cdot \\dfrac{4}{9} = 20 + \\dfrac{240}{9} = 20 + \\dfrac{80}{3}.$",
          "**Step 5 — convert to a decimal.** $T(40) = \\dfrac{60 + 80}{3} = \\dfrac{140}{3} \\approx 46.67^{\\circ}\\mathrm{C}.$",
          "**Answer.** $$\\boxed{\\,T(40) = \\tfrac{140}{3}\\,^{\\circ}\\mathrm{C} \\approx 46.67^{\\circ}\\mathrm{C}.\\,}$$",
        ],
      },
      {
        problem: "Find the orthogonal trajectories of the family $y = c\\, x^2$.",
        steps: [
          "**Step 1 — differentiate the family** to get its slope: $\\dfrac{dy}{dx} = 2 c x.$",
          "**Step 2 — eliminate $c$.** From $y = c x^2$, $c = y/x^2$, so $\\dfrac{dy}{dx} = \\dfrac{2 y}{x}.$ This is the slope of a member of the original family at $(x, y)$.",
          "**Step 3 — replace slope by negative reciprocal** (perpendicular tangent condition): $\\dfrac{dy}{dx}\\Big|_{\\text{ortho}} = -\\dfrac{x}{2 y}.$",
          "**Step 4 — separate and integrate.** $2 y\\, dy = -x\\, dx \\Rightarrow y^2 = -\\dfrac{x^2}{2} + C_1 \\Rightarrow \\dfrac{x^2}{2} + y^2 = C.$",
          "**Answer.** $$\\boxed{\\,\\tfrac{x^2}{2} + y^2 = C\\quad\\text{(family of ellipses).}\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Half-life of a radioactive substance is $1600$ years. What fraction remains after $4800$ years?", answer: "$(1/2)^3 = 1/8.$" },
      { question: "An RC circuit with $R = 10\\,\\Omega,\\; C = 0.1\\,\\mathrm{F},\\; E = 12\\,\\mathrm{V}$ and $q(0)=0$. Find $q(t)$.", answer: "$q(t) = 1.2\\,(1 - e^{-t}).$" },
      { question: "Orthogonal trajectories of $x^2 + y^2 = a^2$.", answer: "Family of straight lines $y = m x.$" },
    ],
  },
];