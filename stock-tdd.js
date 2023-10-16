class StockPortfolio {
  constructor() {
    this.portfolio = {};
  }

  isAccountEmpty() {
    if (Object.keys(this.portfolio).length === 0) {
      return true;
    }
    return false;
  }

  stockCount() {
    return Object.keys(this.portfolio).length;
  }

  buyStock(ticker, shares) {
    if (shares > 0) {
      if (this.portfolio[ticker]) {
        this.portfolio[ticker] += shares;
      } else {
        this.portfolio[ticker] = shares;
      }
    }
  }

  sellStock(ticker, shares) {
    if (this.portfolio[ticker] && shares <= this.portfolio[ticker]) {
      this.portfolio[ticker] -= shares;
      this.remEmptyStocks();
    } else {
      throw new ShareSaleException();
    }
  }

  getShares(ticker) {
    if (this.portfolio[ticker]) {
      return this.portfolio[ticker];
    }
    return -1;
  }

  remEmptyStocks() {
    for (const property in this.portfolio) {
      if (this.portfolio[property] == 0) {
        delete this.portfolio[property];
      }
    }
  }
}

class ShareSaleException extends Error {
  constructor() {
    super("Sale exceeded exsiting number of shares");
    this.name = "ShareSaleException";
  }
}

export default StockPortfolio;
