import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  dataSource;

  dataTable: User[] = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'address'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.dataTable = users;
      this.dataSource = new MatTableDataSource <User> (this.dataTable);
      this.dataSource.paginator = this.paginator;
    });
  }
}
