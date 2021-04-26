export const serverHost = process.env.SERVER_HOST;
export const fileServerHost = process.env.FILE_SERVER_HOST;
export const staticServerHost = process.env.STATIC_SERVER_HOST;
export const serverApiPath = `${serverHost}/api/v1`;

export const urls = {
    loginUrl: '/user/login',
    logoutUrl: '/user/logout',
    signupUrl: '/user/signup',
    profileUrl: '/user/profile',
    profileAvatarUrl: '/user/profile/avatar',
    productUrl: '/product',
    defaultAvatar: '/avatar/default.png',
    csrfUrl: '/csrf',
    cart: '/cart',
    cartProduct: '/cart/product',
    order: '/order',
    sessionUrl: '/session'  ,
};
