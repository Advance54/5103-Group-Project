import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../item';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../employee/employee';
@Component({
  selector: 'app-item-change',
  templateUrl: './item-change.component.html',

})
export class ItemChangeComponent {
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Input() selectedItem: Item = {
    id: 0,
    item_name: "",
    amount: 0,
    description: "",
    item_order_cost: 0,
    item_cost: 0}
    Form: FormGroup;
    item_name: FormControl;
    amount: FormControl;
    description: FormControl;
    item_order_cost: FormControl;
    item_cost: FormControl;
    employee:Employee;
    ismanager:boolean

    constructor(private builder: FormBuilder) {
    this.item_name =  new FormControl('', Validators.compose([Validators.required]));
    this.amount =  new FormControl('', Validators.compose([Validators.required]));
    this.description =  new FormControl('', Validators.compose([Validators.required]));
    this.item_order_cost =  new FormControl('', Validators.compose([Validators.required]));
    this.item_cost =  new FormControl('', Validators.compose([Validators.required]));
    this.ismanager = false;
    this.employee = {
      id: 0,
      title: '',
      firstlast: '',
      company: '',
      password: '',
      email: '',
      };
    this.Form = new FormGroup({
      item_name: this.item_name,
      amount: this.amount,
      description: this.description,
      item_order_cost: this.item_order_cost,
      item_cost: this.item_cost,

    });
    } // constructor
    ngOnInit(): void {

    //console.log(sessionStorage.getItem("login"))
    this.employee = JSON.parse(sessionStorage.getItem("login")|| '{}')[0]
    //console.log(this.employee.title)
    this.Form.patchValue({
      item_name: this.selectedItem.item_name,
      amount: this.selectedItem.amount,
      description: this.selectedItem.description,
      item_order_cost: this.selectedItem.item_order_cost,
      item_cost: this.selectedItem.item_cost,
    });
    this.Form.value.item_name =this.item_name
    //console.log(this.Form.value.item_name)
    this.isManager()
    } // ngOnInit
    isManager(){
      console.log(this.employee.title)
      if(this.employee.title !="Manager"){
        console.log(this.employee.title)


        this.Form.get('item_name')?.disable();
        this.Form.get('description')?.disable();
        this.Form.get('item_order_cost')?.disable();
        this.Form.get('item_cost')?.disable();

      }else{
        this.Form.get('item_name')?.enable();
        this.Form.get('description')?.enable();
        this.Form.get('item_order_cost')?.enable();
        this.Form.get('item_cost')?.enable();

      }

    }//Manager check
    updateSelectedItem(): void {
      console.log("Amount changed: " + (this.Form.getRawValue().amount - this.selectedItem.amount))
      console.log(this.selectedItem.id)
    this.selectedItem.item_name = this.Form.getRawValue().item_name;
    this.selectedItem.amount = this.Form.getRawValue().amount;
    this.selectedItem.description = this.Form.getRawValue().description;
    this.selectedItem.item_order_cost = this.Form.getRawValue().item_order_cost;
    this.selectedItem.item_cost = this.Form.getRawValue().item_cost;

    this.saved.emit(this.selectedItem);
    //window.location.reload();
    }

}
