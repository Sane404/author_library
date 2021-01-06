import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  @Input() name;
  @Output() submitTrigger = new EventEmitter();
  addBook = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]),
    genre: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)])
  });
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }
  onSubmit(form){
    let title = form.value.title;
    let genre = form.value.genre;
    if(title == '' || genre == ''){
      return
    }else{
    this.db.collection('authors').doc(this.name).update({
      books: firebase.default.firestore.FieldValue.arrayUnion({
        title:title,
        genre:genre
      })
    })
    this.eventTrigger(form);
  }
  }
  eventTrigger(value) {
    this.submitTrigger.emit(value);
  }
  onChildClickFunction(e){
    e.stopPropagation();
  }
  get title(){return this.addBook.get('title');}
  get genre(){return this.addBook.get('genre');}
}
