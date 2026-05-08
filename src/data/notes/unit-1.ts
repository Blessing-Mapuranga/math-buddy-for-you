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
          "Highest derivative present: $\\dfrac{d^2y}{dx^2}$, hence **order = 2**.",
          "It appears with power $3$ and the equation is already polynomial in derivatives, hence **degree = 3**.",
        ],
      },
      {
        problem: "Form the ODE whose general solution is $y = A\\cos x + B\\sin x$.",
        steps: [
          "Differentiate: $y' = -A\\sin x + B\\cos x$.",
          "Differentiate again: $y'' = -A\\cos x - B\\sin x = -(A\\cos x + B\\sin x) = -y$.",
          "Therefore the required ODE is $$\\boxed{\\,y'' + y = 0.\\,}$$",
        ],
      },
      {
        problem: "Form the ODE of the family $y = c\\, e^{2x}$.",
        steps: [
          "Differentiate: $y' = 2c\\, e^{2x} = 2y$.",
          "Hence $$\\boxed{\\,y' - 2y = 0.\\,}$$",
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
          "Separate: $\\dfrac{y\\, dy}{1+y^2} = \\dfrac{x\\, dx}{1+x^2}$.",
          "Integrate: $\\tfrac{1}{2}\\ln(1+y^2) = \\tfrac{1}{2}\\ln(1+x^2) + C_1$.",
          "Therefore $$\\boxed{\\,1 + y^2 = C\\,(1 + x^2)\\,}$$ where $C = e^{2C_1}$.",
        ],
      },
      {
        problem: "Solve $(x^2 + y^2)\\, dx - 2xy\\, dy = 0$.",
        steps: [
          "Both numerator and denominator are degree-$2$ homogeneous. Put $y = vx$, so $dy = v\\,dx + x\\,dv$.",
          "Equation becomes $(x^2 + v^2 x^2)\\, dx - 2x\\,(vx)(v\\,dx + x\\,dv) = 0$.",
          "Simplify: $x^2(1 - v^2)\\, dx = 2v x^3\\, dv \\;\\Rightarrow\\; \\dfrac{dx}{x} = \\dfrac{2v\\, dv}{1 - v^2}$.",
          "Integrate: $\\ln|x| = -\\ln|1 - v^2| + C_1$, i.e. $x(1-v^2) = C$.",
          "Back-substitute $v = y/x$: $$\\boxed{\\,x^2 - y^2 = C\\, x.\\,}$$",
        ],
      },
      {
        problem: "Solve $\\dfrac{dy}{dx} = \\dfrac{x + 2y - 3}{2x + y - 3}$.",
        steps: [
          "Solve $h + 2k - 3 = 0,\\; 2h + k - 3 = 0 \\Rightarrow h = 1,\\; k = 1$.",
          "Put $x = X + 1,\\; y = Y + 1$: $\\dfrac{dY}{dX} = \\dfrac{X + 2Y}{2X + Y}$ (homogeneous).",
          "Let $Y = vX$: $v + X\\dfrac{dv}{dX} = \\dfrac{1+2v}{2+v}$.",
          "Hence $X\\dfrac{dv}{dX} = \\dfrac{1+2v}{2+v} - v = \\dfrac{1 - v^2}{2 + v}$.",
          "Separate: $\\dfrac{(2+v)\\, dv}{1 - v^2} = \\dfrac{dX}{X}$. Partial fractions give $\\dfrac{3/2}{1-v} - \\dfrac{1/2}{1+v}$.",
          "Integrate: $-\\tfrac{3}{2}\\ln|1-v| - \\tfrac{1}{2}\\ln|1+v| = \\ln|X| + C_1$.",
          "Replace $v = Y/X$ and $X = x-1,\\, Y = y-1$ for the implicit solution $$\\boxed{\\,(X - Y)^3 (X + Y) = C.\\,}$$",
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
          "$M_y = 2x + 2y,\\; N_x = 2x + 2y$, so the equation is exact.",
          "$u = \\int (2xy + y^2)\\, dx = x^2 y + x y^2 + g(y)$.",
          "$u_y = x^2 + 2xy + g'(y) = N = x^2 + 2xy \\Rightarrow g'(y) = 0$.",
          "Solution: $$\\boxed{\\,x^2 y + x y^2 = C.\\,}$$",
        ],
      },
      {
        problem: "Solve $(x^2 + y^2 + x)\\, dx + xy\\, dy = 0$.",
        steps: [
          "$M_y = 2y,\\; N_x = y$, not exact. Compute $\\dfrac{M_y - N_x}{N} = \\dfrac{y}{xy} = \\dfrac{1}{x}$, depends on $x$ only.",
          "$\\mathrm{IF} = e^{\\int dx/x} = x$. Multiply: $(x^3 + xy^2 + x^2)\\, dx + x^2 y\\, dy = 0$.",
          "Now exact. Integrate $M$ wrt $x$: $u = \\tfrac{x^4}{4} + \\tfrac{x^2 y^2}{2} + \\tfrac{x^3}{3} + g(y)$.",
          "$u_y = x^2 y + g'(y) = x^2 y \\Rightarrow g'(y) = 0$.",
          "Solution: $$\\boxed{\\,\\tfrac{x^4}{4} + \\tfrac{x^2 y^2}{2} + \\tfrac{x^3}{3} = C.\\,}$$",
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
          "$P = 2,\\; \\mathrm{IF} = e^{2x}$.",
          "$\\dfrac{d}{dx}(y e^{2x}) = e^{-x}\\cdot e^{2x} = e^{x}$.",
          "Integrate: $y\\, e^{2x} = e^{x} + C$, hence $$\\boxed{\\,y = e^{-x} + C\\, e^{-2x}.\\,}$$",
        ],
      },
      {
        problem: "Solve $x\\dfrac{dy}{dx} + y = x^3 y^6$.",
        steps: [
          "Divide by $x$: $\\dfrac{dy}{dx} + \\dfrac{y}{x} = x^2 y^6$ (Bernoulli with $n = 6$).",
          "Divide by $y^6$: $y^{-6}\\, y' + \\tfrac{1}{x} y^{-5} = x^2$.",
          "Let $v = y^{-5}$, $v' = -5 y^{-6} y'$. Substitute: $-\\tfrac{1}{5} v' + \\tfrac{1}{x} v = x^2$.",
          "Standard linear: $v' - \\tfrac{5}{x} v = -5 x^2$. $\\mathrm{IF} = e^{-5\\ln x} = x^{-5}$.",
          "$\\dfrac{d}{dx}(v x^{-5}) = -5 x^{-3} \\Rightarrow v x^{-5} = \\tfrac{5}{2} x^{-2} + C$.",
          "Hence $v = \\tfrac{5}{2} x^{3} + C x^{5}$, and $$\\boxed{\\,\\frac{1}{y^5} = \\tfrac{5}{2} x^{3} + C\\, x^{5}.\\,}$$",
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
          "$T(t) = 20 + 60\\, e^{-k t}$. At $t = 20$: $60 = 20 + 60 e^{-20 k} \\Rightarrow e^{-20 k} = \\tfrac{2}{3}$.",
          "$T(40) = 20 + 60\\, (e^{-20k})^{2} = 20 + 60 \\cdot \\tfrac{4}{9} = 20 + \\tfrac{80}{3} \\approx 46.67^{\\circ}\\mathrm{C}.$",
          "Hence $$\\boxed{\\,T(40) \\approx 46.67^{\\circ}\\mathrm{C}.\\,}$$",
        ],
      },
      {
        problem: "Find the orthogonal trajectories of the family $y = c\\, x^2$.",
        steps: [
          "Differentiate: $\\dfrac{dy}{dx} = 2 c x = \\dfrac{2 y}{x}$.",
          "Replace $\\dfrac{dy}{dx}$ by $-\\dfrac{dx}{dy}$: $-\\dfrac{dx}{dy} = \\dfrac{2y}{x}$, i.e. $x\\, dx + 2 y\\, dy = 0$.",
          "Integrate: $\\tfrac{x^2}{2} + y^2 = C$, i.e. $$\\boxed{\\,\\tfrac{x^2}{2} + y^2 = C\\quad\\text{(family of ellipses).}\\,}$$",
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