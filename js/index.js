$(function() {
    var trs;
    var srcResult;
    var index = 0;
    var angryMeter = 0;

    //Functions for pointers
    function nextReslt() {
        if (srcResult[1][index] === undefined) {
            index--;
            return;
        } else {
            $('.resltTXT').animate({
                'opacity': 0
            }, 500, function() {
                $('#head').html('<b>' + srcResult[1][index] + '</b>');
                $('#descr').html(srcResult[2][index]);
                $('.wikiReslt').attr('href', srcResult[3][index]);
                $('.resltTXT').animate({
                    'opacity': 1
                }, 500);
            });
        }
    }

    function prevReslt() {
        if (srcResult[1][index] === undefined) {
            index++;
            return;
        } else {
            $('.resltTXT').animate({
                'opacity': 0
            }, 500, function() {
              $('#head').html('<b>' + srcResult[1][index] + '</b>');
              $('#descr').html(srcResult[2][index]);
                $('.wikiReslt').attr('href', srcResult[3][index]);
                $('.resltTXT').animate({
                    'opacity': 1
                }, 500);
            });
        }
    }

    function angryMage() {
        $('.mageSpeech').html('Now thee did get me infuriated! Go wh\'rev\'r mine own charm shall sendeth thee!');
        $('.mg').attr('src', 'https://raw.githubusercontent.com/OLucky/wiki.treasure/master/css/img/angry-mage.png');
        $('.placeForBtn').html('<button type="button" id="random" class="col-xs-offset-3 col-xs-6 btn btn-warning">Wherever!</button>');
    }

    //Main function
    $('#sub').on('click', function() {
        trs = $('#trs').val();
        //Check if input empty
        if (!trs || trs.length === 0 || /^\s*$/.test(trs)) {
            switch (angryMeter) {
                case 0:
                    {
                        $('.mageSpeech').animate({
                            'opacity': 0
                        }, 500, function() {
                            $('.mageSpeech').html('Asketh something reasonable!');
                            angryMeter++;
                            $('.mageSpeech').animate({
                                'opacity': 1
                            }, 500);
                        });
                        break;
                    }
                case 1:
                    {
                        $('.mageSpeech').animate({
                            'opacity': 0
                        }, 500, function() {
                            $('.mageSpeech').html('Asketh something goddamit!');
                            angryMeter++;
                            $('.mageSpeech').animate({
                                'opacity': 1
                            }, 500);
                        });
                        break;
                    }
                case 2:
                    {
                        angryMage();
                        break;
                    }
            }
        } else
        //Getting result
        {
            trs = trs.replace(/\s/g, '\+');
            console.log(trs);
            var url = 'https://wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=10&uselang=user&search=' + trs + '&callback=?';
            $.getJSON(url, function(data) {
                console.log(data);
                srcResult = data;
                $('.reslt').remove();
                index = 0;
                $('.results').append("<div class='txt reslt col-xs-12'>"+
                "<img src='https://raw.githubusercontent.com/OLucky/wiki.treasure/master/css/img/point-left.png' id='pointPrev' class='col-xs-offset-2 col-xs-3 col-md-offset-4 col-md-2 point'></img>" +
                "<img src='https://raw.githubusercontent.com/OLucky/wiki.treasure/master/css/img/point-right.png' id='pointNext' class='col-xs-3 col-md-2 point'></img>"+
                "<a class='wikiReslt' target='_blank'><p id='head' class='col-xs-12 resltTXT'></p>"+
                "<p id='descr' class='col-xs-12 resltTXT'></p></a></div>");
                nextReslt();
                $('.reslt').animate({
                    'opacity': 1
                }, 500, function() {
                    $('.resltTXT').animate({
                        'opacity': 1
                    }, 500);
                });
            });
        }
    });

    //Various triggers
    $('body').on('click', '#pointNext', function() {
        if (index < srcResult[1].length)
            ++index;
        nextReslt();
    });

    $('body').on('click', '#pointPrev', function() {
        if (index > -1)
            --index;
        prevReslt();
    });

    $('body').on('click', '#random', function() {
        window.open("https://wikipedia.org/wiki/Special:Random", '_blank');
    });

    $('#sacred').on('click', function() {
        $('.mg').addClass('punchable');
    });

    $('body').on('click', '.punchable', function() {
        angryMage();
    });
});
