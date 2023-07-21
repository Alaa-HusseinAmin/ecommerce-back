import { globalErrorMiddleware } from '../middleware/globalErrorMiddleware.js';
import authRouter from '../modules/auth/auth.router.js';
import { AppError } from '../utils/AppError.js';
import AddressRouter from './address/address.router.js';
import BrandRouter from './brands/brands.router.js';
import CartRouter from './cart/cart.router.js';
import categoryRouter from './category/category.router.js';
import CouponRouter from './coupon/coupon.router.js';
import OrderRouter from './order/order.router.js';
import ProductRouter from './product/product.router.js';
import ReviewRouter from './review/review.router.js';
import SubCategoryRouter from './subcategory/subcategory.router.js';
import UserRouter from './user/user.router.js';
import wishListRouter from './wishlist/wishlist.router.js';
export function init(app){
    app.use('/api/v1/categories',categoryRouter)
    app.use('/api/v1/subcategories',SubCategoryRouter)
    app.use('/api/v1/brands',BrandRouter)
    app.use('/api/v1/products',ProductRouter)
    app.use('/api/v1/users',UserRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/Reviews',ReviewRouter)
    app.use('/api/v1/wishList',wishListRouter)
    app.use('/api/v1/address',AddressRouter)
    app.use('/api/v1/coupons',CouponRouter)
    app.use('/api/v1/carts',CartRouter)
    app.use('/api/v1/orders',OrderRouter)



    app.all('*',(req,res)=>{
        // res.json({message:`can't find this route: ${req.originalUrl}`})
        next(new AppError(`can't find this route: $(req.originalUrl)`,404))
    })
    // global error handling middelware
app.use(globalErrorMiddleware)
}