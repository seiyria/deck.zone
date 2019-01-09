import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit {

  public examples: Observable<any>;

  constructor(public angularFire: AngularFireDatabase) { }

  ngOnInit() {
    const examples = this.angularFire.list('/examples', ref => ref.orderByChild('name'));
    this.examples = examples.valueChanges();
  }

}
