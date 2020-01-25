import {Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { formatDate } from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ArticleService} from '../../services/article/article.service';
import {Article} from '../../models/Article';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data', 
    'accept':'application/json'
  })
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'] 
})

export class ArticleComponent implements OnInit {

  displayedColumns: string[] = ['title', 'publication-date', 'content', 'status','action-menu'];
  createArticleFormGroup: FormGroup;
  dataSource:any;
  isLoading = true; 
  article:Article = new Article();
  articles:Array<Article>;
  uploadedImage: File  ;
  test:string;
  image:any;

  constructor(private articleService:ArticleService,
              private formBuilder:FormBuilder,
              private http:HttpClient
              ){}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

      this.articleService.getAllArticles().subscribe(data => {

      console.log(data);
      this.isLoading = false; 
      this.dataSource = new MatTableDataSource<Article>(data);
      this.dataSource.paginator = this.paginator;
      this.articles = data;
      }); 

      this.createArticleFormGroup = this.formBuilder.group({

        createArticleTitleCtrl:['',Validators.required],
        createArticleContentCtrl:['',Validators.required]
      });

  }

public doFilter = (value: string) => {
  this.dataSource.filter = value.trim().toLocaleLowerCase();
}

public createArticle(){
   
    let formData:FormData = new FormData();
     
    formData.append('image', this.uploadedImage);
    formData.append('title', this.article.title);
    formData.append('content', this.article.content);

    this.http.post<Article>('http://localhost:8080/api/articles/upload-image', formData)
    .subscribe(result=>{
      if(result.id != 0){
        const data = this.dataSource.data;
        data.push(result);
        this.dataSource.data = data;
      }
    }
    );
    
   /* this.article.publicationDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.article.status = "Active";
    this.articleService.createArticle(this.article).subscribe(result=>{
     
      console.log(result); 

      if(result.id != 0){
        const data = this.dataSource.data;
        data.push(result);
        this.dataSource.data = data;
      }
    });
*/
}  

uploadImageChange(event) {

  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {

      let file: File = fileList[0];
      this.uploadedImage = file;
  } /*
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        console.log(reader.result);
        //this.image = event.target.result;
        this.image = reader.result;
    };
*/
}

deleteArticle(article:Article){
  if(confirm("Are you sure to delete this article")){
  this.articleService.deleteArticle(article.id).subscribe(result=>{
    console.log(result);
    if(result[0] == "Success")
    {
      this.dataSource.data = this.dataSource.data.filter(art => art !== article);
    }
  });
}
}

updateArticle(articleId){

}

changeArticleStatus(article:Article){

  var message = "Do you want to activate this article?";

  if(article.status == "Active"){
    message = "Do you want to deactivate this article?";
  }
  
  if(confirm(message)){

    this.articleService.changeArticleStatus(article.id).subscribe(result => {
        if(result !== null){
          
          this.dataSource = this.articleService.getAllArticles();
      }
      }, error => console.log(error));
}

}
}