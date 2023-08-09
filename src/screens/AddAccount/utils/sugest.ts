import { Account } from '../../../libs/realm/schemas/Account';

export function findNextChildCode(filteredAccounts: Realm.Results<Account & Realm.Object<unknown, never>>, parentAccount: string): string {
  if (filteredAccounts.length === 0 && parentAccount) {
    const parentArray = parentAccount.split('.').map(Number);
    parentArray.push(1);
    return parentArray.join('.');
  }

  const versions = filteredAccounts.map(version => version.code.split('.').map(Number));

  const maxVersion = versions.reduce((max, version) => {
    for (let i = 0; i < max.length; i++) {
      if (version[i] > max[i]) {
        return version;
      } else if (version[i] < max[i]) {
        break;
      }
    }
    return max;
  }, [0, 0, 0]);

  const nextVersion = maxVersion.slice(); 

  for (let i = nextVersion.length - 1; i >= 0; i--) {
    if (nextVersion[i] === 999) {
      nextVersion[i] = 0; 
    } else {
      nextVersion[i]++; 
      break;
    }
  }

  while (nextVersion[nextVersion.length - 1] === 0) {
    nextVersion.pop();
  }

  return nextVersion.join('.');
}
