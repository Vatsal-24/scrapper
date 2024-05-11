const axios = require("axios");
const cheerio = require("cheerio");
const stocks = require("./stocks")


const extractDetailsFromIpoTable = () => {
stocks.forEach((stock,i)=>{
  setTimeout(
    function () {
      processStocks(stock, 1000)
    }, 
    2000 * i
);
})
}




const processStocks = async(stock, delay) => {
  await new Promise(resolve => setTimeout(resolve, delay));

    const url =`https://www.screener.in/company/${stock}/consolidated/`;
    console.log(url)

  await axios.get(url)
  .then(response=> {
  
    const html = response.data;
    const $ = cheerio.load(html);
  
    // extracting table from HTML
    const dataTable = $('table.data-table').eq(1);

    const firstRow = dataTable.find('tr:first-child th:not(:first-child):not(:last-child)').map((index, element) => {
          const yearText = $(element).text().trim();
          const year = parseInt(yearText.substring(yearText.length-4));
          return { year };
  }).get();

      // Select the tenth row and extract elements, skipping the first column
      const tenthRow = dataTable.find('tr:nth-child(10) td:not(:first-child):not(:last-child)').map((index, element) => {
          const profit = parseInt($(element).text().trim().replace(/,/g, ''),10); 
          return { profit };
      }).get();


        // Combine the arrays into a single array of objects
  const result = [];
  
  // Ensure that each object has two fields: "year" and "profit"
  for (let i = 0; i < firstRow.length; i++) {
      result.push({ year: firstRow[i].year, profit: tenthRow[i].profit });
  }
  console.log(result)

  let count = 0;
  
  // Iterate over the array starting from the second object
  for (let i = 1; i < result.length; i++) {
    // Compare profit of current year with previous year
    if (result[i].profit < result[i - 1].profit) {
        // If profit of current year is less than previous year, increment counter
        count++;
    }
  }
  
  // Log the count
  console.log("Number of years where profit of current year is less than previous year:", count); 

  })

}

module.exports = extractDetailsFromIpoTable;