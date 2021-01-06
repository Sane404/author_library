import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { ValidateUrl } from '../shared/url-validator.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MonthsconverterService } from '../shared/monthsconverter.service';
@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit {
  isAlive: boolean;
  max = new Date().toISOString().split("T")[0];
  newAuthorForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), Validators.minLength(3), Validators.maxLength(20)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), Validators.minLength(3), Validators.maxLength(20)]),
    d_o_b: new FormControl('', [Validators.required]),
    alive: new FormControl(''),
    d_o_d: new FormControl('', [Validators.required]),
    url: new FormControl('', [ValidateUrl])
  });
  constructor(private db: AngularFirestore, private converter : MonthsconverterService) { }
  ngOnInit(): void {
    this.newAuthorForm.get('alive').valueChanges.subscribe(value => {
      if (value) {
        this.newAuthorForm.get('d_o_d').clearValidators();
        this.newAuthorForm.controls['d_o_d'].updateValueAndValidity();
        this.isAlive = true;
      } else {
        this.newAuthorForm.get('d_o_d').setValidators([Validators.required]);
        this.newAuthorForm.controls['d_o_d'].updateValueAndValidity();
        this.isAlive = false;
      }
    }
    );
  }
  onSubmit(form) {
    let first_name = form.value.first_name;
    let last_name = form.value.last_name;
    let url = form.value.url;
    let date_of_death_final;
    let d_o_b__split = form.value.d_o_b.split('-');
    d_o_b__split[1] = this.converter.monthDefinition(d_o_b__split[1]);
    d_o_b__split.reverse();

    let date_of_birth_final = `${d_o_b__split[0]} ${d_o_b__split[1]} ${d_o_b__split[2]}`;
    if (this.isAlive) {
      date_of_death_final = 'Present Day';
    } else {
      let d_o_d__split = form.value.d_o_d.split('-');
      d_o_d__split[1] = this.converter.monthDefinition(d_o_d__split[1]);
      d_o_d__split.reverse();
      date_of_death_final = `${d_o_d__split[0]} ${d_o_d__split[1]} ${d_o_d__split[2]}`;
    }
    let doc_name = `${first_name.toUpperCase()}${last_name.toUpperCase()}`;
    let ref = this.db.collection('authors').doc(doc_name);
    ref.get().subscribe(doc => {
      if (doc.exists) { alert('Document Exists') }
      else {
        this.db.collection('authors').doc(doc_name).set({
          first_name: first_name,
          last_name: last_name,
          date_of_birth: date_of_birth_final,
          date_of_death: date_of_death_final,
          image_url: url,
          books:[]
        });
        this.playAnimation();
      }
    })
  }
  resetAnimation() {
    let succes_message = document.querySelector('.success');
    succes_message.classList.remove('show');
  }
  playAnimation() {
    let succes_message = document.querySelector('.success');
    succes_message.classList.add('show');
  }
  get fname(){return this.newAuthorForm.get('first_name');}
  get lname(){return this.newAuthorForm.get('last_name');}
  get dob(){return this.newAuthorForm.get('d_o_b');}
  get dod(){return this.newAuthorForm.get('d_o_d');}
  get url(){return this.newAuthorForm.get('url');}
  
}


