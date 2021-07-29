import { FormCategory } from './../pages/Category/FormCategorys/index';
import { Categories } from './../pages/Category/Categories/index';
import { AUTH_CONFIG_API } from 'common/enum';
import { Home } from 'pages/Home';
import NotFound from 'pages/404';
import { Login } from 'pages/Login';
import { FormProduct, Products, Materials, FormMateral } from 'pages';
import { PATH } from "./path";

export default [
    {
        path: PATH.HOME,
        component:Home,
        exact: true,
        auth: AUTH_CONFIG_API.REQUIRED
    },
    {
        path: PATH.PRODUCTS_ALL,
        component:Products,
        exact: true,
        auth: AUTH_CONFIG_API.REQUIRED
    },
    {
        path: PATH.PRODUCT_CREATE,
        component:FormProduct,
        exact: true,
        auth: AUTH_CONFIG_API.REQUIRED
    },
    {
        path: PATH.MATERIAl_ALL,
        component:Materials,
        exact: true,
        auth: AUTH_CONFIG_API.REQUIRED
    },
    {
        path: PATH.MATERIAl_CREATE,
        component:FormMateral,
        exact: true,
        auth: AUTH_CONFIG_API.REQUIRED
    },
    {
        path: PATH.MATERIAl_EDIT,
        component:FormMateral,
        exact: true,
        auth: AUTH_CONFIG_API.REQUIRED
    },
    {
        path: PATH.CATEGORY_ALL,
        component:Categories,
        exact: true,
        auth: AUTH_CONFIG_API.REQUIRED
    },
    {
        path: PATH.CATEGORY_CREATE,
        component:FormCategory,
        exact: true,
        auth: AUTH_CONFIG_API.REQUIRED
    },
    {
        path: PATH.CATEGORY_EDIT,
        component:FormCategory,
        exact: true,
        auth: AUTH_CONFIG_API.REQUIRED
    },
    {
        path: PATH.LOGIN,
        component:Login,
        exact: true,
        auth: AUTH_CONFIG_API.NOT_REQUIRED
    },
    {
        path: PATH.NOT_FOUND,
        component:NotFound,
        exact: true,
        auth: AUTH_CONFIG_API.NOT_REQUIRED
    },
]