const createAccount = () => {
  return {};
};

const isAccountEmpty = (account) => {
  if (Object.keys(account).length === 0) {
    return true;
  }
  return false;
};

const stockCount = (account) => {
  return Object.keys(account).length;
};

const buyStock = (ticker, shares, account) => {
  if (account[ticker]) {
    account[ticker] += shares;
    return account;
  }
  account[ticker] = shares;
  return account;
};

const sellStock = (ticker, shares, account) => {
  if (account[ticker] && shares <= account[ticker]) {
    account[ticker] -= shares;
    account = remEmptyStocks(account);
    return account;
  }
  throw new Error('ShareSaleException');
};

const getShares = (ticker, account) => {
  if (account[ticker]) {
    return account[ticker];
  }
  return -1;
};

const remEmptyStocks = (account) => {
  for (const property in account) {
    if (account[property] == 0) {
      delete account[property];
    }
  }
  return account
};

export default {
  createAccount,
  isAccountEmpty,
  stockCount,
  buyStock,
  sellStock,
  getShares,
  remEmptyStocks,
};
