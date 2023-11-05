import { Component , OnInit} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../domain/product';
import { FrontendService } from '../services/frontend.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ConfirmationService,MessageService]

})
export class ProductComponent implements OnInit {
  productDialog: boolean;

  products: any = [];

  product: Product;

  selectedProducts: any[];

  types: any[];

  isEdit : Boolean = false;

  constructor( 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private frontendService: FrontendService
    ) { }

  ngOnInit() {

    this.types = [
        {label: '1', value: 1},
        {label: '2', value: 2},
    ];

    this.getAllProducts();
  }

  getAllProducts(){
    this.frontendService.getAllProducts().subscribe(
      res => {
        if(res.body.status && res.status == 200 ) {
          this.products = res.body.data;
        }
        else{
        }
      },
      err => {
        this.messageService.add({severity:'error', summary: 'Error!', detail: err.error.error, life: 3000});
        console.log(err);
      }
    );
  }

  openNew() {
    this.product = {};
    this.productDialog = true;
  }

  deleteSelectedProducts() {
      let that = this;

      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            let idsToDel = that.selectedProducts.map((product) => product.id);
            that.requestDelete(idsToDel)
            that.selectedProducts = null;    
          }
      });
  }

  deleteProduct(products: any[] | any) {
      let that = this;
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + products.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            that.requestDelete([products.id])
          }
      });
  }

  requestDelete(idsToDel:any){

    this.frontendService.deleteProducts(idsToDel).subscribe(
      res => {
        if(res.body.status && res.status == 200 ) {
          this.getAllProducts()
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
        else{
        }
      },
      err => {
        console.log(err.error.error);
        this.messageService.add({severity:'error', summary: 'Error!', detail: err.error.error, life: 3000});

      }
    );
  }
  
  editProduct(product:any) {
    this.isEdit = true;
    this.product = {...product};
    this.productDialog = true;
  }

  hideDialog() {
      this.productDialog = false;
  }

  saveProduct() {

      if(this.isEdit){
        this.frontendService.editProduct(this.product).subscribe(
          res => {
            if(res.body.status && res.status == 200 ) {
              this.getAllProducts()
            }
            else{
              this.messageService.add({severity:'error', summary: 'Error!', detail: "Something went wrong!", life: 3000});
            }
            this.productDialog = false;
            this.product = {};
            this.isEdit = false;
          },
          err => {
            this.isEdit = false;
            this.productDialog = false;
            this.product = {};
            console.log(err);
            this.messageService.add({severity:'error', summary: 'Error!', detail: err.error.error, life: 3000});
          }
        );
      }
      else{
        this.frontendService.addNewProduct(this.product).subscribe(
          res => {
            if(res.body.status && res.status == 200 ) {
              this.getAllProducts()
              this.productDialog = false;
              this.product = {};
            }
            else{
            }
          },
          err => {
            console.log(err);
          }
        );
      }
  }
}
