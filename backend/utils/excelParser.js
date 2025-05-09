// utils/excelParser.js

const ExcelJS = require("exceljs");

/**
 * Parse file Excel menjadi array of objects.
 * Fungsi ini bisa disesuaikan dengan struktur tabel yang berbeda.
 * 
 * @param {string} filePath - Lokasi file Excel yang akan diproses
 * @param {Array} headers - Array header untuk tabel yang sesuai dengan model
 * @returns {Array} - Array of objects yang siap dimasukkan ke database
 */
async function parseExcel(filePath, headers) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    const data = [];

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row

        const rowData = {};

        headers.forEach((header, index) => {
            rowData[header] = row.getCell(index + 1).value; // Get data from cell based on header
        });

        data.push(rowData);
    });

    return data;
}

module.exports = { parseExcel };
