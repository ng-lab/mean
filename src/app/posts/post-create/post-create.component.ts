import { mimeType } from './post-create.validator';
import { Component, OnInit } from "@angular/core";
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { PostsService } from "../posts.service";
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  addPostForm: FormGroup;
  imagePreview: string;
  new_post;
  
  constructor(public postsService: PostsService, private fb: FormBuilder) {}
  
  ngOnInit() {
    this.addPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', Validators.required],
      image: ['', Validators.required, mimeType]
    });
  }

  triggerImagepreview(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = _ => {
      this.imagePreview = (reader.result as string);
    }
  }
  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addPostForm.patchValue({image: file});
    this.addPostForm.updateValueAndValidity();
    this.triggerImagepreview(file);
  }

  submit() {
    if(this.addPostForm.valid) {
      console.log('form:::', this.addPostForm.value);
      this.postsService.addPost(this.addPostForm.value.title, this.addPostForm.value.content, this.addPostForm.value.image).subscribe((data:any) => {
        debugger;
        this.new_post = data.post;
        this.addPostForm.reset();
      })
      
    }
  }
}
