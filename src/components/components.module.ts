import { NgModule } from '@angular/core';
import { ListProductsComponent } from './list-products/list-products';
import { SliderComponent } from './slider/slider';
import { MenuComponent } from './menu/menu';
@NgModule({
	declarations: [ListProductsComponent,
    SliderComponent,
    MenuComponent],
	imports: [],
	exports: [ListProductsComponent,
    SliderComponent,
    MenuComponent]
})
export class ComponentsModule {}
