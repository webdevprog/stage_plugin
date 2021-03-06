function stagesBlock(nameBlock) {
    const stagesContainer = $(`.selection-stages${nameBlock}`);
    const getStageItems = stagesContainer.find('.selection-stages-item');
    const getNotices = stagesContainer.find('.selection-stages-notices');
    const getPagination = stagesContainer.find('.selection-stages-pagination-item');
    let typeNotices = ['success', 'error'].map(item => `selection-stages-item_status_${item}`).join(' ');

    const changeStage = (index) => { 
        stagesContainer.find('.selection-stages-wrapper').css('transform', `translate(-${index * 100}%, 0)`);
        getPagination.removeClass('selection-stages-pagination-item--active');
        getPagination.eq(index).addClass('selection-stages-pagination-item--active');
    };

    const toggleNotification = (id, elm, showNotice = false) => {
        let notices = getNotices.children(),
            typeNotice = notices.filter(`[data-stage-id="${id}"]`).data('type-stage');
            typeNotice = typeNotice ? `selection-stages-item_status_${typeNotice}` : '';

        notices.slideUp();
        showNotice && notices.filter(`[data-stage-id="${id}"]`).slideDown();
        showNotice && typeNotice ? elm.addClass(typeNotice) : elm.removeClass(typeNotice);
    };

    getStageItems.find('.selection-stages-item-content').click(function () {
        let activeClass = 'selection-stages-item--done',
            item = $(this).parent(),
            isDone = item.hasClass(activeClass),
            stagePart = item.parent(),
            currentIndex = getStageItems.index(item) + 1;

        if (isDone) {
            getStageItems.slice(currentIndex - 1, getStageItems.length).removeClass(`${activeClass} ${typeNotices}`);
            toggleNotification(currentIndex, item);
            !item.prev().length && stagePart.prev().length && changeStage(stagePart.prev().index());
        } else {
            getStageItems.slice(0, currentIndex).addClass(activeClass).removeClass(typeNotices);
            toggleNotification(currentIndex, item, true);
            !item.next().length && stagePart.next().length && changeStage(stagePart.next().index())
        }
        item.addClass('current');
        getStageItems.not(`:eq(${currentIndex-1})`).removeClass('current');
        
    });

    getPagination.click(function() {changeStage($(this).index())});
}

stagesBlock('.students');
