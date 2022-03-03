import { Directive, Renderer2, ElementRef, OnInit, Input } from '@angular/core';
import { template } from 'lodash';
import {
  WEATHER_TEMPRATURE_SYMBOLS,
  WEATHER_TEMPRATURE_UNITS,
} from 'src/app/features/weather/constants/weather.constants';

@Directive({
  selector: '[backgroundTemperature]',
})
export class BackgroundTemperature implements OnInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  @Input() backgroundTemperature: number = 0;
  @Input() unit: string = WEATHER_TEMPRATURE_SYMBOLS.imperial;

  ngOnInit() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.convertTemperatureToColor()
    );
  }
  convertTemperatureToColor() {
    let temperature = this.backgroundTemperature;
    if (this.unit !== WEATHER_TEMPRATURE_SYMBOLS.imperial) {
      temperature = (temperature * 9) / 5 + 32;
    }
    let hue = 0,
      saturation = 0,
      lightness = 0;
    if (temperature < 70) {
      hue = Math.round(230 - temperature);
      saturation = 50;
      lightness = 50;
    }
    if (temperature > 70) {
      hue = Math.round(40 % temperature);
      saturation = 80;
      lightness = 60;
    }
    if (temperature > 80) {
      hue = Math.round(120 - temperature);
      saturation = 100;
      lightness = 50;
    }

    return 'hsla(' + hue + ',' + saturation + '%,' + lightness + '%, 100%)';

    // 240 = 0

    // 50 = 70
    // 30 = 100
    // 0 = 130
  }
}
