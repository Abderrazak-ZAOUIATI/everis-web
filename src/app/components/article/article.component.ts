import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ArticleService} from '../../services/article/article.service';
import {Article} from '../../models/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'] 
})

export class ArticleComponent implements OnInit {

  displayedColumns: string[] = ['title', 'publication-date', 'content', 'status','action-menu'];
  dataSource:any;
  isLoading = true;
  article:Article = new Article();
  title:string;
  content:string;

  constructor(private articleService:ArticleService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

    this.articleService.getAllArticles().subscribe(data => {

      console.log(data);
      this.isLoading = false; 
      this.dataSource = new MatTableDataSource<Article>(data);
      this.dataSource.paginator = this.paginator;
      }); 
  }

public doFilter = (value: string) => {
  this.dataSource.filter = value.trim().toLocaleLowerCase();
}


public createArticle(){ 

console.log(this.content);
}

}