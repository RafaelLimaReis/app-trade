import { NgModule } from '@angular/core';
import { ListProductsComponent } from './list-products/list-products';
import { SliderComponent } from './slider/slider';
@NgModule({
	declarations: [ListProductsComponent,
    SliderComponent],
	imports: [],
	exports: [ListProductsComponent,
    SliderComponent]
})
export class ComponentsModule {}
