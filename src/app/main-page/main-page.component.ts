import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  fullDB = [];
  filteredDB = [];
  defaultUrl:string = "https://cdn.pixabay.com/photo/2019/06/10/10/02/elder-4263825_960_720.png";
  constructor(private db : AngularFirestore,private router:Router){
    // this.db.collection('authors').doc('AJ').set({
    //   first_name:"Alex",
    //   last_name:"Johnson"
    // });
  }
  ngOnInit():void{
    this.db.collection("authors").get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        let item = doc.data();
        this.fullDB.push(item);
        this.filteredDB = this.fullDB;
      });
    });
  }
  go_to_details(first_name,last_name){
    let name = `${first_name.toLowerCase()}${last_name.toLowerCase()}`;
    this.router.navigate(['/details' , name])
  }
  filter(e){
    let searchbar_value = e.target.value;
    let authors = document.querySelectorAll('.author_card');
    authors.forEach((element:any) => {
      if(element.children[1].innerText.toUpperCase().indexOf(searchbar_value.toUpperCase()) > -1){
        element.style.display = '';
      }else{
        element.style.display = 'none';
      }
    })
    
    
  }
}
