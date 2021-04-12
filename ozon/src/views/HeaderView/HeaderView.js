import {BaseView} from '../BaseView.js';
import headerStyles from './HeaderView.css';
import buttonStyles from '../Common/Button/Button.css';
import imgStyles from '../Common/Img/Img.css';
import inputStyles from '../Common/Input/Input.css';
import decorators from '../decorators.css';
import headerTemplate from './HeaderView.hbs';
import {staticServerHost} from '../../utils/urls/urls.js';
import Events from '../../utils/bus/events';
import {Img} from '../Common/Img/Img';
import {Button} from '../Common/Button/Button';
import {Input} from '../Common/Input/Input';
import Router from '../../utils/router/Router';
import {Bus} from '../../utils/bus/bus';

/**
 * @class HeaderView
 * @extends BaseView
 * @classdesc Class for Header page
 */
export class HeaderView extends BaseView {
    show = () => {
        this.bus.emit(Events.HeaderLoad, this.ID);
    }

    /**
     *
     */
    render = () => {
        this.parent.innerHTML = '';
        const logo = new Img({src: staticServerHost + '/svg/header/logo.svg'});
        const headerMenu = [
            {
                text: 'Войти',
                img: new Img({src: staticServerHost + '/svg/header/smile.svg'}),
                button: new Button(),
                href: '/login',
            }, {
                text: 'Заказы',
                img: new Img({src: staticServerHost + '/svg/header/orders.svg'}),
                button: new Button(),
                href: '/orders',
            }, {
                text: 'Избранное',
                img: new Img({src: staticServerHost + '/svg/header/favorites.svg'}),
                button: new Button(),
                href: '/favorites',
            }, {
                text: 'Корзина',
                img: new Img({src: staticServerHost + '/svg/header/cart.svg'}),
                button: new Button(),
                href: '/cart',
            },
        ];
        const catalog = {
            text: 'Каталог',
            img: [
                new Img({src: staticServerHost + '/svg/header/catalog.svg'}),
                new Img({src: staticServerHost + '/svg/header/catalog_close.svg'}),
            ],
            categories: this.presenter.categories,
        };
        const searchBlock = {
            searchButton: {
                button: new Button(),
                img: new Img({src: staticServerHost + '/svg/header/search.svg'}),
            },
            searchInput: new Input({
                placeholder: 'Искать на Ozon',
                type: 'text',
                name: 'search',
            }),
            searchArea: {
                text: 'Везде',
                img: new Img({src: staticServerHost + '/svg/header/area.svg'}),
            },
        };
        const template = headerTemplate({
            logo: logo,
            headerMenu: headerMenu,
            catalog: catalog,
            searchBlock: searchBlock,
            currentCategory: this.ID,
            headerStyles: headerStyles,
            imgStyles: imgStyles,
            inputStyles: inputStyles,
            buttonStyles: buttonStyles,
            decorators: decorators,
        });

        this.cache = new DOMParser().parseFromString(template, 'text/html')
            .getElementsByClassName(headerStyles.main)[0];

        const logoButton = this.cache.getElementsByClassName(headerStyles.logoBlock)[0];
        logoButton.addEventListener('click', () => {
            Router.open('/');
        });

        this.cache.addEventListener('click', (evt) => {
            if (evt.target.hasAttribute('category')) {
                const categoryId = parseInt(evt.target.getAttribute('category'));
                // Bus.globalBus.emit(Events.HeaderChangeCategoryID, categoryId);
                Router.open('/items', {id: categoryId});
            }
        });

        const menuItems = Array.from(this.cache.getElementsByClassName(headerStyles.menuItem));
        menuItems.forEach((menuItem) => {
            menuItem.addEventListener('click', () => {
                const href = menuItem.getAttribute('href');
                Router.open(href);
            });
        });


        const catalogBlock = this.cache.getElementsByClassName(headerStyles.catalogBlock)[0];
        const catalogList = this.cache.getElementsByClassName(headerStyles.catalogList)[0];
        catalogBlock.addEventListener('click', () => {
            const images = Array.from(catalogBlock.getElementsByClassName(imgStyles.menuImgL));
            if (images[0].classList.contains(decorators.hidden)) {
                images[0].classList.remove(decorators.hidden);
                images[1].classList.add(decorators.hidden);
                catalogList.classList.add(decorators.hidden);
            } else {
                images[1].classList.remove(decorators.hidden);
                images[0].classList.add(decorators.hidden);
                catalogList.classList.remove(decorators.hidden);
            }
        });

        const catalogListCategories = this.cache.getElementsByClassName(headerStyles.category);
        const catalogListSubcategories = Array.from(
            this.cache.getElementsByClassName(headerStyles.catalogListSubcategories),
        );
        Array.from(catalogListCategories).forEach((category, i) => {
            category.addEventListener('mouseover', () => {
                if (i !== this.presenter.currentCategoryIndex) {
                    catalogListSubcategories[i].classList.remove(decorators.hidden);
                    catalogListSubcategories[this.presenter.currentCategoryIndex].classList.add(decorators.hidden);
                    this.presenter.currentCategoryIndex = i;
                }
            });
        });
        this.parent.appendChild(this.cache);
    }
}
