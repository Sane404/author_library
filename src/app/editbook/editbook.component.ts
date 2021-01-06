import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {
  @Input() name;
  @Input() book;
  @Output() submitTrigger = new EventEmitter();
  constructor(private db:AngularFirestore) { }
  editBook:FormGroup;
  ngOnInit(): void {
    this.editBook = new FormGroup({
      title: new FormControl(this.book.title,[Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]),
      genre: new FormControl(this.book.genre,[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)])
    });
  }
  onSubmit(form){
    let title = form.value.title;
    let genre = form.value.genre;
    //remove original value;
    this.db.collection('authors').doc(this.name).update({
      books: firebase.default.firestore.FieldValue.arrayRemove({
        title:this.book.title,
        genre:this.book.genre
      })
    })
    //add new value;
    this.db.collection('authors').doc(this.name).update({
      books: firebase.default.firestore.FieldValue.arrayUnion({
        title:title,
        genre:genre
      })
    })
    this.eventTrigger(form);
  }
  eventTrigger(value) {
    this.submitTrigger.emit(value);
  }
  onChildClickFunction(e){
    e.stopPropagation();
  }
  get title(){return this.editBook.get('title');}
  get genre(){return this.editBook.get('genre');}
}
