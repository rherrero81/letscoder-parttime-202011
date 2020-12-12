class Operation {
    constructor(symbol, cmd, offset, price, sl, tp, type, volume, order) {

        this.cmd = cmd;
        this.offset = offset;
        this.price = price;
        this.symbol = symbol;
        this.tp = tp;
        this.sl = sl;
        this.type = type;
        this.volume = volume;
        this.order = order;

    }

    validate() {
        if (this.price != 1) {
            if (this.cmd == 0) {
                if (this.sl == 0 && this.tp != 0)
                    this.cmd = 2;
                if (this.sl != 0 && this.tp == 0)
                    this.cmd = 4;

            }
            if (this.cmd == 1) {
                if (this.tp == 0 && this.sl != 0)
                    this.cmd = 3;

                if (this.tp != 0 && this.sl == 0)
                    this.cmd = 5;

            }
        }


        if (this.sl == 0 && this.tp == 0)
            return true;
        if (this.cmd == 0) {
            if (this.sl < this.tp)
                return true;
            else
                return false;
        }
        if (this.cmd == 1) {
            if (this.sl > this.tp)
                return true;
            else
                return false;
        }
        if (this.cmd == 2) {
            if (this.sl < this.price < this.tp)
                return true;
            else
                return false;
        }
        if (this.cmd == 3) {
            if (this.sl > this.price > this.tp)
                return true;
            else
                return false;
        }
        return false;

    }


}