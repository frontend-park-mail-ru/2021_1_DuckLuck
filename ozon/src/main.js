import {ProfileView} from './views/ProfileView/ProfileView.js';
import {LoginView} from './views/LoginView/LoginView.js';
import {SignupView} from './views/SignupView/SignupView.js';
import {HomeView} from './views/HomeView/HomeView.js';
import {ProductView} from './views/ProductView/ProductView.js';
import {ProductsView} from './views/ProductsView/ProductsView';
import ProfilePresenter from './presenters/ProfilePresenter';
import Router from './Router.js';
import SignupModel from './models/SignupModel';
import SignupPresenter from './presenters/SignupPresenter';
import ProfileModel from './models/ProfileModel';
import LoginModel from './models/LoginModel';
import LoginPresenter from './presenters/LoginPresenter';
import ProductsModel from './models/ProductsModel';
import ProductsPresenter from './presenters/ProductsPresenter';
import ProductModel from './models/ProductModel';
import ProductPresenter from './presenters/ProductPresenter';

const application = document.getElementById('app');

Router.setRoot(application);

const signupView = new SignupView(application);
const signupModel = new SignupModel();
const signupPresenter = new SignupPresenter(signupView, signupModel);
signupView.presenter = signupPresenter;

const loginView = new LoginView(application);
const loginModel = new LoginModel();
const loginPresenter = new LoginPresenter(loginView, loginModel);
loginView.presenter = loginPresenter;

const profileView = new ProfileView(application);
const profileModel = new ProfileModel();
const profilePresenter = new ProfilePresenter(profileView, profileModel);
profileView.presenter = profilePresenter;

const productsView = new ProductsView(application);
const productsModel = new ProductsModel();
const productsPresenter = new ProductsPresenter(productsView, productsModel);
productsView.presenter = productsPresenter;

const productView = new ProductView(application);
const productModel = new ProductModel();
const productPresenter = new ProductPresenter(productView, productModel);
productView.presenter = productPresenter;


Router
    .register('/', HomeView)
    .register('/signup', SignupView)
    .register('/login', LoginView)
    .register('/profile', ProfileView)
    .register('/items', ProductsView)
    .register('/item', ProductView);

Router.start();
