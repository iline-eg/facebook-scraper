export interface CategoryList {
  id: string;
  name: string;
}

export interface From {
  name: string;
  id: string;
  category: string;
  category_list: CategoryList[];
}

export interface MessageTag {
  id: string;
  length: number;
  name: string;
  offset: number;
  type: string;
}

export interface Comment {
  created_time: Date;
  from: From;
  message: string;
  can_remove: boolean;
  like_count: number;
  user_likes: boolean;
  id: string;
  message_tags: MessageTag[];
}

export interface Cursors {
  before: string;
  after: string;
}

export interface Paging {
  cursors: Cursors;
  next: string;
}

export interface CommentPaging {
  data: Comment[];
  paging: Paging;
}
