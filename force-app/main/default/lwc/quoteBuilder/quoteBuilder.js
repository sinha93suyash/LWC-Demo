import Quantity from '@salesforce/schema/Asset.Quantity';
import { LightningElement } from 'lwc';
import saveQuote from '@salesforce/apex/AccountCtrl.saveQuote';
const COLS =[
    {label:"Name", fieldName:"ProductName"},
    {label:"Quantity", fieldName:"Quantity"},
    {label:"Unit Price", fieldName:"UnitPrice"},
    {label:"Total Price", fieldName:"TotalPrice"},
    {
        type: "button-icon",
        fixedWidth: 60,
        typeAttributes: {
            iconName: "utility:delete",
            name: "remove",
            title: "Remove",
            alternativeText: "Remove",
            variant: "bare",
            iconClass: "slds-icon-text-error"
        }
    }
]

export default class QuoteBuilder extends LightningElement {

    selectedAccId;
    selectedProducts = [];
    columns = COLS
    buttonRender = false;
    pricebook2Id;
    selectedAccHandler(event){
        this.selectedAccId= event.detail.Id
    }
   selectedProdHandler(event) {
    const product = event.detail

    const existing = this.selectedProducts.find(
        item => item.ProductName === product.ProductName
    );

    if (existing) {
        existing.Quantity += 1;
        existing.TotalPrice = existing.Quantity * existing.UnitPrice;

        this.selectedProducts = [...this.selectedProducts];
        
    } else {
        this.selectedProducts = [
            ...this.selectedProducts,
            {
                ...product,
                Quantity: 1,
                TotalPrice: product.UnitPrice
            }
        ];
        
    }

    console.log(JSON.stringify(this.selectedProducts));
}

    deleteHandler(event){
        const productDetail = event.detail.row;
        this.selectedProducts = this.selectedProducts.filter(item=>item.ProductName !== productDetail.ProductName)
        console.log('delete selected Products', JSON.stringify(this.selectedProducts))
    }

    addHandler(){
        console.log('Testing::::::::::::', JSON.stringify(this.selectedProducts));
        saveQuote({
            products: this.selectedProducts
        }).then(result => {
             console.log('Quote Id:', result);
        }).catch(error => {
            console.log('Error', error)
        })
    }
    
}