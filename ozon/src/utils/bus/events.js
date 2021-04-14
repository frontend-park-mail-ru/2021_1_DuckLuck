
const Events = {
    LoginSendData: 'login-send-data',
    LoginEmitResult: 'login-emit-result',
    LoginIncorrectForm: 'login-incorrect-form',

    SignupSendData: 'signup-send-data',
    SignupEmitResult: 'signup-emit-result',
    SignupIncorrectForm: 'signup-incorrect-form',

    ProfileNewUserLoggedIn: 'profile-new-user-logged-in',
    ProfileFLNameChange: 'profile-flname-change',
    ProfileFLNameResult: 'profile-flname-result',
    ProfileIncorrectFLName: 'profile-incorrect-flname',
    ProfileAvatarChange: 'profile-avatar-change',
    ProfileAvatarResult: 'profile-avatar-result',
    ProfileIncorrectAvatar: 'profile-incorrect-avatar',
    ProfileEmailResult: 'profile-email-result',
    ProfileCheckAuthResult: 'profile-check-auth-result',
    ProfileAllResult: 'profile-all-result',
    ProfileAllGet: 'profile-all-get',

    ProductsLoad: 'products-load',
    ProductsLoaded: 'products-loaded',
    ProductsChangeCategory: 'products-change-category',

    ProductChangeID: 'product-changeID',
    ProductLoad: 'product-load',
    ProductLoaded: 'product-loaded',


    HeaderLoad: 'product-load',
    HeaderLoaded: 'product-loaded',
    HeaderChangeCatalogID: 'header-change-catalog-id',
    HeaderChangeCategoryID: 'header-change-category-id',

    CartAddProduct: 'cart-add-product',
    CartRemoveProduct: 'cart-remove-product',
    CartProductRemoved: 'cart-removed-product',
    CartLoad: 'cart-load',
    CartLoaded: 'cart-loaded',
    CartProductAdded: 'cart-product-added',

    OrderLoad: 'order-load',
    OrderLoaded: 'order-loaded',
    SendOrder: 'order-send',
};

export default Events;
