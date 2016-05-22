
export const STRING_SIZES = {
  scriptName: 20,
  projectName: 30
};

export const DefaultProject = {
  activeScript: '0',
  visibility: 'Public',
  resources: [
    { name: 'rolling-dice.png', url: 'http://seiyria.com/gameicons-font/png/rolling-dice.png' }
  ],
  scripts: [
    { name: 'main.deck', contents: 'text = 1, "Hello World", 0, 0, 1, 1' }
  ]
};