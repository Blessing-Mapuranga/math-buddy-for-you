export interface UnitTopic {
  id: string;
  number: string;
  title: string;
  description: string;
  chapters: string[];
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
    color: "from-sky-500 to-sky-600",
  },
];