export const getColumnWidth = columns => `${100/columns}%`

export const sorter = (trait, ascending) => (a, b) => { 
    if(a[trait] === null){
      return 1;
    }
    else if(b[trait] === null){
      return -1;
    }
    else if(a[trait] === b){
      return 0;
    }
    else if(ascending) {
      return parseInt(a[trait]) < parseInt(b[trait]) ? -1 : 1;
    }
    else if(!ascending) {
      return parseInt(a[trait]) < parseInt(b[trait]) ? 1 : -1;
    }
}	