import stock from './stock-tdd'

test("Testing Stock Account Creation", () => {
    const expected = {}
    const result = stock.createAccount();
    expect(expected).toStrictEqual(result);
});

test("Testing Empty Stock Account Contents", () => {
    const expected = true;
    const result = stock.isAccountEmpty({});
    expect(expected).toBe(result);
});

test("Testing Non-Empty Stock Account Contents", () => {
    const expected = false;
    const result = stock.isAccountEmpty({"SPY": 4});
    expect(expected).toBe(result);
});

test("Testing Stock Account Unique Stock Count#1", () => {
  const expected = 1;
  const fakeAccount = {
    "RBLX": 10,
  };
  const result = stock.stockCount(fakeAccount);
  expect(expected).toBe(result);
});

test("Testing Stock Account Unique Stock Count#2", () => {
    const expected = 2;
    const fakeAccount = {
        "GME": 5,
        "RBLX": 10,
    };
    const result = stock.stockCount(fakeAccount);
    expect(expected).toBe(result);
});

test("Testing Buy Stock Functionality", () => {
    const expected = {
      "GME": 5,
      "RBLX": 10,
      "SPY": 4
    };
    const fakeAccount = {
      "GME": 5,
      "RBLX": 10,
    };

    const result = stock.buyStock("SPY", 4, fakeAccount);
    expect(expected).toStrictEqual(result);
});

test("Testing Selling Stock Functionality", () => {
    const expected = {
      "GME": 5,
      "RBLX": 6,
    };
    const fakeAccount = {
      "GME": 5,
      "RBLX":10,
    };

    const result = stock.sellStock("RBLX", 4, fakeAccount);
    expect(expected).toStrictEqual(result);
});

test("Testing Selling Stock Functionality -- Exceeding Shares Available", () => {

  const fakeAccount = {
    "GME": 5,
    "RBLX": 10,
  };

  expect(() => stock.sellStock("RBLX", 12, fakeAccount)).toThrowError(
    'ShareSaleException'
  );
});

test("Testing Fetch Share Count Per Ticker", () => {
  const expected = 10
  const fakeAccount = {
    "GME": 5,
    "RBLX": 10,
  };

  const result = stock.getShares("RBLX", fakeAccount);
  expect(expected).toStrictEqual(result);
});

test("Testing Fetch Share Count Per Ticker -- Nonexistent Share", () => {
  const expected = -1;
  const fakeAccount = {
    "GME": 5,
    "RBLX": 10,
  };

  const result = stock.getShares("MFST", fakeAccount);
  expect(expected).toStrictEqual(result);
});

test("Testing Removal of Empty Tickers", () => {
  const expected = {
    "GME": 5,
    "RBLX": 10,
    "AAPL": 3,
  };
  const fakeAccount = {
    "GME": 5,
    "RBLX": 10,
    "MFST": 0,
    "SPY": 0,
    "AAPL": 3
  };

  const result = stock.remEmptyStocks(fakeAccount);
  expect(expected).toStrictEqual(result);
});
