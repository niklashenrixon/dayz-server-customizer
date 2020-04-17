import data from './data'

export default {
    "definitions":{
       "columns":[
         {
             "name": "name",
             "label": "Name",
             "type": "readonly",
             "visible": true
         },
         {
             "name": "min",
             "label": "Minimum",
             "type": "number",
             "min": 0,
             "visible": true
         },
         {
             "name": "max",
             "label": "Maximum",
             "type": "number",
             "min": 0,
             "visible": true
         },
         {
             "name": "quantMin",
             "label": "Quantity Minimum",
             "type": "number",
             "min": 0,
             "max": 100,
             "visible": true
         },
         {
             "name": "quantMax",
             "label": "Quantity Maximum",
             "type": "number",
             "min": 0,
             "max": 100,
             "visible": true
         },
         {
             "name": "priority",
             "label": "Priotity",
             "symbol": "%",
             "type": "number",
             "min": 0,
             "max": 100,
             "visible": true
         },
         {
             "name": "restock",
             "label": "Restock Timer",
             "symbol": "s",
             "type": "number",
             "min": 0,
             "max": 100000,
             "visible": true
         },
         {
             "name": "lifetime",
             "label": "Lifetime Timer",
             "symbol": "s",
             "type": "number",
             "min": 0,
             "max": 100000,
             "visible": true
         },
         {
             "name": "category",
             "label": "Category",
             "symbol": "",
             "type": "readonly",
             "visible": true
         },
         {
             "name": "flags",
             "label": "Flags",
             "type": "multiselect",
             "options": [
                 "count_in_cargo",
                 "count_in_hoarder",
                 "count_in_map",
                 "count_in_player",
                 "crafted",
                 "deloot"
             ],
             "visible": false
         },
         {
             "name": "tags",
             "label": "Tags",
             "type": "multiselect",
             "options": [
                 "floor",
                 "shelves",
                 "ground"
             ],
             "visible": false
         },
         {
             "name": "tiers",
             "label": "Tiers",
             "type": "multiselect",
             "options": [
                 "Tier1",
                 "Tier2",
                 "Tier3",
                 "Tier4"
             ],
             "visible": false
         },
         {
             "name": "usage",
             "label": "Usage",
             "type": "multiselect",
             "options": [
                 "Military",
                 "Police",
                 "Medic",
                 "Firefighter",
                 "Industrial",
                 "Farm",
                 "Coast",
                 "Town",
                 "Village",
                 "Hunting",
                 "Office",
                 "School",
                 "Prison"
             ],
             "visible": false
         }
     ],
    },
    "data": data,
    "fileType": "types"
 }
 
 /* 
       {
         "id": 12345,
         "name": "Kalashnikov",
         "min": 0,
         "max": 5,
         "quantMin": 100,
         "quantMax": 200,
         "lifetime": 1000,
         "restock": 10,
         "priority": 100,
         "flags":[
            "count_in_cargo",
            "crafted"
         ],
         "tags":[
            "floor",
            "shelves"
         ],
         "tiers":[
            "Tier1"
         ],
         "category": "Tools"
      },
      {
         "id": 6789,
         "name": "AKM",
         "min": 5,
         "max": 10,
         "quantMin": 200,
         "quantMax": 500,
         "lifetime": 3000,
         "restock": 20,
         "priority": 200,
         "flags":[
            "count_in_cargo",
            "crafted"
         ],
         "tags":[
            "floor",
            "shelves"
         ],
         "tiers":[
            "Tier1"
         ],
         "category": "Tools"
      }
 */