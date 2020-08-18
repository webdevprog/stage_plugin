function stagesBlock(nameBlock) {
    if (!$(`.selection-stages${nameBlock}`).length) return;
    const stagesContainer = $(`.selection-stages${nameBlock}`);
    const getStageItems = stagesContainer.find('.selection-stages-item');
    const getNotices = stagesContainer.find('.selection-stages-notices');
    const getPagination = stagesContainer.find('.selection-stages-pagination-item');
    const postionsStage = [...getStageItems].map(item => item.offsetLeft);
    let typeNotices = ['success', 'error'].map(item => `selection-stages-item_status_${item}`).join(' ');

    const changeStage = (index) => {
        let stageEnd = getStageItems.index(getStageItems.filter(`[data-start-stage="${index}"]`));
        stageEnd = stageEnd <= 0 ? 0 : stageEnd - 1;
        stagesContainer.find('.selection-stages-wrapper').animate({ 'scrollLeft': postionsStage[stageEnd] }, 500);
    };

    const toggleNotification = (id, stage, showNotice = false) => {
        let notices = getNotices.children(),
            typeNotice = notices.filter(`[data-stage-id="${id}"]`).data('type-stage');
        typeNotice = typeNotice ? `selection-stages-item_status_${typeNotice}` : '';

        notices.slideUp();
        showNotice && notices.filter(`[data-stage-id="${id}"]`).slideDown();
        showNotice && typeNotice ? stage.addClass(typeNotice) : stage.removeClass(typeNotice);
    };

    getStageItems.find('.selection-stages-item-content').click(function () {
        let activeClass = 'selection-stages-item--done',
            item = $(this).parent(),
            isDone = item.hasClass(activeClass),
            currentIndex = item.index() + 1;

        if (isDone) {
            getStageItems.slice(currentIndex - 1, getStageItems.length).removeClass(`${activeClass} ${typeNotices}`);
            toggleNotification(currentIndex, item);
        } else {
            getStageItems.slice(0, currentIndex).addClass(activeClass).removeClass(typeNotices);
            toggleNotification(currentIndex, item, true);
        }
        item.addClass('current');
        getStageItems.not(`:eq(${currentIndex - 1})`).removeClass('current');
    });

    getPagination.click(function () {
        changeStage($(this).index() + 1);
        getPagination.removeClass('selection-stages-pagination-item--active');
        $(this).addClass('selection-stages-pagination-item--active');
    });

    let position = 0;
    
    stagesContainer.bind('mousewheel', function (e) {
        let maxWidth = stagesContainer.find('.selection-stages-wrapper')[0].scrollWidth;
        if (e.originalEvent.wheelDelta / 120 > 0) {
            position = maxWidth > position ? position += 20 : maxWidth.scrollWidth;
        }
        else {
            position = position > 0 ? position -= 20 : 0;
            console.log(position);
        }
        stagesContainer.find('.selection-stages-wrapper').scrollLeft(position);
    });
}

stagesBlock('.students');
