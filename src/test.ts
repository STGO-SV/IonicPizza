// Archivo requerido por karma.conf.js, carga en forma recursiva .spec y el framework

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// Primero inicializar entorno de pruebas.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Encontramos las pruebas.
const context = require.context('./', true, /\.spec\.ts$/);
// Cargamos los módulos.
context.keys().map(context);
