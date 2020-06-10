 
 // Determine the type of the conic given her coefficientes AX² + BXY + CY² + DX + EY + F = 0
var type
/*  
        0 --> Empty
        1 --> Point  
        2 --> Two Identical Lines
        3 --> Pair of parallel lines (non identical)
        4 --> Pair of intersecting lines
        5 --> Ellipse
        6 --> Hyperbola
        7 --> Parabola
        8 --> Cirfunferemce
*/

function graph(){
    // Getting all coefficients 
    var a = eval(document.getElementById("a").value) || 0
    var b = eval(document.getElementById("b").value) || 0
    var c = eval(document.getElementById("c").value) || 0
    var d = eval(document.getElementById("d").value) || 0
    var e = eval(document.getElementById("e").value) || 0
    var f = eval(document.getElementById("f").value) || 0

    determination(a,b,c,d,e,f)
    
    document.getElementById("equation").innerText = print_equation(a,b,c,d,e,f)
    
    var a2 = a
    var b2 = b
    var c2 = c
    var d2 = d
    var e2 = e
    var f2 = f
    var h, k
    
    const det = a*c - (b/2)**2
    var flag_first_det = det
    
    if(d != 0 || e != 0){
        if (!flag_first_det) {
            document.getElementById("notdet").innerText = "It was not possible to make a translation of the coordenate system"
        }
        else{
            h = ((-d/2)*c - (-e/2)*(b/2))/det
            k = ((a)*(-e/2) - (b/2)*(-d/2))/det
            d2 = 0
            e2 = 0
            f2 = ((d/2)*h + (e/2)*k + f)
            
            document.getElementById("anshk").innerText =  `The new coordenate system have (${h},${k}) as his origen coordernates at the old system` 
            document.getElementById("neweq").innerText = print_equation(a2,b2,c2,d2,e2,f2)
            
        }
    }
    else document.getElementById("anshk").innerText = "Translation unnecessary"
    
    if(b2 != 0) {
        
        var tanteta1 = (2*a - 2*c + Math.sqrt((2*a - 2*c)**2 + 4*b**2))/(-2*b)
        var teta1 = (Math.atan(tanteta1))*(180/Math.PI)
        var teta1rad = Math.atan(tanteta1)

        a2 = (a + c + b*Math.sqrt(1+((a-c)/b)**2))/2 
        b2 = 0
        c2 = a + c - a2
       
        var cos1 = Math.sqrt(1/(tanteta1**2 + 1))
        var sin1 = Math.sqrt(1 - (cos1)**2)
           
        if (!flag_first_det) {
            d2 = d*cos1 + e*sin1
            e2 = (-d)*sin1 + e*cos1
        }
        document.getElementById("neweq2").innerText = print_equation(a2,b2,c2,d2,e2,f2)    
        document.getElementById("anstetas").innerText =  `We have for rotation : first angle ${teta1.toFixed(2)}`
    }
    else document.getElementById("anstetas").innerText = "Rotation unnecessary"
    
    if (type > 4) findElements(type, a2,b2,c2,d2,e2,f2)
}


function determination(a,b,c,d,e,f){

    var Det = (a*c*f) - (((d**2)*c + (b**2)*f + (e**2)*a - b*e*d))/4
    
    console.log(a,b,c,d,e,f, typeof Det)
    
    var t = a + c
    var cofator1 = c*f - ((e/2)**2)
    var cofator2 = a*f - ((d/2)**2)
    var cofator3 = a*c - ((b/2)**2)

    if (!cofator3){
        if (!Det){
            if (!(cofator1 + cofator2)) {
                document.getElementById("Type").innerText = "Pair of identical lines" 
                type = 2
            }
            else if(cofator1 + cofator2 > 0){
                document.getElementById("Type").innerText = "Empty" 
                type = 0
            }
            else {
                document.getElementById("Type").innerText = "Pair parallel lines"
                type = 3
            }        
        } 

        else {
            document.getElementById("Type").innerText = "Parabola"            
            type = 7
        }
    }

    else if(cofator3 > 0){
        if (!Det) {
            document.getElementById("Type").innerText = "Point"
            type = 1
        }
        else{
            if (t*Det > 0) {
                document.getElementById("Type").innerText = "Empty"
                type = 0
            }
            else {
                if (a == c) {
                    document.getElementById("Type").innerText = "Circumference (Ellipse)" 
                    type = 8
                }
                else{
                    document.getElementById("Type").innerText = "Ellipse" 
                    type = 5
                } 
            }
        }
    }

    else {
        if (!Det) {
            document.getElementById("Type").innerText = "Pair of intersecting lines" 
            type = 4
        }
        else {
            document.getElementById("Type").innerText = "Hyperbola" 
            type = 6
        }
    }
}


