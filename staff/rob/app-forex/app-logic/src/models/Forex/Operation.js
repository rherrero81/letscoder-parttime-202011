export default class Operation {


	constructor(el,toVadilate) {

		this.cmd = el.cmd;
		this.offset = el.offset;
		this.price = el.close_price ? el.close_price : el.price;
		this.symbol = el.symbol;
		this.tp = el.tp;
		this.sl = el.sl;
		this.ask = el.ask;
		this.bid = el.bid;
		this.type = el.type;
		this.volume = el.volume;
		this.order = el.order;
		this.order2 = el.order2;
        this.position = el.position;
        this.isvalid=true;
        if(toVadilate)
		this.isvalid=this.validate();

    }
    

     getCMDLabel(cmd) {

        switch (cmd) {
            case 0:
                return 'BUY';
                break;
            case 1:
                return 'SELL';
                break;
            case 2:
                return 'BUY LIMIT';
                break;
            case 3:
                return 'SELL STOP';
                break;
            case 4:
                return 'BUY STOP';
                break;
            case 5:
                return 'SELL LIMIT';
                break;
            default:
                return '';
                break
        }
    }


	validate() {
		if (this.price != 0 && this.price != undefined) {
			if (this.cmd == 0) {
				if (this.ask > this.price)
					this.cmd = 2;
				else
					this.cmd = 4;

			}
			if (this.cmd == 1) {
				if (this.bid > this.price)
					this.cmd = 5;
				else
					this.cmd = 3;

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

if(!this.price)
return true;

	if (this.sl < this.price && this.price < this.tp)
		return true;
	else
		return false;
	}
	if (this.cmd == 3) {
		if(!this.price)
    return true;
	if (this.sl > this.price && this.price > this.tp)
		return true;
	else
		return false;
	}
	if (this.cmd == 4) {
		if(!this.price)
        return true;
	if (this.sl < this.price && this.price< this.tp)
		return true;
	else
		return false;
	}
	if (this.cmd == 5) {
		if(!this.price)
        return true;
	if (this.sl > this.price && this.price > this.tp)
		return true;
	else
		return false;
	}
	return false;

	}


}
