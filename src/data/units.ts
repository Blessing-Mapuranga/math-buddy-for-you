export interface UnitTopic {
  id: string;
  number: string;
  title: string;
  description: string;
  chapters: string[];
  /** PDF filenames (in /MTH166/) per chapter — index aligned with `chapters`. */
  chapterPdfs?: string[][];
  color: string;
}

export const units: UnitTopic[] = [
  {
    id: "unit-1",
    number: "Unit I",
    title: "Ordinary Differential Equations",
    description: "First-order ODEs, exact equations, integrating factors, linear equations and applications.",
    chapters: [
      "Introduction to ODEs",
      "Variable Separable & Homogeneous Equations",
      "Exact Equations and Integrating Factors",
      "Linear & Bernoulli Equations",
      "Applications of First-Order ODEs",
    ],
    chapterPdfs: [
      ["Lecture 1-Basics of ODE.pdf"],
      ["Lecture 1-Basics of ODE.pdf"],
      [
        "Lecture 2-Exact Differential Equations.pdf",
        "Lecture 2-Exact Differential Equations (2).pdf",
        "Lecture 3-Equations Reducible to Exact Form-I (2).pdf",
        "Lecture 4-Equations Reducible to Exact Form-II.pdf",
        "Lecture 4-Equations Reducible to Exact Form-II (2).pdf",
      ],
      [
        "Lecture 7-Linear Differential Equations.pdf",
        "Lecture 8-Linear Differential Equations II.pdf",
      ],
      [
        "Lecture 5-Equations of First Order and Higher Degree.pdf",
        "Lecture 5-Equations of First Order and Higher Degree (2).pdf",
        "Lecture 6-Clairaut Equation (2).pdf",
      ],
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "unit-2",
    number: "Unit II",
    title: "Differential Equations of Higher Order",
    description: "Linear ODEs of higher order with constant coefficients and method of variation of parameters.",
    chapters: [
      "Higher Order Linear ODEs",
      "Homogeneous Equations with Constant Coefficients",
      "Non-Homogeneous Equations",
      "Method of Undetermined Coefficients",
      "Variation of Parameters",
    ],
    chapterPdfs: [
      ["Lecture 9-Solution of 2nd order Homogeneous LDE with Constant coefficients I.pdf"],
      [
        "Lecture 9-Solution of 2nd order Homogeneous LDE with Constant coefficients I.pdf",
        "Lecture 10-Solution of 2nd order Homogeneous LDE with Constant coefficients II.pdf",
        "Lecture 11-Solution of Higher order Homogeneous LDE with Constant coefficients I.pdf",
        "Lecture 12-Solution of Higher order Homogeneous LDE with Constant coefficients II.pdf",
      ],
      ["Lecture 13-Solution of Non-Homogeneous LDE with Constant coefficients Using Operaor Method-I.pdf"],
      [
        "Lecture 16-Method of Undeterminant Coefficients .pdf",
        "Lecture 17-Method of Undeterminant Coefficients II.pdf",
      ],
      ["Lecture 15-Method of Variation of Parameters.pdf"],
    ],
    color: "from-teal-500 to-teal-600",
  },
  {
    id: "unit-3",
    number: "Unit III",
    title: "Linear Differential Equations (Advanced)",
    description: "Cauchy–Euler equations, Legendre's equation, simultaneous equations and engineering applications.",
    chapters: [
      "Cauchy–Euler Equations",
      "Legendre's Linear Equations",
      "Simultaneous Differential Equations",
      "Applications in Engineering Systems",
    ],
    chapterPdfs: [
      [
        "Lecture 18-Euler-Cauchy Equation.pdf",
        "Lecture 19-Euler-Cauchy Equation II.pdf",
      ],
      [
        "Lecture 18-Euler-Cauchy Equation.pdf",
        "Lecture 19-Euler-Cauchy Equation II.pdf",
      ],
      ["Lecture 20-Simultaneous Differential Equations.pdf"],
      ["Lecture 20-Simultaneous Differential Equations.pdf"],
    ],
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: "unit-4",
    number: "Unit IV",
    title: "Partial Differential Equations",
    description: "Formation and solutions of PDEs, Lagrange's method, and standard forms.",
    chapters: [
      "Formation of PDEs",
      "Lagrange's Linear Equations",
      "Non-Linear PDEs of First Order",
      "Standard Forms",
      "Applications of PDEs",
    ],
    chapterPdfs: [
      ["Lecture 21-Partial Differential Equations MTH602.pdf"],
      ["Lecture 22-Classification of Partial Differential Equations.pdf"],
      ["Lecture 23-Separation of Variables Solution of PDE.pdf"],
      [
        "Lecture 24-Solution of Wave Equation.pdf",
        "Lecture 25-Solution of Laplace Equation (1).pdf",
      ],
      [
        "Lecture 26-Boundary value problems of Heat equation.pdf",
        "Lecture 27-Boundary value problems of  Wave equation.pdf",
      ],
    ],
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "unit-5",
    number: "Unit V",
    title: "Vector Calculus I",
    description: "Vector differentiation, gradient, divergence, curl and their physical interpretations.",
    chapters: [
      "Scalar and Vector Fields",
      "Gradient of a Scalar Field",
      "Divergence and Curl",
      "Vector Identities",
    ],
    chapterPdfs: [
      [
        "Lecture 28-Level Surfaces and Parametric Equation of a Straight Line.pdf",
        "Lecture 29-Length of Space Curve and Parametric Equation of Tangent Line.pdf",
      ],
      [
        "Lecture 30-Gradient of a scalar field.pdf",
        "Lecture 31-Directional Derivatives.pdf",
      ],
      [
        "Lecture 32-Divergence and Curl of a Vector Field.pdf",
        "Lecture 32-Divergence and Curl of a Vector Field (1).pdf",
      ],
      ["Lecture 32-Divergence and Curl of a Vector Field.pdf"],
    ],
    color: "from-violet-500 to-violet-600",
  },
  {
    id: "unit-6",
    number: "Unit VI",
    title: "Vector Calculus II",
    description: "Line, surface and volume integrals; Green's, Stokes' and Gauss divergence theorems.",
    chapters: [
      "Line Integrals",
      "Surface and Volume Integrals",
      "Green's Theorem",
      "Stokes' Theorem",
      "Gauss Divergence Theorem",
    ],
    chapterPdfs: [
      ["Lecture 33-Line Integral.pdf"],
      ["Lecture 35-Surface Area and Surface Integral.pdf"],
      [
        "Lecture 33-Line Integral.pdf",
        "Lecture 38-Revision of Unit-6 and MCQ Practice.pdf",
      ],
      [
        "Lecture 35-Surface Area and Surface Integral.pdf",
        "Lecture 38-Revision of Unit-6 and MCQ Practice (1).pdf",
      ],
      [
        "Lecture 37- Gauss's Divergence Theorem.pdf",
        "Lecture 38-Revision of Unit-6 and MCQ Practice.pdf",
      ],
    ],
    color: "from-sky-500 to-sky-600",
  },
];