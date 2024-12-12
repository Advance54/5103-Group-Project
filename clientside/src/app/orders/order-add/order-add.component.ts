import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatComponentsModule } from '../../mat-components/mat-components.module';
import { Item } from '../../item/item';
import { OrderItem } from '../order-item.model';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [CommonModule, MatComponentsModule, ReactiveFormsModule],
  templateUrl: './order-add.component.html',
})

export class OrderAddComponent implements OnInit, OnDestroy
{
  @Input() items: Item[] | null = null;

  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  // // To prevent memory leaks
  formSubscription?: Subscription;
  // msg: string = '';
  // vendors: Vendor[] = [];
  // selectedVendor: Vendor = VENDOR_DEFAULT;
  // vendorProducts: Product[] = [];
  // selectedProduct: Product = PRODUCT_DEFAULT;
  // purchaseOrderItems: PurchaseOrderItem[] = [];
  // generatedPurchaseOrderId: number = 0;\
  orderItemsInOrder: OrderItem[] = []
  selectedItem: Item = {
    id: 0,
    item_name: "",
    amount: 0,
    description: "",
    item_order_cost: 0.0,
    item_cost: 0.0,
  }

  tableForm: FormControl;
  itemForm: FormControl;
  quantityForm: FormControl;
  orderFormGroup: FormGroup;

  constructor
    (
      private builder: FormBuilder,
      // private vendorService: VendorService,
      // private productService: ProductService,
      // private purchaseOrderService: PurchaseOrderService
    )
  {
    this.tableForm = new FormControl('', Validators.compose([Validators.required]));
    this.itemForm = new FormControl('');
    this.quantityForm = new FormControl('');

    this.orderFormGroup = this.builder.group({
      tableForm: this.tableForm,
      itemForm: this.itemForm,
      quantityForm: this.quantityForm,
    });
  }

  ngOnInit(): void
  {
    // this.msg = 'Loading vendors from server...';
    this.setupOnTableEnteredEvent();
    this.setupOnItemPickedEvent();
    this.setupOnQuantityPickedEvent();
    // this.getAllVendors();
  }

  ngOnDestroy(): void
  {
    if (this.formSubscription !== undefined)
    {
      this.formSubscription.unsubscribe();
    }
  }

  setupOnTableEnteredEvent(): void
  {
    this.formSubscription = this.orderFormGroup.get('tableForm')?.valueChanges.subscribe((table) =>
    {
      if (table === null)
      {
        return;
      }

      //Reset all fields and values that are specific to each choice of vendor
      this.itemForm.reset();
      this.quantityForm.reset();
      //this.selectedProduct = Object.assign({}, PRODUCT_DEFAULT);
      //this.vendorProducts = [];
      //this.purchaseOrderItems = [];
      //this.generatedPurchaseOrderId = 0;

      //this.selectedVendor = vendor;
      //this.loadVendorProducts();
      this.orderItemsInOrder = [];
      //this.msg = 'Choose product order for vendor';
    });
  }

  setupOnItemPickedEvent(): void
  {
    const itemSubscription = this.orderFormGroup.get('itemForm')?.valueChanges.subscribe(item =>
    {
      if (item === null)
      {
        return;
      }

      this.selectedItem = item;
    });

    this.formSubscription?.add(itemSubscription);
  }

  setupOnQuantityPickedEvent(): void
  {
    const quantitySubscription = this.orderFormGroup.get('quantityForm')?.valueChanges.subscribe(quantity =>
    {
      if (this.isProductAlreadySelected(this.selectedItem.id))
      {
        let item = this.getPurchaseOrderItem(this.selectedItem.id);

        if (item)
        {
          item.qty = quantity;
        }
      }
      // else
      // {
      //   let newPoItem: PurchaseOrderItem = {
      //     id: 0,
      //     poid: 0,
      //     productid: this.selectedProduct.id,
      //     qty: quantity,
      //     price: this.selectedProduct.costprice,
      //   }

      //   this.purchaseOrderItems.push(newPoItem);
      // }
      else
      {
        let newOrderItem: OrderItem = {
          id: 0,
          orderid: 0,
          itemid: this.selectedItem.id,
          qty: quantity,
          name: this.selectedItem.item_name,
          description: this.selectedItem.description,
          item_cost: this.selectedItem.item_cost,
        }

        this.orderItemsInOrder.push(newOrderItem);
      }

      this.orderItemsInOrder = this.orderItemsInOrder.filter(item => item.qty > 0);
    });

    this.formSubscription?.add(quantitySubscription);
  }

  // getAllVendors(verbose: boolean = true): void
  // {
  //   this.vendorService.getAll().subscribe({
  //     next: (vendors: Vendor[]) => this.vendors = vendors,
  //     error: (err: Error) => this.msg = `Failed to load vendors - ${ err.message }`,
  //     complete: () => verbose ? this.msg = `Vendors loaded!` : null,
  //   });
  // }

  // loadVendorProducts(): void
  // {
  //   this.vendorProducts = [];

  //   this.productService.getSome(this.selectedVendor.id, "products/vendor").subscribe({
  //     next: (products: Product[]) => this.vendorProducts = products,
  //     error: (err: Error) => this.msg = `Products fetch failed! - ${ err.message }`
  //   });
  // }

  getPurchaseOrderItem(itemid: number): OrderItem | undefined
  {
    return this.orderItemsInOrder.find(oiio => oiio.itemid === itemid);
  }

  isProductAlreadySelected(itemid: number): boolean
  {
    return this.orderItemsInOrder.find(oiio => oiio.itemid === itemid) !== undefined;
  }

  subtotal(): number
  {
    let result = 0;
    this.orderItemsInOrder.forEach(item => result += item.item_cost * item.qty);
    return result;
  }

  tax(): number
  {
    const TAX_PERCENTAGE = 0.13;
    return this.subtotal() * 0.13;
  }

  total(): number
  {
    return this.subtotal() + this.tax();
  }

  createReport(): void
  {
    const order: Order = {
      id: 0,
      tableNumber: this.tableForm.value,
      totalPrice: this.total(),
      dateTime: "",
      items: this.orderItemsInOrder
    };

    //this.resetGenerator();
    this.saved.emit(order);

    // this.orderService.add(po).subscribe({
    //   next: (purchaseOrder: PurchaseOrder) =>
    //   {
    //     if (purchaseOrder.id > 0)
    //     {
    //       this.msg = `Purchase order ${ purchaseOrder.id } added!`;
    //     }
    //     else
    //     {
    //       this.msg = 'Purchase order not added! - server error';
    //     }

    //     this.generatedPurchaseOrderId = purchaseOrder.id;
    //   },
    //   error: (err: Error) => (this.msg = `Purchase order not added! - ${ err.message }`),
    //   complete: () => this.resetGenerator(),
    // });
  }

  resetGenerator(): void
  {
    this.quantityForm.reset();
    this.itemForm.reset();
    this.tableForm.reset();
    //this.selectedItem = Object.assign({}, VENDOR_DEFAULT);
    //this.selectedProduct = Object.assign({}, PRODUCT_DEFAULT);
    //this.vendorProducts = [];
    this.orderItemsInOrder = [];
  }

  // viewPdf(): void
  // {
  //   window.open(`${ PDF_URL }?poid=${ this.generatedPurchaseOrderId }`);
  // }
}
