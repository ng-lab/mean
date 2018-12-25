import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private BASE_URL = 'http://localhost:3000/api';

  constructor(private Http: HttpClient) { }

  getPosts() {
    return this.Http.get(`${this.BASE_URL}/posts`).pipe(
      map((data:any) =>  data.posts.map(post => {
        return {
          id: post._id,
          title: post.title,
          content: post.content
        }
      }))
    )
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    return this.Http.post(`${this.BASE_URL}/posts`, post);
  }

  deletePost(id) {
    return this.Http.delete(`${this.BASE_URL}/posts/${id}`);
  }
}
