export const mockNotes = [
  { 
    id: 'ijf', 
    title: 'Learn Redux', 
    listItems: [
      { 
        id: 'asg', 
        description: 'read through lesson', 
        isComplete: false
      }, 
      { 
        id: 'rhf', 
        description: 'follow along with tutorial', 
        isComplete: false
      }
    ]
  },
  { 
    id: 'pdo', 
    title: 'Start portfolio', 
    listItems: [
      { 
        id: 'cat', 
        description: 'Setup user account', 
        isComplete: false
      }
    ]
  },
  { 
    id: 'bah', 
    title: 'Grocery shopping', 
    listItems: [
      { 
        id: 'rey', 
        description: 'Stop by King Soopers', 
        isComplete: false
      }, 
      { 
        id: 'moo', 
        description: 'Stop by Sprouts', 
        isComplete: false
      }
    ]
  },
  { 
    id: 'fah', 
    title: 'Make dinner', 
    listItems: [
      { 
        id: 'ley', 
        description: 'gather ingredients', 
        isComplete: false
      }, 
      { 
        id: 'mei', 
        description: 'preheat oven', 
        isComplete: false
      }
    ]
  }
];

export const mockNote = {
  id: 'rzz',
  title: 'Workout',
  listItems: [
    {
      id: 'lpo',
      description: '20 situps',
      isComplete: false
    },
    {
      id: 'lqw',
      description: '15 pushups',
      isComplete: false
    }
  ]
};

export const mockNotesAfterDelete = [
  { 
    id: 'ijf', 
    title: 'Learn Redux', 
    listItems: [
      { 
        id: 'asg', 
        description: 'read through lesson', 
        isComplete: false
      }, 
      { 
        id: 'rhf', 
        description: 'follow along with tutorial', 
        isComplete: false
      }
    ]
  },
  { 
    id: 'pdo', 
    title: 'Start portfolio', 
    listItems: [
      { 
        id: 'cat', 
        description: 'Setup user account', 
        isComplete: false
      }
    ]
  },
  { 
    id: 'fah', 
    title: 'Make dinner', 
    listItems: [
      { 
        id: 'ley', 
        description: 'gather ingredients', 
        isComplete: false
      }, 
      { 
        id: 'mei', 
        description: 'preheat oven', 
        isComplete: false
      }
    ]
  }
];

export const mockUpdatedNote = {
    id: 'ijf', 
    title: 'Learn Redux', 
    listItems: [
      { 
        id: 'asg', 
        description: 'read through lesson', 
        isComplete: true
      }, 
      { 
        id: 'rhf', 
        description: 'follow along with tutorial', 
        isComplete: false
      },
      {
        id: 'ypu',
        description: 'use redux in a project',
        isComplete: false
      }
    ]
};

export const mockNotesAfterUpdating = [
  mockUpdatedNote,
  { 
    id: 'pdo', 
    title: 'Start portfolio', 
    listItems: [
      { 
        id: 'cat', 
        description: 'Setup user account', 
        isComplete: false
      }
    ]
  },
  { 
    id: 'bah', 
    title: 'Grocery shopping', 
    listItems: [
      { 
        id: 'rey', 
        description: 'Stop by King Soopers', 
        isComplete: false
      }, 
      { 
        id: 'moo', 
        description: 'Stop by Sprouts', 
        isComplete: false
      }
    ]
  },
  { 
    id: 'fah', 
    title: 'Make dinner', 
    listItems: [
      { 
        id: 'ley', 
        description: 'gather ingredients', 
        isComplete: false
      }, 
      { 
        id: 'mei', 
        description: 'preheat oven', 
        isComplete: false
      }
    ]
  }
];