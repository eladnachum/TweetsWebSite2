module.exports = {
  TheDate: function() {
    var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			var hours = today.getHours();
			var minutes = today.getMinutes();
			var seconds = today.getSeconds();

			if(dd<10) {
				dd='0'+dd
			} 
			if(mm<10) {
				mm='0'+mm
			}
			if(hours<10) {
				hours='0'+hours
			}
			if(minutes<10) {
				minutes='0'+minutes
			}
			if(seconds<10) {
				seconds='0'+seconds
			}

			today = mm+'/'+dd+'/'+yyyy+' || '+hours+':'+minutes+':'+seconds;
			return today;
  },
       
  CreateTable: function(data) {
        var html = '';
    
    // Assume data is JSON - array of dicts. each cell is a tweet - each cell is a dictionary

    html += '<table class="data">';
    
    // Step through the rows of the data.
    for(var row in data) {
        var rowData = data[row];
        if(row == 0) {
            html += '<tr style="font-weight: bold; background-color: lightblue">';
			html +='<td>Tweet Topic</td><td>Tweet Content</td><td>Tweet Post Date</td><td>Followers Number</td>';
			html +='</tr>';
        }
        //create the row with the data
            html += '<tr>';	
			html += '<td>';
			html += rowData.topic;
			html +='</td>';
			html += '<td>';
			html += rowData.content;
			html +='</td>';html += '<td>';
			html += rowData.date;
			html +='</td>';
			html +='</td>';html += '<td>';
			html += rowData.followers;
			html +='</td>';
			html +='</tr>';   
		
	}
    
    html += '</table>';
    
    return html;
  }
};