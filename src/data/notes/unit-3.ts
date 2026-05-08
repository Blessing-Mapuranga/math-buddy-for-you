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
          "Substitute $x = e^{t}$: $D(D-1) y - 3 D y + 4 y = 0 \\Rightarrow (D^2 - 4 D + 4) y = 0$.",
          "Aux: $(m - 2)^2 = 0 \\Rightarrow m = 2$ (double).",
          "$y = (c_1 + c_2 t) e^{2 t} = (c_1 + c_2 \\ln x) x^2$.",
          "$$\\boxed{\\,y = (c_1 + c_2 \\ln x)\\, x^2.\\,}$$",
        ],
      },
      {
        problem: "Solve $x^2 y'' + x y' + y = \\ln x$.",
        steps: [
          "$\\Rightarrow [D(D-1) + D + 1] y = t \\Rightarrow (D^2 + 1) y = t$.",
          "$y_c = c_1\\cos t + c_2\\sin t$. $y_p = (1 + D^2)^{-1} t = t$.",
          "$y = c_1\\cos t + c_2\\sin t + t$, restore $t = \\ln x$.",
          "$$\\boxed{\\,y = c_1\\cos(\\ln x) + c_2\\sin(\\ln x) + \\ln x.\\,}$$",
        ],
      },
      {
        problem: "Solve $x^3 y''' + 3 x^2 y'' + x y' - y = 0$.",
        steps: [
          "$\\Rightarrow D(D-1)(D-2) y + 3 D(D-1) y + D y - y = 0$.",
          "Expand: $D^3 - D = 0 \\Rightarrow m(m^2 - 1) = 0 \\Rightarrow m = 0, \\pm 1$.",
          "$y = c_1 + c_2 e^{t} + c_3 e^{-t} = c_1 + c_2 x + c_3/x$.",
          "$$\\boxed{\\,y = c_1 + c_2 x + \\tfrac{c_3}{x}.\\,}$$",
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
          "Put $2 x + 3 = e^{t}$, so $a = 2$. Then $(2x+3) y' \\to 2 D y$ and $(2x+3)^2 y'' \\to 4 D(D-1) y$.",
          "Equation: $4 D(D-1) y - 4 D y - 12 y = 6 \\cdot \\tfrac{e^{t} - 3}{2} = 3 e^{t} - 9$.",
          "$\\Rightarrow (4 D^2 - 8 D - 12) y = 3 e^{t} - 9 \\Rightarrow (D^2 - 2 D - 3) y = \\tfrac{3}{4} e^{t} - \\tfrac{9}{4}$.",
          "Aux: $(m - 3)(m + 1) = 0 \\Rightarrow m = 3, -1$. $y_c = c_1 e^{3t} + c_2 e^{-t}$.",
          "$y_{p1} = \\dfrac{3 e^{t}/4}{1 - 2 - 3} = -\\tfrac{3}{16} e^{t}$; $y_{p2} = \\dfrac{-9/4}{-3} = \\tfrac{3}{4}$.",
          "Restore $t = \\ln(2x+3)$: $$\\boxed{\\,y = c_1 (2x+3)^3 + \\tfrac{c_2}{2x+3} - \\tfrac{3}{16}(2x+3) + \\tfrac{3}{4}.\\,}$$",
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
          "$Dx + y = \\sin t,\\; x + Dy = \\cos t$. Apply $D$ to first: $D^2 x + D y = \\cos t$.",
          "Subtract second: $D^2 x - x = \\cos t - \\cos t = 0 \\Rightarrow (D^2 - 1) x = 0$.",
          "$x = c_1 e^{t} + c_2 e^{-t}$. From eq. 1, $y = \\sin t - D x = \\sin t - c_1 e^{t} + c_2 e^{-t}$.",
          "$$\\boxed{\\,x = c_1 e^t + c_2 e^{-t},\\; y = \\sin t - c_1 e^t + c_2 e^{-t}.\\,}$$",
        ],
      },
      {
        problem: "Solve $D x - y = e^{t},\\; D y + x = e^{-t}$.",
        steps: [
          "Apply $D$ to first: $D^2 x - D y = e^{t}$. Add second: $D^2 x + x = e^{t} + e^{-t}$.",
          "$(D^2 + 1) x = e^{t} + e^{-t}$. $x_c = c_1\\cos t + c_2\\sin t$.",
          "$x_p = \\dfrac{e^{t}}{2} + \\dfrac{e^{-t}}{2}$.",
          "$y = D x - e^{t}$ gives $y$ explicitly.",
          "$$\\boxed{\\,x = c_1\\cos t + c_2\\sin t + \\cosh t,\\; y = D x - e^{t}.\\,}$$",
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
          "$\\ddot x + 25 x = 0,\\; \\omega_n = 5$.",
          "$x(t) = A\\cos 5t + B\\sin 5t,\\; A = 0.1, B = 0$.",
          "$$\\boxed{\\,x(t) = 0.1\\cos 5 t.\\,}$$",
        ],
      },
      {
        problem: "Series RLC: $L = 1\\,\\mathrm{H},\\; R = 6\\,\\Omega,\\; C = 0.04\\,\\mathrm{F},\\; E = 24\\,\\mathrm{V}$, $q(0) = i(0) = 0$. Find $q(t)$.",
        steps: [
          "$\\ddot q + 6 \\dot q + 25 q = 24$. Aux: $m^2 + 6 m + 25 = 0 \\Rightarrow m = -3 \\pm 4 i$.",
          "$q_c = e^{-3 t}(c_1 \\cos 4 t + c_2 \\sin 4 t)$. $q_p = 24/25$.",
          "Apply ICs: $c_1 = -24/25,\\; c_2 = -18/25$.",
          "$$\\boxed{\\,q(t) = \\tfrac{24}{25} - \\tfrac{6}{25} e^{-3 t}(4\\cos 4 t + 3\\sin 4 t).\\,}$$",
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