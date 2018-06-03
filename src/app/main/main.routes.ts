import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

export const mainRoutes: Routes = [
    {
        path: '', component: MainComponent, children: [

            { path: '', redirectTo: 'home', pathMatch: 'full' },

            { path: 'home', loadChildren: './home/home.module#HomeModule' },

            { path: 'user', loadChildren: './user/user.module#UserModule' },

            { path: 'product', loadChildren: './product/product.module#ProductModule' },

            { path: 'product-category', loadChildren: './product-category/product-category.module#ProductCategoryModule' },

            { path: 'function', loadChildren: './function/function.module#FunctionModule' },

            { path: 'role', loadChildren: './role/role.module#RoleModule' },

            { path: 'log', loadChildren: './log/log.module#LogModule' },

            { path: 'import', loadChildren: './import/import.module#ImportModule' },

            { path: 'color', loadChildren: './color/color.module#ColorModule' },

            { path: 'unit', loadChildren: './unit/unit.module#UnitModule' },

            { path: 'size', loadChildren: './size/size.module#SizeModule' },

            { path: 'supplier', loadChildren: './supplier/supplier.module#SupplierModule' },
        ]
    }
]