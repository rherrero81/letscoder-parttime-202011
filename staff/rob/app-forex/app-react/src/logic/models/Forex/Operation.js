export default class Operation {


    constructor(el) {

        this.cmd = el.cmd;
        this.offset = el.offset;
        this.price = el.close_price ? el.close_price : el.price;
        this.symbol = el.symbol;
        this.tp = el.tp;
        this.sl = el.sl;
        this.type = el.type;
        this.volume = el.volume;
        this.order = el.order;

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