const http = require('http');
const fs = require('fs');
const pdfkit = require('pdfkit');

const server = http.createServer((req, res) => {
    if (req.url === '/download' || req.url === '/download?') {
        // Read the shopping list JSON file
        fs.readFile('/home/miguel/MagicMirror/modules/MMM-ShoppingList/shoppingList.json', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            try {
                const shoppingList = JSON.parse(data);

                // Create a new PDF document
                const doc = new pdfkit();

                // Pipe the PDF document to the response
                res.setHeader('Content-Type', 'application/pdf');
                const today = new Date();
                const filename = `shopping_list_${today.getMonth() + 1}_${today.getDate()}_${today.getFullYear()}.pdf`;
                res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
                doc.pipe(res);

                // Add header
                doc.fontSize(20).text(`Shopping List for ${new Date().toLocaleDateString()}`, { bold: true, align: 'center'});

                // Add items as a list
                doc.moveDown();
                doc.fontSize(12); //Set the items font size
                shoppingList.forEach((item, index) => {
                    doc.text(`${index + 1}. ${item}`);
                });

                // Finalize the PDF document
                doc.end();
            } catch (parseError) {
                console.error('Error parsing JSON file:', parseError);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        });
    } else if (req.url === '/') {
        // Serve HTML content with download button
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<!DOCTYPE html>');
        res.write('<html>');
        res.write('<head><title>Shopping List</title></head>');
        res.write('<body>');
        res.write('<h1 align="center" style="font-size: 64px;">Magic Mirror Shopping List</h1>');
        res.write('<form action="/download" method="get">');
        res.write('<div style="text-align: center;">');
		res.write('<button type="submit" style="padding: 40px 80px; font-size: 32px;">Download Shopping List</button>');
		res.write('</div>');
		res.write('</div>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
