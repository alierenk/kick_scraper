import fs from 'fs';
import clipboardy from 'clipboardy';


const copyLastMessageToClipboard = () => {
    
    fs.readFile('lastMessage.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Dosya okunurken hata oluştu:', err);
            return;
        }

        if (data) {
            
            const messages = data.split('\n');
            const lastMessage = messages[0].trim(); 

            clipboardy.writeSync(lastMessage);  
            console.log('Son mesaj panoya kopyalandı:', lastMessage); 
        } else {
            console.log("Dosyada mesaj bulunamadı.");
        }
    });
};


setInterval(copyLastMessageToClipboard, 5000); 
