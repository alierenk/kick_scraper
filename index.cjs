const puppeteer = require('puppeteer');
const fs = require('fs');

// Tarayıcı başlatma
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    console.log("Mesaj kontrolü başlıyor...");

    while (true) { 
        console.log("Yeni mesaj almak için sayfa yenileniyor...");

        const page = await browser.newPage(); 
        const url = 'https://kickchatlogs.com/logs/24495088/alierenbey/Hype';

        try {
            
            await page.goto(url, { waitUntil: 'domcontentloaded' }); 
            console.log("Sayfa yüklendi.");

            
            await page.waitForSelector('.col-auto.text-break', { visible: true, timeout: 15000 });
            console.log("Mesajlar bölümü göründü.");

            
            const lastMessage = await page.evaluate(() => {
                const messages = document.querySelectorAll('.col-auto.text-break');
                if (messages.length > 0) {
                    return messages[0].innerText.trim();
                }
                return null;
            });

            if (lastMessage) {
                
                fs.appendFileSync('lastMessage.txt', `${lastMessage}\n`, 'utf8'); 
                console.log('Mesaj dosyaya başarıyla yazıldı!');
            } else {
                console.log("Mesaj bulunamadı.");
            }

           
            await page.close();
            console.log("Sayfa kapatıldı.");

        } catch (err) {
            console.error("Hata oluştu:", err);
            if (page && !page.isClosed()) {
                await page.close();
            }
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
})();
