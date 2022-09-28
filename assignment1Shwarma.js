const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    ITEM: Symbol("item"),
    SIZE_1:   Symbol("size_1"),
    BREAD_TYPE: Symbol("bread_type"),
    SIZE_2: Symbol("size_2"),
    TOPPINGS:   Symbol("toppings"),
    ICECREAM:  Symbol("icecream")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sItem1 = "";
        this.sItem2 = "";
        this.sBreadType = "";
        this.sSize1 = "";
        this.sSize2 = "";
        this.sToppings = "";
        this.sIcecream = "";
        this.sBoth = "no";
        this.sPrice = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.ITEM;
                aReturn.push("Welcome to Wonder Foods.");
                aReturn.push("What would you like to order today? /n Enter 1 for Burger or Enter 2 for Rolls");
                break;
            case OrderState.ITEM:
                    if (sInput== 1)
                    {
                        this.stateCur = OrderState.SIZE_1;
                        this.sItem1="Burger";
                        aReturn.push("What size burger would you like? --> *Small* OR *Medium* OR *Large*");
                    }
                    else if (sInput==2) 
                    {
                        this.stateCur = OrderState.SIZE_2;
                        this.sItem2="Rolls";
                        aReturn.push("What size Roll would you like? --> *Small* OR *Medium* OR *Large*");
                    } 
                    else if (this.sItem1 == "Burger" || this.sItem2 == "Rolls")
                    {
                        this.stateCur = OrderState.ICECREAM;
                        aReturn.push("Would you like any icecream with that? /n YES or NO?")
                    }
                    else{
                        this.isDone(true);
                        aReturn.push("No order placed.")
                    }
                break;
                    case OrderState.SIZE_1: 
                    if(sInput == "small" || sInput == "Small" || sInput=="SMALL")
                    {
                    this.stateCur = OrderState.BREAD_TYPE;
                    this.sSize1 = "Small";
                    this.sPrice+=5;//burger cost
                    aReturn.push("What type of bread would you like for Burger? --> *Wheat* OR *Multigrain*");
                    }
                    else if(sInput=="medium"||sInput=="Medium"||sInput=="MEDIUM")
                    {
                        this.stateCur = OrderState.BREAD_TYPE;
                        this.sSize1 = "Medium";
                        this.sPrice+=5.5;
                        aReturn.push("What type of bread would you like for Burger? --> *Wheat* OR *Multigrain*");
                    }
                    else if(sInput == "large" || sInput == "Large" || sInput=="LARGE"){
                        this.stateCur = OrderState.BREAD_TYPE;
                        this.sSize1 = "Large";
                        this.sPrice+=6;
                        aReturn.push("What type of bread would you like for Burger? --> *Wheat* OR *Multigrain*");
                    }
                break;
                    case OrderState.SIZE_2:
                    if(sInput == "small" || sInput == "Small" || sInput=="SMALL")
                    {
                    this.stateCur = OrderState.TOPPINGS;
                    this.sSize2 = "Small";
                    this.sPrice += 4.5;// roll cost
                    aReturn.push("What type of Topping would you like for the roll? --> *Onion* OR *Cheese*");
                    }
                    else if(sInput == "medium" || sInput == "Medium" || sInput=="MEDIUM")
                    {
                    this.stateCur = OrderState.TOPPINGS;
                    this.sSize2 = "Medium";
                    this.sPrice += 5;// roll cost
                    aReturn.push("What type of Topping would you like for the roll? --> *Onion* OR *Cheese*");
                    }
                    else if(sInput == "large" || sInput == "Large" || sInput=="LARGE")
                    {
                    this.stateCur = OrderState.TOPPINGS;
                    this.sSize2 = "Large";
                    this.sPrice += 5.5;// roll cost
                    aReturn.push("What type of Topping would you like for the roll? --> *Onion* OR *Cheese*");
                    }
                break;
                    case OrderState.BREAD_TYPE:
                    // this.sBreadType = sInput;
                if(sInput=="wheat"||sInput=="Wheat"||sInput=="WHEAT" )
                {
                    this.stateCur = OrderState.ITEM;
                    this.sBreadType="Wheat";
                    this.sPrice+=1.5;//bread cost
                    aReturn.push("Type 2 if you Would like to order roll? OR No to end your order");
                }
                else if(sInput=="multigrain"||sInput=="Multigrain"||sInput=="MULTIGRAIN" )
                {
                    this.stateCur = OrderState.ITEM;
                    this.sBreadType="Multigrain";
                    this.sPrice+=2;//add price for italian bread
                    aReturn.push("Type 2 if you Would like to order roll? OR No to end your order");
                }
                else
                {
                    this.stateCur = OrderState.ICECREAM;
                    aReturn.push("Would you like an icecream Softie with that? Type Yes OR No to end your order");
                }
            break;
            case OrderState.TOPPINGS:
                //this.sToppings = sInput;

              if(sInput== "cheese"||sInput== "Cheese"||sInput== "CHEESE")
                {
                    this.stateCur = OrderState.ITEM;
                    this.sToppings = "Cheese";
                    this.sPrice+=1;//topping cost
                    aReturn.push("Type 1 if you Would like to order Burger OR No to end your order");
                }
                else if(sInput== "onion"||sInput== "Onion"||sInput== "ONION")
                {
                    this.stateCur = OrderState.ITEM;
                    this.sToppings = "Onion";
                    this.sPrice+=1.5;
                    aReturn.push("Type 1 if you Would like to order Burger as well? OR No to end your order");
                }
                else
                {
                    this.stateCur = OrderState.ICECREAM;
                    aReturn.push("Would you like an Icecream Softie with that? Type Yes OR No to end your order");
                }
                break;
                case OrderState.ICECREAM:
                    this.isDone(true);
                    if(sInput.toLowerCase() != "no")
                    {
                        this.sIcecream = sInput;
                        this.sPrice += 2;//softie cost
                    }
                    aReturn.push("Thank-you for your order of :--");
                    if (this.sItem1 != "")
                    {
                        aReturn.push(`${this.sSize1} ${this.sItem1} with ${this.sBreadType} bread`);
                    }
                    if (this.sItem2 != "")
                    {
                        aReturn.push(`${this.sSize2} ${this.sItem2} with ${this.sToppings} topping`);
                    }
                    if(this.sIcecream)
                    {
                        aReturn.push("With Icecream Softie");
                    }
                    let d = new Date(); 
                    aReturn.push(`Total Bill to be paid is $${this.sPrice}`)
                    d.setMinutes(d.getMinutes() + 20);
                    aReturn.push(`Your food will be ready by ${d.toTimeString()}`);
                    break;
        }
        return aReturn;
    }
}