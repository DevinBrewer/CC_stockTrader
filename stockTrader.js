// Game save data to initially load in gameSave.txt
// Run with the following command
//      Game.LoadMod("https://yourdomain.com/path/to/stockTrader.js");


Game.registerMod("stockTrader", {
    init: function () {
        console.log("[StockTrader] Mod initialized.");

        const checkStockMarket = setInterval(() => {
            if (Game.Objects["Bank"].minigameLoaded && Game.Objects["Bank"].minigame) {
                clearInterval(checkStockMarket);
                this.stockMinigame = Game.Objects["Bank"].minigame;
                this.fetchStockPrices();
            }
        }, 1000);

        Game.registerHook("logic", () => this.update());
    },

    fetchStockPrices: function () {
        const goods = this.stockMinigame.goodsById;
        this.stockPrices = {};
        for (let stock of goods) {
            this.stockPrices[stock.name] = stock.val;
        }
        console.log("[StockTrader] Prices updated:", this.stockPrices);
    },

    update: function () {
        if (this.stockMinigame) {
            this.fetchStockPrices();
        }
    }
});
