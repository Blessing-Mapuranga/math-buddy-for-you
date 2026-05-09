import type { ChapterNotes } from "./types";

export const unit5Notes: ChapterNotes[] = [
  {
    unitId: "unit-5",
    chapterIndex: 0,
    title: "Scalar and Vector Fields",
    intro:
      "A **scalar field** $\\phi(x,y,z)$ assigns a number to each point of space; a **vector field** $\\vec F(x,y,z)$ assigns a vector. Vector calculus extends differentiation and integration to such fields.",
    sections: [
      {
        heading: "Level surfaces",
        body: [
          "For a scalar field $\\phi$, the surface $\\phi(x,y,z) = c$ is a **level surface**. Two level surfaces with different $c$ never intersect.",
        ],
      },
      {
        heading: "Directional derivative",
        body: [
          "The directional derivative of $\\phi$ at $P$ in the direction of unit vector $\\hat a$ is $$\\frac{d\\phi}{ds} = \\nabla\\phi \\cdot \\hat a.$$",
        ],
      },
    ],
    examples: [
      {
        problem: "Find the unit normal to $\\phi(x,y,z) = x^2 + y^2 - z = 0$ at $(1, 1, 2)$.",
        steps: [
          "**Step 1 — recall the geometric fact.** $\\nabla\\phi$ is normal to the level surface $\\phi = c$ at every point.",
          "**Step 2 — compute partial derivatives.** $\\phi_x = 2 x,\\; \\phi_y = 2 y,\\; \\phi_z = -1.$",
          "**Step 3 — evaluate at $(1, 1, 2)$.** $\\nabla\\phi = (2, 2, -1).$",
          "**Step 4 — compute magnitude.** $|\\nabla\\phi| = \\sqrt{4 + 4 + 1} = 3.$",
          "**Step 5 — divide by the magnitude** to get the unit vector.",
          "**Answer.** $$\\boxed{\\,\\hat n = \\tfrac{1}{3}(2,\\,2,\\,-1).\\,}$$",
        ],
      },
      {
        problem: "Find the directional derivative of $\\phi = x^2 y z$ at $(1, 2, 3)$ in the direction of $\\vec a = \\hat i + 2\\hat j + 2\\hat k$.",
        steps: [
          "**Step 1 — formula.** $\\dfrac{d\\phi}{ds} = \\nabla\\phi \\cdot \\hat a$ where $\\hat a$ is the unit vector along the chosen direction.",
          "**Step 2 — compute $\\nabla\\phi$.** $\\phi_x = 2 x y z,\\; \\phi_y = x^2 z,\\; \\phi_z = x^2 y.$",
          "**Step 3 — evaluate at $(1, 2, 3)$.** $\\nabla\\phi = (2\\cdot1\\cdot2\\cdot3,\\; 1^2\\cdot3,\\; 1^2\\cdot2) = (12, 3, 2).$",
          "**Step 4 — normalise the direction.** $|\\vec a| = \\sqrt{1 + 4 + 4} = 3 \\Rightarrow \\hat a = \\tfrac{1}{3}(1, 2, 2).$",
          "**Step 5 — dot product.** $\\nabla\\phi\\cdot\\hat a = \\tfrac{1}{3}(12\\cdot1 + 3\\cdot2 + 2\\cdot2) = \\tfrac{1}{3}(12 + 6 + 4) = \\tfrac{22}{3}.$",
          "**Answer.** $$\\boxed{\\,\\dfrac{d\\phi}{ds} = \\tfrac{22}{3}.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Find $\\nabla\\phi$ for $\\phi = \\ln(x^2 + y^2 + z^2)$.", answer: "$\\nabla\\phi = \\dfrac{2(x,y,z)}{x^2+y^2+z^2}.$" },
      { question: "Maximum directional derivative of $\\phi = x y z$ at $(1,1,1)$.", answer: "$|\\nabla\\phi| = \\sqrt 3$ in direction $(1,1,1)/\\sqrt 3.$" },
      { question: "Unit normal to $x^2 + y^2 + z^2 = 9$ at $(1, 2, 2)$.", answer: "$\\tfrac{1}{3}(1,2,2).$" },
    ],
  },
  {
    unitId: "unit-5",
    chapterIndex: 1,
    title: "Gradient of a Scalar Field",
    intro:
      "The gradient operator $\\nabla = \\hat i\\dfrac{\\partial}{\\partial x} + \\hat j\\dfrac{\\partial}{\\partial y} + \\hat k\\dfrac{\\partial}{\\partial z}$ produces a vector field from a scalar field.",
    sections: [
      {
        heading: "Properties",
        body: [
          "$\\nabla(\\phi \\pm \\psi) = \\nabla\\phi \\pm \\nabla\\psi.$",
          "$\\nabla(\\phi\\psi) = \\phi\\,\\nabla\\psi + \\psi\\,\\nabla\\phi.$",
          "$\\nabla\\phi$ is normal to the level surface $\\phi = c$ at every point.",
          "Maximum rate of change of $\\phi$ at $P$ is $|\\nabla\\phi|$, in the direction of $\\nabla\\phi$.",
        ],
      },
    ],
    examples: [
      {
        problem: "Find the angle between the surfaces $x^2 + y^2 + z^2 = 9$ and $z = x^2 + y^2 - 3$ at $(2, -1, 2)$.",
        steps: [
          "**Step 1 — angle between two surfaces** equals angle between their normals at the common point. Each normal is $\\nabla\\phi_i.$",
          "**Step 2 — write each surface as $\\phi_i = 0$.** $\\phi_1 = x^2 + y^2 + z^2 - 9$ and $\\phi_2 = x^2 + y^2 - z - 3.$",
          "**Step 3 — gradients.** $\\nabla\\phi_1 = (2 x, 2 y, 2 z),\\; \\nabla\\phi_2 = (2 x, 2 y, -1).$",
          "**Step 4 — evaluate at $(2, -1, 2)$.** $\\nabla\\phi_1 = (4, -2, 4),\\; \\nabla\\phi_2 = (4, -2, -1).$",
          "**Step 5 — magnitudes.** $|\\nabla\\phi_1| = \\sqrt{16+4+16} = 6;\\; |\\nabla\\phi_2| = \\sqrt{16 + 4 + 1} = \\sqrt{21}.$",
          "**Step 6 — dot product.** $\\nabla\\phi_1\\cdot\\nabla\\phi_2 = 16 + 4 - 4 = 16.$",
          "**Step 7 — formula** $\\cos\\theta = \\dfrac{\\nabla\\phi_1\\cdot\\nabla\\phi_2}{|\\nabla\\phi_1|\\,|\\nabla\\phi_2|} = \\dfrac{16}{6\\sqrt{21}} = \\dfrac{8}{3\\sqrt{21}}.$",
          "**Answer.** $$\\boxed{\\,\\theta = \\cos^{-1}\\!\\dfrac{8}{3\\sqrt{21}}.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Find $\\nabla(r^n)$ where $r = |\\vec r|$.", answer: "$n r^{n-2}\\, \\vec r.$" },
      { question: "If $\\phi = 3 x^2 y - y^3 z^2$, find $\\nabla\\phi$ at $(1, -2, -1)$.", answer: "$(-12, 9, 16).$" },
      { question: "Direction of greatest increase of $\\phi = x y z$ at $(1, 2, 3)$.", answer: "$(6, 3, 2)/\\sqrt{49} = (6,3,2)/7.$" },
      { question: "Find $\\nabla\\phi \\cdot \\nabla\\psi$ for $\\phi = x + y + z,\\; \\psi = x y + y z + z x$.", answer: "$2(x + y + z).$" },
    ],
  },
  {
    unitId: "unit-5",
    chapterIndex: 2,
    title: "Divergence and Curl",
    intro:
      "Two more differential operations on a vector field $\\vec F = (F_1, F_2, F_3)$: the **divergence** (a scalar) and the **curl** (a vector).",
    sections: [
      {
        heading: "Definitions",
        body: [
          "$\\operatorname{div}\\vec F = \\nabla\\cdot\\vec F = \\dfrac{\\partial F_1}{\\partial x} + \\dfrac{\\partial F_2}{\\partial y} + \\dfrac{\\partial F_3}{\\partial z}.$",
          "$\\operatorname{curl}\\vec F = \\nabla\\times\\vec F = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ \\partial_x & \\partial_y & \\partial_z \\\\ F_1 & F_2 & F_3 \\end{vmatrix}.$",
        ],
      },
      {
        heading: "Physical meaning",
        body: [
          "$\\operatorname{div}$ measures the net outflow per unit volume — a **source** if $> 0$, a **sink** if $< 0$. A vector field with $\\operatorname{div}\\vec F = 0$ is **solenoidal**.",
          "$\\operatorname{curl}$ measures local rotation. A field with $\\operatorname{curl}\\vec F = 0$ is **irrotational**, and (on a simply connected domain) admits a scalar potential: $\\vec F = \\nabla\\phi$.",
        ],
      },
    ],
    examples: [
      {
        problem: "Find $\\operatorname{div}\\vec F$ and $\\operatorname{curl}\\vec F$ for $\\vec F = (x^2 - y z)\\hat i + (y^2 - z x)\\hat j + (z^2 - x y)\\hat k$.",
        steps: [
          "**Step 1 — identify components.** $F_1 = x^2 - y z,\\; F_2 = y^2 - z x,\\; F_3 = z^2 - x y.$",
          "**Step 2 — divergence.** $\\partial_x F_1 = 2 x,\\; \\partial_y F_2 = 2 y,\\; \\partial_z F_3 = 2 z.$ Sum: $\\nabla\\cdot\\vec F = 2(x + y + z).$",
          "**Step 3 — curl, $i$-component.** $\\partial_y F_3 - \\partial_z F_2 = (-x) - (-x) = 0.$",
          "**Step 4 — $j$-component.** $\\partial_z F_1 - \\partial_x F_3 = (-y) - (-y) = 0.$",
          "**Step 5 — $k$-component.** $\\partial_x F_2 - \\partial_y F_1 = (-z) - (-z) = 0.$",
          "**Answer.** $$\\boxed{\\,\\nabla\\cdot\\vec F = 2(x + y + z),\\quad \\nabla\\times\\vec F = \\vec 0.\\,}$$",
        ],
      },
      {
        problem: "Show that $\\vec F = (2 x y + z^3)\\hat i + x^2\\hat j + 3 x z^2 \\hat k$ is irrotational and find its scalar potential $\\phi$.",
        steps: [
          "**Step 1 — verify irrotational.** $i$-comp: $\\partial_y(3 x z^2) - \\partial_z(x^2) = 0 - 0 = 0.$ $j$-comp: $\\partial_z(2 x y + z^3) - \\partial_x(3 x z^2) = 3 z^2 - 3 z^2 = 0.$ $k$-comp: $\\partial_x(x^2) - \\partial_y(2 x y + z^3) = 2 x - 2 x = 0.$ Hence $\\nabla\\times\\vec F = \\vec 0.$ ✓",
          "**Step 2 — set up potential equations.** Want $\\nabla\\phi = \\vec F$, i.e. $\\phi_x = 2 x y + z^3,\\; \\phi_y = x^2,\\; \\phi_z = 3 x z^2.$",
          "**Step 3 — integrate $\\phi_x$ wrt $x$.** $\\phi = x^2 y + x z^3 + g(y, z).$",
          "**Step 4 — match $\\phi_y$.** $\\phi_y = x^2 + g_y(y, z) \\stackrel{!}{=} x^2 \\Rightarrow g_y = 0,$ so $g = h(z).$",
          "**Step 5 — match $\\phi_z$.** $\\phi_z = 3 x z^2 + h'(z) \\stackrel{!}{=} 3 x z^2 \\Rightarrow h'(z) = 0,$ so $h = $ const.",
          "**Answer.** $$\\boxed{\\,\\phi(x, y, z) = x^2 y + x z^3 + C.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "If $\\vec F = x y z\\,(\\hat i + \\hat j + \\hat k)$, find $\\operatorname{div}\\vec F$.", answer: "$y z + x z + x y.$" },
      { question: "Find $\\operatorname{curl}\\vec F$ if $\\vec F = (y, z, x)$.", answer: "$(-1, -1, -1).$" },
      { question: "Show $\\vec F = (3 x^2 - 6 y z, 6 x z^2 - 6 x y, 6 x y z - 6 x y)$ is solenoidal? Compute div.", answer: "$\\operatorname{div}\\vec F = 6 x + 0 + 6 x y - 0 = $ check. (As exercise.)" },
      { question: "Find $\\phi$ such that $\\nabla\\phi = (y + z, z + x, x + y)$.", answer: "$\\phi = x y + y z + z x + C.$" },
      { question: "Verify $\\operatorname{div}(\\operatorname{curl}\\vec F) = 0$ for $\\vec F = (x y, y z, z x)$.", answer: "Compute curl then div; both reduce to $0$." },
    ],
  },
  {
    unitId: "unit-5",
    chapterIndex: 3,
    title: "Vector Identities",
    intro:
      "Standard identities relating $\\nabla$, $\\operatorname{div}$ and $\\operatorname{curl}$ are used routinely in electromagnetism and fluid mechanics.",
    sections: [
      {
        heading: "Key identities",
        body: [
          "$\\operatorname{curl}(\\nabla\\phi) = \\vec 0$.",
          "$\\operatorname{div}(\\operatorname{curl}\\vec F) = 0$.",
          "$\\operatorname{div}(\\phi\\vec F) = \\phi\\,\\operatorname{div}\\vec F + \\nabla\\phi \\cdot \\vec F$.",
          "$\\operatorname{curl}(\\phi\\vec F) = \\phi\\,\\operatorname{curl}\\vec F + \\nabla\\phi \\times \\vec F$.",
          "$\\operatorname{div}(\\vec F \\times \\vec G) = \\vec G \\cdot \\operatorname{curl}\\vec F - \\vec F \\cdot \\operatorname{curl}\\vec G$.",
          "$\\operatorname{curl}(\\operatorname{curl}\\vec F) = \\nabla(\\operatorname{div}\\vec F) - \\nabla^2 \\vec F$.",
        ],
      },
    ],
    examples: [
      {
        problem: "Prove $\\operatorname{curl}(\\nabla\\phi) = \\vec 0$.",
        steps: [
          "**Step 1 — write the gradient.** $\\nabla\\phi = (\\phi_x, \\phi_y, \\phi_z).$",
          "**Step 2 — apply the curl formula.** $\\bigl(\\nabla\\times(\\nabla\\phi)\\bigr)_i = \\partial_y \\phi_z - \\partial_z \\phi_y.$",
          "**Step 3 — use Clairaut's theorem** (mixed partials commute when continuous): $\\phi_{z y} = \\phi_{y z},$ so the $i$-component is $0.$",
          "**Step 4 — repeat for $j, k$.** $j$-comp: $\\phi_{x z} - \\phi_{z x} = 0;\\; k$-comp: $\\phi_{y x} - \\phi_{x y} = 0.$",
          "**Conclusion.** $\\nabla\\times(\\nabla\\phi) = \\vec 0.\\;\\blacksquare$",
        ],
      },
      {
        problem: "If $\\vec r = (x, y, z),\\; r = |\\vec r|$, evaluate $\\operatorname{div}(r^n \\vec r)$.",
        steps: [
          "**Step 1 — choose the identity.** $\\operatorname{div}(\\phi\\vec F) = \\phi\\,\\operatorname{div}\\vec F + (\\nabla\\phi)\\cdot\\vec F$ with $\\phi = r^n$ and $\\vec F = \\vec r.$",
          "**Step 2 — compute $\\operatorname{div}\\vec r$.** $\\partial_x x + \\partial_y y + \\partial_z z = 3.$",
          "**Step 3 — compute $\\nabla r^n$.** Using $\\partial_x r = x/r$ etc., $\\partial_x(r^n) = n r^{n-1}\\cdot \\dfrac{x}{r} = n r^{n-2} x.$ Hence $\\nabla r^n = n r^{n-2}\\, \\vec r.$",
          "**Step 4 — evaluate the dot product.** $(\\nabla r^n)\\cdot\\vec r = n r^{n-2} (\\vec r \\cdot \\vec r) = n r^{n-2}\\cdot r^2 = n r^n.$",
          "**Step 5 — combine.** $\\operatorname{div}(r^n\\vec r) = r^n\\cdot 3 + n r^n = (n + 3) r^n.$",
          "**Answer.** $$\\boxed{\\,\\operatorname{div}(r^n\\, \\vec r) = (n + 3)\\, r^n.\\,}$$",
        ],
      },
    ],
    practice: [
      { question: "Show $\\operatorname{div}(\\vec r) = 3$.", answer: "$\\partial x/\\partial x + \\partial y/\\partial y + \\partial z/\\partial z = 3.$" },
      { question: "Compute $\\operatorname{curl}(\\vec r)$.", answer: "$\\vec 0.$" },
      { question: "Evaluate $\\nabla^2(r^n)$.", answer: "$n(n+1) r^{n-2}.$" },
      { question: "Show $\\operatorname{div}(\\operatorname{grad}\\phi \\times \\operatorname{grad}\\psi) = 0$.", answer: "Use $\\operatorname{div}(\\vec A \\times \\vec B)$ and $\\operatorname{curl}(\\nabla \\cdot) = 0$." },
    ],
  },
];