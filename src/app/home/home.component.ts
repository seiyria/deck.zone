import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public blocks = [
    {
      title: 'About Decklang',
      text: 'Decklang is a scripting language created based on nanDECK. It\'s very similar, but also provides a streamlined list of features including loops, "check" statements, and static error checking!'
    },
    {
      title: 'Integrated Help',
      text: 'No need to reach for the manual for help - everything is integrated into the editor! With the help of autocomplete and an easy syntax reference, finding help is easy!',
      buttonText: 'View Help »',
      buttonLink: ['/help']
    },
    {
      title: 'Examples & Tutorials',
      text: 'There are plenty of examples for anything you might need, from the simplest demonstration of a directive to more complex examples like a deck of cards, or Werewolf.',
      buttonText: 'View Examples »',
      buttonLink: ['/examples']
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
