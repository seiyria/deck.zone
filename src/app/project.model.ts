
export type Visibility = 'Public' | 'Private';

export class Resource {
  name: string;
  url: string;
}

export class Script {
  name: string;
  contents: string;
}

export class Project {
  activeScript = '0';
  projectId: string;
  forkedFrom: string;
  createdAt: number;
  name: string;
  owner: string;
  resources: Resource[] = [
    { name: 'rolling-dices', url: 'http://seiyria.com/gameicons-font/svg/rolling-dices.svg' }
  ];
  scripts: Script[] = [
    { name: 'main.deck', contents: 'text = 1, "Hello World", 0, 0, 1, 1' }
  ];
  visibility: Visibility = 'Public';
}
