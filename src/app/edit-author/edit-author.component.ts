import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateUrl } from '../shared/url-validator.service';
import { MonthsconverterService } from '../shared/monthsconverter.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  @Input() data;
  @Input() name;
  @Input() books;
  constructor(private converter : MonthsconverterService, private db:AngularFirestore, private router :Router) { }
  EditAuthorForm:FormGroup;
  max = new Date().toISOString().split("T")[0];
  isAlive: boolean;
  ngOnInit(): void {
    
    
    let finalDOB;
    let finalDOD;
    let d_o_b = this.data.date_of_birth;
    let splittedDOB = d_o_b.split(' ');
    splittedDOB[1] = this.converter.monthDefinitionReverse(splittedDOB[1]);
    finalDOB = splittedDOB.reverse().join('-');
    let d_o_d = this.data.date_of_death;
    if(d_o_d == 'Present Day'){
      finalDOD = new Date().toISOString().substring(0,10);
      this.data.alive = true;
      this.isAlive = true;
      console.log(finalDOD);
    }else{
      let splittedDOD = d_o_d.split(' ');
      splittedDOD[1] = this.converter.monthDefinitionReverse(splittedDOD[1]);
      finalDOD = splittedDOD.reverse().join('-');
      this.data.alive = false;
      this.isAlive = false;
    }
    this.EditAuthorForm = new FormGroup({
      first_name: new FormControl(this.data.first_name, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), Validators.minLength(3), Validators.maxLength(20)]),
      last_name: new FormControl(this.data.last_name, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), Validators.minLength(3), Validators.maxLength(20)]),
      d_o_b: new FormControl(finalDOB, [Validators.required]),
      alive: new FormControl(this.data.alive),
      d_o_d: new FormControl(finalDOD, [Validators.required]),
      url: new FormControl(this.data.image_url, [ValidateUrl])
    });
    console.log(this.EditAuthorForm);
    this.EditAuthorForm.get('alive').valueChanges.subscribe(value => {
      if (value) {
        this.EditAuthorForm.get('d_o_d').clearValidators();
        this.EditAuthorForm.controls['d_o_d'].updateValueAndValidity();
        this.isAlive = true;
      } else {
        this.EditAuthorForm.get('d_o_d').setValidators([Validators.required]);
        this.EditAuthorForm.controls['d_o_d'].updateValueAndValidity();
        this.isAlive = false;
      }
    });
  }
  onSubmit(form){
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
    ref.set({
      first_name: first_name,
      last_name: last_name,
      date_of_birth: date_of_birth_final,
      books:this.books,
      date_of_death: date_of_death_final,
      image_url: url
    });
    if(doc_name.toLowerCase() != this.name.toLowerCase()){
      this.db.collection('authors').doc(this.name).delete(); 
    }
    let newRoute = `${first_name.toLowerCase()}${last_name.toLowerCase()}`;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['details', newRoute]));
  }
  onChildClickFunction(e){
    e.stopPropagation();
  }
  get fname(){return this.EditAuthorForm.get('first_name');}
  get lname(){return this.EditAuthorForm.get('last_name');}
  get dob(){return this.EditAuthorForm.get('d_o_b');}
  get dod(){return this.EditAuthorForm.get('d_o_d');}
  get url(){return this.EditAuthorForm.get('url');}
}

  
