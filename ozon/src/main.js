import {ProfileView} from './views/ProfileView/ProfileView.js';
import {LoginView} from './views/LoginView/LoginView.js';
import {SignupView} from './views/SignupView/SignupView.js';
import {HomeView} from './views/HomeView/HomeView.js';
import {ProductView} from './views/ProductView/ProductView.js';
import {ProductsView} from './views/ProductsView/ProductsView';
import ProfilePresenter from './presenters/ProfilePresenter';
import Router from './utils/router/Router.js';
import SignupModel from './models/SignupModel';
import SignupPresenter from './presenters/SignupPresenter';
import ProfileModel from './models/ProfileModel';
import LoginModel from './models/LoginModel';
import LoginPresenter from './presenters/LoginPresenter';
import ProductsModel from './models/ProductsModel';
import ProductsPresenter from './presenters/ProductsPresenter';
import ProductModel from './models/ProductModel';
import ProductPresenter from './presenters/ProductPresenter';
import {Bus} from './utils/bus/bus';

const application = document.getElementById('app');

Router.setRoot(application);

const homeView = new HomeView(application, null);

const signupBus = new Bus();
const signupView = new SignupView(application, signupBus);
const signupModel = new SignupModel(signupBus);
const signupPresenter = new SignupPresenter(signupView, signupModel, signupBus);
signupView.presenter = signupPresenter;

const loginBus = new Bus();
const loginView = new LoginView(application, loginBus);
const loginModel = new LoginModel(loginBus);
const loginPresenter = new LoginPresenter(loginView, loginModel, loginBus);
loginView.presenter = loginPresenter;

const profileBus = new Bus();
const profileView = new ProfileView(application, profileBus);
const profileModel = new ProfileModel(profileBus);
const profilePresenter = new ProfilePresenter(profileView, profileModel, profileBus);
profileView.presenter = profilePresenter;

const productsBus = new Bus();
const productsView = new ProductsView(application, productsBus);
const productsModel = new ProductsModel(productsBus);
const productsPresenter = new ProductsPresenter(productsView, productsModel, productsBus);
productsView.presenter = productsPresenter;

const productBus = new Bus();
const productView = new ProductView(application, productBus);
const productModel = new ProductModel(productBus);
const productPresenter = new ProductPresenter(productView, productModel, productBus);
productView.presenter = productPresenter;


Router
    .register('/', homeView)
    .register('/signup', signupView)
    .register('/login', loginView)
    .register('/profile', profileView)
    .register('/items', productsView)
    .register('/item', productView);

Router.start();
