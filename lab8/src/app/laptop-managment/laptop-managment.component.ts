import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, } from 'rxjs';
import { Laptop, LaptopService } from '../laptop.service';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-laptop-managment',
  templateUrl: './laptop-managment.component.html',
  styleUrls: ['./laptop-managment.component.css']
})
export class LaptopManagmentComponent implements OnInit {

  public laptops: Laptop[] = [];

  public editingLaptop?: Laptop;

  addForm = new FormGroup({
    modelName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  })

  editForm = new FormGroup({
    modelName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });

  searchField = new FormControl('');
  searchText$ = new BehaviorSubject('');
  searchResults$: Observable<Laptop[]>;

  addLaptop(){
    this.laptopService.addLaptop({
      id: '',
      modelName: this.addForm.value.modelName,
      price: this.addForm.value.price
    }).subscribe(() => {
      this.loadLaptops();
    })
  }

  editLaptop(laptop: Laptop){
    this.editingLaptop = laptop;
  }

  updateLaptop(){
    this.laptopService.updateLaptop({
      id: this.editingLaptop!.id,
      modelName: this.editForm.value.modelName,
      price: this.editForm.value.price
    }).subscribe(d => {
      this.editingLaptop = undefined;
      this.loadLaptops();
    })
  }

  deleteLaptop(id: string){
    this.laptopService.deleteLaptop(id).subscribe(() =>{
      this.loadLaptops();
    })
  }

  cancelEditLaptop(){
    this.editingLaptop = undefined;
  }
  
  loadLaptops(){
    this.laptopService.getLaptops().subscribe(d=>{
      this.laptops = d;
    })
  }


  constructor(private laptopService: LaptopService) { }

  ngOnInit(): void {
    this.loadLaptops();

    this.searchResults$ = this.searchText$.pipe(
      debounceTime(500),
      switchMap(query => this.laptopService.findLaptopByName(query))
    );

    this.searchField.valueChanges.subscribe(this.searchText$);
  }

}
