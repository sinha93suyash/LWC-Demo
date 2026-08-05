import { LightningElement } from 'lwc';
import GETPRODUCT from '@salesforce/apex/AccountCtrl.getProduct'
const COLS =[
    {label:"Name", fieldName:"ProductName"},
    {label:"Unit Price", fieldName:"UnitPrice"},
    {label:"Product Code", fieldName:"Productcode"},
    {type:"button",typeAttributes:
        {
            label: "Add",
            Name:"Add",
            Variant:"Brand"

        }
    }
    
]
export default class ProductSearch extends LightningElement {
    timer
    selectedProduct = []
    searchKey
    productSearchKey
    prodData
    SelectedProductId;
    columns=COLS
    showModal = false;
    objectApiName = 'Product2'
    productHandler(event){
        window.clearTimeout(this.timer)
        this.productSearchKey = event.target.value
        this.timer = window.setTimeout(()=>{
            this.productHandlermethod();
        },1000)
    }
    productHandlermethod(){
        GETPRODUCT({searchKey:this.productSearchKey})
    .then(result =>{
        console.log('hello',result)
        this.prodData = result.map(record =>({
            PricebookEntryId: record.Id,
            product2Id:record.Product2.Id,
            ProductName: record.Product2.Name,
            UnitPrice: record.UnitPrice,
            Productcode: record.Product2.ProductCode
        }))
        console.log('ProdData::::::::',JSON.stringify(this.prodData))

        
    })
    .catch(error =>{
            console.error(error)
        })
    }

    getSelectedProductId(event){
        this.showModal = true;
          this.SelectedProduct = event.detail.row
        console.log('Event detail', JSON.stringify(event.detail))
        const productEvent = new CustomEvent('productselect',{
            detail: this.SelectedProduct
        })
        this.dispatchEvent(productEvent)
    }

    popUpCloseHandler(){
        this.showModal = false;
    }
}