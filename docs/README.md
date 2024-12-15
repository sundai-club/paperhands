`coinmarketcap_scrape.xlsx`
- Scraped 12/15/24
- Used Dev Console to pull from [this list](https://coinmarketcap.com/tokens/views/all/) (API was terrible...)
```javascript

v = document.querySelectorAll("tr.cmc-table-row")

data = [];
for (var x of v){
    d = {};
    t = x.querySelectorAll('td');
    if (t.length < 7){
    continue;}
    d['name'] = t[1].outerText;
    d['mc'] =  t[3].outerText;
    d['vol'] = t[6].outerText;
    data.push(d);
}

// Convert data to CSV format
csvContent = [
  // Create header row
  Object.keys(data[0]).join(","),
  // Convert data rows
  ...data.map(row => Object.values(row).join(","))
].join("\n");

blob = new Blob([csvContent], { type: 'text/csv' });

// Create a temporary download link
link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'data.csv';  // Specify the file name

// Trigger the download
link.click();

```