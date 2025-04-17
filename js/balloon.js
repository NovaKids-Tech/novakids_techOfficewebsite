class Balloon {
    constructor(color) {
        this.element = document.createElement('div');
        this.element.className = `balloon balloon-${color}`;
        this.element.style.left = `${Math.random() * 80 + 10}%`; // 10% ile 90% arası
        this.element.style.bottom = '-150px';
        this.speed = 1 + Math.random() * 2; // 2-4 saniye arası

        this.element.addEventListener('click', () => this.pop());
        
        document.getElementById('balloon-container').appendChild(this.element);
        this.float();
    }

    float() {
        let position = -150;
        const animate = () => {
            position += this.speed;
            this.element.style.bottom = `${position}px`;

            if (position < window.innerHeight + 150) {
                requestAnimationFrame(animate);
            } else {
                this.element.remove();
                createNewBalloon();
            }
        };
        requestAnimationFrame(animate);
    }

    pop() {
        console.log("Balon patlatıldı!"); // Debug için log ekleyin
        
        this.element.classList.add('pop-effect');
        
        // Ses dosyası yolunu düzeltin ve hata yakalama ekleyin
        try {
            const audio = new Audio('../assets/sounds/pop-sound.mp3');
            audio.volume = 0.5; // Ses seviyesini ayarlayın
            
            // Modern tarayıcılarda ses çalma promise döndürür, hataları yakalayın
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("Ses çalma hatası:", error);
                    // Otomatik oynatma politikası hatası olabilir
                });
            }
        } catch (error) {
            console.error("Ses yükleme hatası:", error);
            // Ses dosyası bulunamadı veya başka bir hata oluştu
        }
        
        // Balon kaldırma işlemini garanti altına alın
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.remove();
                createNewBalloon();
            } else {
                console.warn("Balon elementi zaten kaldırılmış.");
                createNewBalloon();
            }
        }, 300);
    }
}

const colors = ['blue', 'red', 'yellow', 'green'];

function createNewBalloon() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    new Balloon(randomColor);
}

// Başlangıçta 4 balon oluştur
function initBalloons() {
    for (let i = 0; i < 4; i++) {
        setTimeout(() => createNewBalloon(), i * 3500);
    }
}

// Sayfa yüklendiğinde başlat
window.addEventListener('load', initBalloons);