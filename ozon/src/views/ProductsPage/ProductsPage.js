import {BasePage} from "../BasePage.js";
import {ListOfProducts} from "../Common/ListOfProducts/ListOfProducts.js"
import {Pagination} from "../Common/Pagination/Pagination";
import ProductsPageTemplate from "./ProductsPage.hbs"


export class ProductsPage extends BasePage {
    constructor(parent) {
        super(parent);
    }

    render = ({products, paginationInfo}) => {
        console.log(products);
        const productsListHtmlString = new ListOfProducts(products).getHtmlString();
        const pagination = new Pagination(paginationInfo).getHtmlString();
        const template = ProductsPageTemplate({
            productsList: productsListHtmlString,
            pagination: pagination,
        });
        return new DOMParser().parseFromString(template, 'text/html').getElementById('products-list-block');
    };
}
