 export class Utils {
   converTimestampToDate(input: any): Date {
      var date = new Date(input.seconds * 1000);
      return date;
    }

    setDateToMidnight(date: Date) {
      date.setHours(0,0,0,0);
      return date; 
    }

    paginate(array, page_size, page_number) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    calculatePagesCount(pageSize, totalCount) {
      // we suppose that if we have 0 items we want 1 empty page
      return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
    }

    guid() {
 
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
        
      
    }
  

}
 