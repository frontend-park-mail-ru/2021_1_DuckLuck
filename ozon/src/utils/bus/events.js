
const Events = {
    LoginSendData: 'login-send-data',
    LoginEmitResult: 'login-emit-result',
    LoginIncorrectForm: 'login-incorrect-form',

    SignupSendData: 'signup-send-data',
    SignupEmitResult: 'signup-emit-result',
    SignupIncorrectForm: 'signup-incorrect-form',

    ProfileFLNameChange: 'profile-flname-change',
    ProfileFLNameResult: 'profile-flname-result',
    ProfileIncorrectFLName: 'profile-incorrect-flname',
    ProfileAvatarChange: 'profile-avatar-change',
    ProfileAvatarResult: 'profile-avatar-result',
    ProfileIncorrectAvatar: 'profile-incorrect-avatar',
    ProfileEmailResult: 'profile-email-result',
    ProfileCheckAuthResult: 'profile-check-auth-result',

    ProductsLoad: 'products-load',
    ProductsLoaded: 'products-loaded',

    ProductChangeID: 'product-changeID',
    ProductLoad: 'product-load',
    ProductLoaded: 'product-loaded',

    HeaderLoad: 'product-load',
    HeaderLoaded: 'product-loaded',
    HeaderChangeCatalogID: 'header-change-catalog-id',
    HeaderChangeCategoryID: 'header-change-category-id',
};

export default Events;
