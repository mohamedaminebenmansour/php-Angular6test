// blog.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { NgFor } from '@angular/common';
import { catchError, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
interface Article {
  id: number;
  Title: string;
  Image: string;
  Introduction: string;
  LastMod: string;
  IdTheme: number;
  // Add other fields as needed
}
@Component({
  selector: 'app-blog',
  standalone:true,
  imports:[NgFor],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit   
 {
[x: string]: any;
  articleService = inject(ArticleService);
  private articles: Article[] = [];
  private httpClient = inject(HttpClient);   
article: any;
  

  ngOnInit() {
    this.httpClient.get<{ articles: Article[] }>('http://localhost:3000/index.php').pipe(
      map(resDara => resDara.articles)
    ).subscribe({
      next: (articles) => {
        this.articles=articles;
        console.log(articles);
      },
      error: (err) => console.error('Error fetching articles:', err) 
    })
  }
}