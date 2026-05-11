export interface QuestionPart {
  id: string;
  question: string;
  answer: any;
  hint?: string;
}

export interface Question {
  id: string;
  type: 'input' | 'choice' | 'multi-part';
  text: string;
  parts: QuestionPart[];
}

export interface Slide {
  title: string;
  content: string;
  interactiveType?: 'beads' | 'grid-input' | 'multiple-choice' | 'info';
  interactiveData?: any;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  level: 'primary' | 'secondary';
  category: 'Number' | 'Algebra' | 'Shape' | 'Data' | 'Ratio';
  icon: string;
  lesson: Slide[];
  homework: Question[];
}

export const mathTopics: Record<string, Topic> = {
  // --- PRIMARY TOPICS ---
  'p1': {
    id: 'p1', title: 'Place Value 1', description: 'Understanding 3-digit numbers.', level: 'primary', category: 'Number', icon: '🔢',
    lesson: [
      { title: 'Units, Tens, Hundreds', content: 'Explore base-10 systems.', interactiveType: 'info' },
      { title: 'Interactive Modeling', content: 'Build 425.', interactiveType: 'beads', interactiveData: { target: 425 } }
    ],
    homework: [
      { id: 'q1', type: 'multi-part', text: 'Value of digits', parts: [{ id: 'q1a', question: 'Value of 3 in 342', answer: 300 }, { id: 'q1b', question: 'Value of 4 in 342', answer: 40 }] },
      { id: 'q2', type: 'multi-part', text: 'Figures', parts: [{ id: 'q2a', question: 'Four hundred and twelve', answer: 412 }] }
    ]
  },
  'p2': {
    id: 'p2', title: 'Addition & Subtraction', description: 'Mental and written methods.', level: 'primary', category: 'Number', icon: '➕',
    lesson: [{ title: 'Methods', content: 'Adding tens and units.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Sums', parts: [{ id: 'q1a', question: '23 + 10', answer: 33 }, { id: 'q1b', question: '89 - 20', answer: 69 }] }]
  },
  'p3': {
    id: 'p3', title: 'Fractions Basics', description: 'Halves and Quarters.', level: 'primary', category: 'Number', icon: '🍰',
    lesson: [{ title: 'Sharing', content: 'Dividing into equal parts.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Identification', parts: [{ id: 'q1a', question: 'Half of 20', answer: 10 }] }]
  },
  'p4': {
    id: 'p4', title: 'Multiplication Tables', description: 'Mastering 2, 5, and 10.', level: 'primary', category: 'Number', icon: '✖️',
    lesson: [{ title: 'Repeated Addition', content: 'Multiplication is adding the same number.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Tables', parts: [{ id: 'q1a', question: '2 x 5', answer: 10 }, { id: 'q1b', question: '10 x 4', answer: 40 }] }]
  },
  'p5': {
    id: 'p5', title: 'Properties of 2D Shapes', description: 'Sides and vertices.', level: 'primary', category: 'Shape', icon: '📐',
    lesson: [{ title: 'Polygons', content: 'Named by number of sides.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Properties', parts: [{ id: 'q1a', question: 'Sides in a square', answer: 4 }, { id: 'q1b', question: 'Sides in a hexagon', answer: 6 }] }]
  },
  'p6': {
    id: 'p6', title: '3D Solids', description: 'Faces, edges, and vertices.', level: 'primary', category: 'Shape', icon: '🧊',
    lesson: [{ title: 'Solids', content: 'Spheres, cubes, and cones.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Solids', parts: [{ id: 'q1a', question: 'Faces on a cube', answer: 6 }] }]
  },
  'p7': {
    id: 'p7', title: 'Time: Digital & Analogue', description: 'Telling the time.', level: 'primary', category: 'Data', icon: '⏰',
    lesson: [{ title: 'The Clock', content: 'Hours and minutes.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Conversions', parts: [{ id: 'q1a', question: 'Minutes in an hour', answer: 60 }] }]
  },
  'p8': {
    id: 'p8', title: 'Data Handling', description: 'Pictograms and bar charts.', level: 'primary', category: 'Data', icon: '📊',
    lesson: [{ title: 'Visual Data', content: 'Representing numbers with shapes.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Reading charts', parts: [{ id: 'q1a', question: 'A star = 2. 5 stars = ?', answer: 10 }] }]
  },

  // --- SECONDARY TOPICS ---
  's1': {
    id: 's1', title: 'Linear Equations', description: 'Solving ax + b = c.', level: 'secondary', category: 'Algebra', icon: '🧮',
    lesson: [{ title: 'Inverse Operations', content: 'Balance the equation.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Solving', parts: [{ id: 'q1a', question: '2x = 10, x=?', answer: 5 }, { id: 'q1b', question: 'x+5=12, x=?', answer: 7 }] }]
  },
  's2': {
    id: 's2', title: 'Quadratic Equations', description: 'Factoring and solving.', level: 'secondary', category: 'Algebra', icon: '📈',
    lesson: [{ title: 'Expansion', content: '(x+a)(x+b).', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Expanding', parts: [{ id: 'q1a', question: 'Expand (x+2)(x+3), coeff of x?', answer: 5 }] }]
  },
  's3': {
    id: 's3', title: 'Pythagoras Theorem', description: 'Right-angled triangles.', level: 'secondary', category: 'Shape', icon: '📐',
    lesson: [{ title: 'Hypotenuse', content: 'a² + b² = c².', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Finding sides', parts: [{ id: 'q1a', question: 'a=3, b=4, c=?', answer: 5 }] }]
  },
  's4': {
    id: 's4', title: 'Trigonometry Intro', description: 'SOH CAH TOA.', level: 'secondary', category: 'Shape', icon: '🔭',
    lesson: [{ title: 'Ratios', content: 'Sine, Cosine, Tangent.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Definitions', parts: [{ id: 'q1a', question: 'Opp/Hyp = [?]', answer: 'Sin' }] }]
  },
  's5': {
    id: 's5', title: 'Probability Scales', description: '0 to 1 likelihood.', level: 'secondary', category: 'Data', icon: '🎲',
    lesson: [{ title: 'Certainty', content: 'Measuring chance.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Events', parts: [{ id: 'q1a', question: 'Prob of Heads on coin', answer: 0.5 }] }]
  },
  's6': {
    id: 's6', title: 'Averages & Range', description: 'Mean, median, mode.', level: 'secondary', category: 'Data', icon: '📉',
    lesson: [{ title: 'Central Tendency', content: 'Finding the middle.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Calculations', parts: [{ id: 'q1a', question: 'Mean of 2, 4, 6', answer: 4 }] }]
  },
  's7': {
    id: 's7', title: 'Direct Proportion', description: 'Relationships between variables.', level: 'secondary', category: 'Ratio', icon: '⚖️',
    lesson: [{ title: 'Constants', content: 'y = kx.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Finding k', parts: [{ id: 'q1a', question: 'y=10 when x=2, k=?', answer: 5 }] }]
  },
  's8': {
    id: 's8', title: 'Compound Interest', description: 'Growth over time.', level: 'secondary', category: 'Ratio', icon: '💰',
    lesson: [{ title: 'Multipliers', content: '1 + percentage.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Interest', parts: [{ id: 'q1a', question: '£100 at 10% for 1yr', answer: 110 }] }]
  },
  's9': {
    id: 's9', title: 'Vectors', description: 'Magnitude and direction.', level: 'secondary', category: 'Shape', icon: '➡️',
    lesson: [{ title: 'Movement', content: 'Adding vectors.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Addition', parts: [{ id: 'q1a', question: 'Vector (2,3) + (1,1) = (3,?)', answer: 4 }] }]
  },
  's10': {
    id: 's10', title: 'Standard Form', description: 'Writing very large numbers.', level: 'secondary', category: 'Number', icon: '🚀',
    lesson: [{ title: 'Powers of 10', content: 'A x 10^n.', interactiveType: 'info' }],
    homework: [{ id: 'q1', type: 'multi-part', text: 'Conversion', parts: [{ id: 'q1a', question: '1,000 as 10^?', answer: 3 }] }]
  }
};
