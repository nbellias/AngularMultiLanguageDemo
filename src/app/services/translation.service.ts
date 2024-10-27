// src/app/translation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs'; // Import to handle promises synchronously

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};

  constructor(private http: HttpClient) {}

  // Synchronous initialization for default language
  async initTranslations(language: string) {
    const languageFilePath = `/i18n/${language}.json`;
    const data = await firstValueFrom(this.http.get(languageFilePath));
    this.translations = data;
  }

  loadTranslations(language: string) {
    const languageFilePath = `/i18n/${language}.json`;
    this.http.get(languageFilePath).subscribe((translations) => {
      this.translations = translations;
    });
  }

  translate(key: string): string {
    const keys = key.split('.');
    let result = this.translations;
    keys.forEach((k) => {
      result = result ? result[k] : null;
    });
    return result || key;
  }
}
