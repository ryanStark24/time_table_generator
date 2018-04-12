/*jslint node: true */
//"use strict";
let  _=require('lodash') 
class Data {
  constructor() { console.log("Entered Data class"); }

   static getDatafromJSON(json) {
       if(Object.keys(json).length == 0 ) return (new String('No data Provided'));
       if(!json.hasOwnProperty('Teachers')||!json.hasOwnProperty('Sections')||!json.hasOwnProperty('DaysDescription')||!json.hasOwnProperty('totalPeriods')||!json.hasOwnProperty('lab_periods_after')) return (new String('Some data Missing'));
       if(json.Teachers.length==0 || json.Sections.length ==0 ||json.DaysDescription.length==0 ) return (new String('InSufficient Data'));
    let Teachers = json.Teachers.map(teacher => new Object({ "name": teacher.name, "subjects": teacher.subjects, "priority": teacher.priority }));
    let Sections = json.Sections.map(section => new Object({ "name": section.name, "subjects": section.subjects }));
   
    return new Object({ Teachers: Teachers, Sections: Sections, DaysDescription: json.DaysDescription, totalPeriods: json.totalPeriods, lab_periods_after: json.lab_periods_after });
  }
}
module.exports = Data;