
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
};

export default Events;
