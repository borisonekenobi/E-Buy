import {Transaction} from './transaction';
import {Bid} from './bid';

export interface Product {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  type: 'auction' | 'sale';
  status: 'active' | 'inactive' | 'sold';
  transaction?: Transaction;
  bids?: Bid[];
}
