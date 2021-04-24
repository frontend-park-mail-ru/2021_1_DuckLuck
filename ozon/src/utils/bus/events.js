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
    ProfileLogout: 'profile-logout',
    ProfileLogoutEmitResult: 'profile-logout-emit-result',
    ProfileIncorrectLogout: 'profile-logout-incorrect',

    ProductsLoad: 'products-load',
    ProductsLoadSearch: 'products-load-search',
    ProductsLoaded: 'products-loaded',
    ProductsChangeCategory: 'products-change-category',

    ProductChangeID: 'product-changeID',
    ProductLoad: 'product-load',
    ProductLoaded: 'product-loaded',


    HeaderLoad: 'product-load',
    HeaderLoaded: 'product-loaded',
    HeaderChangeCatalogID: 'header-change-catalog-id',
    HeaderChangeCategoryID: 'header-change-category-id',
    HeaderChangeCartItems: 'header-change-cart-items',

    CartAddProduct: 'cart-add-product',
    CartProductChange: 'cart-update-product',
    CartRemoveProduct: 'cart-remove-product',
    CartProductRemoved: 'cart-removed-product',
    CartLoad: 'cart-load',
    CartLoaded: 'cart-loaded',
    CartProductAdded: 'cart-product-added',
    CartLoadProductsAmount: 'cart-load-products-amount',
    CartLoadedProductsAmountReaction: 'cart-loaded-products-amount-reaction',
    CartGetProductsID: 'cart-get-products-ids',
    CartGetProductID: 'cart-get-product-id',
    CartLoadedProductsID: 'cart-loaded-products-ids',
    CartLoadedProductID: 'cart-loaded-product-id',


    OrderLoad: 'order-load',
    OrderLoaded: 'order-loaded',
    SendOrder: 'order-send',
};


export default Events;
