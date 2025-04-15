const { format } = require('@fast-csv/format');
const PDFDocument = require('pdfkit');
const userModel = require('../models/userModel');

const exportUserCSV = async (req, res) => {
    try {
        const users = await userModel.getUsers();

        res.setHeader("Content-Disposition", "attachment; filename=wizards.csv");
        res.setHeader("Content-Type", "text-csv");

        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        users.forEach(user => {
            csvStream.write({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
            });
        });

        csvStream.end();
    } catch (error) {   
        res.status(500).json({ message: "Erro ao gerar o CSV"});
    }
};

const exportUserPDF = async (req, res) => {
    try {
        const users = await userModel.getUsers();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=wizards.pdf")

        const doc = new PDFDocument();
        doc.pipe(res);

        //Titulo
        doc.fontSize(20).text("Relatorio de Bruxos", { align: "center" });
        doc.moveDown();

        //Cabeçalho
        doc.fontSize(12).text("Id | Nome | Email | Password", { underline: true });
        doc.moveDown(0.5);

        //Add dados dos bruxos
        users.forEach((user) => {
            doc.text(
                `${user.id} | ${user.name} | ${user.email} | ${user.password} || `
            );
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar PDF!" });
    }
};

module.exports = { exportUserCSV, exportUserPDF };