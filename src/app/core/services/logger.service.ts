import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // <- Это значит: один сервис на всё приложение (синглтон)
})
export class LoggerService {

  log(message: string): void {
    console.log(`[LOG] ${new Date().toLocaleTimeString()}: ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR] ${new Date().toLocaleTimeString()}: ${message}`);
  }

  warn(message: string): void {
    console.warn(`[WARN] ${new Date().toLocaleTimeString()}: ${message}`);
  }
}
