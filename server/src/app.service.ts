import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getRates() {
    const url = `
http://api.exchangeratesapi.io/v1/latest?access_key=70785562cc3a1f51a01e0d7307de7c0b`;
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
    }
  }
}
