window.addEventListener("load", function () {
    const e = {
        numeroInicial: 22521234,
        fechaInicio: new Date("2026-11-01T05:00:00Z"), // 01 de Noviembre de 2026 a las 00:00 horas de Lima (UTC-5)
        crecimientoBasePorHora: 180,
        tiempoMostrado: 6000,
        paises: ["MY", "PE", "BO", "MX", "IN", "PH", "TH"]
    };

    function n() {
        const n = document.getElementById("dxn-flags-container"),
              t = window.innerWidth <= 768 ? "32px" : "40px";
        
        e.paises.forEach(e => {
            const o = document.createElement("img");
            o.src = `https://flagcdn.com/w40/${e.toLowerCase()}.png`;
            o.alt = `Bandera ${e}`;
            o.style.width = t;
            o.style.height = "auto";
            o.style.borderRadius = "4px";
            o.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            n.appendChild(o);
        });
    }

    function t() {
        const e = document.getElementById("confetti-canvas"),
              n = e.getContext("2d");
        
        e.width = e.offsetWidth;
        e.height = e.offsetHeight;
        e.style.opacity = "1";

        const t = [
            "rgba(52,175,87,0.7)", 
            "rgba(255,215,0,0.7)", 
            "rgba(255,69,0,0.7)", 
            "rgba(0,191,255,0.7)", 
            "rgba(255,105,180,0.7)"
        ];
        const o = [];

        for (let n = 0; n < 50; n++) {
            o.push({
                x: Math.random() * e.width,
                y: Math.random() * e.height - e.height,
                r: 2 * Math.random() + 2,
                c: t[Math.floor(Math.random() * t.length)],
                s: 3 * Math.random() + 1
            });
        }

        function i() {
            n.clearRect(0, 0, e.width, e.height);
            o.forEach(t => {
                n.beginPath();
                n.arc(t.x, t.y, t.r, 0, 2 * Math.PI);
                n.fillStyle = t.c;
                n.fill();
                t.y += t.s;
                t.x += Math.sin(0.05 * t.y) * 0.5;
                t.y > e.height && (t.y = -10);
            });
            requestAnimationFrame(i);
        }

        const a = requestAnimationFrame(i);
        setTimeout(() => cancelAnimationFrame(a), 6000);
    }

    function o() {
    // Hora UTC: referencia universal para todos los visitantes
    const ahora = new Date();

    // Fecha de inicio del contador: 01/11/2026 00:00 de Perú (UTC-5)
    const inicio = e.fechaInicio;

    // Meses transcurridos según el calendario de Perú
    const fechaPeru = new Date(ahora.getTime() - 5 * 60 * 60 * 1000);
    const mesInicioPeru = new Date(inicio.getTime() - 5 * 60 * 60 * 1000);

    const mesesTranscurridos =
        (fechaPeru.getUTCFullYear() - mesInicioPeru.getUTCFullYear()) * 12 +
        (fechaPeru.getUTCMonth() - mesInicioPeru.getUTCMonth());

    // Crecimiento: +1 distribuidor por hora cada dos meses
    const crecimiento =
        e.crecimientoBasePorHora + Math.floor(mesesTranscurridos / 2);

    // Diferencia de tiempo absoluta, independiente del país
    const horasTranscurridas = (ahora.getTime() - inicio.getTime()) / 3600000;

    // Número actual de distribuidores
    const numeroActual = Math.floor(
        e.numeroInicial + horasTranscurridas * crecimiento
    );

    const contador = document.getElementById("dxn-counter-float");

    let valor = numeroActual - 1000;
    const incremento = Math.ceil((numeroActual - valor) / 30);

    let intervalo;

    function animar() {
        valor = Math.min(valor + incremento, numeroActual);

        contador.innerHTML = "";

        valor.toString().split("").forEach(digito => {
            const span = document.createElement("span");
            span.textContent = digito;
            contador.appendChild(span);
        });

        if (valor >= numeroActual) {
            clearInterval(intervalo);
            t();
        }
    }

    intervalo = setInterval(animar, 50);
}

    function i() {
        const t = document.getElementById("dxn-floating-counter");
        
        window.innerWidth <= 768 ? (
            t.style.width = "90%", 
            t.style.top = "50%", 
            t.style.left = "50%", 
            t.style.transform = "translate(-50%,-50%)"
        ) : (
            t.style.width = "35%", 
            t.style.maxWidth = "420px", 
            t.style.top = "60%", 
            t.style.left = "50%", 
            t.style.transform = "translate(-50%,-50%)"
        );
        
        t.style.display = "block";
        n();
        o();
        
        setTimeout(() => {
            t.style.opacity = "0";
            setTimeout(() => t.style.display = "none", 500);
        }, e.tiempoMostrado);
    }

    sessionStorage.getItem("dxnCounterShown") || (
        setTimeout(i, 300), 
        sessionStorage.setItem("dxnCounterShown", "true")
    );

    document.getElementById("close-counter").addEventListener("click", function () {
        const e = document.getElementById("dxn-floating-counter");
        e.style.opacity = "0";
        setTimeout(() => e.style.display = "none", 500);
    });

    window.addEventListener("resize", function () {
        const e = document.getElementById("dxn-floating-counter");
        if ("block" === e.style.display) {
            window.innerWidth <= 768 ? (
                e.style.width = "90%", 
                e.style.top = "50%", 
                e.style.transform = "translate(-50%,-50%)"
            ) : (
                e.style.width = "500px", 
                e.style.bottom = "20px", 
                e.style.transform = "translateX(-50%)"
            );
        }
    });
});