function print_equation(a,b,c,d,e,f){
    var string =""    
    if (a > 0) string += `${a}X² `
    else if (a < 0) string += ` ${a}X² `

    if (b > 0) string += `+ ${b}XY `
    else if (b < 0) string += ` ${b}XY `

    if (c > 0) string += `+ ${c}Y² `
    else if (c < 0) string += ` ${c}Y² `

    if (d > 0) string += `+ ${d}X `
    else if (d < 0) string += ` ${d}X `
    
    if (e > 0) string += `+ ${e}Y `
    else if (e < 0) string += ` ${e}Y `

    if (f > 0) string += `+ ${f} `
    else if (f < 0) string += ` ${f} `

    if (string) string += " = 0 "
    else string = "Not an equation..."
    
    return string
}

function findElements(type, a,b,c,d,e,f){
    var f1, f2
    var exc 
    var v1, v2
    var b1,b2
    var string = ""
    var p 
    var center
    var radiun
    
    // Ellipse
    if (type == 5){
        
        v1 = Math.sqrt(((-f/a) > (-f/c))?(-f/a):(-f/c))
        v2 = -v1
        if (a < c) string += `First Vertice (A1): (${v1},0) Second Vertice (A2): (${v2},0).`
        else string += `First Vertice (A1): (0,${v1}) Second Vertice (A2): (0,${v2}).`
        string += "\n---------------------------------------------------------------------------------------------------\n"

        b1 = Math.sqrt(((-f/a) > (-f/c))?(-f/c):(-f/a))
        b2 = -b1
        if (a < c) string += `Third Vertice  (B1): (0,${b1}) . Fourth Vertice (B2): (0,${b2}).`
        else string += `Third Vertice (B1): (${b1},0) . Fourth Vertice (B2): (${b2},0).`
        string += "\n---------------------------------------------------------------------------------------------------\n"

        f1 = Math.sqrt((v1**2) - (b1**2))
        f2 = -f1
        if (a < c) string += `First Focus (F1): (${f1},0) . Second Focus (F2): (${f2},0).`
        else string += `First Focus (F1): (0,${f1}) . Second Focus (F2): (0,${f2}).`
        string += "\n---------------------------------------------------------------------------------------------------\n"

        exc = f1/v1
        string += `Excentricite : ${exc}`

        document.getElementById("Elements").innerText = string
    }

    // Hyperbola
    else if (type == 6){
        
        v1 = Math.sqrt((-f/a > 0)?(-f/a):(f/c))
        v2 = -v1   
        if (a > 0) string += `First Vertice (A1): (${v1},0) Second Vertice (A2): (${v2},0).`
        else string += `First Vertice (A1): (0,${v1}) Second Vertice (A2): (0,${v2}).`
        string += "\n---------------------------------------------------------------------------------------------------\n"
        
        f1 = Math.sqrt(v1**2 + ((a>0)?(-f/c):(-f/a))**2)
        f2 = -f1
        if (a > 0) string += `First Focus (F1): (${f1},0) Second Focus (F2): (${f2},0).`
        else string += `First Focus (F1): (0,${f1}) Second Focus (F2): (0,${f2}).`
        string += "\n---------------------------------------------------------------------------------------------------\n"

        exc = f1/v1
        string += `Excentricite : ${exc}`   

        document.getElementById("Elements").innerText = string       
    }


    // Parabola
    else if (type == 7){
        if (!a){
            if (c>0) p = -d/4
            else p = d/4
            string = `P = ${p}, and the focus is at F (${p},0)`             
        }
        if (!c){
            if (a>0) p = -e/4
            else p = e/4
            string += `P = ${p}, and the focus is at F (0,${p})` 
       }
       document.getElementById("Elements").innerText = string
    }

    // Circumference
    else {
        if (a < 0) radius = Math.sqrt(f)
        else radius = Math.sqrt(-f)
        string = `The radius of the circumference is ${radius}`
        document.getElementById("Elements").innerText = string
    }
}


function setup() {
    createCanvas(400, 400);
}

function draw(){
    is_playing
}