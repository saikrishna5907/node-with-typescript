import { Router } from "express";

import swagger, { SwaggerOptions } from 'swagger-ui-express';

const route = Router();

export const setUpSwagger = (): SwaggerOptions => {
  return {
    swaggerDefination: {
      info: {
        openapi: "3.0.3", // present supported openapi version
        info: {
          title: "Node Project", // short title.
          description: "Node project with best practises and design patterns", //  desc.
          version: "1.0.0", // version number
          contact: {
            name: "Saikrishna Sangishetty ", // your name
            email: "sangishetty.saikrishna@gmail.com  ", // your email
            url: "", // your website
          },
        },
      },
      apis: []
    }
  } as SwaggerOptions;
}


export default route;