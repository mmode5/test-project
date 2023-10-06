import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostApiService } from '../../service/post-api.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { Post } from '../../model/post.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddNewPostComponent } from '../add-new-post/add-new-post.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  posts$: Observable<Post[]> | undefined;
  selectedPostId: number | undefined;
  selectedUserId: number | undefined;
  formData: any;
  @ViewChild('input') input: ElementRef | undefined;

  constructor(
    private api: PostApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewPostComponent, {
      width: '800px',
      height: '500px',
      data: { selectedUserId: this.selectedUserId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['userId']),
        switchMap((userId) => {
          if (userId) {
            this.selectedUserId = userId;
            return this.api.getPostsByUserId(+userId);
          } else {
            return this.api.getPosts();
          }
        })
      )
      .subscribe((posts) => {
        this.posts$ = of(posts);
      });
  }

  deletePost(id: number) {
    this.api.deletePost(id).subscribe(
      () => {
        this.toastr.success(`Post No:${id} has been deleted`);
      },
      (error) => {
        this.toastr.error(`Failed to delete Post No:${id}`);
      }
    );
  }

  enterEdit(id: number) {
    this.selectedPostId = id;
  }
  edit(post: Post) {
    const body = this.input?.nativeElement.value;

    this.api
      .editPost(post.id, {
        ...post,
        body,
      })
      .subscribe(
        () => {
          this.toastr.success('Post has been updated');
          this.cancelEdit();
        },
        (error) => {
          this.toastr.error('Failed to update the post');
        }
      );
  }
  cancelEdit() {
    this.selectedPostId = undefined;
  }
}
