let pause_bst:number=2000
let pause_scroll:number=200
function get_bst_matrix(zch: string = "A") {
    let found = bst_reihe.indexOf(zch)
    if (found==-1) {
        found=0;
    }
    return arr_zeichen[found]
}

function scrollen () {
    for (let strip = 0; strip < hwy; strip++) {
        let sh = (strip % 2) ? -1:1
        zstrip[strip].shift(sh)
    }
}
function get_ystreifen(bit:number=0,x_add:number=0,color:number) {
    zeichen_matrix.forEach(function (zahl, zeile) {
        if (zahl & Math.pow(2, bit)) {
            let b=bit+x_add
            let px=(zeile % 2) ? (hwx-1-b):b
            zstrip[zeile].setPixelColor(px, color)
        }
    })
    
}
    let zeichen_matrix: Array<number> = []

function showtext (snr:number,txt:string="A",color:number,scroll_flag:boolean=false) {
    hwx = arr_neop_settings[snr].hwMatrix[0];
    hwy = arr_neop_settings[snr].hwMatrix[1];

    const center=Math.floor((hwx-zch_bit_breite)/2) 
    neop_ges[snr].clear()

    for (let n = 0; n <= hwy; n++) {
        zstrip[n] = neop_ges[snr].range(n * hwx, hwx)
    }

    for (let bst_pos = 0; bst_pos < txt.length; bst_pos++) {
        if (!scroll_flag) {
            neop_ges[snr].clear()
        }
        zeichen_matrix=get_bst_matrix(txt[bst_pos])
        let str = zch_bit_breite;
        for (let n=str;n>=0;n--) {
            if (scroll_flag) {
                get_ystreifen(n,-n,color)
                neop_ges[snr].show()
                basic.pause(pause_scroll)
                scrollen()
            } else {
                get_ystreifen(n,center,color)
                neop_ges[snr].show()
                basic.pause(80)
            }
        }
        if (!scroll_flag) {
            neop_ges[snr].show()
            basic.pause(pause_bst)
        }    
    }
    if (hwx>zch_bit_breite) {
        neop_ges[snr].show()
    }
}



function set_punkt(x: number, y:number, color: number,snr:number=0) {
    let mx = arr_neop_settings[snr].hwMatrix[0];
    let my = arr_neop_settings[snr].hwMatrix[1];

    let px = (my-y-1)*my + ((y % 2) ? mx-(x % mx)-1:(x % mx))
    //console.log("px="+px+" "+mx+" "+x+" "+y)
    neop_ges[snr].setPixelColor(px, color);
    neop_ges[snr].show()
}


function init_alphabet () {
    // bstreihenfolge einhalten
    //           123456789 123456789 123456789 1234567895123456789 123456789 123456789 123456789 123456789 
    bst_reihe = "? ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ0123456789!?+-.:=≠*abcdefghijklmnopqrstuvwxyzäöü"; //50+29

    arr_zeichen = [
        [14, 17, 1, 2, 4, 0, 4],
        [0, 0, 0, 0, 0, 0, 0],
        [14, 17, 17, 31, 17, 17, 17],
        [30, 17, 17, 30, 17, 17, 30],
        [14, 17, 16, 16, 16, 17, 14],
        [30, 17, 17, 17, 17, 17, 30],
        [31, 16, 16, 30, 16, 16, 31],
        [31, 16, 16, 30, 16, 16, 16],
        [14, 17, 16, 23, 17, 17, 14],
        [17, 17, 17, 31, 17, 17, 17],
        [14, 4, 4, 4, 4, 4, 14],
        [15, 2, 2, 2, 2, 18, 12],
        [17, 18, 20, 24, 20, 18, 17],
        [16, 16, 16, 16, 16, 16, 31],
        [17, 27, 21, 21, 17, 17, 17],
        [17, 17, 25, 21, 19, 17, 17],
        [14, 17, 17, 17, 17, 17, 14],
        [30, 17, 17, 30, 16, 16, 16],
        [14, 17, 17, 17, 21, 18, 13],
        [30, 17, 17, 30, 20, 18, 17],
        [14, 17, 16, 14, 1, 17, 14],
        [31, 4, 4, 4, 4, 4, 4],
        [17, 17, 17, 17, 17, 17, 14],
        [17, 17, 17, 17, 17, 10, 4],
        [17, 17, 17, 21, 21, 27, 17],
        [17, 17, 10, 4, 10, 17, 17],
        [17, 17, 10, 4, 4, 4, 4],
        [31, 1, 2, 4, 8, 16, 31],
        [10, 0, 4, 10, 17, 31, 17],
        [17, 14, 17, 17, 17, 17, 14],
        [17, 0, 17, 17, 17, 0, 14],
        [14, 17, 19, 21, 25, 17, 14],
        [4, 12, 4, 4, 4, 4, 14],
        [14, 17, 1, 2, 4, 8, 31],
        [31, 2, 4, 2, 1, 17, 14],
        [2, 6, 10, 18, 31, 2, 2],
        [31, 16, 30, 1, 1, 17, 14],
        [6, 8, 16, 30, 17, 17, 14],
        [31, 1, 2, 4, 4, 4, 4],
        [14, 17, 17, 14, 17, 17, 14],
        [14, 17, 17, 15, 1, 2, 12],
            [4, 4, 4, 4, 4, 0, 4],
            [14, 17, 1, 2, 4, 0, 4],
        [0, 4, 4, 31, 4, 4, 0], //+
        [0, 0, 0, 31, 0, 0, 0], //-
            [0, 0, 0, 0, 12, 12, 0],
            [0,12, 12, 0, 12, 12, 0],
        [0, 0, 30, 0, 30, 0, 0], //=
        [1, 2, 31, 4, 31, 8, 16],
            [0, 4, 21, 14, 21, 4, 0],
    [0, 0, 14, 1, 15, 17, 15],
    [16, 16, 22, 25, 17, 17, 14],
    [0, 0, 14, 16, 16, 17, 14],
    [1, 1, 13, 19, 17, 17, 15],
    [0, 0, 14, 17, 31, 16, 14],
    [2, 5, 4, 14, 4, 4, 4],
    [0, 0, 15, 17, 15, 1, 14],
    [16, 16, 22, 25, 17, 17, 17],
    [4, 0, 12, 4, 4, 4, 14],
    [2, 0, 2, 2, 2, 18, 12],
    [8, 8, 9, 10, 12, 10, 9],
    [12, 4, 4, 4, 4, 4, 14],
    [0, 0, 26, 21, 21, 21, 21],
    [0, 0, 22, 25, 17, 17, 17],
    [0, 0, 14, 17, 17, 17, 14],
    [0, 0, 30, 17, 30, 16, 16],
    [0, 0, 15, 17, 15, 1, 1],
    [0, 0, 11, 12, 8, 8, 8],
    [0, 0, 15, 16, 14, 1, 30],
    [4, 14, 4, 4, 4, 5, 2],
    [0, 0, 17, 17, 17, 19, 13],
    [0, 0, 17, 17, 17, 10, 4],
    [0, 0, 17, 17, 17, 21, 10],
    [0, 0, 25, 6, 4, 12, 19],
    [0, 0, 17, 9, 6, 4, 24],
    [0, 0, 31, 2, 4, 8, 31],
        [10, 0, 14, 1, 15, 17, 15],
        [10, 0, 0, 14, 17, 17, 14],
        [10, 0, 0, 17, 17, 17, 14]
    ]

}

