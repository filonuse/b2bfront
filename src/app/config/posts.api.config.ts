class PostsApiConfig {
  public getAll(requestData) {
    return '/' + requestData;
  }
}

export const POSTS_API = new PostsApiConfig();
