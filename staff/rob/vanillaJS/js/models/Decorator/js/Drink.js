 //Coffe
 EToppins = {
     Milk: 1,
     Mokka: 2,
     Soya: 3
 };



 EDrinks = {
     Coffe: -1,
     Tea: -2
 };
 //abstract
 class Drink {


     constructor(size) {
         this.description = [];
         this.CostToppis = [];

         this.size = size;
     }
     setSize(size) {
             this.size = size;
         }
         //abstract
     getCost() {
         throw new Error("This method must be overwritten!");

     };

     getDescription() {

         return this.description
             .reduce(function(accum, value, index) {
                 //EToppins[0].toString() +
                 if (index == 0)
                     accum += 'Drink type ( ' + value + ' ) + Toppins : '
                 else
                     accum += Object.getOwnPropertyNames(EToppins).reduce(function(accumm, valuee, indexx) {
                         if (EToppins[valuee] == index)
                             accumm = valuee;
                         return accumm;
                     }, '') +
                     ' ( ' + value + ' ) ';

                 return accum;
             }, '');


     }

     setDescription(item) {

         if (item < 0)
             this.description[0] = Object.getOwnPropertyNames(EDrinks).reduce(function(accum, value, index) {
                 if (EDrinks[value] == item)
                     accum = value;
                 return accum;
             }, '');
         else
         if (this.description[item] == undefined) this.description[item] = 1;
         else this.description[item] += 1;
     }
 }