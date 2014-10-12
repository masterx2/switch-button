/**
 * Created by masterx2 on 10/12/14.
 */

(function ($) {
    jQuery.fn.switchButton = function (opts) {
        // Hide target selectBox
        this.css({
            display: 'none'
        });

        // Render Button
        this.each(function (i, v) {

            // Default options
            opts = opts ? opts : {};
            var options = {
                'template': opts.template ? opts.template : '<div>',
                'class': opts.class ? opts.class : 'switch-select',
                'innerclass': opts.innerclass ? opts.class : 'switch-select-button',
                'width': opts.width ? opts.width : $(v).width() + 'px',
                'marker': opts.marker ? opts.marker : '#3577EE',
                'markerback': opts.markerback ? opts.markerback : '#B9B9B9',
                'markerh': opts.markerh ? opts.markerh : '4px',
                'onchange': opts.onchange ? opts.onchange : function () {
                }
            };

            // Get elems for indicator
            var selectBox = $(v);
            // Get Options, Values, Indexes
            var selectOptions = {},
                selectIndexes = {},
                selectedIndex = selectBox.find('option:selected').index();
            selectBox.find('option').each(function (i, v) {
                selectIndexes[i] = $(v).val();
                selectOptions[$(v).val()] = $(v).text();
            });

            // Generate indicator
            var indicator = $('<div>')
                .addClass('switch-button-indicator')
                .css({
                    width: '100%',
                    height: options.markerh,
                    background: options.markerback,
                    'margin-top': '-1px'
                }).append(
                    $('<div>')
                        .css({
                            position: 'relative',
                            height: options.markerh,
                            width: 100 / Object.keys(selectIndexes).length + '%',
                            background: options.marker,
                            left: (selectedIndex * (100 / Object.keys(selectIndexes).length)) + '%'
                        }))

            $(v).after(
                $('<div>')
                    // Prevent select
                    .bind('selectstart dragstart', function (evt) {
                        evt.preventDefault();
                        return false;
                    })
                    .addClass(options.class)
                    .css({
                        width: options.width
                    })
                    .append(
                        $(options.template)
                            .text($(v).children('option:selected').text())
                            .addClass(options.innerclass)
                            .click(function (e) {
                                // Get elems
                                var button = $(e.target),
                                    selectBox = button.parent().prev(),
                                    indicator = button.next().find('div');
                                // Get Options, Values, Indexes
                                var selectOptions = {},
                                    selectIndexes = {},
                                    selectedIndex = selectBox.find('option:selected').index();
                                selectBox.find('option').each(function (i, v) {
                                    selectIndexes[i] = $(v).val();
                                    selectOptions[$(v).val()] = $(v).text();
                                });
                                // Get next index
                                var nextIndex = selectedIndex + 1;
                                if (nextIndex > Object.keys(selectIndexes).length - 1) {
                                    nextIndex = 0;
                                }
                                // Renew button label
                                button.text(selectOptions[selectIndexes[nextIndex]]);
                                // Update selectbox
                                selectBox.val(selectIndexes[nextIndex]);
                                // Update indicator position
                                indicator.stop().animate({
                                    left: (nextIndex * (100 / Object.keys(selectIndexes).length)) + '%'
                                }, 300);
                                // Fire onChange callback
                                options.onchange(selectIndexes[nextIndex]);

                            }),
                        indicator))
        })
    };
    return this;
})(jQuery);

