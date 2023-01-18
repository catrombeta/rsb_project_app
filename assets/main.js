// DADOS APANHADOS DO JSON
function getAllVideos() {
    fetch('./db.json', {
        // mode: 'no-cors',
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET, POST'
        // }
    })
        .then((response => {
            if (response.status == 200) {
                return response.json();
            }
        }))
        .then(data => {
            fill(data, 'videos', 2);
        })
}

// PREENCHER LACUNAS PARA VÍDEO A PARTIR DE JSON
function fill(data, where, cols) {
    const col = 12 / cols
    let dataVideos = data.videos;
    for (var i = 1; i < dataVideos.length; i++) {
        $('#' + where).append(
            '<div class="p-4 justify-content-center d-flex col-md-' + col + '"><button class="btn rounded-pill" onclick="saveVideoId(' + dataVideos[i].id + ')"><p class="text-btn">' + dataVideos[i].title + '</p></button></div>');
    }
}

// SALVA ID DO VÍDEO SELECIONADO NO DATA.VIDEOS_TO_RUN (JSON) NO LOCALSTORAGE DO NAVEGADOR
function saveVideoId(id) {
    fetch("./db.json")
        .then((response => {
        response.json()
        
        .then((data) => {
            data.video_to_run = {
                id
            }
        })
    }))

    let replaceVideoToRun = JSON.stringify(id);
    replaceVideoToRun = replaceVideoToRun.replace('"data.videos_to_run": ""', '"data.videos_to_run": "saveVideoId(id)"');
    window.localStorage.setItem("idVideo", `${replaceVideoToRun}`);
    console.log(replaceVideoToRun);

}

// FUNÇÃO QUE LÊ AS FUNÇÕES PARA A TELA QUE RENDERIZA OS VÍDEOS SELECIONADOS
function getAllFunctionsVideo() {
    setVideo();
    refreshVideo();

    $('.viewVideo').attr('muted', false);
}

// SETAR VÍDEO A PARTIR DO ID RECUPERADO DO LOCALSTORAGE
function setVideo() {  
    let idCaught = window.localStorage.getItem("idVideo");
    console.log(idCaught);

    if (idCaught === "") {
        $('.viewVideo').append('<video autoplay muted class="videoChoose"><source src="./assets/videos/video1.mp4"/></video>');
    } else {
        for (var i = 0; i < idCaught.length; i++) {
            if (idCaught >= 1) {
                $('.viewVideo').fadeIn('1000', function () {
                    $('.viewVideo').append('<video muted autoplay class="videoChoose"><source src="./assets/videos/video'+ idCaught + '.mp4"/></video>');
                });
            }
        }
    }

    endVideo();
    $('video').attr('id', 'refreshVideo');
}

// FUNCÃO DE FADEOUT AO FINALIZAR OS VÍDEOS (POR BOTÃO OU POR FINALIZAR O VÍDEO)
function endVideo() {
    $('video').on('ended', function() {
        $('video').fadeOut(1000, function() {
            $('body').css('backgroundColor', 'black');
            $('.videoChoose').remove();
            $('.viewVideo').append('<video autoplay muted loop class="videoChoose"><source src="./assets/videos/video1.mp4"/></video>');
            window.localStorage.setItem("idVideo", ``);
        });
    });

}

// REFRESH AUTOMÁTICO UNICAMENTE NA DIV DE VÍDEO A CADA VEZ QUE O LOCALSTORAGE É MODIFICADO
function refreshVideo() {
    window.addEventListener("storage", () => {
        $('video').replaceWith(setVideo());
    });
}