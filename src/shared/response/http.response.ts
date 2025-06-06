import { Response } from "express";

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  UNPROCESSABLE_ENTITY = 422,

  INTERNAL_SERVER_ERROR = 500,
}

type StatusMessage = {
  [key in HttpStatus]: string;
};

const statusMessages: StatusMessage = {
  [HttpStatus.OK]: "Success",
  [HttpStatus.CREATED]: "Created",
  [HttpStatus.NO_CONTENT]: "No Content",
  [HttpStatus.BAD_REQUEST]: "Bad Request",
  [HttpStatus.UNAUTHORIZED]: "Unauthorized",
  [HttpStatus.FORBIDDEN]: "Forbidden",
  [HttpStatus.NOT_FOUND]: "Not Found",
  [HttpStatus.METHOD_NOT_ALLOWED]: "Method Not Allowed",
  [HttpStatus.UNPROCESSABLE_ENTITY]: "Unprocessable Entity",
  [HttpStatus.INTERNAL_SERVER_ERROR]: "Internal Server Error",
};

export class HttpResponse {
  private send(res: Response, status: HttpStatus, payload?: any): Response {
    if (status === HttpStatus.NO_CONTENT) {
      return res.status(status).send();
    }

    const isError = status >= 400;

    return res.status(status).json({
      status,
      status_msg: statusMessages[status],
      [isError ? "error" : "data"]: payload,
    });
  }

  Ok(res: Response, data?: any) {
    return this.send(res, HttpStatus.OK, data);
  }

  Created(res: Response, data?: any) {
    return this.send(res, HttpStatus.CREATED, data);
  }

  NoContent(res: Response) {
    return this.send(res, HttpStatus.NO_CONTENT);
  }

  BadRequest(res: Response, data?: any) {
    return this.send(res, HttpStatus.BAD_REQUEST, data);
  }

  Unauthorized(res: Response, data?: any) {
    return this.send(res, HttpStatus.UNAUTHORIZED, data);
  }

  Forbidden(res: Response, data?: any) {
    return this.send(res, HttpStatus.FORBIDDEN, data);
  }

  NotFound(res: Response, data?: any) {
    return this.send(res, HttpStatus.NOT_FOUND, data);
  }

  MethodNotAllowed(res: Response, data?: any) {
    return this.send(res, HttpStatus.METHOD_NOT_ALLOWED, data);
  }

  UnprocessableEntity(res: Response, data?: any) {
    return this.send(res, HttpStatus.UNPROCESSABLE_ENTITY, data);
  }

  Error(res: Response, data?: any) {
    return this.send(res, HttpStatus.INTERNAL_SERVER_ERROR, data);
  }
}
