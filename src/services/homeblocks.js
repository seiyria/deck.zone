
export class HomeBlocksService {
  constructor() {
    this._blocks = [
      {
        title: 'Work with Decklang',
        text: 'Decklang is a scripting language created based on nanDECK. It\'s very similar, but also provides a streamlined list of features including loops, "check" statements, and static error checking!'
      },
      {
        title: 'Integrated Help',
        text: 'No need to reach for the manual for help - everything is integrated into the editor! With the help of autocomplete and an easy syntax reference, finding help is easy!'
      },
      {
        title: 'Many Examples',
        text: 'There are plenty of examples for anything you might need, from the simplest demonstration of a directive to more complex examples like a deck of cards, or Werewolf.'
      }
    ];
  }
  getData() {
    return this._blocks;
  }
}