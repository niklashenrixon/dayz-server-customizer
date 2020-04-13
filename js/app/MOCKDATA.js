export default {
    "definitions":{
       "columns":[
          {
             "name": "name",
             "type": "readonly",
             "visible": true
          },
          {
             "name": "min",
             "type": "number",
             "min": 0,
             "visible": true
          },
          {
             "name": "max",
             "type": "number",
             "min": 0,
             "visible": true
          },
          {
             "name": "quantMin",
             "type": "number",
             "min": 0,
             "max": 100,
             "visible": true
          },
          {
             "name": "quantMax",
             "type": "number",
             "min": 0,
             "max": 100,
             "visible": true
          },
          {
             "name": "priority",
             "type": "number",
             "max": 100,
             "min": 0,
             "valueSymbol": "%",
             "visible": true
          },
          {
             "name": "Restock timer",
             "type": "number",
             "min": 0,
             "valueSymbol": "s",
             "visible": true
          },
          {
             "name": "Lifestock timer",
             "type": "number",
             "min": 0,
             "valueSymbol": "s",
             "visible": true
          },
          {
             "name": "flags",
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
             "type": "multiselect",
             "values": [
                "floor",
                "shelves",
                "ground"
             ],
             "visible": false
          },
          {
             "name": "Tiers",
             "type": "multiselect",
             "values": [
                "Tier1",
                "Tier2"
             ],
             "visible": false
          },
          {
             "name": "Usages",
             "type": "multiselect",
             "values": [
                "Military",
                "Police",
                "Village"
             ],
             "visible": true
          }
       ]
    },
    "data":[
      {
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
    ],
    "fileType": "types"
 }
 