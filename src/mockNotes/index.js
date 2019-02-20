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
      isComplete: true
    }
  ],
  color: 'lavender'
};

export const mockNoteAfterComplete = {
  id: 'rzz',
  title: 'Workout',
  listItems: [
    {
      id: 'lpo',
      description: '20 situps',
      isComplete: true
    },
    {
      id: 'lqw',
      description: '15 pushups',
      isComplete: true
    }
  ],
  color: 'lavender'
};

export const mockNoteAfterCompleteOpposite = {
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
  ],
  color: 'lavender'
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

export const mockNoteLong = { 
  id: 'bah', 
  title: 'Grocery shopping', 
  listItems: [
    { 
      id: 'rey', 
      description: 'Stop by King Soopers', 
      isComplete: false
    }, 
    { 
      id: 'fde', 
      description: 'Stop by King Soopers', 
      isComplete: false
    }, 
    { 
      id: 'dfg', 
      description: 'Stop by King Soopers', 
      isComplete: false
    }, 
    { 
      id: 'ert', 
      description: 'Stop by King Soopers', 
      isComplete: false
    }, 
    { 
      id: 'tuy', 
      description: 'Stop by King Soopers', 
      isComplete: false
    }, 
    { 
      id: 'jkh', 
      description: 'Stop by King Soopers', 
      isComplete: false
    }, 
    { 
      id: 'rew', 
      description: 'Stop by King Soopers', 
      isComplete: false
    }, 
    { 
      id: 'lkj', 
      description: 'Stop by King Soopers', 
      isComplete: false
    }, 
    { 
      id: 'uip', 
      description: 'Stop by King Soopers', 
      isComplete: false
    }, 
    { 
      id: 'xcz', 
      description: 'Stop by King Soopers', 
      isComplete: false
    }, 
    { 
      id: 'ngv', 
      description: 'Stop by King Soopers', 
      isComplete: true
    },
    { 
      id: 'lsd', 
      description: 'Stop by King Soopers', 
      isComplete: true
    }
  ]
}