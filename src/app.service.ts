import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getData()  {
    return {
      name : "ravi",
      age : 22,
      skills : "MERN"
    }
  }
}
