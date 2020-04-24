import { OrderByPipe } from './order-by.pipe';
import { API_TOKEN_LIST } from '../services/user-data.service.mockdata';

describe('OrderByPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });

  it('should order by pipe the apiuser', () => {
    expect(new OrderByPipe().transform(API_TOKEN_LIST, 'apiUser')).toBeTruthy();
  });

});
