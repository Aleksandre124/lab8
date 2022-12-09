import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Laptop } from '../laptop.service';

@Component({
  selector: 'app-laptop-managment',
  templateUrl: './laptop-managment.component.html',
  styleUrls: ['./laptop-managment.component.css']
})
export class LaptopManagmentComponent implements OnInit {

  public laptops: Laptop[] = [];

  editForm = new FormGroup({
    modelName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });


  constructor() { }

  ngOnInit(): void {
  }

}
