/**
 * Created by garricxiang on 2017/5/8.
 */
function run() {
    var tabs = $('.navtab');
    var containers = $('.contentContainer');
    $('.contentContainer').hide();
    $('.navtab').on('click', function() {
        var tab = $(this)[0];
        var index = -1;
        for  (var i = 0; i < tabs.length; i++) {
            containers[i].style.display = 'none';
            containers[i].style.visibility = 'hidden';
            tabs[i].style.color = '#000';

            if (tab == tabs[i]) {
                index = i;
            }
        }
        if (index >= 0) {
            containers[index].style.display = 'block';
            containers[index].style.visibility = 'visible';
            tabs[index].style.color = '#56A';
        }

    });

    learnWebGL.init();
    containers[0].style.display = 'block';
    containers[0].style.visibility = 'visible';
}
