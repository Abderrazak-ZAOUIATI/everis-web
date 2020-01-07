import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Article } from '../../models/Article';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

    articleUrl:string = '';
  
  
    constructor(private http:HttpClient) { }
  
    getAllOffer():Observable<Article[]> {
      return this.http.get<Article[]>(this.articleUrl);
    }
  
    getArticleById(id:number):Observable<Article> {
      return this.http.get<Article>(this.articleUrl + '/' + id);
    }
  
    createArticle(article:Article):Observable<Article> {
      return this.http.post<Article>(this.articleUrl, article, httpOptions);
    }
  
    updateArticle(article:Article):Observable<Article> {
      return this.http.put<Article>(this.articleUrl, article, httpOptions);
    }
  
    deleteArticle(article:Article):Observable<Article> {
      return this.http.delete<Article>(this.articleUrl + '/' + article.id, httpOptions);
    }
}
