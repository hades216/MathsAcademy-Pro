// Mock topic data for the MyMaths clone
export interface Question {
  id: string;
  type: 'input' | 'choice' | 'drag-drop';
  text: string;
  generate: () => { 
    question: string; 
    answer: any; 
    options?: any[]; 
    parts?: any[];
  };
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  lessons: {
    slides: {
      title: string;
      content: string;
      interactive?: any;
    }[];
  };
  homework: Question[];
}

export const mathTopics: Record<string, Topic> = {
  'p1': {
    id: 'p1',
    title: 'Addition of Large Numbers',
    description: 'Learn how to add 3 and 4 digit numbers using column addition.',
    lessons: {
      slides: [
        { 
          title: 'Introduction', 
          content: 'Column addition is a method where you line up numbers by their place value (ones, tens, hundreds).' 
        },
        { 
          title: 'Step 1: Lining Up', 
          content: 'Always start from the right. Add the ones first.' 
        },
        { 
          title: 'Step 2: Carrying', 
          content: 'If the sum of a column is 10 or more, you must "carry" the extra digit to the next column.' 
        }
      ]
    },
    homework: [
      {
        id: 'q1',
        type: 'input',
        text: 'Work out the sum of these two numbers:',
        generate: () => {
          const a = Math.floor(Math.random() * 900) + 100;
          const b = Math.floor(Math.random() * 900) + 100;
          return { question: `${a} + ${b}`, answer: a + b };
        }
      },
      {
        id: 'q2',
        type: 'input',
        text: 'Calculate the total:',
        generate: () => {
          const a = Math.floor(Math.random() * 9000) + 1000;
          const b = Math.floor(Math.random() * 9000) + 1000;
          return { question: `${a} + ${b}`, answer: a + b };
        }
      }
    ]
  },
  's1': {
    id: 's1',
    title: 'Solving Linear Equations',
    description: 'Solve equations of the form ax + b = c.',
    lessons: {
      slides: [
        { title: 'The Balance Method', content: 'Whatever you do to one side of the equation, you must do to the other.' },
        { title: 'Example', content: '2x + 5 = 15. Subtract 5 from both sides: 2x = 10. Divide by 2: x = 5.' }
      ]
    },
    homework: [
      {
        id: 'q1',
        type: 'input',
        text: 'Solve for x:',
        generate: () => {
          const a = Math.floor(Math.random() * 10) + 1;
          const x = Math.floor(Math.random() * 20) + 1;
          const b = Math.floor(Math.random() * 50) + 1;
          const c = a * x + b;
          return { question: `${a}x + ${b} = ${c}`, answer: x };
        }
      }
    ]
  }
};
