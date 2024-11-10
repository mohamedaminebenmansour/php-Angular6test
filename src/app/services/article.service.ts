// article.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

interface Article {
  id: number;
  Title: string;
  Image: string;
  Introduction: string;
  LastMod: string;
  IdTheme: number;
  // Add other fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private httpClient = inject(HttpClient);
  private articles = signal<Article[]>([]);

  // Expose articles as a readonly signal for components to subscribe to
  loadedArticles = this.articles.asReadonly();

  // Load articles and update the signal
  loadArticles() {
    console.log('Attempting to load articles from backend...');
    return this.fetchArticles('http://localhost:3000/index.php').pipe(
      tap({
        next: (articles) => {
          console.log('Articles loaded successfully:', articles);
          this.articles.set(articles);
        }
      })
    );
  }

  // Private method to handle fetching articles from the backend
  private fetchArticles(url: string) {
    console.log('Fetching articles from URL:', url);
    return this.httpClient.get<{ articles: Article[] }>(url).pipe(
      map((resData) => {
        console.log('Response data:', resData);
        return resData.articles;
      }),
      catchError((error) => {
        console.error('Error fetching articles:', error);
        return throwError(() => new Error('Failed to fetch articles.'));
      })
    );
  }
}
