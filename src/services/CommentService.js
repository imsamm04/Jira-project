import { baseService } from "./baseService";

export class CommentService extends baseService {
  constructor() {
    super();
  }

  getAllComment = (taskId) => {
    return this.get(`Comment/getAll?taskId=${taskId}`);
  };
}

export const commentService = new CommentService();
