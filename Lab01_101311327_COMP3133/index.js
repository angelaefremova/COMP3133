const fs = require("fs");
const csv = require("csv-parser");

function CountryFiltering(country) {
    const csvHeader = "country,year,population";
    const fileName = `${country.toString().toLowerCase()}.txt`;
    async function writeToFile(file, data, overwrite = false) {
        try {
            if (overwrite) {
                await fs.writeFileSync(file, data);
            } else {
                await fs.appendFileSync(file, data);
            }
        } catch (err) {
            console.error(err);
        }
    }
    writeToFile(fileName, csvHeader + "\n", true);

    fs.createReadStream("input_countries.csv")
        .pipe(csv())
        .on("data", row => {
            if (row.country === country) {
                writeToFile(fileName, Object.values(row).join(",") + "\n");
            }
        });
}

CountryFiltering("Canada");
CountryFiltering("United States");
