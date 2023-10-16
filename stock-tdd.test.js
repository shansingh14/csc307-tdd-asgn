import StockPortfolio from "./stock-tdd";

test("Testing Stock Account Creation", () => {
  const stock = new StockPortfolio();
  const expected = {};

  expect(expected).toStrictEqual(stock.portfolio);
});

test("Testing Empty Stock Account Contents", () => {
  const expected = true;
  const stock = new StockPortfolio();
  const result = stock.isAccountEmpty();
  expect(expected).toBe(result);
});

test("Testing Non-Empty Stock Account Contents", () => {
  const expected = false;
  const stock = new StockPortfolio();
  stock.portfolio = { SPY: 4 };
  const result = stock.isAccountEmpty();
  expect(expected).toBe(result);
});

test("Testing Stock Account Unique Stock Count#1", () => {
  const expected = 1;
  const stock = new StockPortfolio();
  stock.portfolio = {
    RBLX: 10,
  };
  const result = stock.stockCount();
  expect(expected).toBe(result);
});

test("Testing Stock Account Unique Stock Count#2", () => {
  const expected = 2;
  const stock = new StockPortfolio();
  stock.portfolio = {
    GME: 5,
    RBLX: 10,
  };
  const result = stock.stockCount();
  expect(expected).toBe(result);
});

test("Testing Buy Stock Functionality", () => {
  const expected = {
    GME: 5,
    RBLX: 10,
    SPY: 4,
  };
  const stock = new StockPortfolio();
  stock.portfolio = {
    GME: 5,
    RBLX: 10,
  };

  stock.buyStock("SPY", 4);
  expect(expected).toStrictEqual(stock.portfolio);
});

test("Testing Buy Stock Functionality -- Not viable stock number", () => {
  const expected = {
    GME: 5,
    RBLX: 10,
  };
  const stock = new StockPortfolio();
  stock.portfolio = {
    GME: 5,
    RBLX: 13,
  };

  stock.buyStock("RBLX", 3);
  expect(expected).toStrictEqual(stock.portfolio);
});

test("Testing Buy Stock Functionality -- Not viable stock number", () => {
  const expected = {
    GME: 5,
    RBLX: 10,
  };
  const stock = new StockPortfolio();
  stock.portfolio = {
    GME: 5,
    RBLX: 10,
  };

  stock.buyStock("SPY", -3);
  expect(expected).toStrictEqual(stock.portfolio);
});

test("Testing Selling Stock Functionality", () => {
  const expected = {
    GME: 5,
    RBLX: 6,
  };
  const stock = new StockPortfolio();
  stock.portfolio = {
    GME: 5,
    RBLX: 10,
  };

  stock.sellStock("RBLX", 4);
  expect(expected).toStrictEqual(stock.portfolio);
});

test("Testing Selling Stock Functionality -- Exceeding Shares Available", () => {
    const stock = new StockPortfolio();
  stock.portfolio = {
    GME: 5,
    RBLX: 10,
  };

  expect(() => stock.sellStock("RBLX", 12)).toThrow(
    "Sale exceeded exsiting number of shares"
  );
});

test("Testing Fetch Share Count Per Ticker", () => {
  const expected = 10;
  const stock = new StockPortfolio();
  stock.portfolio = {
    GME: 5,
    RBLX: 10,
  };

  const result = stock.getShares("RBLX");
  expect(expected).toStrictEqual(result);
});

test("Testing Fetch Share Count Per Ticker -- Nonexistent Share", () => {
  const expected = -1;
  const stock = new StockPortfolio();
  stock.portfolio = {
    GME: 5,
    RBLX: 10,
  };

  const result = stock.getShares("MFST");
  expect(expected).toStrictEqual(result);
});

test("Testing Removal of Empty Tickers", () => {
  const expected = {
    GME: 5,
    RBLX: 10,
    AAPL: 3,
  };
  const stock = new StockPortfolio();
  stock.portfolio = {
    GME: 5,
    RBLX: 10,
    MFST: 0,
    SPY: 0,
    AAPL: 3,
  };

  stock.remEmptyStocks();
  expect(expected).toStrictEqual(stock.portfolio);
});
