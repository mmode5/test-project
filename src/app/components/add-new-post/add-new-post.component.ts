import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostApiService } from '../../service/post-api.service';
import { ToastrService } from 'ngx-toastr';
import { NewPost } from '../../model/post.model';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss'],
})
export class AddNewPostComponent {
  postForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewPostComponent>,
    private fb: FormBuilder,
    private api: PostApiService,
    private toastr: ToastrService,

    @Inject(MAT_DIALOG_DATA) public data: { selectedUserId: number }
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      post: ['', [Validators.required, this.minCharCountValidator(20)]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  minCharCountValidator(minCount: number) {
    return (control: { value: string | any[] }) => {
      if (control.value && control.value.length < minCount) {
        return { minLength: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.postForm.valid) {
      const postData: NewPost = {
        title: this.postForm.value.title,
        body: this.postForm.value.post,
        userId: this.data.selectedUserId,
      };

      this.api.addPost(postData).subscribe(
        () => {
          this.toastr.success(`New post has been added`);
        },
        (error) => {
          this.toastr.error(`Failed to add new Post `);
        }
      );

      this.dialogRef.close();
    }
  }
}