input.onButtonPressed(Button.AB, function () {
    let s: number = 0;
    //for (let s=0;s<neo_strip_anz;s++) {
    neop_ges[s].clear()
    neop_ges[s].show()
    //}
})

function neop_schreibe_zch(snr: number, zch_str: string = "A", color: number) {
    let zeichen_matrix: Array<number> = []

    let mx = arr_neop_settings[snr].hwMatrix[0];
    let my = arr_neop_settings[snr].hwMatrix[1];

    let is_type = 0

    let zch_len = zch_str.length
    if (zch_len > 1) {
        is_type = 1; //wort
        let arr_split = zch_str.split(",")
        if (arr_split.length > 2) {
            is_type = 2; //array
            zeichen_matrix = arr_split.map(wert => parseInt(wert));
            zch_len = 1;
        } 
    }

    for (let n = 0; n < zch_len; n++) {
        if (is_type < 2) { //no array
            let zch: string = zch_str[n];
            let found = bst_reihe.indexOf(zch);
            if (found == -1) {
                found = 0;
            }
            zeichen_matrix = arr_zeichen[found]
        }
        neop_ges[snr].clear()
        neop_ges[snr].show()
        zeichen_matrix.forEach(function (zahl, zeile) {
            for (let bit = 0; bit < mx; bit++) {
                let z = zeile, b = bit //7- minus
                //b=z, z=bit
                //b=z, z=mx-1-bit
                if (zahl & Math.pow(2, (bit + shift + mx) % mx)) {
                    let px = z * mx + ((z % 2) ? (mx - 1 - b) : b)
                    neop_ges[snr].setPixelColor(px, color);
                }
            }
        })
        neop_ges[snr].show()
        if (is_type == 1) {
            pause(strip_pause)
        }
    }
}

