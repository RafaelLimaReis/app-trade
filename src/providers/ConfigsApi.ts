import { Injectable } from "@angular/core";

@Injectable()
export class ConfigsApi{

  constructor() {}

  url(): string {
    return 'http://10.0.9.66:8080/';
  }

}
