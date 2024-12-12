import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatComponentsModule } from '../../mat-components/mat-components.module';
import { Item } from '../../item/item';

@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [CommonModule, MatComponentsModule, ReactiveFormsModule],
  templateUrl: './order-add.component.html',
})

export class OrderAddComponent implements OnInit/*, OnDestroy*/
{
  @Input() items: Item[] | null = null;

  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  // // To prevent memory leaks
  // formSubscription?: Subscription;
  // msg: string = '';
  // vendors: Vendor[] = [];
  // selectedVendor: Vendor = VENDOR_DEFAULT;
  // vendorProducts: Product[] = [];
  // selectedProduct: Product = PRODUCT_DEFAULT;
  // purchaseOrderItems: PurchaseOrderItem[] = [];

  // generatedPurchaseOrderId: number = 0;

  // vendorForm: FormControl;
  // productForm: FormControl;
  // quantityForm: FormControl;
  // generatorFormGroup: FormGroup;

  constructor
    (
    // private builder: FormBuilder,
    // private vendorService: VendorService,
    // private productService: ProductService,
    // private purchaseOrderService: PurchaseOrderService
  )
  {
    // this.vendorForm = new FormControl('');
    // this.productForm = new FormControl('');
    // this.quantityForm = new FormControl('');

    // this.generatorFormGroup = this.builder.group({
    //   vendor: this.vendorForm,
    //   product: this.productForm,
    //   quantity: this.quantityForm,
    // });
  }

  ngOnInit(): void
  {
    // this.msg = 'Loading vendors from server...';
    // this.setupOnVendorPickedEvent();
    // this.setupOnProductPickedEvent();
    // this.setupOnQuantityPickedEvent();
    // this.getAllVendors();
  }

  // ngOnDestroy(): void
  // {
  //   if (this.formSubscription !== undefined)
  //   {
  //     this.formSubscription.unsubscribe();
  //   }
  // }

  // setupOnVendorPickedEvent(): void
  // {
  //   this.formSubscription = this.generatorFormGroup.get('vendor')?.valueChanges.subscribe((vendor) =>
  //   {
  //     if (vendor === null)
  //     {
  //       return;
  //     }

  //     //Reset all fields and values that are specific to each choice of vendor
  //     this.productForm.reset();
  //     this.quantityForm.reset();
  //     this.selectedProduct = Object.assign({}, PRODUCT_DEFAULT);
  //     this.vendorProducts = [];
  //     this.purchaseOrderItems = [];
  //     this.generatedPurchaseOrderId = 0;

  //     this.selectedVendor = vendor;
  //     this.loadVendorProducts();
  //     this.purchaseOrderItems = [];
  //     this.msg = 'Choose product order for vendor';
  //   });
  // }

  // setupOnProductPickedEvent(): void
  // {
  //   const productSubscription = this.generatorFormGroup.get('product')?.valueChanges.subscribe(product =>
  //   {
  //     if (product === null)
  //     {
  //       return;
  //     }

  //     this.selectedProduct = product;
  //   });

  //   this.formSubscription?.add(productSubscription);
  // }

  // setupOnQuantityPickedEvent(): void
  // {
  //   const quantitySubscription = this.generatorFormGroup.get('quantity')?.valueChanges.subscribe(quantity =>
  //   {
  //     if (this.isProductAlreadySelected(this.selectedProduct.id))
  //     {
  //       let item = this.getPurchaseOrderItem(this.selectedProduct.id);

  //       if (item)
  //       {
  //         item.qty = quantity;
  //       }
  //     }
  //     else
  //     {
  //       let newPoItem: PurchaseOrderItem = {
  //         id: 0,
  //         poid: 0,
  //         productid: this.selectedProduct.id,
  //         qty: quantity,
  //         price: this.selectedProduct.costprice,
  //       }

  //       this.purchaseOrderItems.push(newPoItem);
  //     }

  //     this.purchaseOrderItems = this.purchaseOrderItems.filter(item => item.qty > 0);
  //   });

  //   this.formSubscription?.add(quantitySubscription);
  // }

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

  // getPurchaseOrderItem(productid: string): PurchaseOrderItem | undefined
  // {
  //   return this.purchaseOrderItems.find(poi => poi.productid === productid);
  // }

  // isProductAlreadySelected(productid: string): boolean
  // {
  //   return this.purchaseOrderItems.find(poi => poi.productid === productid) !== undefined;
  // }

  // subtotal(): number
  // {
  //   let result = 0;
  //   this.purchaseOrderItems.forEach(item => result += item.price * item.qty);
  //   return result;
  // }

  // tax(): number
  // {
  //   const TAX_PERCENTAGE = 0.13;
  //   return this.subtotal() * 0.13;
  // }

  // total(): number
  // {
  //   return this.subtotal() + this.tax();
  // }

  // createReport(): void
  // {
  //   const po: PurchaseOrder = {
  //     id: 0,
  //     vendorid: this.selectedVendor.id,
  //     amount: this.total(), //THIS will be ignored by the server
  //     podate: '', //SAME here
  //     items: this.purchaseOrderItems,
  //   };

  //   this.purchaseOrderService.add(po).subscribe({
  //     next: (purchaseOrder: PurchaseOrder) =>
  //     {
  //       if (purchaseOrder.id > 0)
  //       {
  //         this.msg = `Purchase order ${ purchaseOrder.id } added!`;
  //       }
  //       else
  //       {
  //         this.msg = 'Purchase order not added! - server error';
  //       }

  //       this.generatedPurchaseOrderId = purchaseOrder.id;
  //     },
  //     error: (err: Error) => (this.msg = `Purchase order not added! - ${ err.message }`),
  //     complete: () => this.resetGenerator(),
  //   });
  // }

  // resetGenerator(): void
  // {
  //   this.quantityForm.reset();
  //   this.productForm.reset();
  //   this.vendorForm.reset();
  //   this.selectedVendor = Object.assign({}, VENDOR_DEFAULT);
  //   this.selectedProduct = Object.assign({}, PRODUCT_DEFAULT);
  //   this.vendorProducts = [];
  //   this.purchaseOrderItems = [];
  // }

  // viewPdf(): void
  // {
  //   window.open(`${ PDF_URL }?poid=${ this.generatedPurchaseOrderId }`);
  // }
}
