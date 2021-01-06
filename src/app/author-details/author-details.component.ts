import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {

  constructor(private db : AngularFirestore,private route:ActivatedRoute) { }
  data:any;
  books:any;
  name:string;
  empty:boolean;
  defaultUrl:string = "https://cdn.pixabay.com/photo/2019/06/10/10/02/elder-4263825_960_720.png";
  book_to_be_edited:any;
  add_book_visible:boolean = false;
  edit_book_visible:boolean = false;
  edit_author_visible:boolean = false;
  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name').toUpperCase();
    var docRef = this.db.collection("authors").doc(this.name);
    docRef.valueChanges().subscribe(doc => {
      this.data = doc;
      if(this.data){
        this.books = this.data.books;
        this.books.length == 0 ? this.empty = true : this.empty = false;
      }
      
    });
  }
  show_add_form(){
    if(this.add_book_visible){
      this.add_book_visible = !this.add_book_visible;
      document.body.style.overflowY = 'scroll';
    }else{
      this.add_book_visible = true;
      window.scrollTo(0,0);
      document.body.style.overflowY = 'hidden';
    }
  }
  show_edit_book_form(book){
    if(this.edit_book_visible){
      this.edit_book_visible = !this.edit_book_visible;
      document.body.style.overflowY = 'scroll';
    }else{
      this.edit_book_visible = true;
      window.scrollTo(0,0);
      document.body.style.overflowY = 'hidden';
    }
    this.book_to_be_edited = book; 
  }
  show_edit_author_form(){
    if(this.edit_author_visible){
      this.edit_author_visible = !this.edit_author_visible;
      document.body.style.overflowY = 'scroll';
    }else{
      this.edit_author_visible = true;
      window.scrollTo(0,0);
      document.body.style.overflowY = 'hidden';
    } 
  }
  remove_book(book){
    let remove = confirm(`Do you want to remove "${book.title.toUpperCase()}" from the list ?`);
    if(remove){
      this.db.collection('authors').doc(this.name).update({
        books: firebase.default.firestore.FieldValue.arrayRemove({
          title:book.title,
          genre:book.genre
        })
      })
    }
  }
}
