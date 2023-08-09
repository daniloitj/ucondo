import { Realm } from '@realm/react';

export type AccountSchemaProps = {
  parent_account: string;
  code: string;
  name: string;
  type: string;
  accept_entry: boolean;
}

export class Account extends Realm.Object<Account> {
  _id!: string
  parent_account!: string
  code!: string
  name!: string
  type!: string
  accept_entry!: boolean
  created_at!: Date
  updated_at!: Date  

  static generate({ parent_account, code, name, type, accept_entry }: AccountSchemaProps) {
    return {
      _id: new Realm.BSON.UUID(),
      parent_account,
      code,
      name,
      type,
      accept_entry,
      created_at: new Date(),
      updated_at: new Date(),      
    }
  }

  static schema = {
    name: 'Account',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      parent_account: 'string?',
      code: 'string',
      name: 'string',
      type: 'string',
      accept_entry: 'bool',
      created_at: 'date',
      updated_at: 'date'      
    }
  }
}