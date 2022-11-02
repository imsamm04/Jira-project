import { baseService } from "./baseService";

export class CommentService extends baseService {
  constructor() {
    super();
  }

  getAllComment = (taskId) => {
    return this.get(`Comment/getAll?taskId=${taskId}`);
  };

  createUserComment = (commentValue) => {
    return this.post(`Comment/insertComment`, commentValue);
  };

  deleteUserComment = (id) => {
    return this.delete(`Comment/deleteComment?idComment=${id}`);
  };
}

export const commentService = new CommentService();
