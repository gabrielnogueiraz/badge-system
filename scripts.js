let cropper;

function gerarCracha() {
    const nome = document.getElementById('nomeInput').value;
    document.getElementById('nome').innerText = nome;

    const dataAdmissaoInput = document.getElementById('dataInput').value;
    if (dataAdmissaoInput) {
        const [ano, mes, dia] = dataAdmissaoInput.split('-');
        const dataFormatada = `Admissão: ${dia}/${mes}/${ano}`;
        document.getElementById('dataAdmissao').innerText = dataFormatada;
    }

    const fotoInput = document.getElementById('fotoInput');
    const foto = document.getElementById('foto');

    if (fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imagemParaCorte = document.getElementById('imagemParaCorte');
            imagemParaCorte.src = e.target.result;

            document.getElementById('imagemModal').style.display = 'flex';

            if (cropper) {
                cropper.destroy();
            }

            cropper = new Cropper(imagemParaCorte, {
                aspectRatio: NaN, 
                viewMode: 1,
                autoCropArea: 0.9, 
                responsive: true,
                scalable: true,
                zoomable: true,
                movable: true,
                minCropBoxHeight: 50,
                minCropBoxWidth: 50,
            });
        };

        reader.readAsDataURL(fotoInput.files[0]);
    }
}

document.getElementById('cortarImagem').addEventListener('click', function () {
    const canvas = cropper.getCroppedCanvas();
    document.getElementById('foto').style.backgroundImage = `url(${canvas.toDataURL()})`;
    document.getElementById('imagemModal').style.display = 'none';
});

function baixarCracha() {
    html2canvas(document.getElementById('cracha'), { allowTaint: true }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'cracha.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(error => {
        console.error('Erro ao gerar a imagem do crachá:', error);
    });
}