function neop_scrolle_zch(snr: number, zch_str: string = "A", color: number, abstand: number = 0) {
    let zeichen_matrix: Array<number> = []

    let mx = arr_neop_settings[snr].hwMatrix[0];
    let my = arr_neop_settings[snr].hwMatrix[1];

    let is_type = 0
    let zch_len = zch_str.length
    if (zch_len > 1) {
        is_type = 1; //wort
        let arr_split = zch_str.split(",")
        if (arr_split.length > 2) {
            is_type = 2; //array
            zeichen_matrix = arr_split.map(wert => parseInt(wert));
            zch_len = 1;
        }
    }

    let a_bin_zeilen: number[][] = [[], []];
    for (let n = 0; n < zch_len; n++) {
        if (is_type < 2) { //no array
            let zch: string = zch_str[n]
            let found = bst_reihe.indexOf(zch);
            if (found == -1) {
                found = 0;
            }
            zeichen_matrix = arr_zeichen[found]
        }

        zeichen_matrix.forEach(function (zahl, zeile) {
            let a_bin_zahl: Array<number> = [];
            for (let bit = mx + abstand; bit >= 0; bit--) {
                let sss = zahl & Math.pow(2, bit);
                a_bin_zahl.push(sss > 0 ? 1 : 0);
            }

            if (a_bin_zeilen[zeile] == undefined) {
                a_bin_zeilen[zeile] = a_bin_zahl;
            } else {
                a_bin_zeilen[zeile] = a_bin_zeilen[zeile].concat(a_bin_zahl)
            }
        })
    }

    let len = a_bin_zeilen[0].length;
    for (let pos = 0; pos <= len; pos++) {
        neop_ges[snr].clear()
        neop_ges[snr].show()

        a_bin_zeilen.forEach(function (a_dig, z) {
            for (let b = 0; b < mx; b++) {
                let wert = a_dig[b + pos];
                if (wert) {
                    let px = (z) * mx + ((z % 2) ? (b) : (mx - 1 - b))
                    neop_ges[snr].setPixelColor(px, color);
                }
            }
            neop_ges[snr].show()
           
        })
        pause(strip_pause / 10)
        
        //neop_ges[snr].show()
    }
}



function loesche_matrix(snr: number) {
    neop_ges[snr].clear()
    neop_ges[snr].show()
}

// muss sein, damit der index nicht fehlläuft
function default_strip_data() {
    arr_neop_settings.push({ pin: arr_tech_pin[0], hwMatrix: arr_tech_matrix[0] })
    arr_neop_settings.push({ pin: arr_tech_pin[1], hwMatrix: arr_tech_matrix[1] })
    arr_neop_settings.push({ pin: arr_tech_pin[2], hwMatrix: arr_tech_matrix[1] })
}

function init_strip(nrMatrix: number, hwMatrix: number, pin: number) {
    arr_neop_settings[nrMatrix].pin = pin;
    arr_neop_settings[nrMatrix].hwMatrix = arr_tech_matrix[hwMatrix];
   

    let pixelAnzahl = arr_tech_matrix[hwMatrix][0] * arr_tech_matrix[hwMatrix][1]

    
    let strip = neopixel.create(arr_tech_pin[pin], pixelAnzahl, NeoPixelMode.RGB)
    strip.setBrightness(strip_helligkeit)
    neop_ges[nrMatrix] = strip
    strip.clear()
    strip.show()

    neo_strip_anzahl = Math.max(nrMatrix + 1, neo_strip_anzahl)
}


function set_helligkeit(helligkeit: number, zch_pause: number) {
    strip_helligkeit = helligkeit;
    strip_pause = zch_pause;
    for (let i = 0; i < neo_strip_anzahl; i++) {
        neop_ges[i].setBrightness(strip_helligkeit);
    }
}

function set_system(sname: number) {
    if (sname == 0) {
        init_strip(0,0,1) //Haupt, 8x8,pin1 
        basic.showString("S")
    }

    if (sname == 1) { //wolf
        
        // init_strip(1,1,0) //links, 7x5,pin0
        // init_strip(2,1,1) //rechts, 7x5,pin1  

        init_strip(1,1,2) //links,  
        init_strip(2,0,1) //rechts, 16x16,pin1 

        basic.showString("M")
        //neop_schreibe_zch(1, "ABC", neopixel.colors(NeoPixelColors.Green)) 
        set_punkt(3,3,neopixel.colors(NeoPixelColors.Red),0)
basic.pause(3000)
        showtext(1, "ABC", neopixel.colors(NeoPixelColors.Green),false)
        showtext(2, "ABC", neopixel.colors(NeoPixelColors.Green),true)

    }
}

// variable ########################################
interface neop {
    pin: number;
    hwMatrix: Array<number>;
}

// hardwareeinstellungen ########################### 3 Matriken
let arr_tech_matrix = [[8, 8], [5, 7], [16, 16]];
let arr_tech_pin = [DigitalPin.P0, DigitalPin.P1, DigitalPin.P2, DigitalPin.P3, DigitalPin.P4, DigitalPin.P5, DigitalPin.P6, DigitalPin.P7, DigitalPin.P8];
// hardwareeinstellungen end ###########################


let bst_muster = [31, 31, 31, 31];
let shift: number = 0
let strip_helligkeit: number = 50;
let strip_pause: number = 2000; //auch scrollspeed
let hwx:number=8
let hwy:number=8
const zch_bit_breite:number=5

let zstrip: neopixel.Strip[] = []


let neop_ges: Array<neopixel.Strip> = []
let arr_neop_settings: Array<neop> = []

let arr_zeichen: number[][];
let bst_reihe: string = "";

let neo_strip_anzahl: number = 3;
// ende variable

//beginn initialisierung ############################
init_alphabet();
default_strip_data();
//init_strip(0, 0, 1);
set_system(1);
//basic.showIcon(IconNames.Yes)
// ende Initialisierung
// test();
// zerlege()
